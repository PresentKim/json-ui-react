import { describe, expect, it } from "vitest";
import type { FactorySpec, ImageProps, LabelProps, StackPanelProps } from "../../src/controls/visual.ts";
import type { BindingObj, CommonProps } from "../../src/controls/common.ts";
import type { ButtonMapping, MenuButtonId, RadioGroupKeys } from "../../src/controls/input.ts";
import { BUTTON_IDS } from "../../src/controls/input.ts";
import type { Modification, ModOperation } from "../../src/modify.ts";
import { animation, type AnimDef } from "../../src/anim.ts";

// vitest 는 타입을 검사하지 않으므로 @ts-expect-error 가 실제로 걸리는지는 tests/controls/tsc.test.ts 가 tsc 로 확인한다.
describe("남은 타입 규칙 (@ts-expect-error 는 tsc 에서만 검사)", () => {
  it("COL-28/COL-42: factory 는 control_name 과 control_ids 를 함께 쓸 수 없다", () => {
    const a: FactorySpec = { name: "f", control_name: "item" };
    const b: FactorySpec = { name: "f", control_ids: { x: "item" }, max_children_size: 0 };
    // @ts-expect-error 둘을 함께 두면 control_ids 는 읽히지 않는다
    const c: FactorySpec = { name: "f", control_name: "item", control_ids: { x: "item" } };
    // @ts-expect-error 둘 중 하나는 필요하다
    const d: FactorySpec = { name: "f" };
    expect([a, b, c, d]).toHaveLength(4);
  });

  it("COL-41: factory_variables 는 $변수 이름 배열", () => {
    const ok: CommonProps = { factory_variables: ["$a", "$b"] };
    // @ts-expect-error 배열이 아니면 조용히 무시된다
    const bad1: CommonProps = { factory_variables: "$a" };
    // @ts-expect-error 항목은 $변수 문자열
    const bad2: CommonProps = { factory_variables: [1] };
    expect([ok, bad1, bad2]).toHaveLength(3);
  });

  it("ANI-09/ANI-19: 애니메이션 필드", () => {
    const ok: AnimDef = { anim_type: "alpha", from: 0, to: 1, duration: 1, reversible: true, looping: true, start_event: "e", activated: true, scale_from_starting_alpha: true };
    // @ts-expect-error wait 는 from/to 가 없다
    const w: AnimDef = { anim_type: "wait", duration: 1, from: 0 };
    // @ts-expect-error flip_book 은 frame_count 가 필요하다
    const f: AnimDef = { anim_type: "flip_book" };
    // @ts-expect-error 모르는 필드
    const u: AnimDef = { anim_type: "alpha", from: 0, to: 1, duration: 1, bogus: 1 };
    expect(animation(ok).anim_type).toBe("alpha");
    expect([w, f, u]).toHaveLength(3);
    const c: CommonProps = { animation_reset_name: "x", disable_anim_fast_forward: true };
    expect(c).toBeTruthy();
  });

  it("ANI-17/LAY-28: tiled 는 true/false/\"x\"/\"y\"", () => {
    const a: ImageProps[] = [{ tiled: true }, { tiled: "x" }, { tiled: "y" }, { tiled: "$t" }];
    // @ts-expect-error 알 수 없는 축 값
    const b: ImageProps = { tiled: "z" };
    expect([a, b]).toHaveLength(2);
  });

  it("BND-23/BND-35: binding_condition 은 이름표 6종", () => {
    const a: BindingObj = { binding_condition: "visibility_changed" };
    // @ts-expect-error 모르는 값은 조용히 none 으로 동작한다
    const b: BindingObj = { binding_condition: "sometimes" };
    expect([a, b]).toHaveLength(2);
  });

  it("INP-01: 버튼 상태 키는 ButtonProps 로 제한", () => {
    // @ts-expect-error 오타난 상태 키
    const b: import("../../src/controls/input.ts").ButtonProps = { hovr_control: "x" };
    expect(b).toBeTruthy();
  });

  it("INP-03/INP-33: 버튼 ID 유니언에 엔진 button.menu_* 포함", () => {
    const ids: MenuButtonId[] = ["button.menu_emote_slot_0", "button.menu_textedit_down", "button.menu_autocomplete_back"];
    for (const id of ids) expect(BUTTON_IDS).toContain(id);
    // @ts-expect-error 목록에 없는 menu_ ID
    const bad: MenuButtonId = "button.menu_nothing";
    const m: ButtonMapping = { from_button_id: "button.menu_ok", to_button_id: "button.custom_x", mapping_type: "pressed" };
    expect([bad, m]).toHaveLength(2);
  });

  it("INP-12: 라디오 그룹은 toggle_name 이 필수", () => {
    type Keys = RadioGroupKeys;
    const ok: Keys = { radio_toggle_group: true, toggle_name: "g" };
    // @ts-expect-error radio_toggle_group: true 에는 toggle_name 이 필요하다
    const bad: Keys = { radio_toggle_group: true };
    expect([ok, bad]).toHaveLength(2);
  });

  it("LAY-06/LAY-22/LAY-27/LAY-29/TXT-02/TXT-16: 속성 타입", () => {
    const c: CommonProps = { max_size: [314, "100% - 64px"], min_size: [1, 1], clips_children: true, allow_clipping: false, grid_position: [0, 1] };
    const i: ImageProps = { nineslice_size: [1, 2, 3, 4], base_size: [16, 16] };
    // @ts-expect-error grid_position 은 [행, 열] 튜플
    const g: CommonProps = { grid_position: [0, 1, 2] };
    // @ts-expect-error text_alignment 값
    const l1: LabelProps = { text_alignment: "middle" };
    const l2: LabelProps = { text: "a", font_scale_factor: 2, line_padding: 3, backup_font_type: "smooth", locked_color: [1, 1, 1], locked_alpha: 0.5, hide_hyphen: true, notify_on_ellipses: ["x"] };
    // @ts-expect-error line_padding 은 숫자
    const l3: LabelProps = { line_padding: "wide" };
    const s: StackPanelProps = { orientation: "vertical" };
    expect([c, i, g, l1, l2, l3, s]).toHaveLength(7);
  });

  it("MOD-01/MOD-14/MOD-23: modifications 항목 키와 operation 11종", () => {
    const ok: Modification = { array_name: "controls", operation: "swap", where: {}, target: {} };
    const ops: ModOperation[] = ["insert_back", "insert_front", "insert_after", "insert_before", "move_back", "move_front", "move_after", "move_before", "swap", "replace", "remove"];
    // @ts-expect-error 11종 밖의 연산
    const bad1: Modification = { array_name: "controls", operation: "append" };
    // @ts-expect-error 모르는 키
    const bad2: Modification = { array_name: "controls", operation: "remove", foo: 1 };
    // @ts-expect-error array_name 은 controls | bindings
    const bad3: Modification = { array_name: "other", operation: "remove" };
    expect([ok, bad1, bad2, bad3, ops]).toHaveLength(5);
  });
});
