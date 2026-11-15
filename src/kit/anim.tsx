// 애니메이션 키트: 정의 레지스트리(defineAnims/takeAnims)와 Animated/FadeIn/FadeOut/SlideIn/Pulse.
// ANI-38: 이 키트는 layer 를 올리지 않는다(아이템 렌더러가 든 창을 높은 레이어에 두면 아이콘이 사라진다).
import { Panel } from "../controls/index.ts";
import { animation, chain, type AnimDef, type Easing } from "../anim.ts";
import type { JsonObject, JuiElement, JuiNode } from "../types.ts";
import { place } from "./core.tsx";

/** 모듈 레지스트리: "ns.name" -> 정의 본문 */
const registry: Record<string, JsonObject> = {};

/** 레지스트리에 정의를 넣고 "@ns.name" 참조를 돌려준다(같은 키 재등록은 덮어쓴다). */
function put(ns: string, name: string, body: JsonObject): string {
  registry[`${ns}.${name}`] = body;
  return `@${ns}.${name}`;
}

/** 정의 묶음을 등록하고 이름별 "@ns.name" 참조를 돌려준다. 각 정의는 animation() 으로 검증된다. */
export function defineAnims<K extends string>(ns: string, defs: Record<K, AnimDef>): Record<K, string> {
  const refs = {} as Record<K, string>;
  for (const k of Object.keys(defs) as K[]) refs[k] = put(ns, k, animation(defs[k]));
  return refs;
}

/** 지금까지 모인 정의를 "ns.name" 키로 돌려주고 비운다(네임스페이스 파일에 쓰는 용도). */
export function takeAnims(): Record<string, JsonObject> {
  const out: Record<string, JsonObject> = {};
  for (const k of Object.keys(registry)) {
    out[k] = registry[k]!;
    delete registry[k];
  }
  return out;
}

/** 애니메이션 공통 속성 */
interface AnimBase {
  /** 이름: 감싸는 패널 이름이자 정의 이름의 접두 */
  name: string;
  /** 정의를 넣을 네임스페이스 */
  ns: string;
  /** 지속 시간(초, 0보다 커야 한다: ANI-09) */
  duration?: number;
  /** 보간 함수(ANI-10) */
  easing?: Easing;
  /** 애니메이션을 걸 자식 */
  children?: JuiNode;
}

/** Animated 속성 */
export interface AnimatedProps {
  /** 감싸는 패널 이름 */
  name: string;
  /** 붙일 애니메이션 참조("@ns.name") 목록 */
  anims: string[];
  /** 애니메이션을 걸 자식(배치 규칙은 place 가 처리) */
  children?: JuiNode;
}

/** 자식을 패널로 감싸 `anims` 참조를 붙인다. layer 는 건드리지 않는다(ANI-38). */
export function Animated({ name, anims, children }: AnimatedProps): JuiElement {
  const kids = place({ type: "panel", name }, children);
  return <Panel name={name} anims={anims}>{kids}</Panel>;
}

/** 단일 트윈을 정의해 감싼다 */
function tween(p: AnimBase, suffix: string, def: AnimDef): JuiElement {
  const ref = put(p.ns, `${p.name}_${suffix}`, animation(def));
  return <Animated name={p.name} anims={[ref]}>{p.children}</Animated>;
}

/** FadeIn 속성 */
export type FadeInProps = AnimBase;
/** 투명도 0 -> 1 */
export function FadeIn(p: FadeInProps): JuiElement {
  return tween(p, "fade", { anim_type: "alpha", from: 0, to: 1, duration: p.duration ?? 0.3, easing: p.easing });
}

/** FadeOut 속성 */
export type FadeOutProps = AnimBase;
/** 투명도 1 -> 0 */
export function FadeOut(p: FadeOutProps): JuiElement {
  return tween(p, "fade_out", { anim_type: "alpha", from: 1, to: 0, duration: p.duration ?? 0.3, easing: p.easing });
}

/** SlideIn 속성 */
export interface SlideInProps extends AnimBase {
  /** 시작 오프셋 [x, y] */
  from: [number, number];
  /** 끝 오프셋 [x, y] (기본 [0, 0]) */
  to?: [number, number];
}
/** 오프셋 from -> to 로 미끄러져 들어온다 */
export function SlideIn(p: SlideInProps): JuiElement {
  return tween(p, "slide", { anim_type: "offset", from: p.from, to: p.to ?? [0, 0], duration: p.duration ?? 0.3, easing: p.easing });
}

/** Pulse 속성 */
export interface PulseProps extends AnimBase {
  /** 가장 흐린 투명도 (기본 0.4) */
  min?: number;
}
/** 알파 1 <-> min 을 chain 루프로 반복한다(마지막 next 가 첫 정의로 돌아온다) */
export function Pulse(p: PulseProps): JuiElement {
  const d = p.duration ?? 0.8;
  const defs: Record<string, AnimDef> = {
    [`${p.name}_pulse_down`]: { anim_type: "alpha", from: 1, to: p.min ?? 0.4, duration: d, easing: p.easing ?? "in_out_sine" },
    [`${p.name}_pulse_up`]: { anim_type: "alpha", from: p.min ?? 0.4, to: 1, duration: d, easing: p.easing ?? "in_out_sine" },
  };
  const chained = chain(p.ns, defs, Object.keys(defs), { loop: true });
  const refs = Object.keys(chained).map((k) => put(p.ns, k, chained[k]!));
  // 첫 정의만 붙이면 chain 의 next 로 계속 이어진다
  return <Animated name={p.name} anims={[refs[0]!]}>{p.children}</Animated>;
}
