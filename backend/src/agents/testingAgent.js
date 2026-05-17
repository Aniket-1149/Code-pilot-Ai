const { BaseAgent } = require('./baseAgent');
const { generateText } = require('../services/ai/geminiService');

class TestingAgent extends BaseAgent {
  constructor() {
    super('testing');
  }

  async run(input) {
    return generateText({ prompt: input.prompt, system: 'You generate tests.' });
  }
}

module.exports = { TestingAgent };
