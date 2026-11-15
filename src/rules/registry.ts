// 규칙 레지스트리: 카탈로그(생성) + 적용 단계표(STAGES)를 합쳐 조회한다.
import { RULE_IDS, RULE_INFO, type RuleId } from "./catalog.generated.ts";
import { STAGES } from "./stages/index.ts";
import type { Rule, RuleCategory, RuleStage, StageEntry } from "./types.ts";
import type { Diagnostic } from "../lint.ts";

export { RULE_IDS, RULE_INFO };
export type { RuleId };

const BASE = "https://presentkim.github.io/bedrock-research";
const DEFAULT_STAGE: StageEntry = { stage: "doc", status: "planned" };

export function ruleUrl(id: RuleId, lang: "ko" | "en" = "ko"): string {
  const info = RULE_INFO[id];
  if (!info) throw new Error(`알 수 없는 규칙 ID: ${id}`);
  return `${BASE}${lang === "en" ? "/en" : ""}/${info.page}#${info.anchor}`;
}

export function getRule(id: RuleId): Rule {
  const info = RULE_INFO[id];
  if (!info) throw new Error(`알 수 없는 규칙 ID: ${id}`);
  const st = STAGES[id] ?? DEFAULT_STAGE;
  return { ...info, ...st, url: ruleUrl(id), urlEn: ruleUrl(id, "en") };
}

export function listRules(filter: { category?: RuleCategory; stage?: RuleStage; status?: "enforced" | "planned" } = {}): Rule[] {
  return RULE_IDS.map((id) => getRule(id)).filter(
    (r) =>
      (!filter.category || r.category === filter.category) &&
      (!filter.stage || r.stage === filter.stage) &&
      (!filter.status || r.status === filter.status),
  );
}

export function diag(id: RuleId, level: "error" | "warn" | "info", path: string, message?: string): Diagnostic & { url: string } {
  const r = getRule(id);
  return { rule: id, level, path, message: message ?? r.title.ko, url: r.url };
}
