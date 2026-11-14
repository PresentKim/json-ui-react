// 실측(2026-11-14 모바일) 회귀:
// - tabs-lazy: 첫 탭을 `#toggle_state` 길이 팩토리로 만들면 처음 열 때 비고 탭을 눌러야 채워졌다. 첫 탭은 미리 만든다.
// - tabs-follow·router: panel 자식의 기본 앵커가 가운데라 짧은 목록이 판 세로 가운데에 떴다. 왼쪽 위에 붙인다.
import { describe, expect, it } from "vitest";
import { buildExamples } from "../../example/build-rp.ts";
import type { JsonObject } from "../../src/types.ts";

const jur = JSON.parse(buildExamples().files["ui/jur.json"]!) as Record<string, any>;

/** controls 배열의 각 항목 { 이름: 본문 }을 [이름, 본문]으로 */
const kids = (def: any): [string, any][] => (def.controls ?? []).map((c: JsonObject) => Object.entries(c)[0] as [string, any]);
const TOP_LEFT = { anchor_from: "top_left", anchor_to: "top_left" };

describe("탭 예시 레이아웃", () => {
  it("tabs-lazy 첫 탭은 팩토리 없이 미리 만들고 토글 상태로 보인다", () => {
    const first = jur["tl_pane_0"];
    expect(first.factory).toBeUndefined();
    expect(first).toMatchObject(TOP_LEFT);
    expect(first.bindings).toContainEqual(expect.objectContaining({
      source_control_name: "jur_t0", source_property_name: "#toggle_state", target_property_name: "#visible",
    }));
    const panes = kids(jur["tl_panes"]);
    expect(panes.map(([k]) => k)).toEqual(["g0@jur.tl_pane_0", "g1@jur.tl_lazy_1"]);
    expect(jur["tl_lazy_0"]).toBeUndefined();
    expect(jur["tl_lazy_1"].factory).toEqual({ name: "jur_tl1", control_name: "jur.tl_pane_1" });
  });

  it("tabs-follow 목록은 판 왼쪽 위에 붙는다", () => {
    for (const [, body] of kids(jur["tf_panes"])) expect(body).toMatchObject(TOP_LEFT);
  });

  it("router 목록은 판 왼쪽 위에 붙는다", () => {
    for (const [, body] of kids(jur["ro_panes"])) expect(body).toMatchObject(TOP_LEFT);
  });
});
