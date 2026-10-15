const fs = require('fs');
const data = JSON.parse(fs.readFileSync('/tmp/windfall_pages.json', 'utf8'));

for (const [key, page] of Object.entries(data)) {
  const html = page.html || '';
  console.log(`\n########## ${key.toUpperCase()} ##########`);
  
  // Headings
  const headings = [...html.matchAll(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi)]
    .map(m => ({ level: m[1], text: m[2].replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim() }))
    .filter(h => h.text);
  headings.forEach(h => console.log(`H${h.level}: ${h.text}`));
}

// All images across all pages + home
const home = JSON.parse(fs.readFileSync('/tmp/windfall_home.json', 'utf8'));
const all = { home, ...data };
const imgSet = new Set();
for (const [key, page] of Object.entries(all)) {
  const html = page.html || '';
  [...html.matchAll(/(?:src|data-src|data-lazy-src|data-bg)=["']([^"']*(?:uploads|images)[^"']*\.(?:jpg|jpeg|png|webp|gif)[^"']*)["']/gi)]
    .forEach(m => imgSet.add(m[1]));
  [...html.matchAll(/url\((?:&quot;|"|')?(https?:\/\/[^)"'&]+\.(?:jpg|jpeg|png|webp)[^)"'&]*)/gi)]
    .forEach(m => imgSet.add(m[1]));
}
console.log("\n########## ALL IMAGES ##########");
[...imgSet].forEach(u => console.log(u));
