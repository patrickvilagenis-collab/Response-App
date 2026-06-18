import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { Attempt, Locale, Profile, Settings } from "../types";
import { storage } from "../lib/storage";
import { translator } from "../i18n";

export type Route =
  | { name: "login" }
  | { name: "home" }
  | { name: "library" }
  | { name: "scenario"; challengeId: string }
  | { name: "response"; challengeId: string }
  | { name: "results"; attemptId: string }
  | { name: "history" }
  | { name: "settings" };

interface AppState {
  profile: Profile | null;
  locale: Locale;
  settings: Settings;
  attempts: Attempt[];
  route: Route;
  lastAttempt: Attempt | null;
  t: (key: string) => string;
  login: (profile: Profile) => void;
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

  // Restore session on first load.
  useEffect(() => {
    const id = storage.getCurrentProfileId();
    if (id) {
      const p = storage.getProfiles().find((x) => x.id === id);
      if (p) {
        setProfile(p);
        setLocaleState(p.language);
        setAttempts(storage.getAttempts(p.id));
        setRoute({ name: "home" });
      }
    }
  }, []);

  const t = useMemo(() => translator(locale), [locale]);

  const login = useCallback((p: Profile) => {
    storage.saveProfile(p);
    storage.setCurrentProfileId(p.id);
    setProfile(p);
    setLocaleState(p.language);
    setAttempts(storage.getAttempts(p.id));
    setRoute({ name: "home" });
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

  const recordAttempt = useCallback((a: Attempt) => {
    storage.addAttempt(a);
    setAttempts((prev) => [a, ...prev]);
    setLastAttempt(a);
  }, []);

  const clearAll = useCallback(() => {
    storage.clearAll();
    setProfile(null);
    setAttempts([]);
    setSettingsState({ useLlm: false });
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
