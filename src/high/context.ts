// 고수준 빌드 문맥: buildScreens가 화면 하나를 낮추는 동안만 살아 있는 상태.
// 컴포넌트는 이 문맥에서 버튼 번호(slots)와 정의 이름을 얻는다. 사용자 코드에는 드러나지 않는다.
import type { Namespace, Pack } from "../pack.ts";
import type { Slots } from "../slots.ts";
import type { JsonObject } from "../types.ts";

export type ScreenLayout = "single" | "split";

/** 테마와 판 크기. 창 정의(theme.ts)의 숫자와 맞아야 한다. */
export const GEOM = {
  /** single 창 판 안쪽 크기(창 200 - 여백 12 - 안쪽 8). */
  single: [180, 128] as [number, number],
  /** split 창 왼쪽 판 안쪽 크기(왼쪽 판 152 - 안쪽 8). */
  split: [144, 128] as [number, number],
  /** split 오른쪽 판 안쪽 크기(오른쪽 판 158 - 안쪽 8). */
  right: [150, 128] as [number, number],
  /** 판 내용이 창 안에서 시작하는 자리(판 6,22 + 안쪽 4,4). */
  paneOrigin: [10, 26] as [number, number],
  /** split 오른쪽 판이 창 안에서 시작하는 자리. */
  rightOrigin: [162, 22] as [number, number],
  /** 탭 줄이 창 안에서 시작하는 자리. */
  tabsOrigin: [8, -22] as [number, number],
  tab: [96, 22] as [number, number],
  button: [172, 20] as [number, number],
  buttonRow: 22,
  cell: 18,
};

export const TOP_LEFT: JsonObject = { anchor_from: "top_left", anchor_to: "top_left" };

export interface ScreenCtx {
  pack: Pack;
  ns: Namespace;
  id: string;
  code: string;
  layout: ScreenLayout;
  slots: Slots;
  /** 창 위 탭 줄 정의 참조(Tabs가 채운다). */
  tabsDef?: string;
  /** split 오른쪽 판 정의 참조(SlotGrid detail이 채운다). */
  rightDef?: string;
  /** 목록 창 본문 참조(VirtualList가 채운다). */
  listDef?: string;
  slotGrid?: boolean;
  /** 구간 이름 -> 칸별 기본 글자(Tab label). serverModule이 데이터가 없을 때 보낸다. */
  defaults: Record<string, (string | null)[]>;
}

let current: ScreenCtx | null = null;

export function withScreen<T>(ctx: ScreenCtx, fn: () => T): T {
  const prev = current;
  current = ctx;
  try {
    return fn();
  } finally {
    current = prev;
  }
}

export function useScreen(who: string): ScreenCtx {
  if (!current) throw new Error(`<${who}>는 <Screen> 안에서 buildScreens로만 렌더할 수 있습니다`);
  return current;
}

/** 화면 코드가 붙은 정의 이름과 그 참조. */
export const key = (ctx: ScreenCtx, part: string): string => `${ctx.code}_${part}`;
export const ref = (ctx: ScreenCtx, name: string): string => `${ctx.ns.name}.${name}`;
export const paneSize = (ctx: ScreenCtx): [number, number] => [...GEOM[ctx.layout]] as [number, number];
