import type { Attempt, DevPlan, Locale, Profile } from "../types";
import { FRAMEWORK, SCALE, behaviorLabel, ALL_BEHAVIOR_IDS } from "../data/leadershipFramework";
import { getChallenge } from "../data/challenges";

// Generates a Leadership Framework analysis + development plan from the user's
// practice history and profile, via the same secure AI proxy as scoring.
// Throws on failure so the caller can show a clear message.

const LOCALE_NAME: Record<Locale, string> = { en: "English", de: "German", "es-ES": "Spanish (Spain)" };

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

  const sys =
    "You are an expert leadership-development coach working inside a coaching app. You use a three-pillar Leadership Framework (Elevate: shaping the future; Engage: leading with people & purpose; Execute: turning ambitions into results) made of specific behaviors, each rated on a 5-point scale (1 = applies inconsistently, 5 = sets organization-wide standards). " +
    "From the user's roleplay practice and profile, rate the behaviors you can actually observe, identify strengths (4–5) and the 2–3 behaviors with the most growth potential (1–3), and build a concrete, progressively harder development plan. " +
    "For each growth area give 3–4 targeted CHALLENGES the user can practise in real work situations, and 3–4 EXERCISES they can do inside this app (reflective, practical, or roleplay-based). Tie everything to the specific behaviors and to the user's real role and context. " +
    "Be encouraging but honest; frame development as opportunity, not deficit; connect to real leadership impact; avoid jargon. " +
    "Be concise: keep each evidence and 'why' to one short sentence, and each challenge/exercise to one short line. Rate at most 8 behaviors. " +
    `Write ALL human-readable text (evidence, why, challenges, exercises) in ${localeName}. Use ONLY behavior ids from the provided catalogue. Return ONLY valid JSON.`;

  const scale = SCALE.map((s) => `${s.level} = ${s.label.en}`).join("; ");

  const schema =
    '{"ratings":[{"behavior":"<behavior id>","score":1-5,"evidence":"specific, quoting what they said"}],' +
    '"strengths":["behavior ids rated 4-5"],' +
    '"growthAreas":[{"behavior":"<behavior id>","why":"why this is the priority","challenges":["3-4 real-work challenges, progressively harder"],"exercises":["3-4 in-app exercises"]}]}';

  const user =
    `BEHAVIOR CATALOGUE (use these ids exactly):\n${behaviorCatalogue(locale)}\n\n` +
    `5-POINT SCALE: ${scale}\n\n` +
    `USER PROFILE: ${profileContext(profile, locale)}\n\n` +
    `RECENT PRACTICE (most recent first):\n${attemptsSummary(attempts, locale)}\n\n` +
    `Rate only behaviors you can justify from the practice above. Pick the 2–3 strongest growth areas. Return JSON exactly in this shape:\n${schema}`;

  const res = await fetch("/api/evaluate", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ system: sys, user, max_tokens: 1500 }),
  });
  if (!res.ok) {
    let detail = `${res.status}`;
    try {
      const e = await res.json();
      detail = e.detail || e.error || detail;
    } catch {
      /* ignore */
    }
    throw new Error(`HTTP ${res.status}: ${detail}`);
  }
  const data = await res.json();
  const text: string = data?.text ?? "";
  if (!text) throw new Error("empty");

  let raw = text.trim();
  const fence = raw.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fence) raw = fence[1].trim();
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start === -1 || end <= start) throw new Error("no_json");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const parsed: any = JSON.parse(raw.slice(start, end + 1));

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
      challenges: (Array.isArray(g.challenges) ? g.challenges : []).map(String).slice(0, 4),
      exercises: (Array.isArray(g.exercises) ? g.exercises : []).map(String).slice(0, 4),
    }));

  if (growthAreas.length === 0 && ratings.length === 0) throw new Error("unparseable");

  return {
    ratings,
    strengths,
    growthAreas,
    generatedAt: new Date().toISOString(),
    basedOn: Math.min(attempts.length, 8),
  };
}
