const askAI = require("../ai/gemini.js");

function buildContentPrompt(niche) {
  return `Generate exactly 10 trending Pinterest affiliate products for the "${niche}" niche.

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
