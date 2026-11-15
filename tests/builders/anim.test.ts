import { describe, expect, it } from "vitest";
import { animation, chain } from "../../src/anim";
import type { AnimDef } from "../../src/anim";

const a: AnimDef = { anim_type: "alpha", from: 0, to: 1, duration: 0.2 };
const b: AnimDef = { anim_type: "alpha", from: 1, to: 0, duration: 0.2 };

describe("animation", () => {
  it("anim_type 이 맨 앞, undefined 제거", () => {
    const r = animation({ from: 0, to: 1, duration: 1, easing: undefined, anim_type: "alpha" });
    expect(Object.keys(r)).toEqual(["anim_type", "from", "to", "duration"]);
  });
  it("duration > 0", () => {
    expect(() => animation({ ...a, duration: 0 } as AnimDef)).toThrow(/ANI-09/);
    expect(() => animation({ anim_type: "wait", duration: -1 })).toThrow(/ANI-09/);
  });
  it("flip_book 은 frame_count 필요", () => {
    // @ts-expect-error frame_count 누락
    expect(() => animation({ anim_type: "flip_book", fps: 4 })).toThrow(/frame_count/);
    expect(animation({ anim_type: "flip_book", fps: 4, frame_count: 3 })).toMatchObject({ frame_count: 3 });
  });
  it("alpha_shape: alpha 의 배열 from 은 타입에서 거부", () => {
    // @ts-expect-error alpha 는 숫자
    expect(() => animation({ anim_type: "alpha", from: [0, 1], to: 1, duration: 1 })).toThrow(/숫자/);
  });
  it("wait_no_from", () => {
    // @ts-expect-error wait 는 from 없음
    expect(() => animation({ anim_type: "wait", duration: 1, from: 0 })).toThrow(/wait/);
    expect(animation({ anim_type: "wait", duration: 1 })).toEqual({ anim_type: "wait", duration: 1 });
  });
  it("easing 검증", () => {
    expect(() => animation({ ...a, easing: "in_bogus" } as unknown as AnimDef)).toThrow(/ANI-10/);
    expect(animation({ ...a, easing: "out_cubic" })).toMatchObject({ easing: "out_cubic" });
  });
  it("easing 위키 목록 허용(in_back) + 크기 문자열 좌표 (거짓 타입 오류 회귀)", () => {
    expect(animation({ ...a, easing: "in_back" })).toMatchObject({ easing: "in_back" });
    expect(animation({ anim_type: "offset", from: ["100%c + 40px", 20], to: [0, 20], duration: 0.5 })).toMatchObject({ from: ["100%c + 40px", 20] });
    expect(animation({ anim_type: "size", from: "$a", to: "$b", duration: 1 })).toMatchObject({ from: "$a" });
  });
  it("offset [x,y]", () => {
    expect(animation({ anim_type: "offset", from: [0, 0], to: [10, "$y"], duration: 1 })).toMatchObject({ to: [10, "$y"] });
  });
});

describe("chain_loop", () => {
  it("루프는 처음으로 닫힌다", () => {
    const r = chain("x", { a, b }, ["a", "b"], { loop: true });
    expect(r.a.next).toBe("@x.b");
    expect(r.b.next).toBe("@x.a");
  });
  it("비루프는 마지막에 next 없음", () => {
    const r = chain("x", { a, b }, ["a", "b"]);
    expect(r.a.next).toBe("@x.b");
    expect("next" in r.b).toBe(false);
  });
  it("없는 키는 던진다", () => {
    expect(() => chain("x", { a }, ["a", "z"])).toThrow(/z/);
  });
});
