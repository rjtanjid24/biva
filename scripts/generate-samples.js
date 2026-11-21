#!/usr/bin/env node
/* Rebuilds data/samples.json from the files in assets/audio/.
   Usage: node scripts/generate-samples.js [--keep-missing]
   - New audio files are added with a title made from the file name.
   - Existing entries keep any titles/descriptions you edited.
   - Entries whose file no longer exists are removed (unless --keep-missing). */
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const audioDir = path.join(root, 'assets', 'audio');
const out = path.join(root, 'data', 'samples.json');
const EXT = new Set(['.mp3', '.m4a', '.wav', '.ogg', '.aac', '.flac']);
const keepMissing = process.argv.includes('--keep-missing');

const prev = fs.existsSync(out) ? JSON.parse(fs.readFileSync(out, 'utf8')) : {};
const old = Array.isArray(prev.samples) ? prev.samples : [];
const byFile = new Map(old.map(s => [s.file, s]));
const files = fs.existsSync(audioDir)
  ? fs.readdirSync(audioDir).filter(f => EXT.has(path.extname(f).toLowerCase())).sort() : [];

if (!files.length) {
  console.error('No audio files found in assets/audio/. Nothing changed (samples.json left as it was).');
  process.exit(1);
}

const pretty = f => path.basename(f, path.extname(f)).replace(/[-_]+/g, ' ').replace(/\s+/g, ' ').trim()
  .replace(/\b\w/g, c => c.toUpperCase());
let order = Math.max(0, ...old.map(s => s.order || 0));
const samples = [];
for (const f of files) {
  const s = byFile.get(f);
  if (s) { samples.push(s); continue; }
  order += 1;
  const t = pretty(f);
  samples.push({ file: f, title_bn: t, title_en: t, description_bn: '', description_en: '', category: 'voice-over', order });
  console.log('Added   ', f);
}
for (const s of old) {
  if (!files.includes(s.file)) {
    if (keepMissing) samples.push(s);
    console.log(keepMissing ? 'Kept (file missing):' : 'Removed (file missing):', s.file);
  }
}
samples.sort((a, b) => (a.order || 999) - (b.order || 999));
fs.writeFileSync(out, JSON.stringify({ _help: prev._help || 'Auto-managed by scripts/generate-samples.js.', samples }, null, 2) + '\n');
console.log(`samples.json updated: ${samples.length} sample(s).`);
