import { describe, it, expect } from "vitest";
import { placeEntityTree, readsSlot } from "../../src/entity/solver.ts";
import type { ControlNode } from "../../src/types.ts";
import { buildEntityScreens } from "../../src/entity/build.tsx";
import { matchmaking } from "../../example-entity/screens/matchmaking.tsx";
import { research } from "../../example-entity/screens/research.tsx";
import { e2048 } from "../../example-entity/screens/e2048.tsx";
import menuLab from "../../example-entity/screens/menu-lab.tsx";

const n = (name: string, props: ControlNode["props"], children: ControlNode[] = []): ControlNode => ({ name, props, children });
const panel = (children: ControlNode[]) => n("p", { type: "panel" }, children);

describe("solver", () => {
  it("solver_label_index_wrapped", () => {
    const label = readsSlot(n("t", { type: "label", size: [10, 10], offset: [1, 2], layer: 3 }), 5);
    const r = placeEntityTree([panel([label])]);
    const w = r.nodes[0]!.children[0]!;
    expect(w.props).toEqual({ type: "stack_panel", orientation: "vertical", collection_name: "container_items", size: [10, 10], offset: [1, 2], layer: 3 });
    const idx = w.children[0]!;
    expect(idx.props).toEqual({ type: "panel", collection_index: 5, size: [10, 10] });
    const lab = idx.children[0]!;
    expect(lab.props.collection_index).toBeUndefined(); // label에는 인덱스를 두지 않는다(COL-02)
    expect(lab.props.$$slot).toBeUndefined();
    expect(r.diagnostics.map((d) => [d.rule, d.level])).toEqual([["ENT-LABEL", "info"]]);
    expect(label.props.$$slot).toBe(5); // 입력 불변
  });
  it("solver_label_under_container_stack", () => {
    const stack = n("s", { type: "stack_panel", orientation: "vertical", collection_name: "container_items" }, [
      readsSlot(n("a", { type: "image" }), 1),
      readsSlot(n("t", { type: "label", size: [10, 10], offset: [1, 2] }), 2),
    ]);
    const r = placeEntityTree([stack]);
    const w = r.nodes[0]!.children[1]!;
    expect(w.props).toEqual({ type: "panel", collection_index: 2, size: [10, 10], offset: [1, 2] });
    expect(w.children[0]!.props.collection_index).toBeUndefined();
    expect(JSON.stringify(r.nodes)).not.toMatch(/"type":"label"[^}]*collection_index/);
  });
  it("non-label under panel gets COL-50", () => {
    const r = placeEntityTree([panel([readsSlot(n("i", { type: "image" }), 2)])]);
    expect(r.diagnostics[0]!.rule).toBe("COL-50");
    const w = r.nodes[0]!.children[0]!;
    expect(w.props.collection_name).toBe("container_items");
    // stack > 인덱스 패널 > image (image에는 collection_index 없음)
    expect(w.children[0]!.props.collection_index).toBe(2);
    expect(w.children[0]!.children[0]!.props.collection_index).toBeUndefined();
  });
  it("stack of readers gets collection_name in place", () => {
    const r = placeEntityTree([n("row", { type: "stack_panel", orientation: "horizontal" }, [readsSlot(n("a", { type: "image" }), 1), readsSlot(n("b", { type: "image" }), 2)])]);
    expect(r.diagnostics).toEqual([]);
    expect(r.nodes[0]!.props.collection_name).toBe("container_items");
    // image는 collection_index를 직접 갖지 못하므로(COL-02) 인덱스 패널 > image로 감싼다
    expect(r.nodes[0]!.children.map((c) => c.props.collection_index)).toEqual([1, 2]);
    expect(r.nodes[0]!.children.every((c) => c.props.type === "panel" && c.children[0]!.props.collection_index === undefined)).toBe(true);
  });
  it("solver_nested_inherit", () => {
    const inner = readsSlot(n("x", { type: "label" }), 5);
    const w = n("w", { type: "stack_panel", collection_name: "container_items", collection_index: 5 }, [inner]);
    const r = placeEntityTree([panel([w])]);
    expect(r.diagnostics).toEqual([]);
    expect(r.nodes[0]!.children[0]!.children[0]).toEqual({ name: "x", props: { type: "label" }, children: [] });
  });
  it("solver_constant_clip", () => {
    const bad1 = n("b1", { type: "image", clip_direction: "left", property_bag: { "#clip_ratio": 0.5 } });
    const bad2 = n("b2", { type: "image", clip_direction: "left", bindings: [{ binding_type: "view", source_property_name: "(1 - (3 * .1))", target_property_name: "#clip_ratio" }] });
    const ok = n("ok", { type: "image", clip_direction: "left", bindings: [
      { binding_type: "collection", binding_collection_name: "container_items", binding_name: "#hover_text", binding_name_override: "#hover_text" },
      { binding_type: "view", source_property_name: "(1 - (#hover_text * .1))", target_property_name: "#clip_ratio" },
    ] });
    const r = placeEntityTree([bad1, bad2, ok]);
    expect(r.diagnostics.map((d) => [d.rule, d.level, d.path])).toEqual([["ENT-CLIP", "error", "/b1"], ["ENT-CLIP", "error", "/b2"]]);
    expect(placeEntityTree([bad1], { strict: false }).diagnostics[0]!.level).toBe("warn");
  });
  it("solver_layer_clamp", () => {
    const item = n("it", { type: "custom", renderer: "inventory_item_renderer" });
    const r = placeEntityTree([n("top", { type: "panel", layer: 100 }, [n("mid", { type: "panel", layer: 20 }, [item])]), n("other", { type: "panel", layer: 100 })]);
    expect(r.nodes[0]!.props.layer).toBe(1);
    expect(r.nodes[0]!.children[0]!.props.layer).toBe(20);
    expect(r.nodes[1]!.props.layer).toBe(100);
    expect(r.diagnostics.map((d) => [d.rule, d.level])).toEqual([["ANI-38", "info"]]);
  });
  it("ENT-SIZE and EXP-27", () => {
    const r = placeEntityTree([n("s", { type: "image", size: [160, "$h"], bindings: [{ binding_type: "view", source_property_name: "(x * 0.1) + '0.1' + 10.5", target_property_name: "#t" }] })]);
    expect(r.diagnostics.map((d) => d.rule)).toEqual(["ENT-SIZE", "EXP-27"]);
    expect((r.nodes[0]!.props.bindings as any)[0].source_property_name).toBe("(x * .1) + '0.1' + 10.5");
    expect(placeEntityTree([n("s", { size: ["$w", 1] })], { strict: false }).diagnostics[0]!.level).toBe("warn");
  });
  it("solver_examples_no_col02", () => {
    const builds = [
      buildEntityScreens([matchmaking], { namespace: "emm_box" }),
      buildEntityScreens([research], { namespace: "ers" }),
      buildEntityScreens([e2048], { namespace: "e2048" }),
      buildEntityScreens([menuLab], { namespace: "eml", strict: false }),
    ];
    for (const b of builds) expect(b.diagnostics.filter((d) => d.rule === "COL-02")).toEqual([]);
  });
});
