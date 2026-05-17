const { asyncHandler } = require('../utils/asyncHandler');
const { ok } = require('../utils/response');
const { createIntegration } = require('../services/gitService');

const connect = asyncHandler(async (req, res) => {
  const result = await createIntegration(req.body);
  return ok(res, result);
});

module.exports = { connect };
