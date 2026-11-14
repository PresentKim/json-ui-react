// router: 버튼 4개를 가로 한 줄로 그린다. 화면 선택은 build-rp의 단일 라우터가 맡는다.
import type { Pack } from "../../src/pack.ts";
import type { Slots } from "../../src/slots.ts";
import { ButtonRow, defineWindow, ns, ref } from "./common.tsx";

export function defineRouter(pack: Pack, slots: Slots): string {
  const buttons = slots.range("buttons", 4);
  ns(pack).define("ro_panes", (
    <panel name="ro_panes" size={[144, 128]}>
      <ButtonRow name="row" range={buttons} />
    </panel>
  ));
  defineWindow(pack, "ro", { "$mode_title": "라우터: 제목 접두로 화면 선택", "$panes_def": ref("ro_panes") });
  return ref("ro");
}
