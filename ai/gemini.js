const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  apiVersion: "v1beta",
});

// priority order — pehle wala try hoga, fail hone par agla
const MODEL_FALLBACKS = [
  "gemini-3-flash-preview",
  "gemini-2.5-flash",
  "gemini-3.1-flash-lite",
  "gemini-2.0-flash",
];

async function askAI(prompt) {
  let lastError;

  for (const model of MODEL_FALLBACKS) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
      });
      console.log(`✅ Used model: ${model}`);
      return response.text;
    } catch (error) {
      lastError = error;
      const status = error?.status;

      if (status === 404) {
        console.log(`⚠️ ${model} not available, trying next...`);
        continue;
      }

      if (status === 429) {
        console.log(`⏳ ${model} rate-limited, waiting 3s then trying next...`);
        await new Promise((r) => setTimeout(r, 3000));
        continue;
      }

      // koi aur error ho to turant throw kar de
      throw error;
    }
  }

  throw new Error(`Sabhi models fail ho gaye. Last error: ${lastError?.message}`);
}

module.exports = askAI;
