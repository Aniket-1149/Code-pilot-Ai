const { Worker } = require('bullmq');
const { createRedisClient } = require('../config/redis');
const { runAgentTask } = require('../services/agent/orchestrationService');

function createAgentWorker() {
  const connection = createRedisClient();
  return new Worker('agent-tasks', async (job) => {
    return runAgentTask(job.data.type, job.data.input);
  }, { connection });
}

module.exports = { createAgentWorker };
