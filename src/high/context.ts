// 고수준 빌드 문맥: buildScreens가 화면 하나를 낮추는 동안만 살아 있는 상태.
// 컴포넌트는 이 문맥에서 버튼 번호(slots)와 정의 이름을 얻는다. 사용자 코드에는 드러나지 않는다.
import type { Namespace, Pack } from "../pack.ts";
import { createSlots, type SlotBlocks, type SlotLayout, type SlotRange } from "../slots.ts";
import type { ControlNode, JsonObject } from "../types.ts";
import type { FieldSpec, RecordInfo } from "./server.ts";

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

/**
 * 버튼 번호를 받는 순서(종류). 같은 종류 안에서는 렌더 순서다.
 * 칸 격자 -> 버튼(탭·목록·페이지) -> 상세 블록. FFR 연구 화면의 원래 순서(칸 96, 탭 2, 페이지 4, 상세 96x20)와 같다.
 * 한 화면이 한 종류만 쓰면 그냥 렌더 순서다(기존 예시는 그대로).
 */
export const PHASE = { cells: 0, buttons: 1, details: 2 } as const;
export type Phase = (typeof PHASE)[keyof typeof PHASE];

/** 화면 하나의 번호 할당기. 컴포넌트는 종류(phase)를 같이 밝힌다. */
export interface ScreenSlots {
  range(name: string, count: number, phase: Phase): SlotRange;
  blocks(name: string, count: number, fields: string[], phase: Phase): SlotBlocks;
  layout(): SlotLayout;
}

interface SlotRequest { name: string; count: number; fields?: string[]; phase: Phase }

/**
 * 1차 렌더용: 요청을 적어 두고 임시 번호(요청 순서)를 준다.
 * 종류별 순서는 화면 전체를 한 번 렌더해야 알 수 있어서, buildScreens는 화면을 두 번 낮춘다(1차는 버리는 팩에).
 */
export function recordingSlots(): ScreenSlots & { requests: SlotRequest[] } {
  const s = createSlots();
  const requests: SlotRequest[] = [];
  return {
    requests,
    range(name, count, phase) {
      const r = s.range(name, count);
      requests.push({ name, count, phase });
      return r;
    },
    blocks(name, count, fields, phase) {
      const b = s.blocks(name, count, fields);
      requests.push({ name, count, fields: [...fields], phase });
      return b;
    },
    layout: () => s.layout(),
  };
}

/** 2차 렌더용: 1차 요청을 종류 순서로(같은 종류는 요청 순서로) 다시 배정한 번호를 준다. */
export function plannedSlots(requests: SlotRequest[]): ScreenSlots {
  const final = createSlots();
  const byName = new Map<string, { req: SlotRequest; slot: SlotRange | SlotBlocks }>();
  const sorted = requests.map((req, i) => ({ req, i })).sort((a, b) => a.req.phase - b.req.phase || a.i - b.i);
  for (const { req } of sorted) {
    byName.set(req.name, { req, slot: req.fields ? final.blocks(req.name, req.count, req.fields) : final.range(req.name, req.count) });
  }
  const take = (name: string, count: number, phase: Phase, fields?: string[]): SlotRange | SlotBlocks => {
    const hit = byName.get(name);
    const same = hit && hit.req.count === count && hit.req.phase === phase &&
      JSON.stringify(hit.req.fields ?? null) === JSON.stringify(fields ?? null);
    if (!same) throw new Error(`슬롯 "${name}": 두 번 낮춘 결과가 다릅니다(컴포넌트 렌더는 같은 입력에 같은 결과여야 합니다)`);
    return hit!.slot;
  };
  return {
    range: (name, count, phase) => take(name, count, phase) as SlotRange,
    blocks: (name, count, fields, phase) => take(name, count, phase, fields) as SlotBlocks,
    layout: () => final.layout(),
  };
}

export interface ScreenCtx {
  pack: Pack;
  ns: Namespace;
  id: string;
  code: string;
  layout: ScreenLayout;
  slots: ScreenSlots;
  /** 창 위 탭 줄 정의 참조(Tabs가 채운다). */
  tabsDef?: string;
  /** split 오른쪽 판 정의 참조(SlotGrid detail이 채운다). */
  rightDef?: string;
  /** 목록 창 본문 참조(VirtualList가 채운다). */
  listDef?: string;
  slotGrid?: boolean;
  /** 구간 이름 -> 칸별 기본 글자(Tab label). serverModule이 데이터가 없을 때 보낸다. */
  defaults: Record<string, (string | null)[]>;
  /** 레코드 격자(SelectGrid) 이름 -> 칸·상세 필드 배치. serverModule이 레코드를 버튼으로 바꿀 때 쓴다. */
  records: Record<string, RecordInfo>;
  /** 판 아래 줄(footer)에 놓을 컨트롤(Pager가 채운다). Screen이 판 맨 아래 한 줄로 묶는다. */
  footer: ControlNode[];
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

/** 상세 하나를 렌더하는 동안의 레코드 문맥: 어느 격자의 몇 번째 칸인지, 필드 -> 버튼 번호. */
export interface RecordCtx {
  grid: string;
  index: number;
  /** 필드를 밝히고 그 칸 상세 블록 안의 버튼 번호를 받는다. */
  field(spec: FieldSpec): number;
}

let currentRecord: RecordCtx | null = null;

export function withRecord<T>(rec: RecordCtx, fn: () => T): T {
  const prev = currentRecord;
  currentRecord = rec;
  try {
    return fn();
  } finally {
    currentRecord = prev;
  }
}

export function useRecord(who: string): RecordCtx {
  if (!currentRecord) throw new Error(`<${who}>는 <SelectGrid detail={...}> 상세 안에서만 쓸 수 있습니다`);
  return currentRecord;
}

/** 판 아래 줄: 판 폭 x 칸 높이, 판 맨 아래. 탭마다 다른 내용은 각자 토글 바인딩을 달고 같은 줄에 겹친다. */
export function footerBar(ctx: ScreenCtx, items: ControlNode[]): ControlNode {
  const [pw, ph] = paneSize(ctx);
  return { name: "footer", props: { type: "panel", size: [pw, GEOM.cell], ...TOP_LEFT, offset: [0, ph - GEOM.cell] }, children: items };
}

/** 화면 코드가 붙은 정의 이름과 그 참조. */
export const key = (ctx: ScreenCtx, part: string): string => `${ctx.code}_${part}`;
export const ref = (ctx: ScreenCtx, name: string): string => `${ctx.ns.name}.${name}`;
export const paneSize = (ctx: ScreenCtx): [number, number] => [...GEOM[ctx.layout]] as [number, number];
