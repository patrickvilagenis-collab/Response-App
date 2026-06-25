import { useState } from "react";
import { useApp } from "../state/store";
import { FRAMEWORK, SCALE, behaviorLabel, behaviorPillar } from "../data/leadershipFramework";
import { generateDevelopmentPlan } from "../lib/leadership";
import type { DevPlan } from "../types";

const PILLAR_NAME: Record<string, string> = { elevate: "Elevate", engage: "Engage", execute: "Execute" };

function scoreColor(score: number): string {
  return score >= 4 ? "#16a34a" : score === 3 ? "#eab308" : "#ef4444";
}

export function FrameworkScreen() {
  const { t, locale, attempts, profile, updateProfile } = useApp();
  const plan = profile?.devPlan ?? null;
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [showRef, setShowRef] = useState(!plan);

  async function analyze() {
    setBusy(true);
    setError("");
    try {
      const dp = await generateDevelopmentPlan(attempts, profile, locale);
      updateProfile({ devPlan: dp });
      setShowRef(false);
    } catch (e) {
      const m = e instanceof Error ? e.message : String(e);
      if (m.includes("503")) setError(t("framework.noKey"));
      else setError(`${t("framework.aiError")} ${m.startsWith("HTTP") ? m : ""}`.trim());
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="page framework">
      <div className="hero">
        <span className="eyebrow gold">{t("framework.eyebrow")}</span>
        <h1>{t("framework.title")}</h1>
        <p className="muted">{t("framework.subtitle")}</p>
      </div>

      {/* Analyze CTA */}
      <section className="fw-cta">
        {attempts.length === 0 ? (
          <p className="muted">{t("framework.needPractice")}</p>
        ) : (
          <>
            <button className="btn primary" onClick={analyze} disabled={busy}>
              {busy ? t("framework.analyzing") : plan ? t("framework.update") : t("framework.analyze")}
            </button>
            {plan && (
              <span className="muted small fw-basedon">
                {t("framework.basedOnPre")} {plan.basedOn} {t("framework.basedOnPost")}
              </span>
            )}
          </>
        )}
        {error && <p className="error fw-error">{error}</p>}
      </section>

      {plan && <PlanView plan={plan} locale={locale} t={t} />}

      {/* Framework reference */}
      <section className="fw-ref">
        <button className="fw-ref-toggle" onClick={() => setShowRef((s) => !s)}>
          {showRef ? "▾" : "▸"} {t("framework.frameworkTitle")}
        </button>
        {showRef && (
          <>
            <div className="fw-pillars">
              {FRAMEWORK.map((p) => (
                <div key={p.id} className={`fw-pillar ${p.id}`}>
                  <h3>{PILLAR_NAME[p.id]}</h3>
                  <span className="fw-pillar-sub">{p.subtitle[locale]}</span>
                  {p.competencies.map((c) => (
                    <div key={c.id} className="fw-comp">
                      <span className="fw-comp-label">{c.label[locale]}</span>
                      <ul>
                        {c.behaviors.map((b) => (
                          <li key={b.id}>{b.label[locale]}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <h4 className="fw-scale-title">{t("framework.scaleTitle")}</h4>
            <ol className="fw-scale">
              {SCALE.map((s) => (
                <li key={s.level}>
                  <strong>{s.level} · {s.label[locale]}</strong>
                  <span className="muted small"> — {s.desc[locale]}</span>
                </li>
              ))}
            </ol>
          </>
        )}
      </section>
    </div>
  );
}

function PlanView({ plan, locale, t }: { plan: DevPlan; locale: import("../types").Locale; t: (k: string) => string }) {
  const ratingsByPillar = FRAMEWORK.map((p) => ({
    pillar: p,
    rows: plan.ratings.filter((r) => behaviorPillar(r.behavior) === p.id),
  })).filter((g) => g.rows.length > 0);

  return (
    <>
      {/* Current standing */}
      {plan.ratings.length > 0 && (
        <section className="fw-section">
          <h2 className="section-title">{t("framework.ratingsTitle")}</h2>
          {ratingsByPillar.map(({ pillar, rows }) => (
            <div key={pillar.id} className="fw-rate-group">
              <span className={`fw-pill-tag ${pillar.id}`}>{PILLAR_NAME[pillar.id]}</span>
              {rows.map((r) => (
                <div key={r.behavior} className="fw-rate">
                  <div className="fw-rate-head">
                    <span className="fw-rate-name">{behaviorLabel(r.behavior, locale)}</span>
                    <span className="fw-dots">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <span
                          key={n}
                          className="fw-dot"
                          style={{ background: n <= r.score ? scoreColor(r.score) : "var(--line)" }}
                        />
                      ))}
                    </span>
                  </div>
                  {r.evidence && <p className="fw-evidence muted small">{r.evidence}</p>}
                </div>
              ))}
            </div>
          ))}
        </section>
      )}

      {/* Strengths */}
      {plan.strengths.length > 0 && (
        <section className="fw-section">
          <h2 className="section-title">{t("framework.strengthsTitle")}</h2>
          <div className="fw-strengths">
            {plan.strengths.map((b) => (
              <span key={b} className="fw-strength">✓ {behaviorLabel(b, locale)}</span>
            ))}
          </div>
        </section>
      )}

      {/* Development plan */}
      {plan.growthAreas.length > 0 && (
        <section className="fw-section">
          <h2 className="section-title">{t("framework.growthTitle")}</h2>
          {plan.growthAreas.map((g) => (
            <div key={g.behavior} className="fw-growth">
              <h3 className="fw-growth-title">{behaviorLabel(g.behavior, locale)}</h3>
              {g.why && <p className="fw-growth-why muted">{g.why}</p>}
              <div className="fw-growth-cols">
                <div className="fw-col">
                  <span className="fw-col-label">{t("framework.challenges")}</span>
                  <ul>{g.challenges.map((c, i) => <li key={i}>{c}</li>)}</ul>
                </div>
                <div className="fw-col">
                  <span className="fw-col-label">{t("framework.exercises")}</span>
                  <ul>{g.exercises.map((e, i) => <li key={i}>{e}</li>)}</ul>
                </div>
              </div>
            </div>
          ))}
        </section>
      )}
    </>
  );
}
