const { BaseAgent } = require('./baseAgent');
const { generateText } = require('../services/ai/geminiService');

class ReviewAgent extends BaseAgent {
  constructor() {
    super('review');
  }

  async run(input) {
    return generateText({ prompt: input.prompt, system: 'You review code for quality.' });
  }
}

module.exports = { ReviewAgent };
