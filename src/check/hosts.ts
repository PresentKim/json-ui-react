// 호스트(서버 폼/HUD/엔티티)와 입력 컨트롤 규칙 검사.
// 구현: HOST-03 HOST-06 HOST-12 HOST-15 HOST-19 HOST-26 HOST-49 INP-06 INP-11 INP-31 INP-35
//       재작성: HOST-34 HOST-43 INP-32 (opts.rewrite 일 때만 동작, 아니면 아무것도 하지 않는다)
// 건너뜀: 없음. 다만 아래는 보수적으로만 잡는다(놓치는 쪽을 택함).
//  - HOST-03/15: 접두사/포함 비교 리터럴이 4글자 미만일 때만 warn(길고 고유해야 한다는 규칙).
//  - HOST-06: 같은 부모의 자식 3개 이상이 #title_text 로 #visible 을 바인딩할 때만 warn.
//  - HOST-12: 팩토리에서 도달할 수 없는 슬라이더만 warn.
//  - HOST-34: `- '$'` 로 한 글자 패딩을 지우는 식만 `'\t'` 로 바꾼다(인코더도 같이 바꿔야 한다).
//  - INP-31: $pressed_button_name 이 문자열이 아니거나 "button." 으로 시작하지 않을 때만 warn.
import type { JsonObject, JsonValue } from "../types.ts";
import type { NodeCtx, RuleCheck } from "./types.ts";

const isObj = (v: unknown): v is JsonObject => typeof v === "object" && v !== null && !Array.isArray(v);

/** 키가 `k`, `$k`, `k|default` 중 하나로 있는지 */
function hasKey(body: JsonObject, k: string): boolean {
  return Object.keys(body).some((x) => x === k || x === `$${k}` || x.split("|")[0] === k || x.split("|")[0] === `$${k}`);
}

const bindingsOf = (body: JsonObject): JsonObject[] => (Array.isArray(body.bindings) ? body.bindings.filter(isObj) : []);

/** 본문 아래 직속 자식 [이름, 본문] 목록 */
function childrenOf(body: JsonObject): [string, JsonObject][] {
  const out: [string, JsonObject][] = [];
  if (!Array.isArray(body.controls)) return out;
  for (const item of body.controls) {
    if (!isObj(item)) continue;
    for (const [k, v] of Object.entries(item)) if (isObj(v)) out.push([k.split("@")[0]!, v]);
  }
  return out;
}

const srcOf = (b: JsonObject): string[] =>
  [b.source_property_name, b.binding_name].filter((x): x is string => typeof x === "string");

// ------------------------------------------------------------ HOST-03 / HOST-15

const MIN_FLAG = 4;

