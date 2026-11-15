// modifications 빌더: 바닐라 화면을 고치는 `modifications` 항목을 타입 있게 만든다(MOD-01, MOD-14).
import type { JsonObject } from "./types.ts";

/** 위키가 문서화한 11가지 연산 이름(MOD-14, MOD-23). */
export type ModOperation =
  | "insert_back"
  | "insert_front"
  | "insert_after"
  | "insert_before"
  | "move_back"
  | "move_front"
  | "move_after"
  | "move_before"
  | "swap"
  | "replace"
  | "remove";

export type ModArray = "controls" | "bindings";

/** MOD-01 키 집합. */
export interface Modification {
  array_name: ModArray;
  operation: ModOperation;
  value?: JsonObject[];
  where?: JsonObject;
  target?: JsonObject;
  target_control?: string;
}

/** 키 순서: array_name, operation, where, target, value (undefined 생략). */
function make(
  array_name: ModArray,
  operation: ModOperation,
  f: { where?: JsonObject; target?: JsonObject; value?: JsonObject[] } = {},
): Modification {
  const m: Modification = { array_name, operation };
  if (f.where !== undefined) m.where = f.where;
  if (f.target !== undefined) m.target = f.target;
  if (f.value !== undefined) m.value = f.value;
  return m;
}

export const modify = {
  insertBack: (a: ModArray, value: JsonObject[]) => make(a, "insert_back", { value }),
  insertFront: (a: ModArray, value: JsonObject[]) => make(a, "insert_front", { value }),
  insertAfter: (a: ModArray, where: JsonObject, value: JsonObject[]) => make(a, "insert_after", { where, value }),
  insertBefore: (a: ModArray, where: JsonObject, value: JsonObject[]) => make(a, "insert_before", { where, value }),
  moveBack: (a: ModArray, where: JsonObject) => make(a, "move_back", { where }),
  moveFront: (a: ModArray, where: JsonObject) => make(a, "move_front", { where }),
  moveAfter: (a: ModArray, where: JsonObject, target: JsonObject) => make(a, "move_after", { where, target }),
  moveBefore: (a: ModArray, where: JsonObject, target: JsonObject) => make(a, "move_before", { where, target }),
  swap: (a: ModArray, where: JsonObject, target: JsonObject) => make(a, "swap", { where, target }),
  replace: (a: ModArray, where: JsonObject, value: JsonObject[]) => make(a, "replace", { where, value }),
  remove: (a: ModArray, where: JsonObject) => make(a, "remove", { where }),
};

export function modifications(...m: Modification[]): { modifications: Modification[] } {
  return { modifications: m };
}
