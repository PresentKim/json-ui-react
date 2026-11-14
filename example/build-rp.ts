// 예시 팩 빌드: 고수준 화면 7개를 buildScreens로 묶고, 연구 화면(저수준 고급 예시)을 같은 라우터에 더한다.
// 사용: tsx example/build-rp.ts [출력 폴더]
//   -> <출력>/rp/ui/*.json, <출력>/rp/textures/ui/jur/*, <출력>/bp/scripts/generated/screens.js, <출력>/screens.d.ts, <출력>/layouts.json
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildScreens, themeTextures, type BuildScreensResult, type Pack, type SlotLayout } from "json-ui-react";
import { defineResearch, createResearchSlots } from "../examples/research/screen.tsx";
import { EXAMPLES, TITLE_PREFIX } from "./catalog.ts";
import router from "./screens/router.tsx";
import tabsInside from "./screens/tabs-inside.tsx";
import tabsFollow from "./screens/tabs-follow.tsx";
import tabsLazy from "./screens/tabs-lazy.tsx";
import slotGrid from "./screens/slot-grid.tsx";
import virtualList500 from "./screens/virtual-list-500.tsx";
import virtualList2000 from "./screens/virtual-list-2000.tsx";

export const SCREENS = [router, tabsInside, tabsFollow, tabsLazy, slotGrid, virtualList500, virtualList2000];

/** 정의 키(`이름` 또는 `이름@부모`)의 이름 부분. */
const baseName = (key: string): string => key.split("@")[0]!;

/**
 * 네임스페이스 ns에서 drop 정의를 빼고, 빠진 정의만 쓰던 정의도 차례로 뺀다.
 * 참조 판정: 팩 전체 JSON에 `ns.이름`(뒤에 이름 글자가 이어지지 않음)이 남아 있는지.
 */
export function pruneDefs(pack: Pack, ns: string, drop: string[]): string[] {
  const doc = pack.json(`${ns}.json`);
  const keyOf = (name: string): string | undefined => Object.keys(doc).find((k) => k !== "namespace" && baseName(k) === name);
  const mentions = (text: string, name: string): boolean => new RegExp(`${ns}\\.${name}(?![A-Za-z0-9_])`).test(text);
  const removed: string[] = [];
  let queue = [...drop];
  while (queue.length) {
    const bodies: string[] = [];
    for (const name of queue) {
      const k = keyOf(name);
      if (k === undefined) throw new Error(`pruneDefs: "${ns}.${name}" 정의가 없습니다`);
      bodies.push(JSON.stringify({ [k]: doc[k] }));
      delete doc[k];
      removed.push(name);
    }
    // 방금 뺀 정의가 가리키던 같은 네임스페이스 정의 중 이제 아무도 쓰지 않는 것
    const rest = Object.values(pack.files()).join("\n");
    queue = Object.keys(doc)
      .filter((k) => k !== "namespace")
      .map(baseName)
      .filter((name) => bodies.some((b) => mentions(b, name)) && !mentions(rest, name));
  }
  return removed;
}

export function buildExamples(): BuildScreensResult {
  const built = buildScreens(SCREENS, {
    namespace: "jur",
    prefix: TITLE_PREFIX,
    // 문서와 실측이 인용하는 1.2.0 제목(jur:ro 등)을 그대로 쓴다.
    codes: Object.fromEntries(EXAMPLES.map((e) => [e.id, e.title.slice(TITLE_PREFIX.length)])),
    // research는 examples/research의 정의를 그대로 쓰고 라우터만 이쪽에 맡긴다.
    lowLevel: (pack) => {
      const slots = createResearchSlots();
      defineResearch(pack, slots, {
        routePrefix: TITLE_PREFIX,
        router: false,
        // 통합 애드온은 게임 안 글자를 영어로 낸다(FFR 원본 글자는 examples/research 단독 빌드에서만).
        text: {
          placeholder: "Pick a research.",
          materials: "Required materials",
          rewards: "Reward recipes",
          title: "E: selection by toggle, 96 details prebuilt",
          titleLazy: "F: selection by toggle, details on select",
          listJ: "J: optimized list (factory builds whole scroll)",
          listK: "K: optimized list (hidden screen router)",
          listL: "L: optimized list (1-column stack factory)",
        },
      });
      // 통합 애드온에서는 jur.root가 루트다. 연구 화면의 ffr.root·list_gate(정의 없는 ffr.screen_router를 가리킴)와
      // 거기서만 쓰던 정의를 뺀다. examples/research 단독 빌드는 그대로 둔다.
      pruneDefs(pack, "ffr", ["root", "list_gate"]);
      return [{ id: "research", control: "ffr.research_ea", layout: slots.layout() }];
    },
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
