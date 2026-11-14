// 고수준 API: 컴포넌트 낮춤 구조, 자동 번호 할당, buildScreens 라우터·훅, lint.
import { describe, it, expect } from "vitest";
import { Screen, ButtonList, Tabs, Tab, SlotGrid, VirtualList, buildScreens, themeTextures, lintFiles, type JsonObject } from "json-ui-react";
import { render } from "../../src/render.ts";

const parse = (files: Record<string, string>): Record<string, JsonObject> =>
  Object.fromEntries(Object.entries(files).map(([f, t]) => [f, JSON.parse(t) as JsonObject]));
const jurOf = (r: { files: Record<string, string> }): Record<string, any> => JSON.parse(r.files["ui/jur.json"]!);
const kids = (def: any): [string, any][] => (def.controls ?? []).map((c: JsonObject) => Object.entries(c)[0] as [string, any]);
const TOP_LEFT = { anchor_from: "top_left", anchor_to: "top_left" };
/** 본문 아래 모든 collection_index(전위 순서) */
const indexes = (body: any, out: unknown[] = []): unknown[] => {
  if ("collection_index" in body) out.push(body.collection_index);
  for (const [, b] of kids(body)) indexes(b, out);
  return out;
};

describe("Screen + ButtonList", () => {
  const r = buildScreens([
    <Screen id="menu" title="Menu">
      <ButtonList name="buttons" count={3} />
    </Screen>,
  ]);
  const jur = jurOf(r);

  it("single 창 하나, 판 안에 왼쪽 위 정렬 버튼 목록", () => {
    expect(jur["a0@jur.window"]).toEqual({ $mode_title: "Menu", $panes_def: "jur.a0_panes" });
    const panes = jur["a0_panes"];
    expect(panes).toMatchObject({ type: "panel", size: [180, 128] });
    const [[name, list]] = kids(panes);
    expect(name).toBe("buttons");
    expect(list).toMatchObject({ type: "stack_panel", orientation: "vertical", size: [172, 66], ...TOP_LEFT });
    expect(kids(list).map(([k]) => k)).toEqual(["r0", "r1", "r2"]);
    expect(kids(kids(list)[0]![1])[0]![0]).toBe("b0@jur.btn");
    expect(indexes(list)).toEqual([0, 1, 2]);
  });

  it("제목은 접두 + 2글자 코드, 배치는 렌더 순서", () => {
    expect(r.titles).toEqual({ menu: "jur:a0" });
    expect(r.layouts.menu).toEqual({ total: 3, ranges: [{ name: "buttons", start: 0, count: 3 }], blocks: [] });
  });

  it("테마 정의와 텍스처", () => {
    for (const k of ["btn@common.button", "btn_face", "window", "window_split", "tab_toggle", "item_toggle", "list_window", "list_cell@common.button"]) {
      expect(jur[k], k).toBeDefined();
    }
    expect(JSON.stringify(jur)).not.toContain("ffr");
    expect(JSON.stringify(jur["btn_face"])).toContain("textures/ui/jur/button");
    const tex = themeTextures();
    expect(Object.keys(tex)).toEqual(expect.arrayContaining(["textures/ui/jur/button.png", "textures/ui/jur/panel.png", "textures/ui/jur/slot_chosen.png"]));
    for (const [p, b] of Object.entries(tex)) if (p.endsWith(".png")) expect(Buffer.from(b.subarray(1, 4)).toString(), p).toBe("PNG");
  });
});

describe("자동 번호 할당", () => {
  it("여러 컴포넌트가 렌더 순서대로 연속 번호를 받는다", () => {
    const r = buildScreens([
      <Screen id="two" title="Two">
        <ButtonList name="first" count={2} />
        <ButtonList name="second" count={3} />
      </Screen>,
    ]);
    const [[, a], [, b]] = kids(jurOf(r)["a0_panes"]);
    expect(indexes(a)).toEqual([0, 1]);
    expect(indexes(b)).toEqual([2, 3, 4]);
    expect(r.layouts.two!.ranges).toEqual([{ name: "first", start: 0, count: 2 }, { name: "second", start: 2, count: 3 }]);
  });

  it("화면마다 0부터 다시 센다, 코드는 id 순서대로 a0, a1(고정 코드는 건너뜀)", () => {
    const r = buildScreens([
      <Screen id="x" title="X"><ButtonList name="b" count={1} /></Screen>,
      <Screen id="y" title="Y"><ButtonList name="b" count={1} /></Screen>,
      <Screen id="z" title="Z"><ButtonList name="b" count={1} /></Screen>,
    ], { codes: { x: "a1" } });
    expect(r.titles).toEqual({ x: "jur:a1", y: "jur:a0", z: "jur:a2" });
    expect(indexes(jurOf(r)["a0_panes"])).toEqual([0]);
  });
});

