import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { render } from "../../src/render.ts";
import { E } from "../../src/expr.ts";
import { runChecks } from "../../src/check/engine.ts";
import { ALL_CHECKS } from "../../src/check/index.ts";
import { collectKit, withScope, kitFile } from "../../src/kit/core.tsx";
import { Text, Icon, Frame, ProgressBar, ItemIcon, Divider } from "../../src/kit/visual.tsx";
import type { JuiNode } from "../../src/types.ts";

const nodeOf = (el: JuiNode) => collectKit(() => render(el)).result[0]!;
const errors = (defs: Record<string, JuiNode>) => {
  const { result: file } = collectKit(() => kitFile("kt", defs));
  return runChecks({ "ui/kt.json": file } as never, ALL_CHECKS).diagnostics.filter((d) => d.level === "error");
};
const inColl = (el: JuiNode) => collectKit(() => withScope({ type: "stack_panel", collection: "c", path: "s" }, () => render(el))).result[0]!;

describe("kit visual", () => {
  it("source_pascal_only", () => {
    const src = readFileSync("src/kit/visual.tsx", "utf8");
    expect(src).not.toMatch(/<[a-z_]+[\s>/]/);
    expect(src).not.toMatch(/binding_type:/);
  });
  it("text literal / bind / expr", () => {
    expect(nodeOf(<Text name="a" text="§a안녕" />).props).toMatchObject({ text: "§a안녕", localize: false });
    const b = nodeOf(<Text name="b" text={{ bind: "#x" }} />).props.bindings as any[];
    expect(b[0]).toMatchObject({ binding_type: "view", source_property_name: "#x", target_property_name: "#text" });
    const e = nodeOf(<Text name="c" text={{ expr: E.prop("#x").add(E.num(1)) }} />).props.bindings as any[];
    expect(e[0].source_property_name).toBe("(#x + 1)");
  });
  it("text bind in collection uses collection binding", () => {
    const n = inColl(<Text name="b" text={{ bind: "#x" }} />);
    expect((n.props.bindings as any[])[0]).toMatchObject({ binding_type: "collection", binding_collection_name: "c", binding_name_override: "#text" });
  });
  it("icon props", () => {
    const n = nodeOf(<Icon name="i" texture="t/a" uv={[0, 0]} uvSize={[8, 8]} nineSlice={2} tiled />);
    expect(n.props).toMatchObject({ type: "image", uv: [0, 0], uv_size: [8, 8], nineslice_size: 2, tiled: true });
  });
  it("frame has bg and content", () => {
    const n = nodeOf(<Frame name="f" texture="t/a" inset={4}><Icon name="x" texture="t/b" /></Frame>);
    expect(n.children.map((c) => c.name)).toEqual(["f_bg", "f_content"]);
    expect(n.children[1]!.children[0]!.name).toBe("x");
  });
  it("progress ok", () => {
    const n = nodeOf(<ProgressBar name="p" ratio={E.num(1).sub(E.prop("#v").mul(E.num(0.1)))} source="#v" size={[100, 4]} />);
    const b = n.props.bindings as any[];
    expect(b.at(-1)).toMatchObject({ source_property_name: "(1 - (#v * .1))", target_property_name: "#clip_ratio" });
    expect(n.props.clip_direction).toBe("left");
  });
  it("progress_constant_rejected", () => {
    const { diagnostics } = collectKit(() => render(<ProgressBar name="p" ratio={E.num(1)} size={[10, 2]} />));
    expect(diagnostics[0]).toMatchObject({ rule: "EXP-27", level: "error" });
    expect(collectKit(() => render(<ProgressBar name="p" ratio="(#v * 0.1)" />)).diagnostics[0]!.rule).toBe("EXP-27");
    expect(() => collectKit(() => render(<ProgressBar name="p" ratio={E.num(1)} />), { strict: true })).toThrow();
  });
  it("itemicon_needs_collection", () => {
    const out = collectKit(() => render(<ItemIcon name="i" />));
    expect(out.diagnostics[0]).toMatchObject({ rule: "COL-05", level: "error" });
    const n = inColl(<ItemIcon name="i" />);
    expect(n.props).toMatchObject({ type: "custom", renderer: "inventory_item_renderer", size: [16, 16] });
    expect((n.props.bindings as any[])[0]).toMatchObject({ binding_collection_name: "c", binding_name: "#item_id_aux" });
  });
  it("divider", () => {
    expect(nodeOf(<Divider name="d" orientation="vertical" thickness={2} />).props.size).toEqual([2, "100%"]);
  });
  it("checks_clean", () => {
    expect(errors({
      t: <Text name="t" text="a" />,
      tb: <Text name="tb" text={{ bind: "#x" }} />,
      ic: <Icon name="ic" texture="textures/ui/a" size={[8, 8]} />,
      fr: <Frame name="fr" texture="textures/ui/a" size={[50, 50]}><Icon name="x" texture="textures/ui/b" size={[4, 4]} /></Frame>,
      pb: <ProgressBar name="pb" ratio={E.num(1).sub(E.prop("#v").mul(E.num(0.1)))} source="#v" size={[100, 4]} />,
      dv: <Divider name="dv" />,
    })).toEqual([]);
  });
});
