// Returns all logged responses to an authenticated admin.
// Requires ADMIN_PASSWORD (env secret) and a Redis REST store (see api/log.js).
// The password is checked server-side; it is never shipped to the browser.

function store() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url, token } : null;
}

async function cmd(s, command) {
  const r = await fetch(s.url, {
    method: "POST",
    headers: { Authorization: `Bearer ${s.token}`, "content-type": "application/json" },
    body: JSON.stringify(command),
  });
  if (!r.ok) throw new Error("store " + r.status);
  return r.json();
}

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
  const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
  if (String(body.password || "") !== adminPw) {
    res.status(401).json({ error: "unauthorized" });
    return;
  }
  try {
    const out = await cmd(s, ["LRANGE", "ra:attempts", "0", "-1"]);
    const list = Array.isArray(out.result)
      ? out.result
          .map((x) => {
            try {
              return JSON.parse(x);
            } catch {
              return null;
            }
          })
          .filter(Boolean)
      : [];
    res.status(200).json({ configured: true, attempts: list.reverse() });
  } catch {
    res.status(500).json({ error: "store_error" });
  }
}
