// 일반 배치 해결기: explainPlacement가 짚은 문제를 트리에서 고쳐 쓴다.
// 입력은 바꾸지 않고 새 트리를 돌려준다. 래퍼 모양은 엔티티 해결기(src/entity/solver.ts)와 같다.
import type { Diagnostic } from "../lint.ts";
import type { ControlNode, JsonObject } from "../types.ts";
import { diag } from "../rules/registry.ts";
import { explainPlacement, type PlacementProblem } from "./explain.ts";

export interface SolveOptions {
  /** false면 해결 못 한 error를 warn으로 낮춘다(기본 true) */
  strict?: boolean;
  /** 감싸는 스택의 collection_name(기본: 가장 가까운 조상의 collection_name) */
  collection?: string;
}

interface Ctx {
  parent: { type: string; collection_name?: string } | null;
  /** 가장 가까운 조상의 collection_name */
  coll: string | undefined;
  path: string;
}

/** 래퍼로 옮기는 속성 */
const MOVED = ["size", "offset", "anchor_from", "anchor_to", "layer"];

const typeOf = (n: ControlNode): string => (typeof n.props.type === "string" ? n.props.type : "");

function pickMoved(props: JsonObject, into: JsonObject): void {
  for (const k of MOVED) if (props[k] !== undefined) into[k] = props[k];
}

export function solvePlacement(nodes: ControlNode[], opts?: SolveOptions): { nodes: ControlNode[]; diagnostics: Diagnostic[] } {
  const strict = opts?.strict !== false;
  const diagnostics: Diagnostic[] = [];

  const info = (p: PlacementProblem, path: string, what: string): void => {
    diagnostics.push(diag(p.rule, "info", path, `${p.message} ${what}`));
  };

  function place(n: ControlNode, ctx: Ctx): ControlNode {
    const path = `${ctx.path}/${n.name}`;
    const ctype = typeOf(n);
    let props: JsonObject = { ...n.props };

    // 1단계: 속성 제거(drop-prop)
    for (const p of explainPlacement({ parent: ctx.parent, child: { type: ctype, props } }).problems) {
      if (p.fix !== "drop-prop") continue;
      delete props[p.rule === "COL-01" ? "collection_name" : "collection_index"];
      info(p, path, "(속성을 지웠다)");
    }

    // 2단계: 감싸기
    const probs = explainPlacement({ parent: ctx.parent, child: { type: ctype, props } }).problems;
    const needStack = probs.find((p) => p.fix === "wrap-stack");
    const idxProb = probs.find((p) => p.rule === "COL-02" && (p.fix === "move-index" || p.fix === "wrap-panel"));
    const offProb = probs.find((p) => p.rule === "LAY-38");
    const stackName = opts?.collection ?? ctx.coll;

    let stackOk = false;
    if (needStack) {
      if (stackName) stackOk = true;
      else diagnostics.push(diag(needStack.rule, strict ? needStack.level : "warn", path, `${needStack.message} (감쌀 collection_name을 알 수 없어 고치지 못했다)`));
    }

    const ownColl = typeof props.collection_name === "string" ? props.collection_name : ctx.coll;
    const childCtx: Ctx = { parent: { type: ctype, ...(typeof props.collection_name === "string" ? { collection_name: props.collection_name } : {}) }, coll: ownColl, path };
    const base = (p: JsonObject, kids: ControlNode[]): ControlNode => ({ name: n.name, ...(n.def !== undefined ? { def: n.def } : {}), props: p, children: kids });
    const index = props.collection_index;

    // 인덱스를 패널로 옮겨야 하는 경우(label/image) 또는 스택이 필요한 경우
    if ((idxProb && index !== undefined) || stackOk) {
      const moveIdx = idxProb !== undefined && index !== undefined;
      const inner: JsonObject = {};
      for (const [k, v] of Object.entries(props)) if (k !== "offset" && k !== "anchor_from" && k !== "anchor_to") inner[k] = v;
      if (moveIdx) delete inner.collection_index;
      const kidsCtx: Ctx = { ...childCtx, parent: { type: ctype, ...(typeof inner.collection_name === "string" ? { collection_name: inner.collection_name } : {}) } };
      const kids = (): ControlNode[] => n.children.map((c) => place(c, kidsCtx));
      const innerNode = (kids_: ControlNode[]): ControlNode => base(inner, kids_);
      const stackProps = (): JsonObject => {
        const w: JsonObject = { type: "stack_panel", orientation: "vertical", collection_name: stackName! };
        pickMoved(props, w);
        return w;
      };
      if (idxProb && moveIdx) info(idxProb, path, "(인덱스를 패널로 옮겼다)");
      if (stackOk) info(needStack!, path, "(container 스택으로 감쌌다)");
      if (!moveIdx) {
        // 인덱스 이동 없음: 스택이 곧 래퍼
        return { name: `${n.name}_slot`, props: stackProps(), children: [innerNode(kids())] };
      }
      const idx: JsonObject = { type: "panel", collection_index: index! };
      if (!stackOk) {
        pickMoved(props, idx);
        return { name: `${n.name}_slot`, props: idx, children: [innerNode(kids())] };
      }
      if (props.size !== undefined) idx.size = props.size;
      const holder: ControlNode = { name: `${n.name}_idx`, props: idx, children: [innerNode(kids())] };
      return { name: `${n.name}_slot`, props: stackProps(), children: [holder] };
    }

    // 스택 아래에서 offset/앵커가 무시되는 경우: 크기만 가진 패널로 감싼다(자식은 그 안에서 배치)
    if (offProb) {
      info(offProb, path, "(패널로 감쌌다)");
      const w: JsonObject = { type: "panel" };
      if (props.size !== undefined) w.size = props.size;
      if (props.layer !== undefined) w.layer = props.layer;
      const innerCtx: Ctx = { ...childCtx };
      const inner = base(props, n.children.map((c) => place(c, innerCtx)));
      return { name: `${n.name}_box`, props: w, children: [inner] };
    }

    // 고칠 수 없는 문제: 그대로 보고
    for (const p of probs) {
      if (p === needStack) continue;
      diagnostics.push(diag(p.rule, strict ? p.level : "warn", path, p.message));
    }
    return base(props, n.children.map((c) => place(c, childCtx)));
  }

  const out = nodes.map((n) => place(n, { parent: null, coll: undefined, path: "" }));
  return { nodes: out, diagnostics };
}
