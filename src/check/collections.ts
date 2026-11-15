// 컬렉션·파일·수정(modifications) 규칙 검사 (T3).
// 구현: COL-25 COL-38 COL-43 COL-45 FILE-01 FILE-05 FILE-09 FILE-10 FILE-24 FILE-25 FILE-32 FILE-39
//       MOD-03 MOD-04 MOD-05 MOD-19
// 건너뜀(이유):
//   COL-13  행 타입 팩토리의 셀 중복은 데이터(행 수)에 달려 있어 JSON만으로 알 수 없다.
//   COL-14  같은 이름 팩토리 재선언은 세 팩이 쓰는 정상 기법이라 금지 대상이 아니다.
//   FILE-30 뒤따르는 쉼표는 JSON.stringify 직렬화기가 만들 수 없다(이미 파싱된 객체만 받는다).
// 오탐보다 누락을 택한다: 상속·바닐라 내용을 알 수 없으면 검사하지 않는다.
import type { JsonObject, JsonValue } from "../types.ts";
import type { NodeCtx, RuleCheck } from "./types.ts";

/** 바닐라가 이미 등록한 UI 파일. 이 경로는 `_ui_defs.json`에 다시 적지 않는다. */
export const VANILLA_UI_FILES: ReadonlySet<string> = new Set(
  [
    "hud_screen", "chest_screen", "pocket_containers", "server_form", "_global_variables", "_ui_defs",
    "inventory_screen", "inventory_screen_pocket", "pause_screen", "start_screen", "play_screen", "settings_screen",
    "chat_screen", "death_screen", "progress_screen", "ui_common", "common", "ui_template_buttons", "ui_purchase_screens",
    "crafting_screen", "furnace_screen", "anvil_screen", "enchanting_screen", "large_chest_screen", "ender_chest_screen",
    "shulker_box_screen", "barrel_screen", "beacon_screen", "brewing_stand_screen", "cartography_screen", "grindstone_screen",
    "loom_screen", "smithing_table_screen", "stonecutter_screen", "trade_screen", "hud_screen",
  ].map((n) => `ui/${n}.json`),
);

const isObj = (v: unknown): v is JsonObject => typeof v === "object" && v !== null && !Array.isArray(v);
const UI_DEFS = "ui/_ui_defs.json";

/** controls 배열의 (키, 본문) 항목. */
function childEntries(body: JsonObject): [string, JsonValue][] {
  const out: [string, JsonValue][] = [];
  if (!Array.isArray(body.controls)) return out;
  for (const item of body.controls) if (isObj(item)) out.push(...Object.entries(item));
  return out;
}

/** modifications 항목(객체)만 꺼낸다. */
function mods(body: JsonObject): JsonObject[] {
  return Array.isArray(body.modifications) ? body.modifications.filter(isObj) : [];
}

/** 노드가 직접 선언한 배열인지(상속 제외). */
const declares = (body: JsonObject, array: string): boolean => Array.isArray(body[array]);

/** 본문에서 정의 `ns.name`의 @base 사슬을 따라가며 배열을 선언한 조상이 있는지. 해석 못하면 undefined. */
function inheritedDeclares(ctx: NodeCtx, array: string): boolean | undefined {
  const seen = new Set<string>();
  let ref = ctx.ref;
  let ns = ctx.ns;
  while (ref) {
    const full = ref.includes(".") ? ref : `${ns}.${ref}`;
    if (seen.has(full)) return undefined;
    seen.add(full);
    const base = ctx.index.get(full);
    if (!base) return undefined; // 바닐라 등 모르는 정의
    if (declares(base.body, array)) return true;
    ref = base.ref;
    ns = base.ns;
  }
  return false;
}

const FACTORY_DIRECT = ["control_name", "control_ids"];

const colFactory = (ctx: NodeCtx): { f?: JsonObject; direct: boolean } => ({
  f: isObj(ctx.body.factory) ? ctx.body.factory : undefined,
  direct: FACTORY_DIRECT.some((k) => k in ctx.body),
});

