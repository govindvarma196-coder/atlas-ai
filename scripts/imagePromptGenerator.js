const askAI = require("../ai/gemini.js");

function buildImagePrompt(niche) {
  return `Based on the same 10 products you just generated for the "${niche}" niche, now generate ONLY a Pinterest-style AI image prompt for each product.

Use this exact structure, in the same order as the 10 products:

## [Number]. [Product Name]
Image Prompt: "[Detailed visual description — product on clean background, Pinterest aesthetic, soft lighting, lifestyle or flat-lay style, no text overlay]"

Give all 10 image prompts, nothing else before or after.`;
}

async function generateImagePrompts(niche, contentPrompt, contentResult) {
  const imagePrompt = buildImagePrompt(niche);
  const fullPrompt = `${contentPrompt}\n\n${contentResult}\n\n${imagePrompt}`;
  const result = await askAI(fullPrompt);
  return result;
}

module.exports = { generateImagePrompts };
