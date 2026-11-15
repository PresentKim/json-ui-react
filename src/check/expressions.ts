// 식과 바인딩 검사(EXP/BND/DBG). 모든 검사는 본문 하나에서 한 번만 분석한 결과를 공유한다.
//
// 건너뜀: EXP-36 (legacy 검사가 맡는다).
// 규칙 -> 출처: checkExpr(EXP-27 rewrite, DBG-30, EXP-28, EXP-32), checkBindings(BND-01/02/05/22/36),
//   직접 구현(EXP-01/02/03/46, BND-27/31/34).
import type { JsonObject, JsonValue } from "../types.ts";
import type { RuleId } from "../rules/catalog.generated.ts";
import { checkExpr } from "../expr.ts";
import { checkBindings, type BindingObj } from "../bind.ts";
import type { NodeCtx, Report, RuleCheck } from "./types.ts";

type Level = "error" | "warn" | "info";
interface Finding { rule: string; level: Level; message: string }

const isObj = (v: unknown): v is JsonObject => typeof v === "object" && v !== null && !Array.isArray(v);

/** 불리언만 받는 대상 속성 */
const BOOL_TARGETS = new Set(["#visible", "#enabled", "#toggle_state", "#ignored"]);
/** 값이 문자열인 것이 확실한 전역 속성 */
const STRING_GLOBALS = new Set(["#title_text", "#form_text", "#form_button_text", "#item_name", "#hover_text"]);
const EXPR_KEYS = ["ignored", "visible", "enabled"] as const;

/** 따옴표 리터럴을 자리표시 Q로 바꾼 바깥 텍스트 */
function outerText(src: string): string {
  let out = "";
  let i = 0;
  while (i < src.length) {
    if (src[i] === "'") {
      const j = src.indexOf("'", i + 1);
      out += "Q";
      if (j < 0) break;
      i = j + 1;
    } else out += src[i++];
  }
  return out;
}

/** 괄호 묶음 트리에서 `((A - B) = 'z')` 꼴(빼기 결과를 리터럴과 바로 비교)을 찾는다. */
function hasSubtractCompare(outer: string): boolean {
  interface Node { parts: (string | Node)[] }
  const root: Node = { parts: [] };
  const stack: Node[] = [root];
  let buf = "";
  const flush = () => { if (buf) { stack[stack.length - 1]!.parts.push(buf); buf = ""; } };
  for (const ch of outer) {
    if (ch === "(") {
      flush();
      const n: Node = { parts: [] };
      stack[stack.length - 1]!.parts.push(n);
      stack.push(n);
    } else if (ch === ")") {
      flush();
      if (stack.length > 1) stack.pop();
    } else buf += ch;
  }
  flush();
  const subtracts = (n: Node): boolean => n.parts.some((p) => typeof p === "string" && /(^|\s)-(\s|$)/.test(p));
  const visit = (n: Node): boolean => {
    const toks: string[] = [];
    for (const p of n.parts) {
      if (typeof p === "string") toks.push(...p.split(/\s+/).filter(Boolean));
      else toks.push(subtracts(p) ? "S" : "G");
    }
    if (toks.length === 3 && toks[1] === "=" && ((toks[0] === "S" && toks[2] === "Q") || (toks[0] === "Q" && toks[2] === "S"))) return true;
    return n.parts.some((p) => typeof p !== "string" && visit(p));
  };
  return visit(root);
}

