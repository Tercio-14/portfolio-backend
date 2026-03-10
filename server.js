import "dotenv/config";
import express from "express";
import cors from "cors";

import { logger, getLogs } from "./middleware/logger.js";
import rateLimiter from "./middleware/rateLimiter.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";
import { simulateLatency } from "./utils/latency.js";
import requireUnlocked from "./middleware/requireUnlocked.js";

import aboutRouter from "./routes/about.js";
import projectsRouter from "./routes/projects.js";
import contactRouter from "./routes/contact.js";
import challengeRouter from "./routes/challenge.js";
import skillsRouter from "./routes/skills.js";

const app = express();
const PORT = process.env.PORT || 5000;

// --------------- CORS ---------------
// Allow any origin so visitors can hit the API from curl/Postman/their own
// scripts. Explicit options make the intent clear and keep things auditable.
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: [
      "X-RateLimit-Limit",
      "X-RateLimit-Remaining",
      "X-RateLimit-Reset",
    ],
  })
);

// --------------- Global Middleware ---------------
app.use(express.json());
app.use(rateLimiter);
app.use(logger);

// --------------- Routes ---------------
app.use("/about", aboutRouter);
app.use("/projects", projectsRouter);
app.use("/contact", contactRouter);
app.use("/challenge", challengeRouter);
app.use("/skills", skillsRouter);

// Secret endpoint — only accessible after completing the challenge
app.get("/hire-me", requireUnlocked, async (_req, res) => {
  await simulateLatency();
  res.json({
    message: "Congratulations, you found the secret endpoint.",
    note: "If you reached this endpoint, you are exactly the kind of curious engineer I enjoy working with.",
    contact: "fragozosantos13@gmail.com",
  });
});

// Health check
app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "portfolio-api",
    uptime: process.uptime(),
  });
});

// Easter egg
app.get("/coffee", (_req, res) => {
  res.status(418).json({ message: "I'm a teapot ☕" });
});

// Philosophy
app.get("/philosophy", (_req, res) => {
  res.json({
    beliefs: [
      "APIs should be simple",
      "Systems should be observable",
      "Code should be readable",
    ],
  });
});

// Expose collected logs
app.get("/logs", (_req, res) => {
  res.json(getLogs());
});

// --------------- Error Handling ---------------
app.use(notFound);
app.use(errorHandler);

// --------------- Start ---------------
app.listen(PORT, () => {
  console.log(`Portfolio API running → http://localhost:${PORT}`);
});
