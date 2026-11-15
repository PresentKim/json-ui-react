// 연구 화면(entity-research-screen 재현): 243칸, 탭 2개(To do / Done), 탭마다 8x6 PickGrid + 쪽 넘김 + 상세 블록.
import { At, Label, SlotCount, SlotIcon, SlotText, ShowWhen, EntityScreen, useEntity, Panel, StackPanel, Image, EntityPager, EntityTabs, PickGrid, QuickButton } from "json-ui-react";
import type { JuiElement } from "json-ui-react";

const PAGE = 48;
const DETAIL_SLOTS = 22;
// 상세 칸 안의 순번(+0 아이콘/이름, +1 상태, +2 설명, +3..10 재료, +11..18 보상, +19 시작 버튼, +20 완료 표시, +21 메시지)
const D = { name: 0, status: 1, desc: 2, mats: 3, rewards: 11, action: 19, done: 20, message: 21 };
const COUNT = 8;

/** 원본 칸 번호와 맞게 칸 묶음을 먼저 잡는다(렌더 결과는 없음). */
function Claims(): JuiElement {
  const { slots } = useEntity("Claims");
  slots.claim("cells0", PAGE, 1);
  slots.claim("cells1", PAGE, 49);
  slots.claim("heads", 2, 97);
  slots.claim("pager0", 2, 99);
  slots.claim("pager1", 2, 101);
  slots.claim("detail0", DETAIL_SLOTS, 103);
  slots.claim("detail1", DETAIL_SLOTS, 125);
  slots.claim("picks0", PAGE, 147);
  slots.claim("picks1", PAGE, 195);
  return null as unknown as JuiElement;
}

const DARK: [number, number, number] = [0.2, 0.2, 0.2];

/**
 * 칸이 차 있을 때만 글자를 그린다. 라이브러리 SlotText를 바로 쓰면 label에 collection_index가 남아 COL-02 경고가 나므로
 * ShowWhen(칸 읽는 패널)이 인덱스를 쥐고 label은 물려받게 한다(라이브러리 틈, 로컬 우회).
 */
function TextIn(p: { name: string; slot: string; index: number; size: [number, number] }) {
  return (
    <ShowWhen name={`${p.name}_f`} slot={p.slot} index={p.index} when="filled">
      <SlotText name={p.name} slot={p.slot} index={p.index} size={p.size} color={DARK} />
    </ShowWhen>
  );
}

/** 재료/보상 칸 하나: 칸이 차 있을 때만 배경 + 아이콘 + 개수. */
function StackCell(p: { name: string; slot: string; index: number }) {
  return (
    <Panel name={p.name} size={[18, 18]}>
      <ShowWhen name="f" slot={p.slot} index={p.index} when="filled">
        <Image name="bg" texture="textures/ui/cell_image" size={["100%", "100%"]} />
        <SlotIcon name="icon" slot={p.slot} index={p.index} size={16} />
        <SlotCount name="count" slot={p.slot} index={p.index} />
      </ShowWhen>
    </Panel>
  );
}

function StackRow(p: { name: string; title: string; y: number; slot: string; base: number }) {
  return (
    <At name={p.name} x={0} y={p.y} w={150} h={30}>
      <ShowWhen name="area" slot={p.slot} index={p.base} when="filled">
        <Label name="head" text={p.title} color={[0.35, 0.35, 0.35]} />
        <StackPanel name="row" orientation="horizontal" size={[144, 18]} anchor_from="top_left" anchor_to="top_left" offset={[0, 10]}>
          {Array.from({ length: COUNT }, (_, j) => <StackCell name={`${p.name}${j}`} slot={p.slot} index={p.base + j} />)}
        </StackPanel>
      </ShowWhen>
    </At>
  );
}

/** 시작 버튼 면: 칸 글자가 READY면 초록 "Start research", WAIT면 회색 "Not enough materials". */
function StartFace(p: { slot: string }) {
  const i = D.action;
  return (
    <>
      <ShowWhen name="ready" slot={p.slot} index={i} when={{ contains: "READY" }}>
        <Image name="bg" texture="textures/ui/ers/button" size={["100%", "100%"]} color={[0.45, 1, 0.45]} />
        <Label name="t" text="Start research" color={[1, 1, 1]} shadow layer={2} />
      </ShowWhen>
      <ShowWhen name="wait" slot={p.slot} index={i} when={{ contains: "WAIT" }}>
        <Image name="bg" texture="textures/ui/ers/button" size={["100%", "100%"]} color={[0.75, 0.75, 0.75]} />
        <Label name="t" text="Not enough materials" color={[0.6, 0.6, 0.6]} layer={2} />
      </ShowWhen>
    </>
  );
}

