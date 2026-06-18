# Evaluation Rubric & Scoring Design

Companion to [`SPECIFICATION.md`](./SPECIFICATION.md) §7–§8. This document
defines exactly how a response is scored and how coaching is generated.

---

## 1. The three dimensions

Every response is scored 0–100 on each of three dimensions, then combined.

### 1.1 Content Accuracy & Structure — *default weight 50 %*

> Is the response factually sound? Is it logically organized and complete?

| Band | Descriptors |
|---|---|
| **Excellent (85–100)** | Directly answers; uses an appropriate framework (e.g. STAR, situation→action→outcome); complete; acknowledges trade-offs/stakeholders; no factual or logical errors. |
| **Strong (70–84)** | Answers with clear structure; minor omission or one underdeveloped point. |
| **Adequate (55–69)** | Recognizable answer but loosely organized or missing a key element. |
| **Developing (40–54)** | Partial; rambling or one-dimensional; key elements absent. |
| **Weak (0–39)** | Off-target, non-responsive, or logically incoherent. |

### 1.2 Delivery Confidence & Presence — *default weight 25 %*

> Does the speaker sound assured? Is there clarity in tone and pacing?
> (Inferred from transcript characteristics and response cadence.)

Signals the engine reads from the transcript:
- **Positive:** decisive verbs, clear stance, ownership ("I will…", "My decision is…"), concise sentences.
- **Negative:** excessive hedging ("maybe", "I guess", "sort of"), filler ("um", "like", "you know"), over-qualification, passive evasion, trailing/unfinished thoughts.

| Band | Descriptors |
|---|---|
| **Excellent** | Assured, direct, owns the position; minimal hedging/filler; composed under the scenario's pressure. |
| **Strong** | Mostly confident; occasional hedge. |
| **Adequate** | Mixed; noticeable hedging or filler dilutes authority. |
| **Developing** | Tentative, evasive, or apologetic. |
| **Weak** | No clear stance; dominated by filler/hedging or non-response. |

> Note: this dimension is inferred from **transcribed content + response
> characteristics**, not from acoustic prosody analysis in v1. This limitation
> is disclosed; v2 may add prosody/pace from the audio.

### 1.3 Time Management — *default weight 25 %*

> Does the response fit within 30 s? Are key points delivered efficiently
> without rushing or padding?

This dimension blends **fit** and **efficiency** (it is distinct from the
explicit speed bonus in §3, which rewards raw speed at the composite level).

| Band | Descriptors |
|---|---|
| **Excellent** | Complete answer delivered well inside 30 s; tight, no padding, no rushing. |
| **Strong** | Good use of time; slightly long or slightly clipped. |
| **Adequate** | Fits but padded, or complete only because rushed. |
| **Developing** | Runs to the buzzer with filler, or far too sparse for the time used. |
| **Weak** | Auto-submitted near-empty, or unfocused use of the full window. |

---

## 2. Weighting by challenge type

Weights sum to 1.0. Defaults are adjusted per `type` to reflect what each
framework actually tests.

| Type | Content | Delivery | Time |
|---|---|---|---|
| `wave` (default) | 0.50 | 0.25 | 0.25 |
| `coaching` | 0.45 | 0.30 | 0.25 |
| `feedback360` | 0.45 | 0.30 | 0.25 |
| `behavioral` | **0.60** | 0.20 | 0.20 |
| `situational` | 0.40 | **0.35** | 0.25 |
| `conflict` | 0.45 | **0.35** | 0.20 |

Rationale: behavioral answers live or die on structure/completeness (STAR);
situational/conflict answers reward presence and composure more heavily.

---

## 3. Composite, speed bonus & final score

```
composite = round( content*wC + delivery*wD + time*wT )      // 0–100

speedBonus = 0
if composite >= QUALITY_FLOOR (default 50):
    speedBonus = round( clamp((30 - t)/30, 0, 1) * MAX_SPEED_BONUS )  // MAX=5

final = clamp(composite + speedBonus, 0, 100)
```

- `t` = response time in seconds (Play → Submit).
- The **quality floor** ensures a fast but empty answer cannot beat a thorough,
  considered one. Below the floor, no speed bonus is granted.
- Timing math is computed **in application code**, never by the LLM, for
  fairness and reproducibility.

