// 애니메이션 정의 빌더. anim_type 별 from/to 모양을 타입으로 고정하고 단일 정의에서 검사 가능한 ANI 규칙을 던진다.
//  - ANI-08/ANI-20: anim_type 은 9종
//  - ANI-10: easing 은 value-dictionary 의 바닐라 14종
//  - ANI-09: duration > 0 (wait 포함), flip_book 은 frame_count 필요
//  - ANI-15: aseprite_flip_book 은 from/to 를 쓰지 않는다
import type { JsonObject } from "./types";

export type AnimType =
  | "offset" | "size" | "alpha" | "color" | "uv" | "flip_book" | "clip" | "wait" | "aseprite_flip_book";

export type Easing =
  | "linear" | "out_cubic" | "in_expo" | "in_quart" | "in_quint" | "in_sine" | "in_out_back"
  | "out_expo" | "out_back" | "in_out_expo" | "out_bounce" | "in_bounce" | "in_out_circ" | "out_sine";

export const EASINGS: readonly Easing[] = [
  "linear", "out_cubic", "in_expo", "in_quart", "in_quint", "in_sine", "in_out_back",
  "out_expo", "out_back", "in_out_expo", "out_bounce", "in_bounce", "in_out_circ", "out_sine",
];

/** 변수(`$x`)도 허용하는 값 */
type V<T> = T | `$${string}`;
type Vec2 = [V<number>, V<number>];
type Rgb = [number, number, number] | [number, number, number, number];

/** 모든 타입 공통 필드 */
export interface AnimCommon {
  next?: string;
  destroy_at_end?: string;
  play_event?: string;
  start_event?: string;
  end_event?: string;
  reset_event?: string;
  resettable?: boolean;
  activated?: boolean;
  easing?: Easing | `$${string}`;
}

interface Tween<T extends AnimType, F> extends AnimCommon {
  anim_type: T;
  from: F;
  to: F;
  duration: V<number>;
}

export interface OffsetAnim extends Tween<"offset", Vec2> {}
export interface SizeAnim extends Tween<"size", Vec2> {}
export interface AlphaAnim extends Tween<"alpha", V<number>> {
  scale_from_starting_alpha?: boolean;
}
export interface ColorAnim extends Tween<"color", Rgb | string> {}
export interface UvAnim extends Tween<"uv", Vec2> {}
export interface ClipAnim extends Tween<"clip", V<number>> {}

export interface FlipBookAnim extends AnimCommon {
  anim_type: "flip_book";
  fps?: V<number>;
  frame_count: V<number>;
  frame_step?: V<number>;
  initial_uv?: Vec2;
  reversible?: boolean;
  looping?: boolean;
  duration?: V<number>;
}

export interface AsepriteFlipBookAnim extends AnimCommon {
  anim_type: "aseprite_flip_book";
  initial_uv?: Vec2;
  looping?: boolean;
  reversible?: boolean;
}

/** 대기: from/to 없음 (wait_no_from) */
export interface WaitAnim extends AnimCommon {
  anim_type: "wait";
  duration: V<number>;
  from?: never;
  to?: never;
}

export type AnimDef =
  | OffsetAnim | SizeAnim | AlphaAnim | ColorAnim | UvAnim | ClipAnim
  | FlipBookAnim | AsepriteFlipBookAnim | WaitAnim;

const TYPES: readonly string[] = [
  "offset", "size", "alpha", "color", "uv", "flip_book", "clip", "wait", "aseprite_flip_book",
];

const isVar = (v: unknown) => typeof v === "string" && v.startsWith("$");

/** 단일 정의 검증 후 JSON 객체로(undefined 키 제거, anim_type 이 맨 앞) */
export function animation(def: AnimDef): JsonObject {
  const d = def as unknown as Record<string, unknown>;
  const t = d.anim_type;
  if (typeof t !== "string" || !TYPES.includes(t)) throw new Error(`ANI-20: 알 수 없는 anim_type '${String(t)}'`);
  if (d.easing !== undefined && !isVar(d.easing) && !EASINGS.includes(d.easing as Easing)) {
    throw new Error(`ANI-10: 알 수 없는 easing '${String(d.easing)}'`);
  }
  const dur = d.duration;
  if (dur !== undefined && !isVar(dur) && !(typeof dur === "number" && Number.isFinite(dur) && dur > 0)) {
    throw new Error(`ANI-09: duration 은 0보다 커야 한다 (${String(dur)})`);
  }
  if (dur === undefined && t !== "flip_book" && t !== "aseprite_flip_book") {
    throw new Error(`ANI-09: ${t} 는 duration 이 필요하다`);
  }
  if (t === "wait" && (d.from !== undefined || d.to !== undefined)) {
    throw new Error("ANI-09: wait 는 from/to 를 쓰지 않는다");
  }
  if (t === "flip_book" && d.frame_count === undefined) throw new Error("ANI-09: flip_book 은 frame_count 가 필요하다");
  if (t === "aseprite_flip_book" && (d.from !== undefined || d.to !== undefined)) {
    throw new Error("ANI-15: aseprite_flip_book 은 from/to 를 쓰지 않는다");
  }
  if (t === "alpha" || t === "clip") {
    for (const k of ["from", "to"]) {
      if (!isVar(d[k]) && typeof d[k] !== "number") throw new Error(`ANI-09: ${t} 의 ${k} 는 숫자여야 한다`);
    }
  }
  if (t === "offset" || t === "size" || t === "uv") {
    for (const k of ["from", "to"]) {
      if (!isVar(d[k]) && !(Array.isArray(d[k]) && (d[k] as unknown[]).length === 2)) {
        throw new Error(`ANI-09: ${t} 의 ${k} 는 [x, y] 여야 한다`);
      }
    }
  }
  const r: JsonObject = { anim_type: t };
  for (const [k, v] of Object.entries(d)) if (k !== "anim_type" && v !== undefined) r[k] = v as JsonObject[string];
  return r;
}

/**
 * 정의들을 order 순서로 `next: "@ns.<다음>"` 로 잇는다. loop 이면 마지막이 첫 번째로 돌아온다.
 * 비루프의 마지막은 기존 next 를 유지한다. order 의 키가 defs 에 없으면 던진다.
 */
export function chain(
  ns: string,
  defs: Record<string, AnimDef>,
  order: string[],
  opts: { loop?: boolean } = {},
): Record<string, JsonObject> {
  for (const k of order) if (!(k in defs)) throw new Error(`chain: '${k}' 정의가 없다`);
  const out: Record<string, JsonObject> = {};
  order.forEach((k, i) => {
    const following = i + 1 < order.length ? order[i + 1] : opts.loop ? order[0] : undefined;
    out[k] = animation(following === undefined ? defs[k] : ({ ...defs[k], next: `@${ns}.${following}` } as AnimDef));
  });
  return out;
}
