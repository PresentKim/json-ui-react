import { describe, it, expect } from "vitest";
import { CAPABILITIES } from "../../src/placement/capabilities.ts";
import { explainPlacement } from "../../src/placement/explain.ts";
import { CONTROL_TYPES } from "../../src/controls/visual.ts";

describe("capabilities", () => {
  it("capabilities_all_types", () => {
    for (const t of CONTROL_TYPES) expect(CAPABILITIES[t]).toBeDefined();
    expect(CAPABILITIES.stack_panel.childrenPositioned).toBe("stack");
    expect(CAPABILITIES.image.collectionIndex).toBe(false);
    expect(CAPABILITIES.image.why.collectionIndex).toContain("COL-02");
  });
});

describe("explainPlacement", () => {
  it("label in panel -> COL-02 + COL-50", () => {
    const r = explainPlacement({ parent: { type: "panel" }, child: { type: "label", props: { collection_index: 3 } } });
    expect(r.ok).toBe(false);
    expect(r.problems.map((p) => [p.rule, p.fix])).toEqual([["COL-02", "wrap-panel"], ["COL-50", "wrap-stack"]]);
  });
  it("explain_image_index", () => {
    const r = explainPlacement({ parent: { type: "stack_panel", collection_name: "c" }, child: { type: "image", props: { collection_index: 1 } } });
    expect(r.problems[0]).toMatchObject({ rule: "COL-02", level: "error", fix: "move-index" });
  });
  it("clean stack slot", () => {
    expect(explainPlacement({ parent: { type: "stack_panel", collection_name: "container_items" }, child: { type: "panel", props: { collection_index: 3 } } })).toEqual({ ok: true, problems: [] });
  });
  it("offset in stack -> LAY-38", () => {
    const r = explainPlacement({ parent: { type: "stack_panel" }, child: { type: "image", props: { offset: [2, 0] } } });
    expect(r.problems).toMatchObject([{ rule: "LAY-38", level: "warn", fix: "wrap-panel" }]);
  });
  it("zero offset and plain panel are clean", () => {
    expect(explainPlacement({ parent: { type: "stack_panel" }, child: { type: "image", props: { offset: [0, 0] } } }).ok).toBe(true);
    expect(explainPlacement({ parent: { type: "panel" }, child: { type: "image", props: { offset: [2, 0] } } }).ok).toBe(true);
  });
});
