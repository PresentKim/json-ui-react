import { describe, it, expect } from "vitest";
import type { JsonObject } from "../../src/types.ts";
import type { NodeCtx, RuleCheck, DefIndex } from "../../src/check/types.ts";
import { COLLECTION_CHECKS, VANILLA_UI_FILES } from "../../src/check/collections.ts";
import { buildExamples } from "../../example/build-rp.ts";
import { buildEntityScreens } from "json-ui-react";
import { e2048 } from "../../example-entity/screens/e2048.tsx";
import { matchmaking } from "../../example-entity/screens/matchmaking.tsx";

type Diag = { rule: string; level: string; path: string; message?: string };
const isObj = (v: unknown): v is JsonObject => typeof v === "object" && v !== null && !Array.isArray(v);

// 엔진(T1) 없이도 돌도록 만든 작은 순회기. 정의와 controls 자식을 전위로 방문한다.
function run(input: Record<string, unknown>, only?: string): Diag[] {
  const files = input as Record<string, JsonObject>;
  const defs: { ns: string; name: string; ref?: string; body: JsonObject; file: string }[] = [];
  for (const [file, json] of Object.entries(files)) {
    const ns = json.namespace;
    if (typeof ns !== "string") continue;
    for (const [key, body] of Object.entries(json)) {
      if (key === "namespace" || !isObj(body)) continue;
      const [name, ref] = key.split("@");
      defs.push({ ns, name: name!, ref, body, file });
    }
  }
  const index: DefIndex = {
    get: (full) => defs.find((d) => `${d.ns}.${d.name}` === full),
    all: () => defs,
  };
  const out: Diag[] = [];
  const checks = COLLECTION_CHECKS.filter((c) => !only || c.id === only);
  const mk = (c: RuleCheck, path: string) => (level: "error" | "warn" | "info", message?: string) =>
    out.push({ rule: c.id, level, path, message });
  const visit = (ctx: NodeCtx) => {
    for (const c of checks) c.node?.(ctx, mk(c, ctx.path));
    const kids = ctx.body.controls;
    if (!Array.isArray(kids)) return;
    for (const item of kids) {
      if (!isObj(item)) continue;
      for (const [key, child] of Object.entries(item)) {
        if (!isObj(child)) continue;
        const [name, ref] = key.split("@");
        visit({
          body: child, key, name: name!, ref, path: `${ctx.path}/${name}`, type: typeof child.type === "string" ? child.type : undefined,
          parent: ctx, depth: ctx.depth + 1, ns: ctx.ns, file: ctx.file, index, rewrite: false,
        });
      }
    }
  };
  for (const d of defs)
    visit({
      body: d.body, key: d.ref ? `${d.name}@${d.ref}` : d.name, name: d.name, ref: d.ref, path: `${d.ns}.${d.name}`,
      type: typeof d.body.type === "string" ? d.body.type : undefined, depth: 0, ns: d.ns, file: d.file, index, rewrite: false,
    });
  for (const [path, json] of Object.entries(files)) for (const c of checks) c.file?.({ path, json, files }, mk(c, path));
  return out;
}
const ids = (d: Diag[]) => d.map((x) => x.rule);
const reg = (paths: string[]): JsonObject => ({ ui_defs: paths });

