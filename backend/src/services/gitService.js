async function createIntegration(payload) {
  return { status: 'connected', payload };
}

module.exports = { createIntegration };
