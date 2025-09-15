import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import qnaRoutes from "./routes/qna.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors())
app.use(express.json());

// Routes
app.use("/api/qna", qnaRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
