// Log in with email + password. Returns { ok, email, name } on success.
// Distinguishes: bad credentials (401) vs not-yet-activated (403).
import { store, cmd, validEmail, readBody, verifyPw, makeToken, clientIp, rateLimit } from "./_store.js";

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

    // Anti-brute-force: cap attempts per IP and per account. Someone hammering
    // the form 20,000 times gets blocked long before they get anywhere.
    const ip = clientIp(req);
    const ipLimit = await rateLimit(s, "login:ip:" + ip, 50, 900); // 50 / 15 min per IP
    if (!ipLimit.ok) return res.status(429).json({ error: "too_many", retryAfter: ipLimit.retryAfter });
    const acctLimit = await rateLimit(s, "login:email:" + email, 8, 900); // 8 / 15 min per account
    if (!acctLimit.ok) return res.status(429).json({ error: "too_many", retryAfter: acctLimit.retryAfter });

    const raw = (await cmd(s, ["HGET", "ra:users", email]))?.result;
    const user = raw ? JSON.parse(raw) : null;
    if (!user) return res.status(401).json({ error: "bad_credentials" });
    if (user.status === "pending") return res.status(403).json({ error: "pending_approval" });
    if (user.status !== "active") return res.status(403).json({ error: "not_activated" });
    if (!verifyPw(password, user.salt, user.hash)) {
      return res.status(401).json({ error: "bad_credentials" });
    }
    user.lastSeen = new Date().toISOString();
    user.sessionToken = makeToken();
    await cmd(s, ["HSET", "ra:users", email, JSON.stringify(user)]);
    res.status(200).json({ ok: true, email: user.email, name: user.name, token: user.sessionToken });
  } catch {
    res.status(500).json({ error: "login_failed" });
  }
}
