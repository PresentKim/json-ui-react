import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { loadRegistry, checkPage, checkLocalePair, localize } from './lib.mjs';

const good = { title: 'T', url: 'https://x', license: 'MIT', redistribute: true, accessed: '2026-11-13' };
const noRe = { ...good, redistribute: false };

function tmp() { return fs.mkdtempSync(path.join(os.tmpdir(), 'wk-')); }
function wr(dir, rel, body) {
  const f = path.join(dir, rel);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, body);
  return f;
}
const page = (fm = {}, body = 'hello\n') => {
  const m = { title: '제목', description: 'd', sidebar_position: 1, sources: ['a'], ...fm };
  const lines = Object.entries(m).filter(([, v]) => v !== undefined).map(([k, v]) => `${k}: ${JSON.stringify(v)}`);
  return `---\n${lines.join('\n')}\n---\n\n${body}`;
};
const S = { a: good, norights: noRe };

test('test_identical_dup_ok', () => {
  const d = tmp();
  wr(d, 'a.json', JSON.stringify({ 'bedrock-wiki': good }));
  wr(d, 'b.json', JSON.stringify({ 'bedrock-wiki': { ...good } }));
  const r = loadRegistry(d);
  assert.deepEqual(r.errors, []);
  assert.ok(r.sources['bedrock-wiki']);
});

test('dup with different content errors', () => {
  const d = tmp();
  wr(d, 'a.json', JSON.stringify({ 'bedrock-wiki': good }));
  wr(d, 'b.json', JSON.stringify({ 'bedrock-wiki': { ...good, url: 'https://y' } }));
  assert.deepEqual(loadRegistry(d).errors, ['dup id bedrock-wiki: url differs']);
});

test('registry entry without license', () => {
  const d = tmp();
  const { license, ...e } = good;
  wr(d, 'a.json', JSON.stringify({ x: e }));
  assert.ok(loadRegistry(d).errors.includes('source x: missing license'));
});

test('registry bad id', () => {
  const d = tmp();
  wr(d, 'a.json', JSON.stringify({ 'Bad_Id': good }));
  assert.ok(loadRegistry(d).errors.some((e) => e.includes('Bad_Id')));
});

test('ok page', () => {
  const d = tmp();
  assert.deepEqual(checkPage(wr(d, 'docs/a.mdx', page()), S), []);
});

test('missing title', () => {
  const d = tmp();
  assert.ok(checkPage(wr(d, 'docs/a.mdx', page({ title: undefined })), S).includes('missing title'));
});

test('missing / empty sources', () => {
  const d = tmp();
  assert.ok(checkPage(wr(d, 'docs/a.mdx', page({ sources: [] })), S).includes('missing sources'));
  assert.ok(checkPage(wr(d, 'docs/b.mdx', page({ sources: undefined })), S).includes('missing sources'));
});

test('unknown source', () => {
  const d = tmp();
  assert.ok(checkPage(wr(d, 'docs/a.mdx', page({ sources: ['nope'] })), S).includes('unknown source nope'));
});

test('excerpt from non-redistributable', () => {
  const d = tmp();
  const f = wr(d, 'docs/b.mdx', page({}, '<Excerpt src="norights" title="t">\n\ntext\n\n</Excerpt>\n'));
  assert.ok(checkPage(f, S).includes('excerpt from non-redistributable source norights'));
});

test('excerpt unknown src', () => {
  const d = tmp();
  const f = wr(d, 'docs/b.mdx', page({}, '<Excerpt src="zzz" title="t">\n\ntext\n\n</Excerpt>\n'));
  assert.ok(checkPage(f, S).includes('unknown source zzz'));
});

test('test_relative_escape', () => {
  const d = tmp();
  const f = wr(d, 'wiki/docs/sec/a.mdx', page({}, 'see [x](../../guide/x.md)\n'));
  assert.ok(checkPage(f, S).includes('link leaves docs'));
});

test('relative link to existing page ok, missing flagged', () => {
  const d = tmp();
  wr(d, 'wiki/docs/sec/b.mdx', page());
  const f = wr(d, 'wiki/docs/sec/a.mdx', page({}, '[b](./b.mdx) [c](./c.mdx) [abs](/sec/b) [e](https://e.com)\n'));
  const errs = checkPage(f, S);
  assert.deepEqual(errs, ['broken link ./c.mdx']);
});

