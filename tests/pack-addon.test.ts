import { describe, expect, it } from "vitest";
import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { unzipSync } from "fflate";
import { packAddon } from "../example/pack-addon";

const dir = mkdtempSync(join(tmpdir(), "jur-addon-test-"));

describe("pack-addon", () => {
  it("test_mcaddon_contents", () => {
    const f = join(dir, "a.mcaddon");
    const r = packAddon(f);
    expect(r.entries).toEqual(["json-ui-react-examples_bp.mcpack", "json-ui-react-examples_rp.mcpack"]);
    const outer = unzipSync(new Uint8Array(readFileSync(f)));
    expect(Object.keys(outer).sort()).toEqual(r.entries);
    const bp = unzipSync(outer[r.entries[0]!]!);
    const rp = unzipSync(outer[r.entries[1]!]!);
    expect(bp["manifest.json"]).toBeDefined();
    expect(bp["scripts/main.js"]).toBeDefined();
    expect(rp["manifest.json"]).toBeDefined();
    expect(rp["pack_icon.png"]).toBeDefined();
    expect(rp["ui/_ui_defs.json"]).toBeDefined();
    expect(rp["ui/server_form.json"]).toBeDefined();
    // 생성 서버 모듈과 테마 텍스처를 팩에 넣는다.
    const gen = new TextDecoder().decode(bp["scripts/generated/screens.js"]!);
    expect(gen).toContain("export function openScreen");
    expect(rp["textures/ui/jur/button.png"]).toBeDefined();
    expect(rp["textures/ui/jur/panel.json"]).toBeDefined();
    expect(rp["textures/ui/ffr/panel.png"]).toBeDefined(); // research(저수준)는 그대로
  });
  it("test_version_in_name_and_description", () => {
    process.env.JUR_COMMIT = "abc1234";
    process.env.JUR_DATE = "2026-11-14";
    try {
      const f = join(dir, "v.mcaddon");
      const r = packAddon(f);
      const outer = unzipSync(new Uint8Array(readFileSync(f)));
      const pkg = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));
      const ver = pkg.version.split(".").map(Number);
      const dec = (b: Uint8Array) => new TextDecoder().decode(b);
      const bp = unzipSync(outer[r.entries[0]!]!);
      const rp = unzipSync(outer[r.entries[1]!]!);
      for (const pack of [bp, rp]) {
        const m = JSON.parse(dec(pack["manifest.json"]!));
        expect(m.header.name).toContain(`v${pkg.version}`);
        expect(m.header.description).toContain(`v${pkg.version} · abc1234 · 2026-11-14`);
        expect(m.header.version).toEqual(ver);
        for (const mod of m.modules) expect(mod.version).toEqual(ver);
      }
      const bpm = JSON.parse(dec(bp["manifest.json"]!));
      const rpm = JSON.parse(dec(rp["manifest.json"]!));
      const dep = bpm.dependencies.find((d: any) => d.uuid === rpm.header.uuid);
      expect(dep.version).toEqual(ver);
      const script = dec(bp["scripts/main.js"]!);
      expect(script).not.toContain("__JUR_VERSION__");
      expect(script).toContain(`v${pkg.version} · abc1234 · 2026-11-14`);
    } finally {
      delete process.env.JUR_COMMIT;
      delete process.env.JUR_DATE;
    }
  });
  it("test_deterministic_zip", () => {
    const a = join(dir, "x.mcaddon");
    const b = join(dir, "y.mcaddon");
    packAddon(a);
    packAddon(b);
    expect(Buffer.compare(readFileSync(a), readFileSync(b))).toBe(0);
  });
});
