// 엔티티 호스트 상호작용 컴포넌트: 빠른 이동 버튼, 라디오 칸, 서버 선택 격자, 탭, 쪽 넘김, 키 공장 칸, 애니메이션.
// 칸을 읽는 노드는 readsSlot으로 표시만 하고, collection_name 감싸기는 placeEntityTree가 맡는다.
import type { JsonObject, JsonValue, JuiElement, JuiNode } from "../types.ts";
import type { Size } from "../controls/common.ts";
import type { ElementProps } from "../controls/elements.ts";
import { render, toBody } from "../render.ts";
import { bind } from "../bind.ts";
import { E, Expr, lit } from "../expr.ts";
import { Panel, StackPanel, Image, Toggle, Use } from "../controls/components.tsx";
import { radioToggleBody } from "../components/toggle.tsx";
import { fromNode } from "../high/components.tsx";
import { useEntity, type EntityCtx } from "./context.ts";
import { readsSlot } from "./solver.ts";

const COLLECTION = "container_items";
const CLEAN = "(#hover_text - '§o' - '§f' - '§r')";
const hoverText = bind.collection("#hover_text", COLLECTION, { condition: "always" });
/** 바인딩 빌더 결과를 JSON 정의 본문에 넣는다. */
// 바인딩 인터페이스는 인덱스 시그니처가 없어 JsonObject로 좁혀 준다(값은 그대로)
const json = <T extends object>(b: T): JsonObject => b as unknown as JsonObject;
const FULL: Size = ["100%", "100%"];

const view = (source: string, target: `#${string}`) => bind.view(source, target);

/** 요소를 그리고 칸 읽기로 표시한 뒤 다시 요소로 돌려준다. */
function reader(el: JuiElement, slot: number): JuiElement {
  return fromNode(readsSlot(render(el)[0]!, slot));
}

/** 이름으로 칸을 찾고 없으면 count칸을 잡는다. */
function slotsOf(ctx: EntityCtx, slot: string, count: number): number[] {
  const got = ctx.slots.map()[slot] ?? ctx.slots.claim(slot, count);
  if (got.length < count) throw new Error(`슬롯 "${slot}"은 ${got.length}칸뿐인데 ${count}칸이 필요합니다`);
  return got;
}

/** 버튼 이름에 칸 번호를 합친다(같은 이름을 다시 쓰면 합집합). */
function register(ctx: EntityCtx, name: string, slots: number[]): void {
  const prev = ctx.buttons[name] ?? [];
  ctx.buttons[name] = [...prev, ...slots.filter((s) => !prev.includes(s))];
}

/** 네임스페이스에 정의를 한 번만 넣고 `ns.이름` 참조를 돌려준다. */
function once(ctx: EntityCtx, name: string, body: JsonObject): string {
  const taken = Object.keys(ctx.pack.json(ctx.ns.file)).some((k) => k !== "namespace" && k.split("@")[0] === name);
  return taken ? `${ctx.ns.name}.${name}` : ctx.ns.define(name, body);
}

const iconDef = (ctx: EntityCtx): string =>
  once(ctx, "ent_icon", {
    type: "custom", renderer: "inventory_item_renderer", size: "$icon_size", layer: 2,
    "$icon_size|default": [16, 16],
    property_bag: { "#item_id_aux": 0 },
    bindings: [json(bind.collection("#item_id_aux", COLLECTION, { condition: "always" }))],
  });

const textDef = (ctx: EntityCtx): string =>
  once(ctx, "ent_text", {
    type: "label", size: "$text_size", layer: 3, localize: false, color: "$text_color", font_scale_factor: 0.8, text: "#text",
    "$text_size|default": ["100%", "default"], "$text_color|default": [0.95, 0.95, 0.95],
    bindings: [json(hoverText), json(view(CLEAN, "#text"))],
  });

