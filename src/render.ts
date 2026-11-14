// JSX 노드를 ControlNode 트리로 바꾸고 본문 객체를 만든다.
import type { ControlNode, JsonObject, JsonValue, JuiElement, JuiNode } from "./types.ts";

const RESERVED = new Set(["name", "def", "children"]);

function collect(node: unknown, out: ControlNode[]): void {
  if (node === null || node === undefined || node === false) return;
  if (Array.isArray(node)) {
    for (const n of node) collect(n, out);
    return;
  }
  if (typeof node !== "object") {
    throw new Error(`렌더할 수 없는 자식입니다(문자열·숫자·true 불가): ${JSON.stringify(node)}`);
  }
  const el = node as JuiElement;
  if (typeof el.type === "function") {
    collect(el.type(el.props), out);
    return;
  }
  out.push(build(el));
}

function build(el: JuiElement): ControlNode {
  const tag = el.type as string;
  const p = el.props;
  if (typeof p.name !== "string" || p.name === "") {
    throw new Error(`<${tag}> 요소에 name이 없습니다`);
  }
  const props: JsonObject = {};
  if (tag !== "use") props.type = tag;
  for (const k of Object.keys(p)) {
    if (RESERVED.has(k) || p[k] === undefined) continue;
    props[k] = p[k] as JsonValue;
  }
  const children: ControlNode[] = [];
  collect(p.children, children);
  const node: ControlNode = { name: p.name, def: typeof p.def === "string" ? p.def : undefined, props, children };
  return node;
}

export function render(el: JuiNode): ControlNode[] {
  const out: ControlNode[] = [];
  collect(el, out);
  return out;
}

export function toBody(node: ControlNode): JsonObject {
  const body: JsonObject = { ...node.props };
  if (node.children.length > 0) body.controls = node.children.map(toEntry);
  return body;
}

export function toEntry(node: ControlNode): Record<string, JsonObject> {
  const key = node.def ? `${node.name}@${node.def}` : node.name;
  return { [key]: toBody(node) };
}
