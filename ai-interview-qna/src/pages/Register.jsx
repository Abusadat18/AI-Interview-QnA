import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../api/fetchClient.js";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      await apiRequest("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
      });
      navigate("/login");
    } catch (error) {
      setErr(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={submit} className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Register</h2>

        {err && <div className="mb-3 text-sm text-red-600">{err}</div>}

        <label className="block mb-2 text-sm">Name</label>
        <input value={name} onChange={e => setName(e.target.value)} className="w-full p-2 border rounded mb-3" />

        <label className="block mb-2 text-sm">Email</label>
        <input value={email} onChange={e => setEmail(e.target.value)} className="w-full p-2 border rounded mb-3" />

        <label className="block mb-2 text-sm">Password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-2 border rounded mb-4" />

        <button disabled={loading} className="w-full py-2 bg-blue-600 text-white rounded">
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
