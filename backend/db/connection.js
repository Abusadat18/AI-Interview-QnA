import dotenv from "dotenv";
dotenv.config();

import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",   // your postgres username
  host: "localhost",
  database: "ai_interview_qna",
  password: process.env.DB_PASS,
  port: 5432,
});

export default pool;
