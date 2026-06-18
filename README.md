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

## Running the app

```bash
npm install
npm run dev      # http://localhost:5173
```

Other scripts: `npm run build` (production build), `npm run preview` (serve the
build), `npm run typecheck`.

It works fully **offline out of the box** — a built-in deterministic evaluator
scores responses with no API key. For richer AI scoring, add an Anthropic API
key in **Settings → AI evaluation** (the key is stored only in your browser and
only transcript text is ever sent).

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

React + TypeScript + Vite, no backend. State persists locally
(`localStorage`); voice uses the Web Speech API with graceful fallback to text.
Contextual media is rendered as inline SVG scenes so every challenge has a
setting that loads instantly and offline.

```
src/
  data/challenges.ts     seed library (localized scenarios, rubrics, model answers)
  lib/evaluator.ts       offline + optional LLM evaluation
  lib/scoring.ts         composite score + speed bonus
  lib/speech.ts          Web Speech API wrapper
  lib/stats.ts           progress + recommendations
  i18n/                  EN / DE / ES-ES strings
  components/            SceneMedia, TimerRing, AppShell, LanguagePicker
  screens/               Login, Home, Library, Scenario, Response, Results, History, Settings
  state/store.tsx        app state, routing, persistence
```

## Status

Working v1 (local-only). See the
[roadmap](./docs/SPECIFICATION.md#17-phased-delivery-roadmap) for what's next
(external STT fallback, PWA/offline shell, cloud sync).
