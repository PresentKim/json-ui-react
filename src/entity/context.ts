// 엔티티 호스트 빌드 문맥: buildEntityScreens가 화면 하나를 낮추는 동안만 살아 있는 상태.
// src/high/context.ts의 withScreen/useScreen과 같은 방식이다.
import type { Diagnostic } from "../lint.ts";
import type { Namespace, Pack } from "../pack.ts";

/** 상자 칸 번호 할당기. 0번 칸은 쓰지 않는다. */
export interface EntitySlots {
  /** 이름으로 count칸을 잡는다. fixed가 있으면 그 번호부터, 없으면 1번부터 비어 있는 첫 구간. */
  claim(name: string, count: number, fixed?: number): number[];
  /** 이름 -> 칸 번호 목록. */
  map(): Record<string, number[]>;
  /** 인벤토리 크기. "auto"이고 가장 큰 칸이 27 미만이면 27, 아니면 243. */
  inventorySize(): 27 | 243;
}

export function createEntitySlots(size: 27 | 243 | "auto" = "auto"): EntitySlots {
  const limit = size === 27 ? 27 : 243; // 칸 번호는 limit 미만
  const owner = new Map<number, string>();
  const names: Record<string, number[]> = {};
  let high = 0;
  return {
    claim(name, count, fixed) {
      if (!Number.isInteger(count) || count < 1) throw new Error(`슬롯 "${name}": 칸 수는 1 이상의 정수여야 합니다(${count})`);
      if (name in names) throw new Error(`슬롯 "${name}"은 이미 잡혀 있습니다`);
      let start: number;
      if (fixed !== undefined) {
        start = fixed;
        if (!Number.isInteger(start) || start < 1) throw new Error(`슬롯 "${name}": 0번 칸은 쓸 수 없고 시작 번호는 1 이상이어야 합니다(${fixed})`);
        if (start + count > limit) throw new Error(`슬롯 "${name}": ${start}..${start + count - 1}번이 인벤토리 크기(${limit - 1}번까지)를 넘습니다`);
        for (let i = start; i < start + count; i++) {
          const o = owner.get(i);
          if (o !== undefined) throw new Error(`슬롯 "${name}": ${i}번 칸이 "${o}"와 겹칩니다`);
        }
      } else {
        start = 1;
        for (;;) {
          if (start + count > limit) throw new Error(`슬롯 "${name}": ${count}칸을 둘 자리가 없습니다(인벤토리 크기 ${limit - 1}번까지)`);
          let clash = -1;
          for (let i = start; i < start + count; i++) if (owner.has(i)) clash = i;
          if (clash < 0) break;
          start = clash + 1;
        }
      }
      const out: number[] = [];
      for (let i = start; i < start + count; i++) {
        owner.set(i, name);
        out.push(i);
      }
      high = Math.max(high, start + count - 1);
      names[name] = out;
      return [...out];
    },
    map: () => Object.fromEntries(Object.entries(names).map(([k, v]) => [k, [...v]])),
    inventorySize: () => (size === "auto" ? (high < 27 ? 27 : 243) : size),
  };
}

export interface EntityCtx {
  pack: Pack;
  ns: Namespace;
  id: string;
  /** 엔티티 제목 문자열. */
  title: string;
  slots: EntitySlots;
  /** 버튼 이름 -> 칸 번호들. */
  buttons: Record<string, number[]>;
  diagnostics: Diagnostic[];
}

let current: EntityCtx | null = null;

export function withEntity<T>(ctx: EntityCtx, fn: () => T): T {
  const prev = current;
  current = ctx;
  try {
    return fn();
  } finally {
    current = prev;
  }
}

export function useEntity(who: string): EntityCtx {
  if (!current) throw new Error(`<${who}>는 <EntityScreen> 안에서 buildEntityScreens로만 렌더할 수 있습니다`);
  return current;
}