test('links inside code are ignored', () => {
  const d = tmp();
  const f = wr(d, 'wiki/docs/sec/a.mdx', page({}, '`](../../x.md)`\n\n```\n[a](../../y.md)\n```\n'));
  assert.deepEqual(checkPage(f, S), []);
});

test('test_mdx_brace', () => {
  const d = tmp();
  const f = wr(d, 'docs/a.mdx', page({}, '검증 수준은 {바닐라} 이다\n'));
  const errs = checkPage(f, S);
  assert.equal(errs.length, 1);
  assert.match(errs[0], /^mdx: /);
});

test('braces in code are fine', () => {
  const d = tmp();
  const f = wr(d, 'docs/a.mdx', page({}, '`{바닐라}`\n\n```json\n{"a": 1}\n```\n'));
  assert.deepEqual(checkPage(f, S), []);
});

test('i18n translation root: links inside stay, links out are flagged', () => {
  const d = tmp();
  const en = 'site/i18n/en/docusaurus-plugin-content-docs/current';
  wr(d, `${en}/reference/api.mdx`, page());
  const ok = wr(d, `${en}/components/a.mdx`, page({ title: 'A', description: 'd' }, '[api](../reference/api.mdx)\n'));
  assert.deepEqual(checkPage(ok, S), []);
  const out = wr(d, `${en}/components/b.mdx`, page({ title: 'B', description: 'd' }, '[x](../../x.mdx)\n'));
  assert.ok(checkPage(out, S).includes('link leaves docs'));
});

test('en page with Hangul title or description', () => {
  const d = tmp();
  const f = wr(d, 'site/i18n/en/docusaurus-plugin-content-docs/current/a.mdx', page({ title: '제목', description: '설명' }));
  const errs = checkPage(f, S);
  assert.ok(errs.includes('title has Hangul in en page'));
  assert.ok(errs.includes('description has Hangul in en page'));
  // ko pages may of course use Hangul
  assert.deepEqual(checkPage(wr(d, 'site/docs/a.mdx', page({ title: '제목', description: '설명' })), S), []);
});

test('registry en overrides: valid and invalid', () => {
  const d = tmp();
  wr(d, 'a.json', JSON.stringify({ x: { ...good, en: { title: 'X', license: 'MIT' } }, y: { ...good, en: { url: 'https://z' } }, z: { ...good, en: 'X' } }));
  const errs = loadRegistry(d).errors;
  assert.ok(!errs.some((e) => e.startsWith('source x:')));
  assert.ok(errs.some((e) => e.startsWith('source y: en must map')));
  assert.ok(errs.some((e) => e.startsWith('source z: en must map')));
});

test('localize applies overrides only for a non-default locale', () => {
  const e = { ...good, license: '라이선스', en: { license: 'License' } };
  assert.equal(localize(e, 'ko').license, '라이선스');
  assert.equal(localize(e, 'en').license, 'License');
  assert.equal(localize({ ...good }, 'en').license, 'MIT');
});

test('locale pairs: missing translation, extra translation, differing sources', () => {
  const d = tmp();
  wr(d, 'docs/a.mdx', page());
  wr(d, 'docs/b.mdx', page());
  wr(d, 'docs/c.mdx', page({ sources: ['a'] }));
  wr(d, 'en/a.mdx', page());
  wr(d, 'en/c.mdx', page({ sources: ['a', 'norights'] }));
  wr(d, 'en/z.mdx', page());
  assert.deepEqual(checkLocalePair(path.join(d, 'docs'), path.join(d, 'en')), [
    'b.mdx: missing translation',
    'c.mdx: sources differ between locales',
    'z.mdx: translation without a default-locale page',
  ]);
});

test('docusaurus heading ids are allowed, other braces in headings are not', () => {
  const d = tmp();
  assert.deepEqual(checkPage(wr(d, 'docs/a.mdx', page({}, '## 레코드 {#records}\n\ntext\n')), S), []);
  const errs = checkPage(wr(d, 'docs/b.mdx', page({}, '## 레코드 {바닐라}\n')), S);
  assert.equal(errs.length, 1);
  assert.match(errs[0], /^mdx: /);
});
