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
    const list = JSON.parse(main.match(/^const EXAMPLES = (\[.*\]);$/m)![1]!);
    expect(list).toEqual(ids);
    for (const e of EXAMPLES) {
      // 폼 제목과 버튼 수는 생성 모듈(TITLES, LAYOUTS)에서 온다.
      expect(built.titles[e.id], e.id).toBe(e.title);
      expect(built.layouts[e.id]!.total, e.id).toBe(e.buttons);
      expect(built.serverModule).toContain(`"${e.id}": "${e.title}"`);
      expect(e.summary.length).toBeGreaterThan(0);
      expect(e.components.length).toBeGreaterThan(0);
      expect(e).not.toHaveProperty("level"); // 모두 고수준(F-HL-3)
    }
  });

  it("test_titles_match_router", () => {
    const router = (parsed["ui/jur.json"]!.screen_router as any);
    const bag = router.property_bag as Record<string, string[]>;
    for (const e of EXAMPLES) {
      expect(Buffer.byteLength(e.title)).toBe(6);
      expect(bag[`#${e.title}`], e.title).toEqual([e.title.slice(4)]);
      const id = e.title.slice(4);
      expect(router.factory.control_ids[id]).toMatch(/^@jur\./);
    }
    expect(Object.keys(bag)).toHaveLength(EXAMPLES.length);
    expect(router.bindings[1].source_property_name).toBe("('#' + ('%.6s' * #title_text))");
  });

  it("test_one_router", () => {
    const sf = parsed["ui/server_form.json"]!;
    expect(sf.third_party_server_screen).toEqual({ $screen_content: "jur.root" });
    const root = JSON.stringify(parsed["ui/jur.json"]!.root);
    expect(root).toContain("'%.4s' * #title_text) = 'jur:'");
    expect(root).toContain("jur.screen_router");
    const routers = Object.values(parsed).flatMap((f) => Object.keys(f).filter((k) => Object.keys((f[k] as any)?.property_bag ?? {}).some((b) => b.startsWith("#jur:"))));
    expect(routers).toEqual(["screen_router"]);
    // research도 고수준 화면: 라우트가 jur 창 정의를 가리킨다.
    expect((parsed["ui/jur.json"]!.screen_router as any).factory.control_ids.re).toBe("@jur.re");
    expect(built.files["ui/_ui_defs.json"]).not.toContain("server_form");
  });

  it("고수준 예시 소스에는 저수준 이름(slots, ref, ns, define, TOP_LEFT, $ 변수)이 없다", () => {
    for (const f of ["router", "tabs-inside", "tabs-follow", "tabs-lazy", "slot-grid", "virtual-list-500", "virtual-list-2000", "virtual-list", "research"]) {
      const code = readFileSync(new URL(`../example/screens/${f}.tsx`, import.meta.url), "utf8")
        .split("\n").filter((l) => !l.trim().startsWith("//")).join("\n");
      expect(code, f).toMatch(/from "json-ui-react"|from "\.\/virtual-list\.tsx"/);
      expect(code, f).not.toMatch(/\b(slots|createSlots|ref|ns|define|TOP_LEFT|createPack)\b|\$[a-z_]/);
      // research는 사용자 정의 상세(ItemDetail)까지 한 파일에 둔다(30~60줄).
      expect(code.split("\n").length, f).toBeLessThanOrEqual(f === "research" ? 60 : 25);
    }
  });

  it("test_lint_clean", () => {
    const d = lintFiles(parsed, { routedRoots: ["jur.root"] });
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
    expect(existsSync(join(dir, "rp/textures/ui/jur/button.png"))).toBe(true);
    expect(readFileSync(join(dir, "bp/scripts/generated/screens.js"), "utf8")).toBe(built.serverModule);
    expect(r.files.length).toBeGreaterThan(4);
    expect(Object.keys(r.layouts)).toEqual(expect.arrayContaining(EXAMPLES.map((e) => e.id)));
  });
});
