import { describe, expect, it } from "vitest";
import { E, checkExpr } from "../../src/expr";

describe("E 빌더", () => {
  it("예시", () => {
    expect(E.prop("#hover_text").sub(E.str("§o")).eq(E.str("")).toString()).toBe("((#hover_text - '§o') = '')");
    expect(E.num(1).sub(E.prop("#v").mul(E.num(0.1))).toString()).toBe("(1 - (#v * .1))");
  });
  it("num_leading_dot", () => {
    expect(E.num(0.004).toString()).toBe(".004");
    expect(E.num(-0.5).toString()).toBe("-.5");
    expect(E.num(1.5).toString()).toBe("1.5");
    expect(E.num(3).toString()).toBe("3");
  });
  it("num_exponent", () => {
    expect(() => E.num(1e-7)).toThrow(/EXP-27/);
    expect(() => E.num(NaN)).toThrow();
  });
  it("str / prop 검증", () => {
    expect(() => E.str("a*b")).toThrow(/EXP-36/);
    expect(() => E.prop("#a-b")).toThrow(/EXP-36/);
  });
  it("strip_chain", () => {
    expect(E.prop("#t").strip("a").strip("b").toString()).toBe("((#t - 'a') - 'b')");
  });
  it("fmt, not, neq, 논리", () => {
    expect(E.fmt(4, E.prop("#t")).eq(E.str("ffr:")).toString()).toBe("(('%.4s' * #t) = 'ffr:')");
    expect(E.prop("#a").neq(E.num(1)).toString()).toBe("(not (#a = 1))");
    expect(E.prop("#a").not().toString()).toBe("(not #a)");
    expect(E.prop("#a").gte(1).and(E.prop("#b").lt(2)).or(E.prop("#c")).toString())
      .toBe("(((#a >= 1) and (#b < 2)) or #c)");
  });
});

describe("checkExpr", () => {
  const rules = (s: string) => checkExpr(s, "p").map((d) => d.rule);
  it("정상", () => {
    expect(rules("(('%.4s' * #t) = 'ffr:')")).toEqual([]);
    expect(rules("(#a * .5)")).toEqual([]);
    expect(rules("((#a < 3) and (#a > 1))")).toEqual([]);
    expect(rules("(#a = '0.5')")).toEqual([]);
  });
  it("EXP-27", () => {
    expect(checkExpr("(#a * 0.5)", "p")[0]).toMatchObject({ rule: "EXP-27", level: "error", path: "p" });
  });
  it("DBG-30 지수", () => expect(rules("(#a * 1e-7)")).toContain("DBG-30"));
  it("EXP-36 따옴표", () => {
    expect(rules("(#a = 'x*y')")).toContain("EXP-36");
    expect(rules("(#a = 'x)")).toContain("EXP-36");
  });
  it("checkexpr_balanced", () => {
    expect(rules("((#a = 1)")).toContain("EXP-36");
    expect(rules("(#a = 1))")).toContain("EXP-36");
    expect(rules("(#a = ')')")).toEqual([]);
  });
  it("EXP-28 사슬 비교", () => {
    expect(rules("(962 < #c < 964)")).toContain("EXP-28");
  });
  it("EXP-32", () => expect(rules("('a' % #b)")).toContain("EXP-32"));
});
