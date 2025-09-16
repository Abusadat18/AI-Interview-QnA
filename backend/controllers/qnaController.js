import { getAIResponse } from "../services/aiService.js";
import pool from "../db/connection.js";

export const askQuestion = async (req, res) => {
  try {
    const { session_id, question, user_answer } = req.body;

    if (!session_id || !question) {
      return res.status(400).json({ error: "session_id and question are required" });
    }

    // Ensure session belongs to the logged-in user
    const sessionCheck = await pool.query(
      "SELECT * FROM sessions WHERE id = $1 AND user_id = $2",
      [session_id, req.user.userId]
    );

    if (sessionCheck.rows.length === 0) {
      return res
        .status(403)
        .json({ error: "Not authorized for this session" });
    }

    // Get AI response
    const ai_answer = await getAIResponse(question);

    // Save into DB
    const result = await pool.query(
      `INSERT INTO questions (session_id, question_text, user_answer, ai_answer)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [session_id, question, user_answer || null, ai_answer]
    );

    // Return the saved row
    res.json({
      message: "Question saved successfully",
      question: result.rows[0],
    });
  } catch (error) {
    console.error("❌ Error in QnA Controller:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

// GET /api/qna/history/:sessionId
export const getSessionHistory = async (req, res) => {
  try {
    const { sessionId } = req.params;

    if (!sessionId) {
      return res.status(400).json({ error: "sessionId is required" });
    }

    // Ensure session belongs to the logged-in user
    const sessionCheck = await pool.query(
      "SELECT * FROM sessions WHERE id = $1 AND user_id = $2",
      [sessionId, req.user.userId]
    );

    if (sessionCheck.rows.length === 0) {
      return res
        .status(403)
        .json({ error: "Not authorized for this session" });
    }

    const result = await pool.query(
      `SELECT id, session_id, question_text, user_answer, ai_answer, created_at
       FROM questions
       WHERE session_id = $1
       ORDER BY created_at ASC`,
      [sessionId]
    );

    res.json({
      sessionId,
      history: result.rows, // array of rows from the 'questions' table
    });
  } catch (error) {
    console.error("Error fetching session history:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};


// DELETE /api/qna/:sessionId/:questionId
export const deleteQuestion = async (req, res) => {
  try {
    const { sessionId, questionId } = req.params;

    // ✅ Ensure session belongs to logged-in user
    const sessionCheck = await pool.query(
      "SELECT * FROM sessions WHERE id = $1 AND user_id = $2",
      [sessionId, req.user.userId]
    );

    if (sessionCheck.rows.length === 0) {
      return res
        .status(403)
        .json({ error: "Not authorized for this session" });
    }

    // ✅ Delete question
    const result = await pool.query(
      "DELETE FROM questions WHERE id = $1 AND session_id = $2 RETURNING *",
      [questionId, sessionId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Question not found" });
    }

    res.json({
      message: "Question deleted successfully",
      question: result.rows[0],
    });
  } catch (error) {
    console.error("Error deleting question:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};