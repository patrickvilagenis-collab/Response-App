// Register / passwordless sign-in: upserts a user and sends an activation link.
// Body: { email, name? }. Returns { ok, emailed, link?, isNew }.
import { store, cmd, validEmail, baseUrl, readBody, sendActivationEmail, uuid } from "./_store.js";

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
    if (!validEmail(email)) {
      res.status(400).json({ error: "invalid_email" });
      return;
    }

    const existingRaw = (await cmd(s, ["HGET", "ra:users", email]))?.result;
    const existing = existingRaw ? JSON.parse(existingRaw) : null;
    const token = uuid();
    const now = new Date().toISOString();
    const user = existing
      ? { ...existing, name: name || existing.name, token, lastRequestedAt: now }
      : { email, name: name || email.split("@")[0], status: "pending", token, createdAt: now, activatedAt: null, lastSeen: now };

    await cmd(s, ["HSET", "ra:users", email, JSON.stringify(user)]);

    const link = `${baseUrl(req)}/?activate=${token}`;
    const emailed = await sendActivationEmail(email, user.name, link);

    // Only expose the link when we couldn't email it (so the flow still works).
    res.status(200).json({ ok: true, emailed, link: emailed ? undefined : link, isNew: !existing });
  } catch {
    res.status(500).json({ error: "magic_failed" });
  }
}
