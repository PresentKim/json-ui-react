// 상세가 딸린 칸 격자(SelectGrid)와 상세를 조립하는 작은 부품들.
// 이 파일은 "저수준으로 고수준 컴포넌트를 만드는 예시"이기도 하다. 각 부품 머리 주석에
// 무엇을 만드는지, 무엇으로 낮추는지, 근거 규칙(bedrock-research 위키 JSON UI 장의 규칙 ID)을 적었다.
//
// 데이터 모양: 칸 하나 = 레코드 하나. 서버는 openScreen(player, id, { needed: [{ icon, name, status, ... }] })처럼 보낸다.
// 레코드 하나는 칸 버튼 1개(아이콘)와 상세 블록 1개(상세 부품이 밝힌 필드 수만큼의 버튼)가 된다.
// 부품은 useRecord().field(...)로 필드를 밝히고 그 칸 상세 블록 안의 버튼 번호를 받는다.
import type { ControlNode, JuiElement, JuiNode } from "../types.ts";
import { createPack } from "../pack.ts";
import { Image, Panel, StackPanel, Use } from "../controls/components.tsx";
import { render, toBody } from "../render.ts";
import { SlotGrid as LowSlotGrid } from "../components/grid.tsx";
import { GEOM, PHASE, TOP_LEFT, key, paneSize, ref, useRecord, useScreen, withRecord, type ScreenCtx } from "./context.ts";
import { THEME_TEXTURES } from "./theme.ts";
import type { FieldSpec } from "./server.ts";

/** 상세 판 안쪽 폭(오른쪽 판 폭). */
const DETAIL_W = GEOM.right[0];
/** 행동 버튼 높이와 아래 여백. 상세 스크롤은 이만큼 짧아진다. */
const ACTION_H = 18;
const ACTION_GAP = 4;
/** 상세 카드(아이콘 + 글자 줄) 높이와 글자 줄 높이·간격. */
const CARD_H = 28;
const LINE_H = 10;
const LINE_GAP = 2;

// ---------------------------------------------------------------- SelectGrid

export interface SelectGridProps {
  /** 서버 데이터 키(레코드 배열)이자 응답 decode의 name. */
  name: string;
  rows: number;
  cols: number;
  /**
   * 고른 칸의 상세(<DetailPanel> 하나를 돌려주는 요소). split 오른쪽 판 자리에 뜬다.
   * 칸마다 한 벌씩 미리 만든다(FFR 방식 E): 고르는 즉시 보이고 서버를 거치지 않는다.
   */
  detail?: JuiElement;
}

/**
 * 레코드 칸 격자. 칸은 라디오 토글이고, 켠 칸의 checked 얼굴 안에 그 칸의 상세가 들어 있다.
 * 낮춤: 세로 stack_panel > 가로 stack_panel(collection_name) 줄 > `item_toggle` 칸(collection_index 고정).
 *   켠 얼굴(item_chosen)이 `$detail_def`를 `$detail_offset` 자리에 그린다. 오프셋은 칸 위치를 되돌려 오른쪽 판 자리에 맞춘다.
 * 근거: COL-38·COL-50(고정 인덱스 칸은 collection_name 가진 가로 스택의 직속 자식), INP-12·INP-35(toggle_name 하나로 묶인 라디오 그룹),
 *   INP-36(칸 토글의 checked 컨트롤 안에 상세를 두면 서버 없이 바뀐다), COL-19(모든 엔트리는 button()).
 * 한 화면에 여러 개 둘 수 있다(탭마다 하나 등). 라디오 그룹은 화면 하나에 하나(`<ns>_items`)라 한 번에 한 칸만 켜진다.
 */
