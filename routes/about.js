import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    name: "Vanderley Santos",
    role: "Backend Developer",
    description:
      "Backend developer specialising in Node.js, APIs, and system design.",
    stack: ["Node.js", "Express", "REST APIs", "Databases"],
  });
});

export default router;
