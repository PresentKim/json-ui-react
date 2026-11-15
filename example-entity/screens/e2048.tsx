// 엔티티 2048: 원본 gen-ui.mjs가 만들던 JSON을 TSX 반복문으로 표현한다.
// 칸 지도(243칸): 1-16 움직임 층, 17-32 결과 층, 33 점수, 34 상태, 36-40 U D L R New 버튼.
import { EntityScreen, At, SlotText, useEntity, Panel, StackPanel, Image, LowLabel, render, toBody, QuickButton, KeyedCell, anim } from "json-ui-react";
import type { JuiElement } from "json-ui-react";
import type { Anchor } from "json-ui-react/controls/common.ts";

const CELL = 30; // 칸 한 변
const TILE = 28; // 타일 그림 한 변
const POP = 34; // 합쳐질 때 잠깐 커지는 크기
const SLIDE = 0.12; // 미끄러지는 시간(초)
const PAD = 26; // 방향 버튼 한 변
const SIZE = 4;
const VALUES = 13;
const PARITIES = ["a", "b"];
const TEX = "textures/ui/e2048";
const BOARD = CELL * SIZE + 4;
const WINDOW: [number, number] = [BOARD + PAD * 6 + 32, BOARD + 52]; // 312 x 176

const DIRECTIONS: Record<string, [number, number]> = { U: [0, -1], D: [0, 1], L: [-1, 0], R: [1, 0] };
const MOVER_CODES = ["S0", ...Object.keys(DIRECTIONS).flatMap((d) => [1, 2, 3].map((n) => `${d}${n}`))];
const FINAL_CODES = ["N", "M", "P"];

/** 움직임 코드별 애니메이션 정의를 만들고 이미지 anims 참조 목록을 돌려준다. */
function tileAnims(code: string): string[] {
  const moverOff = anim("mover_off", { anim_type: "alpha", from: 0, to: 0, duration: 0.01 });
  const moverAlpha = anim("mover_alpha", { anim_type: "alpha", from: 1, to: 1, duration: SLIDE + 0.05, next: moverOff });
  const finalOn = anim("final_on", { anim_type: "alpha", from: 1, to: 1, duration: 0.01 });
  const finalAlpha = anim("final_alpha", { anim_type: "alpha", from: 0, to: 0, duration: SLIDE, next: finalOn });
  if (code === "S0") return [moverAlpha];
  if (MOVER_CODES.includes(code)) {
    const [x, y] = DIRECTIONS[code[0]!]!;
    const n = Number(code[1]);
    const slide = anim(`slide_${code}`, { anim_type: "offset", easing: "out_cubic", duration: SLIDE, from: [0, 0], to: [x * n * CELL, y * n * CELL] });
    return [slide, moverAlpha];
  }
  if (code === "N") return [finalAlpha];
  if (code === "M") {
    const down = anim("pop_down", { anim_type: "size", easing: "in_cubic", from: [POP, POP], to: [TILE, TILE], duration: 0.07 });
    const up = anim("pop_up", { anim_type: "size", easing: "out_cubic", from: [TILE, TILE], to: [POP, POP], duration: 0.07, next: down });
    const wait = anim("pop_wait", { anim_type: "size", from: [TILE, TILE], to: [TILE, TILE], duration: SLIDE, next: up });
    return [finalAlpha, wait];
  }
  const grow = anim("spawn_grow", { anim_type: "size", easing: "out_cubic", from: [0, 0], to: [TILE, TILE], duration: 0.12 });
  const wait = anim("spawn_wait", { anim_type: "size", from: [0, 0], to: [0, 0], duration: SLIDE, next: grow });
  return [finalAlpha, wait];
}

/** 코드 x 값마다 공유 타일 정의 ft_<코드>_<값>을 한 번씩 넣는다(홀짝 두 키가 같은 정의를 쓴다). */
function tileDefs(codes: string[]): void {
  const ctx = useEntity("tileDefs");
  for (const code of codes) {
    const anims = tileAnims(code);
    for (let v = 1; v <= VALUES; v++) {
      const tile = (
        <Panel name="ft" size={[CELL, CELL]}>
          <Image name="tile" size={[TILE, TILE]} layer={1} texture={`${TEX}/t${v}`} anims={anims} />
        </Panel>
      );
      ctx.ns.define(`ft_${code}_${v}`, toBody(render(tile)[0]!));
    }
  }
}

