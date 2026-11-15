// 입력 계열 컨트롤(button/toggle/input_panel/slider/edit_box/scroll_view 등)의 속성 타입.
import type { CommonProps, Size, Var, Color } from "./common.ts";

/** 바닐라/문서에 나오는 버튼 id 목록(value-dictionary 및 json-ui 문서 실측 기준). */
export const BUTTON_IDS = [
  "button.menu_select",
  "button.menu_ok",
  "button.menu_cancel",
  "button.menu_exit",
  "button.menu_up",
  "button.menu_left",
  "button.menu_right",
  "button.menu_continue",
  "button.menu_clear",
  "button.menu_play",
  "button.menu_edu_play",
  "button.menu_achievements",
  "button.menu_autocomplete",
  "button.menu_auto_place",
  "button.menu_tab_left",
  "button.menu_alternate_tab_left",
  "button.menu_secondary_select",
  "button.menu_tertiary_select",
  "button.menu_textedit_up",
  "button.menu_textcursorleft",
  "button.menu_textcursorright",
  "button.menu_inventory_cancel",
  "button.menu_inventory_exit",
  "button.menu_inventory_drop",
  "button.menu_inventory_drop_all",
  "button.container_auto_place",
  "button.drop_one",
  "button.drop_all",
  "button.controller_select",
  "button.controller_start",
  "button.controller_secondary_select_right",
  "button.form_button_click",
  "button.submit_custom_form",
  "button.scrollbar_skip_track",
  "button.turn_doll",
  "button.click_on",
  "button.click_off",
  "button.noop",
  "button.df_noop",
  "button.close",
  "button.back",
  "button.access",
] as const;

export type ButtonId = (typeof BUTTON_IDS)[number];
export type MappingType = "pressed" | "global" | "focused" | "double_pressed";
export type InputModeCondition = "gamepad" | "gamepad_and_not_gaze" | "not_gamepad" | "not_gaze";

/** 버튼 매핑. 바닐라 id 외 사용자 정의 id도 허용한다. */
export interface ButtonMapping {
  from_button_id: ButtonId | (string & {}) | Var;
  to_button_id: ButtonId | (string & {}) | Var;
  mapping_type: MappingType;
  consume_event?: boolean | Var;
  ignore_input_scope?: boolean | Var;
  button_up_right_of_first_refusal?: boolean | Var;
  input_mode_condition?: InputModeCondition | Var;
}

/** 컨트롤 참조(이름 또는 `이름@부모`) */
type Ref = string | Var;
type Bool = boolean | Var;
type Num = number | Var;

export interface ButtonProps extends CommonProps {
  default_control?: Ref;
  hover_control?: Ref;
  pressed_control?: Ref;
  locked_control?: Ref;
  sound_name?: string | Var;
  sound_volume?: Num;
  sound_pitch?: Num;
  button_mappings?: ButtonMapping[];
  focus_enabled?: Bool;
  focus_identifier?: string | Var;
  focus_change_down?: string | Var;
  focus_change_up?: string | Var;
  focus_change_left?: string | Var;
  focus_change_right?: string | Var;
  default_focus_precedence?: Num;
}

/** 토글의 8개 상태 키 — 하나라도 빠지면 hover 등에서 컨트롤이 사라진다(INP-10). */
export interface ToggleStateKeys {
  checked_control: Ref;
  checked_hover_control: Ref;
  checked_locked_control: Ref;
  checked_locked_hover_control: Ref;
  unchecked_control: Ref;
  unchecked_hover_control: Ref;
  unchecked_locked_control: Ref;
  unchecked_locked_hover_control: Ref;
}

export interface ToggleProps extends ButtonProps, ToggleStateKeys {
  toggle_name?: string | Var;
  radio_toggle_group?: Bool;
  toggle_group_forced_index?: Num | string;
  toggle_group_default_selected?: Num | string;
  toggle_default_state?: Bool;
  enable_directional_toggling?: Bool;
  toggle_on_button?: string | Var;
  toggle_off_button?: string | Var;
  toggle_grid_collection_name?: string | Var;
  toggle_property_bag?: Record<string, unknown>;
}

