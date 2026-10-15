const ZAI = require('z-ai-web-dev-sdk').default;
const fs = require('fs');

async function main() {
  const zai = await ZAI.create();
  const urls = {
    about: 'https://victorthemes.com/themes/windfall/about-us/',
    services: 'https://victorthemes.com/themes/windfall/services/',
    service_single: 'https://victorthemes.com/themes/windfall/service-single/',
    gallery: 'https://victorthemes.com/themes/windfall/gallery-grid/',
    contact: 'https://victorthemes.com/themes/windfall/contact-us/',
    blog: 'https://victorthemes.com/themes/windfall/blog-grid/',
  };
  const out = {};
  for (const [key, url] of Object.entries(urls)) {
    try {
      const result = await zai.functions.invoke('page_reader', { url });
      out[key] = result.data;
      console.log("OK:", key, "LEN:", (result.data.html || '').length);
    } catch (e) {
      console.log("FAILED:", key, e.message);
    }
  }
  fs.writeFileSync('/tmp/windfall_pages.json', JSON.stringify(out, null, 2));
}
main();
