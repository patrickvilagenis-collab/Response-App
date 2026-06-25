import { useMemo, useState } from "react";
import { useApp } from "../state/store";
import { CHALLENGES } from "../data/challenges";
import { computeStats } from "../lib/stats";
import { SceneMedia } from "../components/SceneMedia";
import { WarmUpBanner } from "../components/WarmUpBanner";
import { TRACKS, tracksFor, challengesInTrack, type TrackId } from "../lib/tracks";
import { SITUATIONS, situationOf, levelOf, LEVELS, type Situation } from "../lib/facets";
import { DEPARTMENTS, challengeDept } from "../data/departments";
import type { Challenge, RoleLevel, Department } from "../types";

export function LibraryScreen() {
  const { t, locale, attempts, go, route, profile } = useApp();
  const stats = computeStats(attempts);

  const initialTrack = (route.name === "library" && route.track ? route.track : "all") as TrackId | "all";
  const [track, setTrack] = useState<TrackId | "all">(initialTrack);
  const [situation, setSituation] = useState<Situation | "all">("all");
  const [level, setLevel] = useState<RoleLevel | "all">("all");
  // Default the area filter to what the user practises most, if known.
  const [dept, setDept] = useState<Department | "all">(profile?.focus ?? profile?.department ?? "all");
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const filtered = useMemo(
    () =>
      CHALLENGES.filter(
        (c) =>
          (dept === "all" || challengeDept(c) === dept) &&
          (track === "all" || tracksFor(c).includes(track)) &&
          (situation === "all" || situationOf(c) === situation) &&
          (level === "all" || levelOf(c.difficulty) === level) &&
          (q === "" || (c.scenario[locale] ?? "").toLowerCase().includes(q))
      ),
    [dept, track, situation, level, q, locale]
  );

  const noFilters = dept === "all" && track === "all" && situation === "all" && level === "all" && q === "";

  function card(c: Challenge) {
    return (
      <button key={c.id} className="pcard" onClick={() => go({ name: "scenario", challengeId: c.id })}>
        <div className="pcard-cover">
          <SceneMedia scene={c.media.scene} alt={c.media.alt[locale] ?? ""} seed={c.id} />
          <div className="pcard-cover-grad" />
          <span className="pcard-situation">{t(`situation.${situationOf(c)}`)}</span>
          {stats.clearedIds.has(c.id) && <span className="pcard-cleared">✓</span>}
        </div>
        <div className="pcard-body">
          <span className="pcard-level">{t(`lvl.${levelOf(c.difficulty)}`)}</span>
          <p className="pcard-text">{trim(c.scenario[locale], 110)}</p>
          <span className="pcard-cta">{t("library.start")} →</span>
        </div>
      </button>
    );
  }

  return (
    <div className="page practice">
      <div className="hero">
        <span className="eyebrow gold">{t("library.eyebrow")}</span>
        <h1>{t("library.title")}</h1>
        <p className="muted">{t("library.subtitle")}</p>
      </div>

      <input
        className="practice-search"
        placeholder={"🔍 " + t("library.search")}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* Area / department chips — the primary axis */}
      <div className="chip-scroll">
        <button className={`sit-chip ${dept === "all" ? "active" : ""}`} onClick={() => setDept("all")}>
          {t("library.allAreas")}
        </button>
        {DEPARTMENTS.map((d) => (
          <button
            key={d.key}
            className={`sit-chip ${dept === d.key ? "active" : ""}`}
            onClick={() => setDept((cur) => (cur === d.key ? "all" : d.key))}
          >
            <span>{d.icon}</span> {t(d.labelKey)}
          </button>
        ))}
      </div>

      {/* Situation-first chips */}
      <div className="chip-scroll">
        <button className={`sit-chip ${situation === "all" ? "active" : ""}`} onClick={() => setSituation("all")}>
          {t("library.all")}
        </button>
        {SITUATIONS.map((s) => (
          <button
            key={s.id}
            className={`sit-chip ${situation === s.id ? "active" : ""}`}
            onClick={() => setSituation((cur) => (cur === s.id ? "all" : s.id))}
          >
            <span>{s.icon}</span> {t(`situation.${s.id}`)}
          </button>
        ))}
      </div>

      {/* Facets: level + track */}
      <div className="facet-row">
        <span className="facet-label">{t("facet.level")}</span>
        <div className="facet-pills">
          <button className={`facet-pill ${level === "all" ? "active" : ""}`} onClick={() => setLevel("all")}>
            {t("library.all")}
          </button>
          {LEVELS.map((l) => (
            <button key={l} className={`facet-pill ${level === l ? "active" : ""}`} onClick={() => setLevel(l)}>
              {t(`lvl.${l}`)}
            </button>
          ))}
        </div>
      </div>
      <div className="facet-row">
        <span className="facet-label">{t("facet.track")}</span>
        <div className="facet-pills">
          <button className={`facet-pill ${track === "all" ? "active" : ""}`} onClick={() => setTrack("all")}>
            {t("library.all")}
          </button>
          {TRACKS.map((tr) => (
            <button key={tr.id} className={`facet-pill ${track === tr.id ? "active" : ""}`} onClick={() => setTrack(tr.id)}>
              <span className="track-chip-icon">{tr.icon}</span> {t(`track.${tr.id}`)}
            </button>
          ))}
        </div>
      </div>

      <WarmUpBanner />

      {noFilters ? (
        // Thematic rails when nothing is filtered
        TRACKS.map((tr) => {
          const items = challengesInTrack(tr.id);
          if (items.length === 0) return null;
          return (
            <section key={tr.id} className="rail">
              <div className="rail-head">
                <h2 className="rail-title">
                  <span className="track-chip-icon">{tr.icon}</span> {t(`track.${tr.id}`)}
                </h2>
                <button className="link-btn" onClick={() => setTrack(tr.id)}>{t("home.seeAll")} →</button>
              </div>
              <div className="rail-track">{items.map(card)}</div>
            </section>
          );
        })
      ) : filtered.length === 0 ? (
        <p className="muted practice-empty">{t("library.noResults")}</p>
      ) : (
        <div className="pcard-grid">{filtered.map(card)}</div>
      )}
    </div>
  );
}

function trim(s: string | undefined, n: number): string {
  if (!s) return "";
  return s.length > n ? s.slice(0, n).trimEnd() + "…" : s;
}
