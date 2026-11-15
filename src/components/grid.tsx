// 그리드 컴포넌트: 고정 칸 슬롯 그리드(COL-38, COL-50)와 바인딩 가상 목록(COL-49).
import type { JsonObject, JuiElement } from "../types.ts";
import type { ElementProps } from "../controls/elements.ts";

export interface SlotGridProps {
  name: string;
  size: [number, number];
  rows: number;
  cols: number;
  rowHeight: number;
  rowWidth: number;
  cell: (pos: number, row: number, col: number) => JuiElement;
  props?: JsonObject;
  bindings?: JsonObject[];
}

/** 세로 stack_panel 안에 컬렉션 이름을 가진 가로 줄을 두고, 칸을 줄의 직속 자식으로 둔다(COL-50). */
export function SlotGrid(p: SlotGridProps): JuiElement {
  if (!Number.isInteger(p.rows) || p.rows <= 0 || !Number.isInteger(p.cols) || p.cols <= 0) {
    throw new Error(`SlotGrid "${p.name}": rows와 cols는 1 이상의 정수여야 합니다`);
  }
  const rows: JuiElement[] = [];
  for (let r = 0; r < p.rows; r++) {
    const cells: JuiElement[] = [];
    for (let c = 0; c < p.cols; c++) cells.push(p.cell(r * p.cols + c, r, c));
    rows.push(
      <stack_panel
        name={`r${r}`}
        orientation="horizontal"
        size={[p.rowWidth, p.rowHeight]}
        collection_name="form_buttons"
      >
        {cells}
      </stack_panel>,
    );
  }
  // 키 순서: type, orientation, size, (props), bindings, controls
  const attrs: Record<string, unknown> = { name: p.name, orientation: "vertical", size: p.size };
  if (p.props) Object.assign(attrs, p.props);
  if (p.bindings) attrs.bindings = p.bindings;
  return <stack_panel {...(attrs as unknown as ElementProps<"stack_panel">)}>{rows}</stack_panel>;
}

export interface VirtualListProps {
  name: string;
  columns: number;
  cellSize: [number, number];
  cellDef: string;
  maxItems: number;
  /** COL-49: 2000칸을 넘는 목록을 의도적으로 허용한다. */
  allowLarge?: boolean;
}

export const VIRTUAL_LIST_LIMIT = 2000;

/** 컬렉션 길이를 `#maximum_grid_items`에 묶는 바인딩 그리드. */
export function VirtualList(p: VirtualListProps): JuiElement {
  if (!Number.isInteger(p.columns) || p.columns <= 0 || !Number.isInteger(p.maxItems) || p.maxItems <= 0) {
    throw new Error(`VirtualList "${p.name}": columns와 maxItems는 1 이상의 정수여야 합니다`);
  }
  if (p.maxItems > VIRTUAL_LIST_LIMIT && !p.allowLarge) {
    throw new Error(
      `VirtualList "${p.name}": maxItems ${p.maxItems}는 ${VIRTUAL_LIST_LIMIT}을 넘습니다 ` +
        `(COL-49: 3000칸 이상은 칸이 겹쳐 그려짐). 의도한 경우 allowLarge를 켜세요`,
    );
  }
  return (
    <grid
      name={p.name}
      size={[p.columns * p.cellSize[0], "100%c"]}
      grid_rescaling_type="horizontal"
      grid_item_template={p.cellDef}
      collection_name="form_buttons"
      maximum_grid_items={p.maxItems}
      bindings={[
        {
          binding_name: "#form_button_length",
          binding_type: "collection",
          binding_collection_name: "form_buttons",
        },
        {
          binding_type: "view",
          source_property_name: "#form_button_length",
          target_property_name: "#maximum_grid_items",
        },
      ]}
    />
  );
}
