// 타입이 붙은 JSX 내장 요소 맵: 태그 이름 -> 속성 타입.
import type { JsonValue, JuiNode } from "../types.ts";
import type {
  PanelProps, StackPanelProps, GridProps, ImageProps, LabelProps, CustomProps,
  FactoryProps, CollectionPanelProps, ScreenProps,
} from "./visual.ts";
import type {
  ButtonProps, ToggleProps, InputPanelProps, SliderProps, SliderBoxProps, EditBoxProps,
  ScrollViewProps, ScrollTrackProps, DropdownProps, TooltipTriggerProps, CarouselLabelProps,
  SelectionWheelProps,
} from "./input.ts";

export interface ControlPropsMap {
  panel: PanelProps;
  stack_panel: StackPanelProps;
  grid: GridProps;
  image: ImageProps;
  label: LabelProps;
  custom: CustomProps;
  factory: FactoryProps;
  collection_panel: CollectionPanelProps;
  screen: ScreenProps;
  button: ButtonProps;
  toggle: ToggleProps;
  input_panel: InputPanelProps;
  slider: SliderProps;
  slider_box: SliderBoxProps;
  edit_box: EditBoxProps;
  scroll_view: ScrollViewProps;
  scroll_track: ScrollTrackProps;
  dropdown: DropdownProps;
  tooltip_trigger: TooltipTriggerProps;
  carousel_label: CarouselLabelProps;
  selection_wheel: SelectionWheelProps;
}

/** 모든 요소가 공유하는 JSX 전용 속성 (collection_index 는 각 타입의 ChildPosProps 가 결정: COL-02) */
export interface ElementBase {
  name: string;
  def?: string;
  children?: JuiNode;
}

/**
 * T6 타입에 빠진 바닐라 속성 보강 (코디네이터 회수용):
 * factory 는 바닐라에서 stack_panel / collection_panel 에도 쓰이지만 FactoryProps 에만 있다.
 */
export interface ExtraProps {
  stack_panel: Pick<FactoryProps, "factory">;
  collection_panel: Pick<FactoryProps, "factory">;
}

export type ElementProps<T extends keyof ControlPropsMap> = ControlPropsMap[T] &
  (T extends keyof ExtraProps ? ExtraProps[T] : unknown) &
  ElementBase;

/** 정의 참조 요소: `{ name, def?, ...임의 값 }` (느슨하게 허용; def 없는 use 는 ns.define 용 정의 본문) */
export type UseProps = ElementBase & { [k: string]: JsonValue | JuiNode | undefined };

export type IntrinsicElementsMap = { [T in keyof ControlPropsMap]: ElementProps<T> } & { use: UseProps };
