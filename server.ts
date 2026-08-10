import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API endpoint for AI Styling Concierge
  app.post('/api/ai-concierge', async (req, res) => {
    try {
      const { userPrompt, context } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        return res.json({
          reply: "Welcome to Aura & Carat Haute Joaillerie Concierge! For personalized style recommendations, please ensure your GEMINI_API_KEY is configured in Settings → Secrets. Meanwhile, I recommend exploring our flagship 2.50ct Elysian Oval Solitaire or Colombian Emerald drop pendant!"
        });
      }

      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `You are "Maison Aura Concierge", a sophisticated, world-renowned French High Jewelry Master & Diamond Stylist for the luxury brand "Aura & Carat". Speak with regal elegance, warmth, and deep gemological authority.
                Context of user query: ${JSON.stringify(context || {})}
                User query: "${userPrompt}"
                Provide concise, elegant advice (2-3 short paragraphs max). Suggest specific ring, necklace, or gemstone types (e.g., Oval Solitaire, Muzo Emerald, Ceylon Sapphire, Baguette Eternity) and explain why it suits their hand, neck, budget, or occasion.`
              }
            ]
          }
        ]
      });

      const text = response.text || "Our master gemologists recommend exploring our Celestial Solitaire collection in platinum for timeless brilliance.";
      return res.json({ reply: text });

    } catch (err: any) {
      console.error('AI Concierge error:', err);
      return res.status(500).json({
        reply: "Pardon me, our AI Concierge is experiencing a brief intermission. Our human gemologists at our Place Vendôme or Fifth Avenue flagships are available for immediate private consultation."
      });
    }
  });

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', brand: 'Aura & Carat Haute Joaillerie' });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
