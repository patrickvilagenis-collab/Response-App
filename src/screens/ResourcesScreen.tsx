import { useState } from "react";
import { useApp } from "../state/store";
import { RESOURCES, resourceBlurb } from "../data/resources";
import type { ResourceKind } from "../data/resources";

const KIND_ICON: Record<ResourceKind, string> = {
  podcast: "🎧",
  video: "🎬",
  article: "📄",
};

const FILTERS: { key: "all" | ResourceKind; label: string }[] = [
  { key: "all", label: "resources.all" },
  { key: "video", label: "resources.kind.video" },
  { key: "podcast", label: "resources.kind.podcast" },
  { key: "article", label: "resources.kind.article" },
];

export function ResourcesScreen() {
  const { t, locale } = useApp();
  const [filter, setFilter] = useState<"all" | ResourceKind>("all");

  const list = RESOURCES.filter((r) => filter === "all" || r.kind === filter);

  return (
    <div className="page resources">
      <div className="hero">
        <span className="eyebrow">{t("resources.eyebrow")}</span>
        <h1>{t("resources.title")}</h1>
        <p className="muted">{t("resources.subtitle")}</p>
      </div>

      <div className="chips res-filters">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            className={`chip ${filter === f.key ? "active" : ""}`}
            onClick={() => setFilter(f.key)}
          >
            {t(f.label)}
          </button>
        ))}
      </div>

      <div className="res-grid">
        {list.map((r) => (
          <a key={r.url} className="res-card" href={r.url} target="_blank" rel="noopener noreferrer">
            <div className="res-icon" aria-hidden="true">{KIND_ICON[r.kind]}</div>
            <div className="res-body">
              <span className="res-kind">{t(`resources.kind.${r.kind}`)}</span>
              <h3 className="res-title">{r.title}</h3>
              <span className="res-source">{r.source}</span>
              <p className="res-blurb">{resourceBlurb(r, locale)}</p>
            </div>
            <span className="res-open" aria-hidden="true">↗</span>
          </a>
        ))}
      </div>
    </div>
  );
}
