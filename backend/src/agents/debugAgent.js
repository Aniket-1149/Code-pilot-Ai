const { BaseAgent } = require('./baseAgent');
const { analyzeStacktrace } = require('../services/debugService');

class DebugAgent extends BaseAgent {
  constructor() {
    super('debug');
  }

  async run(input) {
    return analyzeStacktrace(input.stacktrace || '');
  }
}

module.exports = { DebugAgent };
