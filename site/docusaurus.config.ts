// json-ui-react 문서 사이트 설정 (Docusaurus 3, 한국어 기본 + 영어). bedrock-research 위키와 같은 골격이고,
// 사이트는 저장소 루트가 아니라 site/에 있다(루트는 라이브러리 패키지).
import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import remarkDoubleTildeOnly from "./src/plugins/remark-double-tilde-only.mjs";
import stripNulBytes from "./src/plugins/strip-nul-bytes.mjs";

const config: Config = {
  title: "json-ui-react",
  tagline: "TSX로 쓴 배드락 서버 폼 화면을 빌드 시점에 JSON UI로 컴파일",
  url: process.env.SITE_URL ?? "https://presentkim.github.io",
  baseUrl: process.env.BASE_URL ?? "/json-ui-react/",
  onBrokenLinks: "throw",
  onBrokenAnchors: "warn",
  markdown: { hooks: { onBrokenMarkdownLinks: "throw" } },
  i18n: {
    defaultLocale: "ko",
    locales: ["ko", "en"],
    localeConfigs: {
      ko: { label: "한국어", htmlLang: "ko" },
      en: { label: "English", htmlLang: "en" },
    },
  },
  presets: [
    [
      "classic",
      {
        docs: {
          path: "docs",
          routeBasePath: "/",
          sidebarPath: "./sidebars.ts",
          remarkPlugins: [remarkDoubleTildeOnly],
        },
        blog: false,
        pages: false,
        theme: { customCss: "./src/css/custom.css" },
      } satisfies Preset.Options,
    ],
  ],
  themes: [
    [
      "@easyops-cn/docusaurus-search-local",
      {
        hashed: true,
        language: ["ko", "en"],
        docsRouteBasePath: "/",
        indexBlog: false,
      },
    ],
  ],
  plugins: [
    // React 18 SSR이 한글 사이에 끼워 넣는 NUL 바이트를 빌드 뒤 HTML에서 지운다(플러그인 주석 참고).
    stripNulBytes,
    // 폴더 재구성 전 주소(1.4.0까지)를 새 주소로 보낸다.
    [
      "@docusaurus/plugin-client-redirects",
      {
        redirects: [
          { from: "/getting-started", to: "/basics/getting-started" },
          { from: "/custom-component", to: "/components/custom-component" },
          { from: "/api", to: "/reference/api" },
        ],
      },
    ],
  ],
  themeConfig: {
    navbar: {
      title: "json-ui-react",
      items: [
        { type: "custom-addonDownload", position: "right" },
        { type: "custom-githubLink", position: "right" },
        { type: "custom-localeSwitch", position: "right" },
      ],
    },
    footer: { style: "dark", copyright: "출처와 라이선스는 각 페이지 하단 표에 적는다." },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ["json", "bash", "diff", "typescript"],
    },
    colorMode: { respectPrefersColorScheme: true },
  } satisfies Preset.ThemeConfig,
};

export default config;
