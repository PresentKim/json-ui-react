import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { compileSync } from '@mdx-js/mdx';

const ID_RE = /^[a-z0-9-]+$/;
export const LOCALIZED = ['title', 'license', 'author', 'commit'];

// Registry entry with the locale's overrides applied (ko is the base text).
export function localize(entry, locale) {
  return locale && locale !== 'ko' && entry?.[locale] ? { ...entry, ...entry[locale] } : entry;
}

export function loadRegistry(dir) {
  const sources = {};
  const errors = [];
  const files = fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith('.json')).sort() : [];
  for (const f of files) {
    let data;
    try {
      data = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
    } catch (e) {
      errors.push(`${f}: invalid JSON (${e.message})`);
      continue;
    }
    for (const [id, e] of Object.entries(data)) {
      if (!ID_RE.test(id)) errors.push(`source ${id}: invalid id`);
      if (id in sources) {
        const prev = sources[id];
        const keys = new Set([...Object.keys(prev), ...Object.keys(e)]);
        const diff = [...keys].find((k) => JSON.stringify(prev[k]) !== JSON.stringify(e[k]));
        if (diff) errors.push(`dup id ${id}: ${diff} differs`);
        continue;
      }
      sources[id] = e;
      if (!e.title) errors.push(`source ${id}: missing title`);
      if (!e.url && !e.path) errors.push(`source ${id}: missing url or path`);
      if (!e.license) errors.push(`source ${id}: missing license`);
      if (typeof e.redistribute !== 'boolean') errors.push(`source ${id}: missing redistribute`);
      if (!e.accessed) errors.push(`source ${id}: missing accessed`);
      // Optional English overrides for the en locale (footer table, excerpt head, en sources page).
      if (e.en !== undefined) {
        const ok = e.en && typeof e.en === 'object' && !Array.isArray(e.en)
          && Object.entries(e.en).every(([k, v]) => LOCALIZED.includes(k) && typeof v === 'string');
        if (!ok) errors.push(`source ${id}: en must map ${LOCALIZED.join('/')} to strings`);
      }
    }
  }
  return { sources, errors };
}

function stripCode(text) {
  return text
    .replace(/^(```|~~~)[^\n]*\n[\s\S]*?^\1[^\n]*$/gm, '')
    .replace(/`[^`\n]*`/g, '');
}

// The docs root is `.../docs` for the default locale and
// `.../i18n/<locale>/docusaurus-plugin-content-docs/current` for a translation.
function docsRoot(file) {
  const abs = path.resolve(file);
  const parts = abs.split(path.sep);
  const j = parts.lastIndexOf('docusaurus-plugin-content-docs');
  if (j >= 0 && parts[j + 1] === 'current') return parts.slice(0, j + 2).join(path.sep);
  const i = parts.lastIndexOf('docs');
  return i < 0 ? null : parts.slice(0, i + 1).join(path.sep);
}

// Bare `{...}` is a valid JS expression in MDX (e.g. `{바닐라}`) and fails only at render time, so reject it.
function noExpressions() {
  return (tree) => {
    const walkNode = (n) => {
      if (n.type === 'mdxFlowExpression' || n.type === 'mdxTextExpression') {
        const e = new Error(`expression {${n.value}} outside code; wrap it in backticks`);
        e.line = n.position?.start.line;
        throw e;
      }
      (n.children ?? []).forEach(walkNode);
    };
    walkNode(tree);
  };
}

export function checkPage(file, sources) {
  const errs = [];
  const raw = fs.readFileSync(file, 'utf8');
  let fm, body;
  try {
    ({ data: fm, content: body } = matter(raw));
  } catch (e) {
    return [`frontmatter: ${e.message.split('\n')[0]}`];
  }
  if (!fm.title) errs.push('missing title');
  if (!fm.description) errs.push('missing description');
  if (fm.sidebar_position === undefined) errs.push('missing sidebar_position');
  if (!Array.isArray(fm.sources) || fm.sources.length === 0) errs.push('missing sources');
  else for (const s of fm.sources) if (!sources[s]) errs.push(`unknown source ${s}`);
  // A translated page (i18n/<locale>/...) keeps its title and description in that language.
  const loc = /[\\/]i18n[\\/]([^\\/]+)[\\/]/.exec(path.resolve(file))?.[1];
  if (loc && loc !== 'ko') for (const k of ['title', 'description', 'sidebar_label']) {
    if (/[가-힣]/.test(String(fm[k] ?? ''))) errs.push(`${k} has Hangul in ${loc} page`);
  }

  const text = stripCode(body);
  for (const m of text.matchAll(/<Excerpt\b[^>]*?\bsrc=["']([^"']+)["']/g)) {
    const s = m[1];
    if (!sources[s]) errs.push(`unknown source ${s}`);
    else if (sources[s].redistribute !== true) errs.push(`excerpt from non-redistributable source ${s}`);
  }

  const root = docsRoot(file);
  for (const m of text.matchAll(/\]\(\s*<?([^)\s>]+)/g)) {
    const target = m[1];
    if (!/^\.\.?\//.test(target)) continue;
    const clean = target.split('#')[0].split('?')[0];
    const resolved = path.resolve(path.dirname(file), clean);
    if (root && resolved !== root && !resolved.startsWith(root + path.sep)) {
      errs.push('link leaves docs');
    } else if (!fs.existsSync(resolved)) {
      errs.push(`broken link ${target}`);
    }
  }

  try {
    // Docusaurus heading ids (`## Title {#id}`) are not MDX expressions; drop them before compiling.
    const mdx = body.replace(/^(#{1,6} [^\n]*?)\s*\{#[\w-]+\}[ \t]*$/gm, '$1');
    compileSync(mdx, { format: 'mdx', remarkPlugins: [noExpressions] });
  } catch (e) {
    errs.push(`mdx: ${String(e.reason || e.message).split('\n')[0]}${e.line ? ` (line ${e.line})` : ''}`);
  }
  return [...new Set(errs)];
}

export function walk(p) {
  const st = fs.statSync(p);
  if (st.isFile()) return /\.mdx?$/.test(p) ? [p] : [];
  return fs.readdirSync(p).sort().flatMap((n) => walk(path.join(p, n)));
}

// Every page of the default locale needs a translation with the same path and the same `sources` list.
export function checkLocalePair(koRoot, enRoot) {
  const errs = [];
  const rel = (root) => (fs.existsSync(root) ? walk(root).map((f) => path.relative(root, f)).sort() : []);
  const ko = rel(koRoot);
  const en = new Set(rel(enRoot));
  for (const f of ko) {
    if (!en.has(f)) {
      errs.push(`${f}: missing translation`);
      continue;
    }
    let a, b;
    try {
      a = matter(fs.readFileSync(path.join(koRoot, f), 'utf8')).data;
      b = matter(fs.readFileSync(path.join(enRoot, f), 'utf8')).data;
    } catch {
      en.delete(f);
      continue; // checkPage reports the frontmatter error
    }
    if (JSON.stringify(a.sources) !== JSON.stringify(b.sources)) errs.push(`${f}: sources differ between locales`);
    if (a.sidebar_position !== b.sidebar_position) errs.push(`${f}: sidebar_position differs between locales`);
    en.delete(f);
  }
  for (const f of en) errs.push(`${f}: translation without a default-locale page`);
  return errs;
}
