import { describe, it, expect } from "vitest";
import { runChecks } from "../../src/check/engine.ts";
import { EXPRESSION_CHECKS } from "../../src/check/expressions.ts";
import { buildExamples } from "../../example/build-rp.ts";
import { buildEntityScreens } from "../../src/entity/build.tsx";
import menuLab from "../../example-entity/screens/menu-lab.tsx";
import type { JsonObject } from "../../src/types.ts";

const files = (ctl: JsonObject): Record<string, JsonObject> => ({ "ui/t.json": { namespace: "t", main: { type: "panel", ...ctl } } });
const run = (ctl: JsonObject, rewrite = false) => runChecks(files(ctl), EXPRESSION_CHECKS, { rewrite });
const rules = (ctl: JsonObject) => run(ctl).diagnostics.map((d) => `${d.rule}:${d.level}`);
const view = (src: string, extra: JsonObject = {}) => ({ bindings: [{ binding_type: "view", source_property_name: src, target_property_name: "#visible", ...extra }] });

describe("expression checks", () => {
  it("EXP-02 % 연산자", () => {
    expect(rules(view("((#c % 10) = 3)"))).toContain("EXP-02:error");
    expect(rules(view("((#c % 10) = 3)"))).toContain("EXP-46:warn");
  });
  it("따옴표 안의 연산자는 무시한다", () => {
    expect(rules(view("(('%.8s' * #t) = 'a>=b % c!')"))).toEqual([]);
  });
  it("EXP-03 >= <=", () => {
    expect(rules(view("(#a >= 2)"))).toContain("EXP-03:error");
    expect(rules(view("(#a <= 2)"))).toContain("EXP-03:error");
    expect(rules(view("(#a > 2)"))).toEqual([]);
  });
  it("EXP-01 알 수 없는 문자", () => {
    expect(rules(view("(#a != 2)"))).toContain("EXP-01:error");
    expect(rules(view("(#a & #b)"))).toContain("EXP-01:error");
    expect(rules(view("((#a + 1) = 2)"))).toEqual([]);
  });
  it("checkExpr 규칙을 다시 낸다", () => {
    expect(rules(view("(1 < #a < 2)"))).toContain("EXP-28:error");
    expect(rules(view("(#a * 1e5)"))).toContain("DBG-30:error");
    expect(rules({ visible: "(#a * 1e5)" })).toContain("DBG-30:error");
  });
  it("checkBindings 규칙을 다시 낸다", () => {
    expect(rules({ bindings: [{ binding_type: "view", source_property_name: "#a", target_property_name: "visible" }] })).toContain("BND-01:warn");
    expect(rules({ bindings: [{ binding_type: "view", source_property_name: "'x'", target_property_name: "#visible" }] })).toContain("BND-05:warn");
    expect(rules({ bindings: [{ binding_name: "#a", binding_condition: "bogus" }] })).toContain("BND-22:error");
    expect(rules({ bindings: [{ binding_type: "view", target_property_name: "#visible" }] })).toContain("BND-36:error");
    expect(rules({ bindings: [{ binding_type: "wat" }] })).toContain("BND-02:error");
  });
  it("BND-27 불리언 대상에 리터럴", () => {
    expect(rules({ property_bag: { "#visible": "false" } })).toContain("BND-27:error");
    expect(rules({ property_bag: { "#visible": false } })).toEqual([]);
    expect(rules({ bindings: [{ binding_name: "#title_text", binding_name_override: "#visible" }] })).toContain("BND-27:error");
  });
  it("BND-31 제목 라우팅 once", () => {
    const b = (c: string) => view("(('%.8s' * #title_text) = 'abc')", { binding_condition: c });
    expect(rules(b("once"))).toContain("BND-31:warn");
    expect(rules(b("always"))).toEqual([]);
  });
  it("BND-34 빼기 후 바로 비교", () => {
    expect(rules(view("(not ((#a - #b) = 'z'))"))).toContain("BND-34:warn");
    expect(rules(view("((#a - 'z') = #a)"))).toEqual([]);
  });
  it("EXP-27 rewrite leaves non-expression binding strings alone", () => {
    const b = { binding_type: "view", source_property_name: "(#a * 0.5)", target_property_name: "#visible", binding_name: "note 0.5" };
    const r = run({ type: "panel", bindings: [b] }, true);
    const out = (r.files["ui/t.json"]!.main as any).bindings[0];
    expect(out.source_property_name).toBe("(#a * .5)");
    expect(out.binding_name).toBe("note 0.5");
  });
  it("EXP-27 rewrite", () => {
    const src = "(#a * 0.5)";
    expect(rules(view(src))).not.toContain("EXP-27:info");
    const r = run(view(src), true);
    expect((r.files["ui/t.json"]!.main as any).bindings[0].source_property_name).toBe("(#a * .5)");
    expect(r.diagnostics.map((d) => `${d.rule}:${d.level}`)).toEqual(["EXP-27:info"]);
    expect((files(view(src))["ui/t.json"]!.main as any).bindings[0].source_property_name).toBe(src);
  });
});

describe("기존 예제에 오탐 없음", () => {
  it("example 화면", () => {
    const built = buildExamples();
    const parsed = Object.fromEntries(Object.entries(built.files).map(([f, t]) => [f, JSON.parse(t) as JsonObject]));
    expect(runChecks(parsed, EXPRESSION_CHECKS).diagnostics.filter((d) => d.level === "error")).toEqual([]);
  });
  it("entity menu-lab", () => {
    const built = buildEntityScreens([menuLab], { namespace: "eml", strict: false });
    const parsed = Object.fromEntries(Object.entries(built.files).map(([f, t]) => [f, JSON.parse(t) as JsonObject]));
    expect(runChecks(parsed, EXPRESSION_CHECKS).diagnostics.filter((d) => d.level === "error")).toEqual([]);
  });
});
