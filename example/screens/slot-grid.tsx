// slot-grid: 3x8 고정 칸 그리드. 칸을 고르면 선택 상세가 뜬다.
import type { Pack } from "../../src/pack.ts";
import type { Slots } from "../../src/slots.ts";
import { SlotGrid } from "../../src/components/grid.tsx";
import { defineWindow, ns, ref } from "./common.tsx";

const ROWS = 3;
const COLS = 8;
const CELL = 18;

export function defineSlotGrid(pack: Pack, slots: Slots): string {
  const cells = slots.range("cells", ROWS * COLS);
  const n = ns(pack);
  n.define("sg_detail", (
    <panel name="sg_detail" size={[100, 24]}>
      <label name="t" layer={3} localize={false} text="선택한 칸의 상세" color={[0.2, 0.2, 0.2]} />
    </panel>
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
            $detail_def={ref("sg_detail")}
          />
        )}
      />
    </panel>
  ));
  defineWindow(pack, "sg", { "$mode_title": "고정 칸 그리드와 선택 상세", "$panes_def": ref("sg_panes") });
  return ref("sg");
}
