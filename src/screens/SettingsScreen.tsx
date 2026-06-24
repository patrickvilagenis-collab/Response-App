import { useState } from "react";
import { useApp } from "../state/store";
import { LanguagePicker } from "../components/LanguagePicker";
import { testMicrophone } from "../lib/speech";

export function SettingsScreen() {
  const { t, settings, setSettings, profile, updateProfile, go } = useApp();
  const [useLlm, setUseLlm] = useState(settings.useLlm);
  const [inputDefault, setInputDefault] = useState(profile?.inputDefault ?? "voice");
  const [saved, setSaved] = useState(false);
  const [micResult, setMicResult] = useState<string | null>(null);
  const [aiTest, setAiTest] = useState<{ ok: boolean; msg: string } | null>(null);
  const [aiBusy, setAiBusy] = useState(false);

  function save() {
    setSettings({ useLlm });
    updateProfile({ inputDefault });
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  async function checkMic() {
    const ok = await testMicrophone();
    setMicResult(ok ? "✓" : "✗");
  }

  // Owner diagnostic: hits the AI proxy and reports exactly what happened, so
  // "why is it falling back to offline?" has a precise answer.
  async function testAi() {
    setAiBusy(true);
    setAiTest(null);
    try {
      const r = await fetch("/api/evaluate", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ system: "Reply with the single word OK.", user: "Say OK", max_tokens: 10 }),
      });
      if (r.ok) {
        setAiTest({ ok: true, msg: t("settings.aiOk") });
      } else if (r.status === 503) {
        setAiTest({ ok: false, msg: t("settings.aiNoKey") });
      } else {
        const d = await r.json().catch(() => ({}));
        const detail = d.detail || d.error || `HTTP ${r.status}`;
        setAiTest({ ok: false, msg: `${t("settings.aiErr")} ${detail}` });
      }
    } catch {
      setAiTest({ ok: false, msg: t("settings.aiUnreach") });
    } finally {
      setAiBusy(false);
    }
  }

  return (
    <div className="page settings">
      <div className="hero">
        <h1>{t("settings.title")}</h1>
      </div>

      <section className="setting-block">
        <h2 className="section-title">{t("settings.language")}</h2>
        <p className="muted small">{t("settings.languageHint")}</p>
        <LanguagePicker />
      </section>

      <section className="setting-block">
        <h2 className="section-title">{t("settings.input")}</h2>
        <div className="input-toggle inline">
          <button
            className={`seg ${inputDefault === "voice" ? "active" : ""}`}
            onClick={() => setInputDefault("voice")}
          >
            🎙 {t("response.voice")}
          </button>
          <button
            className={`seg ${inputDefault === "text" ? "active" : ""}`}
            onClick={() => setInputDefault("text")}
          >
            ⌨ {t("response.text")}
          </button>
        </div>
        <button className="btn ghost sm" onClick={checkMic}>
          {t("settings.micTest")} {micResult && <strong>{micResult}</strong>}
        </button>
      </section>

      <section className="setting-block">
        <h2 className="section-title">{t("settings.ai")}</h2>
        <label className="check">
          <input type="checkbox" checked={useLlm} onChange={(e) => setUseLlm(e.target.checked)} />
          {t("settings.useLlm")}
        </label>
        <p className="muted small">{t("settings.aiIntegrated")}</p>
        <button className="btn ghost sm" onClick={testAi} disabled={aiBusy}>
          {aiBusy ? "…" : t("settings.aiTest")}
        </button>
        {aiTest && (
          <p className={`ai-test-result ${aiTest.ok ? "ok" : "err"}`}>
            {aiTest.ok ? "✅" : "⚠️"} {aiTest.msg}
          </p>
        )}
      </section>

      <p className="muted small privacy-note">🔒 {t("settings.privacy")}</p>

      <button className="btn primary" onClick={save}>
        {saved ? t("settings.saved") : t("settings.save")}
      </button>

      <button className="btn ghost sm admin-link" onClick={() => go({ name: "admin" })}>
        🔐 {t("admin.title")}
      </button>
    </div>
  );
}
