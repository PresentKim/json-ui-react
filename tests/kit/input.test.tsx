import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { render } from "../../src/render.ts";
import { Image, Label, Panel, StackPanel } from "../../src/controls/components.tsx";
import { collectKit, kitFile, withScope } from "../../src/kit/core.tsx";
import { PushButton, ToggleBox, RadioGroup, Radio, TabGroup, TextInput, SliderControl } from "../../src/kit/input.tsx";
import { runChecks } from "../../src/check/engine.ts";
import { ALL_CHECKS } from "../../src/check/index.ts";
import type { JsonObject, JuiNode } from "../../src/types.ts";

const img = (n: string) => <Image name={n} texture={`textures/ui/${n}`} />;
const errorsOf = (defs: Record<string, JuiNode>) => {
  const file = collectKit(() => kitFile("kt", defs)).result as JsonObject;
  return runChecks({ "ui/kt.json": file }, ALL_CHECKS).diagnostics.filter((d) => d.level === "error");
};
const body = (n: JuiNode) => render(n)[0]!;

describe("입력 키트", () => {
  it("toggle_8_states", () => {
    const n = body(<ToggleBox name="t" size={[10, 10]} on={img("on")} off={img("off")} />);
    const keys = Object.keys(n.props).filter((k) => k.endsWith("_control"));
    expect(keys).toHaveLength(8);
    for (const k of keys) expect(typeof n.props[k]).toBe("string");
    expect(n.props.toggle_on_button).toBe("toggle.toggle_on");
    expect(n.props.toggle_off_button).toBe("toggle.toggle_off");
    expect(JSON.stringify(n.props.button_mappings)).toContain("button.menu_select");
    const names = n.children.map((c) => c.name);
    for (const k of keys) expect(names).toContain(n.props[k]);
  });

  it("radio_group_keys", () => {
    const n = body(
      <RadioGroup name="g" group="grp" selected={1}>
        <Radio name="a" index={0} size={[5, 5]} on={img("on")} off={img("off")} />
        <Radio name="b" index={1} size={[5, 5]} on={img("on")} off={img("off")} />
      </RadioGroup>,
    );
    expect(n.children).toHaveLength(2);
    n.children.forEach((c, i) => {
      expect(c.props.toggle_name).toBe("grp");
      expect(c.props.radio_toggle_group).toBe(true);
      expect(c.props.toggle_group_forced_index).toBe(i);
      expect(c.props.toggle_group_default_selected).toBe(1);
    });
  });

  it("state_child_visible_stripped", () => {
    const { result, diagnostics } = collectKit(() =>
      body(<PushButton name="b" size={[10, 10]} face={<Image name="f" texture="x" visible={false} />} />),
    );
    const json = JSON.stringify(result);
    expect(json).not.toContain("visible");
    expect(diagnostics.some((d) => d.rule === "INP-06" && d.level === "info")).toBe(true);
    expect(result.props.default_control).toBe("default");
    expect(result.props.pressed_control).toBe("pressed");
  });

  it("push_button_children_shared", () => {
    const n = body(<PushButton name="b" size={[10, 10]}><Label name="l" text="hi" /></PushButton>);
    expect(n.children.map((c) => c.name)).toEqual(["default", "hover", "pressed"]);
    expect(n.props.sound_name).toBe("random.click");
  });

  it("text_input_props", () => {
    const n = body(<TextInput name="in" size={[80, 12]} textBoxName="q" maxLength={16} placeholder="검색" />);
    expect(n.props.text_box_name).toBe("q");
    expect(n.props.max_length).toBe(16);
    expect(n.children.map((c) => c.name)).toContain(n.props.place_holder_control);
  });

  it("tab_panes_bound", () => {
    const n = body(
      <TabGroup name="tg" size={[100, 60]} tabs={[{ id: "a", on: img("on"), off: img("off"), pane: <Label name="pa" text="A" /> }, { id: "b", on: img("on"), off: img("off"), pane: <Label name="pb" text="B" /> }]} />,
    );
    expect(JSON.stringify(n)).toContain('"#toggle_state"');
    expect(JSON.stringify(n)).toContain("tg_tab_b");
  });

  it("slider_warns_outside_collection", () => {
    const out = collectKit(() => body(<SliderControl name="s" size={[100, 8]} sliderName="vol" />));
    expect(out.diagnostics.some((d) => d.rule === "HOST-12" && d.level === "warn")).toBe(true);
    const inside = collectKit(() => withScope({ type: "factory", collection: "c", path: "c" }, () => body(<SliderControl name="s" size={[100, 8]} sliderName="vol" />)));
    expect(inside.diagnostics.some((d) => d.rule === "HOST-12")).toBe(false);
  });

  it("checks_clean", () => {
    const tabs = [{ id: "a", on: img("on"), off: img("off"), pane: <Label name="pa" text="A" /> }];
    expect(
      errorsOf({
        pb: <PushButton name="pb" size={[10, 10]} face={img("f")} />,
        tb: <ToggleBox name="tb" size={[10, 10]} on={img("on")} off={img("off")} hover={img("h")} />,
        rg: (
          <RadioGroup name="rg" group="g">
            <Radio name="r0" index={0} size={[5, 5]} on={img("on")} off={img("off")} />
            <Radio name="r1" index={1} size={[5, 5]} on={img("on")} off={img("off")} />
          </RadioGroup>
        ),
        tg: <TabGroup name="tg" size={[100, 60]} tabs={tabs} />,
        ti: <TextInput name="ti" size={[80, 12]} />,
        sl: <SliderControl name="sl" size={[100, 8]} sliderName="v" />,
      }),
    ).toEqual([]);
  });

  it("only_pascal_controls", () => {
    const src = readFileSync(new URL("../../src/kit/input.tsx", import.meta.url), "utf8");
    expect(src).not.toMatch(/<[a-z_]+[\s>\/]/);
    expect(src).not.toContain("binding_type:");
  });
});
