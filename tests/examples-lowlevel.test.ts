import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync } from "node:fs";

// 예시 소스는 고수준 부품과 PascalCase 저수준 컨트롤, 빌더만 쓴다(소스 텍스트 검사).
const dirs = ["example/screens", "example-entity/screens"];
const FILES = [
  ...dirs.flatMap((d) => readdirSync(d).filter((f) => /\.tsx?$/.test(f)).map((f) => `${d}/${f}`)),
  "example/catalog.ts",
  "examples/research/items.tsx",
  "examples/research/screen.tsx",
];
const TAGS = /<\/?(panel|stack_panel|grid|image|label|custom|factory|collection_panel|screen|button|toggle|input_panel|slider|slider_box|edit_box|scroll_view|scroll_track|dropdown|tooltip_trigger|carousel_label|selection_wheel|use)[\s/>]/;

describe("examples on high-level + typed low-level", () => {
  for (const f of FILES) {
    const src = readFileSync(f, "utf8");
    it(`${f}: 소문자 intrinsic 태그가 없다`, () => {
      expect(src).not.toMatch(TAGS);
    });
    it(`${f}: binding_type 리터럴이 없다`, () => {
      expect(src).not.toMatch(/binding_type\s*:/);
    });
    it(`${f}: src를 직접 가져오지 않는다`, () => {
      expect(src).not.toMatch(/from\s+"(\.\.\/)+src\//);
    });
  }
});
