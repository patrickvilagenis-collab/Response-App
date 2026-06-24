import { useState } from "react";
import { useApp } from "../state/store";
import { storage, uid } from "../lib/storage";
import { LanguagePicker } from "../components/LanguagePicker";
import type { Profile } from "../types";

type Mode = "login" | "register" | "forgot" | "reset" | "sent" | "devlink";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export function LoginScreen() {
  const { t, locale, login, loginAccount } = useApp();
  const profiles = storage.getProfiles();
  const resetToken = new URLSearchParams(window.location.search).get("reset");

  const [mode, setMode] = useState<Mode>(resetToken ? "reset" : "login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [devLink, setDevLink] = useState("");
  const [busy, setBusy] = useState(false);

  function go(m: Mode) {
    setMsg("");
    setMode(m);
  }

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

  async function doLogin() {
    if (!EMAIL_RE.test(email.trim())) return setMsg(t("login.emailInvalid"));
    setBusy(true);
    setMsg("");
    try {
      const r = await fetch("/api/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });
      if (r.status === 503) return setMsg(t("login.notConfigured"));
      if (r.status === 403) return setMsg(t("login.notActivated"));
      if (!r.ok) return setMsg(t("login.badCredentials"));
      const d = await r.json();
      loginAccount(d.email, d.name);
    } catch {
      setMsg(t("login.badCredentials"));
    } finally {
      setBusy(false);
    }
  }

  async function doRegister() {
    if (!EMAIL_RE.test(email.trim())) return setMsg(t("login.emailInvalid"));
    if (password.length < 6) return setMsg(t("login.weakPassword"));
    setBusy(true);
    setMsg("");
    try {
      const r = await fetch("/api/register", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: email.trim(), name: name.trim(), password }),
      });
      if (r.status === 503) return setMsg(t("login.notConfigured"));
      if (r.status === 400) return setMsg(t("login.weakPassword"));
      const d = await r.json();
      if (d.exists) return setMsg(t("login.exists"));
      if (d.link) {
        setDevLink(d.link);
        setMode("devlink");
      } else {
        setMode("sent");
      }
    } catch {
      setMsg(t("login.badCredentials"));
    } finally {
      setBusy(false);
    }
  }

  async function doForgot() {
    if (!EMAIL_RE.test(email.trim())) return setMsg(t("login.emailInvalid"));
    setBusy(true);
    setMsg("");
    try {
      const r = await fetch("/api/reset-request", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      if (r.status === 503) return setMsg(t("login.notConfigured"));
      const d = await r.json();
      if (d.link) {
        setDevLink(d.link);
        setMode("devlink");
      } else {
        setMode("sent");
      }
    } catch {
      setMsg(t("login.badCredentials"));
    } finally {
      setBusy(false);
    }
  }

  async function doReset() {
    if (password.length < 6) return setMsg(t("login.weakPassword"));
    setBusy(true);
    setMsg("");
    try {
      const r = await fetch("/api/reset", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token: resetToken, password }),
      });
      if (r.status === 400) return setMsg(t("login.weakPassword"));
      if (!r.ok) return setMsg(t("login.resetInvalid"));
      const d = await r.json();
      window.history.replaceState({}, "", window.location.pathname);
      loginAccount(d.email, d.name);
    } catch {
      setMsg(t("login.resetInvalid"));
    } finally {
      setBusy(false);
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

          {/* Confirmation states */}
          {mode === "sent" || mode === "devlink" ? (
            <div className="login-sent">
              <div className="login-sent-icon">✉️</div>
              {mode === "sent" ? (
                <p>
                  {t("login.checkEmailGeneric")} <strong>{email}</strong>.
                </p>
              ) : (
                <>
                  <p>{t("login.devLink")}</p>
                  <a className="btn primary block" href={devLink}>
                    {t("login.openLink")} →
                  </a>
                </>
              )}
              <button className="btn ghost block" onClick={() => go("login")}>
                ← {t("login.back")}
              </button>
            </div>
          ) : mode === "reset" ? (
            <div className="login-form">
              <h3 className="login-formtitle">{t("login.resetTitle")}</h3>
              <label>
                {t("login.password")}
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && doReset()}
                  placeholder="••••••••"
                  autoFocus
                />
              </label>
              {msg && <div className="error">{msg}</div>}
              <button className="btn primary block" onClick={doReset} disabled={busy}>
                {busy ? "…" : t("login.resetSave")}
              </button>
            </div>
          ) : mode === "forgot" ? (
            <div className="login-form">
              <h3 className="login-formtitle">{t("login.forgotTitle")}</h3>
              <label>
                {t("login.email")}
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && doForgot()}
                  placeholder="you@work.com"
                  autoFocus
                />
              </label>
              {msg && <div className="error">{msg}</div>}
              <button className="btn primary block" onClick={doForgot} disabled={busy}>
                {busy ? "…" : t("login.forgotSend")}
              </button>
              <button className="btn ghost block" onClick={() => go("login")}>
                ← {t("login.back")}
              </button>
            </div>
          ) : (
            <>
              {/* Login / Register tabs */}
              <div className="auth-tabs">
                <button className={`auth-tab ${mode === "login" ? "active" : ""}`} onClick={() => go("login")}>
                  {t("login.tabLogin")}
                </button>
                <button className={`auth-tab ${mode === "register" ? "active" : ""}`} onClick={() => go("register")}>
                  {t("login.tabRegister")}
                </button>
              </div>

              <div className="login-form">
                {mode === "register" && (
                  <label>
                    {t("login.name")}
                    <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Alex" />
                  </label>
                )}
                <label>
                  {t("login.email")}
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@work.com"
                  />
                </label>
                <label>
                  {mode === "register" ? t("login.passwordSet") : t("login.password")}
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (mode === "register" ? doRegister() : doLogin())}
                    placeholder="••••••••"
                  />
                </label>
                {msg && <div className="error">{msg}</div>}
                <button
                  className="btn primary block"
                  onClick={mode === "register" ? doRegister : doLogin}
                  disabled={busy}
                >
                  {busy ? "…" : mode === "register" ? t("login.create") : t("login.signin")}
                </button>
                {mode === "login" && (
                  <button className="link-btn login-forgot" onClick={() => go("forgot")}>
                    {t("login.forgot")}
                  </button>
                )}
              </div>

              <div className="login-divider">
                <span>{t("login.or")}</span>
              </div>
              <button className="btn ghost block" onClick={guest}>
                {t("login.guest")}
              </button>

              {profiles.length > 0 && (
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
            </>
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
