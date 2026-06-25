import { useApp } from "../state/store";
import { computeStats, recommend, randomChallenge } from "../lib/stats";
import { SceneMedia } from "../components/SceneMedia";
import { challengesInTrack, type TrackId } from "../lib/tracks";
import { DEPARTMENTS } from "../data/departments";
import { BAND_COLORS, bandFor } from "../lib/scoring";
import { CHALLENGES, getChallenge } from "../data/challenges";
import type { Challenge, Profile } from "../types";

const CHALLENGE_IDS = CHALLENGES.map((c) => c.id);
const PREF_DIFF: Record<string, number> = { ic: 2, manager: 2, director: 3, exec: 4 };

export function HomeScreen() {
  const { t, locale, profile, attempts, go } = useApp();
  const stats = computeStats(attempts);
  const fallback = recommend(attempts, stats, profile?.focus ?? profile?.department);
  const personalized = personalize(profile, stats.clearedIds);
  const rec = personalized[0] ?? fallback;
  const recommendedThree = personalized.length >= 3 ? personalized.slice(0, 3) : pickThree(rec.id);

  const goalLabel = profile?.goalTrack ? t(`track.${profile.goalTrack}`) : t(`cat.${rec.category}`);
  const dimLabel = stats.weakestDimension ? t(`dim.${stats.weakestDimension}`) : "—";

  return (
    <div className="page home">
      <div className="home-greeting">
        <span className="eyebrow gold">
          {t("home.eyebrow")}
          {profile?.segment === "company" && <span className="seg-badge">{t("home.viaCompany")}</span>}
        </span>
        <h1>
          {t("home.welcome")} <span className="grad">{profile?.displayName}</span>
        </h1>
        <p className="muted">
          {profile?.goalTrack ? t("home.focusOn") + " " + goalLabel + "." : t("home.subtitle")}
        </p>
      </div>

      {/* Two velocities */}
      <div className="velocity-row">
        <button className="velocity quick" onClick={() => go({ name: "warmup" })}>
          <span className="velocity-icon">⚡</span>
          <span className="velocity-body">
            <strong>{t("home.vQuickTitle")}</strong>
            <span className="muted small">{t("home.vQuickSub")}</span>
          </span>
        </button>
        <button className="velocity deep" onClick={() => go({ name: "scenario", challengeId: rec.id })}>
          <span className="velocity-icon">▶</span>
          <span className="velocity-body">
            <strong>{t("home.vDeepTitle")}</strong>
            <span className="muted small">{goalLabel}</span>
          </span>
        </button>
      </div>

      {/* Browse by area */}
      <div className="track-head">
        <h2 className="section-title">{t("home.areas")}</h2>
        <button className="link-btn" onClick={() => go({ name: "library" })}>{t("home.seeAll")} →</button>
      </div>
      <div className="track-chips">
        {DEPARTMENTS.map((d) => (
          <button key={d.key} className="track-chip" onClick={() => go({ name: "library", dept: d.key })}>
            {t(d.labelKey)}
          </button>
        ))}
      </div>

      {/* Recommended today */}
      <h2 className="section-title">{t("home.forYou")}</h2>
      <div className="rec-grid">
        {recommendedThree.map((c) => (
          <button key={c.id} className="rec-tile" onClick={() => go({ name: "scenario", challengeId: c.id })}>
            <div className="rec-tile-media">
              <SceneMedia scene={c.media.scene} alt={c.media.alt[locale] ?? ""} seed={c.id} />
              <span className={`tile-diff d${c.difficulty}`}>{t(`diff.${c.difficulty}`)}</span>
            </div>
            <div className="rec-tile-body">
              <span className="rec-tile-cat">{t(`cat.${c.category}`)}</span>
              <p className="rec-tile-text">{trim(c.scenario[locale], 92)}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Progress */}
      <h2 className="section-title">{t("home.progress")}</h2>
      {attempts.length === 0 ? (
        <p className="muted">{t("home.noStats")}</p>
      ) : (
        <>
          <div className="progress-strip">
            <ProgressStat value={`${stats.avgFinal}%`} label={t("home.stats.avg")} accent />
            <ProgressStat value={String(stats.streakDays)} label={t("home.stats.streak")} />
            <ProgressStat value={String(stats.total)} label={t("home.stats.attempts")} />
            <ProgressStat value={dimLabel} label={t("home.weakest")} />
          </div>
          <div className="recent-list">
            {attempts.slice(0, 4).map((a) => {
              const ch = getChallenge(a.challengeId);
              const band = bandFor(a.evaluation.final);
              return (
                <button key={a.id} className="recent-row" onClick={() => go({ name: "results", attemptId: a.id })}>
                  <span className="score-pill" style={{ background: BAND_COLORS[band] }}>{a.evaluation.final}%</span>
                  <span className="recent-text">{trim(ch?.scenario[locale], 70)}</span>
                  <span className="muted small">{a.responseTimeSec.toFixed(0)}s</span>
                </button>
              );
            })}
          </div>
        </>
      )}

      <button className="surprise-link" onClick={() => go({ name: "scenario", challengeId: randomChallenge().id })}>
        🎲 {t("home.surprise")}
      </button>
    </div>
  );
}

function ProgressStat({ value, label, accent }: { value: string; label: string; accent?: boolean }) {
  return (
    <div className="pstat">
      <div className={`pstat-value ${accent ? "accent" : ""}`}>{value}</div>
      <div className="pstat-label">{label}</div>
    </div>
  );
}

/** Order challenges by the user's goal track + role-level difficulty, uncleared first. */
function personalize(profile: Profile | null, cleared: Set<string>): Challenge[] {
  if (!profile?.goalTrack) return [];
  const pool = challengesInTrack(profile.goalTrack as TrackId);
  if (pool.length === 0) return [];
  const pref = profile.roleLevel ? PREF_DIFF[profile.roleLevel] : 2;
  return [...pool].sort((a, b) => {
    const ac = cleared.has(a.id) ? 1 : 0;
    const bc = cleared.has(b.id) ? 1 : 0;
    if (ac !== bc) return ac - bc; // uncleared first
    return Math.abs(a.difficulty - pref) - Math.abs(b.difficulty - pref); // closest to role level
  });
}

function pickThree(recId: string) {
  const start = Math.max(0, CHALLENGE_IDS.indexOf(recId));
  const ids = [CHALLENGE_IDS[start], CHALLENGE_IDS[(start + 7) % CHALLENGE_IDS.length], CHALLENGE_IDS[(start + 13) % CHALLENGE_IDS.length]];
  return ids.map((id) => getChallenge(id)!).filter(Boolean);
}

function trim(s: string | undefined, n: number): string {
  if (!s) return "";
  return s.length > n ? s.slice(0, n).trimEnd() + "…" : s;
}