describe("Tabs", () => {
  const tabs = (mode: "inside" | "follow" | "lazy", label?: string) =>
    buildScreens([
      <Screen id="t" title="T">
        <Tabs name="tabs" mode={mode}>
          <Tab label={label}><ButtonList name="p0" count={2} /></Tab>
          <Tab><ButtonList name="p1" count={2} /></Tab>
        </Tabs>
      </Screen>,
    ]);

  it("번호: 탭 버튼 다음에 탭 0 내용, 탭 1 내용", () => {
    const r = tabs("follow");
    expect(r.layouts.t!.ranges.map((x) => [x.name, x.start, x.count])).toEqual([["tabs", 0, 2], ["p0", 2, 2], ["p1", 4, 2]]);
    const bar = jurOf(r)["a0_tabs"];
    expect(bar).toMatchObject({ type: "stack_panel", orientation: "horizontal", size: [192, 22], collection_name: "form_buttons" });
    expect(kids(bar)).toEqual([
      ["jur_t0@jur.tab_toggle", { collection_index: 0, $tab_index: 0 }],
      ["jur_t1@jur.tab_toggle", { collection_index: 1, $tab_index: 1 }],
    ]);
  });

  it("inside(B): 켠 탭 얼굴 안에 내용, 판은 비어 있다", () => {
    const jur = jurOf(tabs("inside"));
    expect(jur["a0@jur.window"]).toEqual({ $mode_title: "T", $tabs_def: "jur.a0_tabs", $panes_def: "jur.panes_none", $tab: 0 });
    expect(kids(jur["a0_tabs"])[1]![1].$on_def).toBe("jur.a0_on_1");
    expect(kids(jur["a0_on_0"])).toEqual([
      ["face@jur.tab_face_on", {}],
      ["pane@jur.a0_pane_0", { ...TOP_LEFT, offset: [2, 48] }],
    ]);
    expect(kids(jur["a0_on_1"])[1]![1].offset).toEqual([-94, 48]);
    expect(indexes(jur["a0_pane_1"])).toEqual([4, 5]);
  });

  it("follow(C): 내용이 탭 토글 상태를 따라 보인다", () => {
    const jur = jurOf(tabs("follow"));
    const panes = kids(jur["a0_panes"]);
    expect(panes.map(([k]) => k)).toEqual(["p0", "p1"]);
    panes.forEach(([, body], i) => {
      expect(body).toMatchObject(TOP_LEFT);
      expect(body.bindings).toEqual([{ binding_type: "view", binding_condition: "always", source_control_name: `jur_t${i}`, source_property_name: "#toggle_state", target_property_name: "#visible" }]);
    });
  });

  it("lazy(D): 첫 탭은 미리 만들고, 둘째부터 팩토리", () => {
    const jur = jurOf(tabs("lazy"));
    expect(kids(jur["a0_panes"]).map(([k]) => k)).toEqual(["g0@jur.a0_pane_0", "g1@jur.a0_lazy_1"]);
    expect(jur["a0_pane_0"].factory).toBeUndefined();
    expect(jur["a0_pane_0"].bindings).toContainEqual(expect.objectContaining({ source_control_name: "jur_t0", target_property_name: "#visible" }));
    expect(jur["a0_lazy_0"]).toBeUndefined();
    expect(jur["a0_lazy_1"]).toMatchObject({ type: "stack_panel", size: [180, 128], factory: { name: "jur_a01", control_name: "jur.a0_pane_1" } });
    expect(jur["a0_lazy_1"].bindings[0]).toMatchObject({ source_control_name: "jur_t1", source_property_name: "(#toggle_state * 1)", target_property_name: "#collection_length" });
  });

  it("Tab label은 serverModule 기본 글자", () => {
    expect(tabs("follow", "First").serverModule).toMatch(/"tabs": \[\s*"First",\s*null\s*\]/);
  });

  it("잘못된 쓰임은 빌드 에러", () => {
    expect(() => buildScreens([<Screen id="t" title="T"><Tabs name="tabs" mode="follow"><ButtonList name="x" count={1} /></Tabs></Screen>])).toThrow(/<Tab>만/);
    expect(() => buildScreens([<Screen id="t" title="T"><Tabs name="tabs" mode={"nope" as any}><Tab><ButtonList name="x" count={1} /></Tab></Tabs></Screen>])).toThrow(/탭 모드/);
  });
});

