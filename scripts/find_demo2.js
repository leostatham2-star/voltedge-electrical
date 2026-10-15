const ZAI = require('z-ai-web-dev-sdk').default;

async function main() {
  try {
    const zai = await ZAI.create();
    const queries = [
      "windfall.victorthemes.com",
      "\"windfall\" victorthemes demo electrician live preview site"
    ];
    for (const q of queries) {
      const result = await zai.functions.invoke("web_search", { query: q, num: 10 });
      console.log("=== QUERY:", q, "===");
      for (const r of result) console.log(r.url, "|", r.name);
    }
  } catch (e) {
    console.error('Search failed:', e.message);
  }
}
main();
