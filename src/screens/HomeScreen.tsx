import { useApp } from "../state/store";
import { computeStats, recommend, randomChallenge } from "../lib/stats";
import { SceneMedia } from "../components/SceneMedia";
import { BAND_COLORS } from "../lib/scoring";
import { bandFor } from "../lib/scoring";
import { getChallenge } from "../data/challenges";

export function HomeScreen() {
  const { t, locale, profile, attempts, go } = useApp();
  const stats = computeStats(attempts);
  const rec = recommend(attempts, stats);

  const dimLabel = stats.weakestDimension ? t(`dim.${stats.weakestDimension}`) : "—";

  return (
    <div className="page home">
      <div className="hero">
        <h1>
          {t("home.welcome")} <span className="accent">{profile?.displayName}</span>
        </h1>
        <p className="muted">{t("home.subtitle")}</p>
      </div>

      <div className="stat-row">
        <Stat label={t("home.stats.attempts")} value={String(stats.total)} />
        <Stat label={t("home.stats.avg")} value={stats.total ? `${stats.avgFinal}%` : "—"} />
        <Stat label={t("home.stats.streak")} value={String(stats.streakDays)} />
        <Stat label={t("home.weakest")} value={dimLabel} />
      </div>

      <section className="rec-card">
        <div className="rec-media">
          <SceneMedia scene={rec.media.scene} alt={rec.media.alt[locale] ?? ""} />
        </div>
        <div className="rec-body">
          <span className="eyebrow">{t("home.recommended")}</span>
          <div className="tagrow">
            <span className="tag">{t(`cat.${rec.category}`)}</span>
            <span className="tag ghost">{t(`type.${rec.type}`)}</span>
            <span className={`tag diff d${rec.difficulty}`}>{t(`diff.${rec.difficulty}`)}</span>
          </div>
          <p className="rec-scenario">{rec.scenario[locale]}</p>
          <div className="rec-actions">
            <button className="btn primary" onClick={() => go({ name: "scenario", challengeId: rec.id })}>
              {t("home.start")}
            </button>
            <button
              className="btn ghost"
              onClick={() => go({ name: "scenario", challengeId: randomChallenge().id })}
            >
              {t("home.surprise")}
            </button>
            <button className="btn ghost" onClick={() => go({ name: "library" })}>
              {t("home.browse")}
            </button>
          </div>
        </div>
      </section>

      <section>
        <h2 className="section-title">{t("home.recent")}</h2>
        {attempts.length === 0 ? (
          <p className="muted">{t("home.noStats")}</p>
        ) : (
          <div className="recent-list">
            {attempts.slice(0, 5).map((a) => {
              const ch = getChallenge(a.challengeId);
              const band = bandFor(a.evaluation.final);
              return (
                <button
                  key={a.id}
                  className="recent-row"
                  onClick={() => go({ name: "results", attemptId: a.id })}
                >
                  <span className="score-pill" style={{ background: BAND_COLORS[band] }}>
                    {a.evaluation.final}%
                  </span>
                  <span className="recent-text">{ch?.scenario[locale]?.slice(0, 70)}…</span>
                  <span className="muted small">{a.responseTimeSec.toFixed(1)}s</span>
                </button>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="stat">
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}
