const { asyncHandler } = require('../utils/asyncHandler');
const { ok } = require('../utils/response');
const { generateText } = require('../services/ai/geminiService');
const { analyzeCode } = require('../services/ai/codeIntelligenceService');

const generate = asyncHandler(async (req, res) => {
  const output = await generateText({ prompt: req.body.prompt, system: req.body.system });
  return ok(res, { output });
});

const analyze = asyncHandler(async (req, res) => {
  const result = analyzeCode(req.body.code || '');
  return ok(res, result);
});

module.exports = { generate, analyze };
