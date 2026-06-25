// Vercel serverless function — secure proxy to the AI.
// The Anthropic API key lives ONLY here (server-side env var), never in the
// browser, so the public site can offer integrated AI without exposing the key.
//
// Set the secret once in Vercel:  Project → Settings → Environment Variables
//   ANTHROPIC_API_KEY = sk-ant-...   (required)
//   EVAL_MODEL        = claude-sonnet-4-6   (optional override)

const DEFAULT_MODEL = "claude-sonnet-4-6";

// Allow the function to run longer than the 10s default — the leadership
// development plan is a larger generation. Vercel clamps this to the plan's max.
export const maxDuration = 60;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "method_not_allowed" });
    return;
  }

  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) {
    // No key configured → tell the client to fall back to the offline evaluator.
    res.status(503).json({ error: "ai_not_configured" });
    return;
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
    const { system, user, max_tokens, model } = body;
    if (!system || !user) {
      res.status(400).json({ error: "bad_request" });
      return;
    }
    // Allow a caller to request a specific Claude model (e.g. a faster one for
    // heavier generations). Falls back to the configured default otherwise.
    const reqModel = typeof model === "string" && /^claude-[a-z0-9.-]{1,60}$/.test(model) ? model : null;

    const upstream = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: reqModel || process.env.EVAL_MODEL || DEFAULT_MODEL,
        max_tokens: Math.min(Number(max_tokens) || 1200, 2048),
        system,
        messages: [{ role: "user", content: user }],
      }),
    });

    const data = await upstream.json().catch(() => null);
    if (!upstream.ok) {
      const detail = data?.error?.message || data?.error?.type || "HTTP " + upstream.status;
      res.status(502).json({ error: "upstream_error", status: upstream.status, detail: String(detail).slice(0, 300) });
      return;
    }

    const text = data?.content?.[0]?.text ?? "";
    res.status(200).json({ text });
  } catch {
    res.status(500).json({ error: "proxy_exception" });
  }
}
