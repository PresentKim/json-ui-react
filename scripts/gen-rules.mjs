// bedrock-research 문서에서 src/rules/catalog.generated.ts 를 만든다.
// 실행: node scripts/gen-rules.mjs [bedrock-research 경로]  (기본 ../bedrock-research)
// 출력은 결정적이다(ID 정렬, JSON.stringify).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(process.argv[2] ?? path.join(here, "../../bedrock-research"));
const OUT = path.join(here, "../src/rules/catalog.generated.ts");
const CATS = ["FILE", "LAY", "COL", "BND", "EXP", "TXT", "ANI", "INP", "MOD", "HOST", "DBG", "ALT", "PAT"];
const ID = /^([A-Z]{1,5})-(\d{2,3})$/;

function clean(md) {
  return md
    .replace(/\\\|/g, "|")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/(^|[^*])\*([^*\s][^*]*)\*/g, "$1$2")
    .replace(/&#123;/g, "{").replace(/&#125;/g, "}").replace(/&#58;/g, ":")
    .replace(/\s+/g, " ")
    .trim();
}
const okId = (id) => { const m = ID.exec(id); return m && CATS.includes(m[1]); };

function parseTable(text) {
  const out = {};
  for (const line of text.split("\n")) {
    const m = line.match(/^\| ([A-Z]{1,5}-\d{2,3}) \| (.*)\|\s*$/);
    if (!m || !okId(m[1]) || m[1] in out) continue;
    const cells = m[2].split(/(?<!\\)\|/).map((s) => s.trim());
    if (cells.length < 3) continue;
    const sources = cells.pop(), level = cells.pop();
    out[m[1]] = { text: clean(cells.join("|")), evidence: level.split(",").map((s) => clean(s)).filter(Boolean), sources: clean(sources) };
  }
  return out;
}

const PROPOSAL = /반영안|제안|보강안|상향안|미적용/;

function parseBullets(text) {
  const out = {};
  for (const line of text.split("\n")) {
    const m = line.match(/^- \*\*\[([A-Z]{1,5}-\d{2,3})([^\]]*)\]\*\*\s*(.*)$/);
    if (!m || !okId(m[1])) continue;
    let body = m[3];
    const lead = /^\((?:반영안|제안|보강안|수준 상향안)[^)]*\)\s*/;
    const proposal = PROPOSAL.test(m[2]) || lead.test(body);
    body = body.replace(lead, "");
    // 같은 ID가 여러 번 나오면 반영안이 아닌 서술을 우선한다
    if (m[1] in out && (!out[m[1]].proposal || proposal)) continue;
    let evidence = [], sources = "";
    const src = body.match(/\((?:출처|Source)\s*:\s*([^)]*)\)/);
    if (src) sources = clean(src[1]);
    const tag = body.match(/`(?:\{|&#123;)([^`]*?)(?:\}|&#125;)`/);
    if (tag) evidence = tag[1].split(",").map((s) => clean(s)).filter(Boolean);
    const detail = clean(body.replace(/`(?:\{|&#123;)[^`]*?(?:\}|&#125;)`/, "").replace(/\((?:출처|Source)\s*:[^)]*\)/, ""));
    out[m[1]] = { detail, evidence, sources, proposal };
  }
  return out;
}

function firstSentence(s) {
  const m = s.match(/^(.+?[.?!])(\s|$)/);
  return (m ? m[1] : s).slice(0, 200);
}

function loadLang(base) {
  const table = parseTable(fs.readFileSync(path.join(base, "reference/rules.mdx"), "utf8"));
  const dir = path.join(base, "json-ui");
  const bullets = {};
  if (fs.existsSync(dir)) {
    for (const f of fs.readdirSync(dir).filter((f) => f.endsWith(".mdx")).sort()) {
      const page = "json-ui/" + f.replace(/\.mdx$/, "");
      for (const [id, b] of Object.entries(parseBullets(fs.readFileSync(path.join(dir, f), "utf8")))) {
        if (!(id in bullets) || (bullets[id].proposal && !b.proposal)) bullets[id] = { ...b, page };
      }
    }
  }
  return { table, bullets };
}

const ko = loadLang(path.join(ROOT, "docs"));
const enBase = path.join(ROOT, "i18n/en/docusaurus-plugin-content-docs/current");
const en = fs.existsSync(enBase) ? loadLang(enBase) : { table: {}, bullets: {} };

const ids = [...new Set([...Object.keys(ko.table), ...Object.keys(ko.bullets)])].sort();
const info = {};
for (const id of ids) {
  const t = ko.table[id], b = ko.bullets[id], et = en.table[id], eb = en.bullets[id];
  const title = { ko: t ? t.text : firstSentence(b.detail) };
  const enTitle = et ? et.text : eb ? firstSentence(eb.detail) : undefined;
  if (enTitle) title.en = enTitle;
  const r = {
    id, category: id.split("-")[0],
    page: t ? "reference/rules" : b.page,
    anchor: id.toLowerCase(),
    proposal: !!b?.proposal,
    evidence: t ? t.evidence : b.evidence,
    title,
  };
  if (b) { r.detail = { ko: b.detail }; if (eb) r.detail.en = eb.detail; }
  r.sources = t ? t.sources : b.sources;
  info[id] = r;
}

const out = `// 자동 생성 파일 — 직접 고치지 않는다.
// 재생성: node scripts/gen-rules.mjs [bedrock-research 경로]
// 원본: bedrock-research docs/reference/rules.mdx, docs/json-ui/*.mdx (+ en 미러)
import type { RuleInfo } from "./types.ts";

export const RULE_IDS = ${JSON.stringify(ids, null, 2)} as const;

export type RuleId = (typeof RULE_IDS)[number];

export const RULE_INFO: Record<RuleId, RuleInfo> = ${JSON.stringify(info, null, 2)};
`;
fs.writeFileSync(OUT, out);
console.log(`${ids.length} rules -> ${OUT}`);
