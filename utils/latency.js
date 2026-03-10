/**
 * Simulate realistic backend latency (300 – 600 ms).
 * Used by route handlers to make the API feel more authentic.
 */
export const simulateLatency = (min = 300, max = 600) =>
  new Promise((resolve) => {
    const delay = Math.floor(Math.random() * (max - min + 1)) + min;
    setTimeout(resolve, delay);
  });
