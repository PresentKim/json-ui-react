import { describe, it, expect, vi, beforeEach } from "vitest";
import { resolve, join } from "node:path";
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";

const h = vi.hoisted(() => {
  const state: any = { players: [], tick: 0, intervals: [] };
  class ItemStack {
    nameTag?: string; lore: string[] = [];
    constructor(public typeId: string, public amount = 1) {}
    setLore(l: string[]) { this.lore = l; }
    getLore() { return this.lore; }
  }
  return { state, ItemStack };
});
vi.mock("@minecraft/server", () => ({
  ItemStack: h.ItemStack,
  system: { get currentTick() { return h.state.tick; }, runInterval: (fn: () => void) => { h.state.intervals.push(fn); }, run: (fn: () => void) => fn() },
  world: { getAllPlayers: () => h.state.players, afterEvents: { playerInventoryItemChange: { subscribe() {} }, playerSpawn: { subscribe() {} } } },
}));

import { buildEntityScreens } from "json-ui-react";
import { e2048 } from "../../example-entity/screens/e2048.tsx";

const built = buildEntityScreens([e2048], { namespace: "e2048" });
const ui = JSON.parse(built.files["ui/e2048.json"]!);
const info = built.screens.e2048!;

describe("example 2048", () => {
  it("빌드: 오류 진단 없음, 칸 지도", () => {
    expect(built.diagnostics.filter((d) => d.level === "error")).toEqual([]);
    expect(info.nameTag).toBe("§b§w§2§0");
    expect(info.inventorySize).toBe(243);
    expect(info.slots.mover).toEqual(Array.from({ length: 16 }, (_, i) => 1 + i));
    expect(info.slots.final).toEqual(Array.from({ length: 16 }, (_, i) => 17 + i));
    expect(info.slots.score).toEqual([33]);
    expect(info.slots.status).toEqual([34]);
    expect(Object.keys(info.buttons).sort()).toEqual(["D", "L", "New", "R", "U"]);
    expect(info.buttons.U).toEqual([36]);
    expect(info.buttons.New).toEqual([40]);
  });

  it("e2048_keys: 움직임 칸 키 338개, 결과 칸 78개", () => {
    const find = (o: any, pred: (k: string, v: any) => boolean): any[] => {
      const out: any[] = [];
      const walk = (v: any) => {
        if (Array.isArray(v)) v.forEach(walk);
        else if (v && typeof v === "object") for (const [k, x] of Object.entries(v)) { if (pred(k, x)) out.push(x); walk(x); }
      };
      walk(o);
      return out;
    };
    const factories = find(ui, (k, v) => k === "factory" && v?.control_ids).map((f) => f.control_ids);
    const sizes = new Set(factories.map((f) => Object.keys(f).length));
    expect([...sizes].sort((a, b) => a - b)).toEqual([78, 338]);
    expect(factories.filter((f) => Object.keys(f).length === 338)).toHaveLength(16);
    expect(factories.filter((f) => Object.keys(f).length === 78)).toHaveLength(16);
    const mover = factories.find((f) => Object.keys(f).length === 338);
    expect(mover["U2at7"]).toBe("@e2048.ft_U2_7");
    expect(mover["U2bt7"]).toBe("@e2048.ft_U2_7");
    expect(Object.keys(ui).filter((k) => k.startsWith("ft_"))).toHaveLength((13 + 3) * 13);
    expect(ui.slide_R3.to).toEqual([90, 0]);
    expect(ui.mover_alpha.next).toBe("@e2048.mover_off");
    expect(ui.ft_M_3.controls[0].tile.anims).toEqual(["@e2048.final_alpha", "@e2048.pop_wait"]);
  });

  it("두 방향 패드는 같은 버튼 칸, New 버튼, 라벨", () => {
    const text = built.files["ui/e2048.json"]!;
    expect(text.match(/gameTipArrow_up/g)).toHaveLength(6);
    expect(text).toContain('"New"');
  });

  describe("스크립트", () => {
    let player: any, box: any, pc: Map<number, any>;
    beforeEach(() => {
      h.state.intervals = []; h.state.tick = 0;
      pc = new Map([[0, { typeId: "jure:test_launcher" }]]);
      const store = new Map<number, any>();
      box = { id: "b", isValid: true, addTag() {}, teleport() {}, remove() { box.isValid = false; }, store, getComponent: () => ({ container: { getItem: (i: number) => store.get(i), setItem: (i: number, it?: any) => (it ? store.set(i, it) : store.delete(i)) } }) };
      player = {
        id: "p", selectedSlotIndex: 0,
        dimension: { spawnEntity: () => box, getEntities: () => [] },
        getViewDirection: () => ({ x: 0, y: 0, z: 1 }), getHeadLocation: () => ({ x: 0, y: 2, z: 0 }),
        getComponent: () => ({ container: { getItem: (i: number) => pc.get(i), setItem() {} } }),
      };
      h.state.players = [player];
    });

    async function start() {
      vi.resetModules();
      // 패키저는 runtime.js를 스크립트 옆에 복사한다. 테스트는 같은 일을 임시 폴더에서 한다.
      const dir = mkdtempSync(join(tmpdir(), "e2048-"));
      const src = readFileSync(resolve("example-entity/bp/scripts/e2048.js"), "utf8");
      writeFileSync(join(dir, "runtime.js"), readFileSync(resolve("src/entity/runtime.js"), "utf8"));
      writeFileSync(join(dir, "e2048.js"), src);
      const { setup } = await import(/* @vite-ignore */ join(dir, "e2048.js"));
      setup(info);
      const tick = () => h.state.intervals.forEach((f: () => void) => f());
      tick();
      return tick;
    }
    const names = (slots: number[]) => slots.map((s) => box.store.get(s)?.nameTag);

    it("e2048_parity: 이동하면 타일 이름의 a/b가 뒤집힌다", async () => {
      const tick = await start();
      const finals0 = names(info.slots.final!).filter(Boolean);
      expect(finals0.length).toBeGreaterThanOrEqual(2);
      expect(finals0.every((n) => /^[NP]at\d$/.test(n))).toBe(true);
      expect(box.store.get(info.slots.score![0]!).nameTag).toBe("Score 0");
      expect(box.store.get(info.slots.status![0]!).nameTag).toBe("v1.1.0");
      for (const slot of Object.values(info.buttons).flat()) expect(box.store.has(slot)).toBe(true);
      // 칸이 비면 눌림. 가능한 방향 중 하나를 시도해 이동이 생길 때까지 눌러 본다.
      let flipped = false;
      for (const b of ["L", "U", "R", "D"]) {
        box.store.delete(info.buttons[b]![0]!);
        tick();
        const fin = names(info.slots.final!).filter(Boolean);
        if (fin.some((n) => /^[NMP]bt\d$/.test(n))) { flipped = true; expect(fin.every((n) => /^[NMP]bt\d$/.test(n))).toBe(true); break; }
      }
      expect(flipped).toBe(true);
      expect(names(info.slots.mover!).filter(Boolean).every((n) => /^(S0|[UDLR][123])bt\d+$/.test(n))).toBe(true);
      expect(box.store.has(info.buttons.U![0]!)).toBe(true);
    });

    it("New는 새 판을 만들고 점수를 0으로", async () => {
      const tick = await start();
      box.store.delete(info.buttons.New![0]!);
      tick();
      expect(names(info.slots.final!).filter(Boolean).every((n) => /^[NP]bt\d$/.test(n))).toBe(true);
      expect(box.store.get(info.slots.score![0]!).nameTag).toBe("Score 0");
    });
  });
});
