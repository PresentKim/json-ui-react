// 규칙 검사 엔진의 공용 타입 (T1 소유, 다른 검사 모듈이 type-only로 가져간다).
import type { JsonObject } from "../types.ts";
import type { Diagnostic } from "../lint.ts";
import type { RuleId } from "../rules/catalog.generated.ts";
export type { Diagnostic, RuleId };
export interface NodeCtx {
  body: JsonObject;            // the control body (mutable only in rewrite mode)
  key: string;                 // entry key as written, e.g. "cell@ns.base"
  name: string;                // key before "@"
  ref?: string;                // key after "@" if any
  path: string;                // "ns.def/child/grandchild"
  type?: string;               // body.type if string
  parent?: NodeCtx;            // undefined for top-level definitions
  depth: number;               // 0 for top-level definition
  ns: string; file: string;    // namespace and file path of the definition
  index: DefIndex;             // lookup across all files
  rewrite: boolean;
}
export interface DefIndex { get(fullName: string): { ns: string; name: string; ref?: string; body: JsonObject; file: string } | undefined; all(): { ns: string; name: string; ref?: string; body: JsonObject; file: string }[] }
export type Report = (level: "error" | "warn" | "info", message?: string) => void;
export interface RuleCheck {
  id: RuleId;
  stage: "forbid" | "rewrite";
  node?(ctx: NodeCtx, report: Report): void;                                  // every control body incl. top-level defs
  file?(f: { path: string; json: JsonObject; files: Record<string, JsonObject> }, report: Report): void; // once per file
}
