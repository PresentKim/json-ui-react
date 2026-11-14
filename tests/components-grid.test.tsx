import { describe, it, expect } from "vitest";
import { render, toBody } from "../src/render.ts";
import { SlotGrid, VirtualList } from "../src/components/grid.tsx";

const cell = (pos: number) => <use name={`i${pos}`} def="ffr.item_toggle" collection_index={pos} />;

function body(el: any) {
  const nodes = render(el);
  return { node: nodes[0], body: toBody(nodes[0]) };
}

describe("grid", () => {
  it("test_slot_grid_cell_count", () => {
    const { node } = body(
      <SlotGrid name="grid0" size={[144, 108]} rows={6} cols={8} rowHeight={18} rowWidth={144} cell={cell} />,
    );
    expect(node.children).toHaveLength(6);
    const cells = node.children.flatMap((r) => r.children);
    expect(cells).toHaveLength(48);
    expect(cells.map((c) => c.props.collection_index)).toEqual(Array.from({ length: 48 }, (_, i) => i));
    expect(node.children[1].children[0].name).toBe("i8");
  });
  it("행 구조 (COL-50)", () => {
    const { node } = body(
      <SlotGrid name="grid0" size={[144, 108]} rows={2} cols={2} rowHeight={18} rowWidth={144} cell={cell} />,
    );
    expect(node.children[0].name).toBe("r0");
    expect(node.children[0].props).toEqual({
      type: "stack_panel", orientation: "horizontal", size: [144, 18], collection_name: "form_buttons",
    });
  });
  it("test_grid_props_order", () => {
    const { body: b } = body(
      <SlotGrid
        name="grid0" size={[144, 108]} rows={1} cols={1} rowHeight={18} rowWidth={144} cell={cell}
        props={{ anchor_from: "top_left", anchor_to: "top_left" }}
        bindings={[{ binding_type: "view" }]}
      />,
    );
    expect(Object.keys(b)).toEqual(["type", "orientation", "size", "anchor_from", "anchor_to", "bindings", "controls"]);
    expect(b.type).toBe("stack_panel");
    expect(b.orientation).toBe("vertical");
  });
  it("props 없으면 bindings 키 없음", () => {
    const { body: b } = body(
      <SlotGrid name="g" size={[1, 1]} rows={1} cols={1} rowHeight={1} rowWidth={1} cell={cell} />,
    );
    expect(Object.keys(b)).toEqual(["type", "orientation", "size", "controls"]);
  });
  it("rows 0은 오류", () => {
    expect(() => render(<SlotGrid name="g" size={[1, 1]} rows={0} cols={1} rowHeight={1} rowWidth={1} cell={cell} />)).toThrow();
  });
  it("VirtualList 기본", () => {
    const { body: b } = body(
      <VirtualList name="list" columns={2} cellSize={[80, 30]} cellDef="ffr.cell" maxItems={100} />,
    );
    expect(b.type).toBe("grid");
    expect(b.grid_item_template).toBe("ffr.cell");
    expect(b.collection_name).toBe("form_buttons");
    expect(b.size).toEqual([160, "100%c"]);
    expect(JSON.stringify(b.bindings)).toContain("#maximum_grid_items");
  });
  it("test_virtual_list_over_2000_throws_unless_allowed", () => {
    const mk = (extra: object = {}) =>
      render(<VirtualList name="l" columns={2} cellSize={[80, 30]} cellDef="x.y" maxItems={2001} {...extra} />);
    expect(() => mk()).toThrow(/COL-49/);
    expect(() => mk({ allowLarge: true })).not.toThrow();
    expect(() => render(<VirtualList name="l" columns={2} cellSize={[80, 30]} cellDef="x.y" maxItems={2000} />)).not.toThrow();
  });
});
