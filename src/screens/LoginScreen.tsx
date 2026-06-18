import { useState } from "react";
import { useApp } from "../state/store";
import { storage, hashPassword, uid } from "../lib/storage";
import { LanguagePicker } from "../components/LanguagePicker";
import type { Profile } from "../types";

export function LoginScreen() {
  const { t, locale, login } = useApp();
  const profiles = storage.getProfiles();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function createOrLogin() {
    const trimmed = name.trim();
    if (!trimmed) return;
    const existing = profiles.find((p) => p.displayName.toLowerCase() === trimmed.toLowerCase());
    if (existing) {
      if (existing.passwordHash && existing.passwordHash !== hashPassword(password)) {
        setError(t("login.wrongPassword"));
        return;
      }
      login({ ...existing, language: locale });
      return;
    }
    const profile: Profile = {
      id: uid("p_"),
      displayName: trimmed,
      passwordHash: password ? hashPassword(password) : undefined,
      language: locale,
      inputDefault: "voice",
      createdAt: new Date().toISOString(),
    };
    login(profile);
  }

  function quickLogin(p: Profile) {
    if (p.passwordHash) {
      setName(p.displayName);
      setError("");
      return;
    }
    login({ ...p, language: locale });
  }

  return (
    <div className="login">
      <div className="login-top">
        <LanguagePicker />
      </div>
      <div className="login-card">
        <div className="brand-mark">◐</div>
        <h1>{t("app.name")}</h1>
        <p className="muted">{t("app.tagline")}</p>

        <div className="login-form">
          <label>
            {t("login.name")}
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Alex"
              autoFocus
            />
          </label>
          <label>
            {t("login.password")}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && createOrLogin()}
            />
          </label>
          {error && <div className="error">{error}</div>}
          <button className="btn primary block" onClick={createOrLogin} disabled={!name.trim()}>
            {t("login.start")}
          </button>
        </div>

        {profiles.length > 0 && (
          <div className="profile-list">
            <span className="muted small">{t("login.existing")}</span>
            <div className="chips">
              {profiles.map((p) => (
                <button key={p.id} className="chip" onClick={() => quickLogin(p)}>
                  {p.passwordHash ? "🔒 " : ""}
                  {p.displayName}
                </button>
              ))}
            </div>
          </div>
        )}
        <p className="muted small center">{t("login.subtitle")}</p>
      </div>
    </div>
  );
}
