import { describe, it, expect, vi, beforeEach } from "vitest";

// 모의 @minecraft/server (런타임이 쓰는 부분만)
const h = vi.hoisted(() => {
  const state: any = { players: [], tick: 0, intervals: [], invHandlers: [], spawnHandlers: [], boxes: [] };
  class ItemStack {
    nameTag?: string; lore: string[] = [];
    constructor(public typeId: string, public amount = 1) {}
    setLore(l: string[]) { this.lore = l; }
    getLore() { return this.lore; }
    tags: string[] = [];
    hasTag(t: string) { return this.tags.includes(t); }
    dur = { damage: 0 };
    getComponent(id: string) { return id === "minecraft:durability" ? this.dur : undefined; }
  }
  const container = () => {
    const m = new Map<number, any>();
    return { m, getItem: (i: number) => m.get(i), setItem: vi.fn((i: number, it?: any) => { if (it) m.set(i, it); else m.delete(i); }) };
  };
  return { state, ItemStack, container };
});
vi.mock("@minecraft/server", () => ({
  ItemStack: h.ItemStack,
  system: {
    get currentTick() { return h.state.tick; },
    runInterval: (fn: () => void) => { h.state.intervals.push(fn); },
    run: (fn: () => void) => fn(),
  },
  world: {
    getAllPlayers: () => h.state.players,
    afterEvents: {
      playerInventoryItemChange: { subscribe: (f: any) => h.state.invHandlers.push(f) },
      playerSpawn: { subscribe: (f: any) => h.state.spawnHandlers.push(f) },
    },
  },
}));

import { createEntityMenu, paper, stack, writeSlots, text } from "../../src/entity/runtime.js";

const screen = { title: "T", nameTag: "§b§w§m§l", inventorySize: 243 as const, slots: { score: [33], cells: [1, 2] }, buttons: { move: [36, 37, 38] } };

function fakeBox(id: string) {
  const c = h.container();
  const box: any = { id, isValid: true, tags: [] as string[], nameTag: "", teleport: vi.fn(), addTag(t: string) { this.tags.push(t); }, remove: vi.fn(() => { box.isValid = false; }), getComponent: () => ({ container: c }), c };
  return box;
}

let held = true;
let dim: any;
let player: any;
let spawned: any[];
let stray: any[];

beforeEach(() => {
  Object.assign(h.state, { tick: 0, intervals: [], invHandlers: [], spawnHandlers: [] });
  held = true; spawned = []; stray = [];
  const pc = h.container();
  pc.m.set(0, { typeId: "bwiki:test_launcher" });
  dim = {
    spawnEntity: vi.fn(() => { const b = fakeBox("b" + spawned.length); spawned.push(b); return b; }),
    getEntities: vi.fn(() => stray.filter((b) => b.isValid)),
  };
  player = {
    id: "p1", selectedSlotIndex: 0, dimension: dim, pc,
    getViewDirection: () => ({ x: 0, y: 0, z: 1 }), getHeadLocation: () => ({ x: 0, y: 2, z: 0 }),
    getComponent: () => ({ container: { getItem: (i: number) => (held ? pc.getItem(i) : undefined), setItem: pc.setItem } }),
  };
  h.state.players = [player];
});

function make(extra: any = {}) {
  const calls: any[] = [];
  const menu = createEntityMenu({
    screen, entityType: "bwiki:box", tag: "bwiki_box", mark: "§r§8mark",
    onPress: (_s: any, n: string, i: number) => calls.push(["press", n, i]),
    render: () => calls.push(["render"]),
    ...extra,
  });
  menu.start();
  return { menu, calls, tick: () => { h.state.tick++; h.state.intervals.forEach((f: () => void) => f()); } };
}

