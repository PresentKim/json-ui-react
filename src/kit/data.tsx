// 키트 데이터·컬렉션 부품: 조건부 표시, 값 분기, 바인딩 글자, 반복(컬렉션), 항목 글자, 키 공장.
// 모든 자식은 core의 place()를 거친다. 컬렉션 안에서 읽는 부품은 currentCollection()이 있어야 한다.
// 사용 규칙: COL-01(collection_name은 stack_panel), COL-02(label에 index 금지), COL-38/50(직속 자식, 격자 줄),
// COL-28/42(factory는 control_ids만, 이름은 factory 객체), BND-31(#visible 바인딩은 always), ANI-37(키 공장 재생).
import type { JuiElement, JuiNode } from "../types.ts";
import type { ElementProps } from "../controls/elements.ts";
import { Panel, StackPanel, Label } from "../controls/components.tsx";
import { bind } from "../bind.ts";
import { E, Expr, lacks, lit } from "../expr.ts";
import { diag } from "../rules/registry.ts";
import { currentCollection, place, useKit, withScope } from "./core.tsx";

type Bindings = NonNullable<ElementProps<"panel">["bindings"]>;
type Size2 = [number, number];

/** 컬렉션 문맥이 없으면 error 진단을 남기고(strict면 예외) undefined를 돌려준다. */
function needCollection(who: string, path: string): string | undefined {
  const coll = currentCollection();
  if (coll !== undefined) return coll;
  const ctx = useKit();
  const d = diag("COL-44", "error", path, `${who}: 컬렉션 안에서만 쓸 수 있습니다(Repeat 또는 collection_name 스택 아래에 두세요)`);
  ctx.diagnostics.push(d);
  if (ctx.strict) throw new Error(`[${d.rule}] ${d.message}`);
  return undefined;
}

// ---------------------------------------------------------------- ShowIf

/** 표시 조건: 식, 또는 속성에 표식이 있음(has)/없음(lacks). */
export type ShowCondition = Expr | { has: `#${string}`; marker: string } | { lacks: `#${string}`; marker: string };

export interface ShowIfProps {
  /** 컨트롤 이름 */
  name: string;
  /** 조건: Expr, `{has, marker}` 또는 `{lacks, marker}`. 조건이 참일 때 자식이 보인다. */
  when: ShowCondition;
  /** 조건이 읽는 속성 이름들. 컬렉션 안이면 컬렉션 바인딩을 붙인다(has/lacks는 자동). */
  reads?: `#${string}`[];
  /** 조건이 참일 때 보일 자식 */
  children?: JuiNode;
}

function conditionSource(w: ShowCondition): { src: string; reads: `#${string}`[] } {
  if (w instanceof Expr) return { src: w.src, reads: [] };
  if ("has" in w) return { src: E.prop(w.has).strip(w.marker).eq(E.prop(w.has)).not().src, reads: [w.has] };
  return { src: lacks(w.lacks, w.marker), reads: [w.lacks] };
}

function readBindings(reads: `#${string}`[]): Bindings {
  const coll = currentCollection();
  return coll === undefined ? [] : reads.map((r) => bind.collection(r, coll, { condition: "always" }));
}

/** 조건이 참일 때만 자식을 보인다. #visible 뷰 바인딩은 라우터 아래 안전하게 항상 always(BND-31). */
export function ShowIf(p: ShowIfProps): JuiElement {
  const c = conditionSource(p.when);
  const reads = [...(p.reads ?? []), ...c.reads.filter((r) => !(p.reads ?? []).includes(r))];
  const bindings: Bindings = [...readBindings(reads), bind.view(c.src, "#visible", { condition: "always" })];
  return <Panel name={p.name} bindings={bindings}>{place({ type: "panel", name: p.name }, p.children)}</Panel>;
}

// ---------------------------------------------------------------- Switch / Case

interface SwitchFrame { on: `#${string}`; name: string; values: Set<string> }
const switches: SwitchFrame[] = [];

export interface SwitchProps {
  /** 컨트롤 이름 */
  name: string;
  /** 값을 읽을 속성 */
  on: `#${string}`;
  /** Case 자식들(값이 서로 달라야 한다) */
  children?: JuiNode;
}

export interface CaseProps {
  /** 컨트롤 이름 */
  name: string;
  /** 이 값일 때만 보인다 */
  value: string | number;
  /** 보일 자식 */
  children?: JuiNode;
}

/** 속성 하나의 값마다 자식 하나만 보이게 한다(Case는 값이 서로 달라야 하며 겹치면 예외). */
export function Switch(p: SwitchProps): JuiElement {
  const frame: SwitchFrame = { on: p.on, name: p.name, values: new Set() };
  switches.push(frame);
  try {
    return <Panel name={p.name}>{place({ type: "panel", name: p.name }, p.children)}</Panel>;
  } finally {
    switches.pop();
  }
}

