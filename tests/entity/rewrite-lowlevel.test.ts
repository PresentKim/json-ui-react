import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";

// 엔티티 컴포넌트는 PascalCase 저수준 컴포넌트와 빌더로만 쓴다(소스 텍스트 검사).
const FILES = ["src/entity/data.tsx", "src/entity/interact.tsx", "src/entity/build.tsx"];
const TAGS = /<\/?(panel|stack_panel|grid|image|label|custom|factory|collection_panel|screen|button|toggle|input_panel|slider|slider_box|edit_box|scroll_view|scroll_track|dropdown|tooltip_trigger|carousel_label|selection_wheel|use)[\s/>]/;

describe("entity rewrite on low-level", () => {
  for (const f of FILES) {
    const src = readFileSync(f, "utf8");
    it(`${f}: 소문자 intrinsic 태그가 없다`, () => {
      expect(src).not.toMatch(TAGS);
    });
    it(`${f}: binding_type 리터럴이 없다`, () => {
      expect(src).not.toMatch(/binding_type\s*:/);
    });
  }
});
