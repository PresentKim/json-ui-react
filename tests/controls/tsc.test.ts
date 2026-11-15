import { describe, expect, it } from "vitest";
import { spawnSync } from "node:child_process";

// vitest 는 타입을 검사하지 않으므로 @ts-expect-error 가 실제로 걸리는지 tsc 로 확인한다.
describe("controls typecheck", () => {
  it("tsc: controls/anim/rules 와 그 테스트에 타입 오류가 없다", () => {
    const r = spawnSync("npx", ["tsc", "--noEmit", "-p", "."], { encoding: "utf8", cwd: new URL("../../", import.meta.url).pathname });
    const lines = (r.stdout + r.stderr).split("\n").filter((l) => /error TS/.test(l) && /^(src\/(controls|rules|anim|types|jsx)|tests\/(controls|rules|builders\/anim))/.test(l));
    expect(lines).toEqual([]);
  }, 180_000);
});
