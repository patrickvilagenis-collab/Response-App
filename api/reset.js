// Complete a password reset with the token from the email + a new password.
// Body: { token, password }. Returns { ok, email, name }.
import { store, cmd, readBody, makeHash, makeToken } from "./_store.js";

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
    const token = String(body.token || "");
    const password = String(body.password || "");
    if (!token) return res.status(400).json({ error: "missing_token" });
    if (password.length < 6) return res.status(400).json({ error: "weak_password" });

    const all = (await cmd(s, ["HGETALL", "ra:users"]))?.result || [];
    let user = null;
    for (let i = 0; i < all.length; i += 2) {
      try {
        const u = JSON.parse(all[i + 1]);
        if (u.resetToken && u.resetToken === token) {
          user = u;
          break;
        }
      } catch {
        /* skip */
      }
    }
    if (!user) return res.status(404).json({ error: "invalid_token" });
    if (user.resetExpiry && new Date(user.resetExpiry).getTime() < Date.now()) {
      return res.status(410).json({ error: "expired" });
    }

    const { salt, hash } = makeHash(password);
    user.salt = salt;
    user.hash = hash;
    user.resetToken = "";
    user.resetExpiry = "";
    // Completing a reset also confirms ownership → activate if still pending.
    if (user.status !== "active") {
      user.status = "active";
      user.activatedAt = user.activatedAt || new Date().toISOString();
    }
    user.lastSeen = new Date().toISOString();
    user.sessionToken = makeToken();
    await cmd(s, ["HSET", "ra:users", user.email, JSON.stringify(user)]);
    res.status(200).json({ ok: true, email: user.email, name: user.name, token: user.sessionToken });
  } catch {
    res.status(500).json({ error: "reset_failed" });
  }
}
