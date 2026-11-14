// 느린 테스트: `npm run site:build`로 만든 site/build를 검사한다. 없으면 먼저 빌드한다.
import { describe, expect, it, beforeAll } from "vitest";
import { execSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(__dirname, "..");
const BUILD = join(ROOT, "site", "build");
const HREF_RE = /href="(\/json-ui-react\/downloads\/json-ui-react-examples-v\d+\.\d+\.\d+-(?:[0-9a-f]{7}|dev)\.mcaddon)"/;

// HTML에서 태그를 지우고 엔티티를 되돌린다(코드 블록의 `<Screen`은 토큰 태그로 쪼개져 있다).
const textOf = (html: string): string =>
  html.replace(/<[^>]*>/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&amp;/g, "&");
const IDS = ["router", "tabs-inside", "tabs-follow", "tabs-lazy", "slot-grid", "virtual-list-500", "virtual-list-2000", "research"];

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
  it("test_component_pages_high_level_and_server_open", () => {
    // 컴포넌트 페이지(ko, en)는 고수준 소스(<Screen)와 서버에서 여는 법(openScreen)을 보인다.
    for (const [prefix, server] of [["", "서버에서 열기"], ["en", "Opening it from the server"]] as const) {
      for (const id of IDS) {
        const html = readFileSync(join(BUILD, prefix, "components", id, "index.html"), "utf8");
        const text = textOf(/<article[\s\S]*?<\/article>/.exec(html)![0]);
        expect(text, `${prefix || "ko"}/${id}`).toContain("<Screen");
        expect(text, `${prefix || "ko"}/${id}`).toContain("openScreen");
        expect(text, `${prefix || "ko"}/${id}`).toContain(server);
      }
    }
    // research는 저수준 고급 예시임을 머리에 밝히고 lowLevel로 같은 팩에 올리는 법을 보인다.
    const ko = textOf(readFileSync(join(BUILD, "components", "research", "index.html"), "utf8"));
    expect(ko).toContain("저수준 고급 예시");
    expect(ko).toContain("lowLevel");
    const en = textOf(readFileSync(join(BUILD, "en", "components", "research", "index.html"), "utf8"));
    expect(en).toContain("Advanced example using the low-level API");
    expect(en).toContain("lowLevel");
    // 고수준 예시 페이지에는 삭제된 common.tsx 참조가 없다.
    for (const id of IDS) {
      expect(readFileSync(join(BUILD, "components", id, "index.html"), "utf8")).not.toContain("common.tsx");
    }
  });
  it("test_api_page_has_high_and_low_level_parts", () => {
    for (const [prefix, parts] of [
      ["", ["1부: 고수준 API", "2부: 생성 서버 모듈", "3부: 직접 가공하기: 저수준 API"]],
      ["en", ["Part 1: High-level API", "Part 2: Generated server module", "Part 3: Working with it yourself: the low-level API"]],
    ] as const) {
      const html = readFileSync(join(BUILD, prefix, "api", "index.html"), "utf8");
      const text = textOf(/<article[\s\S]*?<\/article>/.exec(html)![0]);
      for (const h of parts) expect(text, `${prefix || "ko"}: ${h}`).toContain(h);
      expect(text.indexOf(parts[0])).toBeLessThan(text.indexOf(parts[1]));
      expect(text.indexOf(parts[1])).toBeLessThan(text.indexOf(parts[2]));
      for (const word of ["buildScreens", "openScreen", "<ButtonList", "LowSlotGrid", "createPack"]) expect(text, word).toContain(word);
      // 이 페이지의 고수준 절 링크(#high, #low)가 실제 제목 id로 존재한다.
      for (const id of ["high", "server", "low"]) expect(html).toContain(`id="${id}"`);
    }
  });
  it("test_quick_start_is_high_level", () => {
    for (const [prefix, quick] of [["", "빠른 시작"], ["en", "Quick start"]] as const) {
      const html = readFileSync(join(BUILD, prefix, "getting-started", "index.html"), "utf8");
      const text = textOf(/<article[\s\S]*?<\/article>/.exec(html)![0]);
      expect(text).toContain(quick);
      for (const word of ["<Screen", "buildScreens", "openScreen", "scripts/generated/screens.js"]) expect(text, word).toContain(word);
    }
  });
  it("test_navbar_icons_visible_on_mobile", () => {
    const html = readFileSync(join(BUILD, "components", "router", "index.html"), "utf8");
    const nav = /<nav[\s\S]*?<\/nav>/.exec(html)![0];
    expect(nav).toContain("jur-navbar-icon");
    // 사이드바(모바일 메뉴)에는 중복 항목이 없다.
    expect(html.match(/aria-label="GitHub 저장소"/g)?.length).toBe(1);
    const css = readdirSync(join(BUILD, "assets", "css")).map((f) => readFileSync(join(BUILD, "assets", "css", f), "utf8")).join("\n");
    expect(css).toContain("@media (max-width:996px)");
    expect(css).toContain(".jur-navbar-icon,.jur-navbar-icon-wrap{display:inline-flex!important}");
    expect(css).toContain("@media (max-width:480px)");
  });
  it("test_photo_placeholder", () => {
    // 사진이 없는 페이지는 자리표시를 보인다(photos.json에서 비어 있는 예시를 고른다).
    const photos = JSON.parse(readFileSync(join(BUILD, "..", "src", "photos.json"), "utf8")) as Record<string, string[]>;
    const empty = Object.keys(photos).find((id) => photos[id]!.length === 0);
    if (empty) {
      const html = readFileSync(join(BUILD, "components", empty, "index.html"), "utf8");
      expect(html).toContain("실측 사진 준비 중");
      expect(html).toContain(`/scriptevent jur:open ${empty}`);
    }
  });
  it("test_photos_rendered", () => {
    // 사진이 있는 페이지는 자리표시 대신 사진을 보이고, 파일이 빌드에 복사된다.
    const photos = JSON.parse(readFileSync(join(BUILD, "..", "src", "photos.json"), "utf8")) as Record<string, string[]>;
    for (const [id, files] of Object.entries(photos)) {
      if (files.length === 0) continue;
      const html = readFileSync(join(BUILD, "components", id, "index.html"), "utf8");
      expect(html).not.toContain("실측 사진 준비 중");
      for (const f of files) {
        expect(existsSync(join(BUILD, "img", "components", id, f))).toBe(true);
        expect(html.includes(f) || html.includes(encodeURIComponent(f))).toBe(true);
      }
    }
  });
  it("test_en_build_exists", () => {
    expect(existsSync(join(BUILD, "en", "index.html"))).toBe(true);
    for (const id of ["router", "tabs-inside", "tabs-follow", "tabs-lazy", "slot-grid", "virtual-list-500", "virtual-list-2000", "research"]) {
      expect(existsSync(join(BUILD, "en", "components", id, "index.html"))).toBe(true);
    }
    for (const page of ["api", "getting-started"]) expect(existsSync(join(BUILD, "en", page, "index.html"))).toBe(true);
    const html = readFileSync(join(BUILD, "en", "components", "router", "index.html"), "utf8");
    expect(html).toContain('<html lang="en"');
    expect(html).toContain("Writing it in JSX");
    expect(html.indexOf("Writing it in JSX")).toBeLessThan(html.indexOf("Lowered result"));
    expect(readFileSync(join(BUILD, "index.html"), "utf8")).toContain('<html lang="ko"');
  });
  it("test_en_article_has_no_hangul", () => {
    const pages = ["", "api", "getting-started", ...["router", "tabs-inside", "tabs-follow", "tabs-lazy", "slot-grid", "virtual-list-500", "virtual-list-2000", "research"].map((id) => `components/${id}`)];
    for (const page of pages) {
      const html = readFileSync(join(BUILD, "en", page, "index.html"), "utf8");
      let article = /<article[\s\S]*?<\/article>/.exec(html)![0];
      // 코드 블록(생성 소스와 JSON 발췌의 한글 주석)과 사진 태그(한국어 파일명)는 예외다.
      article = article.replace(/<pre[\s\S]*?<\/pre>/g, "").replace(/<img[^>]*>/g, "");
      expect(article.match(/[가-힣]+/g), page).toBeNull();
    }
    const gs = readFileSync(join(BUILD, "en", "getting-started", "index.html"), "utf8");
    expect(gs).toContain("json-ui-react Examples BP vX.Y.Z");
    const empty = readFileSync(join(BUILD, "en", "components", "router", "index.html"), "utf8");
    expect(empty).toContain("Field photos coming soon");
    expect(empty).toContain("Screen router");
  });
  it("test_ko_docs_quote_english_game_text", () => {
    const research = readFileSync(join(BUILD, "components", "research", "index.html"), "utf8");
    expect(research).toContain("Pick a research.");
    expect(research).toContain("Research screen");
    expect(research).not.toContain("연구를 고르세요");
    const slot = readFileSync(join(BUILD, "components", "slot-grid", "index.html"), "utf8");
    expect(slot).toContain("Pick a slot.");
    expect(slot).toContain("이전 버전(한국어 글자)");
  });
  it("test_navbar_download_github_locale_in_both_locales", () => {
    for (const [prefix, lang, dl, gh, loc, other] of [
      ["", "ko", "통합 테스트 애드온 다운로드", "GitHub 저장소", "언어 선택", "/json-ui-react/en/"],
      ["en", "en", "Download integration test add-on", "GitHub repository", "Language", "/json-ui-react/"],
    ] as const) {
      for (const page of ["", "components/router"]) {
        const html = readFileSync(join(BUILD, prefix, page, "index.html"), "utf8");
        const nav = /<nav[\s\S]*?<\/nav>/.exec(html)![0];
        expect(nav).toContain(`aria-label="${dl}"`);
        expect(nav).toContain(`aria-label="${gh}"`);
        expect(nav).toContain('href="https://github.com/PresentKim/json-ui-react"');
        // 언어 메뉴는 글자 없이 아이콘 버튼이다(다운로드·GitHub와 같은 jur-navbar-icon).
        expect(nav).toMatch(new RegExp(`<button[^>]*class="[^"]*jur-navbar-icon[^"]*"[^>]*aria-label="${loc}"|<button[^>]*aria-label="${loc}"[^>]*class="[^"]*jur-navbar-icon`));
        expect(nav).toContain(`title="${loc}"`);
        expect(nav).not.toContain("navbar__link");
        expect(nav).toContain('lang="ko"');
        expect(nav).toContain('lang="en"');
        expect(nav).toContain("한국어");
        expect(nav).toContain("English");
        if (page === "") expect(nav).toContain(`href="${other}"`);
        expect(html).toContain(`<html lang="${lang}"`);
        // 모바일(996px 이하)에서도 언어 전환이 상단바에 남는다.
        expect(html.match(/aria-label="GitHub (저장소|repository)"/g)?.length).toBe(1);
      }
    }
    const css = readdirSync(join(BUILD, "assets", "css")).map((f) => readFileSync(join(BUILD, "assets", "css", f), "utf8")).join("\n");
    expect(css).toContain(".jur-locale__menu");
    // en 다운로드 링크 파일이 en 빌드에 있다.
    const meta = JSON.parse(readFileSync(join(ROOT, "site", "src", "generated", "addon.json"), "utf8")) as { file: string };
    expect(existsSync(join(BUILD, "en", "downloads", meta.file))).toBe(true);
    expect(readFileSync(join(BUILD, "en", "index.html"), "utf8")).toContain(`href="/json-ui-react/en/downloads/${meta.file}"`);
  });
});
