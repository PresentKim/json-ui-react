import { describe, it, expect } from "vitest";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { RULE_IDS, RULE_INFO, getRule, listRules } from "../../src/rules/registry.ts";
import { STAGES, EXTRA_STAGES, ORPHAN_STAGE_KEYS } from "../../src/rules/stages/index.ts";
import { LAYOUT_STAGES } from "../../src/rules/stages/layout.ts";
import { COLLECTION_STAGES } from "../../src/rules/stages/collections.ts";
import { EXPRESSION_STAGES } from "../../src/rules/stages/expressions.ts";
import { HOST_STAGES } from "../../src/rules/stages/hosts.ts";
import * as api from "../../src/rules/index.ts";

describe("규칙 적용 단계 커버리지", () => {
  it("coverage_all_ids: 모든 ID에 명시적 항목이 있다", () => {
    const missing = RULE_IDS.filter((id) => !(id in STAGES));
    expect(missing).toEqual([]);
  });

  it("coverage_no_orphans: STAGES 키는 모두 RULE_IDS 안에 있다", () => {
    expect(Object.keys(STAGES).filter((k) => !(k in RULE_INFO))).toEqual([]);
  });

  it("병합에서 걸러진 고아 키 목록(현재 없음)을 문서화한다", () => {
    expect(ORPHAN_STAGE_KEYS).toEqual([]);
    const raw = Object.keys({ ...LAYOUT_STAGES, ...COLLECTION_STAGES, ...EXPRESSION_STAGES, ...HOST_STAGES, ...EXTRA_STAGES });
    expect(raw.filter((k) => !(k in RULE_INFO))).toEqual(ORPHAN_STAGE_KEYS);
    expect(Object.keys(EXTRA_STAGES)).toEqual([]);
  });

  it("그룹 표 사이 중복 키가 없다", () => {
    const n = [LAYOUT_STAGES, COLLECTION_STAGES, EXPRESSION_STAGES, HOST_STAGES, EXTRA_STAGES].reduce((s, t) => s + Object.keys(t).length, 0);
    expect(n).toBe(Object.keys(STAGES).length + ORPHAN_STAGE_KEYS.length);
  });

  it("coverage_enforced_checks: enforced의 check는 src/ 안 실제 파일을 가리킨다", () => {
    const bad: string[] = [];
    for (const [id, e] of Object.entries(STAGES)) {
      if (e.status !== "enforced") continue;
      const file = e.check?.split(":")[0];
      if (!file || !existsSync(resolve(__dirname, "../../src", file))) bad.push(`${id}:${e.check}`);
    }
    expect(bad).toEqual([]);
  });

  it("getRule/listRules가 STAGES를 쓴다", () => {
    expect(listRules().length).toBe(RULE_IDS.length);
    const id = RULE_IDS[0] as Parameters<typeof getRule>[0];
    expect(getRule(id).stage).toBe(STAGES[id]!.stage);
  });

  it("src/rules/index.ts 재수출", () => {
    expect(api.STAGES).toBe(STAGES);
    expect(typeof api.getRule).toBe("function");
  });
});
