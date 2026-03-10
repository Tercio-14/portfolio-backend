import { Router } from "express";
import { simulateLatency } from "../utils/latency.js";

const router = Router();

const projects = [
  {
    name: "remindME",
    description: "AI-assisted memory logging tool",
    stack: ["React", "Node.js", "Firebase"],
  },
  {
    name: "AI Opportunity Chatbot",
    description:
      "RAG chatbot that helps unemployed youth find opportunities",
    stack: ["Node.js", "Embeddings", "Qdrant"],
  },
];

router.get("/", async (_req, res) => {
  await simulateLatency();
  res.json(projects);
});

export default router;