export const COLLECTION_CHECKS: RuleCheck[] = [
  {
    id: "COL-25",
    stage: "forbid",
    node(ctx, report) {
      const { f, direct } = colFactory(ctx);
      if (ctx.type === "factory" && f && !direct && typeof f.name === "string" && f.name !== ctx.name)
        report("warn", `type이 factory인 컨트롤은 이름("${ctx.name}")이 곧 팩토리 이름이다. factory.name("${f.name}")은 읽히지 않는다. 컨트롤 이름을 맞추거나 type을 panel로 바꾼다.`);
    },
  },
  {
    id: "COL-45",
    stage: "forbid",
    node(ctx, report) {
      const { f, direct } = colFactory(ctx);
      if (ctx.type === "factory" && direct && f)
        report("warn", "컨트롤 하나에는 팩토리가 하나만 붙는다. control_name/control_ids와 factory 객체 중 하나만 쓴다.");
      else if (ctx.type !== undefined && ctx.type !== "factory" && f && typeof f.name !== "string")
        report("warn", "factory 객체에는 name이 있어야 한다. 엔진 팩토리 이름을 name에 적는다.");
    },
  },
  {
    id: "COL-43",
    stage: "forbid",
    node(ctx, report) {
      const { f } = colFactory(ctx);
      const src = f ?? ctx.body;
      if (!f && ctx.type !== "factory") return;
      if (typeof src.control_name === "string" && src.control_name && isObj(src.control_ids))
        report("warn", "control_name이 있으면 control_ids는 읽히지 않는다. 둘 중 하나만 쓴다.");
      const loc = src.insert_location;
      if (typeof loc === "string" && loc !== "front" && loc !== "back")
        report("warn", `insert_location "${loc}"은 뒤(back)로 처리된다. "front" 또는 "back"만 쓴다.`);
    },
  },
  {
    id: "COL-38",
    stage: "forbid",
    node(ctx, report) {
      const p = ctx.parent;
      if (!p || !("collection_index" in ctx.body)) return;
      if (p.ref || p.type === "panel" || p.type === undefined) return; // 상속·불명은 검사하지 않고, panel은 COL-50 담당
      if (Object.keys(p.body).some((k) => k.includes("collection_name"))) return;
      report("warn", `collection_index는 collection_name을 가진 stack_panel의 바로 아래 자식에서만 먹는다. 부모(${p.type})에 collection_name을 준다.`);
    },
  },
  {
    id: "FILE-01",
    stage: "forbid",
    file({ path, json, files }, report) {
      const defs = files[UI_DEFS];
      if (path === UI_DEFS) {
        const list = Array.isArray(json.ui_defs) ? json.ui_defs : [];
        for (const e of list)
          if (typeof e === "string" && VANILLA_UI_FILES.has(e)) report("warn", `${e}는 바닐라가 이미 등록했다. _ui_defs.json에서 뺀다.`);
        return;
      }
      if (!defs || !path.startsWith("ui/") || VANILLA_UI_FILES.has(path)) return;
      const list = Array.isArray(defs.ui_defs) ? defs.ui_defs : [];
      if (!list.includes(path)) report("error", `${path}가 ui/_ui_defs.json의 ui_defs에 없어 로드되지 않는다. 경로를 등록한다.`);
    },
  },
  {
    id: "FILE-05",
    stage: "forbid",
    file({ path, json, files }, report) {
      if (path === UI_DEFS || !path.startsWith("ui/")) return;
      if (typeof json.namespace !== "string" || !json.namespace) {
        if (!VANILLA_UI_FILES.has(path)) report("error", `${path}에 namespace가 없다. "namespace": "이름"을 하나 적는다.`);
        return;
      }
      const dup = Object.entries(files).find(([p, j]) => p < path && p !== UI_DEFS && j.namespace === json.namespace);
      if (dup) report("error", `namespace "${json.namespace}"가 ${dup[0]}와 겹친다. 파일마다 다른 namespace를 쓴다.`);
    },
  },
  {
    id: "FILE-25",
    stage: "forbid",
    file({ path, json }, report) {
      if (path !== UI_DEFS || !Array.isArray(json.ui_defs)) return;
      for (const e of json.ui_defs)
        if (typeof e === "string" && (!e.startsWith("ui/") || !e.endsWith(".json")))
          report("warn", `ui_defs 경로 "${e}"는 ui/ 아래 전체 경로(확장자 포함)여야 안전하다.`);
    },
  },
  {
    id: "FILE-09",
    stage: "forbid",
    node(ctx, report) {
      for (const k of Object.keys(ctx.body))
        if (k.startsWith("$") && k.includes("|") && k.split("|")[1] !== "default")
          report("warn", `변수 키 "${k}"의 | 뒤는 default만 쓸 수 있다.`);
    },
  },
  {
    id: "FILE-10",
    stage: "forbid",
    node(ctx, report) {
      const declared = new Set<string>();
      for (let c: NodeCtx | undefined = ctx; c; c = c.parent)
        for (const k of Object.keys(c.body)) if (k.startsWith("$")) declared.add(k.slice(1).split("|")[0]!);
      if (!declared.size) return;
      for (const [k, v] of Object.entries(ctx.body)) {
        if (k.startsWith("$") || typeof v !== "string" || v.trimStart().startsWith("(")) continue;
        for (const m of v.matchAll(/\$([A-Za-z_]\w*)/g)) {
          if (!declared.has(m[1]!) || v === m[0]) continue;
          report("warn", `"${k}" 값 안의 $${m[1]}는 치환되지 않고 그대로 찍힌다. 값 전체를 변수로 두거나 변수 식을 쓴다.`);
          break;
        }
      }
    },
  },
  {
    id: "FILE-24",
    stage: "forbid",
    node(ctx, report) {
      const bag = ctx.body.property_bag;
      if (!isObj(bag)) return;
      for (const k of ["size", "offset", "alpha"])
        if (k in bag) report("warn", `property_bag의 ${k}는 적용되지 않는다. 바인딩으로 바꾼다.`);
    },
  },
  {
    id: "FILE-32",
    stage: "forbid",
    node(ctx, report) {
      if (ctx.key.includes("@") || !ctx.key.includes(".")) return;
      report("warn", `키 "${ctx.key}"의 점은 namespace 구분으로 읽힌다. 컨트롤 이름에 점을 쓰지 않는다.`);
    },
  },
  {
    id: "FILE-39",
    stage: "forbid",
    node(ctx, report) {
      const seen = new Set<string>();
      const dups = new Set<string>();
      for (const [key] of childEntries(ctx.body)) {
        const name = key.split("@")[0]!;
        if (seen.has(name)) dups.add(name);
        seen.add(name);
      }
      for (const n of dups) report("warn", `같은 controls 안에 이름 "${n}"이 둘 이상이다. 형제 이름을 서로 다르게 짓는다.`);
    },
  },
  {
    id: "MOD-03",
    stage: "forbid",
    node(ctx, report) {
      if (mods(ctx.body).some((m) => m.array_name === "variables"))
        report("warn", "modifications로 variables 배열은 고칠 수 없다(무시된다). controls나 bindings를 쓴다.");
    },
  },
  {
    id: "MOD-04",
    stage: "forbid",
    node(ctx, report) {
      if (!ctx.ref || ctx.key.includes("/")) return;
      for (const m of mods(ctx.body)) {
        const arr = m.array_name;
        if (typeof arr !== "string" || typeof m.operation !== "string" || !m.operation.startsWith("insert")) continue;
        if (declares(ctx.body, arr)) continue;
        if (inheritedDeclares(ctx, arr) === true)
          report("error", `${arr}는 상속만 받은 배열이다. insert하면 새 배열이 상속 내용을 가린다. 배열을 직접 선언한 정의에 넣는다.`);
      }
    },
  },
  {
    id: "MOD-05",
    stage: "forbid",
    node(ctx, report) {
      if (!ctx.ref) return;
      for (const m of mods(ctx.body)) {
        if (m.operation !== "remove" || m.array_name !== "controls" || typeof m.control_name !== "string") continue;
        const own = childEntries(ctx.body).some(([k]) => k.split("@")[0] === m.control_name);
        if (!own) report("error", `상속받은 자식 "${m.control_name}"을 remove하면 이 파일의 수정 전체가 조용히 무시된다. 직접 선언한 자식만 지운다.`);
      }
    },
  },
  {
    id: "MOD-19",
    stage: "forbid",
    file({ path, json, files }, report) {
      const ns = json.namespace;
      if (typeof ns !== "string") return;
      for (const [key, body] of Object.entries(json)) {
        if (key === "namespace" || !isObj(body)) continue;
        const [name, ref] = key.split("@");
        for (const [p, j] of Object.entries(files)) {
          if (p >= path || j.namespace !== ns) continue;
          const other = Object.keys(j).find((k) => k !== "namespace" && k.split("@")[0] === name);
          if (other !== undefined && other.split("@")[1] !== ref)
            report("warn", `${ns}.${name}가 ${p}에서 다른 @base로 이미 선언됐다. 재선언은 기존 정의를 버린다. @base를 맞춘다.`);
        }
      }
    },
  },
];
