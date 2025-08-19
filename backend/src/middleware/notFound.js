module.exports = function notFound(req, res, next) {
  // תן 404 שקט לשורש/פאביקון כדי לא לזהם לוגים
  if (req.originalUrl === '/' || req.originalUrl === '/favicon.ico') {
    return res.status(404).end();
  }
  return res.status(404).json({
    error: 'RouteNotFound',
    method: req.method,
    path: req.originalUrl,
  });
};
