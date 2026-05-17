const { Worker } = require('bullmq');
const { createRedisClient } = require('../config/redis');
const { trackEvent } = require('../services/analyticsService');

function createAnalyticsWorker() {
  const connection = createRedisClient();
  return new Worker('analytics-tasks', async (job) => {
    return trackEvent(job.data);
  }, { connection });
}

module.exports = { createAnalyticsWorker };
