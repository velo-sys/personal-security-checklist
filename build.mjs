// Builds a single, self-contained, offline HTML file from the checklist YAML files.
// Usage: npm install && npm run build  ->  dist/Sicherheits-Checkliste.html
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = here;
const require = createRequire(import.meta.url);
const yaml = require('js-yaml');
const { marked } = require('marked');

/** Markdown -> HTML; external links open in a new tab without leaking the referrer */
const md = (text) =>
  marked
    .parse(text || '', { async: false })
    .replace(/<a href="(https?:\/\/[^"]+)"/g, '<a href="$1" target="_blank" rel="noopener noreferrer"');

const itemId = (item) => item.id || item.point.toLowerCase().replace(/ /g, '-');

// Basics first: within each section, Essential items come before Optional, then Advanced
// (stable sort, so the original order is kept inside each level)
const RANK = { essential: 0, optional: 1, advanced: 2 };
const byPriority = (a, b) => (RANK[a.priority] ?? 9) - (RANK[b.priority] ?? 9);

const load = (file) =>
  yaml.load(readFileSync(join(root, file), 'utf8')).map((s) => ({
    slug: s.slug,
    title: s.title,
    description: s.description,
    icon: s.icon,
    color: s.color,
    intro: md(s.intro),
    links: (s.softwareLinks || []).map((l) => ({ title: l.title, url: l.url })),
    items: s.checklist.map((i) => ({
      id: itemId(i),
      point: i.point,
      priority: i.priority.toLowerCase(),
      details: md(i.details),
    })).sort(byPriority),
  }));

const data = { en: load('personal-security-checklist.yml'), de: load('personal-security-checklist.de.yml') };

// Sanity checks: both languages must have identical, unique item IDs
const ids = (d) => d.flatMap((s) => s.items.map((i) => `${s.slug}/${i.id}`));
if (JSON.stringify(ids(data.en)) !== JSON.stringify(ids(data.de))) throw new Error('EN/DE item IDs differ');
const prios = (d) => d.flatMap((s) => s.items.map((i) => i.priority));
if (JSON.stringify(prios(data.en)) !== JSON.stringify(prios(data.de))) throw new Error('EN/DE priorities differ');
const flat = data.en.flatMap((s) => s.items.map((i) => i.id));
if (new Set(flat).size !== flat.length) throw new Error('Duplicate item IDs');

/** JSON that is safe to embed inside a <script> element */
const embed = (obj) => JSON.stringify(obj).replace(/</g, '\\u003c');

const css = readFileSync(join(root, 'src', 'app.css'), 'utf8');
const js = readFileSync(join(root, 'src', 'app.js'), 'utf8');
if (/<\/script/i.test(js) || /<\/style/i.test(css)) throw new Error('Closing tag found in inlined source');

const emptyProgress = { v: 1, done: {}, ignored: {}, lang: 'de', theme: 'dark', savedAt: 0 };

const html = `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="referrer" content="no-referrer">
<title>Persönliche Sicherheits-Checkliste</title>
<style id="psc-style">${css}</style>
</head>
<body>
<div id="app"><noscript>Bitte JavaScript aktivieren / Please enable JavaScript.</noscript></div>
<script id="psc-data" type="application/json">${embed(data)}</script>
<script id="psc-progress" type="application/json">${embed(emptyProgress)}</script>
<script id="psc-app">${js}</script>
</body>
</html>
`;

mkdirSync(join(root, 'dist'), { recursive: true });
const out = join(root, 'dist', 'Sicherheits-Checkliste.html');
writeFileSync(out, html);
console.log(`Wrote ${out} (${(html.length / 1024).toFixed(0)} KB, ${flat.length} items)`);
