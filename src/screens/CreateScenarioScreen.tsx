import { useState } from "react";
import { useApp } from "../state/store";
import { generateCustomScenario } from "../lib/customScenario";

// "Practise MY situation" — the user describes a real moment they need to
// face; the AI designs a personalised roleplay, it's saved to their own
// scenario repository, and they can play it (and replay it) like any other.

export function CreateScenarioScreen() {
  const { t, locale, profile, updateProfile, go } = useApp();
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const examples = [t("create.ex1"), t("create.ex2"), t("create.ex3")];

  async function create() {
    if (text.trim().length < 12) return setError(t("create.tooShort"));
    setBusy(true);
    setError("");
    try {
      const ch = await generateCustomScenario(text, profile, locale);
      updateProfile({ customChallenges: [...(profile?.customChallenges ?? []), ch] });
      go({ name: "scenario", challengeId: ch.id });
    } catch (e) {
      const m = e instanceof Error ? e.message : String(e);
      setError(m.includes("503") ? t("framework.noKey") : t("create.error"));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="page create-scenario">
      <div className="hero">
        <span className="eyebrow gold">{t("create.eyebrow")}</span>
        <h1>{t("create.title")}</h1>
        <p className="muted">{t("create.subtitle")}</p>
      </div>

      <div className="create-card">
        <label className="create-label" htmlFor="create-text">
          {t("create.label")}
        </label>
        <textarea
          id="create-text"
          className="create-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t("create.placeholder")}
          rows={5}
          maxLength={1200}
          autoFocus
          disabled={busy}
        />
        <p className="muted small create-hint">{t("create.hint")}</p>

        <div className="create-examples">
          <span className="muted small">{t("create.examplesLabel")}</span>
          <div className="chips">
            {examples.map((ex, i) => (
              <button key={i} className="chip" onClick={() => setText(ex)} disabled={busy}>
                {ex.length > 58 ? ex.slice(0, 58).trimEnd() + "…" : ex}
              </button>
            ))}
          </div>
        </div>

        {error && <p className="error">{error}</p>}

        <div className="create-actions">
          <button className="btn ghost" onClick={() => go({ name: "library" })} disabled={busy}>
            ← {t("login.back")}
          </button>
          <button className="btn primary" onClick={create} disabled={busy || text.trim().length === 0}>
            {busy ? t("create.creating") : t("create.cta")}
          </button>
        </div>
        {busy && <p className="muted small create-wait">{t("create.wait")}</p>}
        {!busy && <p className="muted small create-saved">{t("create.saved")}</p>}
      </div>
    </div>
  );
}
