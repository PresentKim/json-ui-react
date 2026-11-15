// 배치 질의 설명: 부모 아래 자식을 이 속성으로 두면 어떤 규칙에 걸리는지 알려 준다.
import type { JsonObject } from "../types.ts";
import type { RuleId } from "../rules/registry.ts";
import { CAPABILITIES } from "./capabilities.ts";
import type { ControlType } from "../controls/visual.ts";

export interface PlacementProblem {
  rule: RuleId;
  level: "error" | "warn";
  message: string;
  fix?: "wrap-stack" | "wrap-panel" | "move-index" | "drop-prop";
}

export interface PlacementQuery {
  parent: { type: string; collection_name?: string } | null;
  child: { type: string; props?: JsonObject };
}

const isZero = (v: unknown): boolean => Array.isArray(v) && v.every((x) => x === 0 || x === "0px");

export function explainPlacement(q: PlacementQuery): { ok: boolean; problems: PlacementProblem[] } {
  const problems: PlacementProblem[] = [];
  const props = q.child.props ?? {};
  const ctype = q.child.type;
  const cap = CAPABILITIES[ctype as ControlType];

  if (props.collection_index !== undefined) {
    if (ctype === "image")
      problems.push({ rule: "COL-02", level: "error", fix: "move-index", message: "image에는 collection_index를 줄 수 없다(거부됨). 인덱스를 부모 패널로 옮긴다." });
    else if (ctype === "label")
      problems.push({ rule: "COL-02", level: "warn", fix: "wrap-panel", message: "label의 collection_index는 무시된다. 패널로 감싸 패널에 인덱스를 준다." });
    else if (q.parent === null)
      problems.push({ rule: "COL-02", level: "error", fix: "drop-prop", message: "최상위 정의에는 collection_index를 쓸 수 없다. 인스턴스화 지점에서 준다." });
    if (q.parent?.type === "panel")
      problems.push({ rule: "COL-50", level: "warn", fix: "wrap-stack", message: "부모가 panel이면 칸마다 다른 collection_index를 줘도 모두 인덱스 0을 읽는다. collection_name을 가진 stack_panel로 감싼다." });
  }

  if (props.collection_name !== undefined && cap && !cap.collectionName)
    problems.push({ rule: "COL-01", level: "error", fix: "drop-prop", message: `${ctype}에는 collection_name을 줄 수 없다. 속성을 지운다.` });

  if (q.parent && CAPABILITIES[q.parent.type as ControlType]?.childrenPositioned === "stack") {
    const ignoresOffset = props.offset !== undefined && !isZero(props.offset);
    const ignoresAnchor = (props.anchor_from !== undefined || props.anchor_to !== undefined) && props.use_child_anchors !== true;
    if (ignoresOffset || ignoresAnchor)
      problems.push({ rule: "LAY-38", level: "warn", fix: "wrap-panel", message: "스택 패널의 자식은 offset과 앵커를 무시한다. panel로 감싸 그 안에서 배치한다." });
  }

  return { ok: problems.length === 0, problems };
}
