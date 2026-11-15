// 연구 화면 스크립트(entity-research-screen main.js 이식). 칸 번호는 setup(screen)이 받은 ScreenInfo에서만 읽는다.
import { ItemStack, system, world } from "@minecraft/server";
import { createEntityMenu, stack } from "./runtime.js";

const PACK_VERSION = "v1.2.0";
const LAUNCHER = "jure:research";
const BOX = "jure:research_box";
const BOX_TAG = "jure_research";
const DONE_PROPERTY = "jure:research_done";
const MARK = "§r§e§r§s§b§r"; // 버튼 표식이자 화면 아이템 lore 표식
const SELECTED = "SELECTED";

const PAGE_SIZE = 48;
const RESEARCH_COUNT = 120;
// 상세 칸 안의 순번
const MATS = 3;
const REWARDS = 11;
const ACTION = 19;
const DONE_NOTE = 20;
const MESSAGE = 21;
const MAX_LINES = 8;

const ICONS = [
  "minecraft:diamond", "minecraft:apple", "minecraft:iron_ingot", "minecraft:gold_ingot", "minecraft:emerald",
  "minecraft:bread", "minecraft:redstone", "minecraft:book", "minecraft:hopper", "minecraft:coal",
  "minecraft:chest", "minecraft:crafting_table", "minecraft:grass_block", "minecraft:golden_apple", "minecraft:diamond_sword",
];
const MATERIALS = [
  "minecraft:iron_ingot", "minecraft:gold_ingot", "minecraft:redstone", "minecraft:coal", "minecraft:emerald",
  "minecraft:diamond", "minecraft:bread", "minecraft:book", "minecraft:apple", "minecraft:paper",
];
const SENTENCES = [
  "Filters the items fed by a hopper and sends them to the chest next to it.",
  "Works at half speed when power runs low.",
  "Placing several of the same block side by side widens the range.",
  "Pauses for a moment when it receives a redstone signal.",
];

const RESEARCH = Array.from({ length: RESEARCH_COUNT }, (_, i) => ({
  name: `Item ${i + 1}`,
  icon: ICONS[i % ICONS.length],
  desc: [`Description of item ${i + 1}.`, SENTENCES[i % SENTENCES.length]].join(" "),
  mats: Array.from({ length: ((i * 5) % 4) + 1 }, (_, j) => [MATERIALS[(i + j * 3) % MATERIALS.length], ((i + j) % 8) + 1]),
  rewards: Array.from({ length: ((i * 3) % 3) + 1 }, (_, j) => [ICONS[(i + j * 4) % ICONS.length], (j % 4) + 1]),
}));

const inventory = (entity) => entity.getComponent("inventory")?.container;

function label(typeId) {
  return typeId.replace("minecraft:", "").split("_").map((w) => w[0].toUpperCase() + w.slice(1)).join(" ");
}

function doneSet(player) {
  const stored = player.getDynamicProperty(DONE_PROPERTY);
  return new Set(typeof stored === "string" ? JSON.parse(stored) : RESEARCH.map((_, i) => i).filter((i) => i % 3 === 0));
}

function saveDone(player, done) {
  player.setDynamicProperty(DONE_PROPERTY, JSON.stringify([...done]));
}

/** 시작 버튼 칸에 두는 표식 아이템: lore에 상태(READY/WAIT)를 싣고, 표식이 있으니 눌림 감지에는 걸리지 않는다. */
const stateButton = (state) => stack("minecraft:paper", 1, MARK, [MARK, state]);

const unmarked = (item) => !!item && !item.getLore().includes(MARK) && item.nameTag !== MARK;

function count(container, typeId) {
  let total = 0;
  for (let s = 0; s < container.size; s++) {
    const item = container.getItem(s);
    if (item?.typeId === typeId && unmarked(item)) total += item.amount;
  }
  return total;
}

function take(container, typeId, amount) {
  for (let s = 0; s < container.size && amount > 0; s++) {
    const item = container.getItem(s);
    if (item?.typeId !== typeId || !unmarked(item)) continue;
    const used = Math.min(amount, item.amount);
    amount -= used;
    if (used === item.amount) container.setItem(s);
    else {
      item.amount -= used;
      container.setItem(s, item);
    }
  }
}

const ready = (player, r) => {
  const container = inventory(player);
  return !!container && r.mats.every(([id, n]) => count(container, id) >= n);
};

function lists(player) {
  const done = doneSet(player);
  const all = RESEARCH.map((_, i) => i);
  return [all.filter((i) => !done.has(i)), all.filter((i) => done.has(i))];
}

const init = (s) => {
  s.state.pages = [0, 0];
  s.state.sel = [undefined, undefined];
  s.state.message = ["", ""];
  s.state.ids = [[], []]; // 마지막 render가 보여 준 쪽의 연구 번호(눌림 해석용)
};

