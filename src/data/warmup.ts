import type { LocalizedText } from "../types";

// Short, punchy prompts for the rapid-fire warm-up "drumbeat" — quick to read,
// quick to answer, designed to build momentum before the full 60s challenges.

export interface WarmUpQuestion {
  id: string;
  q: LocalizedText;
}

export const WARMUP_QUESTIONS: WarmUpQuestion[] = [
  { id: "w1", q: { en: "Introduce yourself in one sentence.", de: "Stell dich in einem Satz vor.", "es-ES": "Preséntate en una frase." } },
  { id: "w2", q: { en: "Why should we pick you?", de: "Warum sollten wir dich wählen?", "es-ES": "¿Por qué deberíamos elegirte a ti?" } },
  { id: "w3", q: { en: "Sell me this pen.", de: "Verkauf mir diesen Stift.", "es-ES": "Véndeme este bolígrafo." } },
  { id: "w4", q: { en: "Describe what you do in 10 seconds.", de: "Beschreibe in 10 Sekunden, was du tust.", "es-ES": "Describe lo que haces en 10 segundos." } },
  { id: "w5", q: { en: "What's your single biggest strength?", de: "Was ist deine größte Stärke?", "es-ES": "¿Cuál es tu mayor fortaleza?" } },
  { id: "w6", q: { en: "Give me a quick win you had this week.", de: "Nenn mir einen schnellen Erfolg dieser Woche.", "es-ES": "Dame una victoria rápida de esta semana." } },
  { id: "w7", q: { en: "Convince me to take a five-minute break.", de: "Überzeug mich, fünf Minuten Pause zu machen.", "es-ES": "Convénceme de tomar cinco minutos de descanso." } },
  { id: "w8", q: { en: "Pitch your favourite idea right now.", de: "Pitch jetzt deine Lieblingsidee.", "es-ES": "Lanza tu idea favorita ahora mismo." } },
  { id: "w9", q: { en: "What do you want to be known for?", de: "Wofür möchtest du bekannt sein?", "es-ES": "¿Por qué quieres que te conozcan?" } },
  { id: "w10", q: { en: "Disagree with me — pick anything and defend it.", de: "Widersprich mir — wähl etwas und verteidige es.", "es-ES": "Llévame la contraria — elige algo y defiéndelo." } },
  { id: "w11", q: { en: "Sum up your week in one bold sentence.", de: "Fass deine Woche in einem kühnen Satz zusammen.", "es-ES": "Resume tu semana en una frase contundente." } },
  { id: "w12", q: { en: "What would you change about your team tomorrow?", de: "Was würdest du morgen an deinem Team ändern?", "es-ES": "¿Qué cambiarías de tu equipo mañana?" } },
];

export const WARMUP_SEC = 15;
export const WARMUP_COUNT = 6;

export function pickWarmup(n = WARMUP_COUNT): WarmUpQuestion[] {
  const pool = [...WARMUP_QUESTIONS];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, n);
}

const FILLERS = ["um", "uh", "like", "you", "know", "eh", "este", "äh", "ähm", "pues", "basically"];

/** Instant offline score for warm-up — keeps the drumbeat fast (no AI round-trip). */
export function quickScore(text: string, sec: number): number {
  const words = (text.toLowerCase().match(/\p{L}+/gu) ?? []);
  const wc = words.length;
  if (wc < 3) return Math.min(25, wc * 8);
  let s = Math.min(95, 45 + wc * 4); // substance
  s += Math.max(0, Math.round(((WARMUP_SEC - sec) / WARMUP_SEC) * 10)); // speed
  const fillers = words.filter((w) => FILLERS.includes(w)).length;
  s -= fillers * 4;
  return Math.max(0, Math.min(100, Math.round(s)));
}
