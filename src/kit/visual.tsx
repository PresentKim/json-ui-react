// 시각 부품 키트: Text, Icon, Frame, ProgressBar, ItemIcon, Divider.
// PascalCase 컨트롤과 bind/E 빌더만 쓰고, 자식은 place()로 배치 규칙을 거친다.
// 글자 주의(EXP-30): 바인딩 글자가 숫자로 시작하면 식이 숫자로 읽히므로 서버가 색 접두사(`§r`)를 붙여야 한다.
import type { ElementProps } from "../controls/elements.ts";
import type { Anchor, Color, Size } from "../controls/common.ts";
import type { JuiElement, JuiNode } from "../types.ts";
import { Panel, Label, Image, Custom } from "../controls/components.tsx";
import { Expr } from "../expr.ts";
import { bind, type BindingObj } from "../bind.ts";
import { diag } from "../rules/registry.ts";
import { place, useKit, currentCollection } from "./core.tsx";

function defined<T extends object>(o: T): T {
  return Object.fromEntries(Object.entries(o).filter(([, v]) => v !== undefined)) as T;
}

/** 글자 내용: 리터럴, 속성 바인딩, 식 중 하나. */
export type TextSource = string | { bind: `#${string}` } | { expr: Expr };

export interface TextProps {
  /** 컨트롤 이름 */
  name: string;
  /** 글자 내용: 리터럴 | {bind: "#속성"} | {expr: Expr} (TXT-01, EXP-30) */
  text: TextSource;
  /** 글꼴 */
  font?: ElementProps<"label">["font_type"];
  /** 글자 크기 단계 */
  fontSize?: ElementProps<"label">["font_size"];
  /** 글자 배율 */
  scale?: number;
  /** 글자 색 */
  color?: Color;
  /** 그림자 사용 여부 */
  shadow?: boolean;
  /** 정렬 */
  align?: ElementProps<"label">["text_alignment"];
  /** 크기 */
  size?: Size;
  /** 부모 앵커(from/to 같이) */
  anchor?: Anchor;
  /** 오프셋 */
  offset?: Size;
  /** 그리기 순서 */
  layer?: number;
  /** 번역 키로 찾을지 여부(TXT-01). 기본 false: §코드 리터럴을 그대로 찍는다 */
  localize?: boolean;
}

/** 글자. 리터럴은 localize false가 기본, 바인딩/식은 view로 #text에 싣는다(컬렉션 안이면 컬렉션 바인딩). */
export function Text(p: TextProps): JuiElement {
  const t = p.text;
  const base = defined({
    name: p.name,
    font_type: p.font,
    font_size: p.fontSize,
    font_scale_factor: p.scale,
    color: p.color,
    shadow: p.shadow,
    text_alignment: p.align,
    size: p.size,
    anchor_from: p.anchor,
    anchor_to: p.anchor,
    offset: p.offset,
    layer: p.layer,
    localize: p.localize ?? false,
  });
  if (typeof t === "string") return <Label {...({ ...base, text: t } as ElementProps<"label">)} />;
  let bindings: BindingObj[];
  if ("bind" in t) {
    const coll = currentCollection();
    bindings = [coll !== undefined ? (bind.collection(t.bind, coll, { condition: "always", override: "#text" })) : (bind.view(t.bind, "#text"))];
  } else {
    bindings = [bind.view(t.expr.src, "#text")];
  }
  return <Label {...({ ...base, text: "#text", bindings } as ElementProps<"label">)} />;
}

export interface IconProps {
  /** 컨트롤 이름 */
  name: string;
  /** 질감 경로(확장자 없이) */
  texture: string;
  /** 크기 */
  size?: Size;
  /** 질감 시작 좌표 [u, v] */
  uv?: [number, number];
  /** 질감 읽기 크기 [w, h] */
  uvSize?: [number, number];
  /** 타일 반복 */
  tiled?: boolean | "x" | "y";
  /** 9분할 경계(숫자 하나 또는 [좌, 상, 우, 하]) */
  nineSlice?: number | [number, number, number, number];
  /** 색 곱 */
  color?: Color;
  /** 그리기 순서 */
  layer?: number;
  /** 부모 앵커(from/to 같이) */
  anchor?: Anchor;
  /** 오프셋 */
  offset?: Size;
}

/** 그림 하나(image). collection_index/collection_name은 받지 않는다(COL-01/02). */
export function Icon(p: IconProps): JuiElement {
  const props = defined({
    name: p.name,
    texture: p.texture,
    size: p.size,
    uv: p.uv,
    uv_size: p.uvSize,
    tiled: p.tiled,
    nineslice_size: p.nineSlice,
    color: p.color,
    layer: p.layer,
    anchor_from: p.anchor,
    anchor_to: p.anchor,
    offset: p.offset,
  });
  return <Image {...(props as ElementProps<"image">)} />;
}

export interface FrameProps {
  /** 컨트롤 이름 */
  name: string;
  /** 배경 질감 경로 */
  texture: string;
  /** 크기 */
  size?: Size;
  /** 9분할 경계 */
  nineSlice?: number | [number, number, number, number];
  /** 배경 색 곱 */
  color?: Color;
  /** 안쪽 여백(px). 내용 영역을 사방에서 줄인다 */
  inset?: number;
  /** 내용 자식(place로 배치 규칙 적용) */
  children?: JuiNode;
}

