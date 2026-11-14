// 예시 화면 공통 도우미.
import type { JsonObject, JuiElement } from "../../src/types.ts";
import type { Pack } from "../../src/pack.ts";
import type { SlotRange } from "../../src/slots.ts";
import { SlotGrid } from "../../src/components/grid.tsx";

export const NS = "jur";
export const ref = (key: string): string => `${NS}.${key}`;

/** 화면 한 개를 뜻하는 정의 키 조각을 jur 네임스페이스에 정의한다. */
export function ns(pack: Pack) {
  return pack.ns(NS, "jur.json");
}

/** ffr.window 위에 얹는 라우트 컨트롤: `<code>@ffr.window`. 반환값은 라우터가 쓸 참조. */
export function defineWindow(pack: Pack, code: string, vars: JsonObject): string {
  return ns(pack).define(`${code}@ffr.window`, {
    "$tabs_def": "ffr.panes_none",
    "$right_def": "ffr.placeholder",
    ...vars,
  });
}

/** 슬롯 구간을 가로 한 줄 버튼 칸으로 만든다. */
export function ButtonRow(p: { name: string; range: SlotRange; bindings?: JsonObject[] }): JuiElement {
  const n = p.range.count;
  return (
    <SlotGrid
      name={p.name}
      size={[n * 18, 18]}
      rows={1}
      cols={n}
      rowHeight={18}
      rowWidth={n * 18}
      bindings={p.bindings}
      cell={(pos) => <use name={`c${pos}`} def="ffr.slot" collection_index={p.range.at(pos)} />}
    />
  );
}
