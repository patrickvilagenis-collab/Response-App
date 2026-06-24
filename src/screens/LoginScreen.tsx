import { useState } from "react";
import { useApp } from "../state/store";
import { storage, uid } from "../lib/storage";
import { LanguagePicker } from "../components/LanguagePicker";
import type { Profile } from "../types";

type MagicState = "idle" | "sending" | "sent" | "devlink" | "error" | "notConfigured";

export function LoginScreen() {
  const { t, locale, login } = useApp();
  const profiles = storage.getProfiles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState<MagicState>("idle");
  const [devLink, setDevLink] = useState("");

  function guest() {
    const profile: Profile = {
      id: uid("g_"),
      displayName: name.trim() || t("login.guestName"),
      language: locale,
      inputDefault: "voice",
      createdAt: new Date().toISOString(),
    };
    login(profile);
  }

  function quickLogin(p: Profile) {
    login({ ...p, language: locale });
  }

  async function sendMagic() {
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) {
      setState("error");
      return;
    }
    setState("sending");
    try {
      const r = await fetch("/api/magic", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: email.trim(), name: name.trim() }),
      });
      if (r.status === 503) {
        setState("notConfigured");
        return;
      }
      if (!r.ok) {
        setState("error");
        return;
      }
      const d = await r.json();
      if (d.link) {
        setDevLink(d.link);
        setState("devlink");
      } else {
        setState("sent");
      }
    } catch {
      setState("error");
    }
  }

  return (
    <div className="login-split">
      <aside className="login-hero">
        <SpotlightHero />
        <div className="login-hero-copy">
          <h2>{t("app.tagline")}</h2>
          <p>{t("login.heroLine")}</p>
        </div>
      </aside>
      <div className="login-main">
        <div className="login-top">
          <LanguagePicker />
        </div>
        <div className="login-card">
          <div className="brand-mark">◐</div>
          <h1>{t("app.name")}</h1>
          <p className="muted">{t("login.title")}</p>

          {state === "sent" || state === "devlink" ? (
            <div className="login-sent">
              <div className="login-sent-icon">✉️</div>
              {state === "sent" ? (
                <p>
                  {t("login.sent")} <strong>{email}</strong>. {t("login.checkEmail")}
                </p>
              ) : (
                <>
                  <p>{t("login.devLink")}</p>
                  <a className="btn primary block" href={devLink}>
                    {t("login.activateNow")} →
                  </a>
                </>
              )}
              <button className="btn ghost block" onClick={() => setState("idle")}>
                ← {t("login.back")}
              </button>
            </div>
          ) : (
            <div className="login-form">
              <label>
                {t("login.name")}
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Alex" autoFocus />
              </label>

              <button className="btn primary block" onClick={guest}>
                {t("login.guest")}
              </button>

              <div className="login-divider">
                <span>{t("login.orEmail")}</span>
              </div>

              <label>
                {t("login.email")}
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMagic()}
                  placeholder="you@work.com"
                />
              </label>
              {state === "error" && <div className="error">{t("login.emailInvalid")}</div>}
              {state === "notConfigured" && <div className="notice">{t("login.notConfigured")}</div>}
              <button className="btn ghost block" onClick={sendMagic} disabled={state === "sending"}>
                {state === "sending" ? "…" : "✉️ " + t("login.sendLink")}
              </button>
            </div>
          )}

          {profiles.length > 0 && state === "idle" && (
            <div className="profile-list">
              <span className="muted small">{t("login.existing")}</span>
              <div className="chips">
                {profiles.map((p) => (
                  <button key={p.id} className="chip" onClick={() => quickLogin(p)}>
                    {p.email ? "✉ " : "🙂 "}
                    {p.displayName}
                  </button>
                ))}
              </div>
            </div>
          )}
          <p className="muted small center">{t("login.subtitle")}</p>
        </div>
      </div>
    </div>
  );
}

function SpotlightHero() {
  return (
    <svg className="spotlight-svg" viewBox="0 0 420 520" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <radialGradient id="sp-glow" cx="0.5" cy="0.0" r="1">
          <stop offset="0" stopColor="#6f9bff" stopOpacity="0.55" />
          <stop offset="0.5" stopColor="#3a5a92" stopOpacity="0.12" />
          <stop offset="1" stopColor="#3a5a92" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="sp-cone" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0" stopColor="#bcd0ff" stopOpacity="0.5" />
          <stop offset="1" stopColor="#bcd0ff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="sp-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#16223e" />
          <stop offset="1" stopColor="#0a1024" />
        </linearGradient>
      </defs>
      <rect width="420" height="520" fill="#0a1126" />
      <rect width="420" height="520" fill="url(#sp-glow)" />
      <polygon points="210,-20 120,430 300,430" fill="url(#sp-cone)" />
      <rect y="400" width="420" height="120" fill="url(#sp-floor)" />
      <ellipse cx="210" cy="430" rx="150" ry="26" fill="#6f9bff" opacity="0.16" />
      <g fill="#0c1430" opacity="0.9">
        <circle cx="40" cy="470" r="18" /><circle cx="90" cy="478" r="20" />
        <circle cx="330" cy="478" r="20" /><circle cx="382" cy="470" r="18" />
        <rect x="20" y="486" width="120" height="40" /><rect x="300" y="486" width="120" height="40" />
      </g>
      <g transform="translate(210 300)">
        <ellipse cx="0" cy="128" rx="46" ry="12" fill="#000" opacity="0.3" />
        <path d="M -40 126 Q -40 50 0 50 Q 40 50 40 126 Z" fill="#27406e" />
        <path d="M -40 126 Q -40 56 -2 52 L -2 126 Z" fill="#3a5a92" opacity="0.6" />
        <circle cx="0" cy="22" r="26" fill="#c7d4ea" />
        <circle cx="-8" cy="14" r="9" fill="#fff" opacity="0.18" />
      </g>
    </svg>
  );
}
