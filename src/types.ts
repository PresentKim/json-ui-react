import type { IntrinsicElementsMap } from "./controls/elements.ts";

// 공유 데이터 타입: JSON 값, 컨트롤 트리, JSX 요소/노드.

export type JsonValue = string | number | boolean | null | JsonValue[] | { [k: string]: JsonValue };

export type JsonObject = { [k: string]: JsonValue };

export interface ControlNode {
  name: string;
  def?: string;
  props: JsonObject;
  children: ControlNode[];
}

export interface JuiElement {
  type: string | ((props: any) => JuiNode);
  props: Record<string, unknown>;
  key?: string;
}

export type JuiNode = JuiElement | JuiNode[] | string | null | false | undefined;

export namespace JSX {
  interface IntrinsicElements extends IntrinsicElementsMap {}
  type Element = JuiElement;
}