/** Switch 안에서 값이 같을 때만 보이는 패널. */
export function Case(p: CaseProps): JuiElement {
  const frame = switches[switches.length - 1];
  if (!frame) throw new Error(`Case "${p.name}": Switch 안에서만 쓸 수 있습니다`);
  const key = String(p.value);
  // 값이 겹치는 Case는 프로그래밍 오류이므로 진단 대신 예외로 알린다
  if (frame.values.has(key)) throw new Error(`Switch "${frame.name}": 값 ${key}의 Case가 둘 이상입니다(한 값에 하나만 보여야 합니다)`);
  frame.values.add(key);
  const rhs = typeof p.value === "number" ? E.num(p.value) : E.str(p.value);
  const bindings: Bindings = [...readBindings([frame.on]), bind.view(E.prop(frame.on).eq(rhs).src, "#visible", { condition: "always" })];
  return <Panel name={p.name} bindings={bindings}>{place({ type: "panel", name: p.name }, p.children)}</Panel>;
}

// ---------------------------------------------------------------- BindText

interface TextLook {
  /** 글자 크기 [w, h] */
  size?: [number | string, number | string];
  /** 글자 색 [r, g, b] */
  color?: [number, number, number];
  /** 그림자 */
  shadow?: boolean;
  /** 글자 배율 */
  font_scale_factor?: number;
  /** 가로 정렬 */
  text_alignment?: "left" | "center" | "right";
  /** 그리기 순서 */
  layer?: number;
}

export interface BindTextProps extends TextLook {
  /** 컨트롤 이름 */
  name: string;
  /** 글자 출처: 속성 이름 또는 식(결과가 #text로 간다). 숫자로 시작하는 글자는 식이 숫자로 읽는다(EXP-30). */
  from: `#${string}` | Expr;
  /** from이 식일 때 읽는 속성들(컬렉션 안이면 컬렉션 바인딩을 붙인다) */
  reads?: `#${string}`[];
}

function look(p: TextLook): Record<string, unknown> {
  const o: Record<string, unknown> = {};
  for (const k of ["size", "color", "shadow", "font_scale_factor", "text_alignment", "layer"] as const) if (p[k] !== undefined) o[k] = p[k];
  return o;
}

/** 속성이나 식의 값을 글자로 그린다. 컬렉션 안의 속성은 컬렉션 바인딩으로 읽는다. */
export function BindText(p: BindTextProps): JuiElement {
  const coll = currentCollection();
  let bindings: Bindings;
  if (typeof p.from === "string") {
    bindings = [coll === undefined ? bind.global(p.from, { condition: "always", override: "#text" }) : bind.collection(p.from, coll, { condition: "always", override: "#text" })];
  } else {
    bindings = [...readBindings(p.reads ?? []), bind.view(p.from.src, "#text", { condition: "always" })];
  }
  return <Label {...({ name: p.name, text: "#text", localize: false, ...look(p), bindings } as ElementProps<"label">)} />;
}

// ---------------------------------------------------------------- Item / ItemText

export interface ItemProps {
  /** 컨트롤 이름 */
  name: string;
  /** 고정 collection_index. 주면 패널이 이 칸을 읽는다(COL-02: 패널에만 준다). */
  index?: number;
  /** 항목 안에 놓을 자식(ItemText, ItemIcon 등) */
  children?: JuiNode;
}

/** 현재 컬렉션의 항목 하나를 읽는 범위. 자식은 같은 컬렉션을 읽고, 인덱스는 패널이 가진다. */
export function Item(p: ItemProps): JuiElement | null {
  if (needCollection("Item", p.name) === undefined) return null;
  const el = (
    <Panel {...({ name: p.name, ...(p.index !== undefined ? { collection_index: p.index } : {}) } as ElementProps<"panel">)}>
      {place({ type: "panel", name: p.name }, p.children)}
    </Panel>
  );
  return el;
}

export interface ItemTextProps extends TextLook {
  /** 컨트롤 이름 */
  name: string;
  /** 컬렉션 속성 이름(예: #form_button_text) */
  prop: `#${string}`;
  /** 고정 칸 번호. 주면 패널로 감싸 패널에 인덱스를 준다(COL-02, label에는 주지 않는다). */
  index?: number;
}

/** 컬렉션 속성을 글자로 그린다. 컬렉션 밖이면 COL-44 error. */
export function ItemText(p: ItemTextProps): JuiElement | null {
  const coll = needCollection("ItemText", p.name);
  if (coll === undefined) return null;
  const label = (
    <Label {...({ name: p.index === undefined ? p.name : `${p.name}_text`, text: "#text", localize: false, ...look(p), bindings: [bind.collection(p.prop, coll, { condition: "always", override: "#text" })] } as ElementProps<"label">)} />
  );
  if (p.index === undefined) return label;
  return <Panel name={p.name} collection_index={p.index}>{place({ type: "panel", name: p.name }, label)}</Panel>;
}

// ---------------------------------------------------------------- Repeat

