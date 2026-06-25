import type { Challenge, Difficulty, RoleLevel } from "../types";

// Facets for the "Practicar" experience (see docs/REDESIGN.md §2):
// situation-first browsing + role-level filtering.

export type Situation =
  | "interview"
  | "board"
  | "one_on_one"
  | "conflict"
  | "client"
  | "crisis"
  | "feedback"
  | "reflection";

export const SITUATIONS: { id: Situation; icon: string }[] = [
  { id: "interview", icon: "🎯" },
  { id: "board", icon: "🏛" },
  { id: "client", icon: "🤝" },
  { id: "conflict", icon: "⚡" },
  { id: "one_on_one", icon: "💬" },
  { id: "feedback", icon: "🔄" },
  { id: "crisis", icon: "🔥" },
  { id: "reflection", icon: "✦" },
];

// Explicit situation per challenge (kept here so the content file stays clean).
const SITUATION_BY_ID: Record<string, Situation> = {
  "C-001": "interview",
  "C-002": "crisis",
  "C-003": "client",
  "C-004": "board",
  "C-005": "reflection",
  "C-006": "feedback",
  "C-007": "one_on_one",
  "C-008": "interview",
  "C-009": "conflict",
  "C-010": "crisis",
  "C-011": "reflection",
  "C-012": "feedback",
  "C-013": "board",
  "C-014": "client",
  "C-015": "interview",
  "C-016": "one_on_one",
  "C-017": "board",
  "C-018": "reflection",
  "C-019": "feedback",
  "C-020": "crisis",
  "C-021": "board",
  "C-022": "one_on_one",
  "C-023": "conflict",
  "C-024": "board",
  "C-025": "feedback",
  "C-026": "one_on_one",
};

export function situationOf(c: Challenge): Situation {
  const explicit = SITUATION_BY_ID[c.id];
  if (explicit) return explicit;
  // Infer for newer content (department + extended scenarios) from type/scene.
  if (c.type === "conflict") return "conflict";
  if (c.type === "feedback360") return "feedback";
  if (c.type === "behavioral") return "interview";
  if (c.type === "coaching") return "one_on_one";
  switch (c.media.scene) {
    case "client_meeting":
      return "client";
    case "boardroom":
    case "exec_committee":
      return "board";
    case "office_1on1":
    case "coaching_room":
      return "one_on_one";
    case "feedback_report":
      return "feedback";
    case "video_call":
      return "client";
    default:
      return "crisis";
  }
}

// Role level is derived from difficulty so the existing content gains a
// people-friendly "who is this for" facet for free.
export function levelOf(d: Difficulty): RoleLevel {
  return d === 1 ? "ic" : d === 2 ? "manager" : d === 3 ? "director" : "exec";
}

export const LEVELS: RoleLevel[] = ["ic", "manager", "director", "exec"];
