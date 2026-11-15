// 엔티티 상자 칸의 데이터를 읽어 그리는 부품들(위치 At, 글자, 아이콘, 개수, 질감, 막대, 조건부 표시).
// 칸 이름은 useEntity().slots로 한 번만 잡고(claim), 같은 이름을 다시 쓰면 같은 칸을 가리킨다.
// 칸을 읽는 노드에는 readsSlot으로 표시만 한다. collection_name 감싸기와 collection_index 배치는
// buildEntityScreens가 돌리는 placeEntityTree가 맡는다.
//
// 글자 주의(EXP-30/44): 칸 이름(#hover_text)이 숫자로 시작하면 식이 숫자로 읽어 버린다.
// 서버가 숫자로 시작하는 글자 앞에 색 접두사(`§r` 등)를 붙여야 하며, 런타임 도우미 text()가 `§r`을 붙인다.
import type { ControlNode, JsonObject, JuiElement, JuiNode } from "../types.ts";
import { render } from "../render.ts";
import { lit, lacks } from "../expr.ts";
import { fromNode } from "../high/components.tsx";
import { useEntity } from "./context.ts";
import { readsSlot } from "./solver.ts";

/** 서식 코드(§o, §f, §r)를 뺀 칸 이름. */
export const CLEAN = "(#hover_text - '§o' - '§f' - '§r')";
const COLLECTION = "container_items";

type Size = number | [number, number] | string | (number | string)[];
const toSize = (s: Size): JsonObject[string] => (typeof s === "number" ? [s, s] : (s as JsonObject[string]));

/** name의 칸 묶음을 잡거나(처음) 다시 찾는다. */
function slotsOf(who: string, name: string, count = 1): number[] {
  const ctx = useEntity(who);
  return ctx.slots.map()[name] ?? ctx.slots.claim(name, count);
}

function pick(who: string, name: string, index: number | undefined): number {
  const slots = slotsOf(who, name);
  const i = index ?? 0;
  const s = slots[i];
  if (s === undefined) throw new Error(`<${who}> 칸 "${name}"에 ${i}번째 칸이 없습니다(${slots.length}칸)`);
  return s;
}

const collect = (prop: string): JsonObject => ({
  binding_type: "collection",
  binding_collection_name: COLLECTION,
  binding_name: prop,
  binding_condition: "always",
});
const view = (source: string, target: string): JsonObject => ({
  binding_type: "view",
  source_property_name: source,
  target_property_name: target,
});

/** JSX 요소 하나를 만들어 노드로 바꾸고 칸 읽기 표시를 달아 다시 요소로 돌려준다. */
function reader(el: JuiElement, slot: number): JuiElement {
  const [node] = render(el) as [ControlNode];
  return fromNode(readsSlot(node, slot));
}

function defined<T extends object>(o: T): T {
  return Object.fromEntries(Object.entries(o).filter(([, v]) => v !== undefined)) as T;
}

// ---------------------------------------------------------------- At

export interface AtProps {
  name: string;
  x: number;
  y: number;
  w?: number;
  h?: number;
  layer?: number;
  anchor?: string;
  children?: JuiNode;
}

/** 위치 상자: panel에 offset [x, y]를 준다. 크기를 안 주면 부모 크기를 따른다. */
export function At(p: AtProps): JuiElement {
  const size = p.w !== undefined || p.h !== undefined ? [p.w ?? "100%", p.h ?? "100%"] : undefined;
  const anchor = p.anchor ?? "top_left";
  return (
    <panel {...defined({ name: p.name, size, offset: [p.x, p.y], anchor_from: anchor, anchor_to: anchor, layer: p.layer })}>
      {p.children}
    </panel>
  );
}

// ---------------------------------------------------------------- 글자

export interface TextStyle {
  size?: Size;
  scale?: number;
  align?: string;
  color?: JsonObject[string];
  shadow?: boolean;
  layer?: number;
  /** anchor_from과 anchor_to에 같이 준다. */
  anchor?: string;
  offset?: [number, number];
}

const textProps = (p: TextStyle): JsonObject =>
  defined({
    size: p.size === undefined ? undefined : toSize(p.size),
    font_scale_factor: p.scale,
    text_alignment: p.align,
    color: p.color,
    shadow: p.shadow,
    layer: p.layer,
    anchor_from: p.anchor,
    anchor_to: p.anchor,
    offset: p.offset,
  }) as JsonObject;

export interface LabelProps extends TextStyle {
  name: string;
  text: string;
}

/** 고정 글자. */
export function Label(p: LabelProps): JuiElement {
  return <label {...{ name: p.name, text: p.text, localize: false, ...textProps(p) }} />;
}

export interface SlotTextProps extends TextStyle {
  name: string;
  slot: string;
  index?: number;
  /** true면 서식 코드를 지우지 않고 #hover_text를 그대로 쓴다. */
  raw?: boolean;
}

/**
 * 칸 이름을 글자로 그린다. 낮춤: label "#text" + collection #hover_text + view(CLEAN | #hover_text) -> #text.
 * 숫자로 시작하는 글자는 서버가 색 접두사를 붙여야 한다(위 머리 주석).
 */
