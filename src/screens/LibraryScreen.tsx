import { useMemo, useState } from "react";
import { useApp } from "../state/store";
import { CHALLENGES } from "../data/challenges";
import { bestAttemptsById } from "../lib/stats";
import { bandFor, BAND_COLORS } from "../lib/scoring";
import { SceneMedia } from "../components/SceneMedia";
import { WarmUpBanner } from "../components/WarmUpBanner";
import { SITUATIONS, situationOf, levelOf, LEVELS, type Situation } from "../lib/facets";
import type { Challenge, RoleLevel } from "../types";

export function LibraryScreen() {
  const { t, locale, attempts, go, profile, route } = useApp();
  const bestById = useMemo(() => bestAttemptsById(attempts), [attempts]);
  const PASS = 55; // adequate or better counts as passed

  const routeSituation = route.name === "library" ? (route.situation as Situation | undefined) : undefined;
  const [situation, setSituation] = useState<Situation | "all">(routeSituation ?? "all");
  const [level, setLevel] = useState<RoleLevel | "all">("all");
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const filtered = useMemo(
    () =>
      CHALLENGES.filter(
        (c) =>
          (situation === "all" || situationOf(c) === situation) &&
          (level === "all" || levelOf(c.difficulty) === level) &&
          (q === "" || (c.scenario[locale] ?? "").toLowerCase().includes(q))
      ),
    [situation, level, q, locale]
  );

  const noFilters = situation === "all" && level === "all" && q === "";
  // Bias the no-filter ordering of situation rails toward the user's focus area.
  const railOrder = useMemo(() => orderSituationsByFocus(profile?.focus ?? profile?.department), [profile]);

  function card(c: Challenge) {
    const best = bestById.get(c.id);
    const score = best ? best.evaluation.final : null;
    const passed = score !== null && score >= PASS;
    return (
      <button
        key={c.id}
        className={`pcard ${best ? "done" : ""}`}
        onClick={() => go({ name: "scenario", challengeId: c.id })}
      >
        <div className="pcard-cover">
          <SceneMedia scene={c.media.scene} alt={c.media.alt[locale] ?? ""} seed={c.id} />
          <div className="pcard-cover-grad" />
          <span className="pcard-situation">{t(`situation.${situationOf(c)}`)}</span>
          {score !== null && (
            <span className="pcard-score" style={{ background: BAND_COLORS[bandFor(score)] }}>
              {passed ? "✓ " : ""}{score}%
            </span>
          )}
        </div>
        <div className="pcard-body">
          <div className="pcard-meta">
            <span className="pcard-level">{t(`lvl.${levelOf(c.difficulty)}`)}</span>
            {best && (
              <span className={`pcard-status ${passed ? "ok" : "review"}`}>
                {passed ? t("library.passed") : t("library.review")}
              </span>
            )}
          </div>
          <p className="pcard-text">{trim(c.scenario[locale], 110)}</p>
          <span className="pcard-cta">{best ? t("library.retry") : t("library.start")} →</span>
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
        placeholder={t("library.search")}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* Situation — the kind of moment you want to rehearse */}
      <div className="seg-filter">
        <button className={`seg-chip ${situation === "all" ? "active" : ""}`} onClick={() => setSituation("all")}>
          {t("library.all")}
        </button>
        {SITUATIONS.map((s) => (
          <button
            key={s.id}
            className={`seg-chip ${situation === s.id ? "active" : ""}`}
            onClick={() => setSituation((cur) => (cur === s.id ? "all" : s.id))}
          >
            {t(`situation.${s.id}`)}
          </button>
        ))}
      </div>

      {/* Level */}
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

      <WarmUpBanner />

      {noFilters ? (
        // When nothing is filtered, browse by situation
        railOrder.map((sit) => {
          const items = CHALLENGES.filter((c) => situationOf(c) === sit);
          if (items.length === 0) return null;
          return (
            <section key={sit} className="rail">
              <div className="rail-head">
                <h2 className="rail-title">{t(`situation.${sit}`)}</h2>
                <button className="link-btn" onClick={() => setSituation(sit)}>{t("home.seeAll")} →</button>
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

// The situations most relevant to a given area float to the top of the rails.
function orderSituationsByFocus(focus?: string): Situation[] {
  const all = SITUATIONS.map((s) => s.id);
  const priority: Record<string, Situation[]> = {
    commercial: ["client", "conflict", "board"],
    customer: ["client", "conflict", "crisis"],
    people: ["one_on_one", "feedback", "conflict"],
    finance: ["board", "conflict", "crisis"],
    technology: ["crisis", "board", "conflict"],
    operations: ["crisis", "board", "conflict"],
    legal: ["board", "conflict", "client"],
    leadership: ["board", "conflict", "one_on_one"],
  };
  const pref = (focus && priority[focus]) || [];
  return [...pref, ...all.filter((s) => !pref.includes(s))];
}

function trim(s: string | undefined, n: number): string {
  if (!s) return "";
  return s.length > n ? s.slice(0, n).trimEnd() + "…" : s;
}
