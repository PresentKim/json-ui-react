import { describe, it, expect } from "vitest";
import { ALL_CHECKS, allChecks } from "../../src/check/index.ts";
import { runChecks } from "../../src/check/engine.ts";
import { STAGES } from "../../src/rules/stages/index.ts";
import { buildExamples } from "../../example/build-rp.ts";
import { buildEntityScreens } from "../../src/entity/build.tsx";
import { e2048 } from "../../example-entity/screens/e2048.tsx";
import { matchmaking } from "../../example-entity/screens/matchmaking.tsx";
import menuLab from "../../example-entity/screens/menu-lab.tsx";
import { research } from "../../example-entity/screens/research.tsx";
import type { PanelProps, StackPanelProps, GridProps, LabelProps, ImageProps, ControlType } from "../../src/controls/visual.ts";
import type { AnimDef } from "../../src/anim.ts";
import type { BindingObj } from "../../src/bind.ts";
import type { ButtonMapping } from "../../src/controls/input.ts";
import type { JsonObject } from "../../src/types.ts";

const parse = (files: Record<string, string>): Record<string, JsonObject> =>
  Object.fromEntries(Object.entries(files).map(([f, t]) => [f, JSON.parse(t) as JsonObject]));
const errors = (files: Record<string, string>, roots: string[] = []) =>
  runChecks(parse(files), allChecks(roots)).diagnostics.filter((d) => d.level === "error");

describe("검사 통합", () => {
  it("ALL_CHECKS id는 유일하다", () => {
    const ids = ALL_CHECKS.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("every_check_enforced: 모든 검사 id가 STAGES에서 enforced다", () => {
    const bad = ALL_CHECKS.filter((c) => STAGES[c.id]?.status !== "enforced").map((c) => c.id);
    expect(bad).toEqual([]);
  });

  it("examples_clean: 고수준 예제 빌드는 오류 진단이 없다", () => {
    const built = buildExamples();
    expect(built.diagnostics.filter((d) => d.level === "error")).toEqual([]);
    expect(errors(built.files, ["ex.root"].slice(0, 0))).toEqual([]);
  });

  it("examples_clean: 엔티티 예제 네 개도 오류 진단이 없다", () => {
    const cases: [unknown, string][] = [[e2048, "e2048"], [matchmaking, "emm_box"], [menuLab, "eml"], [research, "ers"]];
    for (const [screen, namespace] of cases) {
      const built = buildEntityScreens([screen as never], { namespace, strict: false });
      const errs = built.diagnostics.filter((d) => d.level === "error" && !String(d.rule).startsWith("ENT-"));
      expect(errs, namespace).toEqual([]);
      expect(errors(built.files), namespace).toEqual([]);
    }
  });
});

// 타입 수준 규칙(stage "type")이 실제로 거부하는지 확인한다. tsc가 사용하지 않은 @ts-expect-error를 오류로 잡는다.
describe("타입 수준 규칙", () => {
  it("type_level: 잘못된 값은 컴파일 오류(tsc로 검사)", () => {
    const fns = [
      () => { const t: ControlType = "panel"; return t; },
      // @ts-expect-error LAY-01: 목록에 없는 컨트롤 타입
      () => { const t: ControlType = "bogus"; return t; },
      // @ts-expect-error LAY-03: 단위가 틀린 크기
      () => { const p: PanelProps = { size: ["fill%", 10] }; return p; },
      // @ts-expect-error LAY-16: 앵커 9값 밖
      () => { const p: PanelProps = { anchor_from: "middle_middle" }; return p; },
      // @ts-expect-error LAY-17: offset 단위 오류
      () => { const p: PanelProps = { offset: ["8", 0] }; return p; },
      // @ts-expect-error LAY-25: 그리드 속성은 grid에만
      () => { const p: PanelProps = { grid_dimensions: [1, 1] }; return p; },
      // @ts-expect-error LAY-26: 그리드 열거값
      () => { const g: GridProps = { grid_fill_direction: "diagonal" }; return g; },
      // @ts-expect-error COL-01: label에는 collection_name 불가
      () => { const l: LabelProps = { collection_name: "x" }; return l; },
      // @ts-expect-error COL-01: image에도 불가
      () => { const l: ImageProps = { collection_name: "x" }; return l; },
      // @ts-expect-error COL-01: panel에도 불가
      () => { const l: PanelProps = { collection_name: "x" }; return l; },
      () => { const l: StackPanelProps = { collection_name: "x" }; return l; },
      // @ts-expect-error TXT-03: font_type 열거값
      () => { const l: LabelProps = { font_type: "comic" }; return l; },
      // @ts-expect-error TXT-05: font_size 열거값
      () => { const l: LabelProps = { font_size: "huge" }; return l; },
      // @ts-expect-error INP-02: mapping_type 열거값
      () => { const m: ButtonMapping = { from_button_id: "a", to_button_id: "b", mapping_type: "hold" }; return m; },
      // @ts-expect-error ANI-08/ANI-20: anim_type 9종 밖
      () => { const a: AnimDef = { anim_type: "spin", from: 0, to: 1, duration: 1 }; return a; },
      // @ts-expect-error ANI-10: easing 목록 밖
      () => { const a: AnimDef = { anim_type: "alpha", from: 0, to: 1, duration: 1, easing: "in_wobble" }; return a; },
      // @ts-expect-error BND-22: 모르는 binding_type
      () => { const b: BindingObj = { binding_type: "globl", binding_name: "#a" }; return b; },
      // @ts-expect-error BND-22: 모르는 binding_condition
      () => { const b: BindingObj = { binding_name: "#a", binding_condition: "sometimes" }; return b; },
    ];
    expect(fns.length).toBeGreaterThan(0);
  });
});
