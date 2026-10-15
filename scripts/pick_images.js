const fs = require('fs');
const dir = '/tmp/imgsearch';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
for (const f of files) {
  try {
    const raw = fs.readFileSync(`${dir}/${f}`, 'utf8');
    const data = JSON.parse(raw);
    console.log(`\n=== ${f} (${data.count}) ===`);
    data.results.forEach((r, i) => {
      console.log(`[${i}] ${r.original_width}x${r.original_height} ${r.original_url}`);
    });
  } catch (e) {
    console.log(`\n=== ${f} ERROR: ${e.message} ===`);
  }
}
