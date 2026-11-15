// 키트 갤러리: 모든 키트 컴포넌트를 네임스페이스 파일 하나에 담는다.
import { render, toEntry } from "../../src/render.ts";
import { E } from "../../src/expr.ts";
import { Image, Label, Panel } from "../../src/controls/index.ts";
import { collectKit } from "../../src/kit/core.tsx";
import {
  Align, Box, Center, Column, GridLayout, Overlay, Padding, Row, ScrollArea, Spacer,
} from "../../src/kit/layout.tsx";
import { Divider, Frame, Icon, ItemIcon, ProgressBar, Text } from "../../src/kit/visual.tsx";
import { BindText, Case, Item, ItemText, KeyedFactory, Repeat, ShowIf, Switch } from "../../src/kit/data.tsx";
import { PushButton, Radio, RadioGroup, SliderControl, TabGroup, TextInput, ToggleBox } from "../../src/kit/input.tsx";
import { Animated, FadeIn, FadeOut, Pulse, SlideIn, defineAnims, takeAnims } from "../../src/kit/anim.tsx";
import type { Diagnostic } from "../../src/lint.ts";
import type { JsonObject, JuiNode } from "../../src/types.ts";

/** 갤러리 네임스페이스 이름 */
export const GALLERY_NS = "kit_gallery";
const NS = GALLERY_NS;
const img = (n: string) => <Image name={n} texture={`textures/ui/${n}`} />;

/** 정의 이름 -> 본문. 모든 키트 컴포넌트가 한 번 이상 쓰인다 */
export function galleryDefs(): Record<string, JuiNode> {
  const refs = defineAnims(NS, { blink: { anim_type: "wait", duration: 1 } });
  const tabs = [
    { id: "a", on: img("tab_on"), off: img("tab_off"), pane: <Label name="pane_a" text="A" /> },
    { id: "b", on: img("tab_on"), off: img("tab_off"), pane: <Label name="pane_b" text="B" /> },
  ];
  return {
    layout: (
      <Column name="layout" gap={2}>
        <Row name="row" gap={2} align="center"><Box name="b1" w={8} h={8} /><Spacer name="sp" fill /><Box name="b2" w={8} h={8} /></Row>
        <Overlay name="overlay"><Label name="o1" text="a" /><Label name="o2" text="b" /></Overlay>
        <Align name="align" to="top_right"><Label name="al" text="r" /></Align>
        <Center name="center"><Label name="ce" text="c" /></Center>
        <Padding name="padding" inset={[4, 2, 6, 2]}><Label name="pa" text="p" /></Padding>
        <ScrollArea name="scroll" size={[100, 80]}><Label name="sc" text="s" /></ScrollArea>
        <GridLayout name="grid" cols={2} cell={[10, 10]}><Label name="g1" text="1" /><Label name="g2" text="2" /></GridLayout>
        <GridLayout name="grid_bound" cols={2} cell={[10, 10]} template={`${NS}.cell_a`} countFrom="#count" />
      </Column>
    ),
    visual: (
      <Column name="visual">
        <Text name="t1" text="안녕" />
        <Text name="t2" text={{ bind: "#title" }} />
        <Icon name="icon" texture="textures/ui/a" size={[8, 8]} />
        <Frame name="frame" texture="textures/ui/a" size={[50, 50]}><Icon name="fi" texture="textures/ui/b" size={[4, 4]} /></Frame>
        <ProgressBar name="bar" ratio={E.num(1).sub(E.prop("#v").mul(E.num(0.1)))} source="#v" size={[100, 4]} />
        <Divider name="divider" />
      </Column>
    ),
    data: (
      <Column name="data">
        <Repeat name="list" collection="form_buttons" layout="stack-v" count={2} item={(i) => <ItemText name={`t${i}`} prop="#form_button_text" />} />
        <Repeat name="icons" collection="form_buttons" layout="grid" cols={2} count={2} item={(i) => <ItemIcon name={`ic${i}`} />} />
        <Repeat name="items" collection="form_buttons" layout="stack-h" count={1} item={() => <Item name="it"><BindText name="bt" from="#form_button_text" /></Item>} />
        <ShowIf name="show" when={{ has: "#t", marker: "§a" }}><Label name="sl" text="x" /></ShowIf>
        <Switch name="sw" on="#mode"><Case name="c1" value="on"><Label name="s1" text="1" /></Case><Case name="c2" value="off"><Label name="s2" text="2" /></Case></Switch>
        <BindText name="bind" from="#title_text" />
        <KeyedFactory name="kf" size={[20, 20]} variants={{ a: `@${NS}.cell_a`, b: `@${NS}.cell_b` }} />
      </Column>
    ),
    input: (
      <Column name="input">
        <PushButton name="push" size={[10, 10]} face={img("face")} />
        <ToggleBox name="tgl" size={[10, 10]} on={img("on")} off={img("off")} hover={img("hov")} />
        <RadioGroup name="rg" group="g"><Radio name="r0" index={0} size={[5, 5]} on={img("on")} off={img("off")} /><Radio name="r1" index={1} size={[5, 5]} on={img("on")} off={img("off")} /></RadioGroup>
        <TabGroup name="tabs" size={[100, 60]} tabs={tabs} />
        <TextInput name="ti" size={[80, 12]} />
        <SliderControl name="sl" size={[100, 8]} sliderName="vol" />
      </Column>
    ),
    anim: (
      <Column name="anim">
        <FadeIn name="fi" ns={NS}><Label name="a1" text="in" /></FadeIn>
        <FadeOut name="fo" ns={NS}><Label name="a2" text="out" /></FadeOut>
        <SlideIn name="si" ns={NS} from={[-20, 0]}><Label name="a3" text="slide" /></SlideIn>
        <Pulse name="pu" ns={NS}><Label name="a4" text="pulse" /></Pulse>
        <Animated name="an" anims={[refs.blink]}><Label name="a5" text="blink" /></Animated>
      </Column>
    ),
    cell_a: <Panel name="cell_a" size={[20, 20]} />,
    cell_b: <Panel name="cell_b" size={[20, 20]} />,
  };
}

/** 갤러리 네임스페이스 파일(애니메이션 정의 포함)과 수집한 진단 */
export function buildGallery(): { file: JsonObject; diagnostics: Diagnostic[] } {
  takeAnims(); // 이전 호출이 남긴 정의를 비운다
  const { result, diagnostics } = collectKit(() => {
    const file: JsonObject = { namespace: NS };
    for (const [name, body] of Object.entries(galleryDefs())) {
      const n = render(body)[0]!;
      Object.assign(file, toEntry({ ...n, name }));
    }
    return file;
  });
  for (const [k, v] of Object.entries(takeAnims())) result[k.slice(NS.length + 1)] = v;
  return { file: result, diagnostics };
}

/** 배치 쇼케이스: 잘못된 배치(Column 안 collection_index 라벨, Row 안 offset 이미지) */
export function invalidArrangement(): JuiNode {
  return (
    <Repeat name="rep" collection="form_buttons" layout="stack-v" count={1} item={() => (
      // @ts-expect-error COL-02: 타입이 막는 배치를 일부러 만들어 키트가 고치는지 보인다
      <Column name="col"><Label name="bad" text="x" collection_index={0} /></Column>
    )} />
  );
}
export function invalidRow(): JuiNode {
  return <Row name="row"><Image name="img" texture="textures/ui/a" size={[4, 4]} offset={[2, 0]} /></Row>;
}
/** 컬렉션 밖 ItemText: strict면 예외 */
export function outsideCollection(): JuiNode {
  return <ItemText name="t" prop="#x" />;
}
