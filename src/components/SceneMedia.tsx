import type { SceneKind } from "../types";

// Contextual media rendered as inline SVG "layouts" — they load instantly and
// offline, and establish: Where am I? Who am I? What's my role? (see spec §5).

export function SceneMedia({ scene, alt }: { scene: SceneKind; alt: string }) {
  return (
    <div className="scene" role="img" aria-label={alt}>
      <svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        {SCENES[scene]}
      </svg>
      <div className="scene-grain" aria-hidden="true" />
    </div>
  );
}

const person = (x: number, y: number, c = "#9fb3d1", s = 1) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle cx="0" cy="0" r="7" fill={c} />
    <path d="M -11 22 Q 0 6 11 22 Z" fill={c} />
  </g>
);

const SCENES: Record<SceneKind, JSX.Element> = {
  boardroom: (
    <>
      <rect width="320" height="180" fill="#0e1830" />
      <rect x="170" y="18" width="135" height="90" rx="4" fill="#16233f" />
      <rect x="178" y="26" width="119" height="74" rx="2" fill="#1d3358" opacity="0.7" />
      <rect x="178" y="26" width="119" height="20" fill="#2a4d82" opacity="0.5" />
      <ellipse cx="120" cy="150" rx="120" ry="26" fill="#16233f" />
      {person(60, 120, "#9fb3d1", 1.1)}
      {person(120, 116, "#c7d4ea", 1.1)}
      {person(180, 120, "#9fb3d1", 1.1)}
      <rect x="0" y="0" width="14" height="180" fill="#0b1326" opacity="0.6" />
    </>
  ),
  office_1on1: (
    <>
      <rect width="320" height="180" fill="#101a2e" />
      <rect x="22" y="34" width="80" height="58" rx="3" fill="#16233f" />
      <rect x="30" y="42" width="64" height="42" fill="#22406e" opacity="0.5" />
      <ellipse cx="160" cy="150" rx="95" ry="22" fill="#172a48" />
      {person(120, 118, "#c7d4ea", 1.25)}
      {person(205, 120, "#9fb3d1", 1.25)}
      <rect x="248" y="40" width="50" height="70" rx="3" fill="#16233f" />
      <line x1="252" y1="56" x2="292" y2="56" stroke="#2a4d82" strokeWidth="3" opacity="0.5" />
      <line x1="252" y1="68" x2="292" y2="68" stroke="#2a4d82" strokeWidth="3" opacity="0.4" />
    </>
  ),
  client_meeting: (
    <>
      <rect width="320" height="180" fill="#0e1830" />
      <rect x="120" y="14" width="180" height="96" rx="4" fill="#15294a" />
      <rect x="130" y="24" width="160" height="60" rx="2" fill="#1e63b8" opacity="0.45" />
      <rect x="138" y="34" width="90" height="8" rx="3" fill="#7fb0ff" opacity="0.7" />
      <rect x="138" y="50" width="120" height="6" rx="3" fill="#5d86c4" opacity="0.5" />
      <rect x="138" y="62" width="70" height="6" rx="3" fill="#5d86c4" opacity="0.4" />
      <ellipse cx="70" cy="155" rx="80" ry="22" fill="#16233f" />
      {person(40, 124, "#c7d4ea", 1.15)}
      {person(95, 126, "#9fb3d1", 1.15)}
    </>
  ),
  exec_committee: (
    <>
      <rect width="320" height="180" fill="#0c1428" />
      <rect x="92" y="12" width="160" height="80" rx="4" fill="#15294a" />
      <polyline points="104,70 134,46 164,58 194,30 224,40" fill="none" stroke="#5fd08a" strokeWidth="3" opacity="0.8" />
      <rect x="104" y="74" width="136" height="6" rx="3" fill="#2a4d82" opacity="0.5" />
      <ellipse cx="160" cy="158" rx="150" ry="24" fill="#15243f" />
      {person(60, 128, "#9fb3d1")}
      {person(110, 124, "#c7d4ea")}
      {person(160, 122, "#c7d4ea")}
      {person(210, 124, "#c7d4ea")}
      {person(260, 128, "#9fb3d1")}
    </>
  ),
  coaching_room: (
    <>
      <rect width="320" height="180" fill="#13202f" />
      <circle cx="60" cy="40" r="26" fill="#1c3346" opacity="0.6" />
      <rect x="250" y="30" width="46" height="80" rx="6" fill="#1a2c3d" />
      <ellipse cx="160" cy="150" rx="110" ry="24" fill="#1b3043" />
      {person(115, 120, "#cfe0d6", 1.3)}
      {person(205, 120, "#a7c4b6", 1.3)}
      <rect x="150" y="150" width="20" height="8" rx="4" fill="#26465e" />
    </>
  ),
  feedback_report: (
    <>
      <rect width="320" height="180" fill="#0f1a2e" />
      <rect x="60" y="16" width="200" height="148" rx="6" fill="#16233f" />
      <rect x="74" y="30" width="120" height="10" rx="4" fill="#7fb0ff" opacity="0.8" />
      <rect x="74" y="52" width="172" height="6" rx="3" fill="#3a5d92" opacity="0.5" />
      <rect x="74" y="68" width="60" height="34" rx="3" fill="#5fd08a" opacity="0.65" />
      <rect x="142" y="68" width="60" height="34" rx="3" fill="#eab308" opacity="0.6" />
      <rect x="74" y="112" width="172" height="6" rx="3" fill="#3a5d92" opacity="0.4" />
      <rect x="74" y="126" width="140" height="6" rx="3" fill="#3a5d92" opacity="0.4" />
      <rect x="74" y="140" width="100" height="6" rx="3" fill="#3a5d92" opacity="0.3" />
    </>
  ),
  video_call: (
    <>
      <rect width="320" height="180" fill="#0b1326" />
      <rect x="14" y="16" width="140" height="86" rx="6" fill="#16233f" />
      {person(84, 70, "#c7d4ea", 1.6)}
      <rect x="166" y="16" width="140" height="86" rx="6" fill="#16233f" />
      {person(236, 70, "#9fb3d1", 1.6)}
      <rect x="90" y="120" width="140" height="44" rx="6" fill="#16233f" />
      {person(160, 162, "#cfe0d6", 1.4)}
      <circle cx="160" cy="152" r="3" fill="#5fd08a" />
    </>
  ),
};
