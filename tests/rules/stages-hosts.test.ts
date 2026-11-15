// HOST_STAGES 완전성 검사: bedrock-research 문서에서 ID 집합을 다시 뽑아 표의 키와 비교한다.
import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { HOST_STAGES } from "../../src/rules/stages/hosts.ts";

const ROOT = "/home/user/bedrock-research";
const RE = "(?:HOST|INP|MOD|DBG|ALT)-\\d+";

function deriveIds(): string[] {
  const set = new Set<string>();
  const rules = fs.readFileSync(path.join(ROOT, "docs/reference/rules.mdx"), "utf8");
  for (const m of rules.matchAll(new RegExp(`^\\|\\s*(${RE})\\b`, "gm"))) set.add(m[1]);
  const dir = path.join(ROOT, "docs/json-ui");
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".mdx"))) {
    const t = fs.readFileSync(path.join(dir, f), "utf8");
    for (const m of t.matchAll(new RegExp(`^- \\*\\*\\[(${RE})[^\\]]*\\]`, "gm"))) set.add(m[1]);
  }
  return [...set].sort();
}

describe("HOST_STAGES", () => {
  it.skipIf(!fs.existsSync(ROOT))("stages_complete: 문서 ID 집합과 키가 일치", () => {
    expect(Object.keys(HOST_STAGES).sort()).toEqual(deriveIds());
  });

  it("stages_enforced_has_check: enforced면 check 필수", () => {
    for (const [id, e] of Object.entries(HOST_STAGES)) {
      if (e.status === "enforced") expect(e.check, id).toBeTruthy();
      expect(["type", "rewrite", "forbid", "doc"]).toContain(e.stage);
    }
  });

  it("known entries", () => {
    expect(HOST_STAGES["INP-10"]).toMatchObject({ stage: "forbid", status: "enforced", check: "lint.ts:INP-10" });
    expect(HOST_STAGES["HOST-50"].status).toBe("enforced");
  });
});
