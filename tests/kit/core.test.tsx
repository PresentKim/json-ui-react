import { describe, expect, it, vi } from "vitest";

const force = vi.hoisted(() => ({ on: false }));
vi.mock("../../src/placement/solve.ts", async (orig) => {
  const m = await orig<typeof import("../../src/placement/solve.ts")>();
  return {
    ...m,
    solvePlacement: (n: Parameters<typeof m.solvePlacement>[0], o: Parameters<typeof m.solvePlacement>[1]) => {
      const r = m.solvePlacement(n, o);
      if (force.on) r.diagnostics.push({ rule: "COL-02", level: "error", path: "/x", message: "강제 오류" });
      return r;
    },
  };
});
import { Image, Label, Panel, StackPanel } from "../../src/controls/components.tsx";
import { render } from "../../src/render.ts";
import { runChecks } from "../../src/check/engine.ts";
import { ALL_CHECKS } from "../../src/check/index.ts";
import { collectKit, currentCollection, kitFile, nodeToElement, place, useKit, withScope } from "../../src/kit/core.tsx";

describe("kit core", () => {
  it("node_roundtrip", () => {
    const nodes = render(
      <Panel name="p" size={[10, 10]}>
        <Label name="l" text="a" />
        <Label name="m" def="base" text="b" />
      </Panel>,
    );
    for (const n of nodes) {
      const back = render(nodeToElement(n));
      expect(back).toEqual([n]);
      expect(JSON.stringify(back)).toBe(JSON.stringify([n]));
    }
  });

  it("no_ctx_default", () => {
    const out = place({ type: "stack_panel", name: "s" }, <Image name="i" offset={[2, 0]} />);
    expect(out[0]!.props.name).toBe("i_box");
    expect(useKit().diagnostics).toEqual([]);
  });

  it("place_offset_box_info", () => {
    const r = collectKit(() => place({ type: "stack_panel", name: "s" }, <Image name="i" offset={[2, 0]} />));
    expect(r.result).toHaveLength(1);
    expect(r.diagnostics.map((d) => [d.rule, d.level])).toEqual([["LAY-38", "info"]]);
  });

  it("nested_scopes", () => {
    const r = collectKit(() => {
      expect(currentCollection()).toBeUndefined();
      return withScope({ type: "stack_panel", collection: "form_buttons", path: "a" }, () =>
        withScope({ type: "panel", path: "b" }, () => {
          expect(currentCollection()).toBe("form_buttons");
          return place({ type: "panel", name: "p" }, <Label name="l" text="a" {...({ collection_index: 1 } as object)} />);
        }),
      );
    });
    expect(r.diagnostics.some((d) => d.rule === "COL-02" && d.level === "info")).toBe(true);
    expect(currentCollection()).toBeUndefined();
  });

  it("strict_throws", () => {
    const bad = () => place({ type: "stack_panel", name: "p" }, <Panel name="l" collection_index={1} />);
    force.on = true;
    try {
      expect(() => collectKit(bad, { strict: true })).toThrow(/COL-02/);
      const r = collectKit(bad);
      expect(r.diagnostics.some((d) => d.level === "error")).toBe(true);
    } finally {
      force.on = false;
    }
    expect(() => collectKit(bad, { strict: true })).not.toThrow();
  });

  it("kit_file_checks", () => {
    const f = kitFile("k", { main: <StackPanel name="x">{place({ type: "stack_panel", name: "x" }, <Label name="l" text="a" />) as never}</StackPanel> });
    expect(f.namespace).toBe("k");
    expect(Object.keys(f)).toEqual(["namespace", "main"]);
    expect(runChecks({ "ui/k.json": f as never }, ALL_CHECKS).diagnostics.filter((d: { level: string }) => d.level === "error")).toEqual([]);
  });
});
