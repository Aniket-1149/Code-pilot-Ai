const CollaborationRoom = require('../models/CollaborationRoom');

async function createRoom(projectId, roomId) {
  return CollaborationRoom.create({ project: projectId, roomId });
}

async function getRoom(roomId) {
  return CollaborationRoom.findOne({ roomId });
}

module.exports = { createRoom, getRoom };
