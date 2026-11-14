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
// 시작 페이지("")를 뺀 문서 주소(locale 접두 없음). 문서 원본은 site/docs/<주소>.mdx와 site/i18n/en/.../current/<주소>.mdx.
const DOC_PAGES = [
  "basics/intro", "basics/getting-started", "basics/quick-start",
  ...IDS.map((id) => `components/${id}`), "components/custom-component",
  "reference/api", "reference/server-module", "reference/low-level", "reference/sources", "reference/license",
];
const DOC_ROOTS = { ko: join(ROOT, "site", "docs"), en: join(ROOT, "site", "i18n", "en", "docusaurus-plugin-content-docs", "current") };
// 머리말의 sources 목록(YAML "sources:" 아래 "  - id" 줄).
const sourcesOf = (mdx: string): string[] => {
  const fm = /^---\n([\s\S]*?)\n---\n/.exec(mdx)?.[1] ?? "";
  const block = /^sources:\n((?:  - .+\n?)+)/m.exec(fm)?.[1] ?? "";
  return block.split("\n").filter(Boolean).map((l) => l.replace(/^  - /, "").trim());
};

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
    for (const page of ["components/router", "basics/getting-started"]) {
      const doc = readFileSync(join(BUILD, page, "index.html"), "utf8");
      const article = /<article[\s\S]*?<\/article>/.exec(doc)![0];
      expect(article).not.toContain(".mcaddon\"");
      expect(article).not.toContain("내려받기 v");
    }
  });
  it("test_component_pages_jsx_and_run_section", () => {
    const files: Record<string, string> = {
      router: "router.tsx", "tabs-inside": "tabs-inside.tsx", "tabs-follow": "tabs-follow.tsx", "tabs-lazy": "tabs-lazy.tsx",
      "slot-grid": "slot-grid.tsx", "virtual-list-500": "virtual-list-500.tsx", "virtual-list-2000": "virtual-list-2000.tsx", research: "research.tsx",
    };
    for (const [id, tsx] of Object.entries(files)) {
      // 순서는 본문(article)에서 본다. 머리(<head>)의 description에도 "낮춤 결과"가 나온다.
      const html = /<article[\s\S]*?<\/article>/.exec(readFileSync(join(BUILD, "components", id, "index.html"), "utf8"))![0];
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
    // research는 고수준 예제다: 저수준 고급 예시 머리말이 없고, SelectGrid와 사용자 정의 ItemDetail, 서버 데이터, 동치 테스트를 보인다.
    for (const [prefix, words, gone] of [
      ["", ["<SelectGrid", "ItemDetail", "<Tabs", "<Pager", "openScreen", "출력 동치 테스트", "research-high.test.tsx", "펼친 트리"], ["저수준 고급 예시", "lowLevel", "createResearchSlots", "ffr."]],
      ["en", ["<SelectGrid", "ItemDetail", "<Tabs", "<Pager", "openScreen", "Output equivalence test", "research-high.test.tsx", "expanded trees"], ["Advanced example using the low-level API", "lowLevel", "createResearchSlots", "ffr."]],
    ] as const) {
      const text = textOf(/<article[\s\S]*?<\/article>/.exec(readFileSync(join(BUILD, prefix, "components", "research", "index.html"), "utf8"))![0]);
      for (const w of words) expect(text, `${prefix || "ko"}: ${w}`).toContain(w);
      for (const w of gone) expect(text, `${prefix || "ko"}: ${w}`).not.toContain(w);
    }
    // 고수준 예시 페이지에는 삭제된 common.tsx 참조가 없다.
    for (const id of IDS) {
      expect(readFileSync(join(BUILD, "components", id, "index.html"), "utf8")).not.toContain("common.tsx");
    }
  });
  it("test_api_reference_split_into_three_pages", () => {
    // API 레퍼런스는 참고 자료 안의 세 페이지다: 1부 고수준(reference/api), 2부 생성 서버 모듈, 3부 저수준.
    for (const [prefix, parts] of [
      ["", ["1부: 고수준 API", "2부: 생성 서버 모듈", "3부: 직접 가공하기: 저수준 API"]],
      ["en", ["Part 1: High-level API", "Part 2: Generated server module", "Part 3: Working with it yourself: the low-level API"]],
    ] as const) {
      const pages = ["reference/api", "reference/server-module", "reference/low-level"].map((p) => {
        const html = readFileSync(join(BUILD, prefix, p, "index.html"), "utf8");
        return { html, text: textOf(/<article[\s\S]*?<\/article>/.exec(html)![0]) };
      });
      pages.forEach(({ text }, i) => expect(text, `${prefix || "ko"}: ${parts[i]}`).toContain(parts[i]!));
      // 1부가 2부·3부 페이지로 잇는다.
      const base = prefix ? `/json-ui-react/${prefix}/` : "/json-ui-react/";
      expect(pages[0]!.html).toContain(`href="${base}reference/server-module"`);
      expect(pages[0]!.html).toContain(`href="${base}reference/low-level"`);
      const all = pages.map((p) => p.text).join("\n");
      for (const word of ["buildScreens", "openScreen", "<ButtonList", "LowSlotGrid", "createPack"]) expect(all, word).toContain(word);
      expect(pages[0]!.text).toContain("<ButtonList");
      expect(pages[1]!.text).toContain("openScreen(player, id, data?)");
      expect(pages[2]!.text).toContain("LowSlotGrid");
    }
  });
  it("test_api_page_lists_record_components", () => {
    const names = ["SelectGrid", "DetailPanel", "IconTitle", "TextBlock", "IconRow", "Spacer", "ActionButton", "Pager", "Placeholder"];
    for (const [prefix, server] of [["", "레코드형 데이터"], ["en", "Record data"]] as const) {
      const high = textOf(/<article[\s\S]*?<\/article>/.exec(readFileSync(join(BUILD, prefix, "reference", "api", "index.html"), "utf8"))![0]);
      for (const n of names) expect(high, `${prefix || "ko"}: <${n}`).toContain(`<${n}`);
      // 레코드형 데이터 절은 2부(생성 서버 모듈) 페이지에 있고, 3부에는 없다.
      const html = readFileSync(join(BUILD, prefix, "reference", "server-module", "index.html"), "utf8");
      expect(textOf(/<article[\s\S]*?<\/article>/.exec(html)![0]), prefix || "ko").toContain(server);
      expect(html).toContain('id="records"');
      const low = readFileSync(join(BUILD, prefix, "reference", "low-level", "index.html"), "utf8");
      expect(low).not.toContain('id="records"');
    }
  });
  it("test_custom_component_page", () => {
    for (const [prefix, title, words] of [
      ["", "컴포넌트 직접 만들기", ["IconRow", "createSlots", "createPack", "collection_index", "src/high/record.tsx", "export function IconRow"]],
      ["en", "Building your own component", ["IconRow", "createSlots", "createPack", "collection_index", "src/high/record.tsx", "export function IconRow"]],
    ] as const) {
      const file = join(BUILD, prefix, "components", "custom-component", "index.html");
      expect(existsSync(file), prefix || "ko").toBe(true);
      const html = readFileSync(file, "utf8");
      const text = textOf(/<article[\s\S]*?<\/article>/.exec(html)![0]);
      expect(text).toContain(title);
      for (const w of words) expect(text, `${prefix || "ko"}: ${w}`).toContain(w);
      // 사이드바에서 컴포넌트 분류의 마지막, 참고 자료(API) 분류 앞에 온다.
      const side = /<nav aria-label="[^"]*"[^>]*class="menu [\s\S]*?<\/nav>/.exec(html);
      expect(side, `${prefix || "ko"}: sidebar`).not.toBeNull();
      // 사이드바 글자 순서: 컴포넌트 분류 -> 연구 화면 -> 이 페이지 -> 참고 자료 분류.
      const sideText = textOf(side![0]);
      const [cat, api] = prefix ? ["Components", "Reference"] : ["컴포넌트", "참고 자료"];
      const research = prefix ? "Research screen" : "연구 화면";
      expect(sideText.indexOf(research), `${prefix || "ko"}: ${research}`).toBeGreaterThan(sideText.indexOf(cat));
      expect(sideText.indexOf(title), `${prefix || "ko"}: after ${research}`).toBeGreaterThan(sideText.indexOf(research));
      expect(sideText.indexOf(cat), `${prefix || "ko"}: ${cat}`).toBeGreaterThanOrEqual(0);
      expect(sideText.indexOf(title), `${prefix || "ko"}: ${title}`).toBeGreaterThan(sideText.indexOf(cat));
      expect(sideText.indexOf(api), `${prefix || "ko"}: ${api}`).toBeGreaterThan(sideText.indexOf(title));
    }
  });
  it("test_quick_start_is_high_level", () => {
    for (const [prefix, quick] of [["", "빠른 시작"], ["en", "Quick start"]] as const) {
      const html = readFileSync(join(BUILD, prefix, "basics", "quick-start", "index.html"), "utf8");
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
    for (const page of ["basics/intro", "basics/getting-started", "basics/quick-start", "components/custom-component", "reference/api", "reference/server-module", "reference/low-level", "reference/sources", "reference/license"]) {
      expect(existsSync(join(BUILD, "en", page, "index.html")), page).toBe(true);
    }
    const html = readFileSync(join(BUILD, "en", "components", "router", "index.html"), "utf8");
    expect(html).toContain('<html lang="en"');
    const article = /<article[\s\S]*?<\/article>/.exec(html)![0];
    expect(article).toContain("Writing it in JSX");
    expect(article.indexOf("Writing it in JSX")).toBeLessThan(article.indexOf("Lowered result"));
    expect(readFileSync(join(BUILD, "index.html"), "utf8")).toContain('<html lang="ko"');
  });
  it("test_en_article_has_no_hangul", () => {
    const pages = ["", ...DOC_PAGES];
    for (const page of pages) {
      const html = readFileSync(join(BUILD, "en", page, "index.html"), "utf8");
      let article = /<article[\s\S]*?<\/article>/.exec(html)![0];
      // 코드 블록(생성 소스와 JSON 발췌의 한글 주석)과 사진 태그(한국어 파일명)는 예외다.
      article = article.replace(/<pre[\s\S]*?<\/pre>/g, "").replace(/<img[^>]*>/g, "");
      expect(article.match(/[가-힣]+/g), page).toBeNull();
    }
    const gs = readFileSync(join(BUILD, "en", "basics", "getting-started", "index.html"), "utf8");
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
  it("test_every_doc_has_frontmatter_sources", () => {
    // 위키 형식: 모든 문서(ko, en)에 title, description, sidebar_position, sources 머리말이 있고, sources는 레지스트리 id다.
    const registry = JSON.parse(readFileSync(join(ROOT, "site", "src", "data", "sources.json"), "utf8")) as Record<string, unknown>;
    for (const [loc, root] of Object.entries(DOC_ROOTS)) {
      for (const page of ["index", ...DOC_PAGES]) {
        const mdx = readFileSync(join(root, `${page}.mdx`), "utf8");
        const fm = /^---\n([\s\S]*?)\n---\n/.exec(mdx)![1]!;
        for (const key of ["title", "description", "sidebar_position"]) expect(fm, `${loc}/${page}: ${key}`).toMatch(new RegExp(`^${key}: `, "m"));
        const ids = sourcesOf(mdx);
        expect(ids.length, `${loc}/${page}: sources`).toBeGreaterThan(0);
        for (const id of ids) expect(registry[id], `${loc}/${page}: ${id}`).toBeDefined();
      }
    }
  });
  it("test_footer_sources_table_on_every_page", () => {
    // 페이지 하단(article 안) 출처 표: 머리말 sources의 id마다 한 줄, 언어별 머리글.
    for (const [loc, prefix, caption] of [["ko", "", "출처"], ["en", "en", "Sources"]] as const) {
      for (const page of ["", ...DOC_PAGES]) {
        const html = readFileSync(join(BUILD, prefix, page, "index.html"), "utf8");
        const article = /<article[\s\S]*?<\/article>/.exec(html)![0];
        const table = /<table class="sources-table">[\s\S]*?<\/table>/.exec(article);
        expect(table, `${loc}/${page}`).not.toBeNull();
        expect(table![0]).toContain(`<caption>${caption}</caption>`);
        const ids = sourcesOf(readFileSync(join(DOC_ROOTS[loc], `${page || "index"}.mdx`), "utf8"));
        const rows = [...table![0].matchAll(/<tr><td><code>([^<]+)<\/code><\/td>/g)].map((m) => m[1]);
        expect(rows, `${loc}/${page}`).toEqual(ids);
      }
    }
    // 컴포넌트 페이지는 이 저장소와 bedrock-research 위키를 출처로 둔다.
    const router = readFileSync(join(BUILD, "components", "router", "index.html"), "utf8");
    expect(router).toContain('<a href="https://github.com/PresentKim/bedrock-research">');
    expect(router).toContain('<a href="https://github.com/PresentKim/json-ui-react">');
  });
  it("test_sources_page_generated", () => {
    // 출처 목록은 레지스트리에서 빌드 전에 만들어지고, 레지스트리의 모든 id를 두 언어로 보인다.
    const registry = JSON.parse(readFileSync(join(ROOT, "site", "src", "data", "sources.json"), "utf8")) as Record<string, unknown>;
    for (const [prefix, title, root] of [["", "출처 목록", DOC_ROOTS.ko], ["en", "Sources", DOC_ROOTS.en]] as const) {
      const mdx = readFileSync(join(root, "reference", "sources.mdx"), "utf8");
      expect(mdx).toContain("site/scripts/gen-sources-page.mjs");
      const text = textOf(/<article[\s\S]*?<\/article>/.exec(readFileSync(join(BUILD, prefix, "reference", "sources", "index.html"), "utf8"))![0]);
      expect(text).toContain(title);
      for (const id of Object.keys(registry)) expect(text, `${prefix || "ko"}: ${id}`).toContain(id);
    }
  });
  it("test_search_index_generated", () => {
    // 로컬 검색(@easyops-cn/docusaurus-search-local): 언어마다 색인이 있고 상단바에 검색 상자가 있다.
    for (const [prefix, word, label] of [["", "빠른 시작", "검색"], ["en", "Quick start", "Search"]] as const) {
      const index = join(BUILD, prefix, "search-index.json");
      expect(existsSync(index), prefix || "ko").toBe(true);
      const json = readFileSync(index, "utf8");
      expect(json, prefix || "ko").toContain(word);
      expect(json).toContain("openScreen");
      const nav = /<nav[\s\S]*?<\/nav>/.exec(readFileSync(join(BUILD, prefix, "index.html"), "utf8"))![0];
      expect(nav).toContain("navbar__search-input");
      expect(nav).toContain(`placeholder="${label}"`);
    }
    // 996px 이하에서 검색 상자가 absolute로 언어 아이콘을 덮지 않고 아이콘 줄 끝에 놓인다.
    const css = readdirSync(join(BUILD, "assets", "css")).map((f) => readFileSync(join(BUILD, "assets", "css", f), "utf8")).join("\n");
    expect(css).toContain(".navbar__items--right [class^=navbarSearchContainer]{margin-left:.25rem;position:static}");
  });
  it("test_old_urls_redirect", () => {
    // 폴더 재구성 전 주소는 새 주소로 보낸다(두 언어).
    for (const prefix of ["", "en/"]) {
      for (const [from, to] of [["getting-started", "basics/getting-started"], ["custom-component", "components/custom-component"], ["api", "reference/api"]]) {
        const html = readFileSync(join(BUILD, prefix, from, "index.html"), "utf8");
        expect(html, `${prefix}${from}`).toContain(`url=/json-ui-react/${prefix}${to}"`);
        expect(existsSync(join(BUILD, prefix, to, "index.html"))).toBe(true);
      }
    }
  });
  it("test_html_has_no_nul_bytes", () => {
    // React 18 SSR이 한글 사이에 끼우는 NUL 바이트는 빌드 뒤 지운다(site/src/plugins/strip-nul-bytes.mjs).
    for (const prefix of ["", "en"]) {
      for (const page of ["", ...DOC_PAGES]) {
        expect(readFileSync(join(BUILD, prefix, page, "index.html")).includes(0), `${prefix}/${page}`).toBe(false);
      }
    }
  });
  it("test_intro_credits_bedrock_research", () => {
    // 시작 페이지와 소개(ko, en)는 bedrock-research 위키를 기반으로 밝히고, 비공개 저장소 이름은 쓰지 않는다.
    for (const prefix of ["", "en"]) {
      for (const page of ["", "basics/intro"]) {
        const article = /<article[\s\S]*?<\/article>/.exec(readFileSync(join(BUILD, prefix, page, "index.html"), "utf8"))![0];
        expect(article, `${prefix}/${page}`).toContain('href="https://github.com/PresentKim/bedrock-research"');
        expect(article).toContain("COL-50");
        expect(article).toContain("server-form-research-screen.mdx");
        // 공개 출처는 bedrock-research 하나: github.com/PresentKim/ 아래 다른 저장소 링크가 없어야 한다.
        const repos = [...article.matchAll(/github\.com\/PresentKim\/([\w.-]+)/g)].map((m) => m[1]);
        expect(repos.every((r) => r === "bedrock-research" || r === "json-ui-react"), repos.join(",")).toBe(true);
        expect(article).not.toContain("rules.json");
      }
    }
  });
});