export interface RepeatProps {
  /** 컨트롤 이름 */
  name: string;
  /** 컬렉션 이름(예: form_buttons) */
  collection: string;
  /** 배치: 세로 스택, 가로 스택, 격자(세로 스택 + 가로 줄, COL-50) */
  layout: "stack-v" | "stack-h" | "grid";
  /** 항목 수 */
  count: number;
  /** 항목 그리기 함수. i번째 항목의 내용(인덱스는 감싸는 패널이 가진다) */
  item: (i: number) => JuiNode;
  /** 항목 한 칸 크기. 기본 [16, 16] */
  itemSize?: Size2;
  /** layout이 grid일 때 한 줄 칸 수 */
  cols?: number;
}

/** 컬렉션 컨테이너: 항목마다 collection_index를 가진 패널(COL-38)을 collection_name 스택 아래에 둔다. */
export function Repeat(p: RepeatProps): JuiElement {
  if (!Number.isInteger(p.count) || p.count < 0) throw new Error(`Repeat "${p.name}": count는 0 이상의 정수여야 합니다`);
  const [w, h] = p.itemSize ?? [16, 16];
  const cell = (i: number): JuiElement => {
    const nm = `${p.name}_i${i}`;
    return (
      <Panel name={nm} size={[w, h]} collection_index={i}>
        {place({ type: "panel", name: nm }, p.item(i))}
      </Panel>
    );
  };
  const scope = { type: "stack_panel", collection: p.collection, path: p.name };
  if (p.layout !== "grid") {
    const items = withScope(scope, () => Array.from({ length: p.count }, (_, i) => cell(i)));
    const horizontal = p.layout === "stack-h";
    const size: Size2 = horizontal ? [w * p.count, h] : [w, h * p.count];
    return (
      <StackPanel name={p.name} orientation={horizontal ? "horizontal" : "vertical"} size={size} collection_name={p.collection}>
        {place({ type: "stack_panel", name: p.name, collection_name: p.collection }, items)}
      </StackPanel>
    );
  }
  const cols = p.cols ?? 1;
  if (!Number.isInteger(cols) || cols < 1) throw new Error(`Repeat "${p.name}": cols는 1 이상의 정수여야 합니다`);
  const rowCount = Math.ceil(p.count / cols);
  const rows = withScope(scope, () =>
    Array.from({ length: rowCount }, (_, r) => {
      const n = Math.min(cols, p.count - r * cols);
      const cells = Array.from({ length: n }, (_, c) => cell(r * cols + c));
      return (
        <StackPanel name={`${p.name}_r${r}`} orientation="horizontal" size={[w * cols, h]} collection_name={p.collection}>
          {place({ type: "stack_panel", name: `${p.name}_r${r}`, collection_name: p.collection }, cells)}
        </StackPanel>
      );
    }),
  );
  return (
    <StackPanel name={p.name} orientation="vertical" size={[w * cols, h * rowCount]}>
      {place({ type: "stack_panel", name: p.name }, rows)}
    </StackPanel>
  );
}

// ---------------------------------------------------------------- KeyedFactory

export interface KeyedFactoryProps {
  /** 컨트롤 이름 */
  name: string;
  /** 키 -> 만들 컨트롤 정의 참조(`@ns.이름`). control_ids로만 만든다(COL-28) */
  variants: Record<string, string>;
  /** 컨트롤 크기 [w, h] */
  size: Size2;
  /** 키를 읽는 속성(기본 #hover_text에서 서식 코드를 뺀 값) */
  source?: `#${string}`;
  /** source가 읽히는 컬렉션 이름. 기본은 현재 컬렉션, 없으면 container_items */
  collection?: string;
  /** factory 객체 이름(COL-42). 기본 `${name}_factory` */
  factoryName?: string;
}

const FORMAT_CODES = ["§o", "§f", "§r"];

/** 키가 바뀌면 컨트롤이 새로 만들어져 애니메이션이 다시 돈다(ANI-37): property_bag 사전 조회로 #collection_length를 정한다. */
export function KeyedFactory(p: KeyedFactoryProps): JuiElement {
  const source = p.source ?? "#hover_text";
  const coll = p.collection ?? currentCollection() ?? "container_items";
  const bag: Record<`#${string}`, unknown> = { "#k": [] };
  const ids: Record<string, string> = {};
  for (const [key, ref] of Object.entries(p.variants)) {
    if (!/^\w+$/.test(key)) throw new Error(`KeyedFactory "${p.name}": 키 "${key}"는 영문·숫자·밑줄만 쓸 수 있습니다`);
    ids[key] = ref;
    bag[`#k${key}`] = [key];
  }
  let clean = E.prop(source);
  for (const code of FORMAT_CODES) clean = clean.strip(code);
  const bindings: Bindings = [
    bind.collection(source, coll, { condition: "always" }),
    bind.view(`(${lit("#k")} + ${clean.src})`, "#collection_length", { condition: "always" }),
  ];
  return (
    <StackPanel
      name={p.name}
      size={p.size}
      factory={{ name: p.factoryName ?? `${p.name}_factory`, control_ids: ids }}
      property_bag={bag}
      bindings={bindings}
    />
  );
}
