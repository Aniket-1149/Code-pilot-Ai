const { createRedisClient } = require('../../config/redis');

const redis = createRedisClient();

async function appendContext(sessionId, message) {
  const key = `context:${sessionId}`;
  await redis.rpush(key, JSON.stringify(message));
  await redis.expire(key, 60 * 60 * 24);
}

async function getContext(sessionId, limit = 20) {
  const key = `context:${sessionId}`;
  const items = await redis.lrange(key, -limit, -1);
  return items.map((item) => JSON.parse(item));
}

module.exports = { appendContext, getContext };
