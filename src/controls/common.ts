// 컨트롤 공통 속성 타입: 크기/색/앵커/변수/바인딩 등 모든 컨트롤이 공유하는 정의.
// 값 목록은 docs/json-ui/value-dictionary.mdx B.3, 제외 이름은 B.1 기준.

import type { JsonValue } from "../types.ts";

export type { JsonValue };

/** `$이름` 형태의 변수 참조 */
export type Var = `$${string}`;

/** 값 또는 변수 참조 (열거형 속성은 `$변수`로 지정할 수 있다) */
export type OrVar<T> = T | Var;

/** 바닐라 anchor_from/anchor_to 값 9종 (value-dictionary `anchor_from`) */
export const ANCHORS = [
  "top_left",
  "top_middle",
  "top_right",
  "left_middle",
  "center",
  "right_middle",
  "bottom_left",
  "bottom_middle",
  "bottom_right",
] as const;
export type Anchor = (typeof ANCHORS)[number];

/** 크기 단위: 퍼센트(부모), %c(자식 합), %sm/%cm, %x/%y(축 기준), px */
type SizeUnit = "%" | "px" | "%c" | "%sm" | "%cm" | "%x" | "%y";

/** 단위 붙은 단일 크기 리터럴: "100%", "50%c", "8px" */
type SizeLit = `${number}${SizeUnit}`;

/** 합성 크기 식: "100% - 8px", "100%c + 4px" */
export type SizeExpr = `${SizeLit} ${"+" | "-"} ${SizeLit}`;

/** 한 축의 크기 값 */
export type Size1 = number | SizeLit | "default" | "fill" | SizeExpr | Var;

/** [너비, 높이] 또는 `$변수` */
export type Size = [Size1, Size1] | Var;

/** [r, g, b] 또는 [r, g, b, a] (0..1) 또는 `$변수` */
export type Color = [number, number, number] | [number, number, number, number] | Var;

/** 구조적 바인딩 객체 (정확한 판별 유니온은 src/bind.ts 의 BindingObj) */
export interface BindingObj {
  binding_type?: "global" | "view" | "collection" | "collection_details" | "none" | Var;
  binding_name?: string;
  binding_name_override?: string;
  binding_condition?: string;
  binding_collection_name?: string;
  binding_collection_prefix?: string;
  source_property_name?: string;
  target_property_name?: string;
  source_control_name?: string;
  resolve_sibling_scope?: boolean;
}
export type Bindings = BindingObj[];

/** 구조적 버튼 매핑 (정확한 형태는 input.ts 의 ButtonMapping) */
export interface ButtonMappingObj {
  from_button_id?: string;
  to_button_id?: string;
  mapping_type?: "pressed" | "global" | "focused" | "double_pressed";
}

/** `variables` 블록 하나: requires 조건(식)과 `$변수` 값들 */
export interface VarBlock {
  requires?: string;
  [k: Var]: JsonValue;
}
export type Variables = VarBlock | VarBlock[];

/** property_bag: 키는 `#` 로 시작한다 */
export type PropertyBag = { [k: `#${string}`]: unknown };

/** 식 문자열 또는 불리언 (visible/ignored/enabled 등) */
export type BoolOrExpr = boolean | string;

/** 모든 컨트롤이 공유하는 속성 */
export interface CommonProps {
  /** 표시 여부 (불리언, `$변수`, 바인딩 `#이름` 또는 식) */
  visible?: BoolOrExpr;
  /** true 이면 정의를 무시한다 (식 문자열 가능) */
  ignored?: BoolOrExpr;
  /** 입력 상호작용 허용 여부 */
  enabled?: BoolOrExpr;
  /** 그리기 순서 (클수록 위) */
  layer?: number | string;
  /** 투명도 0..1 */
  alpha?: number | string;
  /** 자식에게 알파를 전달한다 */
  propagate_alpha?: BoolOrExpr;
  /** 크기 [w, h] */
  size?: Size;
  /** 최대 크기 */
  max_size?: Size;
  /** 최소 크기 */
  min_size?: Size;
  /** 부모 앵커 기준 오프셋 [x, y] */
  offset?: Size;
  /** 부모 쪽 앵커 */
  anchor_from?: OrVar<Anchor>;
  /** 자신 쪽 앵커 */
  anchor_to?: OrVar<Anchor>;
  /** 자식을 자신의 영역으로 자른다 */
  clips_children?: BoolOrExpr;
  /** 부모의 자르기 영역을 따른다 */
  allow_clipping?: BoolOrExpr;
  /** 앵커 오프셋 사용 여부 */
  use_anchored_offset?: BoolOrExpr;
  /** 조건부 `$변수` 블록 */
  variables?: Variables;
  /** `#` 키 속성 가방 */
  property_bag?: PropertyBag;
  /** 바인딩 목록 */
  bindings?: Bindings;
  /** 버튼 매핑 목록 */
  button_mappings?: ButtonMappingObj[];
  /** 애니메이션 참조 (`@네임스페이스.이름`) */
  anims?: string[] | Var;
  /** 팩토리가 만드는 컨트롤에 넘기는 변수 (바닐라 사용, 공식 자료에는 없음) */
  factory_variables?: JsonValue;
  /** 자식 컨트롤 정의 */
  controls?: JsonValue[];
  /** 포커스 가능 여부 */
  focus_enabled?: BoolOrExpr;
  /** 포커스 식별자 */
  focus_identifier?: string;
  /** 포커스 순환 */
  focus_wrap_enabled?: BoolOrExpr;
  /** 포커스 자석 */
  focus_magnet_enabled?: BoolOrExpr;
  /** 기본 포커스 우선순위 */
  default_focus_precedence?: number | Var;
  /** 포커스 이동 대상 (방향별) */
  focus_change_up?: string;
  focus_change_down?: string;
  focus_change_left?: string;
  focus_change_right?: string;
  /** 포커스 내비게이션 모드 (방향별) */
  focus_navigation_mode_up?: string;
  focus_navigation_mode_down?: string;
  focus_navigation_mode_left?: string;
  focus_navigation_mode_right?: string;
  /** 애니메이션 빨리감기 비활성 */
  disable_anim_fast_forward?: BoolOrExpr;
  /** 터치 입력 차단 */
  prevent_touch_input?: BoolOrExpr;
  /** TTS 읽기 순서 우선순위 */
  tts_control_type_order_priority?: number | string;
  /** 사용자 `$변수` 값 */
  [k: Var]: JsonValue;
}

/** 자식 위치 속성: image/label 을 제외한 모든 타입에 허용 (COL-02) */
export interface ChildPosProps {
  /** 컬렉션 안의 자식 위치 (COL-02: image, label 에는 쓸 수 없다) */
  collection_index?: number | Var;
}

/** 컬렉션 이름 속성: stack_panel, grid, collection_panel 에만 허용 (COL-01) */
export interface CollectionNameProps {
  /** 바인딩할 컬렉션 이름 (COL-01: stack_panel/grid/collection_panel 전용) */
  collection_name?: string | Var;
}
