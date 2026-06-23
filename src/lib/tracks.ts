import type { Challenge } from "../types";
import { CHALLENGES } from "../data/challenges";

// Situation-first information architecture (see docs/REDESIGN.md §2).
// Five clear tracks the user actually thinks in, mapped over the existing
// category/type tagging. A challenge can belong to more than one track.

export type TrackId = "leadership" | "conflict" | "career" | "pressure" | "growth";

export interface Track {
  id: TrackId;
  icon: string; // emoji placeholder until the icon set lands
}

export const TRACKS: Track[] = [
  { id: "leadership", icon: "♛" },
  { id: "conflict", icon: "⚡" },
  { id: "career", icon: "↗" },
  { id: "pressure", icon: "◎" },
  { id: "growth", icon: "✦" },
];

export function tracksFor(c: Challenge): TrackId[] {
  const out = new Set<TrackId>();
  if (c.category === "leadership_decisions" || c.category === "strategic_thinking" || c.type === "wave")
    out.add("leadership");
  if (c.category === "conflict_resolution" || c.category === "feedback_difficult_conversations" || c.type === "conflict")
    out.add("conflict");
  if (c.type === "behavioral") out.add("career");
  if (c.category === "professional_communication" || c.type === "situational") out.add("pressure");
  if (c.category === "self_awareness_development" || c.type === "coaching" || c.type === "feedback360")
    out.add("growth");
  if (out.size === 0) out.add("pressure");
  return [...out];
}

export function challengesInTrack(track: TrackId): Challenge[] {
  return CHALLENGES.filter((c) => tracksFor(c).includes(track));
}

export function trackCount(track: TrackId): number {
  return challengesInTrack(track).length;
}
