function parseProducts(contentResult) {
  const blocks = contentResult.split(/^##\s*\d+\.\s*/m).filter(Boolean);
  const products = [];

  for (const block of blocks) {
    const nameMatch = block.match(/Product Name:\s*(.+)/i);
    const titleMatch = block.match(/Pinterest Title:\s*(.+)/i);
    const captionMatch = block.match(/Pinterest Caption:\s*(.+)/i);
    const hashtagsMatch = block.match(/Hashtags:\s*(.+)/i);
    const categoryMatch = block.match(/Affiliate Category:\s*(.+)/i);

    products.push({
      productName: nameMatch ? nameMatch[1].trim() : "",
      pinterestTitle: titleMatch ? titleMatch[1].trim() : "",
      pinterestCaption: captionMatch ? captionMatch[1].trim() : "",
      hashtags: hashtagsMatch ? hashtagsMatch[1].trim() : "",
      affiliateCategory: categoryMatch ? categoryMatch[1].trim() : "",
    });
  }

  return products;
}

function validateContent(contentResult) {
  const issues = [];
  const products = parseProducts(contentResult);

  // Check 1: exactly 10 products chahiye
  if (products.length !== 10) {
    issues.push(`Expected 10 products, got ${products.length}`);
  }

  // Check 2: har product ke saare fields bhare hone chahiye
  products.forEach((p, idx) => {
    const n = idx + 1;
    if (!p.productName) issues.push(`Product ${n}: missing Product Name`);
    if (!p.pinterestTitle) issues.push(`Product ${n}: missing Pinterest Title`);
    if (!p.pinterestCaption) issues.push(`Product ${n}: missing Pinterest Caption`);
    if (!p.hashtags) issues.push(`Product ${n}: missing Hashtags`);
    if (!p.affiliateCategory) issues.push(`Product ${n}: missing Affiliate Category`);

    // Check 3: caption bahut chhota na ho (kam se kam 40 characters)
    if (p.pinterestCaption && p.pinterestCaption.length < 40) {
      issues.push(`Product ${n}: caption too short (${p.pinterestCaption.length} chars)`);
    }

    // Check 4: kam se kam 3 hashtags hone chahiye
    if (p.hashtags) {
      const tagCount = (p.hashtags.match(/#\w+/g) || []).length;
      if (tagCount < 3) {
        issues.push(`Product ${n}: only ${tagCount} hashtags (minimum 3 expected)`);
      }
    }
  });

  return {
    valid: issues.length === 0,
    issues,
    productCount: products.length,
    products,
  };
}

module.exports = { validateContent, parseProducts };
