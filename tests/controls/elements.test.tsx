import { describe, expect, it } from "vitest";
import { render } from "../../src/render.ts";
import { Panel, Label, Use, Button } from "../../src/controls/index.ts";

describe("typed intrinsics", () => {
  it("PascalCase 컴포넌트는 내장 요소와 같은 렌더 결과", () => {
    expect(render(<Panel name="p" size={[10, 10]} />)).toEqual(render(<panel name="p" size={[10, 10]} />));
    expect(render(<Label name="l" text="a" />)).toEqual(render(<label name="l" text="a" />));
    expect(render(<Use name="u" def="a.b" collection_index={1} />)).toEqual(render(<use name="u" def="a.b" collection_index={1} />));
  });
  it("타입 오류 (tsc 에서만 검사)", () => {
    // @ts-expect-error COL-02: label 에는 collection_index 불가
    render(<label name="l" text="a" collection_index={1} />);
    // @ts-expect-error 모르는 태그
    render(<foo name="x" />);
    expect(Button).toBeTypeOf("function");
  });
});
