const { asyncHandler } = require('../utils/asyncHandler');
const { ok } = require('../utils/response');
const { executeCode } = require('../services/executionService');

const run = asyncHandler(async (req, res) => {
  const result = await executeCode(req.body);
  return ok(res, result);
});

module.exports = { run };
