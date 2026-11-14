// F-HL-3: 고수준 부품으로 조립한 연구 화면(example/screens/research.tsx)이 HEAD a430af4의 저수준 연구 화면과 같은 출력을 낸다.
// - 화면 쪽: 라우터 루트(jur.root)에서 펼친 컨트롤 트리가 이름을 빼고 같다(tests/helpers/ui-tree.ts).
// - 서버 쪽: main.js가 openScreen으로 보내는 폼(제목, 버튼 2022개의 글자·아이콘·순서)과 응답 처리(페이지, 진행)가 같다.
// 기준선은 tests/helpers/legacy-research.ts(HEAD build-rp의 lowLevel 경로와 HEAD main.js openResearch를 그대로 옮김).
import { describe, it, expect } from "vitest";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { buildExamples, SCREENS } from "../../example/build-rp.ts";
import { canonical, diffTrees, expandRoot, routesOf } from "../helpers/ui-tree.ts";
import { legacyExamples, legacyResearchButtons, legacyResearchPick } from "../helpers/legacy-research.ts";
import { loadServerModule, mockForms, runMain, type Form } from "../high/server-harness.ts";

/**
 * 허용한 차이(경로). 비어 있다: 정의 이름·네임스페이스를 빼면 펼친 트리가 완전히 같다.
 * 비교기가 맞추는 것(차이로 치지 않음): 컨트롤 이름, 텍스처 접두 textures/ui/ffr/ -> textures/ui/jur/(같은 그림),
 * 이름 참조(source_control_name, toggle_name, factory.name)는 화면 안 위치·순서로.
 */
const ALLOWED: string[] = [];

/** HEAD a430af4에서 이 비교기로 잰 라우트별 정규화 트리 sha256 앞 16자리. 다른 예시 화면이 바뀌지 않았음도 같이 본다. */
const HEAD_ROUTES: Record<string, string> = {
  ro: "4fcc054b0a76ab2a",
  ti: "90163da25242148d",
  tf: "200b4165f9055cb1",
  tl: "20ed741c892bafc7",
  sg: "ad2b8b358b141ca2",
  v5: "9ab2fd4adfc92029",
  v2: "2088e76b56b0fc24",
  re: "871513a50f635f0a",
};

const sha = (v: unknown): string => createHash("sha256").update(JSON.stringify(v)).digest("hex").slice(0, 16);

const built = buildExamples();
const legacy = legacyExamples(SCREENS.filter((s) => s.props.id !== "research"));

describe("연구 화면 화면 쪽 동치 (F-HL-3)", () => {
  const now = routesOf(built.files, "jur.root");
  const before = routesOf(legacy.files, "jur.root");

  it("research 라우트의 펼친 트리가 HEAD 저수준 정의와 같다(차이 0)", () => {
    const diffs = diffTrees(before.re, now.re, "re").filter((d) => !ALLOWED.includes(d.path));
    expect(diffs).toEqual([]);
    expect(sha(now.re)).toBe(HEAD_ROUTES.re);
  });

  it("라우터 루트 전체와 모든 라우트가 HEAD와 같다", () => {
    expect(Object.fromEntries(Object.entries(now).map(([id, t]) => [id, sha(t)]))).toEqual(HEAD_ROUTES);
    expect(diffTrees(canonical(expandRoot(legacy.files, "jur.root")), canonical(expandRoot(built.files, "jur.root")))).toEqual([]);
    expect(JSON.parse(built.files["ui/server_form.json"]!)).toEqual(JSON.parse(legacy.files["ui/server_form.json"]!));
  });

  it("비교기는 렌더에 영향 주는 속성 하나의 차이도 잡는다(대조군)", () => {
    const jur = JSON.parse(built.files["ui/jur.json"]!);
    const key = "re_needed_body_0";
    const gap = jur[key].controls.find((c: object) => Object.keys(c)[0] === "gap");
    expect(gap.gap.size).toEqual(["100%", 3]);
    gap.gap.size = ["100%", 2];
    const changed = routesOf({ ...built.files, "ui/jur.json": JSON.stringify(jur) }, "jur.root");
    const diffs = diffTrees(before.re, changed.re, "re");
    expect(diffs).toHaveLength(1);
    expect(diffs[0]!.path).toMatch(/\.size\[1\]$/);
  });

  it("통합 애드온에는 저수준 연구 정의(ffr)가 없다", () => {
    expect(Object.keys(built.files).sort()).toEqual(["ui/_ui_defs.json", "ui/jur.json", "ui/server_form.json"]);
    for (const t of Object.values(built.files)) expect(t).not.toContain("ffr");
  });
});