export function SlotText(p: SlotTextProps): JuiElement {
  const slot = pick("SlotText", p.slot, p.index);
  return reader(
    <label {...{ name: p.name, text: "#text", localize: false, ...textProps(p), bindings: [collect("#hover_text"), view(p.raw ? "#hover_text" : CLEAN, "#text")] }} />,
    slot,
  );
}

export interface SlotCountProps {
  name: string;
  slot: string;
  index?: number;
  size?: Size;
  layer?: number;
}

/** 쌓인 개수를 오른쪽 아래에 흰 그림자 글자로 그린다. */
export function SlotCount(p: SlotCountProps): JuiElement {
  const slot = pick("SlotCount", p.slot, p.index);
  const props = {
    name: p.name,
    text: "#text",
    localize: false,
    shadow: true,
    color: [1, 1, 1],
    anchor_from: "bottom_right",
    anchor_to: "bottom_right",
    text_alignment: "right",
    ...defined({ size: p.size === undefined ? undefined : toSize(p.size), layer: p.layer }),
    bindings: [{ ...collect("#inventory_stack_count"), binding_name_override: "#text" }],
  };
  return reader(<label {...props} />, slot);
}

// ---------------------------------------------------------------- 그림

export interface SlotIconProps {
  name: string;
  slot: string;
  index?: number;
  size?: number | [number, number] | string;
}

/** 칸의 아이템 아이콘. 크기 배열 안에 변수를 섞지 말고 배열 변수를 통째로 넘겨야 한다. */
export function SlotIcon(p: SlotIconProps): JuiElement {
  const slot = pick("SlotIcon", p.slot, p.index);
  return reader(
    <custom
      {...{
        name: p.name,
        renderer: "inventory_item_renderer",
        size: p.size === undefined ? [16, 16] : toSize(p.size),
        layer: 2,
        property_bag: { "#item_id_aux": 0 },
        bindings: [collect("#item_id_aux")],
      }}
    />,
    slot,
  );
}

export interface SlotTextureProps {
  name: string;
  slot: string;
  index?: number;
  /** 질감 경로 앞부분. 칸 이름(서식 제거)을 뒤에 붙인다. */
  prefix: string;
  size: Size;
}

/** 칸 이름으로 질감을 고르는 image. */
export function SlotTexture(p: SlotTextureProps): JuiElement {
  const slot = pick("SlotTexture", p.slot, p.index);
  return reader(
    <image {...{ name: p.name, size: toSize(p.size), bindings: [collect("#hover_text"), view(`(${lit(p.prefix)} + ${CLEAN})`, "#texture")] }} />,
    slot,
  );
}

export interface SlotBarProps {
  name: string;
  slot: string;
  index?: number;
  size: Size;
  source?: "name" | "durability";
  /** 가득 찬 값. 칸 값을 1/per 배 해서 1에서 뺀다. */
  per?: number;
  texture?: string;
  color?: JsonObject[string];
}

/** 실수 리터럴은 .으로 시작해야 한다(0.1은 0으로 계산됨, EXP-27). */
function mult(per: number): string {
  if (!Number.isFinite(per) || per <= 0) throw new Error(`SlotBar: per는 0보다 큰 수여야 합니다(${per})`);
  const s = String(1 / per);
  if (/e/i.test(s)) throw new Error(`SlotBar: per ${per}의 역수를 리터럴로 쓸 수 없습니다(${s})`);
  return s.replace(/^0\./, ".");
}

/**
 * 칸 값으로 줄어드는 막대. 낮춤: image(clip_direction left) + 칸 값을 읽는 view -> #clip_ratio.
 * #clip_ratio가 칸을 읽지 않으면 아무것도 그려지지 않는다.
 */
export function SlotBar(p: SlotBarProps): JuiElement {
  const slot = pick("SlotBar", p.slot, p.index);
  const dur = p.source === "durability";
  const m = mult(p.per ?? 10);
  const bindings = dur
    ? [collect("#item_durability_current_amount"), view(`(1 - (#item_durability_current_amount * ${m}))`, "#clip_ratio")]
    : [collect("#hover_text"), view(`(1 - (${CLEAN} * ${m}))`, "#clip_ratio")];
  return reader(
    <image {...{ name: p.name, size: toSize(p.size), ...defined({ texture: p.texture, color: p.color }), clip_direction: "left", clip_pixelperfect: false, bindings }} />,
    slot,
  );
}

// ---------------------------------------------------------------- 조건부 표시

export type When = { contains: string } | { lacks: string } | "filled" | "empty";

export interface ShowWhenProps {
  name: string;
  slot: string;
  index?: number;
  when: When;
  children?: JuiNode;
}

function cond(when: When): string {
  if (when === "filled") return "(not (#hover_text = ''))";
  if (when === "empty") return "(#hover_text = '')";
  if ("contains" in when) return `(not ((#hover_text - ${lit(when.contains)}) = #hover_text))`;
  return lacks("#hover_text", when.lacks);
}

/** 칸 이름 조건이 맞을 때만 자식을 보인다(#visible). 조건 값은 lit()이 검증한다. */
export function ShowWhen(p: ShowWhenProps): JuiElement {
  const slot = pick("ShowWhen", p.slot, p.index);
  const expr = cond(p.when);
  return reader(
    <panel {...{ name: p.name, bindings: [collect("#hover_text"), view(expr, "#visible")] }}>{p.children}</panel>,
    slot,
  );
}
