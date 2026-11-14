// json-ui-react 문서 사이트 설정 (Docusaurus 3, 한국어, 블로그 없음)
import { themes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
export default {
  title: "json-ui-react",
  tagline: "TSX로 쓴 배드락 서버 폼 화면을 빌드 시점에 JSON UI로 컴파일",
  url: "https://presentkim.github.io",
  baseUrl: "/json-ui-react/",
  onBrokenLinks: "throw",
  markdown: { hooks: { onBrokenMarkdownLinks: "throw" } },
  i18n: { defaultLocale: "ko", locales: ["ko"] },
  presets: [
    [
      "classic",
      {
        docs: { routeBasePath: "/", sidebarPath: "./sidebars.cjs" },
        blog: false,
        theme: { customCss: "./src/css/custom.css" },
      },
    ],
  ],
  themeConfig: {
    navbar: { title: "json-ui-react", items: [{ type: "custom-addonDownload", position: "right" }, { type: "custom-githubLink", position: "right" }] },
    prism: { theme: themes.github, darkTheme: themes.dracula },
    colorMode: { respectPrefersColorScheme: true },
  },
};
