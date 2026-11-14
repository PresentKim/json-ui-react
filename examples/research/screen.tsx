// 연구 화면(FFR) 전체 조립: 슬롯 배치, 시각 정의(faces.json), 코드로 만드는 정의, 라우터, 서버 폼 훅.
import { readFileSync } from "node:fs";
import type { JsonObject, JuiElement } from "../../src/types.ts";
import { render, toEntry } from "../../src/render.ts";
import { createPack, type Pack } from "../../src/pack.ts";
import { createSlots, type Slots, type SlotLayout } from "../../src/slots.ts";
import { ScreenRouter } from "../../src/components/router.tsx";
import { TabBar, radioToggleBody } from "../../src/components/toggle.tsx";
import { collection, details, global, view } from "../../src/bind.ts";
import { defineItems } from "./items.tsx";

const faces = JSON.parse(readFileSync(new URL("./faces.json", import.meta.url), "utf8")) as Record<string, JsonObject | string>;

/** 연구 화면 슬롯 배치: 탭 48x2, 탭 버튼 2, 페이지 버튼 2x2, 상세 96블록(20칸). */
export function createResearchSlots(): Slots {
  const s = createSlots();
  s.range("tab0", 48);
  s.range("tab1", 48);
  s.range("tabs", 2);
  s.range("pager0", 2);
  s.range("pager1", 2);
  s.blocks("detail", 96, [
    "head", "status", "desc",
    ...Array.from({ length: 8 }, (_, i) => `mat${i}`),
    ...Array.from({ length: 8 }, (_, i) => `rew${i}`),
    "progress",
  ]);
  return s;
}

const start = (layout: SlotLayout, name: string): number => {
  const r = layout.ranges.find((x) => x.name === name);
  if (!r) throw new Error(`슬롯 구간 "${name}"이 없습니다`);
  return r.start;
};

/** 프래그먼트 자식을 `controls` 항목 배열로 만든다. */
const entries = (el: JuiElement): JsonObject[] => render(el).map(toEntry);

/** 제목이 접두(목록 화면 `S` 제외)로 시작하면 기본 폼을 숨기는 식. */
const hideGate = (prefix: string): string =>
  `(not ((('%.${prefix.length}s' * #title_text) = '${prefix}') and not (#title_text = '${prefix}S')))`;

const ROUTES = ["ea", "eb", "fa", "fb"];

export interface ResearchOptions {
  /** 라우터 제목 접두(기본 "ffr:"). 제목은 `${접두}Ea` 꼴. */
  routePrefix?: string;
  /** false면 screen_router를 정의하지 않는다(다른 라우터가 대신 맡을 때). 기본 true. */
  router?: boolean;
}

