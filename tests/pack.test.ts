import { describe, it, expect } from "vitest";
import { createPack } from "../src/pack.ts";
import type { JuiElement } from "../src/types.ts";

const el = (type: string, props: Record<string, unknown> = {}): JuiElement => ({ type, props: { name: "x", ...props } });

describe("pack", () => {
  it("test_file_default", () => {
    const p = createPack();
    p.ns("ffr").define("a", { type: "panel" });
    expect(Object.keys(p.files())).toContain("ui/ffr.json");
    expect(createPack().ns("ffri", "ffr_items.json").name).toBe("ffri");
  });
  it("define 반환값과 첫 키", () => {
    const p = createPack();
    const ns = p.ns("ffri", "ffr_items.json");
    const k = ns.define("lazy_0@ffr.lazy_detail", { factory: { name: "ffr_lazy_0", control_name: "ffri.detail_0" } });
    expect(k).toBe("ffri.lazy_0");
    const f = p.files();
    expect(f["ui/ffr_items.json"].startsWith('{\n  "namespace": "ffri",\n  "lazy_0@ffr.lazy_detail"')).toBe(true);
    expect(f["ui/_ui_defs.json"]).toBe('{\n  "ui_defs": [\n    "ui/ffr_items.json"\n  ]\n}\n');
    expect(Object.keys(p.json("ui/ffr_items.json"))[0]).toBe("namespace");
  });
  it("test_duplicate_key_throws", () => {
    const ns = createPack().ns("n");
    ns.define("a", { type: "panel" });
    expect(() => ns.define("a@x.y", { type: "panel" })).toThrow(Error);
    expect(() => ns.define("a", { type: "panel" })).toThrow(Error);
  });
  it("test_element_body_must_be_single", () => {
    const ns = createPack().ns("n");
    expect(() => ns.define("a", [el("panel"), el("panel")] as any)).toThrow(/1개/);
    expect(() => ns.define("b", null)).toThrow(Error);
  });
  it("요소 body는 toBody 결과", () => {
    const p = createPack();
    p.ns("n").define("a@x.y", el("panel", { size: [1, 2] }));
    expect(p.json("ui/n.json")["a@x.y"]).toEqual({ type: "panel", size: [1, 2] });
  });
  it("test_deterministic", () => {
    const make = () => {
      const p = createPack();
      const n = p.ns("a", "a.json");
      n.define("x", { type: "panel" });
      n.define("y@z.w", { size: [1, 2] });
      p.ns("b").define("q", { type: "label" });
      p.modify("ui/server_form.json", "server_form", "main", { type: "panel" });
      return p.files();
    };
    expect(make()).toEqual(make());
    expect(JSON.stringify(make())).toBe(JSON.stringify(make()));
  });
  it("test_modify_not_in_ui_defs", () => {
    const p = createPack();
    p.ns("ffr").define("a", { type: "panel" });
    p.modify("ui/server_form.json", "server_form", "main", { type: "panel" });
    p.modify("ui/server_form.json", "server_form", "main", { type: "label" });
    const f = p.files();
    expect(f["ui/server_form.json"]).toBe('{\n  "namespace": "server_form",\n  "main": {\n    "type": "label"\n  }\n}\n');
    expect(f["ui/_ui_defs.json"]).not.toContain("server_form");
    expect(p.json("ui/server_form.json")).toEqual({ namespace: "server_form", main: { type: "label" } });
  });
  it("정의 순서 유지", () => {
    const p = createPack();
    const n = p.ns("n");
    n.define("z", {}); n.define("a", {});
    expect(Object.keys(p.json("ui/n.json"))).toEqual(["namespace", "z", "a"]);
  });
});
