const { embedText } = require('./geminiService');

async function generateEmbedding(text) {
  return embedText({ text });
}

module.exports = { generateEmbedding };