// ---------------------------------------------------------------- 서버 쪽

const main = readFileSync(new URL("../../example/bp/scripts/main.js", import.meta.url), "utf8");

async function runResearch() {
  const m = mockForms();
  const mod = await loadServerModule(built.serverModule, m.ActionFormData);
  let handler: ((e: unknown) => void) | undefined;
  const sub = { subscribe: () => {} };
  const world = { afterEvents: { itemUse: sub, playerSpawn: sub } };
  const system = { run: () => {}, afterEvents: { scriptEventReceive: { subscribe: (h: (e: unknown) => void) => { handler = h; } } } };
  runMain(main, mod, { ActionFormData: m.ActionFormData, world, system });
  const chat: string[] = [];
  const player = { typeId: "minecraft:player", onScreenDisplay: { setActionBar() {} }, sendMessage: (t: string) => chat.push(t) };
  handler!({ id: "jur:open", message: "research", sourceEntity: player });
  const last = (): Form => m.forms[m.forms.length - 1]!;
  const pick = async (s: number): Promise<void> => {
    m.respond({ canceled: false, selection: s });
    await new Promise((r) => setTimeout(r, 0));
  };
  return { m, mod, chat, last, pick };
}

describe("연구 화면 서버 쪽 동치 (F-HL-3)", () => {
  it("처음 연 폼: 제목과 버튼 2022개(글자·아이콘·순서)가 HEAD와 같다", async () => {
    const r = await runResearch();
    expect(r.last().title).toBe("jur:re");
    expect(r.last().buttons).toEqual(legacyResearchButtons([0, 0]));
  });

  it("페이지 버튼(98~101): 같은 페이지로 넘기고, 넘긴 폼도 같다", async () => {
    const r = await runResearch();
    let pages: [number, number] = [0, 0];
    for (const s of [99, 99, 98, 98, 101, 100, 99]) {
      const want = legacyResearchPick(pages, s).pages!;
      expect(want, `selection ${s}`).toBeDefined();
      await r.pick(s);
      pages = want;
      expect(r.last().buttons, `selection ${s} -> ${pages}`).toEqual(legacyResearchButtons(pages));
    }
    expect(r.m.forms).toHaveLength(8);
  });

  it("진행 버튼(102+20k+19): 같은 항목을 요청하고, 다른 칸·빈 칸은 아무 일도 없다", async () => {
    for (const pages of [[0, 0], [1, 0]] as [number, number][]) {
      for (const k of [0, 5, 47, 48, 60, 95]) {
        const r = await runResearch();
        if (pages[0] === 1) await r.pick(99);
        const s = 102 + 20 * k + 19;
        await r.pick(s);
        const want = legacyResearchPick(pages, s).requested;
        expect(r.chat, `pages ${pages} k ${k}`).toEqual(want ? [`[jur] Research requested: ${want}`] : []);
      }
    }
    const r = await runResearch();
    for (const s of [0, 50, 96, 102, 102 + 20 * 3 + 7]) await r.pick(s);
    expect(r.chat).toEqual([]);
    expect(r.m.forms).toHaveLength(1);
  });

  it("decode: 98~101은 페이지 버튼, 102+20k+19는 칸 k의 action", async () => {
    const { mod } = await runResearch();
    expect([98, 99, 100, 101].map((s) => mod.decode("research", s))).toEqual([
      { name: "neededPages", index: 0 }, { name: "neededPages", index: 1 },
      { name: "donePages", index: 0 }, { name: "donePages", index: 1 },
    ]);
    for (let k = 0; k < 96; k++) {
      expect(mod.decode("research", 102 + 20 * k + 19)).toEqual({ name: k < 48 ? "needed" : "done", index: k % 48, field: "action" });
    }
    expect(mod.decode("research", 2022)).toBeNull();
  });
});
