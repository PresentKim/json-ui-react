import { ItemStack, system, world } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
import { LAYOUTS, openScreen, screenTitle } from "./generated/screens.js";

// 예시 id(메뉴 순서). 폼 제목과 버튼 수는 빌드가 만든 generated/screens.js(TITLES, LAYOUTS)에서 온다.
// @examples: ["router","tabs-inside","tabs-follow","tabs-lazy","slot-grid","virtual-list-500","virtual-list-2000","research"]
const EXAMPLES = ["router", "tabs-inside", "tabs-follow", "tabs-lazy", "slot-grid", "virtual-list-500", "virtual-list-2000", "research"];

// research: 목록 96 + 탭 2 + 페이지 4 + 상세 96 x 20 (FFR 원본 서버와 같은 버튼 순서)
const RESEARCH_ITEMS = 96;
const PAGE_SIZE = 48;
const RESEARCH_PAGER = 98;
const RESEARCH_DETAIL = 102;
const RESEARCH_BLOCK = 20;
const MAX_MATS = 8;
const MAX_REWARDS = 8;
const EMPTY = "§0§e§r";

// 칸 아이콘으로 쓰는 바닐라 텍스처
const ICONS = [
  "textures/items/diamond",
  "textures/items/apple",
  "textures/items/iron_ingot",
  "textures/items/gold_ingot",
  "textures/items/emerald",
  "textures/items/bread",
  "textures/items/redstone_dust",
  "textures/items/book_normal",
  "textures/items/hopper",
  "textures/items/coal",
];
const ICON_NAMES = ["Diamond", "Apple", "Iron Ingot", "Gold Ingot", "Emerald", "Bread", "Redstone", "Book", "Hopper", "Coal"];

const SENTENCES = [
  "Filters hopper input and sends it to the next chest.",
  "Work speed halves when power is low.",
  "Joining several blocks widens the range.",
  "Pauses briefly on a redstone signal.",
  "Speeds up with each part in the upgrade slot.",
];

function pad(text, width) {
  return (text + " ".repeat(width)).slice(0, width);
}

// 연구 항목 i의 이름, 아이콘, 상태, 설명, 재료, 보상
function item(i) {
  const matCount = ((i * 5) % MAX_MATS) + 1;
  const rewardCount = ((i * 3) % 4) + 1;
  const sentences = (i % SENTENCES.length) + 1;
  return {
    name: `Item ${i + 1}`,
    icon: ICONS[i % ICONS.length],
    done: i % 3 === 0,
    desc: [`Description of Item ${i + 1}.`, ...SENTENCES.slice(0, sentences)].join(" "),
    mats: Array.from({ length: matCount }, (_, j) => [ICONS[(i + j + 2) % ICONS.length], ((i + j) % 16) + 1]),
    rewards: Array.from({ length: rewardCount }, (_, j) => ICONS[(i + j * 3) % ICONS.length]),
  };
}

// 탭 0은 연구 필요, 탭 1은 연구 완료 항목 번호 목록
function tabItems() {
  const tabs = [[], []];
  for (let i = 0; i < RESEARCH_ITEMS; i++) tabs[item(i).done ? 1 : 0].push(i);
  return tabs;
}

// 상세 한 블록(20칸): 이름, 상태, 설명, 재료 8, 보상 8, 진행
function addDetailBlock(form, i) {
  if (i === undefined) {
    for (let k = 0; k < RESEARCH_BLOCK; k++) form.button(EMPTY);
    return;
  }
  const it = item(i);
  form.button(`§c${it.name}`, it.icon);
  form.button(it.done ? "§aResearched" : "§cNeeds research");
  form.button(it.desc);
  for (let j = 0; j < MAX_MATS; j++) {
    const m = it.mats[j];
    if (m) form.button(`§f${m[1]}`, m[0]);
    else form.button(EMPTY);
  }
  for (let j = 0; j < MAX_REWARDS; j++) {
    const r = it.rewards[j];
    if (r) form.button("§f+1", r);
    else form.button(EMPTY);
  }
  form.button(it.done ? "Researched" : "Start research");
}

// 연구 화면. 버튼 순서는 layouts의 createResearchSlots와 같다: 칸 48x2, 탭 2, 페이지 2x2, 상세 96 블록.
function openResearch(player, id, state) {
  const tabs = tabItems();
  const pageItems = [0, 1].map((t) => tabs[t].slice(state.pages[t] * PAGE_SIZE, (state.pages[t] + 1) * PAGE_SIZE));
  const form = new ActionFormData().title(screenTitle(id));
  for (const list of pageItems) {
    for (let k = 0; k < PAGE_SIZE; k++) {
      const i = list[k];
      if (i === undefined) form.button("§r");
      else form.button("§r", item(i).icon);
    }
  }
  form.button(`Needed ${tabs[0].length}`, "textures/items/book_normal");
  form.button(`Done ${tabs[1].length}`, "textures/items/emerald");
  for (let k = 0; k < 4; k++) form.button("§r");
  for (const list of pageItems) for (let k = 0; k < PAGE_SIZE; k++) addDetailBlock(form, list[k]);

  form.show(player).then((res) => {
    if (res.canceled || res.selection === undefined) return;
    const s = res.selection;
    player.onScreenDisplay.setActionBar(`[jur] ${id} selection=${s}`);
    if (s >= RESEARCH_PAGER && s < RESEARCH_DETAIL) {
      const tab = s < RESEARCH_PAGER + 2 ? 0 : 1;
      const last = Math.max(0, Math.ceil(tabs[tab].length / PAGE_SIZE) - 1);
      const step = s % 2 === 0 ? -1 : 1;
      state.pages[tab] = Math.min(last, Math.max(0, state.pages[tab] + step));
      openResearch(player, id, state);
    } else if (s >= RESEARCH_DETAIL && (s - RESEARCH_DETAIL) % RESEARCH_BLOCK === RESEARCH_BLOCK - 1) {
      const slot = Math.floor((s - RESEARCH_DETAIL) / RESEARCH_BLOCK);
      const i = pageItems[slot < PAGE_SIZE ? 0 : 1][slot % PAGE_SIZE];
      if (i !== undefined) player.sendMessage(`[jur] Research requested: ${item(i).name}`);
    }
  });
}

