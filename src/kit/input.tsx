// 입력 키트: 버튼, 토글, 라디오, 탭, 입력창, 슬라이더. 자식은 place()를 거쳐 배치 규칙을 적용한다.
import type { JuiElement, JuiNode } from "../types.ts";
import type { Size } from "../controls/common.ts";
import type { ButtonMapping } from "../controls/input.ts";
import { Button, EditBox, Image, Label, Panel, Slider, SliderBox, StackPanel, Toggle } from "../controls/components.tsx";
import { bind } from "../bind.ts";
import { diag } from "../rules/registry.ts";
import { currentCollection, place, useKit } from "./core.tsx";

const FULL: Size = ["100%", "100%"];
const WHITE = "textures/ui/White";

/** 기본 클릭 매핑(INP-02): 선택과 확인 버튼 */
const DEFAULT_MAPPINGS: ButtonMapping[] = [
  { from_button_id: "button.menu_select", to_button_id: "button.menu_select", mapping_type: "pressed" },
  { from_button_id: "button.menu_ok", to_button_id: "button.menu_ok", mapping_type: "focused" },
];

/** 효과음 설정 */
export interface Sound {
  /** 소리 이름 */
  name: string;
  /** 음량 */
  volume?: number;
  /** 음높이 */
  pitch?: number;
}
const CLICK: Sound = { name: "random.click", volume: 1, pitch: 1 };

/** 상태 면 루트에서 visible을 떼고 INP-06 info를 남긴다(가시성은 버튼 상태 머신 소유). */
function stripVisible(el: JuiElement, path: string): JuiElement {
  if (el.props.visible === undefined) return el;
  const { visible: _v, ...rest } = el.props;
  useKit().diagnostics.push(diag("INP-06", "info", path, "상태 컨트롤의 visible을 제거했다. 가시성은 버튼 상태 머신이 소유한다."));
  return { ...el, props: rest };
}

/** 상태 이름을 가진 면 패널을 만든다. 내용은 place()로 놓고 루트 visible을 뗀다. */
function face(owner: string, key: string, content: JuiNode): JuiElement {
  const els = place({ type: "panel", name: key }, content).map((e) => stripVisible(e, `${owner}/${key}`));
  return (
    <Panel name={key} size={FULL}>
      {els}
    </Panel>
  );
}

// ---------------------------------------------------------------- PushButton

export interface PushButtonProps {
  /** 컨트롤 이름 */
  name: string;
  /** 버튼 크기 */
  size: Size;
  /** 기본 면(없으면 children을 쓴다) */
  face?: JuiNode;
  /** 호버 면(없으면 기본 면) */
  hoverFace?: JuiNode;
  /** 눌림 면(없으면 호버 면) */
  pressedFace?: JuiNode;
  /** 면이 따로 없을 때 세 상태에 공통으로 쓰는 내용 */
  children?: JuiNode;
  /** 클릭이 보내는 버튼 id(INP-02, 기본 button.menu_select) */
  to?: string;
  /** 직접 지정하는 버튼 매핑(INP-02, 주면 to를 무시) */
  mappings?: ButtonMapping[];
  /** 효과음(false면 끔) */
  sound?: Sound | false;
  /** 그리기 순서 */
  layer?: number;
  /** 부모 앵커 기준 오프셋 */
  offset?: Size;
}

/** 기본/호버/눌림 면을 가진 버튼. 상태 면에는 visible을 두지 않는다(INP-06). */
export function PushButton(p: PushButtonProps): JuiElement {
  const base = p.face ?? p.children;
  const hover = p.hoverFace ?? base;
  const pressed = p.pressedFace ?? p.hoverFace ?? base;
  const mappings = p.mappings ?? (p.to ? DEFAULT_MAPPINGS.map((m) => ({ ...m, to_button_id: p.to! })) : DEFAULT_MAPPINGS);
  const snd = p.sound === undefined ? CLICK : p.sound;
  return (
    <Button
      name={p.name}
      size={p.size}
      layer={p.layer}
      offset={p.offset}
      default_control="default"
      hover_control="hover"
      pressed_control="pressed"
      sound_name={snd ? snd.name : undefined}
      sound_volume={snd ? snd.volume ?? 1 : undefined}
      sound_pitch={snd ? snd.pitch ?? 1 : undefined}
      button_mappings={mappings}
    >
      {face(p.name, "default", base)}
      {face(p.name, "hover", hover)}
      {face(p.name, "pressed", pressed)}
    </Button>
  );
}

// ---------------------------------------------------------------- ToggleBox / Radio

export interface ToggleFaces {
  /** 켜진 면 */
  on: JuiNode;
  /** 꺼진 면 */
  off: JuiNode;
  /** 호버 면(켜짐·꺼짐 호버 면이 따로 없을 때 둘 다에 쓴다) */
  hover?: JuiNode;
  /** 켜진 호버 면 */
  onHover?: JuiNode;
  /** 꺼진 호버 면 */
  offHover?: JuiNode;
}

