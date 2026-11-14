// Generates site/docs/reference/sources.mdx (ko) and its en translation from the merged registry (src/data/sources.json).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { localize } from './lib.mjs';

export const CATEGORIES = [
  ['project', '이 저장소 자료', "This repository's material"],
  ['cc-by', 'CC BY', 'CC BY'],
  ['permissive', 'MIT, BSD, Apache', 'MIT, BSD, Apache'],
  ['gpl', 'GPL', 'GPL'],
  ['polyform-nc', 'PolyForm Noncommercial (비상업)', 'PolyForm Noncommercial'],
  ['facts-only', '사실만 다시 씀 (재배포 불가)', 'Facts only (not redistributable)'],
];

// Free-text license -> category key. `redistribute: false` always means facts-only.
export function categorize(entry) {
  if (entry.redistribute !== true) return 'facts-only';
  const l = String(entry.license ?? '');
  if (/PolyForm/i.test(l)) return 'polyform-nc';
  if (/^이 프로젝트/.test(l)) return 'project';
  if (/GPL/i.test(l)) return 'gpl';
  if (/CC[ -]BY/i.test(l)) return 'cc-by';
  if (/\b(MIT|BSD|Apache)\b/i.test(l)) return 'permissive';
  return 'facts-only';
}

// Escape text for a Markdown table cell inside MDX (no bare braces, angle brackets or pipes).
export function esc(text) {
  return String(text ?? '')
    .replace(/\s*\n\s*/g, ' ')
    .split(/(`[^`]*`)/)
    .map((part, i) =>
      i % 2 === 1
        ? part.replace(/\|/g, '\\|')
        : part
            .replace(/&/g, '&amp;')
            .replace(/\{/g, '&#123;')
            .replace(/\}/g, '&#125;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/\|/g, '\\|'),
    )
    .join('');
}

function titleCell(e) {
  const t = esc(e.title);
  if (e.url && /^https?:\/\/[^\s)]+$/.test(e.url)) return `[${t}](${e.url})`;
  return e.path ? `${t} (\`${String(e.path).replace(/`/g, '')}\`)` : t;
}

const TEXT = {
  ko: {
    title: '출처 목록',
    description: (n) => `이 문서 사이트가 쓴 출처 ${n}개를 라이선스별 표로 모은 것이다. id, 제목, 저작자, 라이선스, 커밋, 재배포 여부를 적는다.`,
    lead: (n) =>
      `출처 레지스트리(\`site/sources/*.json\`)의 ${n}개 항목을 라이선스 종류별로 나눈 표다. 이 페이지는 \`site/scripts/gen-sources-page.mjs\`가 레지스트리에서 만들므로 직접 고치지 않는다. 재배포가 \`true\`인 출처만 원문을 발췌하고, \`false\`인 출처는 사실만 다시 썼다. 라이선스를 어떻게 적용하는지는 [라이선스 적용 방법](./license.mdx)에 있다.`,
    head: '| id | 제목 | 저작자 | 라이선스 | 커밋 | 재배포 |',
    yes: '가능',
    no: '불가',
  },
  en: {
    title: 'Sources',
    description: (n) => `The ${n} sources this documentation site uses, grouped by license: id, title, author, license, commit and whether it may be redistributed.`,
    lead: (n) =>
      `The ${n} entries of the source registry (\`site/sources/*.json\`), grouped by license. \`site/scripts/gen-sources-page.mjs\` generates this page from the registry, so do not edit it by hand. Only sources with redistribution \`true\` are quoted; sources with \`false\` are rewritten as facts only. How each license is applied is in [How licenses are applied](./license.mdx).`,
    head: '| id | Title | Author | License | Commit | Redistribute |',
    yes: 'yes',
    no: 'no',
  },
};

export function renderSourcesPage(sources, locale = 'ko') {
  const t = TEXT[locale] ?? TEXT.ko;
  const ids = Object.keys(sources).sort();
  const groups = new Map(CATEGORIES.map(([k]) => [k, []]));
  for (const id of ids) groups.get(categorize(sources[id])).push(id);
  const lines = [
    '---',
    `title: ${JSON.stringify(t.title)}`,
    `description: ${JSON.stringify(t.description(ids.length))}`,
    'sidebar_position: 4',
    'sources:',
    '  - json-ui-react',
    '---',
    '',
    t.lead(ids.length),
    '',
  ];
  for (const [key, ko, en] of CATEGORIES) {
    const list = groups.get(key);
    if (!list.length) continue;
    lines.push(`## ${locale === 'ko' ? ko : en} (${list.length})`, '', t.head, '| --- | --- | --- | --- | --- | --- |');
    for (const id of list) {
      const e = localize(sources[id], locale);
      lines.push(`| \`${id}\` | ${titleCell(e)} | ${esc(e.author ?? '')} | ${esc(e.license)} | ${esc(e.commit ?? '')} | ${e.redistribute ? t.yes : t.no} |`);
    }
    lines.push('');
  }
  return lines.join('\n');
}

const here = path.dirname(fileURLToPath(import.meta.url));
export const OUTPUTS = {
  ko: path.resolve(here, '../docs/reference/sources.mdx'),
  en: path.resolve(here, '../i18n/en/docusaurus-plugin-content-docs/current/reference/sources.mdx'),
};

// CLI: `node gen-sources-page.mjs` writes both locales; `node gen-sources-page.mjs <sources.json> <out.mdx> [locale]` writes one.
if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const src = process.argv[2] ?? path.resolve(here, '../src/data/sources.json');
  const sources = JSON.parse(fs.readFileSync(src, 'utf8'));
  const targets = process.argv[3] ? { [process.argv[4] ?? 'ko']: process.argv[3] } : OUTPUTS;
  for (const [locale, out] of Object.entries(targets)) {
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, renderSourcesPage(sources, locale));
    console.log(`wrote ${out} (${Object.keys(sources).length} sources, ${locale})`);
  }
}
