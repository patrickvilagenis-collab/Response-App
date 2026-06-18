# Response-App

A real-time **speaking-proficiency challenge platform**. Users practice
delivering rapid, high-quality responses to high-stakes professional scenarios
under a 30-second limit (by voice or text), and receive immediate, expert-grade
coaching. It's a professional coaching tool — not a game.

> _Es una plataforma para practicar qué respuesta dar en situaciones incómodas,
> conflictos, momentos delicados, etc. — bajo presión de tiempo y con feedback
> de coaching inmediato._

## What it does

- Drops you into immersive, second-person scenarios ("It's Friday afternoon…")
  anchored by **contextual media** that sets the scene, role, and stakes.
- Gives you **30 seconds** to respond — by **voice** (mic → transcript) or **text**.
- Scores the response **0–100%** across three dimensions — Content & Structure,
  Delivery & Presence, Time Management — with a transparent breakdown and a
  speed bonus for fast, complete answers.
- Returns **strict-but-fair coaching**: what worked, what was missing, stronger
  phrasings, and the expert model answer — within 2–3 seconds.
- Grounds challenges in real frameworks: **WAVE**, executive **coaching
  assessments**, **360-degree feedback**, **behavioral/STAR**, high-pressure
  **situational**, and **team/leadership conflict** scenarios — across
  categories and four difficulty levels (Warm-up → Executive).
- **Local-only** (v1): local login, history, and progress stored in the browser;
  no user data sent to a server. UI in **English, German, and Spanish (Spain)**,
  switchable instantly without data loss.

## Put it online (anyone can use it, AI included)

Deploy to **Vercel** and you get a public URL with **AI evaluation built in** —
visitors never enter a key. Your Anthropic key is stored as a secret on the
server and used only by the serverless proxy in [`api/evaluate.js`](./api/evaluate.js).

**Full step-by-step: [`DEPLOY.md`](./DEPLOY.md)** (≈3 minutes). In short: import
the repo on Vercel, add an `ANTHROPIC_API_KEY` environment variable, click
Deploy. Every response is then scored by the integrated AI automatically; if the
AI is ever unavailable, the app falls back to a built-in offline evaluator so it
never breaks.

## Running it locally (optional, for development)

```bash
npm install
npm run dev      # http://localhost:5173
```

Locally the AI proxy isn't running, so the app uses the offline evaluator. To
test the AI path locally, install the Vercel CLI and run `vercel dev` with
`ANTHROPIC_API_KEY` set. Other scripts: `npm run build`, `npm run preview`,
`npm run typecheck`.

> First run: pick a language, enter any display name to create a local profile,
> then open a challenge from Home or the Library.

## Specification

The full product, UX, and technical specification lives in [`docs/`](./docs/):

| Document | Purpose |
|---|---|
| [`docs/SPECIFICATION.md`](./docs/SPECIFICATION.md) | Master spec: mechanics, screens, architecture, acceptance criteria, roadmap. |
| [`docs/evaluation-rubric.md`](./docs/evaluation-rubric.md) | Scoring dimensions, weighting, speed bonus, engine prompt & output schema. |
| [`docs/challenge-library.md`](./docs/challenge-library.md) | Seed challenges with contextual media, rubrics, and expert model answers. |
| [`docs/data-model.md`](./docs/data-model.md) | Local-storage schema and TypeScript types. |

## Tech stack

React + TypeScript + Vite front end, plus one Vercel serverless function for the
secure AI proxy. User data persists locally (`localStorage`); voice uses the Web
Speech API with graceful fallback to text. Contextual media is rendered as
inline SVG scenes so every challenge has a setting that loads instantly.

```
api/evaluate.js          secure serverless AI proxy (holds the key server-side)
src/
  data/challenges.ts     seed library (localized scenarios, rubrics, model answers)
  lib/evaluator.ts       offline evaluator + integrated AI (via /api/evaluate)
  lib/scoring.ts         composite score + speed bonus
  lib/speech.ts          Web Speech API wrapper
  lib/stats.ts           progress + recommendations
  i18n/                  EN / DE / ES-ES strings
  components/            SceneMedia, TimerRing, AppShell, LanguagePicker
  screens/               Login, Home, Library, Scenario, Response, Results, History, Settings
  state/store.tsx        app state, routing, persistence
vercel.json              deploy config
```

## Status

Working v1 (local-only). See the
[roadmap](./docs/SPECIFICATION.md#17-phased-delivery-roadmap) for what's next
(external STT fallback, PWA/offline shell, cloud sync).