export interface ToggleBoxProps extends ToggleFaces {
  /** 컨트롤 이름 */
  name: string;
  /** 토글 크기 */
  size: Size;
  /** 토글 그룹 이름(주면 같은 이름끼리 묶인다) */
  toggleName?: string;
  /** 그리기 순서 */
  layer?: number;
  /** 부모 앵커 기준 오프셋 */
  offset?: Size;
  /** 라디오 그룹 옵션(INP-12, INP-35) */
  radio?: { forcedIndex: number | string; defaultSelected: number | string };
}

/** 면 네 장(on/off/on_hover/off_hover)을 만들고 여덟 상태 키를 모두 채우는 토글(INP-10, INP-11). */
export function ToggleBox(p: ToggleBoxProps): JuiElement {
  const onHover = p.onHover ?? p.hover ?? p.on;
  const offHover = p.offHover ?? p.hover ?? p.off;
  const radio = p.radio
    ? ({ radio_toggle_group: true, toggle_name: p.toggleName ?? p.name, toggle_group_forced_index: p.radio.forcedIndex, toggle_group_default_selected: p.radio.defaultSelected } as const)
    : p.toggleName
      ? ({ toggle_name: p.toggleName } as const)
      : {};
  return (
    <Toggle
      name={p.name}
      size={p.size}
      layer={p.layer}
      offset={p.offset}
      {...radio}
      sound_name={CLICK.name}
      sound_volume={1}
      sound_pitch={1}
      toggle_on_button="toggle.toggle_on"
      toggle_off_button="toggle.toggle_off"
      button_mappings={DEFAULT_MAPPINGS}
      checked_control="on"
      checked_hover_control="on_hover"
      checked_locked_control="on"
      checked_locked_hover_control="on_hover"
      unchecked_control="off"
      unchecked_hover_control="off_hover"
      unchecked_locked_control="off"
      unchecked_locked_hover_control="off_hover"
    >
      {face(p.name, "on", p.on)}
      {face(p.name, "off", p.off)}
      {face(p.name, "on_hover", onHover)}
      {face(p.name, "off_hover", offHover)}
    </Toggle>
  );
}

/** 렌더 중인 라디오 그룹 스택(place가 동기로 자식을 렌더하므로 push/pop으로 충분하다) */
const groups: { name: string; selected: number | string }[] = [];

export interface RadioGroupProps {
  /** 컨트롤 이름 */
  name: string;
  /** toggle_name: 같은 그룹 이름(INP-12) */
  group: string;
  /** 처음 선택되는 번호(기본 0, INP-35) */
  selected?: number | string;
  /** 배치 방향(기본 horizontal) */
  orientation?: "horizontal" | "vertical";
  /** 그룹 크기 */
  size?: Size;
  /** Radio 자식들 */
  children?: JuiNode;
}

/** 같은 toggle_name을 공유하는 라디오 토글 묶음. 자식 Radio가 그룹 이름과 기본 선택을 물려받는다. */
export function RadioGroup(p: RadioGroupProps): JuiElement {
  groups.push({ name: p.group, selected: p.selected ?? 0 });
  try {
    const kids = place({ type: "stack_panel", name: p.name }, p.children);
    return (
      <StackPanel name={p.name} orientation={p.orientation ?? "horizontal"} size={p.size}>
        {kids}
      </StackPanel>
    );
  } finally {
    groups.pop();
  }
}

export interface RadioProps extends ToggleFaces {
  /** 컨트롤 이름 */
  name: string;
  /** 크기 */
  size: Size;
  /** toggle_group_forced_index: 그룹 안 번호 */
  index: number | string;
  /** RadioGroup 밖에서 쓸 때의 그룹 이름 */
  group?: string;
}

/** RadioGroup 안의 라디오 토글 하나. */
export function Radio(p: RadioProps): JuiElement {
  const g = groups[groups.length - 1];
  const group = p.group ?? g?.name ?? p.name;
  return <ToggleBox {...p} toggleName={group} radio={{ forcedIndex: p.index, defaultSelected: g?.selected ?? 0 }} />;
}

// ---------------------------------------------------------------- TabGroup

export interface TabSpec {
  /** 탭 id(컨트롤 이름에 쓴다) */
  id: string;
  /** 선택된 탭 면 */
  on: JuiNode;
  /** 선택되지 않은 탭 면 */
  off: JuiNode;
  /** 이 탭이 선택되었을 때 보이는 내용 */
  pane: JuiNode;
}

export interface TabGroupProps {
  /** 컨트롤 이름 */
  name: string;
  /** 전체 크기 */
  size: Size;
  /** 탭 목록 */
  tabs: TabSpec[];
  /** 탭 한 칸 크기(기본 [60, 20]) */
  tabSize?: [number, number];
  /** 처음 선택되는 탭 번호(기본 0) */
  selected?: number;
}

