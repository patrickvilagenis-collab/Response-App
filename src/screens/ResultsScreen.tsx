import { useEffect, useState } from "react";
import { useApp } from "../state/store";
import { getChallenge } from "../data/challenges";
// (helpers below)
import { BAND_COLORS, MAX_RESPONSE_SEC } from "../lib/scoring";
import { recommend, computeStats } from "../lib/stats";

export function ResultsScreen({ attemptId }: { attemptId: string }) {
  const { t, locale, attempts, go, prefersReducedMotion } = useAppSafe();
  const attempt = attempts.find((a) => a.id === attemptId);
  if (!attempt) {
    return (
      <div className="page">
        <button className="btn ghost" onClick={() => go({ name: "library" })}>
          {t("results.library")}
        </button>
      </div>
    );
  }
  const ch = getChallenge(attempt.challengeId);
  const ev = attempt.evaluation;
  const color = BAND_COLORS[ev.band];

  const display = useCountUp(ev.final, prefersReducedMotion);

  const stats = computeStats(attempts);
  const next = recommend(attempts, stats);

  return (
    <div className="page results">
      <div className="result-hero" style={{ ["--band" as string]: color }}>
        <div className="big-score" style={{ color }}>
          {display}
          <span className="pct">%</span>
        </div>
        <div className="band-label" style={{ background: color }}>
          {t(`band.${ev.band}`)}
        </div>
        <div className="time-readout">
          ⏱ {t("eval.respondedIn")} <strong>{attempt.responseTimeSec.toFixed(1)}{t("eval.seconds")}</strong>{" "}
          {t("eval.of")} {MAX_RESPONSE_SEC}{t("eval.seconds")}
          {ev.speedBonus > 0 && <span className="bonus">+{ev.speedBonus} {t("eval.speedBonus")}</span>}
        </div>
        <p className="headline">{ev.headline}</p>
        {ev.source === "offline" && <p className="muted small">{t("eval.offline")}</p>}
      </div>

      <section className="dims">
        <h2 className="section-title">{t("results.dimensions")}</h2>
        <DimBar label={t("results.content")} d={ev.dimensions.content} reduce={prefersReducedMotion} />
        <DimBar label={t("results.delivery")} d={ev.dimensions.delivery} reduce={prefersReducedMotion} />
        <DimBar label={t("results.time")} d={ev.dimensions.time} reduce={prefersReducedMotion} />
      </section>

      <section className="coaching">
        <h2 className="section-title">{t("results.coaching")}</h2>

        <CoachBlock title={t("results.worked")} items={ev.coaching.worked} tone="good" />
        <CoachBlock title={t("results.missing")} items={ev.coaching.missing} tone="warn" />

        <div className="coach-block">
          <h3>{t("results.better")}</h3>
          {ev.coaching.betterPhrasings.map((p, i) => (
            <blockquote key={i} className="phrasing">"{p}"</blockquote>
          ))}
        </div>

        <div className="focus-box">
          <span className="focus-label">{t("results.focus")}</span>
          {ev.coaching.focusNext}
        </div>
      </section>

      <section className="compare">
        <details className="answer-box">
          <summary>{t("results.yourAnswer")}</summary>
          <p>{attempt.transcript || "—"}</p>
        </details>
        <details className="answer-box model" open>
          <summary>{t("results.model")}</summary>
          <p>{ch?.modelAnswer[locale]}</p>
        </details>
      </section>

      <div className="result-actions">
        <button
          className="btn ghost"
          onClick={() => go({ name: "scenario", challengeId: attempt.challengeId })}
        >
          ↻ {t("results.retry")}
        </button>
        <button className="btn primary" onClick={() => go({ name: "scenario", challengeId: next.id })}>
          {t("results.next")} →
        </button>
        <button className="btn ghost" onClick={() => go({ name: "library" })}>
          {t("results.library")}
        </button>
      </div>
    </div>
  );
}

function DimBar({
  label,
  d,
  reduce,
}: {
  label: string;
  d: { score: number; justification: string };
  reduce: boolean;
}) {
  const [w, setW] = useState(reduce ? d.score : 0);
  useEffect(() => {
    if (reduce) return;
    const id = requestAnimationFrame(() => setW(d.score));
    return () => cancelAnimationFrame(id);
  }, [d.score, reduce]);
  const color = d.score >= 80 ? "#22c55e" : d.score >= 60 ? "#eab308" : "#ef4444";
  return (
    <div className="dimbar">
      <div className="dimbar-head">
        <span>{label}</span>
        <span className="dim-score">{d.score}</span>
      </div>
      <div className="dimbar-track">
        <div className="dimbar-fill" style={{ width: `${w}%`, background: color }} />
      </div>
      <div className="dim-just muted small">{d.justification}</div>
    </div>
  );
}

function CoachBlock({ title, items, tone }: { title: string; items: string[]; tone: "good" | "warn" }) {
  return (
    <div className="coach-block">
      <h3>{title}</h3>
      <ul className={`coach-list ${tone}`}>
        {items.map((it, i) => (
          <li key={i}>{it}</li>
        ))}
      </ul>
    </div>
  );
}

function useCountUp(target: number, reduce: boolean): number {
  const [val, setVal] = useState(reduce ? target : 0);
  useEffect(() => {
    if (reduce) {
      setVal(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const dur = 800;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, reduce]);
  return val;
}

// Adds prefers-reduced-motion awareness on top of the app store.
function useAppSafe() {
  const app = useApp();
  const prefersReducedMotion =
    typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  return { ...app, prefersReducedMotion: Boolean(prefersReducedMotion) };
}
