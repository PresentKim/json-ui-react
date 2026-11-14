// F-HL-3: 레코드 칸 격자(SelectGrid)와 상세 부품, 판 부품(Pager, Placeholder), 종류 순서 번호, 레코드 서버 데이터.
import { describe, it, expect } from "vitest";
import {
  Screen, Tabs, Tab, ButtonList, SlotGrid, SelectGrid, Pager, Placeholder,
  DetailPanel, IconTitle, TextBlock, IconRow, Spacer, ActionButton, buildScreens, EMPTY_MARK,
} from "json-ui-react";
import { loadServerModule, mockForms } from "./server-harness.ts";

const jurOf = (r: { files: Record<string, string> }): Record<string, any> => JSON.parse(r.files["ui/jur.json"]!);
const kids = (def: any): [string, any][] => (def.controls ?? []).map((c: object) => Object.entries(c)[0] as [string, any]);

const Detail = () => (
  <DetailPanel footer={<ActionButton name="go" />}>
    <IconTitle name="title" subtitle="state" />
    <Spacer h={3} />
    <TextBlock name="about" />
    <IconRow name="parts" label="Parts" count={2} badge="+1" />
  </DetailPanel>
);

const shop = () => buildScreens([
  <Screen id="shop" title="Shop" layout="split">
    <Tabs name="tabs" mode="follow">
      <Tab><SelectGrid name="a" rows={1} cols={2} detail={<Detail />} /><Pager name="aPages" /></Tab>
      <Tab><SelectGrid name="b" rows={1} cols={1} detail={<Detail />} /><Pager name="bPages" /></Tab>
    </Tabs>
    <Placeholder text="Pick one." />
  </Screen>,
]);

describe("번호 종류 순서(PHASE)", () => {
  it("칸 격자 -> 버튼(탭·페이지) -> 상세 블록, 같은 종류는 렌더 순서", () => {
    const l = shop().layouts.shop!;
    expect(l.ranges.map((r) => [r.name, r.start, r.count])).toEqual([["a", 0, 2], ["b", 2, 1], ["tabs", 3, 2], ["aPages", 5, 2], ["bPages", 7, 2]]);
    expect(l.blocks.map((b) => [b.name, b.start, b.count])).toEqual([["a.detail", 9, 2], ["b.detail", 21, 1]]);
    expect(l.blocks[0]!.fields).toEqual(["title", "state", "about", "parts0", "parts1", "go"]);
    expect(l.total).toBe(27);
  });

  it("한 종류만 쓰는 화면은 렌더 순서 그대로", () => {
    const r = buildScreens([
      <Screen id="t" title="T"><Tabs name="tabs" mode="follow"><Tab><ButtonList name="p0" count={1} /></Tab><Tab><ButtonList name="p1" count={1} /></Tab></Tabs></Screen>,
    ]);
    expect(r.layouts.t!.ranges.map((x) => x.name)).toEqual(["tabs", "p0", "p1"]);
  });
});