/** 9분할 배경 패널과 그 위의 내용 영역. */
export function Frame(p: FrameProps): JuiElement {
  const inset = p.inset ?? 0;
  const content = place({ type: "panel", name: `${p.name}_content` }, p.children);
  const contentSize: Size = inset > 0 ? [`100% - ${inset * 2}px`, `100% - ${inset * 2}px`] : ["100%", "100%"];
  return (
    <Panel {...(defined({ name: p.name, size: p.size }) as ElementProps<"panel">)}>
      <Image {...(defined({ name: `${p.name}_bg`, texture: p.texture, nineslice_size: p.nineSlice ?? 4, color: p.color, layer: 0 }) as ElementProps<"image">)} />
      <Panel {...({ name: `${p.name}_content`, size: contentSize, layer: 1 } as ElementProps<"panel">)}>{content}</Panel>
    </Panel>
  );
}

export interface ProgressBarProps {
  /** 컨트롤 이름 */
  name: string;
  /** 0..1 비율을 내는 식. 속성을 읽어야 한다(상수는 거부, EXP-27) */
  ratio: Expr | string;
  /** 식이 읽는 원본 속성(`#이름`). 컬렉션 안이면 컬렉션 바인딩으로 읽는다 */
  source?: `#${string}`;
  /** 크기 */
  size?: Size;
  /** 채움 질감 */
  texture?: string;
  /** 채움 색 */
  color?: Color;
  /** 줄어드는 방향(clip_direction) */
  direction?: "left" | "right" | "up" | "down";
  /** 그리기 순서 */
  layer?: number;
}

/** 실수 리터럴 앞자리 0(`0.1`)은 정수로 읽힌다(EXP-27). `.1`로 써야 한다. */
const BAD_LITERAL = /(^|[^\w.#$])\d+\.\d/;

/** 비율로 줄어드는 막대: image + view(식 -> #clip_ratio). 상수나 앞자리 0 소수는 진단으로 거부한다. */
export function ProgressBar(p: ProgressBarProps): JuiElement {
  const src = typeof p.ratio === "string" ? p.ratio : p.ratio.src;
  const reject = (msg: string): JuiElement => {
    const ctx = useKit();
    const d = diag("EXP-27", "error", p.name, msg);
    ctx.diagnostics.push(d);
    if (ctx.strict) throw new Error(`[${d.rule}] ${d.message}`);
    return <Panel {...(defined({ name: p.name, size: p.size }) as ElementProps<"panel">)} />;
  };
  if (!/[#$]/.test(src)) return reject(`ProgressBar ${p.name}: 비율이 상수입니다(${src}). 속성을 읽는 식이어야 합니다`);
  if (BAD_LITERAL.test(src)) return reject(`ProgressBar ${p.name}: 실수 리터럴은 .으로 시작해야 합니다(${src})`);
  const coll = currentCollection();
  const bindings: BindingObj[] = [];
  if (p.source !== undefined) {
    bindings.push((coll !== undefined ? bind.collection(p.source, coll, { condition: "always" }) : bind.global(p.source)));
  }
  bindings.push(bind.view(src, "#clip_ratio"));
  const props = defined({
    name: p.name,
    size: p.size,
    texture: p.texture,
    color: p.color,
    layer: p.layer,
    clip_direction: p.direction ?? "left",
    clip_pixelperfect: false,
    bindings,
  });
  return <Image {...(props as ElementProps<"image">)} />;
}

export interface ItemIconProps {
  /** 컨트롤 이름 */
  name: string;
  /** 크기. 기본 [16, 16] */
  size?: Size;
  /** 그리기 순서. 기본 2 */
  layer?: number;
}

/** 컬렉션 항목의 아이템 아이콘. 컬렉션 밖이면 COL-05 오류(0번 항목을 읽게 된다). */
export function ItemIcon(p: ItemIconProps): JuiElement {
  const coll = currentCollection();
  if (coll === undefined) {
    const ctx = useKit();
    const d = diag("COL-05", "error", p.name, `ItemIcon ${p.name}: 컬렉션 안에서만 쓸 수 있습니다(인덱스 호스트가 없으면 0번 항목을 읽음)`);
    ctx.diagnostics.push(d);
    if (ctx.strict) throw new Error(`[${d.rule}] ${d.message}`);
    return <Panel {...(defined({ name: p.name, size: p.size }) as ElementProps<"panel">)} />;
  }
  return (
    <Custom
      {...({
        name: p.name,
        renderer: "inventory_item_renderer",
        size: p.size ?? [16, 16],
        layer: p.layer ?? 2,
        property_bag: { "#item_id_aux": 0 },
        bindings: [bind.collection("#item_id_aux", coll, { condition: "always" })],
      } as ElementProps<"custom">)}
    />
  );
}

export interface DividerProps {
  /** 컨트롤 이름 */
  name: string;
  /** 방향. 기본 horizontal */
  orientation?: "horizontal" | "vertical";
  /** 길이. 기본 "100%" */
  length?: number | `${number}%`;
  /** 두께(px). 기본 1 */
  thickness?: number;
  /** 선 색. 기본 회색 */
  color?: Color;
}

/** 가는 구분선(색 곱을 입힌 image). */
export function Divider(p: DividerProps): JuiElement {
  const len = p.length ?? "100%";
  const t = p.thickness ?? 1;
  const size: Size = p.orientation === "vertical" ? [t, len] : [len, t];
  return <Image {...({ name: p.name, texture: "textures/ui/white_color", size, color: p.color ?? [0.5, 0.5, 0.5] } as ElementProps<"image">)} />;
}
