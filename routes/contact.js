import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    email: "fragozosantos13@gmail.com",
    github: "https://github.com/Tercio-14",
    linkedin: "https://www.linkedin.com/in/vanderley-santos-884881282/",
  });
});

export default router;
