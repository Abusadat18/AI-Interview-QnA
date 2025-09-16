import express from "express";
import pool from "../db/connection.js";

const router = express.Router();

// 🎯 Route: Start a new session
router.post("/start", async (req, res) => {
  try {
    // Insert a new row using defaults (id auto + created_at auto)
    const result = await pool.query(
      "INSERT INTO sessions DEFAULT VALUES RETURNING *"
    );

    // Send the created session back
    res.json({
      message: "Session started successfully",
      session: result.rows[0], // contains id + created_at
    });
  } catch (err) {
    console.error("❌ Error starting session:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 🎯 Route: Get all sessions (for testing/debugging)
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM sessions ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Error fetching sessions:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
