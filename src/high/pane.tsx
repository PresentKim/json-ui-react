// 판 부품: 판 아래 줄의 페이지 버튼(Pager)과 split 오른쪽 판 안내 글자(Placeholder).
// 둘 다 놓인 자리에는 아무것도 그리지 않고 화면 문맥에 등록한다(Pager -> 판 아래 줄, Placeholder -> 오른쪽 판).
import type { JuiElement } from "../types.ts";
import { render } from "../render.ts";
import { GEOM, PHASE, key, paneSize, ref, useScreen } from "./context.ts";
import { CELL_TEXT } from "./server.ts";

export interface PagerProps {
  /** 서버 데이터 키 [이전, 다음]이자 응답 decode의 name(index 0 이전, 1 다음). */
  name: string;
}

/**
 * 이전·다음 화살표 버튼 한 줄. 판 맨 아래 줄(footer)에 놓인다. 페이지 넘김은 서버가 응답을 받아 데이터를 바꿔 다시 연다.
 * 낮춤: 판 아래 줄 panel(판 폭 x 18, 판 맨 아래) 안의 가로 collection stack_panel > `pager`(왼쪽 화살표) + fill 간격 + `pager`(오른쪽).
 *   Tabs follow 안에 두면 탭마다의 Pager가 각자 탭 토글 바인딩을 달고 같은 줄에 겹친다.
 * 근거: COL-38(고정 인덱스 버튼은 collection 스택 직속 자식), BND-08(탭 토글 상태를 이름으로 읽는다), INP-32.
 * 버튼 글자는 화면에 보이지 않으므로 데이터가 없으면 "§r"을 보낸다.
 */
export function Pager(p: PagerProps): JuiElement {
  const ctx = useScreen("Pager");
  const range = ctx.slots.range(p.name, 2, PHASE.buttons);
  ctx.defaults[p.name] = [CELL_TEXT, CELL_TEXT];
  const [pw] = paneSize(ctx);
  ctx.footer.push(...render(
    <stack_panel name={p.name} orientation="horizontal" size={[pw, GEOM.cell]} collection_name="form_buttons">
      <use name="prev" def={ref(ctx, "pager")} collection_index={range.at(0)} $arrow_tex="textures/ui/arrowLeft" />
      <panel name="gap" size={["fill", GEOM.cell]} />
      <use name="next" def={ref(ctx, "pager")} collection_index={range.at(1)} $arrow_tex="textures/ui/arrowRight" />
    </stack_panel>,
  ));
  return <></>;
}

export interface PlaceholderProps {
  /** 아무 칸도 고르기 전 오른쪽 판에 보일 글자(정적). */
  text: string;
}

/**
 * split 오른쪽 판의 안내 글자. 칸을 고르면 SelectGrid 상세가 같은 자리를 배경째 덮는다.
 * 낮춤: 정의 `<코드>_right` = label(오른쪽 판 폭, 높이 default)을 창의 `$right_def`로 건다.
 * 근거: INP-36(상세는 칸 토글 얼굴 안에 있어 안내 글자 위에 그려진다), FILE-33(창의 $right_def|default를 화면 값이 덮는다).
 */
export function Placeholder(p: PlaceholderProps): JuiElement {
  const ctx = useScreen("Placeholder");
  if (ctx.layout !== "split") throw new Error(`Placeholder: <Screen layout="split">에서만 쓸 수 있습니다`);
  if (ctx.rightDef) throw new Error(`화면 "${ctx.id}": 오른쪽 판은 하나만 쓸 수 있습니다(SlotGrid detail, Placeholder)`);
  const k = key(ctx, "right");
  ctx.ns.define(k, (
    <label name={k} layer={3} localize={false} color={[0.4, 0.4, 0.4]} font_scale_factor={0.8} size={[GEOM.right[0], "default"]} text={p.text} />
  ));
  ctx.rightDef = ref(ctx, k);
  return <></>;
}
