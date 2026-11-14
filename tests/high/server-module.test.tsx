// 생성 serverModule을 data URL로 import해 모의 ActionFormData로 openScreen을 실행한다.
import { describe, it, expect } from "vitest";
import { Screen, ButtonList, Tabs, Tab, SlotGrid, buildScreens, EMPTY_MARK } from "json-ui-react";
import { loadServerModule, mockForms } from "./server-harness.ts";

const built = buildScreens([
  <Screen id="menu" title="Menu">
    <ButtonList name="top" count={2} />
    <ButtonList name="bottom" count={3} />
  </Screen>,
  <Screen id="tabs" title="Tabs">
    <Tabs name="tabs" mode="lazy">
      <Tab label="One"><ButtonList name="a" count={1} /></Tab>
      <Tab><ButtonList name="b" count={1} /></Tab>
    </Tabs>
  </Screen>,
  <Screen id="grid" title="Grid" layout="split">
    <SlotGrid name="cells" rows={1} cols={2} detail />
  </Screen>,
], {
  lowLevel: () => [{ id: "blocks", control: "jur.panes_none", layout: { total: 5, ranges: [{ name: "head", start: 0, count: 1 }], blocks: [{ name: "rows", start: 1, count: 2, fields: ["x", "y"] }] } }],
});

async function load() {
  const m = mockForms();
  const mod = await loadServerModule(built.serverModule, m.ActionFormData);
  return { ...m, mod };
}

describe("serverModule", () => {
  it("의존 없는 ESM: @minecraft/server-ui의 ActionFormData만 import", () => {
    const imports = built.serverModule.split("\n").filter((l) => /^\s*import\b/.test(l));
    expect(imports).toEqual(['import { ActionFormData } from "@minecraft/server-ui";']);
    expect(built.serverModule).not.toMatch(/require\(|from "\.|from "node:/);
  });

  it("openScreen: 제목, 배치 순서 버튼, 빈 칸 채움, decode", async () => {
    const { forms, respond, mod } = await load();
    const p = mod.openScreen({}, "menu", { bottom: [["B1", "textures/items/apple"], "B2"], top: [{ text: "T1", icon: "textures/items/bread" }] });
    expect(forms[0]!.title).toBe("jur:a0");
    expect(forms[0]!.buttons).toEqual([
      { text: "T1", icon: "textures/items/bread" },
      { text: EMPTY_MARK },
      { text: "B1", icon: "textures/items/apple" },
      { text: "B2" },
      { text: EMPTY_MARK },
    ]);
    respond({ canceled: false, selection: 3 });
    expect(await p).toEqual({ name: "bottom", index: 1 });
  });

  it("취소와 범위 밖 선택은 null", async () => {
    const { respond, mod } = await load();
    const p = mod.openScreen({}, "menu", {});
    respond({ canceled: true });
    expect(await p).toBeNull();
    const q = mod.openScreen({}, "menu");
    respond({ canceled: false, selection: 99 });
    expect(await q).toBeNull();
  });

  it("Tab label은 데이터가 없을 때 기본 글자, 데이터가 있으면 데이터", async () => {
    const { forms, mod } = await load();
    mod.openScreen({}, "tabs", { a: [["A", "textures/items/apple"]] });
    expect(forms[0]!.buttons.map((b) => b.text)).toEqual(["One", EMPTY_MARK, "A", EMPTY_MARK]);
    mod.openScreen({}, "tabs", { tabs: [["X", "i"], ["Y", "j"]] });
    expect(forms[1]!.buttons.slice(0, 2)).toEqual([{ text: "X", icon: "i" }, { text: "Y", icon: "j" }]);
  });

  it("블록 배치(저수준 화면) decode에 field", async () => {
    const { mod } = await load();
    expect(mod.decode("blocks", 0)).toEqual({ name: "head", index: 0 });
    expect(mod.decode("blocks", 4)).toEqual({ name: "rows", index: 1, field: "y" });
    expect(mod.buttons("blocks", { rows: ["r0x", "r0y"] }).map((b: string[]) => b[0])).toEqual([EMPTY_MARK, "r0x", "r0y", EMPTY_MARK, EMPTY_MARK]);
  });

  it("모르는 화면·키, 넘치는 데이터는 에러", async () => {
    const { mod } = await load();
    expect(() => mod.openScreen({}, "nope", {})).toThrow(/Unknown screen/);
    expect(() => mod.openScreen({}, "menu", { nope: [] })).toThrow(/unknown data key/);
    expect(() => mod.openScreen({}, "menu", { top: ["1", "2", "3"] })).toThrow(/max 2/);
    expect(mod.screenTitle("grid")).toBe("jur:a2");
    expect(mod.LAYOUTS.grid.total).toBe(2);
  });

  it("serverTypes: 화면별 data 모양과 응답 name", () => {
    const t = built.serverTypes;
    expect(t).toContain('"menu": { "top"?: Button[]; "bottom"?: Button[] };');
    expect(t).toContain('"menu": "top" | "bottom";');
    expect(t).toContain('"blocks": "head" | "rows";');
    expect(t).toMatch(/export declare function openScreen<K extends ScreenId>\(player: Player, id: K, data\?: ScreenData\[K\]\): Promise<ScreenHit<ScreenHitNames\[K\]> \| null>;/);
  });
});
