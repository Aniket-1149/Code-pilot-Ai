const { GoogleGenerativeAI } = require('@google/generative-ai');

function createGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY not set');
  return new GoogleGenerativeAI(apiKey);
}

async function generateText({ model = 'gemini-2.5-flash', prompt, system }) {
  const client = createGeminiClient();
  const genModel = client.getGenerativeModel({ model });
  const result = await genModel.generateContent([system, prompt].filter(Boolean));
  return result.response.text();
}

async function embedText({ model = 'text-embedding-004', text }) {
  const client = createGeminiClient();
  const embedModel = client.getGenerativeModel({ model });
  const result = await embedModel.embedContent(text);
  return result.embedding.values;
}

module.exports = { generateText, embedText };
