// 행동팩용 생성 모듈(serverModule)과 그 타입(serverTypes) 문자열을 만든다.
import type { SlotLayout } from "../slots.ts";

export interface ScreenInfo {
  id: string;
  title: string;
  layout: SlotLayout;
  defaults: Record<string, (string | null)[]>;
}

/** 빈 칸 표식: 데이터가 모자란 칸에 보내는 글자(화면에서는 보이지 않는다). */
export const EMPTY_MARK = "§0§e§r";

const obj = <T>(screens: ScreenInfo[], f: (s: ScreenInfo) => T): Record<string, T> =>
  Object.fromEntries(screens.map((s) => [s.id, f(s)]));

/**
 * 의존 없는 ESM. `@minecraft/server-ui`의 ActionFormData만 가져온다.
 * openScreen(player, id, data): 제목을 붙이고 버튼을 배치 순서로 보낸 뒤 응답을 { name, index }로 바꾼다.
 */
export function serverModuleSource(screens: ScreenInfo[]): string {
  const json = (v: unknown): string => JSON.stringify(v, null, 2);
  return [
    "// 자동 생성(json-ui-react buildScreens): 직접 고치지 마세요.",
    'import { ActionFormData } from "@minecraft/server-ui";',
    "",
    "// 데이터가 모자란 칸에 보내는 빈 칸 표식",
    `export const EMPTY = ${JSON.stringify(EMPTY_MARK)};`,
    "",
    "// 화면 id -> 폼 제목(라우터 키)",
    `export const TITLES = ${json(obj(screens, (s) => s.title))};`,
    "",
    "// 화면 id -> 버튼 배치(구간·블록, 시작 번호, 개수)",
    `export const LAYOUTS = ${json(obj(screens, (s) => s.layout))};`,
    "",
    "// 화면 id -> 구간 이름 -> 칸별 기본 글자(Tab label)",
    `const DEFAULTS = ${json(obj(screens, (s) => s.defaults))};`,
    "",
    "function layoutOf(id) {",
    "  const layout = LAYOUTS[id];",
    "  if (!layout) throw new Error(`Unknown screen: ${id}`);",
    "  return layout;",
    "}",
    "",
    "export function screenTitle(id) {",
    "  layoutOf(id);",
    "  return TITLES[id];",
    "}",
    "",
    "// 버튼 번호 -> { name, index } (블록이면 field도). 범위 밖이면 null.",
    "export function decode(id, selection) {",
    "  const layout = layoutOf(id);",
    "  if (!Number.isInteger(selection) || selection < 0 || selection >= layout.total) return null;",
    "  for (const r of layout.ranges) {",
    "    if (selection >= r.start && selection < r.start + r.count) return { name: r.name, index: selection - r.start };",
    "  }",
    "  for (const b of layout.blocks) {",
    "    const size = b.fields.length;",
    "    if (selection >= b.start && selection < b.start + b.count * size) {",
    "      const off = selection - b.start;",
    "      return { name: b.name, index: Math.floor(off / size), field: b.fields[off % size] };",
    "    }",
    "  }",
    "  return null;",
    "}",
    "",
    "// 버튼 하나: \"글자\" | [글자, 아이콘] | { text, icon }",
    "function toButton(v) {",
    "  if (typeof v === \"string\") return [v];",
    "  if (Array.isArray(v)) return v[1] === undefined ? [String(v[0])] : [String(v[0]), v[1]];",
    "  if (v && typeof v === \"object\") return v.icon === undefined ? [String(v.text)] : [String(v.text), v.icon];",
    "  throw new Error(`Bad button: ${JSON.stringify(v)}`);",
    "}",
    "",
    "// 배치 순서대로 [글자, 아이콘?] 목록을 만든다. 모자란 칸은 기본 글자 또는 빈 칸 표식으로 채운다.",
    "export function buttons(id, data = {}) {",
    "  const layout = layoutOf(id);",
    "  const parts = [",
    "    ...layout.ranges.map((r) => ({ name: r.name, start: r.start, n: r.count })),",
    "    ...layout.blocks.map((b) => ({ name: b.name, start: b.start, n: b.count * b.fields.length })),",
    "  ].sort((a, b) => a.start - b.start);",
    "  for (const k of Object.keys(data)) {",
    "    if (!parts.some((p) => p.name === k)) throw new Error(`Screen ${id}: unknown data key ${k}`);",
    "  }",
    "  const out = [];",
    "  for (const p of parts) {",
    "    const list = data[p.name] ?? [];",
    "    if (list.length > p.n) throw new Error(`Screen ${id}: ${p.name} has ${list.length} buttons, max ${p.n}`);",
    "    const defaults = DEFAULTS[id][p.name] ?? [];",
    "    for (let i = 0; i < p.n; i++) {",
    "      const v = list[i] ?? defaults[i];",
    "      out.push(v === undefined || v === null ? [EMPTY] : toButton(v));",
    "    }",
    "  }",
    "  return out;",
    "}",
    "",
    "// 화면을 연다. 결과: null(취소) | { name, index }",
    "export function openScreen(player, id, data = {}) {",
    "  const form = new ActionFormData().title(screenTitle(id));",
    "  for (const [text, icon] of buttons(id, data)) {",
    "    if (icon === undefined) form.button(text);",
    "    else form.button(text, icon);",
    "  }",
    "  return form.show(player).then((res) => {",
    "    if (res.canceled || res.selection === undefined) return null;",
    "    return decode(id, res.selection);",
    "  });",
    "}",
    "",
  ].join("\n");
}

