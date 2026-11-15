import { describe, it, expect } from "vitest";
import { HOST_CHECKS } from "../../src/check/hosts.ts";
import { runChecks } from "../../src/check/engine.ts";
import { buildExamples } from "../../example/build-rp.ts";
import { buildEntityScreens } from "json-ui-react";
import { e2048 } from "../../example-entity/screens/e2048.tsx";
import { matchmaking } from "../../example-entity/screens/matchmaking.tsx";
import menuLab from "../../example-entity/screens/menu-lab.tsx";
import { research } from "../../example-entity/screens/research.tsx";
import type { JsonObject } from "../../src/types.ts";
import type { RuleId } from "../../src/rules/registry.ts";

const run = (files: Record<string, JsonObject>, id: RuleId, rewrite = false) =>
  runChecks(files, HOST_CHECKS, { only: [id], rewrite });
const one = (body: JsonObject, file = "ui/t.json", key = "def") => ({ [file]: { namespace: "t", [key]: body } as JsonObject });
const rules = (files: Record<string, JsonObject>, id: RuleId) => run(files, id).diagnostics.map((d) => [d.level, d.path]);

describe("HOST_CHECKS forbid", () => {
  it("HOST-19: 바인딩의 $container_title 은 error, 텍스트는 통과", () => {
    const bad = one({ type: "panel", bindings: [{ binding_type: "view", source_property_name: "($container_title = 'a')", target_property_name: "#visible" }] });
    expect(rules(bad, "HOST-19")).toEqual([["error", "t.def"]]);
    expect(rules(one({ type: "label", text: "$container_title" }), "HOST-19")).toEqual([]);
  });

  it("INP-11: 토글에 toggle_on_button 이 없으면 error", () => {
    expect(rules(one({ type: "toggle" }), "INP-11")).toEqual([["error", "t.def"]]);
    const ok = one({ type: "toggle", toggle_on_button: "toggle.toggle_on", toggle_off_button: "toggle.toggle_off", button_mappings: [] });
    expect(rules(ok, "INP-11")).toEqual([]);
    // 로컬 ref 에서 상속받으면 통과, 바닐라 ref 는 알 수 없으므로 통과
    const files: Record<string, JsonObject> = { "ui/t.json": { namespace: "t", base: { type: "toggle", toggle_on_button: "x", button_mappings: [] }, "kid@t.base": { type: "toggle" } } };
    expect(rules(files, "INP-11")).toEqual([]);
    expect(rules(one({ type: "toggle" }, "ui/t.json", "x@common.toggle"), "INP-11")).toEqual([]);
  });

  it("INP-06: 상태 자식의 visible 은 warn", () => {
    const bad = one({ type: "button", default_control: "d", controls: [{ d: { type: "panel", visible: false } }, { other: { visible: false } }] });
    expect(rules(bad, "INP-06")).toEqual([["warn", "t.def"]]);
    expect(rules(one({ type: "button", default_control: "d", controls: [{ d: { type: "panel" } }] }), "INP-06")).toEqual([]);
  });

  it("INP-35: 라디오 그룹에 toggle_name 이 없으면 warn", () => {
    expect(rules(one({ type: "toggle", radio_toggle_group: true }), "INP-35")).toEqual([["warn", "t.def"]]);
    expect(rules(one({ type: "toggle", radio_toggle_group: true, toggle_name: "g" }), "INP-35")).toEqual([]);
  });

  it("INP-31: 엔진 버튼 이름이 아니면 warn", () => {
    expect(rules(one({ "$pressed_button_name": "nope" }), "INP-31")).toHaveLength(1);
    expect(rules(one({ "$pressed_button_name": "button.form_button_click" }), "INP-31")).toEqual([]);
  });

  it("HOST-03/15: 짧은 플래그는 warn, 긴 접두사는 통과", () => {
    const mk = (flag: string, ch: string) => one({ bindings: [{ binding_type: "view", source_property_name: `((('%.${flag.length}s' * ${ch}) = '${flag}'))`, target_property_name: "#visible" }] });
    expect(rules(mk("ab", "#title_text"), "HOST-03")).toHaveLength(1);
    expect(rules(mk("corev0009core", "#title_text"), "HOST-03")).toEqual([]);
    expect(rules(mk("x", "#hud_title_text_string"), "HOST-15")).toHaveLength(1);
    expect(rules(mk("_r4ui:", "#hud_title_text_string"), "HOST-15")).toEqual([]);
  });

  it("HOST-06: #title_text 가시성 게이트 3개 이상이면 warn", () => {
    const gate = (n: string) => ({ [n]: { bindings: [{ binding_type: "view", source_property_name: `(('%.2s' * #title_text) = '${n}')`, target_property_name: "#visible" }] } });
    expect(rules(one({ controls: [gate("aa"), gate("bb"), gate("cc")] }), "HOST-06")).toHaveLength(1);
    expect(rules(one({ controls: [gate("aa")] }), "HOST-06")).toEqual([]);
  });

  it("HOST-12: 정적 슬라이더는 warn, 팩토리 대상이면 통과", () => {
    expect(rules(one({ type: "panel", controls: [{ s: { type: "slider" } }] }), "HOST-12")).toEqual([["warn", "t.def/s"]]);
    const files: Record<string, JsonObject> = {
      "ui/t.json": { namespace: "t", row: { type: "panel", controls: [{ s: { type: "slider" } }] }, list: { type: "stack_panel", factory: { name: "f", control_ids: { slider: "@t.row" } } } },
    };
    expect(rules(files, "HOST-12")).toEqual([]);
  });

  it("HOST-26: hud root_panel 안에 controls 를 넣으면 warn", () => {
    expect(rules(one({ controls: [{ x: {} }] }, "ui/hud_screen.json", "root_panel"), "HOST-26")).toHaveLength(1);
    expect(rules(one({ visible: false }, "ui/hud_screen.json", "root_panel"), "HOST-26")).toEqual([]);
  });

  it("HOST-49: 상자 화면 재선언은 warn", () => {
    expect(rules({ "ui/chest_screen.json": { namespace: "chest", small_chest_screen: { type: "screen" } } }, "HOST-49")).toHaveLength(1);
    expect(rules({ "ui/chest_screen.json": { namespace: "chest", "small_chest_panel/root_panel": { visible: false } } }, "HOST-49")).toEqual([]);
  });
});

