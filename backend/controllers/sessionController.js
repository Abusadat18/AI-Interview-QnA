import pool from "../db/connection.js";

export const startNewSession = async (req,res) => {
  try {
    const { topic, difficulty } = req.body;

    const result = await pool.query(
      `INSERT INTO sessions (user_id, topic, difficulty) 
       VALUES ($1, $2, $3) RETURNING *`,
      [req.user.userId, topic || null, difficulty || null]
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
        const result = await pool.query("SELECT * FROM sessions WHERE user_id = $1 ORDER BY id DESC", [req.user.userId]);

        res.json(result.rows);
    } catch (err) {
        console.error("❌ Error fetching sessions:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
  }
}

// ✅ Get one session by ID
export const specificSession = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "SELECT * FROM sessions WHERE id = $1 AND user_id = $2",
      [id, req.user.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Session not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error fetching session:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ✅ Delete a session
export const deleteSession = async (req, res) => {
  try {
    const { id } = req.params;
     const result = await pool.query(
      "DELETE FROM sessions WHERE id = $1 AND user_id = $2 RETURNING *",
      [id, req.user.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Session not found" });
    }

    res.json({ message: "Session deleted", session: result.rows[0] });
  } catch (err) {
    console.error("Error deleting session:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};