import { describe, it, expect } from "vitest";
import { createEntitySlots, withEntity, useEntity, type EntityCtx } from "../../src/entity/context.ts";

describe("slots", () => {
  it("slots_overlap: 같은 고정 번호를 두 번 잡으면 던진다", () => {
    const s = createEntitySlots();
    s.claim("a", 1, 5);
    expect(() => s.claim("b", 1, 5)).toThrow();
  });
  it("slots_243: 242번을 넘으면 던진다", () => {
    const s = createEntitySlots("auto");
    expect(s.claim("a", 1, 242)).toEqual([242]);
    expect(() => s.claim("b", 2, 242)).toThrow();
    expect(() => createEntitySlots().claim("c", 1, 243)).toThrow();
  });
  it("자동 배정은 1번부터, 0번은 쓰지 않는다", () => {
    const s = createEntitySlots();
    expect(s.claim("a", 3)).toEqual([1, 2, 3]);
    expect(s.claim("b", 2, 10)).toEqual([10, 11]);
    s.claim("c", 8);
    expect(s.map().c).toEqual([12, 13, 14, 15, 16, 17, 18, 19]);
    expect(() => s.claim("z", 1, 0)).toThrow();
  });
  it("inventorySize", () => {
    const a = createEntitySlots();
    a.claim("a", 26);
    expect(a.inventorySize()).toBe(27);
    a.claim("b", 1);
    expect(a.inventorySize()).toBe(243);
    expect(createEntitySlots(243).inventorySize()).toBe(243);
    expect(() => createEntitySlots(27).claim("a", 27)).toThrow();
  });
});

describe("withEntity", () => {
  it("밖에서는 던지고 안에서는 문맥을 준다", () => {
    expect(() => useEntity("X")).toThrow();
    const ctx = { id: "e" } as EntityCtx;
    expect(withEntity(ctx, () => useEntity("X"))).toBe(ctx);
    expect(() => useEntity("X")).toThrow();
  });
});
