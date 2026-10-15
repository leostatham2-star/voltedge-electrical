const fs = require('fs');
const data = JSON.parse(fs.readFileSync('/tmp/windfall_home.json', 'utf8'));
const html = data.html || '';

// Extract all headings
const headings = [...html.matchAll(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi)]
  .map(m => ({ level: m[1], text: m[2].replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim() }))
  .filter(h => h.text);
console.log("=== HEADINGS ===");
headings.forEach(h => console.log(`H${h.level}: ${h.text}`));

// Extract nav links
const links = [...html.matchAll(/<a[^>]*href=["']([^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi)]
  .map(m => ({ href: m[1], text: m[2].replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim() }))
  .filter(l => l.text && l.text.length < 60);
console.log("\n=== LINKS (unique by href+text) ===");
const seen = new Set();
links.forEach(l => {
  const key = l.href + '|' + l.text;
  if (!seen.has(key)) { seen.add(key); console.log(`${l.text} => ${l.href}`); }
});

// Extract images
const images = [...html.matchAll(/<img[^>]*(?:src|data-src|data-lazy-src)=["']([^"']+)["']/gi)]
  .map(m => m[1])
  .filter(u => !u.includes('logo-mobile') || true);
console.log("\n=== IMAGES ===");
[...new Set(images)].forEach(u => console.log(u));
