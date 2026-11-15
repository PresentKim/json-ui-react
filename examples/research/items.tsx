// 연구 화면(FFR) 항목 정의: 방식 E(직접 상세)와 방식 F(지연 상세)의 항목 패널.
// 버튼 번호는 모두 slots 배치에서 읽는다(숫자 직접 기입 없음).
import type { JuiElement } from "../../src/types.ts";
import type { Size1 } from "../../src/controls/common.ts";
import type { Pack } from "../../src/pack.ts";
import type { Slots, SlotLayout } from "../../src/slots.ts";
import { SlotGrid } from "../../src/components/grid.tsx";
import { view } from "../../src/bind.ts";

const ITEMS = 96;
const PER_TAB = 48;
const GRID_COLS = 8;
const GRID_ROWS = PER_TAB / GRID_COLS;
const CELL = 18;

function rangeStart(layout: SlotLayout, name: string): number {
  const r = layout.ranges.find((x) => x.name === name);
  if (!r) throw new Error(`슬롯 구간 "${name}"이 할당되지 않았습니다`);
  return r.start;
}

/** 상세 블록의 필드 번호 조회기. */
function blockAt(layout: SlotLayout, name: string) {
  const b = layout.blocks.find((x) => x.name === name);
  if (!b) throw new Error(`슬롯 블록 "${name}"이 할당되지 않았습니다`);
  const size = b.fields.length;
  return (index: number, field: string): number => {
    const f = b.fields.indexOf(field);
    if (f < 0) throw new Error(`슬롯 블록 "${name}"에 필드 "${field}"가 없습니다`);
    if (index < 0 || index >= b.count) throw new Error(`슬롯 블록 "${name}" 인덱스 범위 밖: ${index}`);
    return b.start + index * size + f;
  };
}

const Gap = (p: { name: string; h: Size1; w?: Size1 }): JuiElement => (
  <panel name={p.name} size={[p.w ?? "100%", p.h]} />
);

function SlotRow(p: { name: string; at: (j: number) => number; count: number }): JuiElement {
  const cells: JuiElement[] = [];
  for (let j = 0; j < p.count; j++) {
    cells.push(<use name={`s${j}`} def="ffr.list_slot" collection_index={p.at(j)} />);
  }
  return (
    <stack_panel name={p.name} orientation="horizontal" size={["100%", CELL]} collection_name="form_buttons">
      {cells}
    </stack_panel>
  );
}

/** 머리글 글자 바꾸기(선택). 없으면 FFR 원본 글자. */
export interface ItemsText {
  materials?: string;
  rewards?: string;
}

function DetailBody(p: { at: (field: string) => number; mats: number; rewards: number; text?: ItemsText }): JuiElement {
  const { at } = p;
  return (
    <stack_panel name="detail_body" orientation="vertical" size={["100% - 4px", "100%c"]}>
      <stack_panel name="card" orientation="horizontal" size={["100%", 28]}>
        <stack_panel name="icon_row" orientation="horizontal" size={[28, 28]} collection_name="form_buttons">
          <use name="icon" def="ffr.detail_icon" collection_index={at("head")} />
        </stack_panel>
        <Gap name="gap" w={4} h={28} />
        <stack_panel name="info" orientation="vertical" size={["fill", 28]} collection_name="form_buttons">
          <Gap name="pad" h={3} />
          <use name="name" def="ffr.text_item" collection_index={at("head")} />
          <Gap name="pad2" h={2} />
          <use name="status" def="ffr.text_item" collection_index={at("status")} />
        </stack_panel>
      </stack_panel>
      <Gap name="gap1" h={3} />
      <stack_panel name="desc" orientation="vertical" size={["100%", "100%c"]} collection_name="form_buttons">
        <use name="d" def="ffr.desc_item" collection_index={at("desc")} />
      </stack_panel>
      <Gap name="gap2" h={4} />
      <use name="mat_head" def="ffr.header_label" text={p.text?.materials ?? "필요한 재료"} />
      <SlotRow name="mats" count={p.mats} at={(j) => at(`mat${j}`)} />
      <Gap name="gap3" h={4} />
      <use name="reward_head" def="ffr.header_label" text={p.text?.rewards ?? "보상 레시피"} />
      <SlotRow name="rewards" count={p.rewards} at={(j) => at(`rew${j}`)} />
    </stack_panel>
  );
}

