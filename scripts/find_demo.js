const ZAI = require('z-ai-web-dev-sdk').default;

async function main() {
  try {
    const zai = await ZAI.create();
    const result = await zai.functions.invoke("web_search", {
      query: "Windfall Electrician Services WordPress Theme themeforest demo",
      num: 10
    });
    console.log(JSON.stringify(result, null, 2));
  } catch (e) {
    console.error('Search failed:', e.message);
  }
}
main();
