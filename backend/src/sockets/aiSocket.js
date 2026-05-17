const { runAgentTask } = require('../services/agent/orchestrationService');

function registerAIHandlers(io) {
  io.on('connection', (socket) => {
    socket.on('agent:run', async ({ type, input }) => {
      const output = await runAgentTask(type, input);
      socket.emit('agent:output', { type, output });
    });
  });
}

module.exports = { registerAIHandlers };
