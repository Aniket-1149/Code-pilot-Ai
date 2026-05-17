const { asyncHandler } = require('../utils/asyncHandler');
const { ok } = require('../utils/response');
const { runAgentTask } = require('../services/agent/orchestrationService');

const runAgent = asyncHandler(async (req, res) => {
  const output = await runAgentTask(req.body.type, req.body.input);
  return ok(res, { output });
});

module.exports = { runAgent };
