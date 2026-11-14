import { describe, it, expect } from "vitest";
import { lintFiles, countControls } from "../src/lint.ts";
import type { JsonObject } from "../src/types.ts";

const f = (o: JsonObject): Record<string, JsonObject> => ({ "ui/a.json": o });

const states = {
  checked_control: "on",
  checked_hover_control: "on",
  checked_locked_control: "on",
  checked_locked_hover_control: "on",
  unchecked_control: "off",
  unchecked_hover_control: "off",
  unchecked_locked_control: "off",
  unchecked_locked_hover_control: "off",
};

describe("lint", () => {
  it("test_exp36_quoted_operator", () => {
    const d = lintFiles(f({ namespace: "a", t: { type: "panel", bindings: [{ binding_type: "view", source_property_name: "('a*b' + #x)", target_property_name: "#y" }] } }));
    expect(d.map((x) => [x.rule, x.level, x.path])).toEqual([["EXP-36", "error", "a.t"]]);
    const ok = lintFiles(f({ namespace: "a", t: { type: "panel", bindings: [{ source_property_name: "('#' + ('%.6s' * #t))" }] } }));
    expect(ok).toEqual([]);
    const at = lintFiles(f({ namespace: "a", t: { type: "panel", bindings: [{ source_property_name: "('x@y' = #t)" }] } }));
    expect(at.map((x) => x.rule)).toEqual(["EXP-36"]);
  });

  it("test_col02_label_collection_index", () => {
    const d = lintFiles(f({ namespace: "a", t: { type: "label", text: "x", collection_index: 1 } }));
    expect(d).toEqual([{ rule: "COL-02", level: "warn", path: "a.t", message: expect.any(String) }]);
  });

  it("test_col50_panel_parent", () => {
    const d = lintFiles(f({ namespace: "a", p: { type: "panel", controls: [{ "c@x.y": { collection_index: 3 } }] } }));
    expect(d.map((x) => [x.rule, x.level, x.path])).toEqual([["COL-50", "warn", "a.p/c"]]);
    const ok = lintFiles(f({ namespace: "a", p: { type: "stack_panel", collection_name: "form_buttons", controls: [{ "c@x.y": { collection_index: 3 } }] } }));
    expect(ok).toEqual([]);
  });

  it("test_inp10_toggle_states", () => {
    const { unchecked_hover_control: _, ...missing } = states;
    const d = lintFiles(f({ namespace: "a", t: { type: "toggle", ...missing } }));
    expect(d.map((x) => [x.rule, x.level, x.path])).toEqual([["INP-10", "error", "a.t"]]);
    expect(lintFiles(f({ namespace: "a", t: { type: "toggle", ...states } }))).toEqual([]);
  });

  it("test_col47_routed_without_always", () => {
    const files = {
      "ui/a.json": {
        namespace: "a",
        root: { type: "panel", factory: { name: "n", control_ids: { x: "@a.win" } } },
        win: { type: "panel", controls: [{ "c@a.cell": {} }] },
        cell: { type: "panel", bindings: [{ binding_type: "collection_details", binding_collection_name: "form_buttons" }] },
        other: { type: "panel", bindings: [{ binding_type: "collection" }] },
      },
    } as Record<string, JsonObject>;
    const d = lintFiles(files, { routedRoots: ["a.root"] });
    expect(d.map((x) => [x.rule, x.level, x.path])).toEqual([["COL-47", "warn", "a.cell"]]);
    expect(lintFiles(files)).toEqual([]);
    const fixed = structuredClone(files);
    (fixed["ui/a.json"]!.cell as JsonObject).bindings = [{ binding_type: "collection_details", binding_condition: "always" }];
    expect(lintFiles(fixed, { routedRoots: ["a.root"] })).toEqual([]);
  });

  it("test_col49_max_grid_items", () => {
    const d = lintFiles(f({ namespace: "a", g: { type: "grid", maximum_grid_items: 2001 } }));
    expect(d.map((x) => [x.rule, x.level, x.path])).toEqual([["COL-49", "warn", "a.g"]]);
    expect(lintFiles(f({ namespace: "a", g: { type: "grid", maximum_grid_items: 2000 } }))).toEqual([]);
    expect(lintFiles(f({ namespace: "a", g: { type: "grid", maximum_grid_items: 5000, bindings: [{ binding_type: "view", source_property_name: "#n", target_property_name: "#maximum_grid_items" }] } }))).toEqual([]);
  });

  it("test_dollar_refs_not_followed", () => {
    const files = f({ namespace: "a", r: { type: "panel", controls: [{ "x@$var": {} }, { "y@$ns.$d": {} }] } });
    expect(lintFiles(files, { routedRoots: ["a.r"] })).toEqual([]);
  });

  it("test_cycle_safe", () => {
    const files = f({
      namespace: "a",
      p: { type: "panel", controls: [{ "c@a.q": {} }] },
      q: { type: "panel", controls: [{ "c@a.p": {} }], bindings: [{ binding_type: "collection" }] },
    });
    const d = lintFiles(files, { routedRoots: ["a.p"] });
    expect(d.map((x) => [x.rule, x.path])).toEqual([["COL-47", "a.q"]]);
  });

  it("test_count_controls", () => {
    expect(countControls({ "ui/a.json": { namespace: "a", p: { type: "panel", controls: [{ c: {} }] } } })).toEqual({ "ui/a.json": 2 });
  });
});
