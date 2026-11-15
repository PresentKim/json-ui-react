// 자체 JSX 런타임: 요소는 지연 평가되는 순수 객체이며 render()가 펼친다.
import type { JuiElement, JuiNode } from "./types.ts";
import type { IntrinsicElementsMap } from "./controls/elements.ts";

export function Fragment(props: { children?: JuiNode }): JuiNode {
  return props.children;
}

export function jsx(type: JuiElement["type"], props: Record<string, unknown>, key?: string): JuiElement {
  const el: JuiElement = { type, props: props ?? {} };
  if (key !== undefined) el.key = String(key);
  return el;
}

export const jsxs = jsx;

// vitest 별칭이 jsx-dev-runtime을 이 파일로 연결하므로 jsxDEV도 여기서 내보낸다.
export function jsxDEV(type: JuiElement["type"], props: Record<string, unknown>, key?: string): JuiElement {
  return jsx(type, props, key);
}

// jsxImportSource 사용 시 TS는 이 모듈이 내보내는 JSX 네임스페이스를 참조한다.
export namespace JSX {
  export interface IntrinsicElements extends IntrinsicElementsMap {}
  export type Element = JuiElement;
  export interface ElementChildrenAttribute {
    children: {};
  }
}
