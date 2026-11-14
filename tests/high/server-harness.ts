// 생성 serverModule을 data URL로 import하고, main.js를 모의 @minecraft 모듈로 실행하는 시험 도구.

export type Btn = { text: string; icon?: string };
export type Form = { title: string; body: string; buttons: Btn[] };

/** 모의 ActionFormData: 만든 폼을 forms에 쌓고, show()는 next가 정한 응답으로 끝난다. */
export function mockForms() {
  const forms: Form[] = [];
  let resolve: ((r: unknown) => void) | undefined;
  class ActionFormData {
    f: Form = { title: "", body: "", buttons: [] };
    constructor() { forms.push(this.f); }
    title(t: string) { this.f.title = t; return this; }
    body(t: string) { this.f.body = t; return this; }
    button(text: string, icon?: string) { this.f.buttons.push(icon === undefined ? { text } : { text, icon }); return this; }
    show() { return new Promise((r) => { resolve = r; }); }
  }
  return { forms, ActionFormData, respond: (r: unknown) => resolve!(r) };
}

let seq = 0;

/** serverModule 글자를 모듈로 불러온다. `@minecraft/server-ui` import는 주어진 ActionFormData로 바꾼다. */
export async function loadServerModule(src: string, ActionFormData: unknown): Promise<any> {
  const line = 'import { ActionFormData } from "@minecraft/server-ui";';
  if (!src.includes(line)) throw new Error("serverModule에 ActionFormData import가 없습니다");
  const g = globalThis as Record<string, unknown>;
  const slot = `__jurMock${++seq}`;
  g[slot] = ActionFormData;
  const code = src.replace(line, `const ActionFormData = globalThis.${slot};`);
  return import(/* @vite-ignore */ "data:text/javascript," + encodeURIComponent(code));
}

/** main.js 글자를 모의 모듈로 실행한다. generated/screens.js import는 mod의 같은 이름으로 넘긴다. */
export function runMain(mainSrc: string, mod: Record<string, unknown>, env: { ActionFormData: unknown; world: unknown; system: unknown }): void {
  const gen = /^import \{([^}]*)\} from "\.\/generated\/screens\.js";$/m.exec(mainSrc);
  const names = gen ? gen[1]!.split(",").map((s) => s.trim()).filter(Boolean) : [];
  const code = mainSrc.replace(/^import .*$/gm, "");
  new Function("ItemStack", "system", "world", "ActionFormData", ...names, code)(
    class {}, env.system, env.world, env.ActionFormData, ...names.map((n) => mod[n]),
  );
}
