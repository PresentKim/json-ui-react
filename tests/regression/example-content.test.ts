// F-T11-1: 예시 화면이 실제 내용(아이콘, 글자)을 보내고, 목적에 맞는 창을 쓰는지 확인한다.
import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { buildExamples } from "../../example/build-rp.ts";
import { EXAMPLES } from "../../example/catalog.ts";
import type { JsonObject } from "../../src/types.ts";

const src = readFileSync(new URL("../../example/bp/scripts/main.js", import.meta.url), "utf8");

type Btn = { text: string; icon?: string };
type Form = { title: string; buttons: Btn[] };

/** main.js를 모의 @minecraft 모듈로 실행해, scriptevent로 연 폼의 버튼 목록을 얻는다. */
function openForm(id: string): Form {
  const forms: Form[] = [];
  let handler: ((e: unknown) => void) | undefined;
  class ActionFormData {
    f: Form = { title: "", buttons: [] };
    constructor() { forms.push(this.f); }
    title(t: string) { this.f.title = t; return this; }
    body() { return this; }
    button(text: string, icon?: string) { this.f.buttons.push({ text, icon }); return this; }
    show() { return new Promise(() => {}); }
  }
  const sub = { subscribe: () => {} };
  const world = { afterEvents: { itemUse: sub, playerSpawn: sub } };
  const system = { run: () => {}, afterEvents: { scriptEventReceive: { subscribe: (h: (e: unknown) => void) => { handler = h; } } } };
  const code = src.replace(/^import .*$/gm, "");
  new Function("ItemStack", "system", "world", "ActionFormData", code)(class {}, system, world, ActionFormData);
  handler!({ id: "jur:open", message: id, sourceEntity: { typeId: "minecraft:player", onScreenDisplay: {}, sendMessage() {} } });
  return forms[forms.length - 1]!;
}

describe("example content (F-T11-1)", () => {
  it("research: 항목이 있는 칸(0~95)마다 아이콘 인자를 준다", () => {
    const f = openForm("research");
    expect(f.buttons).toHaveLength(2022);
    // 연구 필요 탭은 한 페이지 48칸이 모두 차고, 연구 완료 탭은 항목 수만큼 찬다(FFR 원본과 같음).
    const filled = f.buttons.slice(0, 96).filter((b) => b.icon !== undefined);
    expect(filled.length).toBeGreaterThanOrEqual(80);
    for (const b of f.buttons.slice(0, 96)) {
      expect(b.text).toBe("§r");
      if (b.icon === undefined) continue;
      expect(b.icon).toMatch(/^textures\/items\//);
    }
    for (let k = 0; k < 48; k++) expect(f.buttons[k]!.icon, `칸 ${k}`).toBeDefined();
    // 탭 글자와 아이콘, 상세 첫 블록(이름 + 아이콘, 재료 아이콘)
    expect(f.buttons[96]).toMatchObject({ icon: "textures/items/book_normal" });
    expect(f.buttons[96]!.text).toMatch(/^Needed \d+$/);
    expect(f.buttons[97]).toMatchObject({ icon: "textures/items/emerald" });
    expect(f.buttons[102]!.text).toBe("§cItem 2"); // 아이템 1은 연구 완료 탭
    expect(f.buttons[102]!.icon).toBeDefined();
    expect(f.buttons[105]!.icon).toBeDefined();
    expect(f.buttons[102 + 19]!.text).toMatch(/^(Start research|Researched)$/);
  });

  it("다른 예시도 버튼마다 글자와 아이콘을 준다", () => {
    for (const e of EXAMPLES) {
      if (e.id === "research") continue;
      const f = openForm(e.id);
      expect(f.buttons, e.id).toHaveLength(e.buttons);
      for (const b of f.buttons) {
        expect(b.icon, e.id).toMatch(/^textures\/items\//);
        expect(b.text.trim().length, e.id).toBeGreaterThan(0);
        expect(b.text, e.id).not.toContain(e.id);
      }
    }
    // 가상 목록: 이름은 12글자 안
    const v = openForm("virtual-list-500").buttons[11]!.text;
    expect(v.slice(0, 12).trim()).toBe("Item 12");
  });

  const files = buildExamples().files;
  const jur = JSON.parse(files["ui/jur.json"]!) as JsonObject;

  it("research 외 예시 정의에는 ffr.placeholder가 없다", () => {
    expect(JSON.stringify(jur)).not.toContain("ffr.placeholder");
    for (const [k, v] of Object.entries(jur)) {
      if (!k.includes("@")) continue;
      expect(JSON.stringify(v), k).not.toContain("Pick a research.");
    }
    // 한 판짜리 창은 오른쪽 판이 없다
    expect(JSON.stringify(jur["window1"])).not.toContain("right");
    // research는 그대로 자리표시를 쓴다
    expect(files["ui/ffr.json"]).toContain("ffr.placeholder");
  });

  it("slot-grid 상세에 배경 image가 있고 칸 번호로 그 칸 버튼을 읽는다", () => {
    const d = jur["sg_detail"] as JsonObject;
    expect(d.type).toBe("image");
    expect(d.texture).toBe("textures/ui/ffr/panel");
    const text = JSON.stringify(d);
    expect(text).toContain("ffr.detail_icon");
    expect(text).toContain("ffr.text_item");
    expect(text).toContain('"collection_index":"$cell"');
    expect(JSON.stringify(jur["sg_panes"])).toContain('"$cell":23');
  });
});
