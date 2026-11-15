// 매치메이킹(모의) 화면: 게임 4줄 + 오른쪽 상세 칸 + 준비 확인 막대 + 인원 점 + 주/보조 버튼.
// 원본: bedrock-research entity-matchmaking(tools/gen-ui.mjs). 칸 지도는 원본과 같다.
//  1~20: 줄 g(0~3)마다 5칸 [버튼, 이름, 부제, 접속자, 상태키 S/Q]   21~28: 게임, 설명, 머리, 타이머, 예상, 인원, 소식, 아래글
//  29/30: 주/보조 버튼   31: 준비 막대 키(Ta/Tb)   32~41: 점 10개(E/F/Y/A/X)   42/43: 버튼 글자
import { At, EntityScreen, SlotText, useEntity, Panel, StackPanel, Image, KeyedCell, QuickButton, anim } from "json-ui-react";
import type { JuiElement } from "json-ui-react";

const TEXTURES = "textures/ui/emm";
const READY_SECONDS = 10;
const GAMES = 4;
const PIPS = 10;
const ROW_SIZE = 5;
const WINDOW: [number, number] = [312, 176];
const ROW: [number, number] = [120, 34];
const ROW_GAP = 3;
const LIST: [number, number] = [8, 22];
const DETAIL_X = 136;
const DETAIL_W = 168;
const PIP = 14;
const PIP_CELL = 16;
const BAR: [number, number] = [DETAIL_W, 4];
const BUTTON: [number, number] = [80, 20];
const TEXT: [number, number, number] = [0.25, 0.25, 0.25];

/** 칸 이름 하나를 정해진 번호에 잡는다(원본 칸 지도와 같게 고정). */
function claimAll(): void {
  const { slots } = useEntity("matchmaking");
  for (let g = 0; g < GAMES; g++) slots.claim(`row${g}`, ROW_SIZE, 1 + g * ROW_SIZE);
  const names = ["game", "description", "header", "timer", "estimate", "count", "feed", "footer", "primary", "secondary", "ready"];
  names.forEach((n, i) => slots.claim(n, 1, 21 + i));
  slots.claim("pips", PIPS, 32);
  slots.claim("primary_label", 1, 42);
  slots.claim("secondary_label", 1, 43);
}

interface TxtProps {
  name: string;
  slot: string;
  index?: number;
  x: number;
  y: number;
  w: number;
  h: number;
  scale?: number;
  align?: string;
}

/** 칸 글자(원본처럼 font_scale_factor로 나온다). */
const Txt = (p: TxtProps): JuiElement => (
  <SlotText name={p.name} slot={p.slot} index={p.index} size={[p.w, p.h]} scale={p.scale} align={p.align} color={TEXT} layer={4} />
);

const Row = ({ g }: { g: number }): JuiElement => {
  const ctx = useEntity("Row");
  const ns = ctx.ns.name;
  const slot = `row${g}`;
  const pulse = anim("pulse_out", { anim_type: "alpha", easing: "in_sine", from: 1, to: 0.25, duration: 0.6, next: `@${ns}.pulse_in` });
  anim("pulse_in", { anim_type: "alpha", easing: "out_sine", from: 0.25, to: 1, duration: 0.6, next: `@${ns}.pulse_out` });
  const frame = (texture: string, dot?: boolean) => (
    <Panel name="state" size={ROW}>
      <Image name="frame" texture={`${TEXTURES}/${texture}`} size={ROW} layer={1} />
      {dot ? (
        <Image name="dot" texture={`${TEXTURES}/dot`} size={[6, 6]} layer={2} anchor_from="top_right" anchor_to="top_right" offset={[-6, 6]} anims={[pulse]} />
      ) : null}
    </Panel>
  );
  return (
    <At name={`row${g}`} x={LIST[0]} y={LIST[1] + g * (ROW[1] + ROW_GAP)} w={ROW[0]} h={ROW[1]} layer={2}>
      <At name="button_at" x={0} y={0} w={ROW[0]} h={ROW[1]} layer={2}>
        <QuickButton name="game" slot={slot} index={0} size={ROW} face="light" />
      </At>
      <At name="state_at" x={0} y={0} w={ROW[0]} h={ROW[1]} layer={3}>
        <KeyedCell name="state" slot={slot} index={4} size={ROW} variants={{ S: frame("row_selected"), Q: frame("row_queued", true) }} />
      </At>
      <Txt name="name" slot={slot} index={1} x={6} y={4} w={ROW[0] - 16} h={10} />
      <Txt name="subtitle" slot={slot} index={2} x={6} y={15} w={ROW[0] - 10} h={9} scale={0.7} />
      <Txt name="online" slot={slot} index={3} x={6} y={24} w={ROW[0] - 10} h={9} scale={0.7} />
    </At>
  );
};

/** 칸 글자를 (x,y)에 놓는다. */
const T = (p: TxtProps): JuiElement => (
  <At name={`${p.name}_at`} x={p.x} y={p.y} w={p.w} h={p.h} layer={4}>
    <Txt {...p} x={0} y={0} />
  </At>
);

