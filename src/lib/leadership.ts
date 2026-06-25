import type { Attempt, DevPlan, Locale, Profile, Challenge } from "../types";
import { FRAMEWORK, SCALE, behaviorLabel, ALL_BEHAVIOR_IDS } from "../data/leadershipFramework";
import { getChallenge, CHALLENGES } from "../data/challenges";

// Generates a Leadership Framework analysis + development plan from the user's
// practice history and profile, via the same secure AI proxy as scoring.
// Throws on failure so the caller can show a clear message.

const LOCALE_NAME: Record<Locale, string> = { en: "English", de: "German", "es-ES": "Spanish (Spain)" };

// A blunt, in-language directive so the model never drifts back to English.
// Repeated at the top of the system prompt and as the last line of the user
// message — the two positions the model weights most heavily.
const LANG_DIRECTIVE: Record<Locale, string> = {
  en: "Write every human-readable value (evidence, why, challenges, exercises) in English.",
  de: "Schreibe ALLE für Menschen lesbaren Werte (evidence, why, challenges, exercises) AUSSCHLIESSLICH auf Deutsch. Verwende niemals Englisch.",
  "es-ES":
    "Escribe TODOS los textos legibles (evidence, why, challenges, exercises) EXCLUSIVAMENTE en español. No uses inglés bajo ningún concepto.",
};

function behaviorCatalogue(locale: Locale): string {
  return FRAMEWORK.map((p) =>
    p.competencies
      .map((c) =>
        c.behaviors.map((b) => `- ${b.id} (${p.id} / ${c.label.en}): ${behaviorLabel(b.id, locale)}`).join("\n")
      )
      .join("\n")
  ).join("\n");
}

function attemptsSummary(attempts: Attempt[], locale: Locale): string {
  return attempts
    .slice(0, 5)
    .map((a, i) => {
      const ch = getChallenge(a.challengeId);
      const scenario = (ch?.scenario[locale] ?? ch?.scenario.en ?? "").slice(0, 200);
      const ev = a.evaluation;
      return [
        `#${i + 1} [${a.category}/${a.type}, score ${ev.final}/100]`,
        `Scenario: ${scenario}`,
        `What they said: ${(a.transcript || "(empty)").slice(0, 320)}`,
      ].join("\n");
    })
    .join("\n\n");
}

function profileContext(profile: Profile | null, locale: Locale): string {
  if (!profile) return "Unknown role.";
  const parts: string[] = [];
  if (profile.department) parts.push(`area/department: ${profile.department}`);
  if (profile.roleLevel) parts.push(`seniority: ${profile.roleLevel}`);
  if (profile.teamSize) parts.push(`manages: ${profile.teamSize}`);
  if (profile.goal) parts.push(`stated goal: ${profile.goal}`);
  void locale;
  return parts.length ? parts.join(", ") : "Unknown role.";
}

