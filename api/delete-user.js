// Admin: delete a user completely — their account AND their logged responses.
// Requires ADMIN_PASSWORD. Body: { password, email }. Returns { ok }.
import { store, cmd, readBody } from "./_store.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "method_not_allowed" });
    return;
  }
  const adminPw = process.env.ADMIN_PASSWORD;
  const s = store();
  if (!adminPw || !s) {
    res.status(200).json({ ok: false, configured: false });
    return;
  }
  const body = readBody(req);
  if (String(body.password || "") !== adminPw) {
    res.status(401).json({ error: "unauthorized" });
    return;
  }
  const email = String(body.email || "").trim().toLowerCase();
  if (!email) return res.status(400).json({ error: "missing_email" });

  try {
    // 1) Remove the account and its synced data (profile/history/settings).
    await cmd(s, ["HDEL", "ra:users", email]);
    await cmd(s, ["HDEL", "ra:userdata", email]);

    // 2) Remove their logged responses (account profileId = "acct_<email>").
    const acctId = "acct_" + email;
    const raw = (await cmd(s, ["LRANGE", "ra:attempts", "0", "-1"]))?.result || [];
    const kept = [];
    let removed = 0;
    for (const item of raw) {
      try {
        const a = JSON.parse(item);
        if (a.profileId === acctId || (a.user && a.user.toLowerCase() === email)) {
          removed++;
          continue;
        }
      } catch {
        /* keep unparseable */
      }
      kept.push(item);
    }
    if (removed > 0) {
      await cmd(s, ["DEL", "ra:attempts"]);
      if (kept.length) await cmd(s, ["RPUSH", "ra:attempts", ...kept]);
    }
    res.status(200).json({ ok: true, removedResponses: removed });
  } catch {
    res.status(500).json({ error: "delete_failed" });
  }
}
