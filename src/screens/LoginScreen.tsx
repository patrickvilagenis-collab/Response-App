import { useEffect, useState } from "react";
import { useApp } from "../state/store";
import { storage, uid } from "../lib/storage";
import { LanguagePicker } from "../components/LanguagePicker";
import type { Profile } from "../types";

type Mode = "login" | "register" | "forgot" | "sent" | "devlink" | "setpw" | "pending" | "guestname" | "guestwait" | "guestrejected";

const GUEST_ID_KEY = "ra.guestId";
const GUEST_OK_KEY = "ra.guestApproved";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

function PasswordInput(props: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
  onEnter?: () => void;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="pw-wrap">
      <input
        type={show ? "text" : "password"}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && props.onEnter?.()}
        placeholder={props.placeholder ?? "••••••••"}
        autoFocus={props.autoFocus}
      />
      <button type="button" className="pw-eye" onClick={() => setShow((s) => !s)} aria-label="Show password" tabIndex={-1}>
        {show ? "🙈" : "👁"}
      </button>
    </div>
  );
}

export function LoginScreen() {
  const { t, locale, login, loginAccount } = useApp();
  const profiles = storage.getProfiles();
  const params = new URLSearchParams(window.location.search);
  const activateToken = params.get("activate");
  const resetToken = params.get("reset");
  const setpwKind: "activate" | "reset" | null = activateToken ? "activate" : resetToken ? "reset" : null;

  const [mode, setMode] = useState<Mode>(setpwKind ? "setpw" : "login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState("");
  const [devLink, setDevLink] = useState("");
  const [mailErr, setMailErr] = useState("");
  const [busy, setBusy] = useState(false);

  function go(m: Mode) {
    setMsg("");
    setMode(m);
  }

  function enterAsGuest() {
    const profile: Profile = {
      id: uid("g_"),
      displayName: name.trim() || t("login.guestName"),
      language: locale,
      inputDefault: "voice",
      createdAt: new Date().toISOString(),
    };
    login(profile);
  }

  // Guest access requires the owner's approval — and a name, so the owner knows
  // who's asking. Already-approved devices skip straight in.
  function guest() {
    setMsg("");
    if (localStorage.getItem(GUEST_OK_KEY) === "1") return enterAsGuest();
    setMode("guestname");
  }

  // Sends the (named) guest request and emails the owner to approve.
  async function submitGuest() {
    if (name.trim().length < 2) return setMsg(t("login.nameRequired"));
    let gid = localStorage.getItem(GUEST_ID_KEY);
    if (!gid) {
      gid = uid("guest");
      localStorage.setItem(GUEST_ID_KEY, gid);
    }
    setBusy(true);
    setMsg("");
    try {
      const r = await fetch("/api/account", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ action: "guest-request", guestId: gid, name: name.trim() }),
      });
      if (r.status === 429) return setMsg(t("login.tooMany"));
      if (r.status === 503) return enterAsGuest(); // no accounts backend → nothing to gate
      if (!r.ok) return setMsg(t("login.badCredentials"));
      const d = await r.json();
      if (d.status === "approved") {
        localStorage.setItem(GUEST_OK_KEY, "1");
        return enterAsGuest();
      }
      if (d.status === "rejected") return setMode("guestrejected");
      setMode("guestwait");
    } catch {
      setMsg(t("login.badCredentials"));
    } finally {
      setBusy(false);
    }
  }

  // While waiting as a guest, poll until the owner approves or rejects.
  useEffect(() => {
    if (mode !== "guestwait") return;
    const gid = localStorage.getItem(GUEST_ID_KEY);
    if (!gid) return;
    const iv = setInterval(async () => {
      try {
        const r = await fetch("/api/account", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ action: "guest-status", guestId: gid }),
        });
        const d = await r.json();
        if (d.status === "approved") {
          localStorage.setItem(GUEST_OK_KEY, "1");
          clearInterval(iv);
          enterAsGuest();
        } else if (d.status === "rejected") {
          clearInterval(iv);
          setMode("guestrejected");
        }
      } catch {
        /* keep waiting */
      }
    }, 4000);
    return () => clearInterval(iv);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  function quickLogin(p: Profile) {
    login({ ...p, language: locale });
  }

  async function doLogin() {
    if (!EMAIL_RE.test(email.trim())) return setMsg(t("login.emailInvalid"));
    setBusy(true);
    setMsg("");
    try {
      const r = await fetch("/api/account", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ action: "login", email: email.trim(), password }),
      });
      if (r.status === 503) return setMsg(t("login.notConfigured"));
      if (r.status === 429) return setMsg(t("login.tooMany"));
      if (r.status === 403) {
        const e = await r.json().catch(() => ({}));
        return setMsg(e.error === "pending_approval" ? t("login.pendingApproval") : t("login.notActivated"));
      }
      if (!r.ok) return setMsg(t("login.badCredentials"));
      const d = await r.json();
      loginAccount(d.email, d.name, d.token);
    } catch {
      setMsg(t("login.badCredentials"));
    } finally {
      setBusy(false);
    }
  }

  async function doRegister() {
    if (!EMAIL_RE.test(email.trim())) return setMsg(t("login.emailInvalid"));
    setBusy(true);
    setMsg("");
    try {
      const r = await fetch("/api/account", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ action: "register", email: email.trim(), name: name.trim() }),
      });
      if (r.status === 503) return setMsg(t("login.notConfigured"));
      if (r.status === 429) return setMsg(t("login.tooMany"));
      const d = await r.json();
      if (d.exists) return setMsg(t("login.exists"));
      // Registration now waits for the owner's approval before anything is sent.
      setMode("pending");
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
      const r = await fetch("/api/account", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ action: "reset-request", email: email.trim() }),
      });
      if (r.status === 503) return setMsg(t("login.notConfigured"));
      if (r.status === 429) return setMsg(t("login.tooMany"));
      const d = await r.json();
      if (d.link) {
        setDevLink(d.link);
        setMailErr(d.mailError || "");
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

  // Sets the password from an activation OR reset link.
  async function doSetPassword() {
    if (password.length < 6) return setMsg(t("login.weakPassword"));
    if (password !== confirm) return setMsg(t("login.pwMismatch"));
    setBusy(true);
    setMsg("");
    const act = setpwKind === "reset" ? "reset" : "activate";
    const tokenVal = setpwKind === "reset" ? resetToken : activateToken;
    try {
      const r = await fetch("/api/account", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ action: act, token: tokenVal, password }),
      });
      if (r.status === 400) return setMsg(t("login.weakPassword"));
      if (!r.ok) return setMsg(t("login.resetInvalid"));
      const d = await r.json();
      window.history.replaceState({}, "", window.location.pathname);
      loginAccount(d.email, d.name, d.token);
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

          {mode === "setpw" ? (
            <div className="login-form">
              <h3 className="login-formtitle">
                {setpwKind === "reset" ? t("login.resetTitle") : t("login.activateTitle")}
              </h3>
              <p className="muted small left">
                {setpwKind === "reset" ? "" : t("login.activateSub")}
              </p>
              <label>
                {t("login.passwordSet")}
                <PasswordInput value={password} onChange={setPassword} autoFocus onEnter={doSetPassword} />
              </label>
              <label>
                {t("login.confirmPassword")}
                <PasswordInput value={confirm} onChange={setConfirm} onEnter={doSetPassword} />
              </label>
              {msg && <div className="error">{msg}</div>}
              <button className="btn primary block" onClick={doSetPassword} disabled={busy}>
                {busy ? "…" : t("login.finish")}
              </button>
            </div>
          ) : mode === "guestname" ? (
            <div className="login-form">
              <h3 className="login-formtitle">{t("login.guestNameTitle")}</h3>
              <p className="muted small left">{t("login.guestNameSub")}</p>
              <label>
                {t("login.name")}
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && submitGuest()}
                  placeholder="Alex"
                  autoFocus
                />
              </label>
              {msg && <div className="error">{msg}</div>}
              <button className="btn primary block" onClick={submitGuest} disabled={busy}>
                {busy ? "…" : t("login.guestContinue")}
              </button>
              <button className="btn ghost block" onClick={() => go("login")}>
                ← {t("login.back")}
              </button>
            </div>
          ) : mode === "pending" || mode === "guestwait" || mode === "guestrejected" ? (
            <div className="login-sent">
              <div className="login-sent-icon">
                {mode === "guestrejected" ? "🚫" : mode === "guestwait" ? "⏳" : "📨"}
              </div>
              {mode === "pending" && (
                <>
                  <h3 className="login-formtitle">{t("login.pendingTitle")}</h3>
                  <p>{t("login.pendingBody")}</p>
                </>
              )}
              {mode === "guestwait" && (
                <>
                  <h3 className="login-formtitle">{t("login.guestWaitTitle")}</h3>
                  <p>{t("login.guestWaitBody")}</p>
                  <div className="wait-dots" aria-hidden="true"><span /><span /><span /></div>
                </>
              )}
              {mode === "guestrejected" && (
                <>
                  <h3 className="login-formtitle">{t("login.guestRejectedTitle")}</h3>
                  <p>{t("login.guestRejected")}</p>
                </>
              )}
              <button className="btn ghost block" onClick={() => go("login")}>
                ← {t("login.back")}
              </button>
            </div>
          ) : mode === "sent" || mode === "devlink" ? (
            <div className="login-sent">
              <div className="login-sent-icon">✉️</div>
              {mode === "sent" ? (
                <p>
                  {t("login.checkEmailGeneric")} <strong>{email}</strong>. {t("login.thenSetPw")}
                </p>
              ) : (
                <>
                  <p>{t("login.devLink")}</p>
                  <a className="btn primary block" href={devLink}>
                    {t("login.openLink")} →
                  </a>
                  {mailErr && <p className="muted small mail-err">📭 {mailErr}</p>}
                </>
              )}
              <button className="btn ghost block" onClick={() => go("login")}>
                ← {t("login.back")}
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
              <div className="auth-tabs">
                <button className={`auth-tab ${mode === "login" ? "active" : ""}`} onClick={() => go("login")}>
                  {t("login.tabLogin")}
                </button>
                <button className={`auth-tab ${mode === "register" ? "active" : ""}`} onClick={() => go("register")}>
                  {t("login.tabRegister")}
                </button>
              </div>

              {mode === "register" ? (
                <div className="login-form">
                  <p className="muted small left">{t("login.registerHint")}</p>
                  <label>
                    {t("login.name")}
                    <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Alex" />
                  </label>
                  <label>
                    {t("login.email")}
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && doRegister()}
                      placeholder="you@work.com"
                    />
                  </label>
                  {msg && <div className="error">{msg}</div>}
                  <button className="btn primary block" onClick={doRegister} disabled={busy}>
                    {busy ? "…" : t("login.sendActivation")}
                  </button>
                </div>
              ) : (
                <div className="login-form">
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
                    {t("login.password")}
                    <PasswordInput value={password} onChange={setPassword} onEnter={doLogin} />
                  </label>
                  {msg && <div className="error">{msg}</div>}
                  <button className="btn primary block" onClick={doLogin} disabled={busy}>
                    {busy ? "…" : t("login.signin")}
                  </button>
                  <button className="link-btn login-forgot" onClick={() => go("forgot")}>
                    {t("login.forgot")}
                  </button>
                </div>
              )}

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