export function defineResearch(pack: Pack, slots: Slots, opts: ResearchOptions = {}): void {
  const prefix = opts.routePrefix ?? "ffr:";
  const layout = slots.layout();
  const [t0, t1] = [start(layout, "tabs"), start(layout, "tabs") + 1];
  const [p0, p1] = [start(layout, "pager0"), start(layout, "pager1")];
  const ns = pack.ns("ffr", "ffr.json");

  const gate = hideGate(prefix);

  const code: Record<string, () => void> = {
    root: () =>
      ns.define("root", (
        <panel name="root" size={["100%", "100%"]}>
          <panel name="vanilla" size={["100%", "100%"]} bindings={[global("#title_text"), view(gate, "#visible")]}>
            <use name="content" def="server_form.main_screen_content" />
          </panel>
          <use name="list_gate" def="ffr.list_gate" />
          <use name="screen_router" def="ffr.screen_router" />
        </panel>
      )),
    tab_toggle: () =>
      ns.define("tab_toggle", {
        ...radioToggleBody({ group: "ffr_tabs", size: [96, 22], forcedIndex: "$tab_index", defaultSelected: "$tab", extra: { layer: 1 } }),
        "$on_def|default": "ffr.tab_face_on",
        "$tab|default": 0,
        controls: entries(<><use name="on" def="$on_def" /><use name="off" def="ffr.tab_face" /><use name="off_hover" def="ffr.tab_face_hover" /></>),
      }),
    tabs_toggle: () =>
      ns.define("tabs_toggle", (
        <TabBar name="tabs_toggle" size={[192, 22]} toggleDef="ffr.tab_toggle" tabs={[{ name: "ffr_t0", index: t0 }, { name: "ffr_t1", index: t1 }]} />
      )),
    item_toggle: () =>
      ns.define("item_toggle", {
        ...radioToggleBody({
          group: "ffr_items", size: [18, 18], forcedIndex: "$k", defaultSelected: -1,
          extra: { layer: 1, anchor_from: "top_left", anchor_to: "top_left" },
        }),
        controls: entries(
          <>
            <use name="on" def="ffr.item_chosen" />
            <use name="off" def="ffr.item_face" />
            <use name="off_hover" def="ffr.item_face" $slot_bg="textures/ui/ffr/button_hover" />
          </>,
        ),
      }),
    item_chosen: () =>
      ns.define("item_chosen", (
        <panel name="item_chosen" size={["100%", "100%"]}>
          <use name="face" def="ffr.item_face" $slot_bg="textures/ui/ffr/slot_chosen" />
          <image name="sel" layer={4} texture="textures/ui/focus_border_white" size={["100%", "100%"]} color={[1, 0.85, 0.1]} />
          <use name="detail" def="$detail_def" layer={20} anchor_from="top_left" anchor_to="top_left" offset="$detail_offset" />
        </panel>
      )),
    lazy_detail: () =>
      ns.define("lazy_detail", (
        <stack_panel
          name="lazy_detail"
          size={[158, 136]}
          visible={true}
          bindings={[
            global("#form_button_length", "visible"),
            view("((#form_button_length > 0) * 1)", "#collection_length", { condition: "visible" }),
          ]}
        />
      )),
    "progress_button@common.button": () =>
      ns.define("progress_button@common.button", (
        <use
          name="progress_button"
          size={[150, 18]}
          $focus_enabled={false}
          $pressed_button_name="button.form_button_click"
          bindings={[details("form_buttons", "always")]}
        >
          <use name="default" def="ffr.progress_face" />
          <use name="hover" def="ffr.progress_face" $slot_bg="textures/ui/ffr/button_hover" />
          <use name="pressed" def="ffr.progress_face" $slot_bg="textures/ui/ffr/button_pressed" />
        </use>
      )),
    pager_row: () =>
      ns.define("pager_row", (
        <stack_panel name="pager_row" orientation="horizontal" size={[144, 18]} collection_name="form_buttons">
          <use name="prev" def="ffr.pager" collection_index="$i_prev" $arrow_tex="textures/ui/arrowLeft" />
          <panel name="gap" size={["fill", 18]} />
          <use name="next" def="ffr.pager" collection_index="$i_next" $arrow_tex="textures/ui/arrowRight" />
        </stack_panel>
      )),
    pagers_tabs: () =>
      ns.define("pagers_tabs", (
        <panel name="pagers_tabs" size={[144, 18]}>
          <use name="p0" def="ffr.pager_row" $i_prev={p0} $i_next={p0 + 1} bindings={[view("#toggle_state", "#visible", { condition: "always", control: "ffr_t0" })]} />
          <use name="p1" def="ffr.pager_row" $i_prev={p1} $i_next={p1 + 1} bindings={[view("#toggle_state", "#visible", { condition: "always", control: "ffr_t1" })]} />
        </panel>
      )),
    "list_slot@ffr.slot_view": () =>
      ns.define("list_slot@ffr.slot_view", (
        <use
          name="list_slot"
          bindings={[
            collection("#form_button_text", "form_buttons", "always"),
            view("((#form_button_text - '§0§e§r') = #form_button_text)", "#visible", { condition: "always" }),
          ]}
        />
      )),
    text_item: () =>
      ns.define("text_item", (
        <panel name="text_item" size={["100%", 10]}>
          <use name="label" def="ffr.text_label" size={["100%", "default"]} anchor_from="left_middle" anchor_to="left_middle" />
        </panel>
      )),
    screen_router: () => {
      if (opts.router === false) return;
      ns.define("screen_router", (
        <ScreenRouter
          name="screen_router"
          factory="ffr_screen"
          prefixBytes={prefix.length + 2}
          routes={ROUTES.map((id) => ({ title: `${prefix}${id[0]!.toUpperCase()}${id[1]}`, id, control: `ffr.research_${id}` }))}
        />
      ));
    },
  };

  for (const [key, body] of Object.entries(faces)) {
    if (body === "@code") {
      const f = code[key];
      if (!f) throw new Error(`faces.json의 코드 정의 "${key}"를 만들 수 없습니다`);
      f();
    } else {
      ns.define(key, body);
    }
  }
  defineItems(pack, slots);
}

/** server_form 훅: 라우터 루트를 화면 내용으로 꽂고 기본 폼을 숨긴다. */
export function defineServerForm(pack: Pack, prefix = "ffr:"): void {
  const gate = hideGate(prefix);
  pack.modify("server_form.json", "server_form", "third_party_server_screen", { "$screen_content": "ffr.root" });
  pack.modify("server_form.json", "server_form", "long_form_scrolling_content/wrapping_panel", {
    visible: false,
    bindings: [{ binding_name: "#title_text", binding_condition: "always" }, view(gate, "#visible", { condition: "always" })],
  });
  pack.modify("server_form.json", "server_form", "long_form_dynamic_buttons_panel", {
    bindings: [{ binding_name: "#form_button_contents", binding_name_override: "#collection_length", binding_condition: "visible" }],
  });
}

export function buildResearch(): { files: Record<string, string>; layout: SlotLayout } {
  const slots = createResearchSlots();
  const pack = createPack();
  defineResearch(pack, slots);
  defineServerForm(pack);
  return { files: pack.files(), layout: slots.layout() };
}
