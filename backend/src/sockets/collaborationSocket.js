const { createRoom } = require('../services/collaborationService');

function registerCollaborationHandlers(io) {
  io.on('connection', (socket) => {
    socket.on('room:join', async ({ roomId, projectId }) => {
      await createRoom(projectId, roomId);
      socket.join(roomId);
      socket.emit('room:joined', { roomId });
    });

    socket.on('cursor:move', ({ roomId, cursor }) => {
      socket.to(roomId).emit('cursor:update', { cursor });
    });

    socket.on('code:change', ({ roomId, patch }) => {
      socket.to(roomId).emit('code:patch', { patch });
    });
  });
}

module.exports = { registerCollaborationHandlers };
