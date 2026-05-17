const { generateEmbedding } = require('./embeddingService');

async function semanticSearch({ query, index }) {
  const embedding = await generateEmbedding(query);
  return { embedding, index, results: [] };
}

module.exports = { semanticSearch };
