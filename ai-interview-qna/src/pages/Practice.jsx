import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatBox from "../components/ChatBox";
import InputBox from "../components/InputBox";
import { sendQuestion } from "../api/qna";

export default function Practice() {
  const [session, setSession] = useState([]); // store QnA history
  const [currentInput, setCurrentInput] = useState(""); // input field
  const [loading, setLoading] = useState(false);

  const handleSend = async (input) => {
    setLoading(true);

    // call backend
    const response = await sendQuestion(input, "session-1");

    // update session with new QnA
    setSession([...session, { question: response.question, answer: response.answer }]);

    setLoading(false);
  };

  return (
    <div className="flex h-screen">
      <Sidebar session={session} />
      <div className="flex-1 flex flex-col">
        <ChatBox session={session} />
        <InputBox
          currentInput={currentInput}
          setCurrentInput={setCurrentInput}
          onSend={handleSend}
          loading={loading}
        />
      </div>
    </div>
  );
}
