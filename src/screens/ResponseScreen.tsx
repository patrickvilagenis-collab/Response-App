import { useCallback, useEffect, useRef, useState } from "react";
import { useApp } from "../state/store";
import { getChallenge } from "../data/challenges";
import { TimerRing } from "../components/TimerRing";
import { startVoice, speechSupported, type VoiceSession } from "../lib/speech";
import { evaluate } from "../lib/evaluator";
import { uid } from "../lib/storage";
import { MAX_RESPONSE_SEC } from "../lib/scoring";
import type { Attempt } from "../types";

export function ResponseScreen({ challengeId }: { challengeId: string }) {
  const { t, locale, profile, settings, recordAttempt, go } = useApp();
  const ch = getChallenge(challengeId);

  const [remaining, setRemaining] = useState(MAX_RESPONSE_SEC);
  const [mode, setMode] = useState<"voice" | "text">(profile?.inputDefault ?? "voice");
  const [transcript, setTranscript] = useState("");
  const [listening, setListening] = useState(false);
  const [notice, setNotice] = useState("");
  const [phase, setPhase] = useState<"responding" | "evaluating">("responding");

  const startRef = useRef(performance.now());
  const submittedRef = useRef(false);
  const voiceRef = useRef<VoiceSession | null>(null);
  const transcriptRef = useRef("");
  transcriptRef.current = transcript;

  const submit = useCallback(
    async (auto = false) => {
      if (submittedRef.current || !ch) return;
      submittedRef.current = true;
      voiceRef.current?.stop();
      voiceRef.current = null;
      setListening(false);

      const text = transcriptRef.current.trim();
      if (!text && !auto) {
        submittedRef.current = false;
        setNotice(t("response.empty"));
        return;
      }
      const elapsed = Math.min((performance.now() - startRef.current) / 1000, MAX_RESPONSE_SEC);
      setPhase("evaluating");

      const evaluation = await evaluate(ch, text, elapsed, locale, {
        useLlm: settings.useLlm,
      });

      const attempt: Attempt = {
        id: uid("a_"),
        profileId: profile!.id,
        challengeId: ch.id,
        category: ch.category,
        type: ch.type,
        difficulty: ch.difficulty,
        locale,
        inputMode: mode,
        transcript: text,
        responseTimeSec: Number(elapsed.toFixed(1)),
        evaluation,
        createdAt: new Date().toISOString(),
      };
      recordAttempt(attempt);
      go({ name: "results", attemptId: attempt.id });
    },
    [ch, locale, mode, profile, recordAttempt, settings, t, go]
  );

  // Countdown — starts immediately on mount (play was already pressed).
  useEffect(() => {
    const id = setInterval(() => {
      const elapsed = (performance.now() - startRef.current) / 1000;
      const left = Math.max(0, MAX_RESPONSE_SEC - elapsed);
      setRemaining(left);
      if (left <= 0) {
        clearInterval(id);
        setNotice(t("response.autoSubmit"));
        void submit(true);
      }
    }, 100);
    return () => clearInterval(id);
  }, [submit, t]);

  const toggleVoice = useCallback(() => {
    if (listening) {
      voiceRef.current?.stop();
      voiceRef.current = null;
      setListening(false);
      return;
    }
    if (!speechSupported()) {
      setNotice(t("response.noSpeech"));
      setMode("text");
      return;
    }
    const session = startVoice(
      locale,
      (text) => setTranscript(text),
      (kind) => {
        if (kind === "denied") {
          setNotice(t("response.micDenied"));
          setMode("text");
        } else if (kind === "unsupported") {
          setNotice(t("response.noSpeech"));
          setMode("text");
        }
        setListening(false);
      }
    );
    voiceRef.current = session;
    if (session) setListening(true);
  }, [listening, locale, t]);

  useEffect(() => () => voiceRef.current?.stop(), []);

  if (!ch) return null;

  if (phase === "evaluating") {
    return (
      <div className="page evaluating">
        <div className="eval-pulse" />
        <p>{t("eval.scoring")}</p>
        <div className="skeleton-score" />
        <div className="skeleton-bars">
          <span /><span /><span />
        </div>
      </div>
    );
  }

  return (
    <div className="page response">
      <div className="response-scenario">{ch.scenario[locale]}</div>

      <div className="timer-wrap">
        <TimerRing remaining={remaining} total={MAX_RESPONSE_SEC} />
        <div className="time-left-label muted small">
          {Math.ceil(remaining)}{t("eval.seconds")} {t("response.timeLeft")}
        </div>
      </div>

      <div className="input-toggle" role="group">
        <button className={`seg ${mode === "voice" ? "active" : ""}`} onClick={() => setMode("voice")}>
          🎙 {t("response.voice")}
        </button>
        <button className={`seg ${mode === "text" ? "active" : ""}`} onClick={() => setMode("text")}>
          ⌨ {t("response.text")}
        </button>
      </div>

      {mode === "voice" ? (
        <div className="voice-panel">
          <button className={`mic-btn ${listening ? "live" : ""}`} onClick={toggleVoice}>
            {listening ? "■" : "🎙"}
            <span className="mic-label">{listening ? t("response.stop") : t("response.tapToSpeak")}</span>
          </button>
          {listening && (
            <div className="waveform" aria-hidden="true">
              {Array.from({ length: 9 }).map((_, i) => (
                <span key={i} style={{ animationDelay: `${i * 0.08}s` }} />
              ))}
            </div>
          )}
          <label className="transcript-label muted small">{t("response.transcript")}</label>
          <textarea
            className="transcript-edit"
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder={t("response.listening")}
          />
        </div>
      ) : (
        <textarea
          className="text-input"
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          placeholder={t("response.placeholder")}
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) void submit();
          }}
        />
      )}

      {notice && <div className="notice">{notice}</div>}

      <button className="btn primary block submit" onClick={() => void submit()}>
        {t("response.submit")}
      </button>
    </div>
  );
}
