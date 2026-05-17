const { asyncHandler } = require('../utils/asyncHandler');
const { ok } = require('../utils/response');
const { createRoom } = require('../services/collaborationService');

const create = asyncHandler(async (req, res) => {
  const room = await createRoom(req.body.projectId, req.body.roomId);
  return ok(res, room);
});

module.exports = { create };
