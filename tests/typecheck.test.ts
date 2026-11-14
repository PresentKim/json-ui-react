import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";

describe("jsx runtime types", () => {
  it("test_jsx_namespace_exported", () => {
    const src = readFileSync(new URL("../src/jsx-runtime.ts", import.meta.url), "utf8");
    expect(src).toContain("export namespace JSX");
    const dev = readFileSync(new URL("../src/jsx-dev-runtime.ts", import.meta.url), "utf8");
    expect(dev).toContain("JSX");
  });
});
