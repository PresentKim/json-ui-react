// tabs-lazy: 탭을 고를 때만 팩토리로 패널을 만든다(방식 D).
import type { Pack } from "../../src/pack.ts";
import type { Slots } from "../../src/slots.ts";
import { TabBar } from "../../src/components/toggle.tsx";
import { view } from "../../src/bind.ts";
import { ButtonRow, defineWindow, ns, ref } from "./common.tsx";

export function defineTabsLazy(pack: Pack, slots: Slots): string {
  const tabs = slots.range("tabs", 2);
  const panes = [slots.range("pane0", 2), slots.range("pane1", 2)];
  const n = ns(pack);
  n.define("tl_tabs", (
    <TabBar
      name="tl_tabs"
      size={[192, 22]}
      toggleDef="ffr.tab_toggle"
      tabs={[0, 1].map((i) => ({ name: `jur_t${i}`, index: tabs.at(i) }))}
    />
  ));
  panes.forEach((r, i) => {
    n.define(`tl_pane_${i}`, <ButtonRow name={`tl_pane_${i}`} range={r} />);
    n.define(`tl_lazy_${i}`, (
      <stack_panel
        name={`tl_lazy_${i}`}
        size={[144, 128]}
        factory={{ name: `jur_tl${i}`, control_name: ref(`tl_pane_${i}`) }}
        bindings={[view("(#toggle_state * 1)", "#collection_length", { condition: "always", control: `jur_t${i}` })]}
      />
    ));
  });
  n.define("tl_panes", (
    <panel name="tl_panes" size={[144, 128]}>
      {[0, 1].map((i) => <use name={`g${i}`} def={ref(`tl_lazy_${i}`)} />)}
    </panel>
  ));
  defineWindow(pack, "tl", {
    "$mode_title": "탭 고를 때 팩토리로 생성 (방식 D)",
    "$tabs_def": ref("tl_tabs"),
    "$panes_def": ref("tl_panes"),
    "$tab": 0,
  });
  return ref("tl");
}
