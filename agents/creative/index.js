class CreativeAgent {

  execute(campaigns) {

    console.log("\n🎨 Creative Agent Started");

    const posts = campaigns.map(item => {

      return {

        product: item.product,

        title: item.title,

        caption: item.caption,

        imagePrompt:
`Luxury ${item.product}, black aesthetic background, cinematic lighting, ultra realistic, premium product photography, Pinterest style`

      };

    });

    console.log("Creative Assets Ready.");

    return posts;

  }

}

module.exports = CreativeAgent;
