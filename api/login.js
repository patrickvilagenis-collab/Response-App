// Log in with email + password. Returns { ok, email, name } on success.
// Distinguishes: bad credentials (401) vs not-yet-activated (403).
import { store, cmd, validEmail, readBody, verifyPw } from "./_store.js";

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
    const password = String(body.password || "");
    if (!validEmail(email)) return res.status(400).json({ error: "invalid_email" });

    const raw = (await cmd(s, ["HGET", "ra:users", email]))?.result;
    const user = raw ? JSON.parse(raw) : null;
    if (!user || !verifyPw(password, user.salt, user.hash)) {
      return res.status(401).json({ error: "bad_credentials" });
    }
    if (user.status !== "active") {
      return res.status(403).json({ error: "not_activated" });
    }
    user.lastSeen = new Date().toISOString();
    await cmd(s, ["HSET", "ra:users", email, JSON.stringify(user)]);
    res.status(200).json({ ok: true, email: user.email, name: user.name });
  } catch {
    res.status(500).json({ error: "login_failed" });
  }
}
