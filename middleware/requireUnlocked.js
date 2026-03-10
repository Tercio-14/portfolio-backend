import { isUnlocked, expiresInMs } from "../state/unlocked.js";

/**
 * Middleware that blocks access to a route unless the requester's IP
 * has a current (non-expired) unlock from completing the challenge.
 */
const requireUnlocked = (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress || "unknown";

  if (!isUnlocked(ip)) {
    return res.status(403).json({
      error: "Access denied. Your unlock has either expired or was never granted.",
      hint: "Complete the challenge first: POST /challenge/answer",
    });
  }

  // Attach remaining TTL (ms) for downstream use if needed
  req.unlockExpiresIn = expiresInMs(ip);
  next();
};

export default requireUnlocked;