describe("SlotGrid", () => {
  const r = buildScreens([
    <Screen id="g" title="Grid" layout="split">
      <SlotGrid name="cells" rows={3} cols={8} detail="Pick a slot." />
    </Screen>,
  ]);
  const jur = jurOf(r);

  it("split 창, 오른쪽 판 안내와 배경 있는 상세", () => {
    expect(jur["a0@jur.window_split"]).toEqual({ $mode_title: "Grid", $panes_def: "jur.a0_panes", $right_def: "jur.a0_right" });
    expect(kids(jur["a0_right"])[0]![1]).toMatchObject({ type: "label", text: "Pick a slot." });
    const d = jur["a0_detail"];
    expect(d).toMatchObject({ type: "image", texture: "textures/ui/jur/panel", size: [158, 136] });
    expect(JSON.stringify(d)).toContain('"collection_index":"$cell"');
    expect(JSON.stringify(d)).toContain("jur.detail_icon");
  });

  it("줄 stack + item toggle, 칸 번호와 상세 자리", () => {
    const [[, grid]] = kids(jur["a0_panes"]);
    expect(grid).toMatchObject({ size: [144, 54], ...TOP_LEFT });
    const rows = kids(grid);
    expect(rows).toHaveLength(3);
    expect(rows[0]![1]).toMatchObject({ orientation: "horizontal", collection_name: "form_buttons" });
    const [k0, c0] = kids(rows[0]![1])[0]!;
    expect(k0).toBe("i0@jur.item_toggle");
    expect(c0).toEqual({ collection_index: 0, $k: 0, $detail_offset: [152, -4], $cell: 0, $detail_def: "jur.a0_detail" });
    expect(kids(rows[2]![1])[7]![1]).toMatchObject({ $cell: 23, $detail_offset: [152 - 7 * 18, -4 - 2 * 18] });
    expect(r.layouts.g!.total).toBe(24);
  });

  it("detail은 split에서만, 판보다 크면 에러", () => {
    expect(() => buildScreens([<Screen id="g" title="G"><SlotGrid name="c" rows={1} cols={1} detail /></Screen>])).toThrow(/split/);
    expect(() => buildScreens([<Screen id="g" title="G" layout="split"><SlotGrid name="c" rows={1} cols={9} /></Screen>])).toThrow(/cols/);
  });
});

describe("VirtualList", () => {
  it("목록 창 + grid, 칸 수는 컬렉션 길이", () => {
    const r = buildScreens([<Screen id="v" title="List"><VirtualList name="list" count={500} /></Screen>]);
    const jur = jurOf(r);
    expect(jur["a0@jur.list_window"]).toEqual({ $list_title: "List", $list_content: "jur.a0_list" });
    expect(jur["a0_list"]).toMatchObject({ type: "grid", grid_item_template: "jur.list_cell", maximum_grid_items: 500, size: [200, "100%c"] });
    expect(r.layouts.v!.total).toBe(500);
  });

  it("2000 초과는 빌드 에러(COL-49), 다른 자식과 함께 쓰면 에러", () => {
    expect(() => buildScreens([<Screen id="v" title="L"><VirtualList name="list" count={2001} /></Screen>])).toThrow(/COL-49/);
    expect(() => buildScreens([<Screen id="v" title="L"><VirtualList name="list" count={5} /><ButtonList name="b" count={1} /></Screen>])).toThrow(/유일한 자식/);
  });
});

