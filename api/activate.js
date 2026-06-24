// Activates an account from the link token, marking it active + logging the
// device in. Body or query: { token }. Returns { ok, email, name }.
import { store, cmd, readBody } from "./_store.js";

export default async function handler(req, res) {
  const s = store();
  if (!s) {
    res.status(503).json({ error: "accounts_not_configured" });
    return;
  }
  const token = req.method === "POST" ? readBody(req).token : (req.query && req.query.token);
  if (!token) {
    res.status(400).json({ error: "missing_token" });
    return;
  }
  try {
    const all = (await cmd(s, ["HGETALL", "ra:users"]))?.result || [];
    // HGETALL returns a flat [field, value, field, value, ...] array
    let found = null;
    for (let i = 0; i < all.length; i += 2) {
      try {
        const u = JSON.parse(all[i + 1]);
        if (u.token && u.token === token) {
          found = u;
          break;
        }
      } catch {
        /* skip */
      }
    }
    if (!found) {
      res.status(404).json({ error: "invalid_token" });
      return;
    }
    const now = new Date().toISOString();
    found.status = "active";
    found.activatedAt = found.activatedAt || now;
    found.lastSeen = now;
    found.token = ""; // single-use
    await cmd(s, ["HSET", "ra:users", found.email, JSON.stringify(found)]);
    res.status(200).json({ ok: true, email: found.email, name: found.name });
  } catch {
    res.status(500).json({ error: "activate_failed" });
  }
}
