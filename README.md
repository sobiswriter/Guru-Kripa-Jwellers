# Shri Guru Kirpa Gold Platters And Jewellers

A modern React + Vite website for **Shri Guru Kirpa Gold Platters And Jewellers (Phagwara, Punjab)**, featuring a luxury jewellery catalog experience, virtual try-on interactions, appointment booking flows, store discovery, and an AI-powered jewellery concierge.

## Highlights

- Premium responsive storefront (mobile-first + rich desktop layout)
- Product catalog with category and material/style filters
- Interactive product exploration (zoom loupe and media galleries)
- Virtual try-on experience for select products
- Appointment booking modal for consultation visits
- Store locator with map, timings, and quick call/WhatsApp actions
- Customer reviews and heritage collection showcases
- AI Concierge drawer backed by Gemini API (`/api/ai-concierge`)

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite
- **Backend:** Express (single server for API + app hosting)
- **AI:** `@google/genai` (Gemini model)
- **UI:** Tailwind (via `@tailwindcss/vite`), Lucide icons

## Project Structure

```text
.
├── src/                  # React app (components, data, types)
├── assets/               # Static assets
├── server.ts             # Express server + AI Concierge API + Vite middleware
├── index.html            # App entry HTML
├── package.json          # Scripts and dependencies
└── .env.example          # Environment variable template
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Environment Variables

Copy `.env.example` to `.env` and update values:

```bash
cp .env.example .env
```

Required/used variables:

- `GEMINI_API_KEY` — Enables live AI concierge responses.
  - If missing, the app returns a built-in fallback message.
- `APP_URL` — Host URL reference for deployment/runtime integrations.

### Run in Development

```bash
npm run dev
```

Then open `http://localhost:3000`.

## Available Scripts

- `npm run dev` — Start Express + Vite dev server
- `npm run build` — Build frontend and bundle server to `dist/server.cjs`
- `npm run start` — Run production server from built output
- `npm run lint` — TypeScript type-check (`tsc --noEmit`)
- `npm run clean` — Remove build artifacts

## Production Build

```bash
npm run build
npm run start
```

## API Endpoints

- `POST /api/ai-concierge`
  - Request body: `{ userPrompt: string, context?: object }`
  - Returns: `{ reply: string }`
- `GET /api/health`
  - Returns service health and brand metadata

## Business Context

This project is tailored for a local jewellery brand in Phagwara, highlighting:

- 22K/24K hallmarked gold jewellery
- Punjabi heritage designs (kadas, bridal sets, jhumkas, etc.)
- Custom order and in-house karigar services
- Gold plating and polishing offerings

## License

No explicit repository license is currently defined.
