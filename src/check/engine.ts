// 규칙 검사 엔진: 정의를 전위 순서로 순회하며 RuleCheck를 실행한다.
import type { JsonObject } from "../types.ts";
import type { Diagnostic } from "../lint.ts";
import { diag, type RuleId } from "../rules/registry.ts";
import type { DefIndex, NodeCtx, RuleCheck } from "./types.ts";

const isObj = (v: unknown): v is JsonObject => typeof v === "object" && v !== null && !Array.isArray(v);

type Def = { ns: string; name: string; ref?: string; body: JsonObject; file: string };
interface Entry extends Def { key: string }

/** 파일 목록에서 최상위 정의를 파일 순서대로 모은다(namespace가 문자열인 파일만). */
function entries(files: Record<string, JsonObject>): Entry[] {
  const out: Entry[] = [];
  for (const [file, json] of Object.entries(files)) {
    const ns = json.namespace;
    if (typeof ns !== "string") continue;
    for (const [key, body] of Object.entries(json)) {
      if (key === "namespace" || !isObj(body)) continue;
      const [name, ref] = key.split("@");
      out.push({ ns, name: name!, ref, body, file, key });
    }
  }
  return out;
}

export function buildIndex(files: Record<string, JsonObject>): DefIndex {
  const list: Def[] = entries(files).map(({ ns, name, ref, body, file }) => ({ ns, name, ref, body, file }));
  const map = new Map<string, Def>();
  for (const d of list) map.set(`${d.ns}.${d.name}`, d);
  return { get: (n) => map.get(n), all: () => list };
}

/** 정의 하나를 전위 순서로 순회한다. 순환 객체는 건너뛴다. */
function* walk(e: Entry, index: DefIndex, rewrite: boolean): Generator<NodeCtx> {
  const seen = new WeakSet<object>();
  const mk = (key: string, body: JsonObject, path: string, parent?: NodeCtx): NodeCtx => {
    const [name, ref] = key.split("@");
    return {
      body, key, name: name!, ref, path, type: typeof body.type === "string" ? body.type : undefined,
      parent, depth: parent ? parent.depth + 1 : 0, ns: e.ns, file: e.file, index, rewrite,
    };
  };
  const stack: NodeCtx[] = [mk(e.key, e.body, `${e.ns}.${e.name}`)];
  while (stack.length) {
    const c = stack.pop()!;
    if (seen.has(c.body)) continue;
    seen.add(c.body);
    yield c;
    const kids = c.body.controls;
    if (!Array.isArray(kids)) continue;
    const next: NodeCtx[] = [];
    for (const item of kids) {
      if (!isObj(item)) continue;
      for (const [key, child] of Object.entries(item)) {
        if (!isObj(child)) continue;
        next.push(mk(key, child, `${c.path}/${key.split("@")[0]}`, c));
      }
    }
    for (let i = next.length - 1; i >= 0; i--) stack.push(next[i]!);
  }
}

/** 검사를 실행한다. rewrite가 아니면 입력을 그대로 돌려주고, 맞으면 깊은 복사본에서 고쳐 돌려준다. */
export function runChecks(
  files: Record<string, JsonObject>,
  checks: RuleCheck[],
  opts?: { rewrite?: boolean; only?: RuleId[] },
): { files: Record<string, JsonObject>; diagnostics: (Diagnostic & { url: string })[] } {
  const rewrite = opts?.rewrite === true;
  const work = rewrite ? structuredClone(files) : files;
  const active = checks.filter((c) => (rewrite || c.stage !== "rewrite") && (!opts?.only || opts.only.includes(c.id)));
  const diagnostics: (Diagnostic & { url: string })[] = [];
  const index = buildIndex(work);
  const nodeChecks = active.filter((c) => c.node);

  for (const [path, json] of Object.entries(work)) {
    for (const c of active) {
      c.file?.({ path, json, files: work }, (level, message) => diagnostics.push(diag(c.id, level, path, message)));
    }
  }
  if (nodeChecks.length) {
    for (const e of entries(work)) {
      for (const ctx of walk(e, index, rewrite)) {
        for (const c of nodeChecks) c.node!(ctx, (level, message) => diagnostics.push(diag(c.id, level, ctx.path, message)));
      }
    }
  }
  // 경로, 규칙 순으로 정렬(안정 정렬이라 같은 키는 발생 순서를 유지한다)
  diagnostics.sort((a, b) => (a.path < b.path ? -1 : a.path > b.path ? 1 : a.rule < b.rule ? -1 : a.rule > b.rule ? 1 : 0));
  return { files: work, diagnostics };
}
