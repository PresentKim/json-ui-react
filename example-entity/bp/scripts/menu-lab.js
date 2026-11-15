// entity-menu-lab 서버 스크립트: 메뉴 화면(이름·로어 검사)과 잠금 화면(이름 없는 엔티티 = 바닐라 상자).
// 화면 번호는 buildEntityScreens가 만든 ScreenInfo에서만 읽는다.
import { ItemLockMode, ItemStack, system, world } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
import { createEntityMenu, paper, stack, text } from "./runtime.js";

const PACK_VERSION = "v1.8.0";
const LAUNCHER = "jure:menu_lab";
const BOX = "jure:menu_lab_box";
const BOX_TAG = "jure_menu_lab";
const BUTTON_MARK = "§r§e§m§l§b§r";
const LOCK_PREFIX = "Lock ";
const CELL_ITEMS = [
  "minecraft:diamond",
  "minecraft:chest",
  "minecraft:golden_apple",
  "minecraft:netherite_sword",
  "minecraft:grass_block",
  "minecraft:bow",
  "minecraft:emerald",
  "minecraft:totem_of_undying",
];
const COLORS = ["red", "blue", "lime", "yellow"];
const SCREENS = [
  ["menu", "Menu screen (item name and lore checks)"],
  ["lock", "Vanilla chest with lock mode items"],
];
const LOCKS = [
  ["none", ItemLockMode.none],
  ["inventory", ItemLockMode.inventory],
  ["slot", ItemLockMode.slot],
];

function inventory(entity) {
  return entity.getComponent("inventory")?.container;
}

function say(player, msg) {
  player.sendMessage(`[Entity Menu Lab] ${msg}`);
}

function named(typeId, name, lore, lock, amount = 1) {
  const item = stack(typeId, amount, name, lore);
  item.lockMode = lock;
  return item;
}

/** 내구도가 step*25 만큼 닳은 철 검. 차등 쓰기가 내구도를 비교하지 않으므로 직접 setItem 한다. */
function worn(step) {
  const item = new ItemStack("minecraft:iron_sword");
  const durability = item.getComponent("durability");
  if (durability) durability.damage = Math.min(durability.maxDurability - 1, step * 25);
  item.lockMode = ItemLockMode.none;
  return item;
}

function lockSnapshot(storage) {
  return LOCKS.map((_, k) => storage.getItem(k)?.amount ?? 0);
}

function lockedInPlayer(player) {
  const container = inventory(player);
  let count = 0;
  for (let i = 0; i < (container?.size ?? 0); i++) {
    const item = container.getItem(i);
    if (item?.nameTag?.startsWith(LOCK_PREFIX)) count += item.amount;
  }
  const cursor = player.getComponent("cursor_inventory")?.item;
  if (cursor?.nameTag?.startsWith(LOCK_PREFIX)) count += cursor.amount;
  return count;
}

export function setup(screen) {
  const settings = new Map();
  const settingsOf = (player) => {
    if (!settings.has(player.id)) settings.set(player.id, { screen: "menu" });
    return settings.get(player.id);
  };
  const slotOf = (name) => screen.slots[name][0];
  const buttonSlot = screen.buttons.press[0];
  const isLock = (s) => s.state.mode === "lock";

  function writeWear(s, step) {
    if (s.state.wear === step) return;
    s.storage.setItem(slotOf("wear"), worn(step));
    s.state.wear = step;
  }

  function render(s) {
    if (isLock(s)) return;
    const st = s.state;
    CELL_ITEMS.forEach((id, k) => {
      const item = named(id, `Item ${k + 1}`, [`Line for item ${k + 1}`], ItemLockMode.slot);
      s.put("cells", k, item);
    });
    s.put("pressed", 0, paper(`Pressed ${st.presses}`));
    s.put("tick", 0, paper("Tick label", [`Seconds ${st.seconds}`]));
    const n = st.seconds;
    s.put("state", 0, paper(n % 2 === 0 ? "STATE_ON" : "STATE_OFF"));
    s.put("color", 0, paper(COLORS[n % COLORS.length]));
    s.put("level", 0, paper(text(String(n % 11))));
    writeWear(s, n % 11);
  }

  function onStart(s) {
    const mode = settingsOf(s.player).screen;
    s.state = { mode, presses: 0, seconds: 0, lock: [], held: 0, wear: -1 };
    if (mode !== "lock") return;
    // 잠금 화면: 이름 없는 엔티티는 바닐라 상자로 열린다. 표식 칸은 비운다.
    s.box.nameTag = "";
    s.storage.setItem(buttonSlot);
    LOCKS.forEach(([name, lock], k) => s.storage.setItem(k, named("minecraft:diamond", LOCK_PREFIX + name, undefined, lock, 5)));
    s.state.lock = lockSnapshot(s.storage);
  }

  function onPress(s, name) {
    if (isLock(s) || name !== "press") return;
    s.state.presses += 1;
  }

  function watchLock(s) {
    if (!isLock(s)) return;
    const now = lockSnapshot(s.storage);
    const held = lockedInPlayer(s.player);
    now.forEach((amount, k) => {
      if (amount !== s.state.lock[k]) say(s.player, `Lock ${LOCKS[k][0]}: ${s.state.lock[k]} -> ${amount} in the entity.`);
    });
    if (held !== s.state.held) say(s.player, `Lock items on you or your cursor: ${held}.`);
    s.state.lock = now;
    s.state.held = held;
  }

  const menu = createEntityMenu({
    screen,
    entityType: BOX,
    launcherTag: LAUNCHER, // 런타임은 손에 든 아이템의 typeId와 비교한다
    tag: BOX_TAG,
    mark: BUTTON_MARK,
    buttonItem: "minecraft:lime_wool",
    onStart,
    onPress,
    render,
    tickEvery: {
      // 잠금 화면에는 버튼이 없으므로 런타임이 채운 표식을 매 틱 다시 비운다.
      1: (s) => {
        if (isLock(s)) s.storage.setItem(buttonSlot);
      },
      2: watchLock,
      20: (s) => {
        if (isLock(s) || !s.box.isValid) return;
        s.state.seconds += 1;
        render(s);
      },
    },
  });

  function stopSession(player) {
    const s = menu.sessions.get(player.id);
    if (s?.box.isValid) s.box.remove();
    menu.sessions.delete(player.id);
  }

  function openSettings(player) {
    const cfg = settingsOf(player);
    const session = menu.sessions.get(player.id);
    const lines = [
      `Screen: ${SCREENS.find(([id]) => id === cfg.screen)[1]}`,
      `Button presses this session: ${session?.state.presses ?? 0}`,
    ];
    const form = new ActionFormData().title(`Entity Menu Lab ${PACK_VERSION}`).body(lines.join("\n"));
    for (const [, label] of SCREENS) form.button(`Screen: ${label}`);
    form.show(player).then((res) => {
      if (res.canceled || res.selection === undefined) return;
      cfg.screen = SCREENS[res.selection][0];
      stopSession(player);
      say(player, "Settings saved. The menu entity is spawned again while you hold the item.");
    });
  }

  menu.start();

  world.afterEvents.itemUse.subscribe((event) => {
    if (event.itemStack.typeId !== LAUNCHER) return;
    const player = event.source;
    if (player.isSneaking) system.run(() => openSettings(player));
  });

  system.afterEvents.scriptEventReceive.subscribe((event) => {
    if (event.sourceEntity?.typeId !== "minecraft:player") return;
    if (event.id === LAUNCHER) openSettings(event.sourceEntity);
  });

  return menu;
}
