// 예시 화면 공통 도우미.
import type { JsonObject, JuiElement } from "../../src/types.ts";
import type { Pack } from "../../src/pack.ts";
import type { SlotRange } from "../../src/slots.ts";
import { SlotGrid } from "../../src/components/grid.tsx";

export const NS = "jur";
export const ref = (key: string): string => `${NS}.${key}`;

/** 화면 한 개를 뜻하는 정의 키 조각을 jur 네임스페이스에 정의한다. */
export function ns(pack: Pack) {
  return pack.ns(NS, "jur.json");
}

/** 글자 버튼 한 개의 크기. 판 안(폭 180)에 들어가도록 172x20. */
export const BTN: [number, number] = [172, 20];
/** 글자 버튼 줄 높이(버튼 20 + 틈 2). */
export const BTN_ROW = 22;

const WIN_W = 200;

/**
 * 예시 공통 정의를 jur 네임스페이스에 한 번 만든다.
 * - btn: 아이콘 + 글자 버튼(칸 18px 대신 쓴다). 아이콘/글자는 형제 칸의 컬렉션을 읽는다.
 * - window1: 한 판짜리 창(오른쪽 판 없음). `$tabs_def`, `$panes_def`, `$mode_title`을 받는다.
 */
export function defineCommon(pack: Pack): void {
  const n = ns(pack);
  n.define("btn_face", {
    type: "panel",
    size: ["100%", "100%"],
    "$btn_bg|default": "textures/ui/ffr/button",
    controls: [
      { bg: { type: "image", texture: "$btn_bg", size: ["100%", "100%"] } },
      { "icon@ffr.icon_image": { "$icon_size": [16, 16], offset: [3, 0], anchor_from: "left_middle", anchor_to: "left_middle" } },
      { "text@ffr.text_label": { size: ["100% - 26px", "default"], offset: [24, 0], anchor_from: "left_middle", anchor_to: "left_middle" } },
    ],
  });
  n.define("btn@common.button", {
    size: BTN,
    "$focus_enabled": false,
    "$pressed_button_name": "button.form_button_click",
    bindings: [{ binding_type: "collection_details", binding_collection_name: "form_buttons", binding_condition: "always" }],
    controls: [
      { "default@jur.btn_face": {} },
      { "hover@jur.btn_face": { "$btn_bg": "textures/ui/ffr/button_hover" } },
      { "pressed@jur.btn_face": { "$btn_bg": "textures/ui/ffr/button_pressed" } },
    ],
  });
  n.define("window1", {
    type: "image",
    texture: "textures/ui/dialog_background_opaque",
    size: [WIN_W, 166],
    max_size: ["100% - 8px", "100% - 8px"],
    offset: [0, 8],
    layer: 60,
    "$tabs_def|default": "ffr.panes_none",
    controls: [
      { dim: { type: "image", texture: "textures/ui/Black", alpha: 0.5, keep_ratio: false, size: [4000, 4000], layer: -8 } },
      { bevel: { type: "image", texture: "textures/ui/ffr/panel_bevel", size: ["100%", "100%"] } },
      { "tabs@$tabs_def": { anchor_from: "top_left", anchor_to: "top_left", offset: [8, -22], layer: 3 } },
      { title: { type: "label", layer: 3, localize: false, color: [0.25, 0.25, 0.25], text: "$mode_title", anchor_from: "top_middle", anchor_to: "top_middle", offset: [0, 6] } },
      { "close@common.close_button": {} },
      {
        pane: {
          type: "image",
          texture: "textures/ui/ffr/panel",
          size: [WIN_W - 12, 136],
          offset: [6, 22],
          anchor_from: "top_left",
          anchor_to: "top_left",
          layer: 1,
          controls: [{ "panes@$panes_def": { anchor_from: "top_left", anchor_to: "top_left", offset: [4, 4] } }],
        },
      },
    ],
  });
}

/** 한 판짜리 창: `<code>@jur.window1`. 반환값은 라우터가 쓸 참조. */
export function defineWindow(pack: Pack, code: string, vars: JsonObject): string {
  return ns(pack).define(`${code}@jur.window1`, { ...vars });
}

/** 두 판짜리 창(ffr.window): 오른쪽 판 정의 `$right_def`를 반드시 받는다. */
export function defineSplitWindow(pack: Pack, code: string, vars: JsonObject & { "$right_def": string }): string {
  return ns(pack).define(`${code}@ffr.window`, { "$tabs_def": "ffr.panes_none", ...vars });
}

/** 슬롯 구간을 세로로 쌓은 글자 버튼(아이콘 + 글자)으로 만든다. 줄마다 컬렉션 stack_panel이 직속 부모다(COL-38, COL-50). */
export function ButtonList(p: { name: string; range: SlotRange; bindings?: JsonObject[] }): JuiElement {
  const n = p.range.count;
  return (
    <SlotGrid
      name={p.name}
      size={[BTN[0], n * BTN_ROW]}
      rows={n}
      cols={1}
      rowHeight={BTN_ROW}
      rowWidth={BTN[0]}
      bindings={p.bindings}
      cell={(pos) => <use name={`b${pos}`} def="jur.btn" collection_index={p.range.at(pos)} />}
    />
  );
}