/** 라디오 탭과 내용 창. 창은 탭의 #toggle_state를 view 바인딩으로 읽어 보인다. */
export function TabGroup(p: TabGroupProps): JuiElement {
  const [tw, th] = p.tabSize ?? [60, 20];
  const tabName = (id: string) => `${p.name}_tab_${id}`;
  return (
    <StackPanel name={p.name} orientation="vertical" size={p.size}>
      <RadioGroup name={`${p.name}_tabs`} group={`${p.name}_group`} selected={p.selected ?? 0}>
        {p.tabs.map((t, i) => (
          <Radio name={tabName(t.id)} index={i} size={[tw, th]} on={t.on} off={t.off} />
        ))}
      </RadioGroup>
      <Panel name={`${p.name}_content`} size={FULL}>
        {p.tabs.map((t) => (
          <Panel
            name={`${p.name}_pane_${t.id}`}
            size={FULL}
            bindings={[bind.view("#toggle_state", "#visible", { control: tabName(t.id) })]}
          >
            {place({ type: "panel", name: `${p.name}_pane_${t.id}` }, t.pane)}
          </Panel>
        ))}
      </Panel>
    </StackPanel>
  );
}

// ---------------------------------------------------------------- TextInput

export interface TextInputProps {
  /** 컨트롤 이름 */
  name: string;
  /** 입력창 크기 */
  size: Size;
  /** text_box_name(기본은 name). 다른 컨트롤이 #item_name을 읽을 때 쓰는 이름 */
  textBoxName?: string;
  /** 최대 글자 수 */
  maxLength?: number;
  /** 비었을 때 보이는 안내 글 */
  placeholder?: string;
  /** 그리기 순서 */
  layer?: number;
  /** 부모 앵커 기준 오프셋 */
  offset?: Size;
}

/** 글자 라벨과 안내 라벨을 가진 edit_box. */
export function TextInput(p: TextInputProps): JuiElement {
  return (
    <EditBox
      name={p.name}
      size={p.size}
      layer={p.layer}
      offset={p.offset}
      text_box_name={p.textBoxName ?? p.name}
      max_length={p.maxLength}
      text_control={`${p.name}_text`}
      place_holder_control={`${p.name}_hint`}
      property_bag={{ "#property_field": "#item_name" }}
      button_mappings={DEFAULT_MAPPINGS}
    >
      <Label name={`${p.name}_text`} text="#item_name" localize={false} bindings={[bind.global("#item_name")]} />
      <Label name={`${p.name}_hint`} text={p.placeholder ?? ""} localize={false} color={[0.6, 0.6, 0.6]} />
    </EditBox>
  );
}

// ---------------------------------------------------------------- SliderControl

export interface SliderControlProps {
  /** 컨트롤 이름 */
  name: string;
  /** 슬라이더 크기 */
  size: Size;
  /** slider_name: 값을 읽는 이름 */
  sliderName: string;
  /** 단계 수 */
  steps?: number;
  /** 방향(기본 horizontal) */
  direction?: "horizontal" | "vertical";
  /** 손잡이 크기(기본 [8, 12]) */
  boxSize?: [number, number];
  /** 그리기 순서 */
  layer?: number;
}

/**
 * slider + slider_box. HOST-12: 슬라이더는 정적으로 놓으면 안 되고 팩토리/컬렉션으로 도달해야 한다.
 * 컬렉션 범위 밖에 놓으면 warn 진단을 남긴다.
 */
export function SliderControl(p: SliderControlProps): JuiElement {
  if (currentCollection() === undefined) {
    useKit().diagnostics.push(diag("HOST-12", "warn", p.name, "슬라이더를 컬렉션/팩토리 범위 밖에 정적으로 놓았다."));
  }
  const [bw, bh] = p.boxSize ?? [8, 12];
  return (
    <Slider
      name={p.name}
      size={p.size}
      layer={p.layer}
      slider_name={p.sliderName}
      slider_steps={p.steps ?? 10}
      slider_direction={p.direction ?? "horizontal"}
      slider_box_control={`${p.name}_box`}
      background_control={`${p.name}_bg`}
      progress_control={`${p.name}_progress`}
      default_control={`${p.name}_bg`}
      hover_control={`${p.name}_bg`}
      button_mappings={DEFAULT_MAPPINGS}
    >
      <Image name={`${p.name}_bg`} texture={WHITE} color={[0.2, 0.2, 0.2]} size={FULL} />
      <Image name={`${p.name}_progress`} texture={WHITE} color={[0.4, 0.7, 1]} size={FULL} />
      <SliderBox name={`${p.name}_box`} size={[bw, bh]} default_control="default" hover_control="hover" button_mappings={DEFAULT_MAPPINGS}>
        <Image name="default" texture={WHITE} size={FULL} />
        <Image name="hover" texture={WHITE} color={[0.8, 0.9, 1]} size={FULL} />
      </SliderBox>
    </Slider>
  );
}
