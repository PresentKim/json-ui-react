import { describe, it, expect } from "vitest";
import { createPack } from "../../src/pack.ts";
import { render } from "../../src/render.ts";
import { createEntitySlots, withEntity, type EntityCtx } from "../../src/entity/context.ts";
import { placeEntityTree } from "../../src/entity/solver.ts";
import { At, SlotText, SlotIcon, SlotCount, SlotTexture, SlotBar, ShowWhen, Label, CLEAN } from "../../src/entity/data.tsx";
import type { JuiElement } from "../../src/types.ts";

const mk = (): EntityCtx => {
  const pack = createPack();
  return { pack, ns: pack.ns("t"), id: "t", title: "T", slots: createEntitySlots(), buttons: {}, diagnostics: [] };
};
const node = (ctx: EntityCtx, f: () => JuiElement) => withEntity(ctx, () => render(f())[0]!);

describe("entity data", () => {
  it("bar_float_literal: per=10 -> .1", () => {
    const n = node(mk(), () => <SlotBar name="b" slot="s" size={[10, 2]} per={10} />);
    const b = n.props.bindings as any[];
    expect(b[1].source_property_name).toBe(`(1 - (${CLEAN} * .1))`);
    expect(b[1].target_property_name).toBe("#clip_ratio");
    expect(n.props.clip_direction).toBe("left");
    expect(n.props.clip_pixelperfect).toBe(false);
    expect(n.props.$$slot).toBe(1);
  });
  it("durability bar", () => {
    const n = node(mk(), () => <SlotBar name="b" slot="d" source="durability" per={250} size={[10, 2]} />);
    expect((n.props.bindings as any[])[1].source_property_name).toBe("(1 - (#item_durability_current_amount * .004))");
  });
  it("showwhen_quote: ' in value throws", () => {
    expect(() => node(mk(), () => <ShowWhen name="w" slot="s" when={{ contains: "a'b" }} />)).toThrow();
  });
  it("showwhen conditions", () => {
    const x = (when: any) => (node(mk(), () => <ShowWhen name="w" slot="s" when={when} />).props.bindings as any[])[1];
    expect(x({ contains: "X" }).source_property_name).toBe("(not ((#hover_text - 'X') = #hover_text))");
    expect(x({ lacks: "X" }).source_property_name).toBe("((#hover_text - 'X') = #hover_text)");
    expect(x("filled").source_property_name).toBe("(not (#hover_text = ''))");
    expect(x("empty").source_property_name).toBe("(#hover_text = '')");
    expect(x("empty").target_property_name).toBe("#visible");
  });
  it("text: CLEAN vs raw, marked", () => {
    const ctx = mk();
    const t = node(ctx, () => <SlotText name="t" slot="score" />);
    expect(t.props.text).toBe("#text");
    expect((t.props.bindings as any[])[1].source_property_name).toBe(CLEAN);
    const r = node(ctx, () => <SlotText name="t2" slot="score" raw />);
    expect((r.props.bindings as any[])[1].source_property_name).toBe("#hover_text");
    expect(ctx.slots.map()).toEqual({ score: [1] });
  });
  it("multi-slot claim index; out of range throws", () => {
    const ctx = mk();
    ctx.slots.claim("row", 3);
    expect(node(ctx, () => <SlotText name="t" slot="row" index={2} />).props.$$slot).toBe(3);
    expect(() => node(ctx, () => <SlotText name="t" slot="row" index={3} />)).toThrow();
  });
  it("icon, count, texture", () => {
    const ctx = mk();
    const i = node(ctx, () => <SlotIcon name="i" slot="a" />);
    expect(i.props).toMatchObject({ type: "custom", renderer: "inventory_item_renderer", size: [16, 16], layer: 2, property_bag: { "#item_id_aux": 0 } });
    const c = node(ctx, () => <SlotCount name="c" slot="a" />);
    expect((c.props.bindings as any[])[0]).toMatchObject({ binding_name: "#inventory_stack_count", binding_name_override: "#text" });
    const t = node(ctx, () => <SlotTexture name="x" slot="a" prefix="textures/blocks/wool_colored_" size={[8, 8]} />);
    expect((t.props.bindings as any[])[1].source_property_name).toBe(`('textures/blocks/wool_colored_' + ${CLEAN})`);
  });
  it("At and Label; placeEntityTree wraps readers", () => {
    const ctx = mk();
    const [n] = withEntity(ctx, () => render(
      <At name="at" x={3} y={4} w={20} h={10}>
        <Label name="l" text="Hi" />
        <SlotText name="t" slot="s" />
      </At>,
    ));
    expect(n!.props.offset).toEqual([3, 4]);
    const r = placeEntityTree([n!]);
    const kids = r.nodes[0]!.children;
    expect(kids[0]!.props.text).toBe("Hi");
    expect(kids[1]!.props.collection_name).toBe("container_items");
    expect(kids[1]!.children[0]!.props.collection_index).toBe(1);
  });
  it("Label and SlotText take anchor and offset through the same textProps path", () => {
    const ctx = mk();
    const n = node(ctx, () => <Label name="l" text="Hi" scale={0.8} anchor="bottom_right" offset={[3, 4]} />);
    expect(n.props).toMatchObject({ font_scale_factor: 0.8, anchor_from: "bottom_right", anchor_to: "bottom_right", offset: [3, 4] });
    expect(n.props).not.toHaveProperty("text_scale");
    const st = node(mk(), () => <SlotText name="t" slot="s" anchor="center" offset={[1, 2]} />);
    expect(st.props).toMatchObject({ anchor_from: "center", anchor_to: "center", offset: [1, 2] });
    const plain = node(mk(), () => <Label name="l" text="Hi" />);
    expect(plain.props).not.toHaveProperty("anchor_from");
    expect(plain.props).not.toHaveProperty("offset");
  });
  it("Label scale is emitted as font_scale_factor, never text_scale", () => {
    const ctx = mk();
    const n = node(ctx, () => <Label name="l" text="Hi" scale={0.8} />);
    expect(n.props.font_scale_factor).toBe(0.8);
    expect(n.props).not.toHaveProperty("text_scale");
  });
});
