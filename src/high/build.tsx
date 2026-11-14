// buildScreens: 고수준 화면들을 한 팩으로 묶는다(단일 라우터, server_form 훅, _ui_defs, 테마 정의, 서버 모듈).
import { createPack, type Pack } from "../pack.ts";
import { createSlots, type SlotLayout } from "../slots.ts";
import { render, toBody, toEntry } from "../render.ts";
import { ScreenRouter } from "../components/router.tsx";
import { global, view } from "../bind.ts";
import { lit, prefixEq } from "../expr.ts";
import { lintFiles, type Diagnostic } from "../lint.ts";
import type { JsonObject, JuiNode } from "../types.ts";
import { paneSize, ref, withScreen, type ScreenCtx, type ScreenLayout } from "./context.ts";
import { isScreen, type ScreenProps } from "./components.tsx";
import { defineTheme } from "./theme.ts";
import { serverModuleSource, serverTypesSource, type ScreenInfo } from "./server.ts";

/** 고수준 팩에 같이 넣는 저수준 화면(연구 화면처럼 정의를 직접 만든 것). */
export interface LowLevelScreen {
  id: string;
  /** 라우터가 만들 컨트롤 참조(`네임스페이스.이름`). */
  control: string;
  layout: SlotLayout;
}

export interface BuildScreensOptions {
  /** 고수준 정의와 테마가 들어갈 네임스페이스(파일 ui/<namespace>.json). 기본 "jur". */
  namespace?: string;
  /** 폼 제목 접두. 제목은 접두 + 2글자 코드. 기본 "jur:". */
  prefix?: string;
  /** 화면 id -> 2글자 코드 고정(문서나 기존 제목과 맞출 때). 없으면 id 순서대로 a0, a1, ... */
  codes?: Record<string, string>;
  /** 같은 팩에 저수준 정의를 더하고, 같은 라우터에 걸 화면을 돌려준다. */
  lowLevel?: (pack: Pack) => LowLevelScreen[];
}

export interface BuildScreensResult {
  /** RP 상대 경로 -> JSON 글자(ui/*.json, ui/_ui_defs.json). */
  files: Record<string, string>;
  /** 행동팩 scripts/에 넣는 ESM(openScreen, decode, TITLES, LAYOUTS). */
  serverModule: string;
  /** serverModule의 .d.ts. */
  serverTypes: string;
  /** 화면 id -> 버튼 배치. */
  layouts: Record<string, SlotLayout>;
  /** 화면 id -> 폼 제목. */
  titles: Record<string, string>;
  /** 생성 결과 lint 경고(오류가 있으면 빌드가 실패한다). */
  diagnostics: Diagnostic[];
}

const B36 = "0123456789abcdefghijklmnopqrstuvwxyz";
const CODE_RE = /^[a-z][a-z0-9]$/;
const NS_RE = /^[a-z_][a-z0-9_]*$/;

/** 저수준 render 결과 하나를 본문으로. */
function bodyOf(el: JuiNode): JsonObject {
  const nodes = render(el);
  if (nodes.length !== 1) throw new Error(`본문은 요소 1개여야 합니다(렌더 결과 ${nodes.length}개)`);
  return toBody(nodes[0]!);
}

/** 화면 하나를 낮추고 라우터가 만들 컨트롤 참조를 돌려준다. */
function lowerScreen(ctx: ScreenCtx, p: ScreenProps): string {
  const children = render(p.children ?? null);
  const N = ctx.ns.name;
  if (ctx.listDef) {
    if (children.length || ctx.tabsDef || ctx.rightDef) throw new Error(`화면 "${ctx.id}": <VirtualList>는 화면의 유일한 자식이어야 합니다`);
    if (ctx.layout !== "single") throw new Error(`화면 "${ctx.id}": <VirtualList>는 layout="single"에서만 쓸 수 있습니다`);
    return ctx.ns.define(`${ctx.code}@${N}.list_window`, { "$list_title": p.title, "$list_content": ctx.listDef });
  }
  let panes = ref(ctx, "panes_none");
  if (children.length) {
    const k = `${ctx.code}_panes`;
    ctx.ns.define(k, { type: "panel", size: paneSize(ctx), controls: children.map(toEntry) });
    panes = ref(ctx, k);
  }
  const vars: JsonObject = { "$mode_title": p.title };
  if (ctx.tabsDef) vars["$tabs_def"] = ctx.tabsDef;
  vars["$panes_def"] = panes;
  if (ctx.layout === "split") vars["$right_def"] = ctx.rightDef ?? ref(ctx, "panes_none");
  if (ctx.tabsDef) vars["$tab"] = 0;
  return ctx.ns.define(`${ctx.code}@${N}.${ctx.layout === "split" ? "window_split" : "window"}`, vars);
}

