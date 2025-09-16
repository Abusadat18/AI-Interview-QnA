import express from "express";
import { allSessions, deleteSession, specificSession, startNewSession } from "../controllers/sessionController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protected routes
router.post("/start",authMiddleware, startNewSession);
router.get("/",authMiddleware, allSessions);
router.get("/:id", authMiddleware, specificSession);
router.delete("/:id",authMiddleware, deleteSession);

export default router;
