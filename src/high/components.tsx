// 고수준 컴포넌트: Screen, ButtonList, Tabs/Tab, SlotGrid, VirtualList.
// 버튼 번호는 문맥의 slots에서 자동으로 받는다(종류 순서 PHASE, 같은 종류는 렌더 순서). 저수준 컴포넌트(components/*)로 낮춘다.
// 상세가 딸린 칸 격자와 상세 부품은 record.tsx, 판 부품(Pager, Placeholder)은 pane.tsx.
import type { ControlNode, JsonObject, JuiElement, JuiNode } from "../types.ts";
import { render, toBody } from "../render.ts";
import { SlotGrid as LowSlotGrid, VirtualList as LowVirtualList } from "../components/grid.tsx";
import { TabBar } from "../components/toggle.tsx";
import { useTabs, type TabMode } from "../hooks.ts";
import { view } from "../bind.ts";
import { GEOM, PHASE, TOP_LEFT, footerBar, key, paneSize, ref, useScreen, type ScreenLayout } from "./context.ts";

/** buildScreens가 Screen 요소를 알아보는 표식(모듈 사본이 둘이어도 같은 값). */
export const SCREEN = Symbol.for("json-ui-react.high.Screen");
const TAB = Symbol.for("json-ui-react.high.Tab");

export interface ScreenProps {
  /** 행동팩에서 openScreen(player, id, ...)으로 부르는 이름. */
  id: string;
  /** 창 위에 보이는 제목(정적 라벨). */
  title: string;
  /** "single"(기본): 판 하나. "split": 왼쪽 목록 + 오른쪽 상세 판. */
  layout?: ScreenLayout;
  children?: JuiNode;
}

/** 화면 하나. buildScreens에 넘기는 최상위 요소로만 쓴다. */
export function Screen(_p: ScreenProps): JuiElement {
  throw new Error("<Screen>은 buildScreens([...])에 넘겨야 합니다(다른 요소 안에 둘 수 없음)");
}
(Screen as unknown as Record<symbol, boolean>)[SCREEN] = true;

export const isScreen = (el: unknown): el is JuiElement & { props: ScreenProps } =>
  typeof el === "object" && el !== null && typeof (el as JuiElement).type === "function" &&
  (((el as JuiElement).type as unknown as Record<symbol, boolean>)[SCREEN] === true);

const isTab = (el: unknown): el is JuiElement & { props: TabProps } =>
  typeof el === "object" && el !== null && typeof (el as JuiElement).type === "function" &&
  (((el as JuiElement).type as unknown as Record<symbol, boolean>)[TAB] === true);

/** ControlNode를 다시 JSX 요소로(render가 같은 노드를 만든다). 낮춘 결과를 부모 안에 그대로 끼울 때 쓴다. */
export function fromNode(node: ControlNode): JuiElement {
  const { type, ...rest } = node.props;
  const props: Record<string, unknown> = { name: node.name, ...rest, children: node.children.map(fromNode) };
  if (node.def) props.def = node.def;
  return { type: typeof type === "string" ? type : "use", props };
}

/** 노드 여러 개를 판 하나로 묶는다. 하나면 그대로 둔다. */
export function onePane(nodes: ControlNode[], name: string, size: [number, number]): ControlNode {
  if (nodes.length === 1) return nodes[0]!;
  return { name, props: { type: "panel", size, ...TOP_LEFT }, children: nodes };
}

export function addBinding(node: ControlNode, b: JsonObject): ControlNode {
  const prev = Array.isArray(node.props.bindings) ? node.props.bindings : [];
  return { ...node, props: { ...node.props, bindings: [...prev, b] } };
}

// ---------------------------------------------------------------- ButtonList

export interface ButtonListProps {
  /** 서버 데이터 키이자 응답 decode의 name. */
  name: string;
  /** 버튼 수. 판 높이 128 안에 5개까지. */
  count: number;
}

const MAX_BUTTONS = Math.floor(GEOM.single[1] / GEOM.buttonRow);

