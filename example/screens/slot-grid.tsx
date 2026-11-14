// slot-grid: 3x8 고정 칸 그리드. 칸을 고르면 선택 상세가 뜬다.
import type { Pack } from "../../src/pack.ts";
import type { Slots } from "../../src/slots.ts";
import { SlotGrid } from "../../src/components/grid.tsx";
import { defineSplitWindow, ns, ref } from "./common.tsx";

const ROWS = 3;
const COLS = 8;
const CELL = 18;

export function defineSlotGrid(pack: Pack, slots: Slots): string {
  const cells = slots.range("cells", ROWS * COLS);
  const n = ns(pack);
  // 오른쪽 판: 선택 전 안내 글자. 상세가 같은 자리를 배경으로 덮는다.
  n.define("sg_right", (
    <panel name="sg_right" size={[150, 128]}>
      <label name="hint" layer={3} localize={false} text="Pick a slot." color={[0.4, 0.4, 0.4]} font_scale_factor={0.8} anchor_from="top_left" anchor_to="top_left" />
    </panel>
  ));
  // 선택 상세: 배경 판을 깔고 높은 layer로 안내를 덮는다. 그 칸 버튼의 아이콘과 글자를 보인다.
  // $cell은 칸 토글이 내려 주는 버튼 번호.
  n.define("sg_detail", (
    <image name="sg_detail" texture="textures/ui/ffr/panel" size={[158, 136]}>
      <stack_panel name="card" orientation="horizontal" size={[150, 28]} offset={[4, 4]} anchor_from="top_left" anchor_to="top_left">
        <stack_panel name="icon_row" orientation="horizontal" size={[28, 28]} collection_name="form_buttons">
          <use name="icon" def="ffr.detail_icon" collection_index="$cell" />
        </stack_panel>
        <panel name="gap" size={[4, 28]} />
        <stack_panel name="info" orientation="vertical" size={["fill", 28]} collection_name="form_buttons">
          <panel name="pad" size={["100%", 9]} />
          <use name="name" def="ffr.text_item" collection_index="$cell" />
        </stack_panel>
      </stack_panel>
    </image>
  ));
  n.define("sg_panes", (
    <panel name="sg_panes" size={[COLS * CELL, 128]}>
      <SlotGrid
        name="sg_grid"
        size={[COLS * CELL, ROWS * CELL]}
        rows={ROWS}
        cols={COLS}
        rowHeight={CELL}
        rowWidth={COLS * CELL}
        props={{ anchor_from: "top_left", anchor_to: "top_left" }}
        cell={(pos, row, col) => (
          <use
            name={`i${pos}`}
            def="ffr.item_toggle"
            collection_index={cells.at(pos)}
            $k={pos}
            $detail_offset={[COLS * CELL + 8 - col * CELL, -4 - row * CELL]}
            $cell={cells.at(pos)}
            $detail_def={ref("sg_detail")}
          />
        )}
      />
    </panel>
  ));
  defineSplitWindow(pack, "sg", { "$mode_title": "Fixed slot grid with selection detail", "$panes_def": ref("sg_panes"), "$right_def": ref("sg_right") });
  return ref("sg");
}
