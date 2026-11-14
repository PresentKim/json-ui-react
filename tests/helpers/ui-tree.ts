// 이름을 무시한 JSON UI 트리 비교기(F-HL-3).
// 생성된 ui/*.json에서 루트 정의를 펼친다: 상속(@), `$`변수(`|default` 포함), 변수로 건 참조(`x@$def`),
// 팩토리 control_ids·control_name, grid_item_template, 바닐라 컨트롤에 넘기는 정의 참조 변수($scrolling_content).
// 해석 규칙(bedrock-research 위키 "파일과 정의" 장의 규칙):
//   - 참조 자리의 `$`값이 먼저 프레임에 들어가고, 정의(상속 펼친 결과)의 `$`값은 참조 자리에 없는 것만 더한다.
//   - 가장 가까운 구체값이 어떤 `|default`보다 이긴다(FILE-33). 값이 다시 `$x`면 이어서 찾는다.
//   - 상속은 기반 속성 위에 파생 속성을 통째로 덮는다(FILE-37, CN-23). 정의 안의 null은 기반 값을 지운다(CN-24).
// 바닐라 팩이 없으므로 팩에 없는 참조(common.*, server_form.*)는 펼치지 않고 이름 그대로 `vanilla`에 남긴다.
// 정규화: 컨트롤 이름·정의 이름·네임스페이스는 버린다. 이름으로 서로를 가리키는 값은 화면(라우트) 안의 위치로 바꾼다
// (source_control_name -> 그 이름을 가진 첫 컨트롤의 DFS 번호, toggle_name·factory.name -> 처음 나온 순서).
// 텍스처는 경로 접두 textures/ui/ffr/ 를 textures/ui/jur/ 로 맞춘다(같은 그림을 테마 경로로 옮겼다).
import type { JsonObject, JsonValue } from "../../src/types.ts";

interface Def { ns: string; base: string | null; props: JsonObject }
export type Catalog = Map<string, Def>;

const isObj = (x: unknown): x is JsonObject => !!x && typeof x === "object" && !Array.isArray(x);
const splitKey = (k: string): [string, string | null] => {
  const at = k.indexOf("@");
  return at < 0 ? [k, null] : [k.slice(0, at), k.slice(at + 1)];
};
const qualify = (ref: string, ns: string): string => (ref.startsWith("$") ? ref : ref.includes(".") ? ref : `${ns}.${ref}`);

/** ui/*.json 글자 묶음 -> 정의 목록. 경로 키(`a/b`, 바닐라 수정)는 빼고 따로 비교한다. */
export function catalogOf(files: Record<string, string>): Catalog {
  const defs: Catalog = new Map();
  for (const [f, text] of Object.entries(files)) {
    if (!f.startsWith("ui/") || f.endsWith("_ui_defs.json")) continue;
    const doc = JSON.parse(text) as JsonObject;
    const ns = doc.namespace as string;
    for (const [key, body] of Object.entries(doc)) {
      if (key === "namespace" || key.includes("/") || !isObj(body)) continue;
      const [name, base] = splitKey(key);
      defs.set(`${ns}.${name}`, { ns, base: base ? qualify(base, ns) : null, props: body });
    }
  }
  return defs;
}

class Scope {
  concrete = new Map<string, JsonValue>();
  defaults = new Map<string, JsonValue>();
  constructor(readonly parent: Scope | null) {}
  declare(k: string, v: JsonValue): void {
    if (v === null) return;
    if (k.endsWith("|default")) this.defaults.set(k.slice(0, -8), v);
    else this.concrete.set(k, v);
  }
  raw(n: string): JsonValue | undefined {
    for (let s: Scope | null = this; s; s = s.parent) if (s.concrete.has(n)) return s.concrete.get(n);
    for (let s: Scope | null = this; s; s = s.parent) if (s.defaults.has(n)) return s.defaults.get(n);
    return undefined;
  }
  lookup(n: string, depth = 0): JsonValue | undefined {
    const v = this.raw(n);
    if (depth < 8 && typeof v === "string" && /^\$[^\s()]+$/.test(v) && v !== n) return this.lookup(v, depth + 1) ?? v;
    return v;
  }
}

const subst = (v: JsonValue, s: Scope): JsonValue => {
  if (typeof v === "string") return /^\$[^\s()]+$/.test(v) ? (s.lookup(v) ?? v) : v;
  if (Array.isArray(v)) return v.map((x) => subst(x, s));
  if (isObj(v)) return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, subst(x, s)]));
  return v;
};

