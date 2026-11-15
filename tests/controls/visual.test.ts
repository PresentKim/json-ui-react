import { describe, it, expect } from "vitest";
import {
  ANCHORS, CONTROL_TYPES, RENDERERS, FONT_TYPES, FONT_SIZES, TEXT_ALIGNMENTS, ORIENTATIONS,
  type PanelProps, type LabelProps, type ImageProps, type StackPanelProps, type GridProps,
  type FactoryProps, type CustomProps, type CommonProps, type Anchor, type Renderer,
} from "../../src/controls/visual.ts";
import type { Size, Color } from "../../src/controls/common.ts";

describe("visual 상수 표", () => {
  it("test_tables_complete", () => {
    expect(ANCHORS).toHaveLength(9);
    expect(CONTROL_TYPES).toHaveLength(25);
    expect(RENDERERS).toHaveLength(43);
    expect(new Set(RENDERERS).size).toBe(RENDERERS.length);
    expect(FONT_TYPES).toContain("MinecraftTen");
    expect(FONT_SIZES).toContain("extra_large");
    expect(TEXT_ALIGNMENTS).toEqual(["center", "left", "right"]);
    expect(ORIENTATIONS).toEqual(["horizontal", "vertical"]);
  });
});

describe("visual 타입 (tsc 로 검사)", () => {
  it("test_type_cases_compile", () => {
    const ok: unknown[] = [];
    const sizes: Size[] = [["100%", "100%c"], ["100% - 8px", 20], ["$w", "fill"], "$size", ["50%sm", "default"]];
    // @ts-expect-error 알 수 없는 크기 문자열
    const bad1: Size = ["abc", 1];
    const colors: Color[] = [[1, 1, 1], [1, 1, 1, 0.5], "$c"];
    const st: StackPanelProps = { orientation: "vertical", collection_name: "container_items", size: ["100%", "100%c"] };
    const gr: GridProps = { grid_dimensions: [3, 3], grid_rescaling_type: "horizontal", maximum_grid_items: 9, collection_name: "x" };
    const im: ImageProps = { texture: "textures/a", nineslice_size: [1, 2, 3, 4], clip_direction: "left", $tex: "a" };
    const lb: LabelProps = { text: "#t", font_type: "smooth", text_alignment: "left", localize: false };
    const c: CommonProps = { ignored: "(not #x)", property_bag: { "#a": 1 }, anims: ["@a.b"], variables: [{ requires: "$a", $b: 1 }] };
    const fa: FactoryProps = { factory: { name: "chat_item_factory", control_name: "ns.item", max_children_size: 5 } };
    const cu: CustomProps = { renderer: "paper_doll_renderer" };
    const p: PanelProps = { collection_index: 1 };
    // @ts-expect-error COL-02: label 에는 collection_index 불가
    const b2: LabelProps = { text: "#t", collection_index: 1 };
    // @ts-expect-error COL-02: image 에는 collection_index 불가
    const b3: ImageProps = { collection_index: 1 };
    // @ts-expect-error COL-01: panel 에는 collection_name 불가
    const b4: PanelProps = { collection_name: "x" };
    // @ts-expect-error COL-01: label 에는 collection_name 불가
    const b5: LabelProps = { collection_name: "x" };
    // @ts-expect-error B.1: clip_offset 은 바닐라에 없다
    const b6: PanelProps = { clip_offset: [0, 0] };
    // @ts-expect-error B.1: z_order 는 바닐라에 없다
    const b7: PanelProps = { z_order: 1 };
    // @ts-expect-error 잘못된 앵커
    const b8: PanelProps = { anchor_from: "middle" };
    // @ts-expect-error 잘못된 렌더러
    const b9: CustomProps = { renderer: "foo_renderer" };
    const a: Anchor = "center";
    const r: Renderer = "hud_player_renderer";
    ok.push(sizes, bad1, colors, st, gr, im, lb, c, fa, cu, p, b2, b3, b4, b5, b6, b7, b8, b9, a, r);
    expect(ok).toHaveLength(21);
  });

  it("vanilla-valid props are accepted: use_child_anchors", () => {
    const sp: StackPanelProps = { size: ["100% - 4px", "100%c + 2px"], use_child_anchors: true };
    expect(sp.use_child_anchors).toBe(true);
  });
});
