// router: 아이콘 + 글자 버튼 4개를 세로로 그린다. 화면 선택은 build-rp의 단일 라우터가 맡는다.
import type { Pack } from "../../src/pack.ts";
import type { Slots } from "../../src/slots.ts";
import { ButtonList, TOP_LEFT, defineWindow, ns, ref } from "./common.tsx";

export function defineRouter(pack: Pack, slots: Slots): string {
  const buttons = slots.range("buttons", 4);
  ns(pack).define("ro_panes", (
    <panel name="ro_panes" size={[180, 128]}>
      <ButtonList name="list" range={buttons} props={TOP_LEFT} />
    </panel>
  ));
  defineWindow(pack, "ro", { "$mode_title": "Router: screen picked by title prefix", "$panes_def": ref("ro_panes") });
  return ref("ro");
}
