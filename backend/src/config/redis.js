const Redis = require('ioredis');

function createRedisClient() {
  const url = process.env.REDIS_URL || 'redis://localhost:6379';
  return new Redis(url);
}

module.exports = { createRedisClient };
