// 컨트롤 종류별 배치 능력표: 컬렉션 이름/인덱스를 가질 수 있는지, 자식을 어떻게 배치하는지.
// 근거 규칙 ID는 why 필드에 플래그별로 적는다.
import { CONTROL_TYPES, type ControlType } from "../controls/visual.ts";
import type { RuleId } from "../rules/registry.ts";

export interface Capability {
  /** collection_name을 가질 수 있는가 (image/label은 불가, COL-01) */
  collectionName: boolean;
  /** collection_index를 받을 수 있는가 (image는 거부, label은 무시, COL-02) */
  collectionIndex: boolean;
  /** 자식 배치 방식: free(앵커/오프셋), stack(진행 축 쌓기), grid(격자), none(자식 없음) */
  childrenPositioned: "free" | "stack" | "grid" | "none";
  /** controls로 자식을 둘 수 있는가 */
  acceptsChildren: boolean;
  /** 컬렉션 바인딩을 읽을 수 있는가 */
  readsCollection: boolean;
  /** 플래그별 근거 규칙 */
  why: {
    collectionName: RuleId[];
    collectionIndex: RuleId[];
    childrenPositioned: RuleId[];
    acceptsChildren: RuleId[];
    readsCollection: RuleId[];
  };
}

const LEAF = new Set<ControlType>(["image", "label"]);
const NO_CHILDREN = new Set<ControlType>(["image", "label", "factory"]);

function make(t: ControlType): Capability {
  const leaf = LEAF.has(t);
  const stack = t === "stack_panel";
  const grid = t === "grid";
  const kids = !NO_CHILDREN.has(t);
  return {
    collectionName: !leaf,
    collectionIndex: !leaf,
    childrenPositioned: !kids ? "none" : stack ? "stack" : grid ? "grid" : "free",
    acceptsChildren: kids,
    readsCollection: true,
    why: {
      collectionName: leaf ? ["COL-01" as RuleId] : [],
      collectionIndex: leaf ? ["COL-02"] : ["COL-44"],
      childrenPositioned: stack ? ["LAY-38"] : [],
      acceptsChildren: [],
      readsCollection: ["COL-44"],
    },
  };
}

export const CAPABILITIES: Record<ControlType, Capability> = Object.fromEntries(
  CONTROL_TYPES.map((t) => [t, make(t)]),
) as Record<ControlType, Capability>;
