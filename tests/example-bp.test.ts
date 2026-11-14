import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const rd = (p: string) => readFileSync(new URL(`../example/${p}`, import.meta.url), "utf8");
const IDS = ["router", "tabs-inside", "tabs-follow", "tabs-lazy", "slot-grid", "virtual-list-500", "virtual-list-2000", "research"];
const CODES = ["ro", "ti", "tf", "tl", "sg", "v5", "v2", "re"];
const bp = JSON.parse(rd("bp/manifest.json"));
const rp = JSON.parse(rd("rp/manifest.json"));
const main = rd("bp/scripts/main.js");

describe("example bp", () => {
  it("test_bp_ids_match_catalog", () => {
    const m = main.match(/^\/\/ @examples: (.*)$/m);
    expect(JSON.parse(m![1])).toEqual(IDS);
    IDS.forEach((id, i) => expect(main).toContain(`title: "jur:${CODES[i]}"`));
    expect(main).toContain('"jur:open"');
    expect(main).toContain("[jur]");
  });
  it("test_manifest_uuids_fixed", () => {
    const uuids = [bp.header.uuid, ...bp.modules.map((m: any) => m.uuid), rp.header.uuid, ...rp.modules.map((m: any) => m.uuid)];
    for (const u of uuids) expect(u).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
    expect(new Set(uuids).size).toBe(uuids.length);
    expect(bp.dependencies.some((d: any) => d.uuid === rp.header.uuid)).toBe(true);
  });
  it("test_min_engine", () => {
    for (const m of [bp, rp]) {
      const v = m.header.min_engine_version;
      expect(v[0] > 1 || (v[0] === 1 && v[1] >= 21)).toBe(true);
    }
    const dep = (n: string) => bp.dependencies.find((d: any) => d.module_name === n);
    expect(dep("@minecraft/server").version).toBe("2.0.0");
    expect(dep("@minecraft/server-ui").version).toBe("2.0.0");
  });
  it("test_stick_opens_menu", () => {
    // 막대기 사용 → 예시 고르기 창. 메뉴 제목은 jur: 접두가 없어야 바닐라 폼으로 그려진다.
    expect(main).toMatch(/itemUse\.subscribe/);
    expect(main).toContain('"minecraft:stick"');
    const title = main.match(/\.title\("([^"]+)"\)\s*\n\s*\.body/);
    expect(title).not.toBeNull();
    expect(title![1].startsWith("jur:")).toBe(false);
    for (const id of IDS) expect(main).toMatch(new RegExp(`"${id}": "[^"]+"`));
  });

  it("pack_icon is 128x128 png", () => {
    const b = readFileSync(new URL("../example/rp/pack_icon.png", import.meta.url));
    expect(b.subarray(1, 4).toString()).toBe("PNG");
    expect([b.readUInt32BE(16), b.readUInt32BE(20)]).toEqual([128, 128]);
  });
});
