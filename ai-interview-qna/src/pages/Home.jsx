import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-2xl p-8 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-2">AI Interview QnA</h1>
        <p className="mb-6 text-slate-600">Practice interview questions powered by AI.</p>

        <div className="flex gap-3">
          <Link to="/login" className="px-4 py-2 bg-blue-600 text-white rounded">Login</Link>
          <Link to="/register" className="px-4 py-2 border rounded">Register</Link>
        </div>
      </div>
    </div>
  );
}
