import { useMemo, useState } from "react";
import { useApp } from "../state/store";
import { CHALLENGES } from "../data/challenges";
import { computeStats } from "../lib/stats";
import { SceneMedia } from "../components/SceneMedia";
import { WarmUpBanner } from "../components/WarmUpBanner";
import { TRACKS, tracksFor, type TrackId } from "../lib/tracks";

export function LibraryScreen() {
  const { t, locale, attempts, go, route } = useApp();
  const stats = computeStats(attempts);
  const initialTrack = (route.name === "library" && route.track ? route.track : "all") as TrackId | "all";
  const [track, setTrack] = useState<TrackId | "all">(initialTrack);

  const list = useMemo(
    () => CHALLENGES.filter((c) => track === "all" || tracksFor(c).includes(track)),
    [track]
  );

  return (
    <div className="page library">
      <div className="hero">
        <span className="eyebrow gold">{t("library.eyebrow")}</span>
        <h1>{t("library.title")}</h1>
        <p className="muted">{t("library.subtitle")}</p>
      </div>

      <div className="track-filter">
        <button className={`track-pill ${track === "all" ? "active" : ""}`} onClick={() => setTrack("all")}>
          {t("library.all")}
        </button>
        {TRACKS.map((tr) => (
          <button
            key={tr.id}
            className={`track-pill ${track === tr.id ? "active" : ""}`}
            onClick={() => setTrack(tr.id)}
          >
            <span className="track-chip-icon">{tr.icon}</span> {t(`track.${tr.id}`)}
          </button>
        ))}
      </div>

      {(track === "all" || track === "pressure") && <WarmUpBanner />}

      <div className="card-grid">
        {list.map((c) => (
          <button key={c.id} className="ch-card" onClick={() => go({ name: "scenario", challengeId: c.id })}>
            <div className="ch-media">
              <SceneMedia scene={c.media.scene} alt={c.media.alt[locale] ?? ""} />
              {stats.clearedIds.has(c.id) && <span className="cleared-badge">✓ {t("library.cleared")}</span>}
              <span className={`tile-diff d${c.difficulty}`}>{t(`diff.${c.difficulty}`)}</span>
            </div>
            <div className="ch-body">
              <div className="ch-cat">{t(`cat.${c.category}`)}</div>
              <p className="ch-scenario">{trim(c.scenario[locale], 116)}</p>
              <span className="ch-cta">{t("library.start")} →</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function trim(s: string | undefined, n: number): string {
  if (!s) return "";
  return s.length > n ? s.slice(0, n).trimEnd() + "…" : s;
}
