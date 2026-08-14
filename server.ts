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
          reply: "Sat Sri Akal! Welcome to Shri Guru Kirpa Gold Platters And Jewellers, Phagwara. For personalized advice and custom jewellery consultation, you can visit us at Shop No. 15, Bansawala Bazar, Phagwara or call us directly at +91 75085 00417. We specialize in 22K/24K Hallmark Gold Jewellery, traditional Punjabi Kadas, custom bridal sets, and expert gold polishing."
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
                text: `You are the master goldsmith and advisor for "Shri Guru Kirpa Gold Platters And Jewellers", a trusted local jewellery store and goldsmith in Bansawala Bazar, Sarafan Bazar Road, Phagwara, Punjab, India (Phone: +91 75085 00417, 4.9★ rating with 140+ reviews).
                You specialize in:
                - 100% BIS Hallmarked 22K (916) and 24K pure gold ornaments
                - Traditional Punjabi Gold Kadas (Sarbloh-core gold plated or solid 22K hallmark)
                - Bridal Gold Sets, Rani Haars, Choker Sets, Punjabi Jhumkas, and Nath
                - Custom jewellery design & goldsmith making orders according to customer reference pictures/weight
                - Gold and silver electroplating, jewellery polishing, and purity verification
                - Fair pricing, transparent making charges, and quick turnaround.

                Context of user query: ${JSON.stringify(context || {})}
                User query: "${userPrompt}"
                Provide respectful, warm, and helpful advice (2-3 short paragraphs max). Greet with warm traditional touch ("Sat Sri Akal / Namaste"), suggest suitable weights, karats, and designs, and invite them to visit the workshop in Bansawala Bazar, Phagwara or inquire on WhatsApp (+91 75085 00417).`
              }
            ]
          }
        ]
      });

      const text = response.text || "Sat Sri Akal! We invite you to visit our store in Bansawala Bazar, Phagwara to explore our 22K BIS Hallmarked gold ornaments and Punjabi Kadas.";
      return res.json({ reply: text });

    } catch (err: any) {
      console.error('AI Concierge error:', err);
      return res.status(500).json({
        reply: "Our digital assistant is momentarily busy. Please call or WhatsApp our goldsmith team directly at +91 75085 00417 or visit Shop No. 15, Bansawala Bazar, Phagwara."
      });
    }
  });

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', brand: 'Shri Guru Kirpa Gold Platters And Jewellers' });
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
