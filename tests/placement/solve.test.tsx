import { describe, it, expect } from "vitest";
import { solvePlacement } from "../../src/placement/index.ts";
import type { ControlNode } from "../../src/types.ts";

const N = (name: string, props: Record<string, any>, children: ControlNode[] = []): ControlNode => ({ name, props, children });

describe("solvePlacement", () => {
  it("label in panel -> stack > index panel > label", () => {
    const input = [N("P", { type: "panel" }, [N("L", { type: "label", collection_index: 2, size: [10, 10], offset: [1, 1], layer: 3 })])];
    const snap = JSON.stringify(input);
    const r = solvePlacement(input, { collection: "container_items" });
    expect(JSON.stringify(input)).toBe(snap);
    const w = r.nodes[0]!.children[0]!;
    expect(w.props).toEqual({ type: "stack_panel", orientation: "vertical", collection_name: "container_items", size: [10, 10], offset: [1, 1], layer: 3 });
    const idx = w.children[0]!;
    expect(idx.props).toEqual({ type: "panel", collection_index: 2, size: [10, 10] });
    expect(idx.children[0]!.props).toEqual({ type: "label", size: [10, 10], layer: 3 });
    expect(r.diagnostics.map((d) => [d.rule, d.level])).toEqual([["COL-02", "info"], ["COL-50", "info"]]);
  });

  it("idempotent", () => {
    const input = [N("P", { type: "panel" }, [N("L", { type: "label", collection_index: 2 }), N("I", { type: "image", collection_index: 1 })])];
    const a = solvePlacement(input, { collection: "container_items" });
    const b = solvePlacement(a.nodes, { collection: "container_items" });
    expect(b.nodes).toEqual(a.nodes);
    expect(b.diagnostics).toEqual([]);
  });

  it("nested_inherit: already in matching stack is untouched", () => {
    const input = [N("S", { type: "stack_panel", collection_name: "container_items" }, [N("C", { type: "panel", collection_index: 0 })])];
    const r = solvePlacement(input);
    expect(r.nodes).toEqual(input);
    expect(r.diagnostics).toEqual([]);
  });

  it("label under matching stack gets only an index panel carrying offset", () => {
    const input = [N("S", { type: "stack_panel", collection_name: "c" }, [N("L", { type: "label", collection_index: 1, offset: [2, 0], size: [5, 5] })])];
    const r = solvePlacement(input);
    const w = r.nodes[0]!.children[0]!;
    expect(w.props).toEqual({ type: "panel", collection_index: 1, size: [5, 5], offset: [2, 0] });
    expect(w.children[0]!.props).toEqual({ type: "label", size: [5, 5] });
  });

  it("panel with index under panel is wrapped in a stack, keeping its index", () => {
    const r = solvePlacement([N("P", { type: "panel" }, [N("C", { type: "panel", collection_index: 3, size: [1, 1], layer: 4 })])], { collection: "x" });
    const w = r.nodes[0]!.children[0]!;
    expect(w.props).toMatchObject({ type: "stack_panel", collection_name: "x", size: [1, 1], layer: 4 });
    expect(w.children[0]!.props.collection_index).toBe(3);
    expect(r.diagnostics.map((d) => d.rule)).toEqual(["COL-50"]);
  });

  it("unknown collection: reports, strict false lowers to warn", () => {
    const input = [N("P", { type: "panel" }, [N("C", { type: "panel", collection_index: 3 })])];
    expect(solvePlacement(input).nodes).toEqual(input);
    expect(solvePlacement(input, { strict: false }).diagnostics[0]!.level).toBe("warn");
  });

  it("inherits nearest ancestor collection", () => {
    const input = [N("S", { type: "stack_panel", collection_name: "k" }, [N("P", { type: "panel" }, [N("C", { type: "panel", collection_index: 3 })])])];
    const w = solvePlacement(input).nodes[0]!.children[0]!.children[0]!;
    expect(w.props.collection_name).toBe("k");
  });

  it("top-level collection_index dropped; stack offset wrapped", () => {
    const r = solvePlacement([N("T", { type: "panel", collection_index: 1 })]);
    expect(r.nodes[0]!.props.collection_index).toBeUndefined();
    const s = solvePlacement([N("S", { type: "stack_panel" }, [N("I", { type: "image", offset: [2, 0], size: [4, 4] })])]);
    const w = s.nodes[0]!.children[0]!;
    expect(w.props).toEqual({ type: "panel", size: [4, 4] });
    expect(w.children[0]!.props.offset).toEqual([2, 0]);
    expect(s.diagnostics.map((d) => d.rule)).toEqual(["LAY-38"]);
  });
});
