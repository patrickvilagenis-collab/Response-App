import { useState } from "react";
import { useApp } from "../state/store";
import { BAND_COLORS, bandFor } from "../lib/scoring";

interface LoggedAttempt {
  ts: string;
  user: string;
  challengeId: string;
  category: string;
  difficulty: number;
  locale: string;
  inputMode: string;
  transcript: string;
  final: number;
  responseTimeSec: number;
}

type State = "locked" | "loading" | "ok" | "wrong" | "notConfigured";

export function AdminScreen() {
  const { t, go } = useApp();
  const [pw, setPw] = useState("");
  const [state, setState] = useState<State>("locked");
  const [list, setList] = useState<LoggedAttempt[]>([]);

  async function unlock() {
    setState("loading");
    try {
      const r = await fetch("/api/admin", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ password: pw }),
      });
      if (r.status === 401) {
        setState("wrong");
        return;
      }
      const d = await r.json();
      if (!d.configured) {
        setState("notConfigured");
        return;
      }
      setList(d.attempts ?? []);
      setState("ok");
    } catch {
      setState("wrong");
    }
  }

  return (
    <div className="page admin">
      <div className="hero between">
        <h1>{t("admin.title")}</h1>
        <button className="btn ghost sm" onClick={() => go({ name: "settings" })}>
          ← {t("nav.settings")}
        </button>
      </div>
      <p className="muted">{t("admin.subtitle")}</p>

      {state !== "ok" ? (
        <div className="admin-gate">
          <label className="field">
            {t("admin.password")}
            <input
              type="password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && unlock()}
              autoFocus
            />
          </label>
          <button className="btn primary" onClick={unlock} disabled={!pw || state === "loading"}>
            {state === "loading" ? "…" : t("admin.unlock")}
          </button>
          {state === "wrong" && <div className="error">{t("admin.wrong")}</div>}
          {state === "notConfigured" && <div className="notice">{t("admin.notConfigured")}</div>}
        </div>
      ) : (
        <>
          <div className="admin-head">
            <span className="muted small">
              {list.length} {t("admin.count")}
            </span>
            <button className="btn ghost sm" onClick={unlock}>
              ↻ {t("admin.refresh")}
            </button>
          </div>
          {list.length === 0 ? (
            <p className="muted">{t("admin.empty")}</p>
          ) : (
            <div className="admin-list">
              {list.map((a, i) => {
                const band = bandFor(a.final);
                return (
                  <div key={i} className="admin-row">
                    <div className="admin-row-top">
                      <span className="score-pill" style={{ background: BAND_COLORS[band] }}>
                        {a.final}%
                      </span>
                      <strong>{a.user}</strong>
                      <span className="muted small">
                        {a.challengeId} · {a.category} · {t(`diff.${a.difficulty}`) || a.difficulty}
                      </span>
                      <span className="muted small admin-when">
                        {a.responseTimeSec}s · {new Date(a.ts).toLocaleString(undefined)}
                      </span>
                    </div>
                    <div className="admin-transcript">{a.transcript || "—"}</div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}
