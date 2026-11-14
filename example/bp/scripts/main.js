import { system } from "@minecraft/server";
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

system.afterEvents.scriptEventReceive.subscribe((event) => {
  if (event.id !== "jur:open") return;
  const player = event.sourceEntity;
  if (player?.typeId !== "minecraft:player") return;
  const id = event.message.trim();
  if (!Object.hasOwn(EXAMPLES, id)) {
    player.sendMessage(`[jur] 알 수 없는 id: ${id}. 사용 가능: ${Object.keys(EXAMPLES).join(", ")}`);
    return;
  }
  openExample(player, id);
});
