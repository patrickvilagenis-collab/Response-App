import type { Challenge, Coaching, Evaluation, Locale } from "../types";
import { bandFor, clamp, composite, finalScore, speedBonus } from "./scoring";

// Two evaluation paths:
//  - offlineEvaluate: deterministic heuristic, always available, no network.
//  - llmEvaluate: optional, richer, requires an Anthropic API key (transcript text only).
// Both return the same Evaluation shape; timing math is always computed in code.

const FILLERS: Record<Locale, string[]> = {
  en: ["um", "uh", "like", "you know", "kind of", "basically", "literally"],
  de: ["äh", "ähm", "halt", "sozusagen", "irgendwie", "quasi"],
  "es-ES": ["eh", "este", "o sea", "en plan", "pues", "bueno"],
};

const HEDGES: Record<Locale, string[]> = {
  en: ["maybe", "i think", "i guess", "sort of", "probably", "i'm not sure", "perhaps"],
  de: ["vielleicht", "ich glaube", "ich denke", "wahrscheinlich", "möglicherweise", "ich bin nicht sicher"],
  "es-ES": ["quizás", "creo", "supongo", "no sé", "probablemente", "tal vez", "más o menos"],
};

const COACH = {
  worked: { en: "Covered:", de: "Erwähnt:", "es-ES": "Mencionaste:" },
  missingPrefix: { en: "Missing:", de: "Fehlt:", "es-ES": "Falta:" },
  nothingMissing: {
    en: "You hit the key points — now sharpen the delivery.",
    de: "Du hast die Kernpunkte getroffen — schärfe nun das Auftreten.",
    "es-ES": "Cubriste los puntos clave — ahora afina la presencia.",
  },
  focus: {
    content: {
      en: "Add structure and a concrete outcome — name the result, not just the action.",
      de: "Füge Struktur und ein konkretes Ergebnis hinzu — nenne das Resultat, nicht nur die Handlung.",
      "es-ES": "Añade estructura y un resultado concreto — nombra el resultado, no solo la acción.",
    },
    delivery: {
      en: "Cut hedging and filler. Open with a clear stance and own it.",
      de: "Vermeide Absicherungen und Füllwörter. Beginne mit einer klaren Haltung und stehe dazu.",
      "es-ES": "Elimina titubeos y muletillas. Abre con una postura clara y mantenla.",
    },
    time: {
      en: "Tighten it: deliver the key points faster, without padding.",
      de: "Straffe es: liefere die Kernpunkte schneller, ohne Füllmaterial.",
      "es-ES": "Hazlo más conciso: entrega los puntos clave más rápido, sin relleno.",
    },
  },
  headline: {
    excellent: {
      en: "Expert-level — structured, confident and efficient.",
      de: "Expertenniveau — strukturiert, souverän und effizient.",
      "es-ES": "Nivel experto — estructurada, segura y eficiente.",
    },
    strong: {
      en: "Strong answer with a small gap to close.",
      de: "Starke Antwort mit einer kleinen Lücke.",
      "es-ES": "Respuesta sólida con una pequeña brecha que cerrar.",
    },
    adequate: {
      en: "Recognizable answer, but it's missing key elements.",
      de: "Erkennbare Antwort, aber es fehlen Kernelemente.",
      "es-ES": "Respuesta reconocible, pero le faltan elementos clave.",
    },
    developing: {
      en: "A partial answer — structure and completeness need work.",
      de: "Eine Teilantwort — Struktur und Vollständigkeit brauchen Arbeit.",
      "es-ES": "Una respuesta parcial — faltan estructura y desarrollo.",
    },
    weak: {
      en: "This doesn't yet land the scenario — let's rebuild it.",
      de: "Das trifft das Szenario noch nicht — bauen wir es neu auf.",
      "es-ES": "Esto todavía no responde al escenario — reconstruyámoslo.",
    },
  },
};

function loc<T extends Record<Locale, string>>(map: T, locale: Locale): string {
  return map[locale] ?? map.en;
}

function words(text: string): string[] {
  return text.toLowerCase().match(/\p{L}+/gu) ?? [];
}

function countOccurrences(haystack: string, needles: string[]): number {
  const h = " " + haystack.toLowerCase() + " ";
  return needles.reduce((n, term) => {
    const re = new RegExp("\\b" + term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b", "g");
    return n + (h.match(re)?.length ?? 0);
  }, 0);
}

function sentences(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 4);
}

