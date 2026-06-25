import { useMemo, useState } from "react";
import { useApp } from "../state/store";
import type { Route } from "../state/store";
import { FRAMEWORK, SCALE, behaviorLabel, behaviorPillar, pillarAverages } from "../data/leadershipFramework";
import { generateDevelopmentPlan, scenariosForBehavior } from "../lib/leadership";
import { bestAttemptsById } from "../lib/stats";
import { levelOf } from "../lib/facets";
import type { Attempt, DevPlan, Locale, PlanSnapshot } from "../types";

const PILLAR_NAME: Record<string, string> = { elevate: "Elevate", engage: "Engage", execute: "Execute" };

function scoreColor(score: number): string {
  return score >= 4 ? "#16a34a" : score === 3 ? "#eab308" : "#ef4444";
}

export function FrameworkScreen() {
  const { t, locale, attempts, profile, updateProfile, go } = useApp();
  const plan = profile?.devPlan ?? null;
  const bestById = useMemo(() => bestAttemptsById(attempts), [attempts]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [showRef, setShowRef] = useState(!plan);

  async function analyze() {
    setBusy(true);
    setError("");
    try {
      const dp = await generateDevelopmentPlan(attempts, profile, locale);
      const history = [...(profile?.devPlanHistory ?? []), { generatedAt: dp.generatedAt, ratings: dp.ratings }].slice(-12);
      updateProfile({ devPlan: dp, devPlanHistory: history });
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

      {plan && <PlanView plan={plan} locale={locale} t={t} go={go} bestById={bestById} />}

      {(profile?.devPlanHistory?.length ?? 0) >= 2 && (
        <EvolutionView history={profile!.devPlanHistory!} locale={locale} t={t} />
      )}

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

function PlanView({
  plan,
  locale,
  t,
  go,
  bestById,
}: {
  plan: DevPlan;
  locale: Locale;
  t: (k: string) => string;
  go: (r: Route) => void;
  bestById: Map<string, Attempt>;
}) {
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
          {plan.growthAreas.map((g) => {
            const scenarios = scenariosForBehavior(g.behavior, bestById, 3);
            return (
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
                {scenarios.length > 0 && (
                  <div className="fw-package">
                    <span className="fw-col-label">{t("framework.practiceThese")}</span>
                    <div className="fw-package-list">
                      {scenarios.map((c) => (
                        <button
                          key={c.id}
                          className="fw-scenario"
                          onClick={() => go({ name: "scenario", challengeId: c.id })}
                        >
                          <span className="fw-scenario-text">{trim(c.scenario[locale], 90)}</span>
                          <span className="fw-scenario-meta">
                            {t(`lvl.${levelOf(c.difficulty)}`)}
                            {(bestById.get(c.id)?.evaluation.final ?? -1) >= 55 && <span className="fw-scenario-done"> · ✓</span>}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </section>
      )}
    </>
  );
}

function trim(s: string | undefined, n: number): string {
  if (!s) return "";
  return s.length > n ? s.slice(0, n).trimEnd() + "…" : s;
}

function avgColor(n: number | null): string {
  if (n == null) return "var(--muted)";
  return n >= 4 ? "#16a34a" : n >= 3 ? "#eab308" : "#ef4444";
}

function EvolutionView({ history, locale, t }: { history: PlanSnapshot[]; locale: Locale; t: (k: string) => string }) {
  const rows = history.map((h) => ({ at: h.generatedAt, avg: pillarAverages(h.ratings) }));
  const display = [...rows].reverse(); // most recent first
  const fmt = (n: number | null) => (n == null ? "—" : n.toFixed(1));
  return (
    <section className="fw-section">
      <h2 className="section-title">{t("framework.evolutionTitle")}</h2>
      <div className="fw-evo">
        <div className="fw-evo-row head">
          <span className="fw-evo-date" />
          <span>Elevate</span>
          <span>Engage</span>
          <span>Execute</span>
          <span>{t("framework.overall")}</span>
        </div>
        {display.map((r, i) => {
          const prev = display[i + 1]; // older entry
          const delta =
            r.avg.overall != null && prev?.avg.overall != null ? r.avg.overall - prev.avg.overall : null;
          return (
            <div key={r.at} className="fw-evo-row">
              <span className="fw-evo-date">{new Date(r.at).toLocaleDateString(locale)}</span>
              <span style={{ color: avgColor(r.avg.elevate) }}>{fmt(r.avg.elevate)}</span>
              <span style={{ color: avgColor(r.avg.engage) }}>{fmt(r.avg.engage)}</span>
              <span style={{ color: avgColor(r.avg.execute) }}>{fmt(r.avg.execute)}</span>
              <span className="fw-evo-overall">
                {fmt(r.avg.overall)}
                {delta != null && delta !== 0 && (
                  <span className={delta > 0 ? "fw-up" : "fw-down"}>
                    {" "}
                    {delta > 0 ? "▲" : "▼"}
                    {Math.abs(delta).toFixed(1)}
                  </span>
                )}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
