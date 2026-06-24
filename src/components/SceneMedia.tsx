import { useId, useState } from "react";
import type { SceneKind } from "../types";

// Contextual media for each scenario. We show a real, professional photo
// (Unsplash, free license) so the moment feels real; if it fails to load
// (offline), we fall back to the inline SVG "scene" which works with no network.
// Each SVG scene uses a unique gradient id prefix so multiple can coexist.

// Curated Unsplash photo ids per scene kind. Sized + auto-formatted at the CDN.
const SCENE_PHOTOS: Record<SceneKind, string> = {
  boardroom: "1431540015161-0bf868a2d407",
  office_1on1: "1600880292203-757bb62b4baf",
  client_meeting: "1542744173-8e7e53415bb0",
  exec_committee: "1521737604893-d14cc237f11d",
  coaching_room: "1551836022-d5d88e9218df",
  feedback_report: "1611224923853-80b023f02d71",
  video_call: "1587825140708-dfaf72ae4b04",
};

function photoUrl(scene: SceneKind): string {
  return `https://images.unsplash.com/photo-${SCENE_PHOTOS[scene]}?w=900&q=75&auto=format&fit=crop`;
}

export function SceneMedia({ scene, alt }: { scene: SceneKind; alt: string }) {
  const uid = useId().replace(/:/g, "");
  const [failed, setFailed] = useState(false);
  return (
    <div className="scene" role="img" aria-label={alt}>
      {failed ? (
        <svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <Defs p={uid} scene={scene} />
          {renderScene(scene, uid)}
        </svg>
      ) : (
        <img
          className="scene-photo"
          src={photoUrl(scene)}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
        />
      )}
      <div className="scene-vignette" aria-hidden="true" />
    </div>
  );
}

/** A figure with subtle shading and a soft shadow. */
function Person({ x, y, s = 1, hue = "#aebfdc", dark = "#6f82a6" }: { x: number; y: number; s?: number; hue?: string; dark?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx="0" cy="25" rx="15" ry="4" fill="#000" opacity="0.18" />
      <path d="M -13 24 Q -13 7 0 7 Q 13 7 13 24 Z" fill={dark} />
      <path d="M -13 24 Q -13 9 0 8 L 0 24 Z" fill={hue} opacity="0.5" />
      <circle cx="0" cy="-2" r="8.5" fill={hue} />
      <circle cx="-2.5" cy="-4" r="3" fill="#fff" opacity="0.18" />
    </g>
  );
}

