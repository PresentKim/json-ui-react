import { describe, expect, it } from "vitest";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { COLLECTION_STAGES } from "../../src/rules/stages/collections.ts";

const DOCS = "/home/user/bedrock-research/docs";
const CAT = /^(COL|FILE|PAT)-\d+$/;

// 문서에서 기대 ID 집합을 다시 뽑는다
function docIds(): string[] {
  const ids = new Set<string>();
  const rules = readFileSync(`${DOCS}/reference/rules.mdx`, "utf8");
  for (const m of rules.matchAll(/^\| ((?:COL|FILE|PAT)-\d+) /gm)) ids.add(m[1]!);
  for (const f of readdirSync(`${DOCS}/json-ui`).filter((n) => n.endsWith(".mdx"))) {
    const t = readFileSync(`${DOCS}/json-ui/${f}`, "utf8");
    for (const m of t.matchAll(/^\s*- \*\*\[((?:COL|FILE|PAT)-\d+)[^\]]*\]\*\*/gm)) ids.add(m[1]!);
  }
  return [...ids].sort();
}

describe("COLLECTION_STAGES", () => {
  it("키는 COL/FILE/PAT ID뿐", () => {
    for (const k of Object.keys(COLLECTION_STAGES)) expect(k).toMatch(CAT);
  });
  it("enforced 항목은 check를 가진다", () => {
    for (const [k, v] of Object.entries(COLLECTION_STAGES)) {
      if (v.status === "enforced") expect(v.check, k).toBeTruthy();
    }
  });
  it("이미 코드가 검사하는 규칙", () => {
    expect(COLLECTION_STAGES["COL-02"]).toMatchObject({ stage: "rewrite", status: "enforced" });
    expect(COLLECTION_STAGES["COL-50"]).toMatchObject({ stage: "rewrite", status: "enforced" });
    expect(COLLECTION_STAGES["COL-47"]).toMatchObject({ stage: "forbid", status: "enforced", check: "lint.ts:COL-47" });
    expect(COLLECTION_STAGES["COL-49"]).toMatchObject({ stage: "forbid", status: "enforced", check: "lint.ts:COL-49" });
  });
  it.skipIf(!existsSync(DOCS))("문서의 ID 집합과 키가 같다", () => {
    expect(Object.keys(COLLECTION_STAGES).sort()).toEqual(docIds());
  });
});
