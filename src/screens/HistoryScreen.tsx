import { useApp } from "../state/store";
import { getChallenge } from "../data/challenges";
import { BAND_COLORS, bandFor } from "../lib/scoring";
import { storage } from "../lib/storage";

export function HistoryScreen() {
  const { t, locale, attempts, profile, go, clearAll } = useApp();

  function exportData() {
    if (!profile) return;
    const blob = new Blob([storage.exportProfile(profile.id)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `response-app-${profile.displayName}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function confirmClear() {
    if (confirm(t("history.confirmClear"))) clearAll();
  }

  return (
    <div className="page history">
      <div className="hero between">
        <h1>{t("history.title")}</h1>
        <div className="row-gap">
          <button className="btn ghost sm" onClick={exportData} disabled={attempts.length === 0}>
            {t("history.export")}
          </button>
          <button className="btn danger sm" onClick={confirmClear}>
            {t("history.clear")}
          </button>
        </div>
      </div>

      {attempts.length === 0 ? (
        <p className="muted">{t("history.empty")}</p>
      ) : (
        <table className="history-table">
          <thead>
            <tr>
              <th>{t("history.score")}</th>
              <th>{t("library.type")}</th>
              <th>{t("library.difficulty")}</th>
              <th>{t("history.time")}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {attempts.map((a) => {
              const ch = getChallenge(a.challengeId);
              const band = bandFor(a.evaluation.final);
              return (
                <tr key={a.id} onClick={() => go({ name: "results", attemptId: a.id })}>
                  <td>
                    <span className="score-pill" style={{ background: BAND_COLORS[band] }}>
                      {a.evaluation.final}%
                    </span>
                  </td>
                  <td>{ch ? t(`type.${ch.type}`) : a.type}</td>
                  <td>{t(`diff.${a.difficulty}`)}</td>
                  <td>{a.responseTimeSec.toFixed(1)}s</td>
                  <td className="muted small">{new Date(a.createdAt).toLocaleDateString(locale)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
