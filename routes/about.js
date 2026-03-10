import { Router } from "express";
import { simulateLatency } from "../utils/latency.js";

const router = Router();

router.get("/", async (_req, res) => {
  await simulateLatency();
  res.json({
    name: "Vanderley Santos",
    role: "Backend Developer",
    description:
      "Backend developer specialising in Node.js, APIs, and system design.",
    stack: ["Node.js", "Express", "REST APIs", "Databases"],
    experience: "2+ years building backend systems and APIs",
    focus: ["API design", "System architecture", "Observability", "Logging", "Performance optimization"],
  });
});

export default router;
