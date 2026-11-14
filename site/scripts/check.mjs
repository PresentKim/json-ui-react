#!/usr/bin/env node
// Checks the docs of both locales: frontmatter, source ids, links, licenses, MDX, and ko/en page pairs.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadRegistry, checkPage, checkLocalePair, walk } from './lib.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const KO = path.resolve(here, '../docs');
const EN = path.resolve(here, '../i18n/en/docusaurus-plugin-content-docs/current');
const { sources, errors } = loadRegistry(path.resolve(here, '../sources'));
const lines = errors.map((e) => `ERR sources: ${e}`);
const args = process.argv.slice(2);
if (args.length === 0) {
  args.push(KO, EN);
  for (const e of checkLocalePair(KO, EN)) lines.push(`ERR locales: ${e}`);
}
let n = 0;
for (const a of args) {
  for (const f of walk(a)) {
    n++;
    for (const e of checkPage(f, sources)) lines.push(`ERR ${f}: ${e}`);
  }
}
if (lines.length) {
  console.log(lines.join('\n'));
  process.exit(1);
}
console.log(`OK ${n} pages`);