describe("SelectGrid + 상세 부품", () => {
  const jur = jurOf(shop());

  it("칸마다 상세 정의와 스크롤 본문 정의, 칸 토글이 그 상세를 건다", () => {
    const grid = kids(jur["a0_panes"])[0]![1];
    const cell = kids(kids(grid)[0]![1])[1]!;
    expect(cell[0]).toBe("i1@jur.item_toggle");
    expect(cell[1]).toMatchObject({ collection_index: 1, $k: 1, $detail_offset: [152 - 18, -4], $detail_def: "jur.a0_a_detail_1" });
    const detail = jur["a0_a_detail_1"];
    expect(detail).toMatchObject({ type: "image", texture: "textures/ui/jur/panel", size: [158, 136] });
    const scroll = kids(kids(detail)[0]![1])[0]!;
    expect(scroll[0]).toBe("scroll@common.scrolling_panel");
    expect(scroll[1]).toMatchObject({ size: ["100%", "100% - 22px"], $scrolling_content: "jur.a0_a_body_1" });
    // footer(ActionButton)는 스크롤 밖 아래
    expect(kids(detail)[1]![1]).toMatchObject({ type: "stack_panel", size: [150, 18], anchor_from: "bottom_middle", collection_name: "form_buttons" });
    expect(kids(kids(detail)[1]![1])[0]).toEqual(["button@jur.action_button", { collection_index: 9 + 6 + 5 }]);
  });

  it("본문: 카드(아이콘 + 제목·부제), 간격, 글, 머리글 + 아이콘 칸 줄", () => {
    const body = jur["a0_a_body_1"];
    expect(body).toMatchObject({ type: "stack_panel", orientation: "vertical", size: ["100% - 4px", "100%c"] });
    expect(kids(body).map(([k]) => k)).toEqual(["card", "gap", "about", "parts_head@jur.header_label", "parts"]);
    const info = kids(kids(body)[0]![1])[2]![1];
    expect(kids(info).map(([k, v]) => [k, v.size ?? v.collection_index])).toEqual([
      ["pad", ["100%", 3]], ["title@jur.text_item", 15], ["pad2", ["100%", 2]], ["subtitle@jur.text_item", 16],
    ]);
    expect(kids(body)[3]![1]).toEqual({ text: "Parts" });
    expect(kids(kids(body)[4]![1])).toEqual([["s0@jur.icon_slot", { collection_index: 18 }], ["s1@jur.icon_slot", { collection_index: 19 }]]);
  });

  it("부제가 없으면 제목 한 줄이 카드 가운데(위 여백 9), footer가 없으면 스크롤이 판 높이 전부", () => {
    const r = buildScreens([
      <Screen id="s" title="S" layout="split">
        <SelectGrid name="g" rows={1} cols={1} detail={<DetailPanel><IconTitle name="n" /><Spacer h={4} /><Spacer h={4} /></DetailPanel>} />
      </Screen>,
    ]);
    const j = jurOf(r);
    expect(kids(j["a0_g_body_0"]).map(([k]) => k)).toEqual(["card", "gap", "gap2"]);
    expect(kids(kids(kids(j["a0_g_body_0"])[0]![1])[2]![1])[0]![1].size).toEqual(["100%", 9]);
    expect(kids(kids(j["a0_g_detail_0"])[0]![1])[0]![1].size).toEqual(["100%", "100%"]);
    expect(r.layouts.s!.blocks).toEqual([{ name: "g.detail", start: 1, count: 1, fields: ["n"] }]);
  });

  it("잘못된 쓰임은 빌드 에러", () => {
    const one = (el: any) => () => buildScreens([el]);
    expect(one(<Screen id="s" title="S"><SelectGrid name="g" rows={1} cols={1} detail={<Detail />} /></Screen>)).toThrow(/split/);
    expect(one(<Screen id="s" title="S" layout="split"><SelectGrid name="g" rows={9} cols={1} /></Screen>)).toThrow(/rows 1\.\.7/);
    expect(one(<Screen id="s" title="S" layout="split"><SelectGrid name="g" rows={1} cols={1} detail={<DetailPanel />} /></Screen>)).toThrow(/필드가 없습니다/);
    expect(one(<Screen id="s" title="S" layout="split"><SelectGrid name="g" rows={1} cols={1} detail={<DetailPanel><TextBlock name="x" /><TextBlock name="x" /></DetailPanel>} /></Screen>)).toThrow(/두 번/);
    expect(one(<Screen id="s" title="S" layout="split"><SelectGrid name="g" rows={1} cols={1} detail={<DetailPanel><IconRow name="x" label="X" count={9} /></DetailPanel>} /></Screen>)).toThrow(/count는 1\.\.8/);
    expect(one(<Screen id="s" title="S" layout="split"><SelectGrid name="g" rows={1} cols={1} /><TextBlock name="x" /></Screen>)).toThrow(/SelectGrid detail/);
    expect(one(<Screen id="s" title="S" layout="split"><SelectGrid name="g" rows={1} cols={1} detail={<><DetailPanel /><DetailPanel /></>} /></Screen>)).toThrow();
  });
});

