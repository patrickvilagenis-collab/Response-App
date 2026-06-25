import type { LearnIcon } from "../data/learn";

// A small, professional animated illustration for a Learn course. A themed,
// gently pulsing ring around a clean line-icon glyph — loads offline (inline
// SVG), no external images, and keeps the calm/serious tone of the app.

const PILLAR_COLOR: Record<string, string> = {
  elevate: "#7c5cff",
  engage: "#0ea5e9",
  execute: "#f59e0b",
};

export function pillarColor(pillar: string | null): string {
  return PILLAR_COLOR[pillar ?? ""] ?? "#7c5cff";
}

function Glyph({ icon }: { icon: LearnIcon }) {
  // All glyphs drawn on a 48×48 canvas, centered, stroked with currentColor.
  switch (icon) {
    case "compass":
      return (
        <>
          <circle cx="24" cy="24" r="13" />
          <path d="M24 24 L30 18 L26 28 Z" fill="currentColor" stroke="none" />
          <path d="M24 24 L18 30 L22 20 Z" opacity="0.4" fill="currentColor" stroke="none" />
        </>
      );
    case "spark":
      return (
        <>
          <path d="M24 10 L27 21 L38 24 L27 27 L24 38 L21 27 L10 24 L21 21 Z" />
        </>
      );
    case "chart":
      return (
        <>
          <path d="M13 35 L35 35" />
          <rect x="16" y="26" width="4.5" height="9" />
          <rect x="22" y="20" width="4.5" height="15" />
          <rect x="28" y="14" width="4.5" height="21" />
        </>
      );
    case "gear":
      return (
        <>
          <circle cx="24" cy="24" r="6" />
          <circle cx="24" cy="24" r="12" strokeDasharray="3 3.2" />
        </>
      );
    case "grow":
      return (
        <>
          <path d="M24 36 L24 20" />
          <path d="M24 24 C24 18 19 15 15 15 C15 21 19 24 24 24" />
          <path d="M24 21 C24 16 28 13 32 13 C32 18 28 21 24 21" />
        </>
      );
    case "people":
      return (
        <>
          <circle cx="18" cy="19" r="4" />
          <circle cx="30" cy="19" r="4" />
          <path d="M12 34 C12 28 16 26 18 26 C20 26 24 28 24 34" />
          <path d="M24 34 C24 28 28 26 30 26 C32 26 36 28 36 34" opacity="0.5" />
        </>
      );
    case "shield":
      return (
        <>
          <path d="M24 11 L35 15 V25 C35 32 30 36 24 38 C18 36 13 32 13 25 V15 Z" />
          <path d="M19 24 L23 28 L30 20" />
        </>
      );
    case "heart":
      return (
        <>
          <path d="M24 35 C12 27 13 18 19 17 C22.5 16.5 24 19 24 20 C24 19 25.5 16.5 29 17 C35 18 36 27 24 35 Z" />
        </>
      );
    case "target":
      return (
        <>
          <circle cx="24" cy="24" r="13" />
          <circle cx="24" cy="24" r="7.5" opacity="0.6" />
          <circle cx="24" cy="24" r="2.2" fill="currentColor" stroke="none" />
        </>
      );
    case "bolt":
      return (
        <>
          <path d="M26 10 L15 27 L23 27 L21 38 L33 21 L25 21 Z" />
        </>
      );
    case "clock":
      return (
        <>
          <circle cx="24" cy="24" r="13" />
          <path d="M24 16 L24 24 L30 27" />
        </>
      );
    case "anchor":
      return (
        <>
          <circle cx="24" cy="14" r="3" />
          <path d="M24 17 L24 36" />
          <path d="M16 24 L32 24" />
          <path d="M13 28 C14 34 19 37 24 37 C29 37 34 34 35 28" />
        </>
      );
    default:
      return <circle cx="24" cy="24" r="12" />;
  }
}

export function LearnVisual({
  icon,
  pillar,
  size = 96,
}: {
  icon: LearnIcon;
  pillar: string | null;
  size?: number;
}) {
  const color = PILLAR_COLOR[pillar ?? ""] ?? "#7c5cff";
  return (
    <div className="learn-visual" style={{ width: size, height: size, ["--lv" as string]: color }}>
      <span className="learn-visual-ring" />
      <span className="learn-visual-ring r2" />
      <svg viewBox="0 0 48 48" width={size * 0.5} height={size * 0.5} className="learn-visual-glyph" aria-hidden="true">
        <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <Glyph icon={icon} />
        </g>
      </svg>
    </div>
  );
}

