import { describe, it, expect } from "vitest";
import { readFileSync, existsSync, rmSync, mkdtempSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { buildResearch } from "../examples/research/screen.tsx";
import { decode } from "../src/slots.ts";
import { lintFiles } from "../src/lint.ts";

const fx = (n: string) => JSON.parse(readFileSync(new URL(`./fixtures/ffr/${n}`, import.meta.url), "utf8"));
const ffr = fx("ffr.json");
const built = buildResearch();
const out = JSON.parse(built.files["ui/ffr.json"]!);

const KEYS = ["tab_toggle", "tabs_toggle", "item_toggle", "item_chosen", "lazy_detail", "progress_button@common.button", "pager_row", "pagers_tabs", "list_slot@ffr.slot_view", "text_item", "root"];

describe("research screen", () => {
  it("test_keys_equal_fixture", () => {
    for (const k of KEYS) {
      expect(out[k], k).toEqual(ffr[k]);
      expect(JSON.stringify(out[k]), k).toBe(JSON.stringify(ffr[k]));
    }
    const router = structuredClone(ffr.screen_router);
    const keep = ["ea", "eb", "fa", "fb"];
    router.factory.control_ids = Object.fromEntries(keep.map((i) => [i, router.factory.control_ids[i]]));
    router.property_bag = Object.fromEntries(keep.map((i) => [`#ffr:${i[0]!.toUpperCase()}${i[1]}`, [i]]));
    expect(out.screen_router).toEqual(router);
  });

  it("whole file equals FFR minus dropped routes, same key order", () => {
    const keys = Object.keys(out).filter((k) => k !== "screen_router");
    const want = Object.keys(ffr).filter((k) => k !== "screen_router" && !/^research_(?!e[ab]|f[ab])/.test(k));
    expect(keys).toEqual(want);
  });

  it("test_server_form_hook", () => {
    expect(JSON.parse(built.files["ui/server_form.json"]!)).toEqual(fx("server_form.json"));
  });

  it("test_lint_clean", () => {
    const files = Object.fromEntries(Object.entries(built.files).map(([k, v]) => [k, JSON.parse(v)]));
    const d = lintFiles(files, { routedRoots: ["ffr.research_ea", "ffr.research_eb", "ffr.research_fa", "ffr.research_fb"] });
    expect(d.filter((x) => x.level === "error")).toEqual([]);
  });

  it("test_decode", () => {
    expect(built.layout.total).toBe(2022);
    expect(decode(built.layout, 99)).toEqual({ name: "pager0", index: 1 });
    expect(decode(built.layout, 121)).toEqual({ name: "detail", index: 0, field: "progress" });
  });

  it("ui_defs lists ffr and ffr_items only", () => {
    expect(JSON.parse(built.files["ui/_ui_defs.json"]!)).toEqual({ ui_defs: ["ui/ffr.json", "ui/ffr_items.json"] });
  });

  it("test_build_writes", () => {
    const dir = mkdtempSync(join(tmpdir(), "jur-"));
    try {
      execFileSync("npx", ["tsx", "examples/research/build.ts", dir], { cwd: new URL("..", import.meta.url).pathname });
      for (const f of ["rp/ui/ffr.json", "rp/ui/ffr_items.json", "rp/ui/server_form.json", "rp/ui/_ui_defs.json", "bp/scripts/layout.js"])
        expect(existsSync(join(dir, f)), f).toBe(true);
      expect(readFileSync(join(dir, "rp/ui/ffr.json"), "utf8")).toBe(built.files["ui/ffr.json"]);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  }, 30000);
});
