// 예시 팩 빌드: 고수준 화면 8개(연구 화면 포함)를 buildScreens로 묶는다.
// 연구 화면의 저수준 재현 기록(FFR 원본 대조)은 examples/research 단독 빌드에 그대로 있다.
// 사용: tsx example/build-rp.ts [출력 폴더]
//   -> <출력>/rp/ui/*.json, <출력>/rp/textures/ui/jur/*, <출력>/bp/scripts/generated/screens.js, <출력>/screens.d.ts, <출력>/layouts.json
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildScreens, themeTextures, type BuildScreensResult, type SlotLayout } from "json-ui-react";
import { EXAMPLES, TITLE_PREFIX } from "./catalog.ts";
import router from "./screens/router.tsx";
import tabsInside from "./screens/tabs-inside.tsx";
import tabsFollow from "./screens/tabs-follow.tsx";
import tabsLazy from "./screens/tabs-lazy.tsx";
import slotGrid from "./screens/slot-grid.tsx";
import virtualList500 from "./screens/virtual-list-500.tsx";
import virtualList2000 from "./screens/virtual-list-2000.tsx";
import research from "./screens/research.tsx";

export const SCREENS = [router, tabsInside, tabsFollow, tabsLazy, slotGrid, virtualList500, virtualList2000, research];

export function buildExamples(): BuildScreensResult {
  const built = buildScreens(SCREENS, {
    namespace: "jur",
    prefix: TITLE_PREFIX,
    // 문서와 실측이 인용하는 1.2.0 제목(jur:ro 등)을 그대로 쓴다.
    codes: Object.fromEntries(EXAMPLES.map((e) => [e.id, e.title.slice(TITLE_PREFIX.length)])),
  });
  for (const ex of EXAMPLES) {
    const total = built.layouts[ex.id]?.total;
    if (total !== ex.buttons) throw new Error(`예시 "${ex.id}": 버튼 수 ${total} != 카탈로그 ${ex.buttons}`);
    if (built.titles[ex.id] !== ex.title) throw new Error(`예시 "${ex.id}": 제목 ${built.titles[ex.id]} != 카탈로그 ${ex.title}`);
  }
  return built;
}

export function buildExampleRp(outDir: string): { files: string[]; layouts: Record<string, SlotLayout> } {
  const built = buildExamples();
  const written: string[] = [];
  const write = (rel: string, data: string | Uint8Array): void => {
    const path = join(outDir, rel);
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, data);
    written.push(path);
  };
  for (const [file, text] of Object.entries(built.files)) write(join("rp", file), text);
  for (const [file, bytes] of Object.entries(themeTextures())) write(join("rp", file), bytes);
  write(join("bp", "scripts", "generated", "screens.js"), built.serverModule);
  write("screens.d.ts", built.serverTypes);
  write("layouts.json", JSON.stringify(built.layouts, null, 2) + "\n");
  return { files: written, layouts: built.layouts };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const out = process.argv[2] ?? join(dirname(fileURLToPath(import.meta.url)), "..", "out", "example");
  for (const f of buildExampleRp(out).files) console.log(`쓰기: ${f}`);
}
