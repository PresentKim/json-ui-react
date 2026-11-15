import { describe, it, expect } from "vitest";
import { buildEntityScreens, EntityScreen } from "../../src/entity/build.tsx";
import { useEntity } from "../../src/entity/context.ts";

const Cell = () => {
  const ctx = useEntity("Cell");
  const [n] = ctx.slots.claim("cell", 1);
  ctx.buttons["go"] = [n!];
  return <label name="t" $$slot={n!} />;
};

const scr = (id: string, code: string, extra: object = {}) => (
  <EntityScreen id={id} code={code} title="T" size={[262, 196]} {...extra}>
    <panel name="p" size={[10, 10]}><Cell /></panel>
  </EntityScreen>
);

const HIDE = { binding_type: "view", source_control_name: "entity_ui_hide_vanilla", source_property_name: "#entity_ui_vanilla_visible", target_property_name: "#visible", binding_condition: "always" };

describe("buildEntityScreens", () => {
  it("shell_modifications_only", () => {
    const r = buildEntityScreens([scr("a", "ml")], { namespace: "eml" });
    expect(Object.keys(r.files).sort()).toEqual(["ui/_ui_defs.json", "ui/chest_screen.json", "ui/eml.json", "ui/pocket_containers.json"]);
    const chest = JSON.parse(r.files["ui/chest_screen.json"]!);
    expect(chest).toEqual({
      namespace: "chest",
      small_chest_panel: { modifications: [{ array_name: "controls", operation: "insert_back", value: [{ "ml_overlay@eml.ml_overlay": {} }] }] },
      "small_chest_panel/root_panel": { modifications: [{ array_name: "bindings", operation: "insert_back", value: [HIDE] }] },
    });
    const pk = JSON.parse(r.files["ui/pocket_containers.json"]!);
    expect(Object.keys(pk)).toEqual(["namespace", "panel", "header_area", "background_panel", "half_screen"]);
    for (const k of Object.keys(pk).slice(1)) expect(Object.keys(pk[k])).toEqual(["modifications"]);
    expect(r.screens.a!.nameTag).toBe("§b§w§m§l");
    expect(r.screens.a!.slots).toEqual({ cell: [1] });
    expect(r.screens.a!.buttons).toEqual({ go: [1] });
    expect(r.serverModule).toContain("export const SCREENS");
    expect(r.serverTypes).toContain("SCREENS");
  });

  it("two_screens_one_ns", () => {
    const r = buildEntityScreens([scr("a", "ml"), scr("b", "r2", { size: [326, 186], window: { offset: [0, 8] } })], { namespace: "x" });
    const chest = JSON.parse(r.files["ui/chest_screen.json"]!);
    expect(chest.small_chest_panel.modifications).toHaveLength(1);
    expect(chest.small_chest_panel.modifications[0].value).toHaveLength(2);
    const ns = JSON.parse(r.files["ui/x.json"]!);
    expect(ns.ml_overlay.controls[0].host.ignored).toBe("(not ($bwiki_title = '§b§w§m§l'))");
    expect(ns.r2_overlay.controls[0].host.ignored).toBe("(not ($bwiki_title = '§b§w§r§2'))");
    expect(ns.r2_window.offset).toEqual([0, 8]);
    expect(r.diagnostics.filter((d) => d.level === "error")).toEqual([]);
  });

  it("code_validation", () => {
    for (const c of ["a", "abc", "A1", "a-"]) expect(() => buildEntityScreens([scr("a", c)])).toThrow(/code/);
    expect(() => buildEntityScreens([scr("a", "ab"), scr("b", "ab")])).toThrow(/중복/);
    expect(buildEntityScreens([scr("a", "20")]).screens.a!.nameTag).toBe("§b§w§2§0");
  });

  it("error diagnostics throw unless strict false", () => {
    const bad = (
      <EntityScreen id="a" code="ab" title="T" size={[10, 10]}>
        <panel name="p" size={[160, "$h"]}><Cell /></panel>
      </EntityScreen>
    );
    expect(() => buildEntityScreens([bad])).toThrow(/ENT-SIZE/);
    expect(buildEntityScreens([bad], { strict: false }).diagnostics.some((d) => d.rule === "ENT-SIZE" && d.level === "warn")).toBe(true);
  });
});