describe("runtime", () => {
  it("세션 시작: 스폰, 태그, nameTag, 표식 채움, 매 틱 teleport", () => {
    const { menu, tick } = make();
    tick(); tick();
    const box = spawned[0];
    expect(spawned).toHaveLength(1);
    expect(dim.spawnEntity).toHaveBeenCalledWith("bwiki:box", { x: 0, y: 2 - 0.6, z: 1.2 });
    expect(box.tags).toEqual(["bwiki_box"]);
    expect(box.nameTag).toBe(screen.nameTag);
    expect(box.teleport).toHaveBeenCalledTimes(2);
    expect([36, 37, 38].every((i) => box.c.getItem(i)?.nameTag === "§r§8mark")).toBe(true);
    expect(menu.sessions.size).toBe(1);
  });

  it("runtime_stop_when_unheld: 런처를 놓으면 박스를 지운다", () => {
    const { menu, tick } = make();
    tick();
    held = false;
    tick();
    expect(spawned[0].remove).toHaveBeenCalled();
    expect(menu.sessions.size).toBe(0);
  });

  it("runtime_stray_boxes: 세션 없는 태그 박스는 스폰 때 지운다", () => {
    const old = fakeBox("old"); stray.push(old);
    const { tick } = make();
    tick();
    expect(old.remove).toHaveBeenCalled();
    expect(spawned[0].remove).not.toHaveBeenCalled();
  });

  it("누름: 표식이 빈 칸이면 onPress(이름, 그룹 내 순번) 후 render, 표식 재충전", () => {
    const { calls, tick } = make();
    tick();
    calls.length = 0;
    spawned[0].c.m.delete(37);
    tick();
    expect(calls).toEqual([["press", "move", 1], ["render"]]);
    expect(spawned[0].c.getItem(37).nameTag).toBe("§r§8mark");
    calls.length = 0;
    tick();
    expect(calls).toEqual([]);
  });

  it("runtime_set_button: 꺼진 버튼은 칸이 비고 눌림으로 세지 않으며 켜면 표식이 돌아온다", () => {
    let session: any;
    const { calls, tick } = make({ onStart: (s: any) => { session = s; s.setButton("move", 1, false); } });
    tick();
    const c = spawned[0].c;
    expect(c.getItem(36)?.nameTag).toBe("§r§8mark");
    expect(c.getItem(37)).toBeUndefined();
    expect(c.getItem(38)?.nameTag).toBe("§r§8mark");
    calls.length = 0;
    tick(); tick();
    expect(calls).toEqual([]); // 빈 칸이지만 눌림이 아니다
    expect(c.getItem(37)).toBeUndefined();
    session.buttons(); // 다시 채워도 꺼진 칸은 비어 있다
    expect(c.getItem(37)).toBeUndefined();
    c.m.set(37, { nameTag: "§r§8mark", getLore: () => [], typeId: "x" });
    session.setButton("move", 1, false); // 이미 꺼진 칸에 표식이 남아 있으면 지운다
    expect(c.getItem(37)).toBeUndefined();
    session.setButton("move", 1, true);
    expect(c.getItem(37)?.nameTag).toBe("§r§8mark");
    c.m.delete(37);
    tick();
    expect(calls).toEqual([["press", "move", 1], ["render"]]);
  });

  it("runtime_leak_cleanup: 가방에 들어온 표식 아이템을 지운다", () => {
    make();
    const m = stack("minecraft:paper", 1, "x", ["§r§8mark"]);
    player.pc.m.set(5, m);
    h.state.invHandlers[0]({ player, itemStack: m, slot: 5 });
    expect(player.pc.getItem(5)).toBeUndefined();
    const other = stack("minecraft:paper", 1, "x", ["other"]);
    player.pc.m.set(6, other);
    h.state.invHandlers[0]({ player, itemStack: other, slot: 6 });
    expect(player.pc.getItem(6)).toBe(other);
  });

  it("runtime_diff_no_write: 같은 아이템은 다시 쓰지 않는다, put은 이름으로", () => {
    const { tick } = make({ render: (s: any) => s.put("score", 0, paper("12", ["a"])) });
    tick();
    const c = spawned[0].c;
    expect(c.getItem(33).nameTag).toBe("12");
    const before = c.setItem.mock.calls.length;
    writeSlots({ storage: c }, { 33: paper("12", ["a"]) });
    expect(c.setItem.mock.calls.length).toBe(before);
    writeSlots({ storage: c }, { 33: paper("13", ["a"]) });
    expect(c.setItem.mock.calls.length).toBe(before + 1);
    writeSlots({ storage: c }, { 33: undefined });
    expect(c.getItem(33)).toBeUndefined();
  });

  it("tickEvery, paper 빈 이름, text", () => {
    const hits: number[] = [];
    const { tick } = make({ tickEvery: { 2: () => hits.push(h.state.tick) } });
    tick(); tick(); tick(); tick();
    expect(hits).toEqual([2, 4]);
    expect(paper("")).toBeUndefined();
    expect(text("5 pts")).toBe("§r5 pts");
    expect(text("Score")).toBe("Score");
  });

  it("runtime_launcher_tag: 아이템 태그나 typeId로 런처를 인식한다", () => {
    player.pc.m.set(0, { typeId: "x:other", hasTag: (t: string) => t === "x:tag" });
    const { tick } = make({ launcherTag: "x:tag" });
    tick();
    expect(spawned).toHaveLength(1);
    held = false; tick();
    player.pc.m.set(0, { typeId: "x:tag" }); // hasTag 없이 typeId만
    held = true; tick();
    expect(spawned).toHaveLength(2);
    player.pc.m.set(0, { typeId: "x:other", hasTag: () => false });
    tick();
    expect(spawned[1].remove).toHaveBeenCalled();
  });

  it("runtime_diff_durability: 내구도 damage가 바뀌면 다시 쓰고 같으면 쓰지 않는다", () => {
    const c = h.container();
    const tool = (d: number) => stack("minecraft:iron_sword", 1, undefined, undefined, d);
    writeSlots({ storage: c }, { 1: tool(5) });
    expect(c.getItem(1).dur.damage).toBe(5);
    const n = c.setItem.mock.calls.length;
    writeSlots({ storage: c }, { 1: tool(5) });
    expect(c.setItem.mock.calls.length).toBe(n);
    writeSlots({ storage: c }, { 1: tool(6) });
    expect(c.setItem.mock.calls.length).toBe(n + 1);
  });
});
