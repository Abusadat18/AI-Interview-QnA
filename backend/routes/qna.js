import express from "express";
import { askQuestion } from "../controllers/qnaController.js";

const router = express.Router();

// POST /api/qna/ask
router.post("/ask", askQuestion);

export default router;