export async function generateDevelopmentPlan(
  attempts: Attempt[],
  profile: Profile | null,
  locale: Locale
): Promise<DevPlan> {
  if (attempts.length === 0) throw new Error("no_attempts");
  const localeName = LOCALE_NAME[locale];

  const langDirective = LANG_DIRECTIVE[locale] ?? LANG_DIRECTIVE.en;

  const sys =
    `LANGUAGE (most important rule): ${langDirective} The JSON keys stay in English, but every string VALUE must be in ${localeName}. ` +
    "You are an expert leadership-development coach working inside a coaching app. You use a three-pillar Leadership Framework (Elevate: shaping the future; Engage: leading with people & purpose; Execute: turning ambitions into results) made of specific behaviors, each rated on a 5-point scale (1 = applies inconsistently, 5 = sets organization-wide standards). " +
    "From the user's roleplay practice and profile, rate the behaviors you can actually observe, identify strengths (4–5) and the 2–3 behaviors with the most growth potential (1–3), and build a concrete, progressively harder development plan. " +
    "For each growth area give 3–4 targeted CHALLENGES the user can practise in real work situations, and 3–4 EXERCISES they can do inside this app (reflective, practical, or roleplay-based). Tie everything to the specific behaviors and to the user's real role and context. " +
    "Be encouraging but honest; frame development as opportunity, not deficit; connect to real leadership impact; avoid jargon. " +
    "Be concise: keep each evidence and 'why' to one short sentence, and each challenge/exercise to one short line. Rate at most 6 behaviors. " +
    `Use ONLY behavior ids from the provided catalogue. Return ONLY valid JSON, no prose before or after. ${langDirective}`;

  const scale = SCALE.map((s) => `${s.level} = ${s.label.en}`).join("; ");

  const schema =
    '{"ratings":[{"behavior":"<behavior id>","score":1-5,"evidence":"specific, quoting what they said"}],' +
    '"strengths":["behavior ids rated 4-5"],' +
    '"growthAreas":[{"behavior":"<behavior id>","why":"why this is the priority","challenges":["3 real-work challenges, progressively harder"],"exercises":["3 in-app exercises"]}]}';

  const user =
    `BEHAVIOR CATALOGUE (use these ids exactly):\n${behaviorCatalogue(locale)}\n\n` +
    `5-POINT SCALE: ${scale}\n\n` +
    `USER PROFILE: ${profileContext(profile, locale)}\n\n` +
    `RECENT PRACTICE (most recent first):\n${attemptsSummary(attempts, locale)}\n\n` +
    `Rate only behaviors you can justify from the practice above. Pick the 2–3 strongest growth areas. Return JSON exactly in this shape:\n${schema}\n\n${langDirective}`;

  // One request to the AI proxy. `model` undefined → server default.
  async function ask(model?: string): Promise<{ ok: boolean; status: number; text: string; detail: string }> {
    const res = await fetch("/api/evaluate", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ system: sys, user, max_tokens: 2048, ...(model ? { model } : {}) }),
    });
    if (!res.ok) {
      let detail = `${res.status}`;
      try {
        const e = await res.json();
        detail = e.detail || e.error || detail;
      } catch {
        /* ignore */
      }
      return { ok: false, status: res.status, text: "", detail };
    }
    const data = await res.json().catch(() => null);
    return { ok: true, status: 200, text: data?.text ?? "", detail: "" };
  }

  const FAST = "claude-haiku-4-5-20251001";
  // Try a few times: the fast model first (twice — truncation/timeouts are often
  // transient), then the default model. Take the first response that parses.
  const plan: PlanShape = await (async () => {
    let lastErr = "";
    const tries: (string | undefined)[] = [FAST, FAST, undefined];
    for (const model of tries) {
      const r = await ask(model);
      if (r.status === 503) throw new Error("HTTP 503: ai_not_configured");
      if (!r.ok) {
        lastErr = `HTTP ${r.status}: ${r.detail}`;
        continue; // upstream/timeout — try the next attempt
      }
      const p = parsePlan(r.text);
      if (p) return p;
      lastErr = "unparseable";
    }
    throw new Error(lastErr || "unparseable");
  })();

  return {
    ratings: plan.ratings,
    strengths: plan.strengths,
    growthAreas: plan.growthAreas,
    generatedAt: new Date().toISOString(),
    basedOn: Math.min(attempts.length, 8),
    locale,
  };
}

type PlanShape = { ratings: DevPlan["ratings"]; strengths: string[]; growthAreas: DevPlan["growthAreas"] };

// Parse the model's reply into a validated plan. Tolerant: strips code fences,
// repairs truncated JSON (closes dangling strings/brackets), and returns null
// only if nothing usable can be salvaged.
function parsePlan(text: string): PlanShape | null {
  if (!text || !text.trim()) return null;
  let raw = text.trim();
  const fence = raw.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fence) raw = fence[1].trim();
  const start = raw.indexOf("{");
  if (start === -1) return null;
  raw = raw.slice(start);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let parsed: any = null;
  try {
    parsed = JSON.parse(raw);
  } catch {
    try {
      parsed = JSON.parse(repairJson(raw));
    } catch {
      return null;
    }
  }
  if (!parsed || typeof parsed !== "object") return null;

  const valid = new Set(ALL_BEHAVIOR_IDS);
  const ratings = (Array.isArray(parsed.ratings) ? parsed.ratings : [])
    .filter((r: { behavior?: string }) => r && valid.has(r.behavior ?? ""))
    .map((r: { behavior: string; score: number; evidence?: string }) => ({
      behavior: r.behavior,
      score: Math.max(1, Math.min(5, Math.round(Number(r.score) || 0))),
      evidence: String(r.evidence ?? ""),
    }));
  const strengths = (Array.isArray(parsed.strengths) ? parsed.strengths : []).filter((s: string) => valid.has(s));
  const growthAreas = (Array.isArray(parsed.growthAreas) ? parsed.growthAreas : [])
    .filter((g: { behavior?: string }) => g && valid.has(g.behavior ?? ""))
    .map((g: { behavior: string; why?: string; challenges?: string[]; exercises?: string[] }) => ({
      behavior: g.behavior,
      why: String(g.why ?? ""),
      challenges: (Array.isArray(g.challenges) ? g.challenges : []).map(String).filter(Boolean).slice(0, 4),
      exercises: (Array.isArray(g.exercises) ? g.exercises : []).map(String).filter(Boolean).slice(0, 4),
    }));

  if (growthAreas.length === 0 && ratings.length === 0) return null;
  return { ratings, strengths, growthAreas };
}

