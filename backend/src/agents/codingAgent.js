const { BaseAgent } = require('./baseAgent');
const { generateText } = require('../services/ai/geminiService');

class CodingAgent extends BaseAgent {
  constructor() {
    super('coding');
  }

  async run(input) {
    return generateText({ prompt: input.prompt, system: 'You are a coding agent.' });
  }
}

module.exports = { CodingAgent };
