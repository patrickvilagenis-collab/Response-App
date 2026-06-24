import type { Attempt, Profile, Settings } from "../types";
import { storage } from "./storage";

// Server-side persistence of a user's data, keyed to their account. Lets the
// profile, attempt history and settings follow the user across devices instead
// of living only in one browser. All calls are best-effort: if the network or
// backend is unavailable, the app keeps working with local data.

export interface AccountSnapshot {
  profile: Profile | null;
  attempts: Attempt[];
  settings: Settings;
  updatedAt: string;
}

async function call(body: Record<string, unknown>): Promise<unknown | null> {
  try {
    const r = await fetch("/api/sync", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!r.ok) return null;
    return await r.json();
  } catch {
    return null;
  }
}

/** Fetch the account's snapshot from the server (null if none / unauthorized). */
export async function pullAccount(email: string, token: string): Promise<AccountSnapshot | null> {
  const d = (await call({ email, token, op: "load" })) as { data?: AccountSnapshot } | null;
  return d?.data ?? null;
}

/** Upload the account's snapshot. Returns true on success. */
export async function pushAccount(email: string, token: string, snapshot: AccountSnapshot): Promise<boolean> {
  const d = (await call({ email, token, op: "save", data: snapshot })) as { ok?: boolean } | null;
  return Boolean(d?.ok);
}

/** Build a snapshot of everything tied to one local profile. */
export function buildSnapshot(profile: Profile): AccountSnapshot {
  return {
    profile,
    attempts: storage.getAttempts(profile.id),
    settings: storage.getSettings(),
    updatedAt: new Date().toISOString(),
  };
}

/** Union two attempt lists by id, newest first. */
function mergeAttempts(a: Attempt[], b: Attempt[]): Attempt[] {
  const byId = new Map<string, Attempt>();
  for (const att of [...a, ...b]) byId.set(att.id, att);
  return [...byId.values()].sort((x, y) => y.createdAt.localeCompare(x.createdAt));
}

/**
 * Merge a server snapshot into local storage for `profileId`, keeping anything
 * created locally that the server hasn't seen yet. Returns the merged pieces so
 * the in-memory React state can be refreshed.
 */
export function mergeIntoLocal(
  profileId: string,
  local: Profile,
  server: AccountSnapshot
): { profile: Profile; attempts: Attempt[]; settings: Settings } {
  // Server profile fields win, but the local id/email anchor the account.
  const profile: Profile = { ...local, ...(server.profile || {}), id: profileId, email: local.email };
  storage.saveProfile(profile);

  const attempts = mergeAttempts(storage.getAttempts(profileId), server.attempts || []);
  storage.setAttemptsForProfile(profileId, attempts);

  const settings = server.settings || storage.getSettings();
  storage.saveSettings(settings);

  return { profile, attempts, settings };
}
