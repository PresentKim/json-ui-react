// 레이아웃 키트: 타입이 붙은 PascalCase 컨트롤만으로 만든 배치 컴포넌트.
// 자식은 항상 place()를 거쳐 부모 종류에 맞는 배치 규칙(explain/solve)이 적용된다.
import { Panel, StackPanel, Grid, Image, ScrollView, ScrollTrack } from "../controls/components.tsx";
import { bind } from "../bind.ts";
import type { Anchor, CommonProps, Size1 } from "../controls/common.ts";
import { ANCHORS } from "../controls/common.ts";
import type { JuiElement, JuiNode } from "../types.ts";
import { place } from "./core.tsx";

/** 앵커 프리셋 이름 9종 */
export type AnchorPreset = Anchor;
export { ANCHORS as ANCHOR_PRESETS };

/** 배치 컴포넌트가 공유하는 속성 */
interface LayoutBase {
  /** 컨트롤 이름(필수, 자식 이름의 접두어로도 쓰인다) */
  name: string;
  /** 자식 컨트롤 */
  children?: JuiNode;
  /** 크기 [너비, 높이] (생략하면 기본값) */
  size?: [Size1, Size1];
  /** 그리기 순서 */
  layer?: number;
  /** 표시 여부 */
  visible?: CommonProps["visible"];
  /** 부모 앵커 기준 위치 */
  offset?: [Size1, Size1];
}

const isEl = (n: JuiNode): n is JuiElement => typeof n === "object" && n !== null && !Array.isArray(n);

/** 요소 속성 몇 개를 덮어쓴 복사본(원본은 건드리지 않는다) */
const withProps = (el: JuiElement, extra: Record<string, unknown>): JuiElement => ({ ...el, props: { ...el.props, ...extra } });

/** 공통으로 넘길 선택 속성만 모은다(undefined 제외) */
function common(p: LayoutBase): Record<string, unknown> {
  const o: Record<string, unknown> = {};
  if (p.size !== undefined) o.size = p.size;
  if (p.layer !== undefined) o.layer = p.layer;
  if (p.visible !== undefined) o.visible = p.visible;
  if (p.offset !== undefined) o.offset = p.offset;
  return o;
}

/** 교차축 정렬 값 */
export type CrossAlign = "start" | "center" | "end";

interface StackProps extends LayoutBase {
  /** 자식 사이에 넣는 빈 패널 간격(px). 스택 자식의 offset은 무시되므로(LAY-38) 간격은 spacer로 만든다 */
  gap?: number;
  /** 교차축 정렬: use_child_anchors를 켜고 자식에 앵커를 준다(LAY-38) */
  align?: CrossAlign;
}

const ROW_ANCHOR: Record<CrossAlign, Anchor> = { start: "top_left", center: "left_middle", end: "bottom_left" };
const COL_ANCHOR: Record<CrossAlign, Anchor> = { start: "top_left", center: "top_middle", end: "top_right" };

function stack(p: StackProps, orientation: "horizontal" | "vertical"): JuiElement {
  const row = orientation === "horizontal";
  const kids = place({ type: "stack_panel", name: p.name }, p.children);
  const anchor = p.align !== undefined ? (row ? ROW_ANCHOR : COL_ANCHOR)[p.align] : undefined;
  const items: JuiElement[] = [];
  kids.forEach((k, i) => {
    if (i > 0 && p.gap) {
      items.push(<Panel name={`${p.name}_gap${i - 1}`} size={row ? [p.gap, "100%"] : ["100%", p.gap]} />);
    }
    // LAY-45: anchor_from/anchor_to는 함께 준다. 이미 있으면 그대로 둔다
    const aligned =
      anchor !== undefined && k.props.anchor_from === undefined && k.props.anchor_to === undefined
        ? withProps(k, { anchor_from: anchor, anchor_to: anchor })
        : k;
    items.push(aligned);
  });
  return (
    <StackPanel name={p.name} orientation={orientation} {...(anchor !== undefined ? { use_child_anchors: true } : {})} {...common(p)}>
      {items}
    </StackPanel>
  );
}

