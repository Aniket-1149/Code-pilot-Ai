const Analytics = require('../models/Analytics');

async function trackEvent(payload) {
  return Analytics.create(payload);
}

module.exports = { trackEvent };
