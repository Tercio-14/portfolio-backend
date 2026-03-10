import { Router } from "express";

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

router.get("/", (_req, res) => {
  res.json(projects);
});

export default router;
