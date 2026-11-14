// tabs-lazy: 탭을 고를 때만 팩토리로 패널을 만든다(방식 D).
import type { Pack } from "../../src/pack.ts";
import type { Slots } from "../../src/slots.ts";
import { TabBar } from "../../src/components/toggle.tsx";
import { view } from "../../src/bind.ts";
import { ButtonList, TOP_LEFT, defineWindow, ns, ref } from "./common.tsx";

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
  // 첫 탭은 처음부터 열려 있으므로 미리 만들고 토글 상태로만 보이게 한다.
  // 첫 탭까지 `#toggle_state` 길이 팩토리로 만들면 처음 열 때 비고, 탭을 한 번 눌러야 채워진다(연구 화면 3절 D).
  n.define("tl_pane_0", (
    <ButtonList
      name="tl_pane_0"
      range={panes[0]!}
      props={TOP_LEFT}
      bindings={[view("#toggle_state", "#visible", { condition: "always", control: "jur_t0" })]}
    />
  ));
  // 둘째 탭부터는 그 탭을 처음 고를 때 팩토리가 만든다.
  n.define("tl_pane_1", <ButtonList name="tl_pane_1" range={panes[1]!} />);
  n.define("tl_lazy_1", (
    <stack_panel
      name="tl_lazy_1"
      size={[180, 128]}
      factory={{ name: "jur_tl1", control_name: ref("tl_pane_1") }}
      bindings={[view("(#toggle_state * 1)", "#collection_length", { condition: "always", control: "jur_t1" })]}
    />
  ));
  n.define("tl_panes", (
    <panel name="tl_panes" size={[180, 128]}>
      <use name="g0" def={ref("tl_pane_0")} />
      <use name="g1" def={ref("tl_lazy_1")} />
    </panel>
  ));
  defineWindow(pack, "tl", {
    "$mode_title": "Tabs: built by factory on select (D)",
    "$tabs_def": ref("tl_tabs"),
    "$panes_def": ref("tl_panes"),
    "$tab": 0,
  });
  return ref("tl");
}
