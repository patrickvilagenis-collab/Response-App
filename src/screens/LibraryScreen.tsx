import { useMemo, useState } from "react";
import { useApp } from "../state/store";
import { CHALLENGES } from "../data/challenges";
import { computeStats } from "../lib/stats";
import { SceneMedia } from "../components/SceneMedia";
import { WarmUpBanner } from "../components/WarmUpBanner";
import { situationOf, levelOf, LEVELS } from "../lib/facets";
import { DEPARTMENTS, challengeDept } from "../data/departments";
import type { Challenge, RoleLevel, Department } from "../types";

export function LibraryScreen() {
  const { t, locale, attempts, go, profile, route } = useApp();
  const stats = computeStats(attempts);

  // Area filter: an explicit choice from navigation wins, else the user's focus.
  const routeDept = route.name === "library" ? (route.dept as Department | undefined) : undefined;
  const [dept, setDept] = useState<Department | "all">(routeDept ?? profile?.focus ?? profile?.department ?? "all");
  const [level, setLevel] = useState<RoleLevel | "all">("all");
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const filtered = useMemo(
    () =>
      CHALLENGES.filter(
        (c) =>
          (dept === "all" || challengeDept(c) === dept) &&
          (level === "all" || levelOf(c.difficulty) === level) &&
          (q === "" || (c.scenario[locale] ?? "").toLowerCase().includes(q))
      ),
    [dept, level, q, locale]
  );

  const noFilters = dept === "all" && level === "all" && q === "";

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
        placeholder={t("library.search")}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* Area / department — the single topical axis */}
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
            {t(d.labelKey)}
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
        // When nothing is filtered, browse by area
        DEPARTMENTS.map((d) => {
          const items = CHALLENGES.filter((c) => challengeDept(c) === d.key);
          if (items.length === 0) return null;
          return (
            <section key={d.key} className="rail">
              <div className="rail-head">
                <h2 className="rail-title">{t(d.labelKey)}</h2>
                <button className="link-btn" onClick={() => setDept(d.key)}>{t("home.seeAll")} →</button>
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
