const { Server } = require('socket.io');
const { registerCollaborationHandlers } = require('./collaborationSocket');
const { registerAIHandlers } = require('./aiSocket');

function initSockets(server) {
  const io = new Server(server, {
    cors: {
      origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : '*'
    }
  });

  registerCollaborationHandlers(io);
  registerAIHandlers(io);

  return io;
}

module.exports = { initSockets };