describe("Pager, Placeholder", () => {
  it("Pager는 판 아래 줄(판 폭 x 18, 판 맨 아래)에 놓인다", () => {
    const r = buildScreens([<Screen id="p" title="P"><ButtonList name="b" count={1} /><Pager name="pages" /></Screen>]);
    const panes = jurOf(r)["a0_panes"];
    const [, footer] = kids(panes)[1]!;
    expect(footer).toMatchObject({ type: "panel", size: [180, 18], anchor_from: "top_left", anchor_to: "top_left", offset: [0, 110] });
    const [[name, row]] = kids(footer);
    expect(name).toBe("pages");
    expect(kids(row).map(([k, v]) => [k, v.collection_index, v.$arrow_tex])).toEqual([
      ["prev@jur.pager", 1, "textures/ui/arrowLeft"], ["gap", undefined, undefined], ["next@jur.pager", 2, "textures/ui/arrowRight"],
    ]);
  });

  it("Tabs follow 안의 Pager는 각자 탭 바인딩을 달고 한 줄에 겹친다, lazy는 탭 판 안에 둔다", () => {
    const panes = jurOf(shop())["a0_panes"];
    expect(kids(panes).map(([k]) => k)).toEqual(["a", "b", "footer"]);
    const rows = kids(kids(panes)[2]![1]);
    expect(rows.map(([k, v]) => [k, v.bindings.at(-1).source_control_name])).toEqual([["aPages", "jur_t0"], ["bPages", "jur_t1"]]);
    const lazy = jurOf(buildScreens([
      <Screen id="l" title="L"><Tabs name="tabs" mode="lazy"><Tab><ButtonList name="x" count={1} /><Pager name="p0" /></Tab><Tab><Pager name="p1" /></Tab></Tabs></Screen>,
    ]));
    expect(kids(lazy["a0_pane_0"]).map(([k]) => k)).toEqual(["x", "footer"]);
    expect(lazy["a0_pane_1"]).toMatchObject({ type: "panel", size: [180, 18], offset: [0, 110] });
  });

  it("Placeholder는 오른쪽 판 안내 글자, split에서 하나만", () => {
    const j = jurOf(shop());
    expect(j["a0_right"]).toEqual({ type: "label", layer: 3, localize: false, color: [0.4, 0.4, 0.4], font_scale_factor: 0.8, size: [150, "default"], text: "Pick one." });
    expect(j["a0@jur.window_split"].$right_def).toBe("jur.a0_right");
    expect(() => buildScreens([<Screen id="s" title="S"><ButtonList name="b" count={1} /><Placeholder text="x" /></Screen>])).toThrow(/split/);
    expect(() => buildScreens([<Screen id="s" title="S" layout="split"><SlotGrid name="g" rows={1} cols={1} detail /><Placeholder text="x" /></Screen>])).toThrow(/하나만/);
  });
});

describe("레코드 서버 데이터", () => {
  const built = shop();
  const load = async () => {
    const m = mockForms();
    return { ...m, mod: await loadServerModule(built.serverModule, m.ActionFormData) };
  };

  it("레코드 하나 = 칸 버튼(§r + 아이콘) + 상세 블록, 빈 값은 빈 칸 표식", async () => {
    const { mod } = await load();
    const b = mod.buttons("shop", {
      a: [{ icon: "i/a", title: "A", state: "ok", about: "long", parts: [["i/p", 3], "i/q"], go: "Buy" }, { title: "B" }],
      tabs: [["T0", "i/t"], "T1"],
    });
    expect(b).toHaveLength(27);
    expect(b.slice(0, 3)).toEqual([["§r", "i/a"], ["§r"], ["§r"]]);
    expect(b.slice(3, 9)).toEqual([["T0", "i/t"], ["T1"], ["§r"], ["§r"], ["§r"], ["§r"]]);
    expect(b.slice(9, 15)).toEqual([["A", "i/a"], ["ok"], ["long"], ["§f3", "i/p"], ["§f+1", "i/q"], ["Buy"]]);
    expect(b.slice(15, 21)).toEqual([["B"], [EMPTY_MARK], [EMPTY_MARK], [EMPTY_MARK], [EMPTY_MARK], [EMPTY_MARK]]);
    expect(b.slice(21)).toEqual(Array.from({ length: 6 }, () => [EMPTY_MARK]));
  });

  it("decode: 상세 블록 번호는 { name: 격자, index: 칸, field }", async () => {
    const { mod } = await load();
    expect(mod.decode("shop", 1)).toEqual({ name: "a", index: 1 });
    expect(mod.decode("shop", 6)).toEqual({ name: "aPages", index: 1 });
    expect(mod.decode("shop", 9 + 6 + 5)).toEqual({ name: "a", index: 1, field: "go" });
    expect(mod.decode("shop", 21 + 5)).toEqual({ name: "b", index: 0, field: "go" });
  });

  it("블록 이름은 데이터 키가 아니다, 넘치는 레코드는 에러", async () => {
    const { mod } = await load();
    expect(() => mod.buttons("shop", { "a.detail": [] })).toThrow(/unknown data key/);
    expect(() => mod.buttons("shop", { b: [{}, {}] })).toThrow(/max 1/);
  });

  it("타입: 레코드 키와 IconEntry, 응답 name에 블록 이름은 없다", () => {
    expect(built.serverTypes).toContain('"a"?: { "icon"?: string; "title"?: string; "state"?: string; "about"?: string; "parts"?: IconEntry[]; "go"?: string }[]');
    expect(built.serverTypes).toContain("export type IconEntry = string | [icon: string, count?: string | number];");
    expect(built.serverTypes).toContain('"shop": "a" | "b" | "tabs" | "aPages" | "bPages";');
  });
});