// Just the line-icon glyph, no ring — for placing on a chip over the hero art.
export function CourseGlyph({ icon, size = 34 }: { icon: LearnIcon; size?: number }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Glyph icon={icon} />
      </g>
    </svg>
  );
}

// Bold, editorial hero art for a teaching slide — a themed gradient band with
// layered geometric shapes, a giant index numeral and the icon on a floating
// chip. Each `variant` (0..3) lays the shapes out differently so every slide
// in a course feels distinct, like a real designer deck.
type Shape =
  | { t: "ring"; x: number; y: number; r: number; w?: number }
  | { t: "disc"; x: number; y: number; r: number; o?: number }
  | { t: "line"; x1: number; y1: number; x2: number; y2: number }
  | { t: "dots"; x: number; y: number; cols: number; rows: number; gap: number };

const DECO: Shape[][] = [
  // 0 · "why it matters" — a rising horizon of discs + a far ring
  [
    { t: "ring", x: 330, y: 52, r: 78, w: 2 },
    { t: "disc", x: 326, y: 150, r: 30, o: 0.16 },
    { t: "dots", x: 40, y: 120, cols: 4, rows: 3, gap: 18 },
    { t: "disc", x: 96, y: 46, r: 7, o: 0.5 },
  ],
  // 1 · "core idea" — orbit / concentric
  [
    { t: "ring", x: 150, y: 100, r: 92, w: 2 },
    { t: "ring", x: 150, y: 100, r: 60, w: 2 },
    { t: "disc", x: 318, y: 150, r: 7, o: 0.6 },
    { t: "disc", x: 350, y: 60, r: 40, o: 0.14 },
  ],
  // 2 · "how to / tool" — structured grid + baseline
  [
    { t: "dots", x: 250, y: 40, cols: 6, rows: 4, gap: 22 },
    { t: "line", x1: 36, y1: 158, x2: 200, y2: 158 },
    { t: "disc", x: 70, y: 70, r: 34, o: 0.16 },
    { t: "disc", x: 70, y: 70, r: 9, o: 0.6 },
  ],
  // 3 · "mistake / quick win" — a bold diagonal + accent
  [
    { t: "line", x1: 60, y1: 200, x2: 360, y2: 20 },
    { t: "disc", x: 320, y: 70, r: 46, o: 0.16 },
    { t: "ring", x: 110, y: 150, r: 40, w: 2 },
    { t: "disc", x: 250, y: 150, r: 6, o: 0.55 },
  ],
];

function DecoLayer({ variant }: { variant: number }) {
  const shapes = DECO[variant % DECO.length];
  return (
    <svg className="slide-deco" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <g stroke="#fff" fill="#fff">
        {shapes.map((s, i) => {
          if (s.t === "ring")
            return <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="none" strokeWidth={s.w ?? 2} opacity={0.22} />;
          if (s.t === "disc") return <circle key={i} cx={s.x} cy={s.y} r={s.r} stroke="none" opacity={s.o ?? 0.2} />;
          if (s.t === "line")
            return <line key={i} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} strokeWidth={2} opacity={0.25} />;
          // dots grid
          const dots = [];
          for (let r = 0; r < s.rows; r++)
            for (let c = 0; c < s.cols; c++)
              dots.push(<circle key={`${r}-${c}`} cx={s.x + c * s.gap} cy={s.y + r * s.gap} r={2.4} stroke="none" opacity={0.4} />);
          return <g key={i}>{dots}</g>;
        })}
      </g>
    </svg>
  );
}

export function SlideArt({
  icon,
  pillar,
  variant,
  label,
}: {
  icon: LearnIcon;
  pillar: string | null;
  variant: number; // 0-based slide index
  label?: string; // small overline shown on the art (e.g. "TOOL")
}) {
  const color = PILLAR_COLOR[pillar ?? ""] ?? "#7c5cff";
  const num = String(variant + 1).padStart(2, "0");
  return (
    <div className={`slide-art v${variant % DECO.length}`} style={{ ["--c" as string]: color }}>
      <DecoLayer variant={variant} />
      <span className="slide-num">{num}</span>
      {label && <span className="slide-art-label">{label}</span>}
      <span className="slide-chip" style={{ color }}>
        <CourseGlyph icon={icon} size={40} />
      </span>
    </div>
  );
}
