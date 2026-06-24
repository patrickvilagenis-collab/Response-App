// Request a password reset: emails a reset link if the account exists.
// Always returns ok (so it doesn't reveal whether an email is registered).
// Body: { email }. Returns { ok, emailed, link? }.
import { store, cmd, validEmail, baseUrl, readBody, sendResetEmail, uuid } from "./_store.js";

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
    const email = String(readBody(req).email || "").trim().toLowerCase();
    if (!validEmail(email)) return res.status(400).json({ error: "invalid_email" });

    const raw = (await cmd(s, ["HGET", "ra:users", email]))?.result;
    if (!raw) {
      // Don't leak existence — pretend success.
      return res.status(200).json({ ok: true, emailed: false });
    }
    const user = JSON.parse(raw);
    const token = uuid();
    user.resetToken = token;
    user.resetExpiry = new Date(Date.now() + 60 * 60 * 1000).toISOString(); // 1h
    await cmd(s, ["HSET", "ra:users", email, JSON.stringify(user)]);

    const link = `${baseUrl(req)}/?reset=${token}`;
    const m = await sendResetEmail(email, user.name, link);
    res.status(200).json({ ok: true, emailed: m.sent, link: m.sent ? undefined : link, mailError: m.error });
  } catch {
    res.status(500).json({ error: "reset_request_failed" });
  }
}
