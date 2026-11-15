// 자동 배치 해결기: 칸을 읽는 컨트롤(readsSlot)이 항상 합법적인 자리에 오도록 트리를 고쳐 쓴다.
// 입력 노드는 바꾸지 않고 새 노드를 돌려준다. 키 순서는 결정적이다.
import type { Diagnostic } from "../lint.ts";
import { solvePlacement } from "../placement/solve.ts";
import type { ControlNode, JsonObject, JsonValue } from "../types.ts";

const SLOT = "$$slot";
// ENT-*는 레지스트리 id가 아니므로 diag 대신 엔티티 호스트 문서 주소를 직접 붙인다
const ENTITY_URL = "https://presentkim.github.io/json-ui-react/components/entity-host";
const COLLECTION = "container_items";
const SLOT_PROPS = ["#hover_text", "#item_durability_current_amount", "#item_durability_max_amount", "#inventory_stack_count"];

const isObj = (v: unknown): v is JsonObject => typeof v === "object" && v !== null && !Array.isArray(v);

/** 노드를 칸 읽기 컨트롤로 표시한다(새 노드를 돌려준다). */
export function readsSlot(node: ControlNode, slot: number | string): ControlNode {
  return { ...node, props: { ...node.props, [SLOT]: slot } };
}

/** collection_index를 직접 받을 수 없는 컨트롤(label, image; COL-02) */
const noIndex = (p: JsonObject): boolean => p.type === "label" || p.type === "image";

const isReader = (n: ControlNode): boolean => n.props[SLOT] !== undefined;

interface State {
  diags: Diagnostic[];
  strict: boolean;
}

interface Inh {
  /** 부모가 칸 읽기를 받아줄 수 있는 container_items 스택인가 */
  parentOk: boolean;
  /** 조상이 이미 정한 collection_index */
  index: JsonValue | undefined;
  path: string;
}

function push(st: State, rule: string, level: Diagnostic["level"], path: string, message: string): void {
  st.diags.push({ rule, level: level === "error" && !st.strict ? "warn" : level, path, message, url: ENTITY_URL });
}

function hasRenderer(n: ControlNode): boolean {
  return n.children.some((c) => isRenderer(c) || hasRenderer(c));
}
const isRenderer = (n: ControlNode): boolean => n.props.type === "custom" && n.props.renderer === "inventory_item_renderer";

/** 0.1 -> .1 (따옴표 리터럴 밖에서만). */
function fixFloats(expr: string): string {
  return expr
    .split(/('[^']*')/)
    .map((seg, i) => (i % 2 ? seg : seg.replace(/(?<![\w.#$])0(\.\d+)/g, "$1")))
    .join("");
}

function fixBindings(bs: JsonValue, path: string, st: State): JsonValue {
  if (!Array.isArray(bs)) return bs;
  let changed = false;
  const out = bs.map((b) => {
    if (!isObj(b)) return b;
    let nb: JsonObject | undefined;
    for (const [k, v] of Object.entries(b)) {
      if (typeof v !== "string") continue;
      const f = fixFloats(v);
      if (f !== v) (nb ??= { ...b })[k] = f;
    }
    if (nb) changed = true;
    return nb ?? b;
  });
  if (changed) push(st, "EXP-27", "info", path, "실수 리터럴은 .으로 시작해야 한다(0.1은 0으로 계산됨). .1처럼 고쳐 썼다.");
  return changed ? out : bs;
}

/** 이 이미지의 #clip_ratio가 칸을 읽지 않으면 true. */
function clipIsConstant(props: JsonObject): boolean {
  const bag = props.property_bag;
  if (isObj(bag) && "#clip_ratio" in bag) return true;
  const bs = Array.isArray(props.bindings) ? props.bindings.filter(isObj) : [];
  const derived = new Set<string>([...SLOT_PROPS, "CLEAN"]);
  const reads = (s: string): boolean => [...derived].some((d) => s.includes(d));
  for (const b of bs) {
    const type = b.binding_type;
    const target = (b.target_property_name ?? b.binding_name_override) as string | undefined;
    if (type === "collection" || type === "collection_details") {
      if (typeof b.binding_name === "string" && derived.has(b.binding_name)) derived.add(target ?? b.binding_name);
      if (target === "#clip_ratio") return !(typeof b.binding_name === "string" && derived.has(b.binding_name));
    } else {
      const src = typeof b.source_property_name === "string" ? b.source_property_name : "";
      if (target === "#clip_ratio") return !reads(src);
      if (target && reads(src)) derived.add(target);
    }
  }
  return false;
}

/** 엔티티 전용 검사와 고쳐 쓰기(크기 변수, 실수 리터럴, 상수 clip, layer 상한). 배치 감싸기는 solvePlacement가 한다. */
function check(n: ControlNode, path0: string, st: State): ControlNode {
  const path = `${path0}/${n.name}`;
  const props: JsonObject = { ...n.props };
  if (Array.isArray(props.size) && props.size.some((v) => typeof v === "string" && v.startsWith("$"))) {
    push(st, "ENT-SIZE", "error", path, "크기 배열 안에 변수를 넣으면 0이 된다. 배열 전체를 변수로 넘겨야 한다(size: \"$size\").");
  }
  if (props.bindings !== undefined) props.bindings = fixBindings(props.bindings, path, st);
  if (props.type === "image" && props.clip_direction !== undefined && clipIsConstant(props)) {
    push(st, "ENT-CLIP", "error", path, "#clip_ratio가 칸을 읽지 않는 상수라 아무것도 그려지지 않는다. #hover_text, #item_durability_*, #inventory_stack_count 중 하나를 바인딩에서 읽어야 한다.");
  }
  if (typeof props.layer === "number" && props.layer > 50 && hasRenderer(n)) {
    props.layer = 1;
    push(st, "ANI-38", "info", path, `아이템 렌더러 위 조상의 layer는 50을 넘으면 안 된다. layer를 1로 낮췄다.`);
  }
  return { name: n.name, ...(n.def !== undefined ? { def: n.def } : {}), props, children: n.children.map((c) => check(c, path, st)) };
}

export function placeEntityTree(nodes: ControlNode[], opts?: { strict?: boolean }): { nodes: ControlNode[]; diagnostics: Diagnostic[] } {
  const st: State = { diags: [], strict: opts?.strict !== false };
  const checked = nodes.map((n) => check(n, "", st));
  const solved = solvePlacement(checked, { strict: st.strict, collection: COLLECTION, wrapAnyParent: true, slotMarker: SLOT, inPlace: true, offsetBox: false });
  const labelPaths = new Set(solved.diagnostics.filter((d) => d.rule === "COL-02" && d.message.includes("label")).map((d) => d.path));
  for (const d of solved.diagnostics) {
    if (d.rule === "COL-50" && labelPaths.has(d.path)) continue; // label은 ENT-LABEL 하나로 합친다
    // 레지스트리 id를 엔티티 문서 id로 옮긴다(label 인덱스 이동은 ENT-LABEL)
    if (d.rule === "COL-02") {
      if (d.message.includes("label")) st.diags.push({ ...d, rule: "ENT-LABEL", url: ENTITY_URL });
      continue; // image 인덱스 패널은 조용히 덧댄다
    }
    st.diags.push(d);
  }
  return { nodes: solved.nodes, diagnostics: st.diags };
}
