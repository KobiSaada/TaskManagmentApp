const env = require('../config/env');

const errorHandler = (err, req, res, _next) => {
  const status = err.status || 500;
  const payload = {
    message: err.message || 'Internal Server Error'
  };
  if (env.NODE_ENV !== 'production' && err.stack) payload.stack = err.stack;
  res.status(status).json(payload);
};

module.exports = { errorHandler };
