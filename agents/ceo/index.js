class CEOAgent {
  constructor() {
    this.name = "CEO Agent";
  }

  think(task) {
    console.log("🧠 CEO received task:");
    console.log(task);

    console.log("\n📢 CEO: Calling Research Agent...");
  }
}

const ceo = new CEOAgent();

ceo.think("Find the best affiliate products for Pinterest today.");
