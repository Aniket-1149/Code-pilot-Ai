const { generateText } = require('./ai/geminiService');

async function analyzeStacktrace(stacktrace) {
  const prompt = `Analyze this stacktrace and suggest fixes:\n${stacktrace}`;
  return generateText({ prompt });
}

async function analyzeLogs(logs) {
  const prompt = `Analyze runtime logs and diagnose issues:\n${logs.join('\n')}`;
  return generateText({ prompt });
}

module.exports = { analyzeStacktrace, analyzeLogs };
