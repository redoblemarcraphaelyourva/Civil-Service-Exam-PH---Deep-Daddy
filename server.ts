import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

// Load environment variables in development
dotenv.config();

const PORT = 3000;
const HOST = "0.0.0.0";

// Initialize Gemini Client Lazily so we don't crash on start if key is missing/loaded elsewhere
let aiClient: GoogleGenAI | null = null;
function getGenAIClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    // Don't crash at startup if key is missing, throw clear message on use
    aiClient = new GoogleGenAI({
      apiKey: apiKey || "",
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  
  // Middleware for body parsing
  app.use(express.json());

  // API Route: AI Coach Explains Wrong Answer
  app.post("/api/explain", async (req, res) => {
    try {
      const { questionText, passage, options, correctOption, userOption, category, subcategory } = req.body;

      if (!questionText || !options || correctOption === undefined || userOption === undefined) {
        res.status(400).json({ error: "Missing required fields (questionText, options, correctOption, userOption)" });
        return;
      }

      // Check if GEMINI_API_KEY is available; if not, return fallback
      if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "MY_GEMINI_API_KEY") {
        res.json({
          explanation: `**[AI Coach Offline]** Real-time AI explanations require a valid \`GEMINI_API_KEY\` set in your Secrets panel. 
          
**Topic Review:** The question is classified under **${category} (${subcategory})**. 
- Your Answer: *${userOption}*
- Correct Answer: *${correctOption}*
          
Please check that your concept reviews address target areas like logical elimination or grammatical structure.`
        });
        return;
      }

      const client = getGenAIClient();
      
      const prompt = `You are an expert Civil Service Exam (CSE) Coach assisting a student who got this question WRONG.
Analyze the question and explain mathematically, logically, or grammatically why the correct option is indeed correct, and why the user's selected incorrect option is wrong, misleading, or a common pitfall.

Subject Category: ${category}
Sub-topic: ${subcategory}
${passage ? `Context/Passage/Sentence:\n"${passage}"\n` : ""}
Question: "${questionText}"
All Choices:
${options.map((opt: string, i: number) => `- ${opt}`).join("\n")}

Correct Answer: "${correctOption}"
User's Incorrect Response: "${userOption}"

Structure your response with:
1. **The Discrepancy**: Explain why the user's choice is incorrect or how someone might make that common mistake.
2. **Step-by-Step Logic**: Detail the steps to arrive at the correct answer (such as the math solution, the grammatical rule, or context translation).
3. **Core Tip**: A friendly, actionable test-taking tip for reviewing this specific topic (e.g. vocabulary, subject-verb agreement, or algebraic relationships).

Tone should be professional, encouraging, and highly educational. Use neat Markdown spacing. Keep it concise.`;

      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt
      });

      const explanation = response.text || "Could not generate analysis.";
      res.json({ explanation });
    } catch (err: any) {
      console.error("Gemini API error:", err);
      res.status(500).json({ error: "Failed to generate AI explanation. Please try again.", details: err.message });
    }
  });

  // Serve Frontend Assets
  if (process.env.NODE_ENV !== "production") {
    // In Dev Mode: integrate Vite Server to compile and serve React on the fly
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // In Prod Mode: serve prebuilt static assets compiled into /dist
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    
    // Route any SPA urls to index.html
    app.all("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, HOST, () => {
    console.log(`Server successfully started at http://${HOST}:${PORT} in ${process.env.NODE_ENV || "development"} mode`);
  });
}

startServer().catch((e) => {
  console.error("Failed to start full-stack server:", e);
});