export interface InputPanelProps extends CommonProps {
  modal?: Bool;
  is_swipeable?: Bool;
  consume_hover_events?: Bool;
  always_listen_to_input?: Bool;
  hover_enabled?: Bool;
  prevent_touch_input?: Bool;
  button_mappings?: ButtonMapping[];
  focus_enabled?: Bool;
  focus_identifier?: string | Var;
  default_focus_precedence?: Num;
}

export interface SliderProps extends CommonProps {
  slider_name?: string | Var;
  slider_steps?: Num;
  slider_direction?: "vertical" | "horizontal" | Var;
  slider_box_control?: Ref;
  background_control?: Ref;
  background_hover_control?: Ref;
  progress_control?: Ref;
  progress_hover_control?: Ref;
  slider_track_button?: Ref;
  slider_small_decrease_button?: Ref;
  slider_small_increase_button?: Ref;
  slider_selected_button?: Ref;
  slider_deselected_button?: Ref;
  slider_collection_name?: string | Var;
  default_control?: Ref;
  hover_control?: Ref;
  button_mappings?: ButtonMapping[];
}

export interface SliderBoxProps extends CommonProps {
  default_control?: Ref;
  hover_control?: Ref;
  locked_control?: Ref;
  button_mappings?: ButtonMapping[];
}

export interface EditBoxProps extends CommonProps {
  text_box_name?: string | Var;
  max_length?: Num;
  text_type?: "ExtendedASCII" | "IdentifierChars" | "NumberChars" | string;
  enabled_newline?: Bool;
  text_control?: Ref;
  place_holder_control?: Ref;
  place_holder_color?: Color;
  text_color?: Color;
  property_bag?: Record<string, unknown>;
  select_on_focus_gain?: Bool;
  virtual_keyboard_buffer_control?: Ref;
  can_be_deselected?: Bool;
  always_listen_to_input?: Bool;
  button_mappings?: ButtonMapping[];
  focus_enabled?: Bool;
  focus_identifier?: string | Var;
  default_control?: Ref;
  hover_control?: Ref;
  locked_control?: Ref;
}

export interface ScrollViewProps extends CommonProps {
  scrollbar_track_button?: Ref;
  scrollbar_touch_button?: Ref;
  scroll_content?: Ref;
  scroll_box_and_track_panel?: Ref;
  scroll_box_mouse?: Ref;
  scroll_box_touch?: Ref;
  scroll_track?: Ref;
  scroll_speed?: Num;
  gesture_tracking_button?: Ref;
  jump_to_bottom_on_update?: Bool;
  always_handle_scrolling?: Bool;
  touch?: Bool;
  button_mappings?: ButtonMapping[];
}

export interface ScrollTrackProps extends CommonProps {
  default_control?: Ref;
  hover_control?: Ref;
  pressed_control?: Ref;
  button_mappings?: ButtonMapping[];
}

export interface DropdownProps extends CommonProps {
  dropdown_name?: string | Var;
  dropdown_content_control?: Ref;
  dropdown_area?: Ref;
  default_control?: Ref;
  hover_control?: Ref;
  pressed_control?: Ref;
  button_mappings?: ButtonMapping[];
}

export interface TooltipTriggerProps extends CommonProps {
  hover_text?: string | Var;
  tooltip_control?: Ref;
  tooltip_offset?: [Num, Num] | Var;
  button_mappings?: ButtonMapping[];
}

export interface CarouselLabelProps extends CommonProps {
  text?: string | Var;
  color?: Color;
  font_type?: string | Var;
  font_size?: string | Var;
  carousel_content_size?: Size;
  carousel_scroll_speed?: Num;
}

export interface SelectionWheelProps extends CommonProps {
  inner_radius?: Num;
  outer_radius?: Num;
  state_controls?: Ref[];
  slice_count?: Num;
  button_mappings?: ButtonMapping[];
}
