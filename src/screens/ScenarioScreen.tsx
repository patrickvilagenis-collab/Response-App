import { useEffect, useState } from "react";
import { useApp } from "../state/store";
import { getChallenge } from "../data/challenges";
import { SceneMedia } from "../components/SceneMedia";

export function ScenarioScreen({ challengeId }: { challengeId: string }) {
  const { t, locale, go } = useApp();
  const ch = getChallenge(challengeId);
  // Reveal sequence: 0 media → 1 role caption → 2 scenario text → 3 play enabled
  const [stage, setStage] = useState(0);

  useEffect(() => {
    setStage(0);
    const timers = [
      setTimeout(() => setStage(1), 350), // media settled, role caption
      setTimeout(() => setStage(2), 750), // scenario text
      setTimeout(() => setStage(3), 1100), // play enabled
    ];
    return () => timers.forEach(clearTimeout);
  }, [challengeId]);

  if (!ch) return null;

  return (
    <div className="page scenario">
      <button className="back" onClick={() => go({ name: "library" })}>
        ← {t("scenario.back")}
      </button>

      <div className="scenario-stage">
        <div className="scenario-media">
          <SceneMedia scene={ch.media.scene} alt={ch.media.alt[locale] ?? ""} />
          {stage < 1 && <div className="media-loading">{t("scenario.loadingMedia")}</div>}
        </div>

        <div className="tagrow center">
          <span className="tag">{t(`cat.${ch.category}`)}</span>
          <span className="tag ghost">{t(`type.${ch.type}`)}</span>
          <span className={`tag diff d${ch.difficulty}`}>{t(`diff.${ch.difficulty}`)}</span>
        </div>

        <div className={`role-caption reveal ${stage >= 1 ? "in" : ""}`}>
          <span className="role-label">{t("scenario.role")}</span>
          {ch.roleCaption[locale]}
        </div>

        <p className={`scenario-text reveal ${stage >= 2 ? "in" : ""}`}>{ch.scenario[locale]}</p>

        <div className={`reveal ${stage >= 3 ? "in" : ""}`}>
          <p className="muted small center read-hint">{t("scenario.readFirst")}</p>
          <button
            className="btn play"
            disabled={stage < 3}
            onClick={() => go({ name: "response", challengeId })}
          >
            <span className="play-icon">▶</span> {t("scenario.play")}
          </button>
        </div>
      </div>
    </div>
  );
}
