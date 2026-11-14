// 느린 테스트: `npm run site:build`로 만든 site/build를 검사한다. 없으면 먼저 빌드한다.
import { describe, expect, it, beforeAll } from "vitest";
import { execSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(__dirname, "..");
const BUILD = join(ROOT, "site", "build");
const HREF = "/json-ui-react/downloads/json-ui-react-examples.mcaddon";

beforeAll(() => {
  if (!existsSync(join(BUILD, "index.html"))) execSync("npm run site:build", { cwd: ROOT, stdio: "ignore" });
}, 300_000);

describe("site", () => {
  it("test_site_download_link", () => {
    const html = readFileSync(join(BUILD, "index.html"), "utf8");
    expect(html).toContain(`href="${HREF}"`);
    expect(existsSync(join(BUILD, "downloads", "json-ui-react-examples.mcaddon"))).toBe(true);
    const comp = readFileSync(join(BUILD, "components", "router", "index.html"), "utf8");
    expect(comp).toContain(`href="${HREF}"`);
  });
  it("test_photo_placeholder", () => {
    const html = readFileSync(join(BUILD, "components", "slot-grid", "index.html"), "utf8");
    expect(html).toContain("실측 사진 준비 중");
    expect(html).toContain("/scriptevent jur:open slot-grid");
  });
});
