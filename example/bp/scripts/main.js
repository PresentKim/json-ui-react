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

// research: 목록 96 + 탭 2 + 페이지 4 + 상세 96 x 20
const RESEARCH_LIST = 96;
const RESEARCH_PAGE = 98;
const RESEARCH_DETAIL = 102;
const RESEARCH_BLOCK = 20;
const EMPTY = "§0§e§r";

function openExample(player, id) {
  const ex = EXAMPLES[id];
  const form = new ActionFormData().title(ex.title);
  if (id === "research") {
    for (let i = 0; i < RESEARCH_LIST; i++) form.button("§r");
    form.button("연구 필요");
    form.button("연구 완료");
    for (let k = 0; k < 4; k++) form.button("§r");
    for (let i = 0; i < RESEARCH_LIST; i++) {
      form.button(`§c아이템 ${i + 1}`);
      for (let k = 1; k < RESEARCH_BLOCK; k++) form.button(EMPTY);
    }
  } else {
    for (let i = 0; i < ex.buttons; i++) form.button(`${id} ${i + 1}`);
  }
  form.show(player).then((res) => {
    if (res.canceled || res.selection === undefined) return;
    const s = res.selection;
    player.onScreenDisplay.setActionBar(`[jur] ${id} selection=${s}`);
    if (id === "research" && s >= RESEARCH_PAGE && s < RESEARCH_DETAIL) openExample(player, id);
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
