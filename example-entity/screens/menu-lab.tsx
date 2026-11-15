// entity-menu-lab 재구성: 엔티티 상자 화면(27칸)에 이름·로어 검사용 메뉴를 그린다.
// 원본: bedrock-research/addons/entity-menu-lab (rp/ui/eml_box.json 손으로 쓴 JSON).
// 칸 역할: 1~8 아이콘 칸, 12 눌림 횟수, 13 틱 글자(화면에 안 그림), 14 STATE_ON/OFF, 15 색 이름,
// 16 "0".."10"(막대), 17 철 검 내구도, 26 버튼 표식(빠른 이동으로 빠져나가면 눌림).
import { EntityScreen, At, Label, SlotText, SlotIcon, SlotTexture, SlotBar, ShowWhen, useEntity } from "json-ui-react";
import { QuickButton, SelectCells, bind, Panel, StackPanel, Image, LowLabel } from "json-ui-react";
import type { JuiElement, JuiNode } from "json-ui-react";
import type { BindingObj, Color, Size } from "json-ui-react/controls/common.ts";
import type { ElementProps } from "json-ui-react/controls/elements.ts";

const GRAY: Color = [0.2, 0.2, 0.2];
const CAPTION: Color = [0.35, 0.35, 0.35];
const FULL: Size = ["100%", "100%"];
const WORLD_PREFIX = "textures/blocks/wool_colored_";
const CLEAN = "(#hover_text - '§o' - '§f' - '§r')";
const collect: BindingObj = bind.collection("#hover_text", "container_items", { condition: "always" });

/** 원본 칸 번호에 맞춰 미리 잡는다(스크립트는 생성된 ScreenInfo로만 읽는다). */
function Claims(): null {
  const { slots } = useEntity("menu-lab");
  slots.claim("cells", 8, 1);
  slots.claim("pressed", 1, 12);
  slots.claim("tick", 1, 13);
  slots.claim("state", 1, 14);
  slots.claim("color", 1, 15);
  slots.claim("level", 1, 16);
  slots.claim("wear", 1, 17);
  slots.claim("press", 1, 26);
  return null;
}

const slotOf = (name: string): number => useEntity("menu-lab").slots.map()[name]![0]!;

/** 설명 글자 + 값 한 줄(원본 line). */
function Line(p: { name: string; caption: string; size: [number, number]; captionW: number; children?: JuiNode }): JuiElement {
  return (
    <StackPanel name={p.name} orientation="horizontal" size={p.size}>
      <LowLabel name="caption" size={[p.captionW, p.size[1]]} layer={3} localize={false} color={CAPTION} font_scale_factor={0.7} text={p.caption} />
      {p.children}
    </StackPanel>
  );
}

const barBack = () => <Image name="back" texture="textures/ui/White" size={FULL} layer={3} color={[0.45, 0.45, 0.45]} />;

interface ConstBarProps {
  name: string;
  /** 16번 칸 줄 안이면 칸 이름, 칸 밖이면 생략. */
  slot?: string;
  /** property_bag 로 #clip_ratio 를 상수로 준다(칸을 읽지 않음). */
  ratio?: number;
  /** 보기 식으로 상수를 준다(칸 값을 읽는 바인딩이 있지만 식은 상수). */
  expr?: string;
  fillSize?: [number, number];
  pixel?: boolean;
  dir?: "left" | "right" | "up" | "down";
  size?: [number, number];
}

/**
 * 상수 clip 막대(의도한 실험): #clip_ratio 가 칸을 읽지 않아 게임에서 아무것도 그리지 않는다.
 * 솔버가 ENT-CLIP 로 알리며, buildEntityScreens({ strict: false })에서 경고로 내려간다.
 */
