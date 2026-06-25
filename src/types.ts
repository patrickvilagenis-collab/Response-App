// Core domain types — see docs/data-model.md

export type Locale = "en" | "de" | "es-ES";
export type LocalizedText = Partial<Record<Locale, string>>;

export type ChallengeType =
  | "wave"
  | "coaching"
  | "feedback360"
  | "behavioral"
  | "situational"
  | "conflict";

export type Category =
  | "professional_communication"
  | "leadership_decisions"
  | "conflict_resolution"
  | "strategic_thinking"
  | "feedback_difficult_conversations"
  | "self_awareness_development";

export type Difficulty = 1 | 2 | 3 | 4;

export type SceneKind =
  | "boardroom"
  | "office_1on1"
  | "client_meeting"
  | "exec_committee"
  | "coaching_room"
  | "feedback_report"
  | "video_call";

export interface Media {
  scene: SceneKind; // rendered as an inline SVG "layout" — loads offline, no external asset
  alt: LocalizedText;
}

export interface DimensionRubric {
  strong: string;
  adequate: string;
  weak: string;
}

export interface Rubric {
  content: DimensionRubric;
  delivery: DimensionRubric;
  time: DimensionRubric;
}

export interface Weights {
  content: number;
  delivery: number;
  time: number;
}

export interface Challenge {
  id: string;
  type: ChallengeType;
  category: Category;
  difficulty: Difficulty;
  /** Business area this scenario belongs to (browse-by-department). */
  department?: Department;
  roleCaption: LocalizedText;
  scenario: LocalizedText;
  media: Media;
  weights: Weights;
  /** Key points an expert answer should hit — drives offline scoring + rubric. */
  keyPoints: LocalizedText[];
  rubric: Rubric;
  modelAnswer: LocalizedText;
}

export type Band = "excellent" | "strong" | "adequate" | "developing" | "weak";

export interface DimensionScore {
  score: number; // 0–100
  justification: string;
}

export interface Coaching {
  worked: string[];
  missing: string[];
  betterPhrasings: string[];
  /** The user's OWN answer rewritten to score high (AI path only). */
  improvedVersion?: string;
  focusNext: string;
}

export interface Evaluation {
  dimensions: {
    content: DimensionScore;
    delivery: DimensionScore;
    time: DimensionScore;
  };
  composite: number;
  speedBonus: number;
  final: number;
  band: Band;
  headline: string;
  coaching: Coaching;
  source: "llm" | "offline";
}

export interface Attempt {
  id: string;
  profileId: string;
  challengeId: string;
  category: Category;
  type: ChallengeType;
  difficulty: Difficulty;
  locale: Locale;
  inputMode: "voice" | "text";
  transcript: string;
  responseTimeSec: number;
  evaluation: Evaluation;
  createdAt: string;
}

export type RoleLevel = "ic" | "manager" | "director" | "exec";
export type Segment = "individual" | "company";

// Business area / department a scenario belongs to (and the user works in).
export type Department =
  | "leadership"
  | "finance"
  | "technology"
  | "commercial"
  | "people"
  | "operations"
  | "customer"
  | "legal";

export type TeamSize = "none" | "small" | "large";

export interface Profile {
  id: string;
  displayName: string;
  passwordHash?: string;
  language: Locale;
  inputDefault: "voice" | "text";
  createdAt: string;
  email?: string; // set when the profile is tied to a registered account
  // Set during the 3-tap onboarding; personalizes the home.
  onboarded?: boolean;
  roleLevel?: RoleLevel;
  goalTrack?: string;
  segment?: Segment;
  // Richer profile for a tailored training plan.
  department?: Department; // the area they work in
  teamSize?: TeamSize; // how many people they manage
  focus?: Department; // the area they most want to practise
  goal?: string; // a concrete near-term goal (free text)
  devPlan?: DevPlan; // latest Leadership Framework analysis & plan
  devPlanHistory?: PlanSnapshot[]; // past analyses for the evolution view
  learnProgress?: Record<string, LearnRecord>; // Learn micro-course progress, by course id
}

// Progress on a single Learn micro-course.
export interface LearnRecord {
  completed: boolean;
  quizScore?: number; // 0–100, best quiz result
  completedAt?: string;
}

export interface Settings {
  // AI evaluation is integrated server-side (no key in the browser). This toggle
  // lets a user opt for the faster offline evaluator instead.
  useLlm: boolean;
}

// --- Leadership Framework development plan ---
export interface BehaviorRating {
  behavior: string; // behavior id from the framework
  score: number; // 1–5
  evidence: string; // what was observed
}
export interface GrowthArea {
  behavior: string; // behavior id
  why: string;
  challenges: string[]; // real-work challenges
  exercises: string[]; // in-app exercises
}
export interface DevPlan {
  ratings: BehaviorRating[];
  strengths: string[]; // behavior ids rated 4–5
  growthAreas: GrowthArea[];
  generatedAt: string;
  basedOn: number; // number of attempts analysed
  locale?: Locale; // language the AI text was generated in (for consistent display)
}
// Lightweight record kept for the evolution history (no large text).
export interface PlanSnapshot {
  generatedAt: string;
  ratings: BehaviorRating[];
}
