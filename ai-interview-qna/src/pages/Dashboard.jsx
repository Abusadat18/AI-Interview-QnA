import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { apiRequest } from "../api/fetchClient";

export default function Dashboard() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("Medium");
  const [err, setErr] = useState(null);

  const loadSessions = async () => {
    setLoading(true);
    try {
      const data = await apiRequest("/api/sessions", { method: "GET" });
      // data could be array or { sessions: [...] }
      setSessions(Array.isArray(data) ? data : data.sessions || data);
    } catch (error) {
      setErr(error.message || "Failed to load sessions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSessions();
  }, []);

  const startSession = async (e) => {
    e.preventDefault();
    setErr(null);
    try {
      // many backends use /api/sessions/start, some use /api/sessions
      const data = await apiRequest("/api/sessions/start", {
        method: "POST",
        body: JSON.stringify({ topic, difficulty }),
      });
      const newSession = data.session || data;
      setSessions(prev => [newSession, ...prev]);
      setTopic("");
      setDifficulty("Medium");
    } catch (error) {
      setErr(error.message || "Failed to start session");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto p-4">
        <div className="mb-6">
          <form onSubmit={startSession} className="flex gap-2">
            <input
              value={topic}
              onChange={e => setTopic(e.target.value)}
              placeholder="Topic (optional)"
              className="p-2 border rounded flex-1"
            />
            <select className="p-2 border rounded" value={difficulty} onChange={e => setDifficulty(e.target.value)}>
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
            <button className="px-4 py-2 bg-blue-600 text-white rounded">Start</button>
          </form>
          {err && <p className="text-red-600 mt-2">{err}</p>}
        </div>

        <h2 className="text-lg font-semibold mb-3">Your Sessions</h2>
        {loading ? (
          <p>Loading...</p>
        ) : sessions.length === 0 ? (
          <p>No sessions yet. Start one above.</p>
        ) : (
          <div className="grid gap-3">
            {sessions.map(s => (
              <Link
                key={s.id}
                to={`/sessions/${s.id}`}
                className="p-3 bg-white rounded border hover:shadow flex justify-between items-center"
              >
                <div>
                  <div className="font-bold">{s.topic || `Session #${s.id}`}</div>
                  <div className="text-sm text-slate-500">{s.difficulty || "Medium"} • {new Date(s.created_at).toLocaleString()}</div>
                </div>
                <div className="text-sm text-slate-400">Open</div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
