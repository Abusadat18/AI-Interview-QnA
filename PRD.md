# 📄 Product Requirement Document (PRD)  
## Project: AI Interview QnA  
**Author:** *Abu Sadat Ansari*  
**Date:** September 2025  
**Version:** 1.0  

---

## 1. 🎯 Project Overview
AI Interview QnA is a web-based application that helps students and job seekers practice for interviews by simulating real-time interview question-answer sessions using AI.  
The platform will allow users to input job roles or topics, and receive relevant interview-style questions along with AI-generated answers or feedback.  

---

## 2. 🌟 Goals & Objectives
- Help users **prepare for interviews** by practicing questions in a conversational format.  
- Provide **AI-powered answers and hints** to guide learning.  
- Create a **simple, lightweight, and scalable** web app that can be extended later.  
- Showcase this project as a **portfolio piece** to demonstrate full-stack + AI integration skills.  

---

## 3. 👥 Target Users
- **Students** preparing for campus placements.  
- **Freshers/Job Seekers** applying to IT and software companies.  
- **Developers** who want quick practice before interviews.  

---

## 4. 📌 Core Features (MVP)
1. **Landing Page**  
   - Brief intro about the app.  
   - "Start Practice" CTA button.  

2. **Interview Practice Interface**  
   - Sidebar for *session history*.  
   - Main chat area for QnA flow.  
   - Input box for user prompt (e.g., "Ask me DSA questions").  

3. **AI Question Generation**  
   - AI generates interview-style questions based on role/topic.  
   - User can attempt an answer.  
   - AI provides feedback or a sample ideal answer.  

4. **Session Management**  
   - Users can view past QnA within the session.  
   - Clear session option.  

---

## 5. 🚀 Future Enhancements
- **Authentication (Login/Register)** to save progress.  
- **Multiple difficulty levels** (Easy, Medium, Hard).  
- **Category selection** (DSA, System Design, DBMS, HR, etc.).  
- **Analytics Dashboard** (Track improvement over time).  
- **Voice Mode** (Ask & answer via mic, AI responds with speech).  

---

## 6. 🛠️ Tech Stack
- **Frontend:** React + Vite + TailwindCSS  
- **Backend:** Node.js (Express)  
- **Database:** PostgreSQL (for user sessions, history)  
- **AI Integration:** OpenAI API (or other LLM API)  
- **Hosting:** Vercel (Frontend) + Render/Heroku (Backend)  

---

## 7. 📂 Project Structure (Planned)

```plaintext
ai-interview-qna/
 ├── frontend/ (React + Tailwind)
 │    ├── src/
 │    │    ├── components/
 │    │    │    ├── ChatBox.jsx
 │    │    │    ├── Sidebar.jsx
 │    │    │    └── InputBox.jsx
 │    │    ├── pages/
 │    │    │    └── Home.jsx
 │    │    └── App.jsx
 │    └── index.html
 ├── backend/ (Express API)
 │    ├── routes/
 │    │    └── qna.js
 │    ├── models/
 │    │    └── Session.js
 │    └── server.js
 └── README.md
