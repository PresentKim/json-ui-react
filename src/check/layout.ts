// 레이아웃(LAY), 글꼴(TXT), 깨진 값(DBG) 규칙 검사.
//
// 건너뛴 규칙:
//  - LAY-53: 창(window)이 무엇인지 JSON만으로 판별할 수 없어 오탐 위험이 크다.
//  - TXT-06: 바인딩 원본이 숫자인지 JSON만으로 알 수 없다(식 검사는 expressions 쪽 책임).
//  - LAY-56: LAY-38과 같은 경우라 LAY-38 한 번만 보고하고 메시지에 둘 다 적는다.
//            LAY-56 검사 객체는 규칙 추적용 자리표시이며 아무것도 보고하지 않는다.
import type { JsonObject } from "../types.ts";
import type { NodeCtx, Report, RuleCheck } from "./types.ts";
import { FONT_TYPES } from "../controls/visual.ts";

const isObj = (v: unknown): v is JsonObject => typeof v === "object" && v !== null && !Array.isArray(v);

/** 본문의 바인딩 배열(객체만). */
function bindingsOf(body: JsonObject): JsonObject[] {
  return Array.isArray(body.bindings) ? body.bindings.filter(isObj) : [];
}

function targets(body: JsonObject): string[] {
  return bindingsOf(body)
    .map((b) => b.target_property_name)
    .filter((t): t is string => typeof t === "string");
}

/** ref 사슬을 따라 type을 찾는다(깊이 제한, 순환 방지). */
function resolveType(ctx: NodeCtx | undefined): string | undefined {
  if (!ctx) return undefined;
  if (ctx.type) return ctx.type;
  let ref = ctx.ref;
  for (let i = 0; i < 8 && ref; i++) {
    const hit = ctx.index.get(ref.includes(".") ? ref : `${ctx.ns}.${ref}`);
    if (!hit) return undefined;
    if (typeof hit.body.type === "string") return hit.body.type;
    ref = hit.ref;
  }
  return undefined;
}

// ---- 크기 문자열 문법 ----
const TERM = /^\d*\.?\d+(px|%|%c|%cm|%sm|%x|%y)?$/;
const SWAPPED = /^\d*\.?\d+(c|cm|sm)%$/;
const SIZE_KEYS = ["size", "max_size", "min_size", "offset"] as const;

