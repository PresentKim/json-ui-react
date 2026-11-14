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
  });
  it("test_deterministic_zip", () => {
    const a = join(dir, "x.mcaddon");
    const b = join(dir, "y.mcaddon");
    packAddon(a);
    packAddon(b);
    expect(Buffer.compare(readFileSync(a), readFileSync(b))).toBe(0);
  });
});
