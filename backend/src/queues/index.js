const { createQueue } = require('../config/queue');

const agentQueue = createQueue('agent-tasks');
const debugQueue = createQueue('debug-tasks');
const analyticsQueue = createQueue('analytics-tasks');

module.exports = { agentQueue, debugQueue, analyticsQueue };
