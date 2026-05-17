const { asyncHandler } = require('../utils/asyncHandler');
const { ok } = require('../utils/response');
const { trackEvent } = require('../services/analyticsService');

const track = asyncHandler(async (req, res) => {
  const event = await trackEvent({ ...req.body, user: req.user.id });
  return ok(res, event);
});

module.exports = { track };
