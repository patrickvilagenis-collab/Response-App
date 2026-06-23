import { useState } from "react";
import { useApp } from "../state/store";
import { LanguagePicker } from "../components/LanguagePicker";
import { testMicrophone } from "../lib/speech";
import { storage } from "../lib/storage";

export function SettingsScreen() {
  const { t, settings, setSettings, profile, login, go } = useApp();
  const [useLlm, setUseLlm] = useState(settings.useLlm);
  const [inputDefault, setInputDefault] = useState(profile?.inputDefault ?? "voice");
  const [saved, setSaved] = useState(false);
  const [micResult, setMicResult] = useState<string | null>(null);

  function save() {
    setSettings({ useLlm });
    if (profile) {
      const updated = { ...profile, inputDefault };
      storage.saveProfile(updated);
      login(updated); // persists + keeps session
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  async function checkMic() {
    const ok = await testMicrophone();
    setMicResult(ok ? "✓" : "✗");
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