const q = (s: string): string => JSON.stringify(s);

/** serverModule의 타입 선언(.d.ts). 화면마다 data 모양과 응답 name을 좁힌다. */
export function serverTypesSource(screens: ScreenInfo[]): string {
  const names = (s: ScreenInfo): string[] => [...s.layout.ranges.map((r) => r.name), ...s.layout.blocks.map((b) => b.name)];
  const union = (xs: string[]): string => (xs.length ? xs.map(q).join(" | ") : "never");
  const data = screens.map((s) => {
    const fields = names(s).map((n) => `${q(n)}?: Button[]`).join("; ");
    return `  ${q(s.id)}: { ${fields} };`;
  });
  const hits = screens.map((s) => `  ${q(s.id)}: ${union(names(s))};`);
  return [
    "// 자동 생성(json-ui-react buildScreens): 직접 고치지 마세요.",
    'import type { Player } from "@minecraft/server";',
    "",
    "/** 버튼 하나: 글자, [글자, 아이콘], { text, icon } */",
    "export type Button = string | [text: string, icon?: string] | { text: string; icon?: string };",
    "",
    "/** 화면 id -> openScreen data 모양(키는 컴포넌트 name). */",
    "export interface ScreenData {",
    ...data,
    "}",
    "",
    "/** 화면 id -> 응답 name */",
    "export interface ScreenHitNames {",
    ...hits,
    "}",
    "",
    "export type ScreenId = keyof ScreenData;",
    "export interface ScreenHit<N extends string = string> { name: N; index: number; field?: string }",
    "export interface ScreenLayout {",
    "  total: number;",
    "  ranges: { name: string; start: number; count: number }[];",
    "  blocks: { name: string; start: number; count: number; fields: string[] }[];",
    "}",
    "",
    "export declare const EMPTY: string;",
    "export declare const TITLES: Record<ScreenId, string>;",
    "export declare const LAYOUTS: Record<ScreenId, ScreenLayout>;",
    "export declare function screenTitle(id: ScreenId): string;",
    "export declare function decode<K extends ScreenId>(id: K, selection: number): ScreenHit<ScreenHitNames[K]> | null;",
    "export declare function buttons<K extends ScreenId>(id: K, data?: ScreenData[K]): [string, string?][];",
    "export declare function openScreen<K extends ScreenId>(player: Player, id: K, data?: ScreenData[K]): Promise<ScreenHit<ScreenHitNames[K]> | null>;",
    "",
  ].join("\n");
}
