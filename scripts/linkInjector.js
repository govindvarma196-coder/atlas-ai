require("dotenv").config();

function buildAmazonSearchLink(productName) {
  const tag = process.env.AMAZON_AFFILIATE_TAG;
  const query = encodeURIComponent(productName.trim());
  let link = `https://www.amazon.in/s?k=${query}`;
  if (tag) {
    link += `&tag=${tag}`;
  }
  return link;
}

function injectLinks(contentResult) {
  const lines = contentResult.split("\n");
  const output = [];

  for (const line of lines) {
    output.push(line);
    const match = line.match(/^-\s*Product Name:\s*(.+)$/i);
    if (match) {
      const productName = match[1];
      const link = buildAmazonSearchLink(productName);
      output.push(`- Affiliate Link: ${link}`);
    }
  }

  return output.join("\n");
}

module.exports = { injectLinks, buildAmazonSearchLink };
