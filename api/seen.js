// Lightweight heartbeat: bumps a user's lastSeen so the admin can see who's
// currently active. Body: { email }. No-op if the account doesn't exist.
import { store, cmd, validEmail, readBody } from "./_store.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "method_not_allowed" });
    return;
  }
  const s = store();
  if (!s) {
    res.status(200).json({ ok: false });
    return;
  }
  try {
    const email = String(readBody(req).email || "").trim().toLowerCase();
    if (!validEmail(email)) {
      res.status(200).json({ ok: false });
      return;
    }
    const raw = (await cmd(s, ["HGET", "ra:users", email]))?.result;
    if (raw) {
      const u = JSON.parse(raw);
      u.lastSeen = new Date().toISOString();
      await cmd(s, ["HSET", "ra:users", email, JSON.stringify(u)]);
    }
    res.status(200).json({ ok: true });
  } catch {
    res.status(200).json({ ok: false });
  }
}
