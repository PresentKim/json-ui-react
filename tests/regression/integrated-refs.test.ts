// F-HL-1: 통합 애드온 RP 전체에서 정적 참조가 모두 정의돼 있다.
// F-HL-3부터 연구 화면도 고수준 화면이라 통합 애드온에는 ffr 네임스페이스가 없다(examples/research 단독 빌드에만 있다).
import { describe, it, expect } from "vitest";
import { buildExamples } from "../../example/build-rp.ts";
import { buildResearch } from "../../examples/research/screen.tsx";
import type { JsonObject, JsonValue } from "../../src/types.ts";

/** 게임이 제공하는(팩에 정의하지 않는) 네임스페이스 */
const VANILLA = new Set(["common", "server_form"]);

/** 정적 참조 목록: 키 `이름@ns.정의`, control_ids `@ns.정의`, `$..._def`·`$..._content` 값, control_name, grid_item_template. */
function staticRefs(files: Record<string, string>): { defined: Set<string>; refs: [string, string][] } {
  const defined = new Set<string>();
  const refs: [string, string][] = [];
  const parsed = Object.entries(files).filter(([f]) => !f.endsWith("_ui_defs.json")).map(([, t]) => JSON.parse(t) as JsonObject);
  for (const j of parsed) for (const k of Object.keys(j)) if (k !== "namespace") defined.add(`${j.namespace}.${k.split("@")[0]}`);
  const add = (from: string, ns: string, r: string): void => {
    if (r.startsWith("$")) return;
    refs.push([from, r.includes(".") ? r : `${ns}.${r}`]);
  };
  const walk = (v: JsonValue, ns: string, from: string): void => {
    if (Array.isArray(v)) return v.forEach((x) => walk(x, ns, from));
    if (!v || typeof v !== "object") return;
    for (const [k, x] of Object.entries(v)) {
      const parent = k.split("@")[1];
      if (parent) add(from, ns, parent);
      if (k === "control_ids" && x && typeof x === "object" && !Array.isArray(x)) {
        for (const y of Object.values(x)) if (typeof y === "string" && y.startsWith("@")) add(from, ns, y.slice(1));
      }
      const name = k.split("|")[0]!;
      if (typeof x === "string" && (/^\$.*_(def|content)$/.test(name) || k === "control_name" || k === "grid_item_template")) add(from, ns, x);
      walk(x, ns, from);
    }
  };
  for (const j of parsed) {
    const ns = j.namespace as string;
    for (const [k, b] of Object.entries(j)) {
      if (k === "namespace") continue;
      const [name, parent] = k.split("@");
      if (parent) add(`${ns}.${name}`, ns, parent);
      walk(b, ns, `${ns}.${name}`);
    }
  }
  return { defined, refs: refs.filter(([, r]) => !VANILLA.has(r.split(".")[0]!)) };
}

describe("통합 애드온 참조 (F-HL-1)", () => {
  const built = buildExamples();

  it("정적 참조는 모두 정의돼 있다", () => {
    const { defined, refs } = staticRefs(built.files);
    expect(refs.length).toBeGreaterThan(1000);
    expect(refs.filter(([, r]) => !defined.has(r))).toEqual([]);
  });

  it("연구 화면은 고수준(jur)으로 만들고 저수준 연구 정의(ffr)는 통합 애드온에 없다 (F-HL-3)", () => {
    expect(built.files["ui/ffr.json"]).toBeUndefined();
    expect(built.files["ui/ffr_items.json"]).toBeUndefined();
    const jur = JSON.parse(built.files["ui/jur.json"]!) as JsonObject;
    for (const k of ["re@jur.window_split", "re_panes", "re_right", "re_needed_detail_0", "re_done_body_47"]) expect(jur[k], k).toBeDefined();
  });

  it("examples/research 단독 빌드는 그대로 root·list_gate·screen_router를 갖는다", () => {
    const ffr = JSON.parse(buildResearch().files["ui/ffr.json"]!) as JsonObject;
    for (const k of ["root", "list_gate", "list_content", "screen_router"]) expect(ffr[k], k).toBeDefined();
    const { defined, refs } = staticRefs(buildResearch().files);
    expect(refs.filter(([, r]) => !defined.has(r))).toEqual([]);
  });
});
