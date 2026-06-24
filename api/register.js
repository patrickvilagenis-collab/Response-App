// Step 1 of sign-up: request access. Takes email (+ optional name), creates a
// PENDING account and emails the OWNER an Approve / Reject decision. Nothing is
// sent to the user yet — only after the owner approves do they get an activation
// link to set their password (see api/approve.js → sendActivationEmail).
// Body: { email, name? }. Returns { ok, pending } or { exists }.
import {
  store, cmd, validEmail, baseUrl, readBody, uuid,
  clientIp, rateLimit, sendOwnerApprovalEmail,
} from "./_store.js";

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

    // Anti-abuse: cap sign-up attempts per IP and per email.
    const ip = clientIp(req);
    const ipLimit = await rateLimit(s, "register:ip:" + ip, 10, 3600);
    if (!ipLimit.ok) return res.status(429).json({ error: "too_many", retryAfter: ipLimit.retryAfter });
    const emailLimit = await rateLimit(s, "register:email:" + email, 5, 3600);
    if (!emailLimit.ok) return res.status(429).json({ error: "too_many", retryAfter: emailLimit.retryAfter });

    const existingRaw = (await cmd(s, ["HGET", "ra:users", email]))?.result;
    const existing = existingRaw ? JSON.parse(existingRaw) : null;
    if (existing && existing.status === "active") {
      return res.status(200).json({ ok: false, exists: true });
    }

    const approvalToken = uuid();
    const now = new Date().toISOString();
    const user = {
      email,
      name: name || existing?.name || email.split("@")[0],
      status: "pending", // awaiting owner approval
      approvalToken,
      token: "", // activation token issued on approval
      createdAt: existing?.createdAt || now,
      activatedAt: null,
      lastSeen: now,
    };
    await cmd(s, ["HSET", "ra:users", email, JSON.stringify(user)]);

    const base = baseUrl(req);
    const m = await sendOwnerApprovalEmail({
      kind: "user",
      name: user.name,
      email,
      approveLink: `${base}/api/approve?token=${approvalToken}&action=approve`,
      rejectLink: `${base}/api/approve?token=${approvalToken}&action=reject`,
    });
    res.status(200).json({ ok: true, pending: true, ownerNotified: m.sent, mailError: m.error });
  } catch {
    res.status(500).json({ error: "register_failed" });
  }
}
