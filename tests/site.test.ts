// 느린 테스트: `npm run site:build`로 만든 site/build를 검사한다. 없으면 먼저 빌드한다.
import { describe, expect, it, beforeAll } from "vitest";
import { execSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(__dirname, "..");
const BUILD = join(ROOT, "site", "build");
const HREF_RE = /href="(\/json-ui-react\/downloads\/json-ui-react-examples-v\d+\.\d+\.\d+-(?:[0-9a-f]{7}|dev)\.mcaddon)"/;

beforeAll(() => {
  if (!existsSync(join(BUILD, "index.html"))) execSync("npm run site:build", { cwd: ROOT, stdio: "ignore" });
}, 300_000);

describe("site", () => {
  it("test_site_download_link", () => {
    const html = readFileSync(join(BUILD, "index.html"), "utf8");
    const nav = /<nav[\s\S]*?<\/nav>/.exec(html)![0];
    expect(nav).toContain('aria-label="통합 테스트 애드온 다운로드"');
    expect(nav).toContain('href="https://github.com/PresentKim/json-ui-react"');
    expect(nav).toContain('aria-label="GitHub 저장소"');
    const m = HREF_RE.exec(html);
    expect(m).not.toBeNull();
    const href = m![1]!;
    expect(existsSync(join(BUILD, href.replace("/json-ui-react/", "")))).toBe(true);
    const meta = JSON.parse(readFileSync(join(ROOT, "site", "src", "generated", "addon.json"), "utf8")) as { label: string; file: string };
    expect(href.endsWith(`/${meta.file}`)).toBe(true);
    expect(html).toContain(meta.file);
    expect(nav).toContain("통합 테스트 애드온");
    expect(nav).toContain(meta.label);
    expect(nav).toContain(`download="${meta.file}"`);
    for (const page of ["components/router", "getting-started"]) {
      const doc = readFileSync(join(BUILD, page, "index.html"), "utf8");
      const article = /<article[\s\S]*?<\/article>/.exec(doc)![0];
      expect(article).not.toContain(".mcaddon\"");
      expect(article).not.toContain("내려받기 v");
    }
  });
  it("test_component_pages_jsx_and_run_section", () => {
    const files: Record<string, string> = {
      router: "router.tsx", "tabs-inside": "tabs-inside.tsx", "tabs-follow": "tabs-follow.tsx", "tabs-lazy": "tabs-lazy.tsx",
      "slot-grid": "slot-grid.tsx", "virtual-list-500": "virtual-list-500.tsx", "virtual-list-2000": "virtual-list-2000.tsx", research: "screen.tsx",
    };
    for (const [id, tsx] of Object.entries(files)) {
      const html = readFileSync(join(BUILD, "components", id, "index.html"), "utf8");
      expect(html).toContain("JSX로 쓰기");
      expect(html).toContain(tsx);
      expect(html.indexOf("JSX로 쓰기")).toBeLessThan(html.indexOf("낮춤 결과"));
      expect(html).toContain("통합 애드온에서 실행 방법");
      expect(html).not.toContain("게임에서 열기");
    }
  });
  it("test_photo_placeholder", () => {
    const html = readFileSync(join(BUILD, "components", "slot-grid", "index.html"), "utf8");
    expect(html).toContain("실측 사진 준비 중");
    expect(html).toContain("/scriptevent jur:open slot-grid");
  });
});
