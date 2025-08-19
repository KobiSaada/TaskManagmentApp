const { ZodError } = require('zod');

function sendValidation(res, error) {
  const details = error instanceof ZodError ? error.flatten() : String(error);
  return res.status(400).json({
    error: { code: 'VALIDATION_ERROR', message: 'Invalid input', details }
  });
}

exports.validateBody = (schema) => (req, res, next) => {
  try {
    const r = schema.safeParse(req.body);
    if (!r.success) return sendValidation(res, r.error);
    req.body = r.data;
    next();
  } catch (e) { return sendValidation(res, e); }
};

exports.validateQuery = (schema) => (req, res, next) => {
  try {
    const r = schema.safeParse(req.query);
    if (!r.success) return sendValidation(res, r.error);
    req.query = r.data;
    next();
  } catch (e) { return sendValidation(res, e); }
};

exports.validateParams = (schema) => (req, res, next) => {
  try {
    const r = schema.safeParse(req.params);
    if (!r.success) return sendValidation(res, r.error);
    req.params = r.data;
    next();
  } catch (e) { return sendValidation(res, e); }
};
