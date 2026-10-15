const ZAI = require('z-ai-web-dev-sdk').default;
const fs = require('fs');

async function main() {
  const zai = await ZAI.create();
  const urls = [
    'https://victorthemes.com/themes/windfall/',
  ];
  for (const url of urls) {
    try {
      const result = await zai.functions.invoke('page_reader', { url });
      fs.writeFileSync('/tmp/windfall_home.json', JSON.stringify(result.data, null, 2));
      console.log("OK:", url, "TITLE:", result.data.title, "LEN:", (result.data.html||'').length);
    } catch (e) {
      console.log("FAILED:", url, e.message);
    }
  }
}
main();
