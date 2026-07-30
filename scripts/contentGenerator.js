const askAI = require("../ai/gemini.js");
const { getSeasonalContext } = require("./seasonalIntelligence.js");

function buildContentPrompt(niche) {
  const { contextLine } = getSeasonalContext();

  return `Generate exactly 10 trending Pinterest affiliate products for the "${niche}" niche.

${contextLine}

Choose products that make sense for the current season and any upcoming festival/occasion mentioned above, while staying relevant to the "${niche}" niche. Do not force festival products if they don't fit the niche naturally.

For EACH product, use this exact structure:

## [Number]. [Product Name]
- Product Name: ...
- Pinterest Title: ...
- Pinterest Caption: ...
- Hashtags: ...
- Affiliate Category: ...

Give all 10 products in this format, nothing else before or after.`;
}

async function generateContent(niche) {
  const prompt = buildContentPrompt(niche);
  const result = await askAI(prompt);
  return { prompt, result };
}

module.exports = { generateContent, buildContentPrompt };
