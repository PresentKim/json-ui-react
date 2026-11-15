import { describe, it, expect } from "vitest";
import { BUTTON_IDS } from "../../src/controls/input.ts";
import type { ButtonMapping, ToggleProps, ButtonProps } from "../../src/controls/input.ts";

describe("controls/input", () => {
  it("button_ids_vanilla", () => {
    for (const id of ["button.menu_select", "button.menu_ok", "button.container_auto_place"]) {
      expect(BUTTON_IDS).toContain(id);
    }
    expect(new Set(BUTTON_IDS).size).toBe(BUTTON_IDS.length);
  });

  it("mapping_type_enum (tsc가 검사)", () => {
    const ok: ButtonMapping = { from_button_id: "button.menu_select", to_button_id: "button.container_auto_place", mapping_type: "pressed" };
    // @ts-expect-error "click"은 mapping_type이 아니다
    const bad: ButtonMapping = { from_button_id: "a", to_button_id: "b", mapping_type: "click" };
    expect([ok, bad].length).toBe(2);
  });

  it("toggle_states_required (INP-10, tsc가 검사)", () => {
    // @ts-expect-error 8개 상태 키 누락
    const bad: ToggleProps = { toggle_name: "g" };
    const ok: ToggleProps = {
      toggle_name: "g",
      checked_control: "on",
      checked_hover_control: "on",
      checked_locked_control: "on",
      checked_locked_hover_control: "on",
      unchecked_control: "off",
      unchecked_hover_control: "off_hover",
      unchecked_locked_control: "off",
      unchecked_locked_hover_control: "off",
    };
    const b: ButtonProps = { default_control: "d" };
    expect([bad, ok, b].length).toBe(3);
  });
});

import type { ScrollViewProps as _SV } from "../../src/controls/input.ts";
describe("scroll_view 역할 속성", () => {
  it("scrolling_view_port 등 네 역할 이름을 받는다", () => {
    const sv: _SV = { scrolling_view_port: "a", scrolling_content: "b", scrollbar_track: "c", scrollbar_box: "d" };
    expect(Object.keys(sv)).toHaveLength(4);
  });
});
