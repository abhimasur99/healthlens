# HealthLens — Session Memory

## Current Build Status
- **Version:** V9
- **Stack:** Vite 5 + React 18 + Vercel Serverless Proxy + Anthropic claude-sonnet-4-6
- **State:** Full build complete, initial commit on `main` branch

## What Is Complete
- All 40 files committed, clean build (48 modules, zero errors)
- All five fixes applied
- Git initialized on `main` branch
- All documentation files created

## What Is Next
1. Create GitHub repo and push: `git remote add origin <url> && git push -u origin main`
2. Install Vercel CLI: `npm i -g vercel`
3. Deploy: `vercel --prod`
4. Set `ANTHROPIC_API_KEY` in Vercel dashboard → Project → Settings → Environment Variables
5. Set `NTFY_TOPIC` in Vercel dashboard (optional — for push notifications on errors)
6. Subscribe to ntfy.sh topic on your phone (install ntfy app, subscribe to your topic)
7. Set Anthropic spend limit in Anthropic Console dashboard
8. Run full simulation arc end-to-end before sharing link with AdCom

## Architecture Decisions Locked
- Model: `claude-sonnet-4-6`
- API proxy: Vercel Serverless Function at `api/chat.js` — key never in browser
- No Supabase for prototype (documented as production path in ARCHITECTURE.md)
- Prompt caching: `cache_control: { type: "ephemeral" }` on system block
- ntfy.sh for error push notifications
- theme.js + thresholds.js for all design tokens and clinical thresholds
- max_tokens: 600 (corrected from V8's 1000, per PRD)
- Vite 5.4.x — Node 22.11 compatible (Vite 9 required 22.12+, pinned down)

## Five Fixes Applied
1. Hypothesis card removed from RoleSelect ✓
2. Tagline → "Post-discharge recovery monitoring" ✓
3. Disposition state reset on day change via useEffect ✓
4. MedLogger: data-driven, schedule-aware, no API call ✓
5. API routed through Vercel proxy, key server-side only ✓

## Dynamic Constants Added (beyond V8)
- `PATIENT`, `PHYSICIAN` — identity strings, single source of truth
- `MISSED_DAYS`, `DAY_LABELS`, `APP_VERSION` — in patientData.js
- `MED_CAL` — derived from `MISSED_DAYS`, not hardcoded indices
- `MODEL`, `MAX_TOKENS`, `TEMPERATURE` — in agent/api.js
- `COLORS`, `RADII` — in constants/theme.js
- `THRESHOLDS` — in constants/thresholds.js

## Known Issues / Notes
- Vite 9 incompatible with Node 22.11.0 — using Vite 5.4.x
- `src/App.css` and default Vite assets still present (unused, harmless)
- `vercel dev` requires Vercel CLI to be installed globally

## Known Gaps (Production)
- No observability / logging layer
- No cross-session memory (Supabase path documented in ARCHITECTURE.md)
- No prompt injection sanitization
- No evaluation pipeline
- No streaming inference
- No auth (intentional for prototype)
