class MarketingAgent {

  execute(products) {

    console.log("\n📢 Marketing Agent Started");

    const ideas = products.map(product => ({
      product,
      title: `${product} - Best Choice in 2026`,
      caption: `🔥 Check out this ${product}. Link in bio!`
    }));

    console.log("\nMarketing Campaign Ready.");

    return ideas;
  }

}

module.exports = MarketingAgent;
