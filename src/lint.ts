// 생성된 JSON UI 파일을 규칙(EXP-36, COL-02, COL-47, COL-49, COL-50, INP-10)으로 검사한다. 검사 엔진(src/check) 위에서 돈다.
import type { JsonObject, JsonValue } from "./types.ts";
import { runChecks } from "./check/engine.ts";
import type { DefIndex, RuleCheck } from "./check/types.ts";

export interface Diagnostic {
  rule: string;
  level: "error" | "warn" | "info";
  path: string;
  message: string;
  url?: string;
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

function bindings(body: JsonObject): JsonObject[] {
  return Array.isArray(body.bindings) ? body.bindings.filter(isObj) : [];
}

function quotedHasOperator(expr: string): boolean {
  for (const m of expr.matchAll(/'([^']*)'/g)) if (/[*@]/.test(m[1]!)) return true;
  return false;
}

/** 라우터 루트에서 도달 가능한 정의 ID 집합(ref, 자식 ref, factory control_ids를 따라간다). */
function reachable(index: DefIndex, roots: string[]): Set<string> {
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
    const seen = new WeakSet<object>();
    const stack: JsonObject[] = [d.body];
    while (stack.length) {
      const b = stack.pop()!;
      if (seen.has(b)) continue;
      seen.add(b);
      for (const item of Array.isArray(b.controls) ? b.controls : []) {
        if (!isObj(item)) continue;
        for (const [k, child] of Object.entries(item)) {
          refs(d.ns, k.split("@")[1]);
          if (isObj(child)) stack.push(child);
        }
      }
      const f = b.factory;
      if (isObj(f) && isObj(f.control_ids))
        for (const val of Object.values(f.control_ids as Record<string, JsonValue>))
          if (typeof val === "string" && val.startsWith("@")) refs(d.ns, val.slice(1));
    }
  }
  return visited;
}

/** 라우터 루트를 받아 COL-47 검사를 만든다. 루트가 없으면 아무것도 보고하지 않는다. */
function col47(roots: string[]): RuleCheck {
  const cache = new WeakMap<DefIndex, Set<string>>();
  return {
    id: "COL-47",
    stage: "forbid",
    node(ctx, report) {
      if (!roots.length) return;
      let set = cache.get(ctx.index);
      if (!set) cache.set(ctx.index, (set = reachable(ctx.index, roots)));
      let top = ctx;
      while (top.parent) top = top.parent;
      if (!set.has(`${top.ns}.${top.name}`)) return;
      for (const x of bindings(ctx.body))
        if ((x.binding_type === "collection" || x.binding_type === "collection_details") && x.binding_condition !== "always")
          report("warn", "라우터 아래 컬렉션 바인딩은 binding_condition: \"always\"가 필요하다.");
    },
  };
}

/** 기존 여섯 규칙을 RuleCheck로 만든다. */
export function legacyChecks(routedRoots: string[] = []): RuleCheck[] {
  return [
    {
      id: "COL-02", stage: "forbid",
      node(c, r) {
        if (c.type === "label" && "collection_index" in c.body) r("warn", "label에는 collection_index를 직접 줄 수 없다. 패널로 감싸 패널에 인덱스를 준다.");
      },
    },
    {
      id: "COL-50", stage: "forbid",
      node(c, r) {
        if ("collection_index" in c.body && c.parent?.type === "panel")
          r("warn", "부모가 panel이면 칸마다 다른 collection_index를 줘도 모두 인덱스 0을 그린다. 가로 stack_panel 줄을 쓴다.");
      },
    },
    {
      id: "INP-10", stage: "forbid",
      node(c, r) {
        if (c.type !== "toggle") return;
        const missing = STATE_KEYS.filter((k) => !(k in c.body));
        if (missing.length) r("error", `토글은 8개 상태를 모두 정의해야 한다. 빠진 키: ${missing.join(", ")}`);
      },
    },
    {
      id: "EXP-36", stage: "forbid",
      node(c, r) {
        if (bindings(c.body).some((x) => typeof x.source_property_name === "string" && quotedHasOperator(x.source_property_name)))
          r("error", "따옴표 리터럴 안에 '*' 또는 '@'를 쓸 수 없다.");
      },
    },
    {
      id: "COL-49", stage: "forbid",
      node(c, r) {
        const b = c.body;
        if (c.type === "grid" && typeof b.maximum_grid_items === "number" && b.maximum_grid_items > 2000 && !bindings(b).some((x) => x.target_property_name === "#maximum_grid_items"))
          r("warn", `maximum_grid_items ${b.maximum_grid_items}: 2000개를 넘으면 칸이 겹쳐 그려진다.`);
      },
    },
    col47(routedRoots),
  ];
}

export const LEGACY_CHECKS: RuleCheck[] = legacyChecks();

export function lintFiles(files: Record<string, JsonObject>, opts?: { routedRoots?: string[] }): Diagnostic[] {
  // 기존 테스트가 toEqual로 비교하므로 url은 떼어 낸다(url이 필요하면 runChecks를 직접 쓴다).
  return runChecks(files, legacyChecks(opts?.routedRoots ?? [])).diagnostics.map(({ url: _url, ...d }) => d);
}

export function countControls(files: Record<string, JsonObject>): Record<string, number> {
  const out: Record<string, number> = {};
  for (const [path, file] of Object.entries(files)) {
    let n = 0;
    const seen = new WeakSet<object>();
    const visit = (b: JsonObject) => {
      if (seen.has(b)) return;
      seen.add(b);
      n++;
      for (const item of Array.isArray(b.controls) ? b.controls : [])
        if (isObj(item)) for (const c of Object.values(item)) if (isObj(c)) visit(c);
    };
    for (const [key, body] of Object.entries(file)) {
      if (key === "namespace" || !isObj(body)) continue;
      visit(body);
    }
    out[path] = n;
  }
  return out;
}
