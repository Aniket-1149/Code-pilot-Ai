const { CodingAgent } = require('../../agents/codingAgent');
const { DebugAgent } = require('../../agents/debugAgent');
const { RefactorAgent } = require('../../agents/refactorAgent');
const { ArchitectAgent } = require('../../agents/architectAgent');
const { TestingAgent } = require('../../agents/testingAgent');
const { DocumentationAgent } = require('../../agents/documentationAgent');
const { ReviewAgent } = require('../../agents/reviewAgent');

const agents = {
  coding: new CodingAgent(),
  debug: new DebugAgent(),
  refactor: new RefactorAgent(),
  architect: new ArchitectAgent(),
  testing: new TestingAgent(),
  documentation: new DocumentationAgent(),
  review: new ReviewAgent()
};

async function runAgentTask(type, input) {
  const agent = agents[type];
  if (!agent) throw new Error(`Unknown agent type: ${type}`);
  return agent.run(input);
}

module.exports = { runAgentTask };
