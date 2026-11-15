// json-ui-react 공개 진입점(배럴).
// 고수준(src/high)이 기본 이름(Screen, ButtonList, Tabs, SlotGrid, VirtualList, buildScreens)을 갖는다.
// 저수준은 그대로 공개한다. 이름이 겹치는 SlotGrid·VirtualList·Tabs(훅 타입)는 여기서 Low 접두로 내고,
// 원래 이름으로는 json-ui-react/components/grid, json-ui-react/hooks 에서 가져온다.
export * from "./high/index.ts";
export * from "./types";
export { render, toEntry, toBody } from "./render";
export { jsx, jsxs, Fragment } from "./jsx-runtime";
export * from "./pack";
export * from "./slots";
export * from "./expr";
export * from "./bind";
export * from "./lint";
export { useTabs, useSelection, useBinding } from "./hooks";
export type { TabMode, Selection, Tabs as LowTabs } from "./hooks";
export * from "./components/router";
export * from "./components/toggle";
export { SlotGrid as LowSlotGrid, VirtualList as LowVirtualList, VIRTUAL_LIST_LIMIT } from "./components/grid";
export type { SlotGridProps as LowSlotGridProps, VirtualListProps as LowVirtualListProps } from "./components/grid";
export * from "./entity/index.ts";
// 규칙 레지스트리(타입, getRule, listRules, ruleUrl, diag, RULE_IDS, RULE_INFO, STAGES)
export * from "./rules/index.ts";
// 타입이 붙은 저수준 컨트롤: 속성 타입, 값 표, 내장 JSX 요소 맵, PascalCase 부품.
// 고수준과 이름이 겹치는 Screen, Label, ScreenProps는 Low 접두로 낸다.
export { ANCHORS } from "./controls/common.ts";
export type {
  Var, OrVar, Anchor, SizeExpr, Size1, Size, Color, Bindings, ButtonMappingObj, VarBlock, Variables,
  PropertyBag, BoolOrExpr, CommonProps, ChildPosProps, CollectionNameProps, BindingObj as ControlBindingObj,
} from "./controls/common.ts";
export * from "./controls/input.ts";
export * from "./controls/elements.ts";
export {
  CONTROL_TYPES, ORIENTATIONS, TEXT_ALIGNMENTS, FONT_TYPES, FONT_SIZES, GRID_RESCALING_TYPES,
  GRID_FILL_DIRECTIONS, CLIP_DIRECTIONS, RENDERERS,
} from "./controls/visual.ts";
export type {
  ControlType, Orientation, TextAlignment, FontType, FontSize, GridRescalingType, GridFillDirection,
  ClipDirection, Renderer, PanelProps, StackPanelProps, GridProps, ImageProps, LabelProps, CustomProps,
  FactorySpec, FactoryProps, CollectionPanelProps, ScreenProps as LowScreenProps,
} from "./controls/visual.ts";
export {
  Panel, StackPanel, Grid, Image, Custom, Factory, CollectionPanel, Button, Toggle, InputPanel, Slider,
  SliderBox, EditBox, ScrollView, ScrollTrack, Dropdown, TooltipTrigger, CarouselLabel, SelectionWheel, Use,
  Screen as LowScreen, Label as LowLabel,
} from "./controls/components.tsx";
// 애니메이션 빌더
export * from "./anim.ts";
// 규칙 검사 엔진과 범주별 검사(2단계), 범용 배치 표·설명·해결기.
export { runChecks, buildIndex } from "./check/engine.ts";
export { ALL_CHECKS, allChecks } from "./check/index.ts";
export type { RuleCheck, NodeCtx, DefIndex, Report } from "./check/types.ts";
export * from "./placement/index.ts";
export { modify, modifications } from "./modify.ts";
export type { Modification, ModOperation, ModArray } from "./modify.ts";
// 컴포넌트 키트(3단계 배치 규칙을 거치는 중간 수준 부품). 이름이 겹치면 Kit 접두로 낸다.
export * from "./kit/index.ts";
export { Spacer as KitSpacer } from "./kit/index.ts";
export { Spacer } from "./high/index.ts"; // 이름 충돌: Spacer는 고수준 쪽을 유지한다
export * as kit from "./kit/index.ts";
