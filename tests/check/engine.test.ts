import { describe, it, expect } from "vitest";
import { runChecks, buildIndex } from "../../src/check/engine.ts";
import { LEGACY_CHECKS, lintFiles } from "../../src/lint.ts";
import type { RuleCheck } from "../../src/check/types.ts";
import type { JsonObject } from "../../src/types.ts";

describe("runChecks", () => {
  it("레거시 검사가 url 포함 진단을 낸다", () => {
    const r = runChecks({ "ui/a.json": { namespace: "a", t: { type: "toggle" } } }, LEGACY_CHECKS);
    expect(r.diagnostics[0]).toMatchObject({ rule: "INP-10", level: "error", path: "a.t", url: "https://presentkim.github.io/bedrock-research/reference/rules#inp-10" });
    expect(r.diagnostics[0]!.message).toContain("빠진 키: checked_control");
  });

  it("전위 순서, 경로 정렬, ctx 필드", () => {
    const seen: string[] = [];
    const c: RuleCheck = { id: "COL-02", stage: "forbid", node: (ctx) => { seen.push(`${ctx.path}|${ctx.depth}|${ctx.ref ?? ""}|${ctx.parent?.name ?? ""}`); } };
    const files = { "ui/a.json": { namespace: "a", p: { type: "panel", controls: [{ "x@a.b": { controls: [{ y: {} }] } }, { z: {} }] } } } as Record<string, JsonObject>;
    runChecks(files, [c]);
    expect(seen).toEqual(["a.p|0||", "a.p/x|1|a.b|p", "a.p/x/y|2||x", "a.p/z|1||p"]);
  });

  it("진단은 경로, 규칙 순으로 정렬된다", () => {
    const mk = (id: "COL-02" | "COL-50"): RuleCheck => ({ id, stage: "forbid", node: (_c, r) => r("warn") });
    const d = runChecks({ "ui/a.json": { namespace: "a", b: {}, a: {} } }, [mk("COL-50"), mk("COL-02")]).diagnostics;
    expect(d.map((x) => `${x.path}:${x.rule}`)).toEqual(["a.a:COL-02", "a.a:COL-50", "a.b:COL-02", "a.b:COL-50"]);
  });

  it("rewrite는 깊은 복사본에서만 고치고 입력은 그대로", () => {
    const rw: RuleCheck = { id: "HOST-34", stage: "rewrite", node: (c, r) => { c.body.x = 1; r("info", "고침"); } };
    const input = { "ui/a.json": { namespace: "a", t: { type: "panel" } } } as Record<string, JsonObject>;
    const off = runChecks(input, [rw]);
    expect(off.diagnostics).toEqual([]);
    expect(off.files).toBe(input);
    const on = runChecks(input, [rw], { rewrite: true });
    expect((on.files["ui/a.json"]!.t as JsonObject).x).toBe(1);
    expect((input["ui/a.json"]!.t as JsonObject).x).toBeUndefined();
    expect(on.diagnostics[0]!.level).toBe("info");
  });

  it("only로 규칙을 좁힌다", () => {
    const d = runChecks({ "ui/a.json": { namespace: "a", t: { type: "label", collection_index: 1, controls: [] } } }, LEGACY_CHECKS, { only: ["INP-10"] }).diagnostics;
    expect(d).toEqual([]);
  });

  it("순환 객체는 건너뛴다", () => {
    const a: JsonObject = { type: "panel" };
    a.controls = [{ self: a }];
    let n = 0;
    runChecks({ "ui/a.json": { namespace: "a", a } }, [{ id: "COL-02", stage: "forbid", node: () => { n++; } }]);
    expect(n).toBe(1);
  });

  it("file 훅은 파일마다 한 번", () => {
    let n = 0;
    runChecks({ "ui/a.json": { namespace: "a", p: {}, q: {} }, "ui/b.json": { namespace: "b" } }, [{ id: "FILE-01", stage: "forbid", file: () => { n++; } }]);
    expect(n).toBe(2);
  });

  it("buildIndex 조회", () => {
    const i = buildIndex({ "ui/a.json": { namespace: "a", "p@x.y": { type: "panel" } } });
    expect(i.get("a.p")).toMatchObject({ ns: "a", name: "p", ref: "x.y", file: "ui/a.json" });
    expect(i.all()).toHaveLength(1);
  });

  it("lintFiles는 url을 덧붙이되 기존 필드는 유지", () => {
    const d = lintFiles({ "ui/a.json": { namespace: "a", t: { type: "label", text: "x", collection_index: 1 } } });
    expect(d[0]).toMatchObject({ rule: "COL-02", level: "warn", path: "a.t" });
  });
});
