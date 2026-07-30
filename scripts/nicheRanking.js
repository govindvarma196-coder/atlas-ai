// Scores 1-10. Competition ko "ease" ke roop mein rakha hai
// (jitna high, utna kam competition — better hai).
const NICHE_DATA = [
  {
    name: "Beauty/Skincare",
    pinterestDemand: 9,
    affiliatePotential: 8,
    seasonalOpportunities: 9,
    competitionEase: 2, // bahut high competition
    visualAppeal: 10,
    evergreen: 9,
  },
  {
    name: "Home Decor",
    pinterestDemand: 9,
    affiliatePotential: 7,
    seasonalOpportunities: 9,
    competitionEase: 3,
    visualAppeal: 10,
    evergreen: 8,
  },
  {
    name: "Fashion",
    pinterestDemand: 8,
    affiliatePotential: 6,
    seasonalOpportunities: 8,
    competitionEase: 1,
    visualAppeal: 9,
    evergreen: 6,
  },
  {
    name: "Kitchen",
    pinterestDemand: 7,
    affiliatePotential: 8,
    seasonalOpportunities: 6,
    competitionEase: 4,
    visualAppeal: 8,
    evergreen: 9,
  },
  {
    name: "Pet Products",
    pinterestDemand: 7,
    affiliatePotential: 7,
    seasonalOpportunities: 5,
    competitionEase: 5,
    visualAppeal: 9,
    evergreen: 9,
  },
  {
    name: "Fitness",
    pinterestDemand: 7,
    affiliatePotential: 6,
    seasonalOpportunities: 6,
    competitionEase: 2,
    visualAppeal: 7,
    evergreen: 8,
  },
  {
    name: "Gifts",
    pinterestDemand: 8,
    affiliatePotential: 6,
    seasonalOpportunities: 10,
    competitionEase: 4,
    visualAppeal: 8,
    evergreen: 5,
  },
  {
    name: "Tech Gadgets",
    pinterestDemand: 6,
    affiliatePotential: 9,
    seasonalOpportunities: 6,
    competitionEase: 3,
    visualAppeal: 7,
    evergreen: 8,
  },
  {
    name: "Books",
    pinterestDemand: 5,
    affiliatePotential: 3,
    seasonalOpportunities: 4,
    competitionEase: 6,
    visualAppeal: 6,
    evergreen: 7,
  },
];

function calculateScore(niche) {
  const {
    pinterestDemand,
    affiliatePotential,
    seasonalOpportunities,
    competitionEase,
    visualAppeal,
    evergreen,
  } = niche;

  const total =
    pinterestDemand +
    affiliatePotential +
    seasonalOpportunities +
    competitionEase +
    visualAppeal +
    evergreen;

  return Number((total / 6).toFixed(1));
}

function getRanking() {
  const ranked = NICHE_DATA.map((niche) => ({
    ...niche,
    score: calculateScore(niche),
  })).sort((a, b) => b.score - a.score);

  return ranked;
}

function printRanking() {
  const ranked = getRanking();
  console.log("\n📊 Niche Ranking (Pinterest Affiliate ke liye):\n");
  ranked.forEach((n, idx) => {
    console.log(`${idx + 1}. ${n.name} — Score: ${n.score}/10`);
  });
  console.log("");
  return ranked;
}

module.exports = { NICHE_DATA, calculateScore, getRanking, printRanking };