export function SelectGrid(p: SelectGridProps): JuiElement {
  const ctx = useScreen("SelectGrid");
  const C = GEOM.cell;
  const [pw, ph] = paneSize(ctx);
  if (!Number.isInteger(p.rows) || !Number.isInteger(p.cols) || p.rows <= 0 || p.cols <= 0 || p.cols * C > pw || p.rows * C > ph) {
    throw new Error(`SelectGrid "${p.name}": rows 1..${Math.floor(ph / C)}, cols 1..${Math.floor(pw / C)}이어야 합니다(판 ${pw}x${ph}, 칸 ${C})`);
  }
  if (p.detail && ctx.layout !== "split") throw new Error(`SelectGrid "${p.name}": detail은 <Screen layout="split">에서만 쓸 수 있습니다`);
  const n = p.rows * p.cols;
  const cells = ctx.slots.range(p.name, n, PHASE.cells);
  const detailDefs: string[] = Array.from({ length: n }, () => ref(ctx, "panes_none"));
  ctx.records[p.name] = { block: null, fields: [] };
  if (p.detail) {
    // 상세 필드 목록은 칸 0의 상세를 버리는 네임스페이스에 시험 렌더해서 얻는다(부품이 밝힌 순서).
    const fields = discoverFields(ctx, p.name, p.detail);
    if (fields.length === 0) throw new Error(`SelectGrid "${p.name}": 상세에 필드가 없습니다(IconTitle, TextBlock, IconRow, ActionButton 등을 넣으세요)`);
    const block = ctx.slots.blocks(`${p.name}.detail`, n, fields.map((f) => f.field), PHASE.details);
    ctx.records[p.name] = { block: block.name, fields };
    for (let pos = 0; pos < n; pos++) {
      const detailKey = key(ctx, `${p.name}_detail_${pos}`);
      const rec = { grid: p.name, index: pos, field: (spec: FieldSpec) => block.at(pos, spec.field) };
      detailDefs[pos] = withRecord(rec, () => ctx.ns.define(detailKey, oneNode(render(p.detail!), `SelectGrid "${p.name}" detail`)));
    }
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
        <Use
          name={`i${pos}`}
          def={ref(ctx, "item_toggle")}
          collection_index={cells.at(pos)}
          $k={pos}
          $detail_offset={[dx - col * C, dy - row * C]}
          $detail_def={detailDefs[pos]}
        />
      )}
    />
  );
}

function oneNode(nodes: ControlNode[], who: string): ReturnType<typeof toBody> {
  if (nodes.length !== 1) throw new Error(`${who}: 요소 1개(<DetailPanel>)여야 합니다(렌더 결과 ${nodes.length}개)`);
  return toBody(nodes[0]!);
}

function discoverFields(ctx: ScreenCtx, grid: string, detail: JuiElement): FieldSpec[] {
  const specs: FieldSpec[] = [];
  const real = ctx.ns;
  ctx.ns = createPack().ns(real.name, real.file);
  try {
    withRecord({ grid, index: 0, field: (spec) => (specs.push(spec), 0) }, () => render(detail));
  } finally {
    ctx.ns = real;
  }
  const seen = new Set<string>();
  for (const f of specs) {
    if (seen.has(f.field)) throw new Error(`SelectGrid "${grid}": 상세 필드 "${f.field}"가 두 번 나옵니다(부품 name이 겹침)`);
    seen.add(f.field);
  }
  return specs;
}

// ---------------------------------------------------------------- DetailPanel

export interface DetailPanelProps {
  /** 스크롤되는 본문 부품들(위에서 아래로 쌓인다). */
  children?: JuiNode;
  /** 본문 아래에 고정되는 부품(ActionButton). 있으면 스크롤 영역이 그만큼 짧아진다. */
  footer?: JuiNode;
}

/**
 * 상세 판: 배경 그림 + 세로로 쌓이는 스크롤 본문 + (선택) 아래 고정 버튼. SelectGrid detail 안에서만 쓴다.
 * 낮춤: image(오른쪽 판 크기 + 테두리 8) > panel(안쪽 3) > `common.scrolling_panel`($scrolling_content = 칸마다 정의한
 *   세로 stack_panel 본문), 그리고 footer 노드. 본문 정의 이름은 `<코드>_<격자>_body_<칸>`.
 * 근거: LAY-02(스크롤은 common.scrolling_panel을 $scrolling_content로 재사용), LAY-04(세로 스택이 자식 높이를 쌓는다).
 */
