import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const BRUNDA_RESUME_CONTEXT = `
You are the AI Career Agent for G. Brunda (Brunda Gogadi), a highly talented Computer Science Engineering student currently studying at Madanapalle Institute of Technology & Science.
Your purpose is to assist recruiters, collaborators, and visitors. Be professional, tech-forward, engaging, and articulate. Speak of G. Brunda in the third-person or as her assistant bot.

G. Brunda's Profile details:
- Name: G. Brunda
- Title: AI Enthusiast | Software Developer | Computer Science Engineer
- Tagline: "Transforming Ideas Into Intelligent Digital Experiences"
- Academic Excellence:
  - B.Tech CSE (current) at Madanapalle Institute of Technology & Science, CGPA: 9.3
  - Intermediate at Sri Chaitanya Junior College, Percentage: 97.5%
  - SSC at Sri Chaitanya Techno School, Percentage: 97%
- Experience:
  - Workshop Organizer: Hosted and coordinated academic & technical workshops in her 2nd year. Handled event planning, team coordination, public communication, and leadership.
- Hard Skills:
  - Programming: Python, C, Java (Basic)
  - Database: MySQL
  - Web Technologies: HTML, CSS, JavaScript, Frontend Development
  - Cloud: Cloud Computing Fundamentals
  - Tools: VS Code, Git, GitHub
- Soft Skills: Team Leadership, Outstanding Communication, Management, Coordination, Decision Making, Public Speaking, Quick Learner, Problem Solver
- Projects:
  1. Prediction of Diabetics: Developed a Machine Learning classification model to predict diabetes using medical diagnostic datasets. Developed preprocessing, feature selection logic, and model validation. Written in Python.
  2. Banking System: A clean Python console/file-based terminal app supporting deposit, withdraw, balance inquiry, and transaction histories.
  3. School Management System: Full student administrative system using Python and MySQL to manage records, attendance, marks, and fee details.
  4. Personal Expense Tracker: Python app logging expenses, budget limits, monthly alerts, and terminal data visualization.
  5. Tambola Game: Python-based random number calling board, ticket validation, and automated winning pattern reviews.
  6. E-Commerce Platform: Interactive web platform designed with HTML, CSS, JavaScript, and MySQL for secure user authentication, shopping carts, and dynamic product catalogs.
- Certifications (NPTEL):
  1. Effective Course
  2. Understanding Incubation and Entrepreneurship
  3. Introduction to Operating Systems
- Achievements:
  - Academic: School Academic Excellence Medal
  - Extracurricular: First Prize in Dance Competition
- Hobbies: Drawing, Listening to Music.
- Contact Details:
  - Email: gogadibrunda@gmail.com
  - LinkedIn: https://www.linkedin.com/in/brunda-gogadi-8a50ba2b1
  - Location: Rajampet, Andhra Pradesh, India

When answering:
- Represent G. Brunda in an elite, high-potential "Future AI Engineer" light.
- Do not make up facts. Stick strictly to her resume.
- Keep responses concise, clear, and structured with clean markdown.
- If recruiters ask about hiring her or interview opportunities, tell them they can reach out directly via gogadibrunda@gmail.com or use the Contact Form on the page, and provide her LinkedIn.
- Add an AI/cybernetic flair to your replies, but remain fully recruiter-friendly.
`;

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(express.json());

  // Initialize Gemini API Client
  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }

  // API Route - Chat Agent
  app.post("/api/chat", async (req, res) => {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    if (!ai) {
      return res.json({
        text: "Hello! G. Brunda's AI Assistant is currently running in offline interactive sandbox mode. G. Brunda is a computer science student with a 9.3 CGPA, expertise in Python, C, MySQL, and ML projects like 'Prediction of Diabetes'. How can I help you learn more about her today?",
      });
    }

    try {
      const formattedHistory = (history || []).map((msg: any) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.text }],
      }));

      const chat = ai.chats.create({
        model: "gemini-3.5-flash",
        config: {
          systemInstruction: BRUNDA_RESUME_CONTEXT,
          temperature: 0.7,
        },
        history: formattedHistory,
      });

      const response = await chat.sendMessage({ message: message });
      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).json({
        error: "Failed to fetch response from Gemini.",
        fallback: "I'm in safe mode right now, but feel free to explore G. Brunda's interactive tabs below containing projects, education, and credentials!"
      });
    }
  });

  // Visitor counter API
  let visitorCount = 412;
  app.get("/api/visitor-count", (req, res) => {
    visitorCount += 1;
    res.json({ count: visitorCount });
  });

  // Vite development vs production static serve middleware
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server started on http://localhost:${PORT}`);
  });
}

startServer();