function renderDetail(s, t) {
  const st = s.state;
  const d = `detail${t}`;
  const r = RESEARCH[st.sel[t]];
  const color = t === 0 ? "§c" : "§a";
  s.put(d, 0, r ? stack(r.icon, 1, `${color}${r.name}`) : undefined);
  s.put(d, 1, r ? stack("minecraft:paper", 1, t === 0 ? "§cNot researched" : "§aResearched") : undefined);
  s.put(d, 2, r ? stack("minecraft:paper", 1, r.desc) : undefined);
  for (let j = 0; j < MAX_LINES; j++) {
    const m = r?.mats[j];
    s.put(d, MATS + j, m ? stack(m[0], m[1]) : undefined);
    const w = r?.rewards[j];
    s.put(d, REWARDS + j, w ? stack(w[0], w[1]) : undefined);
  }
  if (t === 0) s.put(d, ACTION, r ? stateButton(ready(s.player, r) ? "READY" : "WAIT") : stack("minecraft:paper", 1, MARK, [MARK]));
  s.put(d, DONE_NOTE, r && t === 1 ? stack("minecraft:paper", 1, "done") : undefined);
  s.put(d, MESSAGE, st.message[t] ? stack("minecraft:paper", 1, st.message[t]) : undefined);
}

function render(s) {
  if (!s.storage) return;
  const st = s.state;
  const tabs = lists(s.player);
  for (let t = 0; t < 2; t++) {
    const last = Math.max(0, Math.ceil(tabs[t].length / PAGE_SIZE) - 1);
    st.pages[t] = Math.min(st.pages[t], last);
    const page = tabs[t].slice(st.pages[t] * PAGE_SIZE, (st.pages[t] + 1) * PAGE_SIZE);
    st.ids[t] = page;
    if (!page.includes(st.sel[t])) st.sel[t] = undefined;
    for (let k = 0; k < PAGE_SIZE; k++) {
      const i = page[k];
      const r = RESEARCH[i];
      s.put(`cells${t}`, k, r ? stack(r.icon, 1, r.name, i === st.sel[t] ? [MARK, SELECTED] : [MARK]) : undefined);
    }
    s.put("heads", t, stack(t === 0 ? "minecraft:writable_book" : "minecraft:emerald", 1, `${t === 0 ? "To do" : "Done"} ${tabs[t].length}`));
    renderDetail(s, t);
  }
}

function startResearch(s, i) {
  const player = s.player;
  const r = RESEARCH[i];
  const container = inventory(player);
  const missing = r.mats.filter(([id, n]) => count(container, id) < n);
  if (missing.length) {
    s.state.message[0] = `Missing ${missing.map(([id, n]) => `${n - count(container, id)} ${label(id)}`).join(", ")}`;
    return;
  }
  for (const [id, n] of r.mats) take(container, id, n);
  for (const [id, n] of r.rewards) {
    const left = container.addItem(new ItemStack(id, n));
    if (left) player.dimension.spawnItem(left, player.location);
  }
  const done = doneSet(player);
  done.add(i);
  saveDone(player, done);
  s.state.sel[0] = undefined;
  s.state.message[0] = `Researched ${r.name}.`;
}

function press(s, name, index) {
  const st = s.state;
  const tab = /(\d)$/.exec(name)?.[1];
  const t = tab === undefined ? 0 : Number(tab);
  if (name.startsWith("pick")) {
    const research = st.ids[t][index];
    if (research === undefined) return;
    st.sel[t] = research;
    st.message[t] = "";
  } else if (name.startsWith("pager")) {
    const last = Math.max(0, Math.ceil(lists(s.player)[t].length / PAGE_SIZE) - 1);
    st.pages[t] = Math.min(last, Math.max(0, st.pages[t] + (index === 0 ? -1 : 1)));
    st.sel[t] = undefined;
  } else if (name === "start") {
    if (st.sel[0] !== undefined) startResearch(s, st.sel[0]);
  }
}

export function setup(screen) {
  const menu = createEntityMenu({
    screen,
    entityType: BOX,
    launcherTag: LAUNCHER,
    tag: BOX_TAG,
    mark: MARK,
    onStart: init,
    onPress: press,
    render,
    tickEvery: { 10: render },
  });
  menu.start();

  // 웅크리고 런처 사용: 연구 초기화 + 시험 재료 지급
  world.afterEvents.itemUse.subscribe((event) => {
    if (event.itemStack.typeId !== LAUNCHER || !event.source.isSneaking) return;
    const player = event.source;
    system.run(() => {
      player.setDynamicProperty(DONE_PROPERTY);
      const container = inventory(player);
      for (const id of MATERIALS) container?.addItem(new ItemStack(id, 64));
      const s = menu.sessions.get(player.id);
      if (s) render(s);
      player.sendMessage(`[Research ${PACK_VERSION}] Research reset and test materials added.`);
    });
  });
  return menu;
}
