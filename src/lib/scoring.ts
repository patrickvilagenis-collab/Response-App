import type { Band, Weights } from "../types";

export const MAX_RESPONSE_SEC = 60;
export const MAX_SPEED_BONUS = 5;
export const QUALITY_FLOOR = 50;

export function clamp(n: number, lo = 0, hi = 100): number {
  return Math.max(lo, Math.min(hi, n));
}

export function composite(
  dims: { content: number; delivery: number; time: number },
  w: Weights
): number {
  return Math.round(dims.content * w.content + dims.delivery * w.delivery + dims.time * w.time);
}

/** Speed bonus only applies above the quality floor (fast-but-empty must not win). */
export function speedBonus(compositeScore: number, responseTimeSec: number): number {
  if (compositeScore < QUALITY_FLOOR) return 0;
  const ratio = clamp((MAX_RESPONSE_SEC - responseTimeSec) / MAX_RESPONSE_SEC, 0, 1);
  return Math.round(ratio * MAX_SPEED_BONUS);
}

export function finalScore(compositeScore: number, bonus: number): number {
  return clamp(compositeScore + bonus);
}

export function bandFor(final: number): Band {
  if (final >= 85) return "excellent";
  if (final >= 70) return "strong";
  if (final >= 55) return "adequate";
  if (final >= 40) return "developing";
  return "weak";
}

export const BAND_COLORS: Record<Band, string> = {
  excellent: "#16a34a",
  strong: "#22c55e",
  adequate: "#eab308",
  developing: "#f59e0b",
  weak: "#ef4444",
};
