// Per-account data sync: stores a user's profile, attempt history and settings
// server-side so it follows them across devices/browsers. Reuses the SAME Redis
// store as the accounts (no new storage to set up).
//
// Body: { email, token, op: "load" }            -> { ok, data }
//       { email, token, op: "save", data: {...} } -> { ok }
//
// The token is the opaque sessionToken issued by login/activate/reset. A request
// only succeeds if (email, token) matches the stored account — so a user can
// only read or write their OWN data.
import { store, cmd, validEmail, readBody } from "./_store.js";

// Guard against a runaway payload filling the store (attempts accumulate).
const MAX_BYTES = 2_000_000; // ~2 MB per account

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "method_not_allowed" });
    return;
  }
  const s = store();
  if (!s) {
    res.status(503).json({ error: "accounts_not_configured" });
    return;
  }
  try {
    const body = readBody(req);
    const email = String(body.email || "").trim().toLowerCase();
    const token = String(body.token || "");
    const op = String(body.op || "");
    if (!validEmail(email)) return res.status(400).json({ error: "invalid_email" });
    if (!token) return res.status(401).json({ error: "no_token" });

    const raw = (await cmd(s, ["HGET", "ra:users", email]))?.result;
    const user = raw ? JSON.parse(raw) : null;
    if (!user || user.sessionToken !== token) {
      return res.status(401).json({ error: "unauthorized" });
    }

    if (op === "load") {
      const stored = (await cmd(s, ["HGET", "ra:userdata", email]))?.result;
      return res.status(200).json({ ok: true, data: stored ? JSON.parse(stored) : null });
    }

    if (op === "save") {
      const json = JSON.stringify(body.data ?? null);
      if (json.length > MAX_BYTES) return res.status(413).json({ error: "too_large" });
      await cmd(s, ["HSET", "ra:userdata", email, json]);
      return res.status(200).json({ ok: true });
    }

    return res.status(400).json({ error: "bad_op" });
  } catch {
    res.status(500).json({ error: "sync_failed" });
  }
}
