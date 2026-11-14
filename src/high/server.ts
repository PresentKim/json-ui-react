// 행동팩용 생성 모듈(serverModule)과 그 타입(serverTypes) 문자열을 만든다.
import type { SlotLayout } from "../slots.ts";

export interface ScreenInfo {
  id: string;
  title: string;
  layout: SlotLayout;
  defaults: Record<string, (string | null)[]>;
  /** 레코드 격자 이름 -> 배치(SelectGrid). 없으면 {}. */
  records: Record<string, RecordInfo>;
}

/**
 * 상세 필드 하나가 레코드의 무엇을 버튼으로 보내는지.
 * text: [rec[key]] / title: [rec[key], rec.icon] / icon: rec[key][index] -> ["§f" + 숫자(또는 badge), 아이콘].
 */
export type FieldSpec =
  | { field: string; kind: "text"; key: string }
  | { field: string; kind: "title"; key: string }
  | { field: string; kind: "icon"; key: string; index: number; badge?: string };

/** 레코드 격자 하나: 칸 구간 이름(= 격자 이름), 상세 블록 이름, 상세 필드. */
export interface RecordInfo {
  /** 상세 블록 이름. 상세가 없으면 null. */
  block: string | null;
  fields: FieldSpec[];
}

/** 레코드 칸 버튼의 글자. 칸 얼굴은 아이콘만 그리므로 글자는 서식 초기화 코드 하나다(빈 칸도 같은 글자, 아이콘만 없다). */
export const CELL_TEXT = "§r";
/** 아이콘 줄(IconRow) 칸 숫자 앞에 붙는 흰색 서식 코드. */
export const COUNT_PREFIX = "§f";
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
    "// 화면 id -> 레코드 격자 이름 -> { block: 상세 블록 이름, fields: 상세 필드 }(SelectGrid)",
    `const RECORDS = ${json(obj(screens, (s) => s.records))};`,
    "",
    "// 상세 블록 이름 -> 그 블록을 가진 레코드 격자 이름",
    "function ownerOf(id, block) {",
    "  for (const [name, r] of Object.entries(RECORDS[id])) if (r.block === block) return name;",
    "  return null;",
    "}",
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
    "      // 레코드 상세 블록이면 이름은 격자 이름: { name: 격자, index: 칸, field }",
    "      return { name: ownerOf(id, b.name) ?? b.name, index: Math.floor(off / size), field: b.fields[off % size] };",
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
    "// 레코드 상세 필드 하나 -> [글자, 아이콘?]. 값이 없으면 빈 칸 표식.",
    "function fieldButton(rec, f) {",
    "  if (f.kind === \"icon\") {",
    "    const v = (rec[f.key] ?? [])[f.index];",
    "    if (v === undefined || v === null) return [EMPTY];",
    "    const [icon, count] = Array.isArray(v) ? v : [v];",
    `    return [${JSON.stringify(COUNT_PREFIX)} + String(count ?? f.badge ?? ""), icon];`,
    "  }",
    "  const text = rec[f.key];",
    "  if (text === undefined || text === null) return [EMPTY];",
    "  if (f.kind === \"title\" && rec.icon !== undefined) return [String(text), rec.icon];",
    "  return [String(text)];",
    "}",
    "",
    "// 배치 순서대로 [글자, 아이콘?] 목록을 만든다. 모자란 칸은 기본 글자 또는 빈 칸 표식으로 채운다.",
    "// 레코드 격자(SelectGrid)는 레코드 하나가 칸 버튼 하나와 상세 블록 하나가 된다.",
    "export function buttons(id, data = {}) {",
    "  const layout = layoutOf(id);",
    "  const parts = [",
    "    ...layout.ranges.map((r) => ({ name: r.name, start: r.start, n: r.count })),",
    "    ...layout.blocks.map((b) => ({ name: b.name, start: b.start, n: b.count * b.fields.length, count: b.count })),",
    "  ].sort((a, b) => a.start - b.start);",
    "  for (const k of Object.keys(data)) {",
    "    if (!parts.some((p) => p.name === k && !ownerOf(id, k))) throw new Error(`Screen ${id}: unknown data key ${k}`);",
    "  }",
    "  const out = [];",
    "  for (const p of parts) {",
    "    const owner = ownerOf(id, p.name);",
    "    if (owner) {",
    "      // 상세 블록: 칸 i의 레코드 필드들. 레코드가 없는 칸은 모두 빈 칸 표식.",
    "      const list = data[owner] ?? [];",
    "      for (let i = 0; i < p.count; i++) {",
    "        for (const f of RECORDS[id][owner].fields) out.push(list[i] ? fieldButton(list[i], f) : [EMPTY]);",
    "      }",
    "      continue;",
    "    }",
    "    if (RECORDS[id][p.name]) {",
    "      // 레코드 칸: 아이콘만 보이므로 글자는 CELL_TEXT",
    "      const list = data[p.name] ?? [];",
    "      if (list.length > p.n) throw new Error(`Screen ${id}: ${p.name} has ${list.length} records, max ${p.n}`);",
    "      for (let i = 0; i < p.n; i++) {",
    "        const icon = list[i]?.icon;",
    `        out.push(icon === undefined ? [${JSON.stringify(CELL_TEXT)}] : [${JSON.stringify(CELL_TEXT)}, icon]);`,
    "      }",
    "      continue;",
    "    }",
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
  // 레코드 상세 블록은 데이터 키도 응답 name도 아니다(격자 이름으로 받는다).
  const owned = (s: ScreenInfo): Set<string> => new Set(Object.values(s.records).map((r) => r.block).filter((b): b is string => b !== null));
  const names = (s: ScreenInfo): string[] =>
    [...s.layout.ranges.map((r) => r.name), ...s.layout.blocks.map((b) => b.name)].filter((n) => !owned(s).has(n));
  const union = (xs: string[]): string => (xs.length ? xs.map(q).join(" | ") : "never");
  const recordType = (r: RecordInfo): string => {
    const keys = new Map<string, string>([["icon", "string"]]);
    for (const f of r.fields) keys.set(f.key, f.kind === "icon" ? "IconEntry[]" : "string");
    return `{ ${[...keys].map(([k, t]) => `${q(k)}?: ${t}`).join("; ")} }`;
  };
  const data = screens.map((s) => {
    const fields = names(s).map((n) => `${q(n)}?: ${s.records[n] ? `${recordType(s.records[n]!)}[]` : "Button[]"}`).join("; ");
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
    "/** 아이콘 줄(IconRow) 칸 하나: 아이콘, 또는 [아이콘, 숫자]. 숫자가 없으면 IconRow badge 글자. */",
    "export type IconEntry = string | [icon: string, count?: string | number];",
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
