import { getAIResponse } from "../services/aiService.js";

export const askQuestion = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    // Call AI service
    const answer = await getAIResponse(question);
    res.json({ question, answer });
    
  } catch (error) {
    console.error("Error in QnA Controller:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};
