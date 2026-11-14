// 서버 버튼 슬롯 할당기: 이름 붙은 구간/블록에 연속 번호를 배정한다.

export interface SlotRange {
  name: string;
  start: number;
  count: number;
  at(i: number): number;
}
export interface SlotBlocks {
  name: string;
  start: number;
  count: number;
  fields: string[];
  size: number;
  at(index: number, field: string): number;
}
export interface SlotLayout {
  total: number;
  ranges: { name: string; start: number; count: number }[];
  blocks: { name: string; start: number; count: number; fields: string[] }[];
}
export type SlotHit = { name: string; index: number; field?: string };
export interface Slots {
  range(name: string, count: number): SlotRange;
  blocks(name: string, count: number, fields: string[]): SlotBlocks;
  layout(): SlotLayout;
}

function checkCount(name: string, count: number): void {
  if (!Number.isInteger(count) || count <= 0) {
    throw new Error(`슬롯 "${name}": 개수는 1 이상의 정수여야 합니다 (받은 값 ${count})`);
  }
}

export function createSlots(): Slots {
  let next = 0;
  const names = new Set<string>();
  const ranges: SlotLayout["ranges"] = [];
  const blocks: SlotLayout["blocks"] = [];
  const claim = (name: string) => {
    if (names.has(name)) throw new Error(`슬롯 이름 중복: "${name}"`);
    names.add(name);
  };
  return {
    range(name, count) {
      checkCount(name, count);
      claim(name);
      const start = next;
      next += count;
      ranges.push({ name, start, count });
      return {
        name, start, count,
        at(i) {
          if (!Number.isInteger(i) || i < 0 || i >= count) {
            throw new Error(`슬롯 "${name}": 인덱스 ${i} 범위 밖 (0..${count - 1})`);
          }
          return start + i;
        },
      };
    },
    blocks(name, count, fields) {
      checkCount(name, count);
      if (fields.length === 0) throw new Error(`슬롯 "${name}": 필드 목록이 비어 있습니다`);
      if (new Set(fields).size !== fields.length) throw new Error(`슬롯 "${name}": 필드 이름 중복`);
      claim(name);
      const start = next;
      const size = fields.length;
      next += count * size;
      const f = [...fields];
      blocks.push({ name, start, count, fields: f });
      return {
        name, start, count, fields: f, size,
        at(index, field) {
          if (!Number.isInteger(index) || index < 0 || index >= count) {
            throw new Error(`슬롯 "${name}": 인덱스 ${index} 범위 밖 (0..${count - 1})`);
          }
          const k = f.indexOf(field);
          if (k < 0) throw new Error(`슬롯 "${name}": 알 수 없는 필드 "${field}"`);
          return start + index * size + k;
        },
      };
    },
    layout() {
      return {
        total: next,
        ranges: ranges.map((r) => ({ ...r })),
        blocks: blocks.map((b) => ({ ...b, fields: [...b.fields] })),
      };
    },
  };
}

export function decode(layout: SlotLayout, selection: number): SlotHit | null {
  if (!Number.isInteger(selection) || selection < 0 || selection >= layout.total) return null;
  for (const r of layout.ranges) {
    if (selection >= r.start && selection < r.start + r.count) {
      return { name: r.name, index: selection - r.start };
    }
  }
  for (const b of layout.blocks) {
    const size = b.fields.length;
    if (selection >= b.start && selection < b.start + b.count * size) {
      const off = selection - b.start;
      return { name: b.name, index: Math.floor(off / size), field: b.fields[off % size] };
    }
  }
  return null;
}

/** 의존 없는 ESM JS 서버 모듈 문자열을 만든다. */
export function serverModule(layout: SlotLayout): string {
  return [
    "// 자동 생성: 슬롯 배치 모듈",
    `export const LAYOUT = ${JSON.stringify(layout, null, 2)};`,
    "",
    "export function decode(sel) {",
    "  if (!Number.isInteger(sel) || sel < 0 || sel >= LAYOUT.total) return null;",
    "  for (const r of LAYOUT.ranges) {",
    "    if (sel >= r.start && sel < r.start + r.count) return { name: r.name, index: sel - r.start };",
    "  }",
    "  for (const b of LAYOUT.blocks) {",
    "    const size = b.fields.length;",
    "    if (sel >= b.start && sel < b.start + b.count * size) {",
    "      const off = sel - b.start;",
    "      return { name: b.name, index: Math.floor(off / size), field: b.fields[off % size] };",
    "    }",
    "  }",
    "  return null;",
    "}",
    "",
  ].join("\n");
}

let current: Slots | null = null;

export function withSlots<T>(s: Slots, fn: () => T): T {
  const prev = current;
  current = s;
  try {
    return fn();
  } finally {
    current = prev;
  }
}

export function useSlots(): Slots {
  if (!current) throw new Error("useSlots는 withSlots 안에서만 호출할 수 있습니다");
  return current;
}
