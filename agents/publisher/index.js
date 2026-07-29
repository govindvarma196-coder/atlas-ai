class PublisherAgent {

  execute(posts) {

    console.log("\n📤 Publisher Agent Started");

    posts.forEach((post, index) => {

      console.log(`${index + 1}. Publishing ${post.product}`);

    });

    console.log("\nPublishing Finished.");

  }

}

module.exports = PublisherAgent;
