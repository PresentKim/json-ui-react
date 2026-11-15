// 공개 진입점이 규칙, 컨트롤, 빌더 이름을 모두 내보내는지 본다.
import { describe, expect, it } from "vitest";
import * as api from "../../src/index.ts";

describe("exports", () => {
  it("규칙, 빌더, 컨트롤 이름이 진입점에서 보인다", () => {
    for (const k of [
      "getRule", "listRules", "ruleUrl", "diag", "RULE_IDS", "RULE_INFO", "STAGES",
      "bind", "checkBindings", "E", "Expr", "checkExpr", "animation", "chain", "EASINGS",
      "Panel", "StackPanel", "Grid", "Image", "Button", "Toggle", "Use", "LowScreen", "LowLabel", "BUTTON_IDS",
      "Screen", "buildScreens", "view", "collection", "details", "global", "lit", "prefixEq", "lacks",
    ]) expect((api as Record<string, unknown>)[k], k).toBeDefined();
  });
  it("고수준 Screen은 저수준 LowScreen과 다르다", () => {
    expect(api.Screen).not.toBe(api.LowScreen);
  });
  it("getRule과 ruleUrl이 동작한다", () => {
    const id = api.RULE_IDS[0] as Parameters<typeof api.getRule>[0];
    expect(api.getRule(id).url).toBe(api.ruleUrl(id));
  });
});
