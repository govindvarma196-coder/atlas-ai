const { GoogleGenAI } = require("@google/genai");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  apiVersion: "v1beta",
});

async function generateSingleImage(prompt, outputFilePath) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-image",
    contents: prompt,
  });

  const parts = response.candidates?.[0]?.content?.parts || [];
  const imagePart = parts.find((p) => p.inlineData);

  if (!imagePart) {
    throw new Error("No image data returned from model");
  }

  const buffer = Buffer.from(imagePart.inlineData.data, "base64");
  fs.writeFileSync(outputFilePath, buffer);
  return outputFilePath;
}

async function generateImagesForMapping(rootDir, mapping, imageDir) {
  const results = [];

  for (const item of mapping) {
    const outputPath = path.join(rootDir, item.filePath);

    try {
      await generateSingleImage(item.imagePrompt, outputPath);
      item.status = "generated";
      console.log(`✅ Image generated: ${item.fileName}`);
      results.push({ ...item, success: true });
    } catch (error) {
      item.status = "failed";
      console.log(`❌ Image failed: ${item.fileName} — ${error.message}`);
      results.push({ ...item, success: false, error: error.message });
    }

    // thoda gap rakho taaki rate limit na tuute
    await new Promise((r) => setTimeout(r, 2000));
  }

  // updated mapping.json wapas save kar (status update ho gaya)
  const mappingPath = path.join(imageDir, "mapping.json");
  fs.writeFileSync(mappingPath, JSON.stringify(mapping, null, 2), "utf8");

  return results;
}

module.exports = { generateSingleImage, generateImagesForMapping };
