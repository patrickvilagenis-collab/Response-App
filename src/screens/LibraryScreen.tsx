import { useMemo, useState } from "react";
import { useApp } from "../state/store";
import { CHALLENGES } from "../data/challenges";
import { computeStats } from "../lib/stats";
import { SceneMedia } from "../components/SceneMedia";
import type { Difficulty } from "../types";

export function LibraryScreen() {
  const { t, locale, attempts, go } = useApp();
  const stats = computeStats(attempts);
  const [diff, setDiff] = useState<Difficulty | "all">("all");

  const list = useMemo(
    () => CHALLENGES.filter((c) => diff === "all" || c.difficulty === diff),
    [diff]
  );

  const diffs: (Difficulty | "all")[] = ["all", 1, 2, 3, 4];

  return (
    <div className="page library">
      <div className="hero">
        <h1>{t("library.title")}</h1>
        <p className="muted">{t("library.subtitle")}</p>
      </div>

      <div className="filterbar">
        {diffs.map((d) => (
          <button
            key={d}
            className={`filter ${diff === d ? "active" : ""}`}
            onClick={() => setDiff(d)}
          >
            {d === "all" ? t("library.all") : t(`diff.${d}`)}
          </button>
        ))}
      </div>

      <div className="card-grid">
        {list.map((c) => (
          <div key={c.id} className="ch-card">
            <div className="ch-media">
              <SceneMedia scene={c.media.scene} alt={c.media.alt[locale] ?? ""} />
              {stats.clearedIds.has(c.id) && <span className="cleared-badge">✓ {t("library.cleared")}</span>}
            </div>
            <div className="ch-body">
              <div className="tagrow">
                <span className="tag ghost">{t(`type.${c.type}`)}</span>
                <span className={`tag diff d${c.difficulty}`}>{t(`diff.${c.difficulty}`)}</span>
              </div>
              <div className="ch-cat">{t(`cat.${c.category}`)}</div>
              <p className="ch-scenario">{c.scenario[locale]?.slice(0, 110)}…</p>
              <button className="btn primary block" onClick={() => go({ name: "scenario", challengeId: c.id })}>
                {t("library.start")}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
