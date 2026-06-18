import type { Attempt, Challenge } from "../types";
import { CHALLENGES } from "../data/challenges";

export interface Stats {
  total: number;
  avgFinal: number;
  streakDays: number;
  weakestDimension: "content" | "delivery" | "time" | null;
  clearedIds: Set<string>;
}

const CLEAR_THRESHOLD = 75;

export function computeStats(attempts: Attempt[]): Stats {
  if (attempts.length === 0) {
    return { total: 0, avgFinal: 0, streakDays: 0, weakestDimension: null, clearedIds: new Set() };
  }

  const avgFinal = Math.round(attempts.reduce((s, a) => s + a.evaluation.final, 0) / attempts.length);

  const dimSums = { content: 0, delivery: 0, time: 0 };
  for (const a of attempts) {
    dimSums.content += a.evaluation.dimensions.content.score;
    dimSums.delivery += a.evaluation.dimensions.delivery.score;
    dimSums.time += a.evaluation.dimensions.time.score;
  }
  const weakestDimension = (Object.entries(dimSums).sort((x, y) => x[1] - y[1])[0][0]) as
    | "content"
    | "delivery"
    | "time";

  const clearedIds = new Set(
    attempts.filter((a) => a.evaluation.final >= CLEAR_THRESHOLD).map((a) => a.challengeId)
  );

  // Day streak: consecutive calendar days (most recent backwards) with an attempt.
  const days = new Set(attempts.map((a) => a.createdAt.slice(0, 10)));
  let streakDays = 0;
  const cursor = new Date();
  for (;;) {
    const key = cursor.toISOString().slice(0, 10);
    if (days.has(key)) {
      streakDays++;
      cursor.setDate(cursor.getDate() - 1);
    } else if (streakDays === 0) {
      // allow today to be empty but count yesterday onward
      cursor.setDate(cursor.getDate() - 1);
      if (!days.has(cursor.toISOString().slice(0, 10))) break;
    } else break;
  }

  return { total: attempts.length, avgFinal, streakDays, weakestDimension, clearedIds };
}

const DIM_TO_TYPES: Record<string, string[]> = {
  content: ["behavioral", "wave"],
  delivery: ["situational", "conflict"],
  time: ["coaching", "feedback360"],
};

/** Recommend the lowest-difficulty uncleared challenge biased to the weakest dimension. */
export function recommend(_attempts: Attempt[], stats: Stats): Challenge {
  const uncleared = CHALLENGES.filter((c) => !stats.clearedIds.has(c.id));
  const pool = uncleared.length > 0 ? uncleared : CHALLENGES;

  const preferredTypes = stats.weakestDimension ? DIM_TO_TYPES[stats.weakestDimension] : [];
  const sorted = [...pool].sort((a, b) => {
    const aPref = preferredTypes.includes(a.type) ? 0 : 1;
    const bPref = preferredTypes.includes(b.type) ? 0 : 1;
    if (aPref !== bPref) return aPref - bPref;
    return a.difficulty - b.difficulty;
  });
  return sorted[0];
}

export function randomChallenge(): Challenge {
  return CHALLENGES[Math.floor(Math.random() * CHALLENGES.length)];
}