export function offlineEvaluate(
  challenge: Challenge,
  transcript: string,
  responseTimeSec: number,
  locale: Locale
): Evaluation {
  const w = words(transcript);
  const wc = w.length;
  const wset = new Set(w);

  // --- Content: keyword coverage of the challenge's key points + completeness ---
  const covered: string[] = [];
  const missing: string[] = [];
  for (const kp of challenge.keyPoints) {
    const label = loc(kp as Record<Locale, string>, locale);
    const significant = words(label).filter((t) => t.length > 3);
    const hit = significant.some((t) => wset.has(t)) || significant.length === 0;
    if (hit) covered.push(label);
    else missing.push(label);
  }
  const coverage = challenge.keyPoints.length ? covered.length / challenge.keyPoints.length : 0;
  const lengthFactor = clamp((wc / 35) * 100, 0, 100) / 100; // ~35 words = full marks for length
  let content = Math.round(clamp(coverage * 80 + lengthFactor * 20));
  if (wc < 6) content = Math.min(content, 25); // near-empty cannot score well

  // --- Delivery: penalize filler/hedging, reward decisiveness & adequate substance ---
  const fillerN = countOccurrences(transcript, FILLERS[locale]);
  const hedgeN = countOccurrences(transcript, HEDGES[locale]);
  const density = wc > 0 ? (fillerN + hedgeN) / wc : 1;
  let delivery = Math.round(clamp(88 - density * 240 + (wc >= 18 ? 8 : -10)));
  if (wc < 6) delivery = Math.min(delivery, 25);

  // --- Time: fit + efficiency over the 30s window ---
  let time: number;
  if (wc < 6) {
    time = 25;
  } else if (responseTimeSec <= 24 && coverage >= 0.6) {
    time = 92; // complete and efficient
  } else if (responseTimeSec <= 30 && coverage >= 0.5) {
    time = 78;
  } else if (coverage < 0.4) {
    time = 50; // used time but thin
  } else {
    time = 65;
  }

  const dims = { content, delivery, time };
  const comp = composite(dims, challenge.weights);
  const bonus = speedBonus(comp, responseTimeSec);
  const final = finalScore(comp, bonus);
  const band = bandFor(final);

  // weakest dimension drives the focus tip
  const weakest = (Object.entries(dims).sort((a, b) => a[1] - b[1])[0][0]) as
    | "content"
    | "delivery"
    | "time";

  const modelSentences = sentences(loc(challenge.modelAnswer as Record<Locale, string>, locale));
  const coaching: Coaching = {
    worked:
      covered.length > 0
        ? covered.map((c) => `${loc(COACH.worked, locale)} ${c}`)
        : [loc(COACH.headline.developing, locale)],
    missing:
      missing.length > 0
        ? missing.map((m) => `${loc(COACH.missingPrefix, locale)} ${m}`)
        : [loc(COACH.nothingMissing, locale)],
    betterPhrasings: modelSentences.slice(0, 2),
    focusNext: loc(COACH.focus[weakest], locale),
  };

  return {
    dimensions: {
      content: { score: content, justification: justify("content", content, locale) },
      delivery: { score: delivery, justification: justify("delivery", delivery, locale) },
      time: { score: time, justification: justify("time", time, locale) },
    },
    composite: comp,
    speedBonus: bonus,
    final,
    band,
    headline: loc(COACH.headline[band], locale),
    coaching,
    source: "offline",
  };
}

function justify(dim: "content" | "delivery" | "time", score: number, locale: Locale): string {
  const level = score >= 80 ? "strong" : score >= 60 ? "adequate" : "weak";
  const table: Record<string, Record<string, Record<Locale, string>>> = {
    content: {
      strong: { en: "Complete and well structured.", de: "Vollständig und gut strukturiert.", "es-ES": "Completa y bien estructurada." },
      adequate: { en: "Recognizable but with gaps.", de: "Erkennbar, aber mit Lücken.", "es-ES": "Reconocible pero con lagunas." },
      weak: { en: "Incomplete or off-target.", de: "Unvollständig oder am Thema vorbei.", "es-ES": "Incompleta o fuera de foco." },
    },
    delivery: {
      strong: { en: "Assured, little hedging.", de: "Souverän, kaum Absicherungen.", "es-ES": "Segura, con pocos titubeos." },
      adequate: { en: "Some hedging or filler.", de: "Etwas Absicherung oder Füllwörter.", "es-ES": "Algunos titubeos o muletillas." },
      weak: { en: "Tentative or filler-heavy.", de: "Zögerlich oder viele Füllwörter.", "es-ES": "Dubitativa o con muchas muletillas." },
    },
    time: {
      strong: { en: "Efficient use of the window.", de: "Effiziente Nutzung des Zeitfensters.", "es-ES": "Uso eficiente del tiempo." },
      adequate: { en: "Fits, with room to tighten.", de: "Passt, mit Raum zum Straffen.", "es-ES": "Encaja, con margen para concretar." },
      weak: { en: "Too sparse or unfocused.", de: "Zu dünn oder unfokussiert.", "es-ES": "Demasiado escasa o dispersa." },
    },
  };
  return loc(table[dim][level], locale);
}

