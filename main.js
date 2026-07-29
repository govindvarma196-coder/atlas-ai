const readline = require("readline");
const fs = require("fs");
const path = require("path");
const askAI = require("./ai/gemini.js");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const SUPPORTED_NICHES = ["beauty", "fitness", "fashion", "gadgets", "books"];

function getToday() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function logError(error) {
  ensureDir(path.join(__dirname, "logs"));
  const logPath = path.join(__dirname, "logs", "error.log");
  const timestamp = new Date().toISOString();
  const entry = `[${timestamp}] ${error.stack || error.message || error}\n`;
  fs.appendFileSync(logPath, entry);
}

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

function buildImagePrompt(niche) {
  return `Based on the same 10 products you just generated for the "${niche}" niche, now generate ONLY a Pinterest-style AI image prompt for each product.

Use this exact structure, in the same order as the 10 products:

## [Number]. [Product Name]
Image Prompt: "[Detailed visual description — product on clean background, Pinterest aesthetic, soft lighting, lifestyle or flat-lay style, no text overlay]"

Give all 10 image prompts, nothing else before or after.`;
}

async function main() {
  console.log(`Supported niches: ${SUPPORTED_NICHES.join(", ")}`);
  rl.question("Enter niche: ", async (nicheInput) => {
    try {
      const niche = nicheInput.trim().toLowerCase();

      if (!SUPPORTED_NICHES.includes(niche)) {
        console.log(`⚠️ "${niche}" supported list mein nahi hai, phir bhi try kar rahe hain...`);
      }

      console.log("🚀 Atlas AI Started");

      // Step 1: content generate
      const contentPrompt = buildContentPrompt(niche);
      const contentResult = await askAI(contentPrompt);
      console.log("\n--- CONTENT ---\n" + contentResult + "\n");

      // Step 2: image prompts generate (same niche context)
      const imagePrompt = buildImagePrompt(niche);
      const imageResult = await askAI(`${contentPrompt}\n\n${contentResult}\n\n${imagePrompt}`);
      console.log("\n--- IMAGE PROMPTS ---\n" + imageResult + "\n");

      const finalOutput = `${contentResult}\n\n---\n\n# 🎨 Pinterest Image Prompts\n\n${imageResult}`;

      const outputDir = path.join(__dirname, "output");
      ensureDir(outputDir);

      const safeNiche = niche.replace(/\s+/g, "-");
      const fileName = `${safeNiche}-${getToday()}.md`;
      const filePath = path.join(outputDir, fileName);

      fs.writeFileSync(filePath, finalOutput, "utf8");
      console.log(`✅ Saved to: output/${fileName}`);
    } catch (error) {
      console.error("❌ Error:", error.message);
      logError(error);
    } finally {
      rl.close();
    }
  });
}

main();
