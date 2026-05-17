const { Worker } = require('bullmq');
const { createRedisClient } = require('../config/redis');
const { analyzeStacktrace } = require('../services/debugService');

function createDebugWorker() {
  const connection = createRedisClient();
  return new Worker('debug-tasks', async (job) => {
    return analyzeStacktrace(job.data.stacktrace || '');
  }, { connection });
}

module.exports = { createDebugWorker };