/** 코드 x 값 x 홀짝 키 -> 공유 정의 참조. 이동할 때마다 홀짝이 뒤집혀 같은 모양도 새 키가 된다. */
function variants(codes: string[]): Record<string, string> {
  const out: Record<string, string> = {};
  for (const code of codes) {
    for (let v = 1; v <= VALUES; v++) {
      for (const parity of PARITIES) out[`${code}${parity}t${v}`] = `ft_${code}_${v}`;
    }
  }
  return out;
}

/** 칸 묶음 미리 잡기 + 공유 정의. 화면 본문의 첫 자식으로 둔다. */
function Setup(): null {
  const { slots } = useEntity("Setup");
  slots.claim("mover", SIZE * SIZE, 1);
  slots.claim("final", SIZE * SIZE, 17);
  slots.claim("score", 1, 33);
  slots.claim("status", 1, 34);
  ["U", "D", "L", "R", "New"].forEach((b, k) => slots.claim(b, 1, 36 + k));
  tileDefs(MOVER_CODES);
  tileDefs(FINAL_CODES);
  return null;
}

function Layer(p: { name: string; slot: string; codes: string[]; layer: number }): JuiElement {
  const v = variants(p.codes);
  return (
    <Panel name={p.name} size={[CELL * SIZE, CELL * SIZE]} offset={[2, 2]} anchor_from="top_left" anchor_to="top_left" layer={p.layer}>
      {Array.from({ length: SIZE }, (_, r) => (
        <StackPanel name={`r${r}`} orientation="horizontal" size={[CELL * SIZE, CELL]} offset={[0, r * CELL]} anchor_from="top_left" anchor_to="top_left">
          {Array.from({ length: SIZE }, (_, c) => (
            <KeyedCell name={`c${r}${c}`} slot={p.slot} index={r * SIZE + c} size={[CELL, CELL]} variants={v} />
          ))}
        </StackPanel>
      ))}
    </Panel>
  );
}

const arrow = (tex: string) => <Image name="arrow" layer={2} texture={tex} size={[14, 14]} />;

/** 방향 버튼 4개. 두 개를 놓아도 같은 U/D/L/R 버튼 칸에 묶인다. */
function Dpad(p: { name: string; anchor: Anchor; offset: [number, number] }): JuiElement {
  const spots: [string, Anchor, string][] = [
    ["U", "top_middle", "gameTipArrow_up"],
    ["D", "bottom_middle", "gameTipArrow_down"],
    ["L", "left_middle", "gameTipArrow_left"],
    ["R", "right_middle", "gameTipArrow_right"],
  ];
  return (
    <Panel name={p.name} size={[PAD * 3, PAD * 3]} anchor_from={p.anchor} anchor_to={p.anchor} offset={p.offset} layer={2}>
      {spots.map(([b, anchor, tex]) => (
        <Panel name={`pos_${b}`} size={[PAD, PAD]} anchor_from={anchor} anchor_to={anchor}>
          <QuickButton name={b} slot={b} size={[PAD, PAD]} face="light">
            {arrow(`textures/ui/${tex}`)}
          </QuickButton>
        </Panel>
      ))}
    </Panel>
  );
}

const e2048: JuiElement = (
  <EntityScreen id="e2048" code="20" title="2048" size={WINDOW}>
    <Setup />
    <At name="score_at" x={40} y={7} w={120} h={10} layer={3}>
      <SlotText name="score" slot="score" color={[0.25, 0.25, 0.25]} scale={0.8} />
    </At>
    <At name="status_at" x={(WINDOW[0] - 200) / 2} y={BOARD + 30} w={200} h={10} layer={3}>
      <SlotText name="status" slot="status" color={[0.25, 0.25, 0.25]} scale={0.8} />
    </At>
    <Image name="board" texture={`${TEX}/board`} size={[BOARD, BOARD]} layer={2} anchor_from="top_middle" anchor_to="top_middle" offset={[0, 22]}>
      <Layer name="movers" slot="mover" codes={MOVER_CODES} layer={5} />
      <Layer name="finals" slot="final" codes={FINAL_CODES} layer={10} />
    </Image>
    <Dpad name="pad_left" anchor="left_middle" offset={[8, -8]} />
    <Dpad name="pad_right" anchor="right_middle" offset={[-8, -8]} />
    <Panel name="new_at" size={[PAD * 3, 20]} anchor_from="bottom_right" anchor_to="bottom_right" offset={[-8, -6]} layer={2}>
      <QuickButton name="New" slot="New" size={[PAD * 3, 20]} face="light">
        <LowLabel name="text" layer={2} text="New" localize={false} color={[0.2, 0.2, 0.2]} />
      </QuickButton>
    </Panel>
  </EntityScreen>
);

export { e2048 };