/** 가로 스택: gap은 빈 패널로 끼운다 */
export function Row(p: StackProps): JuiElement {
  return stack(p, "horizontal");
}

/** 세로 스택: gap은 빈 패널로 끼운다 */
export function Column(p: StackProps): JuiElement {
  return stack(p, "vertical");
}

interface SpacerProps {
  /** 컨트롤 이름 */
  name: string;
  /** 고정 너비(px) */
  w?: number;
  /** 고정 높이(px) */
  h?: number;
  /** true면 남은 공간을 채운다(축은 axis) */
  fill?: boolean;
  /** fill일 때 채우는 축(기본 horizontal) */
  axis?: "horizontal" | "vertical";
}

/** 빈 간격 패널: 고정 크기 또는 fill */
export function Spacer(p: SpacerProps): JuiElement {
  if (p.fill) {
    const size: [Size1, Size1] = p.axis === "vertical" ? ["100%", "fill"] : ["fill", "100%"];
    return <Panel name={p.name} size={size} />;
  }
  return <Panel name={p.name} size={[p.w ?? 0, p.h ?? 0]} />;
}

interface OverlayProps extends LayoutBase {
  /** 첫 자식의 layer(기본 1). 이후 자식은 1씩 커진다 */
  baseLayer?: number;
}

/** 자식을 겹쳐 놓는 패널: layer가 없는 자식에 순서대로 layer를 준다 */
export function Overlay(p: OverlayProps): JuiElement {
  const base = p.baseLayer ?? 1;
  const kids = place({ type: "panel", name: p.name }, p.children).map((k, i) =>
    k.props.layer === undefined ? withProps(k, { layer: base + i }) : k,
  );
  return (
    <Panel name={p.name} {...common(p)}>
      {kids}
    </Panel>
  );
}

interface AlignProps extends LayoutBase {
  /** 앵커 프리셋 9종: anchor_from/anchor_to에 같은 값을 넣는다(LAY-16) */
  to: AnchorPreset;
}

/** 앵커 프리셋 패널: 부모의 같은 위치에 붙는다 */
export function Align(p: AlignProps): JuiElement {
  if (!ANCHORS.includes(p.to)) throw new Error(`Align "${p.name}": 알 수 없는 앵커 "${String(p.to)}"`);
  const kids = place({ type: "panel", name: p.name }, p.children);
  return (
    <Panel name={p.name} anchor_from={p.to} anchor_to={p.to} {...common(p)}>
      {kids}
    </Panel>
  );
}

/** 가운데 정렬 패널 */
export function Center(p: LayoutBase): JuiElement {
  return <Align {...p} to="center" />;
}

interface PaddingProps extends LayoutBase {
  /** 안쪽 여백 [왼, 위, 오른, 아래](px) 또는 한 값 */
  inset: [number, number, number, number] | number;
}

/** 부모 크기에서 여백을 뺀 안쪽 패널: "100% - Npx" 한 부호 식과 offset을 쓴다(LAY-35) */
export function Padding(p: PaddingProps): JuiElement {
  const [l, t, r, b] = typeof p.inset === "number" ? [p.inset, p.inset, p.inset, p.inset] : p.inset;
  const axis = (n: number): Size1 => (n === 0 ? "100%" : (`100% - ${n}px` as Size1));
  const kids = place({ type: "panel", name: `${p.name}_inner` }, p.children);
  return (
    <Panel name={p.name} {...common(p)}>
      <Panel name={`${p.name}_inner`} anchor_from="top_left" anchor_to="top_left" offset={[l, t]} size={[axis(l + r), axis(t + b)]}>
        {kids}
      </Panel>
    </Panel>
  );
}