function ConstBar(p: ConstBarProps): JuiElement {
  const fill: ElementProps<"image"> & { $$slot?: number } = {
    name: "fill",
    texture: "textures/ui/White",
    size: p.fillSize ?? FULL,
    layer: 4,
    color: [0.1, 0.75, 0.2],
    anchor_from: "left_middle",
    anchor_to: "left_middle",
    clip_direction: p.dir ?? "left",
    clip_pixelperfect: p.pixel ?? false,
    ...(p.expr !== undefined
      ? { bindings: [collect, bind.view(p.expr, "#clip_ratio")] }
      : { property_bag: { "#clip_ratio": p.ratio ?? 0.5 } }),
    ...(p.slot !== undefined ? { $$slot: slotOf(p.slot) } : {}),
  };
  return (
    <Panel name={p.name} size={p.size ?? [98, 6]}>
      {barBack()}
      <Image {...fill} />
    </Panel>
  );
}

/** 칸 값이 아니라 칸 값으로 만든 질감 경로 글자(원본 15 path). */
function PathText(p: { name: string; slot: string; size: [number, number] }): JuiElement {
  return (
    <LowLabel
      name={p.name}
      size={p.size}
      layer={3}
      localize={false}
      color={GRAY}
      font_scale_factor={0.7}
      text="#text"
      $$slot={slotOf(p.slot)}
      bindings={[collect, bind.view(`('${WORLD_PREFIX}' + ${CLEAN})`, "#text")]}
    />
  );
}

/** 14번 칸 문구에 따라 ON/OFF 점과 글자 중 하나만 보인다(원본 flag). */
function Flag(): JuiElement {
  const part = (name: string, when: { contains: string } | { lacks: string }, color: Color, word: string) => (
    <At name={`${name}_box`} x={0} y={0} w={40} h={8}>
      <ShowWhen name={name} slot="state" when={when}>
        <Image name="dot" texture="textures/ui/White" size={[8, 8]} layer={3} color={color} anchor_from="left_middle" anchor_to="left_middle" />
        <LowLabel name="word" layer={3} localize={false} color={GRAY} font_scale_factor={0.7} text={word} anchor_from="left_middle" anchor_to="left_middle" offset={[10, 0]} />
      </ShowWhen>
    </At>
  );
  return (
    <StackPanel name="flag" orientation="horizontal" size={[98, 8]}>
      {part("yes", { contains: "STATE_ON" }, [0.1, 0.75, 0.2], "ON")}
      {part("no", { lacks: "STATE_ON" }, [0.85, 0.15, 0.15], "OFF")}
    </StackPanel>
  );
}

const bar = (name: string, size: [number, number] = [98, 6]) => ({ name, size });

function Lines(): JuiElement {
  const row = (name: string, caption: string, children: JuiNode) => (
    <Line name={name} caption={caption} size={[160, 10]} captionW={62}>
      {children}
    </Line>
  );
  return (
    <At name="lines" x={8} y={42} w={160} h={140} layer={1}>
      <StackPanel name="rows" orientation="vertical" size={[160, 140]}>
        <Line name="l12" caption="Slot 12 raw" size={[160, 12]} captionW={62}>
          <SlotText name="v" slot="pressed" raw size={[98, 12]} scale={0.7} color={GRAY} layer={3} />
        </Line>
        <Line name="l14" caption="Slot 14 gate" size={[160, 12]} captionW={62}>
          <Flag />
        </Line>
        <Line name="l15" caption="Slot 15 texture" size={[160, 12]} captionW={62}>
          <SlotTexture name="v" slot="color" prefix={WORLD_PREFIX} size={[10, 10]} />
        </Line>
        {/* b1~b6: 칸을 읽지 않는 상수 막대. 게임에서 비어 보이는 것이 정상(실험). */}
        {row("b1", "Bag 0", <ConstBar name="v" slot="level" ratio={0} />)}
        {row("b2", "Bag .5 fixed size", <ConstBar name="v" slot="level" fillSize={[98, 6]} />)}
        {row("b3", "Bag .5 pixel", <ConstBar name="v" slot="level" pixel />)}
        {row("b4", "Bag .5 right", <ConstBar name="v" slot="level" dir="right" />)}
        {row("b5", "View (1 - 1)", <ConstBar name="v" slot="level" expr="(1 - 1)" />)}
        {row("b6", "View (5 * .1)", <ConstBar name="v" slot="level" expr="(5 * .1)" />)}
        {/* b7, b8: 칸 값을 읽어 실제로 그려지는 막대. */}
        {row(
          "b7",
          "Slot 16 name",
          <Panel {...bar("v")}>
            {barBack()}
            <SlotBar name="fill" slot="level" size={FULL} per={10} texture="textures/ui/White" color={[0.1, 0.75, 0.2]} />
          </Panel>,
        )}
        {row(
          "b8",
          "Slot 17 dur",
          <Panel {...bar("v")}>
            {barBack()}
            <SlotBar name="fill" slot="wear" source="durability" per={250} size={FULL} texture="textures/ui/White" color={[0.1, 0.75, 0.2]} />
          </Panel>,
        )}
      </StackPanel>
    </At>
  );
}

