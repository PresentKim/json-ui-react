// buildEntityScreens: 엔티티(상자 화면) 호스트용 화면들을 한 팩으로 묶는다.
// 공통 껍데기(chest_screen/pocket_containers modifications, 화면별 overlay·window, empty_cell)와
// 서버 모듈(SCREENS)을 만든다. 바닐라 속성은 건드리지 않고 `modifications`만 쓴다.
import { bind } from "../bind.ts";
import { modify, modifications } from "../modify.ts";
import { createPack } from "../pack.ts";
import { render, toEntry } from "../render.ts";
import type { Diagnostic } from "../lint.ts";
import { runChecks } from "../check/engine.ts";
import { ALL_CHECKS } from "../check/index.ts";
import type { JsonObject, JuiElement, JuiNode } from "../types.ts";
import { createEntitySlots, withEntity, type EntityCtx } from "./context.ts";
import { placeEntityTree } from "./solver.ts";
import type { ScreenInfo } from "./runtime.d.ts";

export interface EntityScreenProps {
  id: string;
  /** 제목 코드: 소문자·숫자 2글자. 엔티티 이름표는 `§b§w§<c1>§<c2>`. */
  code: string;
  /** 창 위쪽에 보이는 제목 글자. */
  title: string;
  /** 창 크기 [너비, 높이]. */
  size: [number, number];
  titleAnchor?: "top_left" | "top_middle";
  /** 창(window) 정의에 덧씌울 속성(max_size, offset 등). */
  window?: JsonObject;
  children?: JuiNode;
}

export interface BuildEntityScreensOptions {
  /** 정의가 들어갈 네임스페이스(파일 ui/<namespace>.json). 기본 "ent". */
  namespace?: string;
  /** false면 풀 수 없는 배치 오류도 경고로 낮춘다. 기본 true(오류면 던진다). */
  strict?: boolean;
}

export interface BuildEntityScreensResult {
  files: Record<string, string>;
  serverModule: string;
  serverTypes: string;
  screens: Record<string, ScreenInfo>;
  diagnostics: Diagnostic[];
}

const SCREEN = Symbol("entity.screen");
const CODE_RE = /^[a-z0-9]{2}$/;
const NS_RE = /^[a-z_][a-z0-9_]*$/;
const MARK = "entity_ui_hide_vanilla";
// 바닐라 숨김 바인딩(캐스트는 타입 전용: 인터페이스를 JsonObject로 본다). 골든 출력의 키 순서(binding_condition이 맨 뒤)를 지키려고 빌더 결과의 조건 키를 뒤로 보낸다
const HIDE: JsonObject = (({ binding_condition, ...rest }) => ({ ...rest, binding_condition }))(
  bind.view("#entity_ui_vanilla_visible", "#visible", { control: MARK, condition: "always" }) as unknown as JsonObject,
);

/** 화면 하나. buildEntityScreens에 넘기는 최상위 요소로만 쓴다. */
export function EntityScreen(_p: EntityScreenProps): JuiElement {
  throw new Error("<EntityScreen>은 buildEntityScreens([...])에 넘겨야 합니다(다른 요소 안에 둘 수 없음)");
}
(EntityScreen as unknown as Record<symbol, boolean>)[SCREEN] = true;

const isEntityScreen = (el: unknown): el is JuiElement & { props: EntityScreenProps } =>
  typeof el === "object" && el !== null && typeof (el as JuiElement).type === "function" &&
  ((el as JuiElement).type as unknown as Record<symbol, boolean>)[SCREEN] === true;

// 타입만: Modification 인터페이스는 JsonObject 인덱스 시그니처와 맞지 않아 단언한다(값은 JSON 그대로).
const mods = (...m: Parameters<typeof modifications>): JsonObject => modifications(...m) as unknown as JsonObject;

function windowDef(p: EntityScreenProps, children: JsonObject[]): JsonObject {
  const anchor = p.titleAnchor ?? "top_left";
  const title: JsonObject = {
    type: "label",
    text: p.title,
    localize: false,
    color: [0.25, 0.25, 0.25],
    anchor_from: anchor,
    anchor_to: anchor,
    offset: anchor === "top_left" ? [8, 6] : [0, 6],
  };
  return {
    type: "image",
    texture: "textures/ui/dialog_background_opaque",
    size: p.size,
    ...(p.window ?? {}),
    controls: [{ title }, { "close@common.close_button": {} }, ...children.map((c) => c)],
  };
}

