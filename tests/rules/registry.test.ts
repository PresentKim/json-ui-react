import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { RULE_IDS, RULE_INFO } from "../../src/rules/catalog.generated.ts";
import { diag, getRule, listRules, ruleUrl } from "../../src/rules/registry.ts";
import type { RuleId } from "../../src/rules/registry.ts";

const BR = "/home/user/bedrock-research";
const bad = (s: string) => s as RuleId;

describe("registry", () => {
  it("proposal_flags: 반영안/제안/보강안 표기와 (반영안) 접두를 인식", () => {
    for (const id of ["INP-25", "FILE-40", "LAY-44", "MOD-20", "HOST-35", "DBG-24"]) expect(RULE_INFO[id as RuleId].proposal).toBe(true);
    for (const id of ["LAY-05", "BND-30", "FILE-39", "HOST-34", "EXP-38"]) expect(RULE_INFO[id as RuleId].proposal).toBe(false);
    for (const r of Object.values(RULE_INFO)) expect(r.title.ko.startsWith("(반영안)")).toBe(false);
  });

  it("catalog_count", () => {
    expect(RULE_IDS.length).toBeGreaterThanOrEqual(395);
    expect([...RULE_IDS]).toEqual([...RULE_IDS].sort());
    expect(Object.keys(RULE_INFO).length).toBe(RULE_IDS.length);
    for (const k of ["FILE-01", "COL-01", "INP-10", "BND-30", "DBG-30"]) expect(RULE_IDS).toContain(k);
  });
  it("gen_proposal_flag", () => {
    expect(RULE_INFO["DBG-30"].proposal).toBe(true);
    expect(RULE_INFO["COL-01"].proposal).toBe(false);
  });
  it("gen_en_mirror", () => {
    expect(RULE_INFO["COL-01"].title.en).toContain("collection_name");
    expect(RULE_INFO["COL-01"].title.ko).toContain("collection_name");
  });
  it("registry_unknown", () => {
    expect(() => getRule(bad("XXX-99"))).toThrow();
  });
  it("getRule default stage", () => {
    const r = getRule("COL-01");
    expect(r.stage).toBeDefined();
    expect(r.url).toBe("https://presentkim.github.io/bedrock-research/reference/rules#col-01");
  });
  it("ruleUrl", () => {
    expect(ruleUrl("COL-02")).toBe("https://presentkim.github.io/bedrock-research/reference/rules#col-02");
    expect(ruleUrl("DBG-30", "en")).toBe("https://presentkim.github.io/bedrock-research/en/json-ui/debugging-and-versions#dbg-30");
  });
  it("diag", () => {
    const d = diag("INP-10", "error", "ns.t");
    expect(d).toEqual({ rule: "INP-10", level: "error", path: "ns.t", message: RULE_INFO["INP-10"].title.ko, url: ruleUrl("INP-10") });
    expect(diag("INP-10", "warn", "p", "x").message).toBe("x");
  });
  it("listRules", () => {
    expect(listRules().length).toBe(RULE_IDS.length);
    const col = listRules({ category: "COL" });
    expect(col.length).toBeGreaterThan(0);
    expect(col.every((r) => r.category === "COL")).toBe(true);
  });
  it.skipIf(!existsSync(BR))("gen_deterministic / up to date", () => {
    const f = new URL("../../src/rules/catalog.generated.ts", import.meta.url);
    const before = readFileSync(f, "utf8");
    execFileSync("node", [new URL("../../scripts/gen-rules.mjs", import.meta.url).pathname, BR]);
    expect(readFileSync(f, "utf8")).toBe(before);
  });
});
