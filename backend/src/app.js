const http = require('http');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const { loadEnv } = require('./config/env');
const { logger, requestLoggerStream } = require('./config/logger');
const { connectDatabase } = require('./config/database');
const { initPassport } = require('./config/oauth');
const { apiVersionPrefix } = require('./config/versioning');
const routes = require('./routes');
const { requestId } = require('./middleware/requestId');
const { notFoundHandler, errorHandler } = require('./middleware/error');
const { initSockets } = require('./sockets');

loadEnv();
const devBypass = ['true', '1', 'yes'].includes((process.env.DEV_BYPASS_AUTH || '').toLowerCase());

const app = express();
app.use(requestId);
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : '*',
  credentials: true
}));
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined', { stream: requestLoggerStream }));
if (process.env.NODE_ENV !== 'production' && devBypass) {
  logger.warn('DEV_BYPASS_AUTH is enabled.');
}

initPassport(app);

app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.use(apiVersionPrefix, routes);

app.use(notFoundHandler);
app.use(errorHandler);

const server = http.createServer(app);
initSockets(server);

const port = process.env.PORT || 4000;

if (require.main === module) {
  connectDatabase()
    .then(() => {
      server.listen(port, () => logger.info(`API listening on ${port}`));
    })
    .catch((err) => {
      logger.error('Failed to start server', err);
      process.exit(1);
    });
}

module.exports = { app, server };
