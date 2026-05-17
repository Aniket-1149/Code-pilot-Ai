const { BaseAgent } = require('./baseAgent');
const { generateText } = require('../services/ai/geminiService');

class ArchitectAgent extends BaseAgent {
  constructor() {
    super('architect');
  }

  async run(input) {
    return generateText({ prompt: input.prompt, system: 'You are a software architect.' });
  }
}

module.exports = { ArchitectAgent };
