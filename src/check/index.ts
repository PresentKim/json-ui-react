// 모든 검사를 모은 목록. 빌드 진입점이 runChecks(files, allChecks(roots))로 쓴다.
// 참고: rewrite 단계 검사(EXP-27, HOST-34, HOST-43, INP-32)는 runChecks의 rewrite:true일 때만 동작한다.
import type { RuleCheck } from "./types.ts";
import { legacyChecks } from "../lint.ts";
import { LAYOUT_CHECKS } from "./layout.ts";
import { COLLECTION_CHECKS } from "./collections.ts";
import { EXPRESSION_CHECKS } from "./expressions.ts";
import { HOST_CHECKS } from "./hosts.ts";

/** 라우터 루트(routedRoots)를 반영한 전체 검사 목록. id 중복이면 던진다. */
export function allChecks(routedRoots: string[] = []): RuleCheck[] {
  const list = [...legacyChecks(routedRoots), ...LAYOUT_CHECKS, ...COLLECTION_CHECKS, ...EXPRESSION_CHECKS, ...HOST_CHECKS];
  const seen = new Set<string>();
  for (const c of list) {
    if (seen.has(c.id)) throw new Error(`검사 id 중복: ${c.id}`);
    seen.add(c.id);
  }
  return list;
}

export const ALL_CHECKS: RuleCheck[] = allChecks();
