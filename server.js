import express from "express";
import cors from "cors";

import { logger, getLogs } from "./middleware/logger.js";
import aboutRouter from "./routes/about.js";
import projectsRouter from "./routes/projects.js";
import contactRouter from "./routes/contact.js";
import challengeRouter from "./routes/challenge.js";

const app = express();
const PORT = 5000;

// --------------- Middleware ---------------
app.use(cors());
app.use(express.json());
app.use(logger);

// --------------- Routes ---------------
app.use("/about", aboutRouter);
app.use("/projects", projectsRouter);
app.use("/contact", contactRouter);
app.use("/challenge", challengeRouter);

// Secret endpoint unlocked after the challenge
app.get("/hire-me", (_req, res) => {
  res.json({
    message: "Congratulations, you found the secret endpoint.",
    note: "If you reached this endpoint, you are exactly the kind of curious engineer I enjoy working with.",
    contact: "example@email.com",
  });
});

// Expose collected logs
app.get("/logs", (_req, res) => {
  res.json(getLogs());
});

// --------------- Start ---------------
app.listen(PORT, () => {
  console.log(`Portfolio API running → http://localhost:${PORT}`);
});
