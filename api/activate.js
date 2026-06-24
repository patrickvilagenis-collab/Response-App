// Step 2 of sign-up: the user clicked the activation link and now SETS their
// password (entered twice on the client). Activates the account and logs in.
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
  const body = readBody(req);
  const token = String(body.token || "");
  const password = String(body.password || "");
  if (!token) return res.status(400).json({ error: "missing_token" });
  if (password.length < 6) return res.status(400).json({ error: "weak_password" });

  try {
    const all = (await cmd(s, ["HGETALL", "ra:users"]))?.result || [];
    let user = null;
    for (let i = 0; i < all.length; i += 2) {
      try {
        const u = JSON.parse(all[i + 1]);
        if (u.token && u.token === token) {
          user = u;
          break;
        }
      } catch {
        /* skip */
      }
    }
    if (!user) return res.status(404).json({ error: "invalid_token" });
    // Only owner-approved accounts can be activated.
    if (user.status !== "approved" && user.status !== "active") {
      return res.status(403).json({ error: "not_approved" });
    }

    const { salt, hash } = makeHash(password);
    const now = new Date().toISOString();
    user.salt = salt;
    user.hash = hash;
    user.status = "active";
    user.activatedAt = user.activatedAt || now;
    user.lastSeen = now;
    user.token = ""; // single-use activation token
    user.sessionToken = makeToken();
    await cmd(s, ["HSET", "ra:users", user.email, JSON.stringify(user)]);
    res.status(200).json({ ok: true, email: user.email, name: user.name, token: user.sessionToken });
  } catch {
    res.status(500).json({ error: "activate_failed" });
  }
}
