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

## Specification

The full product, UX, and technical specification lives in [`docs/`](./docs/):

| Document | Purpose |
|---|---|
| [`docs/SPECIFICATION.md`](./docs/SPECIFICATION.md) | Master spec: mechanics, screens, architecture, acceptance criteria, roadmap. |
| [`docs/evaluation-rubric.md`](./docs/evaluation-rubric.md) | Scoring dimensions, weighting, speed bonus, engine prompt & output schema. |
| [`docs/challenge-library.md`](./docs/challenge-library.md) | Seed challenges with contextual media, rubrics, and expert model answers. |
| [`docs/data-model.md`](./docs/data-model.md) | Local-storage schema and TypeScript types. |

## Status

Specification draft (v1.0). No application code yet — see the
[roadmap](./docs/SPECIFICATION.md#17-phased-delivery-roadmap) for phased delivery.