/** 펼친 컨트롤. scope가 참이면 팩토리가 만드는 화면 단위(이름 정규화 범위). */
export interface Node {
  name: string;
  vanilla?: string;
  props: JsonObject;
  vars?: Record<string, JsonValue | Node>;
  factory?: Record<string, Node>;
  children: Node[];
  scope?: boolean;
}

function flatten(cat: Catalog, id: string, frame: Scope, seen: Set<string>): { props: JsonObject; ns: string; vanilla?: string } {
  const def = cat.get(id);
  if (!def) return { props: {}, ns: id.split(".")[0]!, vanilla: id };
  if (seen.has(id)) throw new Error(`상속 순환: ${[...seen, id].join(" -> ")}`);
  seen.add(id);
  let base: ReturnType<typeof flatten> | null = null;
  if (def.base) {
    let b = def.base;
    if (b.startsWith("$")) b = qualify(String(frame.lookup(b)).replace(/^@/, ""), def.ns);
    base = flatten(cat, b, frame, seen);
  }
  const props: JsonObject = { ...(base?.props ?? {}) };
  for (const [k, v] of Object.entries(def.props)) {
    if (v === null) delete props[k];
    else props[k] = v;
  }
  return { props, ns: def.ns, vanilla: base?.vanilla };
}

const MAX_DEPTH = 64;

export function expand(cat: Catalog, ref: string | null, name: string, inline: JsonObject, parent: Scope | null, ns: string, depth = 0): Node {
  if (depth > MAX_DEPTH) throw new Error(`너무 깊다: ${name}`);
  const frame = new Scope(parent);
  for (const [k, v] of Object.entries(inline)) if (k.startsWith("$")) frame.declare(k, v);
  let flat: ReturnType<typeof flatten> = { props: {}, ns };
  if (ref) {
    let id = ref;
    if (id.startsWith("$")) id = qualify(String(frame.lookup(id)).replace(/^@/, ""), ns);
    flat = flatten(cat, id, frame, new Set());
  }
  const props: JsonObject = { ...flat.props };
  for (const [k, v] of Object.entries(inline)) if (v !== null) props[k] = v;
  for (const [k, v] of Object.entries(props)) if (k.startsWith("$") && !(k in inline)) frame.declare(k, v);

  const node: Node = { name, props: {}, children: [] };
  if (flat.vanilla) node.vanilla = flat.vanilla;
  const sub = (r: string): Node => expand(cat, qualify(r.replace(/^@/, ""), flat.ns), r, {}, frame, flat.ns, depth + 1);
  for (const [k, v] of Object.entries(props)) {
    if (k === "controls") continue;
    if (k.startsWith("$")) {
      // 바닐라 컨트롤만 자기 `$`값을 읽는다. 팩 정의는 값이 펼친 자손 속성에 이미 들어가 있다.
      if (!flat.vanilla) continue;
      const val = subst(v, frame);
      node.vars ??= {};
      node.vars[k] = typeof val === "string" && cat.has(qualify(val.replace(/^@/, ""), flat.ns)) ? sub(val) : val;
      continue;
    }
    node.props[k] = subst(v, frame);
  }
  const f = node.props.factory;
  if (isObj(f)) {
    const made: Record<string, Node> = {};
    if (isObj(f.control_ids)) for (const [id, r] of Object.entries(f.control_ids)) made[id] = { ...sub(String(r)), scope: true };
    if (typeof f.control_name === "string") made["control_name"] = { ...sub(f.control_name), scope: true };
    node.factory = made;
    const rest: JsonObject = { ...f };
    delete rest.control_ids;
    delete rest.control_name;
    node.props.factory = rest;
  }
  if (typeof node.props.grid_item_template === "string") {
    node.factory = { ...(node.factory ?? {}), grid_item_template: { ...sub(node.props.grid_item_template), scope: true } };
    delete node.props.grid_item_template;
  }
  const controls = props.controls;
  if (Array.isArray(controls)) {
    for (const el of controls) {
      if (!isObj(el)) continue;
      let key = Object.keys(el)[0]!;
      const body = el[key];
      if (key.startsWith("$") && !key.includes("@")) key = String(frame.lookup(key));
      const [cname, base] = splitKey(key);
      let b = base;
      if (b && b.startsWith("$")) b = String(frame.lookup(b)).replace(/^@/, "");
      node.children.push(expand(cat, b ? qualify(b, flat.ns) : null, cname, isObj(body) ? body : {}, frame, flat.ns, depth + 1));
    }
  }
  return node;
}

