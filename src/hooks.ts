// 빌드 시 1회 실행되는 순수 헬퍼 훅 (상태 없음).
import { radioToggleBody } from "./components/toggle.tsx";
import * as bind from "./bind.ts";
import type { SlotRange } from "./slots.ts";
import type { JsonObject } from "./types.ts";

export type TabMode = "inside" | "follow" | "lazy";

export interface Tabs {
  tabName(i: number): string;
  tabIndex(i: number): number;
  paneBinding(i: number): JsonObject;
  toggleBody(o: { size: [number, number] }): JsonObject;
  lazyPane(i: number, control: string, o?: { size?: [number, number] }): JsonObject;
}

export function useTabs(opts: { group: string; mode: TabMode; count: number; firstIndex: number }): Tabs {
  if (opts.mode !== "inside" && opts.mode !== "follow" && opts.mode !== "lazy") {
    throw new Error(`알 수 없는 탭 모드: ${String(opts.mode)}`);
  }
  const prefix = opts.group.replace(/_tabs$/, "");
  const tabName = (i: number): string => {
    if (!Number.isInteger(i) || i < 0 || i >= opts.count) throw new Error(`탭 번호 범위 밖: ${i}`);
    return `${prefix}_t${i}`;
  };
  return {
    tabName,
    tabIndex: (i) => opts.firstIndex + i,
    paneBinding: (i) => bind.view("#toggle_state", "#visible", { condition: "always", control: tabName(i) }),
    toggleBody: ({ size }) =>
      radioToggleBody({ group: opts.group, size, forcedIndex: "$tab_index", defaultSelected: "$tab" }),
    lazyPane(i, control, o = {}) {
      if (opts.mode !== "lazy") throw new Error(`lazyPane은 lazy 모드에서만 쓸 수 있습니다 (모드 ${opts.mode})`);
      if (i === 0) throw new Error("첫 탭은 미리 만듭니다: lazyPane(0)은 쓸 수 없습니다");
      return {
        type: "stack_panel",
        size: o.size ?? [144, 128],
        factory: { name: `${prefix}_d${i}`, control_name: control },
        bindings: [bind.view("(#toggle_state * 1)", "#collection_length", { condition: "always", control: tabName(i) })],
      };
    },
  };
}

export interface Selection {
  itemBody(o: { size: [number, number]; forcedIndex: string | number }): JsonObject;
  lazyDetail(control: string, name: string): JsonObject;
  slots: SlotRange;
}

export function useSelection(opts: { group: string; slots: SlotRange }): Selection {
  return {
    slots: opts.slots,
    itemBody: ({ size, forcedIndex }) =>
      radioToggleBody({ group: opts.group, size, forcedIndex, defaultSelected: -1 }),
    lazyDetail: (control, name) => ({ factory: { name, control_name: control } }),
  };
}

export function useBinding(
  expr: string,
  target: string,
  opts?: { condition?: string; control?: string },
): JsonObject {
  for (const m of expr.matchAll(/"([^"]*)"|'([^']*)'/g)) {
    if (/[*@]/.test(m[1] ?? m[2] ?? "")) {
      throw new Error(`EXP-36: 따옴표 안에 '*' 또는 '@'를 쓸 수 없습니다: ${expr}`);
    }
  }
  return bind.view(expr, target, opts);
}
