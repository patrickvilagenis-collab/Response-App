// Logs each response to a central store so an admin can review them.
// Uses a Redis REST store (Vercel KV / Upstash). If no store is configured,
// this is a silent no-op — the app keeps working, nothing is logged.
//
// To enable: in Vercel → Storage, create a KV (Upstash Redis) store and connect
// it to the project (this injects KV_REST_API_URL / KV_REST_API_TOKEN). See DEPLOY.md.

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
  const s = store();
  if (!s) {
    res.status(200).json({ ok: false, reason: "not_configured" });
    return;
  }
  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
    const h = req.headers || {};
    const dec = (v) => {
      try { return decodeURIComponent(String(v || "")); } catch { return String(v || ""); }
    };
    const dims = body.dims || {};
    const c = body.coaching || {};
    const strArr = (v, n) =>
      Array.isArray(v) ? v.slice(0, 6).map((x) => String(x).slice(0, n)) : [];
    const rec = {
      ts: new Date().toISOString(),
      user: String(body.user || "anon").slice(0, 80),
      profileId: String(body.profileId || "").slice(0, 40),
      challengeId: String(body.challengeId || "").slice(0, 40),
      category: String(body.category || "").slice(0, 60),
      type: String(body.type || "").slice(0, 40),
      difficulty: Number(body.difficulty) || 0,
      locale: String(body.locale || "").slice(0, 8),
      inputMode: String(body.inputMode || "").slice(0, 10),
      scenario: String(body.scenario || "").slice(0, 1500),
      transcript: String(body.transcript || "").slice(0, 4000),
      final: Number(body.final) || 0,
      band: String(body.band || "").slice(0, 20),
      source: String(body.source || "").slice(0, 12),
      speedBonus: Number(body.speedBonus) || 0,
      responseTimeSec: Number(body.responseTimeSec) || 0,
      dims: {
        content: Number(dims.content) || 0,
        delivery: Number(dims.delivery) || 0,
        time: Number(dims.time) || 0,
      },
      headline: String(body.headline || "").slice(0, 400),
      coaching: {
        worked: strArr(c.worked, 300),
        missing: strArr(c.missing, 300),
        betterPhrasings: strArr(c.betterPhrasings, 400),
        improvedVersion: String(c.improvedVersion || "").slice(0, 2000),
        focusNext: String(c.focusNext || "").slice(0, 400),
      },
      // Approximate origin, provided automatically by Vercel's edge headers.
      country: String(h["x-vercel-ip-country"] || "").slice(0, 4),
      city: dec(h["x-vercel-ip-city"]).slice(0, 60),
    };
    await cmd(s, ["RPUSH", "ra:attempts", JSON.stringify(rec)]);
    await cmd(s, ["LTRIM", "ra:attempts", "-2000", "-1"]); // keep last 2000
    res.status(200).json({ ok: true });
  } catch {
    res.status(200).json({ ok: false, reason: "error" });
  }
}
