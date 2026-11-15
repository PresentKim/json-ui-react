import { describe, it, expect, vi, beforeEach, afterAll } from "vitest";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { buildEntityScreens } from "json-ui-react";
import type { ScreenInfo } from "json-ui-react";
import { matchmaking } from "../../example-entity/screens/matchmaking.tsx";

// 모의 @minecraft/server
const h = vi.hoisted(() => {
  const state: any = { players: [], tick: 0, intervals: [], invHandlers: [], spawnHandlers: [], leaveHandlers: [] };
  class ItemStack {
    nameTag?: string; lore: string[] = [];
    constructor(public typeId: string, public amount = 1) {}
    setLore(l: string[]) { this.lore = l; }
    getLore() { return this.lore; }
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
    getEntity: (id: string) => h.state.players.find((p: any) => p.id === id),
    afterEvents: {
      playerInventoryItemChange: { subscribe: (f: any) => h.state.invHandlers.push(f) },
      playerSpawn: { subscribe: (f: any) => h.state.spawnHandlers.push(f) },
      playerLeave: { subscribe: (f: any) => h.state.leaveHandlers.push(f) },
    },
  },
}));
// 스크립트는 옆 폴더의 ./runtime.js를 가져오는데(패키저가 복사) 저장소에는 그 파일이 없다(vi.doMock도 없는 파일은 못 막는다).
// 그래서 가져오는 경로만 src/entity/runtime.js로 바꾼 사본을 임시 폴더에 두고 불러온다.
const RUNTIME = resolve(__dirname, "../../src/entity/runtime.js");
const SCRIPT = resolve(__dirname, "../../example-entity/bp/scripts/matchmaking.js");
let copyDir = "";
let copyN = 0;
function loadScript(): Promise<{ setup(s: ScreenInfo): any }> {
  copyDir ||= mkdtempSync(join(tmpdir(), "mm-script-"));
  const file = join(copyDir, `matchmaking${copyN++}.js`);
  writeFileSync(file, readFileSync(SCRIPT, "utf8").replace('"./runtime.js"', JSON.stringify(RUNTIME)));
  return import(/* @vite-ignore */ file);
}
afterAll(() => { if (copyDir) rmSync(copyDir, { recursive: true, force: true }); });

const built = buildEntityScreens([matchmaking], { namespace: "emm_box" });
const screen: ScreenInfo = built.screens.matchmaking!;
const ui = JSON.parse(built.files["ui/emm_box.json"]!) as Record<string, any>;

/** 이름이 name인 컨트롤을 모두 찾는다(정의 키는 `이름@부모`도 같은 이름으로 본다). */
function findAll(n: any, name: string, out: any[] = []): any[] {
  if (Array.isArray(n)) n.forEach((c) => findAll(c, name, out));
  else if (n && typeof n === "object") {
    for (const [k, v] of Object.entries(n)) {
      if (k.split("@")[0] === name && v && typeof v === "object" && !Array.isArray(v)) out.push(v);
      findAll(v, name, out);
    }
  }
  return out;
}

describe("matchmaking 화면", () => {
  it("빌드: 오류 진단이 없다", () => {
    expect(built.diagnostics.filter((d) => d.level === "error")).toEqual([]);
    expect(screen.nameTag).toBe("§b§w§m§m");
    expect(screen.inventorySize).toBe(243);
  });

  it("칸 지도: 원본과 같은 번호와 개수", () => {
    const s = screen.slots;
    for (let g = 0; g < 4; g++) expect(s[`row${g}`]).toEqual([1, 2, 3, 4, 5].map((k) => k + g * 5));
    expect([s.game, s.description, s.header, s.timer, s.estimate, s.count, s.feed, s.footer, s.primary, s.secondary, s.ready]).toEqual(
      [[21], [22], [23], [24], [25], [26], [27], [28], [29], [30], [31]],
    );
    expect(s.pips).toEqual([32, 33, 34, 35, 36, 37, 38, 39, 40, 41]);
    expect([s.primary_label, s.secondary_label]).toEqual([[42], [43]]);
    expect(screen.buttons).toEqual({ game: [1, 6, 11, 16], primary: [29], secondary: [30] });
  });

  it("UI: 키 칸 변형 수와 애니메이션", () => {
    const factories = findAll(ui, "state").filter((n) => n.factory);
    expect(factories).toHaveLength(4);
    expect(Object.keys(factories[0].factory.control_ids)).toEqual(["S", "Q"]);
    const pips = JSON.stringify(ui).match(/"pip\d+"/g) ?? [];
    expect(pips).toHaveLength(10);
    const pip0 = findAll(ui, "pip0")[0];
    expect(Object.keys(pip0.factory.control_ids)).toEqual(["E", "F", "Y", "A", "X"]);
    const ready = findAll(ui, "ready").find((n) => n.factory)!;
    expect(Object.keys(ready.factory.control_ids)).toEqual(["Ta", "Tb"]);
    expect(ready.property_bag["#k"]).toEqual([]);
    expect(ui.ready_drain).toMatchObject({ anim_type: "size", duration: 10, to: [0, 4] });
    expect(ui.pulse_out.next).toBe("@emm_box.pulse_in");
    expect(ui.pulse_in.next).toBe("@emm_box.pulse_out");
    expect(ui.state_Q.controls.some((c: any) => c.dot)).toBe(true);
  });

  it("mm_hidden_buttons: 주/보조 버튼은 자기 칸이 비면 숨는다(hideWhenEmpty)", () => {
    for (const [name, button] of [["primary", 29], ["secondary", 30]] as const) {
      const b = findAll(ui, name).find((n) => n.collection_index === button)!;
      expect(b.bindings.at(-1)).toEqual({ binding_type: "view", source_property_name: "(not ((#hover_text - '§o' - '§f' - '§r') = ''))", target_property_name: "#visible" });
    }
    expect(findAll(ui, "primary_show")).toEqual([]);
  });

  it("행 글자와 상세 글자: font_scale_factor와 정렬", () => {
    const timer = findAll(ui, "timer")[0];
    expect(timer.font_scale_factor).toBe(1.8);
    expect(timer.text_alignment).toBe("center");
    expect(findAll(ui, "subtitle")[0].font_scale_factor).toBe(0.7);
    expect(findAll(ui, "name")[0].font_scale_factor).toBeUndefined();
  });
});

