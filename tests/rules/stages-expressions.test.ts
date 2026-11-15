import { describe, expect, it } from "vitest";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { EXPRESSION_STAGES } from "../../src/rules/stages/expressions.ts";

const DOCS = "/home/user/bedrock-research/docs";
const RE = /\b((?:EXP|BND|ANI)-\d+)\b/;

// 문서에서 ID 집합을 다시 뽑는다: rules.mdx 표 행과 json-ui 상세 불릿.
function docIds(): string[] {
  const set = new Set<string>();
  for (const line of readFileSync(`${DOCS}/reference/rules.mdx`, "utf8").split("\n")) {
    const m = line.match(/^\|\s*((?:EXP|BND|ANI)-\d+)\b/);
    if (m) set.add(m[1]);
  }
  for (const f of readdirSync(`${DOCS}/json-ui`).filter((x) => x.endsWith(".mdx"))) {
    for (const line of readFileSync(`${DOCS}/json-ui/${f}`, "utf8").split("\n")) {
      const m = line.match(/^\s*- \*\*\[([^\]]*)\]/);
      const id = m?.[1].match(RE)?.[1];
      if (id) set.add(id);
    }
  }
  return [...set].sort();
}

describe("EXPRESSION_STAGES", () => {
  it("test_stages_complete", () => {
    if (!existsSync(DOCS)) return; // 문서 저장소가 없으면 건너뜀
    expect(Object.keys(EXPRESSION_STAGES).sort()).toEqual(docIds());
  });

  it("test_stages_enforced_has_check", () => {
    for (const [id, e] of Object.entries(EXPRESSION_STAGES)) {
      expect(["type", "rewrite", "forbid", "doc"]).toContain(e.stage);
      if (e.status === "enforced") expect(e.check, id).toBeTruthy();
    }
  });

  it("known entries", () => {
    expect(EXPRESSION_STAGES["EXP-36"]).toMatchObject({ stage: "forbid", status: "enforced", check: "expr.ts:lit" });
    expect(EXPRESSION_STAGES["EXP-27"].stage).toBe("rewrite");
    expect(EXPRESSION_STAGES["ANI-38"].status).toBe("enforced");
  });
});
