interface Props {
  remaining: number; // seconds
  total: number;
}

export function TimerRing({ remaining, total }: Props) {
  const r = 84;
  const circ = 2 * Math.PI * r;
  const ratio = Math.max(0, remaining / total);
  const offset = circ * (1 - ratio);

  const state = remaining <= 3 ? "critical" : remaining <= 10 ? "warning" : "calm";
  const color = state === "critical" ? "#ef4444" : state === "warning" ? "#f59e0b" : "#5b8cff";

  return (
    <div className={`timer-ring ${state}`}>
      <svg viewBox="0 0 200 200" aria-hidden="true">
        <circle cx="100" cy="100" r={r} stroke="#1b2944" strokeWidth="12" fill="none" />
        <circle
          cx="100"
          cy="100"
          r={r}
          stroke={color}
          strokeWidth="12"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          transform="rotate(-90 100 100)"
          style={{ transition: "stroke-dashoffset 0.25s linear, stroke 0.3s" }}
        />
      </svg>
      <div className="timer-num" style={{ color }}>
        <span>{Math.ceil(remaining)}</span>
      </div>
    </div>
  );
}
