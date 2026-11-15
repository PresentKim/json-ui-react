import { describe, it, expect } from "vitest";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { unzipSync, strFromU8 } from "fflate";
import { buildEntityAddonFiles, SCREEN_IDS } from "../../example-entity/build.ts";
import { packEntityAddon } from "../../example-entity/pack.ts";

const text = (m: Map<string, Uint8Array>, k: string): string => new TextDecoder().decode(m.get(k)!);
const files = buildEntityAddonFiles();

describe("엔티티 예시 애드온", () => {
  it("pack_deterministic: 두 번 만들면 바이트가 같다", () => {
    const dir = mkdtempSync(join(tmpdir(), "jure-entity-"));
    try {
      const a = join(dir, "a.mcaddon");
      const b = join(dir, "b.mcaddon");
      packEntityAddon(a);
      packEntityAddon(b);
      const bufA = readFileSync(a);
      expect(bufA.equals(readFileSync(b))).toBe(true);
      const outer = unzipSync(new Uint8Array(bufA));
      expect(Object.keys(outer).sort()).toEqual(["json-ui-react-entity-examples_bp.mcpack", "json-ui-react-entity-examples_rp.mcpack"]);
      const bp = unzipSync(outer["json-ui-react-entity-examples_bp.mcpack"]!);
      const rp = unzipSync(outer["json-ui-react-entity-examples_rp.mcpack"]!);
      expect(strFromU8(bp["manifest.json"]!)).toContain("[json-ui-react]entity-examples-bp");
      const rpMan = JSON.parse(strFromU8(rp["manifest.json"]!));
      expect(JSON.parse(strFromU8(bp["manifest.json"]!)).dependencies[0].uuid).toBe(rpMan.header.uuid);
      expect(bp["scripts/runtime.js"]).toBeDefined();
      expect(rp["ui/jure.json"]).toBeDefined();
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("four_in_one_world: 한 chest_screen.json·pocket_containers.json에 오버레이 4개, nameTag마다 게이트 하나", () => {
    for (const f of ["ui/chest_screen.json", "ui/pocket_containers.json"]) {
      const s = text(files.rp, f);
      for (const code of ["ml", "rs", "20", "mm"]) expect(s).toContain(`"${code}_overlay@jure.${code}_overlay"`);
    }
    const ui = text(files.rp, "ui/jure.json");
    const tags = [...text(files.bp, "scripts/generated/entity-screens.js").matchAll(/"nameTag": "([^"]+)"/g)].map((m) => m[1]!);
    expect(tags).toHaveLength(4);
    expect(new Set(tags).size).toBe(4);
    for (const tag of tags) expect(ui.split(`(not ($bwiki_title = '${tag}'))`)).toHaveLength(2);
  });

  it("main.js가 SCREENS의 화면 4개를 setup에 넘긴다", () => {
    const main = text(files.bp, "scripts/main.js");
    expect(main).toContain('from "./generated/entity-screens.js"');
    for (const id of SCREEN_IDS) expect(main).toMatch(new RegExp(`SCREENS\\["${id}"\\]`));
    expect(main.match(/^setup\w+\(/gm)).toHaveLength(4);
    for (const id of SCREEN_IDS) expect(text(files.bp, "scripts/generated/entity-screens.js")).toContain(`"${id}": {`);
  });

  it("에셋 4벌이 합쳐진다(아이콘 이름 4개, 엔티티·아이템 정의)", () => {
    const icons = JSON.parse(text(files.rp, "textures/item_texture.json")).texture_data;
    expect(Object.keys(icons).sort()).toEqual(["jure_e2048", "jure_matchmaking", "jure_menu_lab", "jure_research"]);
    for (const k of ["bp/entities/menu_lab_box.json", "bp/items/research.json"]) expect(files.bp.has(k.slice(3))).toBe(true);
    expect(files.rp.has("entity/e2048_box.entity.json")).toBe(true);
  });
});
