const readline = require("readline");
const { generateContent } = require("./scripts/contentGenerator.js");
const { generateImagePrompts } = require("./scripts/imagePromptGenerator.js");
const { saveOutput, logError } = require("./scripts/fileSaver.js");

const SUPPORTED_NICHES = ["beauty", "fitness", "fashion", "gadgets", "books"];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function main() {
  console.log(`Supported niches: ${SUPPORTED_NICHES.join(", ")}`);
  rl.question("Enter niche: ", async (nicheInput) => {
    try {
      const niche = nicheInput.trim().toLowerCase();

      if (!SUPPORTED_NICHES.includes(niche)) {
        console.log(`⚠️ "${niche}" supported list mein nahi hai, phir bhi try kar rahe hain...`);
      }

      console.log("🚀 Atlas AI Started");

      const { prompt: contentPrompt, result: contentResult } = await generateContent(niche);
      console.log("\n--- CONTENT ---\n" + contentResult + "\n");

      const imageResult = await generateImagePrompts(niche, contentPrompt, contentResult);
      console.log("\n--- IMAGE PROMPTS ---\n" + imageResult + "\n");

      const fileName = saveOutput(__dirname, niche, contentResult, imageResult);
      console.log(`✅ Saved to: output/${fileName}`);
    } catch (error) {
      console.error("❌ Error:", error.message);
      logError(__dirname, error);
    } finally {
      rl.close();
    }
  });
}

main();
