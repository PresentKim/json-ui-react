import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { render, toBody } from "../src/render.ts";
import { ScreenRouter } from "../src/components/router.tsx";
import { radioToggleBody, TabBar } from "../src/components/toggle.tsx";
import type { JsonObject } from "../src/types.ts";

const ffr = JSON.parse(readFileSync(new URL("./fixtures/ffr/ffr.json", import.meta.url), "utf8")) as Record<string, any>;

describe("toggle", () => {
  it("test_radio_toggle_matches_ffr", () => {
    const { "$on_def|default": _a, "$tab|default": _b, controls: _c, ...expected } = ffr.tab_toggle;
    const got = radioToggleBody({ group: "ffr_tabs", size: [96, 22], forcedIndex: "$tab_index", defaultSelected: "$tab", extra: { layer: 1 } });
    expect(got).toEqual(expected);
    expect(Object.keys(got)).toEqual(Object.keys(expected));
  });

  it("test_eight_states_present", () => {
    const b = radioToggleBody({ group: "g", size: [1, 1], forcedIndex: 0, defaultSelected: 0 });
    const states = Object.keys(b).filter((k) => k.endsWith("_control"));
    expect(states).toHaveLength(8);
    expect(b.toggle_on_button).toBe("toggle.toggle_on");
    expect(b.button_mappings).toEqual(ffr.tab_toggle.button_mappings);
  });

  it("test_tabbar_matches_ffr", () => {
    const el = (
      <TabBar name="tabs_toggle" size={[192, 22]} toggleDef="ffr.tab_toggle" tabs={[{ name: "ffr_t0", index: 96 }, { name: "ffr_t1", index: 97 }]} />
    );
    expect(toBody(render(el)[0]!)).toEqual(ffr.tabs_toggle);
  });

  it("test_tabbar_vars_after_tab_index", () => {
    const el = <TabBar name="t" size={[1, 1]} toggleDef="x.y" tabs={[{ name: "a", index: 5, vars: { "$v": 1 } }]} />;
    const body = toBody(render(el)[0]!) as any;
    const entry = body.controls[0]["a@x.y"] as JsonObject;
    expect(Object.keys(entry)).toEqual(["collection_index", "$tab_index", "$v"]);
  });
});

describe("router", () => {
  const picked = ["ea", "eb", "fa", "fb"];
  const routes = picked.map((id) => ({ title: `ffr:${id[0]!.toUpperCase()}${id[1]}`, id, control: `ffr.research_${id}` }));

  it("test_router_matches_ffr_restricted", () => {
    const expected = structuredClone(ffr.screen_router);
    expected.factory.control_ids = Object.fromEntries(picked.map((id) => [id, expected.factory.control_ids[id]]));
    expected.property_bag = Object.fromEntries(routes.map((r) => [`#${r.title}`, [r.id]]));
    const got = toBody(render(<ScreenRouter name="screen_router" factory="ffr_screen" prefixBytes={6} routes={routes} />)[0]!);
    expect(got).toEqual(expected);
  });

  it("test_router_empty_routes_throws", () => {
    expect(() => render(<ScreenRouter name="r" factory="f" prefixBytes={6} routes={[]} />)).toThrow(/routes가 비어/);
  });

  it("test_router_duplicate_title_throws", () => {
    const r = [{ title: "a:B", id: "x", control: "a.x" }, { title: "a:B", id: "y", control: "a.y" }];
    expect(() => render(<ScreenRouter name="r" factory="f" prefixBytes={6} routes={r} />)).toThrow(/a:B/);
  });
});
