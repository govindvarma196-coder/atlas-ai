const fs = require("fs");
const path = require("path");

function getToday() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function saveOutput(rootDir, niche, contentResult, imageResult) {
  const finalOutput = `${contentResult}\n\n---\n\n# 🎨 Pinterest Image Prompts\n\n${imageResult}`;

  const outputDir = path.join(rootDir, "output");
  ensureDir(outputDir);

  const safeNiche = niche.trim().toLowerCase().replace(/\s+/g, "-");
  const fileName = `${safeNiche}-${getToday()}.md`;
  const filePath = path.join(outputDir, fileName);

  fs.writeFileSync(filePath, finalOutput, "utf8");
  return fileName;
}

function logError(rootDir, error) {
  const logsDir = path.join(rootDir, "logs");
  ensureDir(logsDir);
  const logPath = path.join(logsDir, "error.log");
  const timestamp = new Date().toISOString();
  const entry = `[${timestamp}] ${error.stack || error.message || error}\n`;
  fs.appendFileSync(logPath, entry);
}

module.exports = { saveOutput, logError, ensureDir, getToday };
