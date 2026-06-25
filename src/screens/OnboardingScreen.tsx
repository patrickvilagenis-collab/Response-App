import { useState } from "react";
import { useApp } from "../state/store";
import { LanguagePicker } from "../components/LanguagePicker";
import { TRACKS } from "../lib/tracks";
import { DEPARTMENTS } from "../data/departments";
import type { RoleLevel, Segment, Department } from "../types";

const ROLES: { id: RoleLevel; icon: string }[] = [
  { id: "ic", icon: "◦" },
  { id: "manager", icon: "◑" },
  { id: "director", icon: "◐" },
  { id: "exec", icon: "●" },
];

export function OnboardingScreen() {
  const { t, profile, updateProfile, go } = useApp();
  const [step, setStep] = useState(0);
  const [role, setRole] = useState<RoleLevel | null>(profile?.roleLevel ?? null);
  const [dept, setDept] = useState<Department | null>(profile?.department ?? null);
  const [goal, setGoal] = useState<string | null>(profile?.goalTrack ?? null);
  const [segment, setSegment] = useState<Segment | null>(profile?.segment ?? null);
  const [goalText, setGoalText] = useState(profile?.goal ?? "");

  const canNext =
    (step === 0 && role) || (step === 1 && dept) || (step === 2 && goal) || (step === 3 && segment);

  function finish() {
    updateProfile({
      roleLevel: role ?? undefined,
      department: dept ?? undefined,
      focus: dept ?? undefined, // default the practice focus to their area
      goalTrack: goal ?? undefined,
      segment: segment ?? undefined,
      goal: goalText.trim() || undefined,
      onboarded: true,
    });
    go({ name: "home" });
  }

  return (
    <div className="onb">
      <div className="onb-top">
        <span className="brand"><span className="brand-mark sm">◐</span>Response</span>
        <LanguagePicker />
      </div>

      <div className="onb-card">
        <div className="onb-dots">
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} className={`onb-dot ${i === step ? "active" : ""} ${i < step ? "done" : ""}`} />
          ))}
        </div>

        <h1 className="onb-title">{t("onb.title")}</h1>

        {step === 0 && (
          <>
            <p className="onb-q">{t("onb.q1")}</p>
            <div className="onb-options">
              {ROLES.map((r) => (
                <button key={r.id} className={`onb-opt ${role === r.id ? "sel" : ""}`} onClick={() => setRole(r.id)}>
                  <span className="onb-opt-icon">{r.icon}</span>
                  <span>{t(`role.${r.id}`)}</span>
                </button>
              ))}
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <p className="onb-q">{t("onb.qArea")}</p>
            <div className="onb-tracks">
              {DEPARTMENTS.map((d) => (
                <button key={d.key} className={`onb-track ${dept === d.key ? "sel" : ""}`} onClick={() => setDept(d.key)}>
                  {t(d.labelKey)}
                </button>
              ))}
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <p className="onb-q">{t("onb.q2")}</p>
            <div className="onb-tracks">
              {TRACKS.map((tr) => (
                <button key={tr.id} className={`onb-track ${goal === tr.id ? "sel" : ""}`} onClick={() => setGoal(tr.id)}>
                  {t(`track.${tr.id}`)}
                </button>
              ))}
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <p className="onb-q">{t("onb.q3")}</p>
            <div className="onb-options two">
              <button className={`onb-opt big ${segment === "individual" ? "sel" : ""}`} onClick={() => setSegment("individual")}>
                <span className="onb-opt-icon">🙂</span>
                <span>{t("onb.individual")}</span>
                <span className="muted small">{t("onb.individualSub")}</span>
              </button>
              <button className={`onb-opt big ${segment === "company" ? "sel" : ""}`} onClick={() => setSegment("company")}>
                <span className="onb-opt-icon">🏢</span>
                <span>{t("onb.company")}</span>
                <span className="muted small">{t("onb.companySub")}</span>
              </button>
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <p className="onb-q">{t("onb.qGoal")}</p>
            <input
              className="onb-goal-input"
              type="text"
              value={goalText}
              maxLength={120}
              autoFocus
              onChange={(e) => setGoalText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && finish()}
              placeholder={t("settings.goalPlaceholder")}
            />
            <p className="muted small center onb-editlater">{t("onb.editLater")}</p>
          </>
        )}

        <div className="onb-actions">
          {step > 0 ? (
            <button className="btn ghost" onClick={() => setStep((s) => s - 1)}>← {t("onb.back")}</button>
          ) : (
            <button className="btn ghost" onClick={finish}>{t("onb.skip")}</button>
          )}
          {step < 4 ? (
            <button className="btn primary" disabled={!canNext} onClick={() => setStep((s) => s + 1)}>
              {t("onb.next")} →
            </button>
          ) : (
            <button className="btn primary" onClick={finish}>{t("onb.start")} →</button>
          )}
        </div>
      </div>
    </div>
  );
}