const buttonDef = (ctx: EntityCtx): string =>
  once(ctx, "ent_quick_button", {
    type: "button", layer: 2, default_control: "default", hover_control: "hover", pressed_control: "pressed",
    sound_name: "random.click", sound_volume: 1.0, sound_pitch: 1.0,
    button_mappings: [
      { from_button_id: "button.menu_select", to_button_id: "button.container_auto_place", mapping_type: "pressed", consume_event: false },
      { from_button_id: "button.menu_ok", to_button_id: "button.container_auto_place", mapping_type: "focused", consume_event: false },
    ],
  });

// ---------------------------------------------------------------- QuickButton

export type ButtonFace = "dark" | "light" | "plain" | "none" | { default: string; hover: string; pressed: string };

const FACES = {
  dark: { default: "textures/ui/button_borderless_dark", hover: "textures/ui/button_borderless_darkhover", pressed: "textures/ui/button_borderless_darkpressed" },
  light: { default: "textures/ui/button_borderless_light", hover: "textures/ui/button_borderless_lighthover", pressed: "textures/ui/button_borderless_lightpressed" },
  plain: { default: "textures/ui/White", hover: "textures/ui/White", pressed: "textures/ui/White" },
};

export interface QuickButtonProps {
  /** ctx.buttons에 등록되는 이름. 같은 이름을 다시 쓰면 칸이 합쳐진다. */
  name: string;
  /** 칸 범위 이름. 없으면 index+1칸을 잡는다. */
  slot: string;
  /** 범위 안의 몇 번째 칸인가(기본 0). */
  index?: number;
  size: [number, number] | string;
  face?: ButtonFace;
  /** 칸이 비면 버튼을 숨긴다. */
  hideWhenEmpty?: boolean;
  layer?: number;
  offset?: [number, number];
  /** 각 상태 면 위에 올리는 내용(글자 등). */
  children?: JuiNode;
}

/** 눌러서 스크립트로 가는 유일한 길인 빠른 이동 버튼. 칸에는 스크립트가 표식 아이템을 둔다. */
export function QuickButton(p: QuickButtonProps): JuiElement {
  const ctx = useEntity("QuickButton");
  const index = p.index ?? 0;
  const slot = slotsOf(ctx, p.slot, index + 1)[index]!;
  register(ctx, p.name, [slot]);
  const face = p.face ?? "dark";
  const tex = face === "none" ? undefined : typeof face === "string" ? FACES[face] : face;
  const state = (key: "default" | "hover" | "pressed") => (
    <Panel name={key} size={FULL}>
      {tex ? <Image name="bg" texture={tex[key]} size={FULL} /> : null}
      {p.children}
    </Panel>
  );
  const bindings: JsonObject[] = [json(bind.details(COLLECTION))];
  if (p.hideWhenEmpty) bindings.push(json(hoverText), json(view(new Expr(CLEAN).neq(E.str("")).src, "#visible")));
  const el = (
    <Use
      name={index === 0 ? p.name : `${p.name}${index}`}
      def={buttonDef(ctx)}
      size={p.size}
      layer={p.layer}
      offset={p.offset}
      hover_control={tex ? undefined : "default"}
      pressed_control={tex ? undefined : "default"}
      bindings={bindings}
    >
      {state("default")}
      {tex ? state("hover") : null}
      {tex ? state("pressed") : null}
    </Use>
  );
  return reader(el, slot);
}

// ---------------------------------------------------------------- SelectCells

export interface SelectCellsProps {
  name: string;
  /** 칸 범위 이름(count칸). */
  slot: string;
  count: number;
  /** 고른 칸의 상세. i는 칸 번호(0부터). 고른 칸의 내용을 그대로 읽는다. */
  detail?: (i: number) => JuiNode;
  /** 상세가 놓일 고정 자리(가로줄 왼쪽 위 기준). 기본: 줄 오른쪽 옆. */
  detailAt?: [number, number];
}

const CELL = 18;

const cellBg = () => <Image name="bg" texture="textures/ui/cell_image" size={FULL} />;

