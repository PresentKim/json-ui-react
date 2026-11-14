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
