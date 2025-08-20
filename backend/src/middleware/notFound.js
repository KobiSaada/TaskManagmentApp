module.exports = function notFound(req, res, next) {

  if (req.originalUrl === '/' || req.originalUrl === '/favicon.ico') {
    return res.status(404).end();
  }
  return res.status(404).json({
    error: 'RouteNotFound',
    method: req.method,
    path: req.originalUrl,
  });
};
