/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Initialize Gemini Client
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    console.log("Gemini API Client initialized successfully on server.");
  } catch (err) {
    console.error("Error initializing Gemini client:", err);
  }
} else {
  console.log("GEMINI_API_KEY not found in environment. AI Advisor will run in mock/fallback mode.");
}

const app = express();
const PORT = 3000;

app.use(express.json());

// In-Memory Database State
const chatMessages = [
  {
    id: "msg-1",
    sender: "Comrade Seiyefa Jonathan",
    role: "President",
    text: "Welcome everyone to the official Okpoama Youth Movement group channel! Use this space to connect, discuss community challenges, and share development ideas. You can also mention @advisor to ask our AI Youth Advisor any questions!",
    timestamp: new Date(Date.now() - 3600000 * 4).toISOString(), // 4 hours ago
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: "msg-2",
    sender: "Comrade Preye Oki",
    role: "Organizing Secretary",
    text: "Our advanced Solar Inverter installation registration is officially open in the settings/activities page. We need more hands on deck for sustainable power development in the Kingdom!",
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(), // 2 hours ago
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: "msg-3",
    sender: "Pere (Brass Beach Ward)",
    role: "Member",
    text: "I attended the digital bootcamp last year. It changed my life, I now do web design projects for clients outside Bayelsa. Highly recommended!",
    timestamp: new Date(Date.now() - 60000 * 15).toISOString(), // 15 mins ago
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
  }
];

const empowermentSuggestions = [
  {
    id: "sug-1",
    title: "Cold Chain Storage for Fishermen",
    description: "Provide solar-powered cold hubs at Brass Beach to help local fishermen preserve their catch and avoid selling at a loss.",
    submittedBy: "Comrade Blessing Diegiri",
    votes: 42,
    date: new Date().toISOString()
  },
  {
    id: "sug-2",
    title: "Vocational Tailoring Academy",
    description: "Sponsor young girls and guys with modern sewing equipment and fashion styling courses to establish a small-scale textile hub.",
    submittedBy: "Ebiere Nelson",
    votes: 29,
    date: new Date().toISOString()
  }
];

// Interactive Poll state
const activePoll = {
  id: "poll-1",
  question: "What skill category should our Q3 2026 Empowerment Program focus on?",
  options: [
    { id: "opt-1", text: "Solar & Renewable Power Engineering", votes: 124 },
    { id: "opt-2", text: "Maritime Piloting & Safety Operations", votes: 98 },
    { id: "opt-3", text: "Digital Skills & Software Freelancing", votes: 145 },
    { id: "opt-4", text: "Modern Agro-Fishery & Fish Canning", votes: 76 }
  ],
  totalVotes: 443
};

// ----------------------------------------------------
// API ROUTES
// ----------------------------------------------------

// Get Chat Messages
app.get("/api/chat", (req, res) => {
  res.json(chatMessages);
});

