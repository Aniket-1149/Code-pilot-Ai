const { ZodError } = require('zod');
const { AppError } = require('../utils/errors');

function validate(schema) {
  return (req, res, next) => {
    try {
      schema.parse({ body: req.body, params: req.params, query: req.query });
      return next();
    } catch (err) {
      if (err instanceof ZodError) {
        return next(new AppError(err.message, 400));
      }
      return next(err);
    }
  };
}

module.exports = { validate };