describe("HOST_CHECKS rewrite", () => {
  const form = (extra: JsonObject, key = "btn@common.button"): Record<string, JsonObject> =>
    one({ bindings: [{ binding_type: "collection_details", binding_collection_name: "form_buttons" }], ...extra }, "ui/t.json", key);

  it("rewrite 가 아니면 규칙을 돌리지 않고 입력을 바꾸지 않는다", () => {
    const f = form({});
    const r = runChecks(f, HOST_CHECKS);
    expect(r.diagnostics.filter((d) => d.level === "info")).toEqual([]);
    expect(r.files).toBe(f);
  });

  it("INP-32: 서버 폼 버튼에만 $focus_enabled false 를 넣고 원본은 그대로", () => {
    const f = form({});
    const r = run(f, "INP-32", true);
    expect((r.files["ui/t.json"]!["btn@common.button"] as JsonObject)["$focus_enabled"]).toBe(false);
    expect((f["ui/t.json"]!["btn@common.button"] as JsonObject)["$focus_enabled"]).toBeUndefined();
    expect(r.diagnostics.map((d) => d.level)).toEqual(["info"]);
    // 폼 칸이 아니면 안 건드림, 이미 값이 있으면 유지
    const plain = one({}, "ui/t.json", "btn@common.button");
    expect(run(plain, "INP-32", true).diagnostics).toEqual([]);
    const set = form({ "$focus_enabled": true });
    expect((run(set, "INP-32", true).files["ui/t.json"]!["btn@common.button"] as JsonObject)["$focus_enabled"]).toBe(true);
  });

  it("INP-32: 라디오 토글 변수", () => {
    const f = form({ "$toggle_name": "g" }, "tg@common.toggle");
    const b = run(f, "INP-32", true).files["ui/t.json"]!["tg@common.toggle"] as JsonObject;
    expect(b["$toggle_focus_enabled"]).toBe(false);
    expect(b["$toggle_group_default_selected"]).toBe(-1);
  });

  it("HOST-43: third_party_server_screen 에 빈 애니메이션 배열", () => {
    const f = one({ "$screen_content": "a.b" }, "ui/server_form.json", "third_party_server_screen");
    const b = run(f, "HOST-43", true).files["ui/server_form.json"]!.third_party_server_screen as JsonObject;
    expect(b["$screen_animations"]).toEqual([]);
    expect(b["$background_animations"]).toEqual([]);
  });

  it("HOST-34: - '$' 패딩 제거를 탭으로", () => {
    const f = one({ bindings: [{ binding_type: "view", source_property_name: "(('%.8s' * #x) - '$')", target_property_name: "#t" }] });
    const b = run(f, "HOST-34", true).files["ui/t.json"]!.def as JsonObject;
    expect((b.bindings as JsonObject[])[0]!.source_property_name).toBe("(('%.8s' * #x) - '\\t')");
  });
});

describe("기존 예시에서 error 없음", () => {
  const parse = (files: Record<string, string>): Record<string, JsonObject> =>
    Object.fromEntries(Object.entries(files).filter(([f]) => f.endsWith(".json")).map(([f, t]) => [f, JSON.parse(t) as JsonObject]));
  const sets: [string, Record<string, string>][] = [
    ["high example", buildExamples().files],
    ...([["2048", e2048], ["matchmaking", matchmaking], ["menu-lab", menuLab], ["research", research]] as const).map(
      ([n, s]): [string, Record<string, string>] => [n, buildEntityScreens([s as any], { namespace: "ex", strict: false }).files],
    ),
  ];
  for (const [name, files] of sets) {
    it(name, () => {
      const r = runChecks(parse(files), HOST_CHECKS);
      expect(r.diagnostics.filter((d) => d.level === "error")).toEqual([]);
      expect(r.diagnostics.filter((d) => d.level === "warn")).toEqual([]);
    });
  }
});
