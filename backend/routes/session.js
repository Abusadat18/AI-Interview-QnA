import express from "express";
import { allSessions, deleteSession, specificSession, startNewSession } from "../controllers/sessionController.js";

const router = express.Router();

// 🎯 Route: Start a new session
router.post("/start", startNewSession);

// 🎯 Route: Get all sessions (for testing/debugging)
router.get("/", allSessions);
router.get("/:id", specificSession);
router.delete("/:id", deleteSession);

export default router;