/** 아이콘 + 글자 버튼 세로 목록. 판 왼쪽 위에 붙는다. */
export function ButtonList(p: ButtonListProps): JuiElement {
  const ctx = useScreen("ButtonList");
  if (!Number.isInteger(p.count) || p.count <= 0 || p.count > MAX_BUTTONS) {
    throw new Error(`ButtonList "${p.name}": count는 1..${MAX_BUTTONS}이어야 합니다(판 높이 ${GEOM.single[1]}). 긴 목록은 VirtualList를 쓰세요`);
  }
  const range = ctx.slots.range(p.name, p.count, PHASE.buttons);
  const [w] = GEOM.button;
  return (
    <LowSlotGrid
      name={p.name}
      size={[w, p.count * GEOM.buttonRow]}
      rows={p.count}
      cols={1}
      rowHeight={GEOM.buttonRow}
      rowWidth={w}
      props={TOP_LEFT}
      cell={(pos) => <use name={`b${pos}`} def={ref(ctx, "btn")} collection_index={range.at(pos)} />}
    />
  );
}

// ---------------------------------------------------------------- Tabs

export interface TabProps {
  /** 서버 데이터에 이 탭 글자가 없을 때 보낼 기본 글자. */
  label?: string;
  children?: JuiNode;
}

/** 탭 하나. <Tabs> 바로 아래에만 둔다. */
export function Tab(_p: TabProps): JuiElement {
  throw new Error("<Tab>은 <Tabs> 바로 아래에만 쓸 수 있습니다");
}
(Tab as unknown as Record<symbol, boolean>)[TAB] = true;

export interface TabsProps {
  /** 탭 버튼들의 서버 데이터 키(탭 글자·아이콘). */
  name: string;
  /** inside: 켠 탭 얼굴 안에 내용(B). follow: 내용이 토글 상태를 따라 보임(C). lazy: 탭을 처음 고를 때 팩토리로 만듦(D, 첫 탭은 미리). */
  mode: TabMode;
  children?: JuiNode;
}

function flat(n: JuiNode, out: unknown[] = []): unknown[] {
  if (Array.isArray(n)) for (const x of n) flat(x, out);
  else if (n !== null && n !== undefined && n !== false) out.push(n);
  return out;
}

