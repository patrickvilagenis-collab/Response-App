import { useCallback, useEffect, useRef, useState } from "react";
import { useApp } from "../state/store";
import { pickWarmup, quickScore, WARMUP_SEC, type WarmUpQuestion } from "../data/warmup";
import { startVoice, speechSupported, type VoiceSession } from "../lib/speech";
import { BAND_COLORS, bandFor } from "../lib/scoring";

interface RoundAnswer {
  q: string;
  answer: string;
  sec: number;
  score: number;
}

export function WarmUpScreen() {
  const { t, locale, profile, go } = useApp();
  const [questions] = useState<WarmUpQuestion[]>(() => pickWarmup());
  const [idx, setIdx] = useState(0);
  const [remaining, setRemaining] = useState(WARMUP_SEC);
  const [mode, setMode] = useState<"voice" | "text">(profile?.inputDefault ?? "text");
  const [text, setText] = useState("");
  const [listening, setListening] = useState(false);
  const [answers, setAnswers] = useState<RoundAnswer[]>([]);
  const [done, setDone] = useState(false);

  const startRef = useRef(performance.now());
  const advancedRef = useRef(false);
  const voiceRef = useRef<VoiceSession | null>(null);
  const textRef = useRef("");
  textRef.current = text;

  const current = questions[idx];

  const advance = useCallback(() => {
    if (advancedRef.current) return;
    advancedRef.current = true;
    voiceRef.current?.stop();
    voiceRef.current = null;
    setListening(false);

    const sec = Math.min((performance.now() - startRef.current) / 1000, WARMUP_SEC);
    const answer = textRef.current.trim();
    const score = quickScore(answer, sec);
    const record: RoundAnswer = { q: current.q[locale] ?? current.q.en ?? "", answer, sec: Number(sec.toFixed(1)), score };

    setAnswers((prev) => [...prev, record]);

    if (idx + 1 >= questions.length) {
      setDone(true);
    } else {
      setIdx((i) => i + 1);
      setText("");
      startRef.current = performance.now();
      setRemaining(WARMUP_SEC);
      advancedRef.current = false;
    }
  }, [current, idx, locale, questions.length]);

  // Per-question countdown
  useEffect(() => {
    if (done) return;
    const id = setInterval(() => {
      const left = Math.max(0, WARMUP_SEC - (performance.now() - startRef.current) / 1000);
      setRemaining(left);
      if (left <= 0) {
        clearInterval(id);
        advance();
      }
    }, 100);
    return () => clearInterval(id);
  }, [idx, done, advance]);

  const toggleVoice = useCallback(() => {
    if (listening) {
      voiceRef.current?.stop();
      voiceRef.current = null;
      setListening(false);
      return;
    }
    if (!speechSupported()) {
      setMode("text");
      return;
    }
    const session = startVoice(locale, (txt) => setText(txt), () => {
      setMode("text");
      setListening(false);
    });
    voiceRef.current = session;
    if (session) setListening(true);
  }, [listening, locale]);

  useEffect(() => () => voiceRef.current?.stop(), []);

  if (done) {
    const avg = Math.round(answers.reduce((s, a) => s + a.score, 0) / Math.max(1, answers.length));
    return (
      <div className="page warmup-summary">
        <div className="hero">
          <h1>⚡ {t("warmup.done")}</h1>
          <p className="muted">{t("warmup.summary")}</p>
        </div>
        <div className="warmup-avg" style={{ ["--band" as string]: BAND_COLORS[bandFor(avg)] }}>
          <span className="warmup-avg-num">{avg}%</span>
          <span className="muted small">{t("warmup.avg")}</span>
        </div>
        <div className="warmup-list">
          {answers.map((a, i) => (
            <div key={i} className="warmup-row">
              <span className="score-pill" style={{ background: BAND_COLORS[bandFor(a.score)] }}>{a.score}%</span>
              <div className="warmup-qa">
                <div className="warmup-q">{a.q}</div>
                <div className="warmup-a muted">{a.answer || "—"} · {a.sec}s</div>
              </div>
            </div>
          ))}
        </div>
        <div className="result-actions">
          <button className="btn primary" onClick={() => go({ name: "warmup" })}>↻ {t("warmup.again")}</button>
          <button className="btn ghost" onClick={() => go({ name: "library" })}>{t("results.library")}</button>
        </div>
      </div>
    );
  }

  const urgent = remaining <= 4;

  return (
    <div className="page warmup">
      <div className="warmup-top">
        <span className="warmup-counter">{idx + 1} / {questions.length}</span>
        <div className="warmup-bar"><div className="warmup-bar-fill" style={{ width: `${(remaining / WARMUP_SEC) * 100}%`, background: urgent ? "#ef4444" : "#5b8cff" }} /></div>
        <span className={`warmup-secs ${urgent ? "urgent" : ""}`}>{Math.ceil(remaining)}s</span>
      </div>

      <div className="warmup-question">{current.q[locale]}</div>

      <div className="input-toggle">
        <button className={`seg ${mode === "voice" ? "active" : ""}`} onClick={() => setMode("voice")}>🎙 {t("response.voice")}</button>
        <button className={`seg ${mode === "text" ? "active" : ""}`} onClick={() => setMode("text")}>⌨ {t("response.text")}</button>
      </div>

      {mode === "voice" ? (
        <div className="voice-panel">
          <button className={`mic-btn ${listening ? "live" : ""}`} onClick={toggleVoice}>
            {listening ? "■" : "🎙"}
            <span className="mic-label">{listening ? t("response.stop") : t("response.tapToSpeak")}</span>
          </button>
          <textarea className="transcript-edit" value={text} onChange={(e) => setText(e.target.value)} placeholder={t("response.listening")} />
        </div>
      ) : (
        <textarea
          className="text-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t("response.placeholder")}
          autoFocus
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); advance(); } }}
        />
      )}

      <button className="btn primary block submit" onClick={advance}>
        {idx + 1 >= questions.length ? t("warmup.finish") : t("warmup.next")} →
      </button>
    </div>
  );
}
