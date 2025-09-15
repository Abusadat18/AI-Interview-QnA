import { GoogleGenerativeAI } from "@google/generative-ai";

export const getAIResponse = async (question) => {
  try {
    console.log("In Backend Calling Gemini...");
    
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(question);

    return result.response.text();
  } catch (error) {
    console.error("AI Service Error:", error.message);
    return "⚠️ Sorry, I couldn't generate an answer.";
  }
};
