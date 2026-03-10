/**
 * In-memory rate limiter middleware.
 *
 * Two tiers:
 *   GET  requests: 60 per minute per IP   (comfortable browsing allowance)
 *   POST requests:  10 per minute per IP  (tighter — prevents brute-force on /challenge/answer)
 *
 * Standard X-RateLimit-* headers are attached to every response so that
 * curl / Postman users can see their remaining quota.
 *
 * Stale entries are evicted every 5 minutes so the Map doesn't grow forever.
 */

const WINDOW_MS = 60 * 1000; // 1 minute
const LIMITS = { GET: 60, POST: 10, DEFAULT: 30 };

// Map<`${method}:${ip}`, { count, resetTime }>
const clients = new Map();

// Periodic cleanup of expired entries
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of clients) {
    if (now > record.resetTime) clients.delete(key);
  }
}, 5 * 60 * 1000);

const rateLimiter = (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress || "unknown";
  const method = req.method.toUpperCase();
  const key = `${method}:${ip}`;
  const limit = LIMITS[method] ?? LIMITS.DEFAULT;
  const now = Date.now();

  if (!clients.has(key) || now > clients.get(key).resetTime) {
    clients.set(key, { count: 1, resetTime: now + WINDOW_MS });
  } else {
    clients.get(key).count += 1;
  }

  const record = clients.get(key);
  const remaining = Math.max(0, limit - record.count);
  const resetSec = Math.ceil((record.resetTime - now) / 1000);

  // Attach standard rate-limit headers so API consumers can see their quota
  res.setHeader("X-RateLimit-Limit", limit);
  res.setHeader("X-RateLimit-Remaining", remaining);
  res.setHeader("X-RateLimit-Reset", resetSec);

  if (record.count > limit) {
    return res.status(429).json({
      error: "Too many requests. Please slow down.",
      retryAfter: `${resetSec}s`,
    });
  }

  next();
};

export default rateLimiter;