interface BoxProps extends LayoutBase {
  /** 너비 */
  w?: Size1;
  /** 높이 */
  h?: Size1;
}

/** 크기가 정해진 패널 */
export function Box(p: BoxProps): JuiElement {
  const { w, h, ...rest } = p;
  const kids = place({ type: "panel", name: p.name }, p.children);
  const size = w !== undefined || h !== undefined ? { size: [w ?? "default", h ?? "default"] as [Size1, Size1] } : {};
  return (
    <Panel name={p.name} {...common(rest)} {...size}>
      {kids}
    </Panel>
  );
}

interface ScrollAreaProps extends LayoutBase {
  /** 스크롤 속도 */
  speed?: number;
  /** 스크롤바 너비(px, 기본 6) */
  barWidth?: number;
}

/** 스크롤 영역: LAY-42 역할 컨트롤 4개(viewport, content, track, box)를 만들어 이름으로 연결한다 */
export function ScrollArea(p: ScrollAreaProps): JuiElement {
  const content = `${p.name}_content`;
  const kids = place({ type: "stack_panel", name: content }, p.children);
  const bw = p.barWidth ?? 6;
  return (
    <ScrollView
      name={p.name}
      scrolling_view_port={`${p.name}_viewport`}
      scrolling_content={content}
      scrollbar_track={`${p.name}_track`}
      scrollbar_box={`${p.name}_box`}
      {...(p.speed !== undefined ? { scroll_speed: p.speed } : {})}
      {...common(p)}
    >
      <Panel name={`${p.name}_viewport`} size={["100% - " + bw + "px", "100%"] as [Size1, Size1]} anchor_from="top_left" anchor_to="top_left">
        <StackPanel name={content} orientation="vertical" size={["100%", "100%c"]}>
          {kids}
        </StackPanel>
      </Panel>
      <ScrollTrack name={`${p.name}_track`} size={[bw, "100%"]} anchor_from="top_right" anchor_to="top_right">
        <Image name={`${p.name}_box`} texture="textures/ui/White" size={[bw, "100%"]} />
      </ScrollTrack>
    </ScrollView>
  );
}

interface GridLayoutProps extends LayoutBase {
  /** 열 수 */
  cols: number;
  /** 행 수(생략하면 자식 수에서 계산) */
  rows?: number;
  /** 칸 크기 [너비, 높이](px) */
  cell: [number, number];
  /** 항목 템플릿 정의 이름(예: "ns.cell"): 있으면 grid_item_template로 쓴다 */
  template?: string;
  /** 항목 수를 받는 전역 속성 이름(예: "#count"): 있으면 #maximum_grid_items에 묶고 horizontal로 맞춘다(LAY-30) */
  countFrom?: `#${string}`;
}

/** 격자: 정적 자식에는 grid_position을 주고, 개수 바인딩이면 horizontal + 고정 너비로 만든다(LAY-29/30/32) */
export function GridLayout(p: GridLayoutProps): JuiElement {
  const kids = place({ type: "grid", name: p.name }, p.children);
  const rows = p.rows ?? Math.max(1, Math.ceil(kids.length / p.cols));
  const placed = kids.map((k, i) =>
    k.props.grid_position === undefined ? withProps(k, { grid_position: [Math.floor(i / p.cols), i % p.cols] }) : k,
  );
  const bound = p.countFrom !== undefined;
  return (
    <Grid
      name={p.name}
      grid_dimensions={[p.cols, rows]}
      {...(p.template !== undefined ? { grid_item_template: p.template } : {})}
      {...(bound ? { grid_rescaling_type: "horizontal" as const, bindings: [bind.global(p.countFrom!, { override: "#maximum_grid_items" })] } : {})}
      {...{ size: [p.cols * p.cell[0], bound ? "100%c" : rows * p.cell[1]] as [Size1, Size1] }}
      {...common({ ...p, size: undefined })}
    >
      {placed}
    </Grid>
  );
}
