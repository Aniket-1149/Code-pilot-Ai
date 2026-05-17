const { Queue, QueueEvents } = require('bullmq');
const { createRedisClient } = require('./redis');

function createQueue(name) {
  const connection = createRedisClient();
  return new Queue(name, { connection });
}

function createQueueEvents(name) {
  const connection = createRedisClient();
  return new QueueEvents(name, { connection });
}

module.exports = { createQueue, createQueueEvents };
