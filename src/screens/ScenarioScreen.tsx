import { useEffect, useState } from "react";
import { useApp } from "../state/store";
import { getChallenge } from "../data/challenges";
import { SceneMedia } from "../components/SceneMedia";

export function ScenarioScreen({ challengeId }: { challengeId: string }) {
  const { t, locale, go } = useApp();
  const ch = getChallenge(challengeId);
  // Reveal sequence: 0 media → 1 role caption → 2 scenario text → 3 play enabled
  const [stage, setStage] = useState(0);
  const [showTips, setShowTips] = useState(false);

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
      <div className="scenario-stage">
        <div className={`scenario-media reveal ${stage >= 0 ? "in" : ""}`}>
          <SceneMedia scene={ch.media.scene} alt={ch.media.alt[locale] ?? ""} seed={ch.id} />
          <div className="scenario-media-glow" aria-hidden="true" />
          {stage < 1 && <div className="media-loading">{t("scenario.loadingMedia")}</div>}
        </div>

        <div className={`role-caption reveal ${stage >= 1 ? "in" : ""}`}>
          <span className="role-label">{t("scenario.role")}</span>
          {ch.roleCaption[locale]}
        </div>

        <p className={`scenario-text reveal ${stage >= 2 ? "in" : ""}`}>{ch.scenario[locale]}</p>

        <div className={`scenario-launch reveal ${stage >= 3 ? "in" : ""}`}>
          <p className="muted small center read-hint">{t("scenario.readFirst")}</p>

          <button
            className={`btn tips-toggle ${showTips ? "open" : ""}`}
            onClick={() => setShowTips((s) => !s)}
            aria-expanded={showTips}
          >
            💡 {t("tips.button")}
          </button>

          {showTips && (
            <div className="tips-panel">
              <h4 className="tips-title">{t("tips.title")}</h4>
              <p className="tips-framework">{t(`tips.fw.${ch.type}`)}</p>

              <span className="tips-cover-label">{t("tips.cover")}</span>
              <ul className="tips-points">
                {ch.keyPoints.map((kp, i) => (
                  <li key={i}>{kp[locale]}</li>
                ))}
              </ul>

              <span className="tips-cover-label shine">{t("tips.shineLabel")}</span>
              <p className="tips-line">{t(`tips.shine.${ch.type}`)}</p>

              <span className="tips-cover-label avoid">{t("tips.avoidLabel")}</span>
              <p className="tips-line">{t(`tips.avoid.${ch.type}`)}</p>
            </div>
          )}

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
