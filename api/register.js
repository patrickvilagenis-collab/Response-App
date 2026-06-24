// Register a new account: email + name + password (set by the user).
// Stores the password hashed, status "pending", and emails an activation link.
// Body: { email, name, password }. Returns { ok, emailed, link?, exists? }.
import { store, cmd, validEmail, baseUrl, readBody, sendActivationEmail, makeHash, uuid } from "./_store.js";

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
    const name = String(body.name || "").trim().slice(0, 80);
    const password = String(body.password || "");
    if (!validEmail(email)) return res.status(400).json({ error: "invalid_email" });
    if (password.length < 6) return res.status(400).json({ error: "weak_password" });

    const existingRaw = (await cmd(s, ["HGET", "ra:users", email]))?.result;
    const existing = existingRaw ? JSON.parse(existingRaw) : null;
    if (existing && existing.status === "active") {
      // Already a real account — don't overwrite it.
      return res.status(200).json({ ok: false, exists: true });
    }

    const { salt, hash } = makeHash(password);
    const token = uuid();
    const now = new Date().toISOString();
    const user = {
      email,
      name: name || email.split("@")[0],
      status: "pending",
      salt,
      hash,
      token,
      createdAt: existing?.createdAt || now,
      activatedAt: null,
      lastSeen: now,
    };
    await cmd(s, ["HSET", "ra:users", email, JSON.stringify(user)]);

    const link = `${baseUrl(req)}/?activate=${token}`;
    const emailed = await sendActivationEmail(email, user.name, link);
    res.status(200).json({ ok: true, emailed, link: emailed ? undefined : link });
  } catch {
    res.status(500).json({ error: "register_failed" });
  }
}
