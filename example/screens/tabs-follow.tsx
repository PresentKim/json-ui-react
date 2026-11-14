// tabs-follow: 패널이 탭 토글 상태에 바인딩되어 보인다(방식 C).
import type { Pack } from "../../src/pack.ts";
import type { Slots } from "../../src/slots.ts";
import { TabBar } from "../../src/components/toggle.tsx";
import { view } from "../../src/bind.ts";
import { ButtonList, defineWindow, ns, ref } from "./common.tsx";

export function defineTabsFollow(pack: Pack, slots: Slots): string {
  const tabs = slots.range("tabs", 2);
  const panes = [slots.range("pane0", 2), slots.range("pane1", 2)];
  const n = ns(pack);
  n.define("tf_tabs", (
    <TabBar
      name="tf_tabs"
      size={[192, 22]}
      toggleDef="ffr.tab_toggle"
      tabs={[0, 1].map((i) => ({ name: `jur_t${i}`, index: tabs.at(i) }))}
    />
  ));
  n.define("tf_panes", (
    <panel name="tf_panes" size={[180, 128]}>
      {panes.map((r, i) => (
        <ButtonList
          name={`p${i}`}
          range={r}
          bindings={[view("#toggle_state", "#visible", { condition: "always", control: `jur_t${i}` })]}
        />
      ))}
    </panel>
  ));
  defineWindow(pack, "tf", {
    "$mode_title": "토글 상태 따라가기 (방식 C)",
    "$tabs_def": ref("tf_tabs"),
    "$panes_def": ref("tf_panes"),
    "$tab": 0,
  });
  return ref("tf");
}
