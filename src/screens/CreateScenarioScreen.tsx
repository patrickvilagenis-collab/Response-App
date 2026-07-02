import { useEffect, useRef, useState } from "react";
import { useApp } from "../state/store";
import { generateCustomScenario } from "../lib/customScenario";
import { speechSupported, startVoice } from "../lib/speech";
import type { VoiceSession } from "../lib/speech";

// "Practise MY situation" — the user describes (typing or dictating) a real
// moment they need to face; the AI designs a personalised roleplay, it's saved
// to their own scenario repository, and they can play it like any other.

export function CreateScenarioScreen() {
  const { t, locale, profile, updateProfile, go } = useApp();
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [rec, setRec] = useState<VoiceSession | null>(null);
  const recRef = useRef<VoiceSession | null>(null);
  const baseRef = useRef(""); // typed text present when dictation started
  const canDictate = speechSupported();

  // Never leave the mic running when the screen unmounts.
  useEffect(() => () => recRef.current?.stop(), []);

  function stopVoice() {
    recRef.current?.stop();
    recRef.current = null;
    setRec(null);
  }

  function toggleVoice() {
    if (recRef.current) return stopVoice();
    setError("");
    baseRef.current = text.trim();
    const session = startVoice(
      locale,
      (spoken, isFinal) => {
        setText((baseRef.current ? baseRef.current + " " : "") + spoken);
        if (isFinal) {
          recRef.current = null;
          setRec(null);
        }
      },
      (kind) => {
        recRef.current = null;
        setRec(null);
        setError(kind === "denied" ? t("create.micDenied") : t("create.micError"));
      }
    );
    if (session) {
      recRef.current = session;
      setRec(session);
    }
  }

  const examples = [t("create.ex1"), t("create.ex2"), t("create.ex3")];

  async function create() {
    stopVoice();
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
          className={`create-input ${rec ? "listening" : ""}`}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t("create.placeholder")}
          rows={5}
          maxLength={1200}
          autoFocus
          disabled={busy}
        />
        {canDictate && (
          <div className="create-voice">
            <button
              type="button"
              className={`btn sm ${rec ? "create-mic on" : "ghost create-mic"}`}
              onClick={toggleVoice}
              disabled={busy}
            >
              <MicIcon />
              {rec ? t("create.stopDictate") : t("create.dictate")}
            </button>
            {rec && (
              <span className="create-listening">
                <span className="rec-dot" aria-hidden="true" />
                {t("create.listening")}
              </span>
            )}
          </div>
        )}
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

// Clean line-icon microphone (matches the app's professional tone — no emoji).
function MicIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true" className="mic-icon">
      <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="9.2" y="3.5" width="5.6" height="10" rx="2.8" />
        <path d="M5.5 11.5a6.5 6.5 0 0 0 13 0" />
        <path d="M12 18v2.5" />
      </g>
    </svg>
  );
}
