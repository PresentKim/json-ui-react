// virtual-list: 2열 가상 목록. 칸 수는 컬렉션 길이에 묶인다.
import type { Pack } from "../../src/pack.ts";
import type { Slots } from "../../src/slots.ts";
import { VirtualList } from "../../src/components/grid.tsx";
import { ns, ref } from "./common.tsx";

/** code: 라우트 코드("v5"/"v2"), count: 버튼 수. */
export function defineVirtualList(pack: Pack, slots: Slots, code: string, count: number): string {
  slots.range("list", count);
  const n = ns(pack);
  const body = `vl_body_${count}`;
  n.define(body, <VirtualList name={body} columns={2} cellSize={[100, 30]} cellDef="ffr.list_cell" maxItems={count} />);
  n.define(`${code}@ffr.list_window`, {
    "$list_title": `Grid list: ${count} cells (2 columns)`,
    "$list_content": ref(body),
  });
  return ref(code);
}
