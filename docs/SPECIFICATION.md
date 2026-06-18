# Response-App — Technical & UX Specification

**Document type:** Product, UX, and technical specification
**Status:** Draft v1.0
**Last updated:** 2026-06-18

> Response-App is a real-time **speaking-proficiency challenge platform**. Users
> practice delivering rapid, high-quality responses to high-stakes professional
> scenarios under a hard time limit, and receive immediate, expert-grade
> coaching feedback. It is a coaching tool, not a game.

---

## Table of contents

1. [Product overview](#1-product-overview)
2. [Personas & core user journeys](#2-personas--core-user-journeys)
3. [Core mechanics](#3-core-mechanics)
4. [Challenge taxonomy & progression](#4-challenge-taxonomy--progression)
5. [Scenario presentation & contextual media](#5-scenario-presentation--contextual-media)
6. [Response capture (text & voice)](#6-response-capture-text--voice)
7. [Evaluation engine](#7-evaluation-engine)
8. [Coaching feedback](#8-coaching-feedback)
9. [Screens & UX flows](#9-screens--ux-flows)
10. [Internationalization (EN / DE / ES-ES)](#10-internationalization-en--de--es-es)
11. [Accounts, data model & local storage](#11-accounts-data-model--local-storage)
12. [Technical architecture](#12-technical-architecture)
13. [Visual & interaction design system](#13-visual--interaction-design-system)
14. [Accessibility & error handling](#14-accessibility--error-handling)
15. [Non-functional requirements](#15-non-functional-requirements)
16. [Acceptance criteria & traceability](#16-acceptance-criteria--traceability)
17. [Phased delivery roadmap](#17-phased-delivery-roadmap)
18. [Open questions & assumptions](#18-open-questions--assumptions)

Related documents:
- [`challenge-library.md`](./challenge-library.md) — example challenges, rubrics, and expert model answers
- [`evaluation-rubric.md`](./evaluation-rubric.md) — the scoring rubric and prompt design in detail
- [`data-model.md`](./data-model.md) — full local-storage schema and TypeScript types

---

## 1. Product overview

### 1.1 Problem

Most professionals freeze under spotlight pressure: a surprise question from a
senior leader, a direct report challenging a decision in front of a client, an
unbriefed escalation on a Friday afternoon. Quality of thought matters, but so
does the ability to deliver it **quickly, structured, and with presence**.
There is no low-risk place to rehearse this repeatedly against expert standards.

### 1.2 Solution

A web app that drops the user into realistic, second-person, high-stakes
scenarios — anchored by contextual media — and gives them **30 seconds** to
respond by voice or text. An AI evaluation engine scores the response 0–100 %
across content, delivery, and time management, then delivers strict-but-fair
coaching: what worked, what was missing, and how to phrase it better.

### 1.3 Design philosophy

| Principle | What it means in practice |
|---|---|
| **Spotlight, not sandbox** | Scenarios are immersive and direct ("It's Friday afternoon…"), never abstract ("You are in a situation where…"). |
| **Strict but fair** | Feedback benchmarks against expert-level standards. No empty praise. Users should feel professionally evaluated. |
| **Speed is a skill** | Faster, well-structured responses score higher. Response time is always visible and always counts. |
| **Immersion through media** | Every challenge opens with a photo/video/layout that answers: *Where am I? Who am I? What's my role? What am I doing?* |
| **Iterate to improve** | The loop is respond → score → coach → retry. Progress is tracked and visible. |
| **Calm, modern, focused** | Clean professional UI; the drama lives in the scenario, not in the chrome. |

### 1.4 Scope of this version (v1, local-only)

- **In scope:** Local login, challenge library with rubrics & model answers,
  text + voice capture, evaluation & coaching, response timing, session
  history, EN/DE/ES-ES, responsive web, local persistence only.
- **Out of scope (v1):** Backend accounts/sync, social/leaderboards, payments,
  admin authoring CMS, native mobile apps. (See [roadmap](#17-phased-delivery-roadmap).)

---

## 2. Personas & core user journeys

### 2.1 Personas

- **Mia, 34 — Senior Manager preparing for promotion panels.** Needs to handle
  ambiguous, C-level-style questions with composure. Practices 10 min/day on
  mobile during commute (voice input).
- **Daniel, 41 — Team Lead facing conflict situations.** Wants to rehearse
  responding to direct reports and peer challenges without sounding defensive.
- **Lucía, 28 — Consultant prepping for client-facing interviews.** Switches
  between Spanish and English; values strict scoring and model answers.

### 2.2 Primary journey (happy path)

1. Open app → local login (or create local profile).
2. Pick language (or keep last used).
3. Choose a **category** and **difficulty**, or "Surprise me".
4. Challenge screen loads **contextual media first**, then the scenario text.
5. User reads fully → presses **Play** → 30-second timer starts.
6. User responds by **voice** or **text**.
7. Submit (or auto-submit at 0 s) → score appears within 2–3 s.
8. **Initial score + brief assessment**, then **detailed coaching**.
9. User retries the same challenge, advances, or returns to library.
10. Result is written to **session history**.

---

## 3. Core mechanics

### 3.1 The 30-second response window

- The scenario is **fully visible before** the user starts. There is **no
  hidden question revealed after Play** — pressing Play only starts the clock.
- Pressing **Play** starts a **30.0 s countdown** (hard cap).
- The timer is always visible (ring + numeric). Visual urgency states:
  - **0–20 s:** calm (brand color).
  - **20–27 s:** warning (amber).
  - **27–30 s:** critical (red, subtle pulse).
- At **0 s** the response **auto-submits** with whatever has been captured.
- **Response time `t`** = seconds from Play to Submit, captured to 0.1 s.

### 3.2 Speed bonus

Faster, complete answers are rewarded. The Time-Management dimension (see
[§7](#7-evaluation-engine)) blends *fit within the window* with *efficiency*.
A small explicit **speed bonus** is added on top of the base composite:

```
speedBonus = round( clamp( (30 - t) / 30, 0, 1 ) * MAX_SPEED_BONUS )
```

- `MAX_SPEED_BONUS = 5` points by default (configurable).
- The bonus is **only applied when the response meets a minimum quality floor**
  (composite ≥ 50) so users cannot game the system by answering instantly with
  nothing. A fast, empty answer must not beat a thorough, considered one.
- The final displayed score is `clamp(composite + speedBonus, 0, 100)`.

### 3.3 The practice loop

```
Library ──▶ Scenario (media → text) ──▶ Play ──▶ Respond ──▶ Score
   ▲                                                            │
   └──────────────── Retry / Next ◀──── Coaching ◀──────────────┘
```

Retry re-runs the **same** scenario; "Next" advances within the current
category/difficulty track.

---

## 4. Challenge taxonomy & progression

### 4.1 Categories

1. **Professional Communication** — status updates, escalations, executive presence.
2. **Leadership Decisions** — trade-offs, prioritization, accountability.
3. **Conflict Resolution** — disagreements with peers, reports, stakeholders.
4. **Strategic Thinking** — ambiguity, long-range reasoning, framing.
5. **Feedback & Difficult Conversations** — giving/receiving critical feedback.
6. **Self-Awareness & Development** — coaching-style reflective prompts.

(Categories are data-driven; new ones can be added without code changes.)

### 4.2 Difficulty levels

| Level | Label | Character |
|---|---|---|
| 1 | **Warm-up** | General, broadly relatable professional questions. |
| 2 | **Applied** | Specific workplace situations with one clear tension. |
| 3 | **Pressure** | Multi-stakeholder, time-sensitive, visible stakes. |
| 4 | **Executive** | Ambiguous, nuanced, C-level decision-making, no clean answer. |

Difficulty raises the rubric bar: at Level 4 the engine expects structured
frameworks, explicit trade-off acknowledgement, and stakeholder awareness, and
penalizes generic answers harder.

### 4.3 Challenge types

Every challenge is grounded in an authentic professional framework. Each
`type` carries its own rubric emphasis (see [`evaluation-rubric.md`](./evaluation-rubric.md)).

| Type | Source framework | Evaluation emphasis |
|---|---|---|
| `wave` | **WAVE assessment** competency models | Leadership competencies, strategic reasoning, judgement. |
| `coaching` | Executive **coaching assessment** | Self-awareness, ownership, development orientation. |
| `feedback360` | **360-degree feedback** patterns | Interpersonal impact, team dynamics, perspective-taking. |
| `behavioral` | **Behavioral / STAR** interviewing | Concrete past example, structure (Situation-Task-Action-Result). |
| `situational` | **High-pressure situational** scenarios | Composure, presence, prioritization under spotlight. |
| `conflict` | **Team & leadership conflict** scenarios | De-escalation, boundary-setting, fairness, leadership stance. |

> **Situational** and **conflict** challenges are *immersive situations*, not
> questions — e.g. *"It's Friday afternoon. You have a meeting with your boss's
> boss. You haven't been briefed. They tell you the CEO is upset about a project
> you worked on. How do you respond?"* These build visibility, confidence,
> presence, and impact under spotlight pressure.

### 4.4 Progression logic

- Within a track (category × type), challenges are ordered by difficulty.
- A challenge is marked **"track-cleared"** when the user reaches a configurable
  threshold (default: composite ≥ 75 at that level).
- The library surfaces the user's **recommended next challenge** based on
  weakest dimension and lowest-cleared difficulty (see [§11](#11-accounts-data-model--local-storage)).

---

## 5. Scenario presentation & contextual media

### 5.1 Presentation rules (hard requirements)

1. **Media loads first.** The contextual image/video/layout renders (or shows a
   skeleton then renders) **before** the scenario text is revealed.
2. **Full scenario visible before Play.** The complete scenario text is shown;
   the user reads at their own pace.
3. **Second-person, immediate framing.** Copy places the user *in* the moment
   ("It's Friday afternoon…"), never abstracted ("You are in a situation where…").
4. **Play starts the clock only.** No new content appears after Play.
5. **Media is mandatory per challenge** and must establish: *Where am I? Who am
   I? What is my role? What am I doing?*

### 5.2 Media types & examples

| Scenario | Suggested media |
|---|---|
| Executive / board scenario | Boardroom photograph |
| Team conflict | Team-meeting room layout / photo |
| Direct-report conversation | Office desk or **video-call interface** mock |
| Client challenge | Client-meeting / presentation setting |
| Reflective coaching prompt | Calm 1:1 / quiet office setting |

Media spec:
- **Formats:** `webp`/`avif` (image, preferred), `jpg`/`png` fallback, `mp4`/`webm` (short, muted, looping ≤ 10 s) for video, or a CSS/HTML "layout" composition for interface mocks.
- **Aspect:** 16:9 primary, with a 4:5 crop variant for mobile portrait.
- **Performance budget:** ≤ 200 KB per image at display size; lazy + preloaded for the *active* challenge.
- **Alt text:** every media asset has localized alt text (also reinforces immersion for screen-reader users).
- **Attribution/licensing:** assets must be license-clean (own, commissioned, or CC0/royalty-free). Tracked in the asset manifest.

### 5.3 Reveal sequence (timeline)

```
t0  Media slot renders (skeleton → asset)        [media first]
t1  Role/setting caption fades in                ("You are the Regional Lead…")
t2  Scenario body text fades in                  [full text, no timer yet]
t3  Play button becomes enabled                  [user reads, then presses]
t4  PLAY → 30.000s timer starts                  [no new content shown]
```

---

## 6. Response capture (text & voice)

### 6.1 Two input modes

The user chooses **Voice** or **Text** per challenge (last choice remembered).

### 6.2 Voice input

- Request microphone permission **gracefully and just-in-time** (on first voice
  use, with a clear explanation; never silently fail).
- **Capture:** Web Audio API / `MediaRecorder` for the raw audio (for waveform
  + optional playback). **Transcription:** Web Speech API (`SpeechRecognition`)
  where available, providing live interim transcript.
- **Pipeline:** capture audio → transcribe to text → evaluate the **transcript**.
- Show a **live waveform** and the **interim transcript** so the user has
  confidence they're being heard.
- **Fallbacks & resilience:**
  - If `SpeechRecognition` is unavailable/blocked (e.g. Safari/Firefox quirks),
    fall back to an external STT provider **if** online and configured;
    otherwise show audio captured + a manual "type what you said" affordance so
    the session is never blocked.
  - If permission is denied, show inline guidance and switch the user to Text
    mode without losing the timer/session state.
- Transcript is editable before submit (the user can fix obvious mis-hearings).

### 6.3 Text input

- Multiline field, autofocus on Play, no character limit but a soft word-count
  hint. Submit via button or ⌘/Ctrl+Enter.

### 6.4 Captured artifacts per attempt

- Transcript/typed text, input mode, `responseTimeSec`, audio blob (kept
  **locally**, optional, user-purgeable), and timer metadata.

> **Privacy (v1):** audio and transcripts never leave the device unless the
> optional external STT path is explicitly enabled. See [§11.4](#114-privacy--data-handling).

---

## 7. Evaluation engine

### 7.1 Three scoring dimensions

The engine scores every response on three interconnected dimensions, then
combines them into a transparent composite.

| Dimension | Weight (default) | What it measures |
|---|---|---|
| **Content Accuracy & Structure** | 50 % | Factual soundness, logical organization, completeness, use of an appropriate framework (e.g. STAR for behavioral). |
| **Delivery Confidence & Presence** | 25 % | Assuredness, clarity, decisiveness, ownership — inferred from transcript characteristics (hedging, filler, qualifiers, directness) and response cadence. |
| **Time Management** | 25 % | Fit within 30 s; key points delivered efficiently without rushing or padding. |

Weights are configurable and may shift by challenge `type` (e.g. `behavioral`
weights structure higher; `situational` weights presence higher). See
[`evaluation-rubric.md`](./evaluation-rubric.md).

### 7.2 Composite & final score

```
composite  = Σ (dimensionScore_i × weight_i)        // each 0–100, weights sum to 1
final      = clamp( composite + speedBonus, 0, 100 )  // speedBonus per §3.2
```

The breakdown (per-dimension scores + speed bonus) is always shown to the user
so scoring is **transparent**, not a black box.

### 7.3 Scoring bands

| Band | Range | Meaning |
|---|---|---|
| Excellent | 85–100 | Expert-level: structured, complete, confident, efficient. |
| Strong | 70–84 | Solid with minor gaps. |
| Adequate | 55–69 | Recognizable answer; notable gaps in structure or completeness. |
| Developing | 40–54 | Partial; missing key elements or unfocused. |
| Weak | 0–39 | Off-target, incomplete, or non-responsive. |

### 7.4 How evaluation is computed

The engine is **LLM-based, rubric-grounded**:

1. The challenge ships with a **rubric** and an **expert model answer**.
2. The engine receives: scenario, rubric, model answer, user transcript,
   `responseTimeSec`, challenge `type`/difficulty, and target language.
3. It returns **structured JSON** (not prose): per-dimension scores with one-line
   justifications, the composite, strengths, gaps, and concrete rewrites.
4. The app computes `speedBonus` and the final score deterministically in code
   (not left to the model) to keep timing fair and reproducible.

**Model choice:** target the latest, most capable Claude model for evaluation
quality (e.g. an Opus-class model) given the nuanced judgement required;
responses must be JSON-schema-constrained. A faster model may serve Warm-up
levels for cost/latency. The engine is provider-abstracted behind an
`EvaluationProvider` interface (see [§12](#12-technical-architecture)) so the
underlying model/service can change without touching the UI.

**Determinism & fairness:** identical inputs should yield near-identical scores
(low temperature, fixed rubric). Timing math is always code-side.

### 7.5 Strict-but-fair calibration

- No participation credit. A vague but pleasant answer scores **Adequate at
  best**.
- Penalize: hedging, filler, missing structure, ignoring stakeholders, failing
  to actually answer the question, padding to fill time.
- Reward: a clear stance, a recognizable framework, acknowledgement of
  trade-offs, concise delivery, composure under the scenario's pressure.
- Difficulty scales the bar (a Level-4 "good" answer would be a Level-1 "great").

### 7.6 Performance

Evaluation result (score + assessment + coaching) must return **within 2–3
seconds** of submission. UI shows an evaluating state with skeletons; coaching
may stream in after the score chip if needed to hit the score-first target.

---

## 8. Coaching feedback

Delivered in two stages after submit:

### 8.1 Stage 1 — Initial score + brief assessment (instant)

- Large **final score** with band label and color.
- **Response time** prominently: e.g. *"Responded in 23.4 s / 30 s"* with the
  speed bonus shown (e.g. *"+4 speed bonus"*).
- One-to-two-sentence **headline assessment** (e.g. *"Clear stance, but you
  never acknowledged the client's exposure — that's the gap holding this back."*).
- Dimension mini-bars (Content / Delivery / Time).

### 8.2 Stage 2 — Detailed coaching (longer than the score)

Structured, specific, and actionable — **never generic praise**:

1. **What worked** — specific strong moves the user made (quote their words).
2. **What was missing / gaps** — logic gaps, missing stakeholders, unsupported
   claims, structural problems.
3. **Stronger phrasings** — 1–3 concrete alternative lines the user could have
   said, in the **session language**.
4. **The expert model answer** — revealed for comparison, with a note on *why*
   it scores high.
5. **One focus for next time** — a single, prioritized improvement.

### 8.3 Coaching tone

Direct, professional, respectful. Like a senior coach who believes the user can
reach expert level and won't waste their time with flattery.

---

## 9. Screens & UX flows

### 9.1 Screen inventory

| # | Screen | Purpose |
|---|---|---|
| S1 | **Login / Profile select** | Local login or create profile; language picker. |
| S2 | **Home / Dashboard** | Resume, recommended next challenge, recent scores, progress snapshot. |
| S3 | **Library / Challenge browser** | Browse by category, type, difficulty; "Surprise me". |
| S4 | **Scenario screen** | Media-first → role caption → scenario text → Play. |
| S5 | **Response screen** | Timer ring, input toggle (voice/text), live transcript/waveform, submit. |
| S6 | **Evaluating state** | Score-first skeleton (≤ 2–3 s). |
| S7 | **Results & coaching** | Score, time, dimension bars, coaching, model answer, retry/next. |
| S8 | **History** | Timeline + filters; per-attempt detail. |
| S9 | **Progress** | Scores by category/difficulty/dimension over time. |
| S10 | **Settings** | Language, input defaults, mic test, data export/clear. |

### 9.2 Key flow — Scenario → Response → Results

```
S3 Library
   │ select challenge
   ▼
S4 Scenario      media (first) → role caption → full text → [Play enabled]
   │ press Play  (timer starts)
   ▼
S5 Response      [30s ring]  voice/text  live transcript  [Submit | auto@0s]
   │ submit
   ▼
S6 Evaluating    score-first skeleton  (2–3s)
   ▼
S7 Results       score • "Responded in 23.4s/30s • +4" • dimension bars
                 ▸ coaching (worked / missing / better phrasing)
                 ▸ expert model answer
                 [Retry same]  [Next in track]  [Back to library]
```

### 9.3 Interaction details

- **Timer ring** doubles as the dominant visual on S5; numeric seconds inside.
- **Input toggle** is a segmented control (Voice | Text); switching mid-attempt
  preserves the timer and any captured content.
- **Submit** is always available; at 0 s the system auto-submits.
- **Retry** resets the timer and clears the previous response but keeps the
  scenario; the prior attempt is saved to history.
- **Score reveal** is celebratory-but-restrained (no confetti — this is a
  coaching tool): a crisp count-up to the score, then bars animate in.

### 9.4 Responsive behavior

- **Mobile portrait (≤ 640px):** single column; media 4:5 crop on top; timer
  ring centered; input docked to bottom; large touch targets (≥ 44px).
- **Tablet (641–1024px):** comfortable single/just-wide column.
- **Desktop (≥ 1025px):** two-pane on Results (coaching left, model answer
  right); media full-bleed on Scenario.
- Voice controls reachable one-handed on mobile (primary mic button bottom-center).

---

## 10. Internationalization (EN / DE / ES-ES)

- **Supported locales:** English (`en`), German (`de`), Spanish – Spain (`es-ES`).
- **Switchable at any time**, instantly, **without data loss** — switching never
  navigates away or discards an in-progress attempt; the current screen
  re-renders in the new language.
- **Persisted** in the local profile and reused next session.
- **What is localized:**
  - All UI chrome (buttons, labels, states, errors).
  - **Scenario text, role captions, media alt text** — each challenge stores
    localized strings keyed by locale.
  - **Coaching output** — the evaluation engine is instructed to produce
    feedback and alternative phrasings in the **active locale**.
  - Rubrics and model answers are authored per locale (or a base locale +
    professional translation), so scoring standards are consistent.
- **Formatting:** numbers/dates via `Intl`; ES-ES specific (es-ES not es-419).
- **Architecture:** i18n resource bundles per locale; challenge content carries
  a `i18n` map (see [`data-model.md`](./data-model.md)). Missing-string fallback
  order: active locale → `en` → key name (flagged in dev).
- **Speech recognition language** follows the active locale (`recognition.lang`
  = `en-US` / `de-DE` / `es-ES`).

---

## 11. Accounts, data model & local storage

### 11.1 Local login (no backend)

- Credentials and profile are stored **locally in the browser** (v1: no server
  auth, no network transmission of user data).
- Multiple local profiles supported (profile select on S1).
- Passwords (if used) stored as a salted hash in local storage — **note:**
  local-only "auth" is a convenience gate, not real security; documented as such.

### 11.2 What persists locally

- Profile: id, display name, **language preference**, input defaults.
- **Challenge history:** per attempt — challenge id, category, type, difficulty,
  final score, dimension scores, `responseTimeSec`, speed bonus, input mode,
  transcript, timestamp, (optional) audio blob.
- **Aggregate progress:** scores by category, by difficulty, by dimension;
  streaks; cleared tracks; weakest dimension (drives recommendations).

### 11.3 Storage mechanism

- Structured records in **IndexedDB** (history, audio blobs); small key-values
  (current profile, language) in `localStorage`.
- A `StorageProvider` interface abstracts persistence so a future backend/sync
  can replace it without UI changes.
- Full schema and TypeScript types: [`data-model.md`](./data-model.md).

### 11.4 Privacy & data handling

- **v1: no data leaves the device** except, optionally and explicitly, the
  transcript text sent to the evaluation LLM / external STT when those network
  paths are enabled. This is disclosed in Settings and at first run.
- Users can **export** (JSON) and **clear all data** from Settings.
- Audio retention is opt-in and purgeable.

---

## 12. Technical architecture

### 12.1 Stack (recommended)

- **Frontend:** TypeScript + React (or Svelte) SPA, Vite build. PWA-capable for
  installable mobile use and offline shell.
- **Styling:** utility CSS (e.g. Tailwind) + a small token-driven component lib
  (see [§13](#13-visual--interaction-design-system)).
- **State:** lightweight store (Zustand/Redux Toolkit) + persistence middleware.
- **i18n:** `i18next` (or equivalent) with per-locale bundles.
- **No backend in v1** — all logic client-side; provider interfaces leave room
  for a future server.

### 12.2 Module boundaries (provider interfaces)

```
UI (screens, components)
        │
        ▼
┌───────────────────────────────────────────────────────┐
│  Application services                                  │
│                                                        │
│  ChallengeService      → loads challenges + rubrics    │
│  SessionService        → timer, attempt lifecycle      │
│  CaptureProvider       → { TextCapture, VoiceCapture } │
│  TranscriptionProvider → WebSpeech | ExternalSTT       │
│  EvaluationProvider    → LLM-based scorer (JSON out)   │
│  ScoringService        → composite + speedBonus (code) │
│  StorageProvider       → IndexedDB / localStorage      │
│  I18nProvider          → locale + content resolution   │
└───────────────────────────────────────────────────────┘
```

Each provider is an interface with swappable implementations and a **mock**
implementation for tests/offline demo (e.g. a deterministic offline evaluator
for development and graceful degradation).

### 12.3 Evaluation provider contract

- **Input:** `{ scenario, rubric, modelAnswer, transcript, responseTimeSec, type, difficulty, locale }`.
- **Output (JSON-schema constrained):**
  ```jsonc
  {
    "dimensions": {
      "content":  { "score": 0-100, "justification": "…" },
      "delivery": { "score": 0-100, "justification": "…" },
      "time":     { "score": 0-100, "justification": "…" }
    },
    "composite": 0-100,
    "band": "excellent|strong|adequate|developing|weak",
    "headline": "1–2 sentences",
    "coaching": {
      "worked":  ["…"],
      "missing": ["…"],
      "betterPhrasings": ["…"],
      "focusNext": "…"
    }
  }
  ```
- The app applies `speedBonus` and computes the displayed `final` score in code.
- **Latency target:** 2–3 s end-to-end; stream coaching after the score if
  needed. Timeouts fall back to the offline evaluator with a visible notice.

### 12.4 Voice/STT path

- `MediaRecorder` for audio; `SpeechRecognition` for live transcript
  (`interimResults: true`, `continuous: true`, `lang` per locale).
- Capability detection at runtime; graceful fallback chain
  (WebSpeech → external STT if online/enabled → manual transcript entry).

### 12.5 Security & secrets

- LLM/STT API keys must **never** be embedded in client code. **Resolved for the
  hosted build:** the front end calls a same-origin serverless function
  (`/api/evaluate` on Vercel) that holds `ANTHROPIC_API_KEY` as a server-side
  secret and proxies to the model. Visitors enter no key; only transcript text
  (no audio) is sent. If the proxy is unreachable, the app falls back to the
  offline evaluator. See [`DEPLOY.md`](../DEPLOY.md).

---

## 13. Visual & interaction design system

- **Tone:** clean, modern, professional — closer to a premium coaching/SaaS tool
  than a game. Generous whitespace, strong type hierarchy, restrained motion.
- **Color:** neutral base (near-white / dark slate) + one confident brand accent;
  semantic colors for timer states (calm/amber/red) and score bands.
- **Type:** a humanist sans for UI; slightly larger, calm setting for scenario
  text to support focused reading under pressure.
- **Components:** TimerRing, MediaStage, ScenarioCard, InputToggle, VoiceCapture
  (waveform + transcript), ScoreChip, DimensionBar, CoachingPanel, ModelAnswer,
  HistoryRow, ProgressChart, LanguagePicker.
- **Motion:** purposeful only — score count-up, bar fills, gentle timer pulse in
  the critical window. No confetti, no gamified celebration.
- **Dark mode:** supported (reduces glare in the focused response moment).

---

## 14. Accessibility & error handling

### 14.1 Accessibility

- WCAG 2.1 AA targets: contrast, focus order, visible focus rings.
- **Keyboard:** full keyboard path (Play = Space/Enter, Submit = ⌘/Ctrl+Enter).
- **Screen readers:** timer announces at thresholds (politely, not every
  second); media alt text; scoring and coaching are readable in order.
- **Reduced motion:** respect `prefers-reduced-motion` (disable pulses/count-up).
- **Voice not required:** text input is always a full alternative.

### 14.2 Error & edge handling

| Situation | Behavior |
|---|---|
| Mic permission denied | Inline guidance; auto-switch to Text; timer/session preserved. |
| No `SpeechRecognition` | Fall back to external STT (if online/enabled) or manual transcript entry. |
| Empty/blank response at 0 s | Score = Weak band; coaching explains non-response; allow retry. |
| Evaluation timeout/offline | Offline deterministic evaluator + visible "limited feedback" notice; retry available. |
| Media fails to load | Show role caption + textual setting description; never block the scenario. |
| Language switch mid-attempt | Re-render in new locale; no data loss; timer continues. |
| Storage full/unavailable | Warn; allow export/clear; degrade gracefully to in-memory session. |

---

## 15. Non-functional requirements

- **Performance:** scenario media for the active challenge preloaded; evaluation
  2–3 s; first interaction on mobile < 3 s on mid-tier devices.
- **Responsive:** verified on small mobile (360px) through large desktop.
- **Offline:** app shell + library + offline evaluator usable without network;
  online unlocks higher-quality LLM evaluation and external STT.
- **Privacy:** local-only by default; explicit disclosure for any network path.
- **Maintainability:** content (challenges/rubrics/media) is data-driven and
  authorable without code changes.
- **Testability:** provider mocks enable deterministic UI and scoring tests.

---

## 16. Acceptance criteria & traceability

| # | Acceptance criterion | Where specified |
|---|---|---|
| AC1 | Users log in locally and begin challenges immediately | [§11.1](#111-local-login-no-backend), [§9](#9-screens--ux-flows) |
| AC2 | Voice and text input both work seamlessly | [§6](#6-response-capture-text--voice) |
| AC3 | Evaluation returns within 2–3 s of submission | [§7.6](#76-performance), [§12.3](#123-evaluation-provider-contract) |
| AC4 | Coaching is specific, actionable, and longer than the initial score | [§8](#8-coaching-feedback) |
| AC5 | Difficulty progression is noticeable and engaging | [§4.2](#42-difficulty-levels), [§4.4](#44-progression-logic) |
| AC6 | Language switching is instant with no data loss | [§10](#10-internationalization-en--de--es-es) |
| AC7 | Response times are tracked, displayed, and factored into scoring | [§3.1](#31-the-30-second-response-window), [§3.2](#32-speed-bonus), [§7](#7-evaluation-engine), [§8.1](#81-stage-1--initial-score--brief-assessment-instant) |
| AC8 | Platform genuinely challenges users to think faster / communicate with presence | [§1.3](#13-design-philosophy), [§7.5](#75-strict-but-fair-calibration) |
| AC9 | All challenges include clear rubrics and expert model answers | [§4.3](#43-challenge-types), [`challenge-library.md`](./challenge-library.md), [`evaluation-rubric.md`](./evaluation-rubric.md) |
| AC10 | Scenarios are immersive situations (not discrete questions) and evaluation starts at timer start | [§5](#5-scenario-presentation--contextual-media), [§3.1](#31-the-30-second-response-window) |
| AC11 | Each challenge shows contextual media establishing setting/role before the scenario text | [§5.1](#51-presentation-rules-hard-requirements), [§5.3](#53-reveal-sequence-timeline) |

---

## 17. Phased delivery roadmap

| Phase | Goal | Includes |
|---|---|---|
| **P0 — Skeleton** | Walk the core loop with mocks | Routing, screens S1–S7, mock evaluator, 3 seed challenges, text input only. |
| **P1 — Core MVP** | Real loop, local-only | Voice + WebSpeech, LLM evaluation, timer + speed bonus, history, IndexedDB, EN. |
| **P2 — Depth** | Content + i18n | Full challenge library + rubrics + model answers, DE + ES-ES, progress screen, recommendations. |
| **P3 — Polish** | Production feel | External STT fallback, PWA/offline, dark mode, a11y pass, data export/clear, performance budgets. |
| **P4 — Beyond local (future)** | Optional backend | Cloud sync, auth, authoring CMS, analytics, sharing. (Out of v1 scope.) |

---

## 18. Open questions & assumptions

**Assumptions**
- v1 is single-device, local-only; "login" is a local convenience gate.
- A capable Claude (Opus-class) model backs evaluation when online; an offline
  deterministic evaluator provides graceful degradation.
- Challenge content is authored by the product team and ships with the app.

**Open questions**
1. ~~**LLM key handling for a client-only app**~~ — **Resolved:** hosted on
   Vercel with a serverless proxy holding the key server-side; integrated AI for
   all visitors, offline fallback when unreachable. See [§12.5](#125-security--secrets)
   and [`DEPLOY.md`](../DEPLOY.md).
2. **External STT provider** — which service for the WebSpeech fallback, and is
   it acceptable to send transcript audio off-device when enabled?
3. **Rubric authoring per locale** — author natively in 3 languages, or author
   in EN and professionally translate rubrics/model answers?
4. **Media library sourcing** — commission vs. licensed stock vs. CC0; budget?
5. **Speed-bonus tuning** — confirm `MAX_SPEED_BONUS = 5` and the quality floor
   (composite ≥ 50) match the desired "fast but empty must not win" behavior.

---

*End of specification. See [`challenge-library.md`](./challenge-library.md) and
[`evaluation-rubric.md`](./evaluation-rubric.md) for content and scoring detail.*
