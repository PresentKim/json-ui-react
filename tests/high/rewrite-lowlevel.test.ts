// 서버 폼 고수준 컴포넌트가 저수준 PascalCase 컴포넌트와 bind 빌더만 쓰는지 소스 텍스트로 확인한다.
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const FILES = ["components.tsx", "pane.tsx", "record.tsx", "build.tsx"];

describe("high 서버 폼 소스", () => {
  for (const f of FILES) {
    const src = readFileSync(new URL(`../../src/high/${f}`, import.meta.url), "utf8");
    it(`${f}: 소문자 내장 태그 없음`, () => {
      expect(src.match(/<\/?(?:panel|stack_panel|grid|image|label|custom|factory|collection_panel|screen|button|toggle|input_panel|slider|slider_box|edit_box|scroll_view|scroll_track|dropdown|tooltip_trigger|carousel_label|selection_wheel|use)[\s>/]/g) ?? []).toEqual([]);
    });
    it(`${f}: binding_type 리터럴 없음`, () => {
      expect(src).not.toMatch(/binding_type\s*:/);
    });
  }
});