function Side(): JuiElement {
  return (
    <At name="side" x={174} y={112} w={82} h={60} layer={1}>
      <StackPanel name="rows" orientation="vertical" size={[82, 60]}>
        <Line name="r15" caption="15 raw" size={[82, 12]} captionW={30}>
          <SlotText name="v" slot="color" raw size={[52, 12]} scale={0.7} color={GRAY} layer={3} />
        </Line>
        <Line name="r16" caption="16 raw" size={[82, 12]} captionW={30}>
          <SlotText name="v" slot="level" raw size={[52, 12]} scale={0.7} color={GRAY} layer={3} />
        </Line>
        <Line name="p15" caption="15 path" size={[82, 30]} captionW={30}>
          <PathText name="v" slot="color" size={[52, 30]} />
        </Line>
      </StackPanel>
    </At>
  );
}

/** 고른 칸의 큰 아이콘과 이름(원본 detail). */
function Detail(i: number): JuiElement {
  return (
    <Panel name="d" size={[80, 86]} anchor_from="top_left" anchor_to="top_left">
      <Panel name="frame" size={[52, 52]} anchor_from="top_left" anchor_to="top_left">
        <Image name="bg" texture="textures/ui/cell_image" size={FULL} />
        <SlotIcon name="big" slot="cells" index={i} size={[44, 44]} />
      </Panel>
      <At name="nm" x={0} y={56}>
        <SlotText name="name" slot="cells" index={i} raw size={[80, 30]} scale={0.7} color={GRAY} layer={3} />
      </At>
    </Panel>
  );
}

const menuLab: JuiElement = (
  <EntityScreen id="menu-lab" code="ml" title="Entity Menu Lab" size={[262, 196]} titleAnchor="top_middle">
    <Claims />
    <At name="cells_at" x={8} y={20} w={144} h={18} layer={1}>
      <SelectCells name="cells" slot="cells" count={8} detailAt={[166, 0]} detail={Detail} />
    </At>
    <Lines />
    <Side />
    <At name="outside_label_at" x={174} y={168}>
      <Label name="outside_label" text="Bag .5 outside" color={CAPTION} scale={0.7} layer={3} />
    </At>
    <At name="outside_bar_at" x={174} y={178} w={80} h={6} layer={1}>
      <ConstBar name="outside_bar" ratio={0.5} size={[80, 6]} />
    </At>
    <At name="press_at" x={8} y={172} w={144} h={18} layer={1}>
      <QuickButton name="press" slot="press" size={[144, 18]} face="dark" layer={2}>
        <LowLabel name="label" layer={2} localize={false} color={[1, 1, 1]} shadow font_scale_factor={0.8} text="Press: rename slot 12" />
      </QuickButton>
    </At>
  </EntityScreen>
);

export default menuLab;
