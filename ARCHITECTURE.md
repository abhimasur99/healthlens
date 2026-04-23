# HealthLens — Architecture

## System Overview

Closed-loop clinical reasoning agent: Detect → Reason → Intervene → Detect Again.

**Stack:**
- Frontend: Vite + React 18, inline styles, no external UI libraries
- Agent: Anthropic claude-sonnet-4-6, temperature 0.2, max 600 tokens
- Proxy: Vercel Serverless Function (API key security)
- Hosting: Vercel

## Data Flow

```
DATA object (static synthetic)
    ↓ day prop
Screen components (read-only display)

medState (React state — session-scoped overrides)
    ↑ PatientStatus (direct toggle) + MedLogger (via PatientAsk)
    ↓ MedCircle display

flags (React state)
    ↑ patient flags agent message in PatientAsk
    ↓ PhysicianDashboard inbox + tab badge

Browser → /api/chat (Vercel, server-side) → Anthropic API
               ↑ ANTHROPIC_API_KEY lives here only
```

## API Proxy

`api/chat.js` is a Vercel Serverless Function. It:
- Receives POST from the React frontend
- Forwards to Anthropic with server-side API key
- Returns response to browser
- Catches errors and sends push notification via ntfy.sh
- Key never enters the browser bundle

## Prompt Caching

The system prompt is identical across calls within a session (only patient context
variables change). `cache_control: { type: "ephemeral" }` is applied to the system
block, reducing latency and token cost on repeated calls within a 5-minute window.

## Three Data Pillars

| Pillar | Signals | Source in prototype |
|---|---|---|
| Physiological | HR, BP, steps, sleep, weight | Synthetic per day in DATA |
| Behavioral | Sleep timing variance, activity pattern, social engagement | Synthetic per day in DATA |
| Medication | Schedule, adherence, drug-specific timing | Synthetic per day in DATA |

## Escalation Logic

| Tier | Trigger | Patient | Physician |
|---|---|---|---|
| Stable | All nominal | Morning digest | No alert |
| Moderate | Single deviation | Amber verdict + nudge | No alert |
| Severe | Multi-signal decline | Red verdict + card | Auto-notified |

Day 18 is the demo anchor for the Severe tier.

---

## Known Gaps — Production Considerations

The following are intentional gaps in the prototype that would require resolution before
production deployment:

1. **Observability** — no logging layer for agent calls. Production system would log input
   state, output, latency, and token count per call to detect drift and monitor cost.

2. **Cross-session memory** — agent memory is session-scoped only. Production system would
   use Supabase (Postgres + Auth) to persist conversation history, med state, and flags,
   injecting relevant longitudinal context into each agent call.

3. **Prompt injection** — no input sanitization against adversarial user inputs in the chat
   interface. Production system would add input validation before passing user messages
   to the agent.

4. **Evaluation pipeline** — no automated evaluation of response quality. Production system
   would run agent outputs through an LLM-as-judge checking: trajectory-first language,
   grade 8 compliance, scope adherence, and disclaimer presence.

5. **Streaming inference** — agent responses render after full completion. Production system
   would implement streaming for perceived responsiveness.

6. **Authentication** — no user auth. Production system would use Supabase Auth with per-user
   session isolation, rate limiting, and RLS-enforced data access control.

7. **Rate limiting** — no per-user request limiting beyond Anthropic's spend cap. Production
   system would implement per-user rate limiting in the proxy layer.

## Production Path

A production HealthLens would add:
- Supabase for auth, Postgres DB, cross-session memory, and realtime updates
- HealthKit / Google Fit integration for live physiological and behavioral signals
- EHR integration via MCP tool calls (Epic FHIR API)
- Multi-agent architecture: physiological agent + behavioral agent + medication agent + orchestrator
- LLM-as-judge evaluation pipeline
- HIPAA compliance infrastructure and IRB approval
