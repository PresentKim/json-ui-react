// 저수준 PascalCase 컴포넌트: 같은 이름의 내장 요소를 그대로 돌려준다(렌더 결과 동일).
import { jsx } from "../jsx-runtime.ts";
import type { JuiElement } from "../types.ts";
import type { ElementProps, UseProps, ControlPropsMap } from "./elements.ts";

const make =
  <T extends keyof ControlPropsMap>(tag: T) =>
  (p: ElementProps<T>): JuiElement =>
    jsx(tag, p as unknown as Record<string, unknown>);

export const Panel = make("panel");
export const StackPanel = make("stack_panel");
export const Grid = make("grid");
export const Image = make("image");
export const Label = make("label");
export const Custom = make("custom");
export const Factory = make("factory");
export const CollectionPanel = make("collection_panel");
export const Screen = make("screen");
export const Button = make("button");
export const Toggle = make("toggle");
export const InputPanel = make("input_panel");
export const Slider = make("slider");
export const SliderBox = make("slider_box");
export const EditBox = make("edit_box");
export const ScrollView = make("scroll_view");
export const ScrollTrack = make("scroll_track");
export const Dropdown = make("dropdown");
export const TooltipTrigger = make("tooltip_trigger");
export const CarouselLabel = make("carousel_label");
export const SelectionWheel = make("selection_wheel");
export const Use = (p: UseProps): JuiElement => jsx("use", p as unknown as Record<string, unknown>);