/** 화면들을 한 팩으로. screens는 `<Screen>` 요소 배열. */
export function buildScreens(screens: JuiNode[], opts: BuildScreensOptions = {}): BuildScreensResult {
  const N = opts.namespace ?? "jur";
  const prefix = opts.prefix ?? "jur:";
  if (!NS_RE.test(N)) throw new Error(`namespace "${N}"는 소문자·숫자·밑줄이어야 합니다`);
  lit(prefix);
  if (prefix.length === 0) throw new Error("prefix가 비어 있습니다");

  const pinned = new Map<string, string>();
  for (const [id, code] of Object.entries(opts.codes ?? {})) {
    if (!CODE_RE.test(code)) throw new Error(`화면 "${id}": 코드 "${code}"는 소문자로 시작하는 2글자여야 합니다`);
    if ([...pinned.values()].includes(code)) throw new Error(`코드 "${code}" 중복`);
    pinned.set(id, code);
  }
  const used = new Set(pinned.values());
  let nextIndex = 0;
  const codeFor = (id: string): string => {
    const fixed = pinned.get(id);
    if (fixed) return fixed;
    for (;;) {
      const i = nextIndex++;
      if (i >= 26 * 36) throw new Error("화면이 너무 많습니다(코드 936개)");
      const c = B36[10 + Math.floor(i / 36)]! + B36[i % 36]!;
      if (!used.has(c)) {
        used.add(c);
        return c;
      }
    }
  };

  const pack = createPack();
  const ns = pack.ns(N, `${N}.json`);
  defineTheme(ns);

  const infos: ScreenInfo[] = [];
  const routes: { title: string; id: string; control: string }[] = [];
  const ids = new Set<string>();
  const addRoute = (id: string, control: string, layout: SlotLayout, defaults: ScreenInfo["defaults"]): void => {
    if (typeof id !== "string" || id === "") throw new Error("화면 id가 비어 있습니다");
    if (ids.has(id)) throw new Error(`화면 id 중복: "${id}"`);
    ids.add(id);
    const code = codeFor(id);
    const title = prefix + code;
    lit(title);
    infos.push({ id, title, layout, defaults });
    routes.push({ title, id: code, control });
  };

  for (const el of screens) {
    if (!isScreen(el)) throw new Error("buildScreens: 항목은 <Screen> 요소여야 합니다");
    const p = el.props;
    if (typeof p.id !== "string" || p.id === "") throw new Error("<Screen>에 id가 없습니다");
    if (ids.has(p.id)) throw new Error(`화면 id 중복: "${p.id}"`);
    if (typeof p.title !== "string") throw new Error(`화면 "${p.id}": title이 없습니다`);
    const layout: ScreenLayout = p.layout ?? "single";
    if (layout !== "single" && layout !== "split") throw new Error(`화면 "${p.id}": 알 수 없는 layout "${String(layout)}"`);
    const code = pinned.get(p.id) ?? codeFor(p.id);
    pinned.set(p.id, code); // addRoute가 같은 코드를 다시 쓰도록
    const ctx: ScreenCtx = { pack, ns, id: p.id, code, layout, slots: createSlots(), defaults: {} };
    const control = withScreen(ctx, () => lowerScreen(ctx, p));
    const sl = ctx.slots.layout();
    if (sl.total === 0) throw new Error(`화면 "${p.id}": 버튼이 하나도 없습니다`);
    addRoute(p.id, control, sl, ctx.defaults);
  }
  for (const low of opts.lowLevel?.(pack) ?? []) addRoute(low.id, low.control, low.layout, {});
  if (routes.length === 0) throw new Error("buildScreens: 화면이 없습니다");

  // 단일 라우터: 제목 접두 + 2글자 코드(고정 바이트)로 화면을 고른다.
  const prefixBytes = Buffer.byteLength(prefix, "utf8") + 2;
  ns.define("screen_router", bodyOf(ScreenRouter({ name: "screen_router", factory: `${N}_screen`, prefixBytes, routes })));
  const gate = `(not ${prefixEq("#title_text", prefix)})`;
  ns.define("root", bodyOf(
    <panel name="root" size={["100%", "100%"]}>
      <panel name="vanilla" size={["100%", "100%"]} bindings={[global("#title_text"), view(gate, "#visible")]}>
        <use name="content" def="server_form.main_screen_content" />
      </panel>
      <use name="screen_router" def={`${N}.screen_router`} />
    </panel>,
  ));

  // server_form 훅: 라우터 루트를 화면 내용으로 꽂고, 접두가 붙은 제목이면 기본 폼 본문을 숨긴다.
  pack.modify("server_form.json", "server_form", "third_party_server_screen", { "$screen_content": `${N}.root` });
  pack.modify("server_form.json", "server_form", "long_form_scrolling_content/wrapping_panel", {
    visible: false,
    bindings: [{ binding_name: "#title_text", binding_condition: "always" }, view(gate, "#visible", { condition: "always" })],
  });
  pack.modify("server_form.json", "server_form", "long_form_dynamic_buttons_panel", {
    bindings: [{ binding_name: "#form_button_contents", binding_name_override: "#collection_length", binding_condition: "visible" }],
  });

  const files = pack.files();
  const parsed = Object.fromEntries(Object.entries(files).map(([f, t]) => [f, JSON.parse(t) as JsonObject]));
  const diagnostics = lintFiles(parsed, { routedRoots: [`${N}.root`] });
  const errors = diagnostics.filter((d) => d.level === "error");
  if (errors.length) throw new Error(`buildScreens: lint 오류\n${errors.map((d) => `${d.rule} ${d.path}: ${d.message}`).join("\n")}`);

  return {
    files,
    serverModule: serverModuleSource(infos),
    serverTypes: serverTypesSource(infos),
    layouts: Object.fromEntries(infos.map((s) => [s.id, s.layout])),
    titles: Object.fromEntries(infos.map((s) => [s.id, s.title])),
    diagnostics,
  };
}
