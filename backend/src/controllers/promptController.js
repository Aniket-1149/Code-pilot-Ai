const { asyncHandler } = require('../utils/asyncHandler');
const { ok } = require('../utils/response');
const { createPrompt, listPrompts } = require('../services/promptService');

const create = asyncHandler(async (req, res) => {
  const prompt = await createPrompt({ ...req.body, user: req.user.id });
  return ok(res, prompt);
});

const list = asyncHandler(async (req, res) => {
  const prompts = await listPrompts(req.user.id, req.query.projectId);
  return ok(res, prompts);
});

module.exports = { create, list };
