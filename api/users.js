// Admin: list registered users (status, dates). Requires ADMIN_PASSWORD.
import { store, cmd, readBody } from "./_store.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "method_not_allowed" });
    return;
  }
  const adminPw = process.env.ADMIN_PASSWORD;
  const s = store();
  if (!adminPw || !s) {
    res.status(200).json({ configured: false });
    return;
  }
  if (String(readBody(req).password || "") !== adminPw) {
    res.status(401).json({ error: "unauthorized" });
    return;
  }
  try {
    const all = (await cmd(s, ["HGETALL", "ra:users"]))?.result || [];
    const users = [];
    for (let i = 0; i < all.length; i += 2) {
      try {
        const u = JSON.parse(all[i + 1]);
        users.push({
          email: u.email,
          name: u.name,
          status: u.status,
          createdAt: u.createdAt,
          activatedAt: u.activatedAt,
          lastSeen: u.lastSeen,
        });
      } catch {
        /* skip */
      }
    }
    users.sort((a, b) => (a.lastSeen < b.lastSeen ? 1 : -1));
    res.status(200).json({ configured: true, users });
  } catch {
    res.status(500).json({ error: "users_failed" });
  }
}