// Post Chat Message
app.post("/api/chat", async (req, res) => {
  const { sender, text, avatar, role } = req.body;
  if (!sender || !text) {
    return res.status(400).json({ error: "Sender and text are required." });
  }

  const newMessage = {
    id: `msg-${Date.now()}`,
    sender,
    role: role || "Member",
    text,
    timestamp: new Date().toISOString(),
    avatar: avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face"
  };

  chatMessages.push(newMessage);

  // Check for AI mention `@advisor` or `@ai`
  const mentionsAI = text.toLowerCase().includes("@advisor") || text.toLowerCase().includes("@ai");
  if (mentionsAI) {
    // Generate AI response
    const query = text.replace(/@advisor/gi, "").replace(/@ai/gi, "").trim();
    
    // Add typing indicator or delay placeholder in chat if needed, but for Express API let's push the response directly
    let aiResponseText = "Hello leader! I am the Okpoama Youth Movement AI Advisor. I am here to help you design, study, and prosper. It looks like my API credentials are being set up right now, but I can tell you that Okpoama youths are born with the tide, ready to conquer both the Atlantic waters and the digital space! How can I assist you with skills training, maritime certifications, or local business support?";

    if (ai) {
      try {
        const prompt = `
You are the "Okpoama Youth Movement AI Advisor" (named @advisor). You are a proud, knowledgeable, encouraging, and highly professional virtual community advisor for the Okpoama Kingdom youth body (Nembe LGA, Bayelsa State, Nigeria).
The user (a youth movement member) asked: "${query}"

Guidelines:
1. Speak with passion, encouragement, and a strong sense of pride in Okpoama's heritage, seafaring traditions, Brass Beach, and the energy of the youths. Use local Nigerian-friendly English phrasing, but keep it highly polished, modern, and readable.
2. Offer helpful, practical ideas about:
   - Maritime careers, seagoing boat certifications, aquaculture, fishing tech.
   - Digital skills like coding, graphics, writing, solar installation, and local SME businesses.
   - Peace building, unity, and safety.
3. Keep your response brief, engaging, and constructive (no more than 3-4 paragraphs or 150 words). Focus purely on practical answers. Always sign off with a powerful community phrase like "Progress & Unity!" or "Youths are the Anchor!"
        `;
        
        const response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: prompt,
        });

        if (response && response.text) {
          aiResponseText = response.text.trim();
        }
      } catch (err: any) {
        console.error("Gemini query failed, using helpful placeholder:", err);
        aiResponseText = `Leader, I hear you! (Note: Gemini API returned an error: "${err.message || 'Key is initializing'}"). Let us keep our focus on acquiring digital and marine skills to lift the Kingdom higher. Progress & Unity!`;
      }
    }

    const aiMessage = {
      id: `msg-${Date.now()}-ai`,
      sender: "AI Youth Advisor",
      role: "Advisor",
      text: aiResponseText,
      timestamp: new Date(Date.now() + 1000).toISOString(),
      avatar: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&h=150&fit=crop&crop=face" // Abstract cool AI avatar
    };

    chatMessages.push(aiMessage);
  }

  res.status(201).json({ success: true, messages: chatMessages });
});

// Get Poll
app.get("/api/poll", (req, res) => {
  res.json(activePoll);
});

// Vote in Poll
app.post("/api/poll/vote", (req, res) => {
  const { optionId } = req.body;
  const option = activePoll.options.find(o => o.id === optionId);
  if (option) {
    option.votes += 1;
    activePoll.totalVotes += 1;
    return res.json({ success: true, poll: activePoll });
  }
  res.status(404).json({ error: "Option not found" });
});

// Get Empowerment Suggestions
app.get("/api/suggestions", (req, res) => {
  res.json(empowermentSuggestions);
});

// Suggest Empowerment
app.post("/api/suggestions", (req, res) => {
  const { title, description, submittedBy } = req.body;
  if (!title || !description) {
    return res.status(400).json({ error: "Title and description are required." });
  }

  const newSuggestion = {
    id: `sug-${Date.now()}`,
    title,
    description,
    submittedBy: submittedBy || "Anonymous Youth",
    votes: 1,
    date: new Date().toISOString()
  };

  empowermentSuggestions.push(newSuggestion);
  res.status(201).json({ success: true, suggestions: empowermentSuggestions });
});

// Upvote Suggestion
app.post("/api/suggestions/vote", (req, res) => {
  const { suggestionId } = req.body;
  const suggestion = empowermentSuggestions.find(s => s.id === suggestionId);
  if (suggestion) {
    suggestion.votes += 1;
    return res.json({ success: true, suggestions: empowermentSuggestions });
  }
  res.status(404).json({ error: "Suggestion not found" });
});

// Reset Chat (Utility if needed for demo)
app.post("/api/reset-chat", (req, res) => {
  chatMessages.splice(3); // Keep first 3
  res.json({ success: true, messages: chatMessages });
});

// ----------------------------------------------------
// VITE DEV / PRODUCTION INTEGRATION
// ----------------------------------------------------

async function setupViteAndServe() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in DEVELOPMENT mode with Vite Middleware.");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in PRODUCTION mode.");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

setupViteAndServe();