/** 오른쪽 상세 블록(탭마다 칸 묶음 detail<t>). */
function Detail(p: { t: number }) {
  const s = `detail${p.t}`;
  return (
    <>
      <ShowWhen name="placeholder" slot={s} index={D.name} when="empty">
        <Label name="t" text="Pick a research." color={[0.4, 0.4, 0.4]} />
      </ShowWhen>
      <ShowWhen name="card" slot={s} index={D.name} when="filled">
        <Panel name="icon" size={[28, 28]} anchor_from="top_left" anchor_to="top_left">
          <Image name="bg" texture="textures/ui/cell_image" size={["100%", "100%"]} />
          <SlotIcon name="i" slot={s} index={D.name} size={22} />
        </Panel>
        <At name="nm" x={32} y={3} w={118} h={10}>
          <SlotText name="name" slot={s} index={D.name} size={[118, 10]} color={DARK} scale={0.8} />
        </At>
      </ShowWhen>
      <At name="status" x={32} y={16} w={118} h={10}>
        <TextIn name="t" slot={s} index={D.status} size={[118, 10]} />
      </At>
      <At name="desc" x={0} y={31} w={150} h={32}>
        <TextIn name="t" slot={s} index={D.desc} size={[150, 32]} />
      </At>
      <StackRow name="mats" title="Materials" y={64} slot={s} base={D.mats} />
      <StackRow name="rewards" title="Rewards" y={94} slot={s} base={D.rewards} />
      {p.t === 0 ? (
        <At name="action" x={0} y={124} w={150} h={18}>
          <QuickButton name="start" slot={s} index={D.action} size={[150, 18]} face="none">
            <StartFace slot={s} />
          </QuickButton>
        </At>
      ) : (
        <At name="done_note" x={0} y={124} w={150} h={18}>
          <ShowWhen name="note" slot={s} index={D.done} when="filled">
            <Image name="bg" texture="textures/ui/ers/button_pressed" size={["100%", "100%"]} />
            <Label name="t" text="Researched" color={[0.75, 0.95, 0.75]} layer={2} />
          </ShowWhen>
        </At>
      )}
    </>
  );
}

function Box(p: { name: string; x: number; y: number; w: number; h: number; children?: any }) {
  return (
    <At name={p.name} x={p.x} y={p.y} w={p.w} h={p.h} layer={1}>
      <Image name="bg" texture="textures/ui/ers/panel" size={["100%", "100%"]} />
      {p.children}
    </At>
  );
}

/** 탭 하나의 판: 왼쪽(격자 + 쪽 넘김), 메시지 줄, 오른쪽(상세). 창 좌표 기준(탭 판이 x=8에서 시작해서 -8 보정). */
function TabPane(p: { t: number }) {
  const t = p.t;
  return (
    <At name={`pane${t}`} x={-8} y={0}>
      <Box name="left" x={6} y={22} w={152} h={136}>
        <At name="g" x={4} y={4} w={144} h={108}>
          <PickGrid name={`pick${t}`} cells={`cells${t}`} picks={`picks${t}`} rows={6} cols={8} chosen="SELECTED" />
        </At>
        <At name="pg" x={4} y={114} w={144} h={18}>
          <EntityPager name={`pager${t}`} slot={`pager${t}`} />
        </At>
      </Box>
      <At name="msg" x={6} y={161} w={152} h={20} layer={3}>
        <TextIn name="t" slot={`detail${t}`} index={D.message} size={[152, 20]} />
      </At>
      <Box name="right" x={162} y={22} w={158} h={150}>
        <At name="detail" x={4} y={4} w={150} h={142}>
          <Detail t={t} />
        </At>
      </Box>
    </At>
  );
}

export const research = (
  <EntityScreen id="research" code="rs" title="Research" titleAnchor="top_middle" size={[326, 186]} window={{ offset: [0, 8] }}>
    <Claims />
    <Image name="bevel" texture="textures/ui/ers/panel_bevel" size={["100%", "100%"]} />
    <At name="tabs_at" x={8} y={-22} w={318} h={208} layer={3}>
      <EntityTabs name="ers" slot="heads" tabs={[{ children: <TabPane t={0} /> }, { children: <TabPane t={1} /> }]} />
    </At>
  </EntityScreen>
);
