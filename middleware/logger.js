// In-memory log storage
const logs = [];

/**
 * Logging middleware — records timestamp, method, and endpoint
 * for every incoming request.
 */
const logger = (req, res, next) => {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");

  const timestamp = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(
    now.getDate()
  )} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(
    now.getSeconds()
  )}`;

  const entry = `[${timestamp}] ${req.method} ${req.originalUrl}`;
  logs.push(entry);

  // Also print to the server console
  console.log(entry);

  next();
};

/**
 * Return all stored log entries.
 */
const getLogs = () => [...logs];

export { logger, getLogs };
