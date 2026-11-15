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

  describe("slot marker 옵션", () => {
    const o = { collection: "container_items", slotMarker: "$$slot", wrapAnyParent: true };

    it("marker_stripped: panel > image{$$slot} -> panel > stack > index panel > image", () => {
      const input = [N("P", { type: "panel" }, [N("I", { type: "image", $$slot: 3, size: [4, 4], offset: [1, 1] })])];
      const snap = JSON.stringify(input);
      const r = solvePlacement(input, o);
      expect(JSON.stringify(input)).toBe(snap);
      const w = r.nodes[0]!.children[0]!;
      expect(w.name).toBe("I_slot");
      expect(w.props).toEqual({ type: "stack_panel", orientation: "vertical", collection_name: "container_items", size: [4, 4], offset: [1, 1] });
      const idx = w.children[0]!;
      expect(idx.name).toBe("I_idx");
      expect(idx.props).toEqual({ type: "panel", collection_index: 3, size: [4, 4] });
      expect(JSON.stringify(r.nodes)).not.toContain("$$slot");
    });

    it("non-label reader gets index on the inner node (key order kept)", () => {
      const r = solvePlacement([N("P", { type: "panel" }, [N("C", { type: "custom", $$slot: 2, size: [1, 1] })])], o);
      const w = r.nodes[0]!.children[0]!;
      expect(w.props).toEqual({ type: "stack_panel", orientation: "vertical", collection_name: "container_items", size: [1, 1] });
      expect(Object.keys(w.children[0]!.props)).toEqual(["type", "size", "collection_index"]);
    });

    it("wrapAnyParent wraps under a non-panel parent and at the root; default does not", () => {
      const under = [N("S", { type: "stack_panel" }, [N("C", { type: "custom", $$slot: 1 })])];
      expect(solvePlacement(under, o).nodes[0]!.children[0]!.name).toBe("C_slot");
      expect(solvePlacement([N("C", { type: "custom", $$slot: 1 })], o).nodes[0]!.name).toBe("C_slot");
      const d = solvePlacement(under, { collection: "container_items", slotMarker: "$$slot" });
      expect(d.nodes[0]!.children[0]!.name).toBe("C");
    });

    it("wrapAnyParent: collection_index를 직접 가진 비독자 노드는 감싸지 않는다", () => {
      const input = [N("P", { type: "panel" }, [N("W", { type: "stack_panel", collection_name: "container_items", collection_index: 5 })])];
      const r = solvePlacement(input, o);
      expect(r.nodes[0]!.children[0]!.name).toBe("W");
      expect(r.diagnostics).toEqual([]);
    });

    it("offsetBox:false는 LAY-38 상자 감싸기를 건너뛴다", () => {
      const input = [N("S", { type: "stack_panel" }, [N("A", { type: "panel", size: [4, 4], offset: [1, 1] })])];
      expect(solvePlacement(input).nodes[0]!.children[0]!.name).toBe("A_box");
      expect(solvePlacement(input, { offsetBox: false }).nodes[0]!.children[0]!.name).toBe("A");
    });

    it("reader under a matching stack: label gets index panel only; custom gets the index", () => {
      const input = [N("S", { type: "stack_panel", collection_name: "container_items" }, [
        N("L", { type: "label", $$slot: 1, offset: [2, 0] }), N("C", { type: "custom", $$slot: 2 })])];
      const r = solvePlacement(input, o);
      expect(r.nodes[0]!.children[0]!.props).toEqual({ type: "panel", collection_index: 1, offset: [2, 0] });
      expect(r.nodes[0]!.children[1]!.props).toEqual({ type: "custom", collection_index: 2 });
    });

    it("parent index inheritance: same slot under an indexed wrapper is untouched", () => {
      const input = [N("P", { type: "panel" }, [N("A", { type: "custom", $$slot: 4 }, [N("B", { type: "label", $$slot: 4 })])])];
      const r = solvePlacement(input, o);
      const a = r.nodes[0]!.children[0]!.children[0]!;
      const b = a.children[0]!;
      expect(a.props).toEqual({ type: "custom", collection_index: 4 });
      expect(b.props).toEqual({ type: "label" });
    });

    it("inPlace: stack of readers gets collection_name instead of a wrapper", () => {
      const input = [N("S", { type: "stack_panel" }, [N("A", { type: "custom", $$slot: 0 }), N("B", { type: "custom", $$slot: 1 })])];
      const r = solvePlacement(input, { ...o, inPlace: true });
      expect(r.nodes[0]!.props).toEqual({ type: "stack_panel", collection_name: "container_items" });
      expect(r.nodes[0]!.children.map((c) => c.props)).toEqual([{ type: "custom", collection_index: 0 }, { type: "custom", collection_index: 1 }]);
    });

    it("idempotent with options", () => {
      const input = [N("P", { type: "panel" }, [N("I", { type: "image", $$slot: 3 }), N("L", { type: "label", $$slot: 5, size: [2, 2] })])];
      const a = solvePlacement(input, o);
      const b = solvePlacement(a.nodes, o);
      expect(b.nodes).toEqual(a.nodes);
      expect(b.diagnostics).toEqual([]);
    });
  });
});
