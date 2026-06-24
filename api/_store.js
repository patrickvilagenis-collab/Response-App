// Shared helpers for the account endpoints (register/magic, activate, users, seen).
// Files starting with "_" are NOT treated as routes by Vercel.
//
// Reuses the SAME Redis store as the team panel (Vercel KV / Upstash) — no new
// storage to set up. Email is sent via Resend if RESEND_API_KEY is configured;
// without it, the flow still works (the activation link is returned to the
// registrant so they can continue).

export function store() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url, token } : null;
}

export async function cmd(s, command) {
  const r = await fetch(s.url, {
    method: "POST",
    headers: { Authorization: `Bearer ${s.token}`, "content-type": "application/json" },
    body: JSON.stringify(command),
  });
  if (!r.ok) throw new Error("store " + r.status);
  return r.json();
}

export function validEmail(e) {
  return typeof e === "string" && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e) && e.length <= 160;
}

export function baseUrl(req) {
  const host = req.headers["x-forwarded-host"] || req.headers.host || "";
  const proto = req.headers["x-forwarded-proto"] || "https";
  return `${proto}://${host}`;
}

export function readBody(req) {
  return typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
}

export async function sendActivationEmail(to, name, link) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return false;
  const from = process.env.MAIL_FROM || "Response <onboarding@resend.dev>";
  const html = `
    <div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:480px;margin:auto;padding:24px;color:#16181d">
      <h1 style="font-size:22px;margin:0 0 8px">Welcome to Response${name ? ", " + escapeHtml(name) : ""} 👋</h1>
      <p style="color:#5b6072;line-height:1.5">Confirm your email to activate your account and start practising.</p>
      <p style="margin:24px 0">
        <a href="${link}" style="background:#4f46e5;color:#fff;text-decoration:none;padding:12px 22px;border-radius:10px;font-weight:600;display:inline-block">Activate my account</a>
      </p>
      <p style="color:#9aa0b0;font-size:13px">Or paste this link in your browser:<br>${link}</p>
    </div>`;
  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "content-type": "application/json" },
      body: JSON.stringify({ from, to, subject: "Activate your Response account", html }),
    });
    return r.ok;
  } catch {
    return false;
  }
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

export function uuid() {
  return globalThis.crypto?.randomUUID?.() ?? "t_" + Math.random().toString(36).slice(2) + Date.now().toString(36);
}
