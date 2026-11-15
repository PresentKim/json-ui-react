import { describe, it, expect } from "vitest";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { LAYOUT_STAGES } from "../../src/rules/stages/layout.ts";

const ROOT = "/home/user/bedrock-research";

// 문서에서 LAY/TXT ID 집합을 다시 뽑는다.
function docIds(): string[] {
  const ids = new Set<string>();
  const rules = readFileSync(`${ROOT}/docs/reference/rules.mdx`, "utf8");
  for (const m of rules.matchAll(/^\| ((?:LAY|TXT)-\d+) /gm)) ids.add(m[1]!);
  const dir = `${ROOT}/docs/json-ui`;
  for (const fn of readdirSync(dir).filter((x) => x.endsWith(".mdx"))) {
    const s = readFileSync(`${dir}/${fn}`, "utf8");
    for (const m of s.matchAll(/^- \*\*\[((?:LAY|TXT)-\d+)[^\]]*\]/gm)) ids.add(m[1]!);
  }
  return [...ids].sort();
}

describe("LAYOUT_STAGES", () => {
  it.skipIf(!existsSync(ROOT))("stages_complete: 문서의 LAY/TXT ID와 키가 일치", () => {
    expect(Object.keys(LAYOUT_STAGES).sort()).toEqual(docIds());
  });
  it("stages_enforced_has_check: enforced면 check가 있다", () => {
    for (const [id, e] of Object.entries(LAYOUT_STAGES)) {
      if (e.status === "enforced") expect(e.check, id).toBeTruthy();
      expect(e.note ?? "", id).not.toHaveLength(0);
      expect((e.note ?? "").length, id).toBeLessThanOrEqual(60);
    }
  });
});
