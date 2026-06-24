import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { Attempt, Locale, Profile, Settings } from "../types";
import { storage } from "../lib/storage";
import { translator } from "../i18n";
import { getChallenge } from "../data/challenges";

export type Route =
  | { name: "login" }
  | { name: "onboarding" }
  | { name: "home" }
  | { name: "library"; track?: string }
  | { name: "scenario"; challengeId: string }
  | { name: "response"; challengeId: string }
  | { name: "results"; attemptId: string }
  | { name: "history" }
  | { name: "settings" }
  | { name: "warmup" }
  | { name: "admin" };

interface AppState {
  profile: Profile | null;
  locale: Locale;
  settings: Settings;
  attempts: Attempt[];
  route: Route;
  lastAttempt: Attempt | null;
  t: (key: string) => string;
  login: (profile: Profile) => void;
  loginAccount: (email: string, name: string) => void;
  updateProfile: (patch: Partial<Profile>) => void;
  logout: () => void;
  setLocale: (locale: Locale) => void;
  setSettings: (s: Settings) => void;
  go: (route: Route) => void;
  recordAttempt: (a: Attempt) => void;
  clearAll: () => void;
}

const Ctx = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [locale, setLocaleState] = useState<Locale>("en");
  const [settings, setSettingsState] = useState<Settings>(storage.getSettings());
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [route, setRoute] = useState<Route>({ name: "login" });
  const [lastAttempt, setLastAttempt] = useState<Attempt | null>(null);

  const t = useMemo(() => translator(locale), [locale]);

  const login = useCallback((p: Profile) => {
    storage.saveProfile(p);
    storage.setCurrentProfileId(p.id);
    setProfile(p);
    setLocaleState(p.language);
    setAttempts(storage.getAttempts(p.id));
    setRoute(p.onboarded ? { name: "home" } : { name: "onboarding" });
  }, []);

  // Log in via a registered account (after email activation).
  const loginAccount = useCallback(
    (email: string, name: string) => {
      const id = "acct_" + email;
      const existing = storage.getProfiles().find((p) => p.id === id || p.email === email);
      const p: Profile =
        existing
          ? { ...existing, email, displayName: existing.displayName || name }
          : {
              id,
              displayName: name || email.split("@")[0],
              email,
              language: locale,
              inputDefault: "voice",
              createdAt: new Date().toISOString(),
            };
      login(p);
      void fetch("/api/seen", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email }),
      }).catch(() => {});
    },
    [login, locale]
  );

  // On first load: complete email activation (if ?activate=token) or restore session.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    // Password-reset link: stay on the login screen so the reset form shows.
    if (params.get("reset")) return;
    const token = params.get("activate");
    const restore = () => {
      const id = storage.getCurrentProfileId();
      if (!id) return;
      const p = storage.getProfiles().find((x) => x.id === id);
      if (!p) return;
      setProfile(p);
      setLocaleState(p.language);
      setAttempts(storage.getAttempts(p.id));
      setRoute(p.onboarded ? { name: "home" } : { name: "onboarding" });
      if (p.email) {
        void fetch("/api/seen", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ email: p.email }),
        }).catch(() => {});
      }
    };
    if (token) {
      window.history.replaceState({}, "", window.location.pathname);
      fetch("/api/activate", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token }),
      })
        .then((r) => (r.ok ? r.json() : null))
        .then((d) => {
          if (d?.ok) loginAccount(d.email, d.name);
          else restore();
        })
        .catch(restore);
      return;
    }
    restore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist profile changes without navigating (settings, onboarding steps).
  const updateProfile = useCallback((patch: Partial<Profile>) => {
    setProfile((prev) => {
      if (!prev) return prev;
      const next = { ...prev, ...patch };
      storage.saveProfile(next);
      return next;
    });
  }, []);

  const logout = useCallback(() => {
    storage.setCurrentProfileId(null);
    setProfile(null);
    setRoute({ name: "login" });
  }, []);

  const setLocale = useCallback(
    (l: Locale) => {
      setLocaleState(l);
      if (profile) {
        const updated = { ...profile, language: l };
        setProfile(updated);
        storage.saveProfile(updated);
      }
    },
    [profile]
  );

  const setSettings = useCallback((s: Settings) => {
    setSettingsState(s);
    storage.saveSettings(s);
  }, []);

  const go = useCallback((r: Route) => setRoute(r), []);

  const recordAttempt = useCallback(
    (a: Attempt) => {
      storage.addAttempt(a);
      setAttempts((prev) => [a, ...prev]);
      setLastAttempt(a);
      // Fire-and-forget central logging for admin review. No-op if the backend
      // store isn't configured; never blocks or breaks the user flow.
      void fetch("/api/log", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          user: profile?.displayName ?? "anon",
          profileId: a.profileId,
          challengeId: a.challengeId,
          category: a.category,
          type: a.type,
          difficulty: a.difficulty,
          locale: a.locale,
          inputMode: a.inputMode,
          scenario: getChallenge(a.challengeId)?.scenario[a.locale] ?? "",
          transcript: a.transcript,
          final: a.evaluation.final,
          band: a.evaluation.band,
          source: a.evaluation.source,
          speedBonus: a.evaluation.speedBonus,
          responseTimeSec: a.responseTimeSec,
          dims: {
            content: a.evaluation.dimensions.content.score,
            delivery: a.evaluation.dimensions.delivery.score,
            time: a.evaluation.dimensions.time.score,
          },
          headline: a.evaluation.headline,
          coaching: a.evaluation.coaching,
        }),
      }).catch(() => {});
    },
    [profile]
  );

  const clearAll = useCallback(() => {
    storage.clearAll();
    setProfile(null);
    setAttempts([]);
    setSettingsState({ useLlm: true });
    setRoute({ name: "login" });
  }, []);

  const value: AppState = {
    profile,
    locale,
    settings,
    attempts,
    route,
    lastAttempt,
    t,
    login,
    loginAccount,
    updateProfile,
    logout,
    setLocale,
    setSettings,
    go,
    recordAttempt,
    clearAll,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useApp(): AppState {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
