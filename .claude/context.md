# HealthLens — Claude Code Context

## Project
Post-discharge cardiac recovery monitoring agent. Cornell Tech Health Tech MS application prototype.
Research hypothesis: can continuous mobile sensing reduce 30-day cardiac readmission rates?

## Stack
- Vite + React 18
- Anthropic claude-sonnet-4-6 (temperature 0.2, max 600 tokens)
- Vercel serverless proxy at api/chat.js (API key security)
- No external UI libraries — inline styles only
- No database — all state in React

## Locked Design
- Colors: green #34C759, amber #FF9500, blue #007AFF, red #FF3B30
- Phone frame: 360×760px, border-radius 44px, box-shadow 0 0 0 9px #1C1C1E
- All tokens in src/constants/theme.js
- All thresholds in src/constants/thresholds.js
- Patient copy: grade 8 max, trajectory-first
- Physician copy: clinical sentences, metric-first

## Session Protocol
### Open
- Read MEMORY.md
- State build status in 3 bullets
- State today's goal
- List every file to touch
- Wait for confirmation

### Close
- Update MEMORY.md
- Update CHANGELOG.md
- Confirm no out-of-scope files touched

## Drift Prevention
- Never change design, colors, copy, or layout unless explicitly instructed
- Never add features not in the locked feature list
- Never touch a file not listed in today's scope
- If a fix requires an out-of-scope file, stop and ask first

## Key Files
- src/data/patientData.js — single source of truth for all patient data
- src/constants/theme.js — all colors and radii
- src/constants/thresholds.js — all clinical flag thresholds
- api/chat.js — Vercel proxy, holds API key
- src/agent/api.js — sendMessage(), calls /api/chat
- src/agent/prompts.js — buildPatientPrompt()