describe("buildScreens", () => {
  const r = buildScreens([
    <Screen id="one" title="One"><ButtonList name="b" count={1} /></Screen>,
    <Screen id="two" title="Two"><ButtonList name="b" count={2} /></Screen>,
  ], {
    lowLevel: (pack) => {
      pack.ns("low", "low.json").define("scr", <panel name="scr" size={[10, 10]} />);
      return [{ id: "raw", control: "low.scr", layout: { total: 1, ranges: [{ name: "x", start: 0, count: 1 }], blocks: [] } }];
    },
  });
  const parsed = parse(r.files);

  it("단일 라우터: 제목 6바이트 접두로 화면을 고른다(저수준 화면 포함)", () => {
    const router = parsed["ui/jur.json"]!.screen_router as any;
    expect(router.factory).toEqual({ name: "jur_screen", control_ids: { a0: "@jur.a0", a1: "@jur.a1", a2: "@low.scr" } });
    expect(router.property_bag).toEqual({ "#jur:a0": ["a0"], "#jur:a1": ["a1"], "#jur:a2": ["a2"] });
    expect(router.bindings[1].source_property_name).toBe("('#' + ('%.6s' * #title_text))");
    expect(r.titles.raw).toBe("jur:a2");
  });

  it("server_form 훅과 _ui_defs", () => {
    const sf = parsed["ui/server_form.json"]!;
    expect(sf.third_party_server_screen).toEqual({ $screen_content: "jur.root" });
    expect(JSON.stringify(sf)).toContain("(not (('%.4s' * #title_text) = 'jur:'))");
    expect(JSON.stringify(parsed["ui/jur.json"]!.root)).toContain("server_form.main_screen_content");
    expect(JSON.parse(r.files["ui/_ui_defs.json"]!).ui_defs).toEqual(["ui/jur.json", "ui/low.json"]);
  });

  it("생성 lint에 error 없음, 결정적 출력", () => {
    expect(lintFiles(parsed, { routedRoots: ["jur.root"] }).filter((d) => d.level === "error")).toEqual([]);
    expect(r.diagnostics.filter((d) => d.level === "error")).toEqual([]);
    const again = buildScreens([
      <Screen id="one" title="One"><ButtonList name="b" count={1} /></Screen>,
      <Screen id="two" title="Two"><ButtonList name="b" count={2} /></Screen>,
    ]);
    expect(again.files["ui/server_form.json"]).toBe(r.files["ui/server_form.json"]);
  });

  it("namespace·prefix 옵션", () => {
    const o = buildScreens([<Screen id="a" title="A"><ButtonList name="b" count={1} /></Screen>], { namespace: "my", prefix: "my:" });
    expect(o.files["ui/my.json"]).toBeDefined();
    expect(o.titles.a).toBe("my:a0");
    expect(JSON.parse(o.files["ui/my.json"]!).screen_router.bindings[1].source_property_name).toBe("('#' + ('%.5s' * #title_text))");
  });

  it("잘못된 입력은 에러", () => {
    expect(() => buildScreens([<panel name="x" />])).toThrow(/<Screen>/);
    expect(() => buildScreens([<Screen id="a" title="A"><ButtonList name="b" count={1} /></Screen>, <Screen id="a" title="B"><ButtonList name="b" count={1} /></Screen>])).toThrow(/중복/);
    expect(() => buildScreens([<Screen id="a" title="A" />])).toThrow(/버튼이 하나도/);
    expect(() => buildScreens([<Screen id="a" title="A"><ButtonList name="b" count={6} /></Screen>])).toThrow(/1\.\.5/);
    expect(() => buildScreens([<Screen id="a" title="A"><ButtonList name="b" count={1} /></Screen>], { codes: { a: "1x" } })).toThrow(/2글자/);
    expect(() => render(<ButtonList name="b" count={1} />)).toThrow(/buildScreens/);
    expect(() => render(<Screen id="a" title="A" />)).toThrow(/buildScreens/);
  });
});
