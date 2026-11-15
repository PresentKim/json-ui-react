import { describe, expect, it } from "vitest";
import { bind, checkBindings, view, collection, details, global } from "../../src/bind";
import type { BindingObj } from "../../src/bind";

describe("legacy_output_identical", () => {
  it("기존 함수는 키 순서를 유지한다", () => {
    expect(Object.keys(view("#a", "#b", { condition: "always", control: "c" }))).toEqual([
      "binding_type", "binding_condition", "source_control_name", "source_property_name", "target_property_name",
    ]);
    expect(Object.keys(collection("#n", "c", "once"))).toEqual([
      "binding_type", "binding_collection_name", "binding_name", "binding_condition",
    ]);
    expect(details("c")).toEqual({ binding_type: "collection_details", binding_collection_name: "c" });
    expect(global("#x")).toEqual({ binding_name: "#x" });
  });
});

describe("fluent", () => {
  it("view", () => {
    expect(bind.view("(not #a)", "#visible", { condition: "always" })).toEqual({
      binding_type: "view", binding_condition: "always", source_property_name: "(not #a)", target_property_name: "#visible",
    });
    expect(bind.view("#a", "#b", { control: "x", sibling: true }).resolve_sibling_scope).toBe(true);
  });
  it("global/collection/details", () => {
    expect(bind.global("#t", { override: "#u" })).toEqual({ binding_name: "#t", binding_name_override: "#u" });
    expect(bind.collection("#n", "c")).toEqual({ binding_type: "collection", binding_collection_name: "c", binding_name: "#n" });
    expect(bind.details("c", { prefix: "p", condition: "once" })).toEqual({
      binding_type: "collection_details", binding_collection_name: "c", binding_collection_prefix: "p", binding_condition: "once",
    });
  });
  it("condition_enum: 타입 수준에서 거부", () => {
    // @ts-expect-error 모르는 조건
    bind.view("#a", "#b", { condition: "sometimes" });
    // @ts-expect-error # 없는 대상
    bind.view("#a", "b");
  });
});

describe("checkBindings", () => {
  it("bnd05_literal", () => {
    const r = checkBindings([{ binding_type: "view", source_property_name: "'x'", target_property_name: "#t" }], "p");
    expect(r).toHaveLength(1);
    expect(r[0]).toMatchObject({ rule: "BND-05", level: "warn", path: "p[0].source_property_name" });
  });
  it("정상 목록은 비어 있다", () => {
    expect(checkBindings([bind.view("$v", "#t"), bind.view("(#a = #a)", "#t"), bind.global("#g")], "p")).toEqual([]);
  });
  it("target # 누락, 조건 오타, 컬렉션 이름 누락", () => {
    const bad = [
      { binding_type: "view", source_property_name: "#a", target_property_name: "t" },
      { binding_type: "global", binding_name: "#a", binding_condition: "alwayz" },
      { binding_type: "collection", binding_name: "#a" },
    ] as unknown as BindingObj[];
    expect(checkBindings(bad, "p").map((d) => d.rule)).toEqual(["BND-01", "BND-22", "BND-36"]);
  });
});
