export const sendQuestion = async (question, sessionId) => {
  try {
    const response = await fetch("http://localhost:5000/api/qna/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question, sessionId }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    return { question: "Error generating question" };
  }
};
