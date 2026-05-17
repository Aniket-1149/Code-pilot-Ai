const { generateText } = require('./geminiService');
const { templates } = require('../../prompts');

async function generateCode(task) {
  return generateText({ prompt: templates.codeGeneration.replace('{{task}}', task) });
}

async function completeCode(code) {
  return generateText({ prompt: templates.codeCompletion.replace('{{code}}', code) });
}

async function debugCode(details) {
  return generateText({ prompt: templates.debugging.replace('{{details}}', details) });
}

async function refactorCode(code) {
  return generateText({ prompt: templates.refactoring.replace('{{code}}', code) });
}

async function explainCode(code) {
  return generateText({ prompt: templates.explanation.replace('{{code}}', code) });
}

async function reviewCode(code) {
  return generateText({ prompt: templates.review.replace('{{code}}', code) });
}

async function promptToApp(prompt) {
  return generateText({ prompt: `Generate an app specification and project plan:\n${prompt}` });
}

async function analyzeRepository(summary) {
  return generateText({ prompt: `Analyze repository:\n${summary}` });
}

module.exports = {
  generateCode,
  completeCode,
  debugCode,
  refactorCode,
  explainCode,
  reviewCode,
  promptToApp,
  analyzeRepository
};
