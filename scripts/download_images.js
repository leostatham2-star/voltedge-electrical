const { execSync } = require('child_process');
const fs = require('fs');

// Image assignments: local name -> OSS url
const picks = {
  // Hero slides
  'hero-1.jpg': 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/52eb16c733cb.jpg',   // electrician working (4k wide)
  'hero-2.jpg': 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/59bd3aea00cc.jpg',   // electrician panel
  'hero-3.jpg': 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/a45bb31d31f9.png',   // home interior
  // About / welcome
  'about-main.jpg': 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/c7a5b5a8a5a6.jpg',
  'about-small.jpg': 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/f0a63d80ff68.jpg',
  // Services categories
  'service-commercial.jpg': 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/87b4e191d0ba.png',
  'service-residential.jpg': 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/f49d0ed432df.png',
  'service-industrial.jpg': 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/6c566b27f6f5.jpg',
  // Projects (6)
  'project-1.jpg': 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/dac8a9cc2aeb.jpg',
  'project-2.jpg': 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/02107c97b2fa.jpg',
  'project-3.jpg': 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/bc6e07aba066.jpg',
  'project-4.jpg': 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/207b36bdbef5.jpg',
  'project-5.jpg': 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/690fd74cfea0.jpg',
  'project-6.jpg': 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/aa8608b557ce.jpg',
  // Team (4)
  'team-1.jpg': 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/b15b7fc2aea8.jpg',
  'team-2.jpg': 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/13c9a647c653.jpg',
  'team-3.jpg': 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/86e65001dc54.jpg',
  'team-4.jpg': 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/2c2aa8d82c17.jpg',
  // Testimonials (4)
  'client-1.jpg': 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/ceb403cc5361.webp',
  'client-2.jpg': 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/598e1a6f85a6.jpg',
  'client-3.jpg': 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/df641b2a391f.jpg',
  'client-4.jpg': 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/6f6e7040e0d9.jpg',
  // Blog (3)
  'blog-1.jpg': 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/316cf13550ce.jpg',
  'blog-2.jpg': 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/30d848c88c3d.jpg',
  'blog-3.jpg': 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/e72bd703af64.jpg',
  // CTA / emergency banner
  'cta-bg.jpg': 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/0a5ed83f7b27.jpg',
  // Services page extra
  'service-banner.jpg': 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/1c07d0feb722.jpg',
};

const outDir = '/home/z/my-project/public/images';
fs.mkdirSync(outDir, { recursive: true });

for (const [name, url] of Object.entries(picks)) {
  const out = `${outDir}/${name}`;
  if (fs.existsSync(out) && fs.statSync(out).size > 10000) { console.log(`SKIP ${name}`); continue; }
  try {
    execSync(`curl -sL --max-time 60 "${url}" -o "${out}"`, { stdio: 'pipe' });
    const size = fs.statSync(out).size;
    const buf = fs.readFileSync(out).subarray(0, 12).toString('hex');
    const isImg = buf.startsWith('ffd8') || buf.startsWith('8950') || buf.includes('52494646') || buf.startsWith('4749') || buf.startsWith('424d');
    console.log(`${isImg && size > 10000 ? 'OK  ' : 'FAIL'} ${name} ${size}b`);
  } catch (e) {
    console.log(`ERR ${name}: ${e.message.split('\n')[0]}`);
  }
}
