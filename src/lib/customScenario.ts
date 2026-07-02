import type { Challenge, Category, ChallengeType, Difficulty, Locale, LocalizedText, Profile, SceneKind } from "../types";
import { repairJson } from "./leadership";
import { uid } from "./storage";

// Turns a user's real, upcoming situation ("I have to tell my boss we missed
// the deadline…") into a full roleplay Challenge — same shape as the built-in
// library, so scenario play, AI evaluation, results and history all work
// unchanged. Generated via the same secure AI proxy as scoring.

const LOCALE_NAME: Record<Locale, string> = { en: "English", de: "German", "es-ES": "Spanish (Spain)" };

const LANG_DIRECTIVE: Record<Locale, string> = {
  en: "Write every human-readable string in English.",
  de: "Schreibe ALLE für Menschen lesbaren Texte AUSSCHLIESSLICH auf Deutsch. Verwende niemals Englisch.",
  "es-ES": "Escribe TODOS los textos legibles EXCLUSIVAMENTE en español. No uses inglés bajo ningún concepto.",
};

const CATEGORIES: Category[] = [
  "professional_communication",
  "leadership_decisions",
  "conflict_resolution",
  "strategic_thinking",
  "feedback_difficult_conversations",
  "self_awareness_development",
];
const TYPES: ChallengeType[] = ["wave", "coaching", "feedback360", "behavioral", "situational", "conflict"];
const SCENES: SceneKind[] = [
  "boardroom",
  "office_1on1",
  "client_meeting",
  "exec_committee",
  "coaching_room",
  "feedback_report",
  "video_call",
];

function profileContext(profile: Profile | null): string {
  if (!profile) return "Unknown role.";
  const parts: string[] = [];
  if (profile.department) parts.push(`area/department: ${profile.department}`);
  if (profile.roleLevel) parts.push(`seniority: ${profile.roleLevel}`);
  if (profile.teamSize) parts.push(`manages: ${profile.teamSize}`);
  if (profile.goal) parts.push(`stated goal: ${profile.goal}`);
  return parts.length ? parts.join(", ") : "Unknown role.";
}

// Store the generated text under the user's locale AND English so the card
// still renders if they later switch the app language.
function L(s: string, locale: Locale): LocalizedText {
  return locale === "en" ? { en: s } : { en: s, [locale]: s };
}

export async function generateCustomScenario(
  description: string,
  profile: Profile | null,
  locale: Locale
): Promise<Challenge> {
  const desc = description.trim();
  if (desc.length < 12) throw new Error("too_short");
  const localeName = LOCALE_NAME[locale];
  const langDirective = LANG_DIRECTIVE[locale] ?? LANG_DIRECTIVE.en;

  const sys =
    `LANGUAGE (most important rule): ${langDirective} JSON keys stay in English; every string VALUE must be in ${localeName}. ` +
    "You are an expert scenario designer for a spoken-communication leadership coaching app. The user describes a REAL situation they need to face; you turn it into ONE immersive roleplay challenge they answer out loud in 60 seconds. " +
    "Write the scenario in second person, present tense, addressed to the user as the person they must speak to would — set the scene in 1-2 sentences, then confront them with the exact moment they must respond to. Make it specific and realistic, using the details they gave. " +
    "The model answer must be an expert-level 60-second spoken response to THIS scenario (~110-140 words), first person, natural spoken style. " +
    "Rubric descriptions are one short sentence each. Key points are short phrases (3-6 words). Be professional and direct; no fluff. Return ONLY valid JSON.";

  const schema =
    '{"roleCaption":"You are … (one sentence framing the user\'s role in this moment)",' +
    '"scenario":"the immersive prompt, 2-4 sentences, ending at the moment they must speak",' +
    `"category":"one of: ${CATEGORIES.join(" | ")}",` +
    `"type":"one of: ${TYPES.join(" | ")}",` +
    '"difficulty":1-4,' +
    `"scene":"one of: ${SCENES.join(" | ")}",` +
    '"keyPoints":["4-6 things an expert answer must hit"],' +
    '"rubric":{"content":{"strong":"","adequate":"","weak":""},"delivery":{"strong":"","adequate":"","weak":""},"time":{"strong":"","adequate":"","weak":""}},' +
    '"modelAnswer":"expert 60-second spoken answer"}';

  const user =
    `USER PROFILE: ${profileContext(profile)}\n\n` +
    `THE REAL SITUATION THE USER WANTS TO PRACTISE (in their own words):\n"""${desc.slice(0, 1200)}"""\n\n` +
    `Design the roleplay for exactly this situation. Return JSON exactly in this shape:\n${schema}\n\n${langDirective}`;

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
  let lastErr = "";
  for (const model of [FAST, FAST, undefined]) {
    const r = await ask(model);
    if (r.status === 503) throw new Error("HTTP 503: ai_not_configured");
    if (!r.ok) {
      lastErr = `HTTP ${r.status}: ${r.detail}`;
      continue;
    }
    const ch = parseScenario(r.text, profile, locale);
    if (ch) return ch;
    lastErr = "unparseable";
  }
  throw new Error(lastErr || "unparseable");
}

