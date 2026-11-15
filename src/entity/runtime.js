// 엔티티 인벤토리 화면의 정적 런타임: 세션 루프, 버튼 폴링, 차등 슬롯 쓰기, 누수 정리.
import { ItemStack, system, world } from "@minecraft/server";

const DEFAULT_LAUNCHER = "bwiki:test_launcher";

/** 숫자로 시작하는 글자는 식이 숫자로 읽으므로 앞에 §r을 붙인다(EXP-30). */
export function text(str) {
  const s = String(str);
  return /^[0-9]/.test(s) ? "§r" + s : s;
}

/** 아이템 하나를 만든다. */
export function stack(typeId, amount = 1, name, lore, durabilityDamage) {
  const item = new ItemStack(typeId, amount);
  if (name !== undefined) item.nameTag = name;
  if (lore && lore.length) item.setLore(lore);
  if (durabilityDamage !== undefined) {
    const dur = item.getComponent("minecraft:durability");
    if (dur) dur.damage = durabilityDamage;
  }
  return item;
}

/** 데이터 전달용 종이. 이름이 비면 빈 칸(undefined)이다. */
export function paper(name, lore) {
  if (name === undefined || name === "") return undefined;
  return stack("minecraft:paper", 1, name, lore);
}

/** minecraft:durability 컴포넌트의 damage. 컴포넌트가 없으면 0. */
function damage(item) {
  return item.getComponent?.("minecraft:durability")?.damage ?? 0;
}

function same(a, b) {
  if (!a || !b) return !a && !b;
  return (
    a.typeId === b.typeId &&
    a.amount === b.amount &&
    a.nameTag === b.nameTag &&
    a.getLore().join("|") === b.getLore().join("|") &&
    damage(a) === damage(b)
  );
}

/** 슬롯 번호별로 쓴다. 현재 내용과 같으면 쓰지 않는다(typeId, amount, nameTag, lore, 내구도 damage). */
export function writeSlots(s, entries) {
  for (const [slot, item] of Object.entries(entries)) {
    const i = Number(slot);
    if (!same(s.storage.getItem(i), item)) s.storage.setItem(i, item);
  }
}

function inventory(entity) {
  return entity.getComponent("inventory")?.container;
}

function spotInFront(player) {
  const view = player.getViewDirection();
  const eye = player.getHeadLocation();
  return { x: eye.x + view.x * 1.2, y: eye.y + view.y * 1.2 - 0.6, z: eye.z + view.z * 1.2 };
}

export function createEntityMenu(opts) {
  const { screen, entityType, tag, mark } = opts;
  const launcher = opts.launcherTag ?? DEFAULT_LAUNCHER;
  const buttonItem = opts.buttonItem ?? "minecraft:paper";
  const sessions = new Map();
  let started = false;

  const isMark = (item) => !!item && (item.nameTag === mark || item.getLore().includes(mark));
  const marker = () => stack(buttonItem, 1, mark, [mark]);
  // 손에 든 아이템이 런처인가: 아이템 태그가 launcher이거나 typeId가 launcher(기존 호출 호환).
  const holds = (player) => {
    const item = inventory(player)?.getItem(player.selectedSlotIndex);
    return !!item && (!!item.hasTag?.(launcher) || item.typeId === launcher);
  };

  function removeStrayBoxes(player) {
    for (const box of player.dimension.getEntities({ tags: [tag] })) {
      if (![...sessions.values()].some((s) => s.box.id === box.id)) box.remove();
    }
  }

  // 칸을 버튼 상태에 맞춘다: 켜짐이면 표식이 있게, 꺼짐이면 비게.
  function syncButton(s, name, k, slot) {
    const item = s.storage.getItem(slot);
    if (s.inactive.has(`${name}:${k}`)) {
      if (item) s.storage.setItem(slot, undefined);
    } else if (!isMark(item)) s.storage.setItem(slot, marker());
  }

  function startSession(player) {
    removeStrayBoxes(player);
    const box = player.dimension.spawnEntity(entityType, spotInFront(player));
    box.addTag(tag);
    box.nameTag = screen.nameTag;
    const s = {
      player,
      box,
      screen,
      storage: inventory(box),
      state: {},
      // 이름으로 슬롯에 쓴다: put("score", 0, item)
      put(name, i, item) {
        writeSlots(s, { [screen.slots[name][i]]: item });
      },
      // 꺼진 버튼 칸("이름:번호"). 꺼진 칸은 비워 두고 눌림으로 세지 않는다.
      inactive: new Set(),
      // 버튼 칸마다 표식 아이템을 다시 채운다(이미 있으면 그대로). 꺼진 칸은 채우지 않는다.
      buttons() {
        for (const [name, list] of Object.entries(screen.buttons)) {
          list.forEach((slot, k) => syncButton(s, name, k, slot));
        }
      },
      // 버튼을 켜고 끈다(기본 켜짐). 끄면 칸이 비어 hideWhenEmpty 버튼이 숨고, 켜면 표식이 다시 찬다.
      setButton(name, index, active) {
        const key = `${name}:${index}`;
        if (active === false) s.inactive.add(key);
        else s.inactive.delete(key);
        const slot = screen.buttons[name]?.[index];
        if (slot !== undefined) syncButton(s, name, index, slot);
      },
    };
    sessions.set(player.id, s);
    s.buttons();
    opts.onStart?.(s);
    opts.render(s);
    return s;
  }

  function stopSession(player) {
    const s = sessions.get(player.id);
    if (s?.box.isValid) s.box.remove();
    sessions.delete(player.id);
  }

  // 표식이 사라진 버튼 칸 = 눌림(빠른 이동으로 빠져나감).
  function pollButtons(s) {
    let pressed = false;
    for (const [name, list] of Object.entries(screen.buttons)) {
      list.forEach((slot, k) => {
        if (s.inactive.has(`${name}:${k}`)) return;
        if (isMark(s.storage.getItem(slot))) return;
        pressed = true;
        opts.onPress(s, name, k);
        syncButton(s, name, k, slot);
      });
    }
    if (pressed) opts.render(s);
  }

  function tick() {
    for (const player of world.getAllPlayers()) {
      let s = sessions.get(player.id);
      if (!holds(player)) {
        if (s) stopSession(player);
        continue;
      }
      if (!s || !s.box.isValid) s = startSession(player);
      s.box.teleport(spotInFront(player)); // C2: 매 틱 눈앞으로
      pollButtons(s);
      for (const [period, fn] of Object.entries(opts.tickEvery ?? {})) {
        if (system.currentTick % Number(period) === 0) fn(s);
      }
    }
  }

  return {
    sessions,
    start() {
      if (started) return;
      started = true;
      system.runInterval(tick, 1);
      // 표식 아이템이 플레이어 가방에 들어오면 지운다.
      world.afterEvents.playerInventoryItemChange.subscribe((event) => {
        if (!isMark(event.itemStack)) return;
        const container = inventory(event.player);
        if (isMark(container?.getItem(event.slot))) container.setItem(event.slot);
      });
      world.afterEvents.playerSpawn.subscribe((event) => {
        if (event.initialSpawn) system.run(() => removeStrayBoxes(event.player));
      });
    },
  };
}
