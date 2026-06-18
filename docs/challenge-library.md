# Challenge Library — Seed Content, Rubrics & Model Answers

Companion to [`SPECIFICATION.md`](./SPECIFICATION.md) §4–§5 and
[`evaluation-rubric.md`](./evaluation-rubric.md). This document provides
**seed challenges** that demonstrate the required structure: immersive
second-person scenario, contextual media, per-dimension rubric (strong /
adequate / weak), and an expert model answer.

Each challenge is data-driven (see [`data-model.md`](./data-model.md) for the
`Challenge` type). Scenario text, role caption, and media alt text are localized
per locale (EN/DE/ES-ES); only English is shown here for brevity.

---

## Authoring rules (apply to every challenge)

1. **Immersive, second-person, immediate.** "It's Friday afternoon…" not "You
   are in a situation where…".
2. **Self-contained.** The full scenario is readable before Play; nothing is
   revealed after the timer starts.
3. **Contextual media required.** Specify the asset and what it establishes
   (Where am I? Who am I? What's my role? What am I doing?).
4. **Rubric defines strong / adequate / weak** for each dimension.
5. **Expert model answer** is concise enough to deliver in < 30 s aloud.

---

## C-001 · Behavioral · Conflict Resolution · Difficulty 2 (Applied)

- **Type:** `behavioral`
- **Role caption:** *You are a Project Lead in a 1:1 with your manager.*
- **Media:** Photo — a quiet office meeting room, two chairs, one-on-one setup.
  *Establishes: a private, professional review conversation.*
- **Scenario (EN):**
  > "Tell me about a time you faced a conflict with a colleague who wasn't
  > pulling their weight on a shared deliverable. What did you do, and how did
  > it end?"

**Rubric**

| Dimension | Strong | Adequate | Weak |
|---|---|---|---|
| Content | Specific real example; clear STAR (Situation, Task, Action, Result); names a concrete outcome. | A real example but missing the result or one STAR element. | Hypothetical/generic; no real situation or action. |
| Delivery | Owns their actions ("I raised it directly…"); no blame-dumping; composed. | Some hedging or mild blame of the colleague. | Defensive, vague, or blames others throughout. |
| Time | Complete STAR inside 30 s, tight. | Fits but rushed or padded. | Runs out before the result, or far too sparse. |

**Expert model answer:**
> "On our Q3 launch, a teammate kept missing handoff deadlines, which threatened
> our date. Rather than escalate first, I spoke to them privately, learned they
> were overloaded on another project, and we re-split the tasks and set daily
> 10-minute check-ins. We shipped on time, and they later thanked me for not
> going over their head. My takeaway: address it directly and early, assume good
> intent, and fix the system, not just the symptom."

---

## C-002 · Situational · Professional Communication · Difficulty 3 (Pressure)

- **Type:** `situational`
- **Role caption:** *You are a Project Manager, suddenly summoned upstairs.*
- **Media:** Photo — an executive boardroom, large table, city skyline window.
  *Establishes: a high-stakes, senior-leadership setting; you're under the spotlight.*
- **Scenario (EN):**
  > "It's Friday afternoon. You have a meeting with your boss's boss. You
  > haven't been briefed. They tell you the CEO is upset about a project you
  > worked on. How do you respond?"

**Rubric**

| Dimension | Strong | Adequate | Weak |
|---|---|---|---|
| Content | Stays composed; asks one clarifying question to understand the specific concern; takes ownership of facts; proposes a concrete next step. | Either calm or ownership, but not both; vague next step. | Defensive, panicked, deflects blame, or over-apologizes. |
| Delivery | Assured, measured, present; no panic; takes the spotlight. | Mostly composed; some hedging. | Flustered, rambling, or evasive. |
| Time | Concise, controlled response inside 30 s. | Fits but rushed/padded. | Spirals or stalls. |

**Expert model answer:**
> "Thank you for telling me directly — I want to get this right. Can you share
> what specifically the CEO is concerned about, so I address the real issue and
> not a guess? Whatever it is, I own my part of this project and I'll get you a
> clear picture and a recovery plan by Monday morning. If it's helpful, I can
> walk you through what I know right now."

*Why it scores high:* composure + one sharp clarifying question + ownership +
concrete next step, delivered with presence, no panic, no blame.

---

## C-003 · Conflict · Leadership Decisions · Difficulty 3 (Pressure)

- **Type:** `conflict`
- **Role caption:** *You are the team's leader, mid client presentation.*
- **Media:** Photo/layout — a client meeting room mid-presentation, screen
  visible, client on one side. *Establishes: public, client-facing, leadership stakes.*
- **Scenario (EN):**
  > "A team member just challenged your decision in front of the client. The
  > room goes quiet and everyone looks at you. How do you respond?"

**Rubric**

| Dimension | Strong | Adequate | Weak |
|---|---|---|---|
| Content | Stays calm; acknowledges the input without undermining the team; holds or adjusts the decision with reasoning; protects the client relationship; signals to handle details offline. | Calm but either caves or shuts the person down; no offline follow-up. | Public power struggle, visible irritation, or capitulates entirely. |
| Delivery | Authoritative yet respectful; presence; de-escalates. | Mostly composed; slightly defensive or dismissive. | Defensive, sharp, or flustered. |
| Time | Controlled, decisive, inside 30 s. | Fits but wavers. | Rambles or freezes. |

**Expert model answer:**
> "That's a fair point to raise, and I appreciate it. Here's the reasoning
> behind where we landed: [one-line rationale]. For today, I'm comfortable
> moving forward on that basis so we keep the client's timeline — and Alex, let's
> dig into your concern straight after this so nothing gets lost. Does that work
> for everyone?"

*Why it scores high:* validates without undermining, gives reasoning, holds the
decision with composure, protects the client moment, defers detail offline.

---

## C-004 · WAVE · Strategic Thinking · Difficulty 4 (Executive)

- **Type:** `wave`
- **Role caption:** *You are a senior leader presenting to the executive committee.*
- **Media:** Photo — executive committee table, serious faces, strategy deck on screen.
  *Establishes: C-level, high-ambiguity strategic setting.*
- **Scenario (EN):**
  > "Two of your strongest growth bets are competing for the same limited
  > budget, and you can fully fund only one. The board wants your recommendation
  > now. Which do you back, and why?"

**Rubric**

| Dimension | Strong | Adequate | Weak |
|---|---|---|---|
| Content | Names a clear decision criterion (e.g. risk-adjusted return, strategic fit); applies it; commits to one with explicit trade-off acknowledgement; states how to de-risk the unfunded bet. | Picks one with some reasoning but no explicit criterion or trade-off. | Refuses to choose, or chooses with no reasoning. |
| Delivery | Decisive, board-ready, owns the call. | Mostly confident; hedges on the commitment. | Wavers, defers, or sounds unsure. |
| Time | Crisp executive answer inside 30 s. | Fits but meanders. | Runs long or stalls. |

**Expert model answer:**
> "I'd back Bet A. My criterion is risk-adjusted strategic fit: A compounds our
> existing platform advantage and has a clearer path to repeatable revenue,
> while B is higher-ceiling but unproven. So I'd fully fund A now, and keep B
> alive with a small, milestone-gated test — if it hits the next proof point, we
> revisit funding in Q3. The trade-off I'm accepting is slower optionality on B
> in exchange for a faster, more certain return on A."

*Why it scores high:* explicit criterion, a real commitment, named trade-off,
and a way to keep the unfunded option alive — exactly the Level-4 bar.

---

## C-005 · Coaching · Self-Awareness & Development · Difficulty 2 (Applied)

- **Type:** `coaching`
- **Role caption:** *You are in a development conversation with an executive coach.*
- **Media:** Photo — calm, neutral coaching setting, two comfortable chairs.
  *Establishes: a reflective, low-threat development conversation.*
- **Scenario (EN):**
  > "What's a piece of feedback you've received that was hard to hear — and what
  > did you actually change because of it?"

**Rubric**

| Dimension | Strong | Adequate | Weak |
|---|---|---|---|
| Content | Real, specific feedback; genuine ownership (no humble-brag); a concrete behavior change and its effect. | Real feedback but vague change, or a disguised strength ("I work too hard"). | Deflects, blames the feedback-giver, or gives a non-answer. |
| Delivery | Open, non-defensive, reflective, still composed. | Slightly guarded or rehearsed. | Defensive or dismissive. |
| Time | Reflective but contained inside 30 s. | Fits but rambling. | Drifts or stalls. |

**Expert model answer:**
> "A manager once told me I dominated meetings and others stopped contributing.
> It stung, because I thought I was driving things. I started deliberately
> speaking last, asking two named people for their view first, and I had a peer
> tell me afterward when I slipped. Within a couple of months the team was
> bringing me ideas I'd never have reached on my own — that one was a turning
> point for how I lead."

---

## C-006 · 360 Feedback · Conflict Resolution · Difficulty 3 (Pressure)

- **Type:** `feedback360`
- **Role caption:** *You are reviewing your 360 results with HR.*
- **Media:** Layout — a 360 feedback report on screen with mixed ratings.
  *Establishes: confronting how others actually experience you.*
- **Scenario (EN):**
  > "Your 360 results just came back. Peers rate your delivery highly, but your
  > direct reports say you're hard to approach and slow to give recognition. How
  > do you respond to that?"

**Rubric**

| Dimension | Strong | Adequate | Weak |
|---|---|---|---|
| Content | Accepts the gap without defensiveness; interprets the peer/report split honestly; names one concrete action for approachability and one for recognition. | Accepts it but only one vague action, or rationalizes the gap. | Disputes the data, blames reports, or dismisses it. |
| Delivery | Non-defensive, accountable, present. | Mostly open; a little defensive. | Defensive or deflecting. |
| Time | Honest and contained inside 30 s. | Fits but unfocused. | Rambles or stalls. |

**Expert model answer:**
> "That split is useful, not comfortable. If peers see strong delivery but my
> reports find me hard to approach, the gap is probably that I optimize for
> output over people when I'm busy. Two concrete changes: I'll hold a protected,
> no-agenda 15 minutes with each report weekly so approachability isn't
> conditional on a crisis, and I'll start every team meeting naming one specific
> thing someone did well. Then I'll re-check this in the next pulse survey."

---

## Coverage matrix (seed set)

| ID | Type | Category | Difficulty |
|---|---|---|---|
| C-001 | behavioral | Conflict Resolution | 2 |
| C-002 | situational | Professional Communication | 3 |
| C-003 | conflict | Leadership Decisions | 3 |
| C-004 | wave | Strategic Thinking | 4 |
| C-005 | coaching | Self-Awareness & Development | 2 |
| C-006 | feedback360 | Conflict Resolution | 3 |

> The full launch library should provide several challenges per
> (category × difficulty) cell and per type, ramping from Warm-up (L1) general
> questions to Executive (L4) ambiguous, C-level decisions. Each must carry the
> same artifacts shown above: media, localized scenario, rubric, model answer.