/** 변수·식이 섞인 문자열은 검사하지 않는다. */
const dynamic = (s: string) => /[$#()]/.test(s);

interface SizeItem { key: string; axis: number; value: string | number }

function sizeItems(body: JsonObject): SizeItem[] {
  const out: SizeItem[] = [];
  for (const key of SIZE_KEYS) {
    const v = body[key];
    if (!Array.isArray(v)) continue;
    v.forEach((e, axis) => {
      if ((typeof e === "string" || typeof e === "number") && axis < 2) out.push({ key, axis, value: e });
    });
  }
  return out;
}

/** 크기 문자열 하나를 항/부호 토큰으로 나눈다. 부호가 붙은 항("-10px")도 허용한다. */
function tokens(s: string): string[] {
  return s.replace(/([+-])\s*(?=\d|\.)/g, " $1 ").split(/\s+/).filter(Boolean);
}

/** 픽셀 숫자값(숫자 또는 "Npx"). 그 외는 undefined. */
function px(v: unknown): number | undefined {
  if (typeof v === "number") return v;
  if (typeof v === "string") {
    const m = /^(-?\d*\.?\d+)px$/.exec(v.trim());
    if (m) return Number(m[1]);
  }
  return undefined;
}

const sizeCheck = (id: RuleCheck["id"], fn: (it: SizeItem, s: string, report: Report) => void): RuleCheck => ({
  id,
  stage: "forbid",
  node(ctx, report) {
    for (const it of sizeItems(ctx.body)) if (typeof it.value === "string" && !dynamic(it.value)) fn(it, it.value.trim(), report);
  },
});

const where = (it: SizeItem) => `${it.key}[${it.axis}]`;

const KEYWORDS = new Set(["fill", "default"]);

function hasCollectionCell(ctx: NodeCtx): boolean {
  for (let c: NodeCtx | undefined = ctx; c; c = c.parent) {
    const b = c.body;
    if (typeof b.collection_name === "string" || b.collection_index !== undefined) return true;
    if (bindingsOf(b).some((x) => typeof x.binding_collection_name === "string")) return true;
  }
  return false;
}

const STACK_ROLES = ["scrolling_view_port", "scrolling_content", "scrollbar_track", "scrollbar_box"];

/** 닫히지 않은 괄호 검사(작은따옴표 문자열은 제외). */
function unbalanced(s: string): boolean {
  let depth = 0;
  for (const ch of s.replace(/'[^']*'/g, "")) {
    if (ch === "(") depth++;
    else if (ch === ")" && --depth < 0) return true;
  }
  return depth !== 0;
}

export const LAYOUT_CHECKS: RuleCheck[] = [
  {
    id: "LAY-02",
    stage: "forbid",
    node(ctx, report) {
      if (ctx.type === "scroll_box") report("error", "scroll_box는 type이 아니다. common.scrolling_panel 템플릿을 사용하라.");
    },
  },
  {
    id: "LAY-05",
    stage: "forbid",
    node(ctx, report) {
      if (targets(ctx.body).includes("#offset")) report("warn", "offset은 바인딩할 수 없다. 앞쪽 spacer의 크기를 바인딩해 밀어라.");
    },
  },
  {
    id: "LAY-11",
    stage: "forbid",
    node(ctx, report) {
      const t = targets(ctx.body);
      const has = (a: string) => t.includes(`#size_binding_${a}`) || t.includes(`#size_binding_${a}_absolute`);
      if (has("x") !== has("y")) report("warn", "크기 바인딩은 x, y 두 축을 모두 바인딩하라. 한 축만 하면 다른 축이 0으로 남는다.");
    },
  },
  {
    id: "LAY-13",
    stage: "forbid",
    node(ctx, report) {
      if (targets(ctx.body).includes("#alpha")) report("warn", "바인딩한 alpha는 0과 1만 적용된다. 반투명은 alpha가 다른 사본을 리터럴로 만들어라.");
    },
  },
  {
    id: "LAY-14",
    stage: "forbid",
    node(ctx, report) {
      const sized = targets(ctx.body).some((t) => t.startsWith("#size_binding_"));
      if (sized && ctx.body.use_anchored_offset === true && hasCollectionCell(ctx))
        report("error", "크기 바인딩 + use_anchored_offset + 컬렉션 셀 조합은 클라이언트를 크래시시킨다. 조합을 피하라.");
    },
  },
  {
    id: "LAY-30",
    stage: "forbid",
    node(ctx, report) {
      const b = ctx.body;
      if (resolveType(ctx) !== "grid") return;
      const bound = targets(b).includes("#maximum_grid_items");
      if (!bound) return;
      const w = Array.isArray(b.size) ? px(b.size[0]) : undefined;
      if (b.grid_rescaling_type !== "horizontal" || w === undefined)
        report("warn", "개수를 바인딩하는 그리드는 grid_rescaling_type을 horizontal로, 폭을 고정 px로 지정하라.");
    },
  },
  {
    id: "LAY-32",
    stage: "forbid",
    node(ctx, report) {
      if (ctx.body.grid_rescaling_type === "vertical") report("warn", 'grid_rescaling_type "vertical"은 크래시 위험이 있다. "horizontal"을 써라.');
    },
  },
  sizeCheck("LAY-34", (it, s, report) => {
    if (/^-?\d*\.?\d+$/.test(s)) report("error", `${where(it)} "${s}": 단위 없는 숫자 문자열은 0이 된다. 숫자로 쓰거나 "${s}px"로 써라.`);
    else if (!KEYWORDS.has(s) && KEYWORDS.has(s.toLowerCase())) report("error", `${where(it)} "${s}": 크기 키워드는 소문자(${s.toLowerCase()})여야 한다.`);
  }),
  sizeCheck("LAY-35", (it, s, report) => {
    const t = tokens(s);
    let signed = false;
    for (let i = 0; i < t.length; i++) {
      if (t[i] === "+" || t[i] === "-") signed = true;
      else if (signed && i > 0 && t[i - 1] !== "+" && t[i - 1] !== "-" && TERM.test(t[i]!)) {
        report("warn", `${where(it)} "${s}": 부호는 다음 부호까지 이어진다. 항마다 부호를 써라.`);
        return;
      }
    }
  }),
  sizeCheck("LAY-36", (it, s, report) => {
    if (tokens(s).some((x) => SWAPPED.test(x))) report("error", `${where(it)} "${s}": %c, %cm, %sm은 % 뒤에 쓴다(100c% 대신 100%c).`);
  }),
  {
    id: "LAY-38",
    stage: "forbid",
    node(ctx, report) {
      const off = ctx.body.offset;
      if (!ctx.parent || off === undefined) return;
      if (Array.isArray(off) && off.every((v) => v === 0 || v === "0px")) return;
      if (resolveType(ctx.parent) === "stack_panel")
        report("warn", "stack_panel 자식의 offset은 무시된다(LAY-38, LAY-56). 간격은 spacer로 줘라.");
    },
  },
  {
    // LAY-38과 같은 경우라 LAY-38에서 한 번만 보고한다.
    id: "LAY-56",
    stage: "forbid",
    node() {},
  },
  {
    id: "LAY-39",
    stage: "forbid",
    node(ctx, report) {
      const { min_size: mn, max_size: mx } = ctx.body;
      if (!Array.isArray(mn) || !Array.isArray(mx)) return;
      for (let i = 0; i < 2; i++) {
        const a = px(mn[i]), b = px(mx[i]);
        if (a !== undefined && b !== undefined && a > b) report("warn", `min_size[${i}]=${a}가 max_size[${i}]=${b}보다 크다. 큰 값은 최대로 잘린다.`);
      }
    },
  },
  {
    id: "LAY-41",
    stage: "forbid",
    node(ctx, report) {
      if (!ctx.parent || resolveType(ctx.parent) !== "grid") return;
      const b = ctx.body;
      if (b.anchor_from !== undefined || b.anchor_to !== undefined || b.offset !== undefined)
        report("warn", "그리드 칸은 자기 anchor, offset을 무시한다. 제거하라.");
    },
  },
  {
    id: "LAY-42",
    stage: "forbid",
    node(ctx, report) {
      if (ctx.type !== "scroll_view" || ctx.ref) return;
      const missing = STACK_ROLES.filter((k) => ctx.body[k] === undefined);
      if (missing.length) report("warn", `scroll_view에 ${missing.join(", ")}가 없으면 스크롤하지 않는다. common.scrolling_panel 템플릿을 써라.`);
    },
  },
  sizeCheck("LAY-44", (it, s, report) => {
    if (/[*/]/.test(s)) report("warn", `${where(it)} "${s}": 크기 식에는 + 와 - 만 쓴다. 계산 결과를 적어라.`);
  }),
  {
    id: "LAY-45",
    stage: "forbid",
    node(ctx, report) {
      if (ctx.ref) return;
      const a = ctx.body.anchor_from !== undefined, b = ctx.body.anchor_to !== undefined;
      if (a !== b) report("warn", "anchor_from과 anchor_to는 함께 적어라.");
    },
  },
  {
    id: "LAY-46",
    stage: "forbid",
    node(ctx, report) {
      const p = ctx.parent?.body.size, c = ctx.body.size;
      if (!Array.isArray(p) || !Array.isArray(c)) return;
      for (let i = 0; i < 2; i++) {
        if (typeof p[i] === "string" && (p[i] as string).trim() === "100%c" && typeof c[i] === "string" && /^\d*\.?\d+%$/.test((c[i] as string).trim()))
          report("warn", `부모 size[${i}]가 100%c인데 자식 size[${i}]가 %다. 자식은 픽셀이나 default로 줘라.`);
      }
    },
  },
  {
    id: "TXT-04",
    stage: "forbid",
    node(ctx, report) {
      const f = ctx.body.font_type;
      if (typeof f === "string" && !dynamic(f) && !(FONT_TYPES as readonly string[]).includes(f))
        report("warn", `font_type "${f}"는 알려진 글꼴 별칭이 아니다(${FONT_TYPES.join(", ")}).`);
    },
  },
  {
    id: "DBG-25",
    stage: "forbid",
    node(ctx, report) {
      for (const key of ["size", "max_size", "min_size"] as const) {
        const v = ctx.body[key];
        if (!Array.isArray(v)) continue;
        if (v.length !== 2) {
          report("error", `${key}는 원소 2개 배열이어야 한다(현재 ${v.length}개).`);
          continue;
        }
        v.forEach((e, i) => {
          if (typeof e !== "string" || dynamic(e)) return;
          const s = e.trim();
          const ok = KEYWORDS.has(s) || KEYWORDS.has(s.toLowerCase()) || tokens(s).every((x) => x === "+" || x === "-" || TERM.test(x) || SWAPPED.test(x) || /^[*/]$/.test(x));
          if (!ok) report("error", `${key}[${i}] "${e}": 해석할 수 없는 크기 값이다.`);
        });
      }
      for (const key of ["ignored", "visible", "enabled"]) {
        const v = ctx.body[key];
        if (typeof v === "string" && unbalanced(v)) report("error", `${key} "${v}": 괄호가 닫히지 않았다.`);
      }
    },
  },
];
