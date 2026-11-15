import { describe, it, expect, beforeEach } from "vitest";
import { readFileSync } from "node:fs";
import { render, toEntry } from "../../src/render.ts";
import { Image } from "../../src/controls/index.ts";
import { runChecks } from "../../src/check/engine.ts";
import { ALL_CHECKS } from "../../src/check/index.ts";
import { collectKit, kitFile } from "../../src/kit/core.tsx";
import { defineAnims, takeAnims, Animated, FadeIn, FadeOut, SlideIn, Pulse } from "../../src/kit/anim.tsx";
import type { JsonObject, JuiNode } from "../../src/types.ts";

beforeEach(() => void takeAnims());
const child = <Image name="b" texture="textures/ui/a" size={[4, 4]} />;

/** 컴포넌트 출력 + 모인 정의를 네임스페이스 파일로 만들어 검사한다 */
const check = (ns: string, node: JuiNode) => {
  const nodes = collectKit(() => render(node)).result;
  const file: JsonObject = { namespace: ns };
  for (const n of nodes) Object.assign(file, toEntry(n));
  for (const [k, v] of Object.entries(takeAnims())) file[k.slice(ns.length + 1)] = v;
  return runChecks({ [`ui/${ns}.json`]: file }, ALL_CHECKS).diagnostics.filter((d) => d.level === "error");
};

describe("anim kit", () => {
  it("defineAnims returns refs and takeAnims drains", () => {
    const refs = defineAnims("x", { a: { anim_type: "alpha", from: 0, to: 1, duration: 1 } });
    expect(refs).toEqual({ a: "@x.a" });
    expect(takeAnims()).toEqual({ "x.a": { anim_type: "alpha", from: 0, to: 1, duration: 1 } });
    expect(takeAnims()).toEqual({});
  });
  it("anims_attached_to_child", () => {
    const [n] = render(<Animated name="w" anims={["@x.a"]}>{child}</Animated>);
    expect(n!.props.anims).toEqual(["@x.a"]);
    expect(n!.children.map((c) => c.name)).toEqual(["b"]);
    expect(n!.props.layer).toBeUndefined();
  });
  it("FadeIn example", () => {
    const [n] = render(<FadeIn name="f" ns="x" duration={0.2}>{child}</FadeIn>);
    expect(n!.props.anims).toEqual(["@x.f_fade"]);
    expect(takeAnims()).toEqual({ "x.f_fade": { anim_type: "alpha", from: 0, to: 1, duration: 0.2 } });
  });
  it("FadeOut and SlideIn", () => {
    render(<FadeOut name="o" ns="x">{child}</FadeOut>);
    render(<SlideIn name="s" ns="x" from={[-20, 0]}>{child}</SlideIn>);
    const t = takeAnims();
    expect(t["x.o_fade_out"]).toMatchObject({ anim_type: "alpha", from: 1, to: 0 });
    expect(t["x.s_slide"]).toMatchObject({ anim_type: "offset", from: [-20, 0], to: [0, 0] });
  });
  it("rejects invalid duration (ANI-09)", () => {
    expect(() => render(<FadeIn name="f" ns="x" duration={0}>{child}</FadeIn>)).toThrow(/ANI-09/);
  });
  it("pulse_loop_next", () => {
    const [n] = render(<Pulse name="p" ns="x">{child}</Pulse>);
    const t = takeAnims();
    expect(n!.props.anims).toEqual(["@x.p_pulse_down"]);
    expect(t["x.p_pulse_down"]!.next).toBe("@x.p_pulse_up");
    expect(t["x.p_pulse_up"]!.next).toBe("@x.p_pulse_down");
  });
  it("checks_clean", () => {
    expect(check("k1", <FadeIn name="f" ns="k1">{child}</FadeIn>)).toEqual([]);
    expect(check("k2", <FadeOut name="f" ns="k2">{child}</FadeOut>)).toEqual([]);
    expect(check("k3", <SlideIn name="f" ns="k3" from={[5, 0]}>{child}</SlideIn>)).toEqual([]);
    expect(check("k4", <Pulse name="f" ns="k4">{child}</Pulse>)).toEqual([]);
    expect(check("k5", <Animated name="f" anims={defineAnims("k5", { a: { anim_type: "wait", duration: 1 } }).a ? ["@k5.a"] : []}>{child}</Animated>)).toEqual([]);
  });
  it("PascalCase only, no lowercase tags / binding_type", () => {
    const src = readFileSync("src/kit/anim.tsx", "utf8");
    expect(src).not.toMatch(/<[a-z_]+[\s>]/);
    expect(src).not.toMatch(/binding_type:/);
    expect(src).not.toMatch(/\blayer\s*[:=]/);
  });
});
void kitFile;