// 예시별 서버 데이터: 컴포넌트 name -> 버튼 [글자, 아이콘] 목록. 버튼 순서는 openScreen이 화면 배치대로 맞춘다.
const TAB_BUTTONS = [["Tab 1", "textures/items/book_normal"], ["Tab 2", "textures/items/emerald"]];
const TABS_DATA = {
  tabs: TAB_BUTTONS,
  tab1: [["Tab 1: Apple", ICONS[1]], ["Tab 1: Bread", ICONS[5]]],
  tab2: [["Tab 2: Diamond", ICONS[0]], ["Tab 2: Gold Ingot", ICONS[3]]],
};

// 가상 목록 칸: 이름 12자 + 설명 20자 + 숫자(진행 막대)
function listItems(n) {
  return Array.from({ length: n }, (_, i) => [
    pad(`Item ${i + 1}`, 12) + pad(`Description ${i + 1}`, 20) + String((i * 7) % 101),
    ICONS[i % ICONS.length],
  ]);
}

const DATA = {
  "router": () => ({
    buttons: [
      ["Title prefix jur:", ICONS[1]],
      ["Lookup by 6 bytes", ICONS[5]],
      ["Pick one screen", ICONS[0]],
      ["4 buttons in a row", ICONS[4]],
    ],
  }),
  "tabs-inside": () => TABS_DATA,
  "tabs-follow": () => TABS_DATA,
  "tabs-lazy": () => TABS_DATA,
  "slot-grid": () => ({ cells: Array.from({ length: 24 }, (_, i) => [ICON_NAMES[i % ICONS.length], ICONS[i % ICONS.length]]) }),
  "virtual-list-500": () => ({ list: listItems(500) }),
  "virtual-list-2000": () => ({ list: listItems(2000) }),
};

function openExample(player, id) {
  if (id === "research") {
    openResearch(player, id, { pages: [0, 0] });
    return;
  }
  openScreen(player, id, DATA[id]()).then((hit) => {
    if (!hit) return;
    player.onScreenDisplay.setActionBar(`[jur] ${id} selection=${hit.name}[${hit.index}]`);
  });
}

// 빌드할 때 pack-addon이 "v0.1.0 · 커밋 · 날짜"로 바꾼다.
const ADDON_VERSION = "__JUR_VERSION__";

// 예시 고르기 창. 제목에 jur: 접두가 없으므로 바닐라 폼 그대로 그려진다.
const MENU_LABELS = {
  "router": "Screen router",
  "tabs-inside": "Tabs: content inside the toggle",
  "tabs-follow": "Tabs: shown by toggle state",
  "tabs-lazy": "Tabs: built on first select",
  "slot-grid": "Slot grid with selection detail",
  "virtual-list-500": "Grid list (500)",
  "virtual-list-2000": "Grid list (2000)",
  "research": "Research screen",
};

function openMenu(player) {
  const ids = EXAMPLES;
  const form = new ActionFormData()
    .title("json-ui-react Examples")
    .body(`Pick an example. Use the stick to open this menu again.\n§7Add-on ${ADDON_VERSION}`);
  for (const id of ids) form.button(`${MENU_LABELS[id] ?? id}\n§8${id} · ${LAYOUTS[id].total} buttons`);
  form.show(player).then((res) => {
    if (res.canceled || res.selection === undefined) return;
    const id = ids[res.selection];
    if (id) openExample(player, id);
  });
}

// 막대기를 쓰면(모바일은 길게 누르기) 예시 고르기 창을 연다.
world.afterEvents.itemUse.subscribe((event) => {
  if (event.itemStack?.typeId !== "minecraft:stick") return;
  const player = event.source;
  if (player?.typeId !== "minecraft:player") return;
  system.run(() => openMenu(player));
});

// 처음 들어올 때 막대기가 없으면 하나 주고 쓰는 법을 알린다.
world.afterEvents.playerSpawn.subscribe((event) => {
  if (!event.initialSpawn) return;
  const player = event.player;
  const inv = player.getComponent("minecraft:inventory")?.container;
  if (!inv) return;
  let hasStick = false;
  for (let i = 0; i < inv.size; i++) {
    if (inv.getItem(i)?.typeId === "minecraft:stick") { hasStick = true; break; }
  }
  if (!hasStick) inv.addItem(new ItemStack("minecraft:stick", 1));
  player.sendMessage("[jur] Use the stick (long-press on mobile) to open the example menu.");
});

system.afterEvents.scriptEventReceive.subscribe((event) => {
  if (event.id !== "jur:open") return;
  const player = event.sourceEntity;
  if (player?.typeId !== "minecraft:player") return;
  const id = event.message.trim();
  if (id === "" || id === "menu") {
    openMenu(player);
    return;
  }
  if (!EXAMPLES.includes(id)) {
    player.sendMessage(`[jur] Unknown id: ${id}. Available: ${EXAMPLES.join(", ")}`);
    return;
  }
  openExample(player, id);
});