export function DetailPanel(p: DetailPanelProps): JuiElement {
  const ctx = useScreen("DetailPanel");
  const rec = useRecord("DetailPanel");
  const bodyKey = key(ctx, `${rec.grid}_body_${rec.index}`);
  // 본문을 먼저 렌더해 필드 순서를 정한다(본문 필드 -> footer 필드).
  const body = uniqueNames(render(p.children ?? null));
  ctx.ns.define(bodyKey, toBody({ name: bodyKey, props: { type: "stack_panel", orientation: "vertical", size: ["100% - 4px", "100%c"] }, children: body }));
  // footer는 아래 image 자식으로 한 번만 렌더한다(여기서 렌더하면 필드가 두 번 잡힌다).
  const hasFooter = p.footer !== undefined && p.footer !== null && p.footer !== false && !(Array.isArray(p.footer) && p.footer.length === 0);
  return (
    <Image name={`${rec.grid}_detail_${rec.index}`} texture={`${THEME_TEXTURES}/panel`} size={[DETAIL_W + 8, GEOM.right[1] + 8]}>
      <Panel name="body" size={["100% - 6px", "100% - 6px"]} offset={[3, 3]} {...TOP_LEFT}>
        <Use
          name="scroll"
          def="common.scrolling_panel"
          anchor_to="top_left"
          anchor_from="top_left"
          $show_background={false}
          size={["100%", hasFooter ? `100% - ${ACTION_H + ACTION_GAP}px` : "100%"]}
          $scroll_size={[4, "100% - 4px"]}
          $scrolling_pane_size={["100% - 2px", "100%"]}
          $scrolling_pane_offset={[0, 0]}
          $scroll_bar_right_padding_size={[0, 0]}
          $scrolling_content={ref(ctx, bodyKey)}
        />
      </Panel>
      {p.footer}
    </Image>
  );
}

/** 형제 이름이 겹치면 뒤의 것에 번호를 붙인다(Spacer 여러 개 등). */
function uniqueNames(nodes: ControlNode[]): ControlNode[] {
  const used = new Map<string, number>();
  return nodes.map((node) => {
    const n = (used.get(node.name) ?? 0) + 1;
    used.set(node.name, n);
    return n === 1 ? node : { ...node, name: `${node.name}${n}` };
  });
}

// ---------------------------------------------------------------- 상세 부품

export interface IconTitleProps {
  /** 제목 글자가 든 레코드 키. 아이콘은 레코드의 icon. */
  name: string;
  /** 제목 아래 작은 줄(상태 등)이 든 레코드 키. */
  subtitle?: string;
}

/**
 * 아이콘 + 제목(+ 부제) 카드. 버튼 하나(제목)의 글자와 아이콘을 둘 다 그린다.
 * 낮춤: 가로 stack_panel(높이 28) > [collection 스택 > `detail_icon`] + 간격 4 + [세로 collection 스택 > 위 여백, `text_item`(제목),
 *   (간격 2, `text_item`(부제))]. 위 여백은 글자 줄을 카드 가운데에 둔다.
 * 근거: COL-38(collection_index는 collection_name 스택의 직속 자식), BND-04(글자·그림 바인딩은 그리는 컨트롤에 둔다).
 */
export function IconTitle(p: IconTitleProps): JuiElement {
  const ctx = useScreen("IconTitle");
  const rec = useRecord("IconTitle");
  const head = rec.field({ field: p.name, kind: "title", key: p.name });
  const sub = p.subtitle === undefined ? undefined : rec.field({ field: p.subtitle, kind: "text", key: p.subtitle });
  const lines = sub === undefined ? 1 : 2;
  const pad = (CARD_H - lines * LINE_H - (lines - 1) * LINE_GAP) / 2;
  return (
    <StackPanel name="card" orientation="horizontal" size={["100%", CARD_H]}>
      <StackPanel name="icon_row" orientation="horizontal" size={[CARD_H, CARD_H]} collection_name="form_buttons">
        <Use name="icon" def={ref(ctx, "detail_icon")} collection_index={head} />
      </StackPanel>
      <Panel name="gap" size={[4, CARD_H]} />
      <StackPanel name="info" orientation="vertical" size={["fill", CARD_H]} collection_name="form_buttons">
        <Panel name="pad" size={["100%", pad]} />
        <Use name="title" def={ref(ctx, "text_item")} collection_index={head} />
        {sub !== undefined && <Panel name="pad2" size={["100%", LINE_GAP]} />}
        {sub !== undefined && <Use name="subtitle" def={ref(ctx, "text_item")} collection_index={sub} />}
      </StackPanel>
    </StackPanel>
  );
}

export interface TextBlockProps {
  /** 글이 든 레코드 키. */
  name: string;
}

/**
 * 여러 줄 글. 높이가 글 줄 수를 따라 늘고, 상세 본문이 길어지면 스크롤된다.
 * 낮춤: 세로 collection stack_panel(높이 100%c) > `text_block`(label 폭 100%, 높이 default).
 * 근거: COL-38, LAY-04(스택 높이는 자식 높이 합), TXT-08(서버 글자의 § 색 코드는 그대로 그려진다).
 */
