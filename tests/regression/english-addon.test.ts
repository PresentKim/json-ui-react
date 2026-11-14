// F-I18N-1: 통합 테스트 애드온(example/**)의 게임 안 글자와 팩 매니페스트에는 한글이 없다.
// examples/research 단독 빌드는 FFR 원본 글자를 그대로 두므로 검사 대상이 아니다.
import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { buildExamples } from "../../example/build-rp.ts";
import { EXAMPLES } from "../../example/catalog.ts";
import { loadServerModule, mockForms, runMain } from "../high/server-harness.ts";

const HANGUL = /[가-힣ㄱ-ㅎㅏ-ㅣ]/;
const rd = (p: string) => readFileSync(new URL(`../../example/${p}`, import.meta.url), "utf8");
const src = rd("bp/scripts/main.js");

type Sent = { forms: { title: string; body: string; buttons: string[] }[]; chat: string[]; bar: string[] };

/** main.js를 모의 @minecraft 모듈과 생성 모듈(generated/screens.js)로 실행해 폼 글자, 채팅, 액션바를 모은다. */
async function run(): Promise<{ sent: Sent; spawn: () => void; open: (id: string) => void; pick: (n: number) => void }> {
  const m = mockForms();
  const mod = await loadServerModule(buildExamples().serverModule, m.ActionFormData);
  const sent: Sent = { forms: [], chat: [], bar: [] };
  const handlers: Record<string, (e: unknown) => void> = {};
  const sub = (name: string) => ({ subscribe: (h: (e: unknown) => void) => { handlers[name] = h; } });
  const world = { afterEvents: { itemUse: sub("itemUse"), playerSpawn: sub("playerSpawn") } };
  const system = { run: (f: () => void) => f(), afterEvents: { scriptEventReceive: sub("script") } };
  runMain(src, mod, { ActionFormData: m.ActionFormData, world, system });
  const player = {
    typeId: "minecraft:player",
    onScreenDisplay: { setActionBar: (t: string) => sent.bar.push(t) },
    sendMessage: (t: string) => sent.chat.push(t),
    getComponent: () => ({ container: { size: 0, getItem: () => undefined, addItem() {} } }),
  };
  const sync = () => { sent.forms = m.forms.map((f) => ({ title: f.title, body: f.body, buttons: f.buttons.map((b) => b.text) })); };
  return {
    sent,
    spawn: () => handlers.playerSpawn!({ initialSpawn: true, player }),
    open: (id) => { handlers.script!({ id: "jur:open", message: id, sourceEntity: player }); sync(); },
    pick: (n) => m.respond({ canceled: false, selection: n }),
  };
}

describe("english add-on (F-I18N-1)", () => {
  it("생성된 RP ui/*.json에 한글이 없다", () => {
    for (const [file, text] of Object.entries(buildExamples().files)) {
      expect(HANGUL.test(text), file).toBe(false);
    }
  });

  it("main.js가 만드는 폼, 채팅, 액션바 글자에 한글이 없다", async () => {
    const r = await run();
    r.spawn();
    r.open("menu");
    const menu = r.sent.forms[0]!;
    expect(menu.title).toBe("json-ui-react Examples");
    expect(menu.body).toMatch(/^Pick an example\. Use the stick to open this menu again\.\n§7Add-on /);
    expect(menu.buttons[0]).toMatch(/^Screen router\n/);
    for (const e of EXAMPLES) {
      r.open(e.id);
      r.pick(0);
      await Promise.resolve();
    }
    await new Promise((res) => setTimeout(res, 0));
    // openScreen 응답은 { name, index }로 decode되어 액션바에 뜬다.
    expect(r.sent.bar).toContain("[jur] router selection=buttons[0]");
    expect(r.sent.bar).toContain("[jur] tabs-lazy selection=tabs[0]");
    r.open("nope");
    for (const f of r.sent.forms) {
      expect(HANGUL.test([f.title, f.body, ...f.buttons].join("\n")), f.title).toBe(false);
    }
    expect(r.sent.chat[0]).toBe("[jur] Use the stick (long-press on mobile) to open the example menu.");
    for (const t of [...r.sent.chat, ...r.sent.bar]) expect(HANGUL.test(t), t).toBe(false);
  });

  it("두 매니페스트의 name과 description에 한글이 없다", () => {
    for (const p of ["bp/manifest.json", "rp/manifest.json"]) {
      const h = JSON.parse(rd(p)).header;
      expect(h.name).toMatch(/^json-ui-react Examples (BP|RP)$/);
      expect(HANGUL.test(`${h.name}\n${h.description}`), p).toBe(false);
    }
  });
});
