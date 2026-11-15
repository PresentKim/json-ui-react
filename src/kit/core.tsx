// 키트 코어: 렌더 시점 문맥(진단 수집, 부모·컬렉션 스택, strict)과 배치 규칙을 거치는 place().
import type { Diagnostic } from "../lint.ts";
import { solvePlacement } from "../placement/solve.ts";
import { render, toEntry } from "../render.ts";
import type { ControlNode, JsonObject, JuiElement, JuiNode } from "../types.ts";

/** 렌더 중인 부모 한 겹 */
export interface KitScope {
  /** 컨트롤 종류(예: "stack_panel") */
  type: string;
  /** 이 범위가 여는 컬렉션 이름 */
  collection?: string;
  /** 사람이 읽는 경로(진단용) */
  path: string;
}

/** 키트 문맥 */
export interface KitCtx {
  /** true면 고칠 수 없는 error 진단에서 예외를 던진다 */
  strict: boolean;
  /** 진단 수집함 */
  diagnostics: Diagnostic[];
  /** 부모 범위 스택(바깥 -> 안쪽) */
  scopes: KitScope[];
}

let current: KitCtx | undefined;

/** 현재 문맥. collectKit 밖에서는 진단을 버리는 기본 문맥을 돌려준다 */
export function useKit(): KitCtx {
  return current ?? { strict: false, diagnostics: [], scopes: [] };
}

/** fn을 실행하면서 노드·진단을 모은다 */
export function collectKit<T>(fn: () => T, opts?: { strict?: boolean }): { result: T; diagnostics: Diagnostic[] } {
  const prev = current;
  const ctx: KitCtx = { strict: opts?.strict === true, diagnostics: [], scopes: [] };
  current = ctx;
  try {
    const result = fn();
    return { result, diagnostics: ctx.diagnostics };
  } finally {
    current = prev;
  }
}

/** scope를 스택에 올린 채 fn을 실행한다 */
export function withScope<T>(scope: KitScope, fn: () => T): T {
  const ctx = useKit();
  ctx.scopes.push(scope);
  try {
    return fn();
  } finally {
    ctx.scopes.pop();
  }
}

/** 가장 가까운 컬렉션 이름 */
export function currentCollection(): string | undefined {
  const s = useKit().scopes;
  for (let i = s.length - 1; i >= 0; i--) {
    const c = s[i]!.collection;
    if (c !== undefined) return c;
  }
  return undefined;
}

/** ControlNode 하나를 render의 역으로 요소로 되돌린다(def·속성 순서 유지) */
export function nodeToElement(node: ControlNode): JuiElement {
  const { type, ...rest } = node.props;
  const props: Record<string, unknown> = { name: node.name };
  if (node.def !== undefined) props.def = node.def;
  Object.assign(props, rest);
  if (node.children.length > 0) props.children = node.children.map(nodeToElement);
  return { type: typeof type === "string" ? type : "use", props };
}

/**
 * 자식을 렌더하고 부모에 맞게 배치 규칙을 적용한다(고칠 수 있으면 고치고 info, 아니면 보고).
 * 직접 감싸지 말고 항상 이 함수를 쓴다.
 */
export function place(parent: { type: string; name: string; collection_name?: string }, children: JuiNode): JuiElement[] {
  const ctx = useKit();
  const coll = parent.collection_name;
  const nodes = withScope({ type: parent.type, ...(coll !== undefined ? { collection: coll } : {}), path: parent.name }, () => render(children));
  const props: JsonObject = { type: parent.type };
  if (coll !== undefined) props.collection_name = coll;
  const holder: ControlNode = { name: parent.name, props, children: nodes };
  const collection = coll ?? currentCollection();
  const solved = solvePlacement([holder], { strict: ctx.strict, ...(collection !== undefined ? { collection } : {}) });
  ctx.diagnostics.push(...solved.diagnostics);
  if (ctx.strict) {
    const err = solved.diagnostics.find((d) => d.level === "error");
    if (err) throw new Error(`[${err.rule}] ${err.message}`);
  }
  return solved.nodes[0]!.children.map(nodeToElement);
}

/** 테스트 도우미: 이름 -> 본문으로 이루어진 네임스페이스 파일 객체 */
export function kitFile(namespace: string, defs: Record<string, JuiNode>): Record<string, unknown> {
  const file: Record<string, unknown> = { namespace };
  for (const [name, body] of Object.entries(defs)) {
    const nodes = render(body);
    const n = nodes[0];
    if (!n) throw new Error(`kitFile: ${name} 본문이 비었습니다`);
    const entry = toEntry({ ...n, name });
    Object.assign(file, entry);
  }
  return file;
}
