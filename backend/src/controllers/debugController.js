const { asyncHandler } = require('../utils/asyncHandler');
const { ok } = require('../utils/response');
const { analyzeStacktrace, analyzeLogs } = require('../services/debugService');

const analyzeStack = asyncHandler(async (req, res) => {
  const output = await analyzeStacktrace(req.body.stacktrace || '');
  return ok(res, { output });
});

const analyzeRuntimeLogs = asyncHandler(async (req, res) => {
  const output = await analyzeLogs(req.body.logs || []);
  return ok(res, { output });
});

module.exports = { analyzeStack, analyzeRuntimeLogs };