/** 클라이언트 탭. 탭 줄은 창 위에, 내용은 판에 놓인다. 화면마다 하나. */
export function Tabs(p: TabsProps): JuiElement {
  const ctx = useScreen("Tabs");
  if (ctx.tabsDef) throw new Error(`화면 "${ctx.id}": <Tabs>는 화면마다 하나만 쓸 수 있습니다`);
  const tabs = flat(p.children);
  if (tabs.length === 0) throw new Error(`Tabs "${p.name}": <Tab>이 없습니다`);
  for (const t of tabs) if (!isTab(t)) throw new Error(`Tabs "${p.name}": 자식은 <Tab>만 쓸 수 있습니다`);
  const items = tabs as (JuiElement & { props: TabProps })[];
  const n = items.length;
  const N = ctx.ns.name;
  // 탭 토글 이름은 `<ns>_t<i>`(테마 tab_toggle의 라디오 그룹 `<ns>_tabs`).
  const hook = useTabs({ group: `${N}_tabs`, mode: p.mode, count: n, firstIndex: 0 });
  const range = ctx.slots.range(p.name, n, PHASE.buttons);
  if (items.some((t) => t.props.label !== undefined)) ctx.defaults[p.name] = items.map((t) => t.props.label ?? null);

  // 탭 순서대로 내용을 낮춘다(버튼 번호: 같은 종류 안에서 탭 버튼 다음에 탭 0 내용, 탭 1 내용, ...).
  // 탭 안의 판 아래 줄(Pager 등)은 따로 모은다.
  const size = paneSize(ctx);
  const outerFooter = ctx.footer;
  const contents = items.map((t) => {
    ctx.footer = [];
    try {
      return { nodes: render(t.props.children ?? null), footer: ctx.footer };
    } finally {
      ctx.footer = outerFooter;
    }
  });
  // inside·lazy: 탭 내용은 탭마다 따로 만들어지므로 아래 줄도 그 판 안에 둔다.
  const panes = contents.map((c, i) =>
    onePane(c.footer.length ? [...c.nodes, footerBar(ctx, c.footer)] : c.nodes, `${p.name}_${i}`, size));
  const [tw, th] = GEOM.tab;
  const vars = (i: number): JsonObject | undefined => (p.mode === "inside" ? { $on_def: ref(ctx, key(ctx, `on_${i}`)) } : undefined);

  let out: JuiNode = null;
  if (p.mode === "inside") {
    // 탭 i는 탭 0보다 96*i 오른쪽이라 내용 오프셋을 그만큼 되돌려 판 시작 자리에 맞춘다.
    const dx = GEOM.paneOrigin[0] - GEOM.tabsOrigin[0];
    const dy = GEOM.paneOrigin[1] - GEOM.tabsOrigin[1];
    panes.forEach((pane, i) => {
      const paneKey = key(ctx, `pane_${i}`);
      ctx.ns.define(paneKey, toBody(pane));
      ctx.ns.define(key(ctx, `on_${i}`), (
        <panel name={key(ctx, `on_${i}`)} size={["100%", "100%"]}>
          <use name="face" def={ref(ctx, "tab_face_on")} />
          <use name="pane" def={ref(ctx, paneKey)} anchor_from="top_left" anchor_to="top_left" offset={[dx - tw * i, dy]} />
        </panel>
      ));
    });
  } else if (p.mode === "follow") {
    // 탭 내용의 노드마다 그 탭 토글 상태를 따라 보이게 한다(BND-08). 아래 줄 내용도 각자 바인딩을 달고
    // 화면의 판 아래 줄 하나에 겹친다(보이는 것은 켠 탭 것 하나).
    out = contents.flatMap((c, i) => c.nodes.map((node) => fromNode(addBinding(node, hook.paneBinding(i)))));
    contents.forEach((c, i) => outerFooter.push(...c.footer.map((node) => addBinding(node, hook.paneBinding(i)))));
  } else {
    // 첫 탭은 처음부터 열려 있으므로 미리 만들고 토글 상태로만 보인다(팩토리로 만들면 처음 열 때 빈다).
    const uses: JuiElement[] = [];
    panes.forEach((pane, i) => {
      const paneKey = key(ctx, `pane_${i}`);
      if (i === 0) {
        ctx.ns.define(paneKey, toBody(addBinding(pane, hook.paneBinding(0))));
        uses.push(<use name="g0" def={ref(ctx, paneKey)} />);
        return;
      }
      ctx.ns.define(paneKey, toBody(pane));
      const lazyKey = key(ctx, `lazy_${i}`);
      ctx.ns.define(lazyKey, (
        <stack_panel
          name={lazyKey}
          size={size}
          factory={{ name: `${N}_${ctx.code}${i}`, control_name: ref(ctx, paneKey) }}
          bindings={[view("(#toggle_state * 1)", "#collection_length", { condition: "always", control: hook.tabName(i) })]}
        />
      ));
      uses.push(<use name={`g${i}`} def={ref(ctx, lazyKey)} />);
    });
    out = uses;
  }

  const barKey = key(ctx, "tabs");
  ctx.ns.define(barKey, (
    <TabBar
      name={barKey}
      size={[tw * n, th]}
      toggleDef={ref(ctx, "tab_toggle")}
      tabs={items.map((_, i) => ({ name: hook.tabName(i), index: range.at(i), vars: vars(i) }))}
    />
  ));
  ctx.tabsDef = ref(ctx, barKey);
  return <>{out}</>;
}

// ---------------------------------------------------------------- SlotGrid

export interface SlotGridProps {
  name: string;
  rows: number;
  cols: number;
  /** 있으면 split 오른쪽 판에 고른 칸의 아이콘·이름 상세를 보인다. 문자열이면 고르기 전 안내 글자. */
  detail?: string | boolean;
}

