import { describe, expect, it } from "vitest";
import { render } from "../../src/render.ts";
import { runChecks } from "../../src/check/engine.ts";
import { ALL_CHECKS } from "../../src/check/index.ts";
import { collectKit } from "../../src/kit/core.tsx";
import { kit, KitSpacer, Spacer } from "../../src/index.ts";
import { buildGallery, GALLERY_NS, invalidArrangement, invalidRow, outsideCollection } from "../../examples/kit/gallery.tsx";

describe("kit gallery", () => {
  it("gallery_clean", () => {
    const { file, diagnostics } = buildGallery();
    expect(diagnostics.filter((d) => d.level === "error")).toEqual([]);
    expect(file[`${GALLERY_NS}_x`]).toBeUndefined();
    expect(Object.keys(file)).toContain("blink");
    const r = runChecks({ [`ui/${GALLERY_NS}.json`]: file }, ALL_CHECKS);
    expect(r.diagnostics.filter((d) => d.level === "error")).toEqual([]);
    // 두 번 만들어도 같다(레지스트리 비움)
    expect(buildGallery().file).toEqual(file);
  });
  it("placement_showcase", () => {
    const a = collectKit(() => render(invalidArrangement()));
    expect(a.diagnostics.length).toBeGreaterThan(0);
    expect(a.diagnostics.every((d) => d.level === "info" && d.rule && d.url)).toBe(true);
    expect(JSON.stringify(a.result)).not.toContain('"collection_index":0,"text"');
    const b = collectKit(() => render(invalidRow()));
    expect(b.diagnostics.length).toBeGreaterThan(0);
    expect(b.diagnostics.every((d) => d.level === "info" && d.url)).toBe(true);
    const row = b.result[0]!;
    expect(row.children.map((c) => c.name)).toEqual(["img_box"]); // 이미지는 패널로 감싸진다
    expect(row.children[0]!.props.type).toBe("panel");
  });
  it("strict_outside_collection_throws", () => {
    expect(() => collectKit(() => render(outsideCollection()), { strict: true })).toThrow(/COL-44/);
  });
  it("exports_resolve", () => {
    expect(typeof kit.Row).toBe("function");
    expect(typeof KitSpacer).toBe("function");
    expect(kit.Spacer).toBe(KitSpacer);
    expect(Spacer).not.toBe(KitSpacer);
  });
});
