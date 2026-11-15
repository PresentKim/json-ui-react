import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { Label, Panel } from "../../src/controls/components.tsx";
import { render } from "../../src/render.ts";
import { E } from "../../src/expr.ts";
import { runChecks } from "../../src/check/engine.ts";
import { ALL_CHECKS } from "../../src/check/index.ts";
import type { ControlNode, JsonObject, JuiNode } from "../../src/types.ts";
import { collectKit, kitFile } from "../../src/kit/core.tsx";
import { BindText, Case, Item, ItemText, KeyedFactory, Repeat, ShowIf, Switch } from "../../src/kit/data.tsx";

const nodes = (n: JuiNode, strict = false) => collectKit(() => render(n), { strict });
const errors = (def: JuiNode) => {
  const { result, diagnostics } = collectKit(() => kitFile("t", { d: def }));
  const r = runChecks({ "ui/t.json": result as JsonObject }, ALL_CHECKS);
  return [...diagnostics, ...r.diagnostics].filter((d) => d.level === "error");
};
const walk = (n: ControlNode, f: (n: ControlNode) => void) => { f(n); n.children.forEach((c) => walk(c, f)); };

describe("kit data", () => {
  it("source_only_pascal", () => {
    const src = readFileSync("src/kit/data.tsx", "utf8");
    expect(src).not.toMatch(/<[a-z_]+ [a-z_]+=/);
    expect(src).not.toMatch(/binding_type\s*:/);
  });

  it("repeat_index_on_wrapper", () => {
    const { result, diagnostics } = nodes(
      <Repeat name="list" collection="form_buttons" layout="stack-v" count={2} item={(i) => <ItemText name={`t${i}`} prop="#form_button_text" />} />,
    );
    const root = result[0]!;
    expect(root.props.type).toBe("stack_panel");
    expect(root.props.collection_name).toBe("form_buttons");
    expect(root.children).toHaveLength(2);
    root.children.forEach((c, i) => {
      expect(c.props.type).toBe("panel");
      expect(c.props.collection_index).toBe(i);
      expect(c.children[0]!.props.type).toBe("label");
      expect(c.children[0]!.props.collection_index).toBeUndefined();
    });
    walk(root, (n) => { if (n.props.type === "label") expect(n.props.collection_index).toBeUndefined(); });
    expect(diagnostics.filter((d) => d.level === "error")).toEqual([]);
    const b = (root.children[0]!.children[0]!.props.bindings as JsonObject[])[0]!;
    expect(b.binding_collection_name).toBe("form_buttons");
  });

  it("repeat_grid_rows", () => {
    const { result } = nodes(<Repeat name="g" collection="form_buttons" layout="grid" cols={2} count={3} item={(i) => <ItemText name={`t${i}`} prop="#form_button_text" />} />);
    const root = result[0]!;
    expect(root.props.collection_name).toBeUndefined();
    expect(root.children.map((r) => [r.props.collection_name, r.children.length])).toEqual([["form_buttons", 2], ["form_buttons", 1]]);
    expect(root.children[1]!.children[0]!.props.collection_index).toBe(2);
  });

  it("itemtext_outside_collection", () => {
    const { result, diagnostics } = nodes(<ItemText name="t" prop="#form_button_text" />);
    expect(result).toEqual([]);
    expect(diagnostics.map((d) => [d.rule, d.level])).toEqual([["COL-44", "error"]]);
    expect(() => nodes(<ItemText name="t" prop="#x" />, true)).toThrow(/COL-44/);
  });

  it("item_scopes_children", () => {
    const { result, diagnostics } = nodes(<Repeat name="r" collection="c" layout="stack-h" count={1} item={() => <Item name="it"><ItemText name="t" prop="#a" /></Item>} />);
    expect(result[0]!.props.orientation).toBe("horizontal");
    const item = result[0]!.children[0]!.children[0]!;
    expect(item.name).toBe("it");
    expect(item.props.collection_index).toBeUndefined();
    expect(item.children[0]!.props.type).toBe("label");
    expect(diagnostics.filter((d) => d.level === "error")).toEqual([]);
    // 고정 칸을 가진 Item을 일반 패널 아래에 두면 배치 규칙이 스택으로 감싼다(COL-50)
    const fixed = nodes(<Repeat name="q" collection="c" layout="stack-v" count={1} item={() => <Item name="it" index={0}><ItemText name="t" prop="#a" /></Item>} />);
    expect(fixed.diagnostics.some((d) => d.rule === "COL-50")).toBe(true);
  });

  it("showif_variants", () => {
    const ex = nodes(<ShowIf name="a" when={E.prop("#n").gt(E.num(1))}><Label name="l" text="x" /></ShowIf>).result[0]!;
    expect(ex.props.bindings).toEqual([{ binding_type: "view", binding_condition: "always", source_property_name: "(#n > 1)", target_property_name: "#visible" }]);
    const has = nodes(<ShowIf name="b" when={{ has: "#t", marker: "§a" }} />).result[0]!;
    const lk = nodes(<ShowIf name="c" when={{ lacks: "#t", marker: "§a" }} />).result[0]!;
    for (const n of [has, lk]) (n.props.bindings as JsonObject[]).forEach((b) => expect(b.binding_condition).toBe("always"));
    expect((has.props.bindings as JsonObject[])[0]!.source_property_name).toContain("not");
    expect((lk.props.bindings as JsonObject[])[0]!.source_property_name).toBe("((#t - '§a') = #t)");
  });

  it("switch_cases_exclusive", () => {
    const { result, diagnostics } = nodes(
      <Switch name="sw" on="#mode">
        <Case name="a" value="on"><Label name="x" text="1" /></Case>
        <Case name="b" value="off"><Label name="y" text="2" /></Case>
      </Switch>,
    );
    const srcs = result[0]!.children.map((c) => (c.props.bindings as JsonObject[])[0]!.source_property_name);
    expect(srcs).toEqual(["(#mode = 'on')", "(#mode = 'off')"]);
    expect(diagnostics).toEqual([]);
    expect(() => nodes(<Switch name="sw" on="#mode"><Case name="a" value="on" /><Case name="b" value="on" /></Switch>)).toThrow(/Case가 둘 이상/);
    expect(() => nodes(<Case name="z" value="x" />)).toThrow(/Switch/);
  });

  it("bindtext", () => {
    const g = nodes(<BindText name="t" from="#title_text" />).result[0]!;
    expect(g.props.bindings).toEqual([{ binding_name: "#title_text", binding_name_override: "#text", binding_condition: "always" }]);
    const x = nodes(<BindText name="t" from={E.prop("#a").add(E.num(1))} />).result[0]!;
    expect((x.props.bindings as JsonObject[])[0]!.target_property_name).toBe("#text");
    const c = nodes(<Repeat name="r" collection="form_buttons" layout="stack-v" count={1} item={() => <BindText name="t" from="#form_button_text" />} />).result[0]!;
    expect((c.children[0]!.children[0]!.props.bindings as JsonObject[])[0]!.binding_type).toBe("collection");
  });

  it("keyed_factory", () => {
    const n = nodes(<KeyedFactory name="kf" size={[20, 20]} variants={{ a: "@t.cell_a", b: "@t.cell_b" }} />).result[0]!;
    expect(n.props.factory).toEqual({ name: "kf_factory", control_ids: { a: "@t.cell_a", b: "@t.cell_b" } });
    expect(n.props.property_bag).toEqual({ "#k": [], "#ka": ["a"], "#kb": ["b"] });
    expect(() => nodes(<KeyedFactory name="kf" size={[1, 1]} variants={{ "a b": "@t.x" }} />)).toThrow(/키/);
  });

  it("checks_clean", () => {
    expect(errors(<Repeat name="list" collection="form_buttons" layout="stack-v" count={2} item={(i) => <ItemText name={`t${i}`} prop="#form_button_text" />} />)).toEqual([]);
    expect(errors(<Repeat name="g" collection="form_buttons" layout="grid" cols={2} count={3} item={(i) => <ItemText name={`t${i}`} prop="#form_button_text" />} />)).toEqual([]);
    expect(errors(<ShowIf name="s" when={{ has: "#t", marker: "§a" }}><Label name="l" text="x" /></ShowIf>)).toEqual([]);
    expect(errors(<Switch name="sw" on="#mode"><Case name="a" value="on"><Label name="l" text="x" /></Case></Switch>)).toEqual([]);
    expect(errors(<Panel name="p"><BindText name="t" from="#title_text" /></Panel>)).toEqual([]);
    expect(errors(<KeyedFactory name="kf" size={[20, 20]} variants={{ a: "@t.cell_a" }} />)).toEqual([]);
  });
});
