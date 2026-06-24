import type { Attempt, Profile, Settings } from "../types";

// Local-only persistence (see docs/data-model.md). Uses localStorage behind a
// small provider so a future backend can replace it without UI changes.

const KEYS = {
  profiles: "ra.profiles",
  attempts: "ra.attempts",
  settings: "ra.settings",
  currentProfile: "ra.currentProfile",
  token: "ra.token",
};

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export const storage = {
  getProfiles(): Profile[] {
    return read<Profile[]>(KEYS.profiles, []);
  },
  saveProfile(profile: Profile): void {
    const all = storage.getProfiles().filter((p) => p.id !== profile.id);
    all.push(profile);
    write(KEYS.profiles, all);
  },
  getCurrentProfileId(): string | null {
    return read<string | null>(KEYS.currentProfile, null);
  },
  setCurrentProfileId(id: string | null): void {
    write(KEYS.currentProfile, id);
  },

  getAttempts(profileId: string): Attempt[] {
    return read<Attempt[]>(KEYS.attempts, [])
      .filter((a) => a.profileId === profileId)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  },
  addAttempt(attempt: Attempt): void {
    const all = read<Attempt[]>(KEYS.attempts, []);
    all.push(attempt);
    write(KEYS.attempts, all);
  },
  // Replace a single profile's attempts (other profiles untouched). Used when
  // merging the server copy back into local storage.
  setAttemptsForProfile(profileId: string, attempts: Attempt[]): void {
    const others = read<Attempt[]>(KEYS.attempts, []).filter((a) => a.profileId !== profileId);
    write(KEYS.attempts, [...others, ...attempts]);
  },

  getToken(): string | null {
    return read<string | null>(KEYS.token, null);
  },
  setToken(token: string | null): void {
    if (token) write(KEYS.token, token);
    else localStorage.removeItem(KEYS.token);
  },

  getSettings(): Settings {
    return read<Settings>(KEYS.settings, { useLlm: true });
  },
  saveSettings(settings: Settings): void {
    write(KEYS.settings, settings);
  },

  exportProfile(profileId: string): string {
    const profile = storage.getProfiles().find((p) => p.id === profileId) ?? null;
    const attempts = storage.getAttempts(profileId);
    return JSON.stringify({ profile, attempts }, null, 2);
  },
  clearAll(): void {
    Object.values(KEYS).forEach((k) => localStorage.removeItem(k));
  },
};

// Lightweight non-cryptographic hash — local convenience gate only, NOT security.
export function hashPassword(pw: string): string {
  let h = 5381;
  for (let i = 0; i < pw.length; i++) h = (h * 33) ^ pw.charCodeAt(i);
  return (h >>> 0).toString(36);
}

export function uid(prefix = ""): string {
  return prefix + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}
