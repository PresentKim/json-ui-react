// 생성된 JSON UI 파일을 규칙(EXP-36, COL-02, COL-47, COL-49, COL-50, INP-10)으로 검사한다.
import type { JsonObject, JsonValue } from "./types.ts";

export interface Diagnostic {
  rule: string;
  level: "error" | "warn" | "info";
  path: string;
  message: string;
}

const STATE_KEYS = [
  "checked_control",
  "checked_hover_control",
  "checked_locked_control",
  "checked_locked_hover_control",
  "unchecked_control",
  "unchecked_hover_control",
  "unchecked_locked_control",
  "unchecked_locked_hover_control",
];

const isObj = (v: unknown): v is JsonObject => typeof v === "object" && v !== null && !Array.isArray(v);

interface Visit {
  body: JsonObject;
  path: string;
  parentType: string | undefined;
}

/** 정의 본문을 반복(스택)으로 순회하며 노드를 전위 순서로 낸다. 순환 객체는 건너뛴다. */
function* walk(body: JsonObject, path: string): Generator<Visit> {
  const seen = new WeakSet<object>();
  const stack: Visit[] = [{ body, path, parentType: undefined }];
  while (stack.length) {
    const v = stack.pop()!;
    if (seen.has(v.body)) continue;
    seen.add(v.body);
    yield v;
    const kids = v.body.controls;
    if (!Array.isArray(kids)) continue;
    const next: Visit[] = [];
    for (const item of kids) {
      if (!isObj(item)) continue;
      for (const [key, child] of Object.entries(item)) {
        if (!isObj(child)) continue;
        next.push({
          body: child,
          path: `${v.path}/${key.split("@")[0]}`,
          parentType: typeof v.body.type === "string" ? v.body.type : undefined,
        });
      }
    }
    for (let i = next.length - 1; i >= 0; i--) stack.push(next[i]!);
  }
}

function definitions(files: Record<string, JsonObject>): { ns: string; name: string; ref?: string; body: JsonObject }[] {
  const out: { ns: string; name: string; ref?: string; body: JsonObject }[] = [];
  for (const file of Object.values(files)) {
    const ns = file.namespace;
    if (typeof ns !== "string") continue;
    for (const [key, body] of Object.entries(file)) {
      if (key === "namespace" || !isObj(body)) continue;
      const [name, ref] = key.split("@");
      out.push({ ns, name: name!, ref, body });
    }
  }
  return out;
}

function bindings(body: JsonObject): JsonObject[] {
  return Array.isArray(body.bindings) ? body.bindings.filter(isObj) : [];
}

function quotedHasOperator(expr: string): boolean {
  for (const m of expr.matchAll(/'([^']*)'/g)) if (/[*@]/.test(m[1]!)) return true;
  return false;
}

export function lintFiles(files: Record<string, JsonObject>, opts?: { routedRoots?: string[] }): Diagnostic[] {
  const out: Diagnostic[] = [];
  const defs = definitions(files);
  for (const d of defs) {
    for (const v of walk(d.body, `${d.ns}.${d.name}`)) {
      const b = v.body;
      if (b.type === "label" && "collection_index" in b)
        out.push({ rule: "COL-02", level: "warn", path: v.path, message: "label에는 collection_index를 직접 줄 수 없다. 패널로 감싸 패널에 인덱스를 준다." });
      if ("collection_index" in b && v.parentType === "panel")
        out.push({ rule: "COL-50", level: "warn", path: v.path, message: "부모가 panel이면 칸마다 다른 collection_index를 줘도 모두 인덱스 0을 그린다. 가로 stack_panel 줄을 쓴다." });
      if (b.type === "toggle") {
        const missing = STATE_KEYS.filter((k) => !(k in b));
        if (missing.length)
          out.push({ rule: "INP-10", level: "error", path: v.path, message: `토글은 8개 상태를 모두 정의해야 한다. 빠진 키: ${missing.join(", ")}` });
      }
      const bs = bindings(b);
      if (bs.some((x) => typeof x.source_property_name === "string" && quotedHasOperator(x.source_property_name)))
        out.push({ rule: "EXP-36", level: "error", path: v.path, message: "따옴표 리터럴 안에 '*' 또는 '@'를 쓸 수 없다." });
      if (b.type === "grid" && typeof b.maximum_grid_items === "number" && b.maximum_grid_items > 2000 && !bs.some((x) => x.target_property_name === "#maximum_grid_items"))
        out.push({ rule: "COL-49", level: "warn", path: v.path, message: `maximum_grid_items ${b.maximum_grid_items}: 2000개를 넘으면 칸이 겹쳐 그려진다.` });
    }
  }

  const roots = opts?.routedRoots ?? [];
  if (roots.length) {
    const index = new Map<string, { ns: string; name: string; ref?: string; body: JsonObject }>();
    for (const d of defs) index.set(`${d.ns}.${d.name}`, d);
    const visited = new Set<string>();
    const queue = [...roots];
    const refs = (ns: string, ref: string | undefined) => {
      if (!ref || ref.includes("$")) return;
      queue.push(ref.includes(".") ? ref : `${ns}.${ref}`);
    };
    while (queue.length) {
      const id = queue.shift()!;
      if (visited.has(id)) continue;
      visited.add(id);
      const d = index.get(id);
      if (!d) continue;
      refs(d.ns, d.ref);
      for (const v of walk(d.body, id)) {
        for (const x of bindings(v.body)) {
          if ((x.binding_type === "collection" || x.binding_type === "collection_details") && x.binding_condition !== "always")
            out.push({ rule: "COL-47", level: "warn", path: v.path, message: "라우터 아래 컬렉션 바인딩은 binding_condition: \"always\"가 필요하다." });
        }
        for (const item of Array.isArray(v.body.controls) ? v.body.controls : []) {
          if (isObj(item)) for (const k of Object.keys(item)) refs(d.ns, k.split("@")[1]);
        }
        const f = v.body.factory;
        if (isObj(f) && isObj(f.control_ids))
          for (const val of Object.values(f.control_ids as Record<string, JsonValue>))
            if (typeof val === "string" && val.startsWith("@")) refs(d.ns, val.slice(1));
      }
    }
  }
  return out;
}

export function countControls(files: Record<string, JsonObject>): Record<string, number> {
  const out: Record<string, number> = {};
  for (const [path, file] of Object.entries(files)) {
    let n = 0;
    for (const [key, body] of Object.entries(file)) {
      if (key === "namespace" || !isObj(body)) continue;
      for (const _ of walk(body, key)) n++;
    }
    out[path] = n;
  }
  return out;
}
