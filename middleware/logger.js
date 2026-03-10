// In-memory structured log storage
const logs = [];

/**
 * Push a structured log entry into memory and print to console.
 */
const pushLog = (entry) => {
  logs.push(entry);
  const levelColor =
    entry.level === "ERROR"
      ? "\x1b[31m"
      : entry.level === "WARN"
        ? "\x1b[33m"
        : "\x1b[36m";
  const reset = "\x1b[0m";
  console.log(
    `${levelColor}[${entry.level}]${reset} ${entry.timestamp} ${entry.method} ${entry.path} → ${entry.status ?? "—"}`
  );
};

/**
 * Logging middleware — records structured data for every request.
 * Hooks into `res.finish` so the status code is captured after the
 * route handler has executed.
 */
const logger = (req, res, next) => {
  const start = Date.now();

  // --- lifecycle: request received ---
  pushLog({
    timestamp: new Date().toISOString(),
    method: req.method,
    path: req.originalUrl,
    status: null,
    level: "INFO",
    message: "Request received",
  });

  pushLog({
    timestamp: new Date().toISOString(),
    method: req.method,
    path: req.originalUrl,
    status: null,
    level: "INFO",
    message: "Passing through middleware",
  });

  // --- lifecycle: after response ---
  res.on("finish", () => {
    const duration = Date.now() - start;
    const status = res.statusCode;
    const level = status >= 500 ? "ERROR" : status >= 400 ? "WARN" : "INFO";

    pushLog({
      timestamp: new Date().toISOString(),
      method: req.method,
      path: req.originalUrl,
      status,
      level,
      message: `Response sent in ${duration}ms`,
    });
  });

  next();
};

/**
 * Return all stored log entries (structured).
 */
const getLogs = () => [...logs];

export { logger, getLogs };