function shortFlags(expr: string, channel: string): string[] {
  const out: string[] = [];
  const ch = channel.replace(/[#]/g, "\\#");
  // 접두사 방식: ('%.13s' * #title_text) = 'flag'
  const pre = new RegExp(`'%\\.\\d+s'\\s*\\*\\s*${ch}\\)?\\s*=\\s*'([^']*)'`, "g");
  for (const m of expr.matchAll(pre)) out.push(m[1]!);
  // 포함 방식: ((#title_text - 'flag') = #title_text)
  const inc = new RegExp(`\\(\\s*${ch}\\s*-\\s*'([^']*)'\\s*\\)\\s*=\\s*${ch}`, "g");
  for (const m of expr.matchAll(inc)) out.push(m[1]!);
  return out.filter((f) => f.length < MIN_FLAG);
}

function flagCheck(id: "HOST-03" | "HOST-15", channel: string): RuleCheck {
  return {
    id,
    stage: "forbid",
    node(ctx, report) {
      for (const b of bindingsOf(ctx.body)) {
        for (const s of srcOf(b)) {
          for (const f of shortFlags(s, channel)) {
            report("warn", `데이터 채널 플래그 '${f}'가 너무 짧다. ${MIN_FLAG}글자 이상의 고유한 접두사로 바꾼다.`);
          }
        }
      }
    },
  };
}

// ------------------------------------------------------------ HOST-06

const HOST06: RuleCheck = {
  id: "HOST-06",
  stage: "forbid",
  node(ctx, report) {
    const gated = childrenOf(ctx.body).filter(([, c]) =>
      bindingsOf(c).some(
        (b) =>
          b.binding_type === "view" &&
          (b.target_property_name === "#visible" || b.binding_name_override === "#visible") &&
          srcOf(b).some((s) => s.includes("#title_text")),
      ),
    );
    if (gated.length >= 3) {
      report("warn", `화면 ${gated.length}개를 #title_text 가시성으로 모두 붙였다. 선택된 화면만 생성하도록 #collection_length 라우팅을 쓴다.`);
    }
  },
};

// ------------------------------------------------------------ HOST-12

const factoryReach = new WeakMap<object, Set<string>>();

/** 팩토리 control_ids 에서 (참조·자식 정의를 따라) 도달할 수 있는 정의 전체 이름 집합 */
function reachable(ctx: NodeCtx): Set<string> {
  const cached = factoryReach.get(ctx.index as object);
  if (cached) return cached;
  const norm = (s: string): string => s.replace(/^@/, "");
  const full = (r: string, ns: string): string => (r.includes(".") ? r : `${ns}.${r}`);
  /** 본문 아래의 팩토리 대상과 @참조 이름을 모은다 */
  const collect = (b: JsonObject, ns: string, out: string[]): void => {
    if (isObj(b.factory) && isObj(b.factory.control_ids)) {
      for (const v of Object.values(b.factory.control_ids)) if (typeof v === "string") out.push(norm(v));
    }
    for (const item of Array.isArray(b.controls) ? b.controls : []) {
      if (!isObj(item)) continue;
      for (const [k, v] of Object.entries(item)) {
        if (!isObj(v)) continue;
        const ref = k.split("@")[1];
        if (ref) out.push(full(ref, ns));
        collect(v, ns, out);
      }
    }
  };
  const seen = new Set<string>();
  const q: string[] = [];
  for (const d of ctx.index.all()) {
    const f = d.body.factory;
    if (isObj(f) && isObj(f.control_ids)) for (const v of Object.values(f.control_ids)) if (typeof v === "string") q.push(norm(v));
  }
  while (q.length) {
    const n = q.pop()!;
    if (seen.has(n)) continue;
    seen.add(n);
    const d = ctx.index.get(n);
    if (!d) continue;
    if (d.ref) q.push(full(d.ref, d.ns));
    collect(d.body, d.ns, q);
  }
  factoryReach.set(ctx.index as object, seen);
  return seen;
}

const HOST12: RuleCheck = {
  id: "HOST-12",
  stage: "forbid",
  node(ctx, report) {
    if (ctx.type !== "slider") return;
    let top: NodeCtx = ctx;
    while (top.parent) top = top.parent;
    const reach = reachable(ctx);
    if (reach.has(`${top.ns}.${top.name}`)) return;
    report("warn", `슬라이더를 정적으로 배치했다. custom_form 행 타입 팩토리가 슬라이더 행이 있을 때만 만들게 한다.`);
  },
};

// ------------------------------------------------------------ HOST-19

const HOST19: RuleCheck = {
  id: "HOST-19",
  stage: "forbid",
  node(ctx, report) {
    for (const b of bindingsOf(ctx.body)) {
      if (srcOf(b).some((s) => s.includes("$container_title"))) {
        report("error", `$container_title 은 바인딩 식에 쓸 수 없다. 라우팅은 슬롯 값으로 한다.`);
      }
    }
  },
};

// ------------------------------------------------------------ HOST-26

const HOST26: RuleCheck = {
  id: "HOST-26",
  stage: "forbid",
  node(ctx, report) {
    if (ctx.depth !== 0 || !/(^|\/)hud_screen\.json$/.test(ctx.file)) return;
    if (ctx.name !== "root_panel" && !ctx.name.startsWith("root_panel/")) return;
    if (Array.isArray(ctx.body.controls) || ctx.body.modifications !== undefined) {
      report("warn", `커스텀 HUD 레이어를 root_panel 안에 넣었다. common.base_screen 의 $screen_bg_content 슬롯에 둔다.`);
    }
  },
};

// ------------------------------------------------------------ HOST-49

const HOST49: RuleCheck = {
  id: "HOST-49",
  stage: "forbid",
  node(ctx, report) {
    if (ctx.depth !== 0) return;
    if (ctx.name !== "small_chest_screen" && ctx.name !== "large_chest_screen") return;
    if (ctx.ns !== "chest" && !/chest_screen\.json$/.test(ctx.file)) return;
    report("warn", `상자 화면을 재선언하지 않는다. 바닐라 상자 패널(chest.small_chest_panel)의 controls 에 modifications 로 넣는다.`);
  },
};

// ------------------------------------------------------------ INP-06

const STATE_NAMES = ["default_control", "hover_control", "pressed_control", "locked_control"];
const COMMON_BUTTONS = new Set(["common.button", "common.light_text_button"]);

const INP06: RuleCheck = {
  id: "INP-06",
  stage: "forbid",
  node(ctx, report) {
    const isButton = ctx.type === "button" || (ctx.type === undefined && !!ctx.ref && COMMON_BUTTONS.has(ctx.ref));
    if (!isButton) return;
    const targets = new Set<string>();
    for (const k of STATE_NAMES) {
      const v = ctx.body[k];
      if (typeof v === "string") targets.add(v);
    }
    // 바닐라 common.button 계열은 기본 상태 이름을 쓴다
    if (ctx.type === undefined) for (const n of ["default", "hover", "pressed", "locked"]) targets.add(n);
    for (const [name, child] of childrenOf(ctx.body)) {
      if (!targets.has(name)) continue;
      const gated =
        hasKey(child, "visible") ||
        bindingsOf(child).some((b) => b.binding_name_override === "#visible" || b.target_property_name === "#visible");
      if (gated) report("warn", `\`${name}\` 버튼 상태 컨트롤의 가시성은 상태 머신이 소유한다. 가시성 게이트는 상태 컨트롤 안쪽이나 버튼 바깥에 둔다.`);
    }
  },
};

// ------------------------------------------------------------ INP-11 / INP-35

/** ref 사슬을 따라 모든 정의가 로컬에 있으면 합친 키 집합, 하나라도 못 찾으면 undefined(상속 불명) */
function mergedKeys(ctx: NodeCtx): Set<string> | undefined {
  const keys = new Set<string>();
  const add = (b: JsonObject): void => {
    for (const k of Object.keys(b)) keys.add(k.split("|")[0]!.replace(/^\$/, ""));
  };
  add(ctx.body);
  let ref = ctx.ref;
  let ns = ctx.ns;
  for (let i = 0; ref && i < 20; i++) {
    const full = ref.includes(".") ? ref : `${ns}.${ref}`;
    const d = ctx.index.get(full);
    if (!d) return undefined;
    add(d.body);
    ref = d.ref;
    ns = d.ns;
  }
  return keys;
}

const INP11: RuleCheck = {
  id: "INP-11",
  stage: "forbid",
  node(ctx, report) {
    if (ctx.type !== "toggle") return;
    const keys = mergedKeys(ctx);
    if (!keys) return;
    const missing = ["toggle_on_button", "button_mappings"].filter((k) => !keys.has(k));
    if (missing.length) report("error", `토글에 ${missing.join(", ")}가 없어 눌리지 않는다. toggle_on_button, toggle_off_button, button_mappings 를 준다.`);
  },
};

const INP35: RuleCheck = {
  id: "INP-35",
  stage: "forbid",
  node(ctx, report) {
    if (ctx.type !== "toggle" || ctx.body.radio_toggle_group !== true) return;
    const keys = mergedKeys(ctx);
    if (!keys || keys.has("toggle_name")) return;
    report("warn", `라디오 그룹은 부모가 아니라 toggle_name 으로 묶인다. toggle_name 을 준다.`);
  },
};

// ------------------------------------------------------------ INP-31

const INP31: RuleCheck = {
  id: "INP-31",
  stage: "forbid",
  node(ctx, report) {
    const v = ctx.body["$pressed_button_name"];
    if (v === undefined) return;
    if (typeof v !== "string" || (!v.startsWith("button.") && !v.startsWith("$"))) {
      report("warn", `$pressed_button_name 이 엔진 버튼 이름이 아니다. 폼에 답하게 하려면 button.form_button_click 을 쓴다.`);
    }
  },
};

// ------------------------------------------------------------ 재작성

/** 서버 폼 칸(form_buttons 컬렉션 상세 바인딩)인지 */
const isFormCell = (body: JsonObject): boolean =>
  bindingsOf(body).some((b) => b.binding_type === "collection_details" && b.binding_collection_name === "form_buttons");

const HOST34: RuleCheck = {
  id: "HOST-34",
  stage: "rewrite",
  node(ctx, report) {
    if (!ctx.rewrite) return;
    let changed = false;
    for (const b of bindingsOf(ctx.body)) {
      for (const k of ["source_property_name", "binding_name"] as const) {
        const s = b[k];
        if (typeof s === "string" && s.includes("- '$')")) {
          b[k] = s.split("- '$')").join("- '\\t')");
          changed = true;
        }
      }
    }
    if (changed) report("info", `고정 폭 패딩 문자 '$' 를 탭으로 바꿨다. 인코더의 패딩도 탭으로 맞춘다.`);
  },
};

const HOST43: RuleCheck = {
  id: "HOST-43",
  stage: "rewrite",
  node(ctx, report) {
    if (!ctx.rewrite || ctx.depth !== 0 || ctx.name !== "third_party_server_screen") return;
    let changed = false;
    for (const k of ["$screen_animations", "$background_animations"]) {
      if (!hasKey(ctx.body, k.slice(1))) {
        ctx.body[k] = [] as JsonValue;
        changed = true;
      }
    }
    if (changed) report("info", `$screen_animations, $background_animations 를 빈 배열로 채웠다.`);
  },
};

const INP32: RuleCheck = {
  id: "INP-32",
  stage: "rewrite",
  node(ctx, report) {
    if (!ctx.rewrite || !isFormCell(ctx.body)) return;
    const set = (k: string, v: JsonValue): boolean => {
      if (hasKey(ctx.body, k.replace(/^\$/, ""))) return false;
      ctx.body[k] = v;
      return true;
    };
    let changed = false;
    if (ctx.type === "button") changed = set("focus_enabled", false);
    else if (ctx.type === "toggle") changed = set("focus_enabled", false);
    else if (ctx.ref === "common.button") changed = set("$focus_enabled", false);
    else if (ctx.ref === "common.toggle") {
      const a = set("$toggle_focus_enabled", false);
      const b = hasKey(ctx.body, "toggle_name") ? set("$toggle_group_default_selected", -1) : false;
      changed = a || b;
    }
    if (changed) report("info", `폼 버튼의 포커스를 껐다(휴대폰 첫 버튼 호버 방지).`);
  },
};

export const HOST_CHECKS: RuleCheck[] = [
  flagCheck("HOST-03", "#title_text"),
  HOST06,
  HOST12,
  flagCheck("HOST-15", "#hud_title_text_string"),
  HOST19,
  HOST26,
  HOST49,
  INP06,
  INP11,
  INP31,
  INP35,
  HOST34,
  HOST43,
  INP32,
];
