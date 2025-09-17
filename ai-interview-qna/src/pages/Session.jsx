import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { apiRequest } from "../api/fetchClient";

export default function Session() {
  const { id: sessionId } = useParams();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState("");
  const [err, setErr] = useState(null);
  const bottomRef = useRef(null);

  const loadHistory = async () => {
    setLoading(true);
    try {
      const data = await apiRequest(`/api/qna/history/${sessionId}`, { method: "GET" });
      setHistory(data.history || data.questions || data || []);
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
    } catch (error) {
      setErr(error.message || "Failed to load history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
    // eslint-disable-next-line
  }, [sessionId]);

  const sendQuestion = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;
    setErr(null);
    try {
      const res = await apiRequest("/api/qna/ask", {
        method: "POST",
        body: JSON.stringify({
          session_id: Number(sessionId),
          question: question.trim(),
        }),
      });
      const saved = res.question || res;
      setHistory(prev => [...prev, saved]);
      setQuestion("");
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
    } catch (error) {
      setErr(error.message || "Failed to send question");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
        <aside className="md:col-span-1">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-2">Session History</h3>
            {loading ? <p>Loading...</p> :
              history.length === 0 ? <p>No questions yet</p> :
                <ul className="space-y-3">
                  {history.map(h => (
                    <li key={h.id} className="text-sm">
                      <div className="font-medium">{h.question_text}</div>
                      <div className="text-slate-500">{new Date(h.created_at).toLocaleString()}</div>
                    </li>
                  ))}
                </ul>
            }
          </div>
        </aside>

        <main className="md:col-span-3 flex flex-col h-[70vh]">
          <div className="flex-1 overflow-y-auto p-4 bg-white rounded shadow">
            {history.map(h => (
              <div key={h.id} className="mb-4">
                <div className="mb-1 text-sm font-medium text-slate-700">Q: {h.question_text}</div>
                <div className="pl-3 text-sm text-slate-600">A: {h.ai_answer}</div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <form onSubmit={sendQuestion} className="mt-3 flex gap-2">
            <input
              value={question}
              onChange={e => setQuestion(e.target.value)}
              className="flex-1 p-3 border rounded"
              placeholder="Ask a question (e.g. 'Explain closures in JS')"
            />
            <button className="px-4 py-2 bg-blue-600 text-white rounded">Send</button>
          </form>

          {err && <p className="text-red-600 mt-2">{err}</p>}
        </main>
      </div>
    </div>
  );
}
