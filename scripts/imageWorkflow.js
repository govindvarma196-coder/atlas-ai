const fs = require("fs");
const path = require("path");

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function parseImagePrompts(imageResult) {
  const blocks = imageResult.split(/^##\s*(\d+)\.\s*(.+)$/m).filter(Boolean);
  const items = [];

  // blocks pattern: [number, productName, restText, number, productName, restText, ...]
  for (let i = 0; i < blocks.length; i += 3) {
    const number = blocks[i];
    const productName = blocks[i + 1];
    const rest = blocks[i + 2] || "";
    const promptMatch = rest.match(/Image Prompt:\s*"([^"]+)"/i);

    if (number && productName) {
      items.push({
        number: number.trim(),
        productName: productName.trim(),
        imagePrompt: promptMatch ? promptMatch[1].trim() : "",
      });
    }
  }

  return items;
}

function buildImageWorkflow(rootDir, niche, dateStr, imageResult) {
  const safeNiche = niche.trim().toLowerCase().replace(/\s+/g, "-");
  const imageDir = path.join(rootDir, "assets", "images", safeNiche, dateStr);

  if (!fs.existsSync(imageDir)) {
    fs.mkdirSync(imageDir, { recursive: true });
  }

  const items = parseImagePrompts(imageResult);

  const mapping = items.map((item) => {
    const paddedNum = item.number.padStart(2, "0");
    const slug = slugify(item.productName);
    const fileName = `${paddedNum}-${slug}.png`;

    return {
      number: item.number,
      productName: item.productName,
      imagePrompt: item.imagePrompt,
      fileName: fileName,
      filePath: `assets/images/${safeNiche}/${dateStr}/${fileName}`,
      status: "pending", // future automation isko "generated" karega
    };
  });

  const mappingPath = path.join(imageDir, "mapping.json");
  fs.writeFileSync(mappingPath, JSON.stringify(mapping, null, 2), "utf8");

  return { imageDir, mapping, mappingPath };
}

module.exports = { buildImageWorkflow, parseImagePrompts, slugify };
