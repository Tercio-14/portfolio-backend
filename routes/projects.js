import { Router } from "express";
import { simulateLatency } from "../utils/latency.js";

const router = Router();

const projects = [
  {
    name: "StayConnect Namibia",
    description: "Acommodation booking platform where you can find rentals ranging from short term to long term, for the Namibian Market",
    stack: ["React", "Node.js", "Supabase"],
    link: "https://stayconnectnamibia.com/",
  },
  {
    name: "AI Opportunity Chatbot",
    description:
      "RAG chatbot that helps unemployed youth find opportunities",
    stack: ["Node.js", "Embeddings", "Qdrant", "Firebase"],
  },
];

router.get("/", async (_req, res) => {
  await simulateLatency();
  res.json(projects);
});

export default router;
