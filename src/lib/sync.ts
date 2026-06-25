import type { Attempt, DevPlan, PlanSnapshot, Profile, Settings } from "../types";
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
    const r = await fetch("/api/account", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ action: "sync", ...body }),
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

/** Keep whichever leadership plan was generated most recently. */
function newerPlan(a?: DevPlan, b?: DevPlan): DevPlan | undefined {
  if (!a) return b;
  if (!b) return a;
  return (b.generatedAt || "").localeCompare(a.generatedAt || "") > 0 ? b : a;
}

/** Union plan-history snapshots by timestamp so the trend never loses entries. */
function mergeHistory(a?: PlanSnapshot[], b?: PlanSnapshot[]): PlanSnapshot[] {
  const byAt = new Map<string, PlanSnapshot>();
  for (const s of [...(a || []), ...(b || [])]) if (s?.generatedAt) byAt.set(s.generatedAt, s);
  return [...byAt.values()].sort((x, y) => x.generatedAt.localeCompare(y.generatedAt)).slice(-12);
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
  // The leadership plan & its history are edited locally and may be newer here
  // than on the server (e.g. a fresh analysis whose push hasn't landed yet).
  // Merge by recency/union instead of letting a stale server copy clobber them.
  profile.devPlan = newerPlan(local.devPlan, server.profile?.devPlan);
  const history = mergeHistory(local.devPlanHistory, server.profile?.devPlanHistory);
  if (history.length) profile.devPlanHistory = history;
  storage.saveProfile(profile);

  const attempts = mergeAttempts(storage.getAttempts(profileId), server.attempts || []);
  storage.setAttemptsForProfile(profileId, attempts);

  const settings = server.settings || storage.getSettings();
  storage.saveSettings(settings);

  return { profile, attempts, settings };
}