export function TextBlock(p: TextBlockProps): JuiElement {
  const ctx = useScreen("TextBlock");
  const at = useRecord("TextBlock").field({ field: p.name, kind: "text", key: p.name });
  return (
    <StackPanel name={p.name} orientation="vertical" size={["100%", "100%c"]} collection_name="form_buttons">
      <Use name="text" def={ref(ctx, "text_block")} collection_index={at} />
    </StackPanel>
  );
}

export interface IconRowProps {
  /** 칸 목록이 든 레코드 키. 칸은 아이콘 또는 [아이콘, 숫자]. */
  name: string;
  /** 줄 위 머리글(화면에 그대로 보이는 정적 글자). */
  label: string;
  /** 칸 수(최대). 데이터가 모자란 칸은 숨는다. */
  count: number;
  /** 숫자 없이 아이콘만 준 칸에 보일 글자(예: "+1"). */
  badge?: string;
}

/**
 * 머리글 + 아이콘 칸 한 줄(누를 수 없음). 칸마다 아이콘과 오른쪽 아래 숫자를 그린다.
 * 낮춤: `header_label`(text = label) + 가로 collection stack_panel(높이 18) > `icon_slot` x count.
 *   서버는 빈 칸에 빈 칸 표식(§0§e§r)을 보내고, 칸은 그 표식을 보면 숨는다.
 * 근거: COL-38·COL-50, COL-19(누를 수 없는 칸도 button()으로 보낸다), LAY-04(숨긴 칸은 자리를 내준다).
 */
export function IconRow(p: IconRowProps): JuiElement {
  const ctx = useScreen("IconRow");
  const rec = useRecord("IconRow");
  const C = GEOM.cell;
  const max = Math.floor((DETAIL_W - 4) / C);
  if (!Number.isInteger(p.count) || p.count <= 0 || p.count > max) throw new Error(`IconRow "${p.name}": count는 1..${max}이어야 합니다(상세 폭 ${DETAIL_W - 4})`);
  const slots = Array.from({ length: p.count }, (_, j) => rec.field({ field: `${p.name}${j}`, kind: "icon", key: p.name, index: j, ...(p.badge === undefined ? {} : { badge: p.badge }) }));
  return (
    <>
      <Use name={`${p.name}_head`} def={ref(ctx, "header_label")} text={p.label} />
      <StackPanel name={p.name} orientation="horizontal" size={["100%", C]} collection_name="form_buttons">
        {slots.map((at, j) => <Use name={`s${j}`} def={ref(ctx, "icon_slot")} collection_index={at} />)}
      </StackPanel>
    </>
  );
}

export interface SpacerProps {
  /** 세로 간격(픽셀). */
  h: number;
}

/** 본문 부품 사이 세로 간격. 낮춤: 폭 100% 빈 panel. */
export function Spacer(p: SpacerProps): JuiElement {
  return <Panel name="gap" size={["100%", p.h]} />;
}

export interface ActionButtonProps {
  /** 버튼 글자가 든 레코드 키. 누르면 openScreen 결과가 { name: 격자, index: 칸, field: 이 name }. */
  name: string;
}

/**
 * 상세 아래 고정 글자 버튼(DetailPanel footer). 누르면 서버가 그 칸의 이 필드 번호를 받는다.
 * 낮춤: 가로 collection stack_panel(상세 폭 x 18, 아래 가운데, 위로 4) > `action_button`(common.button, 얼굴 3개).
 * 근거: COL-38, INP-32(폼 버튼은 $focus_enabled false, 휴대폰 첫 버튼 호버 방지), COL-19.
 */
export function ActionButton(p: ActionButtonProps): JuiElement {
  const ctx = useScreen("ActionButton");
  const at = useRecord("ActionButton").field({ field: p.name, kind: "text", key: p.name });
  return (
    <StackPanel
      name={p.name}
      orientation="horizontal"
      size={[DETAIL_W, ACTION_H]}
      offset={[0, -ACTION_GAP]}
      anchor_from="bottom_middle"
      anchor_to="bottom_middle"
      collection_name="form_buttons"
    >
      <Use name="button" def={ref(ctx, "action_button")} collection_index={at} />
    </StackPanel>
  );
}
