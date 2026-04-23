# HealthLens — Session Memory

## Current Build Status
- **Version:** V9
- **Stack:** Vite + React 18 + Vercel Serverless Proxy + Anthropic claude-sonnet-4-6
- **State:** Initial scaffold complete — files being created this session

## What Is Complete
- Vite + React 18 scaffolded
- .gitignore, .env.local created
- All directories created
- Plan finalized

## What Is In Progress
- Full file creation (constants, data, agent, components, screens, app shell)

## What Is Next
- Smoke test with `vercel dev`
- Git init + GitHub push
- Vercel deploy + set ANTHROPIC_API_KEY in dashboard

## Architecture Decisions Locked
- Model: `claude-sonnet-4-6`
- API proxy: Vercel Serverless Function at `api/chat.js`
- No Supabase, no database, no auth for this prototype
- Supabase documented as production path in ARCHITECTURE.md
- Prompt caching on system block
- ntfy.sh for error push notifications (NTFY_TOPIC env var)
- theme.js + thresholds.js for all design tokens and clinical thresholds

## Five Fixes Applied
1. Hypothesis card removed from RoleSelect
2. Tagline → "Post-discharge recovery monitoring"
3. Disposition state scoped to Day 18 via useEffect reset
4. MedLogger: data-driven, schedule-aware, no API call
5. API call routed through Vercel proxy (no browser key exposure)

## Known Gaps (Production)
- No observability / logging layer
- No cross-session memory (Supabase path documented)
- No prompt injection sanitization
- No evaluation pipeline
- No streaming inference
