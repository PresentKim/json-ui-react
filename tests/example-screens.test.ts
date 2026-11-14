import { describe, it, expect } from "vitest";
import { readFileSync, mkdtempSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { EXAMPLES } from "../example/catalog.ts";
import { buildExamples, buildExampleRp } from "../example/build-rp.ts";
import { lintFiles } from "../src/lint.ts";
import type { JsonObject } from "../src/types.ts";

const built = buildExamples();
const parsed: Record<string, JsonObject> = Object.fromEntries(
  Object.entries(built.files).map(([f, t]) => [f, JSON.parse(t) as JsonObject]),
);
const main = readFileSync(new URL("../example/bp/scripts/main.js", import.meta.url), "utf8");

describe("example screens", () => {
  it("catalog equals main.js EXAMPLES", () => {
    const ids = JSON.parse(main.match(/^\/\/ @examples: (.*)$/m)![1]!);
    expect(EXAMPLES.map((e) => e.id)).toEqual(ids);
    const block = main.match(/const EXAMPLES = \{([\s\S]*?)\n\};/)![1]!;
    const js: Record<string, { title: string; buttons: number }> = {};
    for (const m of block.matchAll(/"([\w-]+)": \{ title: "([^"]+)", buttons: (\d+) \}/g)) {
      js[m[1]!] = { title: m[2]!, buttons: Number(m[3]) };
    }
    expect(Object.keys(js)).toHaveLength(EXAMPLES.length);
    for (const e of EXAMPLES) {
      expect(js[e.id], e.id).toEqual({ title: e.title, buttons: e.buttons });
      expect(e.summary.length).toBeGreaterThan(0);
      expect(e.components.length).toBeGreaterThan(0);
    }
  });

  it("test_titles_match_router", () => {
    const router = (parsed["ui/ffr.json"]!.screen_router as any);
    const bag = router.property_bag as Record<string, string[]>;
    for (const e of EXAMPLES) {
      expect(Buffer.byteLength(e.title)).toBe(6);
      expect(bag[`#${e.title}`], e.title).toEqual([e.title.slice(4)]);
      const id = e.title.slice(4);
      expect(router.factory.control_ids[id]).toMatch(/^@(jur|ffr)\./);
    }
    expect(Object.keys(bag)).toHaveLength(EXAMPLES.length);
    expect(router.bindings[1].source_property_name).toBe("('#' + ('%.6s' * #title_text))");
  });

  it("test_one_router", () => {
    const sf = parsed["ui/server_form.json"]!;
    expect(sf.third_party_server_screen).toEqual({ $screen_content: "ffr.root" });
    const root = JSON.stringify(parsed["ui/ffr.json"]!.root);
    expect(root).toContain("'%.4s' * #title_text) = 'jur:'");
    const routers = Object.values(parsed).flatMap((f) => Object.keys(f).filter((k) => Object.keys((f[k] as any)?.property_bag ?? {}).some((b) => b.startsWith("#jur:"))));
    expect(routers).toEqual(["screen_router"]);
    // research는 같은 라우터 아래: 라우트가 ffr.research_ea를 가리킨다.
    expect((parsed["ui/ffr.json"]!.screen_router as any).factory.control_ids.re).toBe("@ffr.research_ea");
    expect(built.files["ui/_ui_defs.json"]).not.toContain("server_form");
  });

  it("test_lint_clean", () => {
    const d = lintFiles(parsed, { routedRoots: ["ffr.root"] });
    expect(d.filter((x) => x.level === "error")).toEqual([]);
  });

  it("버튼 수와 레이아웃", () => {
    for (const e of EXAMPLES) expect(built.layouts[e.id]!.total, e.id).toBe(e.buttons);
  });

  it("결정적 출력과 파일 쓰기", () => {
    expect(buildExamples().files).toEqual(built.files);
    const dir = mkdtempSync(join(tmpdir(), "jur-"));
    const r = buildExampleRp(dir);
    expect(existsSync(join(dir, "rp/ui/jur.json"))).toBe(true);
    expect(r.files.length).toBeGreaterThan(4);
    expect(Object.keys(r.layouts)).toEqual(expect.arrayContaining(EXAMPLES.map((e) => e.id)));
  });
});
