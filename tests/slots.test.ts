import { describe, it, expect } from "vitest";
import { createSlots, decode, serverModule, withSlots, useSlots } from "../src/slots.ts";

const FIELDS = ["head", "status", "desc",
  ...Array.from({ length: 8 }, (_, i) => `mat${i}`),
  ...Array.from({ length: 8 }, (_, i) => `rew${i}`), "progress"];

function build() {
  const s = createSlots();
  s.range("tab0", 48); s.range("tab1", 48); s.range("tabs", 2);
  s.range("pager0", 2); s.range("pager1", 2);
  const b = s.blocks("detail", 96, FIELDS);
  return { s, b };
}

describe("slots", () => {
  it("range 시작 번호", () => {
    const s = createSlots();
    expect(s.range("tab0", 48)).toMatchObject({ name: "tab0", start: 0, count: 48 });
    const r = s.range("tabs", 2);
    expect(r.start).toBe(48);
    expect(r.at(1)).toBe(49);
    expect(() => r.at(2)).toThrow();
  });
  it("blocks와 layout", () => {
    const { s, b } = build();
    expect(b.at(0, "progress")).toBe(121);
    expect(b.at(1, "head")).toBe(122);
    expect(b.size).toBe(20);
    const L = s.layout();
    expect(L.total).toBe(2022);
    expect(L.blocks[0]).toMatchObject({ name: "detail", start: 102, count: 96 });
  });
  it("decode", () => {
    const L = build().s.layout();
    expect(decode(L, 99)).toEqual({ name: "pager0", index: 1 });
    expect(decode(L, 181)).toEqual({ name: "detail", index: 3, field: "progress" });
    expect(decode(L, 5000)).toBeNull();
    expect(decode(L, -1)).toBeNull();
  });
  it("test_use_outside_throws", () => {
    expect(() => useSlots()).toThrow(Error);
    const s = createSlots();
    expect(withSlots(s, () => useSlots())).toBe(s);
    expect(() => useSlots()).toThrow();
  });
  it("test_negative_or_zero_count_throws", () => {
    const s = createSlots();
    expect(() => s.range("a", 0)).toThrow();
    expect(() => s.range("a", -1)).toThrow();
    expect(() => s.blocks("b", 0, ["x"])).toThrow();
    expect(() => s.blocks("b", 1, [])).toThrow();
  });
  it("test_field_index_out_of_range_throws", () => {
    const { b } = build();
    expect(() => b.at(96, "head")).toThrow(Error);
    expect(() => b.at(0, "nope")).toThrow(Error);
  });
  it("중복 이름은 오류", () => {
    const s = createSlots(); s.range("a", 1);
    expect(() => s.range("a", 1)).toThrow();
  });
  it("test_server_module_runs", async () => {
    const L = build().s.layout();
    const src = serverModule(L);
    const m = await import("data:text/javascript;base64," + Buffer.from(src).toString("base64"));
    expect(m.LAYOUT.total).toBe(2022);
    expect(m.decode(99)).toEqual({ name: "pager0", index: 1 });
    expect(m.decode(181)).toEqual({ name: "detail", index: 3, field: "progress" });
    expect(m.decode(5000)).toBeNull();
    expect(serverModule(L)).toBe(src);
  });
});
