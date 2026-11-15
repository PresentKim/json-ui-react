import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const files = ["grid", "router", "toggle"].map((f) => [f, readFileSync(`src/components/${f}.tsx`, "utf8")] as const);

describe("components 저수준 재작성", () => {
  for (const [f, src] of files) {
    it(`${f}: 소문자 내장 태그와 binding_type 리터럴이 없다`, () => {
      expect(src).not.toMatch(/(^|[\s(>{])<\/?[a-z][a-z_]*[\s>/]/m);
      expect(src).not.toMatch(/binding_type\s*:/);
    });
  }
});