function pick<T extends string>(value: unknown, allowed: readonly T[], fallback: T): T {
  return typeof value === "string" && (allowed as readonly string[]).includes(value) ? (value as T) : fallback;
}

function parseScenario(text: string, profile: Profile | null, locale: Locale): Challenge | null {
  if (!text || !text.trim()) return null;
  let raw = text.trim();
  const fence = raw.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fence) raw = fence[1].trim();
  const start = raw.indexOf("{");
  if (start === -1) return null;
  raw = raw.slice(start);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let p: any = null;
  try {
    p = JSON.parse(raw);
  } catch {
    try {
      p = JSON.parse(repairJson(raw));
    } catch {
      return null;
    }
  }
  if (!p || typeof p !== "object") return null;

  const scenario = String(p.scenario ?? "").trim();
  const modelAnswer = String(p.modelAnswer ?? "").trim();
  if (!scenario || !modelAnswer) return null;

  const roleCaption = String(p.roleCaption ?? "").trim() || scenario.slice(0, 80);
  const keyPoints = (Array.isArray(p.keyPoints) ? p.keyPoints : [])
    .map((k: unknown) => String(k).trim())
    .filter(Boolean)
    .slice(0, 6);
  if (keyPoints.length < 3) return null;

  const dim = (d: unknown): { strong: string; adequate: string; weak: string } => {
    const o = (d ?? {}) as Record<string, unknown>;
    return {
      strong: String(o.strong ?? "").trim() || "Fully addresses the moment with structure and a clear stance.",
      adequate: String(o.adequate ?? "").trim() || "Addresses it but misses one key element.",
      weak: String(o.weak ?? "").trim() || "Vague or non-responsive.",
    };
  };
  const rubricSrc = (p.rubric ?? {}) as Record<string, unknown>;

  return {
    id: uid("U-"),
    type: pick(p.type, TYPES, "situational"),
    category: pick(p.category, CATEGORIES, "professional_communication"),
    difficulty: Math.max(1, Math.min(4, Math.round(Number(p.difficulty) || 2))) as Difficulty,
    department: profile?.department,
    media: {
      scene: pick(p.scene, SCENES, "office_1on1"),
      alt: L(roleCaption, locale),
    },
    roleCaption: L(roleCaption, locale),
    scenario: L(scenario, locale),
    weights: { content: 0.6, delivery: 0.2, time: 0.2 },
    keyPoints: keyPoints.map((k: string) => L(k, locale)),
    rubric: {
      content: dim(rubricSrc.content),
      delivery: dim(rubricSrc.delivery),
      time: dim(rubricSrc.time),
    },
    modelAnswer: L(modelAnswer, locale),
  };
}
