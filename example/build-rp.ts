// 예시 리소스 팩 빌드: 8개 화면을 하나의 `jur:` 라우터와 server_form 훅 하나로 묶는다.
// 사용: tsx example/build-rp.ts [출력 폴더]  ->  <출력>/rp/ui/*.json, <출력>/layouts.json
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createPack, type Pack } from "../src/pack.ts";
import { createSlots, type Slots, type SlotLayout } from "../src/slots.ts";
import { ScreenRouter } from "../src/components/router.tsx";
import { render, toBody } from "../src/render.ts";
import { defineResearch, defineServerForm, createResearchSlots } from "../examples/research/screen.tsx";
import { EXAMPLES, TITLE_BYTES, TITLE_PREFIX } from "./catalog.ts";
import { defineCommon } from "./screens/common.tsx";
import { defineRouter } from "./screens/router.tsx";
import { defineTabsInside } from "./screens/tabs-inside.tsx";
import { defineTabsFollow } from "./screens/tabs-follow.tsx";
import { defineTabsLazy } from "./screens/tabs-lazy.tsx";
import { defineSlotGrid } from "./screens/slot-grid.tsx";
import { defineVirtualList500 } from "./screens/virtual-list-500.tsx";
import { defineVirtualList2000 } from "./screens/virtual-list-2000.tsx";

/** 화면별 정의 함수. 반환값은 라우터가 연결할 컨트롤 참조. */
const SCREENS: Record<string, (pack: Pack, slots: Slots) => string> = {
  "router": defineRouter,
  "tabs-inside": defineTabsInside,
  "tabs-follow": defineTabsFollow,
  "tabs-lazy": defineTabsLazy,
  "slot-grid": defineSlotGrid,
  "virtual-list-500": defineVirtualList500,
  "virtual-list-2000": defineVirtualList2000,
};

export function buildExamples(): { files: Record<string, string>; layouts: Record<string, SlotLayout> } {
  const pack = createPack();
  const layouts: Record<string, SlotLayout> = {};
  const controls: Record<string, string> = {};
  defineCommon(pack);

  // research는 examples/research의 정의를 재사용하고 라우터만 이쪽에 맡긴다.
  const researchSlots = createResearchSlots();
  defineResearch(pack, researchSlots, { routePrefix: TITLE_PREFIX, router: false });
  controls["research"] = "ffr.research_ea";
  layouts["research"] = researchSlots.layout();

  for (const ex of EXAMPLES) {
    const define = SCREENS[ex.id];
    if (!define) continue;
    const slots = createSlots();
    controls[ex.id] = define(pack, slots);
    layouts[ex.id] = slots.layout();
    if (layouts[ex.id]!.total !== ex.buttons) {
      throw new Error(`예시 "${ex.id}": 버튼 수 ${layouts[ex.id]!.total} != 카탈로그 ${ex.buttons}`);
    }
  }
  if (layouts["research"]!.total !== EXAMPLES.find((e) => e.id === "research")!.buttons) {
    throw new Error("예시 \"research\": 버튼 수가 카탈로그와 다릅니다");
  }

  const routes = EXAMPLES.map((ex) => {
    if (Buffer.byteLength(ex.title, "utf8") !== TITLE_BYTES) throw new Error(`제목 "${ex.title}"은 ${TITLE_BYTES}바이트여야 합니다`);
    return { title: ex.title, id: ex.title.slice(TITLE_PREFIX.length), control: controls[ex.id]! };
  });
  // ffr.root가 `ffr.screen_router`를 가리키므로 이름은 그대로 두고 경로만 jur 제목으로 건다.
  const [router] = render(ScreenRouter({ name: "screen_router", factory: "jur_screen", prefixBytes: TITLE_BYTES, routes }));
  pack.ns("ffr", "ffr.json").define("screen_router", toBody(router!));

  defineServerForm(pack, TITLE_PREFIX);
  return { files: pack.files(), layouts };
}

export function buildExampleRp(outDir: string): { files: string[]; layouts: Record<string, SlotLayout> } {
  const { files, layouts } = buildExamples();
  const written: string[] = [];
  const write = (rel: string, text: string): void => {
    const path = join(outDir, rel);
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, text, "utf8");
    written.push(path);
  };
  for (const [file, text] of Object.entries(files)) write(join("rp", file), text);
  write("layouts.json", JSON.stringify(layouts, null, 2) + "\n");
  return { files: written, layouts };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const out = process.argv[2] ?? join(dirname(fileURLToPath(import.meta.url)), "..", "out", "example");
  for (const f of buildExampleRp(out).files) console.log(`쓰기: ${f}`);
}
