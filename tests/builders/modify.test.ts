import { describe, expect, it } from "vitest";
import { modify, modifications } from "../../src/modify.ts";

describe("modify 빌더", () => {
  it("insertBack 예시", () => {
    expect(modify.insertBack("controls", [{ "x@ns.y": {} }])).toEqual({
      array_name: "controls", operation: "insert_back", value: [{ "x@ns.y": {} }],
    });
  });
  it("mod_operations_11: 11가지 연산 이름", () => {
    const w = { control_name: "a" }, t = { control_name: "b" }, v = [{ "c@d": {} }];
    const ops = [
      modify.insertBack("controls", v), modify.insertFront("controls", v),
      modify.insertAfter("controls", w, v), modify.insertBefore("controls", w, v),
      modify.moveBack("controls", w), modify.moveFront("controls", w),
      modify.moveAfter("controls", w, t), modify.moveBefore("controls", w, t),
      modify.swap("controls", w, t), modify.replace("bindings", w, v), modify.remove("bindings", w),
    ].map((m) => m.operation);
    expect(ops).toEqual([
      "insert_back", "insert_front", "insert_after", "insert_before", "move_back", "move_front",
      "move_after", "move_before", "swap", "replace", "remove",
    ]);
  });
  it("키 순서와 undefined 생략", () => {
    const m = modify.moveAfter("controls", { control_name: "a" }, { control_name: "b" });
    expect(Object.keys(m)).toEqual(["array_name", "operation", "where", "target"]);
    expect(modifications(m, modify.remove("bindings", { binding_name: "#x" })).modifications).toHaveLength(2);
  });
});
