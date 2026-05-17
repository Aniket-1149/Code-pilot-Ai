const { logger } = require('../config/logger');
const { AppError } = require('../utils/errors');

function notFoundHandler(req, res, next) {
  return next(new AppError('Not Found', 404));
}

function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  if (status >= 500) {
    logger.error('Unhandled error', { err, requestId: req.id });
  }
  const isDev = process.env.NODE_ENV !== 'production';
  res.status(status).json({
    error: err.message || 'Internal Server Error',
    requestId: req.id,
    stack: isDev ? err.stack : undefined
  });
}

module.exports = { notFoundHandler, errorHandler };
