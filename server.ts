import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini client lazily
let ai: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!ai) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined in environment variables.");
    }
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return ai;
}

// API Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Serve input files statically from root
app.use("/input_file_0.png", express.static(path.join(process.cwd(), "input_file_0.png")));
app.use("/input_file_1.png", express.static(path.join(process.cwd(), "input_file_1.png")));
app.use("/input_file_1.png.png", express.static(path.join(process.cwd(), "input_file_1.png.png")));

// Serve Space design showcase statically
app.use("/Space design showcase", express.static(path.join(process.cwd(), "Space design showcase")));

// Serve 包装 statically
app.use("/包装", express.static(path.join(process.cwd(), "包装")));
app.use("/%E5%8C%85%E8%A3%85", express.static(path.join(process.cwd(), "包装")));

// Serve 建模 statically
app.use("/建模", express.static(path.join(process.cwd(), "建模")));
app.use("/%E5%BB%BA%E6%A8%A1", express.static(path.join(process.cwd(), "建模")));

// Vite Dev Server / Production routing setup
async function start() {
  if (process.env.NODE_ENV !== "production") {
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
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}

start();