// --- Optional LLM path (Anthropic), used only when a key is configured ---

const EVAL_MODEL = "claude-sonnet-4-6";

export async function llmEvaluate(
  challenge: Challenge,
  transcript: string,
  responseTimeSec: number,
  locale: Locale,
  apiKey: string
): Promise<Evaluation> {
  const localeName = { en: "English", de: "German", "es-ES": "Spanish (Spain)" }[locale];
  const sys =
    "You are an expert executive communication coach evaluating a spoken response delivered under a 30-second limit. " +
    "Score strictly against the rubric and model answer. Be strict but fair — this is a professional challenge platform, not a confidence-builder. " +
    "Reward a clear stance, structure, stakeholder awareness and composure; penalize hedging, filler, missing structure and non-responsiveness. " +
    `Write all feedback and alternative phrasings in ${localeName}. Return ONLY valid JSON.`;

  const payload = {
    scenario: challenge.scenario[locale] ?? challenge.scenario.en,
    difficulty: challenge.difficulty,
    type: challenge.type,
    weights: challenge.weights,
    rubric: challenge.rubric,
    modelAnswer: challenge.modelAnswer[locale] ?? challenge.modelAnswer.en,
    response: transcript,
    responseTimeSec,
  };

  const schema =
    '{"dimensions":{"content":{"score":0-100,"justification":"..."},"delivery":{"score":0-100,"justification":"..."},' +
    '"time":{"score":0-100,"justification":"..."}},"headline":"1-2 sentences",' +
    '"coaching":{"worked":["..."],"missing":["..."],"betterPhrasings":["..."],"focusNext":"..."}}';

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model: EVAL_MODEL,
      max_tokens: 900,
      system: sys,
      messages: [
        {
          role: "user",
          content: `Evaluate this response. Input:\n${JSON.stringify(payload)}\n\nReturn JSON exactly in this shape:\n${schema}`,
        },
      ],
    }),
  });

  if (!res.ok) throw new Error(`LLM evaluation failed: ${res.status}`);
  const data = await res.json();
  const text: string = data?.content?.[0]?.text ?? "";
  const jsonStr = text.slice(text.indexOf("{"), text.lastIndexOf("}") + 1);
  const parsed = JSON.parse(jsonStr);

  const dims = {
    content: clampDim(parsed.dimensions?.content),
    delivery: clampDim(parsed.dimensions?.delivery),
    time: clampDim(parsed.dimensions?.time),
  };
  const comp = composite(
    { content: dims.content.score, delivery: dims.delivery.score, time: dims.time.score },
    challenge.weights
  );
  const bonus = speedBonus(comp, responseTimeSec);
  const final = finalScore(comp, bonus);

  return {
    dimensions: dims,
    composite: comp,
    speedBonus: bonus,
    final,
    band: bandFor(final),
    headline: String(parsed.headline ?? ""),
    coaching: {
      worked: arr(parsed.coaching?.worked),
      missing: arr(parsed.coaching?.missing),
      betterPhrasings: arr(parsed.coaching?.betterPhrasings),
      focusNext: String(parsed.coaching?.focusNext ?? ""),
    },
    source: "llm",
  };
}

function clampDim(d: unknown): { score: number; justification: string } {
  const obj = (d ?? {}) as { score?: number; justification?: string };
  return { score: clamp(Math.round(Number(obj.score) || 0)), justification: String(obj.justification ?? "") };
}
function arr(v: unknown): string[] {
  return Array.isArray(v) ? v.map(String) : [];
}

export async function evaluate(
  challenge: Challenge,
  transcript: string,
  responseTimeSec: number,
  locale: Locale,
  opts: { useLlm: boolean; apiKey?: string }
): Promise<Evaluation> {
  if (opts.useLlm && opts.apiKey) {
    try {
      return await llmEvaluate(challenge, transcript, responseTimeSec, locale, opts.apiKey);
    } catch {
      // graceful degradation to offline evaluator
    }
  }
  // Small artificial delay so the "evaluating" state is visible (score-first UX).
  await new Promise((r) => setTimeout(r, 700));
  return offlineEvaluate(challenge, transcript, responseTimeSec, locale);
}
