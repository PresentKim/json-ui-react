// 고수준 기본 테마: 창·버튼·탭·칸·목록·상세 부품 얼굴 정의와 텍스처(textures/ui/jur/*).
// example/screens/common.tsx와 연구 화면(faces.json)에서 고수준 컴포넌트가 쓰는 것만 옮겼다.
import { readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import type { Namespace } from "../pack.ts";
import type { JsonObject } from "../types.ts";
import { radioToggleBody } from "../components/toggle.tsx";

/** 테마 텍스처가 RP 안에 놓이는 경로. */
export const THEME_TEXTURES = "textures/ui/jur";

const tex = (name: string): string => `${THEME_TEXTURES}/${name}`;

/** 패키지에 든 테마 텍스처: RP 상대 경로 -> 바이트. 팩에 그대로 복사한다. */
export function themeTextures(): Record<string, Uint8Array> {
  const dir = new URL("./textures/", import.meta.url);
  const out: Record<string, Uint8Array> = {};
  for (const f of readdirSync(fileURLToPath(dir)).sort()) {
    out[`${THEME_TEXTURES}/${f}`] = new Uint8Array(readFileSync(new URL(f, dir)));
  }
  return out;
}

/** 테마 정의를 네임스페이스 하나에 만든다. 참조는 모두 그 네임스페이스 이름으로 건다. */
export function defineTheme(n: Namespace): void {
  const N = n.name;
  const d = (k: string, body: JsonObject): void => void n.define(k, body);

  // 컬렉션 칸의 아이콘과 글자
  d("icon_image", {
    type: "image",
    layer: 2,
    "$icon_size|default": [16, 16],
    size: "$icon_size",
    bindings: [{ binding_type: "collection", binding_collection_name: "form_buttons", binding_name: "#form_button_texture", binding_name_override: "#texture", binding_condition: "always" }],
  });
  d("text_label", {
    type: "label",
    layer: 3,
    localize: false,
    "$text_color|default": [0.2, 0.2, 0.2],
    color: "$text_color",
    font_scale_factor: 0.8,
    text: "#form_button_text",
    bindings: [{ binding_type: "collection", binding_collection_name: "form_buttons", binding_name: "#form_button_text", binding_condition: "always" }],
  });
  d("panes_none", { type: "panel", size: [144, 128] });

  // 아이콘 + 글자 버튼(ButtonList 칸)
  d("btn_face", {
    type: "panel",
    size: ["100%", "100%"],
    "$btn_bg|default": tex("button"),
    controls: [
      { bg: { type: "image", texture: "$btn_bg", size: ["100%", "100%"] } },
      { [`icon@${N}.icon_image`]: { "$icon_size": [16, 16], offset: [3, 0], anchor_from: "left_middle", anchor_to: "left_middle" } },
      { [`text@${N}.text_label`]: { size: ["100% - 26px", "default"], offset: [24, 0], anchor_from: "left_middle", anchor_to: "left_middle" } },
    ],
  });
  d("btn@common.button", {
    size: [172, 20],
    "$focus_enabled": false,
    "$pressed_button_name": "button.form_button_click",
    bindings: [{ binding_type: "collection_details", binding_collection_name: "form_buttons", binding_condition: "always" }],
    controls: [
      { [`default@${N}.btn_face`]: {} },
      { [`hover@${N}.btn_face`]: { "$btn_bg": tex("button_hover") } },
      { [`pressed@${N}.btn_face`]: { "$btn_bg": tex("button_pressed") } },
    ],
  });

  // 창: 판 하나(single)와 왼쪽 목록 + 오른쪽 상세(split)
  const frame = (w: number): JsonObject[] => [
    { dim: { type: "image", texture: "textures/ui/Black", alpha: 0.5, keep_ratio: false, size: [4000, 4000], layer: -8 } },
    { bevel: { type: "image", texture: tex("panel_bevel"), size: ["100%", "100%"] } },
    { "tabs@$tabs_def": { anchor_from: "top_left", anchor_to: "top_left", offset: [8, -22], layer: 3 } },
    { title: { type: "label", layer: 3, localize: false, color: [0.25, 0.25, 0.25], text: "$mode_title", anchor_from: "top_middle", anchor_to: "top_middle", offset: [0, 6] } },
    { "close@common.close_button": {} },
    {
      [w === 200 ? "pane" : "left"]: {
        type: "image",
        texture: tex("panel"),
        size: [w === 200 ? 188 : 152, 136],
        offset: [6, 22],
        anchor_from: "top_left",
        anchor_to: "top_left",
        layer: 1,
        controls: [{ "panes@$panes_def": { anchor_from: "top_left", anchor_to: "top_left", offset: [4, 4] } }],
      },
    },
  ];
  const win = (w: number): JsonObject => ({
    type: "image",
    texture: "textures/ui/dialog_background_opaque",
    size: [w, 166],
    max_size: ["100% - 8px", "100% - 8px"],
    offset: [0, 8],
    layer: 60,
    "$tabs_def|default": `${N}.panes_none`,
  });
  d("window", { ...win(200), controls: frame(200) });
  d("window_split", {
    ...win(326),
    "$right_def|default": `${N}.panes_none`,
    controls: [
      ...frame(326),
      {
        right: {
          type: "image",
          texture: tex("panel"),
          size: [158, 136],
          offset: [162, 22],
          anchor_from: "top_left",
          anchor_to: "top_left",
          layer: 1,
          controls: [{ "detail@$right_def": { anchor_from: "top_left", anchor_to: "top_left", offset: [4, 4] } }],
        },
      },
    ],
  });

  // 탭: 얼굴 3개와 라디오 토글. 탭 글자·아이콘은 탭 칸의 컬렉션에서 읽는다.
  d("tab_face", {
    type: "panel",
    size: ["100%", "100%"],
    "$tab_texture|default": "textures/ui/TabTopBack",
    "$tab_text_color|default": [0.95, 0.95, 0.95],
    controls: [
      { bg: { type: "image", texture: "$tab_texture", size: ["100%", "100% + 6px"], anchor_from: "top_left", anchor_to: "top_left" } },
      { [`icon@${N}.icon_image`]: { "$icon_size": [12, 12], offset: [4, 0], anchor_from: "left_middle", anchor_to: "left_middle" } },
      { [`text@${N}.text_label`]: { "$text_color": "$tab_text_color", size: ["100% - 20px", "default"], offset: [19, 0], anchor_from: "left_middle", anchor_to: "left_middle" } },
    ],
  });
  d(`tab_face_on@${N}.tab_face`, { "$tab_texture": "textures/ui/TabTopFront", "$tab_text_color": [0.2, 0.2, 0.2] });
  d(`tab_face_hover@${N}.tab_face`, { "$tab_texture": "textures/ui/TabTopBackHover" });
  d("tab_toggle", {
    ...radioToggleBody({ group: `${N}_tabs`, size: [96, 22], forcedIndex: "$tab_index", defaultSelected: "$tab", extra: { layer: 1 } }),
    "$on_def|default": `${N}.tab_face_on`,
    "$tab|default": 0,
    controls: [{ "on@$on_def": {} }, { [`off@${N}.tab_face`]: {} }, { [`off_hover@${N}.tab_face_hover`]: {} }],
  });

  // 칸 격자: 칸 얼굴, 고른 칸(상세 자리 포함), 라디오 토글
  d("item_face", {
    type: "panel",
    size: ["100%", "100%"],
    "$slot_bg|default": "textures/ui/cell_image",
    controls: [{ bg: { type: "image", texture: "$slot_bg", size: ["100%", "100%"] } }, { [`icon@${N}.icon_image`]: {} }],
  });
  d("item_chosen", {
    type: "panel",
    size: ["100%", "100%"],
    controls: [
      { [`face@${N}.item_face`]: { "$slot_bg": tex("slot_chosen") } },
      { sel: { type: "image", layer: 4, texture: "textures/ui/focus_border_white", size: ["100%", "100%"], color: [1, 0.85, 0.1] } },
      { "detail@$detail_def": { layer: 20, anchor_from: "top_left", anchor_to: "top_left", offset: "$detail_offset" } },
    ],
  });
  d("item_toggle", {
    ...radioToggleBody({
      group: `${N}_items`, size: [18, 18], forcedIndex: "$k", defaultSelected: -1,
      extra: { layer: 1, anchor_from: "top_left", anchor_to: "top_left" },
    }),
    controls: [
      { [`on@${N}.item_chosen`]: {} },
      { [`off@${N}.item_face`]: {} },
      { [`off_hover@${N}.item_face`]: { "$slot_bg": tex("button_hover") } },
    ],
  });
  d("detail_icon", {
    type: "panel",
    size: [28, 28],
    controls: [{ bg: { type: "image", texture: "textures/ui/cell_image", size: ["100%", "100%"] } }, { [`icon@${N}.icon_image`]: { "$icon_size": [22, 22] } }],
  });
  d("text_item", {
    type: "panel",
    size: ["100%", 10],
    controls: [{ [`label@${N}.text_label`]: { size: ["100%", "default"], anchor_from: "left_middle", anchor_to: "left_middle" } }],
  });

  // 상세 부품(DetailPanel 안): 머리글, 여러 줄 글, 아이콘 칸, 행동 버튼. FFR 연구 화면 faces.json에서 옮겼다.
  d("header_label", { type: "label", layer: 3, localize: false, color: [0.35, 0.35, 0.35], font_scale_factor: 0.8, size: ["100%", 10] });
  // 여러 줄 글: 높이가 글 줄 수를 따른다(100%c).
  d("text_block", {
    type: "panel",
    size: ["100%", "100%c"],
    controls: [{ [`label@${N}.text_label`]: { size: ["100%", "default"] } }],
  });
  // 아이콘 칸 얼굴: 아이콘 + 오른쪽 아래 숫자 + 표식(§0§s§r)이 있으면 노란 테두리.
  d("icon_slot_face", {
    type: "panel",
    size: ["100%", "100%"],
    "$slot_bg|default": "textures/ui/cell_image",
    controls: [
      { bg: { type: "image", texture: "$slot_bg", size: ["100%", "100%"] } },
      { [`icon@${N}.icon_image`]: {} },
      { [`count@${N}.text_label`]: { anchor_from: "bottom_right", anchor_to: "bottom_right", offset: [0, 1], "$text_color": [1, 1, 1], shadow: true } },
      {
        sel: {
          type: "image", layer: 4, texture: "textures/ui/focus_border_white", size: ["100%", "100%"], color: [1, 0.85, 0.1],
          bindings: [
            { binding_type: "collection", binding_collection_name: "form_buttons", binding_name: "#form_button_text", binding_condition: "always" },
            { binding_type: "view", binding_condition: "always", source_property_name: "(not ((#form_button_text - '§0§s§r') = #form_button_text))", target_property_name: "#visible" },
          ],
        },
      },
    ],
  });
  // 아이콘 칸(누를 수 없음, COL-19): 빈 칸 표식(§0§e§r)을 받은 칸은 문자열 빼기로 알아보고 숨긴다.
  // 가로 스택은 숨긴 칸에 자리를 주지 않으므로(LAY-04) 있는 칸만 왼쪽부터 붙는다.
  d("icon_slot", {
    type: "panel",
    size: [18, 18],
    controls: [{ [`face@${N}.icon_slot_face`]: {} }],
    bindings: [
      { binding_type: "collection", binding_collection_name: "form_buttons", binding_name: "#form_button_text", binding_condition: "always" },
      { binding_type: "view", binding_condition: "always", source_property_name: "((#form_button_text - '§0§e§r') = #form_button_text)", target_property_name: "#visible" },
    ],
  });
  // 행동 버튼(ActionButton): 글자 버튼, 얼굴 3개(기본·hover·눌림).
  d("action_face", {
    type: "panel",
    size: ["100%", "100%"],
    "$slot_bg|default": tex("button"),
    controls: [
      { bg: { type: "image", texture: "$slot_bg", size: ["100%", "100%"] } },
      { [`text@${N}.text_label`]: { "$text_color": [0.95, 0.95, 0.95] } },
    ],
  });
  d("action_button@common.button", {
    size: [150, 18],
    "$focus_enabled": false,
    "$pressed_button_name": "button.form_button_click",
    bindings: [{ binding_type: "collection_details", binding_collection_name: "form_buttons", binding_condition: "always" }],
    controls: [
      { [`default@${N}.action_face`]: {} },
      { [`hover@${N}.action_face`]: { "$slot_bg": tex("button_hover") } },
      { [`pressed@${N}.action_face`]: { "$slot_bg": tex("button_pressed") } },
    ],
  });
  // 페이지 화살표 버튼(Pager): $arrow_tex 화살표 그림.
  d("arrow_face", {
    type: "panel",
    size: ["100%", "100%"],
    "$slot_bg|default": tex("button"),
    controls: [
      { bg: { type: "image", texture: "$slot_bg", size: ["100%", "100%"] } },
      { arrow: { type: "image", layer: 2, texture: "$arrow_tex", size: [10, 10] } },
    ],
  });
  d("pager@common.button", {
    size: [18, 18],
    "$focus_enabled": false,
    "$pressed_button_name": "button.form_button_click",
    bindings: [{ binding_type: "collection_details", binding_collection_name: "form_buttons", binding_condition: "always" }],
    controls: [
      { [`default@${N}.arrow_face`]: {} },
      { [`hover@${N}.arrow_face`]: { "$slot_bg": tex("button_hover") } },
      { [`pressed@${N}.arrow_face`]: { "$slot_bg": tex("button_pressed") } },
    ],
  });

  // 가상 목록: 칸 얼굴(이름 12자 + 설명 20자 + 진행 숫자), 칸 버튼, 스크롤 창
  const text = (prop: string): JsonObject[] => [
    { binding_type: "collection", binding_collection_name: "form_buttons", binding_name: "#form_button_text", binding_condition: "always" },
    { binding_type: "view", binding_condition: "always", source_property_name: prop, target_property_name: "#text" },
  ];
  const at = (offset: [number, number]): JsonObject => ({ offset, anchor_from: "top_left", anchor_to: "top_left" });
  d("list_face", {
    type: "panel",
    size: ["100%", "100%"],
    "$bg_texture|default": "textures/ui/button_borderless_light",
    controls: [
      { bg: { type: "image", texture: "$bg_texture", size: ["100% - 2px", "100% - 2px"] } },
      { icon: { type: "image", layer: 2, size: [16, 16], ...at([3, 3]), bindings: [{ binding_type: "collection", binding_collection_name: "form_buttons", binding_name: "#form_button_texture", binding_name_override: "#texture" }] } },
      { name: { type: "label", layer: 3, size: [76, 10], ...at([22, 3]), color: [0.1, 0.1, 0.1], localize: false, text: "#text", bindings: text("('%.12s' * #form_button_text)") } },
      { desc: { type: "label", layer: 3, size: [76, 8], ...at([22, 13]), font_scale_factor: 0.7, color: [0.3, 0.3, 0.3], localize: false, text: "#text", bindings: text("(('%.32s' * #form_button_text) - ('%.12s' * #form_button_text))") } },
      { bar_bg: { type: "image", layer: 2, texture: "textures/ui/empty_progress_bar", size: [76, 3], ...at([22, 24]) } },
      {
        bar: {
          type: "image", layer: 3, texture: "textures/ui/filled_progress_bar", size: [76, 3], ...at([22, 24]), clip_direction: "left",
          bindings: [
            { binding_type: "collection", binding_collection_name: "form_buttons", binding_name: "#form_button_text" },
            { binding_type: "view", source_property_name: "(1 - (((#form_button_text - ('%.32s' * #form_button_text)) * 1) / 100))", target_property_name: "#clip_ratio" },
          ],
        },
      },
    ],
  });
  d("list_cell@common.button", {
    size: [100, 30],
    "$focus_enabled": false,
    "$pressed_button_name": "button.form_button_click",
    bindings: [{ binding_type: "collection_details", binding_collection_name: "form_buttons", binding_condition: "always" }],
    controls: [
      { [`default@${N}.list_face`]: {} },
      { [`hover@${N}.list_face`]: { "$bg_texture": "textures/ui/button_borderless_lighthover" } },
      { [`pressed@${N}.list_face`]: { "$bg_texture": "textures/ui/button_borderless_lightpressed" } },
    ],
  });
  d("list_scroll", {
    type: "panel",
    size: [216, "100% - 24px"],
    offset: [0, 18],
    anchor_from: "top_middle",
    anchor_to: "top_middle",
    controls: [{
      "scrolling_panel@common.scrolling_panel": {
        anchor_to: "top_left", anchor_from: "top_left", "$show_background": false, size: ["100%", "100%"],
        "$scrolling_content": "$list_content", "$scroll_size": [5, "100% - 4px"], "$scrolling_pane_size": ["100% - 4px", "100% - 2px"],
        "$scrolling_pane_offset": [2, 0], "$scroll_bar_right_padding_size": [0, 0],
      },
    }],
  });
  d("list_window", {
    type: "image",
    texture: "textures/ui/dialog_background_opaque",
    size: [224, "85%"],
    layer: 60,
    "$list_title|default": "",
    "$list_content|default": `${N}.panes_none`,
    controls: [
      { head: { type: "label", layer: 3, anchor_from: "top_left", anchor_to: "top_left", offset: [6, 6], text: "$list_title", localize: false, color: [0.25, 0.25, 0.25], font_scale_factor: 0.8 } },
      { "close@common.close_button": {} },
      { [`scroll@${N}.list_scroll`]: {} },
    ],
  });
}
