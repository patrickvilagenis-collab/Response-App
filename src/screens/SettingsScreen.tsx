import { useState } from "react";
import { useApp } from "../state/store";
import { LanguagePicker } from "../components/LanguagePicker";
import { testMicrophone } from "../lib/speech";
import { llmEvaluate } from "../lib/evaluator";
import { CHALLENGES } from "../data/challenges";
import { DEPARTMENTS } from "../data/departments";
import { LEVELS } from "../lib/facets";
import type { Department, RoleLevel, TeamSize } from "../types";

export function SettingsScreen() {
  const { t, settings, setSettings, profile, updateProfile, go } = useApp();
  const [useLlm, setUseLlm] = useState(settings.useLlm);
  const [inputDefault, setInputDefault] = useState(profile?.inputDefault ?? "voice");
  // Training profile — drives a more tailored plan.
  const [department, setDepartment] = useState<Department | "">(profile?.department ?? "");
  const [roleLevel, setRoleLevel] = useState<RoleLevel | "">(profile?.roleLevel ?? "");
  const [teamSize, setTeamSize] = useState<TeamSize | "">(profile?.teamSize ?? "");
  const [focus, setFocus] = useState<Department | "">(profile?.focus ?? "");
  const [goal, setGoal] = useState(profile?.goal ?? "");
  const [saved, setSaved] = useState(false);
  const [micResult, setMicResult] = useState<string | null>(null);
  const [aiTest, setAiTest] = useState<{ ok: boolean; msg: string } | null>(null);
  const [aiBusy, setAiBusy] = useState(false);

  function save() {
    setSettings({ useLlm });
    updateProfile({
      inputDefault,
      department: department || undefined,
      roleLevel: roleLevel || undefined,
      teamSize: teamSize || undefined,
      focus: focus || undefined,
      goal: goal.trim() || undefined,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  async function checkMic() {
    const ok = await testMicrophone();
    setMicResult(ok ? "✓" : "✗");
  }

  // Owner diagnostic: runs a REAL AI evaluation (same path as a scored answer)
  // and reports exactly what happened, so "why is it falling back to offline?"
  // has a precise answer — including the actual upstream error if it fails.
  async function testAi() {
    setAiBusy(true);
    setAiTest(null);
    try {
      const ch = CHALLENGES[0];
      const sample = "This is a short sample answer used only to test the AI connection end to end.";
      const result = await llmEvaluate(ch, sample, 30, profile?.language ?? "en");
      // A real AI result is tagged source:"llm"; offline never reaches here.
      if (result.source === "llm") setAiTest({ ok: true, msg: t("settings.aiOk") });
      else setAiTest({ ok: false, msg: t("settings.aiErr") });
    } catch (e) {
      const m = e instanceof Error ? e.message : String(e);
      if (m.includes("503")) setAiTest({ ok: false, msg: t("settings.aiNoKey") });
      else setAiTest({ ok: false, msg: `${t("settings.aiErr")} ${m}` });
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
        <h2 className="section-title">{t("settings.profileTitle")}</h2>
        <p className="muted small">{t("settings.profileHint")}</p>
        <div className="profile-grid">
          <label className="field">
            <span>{t("settings.area")}</span>
            <select value={department} onChange={(e) => setDepartment(e.target.value as Department | "")}>
              <option value="">{t("settings.choose")}</option>
              {DEPARTMENTS.map((d) => (
                <option key={d.key} value={d.key}>{t(d.labelKey)}</option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>{t("settings.role")}</span>
            <select value={roleLevel} onChange={(e) => setRoleLevel(e.target.value as RoleLevel | "")}>
              <option value="">{t("settings.choose")}</option>
              {LEVELS.map((l) => (
                <option key={l} value={l}>{t(`role.${l}`)}</option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>{t("settings.teamSize")}</span>
            <select value={teamSize} onChange={(e) => setTeamSize(e.target.value as TeamSize | "")}>
              <option value="">{t("settings.choose")}</option>
              <option value="none">{t("settings.team.none")}</option>
              <option value="small">{t("settings.team.small")}</option>
              <option value="large">{t("settings.team.large")}</option>
            </select>
          </label>
          <label className="field">
            <span>{t("settings.focus")}</span>
            <select value={focus} onChange={(e) => setFocus(e.target.value as Department | "")}>
              <option value="">{t("settings.choose")}</option>
              {DEPARTMENTS.map((d) => (
                <option key={d.key} value={d.key}>{t(d.labelKey)}</option>
              ))}
            </select>
          </label>
        </div>
        <label className="field full">
          <span>{t("settings.goal")}</span>
          <input
            type="text"
            value={goal}
            maxLength={120}
            onChange={(e) => setGoal(e.target.value)}
            placeholder={t("settings.goalPlaceholder")}
          />
        </label>
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