/** 루트 정의 하나를 펼친다. */
export function expandRoot(files: Record<string, string>, root: string): Node {
  const cat = catalogOf(files);
  if (!cat.has(root)) throw new Error(`루트 정의가 없습니다: ${root}`);
  return expand(cat, root, root, {}, null, root.split(".")[0]!);
}

// ---------------------------------------------------------------- 정규화

const TEX = /^textures\/ui\/ffr\//;

/** 이름을 버린 비교용 JSON. 이름 참조는 화면(scope) 안의 위치·순서로 바꾼다. */
export function canonical(root: Node): JsonValue {
  const run = (scopeRoot: Node): JsonValue => {
    // 화면 안 DFS 번호(하위 scope는 따로 센다)
    const pos = new Map<string, number>();
    let n = 0;
    const visit = (x: Node): void => {
      if (!pos.has(x.name)) pos.set(x.name, n);
      n++;
      for (const c of x.children) visit(c);
      for (const v of Object.values(x.vars ?? {})) if (isNode(v)) visit(v);
    };
    visit(scopeRoot);
    const groups = new Map<string, string>();
    const factories = new Map<string, string>();
    const val = (v: JsonValue, key?: string): JsonValue => {
      if (typeof v === "string") {
        if (key === "source_control_name") return pos.has(v) ? `@node${pos.get(v)}` : `@missing:${v}`;
        if (key === "toggle_name") {
          if (!groups.has(v)) groups.set(v, `group${groups.size}`);
          return groups.get(v)!;
        }
        return v.replace(TEX, "textures/ui/jur/");
      }
      if (Array.isArray(v)) return v.map((x) => val(x));
      if (isObj(v)) {
        const out: JsonObject = {};
        for (const k of Object.keys(v).sort()) out[k] = val(v[k]!, k);
        return out;
      }
      return v;
    };
    const conv = (x: Node): JsonValue => {
      const props = val(x.props) as JsonObject;
      if (isObj(props.factory) && typeof props.factory.name === "string") {
        const fname = props.factory.name;
        if (!factories.has(fname)) factories.set(fname, `factory${factories.size}`);
        props.factory = { ...props.factory, name: factories.get(fname)! };
      }
      const out: JsonObject = { props };
      if (x.vanilla) out.vanilla = x.vanilla;
      if (x.vars) {
        const vars: JsonObject = {};
        for (const k of Object.keys(x.vars).sort()) {
          const v = x.vars[k]!;
          vars[k] = isNode(v) ? conv(v) : val(v);
        }
        out.vars = vars;
      }
      if (x.factory) {
        const made: JsonObject = {};
        for (const k of Object.keys(x.factory).sort()) made[k] = run(x.factory[k]!);
        out.factory = made;
      }
      out.children = x.children.map(conv);
      return out;
    };
    return conv(scopeRoot);
  };
  return run(root);
}

const isNode = (v: unknown): v is Node => isObj(v as JsonValue) && Array.isArray((v as Node).children) && typeof (v as Node).name === "string";

export interface Difference { path: string; a: JsonValue | undefined; b: JsonValue | undefined }

/** 두 정규화 트리의 차이 목록(경로, 왼쪽 값, 오른쪽 값). */
export function diffTrees(a: JsonValue | undefined, b: JsonValue | undefined, path = "", out: Difference[] = [], limit = 200): Difference[] {
  if (out.length >= limit) return out;
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) out.push({ path: `${path}.length`, a: a.length, b: b.length });
    for (let i = 0; i < Math.min(a.length, b.length); i++) diffTrees(a[i], b[i], `${path}[${i}]`, out, limit);
    return out;
  }
  if (isObj(a ?? null) && isObj(b ?? null)) {
    const keys = [...new Set([...Object.keys(a as JsonObject), ...Object.keys(b as JsonObject)])].sort();
    for (const k of keys) diffTrees((a as JsonObject)[k], (b as JsonObject)[k], `${path}.${k}`, out, limit);
    return out;
  }
  if (JSON.stringify(a) !== JSON.stringify(b)) out.push({ path, a, b });
  return out;
}

/** 팩토리가 만드는 화면(라우트) id -> 정규화 트리. */
export function routesOf(files: Record<string, string>, root: string): Record<string, JsonValue> {
  const tree = expandRoot(files, root);
  const out: Record<string, JsonValue> = {};
  const find = (x: Node): void => {
    for (const [id, made] of Object.entries(x.factory ?? {})) if (x.props.property_bag !== undefined) out[id] = canonical(made);
    x.children.forEach(find);
  };
  find(tree);
  return out;
}
