import express from "express";
import { askQuestion, getSessionHistory } from "../controllers/qnaController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/ask",authMiddleware, askQuestion);
router.get("/history/:sessionId",authMiddleware, getSessionHistory);

export default router;