/** 식 하나에 대한 직접 검사 */
function checkText(src: string, out: Finding[]): void {
  const outer = outerText(src);
  if (/%/.test(outer)) {
    out.push({ rule: "EXP-02", level: "error", message: "`%`는 연산자가 아니다(Invalid expression). 나머지 연산은 쓰지 말고 값을 미리 나눠 둔다." });
    out.push({ rule: "EXP-46", level: "warn", message: "`%`가 든 식은 느려질 수 있다. 식에서 `%`를 빼고 `(#t - 0)`처럼 단순하게 쓴다." });
  }
  if (/>=|<=/.test(outer)) {
    out.push({ rule: "EXP-03", level: "error", message: "`>=`, `<=`는 없다. `(a > b) or (a = b)` 또는 `(not (a < b))`로 쓴다." });
  }
  // 허용 문자: 단어, 공백, # $ . : ( ) = < > + - * / % 와 비ASCII 글자
  const bad = outer.match(/[^\w\s#$.:()=<>+\-*/%\u0080-￿]/g);
  if (bad) {
    out.push({ rule: "EXP-01", level: "error", message: `식에 쓸 수 없는 연산자 문자 ${[...new Set(bad)].map((c) => `'${c}'`).join(", ")}: = < > not and or + - * / 만 쓴다.` });
  }
  if (hasSubtractCompare(outer)) {
    out.push({ rule: "BND-34", level: "warn", message: "빼기 결과를 같은 식에서 바로 비교하면 결과가 뒤집힌다. view 바인딩으로 #변수에 담은 뒤 비교한다." });
  }
}

/** 검사할 식 문자열 목록: [위치, 값] */
function exprStrings(body: JsonObject): [string, string][] {
  const out: [string, string][] = [];
  if (Array.isArray(body.bindings)) {
    body.bindings.forEach((b, i) => {
      if (isObj(b) && typeof b.source_property_name === "string") out.push([`bindings[${i}].source_property_name`, b.source_property_name]);
    });
  }
  for (const k of EXPR_KEYS) {
    const v = body[k];
    if (typeof v === "string" && v.startsWith("(")) out.push([k, v]);
  }
  return out;
}

function analyze(body: JsonObject): Finding[] {
  const out: Finding[] = [];
  const strs = exprStrings(body);
  const seen = new Set<string>();
  const add = (f: Finding, loc: string) => {
    const key = `${f.rule}|${loc}|${f.message}`;
    if (seen.has(key)) return;
    seen.add(key);
    out.push({ ...f, message: `${loc}: ${f.message}` });
  };
  for (const [loc, s] of strs) {
    for (const d of checkExpr(s, loc)) add({ rule: d.rule, level: d.level, message: d.message }, loc);
    const direct: Finding[] = [];
    checkText(s, direct);
    for (const f of direct) add(f, loc);
  }
  const list = Array.isArray(body.bindings) ? body.bindings.filter(isObj) : [];
  if (list.length) {
    for (const d of checkBindings(list as unknown as BindingObj[], "bindings")) {
      add({ rule: d.rule, level: d.level, message: d.message }, d.path);
    }
  }
  // BND-27: 불리언 대상에 문자열/숫자 리터럴
  const bag = body.property_bag;
  if (isObj(bag)) {
    for (const [k, v] of Object.entries(bag)) {
      if (BOOL_TARGETS.has(k) && (typeof v === "string" || typeof v === "number")) {
        add({ rule: "BND-27", level: "error", message: `불리언 대상 ${k}에 ${JSON.stringify(v)}를 넣을 수 없다: true/false를 쓴다.` }, `property_bag.${k}`);
      }
    }
  }
  list.forEach((b, i) => {
    const type = b.binding_type ?? "global";
    const over = b.binding_name_override;
    if (type === "global" && typeof b.binding_name === "string" && STRING_GLOBALS.has(b.binding_name) && typeof over === "string" && BOOL_TARGETS.has(over)) {
      add({ rule: "BND-27", level: "error", message: `문자열 전역 ${b.binding_name}을 불리언 대상 ${over}에 그대로 바인딩할 수 없다: 식으로 비교해 불리언으로 만든다.` }, `bindings[${i}]`);
    }
  });
  // BND-31: 제목으로 고르는 #visible 은 always
  const titleRouted = list.some((b) => b.binding_name === "#title_text" ||
    (typeof b.source_property_name === "string" && b.source_property_name.includes("#title_text")));
  if (titleRouted) {
    list.forEach((b, i) => {
      if (b.binding_type === "view" && b.target_property_name === "#visible" && b.binding_condition === "once") {
        add({ rule: "BND-31", level: "warn", message: 'title로 고르는 #visible은 binding_condition: "always"로 둔다.' }, `bindings[${i}].binding_condition`);
      }
    });
  }
  return out;
}

// 본문별 분석 캐시. 관련 필드 서명이 바뀌면 다시 분석한다.
const cache = new WeakMap<JsonObject, { sig: string; found: Finding[] }>();
function findings(body: JsonObject): Finding[] {
  const sig = JSON.stringify([body.bindings, body.property_bag, body.ignored, body.visible, body.enabled]);
  const hit = cache.get(body);
  if (hit && hit.sig === sig) return hit.found;
  const found = analyze(body);
  cache.set(body, { sig, found });
  return found;
}

function forbid(id: RuleId): RuleCheck {
  return {
    id,
    stage: "forbid",
    node(ctx: NodeCtx, report: Report) {
      for (const f of findings(ctx.body)) if (f.rule === id) report(f.level, f.message);
    },
  };
}

/** 0.1 -> .1 (따옴표 리터럴 밖에서만) */
function fixFloats(expr: string): string {
  return expr
    .split(/('[^']*')/)
    .map((seg, i) => (i % 2 ? seg : seg.replace(/(?<![\w.#$])\d+(\.\d+)/g, (m, frac: string) => (/^0+$/.test(m.slice(0, m.indexOf("."))) ? frac : m))))
    .join("");
}

const EXP27: RuleCheck = {
  id: "EXP-27",
  stage: "rewrite",
  node(ctx, report) {
    if (!ctx.rewrite) return;
    const body = ctx.body;
    let changed = false;
    const fix = (s: string): string => {
      const f = fixFloats(s);
      if (f !== s) changed = true;
      return f;
    };
    if (Array.isArray(body.bindings)) {
      body.bindings = body.bindings.map((b: JsonValue) => {
        if (!isObj(b)) return b;
        for (const [k, v] of Object.entries(b)) if (typeof v === "string" && v.startsWith("(")) b[k] = fix(v); // 식만 고친다
        return b;
      });
    }
    for (const k of EXPR_KEYS) {
      const v = body[k];
      if (typeof v === "string" && v.startsWith("(")) body[k] = fix(v);
    }
    if (changed) report("info", "실수 리터럴은 .으로 시작해야 한다(0.1은 0으로 계산됨). .1처럼 고쳐 썼다.");
  },
};

export const EXPRESSION_CHECKS: RuleCheck[] = [
  EXP27,
  ...(["DBG-30", "EXP-28", "EXP-32", "BND-01", "BND-05", "BND-22", "BND-36", "BND-02",
    "EXP-02", "EXP-03", "EXP-01", "BND-27", "BND-31", "BND-34", "EXP-46"] as RuleId[]).map(forbid),
];
