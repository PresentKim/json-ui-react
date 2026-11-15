import { describe, it, expect, vi, beforeEach } from "vitest";
import { buildEntityScreens } from "../../src/entity/build.tsx";
import menuLab from "../../example-entity/screens/menu-lab.tsx";

const h = vi.hoisted(() => {
  const state: any = { players: [], tick: 0, intervals: [], itemUse: [], scriptEvents: [], forms: [] };
  class ItemStack {
    nameTag?: string; lore: string[] = []; lockMode: any = "none";
    constructor(public typeId: string, public amount = 1) {}
    setLore(l: string[]) { this.lore = l; }
    getLore() { return this.lore; }
    getComponent(id: string) { return id === "durability" ? (this.dur ??= { damage: 0, maxDurability: 250 }) : undefined; }
    dur?: { damage: number; maxDurability: number };
  }
  const container = () => {
    const m = new Map<number, any>();
    return { m, size: 36, getItem: (i: number) => m.get(i), setItem: vi.fn((i: number, it?: any) => { if (it) m.set(i, it); else m.delete(i); }) };
  };
  return { state, ItemStack, container };
});
vi.mock("@minecraft/server", () => ({
  ItemStack: h.ItemStack,
  ItemLockMode: { none: "none", inventory: "inventory", slot: "slot" },
  system: {
    get currentTick() { return h.state.tick; },
    runInterval: (fn: () => void) => { h.state.intervals.push(fn); },
    run: (fn: () => void) => fn(),
    afterEvents: { scriptEventReceive: { subscribe: (f: any) => h.state.scriptEvents.push(f) } },
  },
  world: {
    getAllPlayers: () => h.state.players,
    afterEvents: {
      playerInventoryItemChange: { subscribe: () => {} },
      playerSpawn: { subscribe: () => {} },
      itemUse: { subscribe: (f: any) => h.state.itemUse.push(f) },
    },
  },
}));
vi.mock("@minecraft/server-ui", () => ({
  ActionFormData: class {
    title(t: string) { h.state.forms.push({ title: t, buttons: [] as string[] }); return this; }
    body(b: string) { h.state.forms.at(-1).body = b; return this; }
    button(b: string) { h.state.forms.at(-1).buttons.push(b); return this; }
    show() { return Promise.resolve({ canceled: false, selection: 1 }); }
  },
}));

// 패키저가 runtime.js를 스크립트 옆에 복사하므로 스크립트의 "./runtime.js" 가져오기를 소스 런타임으로 돌린다.
// (파일이 없어 경로로는 모킹이 안 되고, 가져오기 글자 그대로 모킹해야 한다.)
vi.mock("./runtime.js", async () => await import("../../src/entity/runtime.js"));

const result = buildEntityScreens([menuLab], { namespace: "eml", strict: false });
const info = result.screens["menu-lab"]!;

const find = (o: any, key: string): any[] => {
  const out: any[] = [];
  const walk = (v: any) => {
    if (Array.isArray(v)) v.forEach(walk);
    else if (v && typeof v === "object") for (const [k, c] of Object.entries(v)) { if (k.split("@")[0] === key) out.push(c); walk(c); }
  };
  walk(o);
  return out;
};

