# Data Model & Local Storage Schema

Companion to [`SPECIFICATION.md`](./SPECIFICATION.md) §11. Defines the local
(client-only) data structures. v1 transmits **no user data** to any server
(except, optionally and explicitly, transcript text to the evaluation LLM /
external STT when those paths are enabled).

TypeScript-style types are illustrative; the canonical store is IndexedDB
(history, audio, content) plus `localStorage` (current profile id, language).

---

## 1. Locale

```ts
type Locale = "en" | "de" | "es-ES";
type LocalizedText = Partial<Record<Locale, string>>; // fallback: active → en → key
```

---

## 2. Content: Challenge

```ts
type ChallengeType =
  | "wave" | "coaching" | "feedback360"
  | "behavioral" | "situational" | "conflict";

type Category =
  | "professional_communication" | "leadership_decisions"
  | "conflict_resolution" | "strategic_thinking"
  | "feedback_difficult_conversations" | "self_awareness_development";

type Difficulty = 1 | 2 | 3 | 4; // Warm-up, Applied, Pressure, Executive

interface Media {
  kind: "image" | "video" | "layout";
  src: string;                 // image/video URL or layout component id
  poster?: string;             // for video
  aspect: "16:9" | "4:5";
  alt: LocalizedText;          // localized; also reinforces immersion
  license: string;             // attribution/licensing note
}

interface DimensionRubric { strong: string; adequate: string; weak: string; }

interface Rubric {
  content: DimensionRubric;
  delivery: DimensionRubric;
  time: DimensionRubric;
}

interface Challenge {
  id: string;                  // e.g. "C-002"
  type: ChallengeType;
  category: Category;
  difficulty: Difficulty;
  roleCaption: LocalizedText;  // "You are a Project Manager…"
  scenario: LocalizedText;     // immersive, second-person, full text
  media: Media;                // REQUIRED, loads before scenario text
  weights: { content: number; delivery: number; time: number }; // sum = 1
  difficultyBar: LocalizedText;// instruction to the engine about the bar
  rubric: Rubric;              // localized strings inside DimensionRubric
  modelAnswer: LocalizedText;  // expert answer for comparison
  tags?: string[];             // industry/role hints
}
```

---

## 3. User profile (local "account")

```ts
interface Profile {
  id: string;
  displayName: string;
  passwordHash?: string;       // salted hash; local convenience gate only
  language: Locale;            // persisted preference
  inputDefault: "voice" | "text";
  createdAt: string;           // ISO
}
```

> Local login is a convenience gate, **not** real security — documented as such
> in [`SPECIFICATION.md`](./SPECIFICATION.md) §11.1.

---

## 4. Attempt (one response to one challenge)

```ts
interface DimensionScore { score: number; justification: string; } // 0–100

interface Coaching {
  worked: string[];
  missing: string[];
  betterPhrasings: string[];
  focusNext: string;
}

interface Evaluation {
  dimensions: { content: DimensionScore; delivery: DimensionScore; time: DimensionScore };
  composite: number;           // recomputed in code from dimensions+weights
  speedBonus: number;          // computed in code (§3 of evaluation-rubric.md)
  final: number;               // clamp(composite + speedBonus, 0, 100)
  band: "excellent" | "strong" | "adequate" | "developing" | "weak";
  headline: string;
  coaching: Coaching;
  source: "llm" | "offline";   // offline = degraded/limited feedback
}

interface Attempt {
  id: string;
  profileId: string;
  challengeId: string;
  // denormalized for fast history/progress without re-joining content:
  category: Category;
  type: ChallengeType;
  difficulty: Difficulty;
  locale: Locale;
  inputMode: "voice" | "text";
  transcript: string;          // typed text or final transcript
  responseTimeSec: number;     // Play → Submit, 0.1s precision
  audioBlobId?: string;        // optional, local-only, purgeable
  evaluation: Evaluation;
  createdAt: string;           // ISO
}
```

---

## 5. Aggregate progress (derived, cached)

```ts
interface DimensionAverages { content: number; delivery: number; time: number; }

interface ProgressSnapshot {
  profileId: string;
  totalAttempts: number;
  byCategory: Record<Category, { avgFinal: number; attempts: number }>;
  byDifficulty: Record<Difficulty, { avgFinal: number; attempts: number }>;
  dimensionAverages: DimensionAverages;
  weakestDimension: "content" | "delivery" | "time"; // drives recommendations
  clearedTracks: string[];     // `${category}:${type}` cleared at threshold
  currentStreakDays: number;
  recommendedChallengeId?: string;
  updatedAt: string;
}
```

Recommendation logic: pick the lowest-difficulty uncleared challenge in the
category/type that targets the user's `weakestDimension`.

---

## 6. Storage layout

| Store | Mechanism | Contents |
|---|---|---|
| `profiles` | IndexedDB | `Profile[]` |
| `challenges` | IndexedDB (or bundled JSON) | `Challenge[]` content library |
| `attempts` | IndexedDB | `Attempt[]` history |
| `audio` | IndexedDB (blobs) | optional recorded audio, purgeable |
| `progress` | IndexedDB | cached `ProgressSnapshot` per profile |
| `app` | localStorage | `currentProfileId`, `language`, `theme` |

All access goes through a `StorageProvider` interface so a future backend/sync
(P4) can replace it without UI changes.

---

## 7. Import / export

- **Export:** single JSON `{ profile, attempts, progress }` (audio excluded by
  default, optional include). Enables manual backup/transfer.
- **Clear all data:** wipes IndexedDB stores + relevant localStorage keys for
  the active profile (with confirmation).

---

## 8. Privacy summary

- Default: everything stays on-device.
- Network egress only when online evaluation/STT is enabled — limited to
  transcript text (and, for external STT, audio). Disclosed in Settings and at
  first run. Audio retention is opt-in and user-purgeable.
