import express from "express";
import { askQuestion, getSessionHistory } from "../controllers/qnaController.js";

const router = express.Router();

router.post("/ask", askQuestion);
router.get("/history/:sessionId", getSessionHistory);

export default router;
