const { execSync } = require('child_process');
const fs = require('fs');

const jobs = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const IMG = '/home/z/my-project/public/images';

(async () => {
  for (const job of jobs) {
    const out = `${IMG}/${job.name}`;
    if (fs.existsSync(out) && fs.statSync(out).size > 50000 && job.skipIfExists) {
      console.log(`SKIP ${job.name}`); continue;
    }
    let done = false;
    for (let attempt = 1; attempt <= 3 && !done; attempt++) {
      try {
        execSync(`z-ai image -p "${job.prompt.replace(/"/g, "'")}" -o "${out}" -s ${job.size} > /tmp/gen_${job.name}.log 2>&1`, { timeout: 180000 });
        const log = fs.readFileSync(`/tmp/gen_${job.name}.log`, 'utf8');
        if (log.includes('File saved') && fs.existsSync(out) && fs.statSync(out).size > 20000) {
          console.log(`OK ${job.name} ${fs.statSync(out).size}b`);
          done = true;
        } else { throw new Error('no file saved'); }
      } catch (e) {
        console.log(`RETRY ${job.name} attempt ${attempt}: ${(e.message || '').split('\n')[0]}`);
        await new Promise(r => setTimeout(r, 8000 * attempt));
      }
    }
    if (!done) console.log(`FAIL ${job.name}`);
    await new Promise(r => setTimeout(r, 3000));
  }
})();