/** 클라이언트만 도는 라디오 칸 줄. 고른 칸은 테두리가 생기고 상세가 항상 같은 자리에 뜬다. */
export function SelectCells(p: SelectCellsProps): JuiElement {
  const ctx = useEntity("SelectCells");
  const slots = slotsOf(ctx, p.slot, p.count);
  const icon = iconDef(ctx);
  const group = `${ctx.ns.name}_${p.name}`;
  const [dx, dy] = p.detailAt ?? [p.count * CELL + 4, 0];
  const cells = Array.from({ length: p.count }, (_, i) => {
    const off = (
      <Panel name="off" size={FULL}>
        {cellBg()}
        <Use name="icon" def={icon} />
      </Panel>
    );
    const offHover = (
      <Panel name="off_hover" size={FULL}>
        {cellBg()}
        <Use name="icon" def={icon} />
      </Panel>
    );
    const on = (
      <Panel name="on" size={FULL}>
        {cellBg()}
        <Use name="icon" def={icon} />
        <Image name="sel" layer={4} texture="textures/ui/focus_border_white" size={FULL} color={[1, 0.85, 0.1]} />
        {p.detail ? (
          <Panel name="detail" layer={20} anchor_from="top_left" anchor_to="top_left" offset={[dx - i * CELL, dy]}>
            {p.detail(i)}
          </Panel>
        ) : null}
      </Panel>
    );
    const body = radioToggleBody({ group, size: [CELL, CELL], forcedIndex: i, defaultSelected: -1, extra: { layer: 1 } });
    // 토글 본문은 radioToggleBody가 만든 속성 묶음이라 타입을 좁힐 수 없다
    return reader(<Toggle {...({ name: `${p.name}${i}`, ...body, children: [on, off, offHover] } as ElementProps<"toggle">)} />, slots[i]!);
  });
  return (
    <StackPanel name={p.name} orientation="horizontal" size={[p.count * CELL, CELL]} anchor_from="top_left" anchor_to="top_left">
      {cells}
    </StackPanel>
  );
}

// ---------------------------------------------------------------- PickGrid

export interface PickGridProps {
  name: string;
  /** 아이콘을 보이는 칸 범위 이름(rows*cols칸). */
  cells: string;
  /** 선택 버튼 칸 범위 이름(rows*cols칸). cells와 달라야 한다. */
  picks: string;
  rows: number;
  cols: number;
  /** 서버가 뽑힌 칸 lore에 넣는 글자. 이 글자가 있으면 테두리를 그린다. */
  chosen: string;
}

/** 서버가 선택을 쥔 격자: 아이콘 칸 위에 투명 버튼 칸을 덮는다. 둘은 다른 칸이어야 한다(안 그러면 빈 칸일 때 줄이 접힌다). */
export function PickGrid(p: PickGridProps): JuiElement {
  const ctx = useEntity("PickGrid");
  if (p.cells === p.picks) throw new Error(`PickGrid "${p.name}": cells와 picks는 서로 다른 칸 범위여야 합니다`);
  const n = p.rows * p.cols;
  const cells = slotsOf(ctx, p.cells, n);
  slotsOf(ctx, p.picks, n);
  const icon = iconDef(ctx);
  const rows = Array.from({ length: p.rows }, (_, r) => (
    <StackPanel name={`${p.name}_r${r}`} orientation="horizontal" size={[p.cols * CELL, CELL]}>
      {Array.from({ length: p.cols }, (_, c) => {
        const k = r * p.cols + c;
        const look = (
          <Panel
            name="look"
            size={[CELL, CELL]}
            bindings={[hoverText, view(E.prop("#hover_text").neq(E.str("")).src, "#visible")]}
          >
            {cellBg()}
            <Use name="icon" def={icon} />
            <Panel
              name="chosen"
              size={FULL}
              layer={1}
              bindings={[hoverText, view(E.prop("#hover_text").strip(p.chosen).eq(E.prop("#hover_text")).not().src, "#visible")]}
            >
              <Image name="sel" layer={4} texture="textures/ui/focus_border_white" size={FULL} color={[1, 0.85, 0.1]} />
            </Panel>
          </Panel>
        );
        return (
          <Panel name={`${p.name}_c${k}`} size={[CELL, CELL]}>
            {reader(look, cells[k]!)}
            <QuickButton name={p.name} slot={p.picks} index={k} size={[CELL, CELL]} face="none" layer={6} />
          </Panel>
        );
      })}
    </StackPanel>
  ));
  return (
    <StackPanel name={p.name} orientation="vertical" size={[p.cols * CELL, p.rows * CELL]} anchor_from="top_left" anchor_to="top_left">
      {rows}
    </StackPanel>
  );
}