// ------------------------------------------------------------------ 스크립트

function fakeBox(id: string) {
  const c = h.container();
  const box: any = { id, isValid: true, tags: [] as string[], nameTag: "", teleport: vi.fn(), addTag(t: string) { this.tags.push(t); }, remove: vi.fn(() => { box.isValid = false; }), getComponent: () => ({ container: c }), c };
  return box;
}

let box: any;
let player: any;
let bar: string[];

beforeEach(() => {
  Object.assign(h.state, { tick: 0, intervals: [], invHandlers: [], spawnHandlers: [], leaveHandlers: [] });
  box = undefined;
  bar = [];
  const pc = h.container();
  pc.m.set(0, { typeId: "jure:matchmaking" });
  const dim = {
    spawnEntity: vi.fn(() => (box = fakeBox("b1"))),
    getEntities: vi.fn(() => []),
  };
  player = {
    id: "p1", name: "Steve", selectedSlotIndex: 0, dimension: dim,
    getViewDirection: () => ({ x: 0, y: 0, z: 1 }), getHeadLocation: () => ({ x: 0, y: 2, z: 0 }),
    getComponent: () => ({ container: pc }),
    playSound: vi.fn(), sendMessage: vi.fn(),
    onScreenDisplay: { setActionBar: (t: string) => bar.push(t) },
  };
  h.state.players = [player];
  vi.resetModules();
});

async function boot() {
  const mod = await loadScript();
  const menu = mod.setup(screen);
  const tick = () => { h.state.tick++; h.state.intervals.forEach((f: () => void) => f()); };
  const at = (name: string, i = 0) => box.c.getItem(screen.slots[name]![i]!);
  return { menu, tick, at };
}

describe("matchmaking 스크립트", () => {
  it("세션 시작: 제목, 버튼 표식, 첫 그림(게임 4줄, 숫자 접두사)", async () => {
    const { tick, at } = await boot();
    tick();
    expect(box.nameTag).toBe("§b§w§m§m");
    for (const slot of [1, 6, 11, 16, 29]) expect(box.c.getItem(slot)?.nameTag).toBe("§8Entity Matchmaking");
    expect(box.c.getItem(30)).toBeUndefined(); // 라벨이 빈 보조 버튼은 꺼져 칸이 비어 있다(hideWhenEmpty로 숨음)
    expect(at("row0", 1).nameTag).toBe("§1Sky Duels");
    expect(at("row1", 1).nameTag).toBe("Bed Rush");
    expect(at("row0", 4).nameTag).toBe("S");
    expect(at("game").nameTag).toBe("Sky Duels");
    expect(at("header").nameTag).toBe("§8Not in queue");
    expect(at("primary_label").nameTag).toBe("§2Play");
    expect(at("secondary_label")).toBeUndefined(); // 보조 버튼 숨김
    expect(at("pips", 4).nameTag).toBe("E");
    expect(at("pips", 0)).toBeUndefined(); // 2인 게임: 가운데 2칸만 점
    expect(at("pips", 4)).toBeDefined();
  });

  it("mm_digit_prefix: 숫자로 시작하는 글자는 §r 접두사가 붙는다", async () => {
    const { text } = await import("../../src/entity/runtime.js");
    expect(text("3 / 8")).toBe("§r3 / 8");
    expect(text("§83 / 8")).toBe("§83 / 8");
    const { tick, at } = await boot();
    tick();
    for (let slot = 1; slot < 44; slot++) {
      const n = box.c.getItem(slot)?.nameTag as string | undefined;
      if (n && !n.startsWith("§8Entity")) expect(/^[0-9]/.test(n)).toBe(false);
    }
    expect(at("count").nameTag).toBe("§82 players per match");
  });

  it("누름: 주 버튼이 비면 대기열에 들어가고 표식이 다시 차며 라벨이 바뀐다", async () => {
    const { tick, at } = await boot();
    tick();
    box.c.setItem(29, undefined);
    tick();
    expect(box.c.getItem(29)?.nameTag).toBe("§8Entity Matchmaking");
    expect(at("header").nameTag).toMatch(/^Finding match\.+$/);
    expect(at("primary_label").nameTag).toBe("§4Cancel");
    expect(at("row0", 4).nameTag).toBe("Q");
    expect(at("feed").nameTag).toBe("§8You joined the queue");
    // 취소
    box.c.setItem(29, undefined);
    tick();
    expect(at("header").nameTag).toBe("§8Not in queue");
    expect(at("footer").nameTag).toBe("§6You left the queue.");
  });

  it("누름: 게임 버튼(두 번째 줄)은 선택을 바꾼다", async () => {
    const { tick, at } = await boot();
    tick();
    box.c.setItem(6, undefined);
    tick();
    expect(at("game").nameTag).toBe("Bed Rush");
    expect(at("row1", 1).nameTag).toBe("§1Bed Rush");
    expect(at("row1", 4).nameTag).toBe("S");
    expect(at("row0", 4)).toBeUndefined();
  });
});
