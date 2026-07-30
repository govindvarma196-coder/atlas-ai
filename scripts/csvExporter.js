const fs = require("fs");
const path = require("path");

function escapeCsvField(field) {
  if (field == null) return "";
  const str = String(field).replace(/"/g, '""');
  return `"${str}"`;
}

function parseProductsFromContent(contentWithLinks) {
  const blocks = contentWithLinks.split(/^##\s*\d+\.\s*/m).filter(Boolean);
  const products = [];

  for (const block of blocks) {
    const nameMatch = block.match(/Product Name:\s*(.+)/i);
    const titleMatch = block.match(/Pinterest Title:\s*(.+)/i);
    const captionMatch = block.match(/Pinterest Caption:\s*(.+)/i);
    const hashtagsMatch = block.match(/Hashtags:\s*(.+)/i);
    const categoryMatch = block.match(/Affiliate Category:\s*(.+)/i);
    const linkMatch = block.match(/Affiliate Link:\s*(.+)/i);

    if (nameMatch) {
      products.push({
        productName: nameMatch[1].trim(),
        pinterestTitle: titleMatch ? titleMatch[1].trim() : "",
        pinterestCaption: captionMatch ? captionMatch[1].trim() : "",
        hashtags: hashtagsMatch ? hashtagsMatch[1].trim() : "",
        affiliateCategory: categoryMatch ? categoryMatch[1].trim() : "",
        affiliateLink: linkMatch ? linkMatch[1].trim() : "",
      });
    }
  }

  return products;
}

function exportToCsv(rootDir, niche, dateStr, contentWithLinks) {
  const products = parseProductsFromContent(contentWithLinks);

  const headers = [
    "Product Name",
    "Pinterest Title",
    "Pinterest Caption",
    "Hashtags",
    "Affiliate Category",
    "Affiliate Link",
  ];

  const rows = products.map((p) =>
    [
      p.productName,
      p.pinterestTitle,
      p.pinterestCaption,
      p.hashtags,
      p.affiliateCategory,
      p.affiliateLink,
    ]
      .map(escapeCsvField)
      .join(",")
  );

  const csvContent = [headers.map(escapeCsvField).join(","), ...rows].join("\n");

  const outputDir = path.join(rootDir, "output");
  const safeNiche = niche.trim().toLowerCase().replace(/\s+/g, "-");
  const fileName = `${safeNiche}-${dateStr}.csv`;
  const filePath = path.join(outputDir, fileName);

  fs.writeFileSync(filePath, csvContent, "utf8");
  return fileName;
}

module.exports = { exportToCsv, parseProductsFromContent };
