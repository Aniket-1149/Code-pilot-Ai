const { asyncHandler } = require('../utils/asyncHandler');
const { ok } = require('../utils/response');
const AISession = require('../models/AISession');

const create = asyncHandler(async (req, res) => {
  const session = await AISession.create({ user: req.user.id, ...req.body });
  return ok(res, session);
});

const list = asyncHandler(async (req, res) => {
  const sessions = await AISession.find({ user: req.user.id }).sort({ createdAt: -1 });
  return ok(res, sessions);
});

module.exports = { create, list };
