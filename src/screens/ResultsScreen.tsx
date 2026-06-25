import { useEffect, useState } from "react";
import { useApp } from "../state/store";
import { getChallenge } from "../data/challenges";
// (helpers below)
import { BAND_COLORS, MAX_RESPONSE_SEC } from "../lib/scoring";
import { recommend, computeStats } from "../lib/stats";
import { generateDevelopmentPlan } from "../lib/leadership";

export function ResultsScreen({ attemptId }: { attemptId: string }) {
  const { t, locale, attempts, go, profile, updateProfile, prefersReducedMotion } = useAppSafe();
  const [lbusy, setLbusy] = useState(false);
  const [lerr, setLerr] = useState("");
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

  async function buildLeadershipPlan() {
    setLbusy(true);
    setLerr("");
    try {
      const dp = await generateDevelopmentPlan(attempts, profile, locale);
      updateProfile({ devPlan: dp });
      go({ name: "framework" });
    } catch (e) {
      const m = e instanceof Error ? e.message : String(e);
      setLerr(m.includes("503") ? t("framework.noKey") : t("framework.aiError"));
    } finally {
      setLbusy(false);
    }
  }

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

      <section className="your-response">
        <h2 className="section-title">{t("results.yourAnswer")}</h2>
        <div className="answer-card you">{attempt.transcript || "—"}</div>
      </section>

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

        {ev.coaching.improvedVersion && (
          <div className="coach-block">
            <h3>{t("results.improved")}</h3>
            <p className="muted small">{t("results.improvedHint")}</p>
            <div className="answer-card improved">{ev.coaching.improvedVersion}</div>
          </div>
        )}

        <div className="focus-box">
          <span className="focus-label">{t("results.focus")}</span>
          {ev.coaching.focusNext}
        </div>
      </section>

      <section className="compare">
        <div className="answer-box model">
          <div className="answer-title">{t("results.model")}</div>
          <p>{ch?.modelAnswer[locale]}</p>
        </div>
      </section>

      <section className="result-leadership">
        <div className="result-leadership-text">
          <strong>{t("results.leadershipTitle")}</strong>
          <span className="muted small">{t("results.leadershipSub")}</span>
        </div>
        <button className="btn primary sm" onClick={buildLeadershipPlan} disabled={lbusy}>
          {lbusy ? t("framework.analyzing") : t("results.leadershipCta")}
        </button>
        {lerr && <p className="error small">{lerr}</p>}
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
