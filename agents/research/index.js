class ResearchAgent {

  execute(task) {

    console.log("\n🔍 Research Agent Started");
    console.log("Task:", task);

    const products = [
      "Minimalist Watch",
      "Oversized T-Shirt",
      "Desk Lamp",
      "Travel Backpack",
      "Gaming Mouse"
    ];

    console.log("\nProducts Found:");

    products.forEach((item, index) => {
      console.log(`${index + 1}. ${item}`);
    });

    return products;

  }

}

module.exports = ResearchAgent;
