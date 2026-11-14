import { describe, expect, it } from "vitest";
import { lit, prefixEq, lacks } from "../src/expr";
import { view, collection, details, global } from "../src/bind";

describe("expr", () => {
  it("lit", () => {
    expect(lit("ffr:")).toBe("'ffr:'");
    expect(() => lit("a*b")).toThrow(/EXP-36/);
    expect(() => lit("a@b")).toThrow(/EXP-36/);
    expect(() => lit("a'b")).toThrow(/EXP-36/);
  });
  it("prefixEq", () => {
    expect(prefixEq("#title_text", "ffr:")).toBe("(('%.4s' * #title_text) = 'ffr:')");
    expect(prefixEq("#t", "가")).toBe("(('%.3s' * #t) = '가')");
  });
  it("lacks", () => {
    expect(lacks("#form_button_text", "§0§e§r")).toBe(
      "((#form_button_text - '§0§e§r') = #form_button_text)",
    );
  });
});

describe("bind", () => {
  it("view", () => {
    const r = view("#toggle_state", "#visible", { condition: "always", control: "ffr_t0" });
    expect(JSON.stringify(r)).toBe(JSON.stringify({
      binding_type: "view", binding_condition: "always", source_control_name: "ffr_t0",
      source_property_name: "#toggle_state", target_property_name: "#visible",
    }));
    expect(view("#a", "#b")).toEqual({ binding_type: "view", source_property_name: "#a", target_property_name: "#b" });
  });
  it("collection", () => {
    expect(JSON.stringify(collection("#form_button_text", "form_buttons", "always"))).toBe(JSON.stringify({
      binding_type: "collection", binding_collection_name: "form_buttons",
      binding_name: "#form_button_text", binding_condition: "always",
    }));
  });
  it("details", () => {
    expect(JSON.stringify(details("form_buttons", "always"))).toBe(JSON.stringify({
      binding_type: "collection_details", binding_collection_name: "form_buttons", binding_condition: "always",
    }));
  });
  it("global", () => {
    expect(global("#title_text")).toEqual({ binding_name: "#title_text" });
    expect(global("#x", "always")).toEqual({ binding_name: "#x", binding_condition: "always" });
  });
});
