import { Router } from "express";
import { unlock, TTL_MS } from "../state/unlocked.js";

const router = Router();

/**
 * Fuzzy answer checker.
 *
 * Accepts any answer that contains enough of the right keywords so
 * visitors don't need to remember the exact project name.
 *
 * Passing conditions (case-insensitive):
 *   - Exact project name match ("AI Opportunity Chatbot")
 *   - Contains "rag" (the core technology)
 *   - Contains "opportunity" (key word in the project name)
 *   - Contains both "chatbot" and ("ai" or "youth")
 */
const isCorrect = (answer) => {
  const a = answer.trim().toLowerCase();

  if (a === "ai opportunity chatbot") return true;
  if (a.includes("rag")) return true;
  if (a.includes("opportunity")) return true;
  if (a.includes("chatbot") && (a.includes("ai") || a.includes("youth"))) return true;

  return false;
};

/**
 * GET /challenge
 * Returns the challenge question.
 */
router.get("/", (_req, res) => {
  res.json({
    question:
      "Which project of mine uses RAG to help unemployed youth find opportunities?",
    hint: "Think about the technology (RAG) or what the project does.",
  });
});

/**
 * POST /challenge/answer
 * Accepts { "answer": "..." } and validates it.
 * On success, marks the requester's IP as unlocked.
 */
router.post("/answer", (req, res) => {
  const { answer } = req.body;

  if (!answer || typeof answer !== "string") {
    return res.status(400).json({ error: "Missing or invalid answer field." });
  }

  if (isCorrect(answer)) {
    const ip = req.ip || req.connection.remoteAddress || "unknown";
    unlock(ip);

    const expiresInHours = TTL_MS / (1000 * 60 * 60);
    return res.status(200).json({
      message: "Correct! You've unlocked the secret endpoint.",
      secretEndpoint: "/hire-me",
      expiresIn: `${expiresInHours} hours`,
    });
  }

  return res.status(401).json({
    error: "Incorrect answer. Try being more specific about the project or technology.",
  });
});

export default router;
