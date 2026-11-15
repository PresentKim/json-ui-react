import { describe, expect, it } from "vitest";
import { render, toBody, toEntry } from "../src/render.ts";
import { Fragment } from "../src/jsx-runtime.ts";
import { jsxDEV, Fragment as DevFragment } from "../src/jsx-dev-runtime.ts";

describe("render", () => {
  it("test_unknown_function_component_props", () => {
    const Arr = () => [<label name="a" />, null, false, <label name="b" />];
    const Frag = () => (<><label name="c" />{null}{false}</>);
    const Nil = () => null;
    const No = () => false;
    const out = render(<panel name="p"><Arr /><Frag /><Nil /><No /></panel>);
    expect(out[0].children.map((c) => c.name)).toEqual(["a", "b", "c"]);
  });
  it("test_missing_name_throws", () => {
    // @ts-expect-error 의도적으로 잘못된 JSX (name 누락/비바닐라 키)
    expect(() => render(<label text="x" />)).toThrow(/label/);
    // @ts-expect-error 의도적으로 잘못된 JSX (name 누락/비바닐라 키)
    expect(() => render(<use def="a.b" />)).toThrow(/use/);
  });
  it("test_props_order_kept", () => {
    // @ts-expect-error 의도적으로 잘못된 JSX (name 누락/비바닐라 키)
    const [n] = render(<panel z={1} name="p" a={2} m={3} />);
    expect(Object.keys(n.props)).toEqual(["type", "z", "a", "m"]);
  });
  it("test_intrinsic_type", () => {
    expect(render(<label name="t" text="a" />)[0].props).toEqual({ type: "label", text: "a" });
  });
  it("test_use_no_type", () => {
    const [n] = render(<use name="i0" def="ffr.item_toggle" collection_index={0} />);
    expect(n).toEqual({ name: "i0", def: "ffr.item_toggle", props: { collection_index: 0 }, children: [] });
  });
  it("test_controls_key_last", () => {
    const [n] = render(<panel name="r0" size={[1, 2]}><use name="i0" def="d" /></panel>);
    expect(toEntry(n)).toEqual({ r0: { type: "panel", size: [1, 2], controls: [{ "i0@d": {} }] } });
    expect(Object.keys(toBody(n))).toEqual(["type", "size", "controls"]);
  });
  it("drops undefined props and no controls when empty", () => {
    // @ts-expect-error 의도적으로 잘못된 JSX (name 누락/비바닐라 키)
    const [n] = render(<panel name="p" x={undefined} />);
    expect(toBody(n)).toEqual({ type: "panel" });
  });
  it("string child throws", () => {
    expect(() => render(<panel name="p">hi</panel>)).toThrow(Error);
  });
  it("dev runtime", () => {
    expect(DevFragment).toBe(Fragment);
    expect(render(jsxDEV("panel", { name: "x" }, undefined))[0].name).toBe("x");
  });
});
