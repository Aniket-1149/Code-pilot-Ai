const { generateEmbedding } = require('./embeddingService');

async function embedRepository(files) {
  const vectors = [];
  for (const file of files) {
    const vector = await generateEmbedding(file.content || '');
    vectors.push({ path: file.path, vector });
  }
  return vectors;
}

module.exports = { embedRepository };
