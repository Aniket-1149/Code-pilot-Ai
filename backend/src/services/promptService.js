const Prompt = require('../models/Prompt');

async function createPrompt(data) {
  return Prompt.create(data);
}

async function listPrompts(userId, projectId) {
  const query = { user: userId };
  if (projectId) query.project = projectId;
  return Prompt.find(query).sort({ createdAt: -1 });
}

module.exports = { createPrompt, listPrompts };