// Best-effort repair of a truncated JSON object: closes an open string and any
// unbalanced brackets, after dropping a dangling trailing token (comma/colon).
function repairJson(s: string): string {
  let inStr = false;
  let esc = false;
  const stack: string[] = [];
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (inStr) {
      if (esc) esc = false;
      else if (c === "\\") esc = true;
      else if (c === '"') inStr = false;
      continue;
    }
    if (c === '"') inStr = true;
    else if (c === "{" || c === "[") stack.push(c);
    else if (c === "}" || c === "]") stack.pop();
  }
  let out = s;
  if (inStr) out += '"'; // close an open string
  // drop a dangling trailing token so we don't close on a comma/colon
  out = out.replace(/[\s]*[,:]\s*$/, "");
  for (let i = stack.length - 1; i >= 0; i--) {
    out += stack[i] === "{" ? "}" : "]";
  }
  return out;
}

// --- Targeted practice package per growth behavior ---
// Maps each framework behavior to the kinds of scenarios that build it.
const BEHAVIOR_MATCH: Record<string, { categories?: string[]; types?: string[]; departments?: string[] }> = {
  connects_trends: { categories: ["strategic_thinking"] },
  innovates_smartly: { categories: ["strategic_thinking"], types: ["wave"] },
  business_drivers: { categories: ["strategic_thinking", "professional_communication"], departments: ["finance", "commercial"] },
  value_technology: { categories: ["strategic_thinking"], departments: ["technology"] },
  growth_mindset: { categories: ["self_awareness_development"], types: ["coaching"] },
  owns_people_dev: { categories: ["feedback_difficult_conversations"], types: ["coaching", "feedback360"] },
  integrity_courage: { categories: ["conflict_resolution", "leadership_decisions"] },
  service_first: { categories: ["professional_communication"], departments: ["customer", "commercial"] },
  performance_accountability: { categories: ["leadership_decisions", "feedback_difficult_conversations"] },
  frontline_impact: { categories: ["leadership_decisions"], departments: ["operations"] },
  decisive_speed: { categories: ["leadership_decisions"], types: ["situational", "wave"] },
  resilience: { categories: ["self_awareness_development"], types: ["situational"] },
};

const PASS = 55;

/** Curated scenarios to practise a given growth behavior — not-yet-passed first. */
export function scenariosForBehavior(
  behaviorId: string,
  bestById: Map<string, Attempt>,
  n = 3
): Challenge[] {
  const m = BEHAVIOR_MATCH[behaviorId];
  if (!m) return [];
  const matches = CHALLENGES.filter(
    (c) =>
      (m.categories?.includes(c.category) ?? false) ||
      (m.types?.includes(c.type) ?? false) ||
      (m.departments?.includes(c.department ?? "leadership") ?? false)
  );
  matches.sort((a, b) => {
    const ap = (bestById.get(a.id)?.evaluation.final ?? -1) >= PASS ? 1 : 0;
    const bp = (bestById.get(b.id)?.evaluation.final ?? -1) >= PASS ? 1 : 0;
    if (ap !== bp) return ap - bp; // unpassed first
    return a.difficulty - b.difficulty;
  });
  return matches.slice(0, n);
}

/** Scenarios that exercise a whole pillar — used to prompt practice for a
 *  pillar the user hasn't covered yet (so it never silently disappears). */
export function scenariosForPillar(
  pillarId: "elevate" | "engage" | "execute",
  bestById: Map<string, Attempt>,
  n = 3
): Challenge[] {
  const pillar = FRAMEWORK.find((p) => p.id === pillarId);
  if (!pillar) return [];
  const behaviorIds = pillar.competencies.flatMap((c) => c.behaviors.map((b) => b.id));
  const seen = new Set<string>();
  const out: Challenge[] = [];
  // Round-robin one scenario per behavior so the mix spans the whole pillar.
  const perBehavior = behaviorIds.map((id) => scenariosForBehavior(id, bestById, n + 2));
  let i = 0;
  while (out.length < n && perBehavior.some((list) => list.length)) {
    const list = perBehavior[i % perBehavior.length];
    const c = list.shift();
    if (c && !seen.has(c.id)) {
      seen.add(c.id);
      out.push(c);
    }
    i++;
  }
  return out.slice(0, n);
}
