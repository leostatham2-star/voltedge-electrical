// One-off: recompress oversized jpgs in public/images so the repo and live site stay fast.
// Only touches files larger than 180KB. In place, keeps dimensions capped at 1920px wide.
const path = require("path");
const fs = require("fs");
const sharp = require(path.join("/home/z/my-project", "node_modules", "sharp"));

const DIR = "/home/z/my-project/public/images";
const THRESHOLD = 180 * 1024;

async function run() {
  const files = fs.readdirSync(DIR).filter((f) => /\.(jpe?g)$/i.test(f));
  for (const f of files) {
    const full = path.join(DIR, f);
    const size = fs.statSync(full).size;
    if (size < THRESHOLD) continue;
    const buf = await sharp(full)
      .resize({ width: 1920, withoutEnlargement: true })
      .jpeg({ quality: 78, mozjpeg: true })
      .toBuffer();
    if (buf.length < size) {
      fs.writeFileSync(full, buf);
      console.log(
        `${f}: ${(size / 1024).toFixed(0)}KB -> ${(buf.length / 1024).toFixed(0)}KB`
      );
    } else {
      console.log(`${f}: skipped (no gain)`);
    }
  }
  const total = fs
    .readdirSync(DIR)
    .reduce((s, f) => s + fs.statSync(path.join(DIR, f)).size, 0);
  console.log(`TOTAL images dir: ${(total / 1024 / 1024).toFixed(2)}MB`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
