import { describe, it, expect, vi, beforeEach } from "vitest";
import { resolve, join } from "node:path";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { buildEntityScreens } from "../../src/entity/build.tsx";
import { research } from "../../example-entity/screens/research.tsx";

// 모의 @minecraft/server
const h = vi.hoisted(() => {
  const state: any = { players: [], tick: 0, intervals: [], useHandlers: [] };
  class ItemStack {
    nameTag?: string; lore: string[] = [];
    constructor(public typeId: string, public amount = 1) {}
    setLore(l: string[]) { this.lore = l; }
    getLore() { return this.lore; }
  }
  const container = (size: number) => {
    const m = new Map<number, any>();
    return {
      m, size,
      getItem: (i: number) => m.get(i),
      setItem: vi.fn((i: number, it?: any) => { if (it) m.set(i, it); else m.delete(i); }),
      addItem: (it: any) => { for (let i = 0; i < size; i++) if (!m.has(i)) { m.set(i, it); return undefined; } return it; },
    };
  };
  return { state, ItemStack, container };
});
vi.mock("@minecraft/server", () => ({
  ItemStack: h.ItemStack,
  system: { get currentTick() { return h.state.tick; }, runInterval: (fn: () => void) => { h.state.intervals.push(fn); }, run: (fn: () => void) => fn() },
  world: {
    getAllPlayers: () => h.state.players,
    afterEvents: {
      playerInventoryItemChange: { subscribe: () => {} },
      playerSpawn: { subscribe: () => {} },
      itemUse: { subscribe: (f: any) => h.state.useHandlers.push(f) },
    },
  },
}));
// 스크립트는 "./runtime.js"를 부른다(패커가 옆에 복사). vi.doMock은 없는 파일 경로를 가로채지 못하므로,
// 스크립트 복사본의 import만 라이브러리 원본 절대경로로 바꿔 임시 폴더에서 불러온다.
const RUNTIME = resolve(__dirname, "../../src/entity/runtime.js");
const SCRIPT = resolve(__dirname, "../../example-entity/bp/scripts/research.js");
async function loadScript(): Promise<any> {
  const dir = mkdtempSync(join(tmpdir(), "research-"));
  const file = join(dir, "research.js");
  writeFileSync(file, readFileSync(SCRIPT, "utf8").replace('"./runtime.js"', JSON.stringify(RUNTIME)));
  try {
    return await import(/* @vite-ignore */ file);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

const build = () => buildEntityScreens([research], { namespace: "ers" });
const SEL = "SELECTED";

describe("example research: 빌드와 칸 계약", () => {
  const r = build();
  const scr = r.screens.research!;

  it("오류 진단 없이 243칸으로 빌드된다", () => {
    expect(r.diagnostics.filter((d) => d.level === "error" || d.level === "warn")).toEqual([]);
    expect(scr.inventorySize).toBe(243);
    expect(scr.nameTag).toBe("§b§w§r§s");
  });

  it("원본 칸 맵과 같다", () => {
    const range = (a: number, n: number) => Array.from({ length: n }, (_, i) => a + i);
    expect(scr.slots).toEqual({
      cells0: range(1, 48), cells1: range(49, 48), heads: [97, 98], pager0: [99, 100], pager1: [101, 102],
      detail0: range(103, 22), detail1: range(125, 22), picks0: range(147, 48), picks1: range(195, 48),
    });
    expect(scr.buttons).toEqual({
      pick0: range(147, 48), pick1: range(195, 48), pager0: [99, 100], pager1: [101, 102], start: [122],
    });
  });

  it("UI 사실: 탭 2개(첫 탭 기본), 격자 6x8 x2, 쪽 넘김 2, 시작 버튼", () => {
    const text = r.files["ui/ers.json"]!;
    const json = JSON.parse(text);
    const all = JSON.stringify(json);
    expect((all.match(/"toggle_name":"ers_ers"/g) ?? []).length).toBe(2);
    expect(all).toContain('"toggle_default_state":true');
    expect(all).toContain('"toggle_group_forced_index"');
    for (let t = 0; t < 2; t++) {
      expect((all.match(new RegExp(`"pick${t}_c\\d+`, "g")) ?? []).length).toBeGreaterThanOrEqual(48);
      expect(all).toContain(`"pick${t}_r5"`);
      expect(all).toContain(`"pager${t}"`);
    }
    expect(all).toContain("Start research");
    expect(all).toContain("Not enough materials");
    expect(all).toContain("Researched");
    expect(all).toContain("Pick a research.");
    // 첫 탭 판은 두 번째 탭이 꺼졌을 때 보인다.
    expect(all).toContain("(not #toggle_state)");
  });
});

// ---- 스크립트
type Fake = { player: any; box: any; menu: any; tick: () => void; inv: any };
let holds = true;
let boxes: any[];

function setupWorld(): Fake {
  Object.assign(h.state, { tick: 0, intervals: [], useHandlers: [] });
  boxes = [];
  const inv = h.container(36);
  inv.m.set(0, new h.ItemStack("jure:research"));
  const props = new Map<string, any>();
  const player: any = {
    id: "p1", selectedSlotIndex: 0, isSneaking: false, location: { x: 0, y: 0, z: 0 },
    dimension: {
      spawnEntity: () => {
        const c = h.container(243);
        const b: any = { id: "b" + boxes.length, isValid: true, tags: [], nameTag: "", teleport() {}, addTag(t: string) { this.tags.push(t); }, remove() { b.isValid = false; }, getComponent: () => ({ container: c }), c };
        boxes.push(b);
        return b;
      },
      getEntities: () => [], spawnItem: vi.fn(),
    },
    getViewDirection: () => ({ x: 0, y: 0, z: 1 }), getHeadLocation: () => ({ x: 0, y: 2, z: 0 }),
    getComponent: () => ({ container: inv }),
    getDynamicProperty: (k: string) => props.get(k), setDynamicProperty: (k: string, v?: any) => { if (v === undefined) props.delete(k); else props.set(k, v); },
    sendMessage: vi.fn(),
  };
  h.state.players = [player];
  return { player, box: undefined, inv, menu: undefined, tick: () => { h.state.tick++; h.state.intervals.forEach((f: () => void) => f()); } };
}

async function boot() {
  vi.resetModules();
  const mod = await loadScript();
  const w = setupWorld();
  const scr = build().screens.research!;
  w.menu = mod.setup(scr);
  w.tick();
  w.box = boxes[0];
  return { w, scr };
}

describe("example research: 스크립트", () => {
  beforeEach(() => { holds = true; });

  it("세션 시작: 두 탭 머리, 격자, 버튼 표식", async () => {
    const { w, scr } = await boot();
    const c = w.box.c;
    expect(c.getItem(scr.slots.heads![0]!).nameTag).toBe("To do 80"); // 120개 중 40개가 기본 완료
    expect(c.getItem(scr.slots.heads![1]!).nameTag).toBe("Done 40");
    expect(c.getItem(scr.slots.cells0![0]!).nameTag).toBe("Item 2");
    expect(c.getItem(scr.slots.cells1![0]!).nameTag).toBe("Item 1");
    expect(c.getItem(scr.slots.cells0![47]!).nameTag).toBe("Item 72"); // 쪽 크기 48
    expect(scr.buttons.pick0!.every((i) => c.getItem(i))).toBe(true);
    expect(c.getItem(scr.slots.detail0![0]!)).toBeUndefined(); // 선택 전
  });

  it("research_pick_press: 5번 칸의 pick을 누르면 선택되고 상세가 채워진다", async () => {
    const { w, scr } = await boot();
    const c = w.box.c;
    const k = 5;
    const pickSlot = scr.buttons.pick0![k]!;
    expect(pickSlot).toBe(scr.slots.picks0![k]);
    c.setItem(pickSlot, undefined); // 빠른 이동으로 표식이 빠져나감
    w.tick();
    // 마지막 쪽이 아닌 To do 목록 6번째(0부터 5) = 연구 8번째 인덱스(i%3==0 제외) -> "Item 9"
    const cell = c.getItem(scr.slots.cells0![k]!);
    expect(cell.nameTag).toBe("Item 9");
    expect(cell.getLore()).toContain(SEL);
    const d = scr.slots.detail0!;
    expect(c.getItem(d[0]!).nameTag).toBe("§cItem 9");
    expect(c.getItem(d[0]!).typeId).toBe("minecraft:hopper"); // ICONS[8]
    expect(c.getItem(d[1]!).nameTag).toBe("§cNot researched");
    expect(c.getItem(d[2]!).nameTag).toContain("Description of item 9.");
    expect(c.getItem(d[3]!)).toBeDefined(); // 재료 1개 이상
    expect(c.getItem(d[11]!)).toBeDefined(); // 보상 1개 이상
    expect(c.getItem(d[19]!).getLore()).toContain("WAIT"); // 재료 없음
    expect(c.getItem(pickSlot)).toBeDefined(); // 표식 재충전
    // 다른 칸 선택은 하나만 SELECTED
    const marked = scr.slots.cells0!.filter((i) => c.getItem(i)?.getLore().includes(SEL));
    expect(marked).toEqual([scr.slots.cells0![k]]);
    // 두 번째 탭은 영향 없음
    expect(c.getItem(scr.slots.detail1![0]!)).toBeUndefined();
  });

  it("시작: 재료가 있으면 READY, 누르면 재료 소모, 보상 지급, Done 탭으로 이동", async () => {
    const { w, scr } = await boot();
    const c = w.box.c;
    // Item 2 (i=1): mats = ((1*5)%4)+1 = 2개
    c.setItem(scr.buttons.pick0![0]!, undefined);
    w.tick();
    expect(c.getItem(scr.slots.detail0![0]!).nameTag).toBe("§cItem 2");
    const r = (id: string, n: number) => { const it = new h.ItemStack(id, n); w.inv.addItem(it); };
    const mats = [0, 1].map((j) => c.getItem(scr.slots.detail0![3 + j]!)).filter(Boolean);
    expect(mats).toHaveLength(2);
    for (const m of mats) r(m.typeId, 64);
    h.state.tick = 9; w.tick(); // 10틱 렌더
    expect(c.getItem(scr.slots.detail0![19]!).getLore()).toContain("READY");
    c.setItem(scr.buttons.start![0]!, undefined);
    w.tick();
    expect(c.getItem(scr.slots.heads![0]!).nameTag).toBe("To do 79");
    expect(c.getItem(scr.slots.heads![1]!).nameTag).toBe("Done 41");
    expect(c.getItem(scr.slots.detail0![0]!)).toBeUndefined();
    expect(c.getItem(scr.slots.detail0![MESSAGE]!).nameTag).toBe("Researched Item 2.");
  });

  it("쪽 넘김: 다음 쪽으로 가면 선택이 풀린다", async () => {
    const { w, scr } = await boot();
    const c = w.box.c;
    c.setItem(scr.buttons.pager0![1]!, undefined);
    w.tick();
    expect(c.getItem(scr.slots.cells0![0]!).nameTag).toBe("Item 74"); // 80개 중 49번째
    expect(c.getItem(scr.slots.cells0![31]!)).toBeDefined(); // 80-48=32칸만 찬다
    expect(c.getItem(scr.slots.cells0![32]!)).toBeUndefined();
    c.setItem(scr.buttons.pager0![0]!, undefined);
    w.tick();
    expect(c.getItem(scr.slots.cells0![0]!).nameTag).toBe("Item 2");
  });

  it("웅크리고 사용: 연구 초기화와 시험 재료", async () => {
    const { w } = await boot();
    w.player.isSneaking = true;
    h.state.useHandlers[0]({ itemStack: { typeId: "jure:research" }, source: w.player });
    expect(w.player.sendMessage).toHaveBeenCalled();
    expect(w.player.getDynamicProperty("jure:research_done")).toBeUndefined();
  });
});

const MESSAGE = 21;
