import { describe, it, expect } from "vitest";
import { createPack } from "../../src/pack.ts";
import { render } from "../../src/render.ts";
import { lintFiles } from "../../src/lint.ts";
import { createEntitySlots, withEntity, type EntityCtx } from "../../src/entity/context.ts";
import { placeEntityTree } from "../../src/entity/solver.ts";
import { QuickButton, SelectCells, PickGrid, EntityTabs, EntityPager, KeyedCell, anim } from "../../src/entity/interact.tsx";
import type { ControlNode, JsonObject, JuiElement } from "../../src/types.ts";

function mk(): EntityCtx {
  const pack = createPack();
  return { pack, ns: pack.ns("t"), id: "t", title: "x", slots: createEntitySlots(243), buttons: {}, diagnostics: [] };
}
const find = (n: ControlNode, name: string): ControlNode | undefined =>
  n.name === name ? n : n.children.map((c) => find(c, name)).find(Boolean);
const lowered = (ctx: EntityCtx, el: JuiElement) => withEntity(ctx, () => render(el))[0]!;

describe("interact", () => {
  it("keyed_empty_slot: #k 빈 목록과 키별 항목, 공유 정의 문자열", () => {
    const ctx = mk();
    const node = lowered(ctx, <KeyedCell name="c" slot="board" index={2} size={[30, 30]} variants={{ Na: <panel name="a" size={[1, 1]} />, Nb: "shared" }} />);
    expect(node.props.$$slot).toBe(3);
    const f = node.props.factory as any;
    expect(f.name).toBe("t_c");
    expect(f.control_ids).toEqual({ Na: "@t.c_Na", Nb: "@t.shared" });
    expect(node.props.property_bag).toEqual({ "#k": [], "#kNa": ["Na"], "#kNb": ["Nb"] });
    expect((node.props.bindings as any)[1].source_property_name).toBe("('#k' + (#hover_text - '§o' - '§f' - '§r'))");
    expect(ctx.pack.json("t.json").c_Na).toEqual({ type: "panel", size: [1, 1] });
  });

  it("tabs_first_default: 첫 탭 기본 켜짐, 판은 마지막 탭 토글로", () => {
    const ctx = mk();
    const node = lowered(ctx, <EntityTabs name="ers" slot="heads" tabs={[{ children: <panel name="x" /> }, { children: <panel name="y" /> }]} />);
    const t0 = find(node, "ers_t0")!, t1 = find(node, "ers_t1")!;
    expect(t0.props.toggle_default_state).toBe(true);
    expect(t1.props.toggle_default_state).toBe(false);
    expect(t0.props.toggle_group_forced_index).toBe(0);
    expect(t0.props.toggle_name).toBe("t_ers");
    const b0 = (find(node, "ers_p0")!.props.bindings as any)[0];
    const b1 = (find(node, "ers_p1")!.props.bindings as any)[0];
    expect(b0).toMatchObject({ source_control_name: "ers_t1", source_property_name: "(not #toggle_state)", target_property_name: "#visible" });
    expect(b1).toMatchObject({ source_control_name: "ers_t1", source_property_name: "#toggle_state" });
    expect(t0.props.$$slot).toBe(1);
  });

  it("tabs 3개: 첫 판은 다른 탭이 모두 꺼졌을 때", () => {
    const ctx = mk();
    const node = lowered(ctx, <EntityTabs name="e" slot="h" tabs={[{}, {}, {}]} />);
    const bs = find(node, "e_p0")!.props.bindings as any[];
    expect(bs.at(-1).source_property_name).toBe("(not (#s1 or #s2))");
    expect((find(node, "e_p2")!.props.bindings as any)[0].source_control_name).toBe("e_t2");
  });

  it("pick_separate_slot: 칸과 선택 버튼 칸이 다르다", () => {
    const ctx = mk();
    const node = lowered(ctx, <PickGrid name="pk" cells="cells" picks="picks" rows={2} cols={3} chosen="SELECTED" />);
    const m = ctx.slots.map();
    expect(m.cells).toHaveLength(6);
    expect(m.picks).toHaveLength(6);
    expect(m.cells.some((s) => m.picks.includes(s))).toBe(false);
    expect(ctx.buttons.pk).toEqual(m.picks);
    const look = find(node, "look")!;
    expect(look.props.$$slot).toBe(m.cells[0]);
    expect(find(node, "chosen")!.props.bindings).toContainEqual(expect.objectContaining({ source_property_name: "(not ((#hover_text - 'SELECTED') = #hover_text))" }));
    expect(() => lowered(mk(), <PickGrid name="p" cells="s" picks="s" rows={1} cols={1} chosen="C" />)).toThrow();
    const r = placeEntityTree([node]);
    expect(r.diagnostics.filter((d) => d.level === "error")).toEqual([]);
  });

  it("toggle_8_states: 라디오 칸과 탭 토글이 INP-10을 지킨다", () => {
    const ctx = mk();
    const sc = lowered(ctx, <SelectCells name="sc" slot="sel" count={3} detail={() => <label name="d" text="#hover_text" />} detailAt={[40, 0]} />);
    const tb = lowered(ctx, <EntityTabs name="tb" slot="heads" tabs={[{}, {}]} />);
    const toggles = [find(sc, "sc0")!, find(sc, "sc2")!, find(tb, "tb_t0")!];
    expect(toggles.map((t) => t.props.type)).toEqual(["toggle", "toggle", "toggle"]);
    expect(find(sc, "sc2")!.props.toggle_group_forced_index).toBe(2);
    const detail = find(find(sc, "sc2")!, "detail")!;
    expect(detail.props.offset).toEqual([40 - 36, 0]);
    const wrap = (n: ControlNode): JsonObject => ({ type: "panel", controls: [{ [n.name]: { ...n.props, controls: n.children.map((c) => ({ [c.name]: { ...c.props } })) } }] });
    const doc: JsonObject = { namespace: "z", a: wrap(sc.children[0]!), b: wrap(tb.children[0]!.children[0]!) };
    expect(lintFiles({ "ui/z.json": doc }).filter((d) => d.rule === "INP-10")).toEqual([]);
  });

  it("QuickButton: 칸 등록, 합치기, hideWhenEmpty, 면 none", () => {
    const ctx = mk();
    const a = lowered(ctx, <QuickButton name="dpad" slot="btn" index={1} size={[18, 18]} hideWhenEmpty />);
    lowered(ctx, <QuickButton name="dpad" slot="btn" index={0} size={[18, 18]} face="none" />);
    expect(ctx.buttons.dpad).toEqual([2, 1]);
    expect(a.name).toBe("dpad1");
    expect(a.props.$$slot).toBe(2);
    expect((a.props.bindings as any[]).map((b) => b.binding_type)).toEqual(["collection_details", "collection", "view"]);
    expect((a.props.bindings as any[])[2].source_property_name).toContain("(not ((#hover_text");
    const body = ctx.pack.json("t.json").ent_quick_button as any;
    expect(body.button_mappings[0].to_button_id).toBe("button.container_auto_place");
    expect(a.children.map((c) => c.name)).toEqual(["default", "hover", "pressed"]);
    const n = lowered(ctx, <QuickButton name="z" slot="zz" size={[1, 1]} face="none" />);
    expect(n.children.map((c) => c.name)).toEqual(["default"]);
    expect(n.props.hover_control).toBe("default");
  });

  it("EntityPager: 두 칸 버튼 등록", () => {
    const ctx = mk();
    lowered(ctx, <EntityPager name="pg" slot="pgs" />);
    expect(ctx.buttons.pg).toEqual(ctx.slots.map().pgs);
  });

  it("anim: 한 번만 정의하고 참조 반환", () => {
    const ctx = mk();
    withEntity(ctx, () => {
      expect(anim("pop", { anim_type: "size" })).toBe("@t.pop");
      expect(anim("pop", { anim_type: "size" })).toBe("@t.pop");
    });
    expect(ctx.pack.json("t.json").pop).toEqual({ anim_type: "size" });
  });
});
