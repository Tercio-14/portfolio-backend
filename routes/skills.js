import { Router } from "express";
import { simulateLatency } from "../utils/latency.js";

const router = Router();

const skills = {
  languages: ["JavaScript", "TypeScript"],
  backend: ["Node.js", "Express"],
  databases: ["PostgreSQL", "MongoDB"],
  tools: ["Docker", "Git", "Postman", "Linux"],
};

router.get("/", async (_req, res) => {
  await simulateLatency();
  res.json(skills);
});

export default router;