describe("collection checks", () => {
  it("COLLECTION_CHECKS는 모두 forbid이고 id가 겹치지 않는다", () => {
    expect(COLLECTION_CHECKS.every((c) => c.stage === "forbid")).toBe(true);
    const all = COLLECTION_CHECKS.map((c) => c.id);
    expect(new Set(all).size).toBe(all.length);
  });

  it("FILE-39 형제 중복 이름", () => {
    const f = { "ui/a.json": { namespace: "a", m: { type: "panel", controls: [{ x: {} }, { "x@y.z": {} }, { w: {} }] } } };
    expect(run(f, "FILE-39")).toEqual([expect.objectContaining({ rule: "FILE-39", level: "warn", path: "a.m" })]);
    const ok = { "ui/a.json": { namespace: "a", m: { controls: [{ x: {} }, { y: {} }] } } };
    expect(run(ok, "FILE-39")).toEqual([]);
  });

  it("FILE-32 @ 없는 키의 점", () => {
    const f = { "ui/a.json": { namespace: "a", m: { controls: [{ "spacer_9.5": {} }, { "ok@a.b": {} }, { fine: {} }] } } };
    const d = run(f, "FILE-32");
    expect(d).toHaveLength(1);
    expect(d[0]).toMatchObject({ rule: "FILE-32", level: "warn", path: "a.m/spacer_9.5" });
  });

  it("COL-38 collection_index 부모 검사", () => {
    const mk = (parent: JsonObject) => ({ "ui/a.json": { namespace: "a", m: { type: "panel", controls: [{ p: { ...parent, controls: [{ c: { collection_index: 1 } }] } }] } } });
    expect(ids(run(mk({ type: "stack_panel" }), "COL-38"))).toEqual(["COL-38"]);
    expect(run(mk({ type: "stack_panel", collection_name: "x" }), "COL-38")).toEqual([]);
    expect(run(mk({ type: "panel" }), "COL-38")).toEqual([]); // COL-50 담당
  });

  it("COL-25 / COL-45 / COL-43 팩토리 선언", () => {
    const f = (b: JsonObject) => ({ "ui/a.json": { namespace: "a", m: { controls: [{ fac: b }] } } });
    expect(ids(run(f({ type: "factory", factory: { name: "server_form_factory", control_name: "a.b" } }), "COL-25"))).toEqual(["COL-25"]);
    expect(run(f({ type: "factory", factory: { name: "fac", control_name: "a.b" } }), "COL-25")).toEqual([]);
    expect(ids(run(f({ type: "panel", factory: { control_name: "a.b" } }), "COL-45"))).toEqual(["COL-45"]);
    expect(run(f({ type: "panel", factory: { name: "n", control_name: "a.b" } }), "COL-45")).toEqual([]);
    expect(ids(run(f({ type: "panel", factory: { name: "n", control_name: "a.b", control_ids: { x: "a.c" } } }), "COL-43"))).toEqual(["COL-43"]);
    expect(ids(run(f({ type: "panel", factory: { name: "n", control_name: "a.b", insert_location: "top" } }), "COL-43"))).toEqual(["COL-43"]);
  });

  it("FILE-01 / FILE-05 / FILE-25 파일 등록과 namespace", () => {
    const base = { "ui/a.json": { namespace: "a", m: {} }, "ui/_ui_defs.json": reg(["ui/a.json"]) };
    expect(run(base)).toEqual([]);
    const unreg = { ...base, "ui/b.json": { namespace: "b", m: {} } };
    expect(run(unreg, "FILE-01")).toEqual([expect.objectContaining({ rule: "FILE-01", level: "error", path: "ui/b.json" })]);
    const vanilla = { ...base, "ui/chest_screen.json": { namespace: "chest", x: {} } };
    expect(run(vanilla)).toEqual([]); // 바닐라 경로는 등록 불필요
    expect(VANILLA_UI_FILES.has("ui/hud_screen.json")).toBe(true);
    const nons = { ...base, "ui/c.json": { m: {} }, "ui/_ui_defs.json": reg(["ui/a.json", "ui/c.json"]) };
    expect(ids(run(nons, "FILE-05"))).toEqual(["FILE-05"]);
    const dup = { ...base, "ui/d.json": { namespace: "a", m: {} }, "ui/_ui_defs.json": reg(["ui/a.json", "ui/d.json"]) };
    expect(ids(run(dup, "FILE-05"))).toEqual(["FILE-05"]);
    const out = { "ui/a.json": { namespace: "a", m: {} }, "ui/_ui_defs.json": reg(["ui/a.json", "my_ui/x.json", "ui/y"]) };
    expect(ids(run(out, "FILE-25"))).toEqual(["FILE-25", "FILE-25"]);
  });

  it("FILE-09 / FILE-10 변수", () => {
    const f = (m: JsonObject) => ({ "ui/a.json": { namespace: "a", m } });
    expect(ids(run(f({ "$x|defualt": 1 }), "FILE-09"))).toEqual(["FILE-09"]);
    expect(run(f({ "$x|default": 1 }), "FILE-09")).toEqual([]);
    expect(ids(run(f({ "$title": "t", type: "label", text: "제목: $title" }), "FILE-10"))).toEqual(["FILE-10"]);
    expect(run(f({ "$title": "t", type: "label", text: "$title" }), "FILE-10")).toEqual([]);
    expect(run(f({ type: "label", text: "가격 $5 $price" }), "FILE-10")).toEqual([]); // 선언 없는 변수는 놓친다
    expect(run(f({ "$a": 1, visible: "(not $a)" }), "FILE-10")).toEqual([]);
  });

  it("FILE-24 property_bag", () => {
    const f = { "ui/a.json": { namespace: "a", m: { property_bag: { size: [1, 1], "#x": 1 } } } };
    expect(ids(run(f, "FILE-24"))).toEqual(["FILE-24"]);
    expect(run({ "ui/a.json": { namespace: "a", m: { property_bag: { "#x": 1 } } } }, "FILE-24")).toEqual([]);
  });

  it("MOD-03 / MOD-04 / MOD-05 / MOD-19", () => {
    const m = (mods: JsonObject[], extra: JsonObject = {}, key = "d@a.base") => ({
      "ui/a.json": { namespace: "a", base: { controls: [{ k: {} }] }, [key]: { ...extra, modifications: mods } },
    });
    expect(ids(run(m([{ array_name: "variables", operation: "insert_back", value: [] }]), "MOD-03"))).toEqual(["MOD-03"]);
    expect(run(m([{ array_name: "controls", operation: "insert_back", value: [] }]), "MOD-03")).toEqual([]);
    // 상속만 받은 배열에 insert
    expect(ids(run(m([{ array_name: "controls", operation: "insert_back", value: [] }]), "MOD-04"))).toEqual(["MOD-04"]);
    expect(run(m([{ array_name: "controls", operation: "insert_back", value: [] }], { controls: [] }), "MOD-04")).toEqual([]);
    expect(run(m([{ array_name: "bindings", operation: "insert_back", value: [] }]), "MOD-04")).toEqual([]); // 상속된 bindings 없음
    // 상속 자식 remove
    expect(ids(run(m([{ array_name: "controls", operation: "remove", control_name: "k" }]), "MOD-05"))).toEqual(["MOD-05"]);
    expect(run(m([{ array_name: "controls", operation: "remove", control_name: "k" }], { controls: [{ k: {} }] }), "MOD-05")).toEqual([]);
    expect(run(m([{ array_name: "controls", operation: "remove", control_name: "k" }], {}, "d"), "MOD-05")).toEqual([]);
    // 같은 ns.이름을 다른 @base로 재선언
    const re = { "ui/a.json": { namespace: "a", "d@a.x": {} }, "ui/b.json": { namespace: "a", "d@a.y": {} } };
    expect(ids(run(re, "MOD-19")).length).toBeGreaterThan(0);
    expect(run({ "ui/a.json": { namespace: "a", "d@a.x": {} } }, "MOD-19")).toEqual([]);
  });

  it("기존 예제 빌드에 오류 진단이 없다", () => {
    const built = buildExamples();
    const parsed = Object.fromEntries(Object.entries(built.files).map(([f, t]) => [f, JSON.parse(t) as JsonObject]));
    const d = run(parsed);
    expect(d.filter((x) => x.level === "error")).toEqual([]);
    expect(d).toEqual([]);
  });

  it("엔티티 예제 빌드에도 진단이 없다", () => {
    for (const [screen, namespace] of [[e2048, "e2048"], [matchmaking, "mm"]] as const) {
      const built = buildEntityScreens([screen as any], { namespace });
      const parsed = Object.fromEntries(Object.entries(built.files).map(([f, t]) => [f, JSON.parse(t) as JsonObject]));
      expect(run(parsed), namespace).toEqual([]);
    }
  });
});
