import express from "express";
import { allSessions, startNewSession } from "../controllers/sessionController.js";

const router = express.Router();

// 🎯 Route: Start a new session
router.post("/start", startNewSession);

// 🎯 Route: Get all sessions (for testing/debugging)
router.get("/", allSessions);

export default router;
