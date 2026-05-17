const dotenv = require('dotenv');

function loadEnv() {
  dotenv.config();

  const required = ['MONGO_URI', 'JWT_SECRET'];
  const missing = required.filter((key) => !process.env[key]);
  if (missing.length) {
    // eslint-disable-next-line no-console
    console.warn(`Missing required env vars: ${missing.join(', ')}`);
  }
}

module.exports = { loadEnv };
