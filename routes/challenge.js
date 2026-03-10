import { Router } from "express";

const router = Router();

const CORRECT_ANSWER = "AI Opportunity Chatbot";

/**
 * POST /challenge/answer
 * Accepts { "answer": "..." } and validates it.
 */
router.post("/answer", (req, res) => {
  const { answer } = req.body;

  if (
    answer &&
    answer.trim().toLowerCase() === CORRECT_ANSWER.toLowerCase()
  ) {
    return res.status(200).json({
      message: "Correct answer.",
      secretEndpoint: "/hire-me",
    });
  }

  return res.status(401).json({
    error: "Incorrect answer",
  });
});

export default router;
