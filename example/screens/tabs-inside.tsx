// tabs-inside: 켠 탭 얼굴 안에 패널을 넣는다(방식 B).
import type { Pack } from "../../src/pack.ts";
import type { Slots } from "../../src/slots.ts";
import { TabBar } from "../../src/components/toggle.tsx";
import { ButtonList, defineWindow, ns, ref } from "./common.tsx";

export function defineTabsInside(pack: Pack, slots: Slots): string {
  const tabs = slots.range("tabs", 2);
  const panes = [slots.range("pane0", 2), slots.range("pane1", 2)];
  const n = ns(pack);
  // 탭 1은 탭 0보다 96px 오른쪽이라 패널 오프셋을 -94로 보정한다. 판(왼쪽 6,22 + 안쪽 4,4)이 시작하는 자리에 맞춘다.
  const offsets = [[2, 48], [-94, 48]];
  panes.forEach((r, i) => {
    n.define(`ti_pane_${i}`, <ButtonList name={`ti_pane_${i}`} range={r} />);
    n.define(`ti_on_${i}`, (
      <panel name={`ti_on_${i}`} size={["100%", "100%"]}>
        <use name="face" def="ffr.tab_face_on" />
        <use name="pane" def={ref(`ti_pane_${i}`)} anchor_from="top_left" anchor_to="top_left" offset={offsets[i]} />
      </panel>
    ));
  });
  n.define("ti_tabs", (
    <TabBar
      name="ti_tabs"
      size={[192, 22]}
      toggleDef="ffr.tab_toggle"
      tabs={[0, 1].map((i) => ({ name: `jur_t${i}`, index: tabs.at(i), vars: { $on_def: ref(`ti_on_${i}`) } }))}
    />
  ));
  defineWindow(pack, "ti", {
    "$mode_title": "탭 안에 패널 (방식 B)",
    "$tabs_def": ref("ti_tabs"),
    "$panes_def": "ffr.panes_none",
    "$tab": 0,
  });
  return ref("ti");
}
