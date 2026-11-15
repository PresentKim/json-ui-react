// 라디오 토글 본문과 탭 줄 컴포넌트.
import type { JsonObject, JuiElement } from "../types.ts";
import { StackPanel, Use } from "../controls/components.tsx";

export function radioToggleBody(opts: {
  group: string;
  size: [number, number];
  forcedIndex: string | number;
  defaultSelected: string | number;
  extra?: JsonObject;
}): JsonObject {
  return {
    type: "toggle",
    size: opts.size,
    ...(opts.extra ?? {}),
    focus_enabled: false,
    sound_name: "random.click",
    sound_volume: 1.0,
    sound_pitch: 1.0,
    toggle_name: opts.group,
    radio_toggle_group: true,
    toggle_group_forced_index: opts.forcedIndex,
    toggle_group_default_selected: opts.defaultSelected,
    toggle_on_button: "toggle.toggle_on",
    toggle_off_button: "toggle.toggle_off",
    button_mappings: [
      { from_button_id: "button.menu_select", to_button_id: "button.menu_select", mapping_type: "pressed" },
      { from_button_id: "button.menu_ok", to_button_id: "button.menu_ok", mapping_type: "focused" },
    ],
    checked_control: "on",
    checked_hover_control: "on",
    checked_locked_control: "on",
    checked_locked_hover_control: "on",
    unchecked_control: "off",
    unchecked_hover_control: "off_hover",
    unchecked_locked_control: "off",
    unchecked_locked_hover_control: "off",
  };
}

/** form_buttons 컬렉션 위에 토글 정의를 가로로 늘어놓는다. 각 탭의 `$tab_index`는 순서 번호. */
export function TabBar(props: {
  name: string;
  size: [number, number];
  toggleDef: string;
  tabs: { name: string; index: number; vars?: JsonObject }[];
}): JuiElement {
  return (
    <StackPanel name={props.name} orientation="horizontal" size={props.size} collection_name="form_buttons">
      {props.tabs.map((t, i) => (
        <Use name={t.name} def={props.toggleDef} collection_index={t.index} {...{ $tab_index: i }} {...(t.vars ?? {})} />
      ))}
    </StackPanel>
  );
}
