import pool from "../db/connection.js";

export const startNewSession = async (req,res) => {
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
}

export const allSessions = async (req,res) => {
    try {
        const result = await pool.query("SELECT * FROM sessions ORDER BY id DESC");
        res.json(result.rows);
    } catch (err) {
        console.error("❌ Error fetching sessions:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
  }
}