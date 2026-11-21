#!/usr/bin/env node
/* Fills in title, date, image and excerpt for articles in data/articles.json
   by reading each article page's Open Graph tags. Needs Node 18+ and internet access.
   Usage: node scripts/fetch-article-meta.js [--force] [--download-images]
   Only empty fields are filled unless --force is given. Nothing is invented:
   if a page does not expose a field, it stays null. Review the result before publishing. */
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const file = path.join(root, 'data', 'articles.json');
const force = process.argv.includes('--force');
const dl = process.argv.includes('--download-images');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const decode = s => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;|&#x27;/g, "'")
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').trim();
const meta = (html, key) => {
  const re = new RegExp(`<meta[^>]+(?:property|name)=["']${key}["'][^>]*>`, 'i');
  const m = html.match(re); if (!m) return null;
  const c = m[0].match(/content=["']([^"']*)["']/i); return c ? decode(c[1]) : null;
};

(async () => {
  for (const a of data.articles) {
    const needs = !a.title || !a.date || !a.image || !a.excerpt_bn;
    if (!force && !needs) continue;
    try {
      const res = await fetch(a.url, { headers: { 'user-agent': 'Mozilla/5.0 (portfolio metadata check)' } });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const html = await res.text();
      const title = meta(html, 'og:title') || (html.match(/<title>([^<]*)<\/title>/i) || [])[1];
      const desc = meta(html, 'og:description') || meta(html, 'description');
      const date = meta(html, 'article:published_time') || meta(html, 'datePublished');
      let img = meta(html, 'og:image');
      if (title && (force || !a.title)) a.title = decode(title).replace(/\s*[|\-–]\s*(Jagonews24|জাগো নিউজ.*|Dhaka Mail.*)$/i, '');
      if (desc && (force || !a.excerpt_bn)) a.excerpt_bn = desc;
      if (date && (force || !a.date)) a.date = date.slice(0, 10);
      if (img && (force || !a.image)) {
        if (dl) {
          const r = await fetch(img); const buf = Buffer.from(await r.arrayBuffer());
          const ext = (path.extname(new URL(img).pathname) || '.jpg').split('?')[0];
          fs.mkdirSync(path.join(root, 'assets/images/articles'), { recursive: true });
          const rel = `assets/images/articles/${a.id}${ext}`;
          fs.writeFileSync(path.join(root, rel), buf); img = rel;
        }
        a.image = img;
      }
      console.log('OK  ', a.id, '-', a.title || '(no title found)');
    } catch (e) { console.log('FAIL', a.id, e.message); }
  }
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
  console.log('articles.json updated.');
})();
