import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { createPack } from "../src/pack.ts";
import { createSlots } from "../src/slots.ts";
import { defineItems } from "../examples/research/items.tsx";

const fixture = JSON.parse(readFileSync(new URL("./fixtures/ffr/ffr_items.json", import.meta.url), "utf8"));

function build() {
  const slots = createSlots();
  slots.range("tab0", 48); slots.range("tab1", 48); slots.range("tabs", 2);
  slots.range("pager0", 2); slots.range("pager1", 2);
  slots.blocks("detail", 96, [
    "head", "status", "desc",
    ...Array.from({ length: 8 }, (_, i) => `mat${i}`),
    ...Array.from({ length: 8 }, (_, i) => `rew${i}`),
    "progress",
  ]);
  const pack = createPack();
  defineItems(pack, slots);
  return pack;
}

describe("research items", () => {
  it("test_items_equal_fixture", () => {
    const got = build().json("ffr_items.json");
    expect(Object.keys(got)).toHaveLength(291);
    expect(got).toEqual(fixture);
    // 키 순서까지 동일
    expect(JSON.stringify(got)).toBe(JSON.stringify(fixture));
  });
  it("파일 출력과 한글 보존", () => {
    const out = build().files()["ui/ffr_items.json"];
    expect(out).toContain("필요한 재료");
    expect(JSON.parse(out)).toEqual(fixture);
    expect(out.endsWith("}\n")).toBe(true);
  });
  it("test_indices_from_slots", () => {
    const src = readFileSync(new URL("../examples/research/items.tsx", import.meta.url), "utf8");
    expect(src).not.toMatch(/\b102\b/);
    expect(src).not.toMatch(/\b20\b/);
  });
});