### 3.1 Difficulty modifier

Difficulty does **not** rescale the final number; instead it raises the
**rubric bar** the LLM applies. The same answer should earn a lower Content
score at Level 4 than at Level 1, because expectations (frameworks, nuance,
stakeholder awareness) are higher. This is enforced via the difficulty
descriptor passed to the engine (see §5).

---

## 4. Score bands (final score)

| Band | Range | One-line meaning |
|---|---|---|
| Excellent | 85–100 | Expert-level. |
| Strong | 70–84 | Solid, minor gaps. |
| Adequate | 55–69 | Recognizable, notable gaps. |
| Developing | 40–54 | Partial / unfocused. |
| Weak | 0–39 | Off-target or non-responsive. |

---

## 5. Engine prompt design (reference)

The evaluation provider is given a **system instruction** establishing the
strict-but-fair coach persona, and a **structured payload**. It must return
**JSON only**, schema-constrained.

### 5.1 System instruction (essence)

> You are an expert executive communication coach evaluating a spoken response
> delivered under a 30-second time limit. Score strictly against the supplied
> rubric and expert model answer. Be strict but fair — this is a professional
> challenge platform, not a confidence-builder. Reward clear stance, structure,
> stakeholder awareness, and composure; penalize hedging, filler, missing
> structure, and non-responsiveness. Apply the difficulty bar provided. Write
> all feedback and alternative phrasings in {locale}. Return JSON only.

### 5.2 Input payload

```jsonc
{
  "locale": "en | de | es-ES",
  "challenge": {
    "type": "behavioral | situational | conflict | wave | coaching | feedback360",
    "difficulty": 1,                 // 1–4, with descriptor
    "difficultyBar": "Level 1 expects … ; do not over-credit generic answers.",
    "scenario": "It's Friday afternoon. …",
    "weights": { "content": 0.4, "delivery": 0.35, "time": 0.25 },
    "rubric": { "content": "…", "delivery": "…", "time": "…" },
    "modelAnswer": "An expert response would …"
  },
  "response": {
    "transcript": "…",
    "inputMode": "voice | text",
    "responseTimeSec": 23.4
  }
}
```

### 5.3 Output schema

```jsonc
{
  "dimensions": {
    "content":  { "score": 78, "justification": "Clear stance and STAR structure; missing the result/metric." },
    "delivery": { "score": 71, "justification": "Decisive opening; some hedging mid-answer ('I guess')." },
    "time":     { "score": 80, "justification": "Complete and tight; no padding." }
  },
  "composite": 76,            // informational; app recomputes from dimensions+weights
  "band": "strong",
  "headline": "Strong, structured answer — name the outcome and you're at expert level.",
  "coaching": {
    "worked":  ["Opened with a clear decision", "Used a recognizable STAR structure"],
    "missing": ["No measurable result", "Didn't acknowledge the client's exposure"],
    "betterPhrasings": [
      "Here's what I did, and the result was X — revenue held flat instead of dropping.",
      "I also flagged the risk to the client directly so we controlled the narrative."
    ],
    "focusNext": "Always close with a concrete, measurable outcome."
  }
}
```

> The app **recomputes `composite` and `final`** from `dimensions` + `weights` +
> `speedBonus` in code; the model's `composite` is advisory only. This keeps the
> displayed number deterministic and the timing fair.

---

## 6. Offline / fallback evaluator

When no LLM is reachable (offline, timeout, key missing), a **deterministic
heuristic evaluator** keeps the loop usable with a visible "limited feedback"
notice. It approximates:

- **Content:** keyword/coverage overlap with the rubric's required points +
  length-appropriateness.
- **Delivery:** filler/hedging density (lower is better) + sentence decisiveness.
- **Time:** fit-and-efficiency curve over `responseTimeSec` and word count.

It produces the same JSON shape so the UI is identical; coaching is templated
and clearly labelled as automated/limited.

---

## 7. Calibration & QA

- **Golden set:** a fixed set of (challenge, response) pairs with agreed target
  scores; regressions in the engine are caught by comparing against these.
- **Determinism:** low temperature; identical inputs → near-identical scores.
- **Fairness audit:** spot-check that difficulty raises the bar as intended and
  that strict scoring isn't arbitrary across locales.
