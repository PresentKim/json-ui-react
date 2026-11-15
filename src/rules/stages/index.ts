// 적용 단계표 병합: 그룹별 표를 하나로 합친다. 중복 키는 모듈 로드 시 throw.
import type { StageEntry } from "../types.ts";
import { RULE_INFO } from "../catalog.generated.ts";
import { LAYOUT_STAGES } from "./layout.ts";
import { COLLECTION_STAGES } from "./collections.ts";
import { EXPRESSION_STAGES } from "./expressions.ts";
import { HOST_STAGES } from "./hosts.ts";

// 그룹 표에 빠진 ID를 위한 보충 표(현재 누락 없음)
export const EXTRA_STAGES: Record<string, StageEntry> = {};

const TABLES: Record<string, StageEntry>[] = [LAYOUT_STAGES, COLLECTION_STAGES, EXPRESSION_STAGES, HOST_STAGES, EXTRA_STAGES];

// 카탈로그에 없는 키(고아)는 병합에서 제외하고 목록으로 노출한다
export const ORPHAN_STAGE_KEYS: string[] = [];

function merge(): Record<string, StageEntry> {
  const out: Record<string, StageEntry> = {};
  for (const t of TABLES) {
    for (const [id, e] of Object.entries(t)) {
      if (id in out) throw new Error(`적용 단계표 중복 키: ${id}`);
      if (!(id in RULE_INFO)) {
        ORPHAN_STAGE_KEYS.push(id);
        continue;
      }
      out[id] = e;
    }
  }
  return out;
}

export const STAGES: Record<string, StageEntry> = merge();
