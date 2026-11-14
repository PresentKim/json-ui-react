// F-HL-3 기준선: 고수준으로 옮기기 전(HEAD a430af4) 통합 애드온의 연구 화면.
// - legacyExamples(): example/build-rp.ts가 하던 그대로 examples/research의 저수준 정의를 lowLevel로 같은 팩에 올린다.
// - legacyResearchForm(): example/bp/scripts/main.js의 openResearch가 보내던 폼(버튼 번호를 직접 계산)을 그대로 옮겼다.
// 새 고수준 연구 화면은 이 두 결과와 비교한다(tests/regression/research-high.test.tsx).
import { buildScreens, type BuildScreensResult, type Pack } from "json-ui-react";
import { defineResearch, createResearchSlots } from "../../examples/research/screen.tsx";
import { EXAMPLES, TITLE_PREFIX } from "../../example/catalog.ts";

/** 정의 키(`이름` 또는 `이름@부모`)의 이름 부분. */
const baseName = (key: string): string => key.split("@")[0]!;

/** 네임스페이스 ns에서 drop 정의를 빼고, 빠진 정의만 쓰던 정의도 차례로 뺀다(HEAD example/build-rp.ts의 pruneDefs). */
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
    const rest = Object.values(pack.files()).join("\n");
    queue = Object.keys(doc)
      .filter((k) => k !== "namespace")
      .map(baseName)
      .filter((name) => bodies.some((b) => mentions(b, name)) && !mentions(rest, name));
  }
  return removed;
}

/** HEAD의 통합 빌드: 고수준 화면 screens + 저수준 연구 화면(ffr.research_ea, 영어 글자). */
export function legacyExamples(screens: unknown[]): BuildScreensResult {
  return buildScreens(screens as never[], {
    namespace: "jur",
    prefix: TITLE_PREFIX,
    codes: Object.fromEntries(EXAMPLES.map((e) => [e.id, e.title.slice(TITLE_PREFIX.length)])),
    lowLevel: (pack) => {
      const slots = createResearchSlots();
      defineResearch(pack, slots, {
        routePrefix: TITLE_PREFIX,
        router: false,
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
      pruneDefs(pack, "ffr", ["root", "list_gate"]);
      return [{ id: "research", control: "ffr.research_ea", layout: slots.layout() }];
    },
  });
}

// ---------------------------------------------------------------- HEAD main.js openResearch (그대로)

const RESEARCH_ITEMS = 96;
const PAGE_SIZE = 48;
const RESEARCH_PAGER = 98;
const RESEARCH_DETAIL = 102;
const RESEARCH_BLOCK = 20;
const MAX_MATS = 8;
const MAX_REWARDS = 8;
const EMPTY = "§0§e§r";
const ICONS = [
  "textures/items/diamond", "textures/items/apple", "textures/items/iron_ingot", "textures/items/gold_ingot", "textures/items/emerald",
  "textures/items/bread", "textures/items/redstone_dust", "textures/items/book_normal", "textures/items/hopper", "textures/items/coal",
];
const SENTENCES = [
  "Filters hopper input and sends it to the next chest.",
  "Work speed halves when power is low.",
  "Joining several blocks widens the range.",
  "Pauses briefly on a redstone signal.",
  "Speeds up with each part in the upgrade slot.",
];

function item(i: number) {
  const matCount = ((i * 5) % MAX_MATS) + 1;
  const rewardCount = ((i * 3) % 4) + 1;
  const sentences = (i % SENTENCES.length) + 1;
  return {
    name: `Item ${i + 1}`,
    icon: ICONS[i % ICONS.length]!,
    done: i % 3 === 0,
    desc: [`Description of Item ${i + 1}.`, ...SENTENCES.slice(0, sentences)].join(" "),
    mats: Array.from({ length: matCount }, (_, j) => [ICONS[(i + j + 2) % ICONS.length]!, ((i + j) % 16) + 1] as const),
    rewards: Array.from({ length: rewardCount }, (_, j) => ICONS[(i + j * 3) % ICONS.length]!),
  };
}

function tabItems(): number[][] {
  const tabs: number[][] = [[], []];
  for (let i = 0; i < RESEARCH_ITEMS; i++) tabs[item(i).done ? 1 : 0]!.push(i);
  return tabs;
}

export type LegacyButton = { text: string; icon?: string };

/** HEAD openResearch가 pages 상태로 보내던 버튼 목록(2022개). */
export function legacyResearchButtons(pages: [number, number]): LegacyButton[] {
  const out: LegacyButton[] = [];
  const button = (text: string, icon?: string): void => void out.push(icon === undefined ? { text } : { text, icon });
  const tabs = tabItems();
  const pageItems = [0, 1].map((t) => tabs[t]!.slice(pages[t]! * PAGE_SIZE, (pages[t]! + 1) * PAGE_SIZE));
  for (const list of pageItems) {
    for (let k = 0; k < PAGE_SIZE; k++) {
      const i = list[k];
      if (i === undefined) button("§r");
      else button("§r", item(i).icon);
    }
  }
  button(`Needed ${tabs[0]!.length}`, "textures/items/book_normal");
  button(`Done ${tabs[1]!.length}`, "textures/items/emerald");
  for (let k = 0; k < 4; k++) button("§r");
  for (const list of pageItems) {
    for (let k = 0; k < PAGE_SIZE; k++) {
      const i = list[k];
      if (i === undefined) {
        for (let f = 0; f < RESEARCH_BLOCK; f++) button(EMPTY);
        continue;
      }
      const it = item(i);
      button(`§c${it.name}`, it.icon);
      button(it.done ? "§aResearched" : "§cNeeds research");
      button(it.desc);
      for (let j = 0; j < MAX_MATS; j++) {
        const m = it.mats[j];
        if (m) button(`§f${m[1]}`, m[0]);
        else button(EMPTY);
      }
      for (let j = 0; j < MAX_REWARDS; j++) {
        const r = it.rewards[j];
        if (r) button("§f+1", r);
        else button(EMPTY);
      }
      button(it.done ? "Researched" : "Start research");
    }
  }
  return out;
}

/** HEAD openResearch의 응답 처리: 페이지 버튼이면 바뀐 pages, 진행 버튼이면 고른 항목 이름. */
export function legacyResearchPick(pages: [number, number], s: number): { pages?: [number, number]; requested?: string } {
  const tabs = tabItems();
  const pageItems = [0, 1].map((t) => tabs[t]!.slice(pages[t]! * PAGE_SIZE, (pages[t]! + 1) * PAGE_SIZE));
  if (s >= RESEARCH_PAGER && s < RESEARCH_DETAIL) {
    const tab = s < RESEARCH_PAGER + 2 ? 0 : 1;
    const last = Math.max(0, Math.ceil(tabs[tab]!.length / PAGE_SIZE) - 1);
    const step = s % 2 === 0 ? -1 : 1;
    const next: [number, number] = [...pages];
    next[tab] = Math.min(last, Math.max(0, pages[tab]! + step));
    return { pages: next };
  }
  if (s >= RESEARCH_DETAIL && (s - RESEARCH_DETAIL) % RESEARCH_BLOCK === RESEARCH_BLOCK - 1) {
    const slot = Math.floor((s - RESEARCH_DETAIL) / RESEARCH_BLOCK);
    const i = pageItems[slot < PAGE_SIZE ? 0 : 1]![slot % PAGE_SIZE];
    if (i !== undefined) return { requested: item(i).name };
  }
  return {};
}
