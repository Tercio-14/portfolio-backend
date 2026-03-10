/**
 * Global error-handling middleware.
 *
 * Express recognises error handlers by their 4-parameter signature
 * (err, req, res, next).
 */

// 404 handler — mounted after all routes
const notFound = (_req, res, _next) => {
  res.status(404).json({ error: "Route not found" });
};

// Catch-all error handler
const errorHandler = (err, _req, res, _next) => {
  console.error("[ERROR]", err.message || err);

  const status = err.status || 500;
  const message =
    status === 400
      ? "Bad request"
      : status === 404
        ? "Route not found"
        : "Internal server error";

  res.status(status).json({ error: message });
};

export { notFound, errorHandler };
