// 자동 배치 해결기: 칸을 읽는 컨트롤(readsSlot)이 항상 합법적인 자리에 오도록 트리를 고쳐 쓴다.
// 입력 노드는 바꾸지 않고 새 노드를 돌려준다. 키 순서는 결정적이다.
import type { Diagnostic } from "../lint.ts";
import type { ControlNode, JsonObject, JsonValue } from "../types.ts";

const SLOT = "$$slot";
const COLLECTION = "container_items";
const SLOT_PROPS = ["#hover_text", "#item_durability_current_amount", "#item_durability_max_amount", "#inventory_stack_count"];

const isObj = (v: unknown): v is JsonObject => typeof v === "object" && v !== null && !Array.isArray(v);

/** 노드를 칸 읽기 컨트롤로 표시한다(새 노드를 돌려준다). */
export function readsSlot(node: ControlNode, slot: number | string): ControlNode {
  return { ...node, props: { ...node.props, [SLOT]: slot } };
}

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
  st.diags.push({ rule, level: level === "error" && !st.strict ? "warn" : level, path, message });
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

interface Wrapped {
  /** 트리에 들어가는 가장 바깥 노드 */
  wrapper: ControlNode;
  /** inner를 자식으로 받는 노드(wrapper 자신이거나 그 안의 인덱스 패널) */
  holder: ControlNode;
  inner: ControlNode;
}

const MOVED = ["size", "offset", "anchor_from", "anchor_to", "layer"];

/**
 * 칸 읽기 노드를 감싼다. label은 collection_index를 가질 수 없으므로(COL-02) 인덱스를 패널에 주고 label은 인덱스 없이 안에 둔다.
 * 부모가 이미 container_items 스택이면 인덱스 패널만 두고, 아니면 container_items 세로 stack_panel > 인덱스 패널로 감싼다.
 * 인덱스 패널의 부모는 늘 스택이라 COL-50도 나지 않는다.
 */
function wrapperFor(n: ControlNode, props: JsonObject, parentOk: boolean): Wrapped {
  const isLabel = props.type === "label";
  const inner: JsonObject = {};
  for (const [k, v] of Object.entries(props)) if (k !== "offset" && k !== "anchor_from" && k !== "anchor_to") inner[k] = v;
  delete inner[SLOT];
  const innerNode: ControlNode = { name: n.name, ...(n.def !== undefined ? { def: n.def } : {}), props: inner, children: [] };
  if (!isLabel) {
    const w: JsonObject = { type: "stack_panel", orientation: "vertical", collection_name: COLLECTION };
    for (const k of MOVED) if (props[k] !== undefined) w[k] = props[k];
    inner.collection_index = props[SLOT]!;
    const wrapper: ControlNode = { name: `${n.name}_slot`, props: w, children: [] };
    return { wrapper, holder: wrapper, inner: innerNode };
  }
  const idx: JsonObject = { type: "panel", collection_index: props[SLOT]! };
  if (parentOk) {
    for (const k of MOVED) if (props[k] !== undefined) idx[k] = props[k];
    const wrapper: ControlNode = { name: `${n.name}_slot`, props: idx, children: [] };
    return { wrapper, holder: wrapper, inner: innerNode };
  }
  const w: JsonObject = { type: "stack_panel", orientation: "vertical", collection_name: COLLECTION };
  for (const k of MOVED) if (props[k] !== undefined) w[k] = props[k];
  if (props.size !== undefined) idx.size = props.size;
  const holder: ControlNode = { name: `${n.name}_idx`, props: idx, children: [] };
  const wrapper: ControlNode = { name: `${n.name}_slot`, props: w, children: [holder] };
  return { wrapper, holder, inner: innerNode };
}

function place(n: ControlNode, inh: Inh, st: State): ControlNode {
  const path = `${inh.path}/${n.name}`;
  let props: JsonObject = { ...n.props };

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

  // 자식이 모두 칸 읽기인 스택은 제자리에서 container_items를 받는다.
  if (props.type === "stack_panel" && props.collection_name === undefined && n.children.length > 0 && n.children.every(isReader)) {
    props.collection_name = COLLECTION;
  }
  const slot = props[SLOT];
  const ownIndex = props.collection_index;
  let wrapped: Wrapped | undefined;
  let index = inh.index;
  if (slot !== undefined) {
    if (inh.index !== undefined && inh.index === slot) {
      delete props[SLOT];
    } else if (inh.parentOk && props.type !== "label") {
      props.collection_index = slot;
      delete props[SLOT];
      index = slot;
    } else {
      const isLabel = props.type === "label";
      push(
        st,
        isLabel ? "ENT-LABEL" : "COL-50",
        "info",
        path,
        isLabel
          ? "label에는 collection_index를 직접 줄 수 없다. 패널로 감싸 패널에 인덱스를 줬다."
          : "부모가 container_items 스택이 아니면 칸마다 다른 인덱스를 줘도 모두 0번을 읽는다. 칸마다 container_items 세로 stack_panel로 감쌌다.",
      );
      wrapped = wrapperFor(n, props, inh.parentOk);
      props = wrapped.inner.props;
      index = slot;
    }
  } else if (ownIndex !== undefined) index = ownIndex;
  delete props[SLOT];

  const parentOk = props.type === "stack_panel" && props.collection_name === COLLECTION;
  const kids = n.children.map((c) => place(c, { parentOk, index, path }, st));
  const node: ControlNode = { name: n.name, ...(n.def !== undefined ? { def: n.def } : {}), props, children: kids };
  if (!wrapped) return node;
  wrapped.inner.props = props;
  wrapped.inner.children = kids;
  wrapped.holder.children = [wrapped.inner];
  if (props.layer !== undefined && wrapped.wrapper.props.layer !== undefined) wrapped.wrapper.props.layer = props.layer;
  return wrapped.wrapper;
}

export function placeEntityTree(nodes: ControlNode[], opts?: { strict?: boolean }): { nodes: ControlNode[]; diagnostics: Diagnostic[] } {
  const st: State = { diags: [], strict: opts?.strict !== false };
  const out = nodes.map((n) => place(n, { parentOk: false, index: undefined, path: "" }, st));
  return { nodes: out, diagnostics: st.diags };
}
