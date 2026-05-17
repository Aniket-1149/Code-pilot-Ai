const { BaseAgent } = require('./baseAgent');
const { generateText } = require('../services/ai/geminiService');

class RefactorAgent extends BaseAgent {
  constructor() {
    super('refactor');
  }

  async run(input) {
    return generateText({ prompt: input.prompt, system: 'You refactor code safely.' });
  }
}

module.exports = { RefactorAgent };