function Detail(p: { k: number; progress: number }): JuiElement {
  return (
    <image name={`detail_${p.k}`} texture="textures/ui/ffr/panel" size={[158, 136]}>
      <panel
        name="body"
        size={["100% - 6px", "100% - 6px"]}
        offset={[3, 3]}
        anchor_from="top_left"
        anchor_to="top_left"
      >
        <use name="scroll" def="ffr.detail_scroll" $scrolling_content={`ffri.detail_body_${p.k}`} />
      </panel>
      <stack_panel
        name="go"
        orientation="horizontal"
        size={[150, 18]}
        offset={[0, -4]}
        anchor_from="bottom_middle"
        anchor_to="bottom_middle"
        collection_name="form_buttons"
      >
        <use name="b" def="ffr.progress_button" collection_index={p.progress} />
      </stack_panel>
    </image>
  );
}

function ItemsPanel(p: {
  name: string;
  detailPrefix: string;
  tabStart: (tab: number) => number;
}): JuiElement {
  const grids: JuiElement[] = [0, 1].map((tab) => (
    <SlotGrid
      name={`grid${tab}`}
      size={[GRID_COLS * CELL, GRID_ROWS * CELL]}
      rows={GRID_ROWS}
      cols={GRID_COLS}
      rowHeight={CELL}
      rowWidth={GRID_COLS * CELL}
      props={{ anchor_from: "top_left", anchor_to: "top_left" }}
      bindings={[view("#toggle_state", "#visible", { condition: "always", control: `ffr_t${tab}` })]}
      cell={(pos, row, col) => (
        <use
          name={`i${tab * PER_TAB + pos}`}
          def="ffr.item_toggle"
          collection_index={p.tabStart(tab) + pos}
          $k={pos}
          $detail_offset={[152 - col * CELL, -4 - row * CELL]}
          $detail_def={`ffri.${p.detailPrefix}_${tab * PER_TAB + pos}`}
        />
      )}
    />
  ));
  return (
    <panel name={p.name} size={[GRID_COLS * CELL, 128]}>
      {grids}
      <use name="pagers" def="ffr.pagers_tabs" anchor_from="top_left" anchor_to="top_left" offset={[0, 110]} />
    </panel>
  );
}

export function defineItems(pack: Pack, slots: Slots, text?: ItemsText): void {
  const layout = slots.layout();
  const detailAt = blockAt(layout, "detail");
  const tabStart = (tab: number) => rangeStart(layout, `tab${tab}`);
  const mats = layout.blocks.find((b) => b.name === "detail")!.fields.filter((f) => f.startsWith("mat")).length;
  const rewards = layout.blocks.find((b) => b.name === "detail")!.fields.filter((f) => f.startsWith("rew")).length;

  const ns = pack.ns("ffri", "ffr_items.json");
  for (let k = 0; k < ITEMS; k++) {
    const at = (field: string) => detailAt(k, field);
    ns.define(`detail_body_${k}`, <DetailBody at={at} mats={mats} rewards={rewards} text={text} />);
    ns.define(`detail_${k}`, <Detail k={k} progress={at("progress")} />);
    ns.define(`lazy_${k}@ffr.lazy_detail`, {
      factory: { name: `ffr_lazy_${k}`, control_name: `ffri.detail_${k}` },
    });
  }
  ns.define("items_e", <ItemsPanel name="items_e" detailPrefix="detail" tabStart={tabStart} />);
  ns.define("items_f", <ItemsPanel name="items_f" detailPrefix="lazy" tabStart={tabStart} />);
}