// ---------------------------------------------------------------- EntityTabs

export interface EntityTabsProps {
  name: string;
  /** 탭 머리 칸 범위 이름(탭 수만큼). 칸의 아이템과 이름이 머리에 보인다. */
  slot: string;
  tabs: { children?: JuiNode }[];
}

const TAB_W = 96;
const TAB_H = 22;

/** 탭 줄 + 판. 첫 탭이 기본으로 켜져 있다. 판은 마지막 탭 토글의 상태로 보이고 숨는다. */
export function EntityTabs(p: EntityTabsProps): JuiElement {
  const ctx = useEntity("EntityTabs");
  const n = p.tabs.length;
  if (n < 2) throw new Error(`EntityTabs "${p.name}": 탭은 2개 이상이어야 합니다`);
  const slots = slotsOf(ctx, p.slot, n);
  const icon = iconDef(ctx);
  const text = textDef(ctx);
  const group = `${ctx.ns.name}_${p.name}`;
  const face = (key: string, tex: string, color: [number, number, number]) => (
    <Panel name={key} size={FULL}>
      <Image name="bg" texture={tex} size={["100%", "100% + 6px"]} anchor_from="top_left" anchor_to="top_left" />
      <Use name="icon" def={icon} {...{ $icon_size: [12, 12] }} offset={[4, 0]} anchor_from="left_middle" anchor_to="left_middle" />
      <Use name="text" def={text} {...{ $text_color: color }} size={["100% - 20px", "default"]} offset={[19, 0]} anchor_from="left_middle" anchor_to="left_middle" />
    </Panel>
  );
  const heads = p.tabs.map((_, i) => {
    const body = radioToggleBody({ group, size: [TAB_W, TAB_H], forcedIndex: i, defaultSelected: 0, extra: { layer: 1, toggle_default_state: i === 0 } });
    const on = face("on", "textures/ui/TabTopFront", [0.2, 0.2, 0.2]);
    const off = face("off", "textures/ui/TabTopBack", [0.95, 0.95, 0.95]);
    const hover = face("off_hover", "textures/ui/TabTopBackHover", [0.95, 0.95, 0.95]);
    // 토글 본문은 radioToggleBody가 만든 속성 묶음이라 타입을 좁힐 수 없다
    return reader(<Toggle {...({ name: `${p.name}_t${i}`, ...body, children: [on, off, hover] } as ElementProps<"toggle">)} />, slots[i]!);
  });
  const last = `${p.name}_t${n - 1}`;
  const paneBindings = (i: number): JsonObject[] => {
    const ctl = (name: string, prop: `#${string}`): JsonObject => json(bind.view("#toggle_state", prop, { control: name, condition: "always" }));
    if (n === 2) {
      return [json(bind.view(i === 0 ? E.not(E.prop("#toggle_state")).src : "#toggle_state", "#visible", { control: last, condition: "always" }))];
    }
    if (i > 0) return [ctl(`${p.name}_t${i}`, "#visible")];
    // 첫 탭: 나머지 탭이 모두 꺼졌을 때 보인다.
    // 템플릿 문자열을 `#...` 리터럴 타입으로 좁힌다(타입 전용)
    const others = Array.from({ length: n - 1 }, (_, j) => `#s${j + 1}` as const);
    return [...others.map((o, j) => ctl(`${p.name}_t${j + 1}`, o)), json(view(E.not(others.map((o) => E.prop(o)).reduce((a, b) => a.or(b))).src, "#visible"))];
  };
  const panes = p.tabs.map((t, i) => (
    <Panel name={`${p.name}_p${i}`} size={FULL} bindings={paneBindings(i)}>
      {t.children}
    </Panel>
  ));
  return (
    <Panel name={p.name} size={FULL} anchor_from="top_left" anchor_to="top_left">
      <StackPanel name={`${p.name}_bar`} orientation="horizontal" size={[TAB_W * n, TAB_H]} anchor_from="top_left" anchor_to="top_left">
        {heads}
      </StackPanel>
      <Panel name={`${p.name}_panes`} size={["100%", `100% - ${TAB_H}px`]} offset={[0, TAB_H]} anchor_from="top_left" anchor_to="top_left">
        {panes}
      </Panel>
    </Panel>
  );
}

