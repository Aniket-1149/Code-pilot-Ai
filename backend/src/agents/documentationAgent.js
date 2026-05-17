const { BaseAgent } = require('./baseAgent');
const { generateText } = require('../services/ai/geminiService');

class DocumentationAgent extends BaseAgent {
  constructor() {
    super('documentation');
  }

  async run(input) {
    return generateText({ prompt: input.prompt, system: 'You write clear docs.' });
  }
}

module.exports = { DocumentationAgent };
