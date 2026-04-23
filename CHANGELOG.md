# HealthLens — Changelog

## 2026-04-22 — V9 Initial Build

**Session goal:** Migrate V8 standalone HTML prototype to Vite + React 18 with Vercel proxy deployment.

**Files created this session:**
- Full project scaffold (Vite + React 18)
- `api/chat.js` — Vercel serverless proxy (API key security)
- `src/constants/theme.js` — centralized design tokens
- `src/constants/thresholds.js` — clinical threshold constants
- `src/data/patientData.js` — all patient data + dynamic constants
- `src/agent/api.js` + `src/agent/prompts.js` — agent layer
- `src/components/` — all 6 components including new MedLogger
- `src/screens/` — all 6 screens
- `src/hooks/usePatientData.js`
- `src/App.jsx` + `src/main.jsx`
- All documentation files

**Fixes applied:**
1. Removed hypothesis card from RoleSelect
2. Updated tagline to "Post-discharge recovery monitoring"
3. Disposition state reset on day change (useEffect)
4. MedLogger: data-driven tap UI, no API call
5. API routed through Vercel proxy

**Architecture changes from V8:**
- Added Vercel serverless proxy — API key never in browser
- Model upgraded: `claude-sonnet-4-20250514` → `claude-sonnet-4-6`
- Added prompt caching on system block
- Added `theme.js` and `thresholds.js` for all magic values
- All patient/physician identity strings extracted to constants
- max_tokens corrected: 1000 → 600 (per PRD)
- MED_CAL derived from MISSED_DAYS constant
- Behavioral signals copy: "Simulated from Apple Watch + iPhone usage patterns"