// ---------------------------------------------------------------- EntityPager

export interface EntityPagerProps {
  name: string;
  /** 이전/다음 두 칸 범위 이름. */
  slot: string;
}

const arrow = (tex: string) => <Image name="arrow" texture={tex} size={[10, 10]} layer={3} anchor_from="center" anchor_to="center" />;

/** 이전/다음 쪽 넘김 줄(144x18): 버튼 칸 + 가운데 빈 틈 + 버튼 칸. */
export function EntityPager(p: EntityPagerProps): JuiElement {
  const ctx = useEntity("EntityPager");
  slotsOf(ctx, p.slot, 2);
  return (
    <StackPanel name={p.name} orientation="horizontal" size={[144, CELL]} anchor_from="top_left" anchor_to="top_left">
      <QuickButton name={p.name} slot={p.slot} index={0} size={[CELL, CELL]}>
        {arrow("textures/ui/arrowLeft")}
      </QuickButton>
      <Panel name="gap" size={["fill", CELL]} />
      <QuickButton name={p.name} slot={p.slot} index={1} size={[CELL, CELL]}>
        {arrow("textures/ui/arrowRight")}
      </QuickButton>
    </StackPanel>
  );
}

// ---------------------------------------------------------------- KeyedCell

export interface KeyedCellProps {
  name: string;
  slot: string;
  index?: number;
  size: [number, number];
  /** 칸 글자(정리한 이름)가 키와 같을 때 그 정의로 바뀐다. 문자열이면 이미 있는 정의 참조(여러 키가 한 정의를 쓸 때). */
  variants: Record<string, JuiNode | string>;
}

/** 키 공장 칸: 키가 바뀌면 컨트롤이 새로 만들어져 애니메이션이 다시 돈다. 빈 칸은 "#k"(빈 목록)로 아무것도 안 만든다. */
export function KeyedCell(p: KeyedCellProps): JuiElement {
  const ctx = useEntity("KeyedCell");
  const index = p.index ?? 0;
  const slot = slotsOf(ctx, p.slot, index + 1)[index]!;
  const ids: Record<string, string> = {};
  const bag: Record<string, JsonValue> = { "#k": [] };
  for (const [key, v] of Object.entries(p.variants)) {
    let ref: string;
    if (typeof v === "string") ref = v.startsWith("@") ? v : v.includes(".") ? `@${v}` : `@${ctx.ns.name}.${v}`;
    else ref = `@${once(ctx, `${p.name}_${key}`, renderBody(v))}`;
    ids[key] = ref;
    bag[`#k${key}`] = [key];
  }
  const factoryName = `${ctx.ns.name}_${p.name}`;
  const el = (
    <StackPanel
      name={p.name}
      size={p.size}
      factory={{ name: factoryName, control_ids: ids }}
      property_bag={bag}
      bindings={[hoverText, bind.view(`(${lit("#k")} + ${CLEAN})`, "#collection_length", { condition: "always" })]}
    />
  );
  return reader(el, slot);
}

function renderBody(v: JuiNode): JsonObject {
  const nodes = render(v);
  if (nodes.length !== 1) throw new Error(`KeyedCell 변형은 요소 1개여야 합니다(렌더 결과 ${nodes.length}개)`);
  return toBody(nodes[0]!);
}

// ---------------------------------------------------------------- anim

/** 애니메이션 정의를 네임스페이스에 한 번 넣고 `anims`/`next`에 쓰는 `@ns.이름` 참조를 돌려준다. */
export function anim(name: string, body: JsonObject): string {
  const ctx = useEntity("anim");
  return `@${once(ctx, name, body)}`;
}
