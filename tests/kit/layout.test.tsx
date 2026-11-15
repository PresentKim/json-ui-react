import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { render } from "../../src/render.ts";
import { runChecks } from "../../src/check/engine.ts";
import { ALL_CHECKS } from "../../src/check/index.ts";
import { Label } from "../../src/controls/components.tsx";
import { collectKit, kitFile } from "../../src/kit/core.tsx";
import { Row, Column, Spacer, Overlay, Center, Align, Padding, Box, ScrollArea, GridLayout, ANCHOR_PRESETS } from "../../src/kit/layout.tsx";
import type { JsonObject, JuiNode } from "../../src/types.ts";

const one = (n: JuiNode) => render(n)[0]!;
const errors = (node: JuiNode) => {
  const file = collectKit(() => kitFile("kt", { main: node })).result as unknown as JsonObject;
  return runChecks({ "ui/kt.json": file }, ALL_CHECKS).diagnostics.filter((d) => d.level === "error");
};
const lbl = (n: string) => <Label name={n} text="a" />;

describe("레이아웃 키트", () => {
  it("source_pascal_only: 소문자 태그와 binding_type 리터럴을 쓰지 않는다", () => {
    const src = readFileSync("src/kit/layout.tsx", "utf8");
    expect(src).not.toMatch(/<[a-z_]+[\s>/]/);
    expect(src).not.toMatch(/binding_type\s*:/);
  });

  it("Row: gap은 빈 패널로 끼워진다", () => {
    const n = one(<Row name="r" gap={2}><Box name="a" w={4} h={4} /><Box name="b" w={4} h={4} /></Row>);
    expect(n.props.type).toBe("stack_panel");
    expect(n.props.orientation).toBe("horizontal");
    expect(n.children.map((c) => c.name)).toEqual(["a", "r_gap0", "b"]);
    expect(n.children[1]!.props.size).toEqual([2, "100%"]);
  });

  it("Column: 세로 + align은 앵커를 함께 준다", () => {
    const n = one(<Column name="c" gap={3} align="center">{lbl("x")}{lbl("y")}</Column>);
    expect(n.props.orientation).toBe("vertical");
    expect(n.props.use_child_anchors).toBe(true);
    expect(n.children[0]!.props).toMatchObject({ anchor_from: "top_middle", anchor_to: "top_middle" });
    expect(n.children[1]!.props.size).toEqual(["100%", 3]);
  });

  it("stack_child_offset: Row 자식의 offset은 자동으로 상자에 담긴다(LAY-38 info)", () => {
    const { result, diagnostics } = collectKit(() => render(<Row name="r"><Box name="a" offset={[2, 0]} w={4} h={4} /></Row>));
    expect(diagnostics.map((d) => [d.rule, d.level])).toContainEqual(["LAY-38", "info"]);
    expect(result[0]!.children[0]!.name).toBe("a_box");
  });

  it("Spacer: 고정과 fill", () => {
    expect(one(<Spacer name="s" w={3} h={5} />).props.size).toEqual([3, 5]);
    expect(one(<Spacer name="s" fill />).props.size).toEqual(["fill", "100%"]);
    expect(one(<Spacer name="s" fill axis="vertical" />).props.size).toEqual(["100%", "fill"]);
  });

  it("Overlay: layer가 없는 자식에 순서대로 준다", () => {
    const n = one(<Overlay name="o">{lbl("a")}<Label name="b" text="b" layer={9} />{lbl("c")}</Overlay>);
    expect(n.children.map((c) => c.props.layer)).toEqual([1, 9, 3]);
  });

  it("align_presets_9: 9개 프리셋이 anchor_from/anchor_to 쌍이 된다", () => {
    expect(ANCHOR_PRESETS).toHaveLength(9);
    for (const a of ANCHOR_PRESETS) {
      const n = one(<Align name="a" to={a}>{lbl("l")}</Align>);
      expect(n.props).toMatchObject({ anchor_from: a, anchor_to: a });
    }
    expect(one(<Center name="c" />).props).toMatchObject({ anchor_from: "center", anchor_to: "center" });
    expect(() => render(<Align name="a" to={"nowhere" as never} />)).toThrow();
  });

  it("Padding: 한 부호 식과 offset", () => {
    const inner = one(<Padding name="p" inset={[4, 2, 6, 2]}>{lbl("l")}</Padding>).children[0]!;
    expect(inner.props.size).toEqual(["100% - 10px", "100% - 4px"]);
    expect(inner.props.offset).toEqual([4, 2]);
    expect(one(<Padding name="p" inset={0} />).children[0]!.props.size).toEqual(["100%", "100%"]);
  });

  it("Box: 크기와 자식", () => {
    const n = one(<Box name="b" w={10} h="50%">{lbl("l")}</Box>);
    expect(n.props.size).toEqual([10, "50%"]);
    expect(n.children).toHaveLength(1);
  });

  it("ScrollArea: 역할 컨트롤 4개가 실제 자식 이름과 연결된다", () => {
    const n = one(<ScrollArea name="s" size={[100, 80]}>{lbl("l")}</ScrollArea>);
    const names = new Set<string>();
    const walk = (x: typeof n): void => { names.add(x.name); x.children.forEach(walk); };
    walk(n);
    for (const k of ["scrolling_view_port", "scrolling_content", "scrollbar_track", "scrollbar_box"]) {
      expect(names.has(n.props[k] as string)).toBe(true);
    }
  });

  it("GridLayout: 정적 자식 grid_position, 개수 바인딩은 horizontal + 고정 너비", () => {
    const g = one(<GridLayout name="g" cols={2} cell={[10, 10]}>{lbl("a")}{lbl("b")}{lbl("c")}</GridLayout>);
    expect(g.props.grid_dimensions).toEqual([2, 2]);
    expect(g.children.map((c) => c.props.grid_position)).toEqual([[0, 0], [0, 1], [1, 0]]);
    const b = one(<GridLayout name="g" cols={3} cell={[10, 10]} template="kt.cell" countFrom="#count" />);
    expect(b.props).toMatchObject({ grid_rescaling_type: "horizontal", grid_item_template: "kt.cell", size: [30, "100%c"] });
    expect(JSON.stringify(b.props.bindings)).toContain("#maximum_grid_items");
  });

  it("checks_clean: 기본 속성의 출력에 error 진단이 없다", () => {
    const cases: Record<string, JuiNode> = {
      row: <Row name="m" gap={2} align="end">{lbl("a")}{lbl("b")}</Row>,
      column: <Column name="m" gap={2}>{lbl("a")}{lbl("b")}</Column>,
      overlay: <Overlay name="m">{lbl("a")}{lbl("b")}</Overlay>,
      center: <Center name="m">{lbl("a")}</Center>,
      align: <Align name="m" to="top_right">{lbl("a")}</Align>,
      padding: <Padding name="m" inset={4}>{lbl("a")}</Padding>,
      box: <Box name="m" w={10} h={10}>{lbl("a")}</Box>,
      scroll: <ScrollArea name="m" size={[100, 80]}>{lbl("a")}</ScrollArea>,
      grid: <GridLayout name="m" cols={2} cell={[10, 10]}>{lbl("a")}{lbl("b")}</GridLayout>,
      gridBound: <GridLayout name="m" cols={2} cell={[10, 10]} template="kt.cell" countFrom="#count" />,
      spacer: <Row name="m"><Spacer name="s" fill />{lbl("a")}</Row>,
    };
    for (const [k, node] of Object.entries(cases)) expect([k, errors(node)]).toEqual([k, []]);
  });
});
