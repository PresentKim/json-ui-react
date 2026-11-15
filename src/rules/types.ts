// 규칙 레지스트리 공용 타입 (T1 소유, 다른 작업은 type-only import)
export type RuleCategory = "FILE" | "LAY" | "COL" | "BND" | "EXP" | "TXT" | "ANI" | "INP" | "MOD" | "HOST" | "DBG" | "ALT" | "PAT";
export type RuleStage = "type" | "rewrite" | "forbid" | "doc";
export interface StageEntry { stage: RuleStage; status: "enforced" | "planned"; check?: string; note?: string }
export interface RuleInfo { id: string; category: RuleCategory; page: string; anchor: string; proposal: boolean; evidence: string[]; title: { ko: string; en?: string }; detail?: { ko: string; en?: string }; sources: string }
export interface Rule extends RuleInfo, StageEntry { url: string; urlEn: string }