describe("example menu-lab", () => {
  it("menu_lab_constant_bars: 상수 clip 막대 6개(b1~b6)는 ENT-CLIP 경고로 재현된다", () => {
    const clip = result.diagnostics.filter((d) => d.rule === "ENT-CLIP");
    expect(clip.every((d) => d.level === "warn")).toBe(true);
    for (const b of ["b1", "b2", "b3", "b4", "b5", "b6"]) expect(clip.some((d) => d.path.includes(`/${b}/`))).toBe(true);
    expect(clip.some((d) => /\/b[78]\//.test(d.path))).toBe(false);
    // 원본 그대로 칸 밖 상수 막대(outside)도 하나 더 있다.
    expect(clip).toHaveLength(7);
    expect(clip.some((d) => d.path.includes("outside_bar"))).toBe(true);
    // strict(기본)에서는 같은 화면이 오류로 던진다.
    expect(() => buildEntityScreens([menuLab], { namespace: "eml" })).toThrow(/ENT-CLIP/);
    // 그 밖의 오류는 없다.
    expect(result.diagnostics.filter((d) => d.level === "error")).toEqual([]);
  });

  it("slot contract: 원본 27칸 지도", () => {
    expect(info.inventorySize).toBe(27);
    expect(info.nameTag).toBe("§b§w§m§l");
    expect(info.slots).toEqual({ cells: [1, 2, 3, 4, 5, 6, 7, 8], pressed: [12], tick: [13], state: [14], color: [15], level: [16], wear: [17], press: [26] });
    expect(info.buttons).toEqual({ press: [26] });
  });

  it("key UI facts: 라디오 8칸, 버튼 1개, 막대 b7/b8, 깃발 2개", () => {
    const eml = JSON.parse(result.files["ui/eml.json"]!);
    const win = eml.ml_window;
    const toggles = find(win, "cells").length ? find(win, "cells") : [];
    expect(toggles.length).toBeGreaterThan(0);
    const text = JSON.stringify(win);
    expect((text.match(/"toggle_group_forced_index"/g) ?? []).length).toBe(8);
    expect(text).toContain("Press: rename slot 12");
    expect(eml.ent_quick_button.button_mappings[0].to_button_id).toBe("button.container_auto_place");
    expect(text).toContain("(1 - (#item_durability_current_amount * .004))");
    expect(text).toContain("(not ((#hover_text - 'STATE_ON') = #hover_text))");
    expect(text).toContain("textures/blocks/wool_colored_");
    expect(JSON.parse(result.files["ui/chest_screen.json"]!).small_chest_panel.modifications).toBeTruthy();
  });
});

// ---------------------------------------------------------------- 스크립트

function fakeBox(id: string) {
  const c = h.container();
  const box: any = { id, isValid: true, tags: [] as string[], nameTag: "unset", teleport: vi.fn(), addTag(t: string) { this.tags.push(t); }, remove: vi.fn(() => { box.isValid = false; }), getComponent: () => ({ container: c }), c };
  return box;
}

let player: any;
let spawned: any[];
let messages: string[];

beforeEach(() => {
  Object.assign(h.state, { tick: 0, intervals: [], itemUse: [], scriptEvents: [], forms: [] });
  spawned = [];
  messages = [];
  const pc = h.container();
  pc.m.set(0, { typeId: "jure:menu_lab" });
  player = {
    id: "p1", selectedSlotIndex: 0, isSneaking: false, pc,
    dimension: { spawnEntity: vi.fn(() => { const b = fakeBox("b" + spawned.length); spawned.push(b); return b; }), getEntities: () => [] },
    getViewDirection: () => ({ x: 0, y: 0, z: 1 }), getHeadLocation: () => ({ x: 0, y: 2, z: 0 }),
    getComponent: (id: string) => (id === "inventory" ? { container: pc } : undefined),
    sendMessage: (m: string) => messages.push(m),
  };
  h.state.players = [player];
});

async function boot() {
  vi.resetModules();
  // @ts-ignore 선언 파일 없는 순수 JS 스크립트
  const mod: any = await import("../../example-entity/bp/scripts/menu-lab.js");
  const menu = mod.setup(info);
  const tick = (n = 1) => { for (let i = 0; i < n; i++) { h.state.tick++; h.state.intervals.forEach((f: () => void) => f()); } };
  return { menu, tick };
}

describe("example menu-lab script", () => {
  it("menu mode: 시작 때 칸을 채우고, 버튼 누름은 12번 칸 글자를 올린다", async () => {
    const { tick } = await boot();
    tick();
    const box = spawned[0];
    const c = box.c;
    expect(box.nameTag).toBe("§b§w§m§l");
    expect(c.getItem(1).nameTag).toBe("Item 1");
    expect(c.getItem(1).lockMode).toBe("slot");
    expect(c.getItem(8).typeId).toBe("minecraft:totem_of_undying");
    expect(c.getItem(12).nameTag).toBe("Pressed 0");
    expect(c.getItem(14).nameTag).toBe("STATE_ON");
    expect(c.getItem(15).nameTag).toBe("red");
    expect(c.getItem(16).nameTag).toBe("§r0");
    expect(c.getItem(17).typeId).toBe("minecraft:iron_sword");
    expect(c.getItem(26).typeId).toBe("minecraft:lime_wool");
    expect(c.getItem(26).nameTag).toBe("§r§e§m§l§b§r");
    c.m.delete(26); // 빠른 이동으로 빠져나감
    tick();
    expect(c.getItem(12).nameTag).toBe("Pressed 1");
    expect(c.getItem(26).nameTag).toBe("§r§e§m§l§b§r");
  });

  it("menu mode: 1초마다 13~17번 칸이 바뀐다(내구도 포함)", async () => {
    const { tick } = await boot();
    tick();
    h.state.tick = 19;
    tick(); // tick 20
    const c = spawned[0].c;
    expect(c.getItem(13).getLore()).toEqual(["Seconds 1"]);
    expect(c.getItem(14).nameTag).toBe("STATE_OFF");
    expect(c.getItem(15).nameTag).toBe("blue");
    expect(c.getItem(16).nameTag).toBe("§r1");
    expect(c.getItem(17).dur.damage).toBe(25);
  });

  it("lock mode: 이름 없는 엔티티, 잠금 다이아몬드 3종, 표식 없음, 변화 알림", async () => {
    const { tick } = await boot();
    h.state.itemUse[0]({ itemStack: { typeId: "jure:menu_lab" }, source: Object.assign(player, { isSneaking: true }) });
    expect(h.state.forms[0].buttons).toHaveLength(2);
    expect(h.state.forms[0].title).toContain("Entity Menu Lab");
    await Promise.resolve(); await Promise.resolve();
    tick();
    const box = spawned[0];
    expect(box.nameTag).toBe("");
    const c = box.c;
    expect([0, 1, 2].map((i) => [c.getItem(i).nameTag, c.getItem(i).amount, c.getItem(i).lockMode])).toEqual([
      ["Lock none", 5, "none"], ["Lock inventory", 5, "inventory"], ["Lock slot", 5, "slot"],
    ]);
    expect(c.getItem(26)).toBeUndefined();
    expect(c.getItem(12)).toBeUndefined();
    c.getItem(0).amount = 3;
    h.state.tick = 3;
    tick();
    expect(messages).toContain("[Entity Menu Lab] Lock none: 5 -> 3 in the entity.");
  });

  it("스크립트 이벤트와 런처 해제", async () => {
    const { menu, tick } = await boot();
    tick();
    h.state.scriptEvents[0]({ id: "jure:menu_lab", sourceEntity: Object.assign(player, { typeId: "minecraft:player" }) });
    expect(h.state.forms).toHaveLength(1);
    player.pc.m.delete(0);
    tick();
    expect(menu.sessions.size).toBe(0);
    expect(spawned[0].remove).toHaveBeenCalled();
  });
});
