import { ItemStack, system, world } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";

// @examples: ["router","tabs-inside","tabs-follow","tabs-lazy","slot-grid","virtual-list-500","virtual-list-2000","research"]
const EXAMPLES = {
  "router": { title: "jur:ro", buttons: 4 },
  "tabs-inside": { title: "jur:ti", buttons: 6 },
  "tabs-follow": { title: "jur:tf", buttons: 6 },
  "tabs-lazy": { title: "jur:tl", buttons: 6 },
  "slot-grid": { title: "jur:sg", buttons: 24 },
  "virtual-list-500": { title: "jur:v5", buttons: 500 },
  "virtual-list-2000": { title: "jur:v2", buttons: 2000 },
  "research": { title: "jur:re", buttons: 2022 },
};

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
const ICON_NAMES = ["다이아몬드", "사과", "철 주괴", "금 주괴", "에메랄드", "빵", "레드스톤", "책", "깔때기", "석탄"];

const SENTENCES = [
  "호퍼로 넣은 재료를 걸러 옆 상자에 보냅니다.",
  "전력이 부족하면 작업 속도가 절반으로 줄어듭니다.",
  "같은 블록을 여러 개 이어 붙이면 범위가 넓어집니다.",
  "레드스톤 신호를 받으면 잠시 멈춥니다.",
  "업그레이드 슬롯에 넣은 부품 수만큼 빨라집니다.",
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
    name: `아이템 ${i + 1}`,
    icon: ICONS[i % ICONS.length],
    done: i % 3 === 0,
    desc: [`아이템 ${i + 1}의 설명입니다.`, ...SENTENCES.slice(0, sentences)].join(" "),
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
  form.button(it.done ? "§a연구 완료" : "§c연구 필요");
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
  form.button(it.done ? "연구 완료됨" : "연구 진행");
}

// 연구 화면. 버튼 순서는 layouts의 createResearchSlots와 같다: 칸 48x2, 탭 2, 페이지 2x2, 상세 96 블록.
function openResearch(player, id, state) {
  const tabs = tabItems();
  const pageItems = [0, 1].map((t) => tabs[t].slice(state.pages[t] * PAGE_SIZE, (state.pages[t] + 1) * PAGE_SIZE));
  const form = new ActionFormData().title(EXAMPLES[id].title);
  for (const list of pageItems) {
    for (let k = 0; k < PAGE_SIZE; k++) {
      const i = list[k];
      if (i === undefined) form.button("§r");
      else form.button("§r", item(i).icon);
    }
  }
  form.button(`연구 필요 ${tabs[0].length}`, "textures/items/book_normal");
  form.button(`연구 완료 ${tabs[1].length}`, "textures/items/emerald");
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
      if (i !== undefined) player.sendMessage(`[jur] 연구 진행 요청: ${item(i).name}`);
    }
  });
}

// 예시별 버튼 [글자, 아이콘]. 버튼 순서와 개수는 example/screens/*.tsx의 슬롯 구간과 같다.
function exampleButtons(id) {
  switch (id) {
    case "router":
      return [
        ["제목 접두 jur:", ICONS[1]],
        ["6바이트로 조회", ICONS[5]],
        ["화면 하나 선택", ICONS[0]],
        ["버튼 4개 한 줄", ICONS[4]],
      ];
    case "tabs-inside":
    case "tabs-follow":
    case "tabs-lazy":
      // 탭 2, 첫째 탭 패널 2, 둘째 탭 패널 2
      return [
        ["첫째 탭", "textures/items/book_normal"],
        ["둘째 탭", "textures/items/emerald"],
        ["첫째: 사과", ICONS[1]],
        ["첫째: 빵", ICONS[5]],
        ["둘째: 다이아몬드", ICONS[0]],
        ["둘째: 금 주괴", ICONS[3]],
      ];
    case "slot-grid":
      return Array.from({ length: 24 }, (_, i) => [ICON_NAMES[i % ICONS.length], ICONS[i % ICONS.length]]);
    default: {
      // 가상 목록: 이름 12자 + 설명 20자 + 숫자(진행 막대)
      const n = EXAMPLES[id].buttons;
      return Array.from({ length: n }, (_, i) => [
        pad(`항목 ${i + 1}`, 12) + pad(`설명 ${i + 1}`, 20) + String((i * 7) % 101),
        ICONS[i % ICONS.length],
      ]);
    }
  }
}

function openExample(player, id) {
  if (id === "research") {
    openResearch(player, id, { pages: [0, 0] });
    return;
  }
  const ex = EXAMPLES[id];
  const form = new ActionFormData().title(ex.title);
  for (const [text, icon] of exampleButtons(id)) form.button(text, icon);
  form.show(player).then((res) => {
    if (res.canceled || res.selection === undefined) return;
    player.onScreenDisplay.setActionBar(`[jur] ${id} selection=${res.selection}`);
  });
}

// 빌드할 때 pack-addon이 "v0.1.0 · 커밋 · 날짜"로 바꾼다.
const ADDON_VERSION = "__JUR_VERSION__";

// 예시 고르기 창. 제목에 jur: 접두가 없으므로 바닐라 폼 그대로 그려진다.
const MENU_LABELS = {
  "router": "화면 라우터",
  "tabs-inside": "탭: 토글 안에 내용",
  "tabs-follow": "탭: 토글 상태를 따라 보이기",
  "tabs-lazy": "탭: 처음 누를 때 만들기",
  "slot-grid": "칸 격자와 선택 상세",
  "virtual-list-500": "grid 목록 500개",
  "virtual-list-2000": "grid 목록 2000개",
  "research": "연구 화면",
};

function openMenu(player) {
  const ids = Object.keys(EXAMPLES);
  const form = new ActionFormData()
    .title("json-ui-react 예시")
    .body(`열어 볼 예시를 고르세요. 막대기를 쓰면 이 창이 다시 열립니다.\n§7애드온 ${ADDON_VERSION}`);
  for (const id of ids) form.button(`${MENU_LABELS[id] ?? id}\n§8${id} · 버튼 ${EXAMPLES[id].buttons}개`);
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
  player.sendMessage("[jur] 막대기를 쓰면(모바일은 길게 누르기) 예시 고르기 창이 열립니다.");
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
  if (!Object.hasOwn(EXAMPLES, id)) {
    player.sendMessage(`[jur] 알 수 없는 id: ${id}. 사용 가능: ${Object.keys(EXAMPLES).join(", ")}`);
    return;
  }
  openExample(player, id);
});
