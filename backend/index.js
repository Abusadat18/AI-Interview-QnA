import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import qnaRoutes from "./routes/qna.js";
import sessionRoutes from "./routes/session.js";
import authRoutes from "./routes/auth.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors())
app.use(express.json());

// Routes
app.use("/api/qna", qnaRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/auth", authRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