function Pips(): JuiElement {
  const pop = anim("pop", { anim_type: "size", easing: "out_back", from: [0, 0], to: [PIP, PIP], duration: 0.18 });
  const body = (texture: string, animated: boolean) => (
    <Panel name="pip" size={[PIP_CELL, PIP]}>
      <Panel name="holder" size={[PIP, PIP]} anchor_from="top_left" anchor_to="top_left">
        <Image name="icon" texture={`${TEXTURES}/${texture}`} size={[PIP, PIP]} layer={1} anims={animated ? [pop] : undefined} />
      </Panel>
    </Panel>
  );
  const variants = { E: body("pip_empty", false), F: body("pip_filled", true), Y: body("pip_you", true), A: body("pip_accepted", true), X: body("pip_declined", true) };
  // 첫 칸이 정의를 만들고 나머지 칸은 같은 정의를 가리킨다.
  const refs = Object.fromEntries(Object.keys(variants).map((k) => [k, `pip0_${k}`]));
  const left = Math.floor((DETAIL_W - PIPS * PIP_CELL + (PIP_CELL - PIP)) / 2);
  return (
    <At name="pips" x={DETAIL_X + left} y={102} w={PIPS * PIP_CELL} h={PIP} layer={3}>
      <StackPanel name="pip_row" orientation="horizontal" size={[PIPS * PIP_CELL, PIP]}>
        {Array.from({ length: PIPS }, (_, k) => (
          <KeyedCell name={`pip${k}`} slot="pips" index={k} size={[PIP_CELL, PIP]} variants={k === 0 ? variants : refs} />
        ))}
      </StackPanel>
    </At>
  );
}

/** 준비 확인 막대: 키가 Ta/Tb로 바뀔 때마다 새로 만들어져 10초 줄어드는 애니메이션이 다시 돈다. */
function ReadyBar(): JuiElement {
  const drain = anim("ready_drain", { anim_type: "size", from: BAR, to: [0, BAR[1]], duration: READY_SECONDS });
  const body = (
    <Panel name="ready_body" size={BAR}>
      <Image name="track" texture={`${TEXTURES}/bar_track`} size={BAR} layer={1} />
      <Image name="fill" texture={`${TEXTURES}/bar_fill`} size={BAR} layer={2} anchor_from="top_left" anchor_to="top_left" anims={[drain]} />
    </Panel>
  );
  return (
    <At name="ready_at" x={DETAIL_X} y={142} w={BAR[0]} h={BAR[1]} layer={3}>
      <KeyedCell name="ready" slot="ready" size={BAR} variants={{ Ta: body, Tb: "ready_Ta" }} />
    </At>
  );
}

/** 주/보조 버튼: 스크립트가 라벨이 빈 버튼을 끄면 버튼 칸이 비어 버튼이 숨는다(hideWhenEmpty, mm_hidden_buttons). 라벨 칸도 비어 글자는 안 그려진다. */
function Action(p: { name: "primary" | "secondary"; x: number }): JuiElement {
  return (
    <At name={`${p.name}_at`} x={p.x} y={150} w={BUTTON[0]} h={BUTTON[1]} layer={2}>
      <QuickButton name={p.name} slot={p.name} size={BUTTON} face="light" hideWhenEmpty />
      <T name={`${p.name}_label`} slot={`${p.name}_label`} x={0} y={6} w={BUTTON[0]} h={10} align="center" />
    </At>
  );
}

function Body(): JuiElement {
  claimAll();
  const d = (y: number, h: number) => ({ x: DETAIL_X, y, w: DETAIL_W, h });
  return (
    <Panel name="matchmaking_body" size={WINDOW}>
      <T name="footer" slot="footer" x={70} y={8} w={190} h={9} scale={0.7} />
      {Array.from({ length: GAMES }, (_, g) => (
        <Row g={g} />
      ))}
      <T name="game" slot="game" {...d(24, 10)} scale={1.2} align="center" />
      <T name="description" slot="description" {...d(37, 18)} scale={0.7} align="center" />
      <T name="header" slot="header" {...d(58, 10)} align="center" />
      <T name="timer" slot="timer" {...d(70, 18)} scale={1.8} align="center" />
      <T name="estimate" slot="estimate" {...d(90, 9)} scale={0.7} align="center" />
      <Pips />
      <T name="count" slot="count" {...d(119, 9)} scale={0.8} align="center" />
      <T name="feed" slot="feed" {...d(129, 9)} scale={0.7} align="center" />
      <ReadyBar />
      <Action name="secondary" x={DETAIL_X} />
      <Action name="primary" x={DETAIL_X + DETAIL_W - BUTTON[0]} />
    </Panel>
  );
}

export const matchmaking: JuiElement = (
  <EntityScreen id="matchmaking" code="mm" title="Minigames" size={WINDOW}>
    <Body />
  </EntityScreen>
);
