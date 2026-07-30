// Season detection — India aur USA dono Northern Hemisphere mein hain,
// isliye seasons largely same hain, sirf India mein extra "Monsoon" hota hai
function getSeason(date) {
  const month = date.getMonth() + 1; // 1-12

  if (month === 3 || month === 4) return "Spring";
  if (month === 5 || month === 6) return "Summer";
  if (month === 7 || month === 8 || month === 9) return "Monsoon (India) / Late Summer (USA)";
  if (month === 10 || month === 11) return "Autumn / Fall";
  return "Winter"; // Dec, Jan, Feb
}

// Approximate festival dates — exact dates shift yearly (lunar/calculated),
// isliye ye reasonable estimate hai, exact nahi
function getFestivalCalendar(year) {
  return [
    // Global / Common
    { name: "New Year", date: new Date(year, 0, 1), region: "Global" },
    { name: "Valentine's Day", date: new Date(year, 1, 14), region: "Global" },
    { name: "Mother's Day", date: new Date(year, 4, 10), region: "Global" },
    { name: "Father's Day", date: new Date(year, 5, 21), region: "Global" },
    { name: "Christmas", date: new Date(year, 11, 25), region: "Global" },

    // India-specific
    { name: "Holi", date: new Date(year, 2, 3), region: "India" },
    { name: "Raksha Bandhan", date: new Date(year, 7, 28), region: "India" },
    { name: "Diwali", date: new Date(year, 10, 8), region: "India" },
    { name: "Wedding Season (India)", date: new Date(year, 10, 1), region: "India" },

    // USA-specific
    { name: "Easter", date: new Date(year, 3, 5), region: "USA" },
    { name: "Independence Day (4th July)", date: new Date(year, 6, 4), region: "USA" },
    { name: "Back To School", date: new Date(year, 7, 15), region: "USA" },
    { name: "Halloween", date: new Date(year, 9, 31), region: "USA" },
    { name: "Thanksgiving", date: new Date(year, 10, 27), region: "USA" },
    { name: "Black Friday", date: new Date(year, 10, 28), region: "USA" },
    { name: "Cyber Monday", date: new Date(year, 11, 1), region: "USA" },

    // Shopping events (dono jagah relevant)
    { name: "Prime Day", date: new Date(year, 6, 12), region: "Global" },
  ];
}

function getUpcomingFestivals(date, windowDays = 45) {
  const year = date.getFullYear();
  const festivals = [
    ...getFestivalCalendar(year),
    ...getFestivalCalendar(year + 1), // year-end wraparound ke liye
  ];

  const upcoming = [];

  for (const fest of festivals) {
    const diffDays = Math.floor((fest.date - date) / (1000 * 60 * 60 * 24));
    if (diffDays >= 0 && diffDays <= windowDays) {
      upcoming.push({ name: fest.name, region: fest.region, daysAway: diffDays });
    }
  }

  // Sabse nazdeek wale pehle
  upcoming.sort((a, b) => a.daysAway - b.daysAway);

  return upcoming;
}

function getSeasonalContext(date = new Date()) {
  const season = getSeason(date);
  const festivals = getUpcomingFestivals(date);

  let contextLine = `Current season: ${season}.`;

  if (festivals.length > 0) {
    const festivalList = festivals
      .slice(0, 3) // top 3 nearest
      .map((f) => `${f.name} (${f.region}, in ~${f.daysAway} days)`)
      .join(", ");
    contextLine += ` Upcoming festivals/occasions relevant to India and USA audiences: ${festivalList}. Prioritize products relevant to these occasions where they naturally fit the niche — consider both Indian and US shopping behavior since Pinterest audience is international.`;
  }

  return { season, festivals, contextLine };
}

module.exports = { getSeason, getUpcomingFestivals, getSeasonalContext };
