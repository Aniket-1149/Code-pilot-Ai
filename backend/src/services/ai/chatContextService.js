const { getContext } = require('./contextMemoryService');

async function buildChatContext(sessionId, repoSummary) {
  const history = await getContext(sessionId, 20);
  return {
    history,
    repoSummary
  };
}

module.exports = { buildChatContext };
