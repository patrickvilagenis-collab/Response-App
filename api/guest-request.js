// A guest asking to try the app. Creates a PENDING guest record and emails the
// owner an Approve / Reject decision. The browser then polls /api/guest-status
// until it flips to "approved". Body: { guestId, name? } → { ok, status }.
import {
  store, cmd, readBody, uuid, baseUrl,
  clientIp, rateLimit, sendOwnerApprovalEmail,
} from "./_store.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "method_not_allowed" });
    return;
  }
  const s = store();
  if (!s) {
    // No accounts backend → nothing to gate against; let the client fall back.
    res.status(503).json({ error: "accounts_not_configured" });
    return;
  }
  try {
    const body = readBody(req);
    const guestId = String(body.guestId || "").trim().slice(0, 64);
    const name = String(body.name || "").trim().slice(0, 80);
    if (!/^[A-Za-z0-9_-]{8,64}$/.test(guestId)) return res.status(400).json({ error: "bad_id" });

    const ip = clientIp(req);
    const ipLimit = await rateLimit(s, "guest:ip:" + ip, 12, 3600);
    if (!ipLimit.ok) return res.status(429).json({ error: "too_many", retryAfter: ipLimit.retryAfter });

    const existingRaw = (await cmd(s, ["HGET", "ra:guests", guestId]))?.result;
    const existing = existingRaw ? JSON.parse(existingRaw) : null;
    // Already decided → just report it, don't re-spam the owner.
    if (existing && (existing.status === "approved" || existing.status === "rejected")) {
      return res.status(200).json({ ok: true, status: existing.status });
    }

    const approvalToken = uuid();
    const now = new Date().toISOString();
    const guest = {
      id: guestId,
      name: name || existing?.name || "Guest",
      status: "pending",
      approvalToken,
      ip,
      ua: String(req.headers["user-agent"] || "").slice(0, 200),
      createdAt: existing?.createdAt || now,
    };
    await cmd(s, ["HSET", "ra:guests", guestId, JSON.stringify(guest)]);

    const base = baseUrl(req);
    const m = await sendOwnerApprovalEmail({
      kind: "guest",
      name: guest.name,
      email: "",
      approveLink: `${base}/api/approve?token=${approvalToken}&action=approve`,
      rejectLink: `${base}/api/approve?token=${approvalToken}&action=reject`,
    });
    res.status(200).json({ ok: true, status: "pending", ownerNotified: m.sent });
  } catch {
    res.status(500).json({ error: "guest_request_failed" });
  }
}
