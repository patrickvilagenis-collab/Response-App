// Polled by a waiting guest's browser. Body: { guestId } → { status }.
// status is one of: pending | approved | rejected | unknown.
import { store, cmd, readBody, clientIp, rateLimit } from "./_store.js";

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
    const guestId = String(readBody(req).guestId || "").trim().slice(0, 64);
    if (!/^[A-Za-z0-9_-]{8,64}$/.test(guestId)) return res.status(400).json({ error: "bad_id" });

    // Generous cap — this is polled, but still shouldn't be a free firehose.
    const limit = await rateLimit(s, "gueststatus:ip:" + clientIp(req), 240, 3600);
    if (!limit.ok) return res.status(429).json({ error: "too_many", retryAfter: limit.retryAfter });

    const raw = (await cmd(s, ["HGET", "ra:guests", guestId]))?.result;
    const status = raw ? JSON.parse(raw).status || "pending" : "unknown";
    res.status(200).json({ ok: true, status });
  } catch {
    res.status(500).json({ error: "guest_status_failed" });
  }
}
