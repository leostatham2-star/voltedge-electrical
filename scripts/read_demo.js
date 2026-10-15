const ZAI = require('z-ai-web-dev-sdk').default;

async function main() {
  try {
    const zai = await ZAI.create();
    const urls = [
      'https://victorthemes.com/themes/windfall/',
      'https://victorthemes.com/splash/windfall'
    ];
    for (const url of urls) {
      try {
        const result = await zai.functions.invoke("web_reader", { url });
        console.log("=== URL:", url, "===");
        console.log("TITLE:", result.title);
        console.log("CONTENT LENGTH:", (result.content || result.html || '').length);
        console.log((result.content || result.html || '').substring(0, 3000));
        console.log("\n\n");
      } catch (e) {
        console.log("FAILED:", url, e.message);
      }
    }
  } catch (e) {
    console.error('Reader failed:', e.message);
  }
}
main();