/** 화면들을 한 팩으로. screens는 `<EntityScreen>` 요소 배열. */
export function buildEntityScreens(screens: JuiNode[], opts: BuildEntityScreensOptions = {}): BuildEntityScreensResult {
  const N = opts.namespace ?? "ent";
  const strict = opts.strict !== false;
  if (!NS_RE.test(N)) throw new Error(`namespace "${N}"는 소문자·숫자·밑줄이어야 합니다`);
  if (screens.length === 0) throw new Error("buildEntityScreens: 화면이 없습니다");

  const pack = createPack();
  const ns = pack.ns(N, `${N}.json`);
  ns.define("empty_cell", { type: "panel", size: [18, 18] });

  const infos: Record<string, ScreenInfo> = {};
  const codes = new Set<string>();
  const diagnostics: Diagnostic[] = [];
  const overlays: string[] = [];

  for (const el of screens) {
    if (!isEntityScreen(el)) throw new Error("buildEntityScreens: 항목은 <EntityScreen> 요소여야 합니다");
    const p = el.props;
    if (typeof p.id !== "string" || p.id === "") throw new Error("<EntityScreen>에 id가 없습니다");
    if (p.id in infos) throw new Error(`화면 id 중복: "${p.id}"`);
    if (typeof p.code !== "string" || !CODE_RE.test(p.code)) throw new Error(`화면 "${p.id}": code "${String(p.code)}"는 소문자·숫자 2글자여야 합니다`);
    if (codes.has(p.code)) throw new Error(`코드 "${p.code}" 중복`);
    if (typeof p.title !== "string") throw new Error(`화면 "${p.id}": title이 없습니다`);
    if (!Array.isArray(p.size) || p.size.length !== 2 || p.size.some((v) => typeof v !== "number")) throw new Error(`화면 "${p.id}": size는 [너비, 높이] 숫자여야 합니다`);
    codes.add(p.code);

    const nameTag = `§b§w§${p.code[0]}§${p.code[1]}`;
    const ctx: EntityCtx = { pack, ns, id: p.id, title: nameTag, slots: createEntitySlots("auto"), buttons: {}, diagnostics: [] };
    const nodes = withEntity(ctx, () => render(p.children ?? null));
    const placed = placeEntityTree(nodes, { strict });
    const mine = [...ctx.diagnostics, ...placed.diagnostics];
    diagnostics.push(...mine);
    const errs = mine.filter((d) => d.level === "error");
    if (errs.length) throw new Error(`화면 "${p.id}": 배치 오류\n${errs.map((d) => `${d.rule} ${d.path}: ${d.message}`).join("\n")}`);

    ns.define(`${p.code}_window`, windowDef(p, placed.nodes.map(toEntry)));
    ns.define(`${p.code}_overlay`, {
      type: "panel",
      size: ["100%", "100%"],
      layer: 1,
      $bwiki_title: "$container_title",
      controls: [{
        host: {
          type: "panel",
          size: ["100%", "100%"],
          ignored: `(not ($bwiki_title = '${nameTag}'))`,
          controls: [
            { [MARK]: { type: "panel", size: [0, 0], property_bag: { "#entity_ui_vanilla_visible": false } } },
            {
              cover: {
                type: "input_panel",
                modal: true,
                size: ["100%", "100%"],
                layer: 1,
                controls: [
                  {
                    sync_grid: {
                      type: "grid",
                      size: [162, 54],
                      layer: 1,
                      grid_rescaling_type: "horizontal",
                      maximum_grid_items: 27,
                      collection_name: "container_items",
                      grid_item_template: `${N}.empty_cell`,
                    },
                  },
                  { [`window@${N}.${p.code}_window`]: { layer: 2 } },
                ],
              },
            },
          ],
        },
      }],
    });
    overlays.push(`${p.code}_overlay@${N}.${p.code}_overlay`);
    infos[p.id] = { title: p.title, nameTag, inventorySize: ctx.slots.inventorySize(), slots: ctx.slots.map(), buttons: ctx.buttons };
  }

  const entries = overlays.map((k) => ({ [k]: {} }));
  const hide = (): JsonObject => (mods(modify.insertBack("bindings", [HIDE])));
  pack.modify("chest_screen.json", "chest", "small_chest_panel", mods(modify.insertBack("controls", entries)));
  pack.modify("chest_screen.json", "chest", "small_chest_panel/root_panel", hide());
  pack.modify("pocket_containers.json", "pocket_containers", "panel", mods(modify.insertBack("controls", entries)));
  for (const k of ["header_area", "background_panel", "half_screen"]) pack.modify("pocket_containers.json", "pocket_containers", k, hide());

  const files = pack.files();
  const parsed = Object.fromEntries(Object.entries(files).map(([f, t]) => [f, JSON.parse(t) as JsonObject]));
  const lint = runChecks(parsed, ALL_CHECKS).diagnostics;
  diagnostics.push(...lint);
  const errors = lint.filter((d) => d.level === "error");
  if (errors.length && strict) throw new Error(`buildEntityScreens: lint 오류\n${errors.map((d) => `${d.rule} ${d.path}: ${d.message}`).join("\n")}`);

  return { files, serverModule: moduleSource(infos), serverTypes: typesSource(infos), screens: infos, diagnostics };
}

function moduleSource(infos: Record<string, ScreenInfo>): string {
  return [
    "// 자동 생성(json-ui-react buildEntityScreens): 직접 고치지 마세요.",
    `export const SCREENS = ${JSON.stringify(infos, null, 2)};`,
    "",
  ].join("\n");
}

function typesSource(infos: Record<string, ScreenInfo>): string {
  return [
    "// 자동 생성(json-ui-react buildEntityScreens): 직접 고치지 마세요.",
    "export interface ScreenInfo {",
    "  title: string;",
    "  nameTag: string;",
    "  inventorySize: 27 | 243;",
    "  slots: Record<string, number[]>;",
    "  buttons: Record<string, number[]>;",
    "}",
    "",
    "export declare const SCREENS: {",
    ...Object.keys(infos).map((k) => `  ${JSON.stringify(k)}: ScreenInfo;`),
    "};",
    "",
  ].join("\n");
}