function Defs({ p, scene }: { p: string; scene: SceneKind }) {
  const warm = scene === "coaching_room";
  const sky = warm ? ["#22384a", "#16242f"] : ["#1c2f54", "#0c1526"];
  return (
    <defs>
      <linearGradient id={`${p}-bg`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={sky[0]} />
        <stop offset="1" stopColor={sky[1]} />
      </linearGradient>
      <linearGradient id={`${p}-floor`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#0e1830" />
        <stop offset="1" stopColor="#070d1c" />
      </linearGradient>
      <radialGradient id={`${p}-glow`} cx="0.5" cy="0.1" r="0.9">
        <stop offset="0" stopColor="#3a5a92" stopOpacity="0.55" />
        <stop offset="1" stopColor="#3a5a92" stopOpacity="0" />
      </radialGradient>
      <linearGradient id={`${p}-screen`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#2b6fc4" stopOpacity="0.65" />
        <stop offset="1" stopColor="#1b3f7a" stopOpacity="0.5" />
      </linearGradient>
      <linearGradient id={`${p}-table`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#243456" />
        <stop offset="1" stopColor="#16223c" />
      </linearGradient>
    </defs>
  );
}

function renderScene(scene: SceneKind, p: string) {
  const bg = `url(#${p}-bg)`;
  const floor = `url(#${p}-floor)`;
  const glow = `url(#${p}-glow)`;
  const screen = `url(#${p}-screen)`;
  const table = `url(#${p}-table)`;

  const base = (
    <>
      <rect width="320" height="180" fill={bg} />
      <rect width="320" height="180" fill={glow} />
    </>
  );

  switch (scene) {
    case "boardroom":
      return (
        <>
          {base}
          <rect x="0" y="118" width="320" height="62" fill={floor} />
          {/* window wall with skyline */}
          <rect x="150" y="14" width="158" height="92" rx="4" fill="#0f1d38" />
          <rect x="156" y="20" width="146" height="80" rx="2" fill={screen} opacity="0.4" />
          <g fill="#0f1d38" opacity="0.85">
            <rect x="170" y="46" width="14" height="54" /><rect x="190" y="34" width="16" height="66" />
            <rect x="212" y="54" width="12" height="46" /><rect x="230" y="40" width="18" height="60" />
            <rect x="254" y="60" width="14" height="40" /><rect x="274" y="30" width="16" height="70" />
          </g>
          <line x1="150" y1="60" x2="308" y2="60" stroke="#0a1326" strokeWidth="2" opacity="0.6" />
          {/* table */}
          <ellipse cx="120" cy="150" rx="135" ry="30" fill={table} />
          <ellipse cx="120" cy="146" rx="135" ry="26" fill="#2a3c63" opacity="0.4" />
          <Person x={55} y={120} s={1.15} />
          <Person x={120} y={114} s={1.2} hue="#cdd9ee" />
          <Person x={185} y={120} s={1.15} />
        </>
      );
    case "office_1on1":
      return (
        <>
          {base}
          <rect x="0" y="120" width="320" height="60" fill={floor} />
          {/* window */}
          <rect x="20" y="26" width="92" height="66" rx="4" fill="#0f1d38" />
          <rect x="26" y="32" width="80" height="54" rx="2" fill={screen} opacity="0.45" />
          <line x1="66" y1="32" x2="66" y2="86" stroke="#0f1d38" strokeWidth="3" />
          {/* plant */}
          <rect x="288" y="92" width="14" height="20" rx="2" fill="#243456" />
          <path d="M295 92 q -14 -22 -4 -34 q 10 12 4 34" fill="#3f7a5c" opacity="0.8" />
          <path d="M295 92 q 14 -18 6 -30 q -10 10 -6 30" fill="#356b50" opacity="0.8" />
          {/* table + two people facing */}
          <ellipse cx="160" cy="150" rx="120" ry="28" fill={table} />
          <ellipse cx="160" cy="146" rx="120" ry="24" fill="#2a3c63" opacity="0.35" />
          <Person x={118} y={116} s={1.35} hue="#cdd9ee" />
          <Person x={210} y={118} s={1.35} dark="#5d6f93" />
        </>
      );
    case "client_meeting":
      return (
        <>
          {base}
          <rect x="0" y="120" width="320" height="60" fill={floor} />
          {/* presentation screen with chart + bullets */}
          <rect x="120" y="12" width="186" height="100" rx="5" fill="#0e1c36" />
          <rect x="128" y="20" width="170" height="84" rx="3" fill={screen} opacity="0.5" />
          <polyline points="138,86 162,62 184,72 208,44 232,54 262,30" fill="none" stroke="#7fb0ff" strokeWidth="2.5" />
          <rect x="138" y="92" width="150" height="5" rx="2" fill="#7fb0ff" opacity="0.5" />
          {/* presenter + clients */}
          <ellipse cx="70" cy="152" rx="92" ry="26" fill={table} />
          <ellipse cx="70" cy="148" rx="92" ry="22" fill="#2a3c63" opacity="0.35" />
          <Person x={38} y={120} s={1.25} hue="#cdd9ee" />
          <Person x={96} y={124} s={1.2} dark="#5d6f93" />
        </>
      );
    case "exec_committee":
      return (
        <>
          {base}
          <rect x="0" y="116" width="320" height="64" fill={floor} />
          {/* big strategy screen */}
          <rect x="84" y="10" width="152" height="84" rx="5" fill="#0e1c36" />
          <rect x="92" y="18" width="136" height="68" rx="3" fill={screen} opacity="0.45" />
          <polyline points="100,72 126,50 152,60 178,34 204,44 224,28" fill="none" stroke="#5fd08a" strokeWidth="2.5" />
          <rect x="100" y="78" width="120" height="4" rx="2" fill="#3a5d92" opacity="0.6" />
          {/* long table, five seats */}
          <ellipse cx="160" cy="156" rx="156" ry="28" fill={table} />
          <ellipse cx="160" cy="152" rx="156" ry="23" fill="#2a3c63" opacity="0.35" />
          <Person x={55} y={126} s={1.0} />
          <Person x={108} y={122} s={1.05} hue="#cdd9ee" />
          <Person x={160} y={120} s={1.1} hue="#cdd9ee" />
          <Person x={212} y={122} s={1.05} hue="#cdd9ee" />
          <Person x={265} y={126} s={1.0} />
        </>
      );
    case "coaching_room":
      return (
        <>
          {base}
          <rect x="0" y="122" width="320" height="58" fill={floor} />
          {/* warm lamp glow */}
          <circle cx="48" cy="34" r="30" fill="#caa15a" opacity="0.22" />
          <rect x="44" y="6" width="8" height="22" fill="#3a4a52" />
          {/* picture frame */}
          <rect x="250" y="28" width="50" height="40" rx="3" fill="#243038" />
          <rect x="256" y="34" width="38" height="28" rx="2" fill="#3f6b6f" opacity="0.5" />
          {/* low table + two relaxed chairs */}
          <ellipse cx="160" cy="150" rx="108" ry="26" fill="#22323c" />
          <rect x="150" y="138" width="20" height="10" rx="3" fill="#2e424c" />
          <Person x={112} y={120} s={1.4} hue="#d7e3da" dark="#5f7a6a" />
          <Person x={208} y={120} s={1.4} hue="#bcd0c4" dark="#566f60" />
        </>
      );
    case "feedback_report":
      return (
        <>
          {base}
          <rect x="0" y="126" width="320" height="54" fill={floor} />
          {/* a 360 report sheet */}
          <rect x="64" y="14" width="192" height="150" rx="6" fill="#16233f" />
          <rect x="64" y="14" width="192" height="150" rx="6" fill="#fff" opacity="0.02" />
          <rect x="78" y="28" width="120" height="11" rx="4" fill="#7fb0ff" opacity="0.85" />
          <rect x="78" y="48" width="164" height="5" rx="2" fill="#3a5d92" opacity="0.5" />
          {/* mixed rating bars */}
          <rect x="78" y="64" width="50" height="40" rx="3" fill="#5fd08a" opacity="0.7" />
          <rect x="136" y="74" width="50" height="30" rx="3" fill="#eab308" opacity="0.65" />
          <rect x="194" y="84" width="48" height="20" rx="3" fill="#ef4444" opacity="0.6" />
          <rect x="78" y="116" width="164" height="5" rx="2" fill="#3a5d92" opacity="0.4" />
          <rect x="78" y="128" width="140" height="5" rx="2" fill="#3a5d92" opacity="0.4" />
          <rect x="78" y="140" width="104" height="5" rx="2" fill="#3a5d92" opacity="0.3" />
        </>
      );
    case "video_call":
      return (
        <>
          {base}
          {/* three call tiles */}
          <g>
            <rect x="12" y="16" width="142" height="84" rx="8" fill="#101e3a" stroke="#27406e" strokeWidth="1.5" />
            <rect x="12" y="16" width="142" height="84" rx="8" fill={screen} opacity="0.18" />
            <Person x={83} y={74} s={1.7} hue="#cdd9ee" />
          </g>
          <g>
            <rect x="166" y="16" width="142" height="84" rx="8" fill="#101e3a" stroke="#27406e" strokeWidth="1.5" />
            <Person x={237} y={74} s={1.7} dark="#5d6f93" />
          </g>
          <g>
            <rect x="89" y="112" width="142" height="56" rx="8" fill="#101e3a" stroke="#3a7d5a" strokeWidth="1.5" />
            <Person x={160} y={158} s={1.4} hue="#d7e3da" />
            <circle cx="104" cy="124" r="3" fill="#5fd08a" />
          </g>
        </>
      );
  }
}