/** 칸 격자(라디오 선택). 화면마다 하나. */
export function SlotGrid(p: SlotGridProps): JuiElement {
  const ctx = useScreen("SlotGrid");
  if (ctx.slotGrid) throw new Error(`화면 "${ctx.id}": <SlotGrid>는 화면마다 하나만 쓸 수 있습니다`);
  ctx.slotGrid = true;
  const C = GEOM.cell;
  const [pw, ph] = paneSize(ctx);
  if (!Number.isInteger(p.rows) || !Number.isInteger(p.cols) || p.rows <= 0 || p.cols <= 0 || p.cols * C > pw || p.rows * C > ph) {
    throw new Error(`SlotGrid "${p.name}": rows 1..${Math.floor(ph / C)}, cols 1..${Math.floor(pw / C)}이어야 합니다(판 ${pw}x${ph}, 칸 ${C})`);
  }
  if (p.detail && ctx.layout !== "split") throw new Error(`SlotGrid "${p.name}": detail은 <Screen layout="split">에서만 쓸 수 있습니다`);
  if (p.detail && ctx.rightDef) throw new Error(`화면 "${ctx.id}": 오른쪽 판은 하나만 쓸 수 있습니다(SlotGrid detail, Placeholder)`);
  const cells = ctx.slots.range(p.name, p.rows * p.cols, PHASE.cells);
  let detailDef = ref(ctx, "panes_none");
  if (p.detail) {
    const rightKey = key(ctx, "right");
    const [rw, rh] = GEOM.right;
    // 오른쪽 판: 고르기 전 안내 글자. 상세가 같은 자리를 배경으로 덮는다.
    ctx.ns.define(rightKey, (
      <panel name={rightKey} size={[rw, rh]}>
        {typeof p.detail === "string" && (
          <label name="hint" layer={3} localize={false} text={p.detail} color={[0.4, 0.4, 0.4]} font_scale_factor={0.8} anchor_from="top_left" anchor_to="top_left" />
        )}
      </panel>
    ));
    ctx.rightDef = ref(ctx, rightKey);
    // 상세: 오른쪽 판 크기의 배경을 깔고 그 칸 버튼의 아이콘과 이름을 보인다. $cell은 칸 토글이 내려 주는 버튼 번호.
    const detailKey = key(ctx, "detail");
    ctx.ns.define(detailKey, (
      <image name={detailKey} texture="textures/ui/jur/panel" size={[rw + 8, rh + 8]}>
        <stack_panel name="card" orientation="horizontal" size={[rw, 28]} offset={[4, 4]} anchor_from="top_left" anchor_to="top_left">
          <stack_panel name="icon_row" orientation="horizontal" size={[28, 28]} collection_name="form_buttons">
            <use name="icon" def={ref(ctx, "detail_icon")} collection_index="$cell" />
          </stack_panel>
          <panel name="gap" size={[4, 28]} />
          <stack_panel name="info" orientation="vertical" size={["fill", 28]} collection_name="form_buttons">
            <panel name="pad" size={["100%", 9]} />
            <use name="name" def={ref(ctx, "text_item")} collection_index="$cell" />
          </stack_panel>
        </stack_panel>
      </image>
    ));
    detailDef = ref(ctx, detailKey);
  }
  // 상세는 고른 칸 기준 자리에 놓이므로 칸 위치만큼 되돌려 오른쪽 판 시작 자리에 맞춘다.
  const dx = GEOM.rightOrigin[0] - GEOM.paneOrigin[0];
  const dy = GEOM.rightOrigin[1] - GEOM.paneOrigin[1];
  return (
    <LowSlotGrid
      name={p.name}
      size={[p.cols * C, p.rows * C]}
      rows={p.rows}
      cols={p.cols}
      rowHeight={C}
      rowWidth={p.cols * C}
      props={TOP_LEFT}
      cell={(pos, row, col) => (
        <use
          name={`i${pos}`}
          def={ref(ctx, "item_toggle")}
          collection_index={cells.at(pos)}
          $k={pos}
          $detail_offset={[dx - col * C, dy - row * C]}
          $cell={cells.at(pos)}
          $detail_def={detailDef}
        />
      )}
    />
  );
}

// ---------------------------------------------------------------- VirtualList

export interface VirtualListProps {
  name: string;
  /** 칸 수. 2000을 넘으면 빌드 에러(COL-49). */
  count: number;
  /** 열 수(1..2, 기본 2). */
  columns?: number;
}

/** 스크롤 grid 목록. 화면의 유일한 자식으로 두면 목록 창을 쓴다. */
export function VirtualList(p: VirtualListProps): JuiElement {
  const ctx = useScreen("VirtualList");
  if (ctx.listDef) throw new Error(`화면 "${ctx.id}": <VirtualList>는 화면마다 하나만 쓸 수 있습니다`);
  const columns = p.columns ?? 2;
  if (!Number.isInteger(columns) || columns < 1 || columns > 2) throw new Error(`VirtualList "${p.name}": columns는 1 또는 2여야 합니다(목록 창 폭)`);
  ctx.slots.range(p.name, p.count, PHASE.cells);
  const bodyKey = key(ctx, p.name);
  ctx.ns.define(bodyKey, <LowVirtualList name={bodyKey} columns={columns} cellSize={[100, 30]} cellDef={ref(ctx, "list_cell")} maxItems={p.count} />);
  ctx.listDef = ref(ctx, bodyKey);
  // 판에는 아무것도 놓지 않는다(Screen이 목록 창을 쓴다).
  return <></>;
}
