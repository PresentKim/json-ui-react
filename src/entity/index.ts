// 엔티티(상자 화면) 호스트: 컴포넌트로 쓰고 buildEntityScreens로 팩과 서버 모듈을 만든다.
export { createEntitySlots, withEntity, useEntity } from "./context.ts";
export type { EntitySlots, EntityCtx } from "./context.ts";
export { placeEntityTree, readsSlot } from "./solver.ts";
export { EntityScreen, buildEntityScreens } from "./build.tsx";
export type { EntityScreenProps, BuildEntityScreensOptions, BuildEntityScreensResult } from "./build.tsx";
export type { ScreenInfo, Session, EntityMenuOptions } from "./runtime.d.ts";
export * from "./data.tsx";
export * from "./interact.tsx";
