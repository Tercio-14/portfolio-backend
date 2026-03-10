/**
 * In-memory store for IPs that have successfully completed the challenge.
 *
 * Uses a Map<ip, unlockedAtMs> so entries can be expired after TTL_MS.
 */

export const TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

const store = new Map();

/** Mark an IP as unlocked right now. */
export const unlock = (ip) => store.set(ip, Date.now());

/**
 * Check whether an IP is currently unlocked.
 * Returns false if the entry is missing or has expired (auto-evicts stale entries).
 */
export const isUnlocked = (ip) => {
  const unlockedAt = store.get(ip);
  if (unlockedAt === undefined) return false;

  if (Date.now() - unlockedAt > TTL_MS) {
    store.delete(ip); // evict expired entry
    return false;
  }

  return true;
};

/**
 * How many milliseconds remain before the unlock expires.
 * Returns 0 if not unlocked.
 */
export const expiresInMs = (ip) => {
  const unlockedAt = store.get(ip);
  if (!unlockedAt) return 0;
  return Math.max(0, TTL_MS - (Date.now() - unlockedAt));
};
