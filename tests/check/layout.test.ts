import { describe, it, expect } from "vitest";
import { LAYOUT_CHECKS } from "../../src/check/layout.ts";
import { runChecks } from "../../src/check/engine.ts";
import { buildExamples } from "../../example/build-rp.ts";
import { buildEntityScreens } from "../../src/entity/build.tsx";
import { e2048 } from "../../example-entity/screens/e2048.tsx";
import { matchmaking } from "../../example-entity/screens/matchmaking.tsx";
import { research } from "../../example-entity/screens/research.tsx";
import menuLab from "../../example-entity/screens/menu-lab.tsx";
import type { JsonObject } from "../../src/types.ts";

/** 정의 하나짜리 파일을 만들어 검사한다. */
const run = (def: JsonObject, extra: Record<string, JsonObject> = {}, only?: string[]) =>
  runChecks({ "ui/t.json": { namespace: "t", main: def, ...extra } }, LAYOUT_CHECKS, { only: only as any }).diagnostics;
const ids = (d: { rule: string }[]) => d.map((x) => x.rule);
const box = (c: JsonObject) => ({ type: "panel", controls: [{ c }] });

describe("layout checks", () => {
  it("LAY-02 scroll_box", () => {
    const d = run({ type: "scroll_box" });
    expect(d).toMatchObject([{ rule: "LAY-02", level: "error" }]);
    expect(run({ type: "scroll_view", scrolling_view_port: "a", scrolling_content: "b", scrollbar_track: "c", scrollbar_box: "d" })).toEqual([]);
  });
  it("LAY-05, LAY-13 정적 바인딩", () => {
    const d = run({ type: "panel", bindings: [{ binding_name: "#a", target_property_name: "#offset" }, { target_property_name: "#alpha" }] });
    expect(ids(d)).toEqual(["LAY-05", "LAY-13"]);
    expect(run({ type: "panel", bindings: [{ target_property_name: "#visible" }] })).toEqual([]);
  });
  it("LAY-11 한 축만", () => {
    expect(ids(run({ type: "panel", bindings: [{ target_property_name: "#size_binding_x" }] }))).toEqual(["LAY-11"]);
    expect(run({ type: "panel", bindings: [{ target_property_name: "#size_binding_x" }, { target_property_name: "#size_binding_y" }] })).toEqual([]);
  });
  it("LAY-14 조합", () => {
    const b = [{ target_property_name: "#size_binding_x" }, { target_property_name: "#size_binding_y" }];
    expect(ids(run({ type: "panel", use_anchored_offset: true, collection_index: 0, bindings: b }))).toEqual(["LAY-14"]);
    expect(run({ type: "panel", use_anchored_offset: true, bindings: b })).toEqual([]);
  });
  it("LAY-30, LAY-32 그리드", () => {
    const bound = [{ target_property_name: "#maximum_grid_items" }];
    expect(ids(run({ type: "grid", grid_rescaling_type: "vertical", size: ["100%", 10], bindings: bound }))).toEqual(["LAY-30", "LAY-32"]);
    expect(run({ type: "grid", grid_rescaling_type: "horizontal", size: [160, "100%c"], bindings: bound })).toEqual([]);
    expect(ids(run({ type: "grid", grid_rescaling_type: "vertical" }))).toEqual(["LAY-32"]);
  });
  it("LAY-34 단위 없음, Fill", () => {
    expect(ids(run({ type: "panel", size: ["10", "Fill"] }))).toEqual(["LAY-34", "LAY-34"]);
    expect(run({ type: "panel", size: ["fill", "default"], offset: ["-5px", 3] })).toEqual([]);
  });
  it("LAY-35 부호 이어짐", () => {
    expect(ids(run({ type: "panel", size: ["100% - 10px 5px", 1] }))).toEqual(["LAY-35"]);
    expect(run({ type: "panel", size: ["100% - 10px - 5px", "-50% + 10px"] })).toEqual([]);
  });
  it("LAY-36 접미 뒤바뀜", () => {
    expect(run({ type: "panel", size: ["100c%", "50%c"] })).toMatchObject([{ rule: "LAY-36", level: "error" }]);
  });
  it("LAY-38/56 스택 자식 offset 한 번만", () => {
    const d = run({ type: "stack_panel", controls: [{ a: { type: "panel", offset: [1, 2] } }, { b: { type: "panel", offset: [0, 0] } }] });
    expect(d).toHaveLength(1);
    expect(d[0]).toMatchObject({ rule: "LAY-38", path: "t.main/a" });
    expect(d[0]!.message).toContain("LAY-56");
    expect(run({ type: "panel", controls: [{ a: { type: "panel", offset: [1, 2] } }] })).toEqual([]);
  });
  it("LAY-38 ref로 상속한 스택 타입", () => {
    const d = run(
      { type: "panel", controls: [{ "s@t.base": { controls: [{ a: { offset: [1, 1] } }] } }] },
      { base: { type: "stack_panel" } },
    );
    expect(ids(d)).toEqual(["LAY-38"]);
  });
  it("LAY-39 min>max", () => {
    expect(ids(run({ type: "panel", min_size: [50, 0], max_size: ["20px", 5] }))).toEqual(["LAY-39"]);
  });
  it("LAY-41 그리드 칸", () => {
    expect(ids(run({ type: "grid", controls: [{ a: { type: "panel", anchor_from: "top_left", anchor_to: "top_left" } }] }))).toEqual(["LAY-41"]);
  });
  it("LAY-42 scroll_view 역할", () => {
    expect(ids(run({ type: "scroll_view", scrolling_content: "x" }))).toEqual(["LAY-42"]);
  });
  it("LAY-44 곱셈 나눗셈", () => {
    expect(ids(run({ type: "panel", size: ["50% * 2", 1] }))).toContain("LAY-44");
  });
  it("LAY-45 앵커 한쪽", () => {
    expect(ids(run({ type: "panel", anchor_from: "center" }))).toEqual(["LAY-45"]);
    expect(run({ type: "panel", anchor_from: "center", anchor_to: "center" })).toEqual([]);
  });
  it("LAY-46 100%c 부모 안의 % 자식", () => {
    expect(ids(run({ type: "panel", size: ["100%", "100%c"], controls: [{ a: { type: "panel", size: ["100%", "50%"] } }] }))).toEqual(["LAY-46"]);
    expect(run({ type: "panel", size: ["100%", "100%c"], controls: [{ a: { type: "panel", size: ["100%", 20] } }] })).toEqual([]);
  });
  it("TXT-04 글꼴 별칭", () => {
    expect(ids(run({ type: "label", font_type: "Bogus" }))).toEqual(["TXT-04"]);
    expect(run({ type: "label", font_type: "MinecraftTen" })).toEqual([]);
  });
  it("DBG-25 깨진 값", () => {
    expect(run({ type: "panel", size: ["fill%", "100%"] })).toMatchObject([{ rule: "DBG-25", level: "error" }]);
    expect(ids(run({ type: "panel", size: ["100%, 100%"], max_size: [] }))).toEqual(["DBG-25", "DBG-25"]);
    expect(ids(run({ type: "panel", ignored: "($a or $b" }))).toEqual(["DBG-25"]);
    expect(run({ type: "panel", size: ["100%", "$h"], ignored: "(not $a)" })).toEqual([]);
  });
  it("변수가 든 크기는 검사하지 않는다", () => {
    expect(run({ type: "panel", size: ["$w", "100% - $h"] })).toEqual([]);
  });
});

describe("기존 예제에 오탐 없음", () => {
  const files = (o: Record<string, string>) => Object.fromEntries(Object.entries(o).filter(([f]) => f.endsWith(".json") && f.startsWith("ui/")).map(([f, t]) => [f, JSON.parse(t) as JsonObject]));
  const noErr = (name: string, f: Record<string, JsonObject>) =>
    it(name, () => {
      const d = runChecks(f, LAYOUT_CHECKS).diagnostics;
      expect(d.filter((x) => x.level === "error")).toEqual([]);
      // 경고도 지금은 없도록 유지한다(생성기가 규칙을 어기지 않는다).
      expect(d.filter((x) => x.level === "warn").map((x) => `${x.rule} ${x.path}`)).toEqual([]);
    });
  noErr("high 예제", files(buildExamples().files));
  noErr("2048", files(buildEntityScreens([e2048], { namespace: "e2048" }).files));
  noErr("matchmaking", files(buildEntityScreens([matchmaking], { namespace: "emm_box" }).files));
  noErr("research", files(buildEntityScreens([research], { namespace: "ers" }).files));
  noErr("menu-lab", files(buildEntityScreens([menuLab], { namespace: "eml", strict: false }).files));
});
