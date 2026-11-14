import { describe, it, expect } from "vitest";
import { useTabs, useSelection, useBinding } from "../src/hooks.ts";
import { radioToggleBody } from "../src/components/toggle.tsx";
import * as bind from "../src/bind.ts";
import { createSlots } from "../src/slots.ts";
import ffr from "./fixtures/ffr/ffr.json";

const opts = { group: "ffr_tabs", mode: "follow" as const, count: 2, firstIndex: 96 };

describe("useTabs", () => {
  it("tabName / paneBinding / toggleBody", () => {
    const t = useTabs(opts);
    expect(t.tabName(0)).toBe("ffr_t0");
    expect(t.paneBinding(1)).toEqual({
      binding_type: "view",
      binding_condition: "always",
      source_control_name: "ffr_t1",
      source_property_name: "#toggle_state",
      target_property_name: "#visible",
    });
    expect(t.toggleBody({ size: [96, 22] })).toEqual(
      radioToggleBody({ group: "ffr_tabs", size: [96, 22], forcedIndex: "$tab_index", defaultSelected: "$tab" }),
    );
  });
  it("lazyPane equals FFR", () => {
    const t = useTabs({ ...opts, mode: "lazy" });
    expect(t.lazyPane(1, "ffr.pane_c1")).toEqual((ffr as any).lazy_pane_1);
    expect(() => t.lazyPane(0, "ffr.pane_c0")).toThrow();
  });
  it("test_unknown_mode_throws", () => {
    expect(() => useTabs({ ...opts, mode: "x" as any })).toThrow();
  });
  it("test_hooks_are_pure", () => {
    const t = useTabs({ ...opts, mode: "lazy" });
    expect(t.lazyPane(1, "a.b")).toEqual(t.lazyPane(1, "a.b"));
    expect(t.paneBinding(1)).toEqual(t.paneBinding(1));
    expect(useTabs(opts).toggleBody({ size: [1, 2] })).toEqual(useTabs(opts).toggleBody({ size: [1, 2] }));
  });
});

describe("useSelection", () => {
  const s = useSelection({ group: "g", slots: createSlots().range("x", 3) });
  it("itemBody / lazyDetail", () => {
    expect(s.itemBody({ size: [18, 18], forcedIndex: "$k" })).toEqual(
      radioToggleBody({ group: "g", size: [18, 18], forcedIndex: "$k", defaultSelected: -1 }),
    );
    expect(s.lazyDetail("ffri.detail_0", "ffr_lazy_0")).toEqual({
      factory: { name: "ffr_lazy_0", control_name: "ffri.detail_0" },
    });
    expect(s.itemBody({ size: [1, 1], forcedIndex: 0 })).toEqual(s.itemBody({ size: [1, 1], forcedIndex: 0 }));
  });
});

describe("useBinding", () => {
  it("wraps bind.view", () => {
    expect(useBinding("(not #a)", "#visible")).toEqual(bind.view("(not #a)", "#visible"));
  });
  it("EXP-36", () => {
    expect(() => useBinding("(#a = 'x*y')", "#visible")).toThrow(/EXP-36/);
    expect(() => useBinding('(#a = "p@q")', "#visible")).toThrow(/EXP-36/);
    expect(() => useBinding("(#a * 2)", "#visible")).not.toThrow();
  });
});
