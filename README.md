# HealthLens

Post-discharge cardiac recovery monitoring agent.
Cornell Tech Health Tech MS prototype · V9 · Synthetic data only.

## Setup

```bash
# 1. Clone and install
git clone <repo-url>
cd healthlens
npm install

# 2. Add your API key — edit .env.local
ANTHROPIC_API_KEY=your_key_here
NTFY_TOPIC=healthlens-alerts   # optional: push notifications on proxy errors

# 3. Install Vercel CLI (runs frontend + proxy together locally)
npm i -g vercel

# 4. Run
vercel dev
```

Open http://localhost:3000

## Demo Arc

| Day | Status | Key event |
|---|---|---|
| 1 | Good · Green | Baseline established |
| 14 | Good · Green | Steady improvement |
| 18 | Fair · Amber | Multi-signal decline — demo anchor |
| 22 | Fair · Amber | Post-intervention recovery |
| 30 | Great · Blue | Month one complete |

Start with Day 18 for the core demo. Physician disposition flow is Day 18 only.

## Deploy to Vercel

```bash
vercel --prod
```

Then in Vercel dashboard → Project → Settings → Environment Variables, add:
- `ANTHROPIC_API_KEY` — your Anthropic key
- `NTFY_TOPIC` — your ntfy.sh topic (optional)

## Security

The Anthropic API key is held exclusively by the Vercel serverless proxy (`api/chat.js`).
It is never in the browser bundle. `.env.local` is gitignored and never committed.

Do not use with real patient data. See `CLINICAL_DISCLAIMER.md`.

## Stack

- Vite + React 18
- Anthropic claude-sonnet-4-6
- Vercel (hosting + serverless proxy)
- No database · No auth · All state in React
