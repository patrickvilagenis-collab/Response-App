// Step 1 of sign-up: request activation. Takes just email (+ optional name),
// creates a PENDING account (no password yet) and emails an activation link.
// The password is set later, when the user clicks the link (api/activate).
// Body: { email, name? }. Returns { ok, emailed, link?, exists? }.
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
    if (!validEmail(email)) return res.status(400).json({ error: "invalid_email" });

    const existingRaw = (await cmd(s, ["HGET", "ra:users", email]))?.result;
    const existing = existingRaw ? JSON.parse(existingRaw) : null;
    if (existing && existing.status === "active") {
      return res.status(200).json({ ok: false, exists: true });
    }

    const token = uuid();
    const now = new Date().toISOString();
    const user = {
      email,
      name: name || existing?.name || email.split("@")[0],
      status: "pending",
      token,
      createdAt: existing?.createdAt || now,
      activatedAt: null,
      lastSeen: now,
    };
    await cmd(s, ["HSET", "ra:users", email, JSON.stringify(user)]);

    const link = `${baseUrl(req)}/?activate=${token}`;
    const m = await sendActivationEmail(email, user.name, link);
    res.status(200).json({ ok: true, emailed: m.sent, link: m.sent ? undefined : link, mailError: m.error });
  } catch {
    res.status(500).json({ error: "register_failed" });
  }
}
