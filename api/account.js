// Consolidated account endpoint. The Vercel Hobby plan caps a deployment at 12
// serverless functions, so every account action lives behind ONE function here
// and is selected with `body.action`. Behaviour is identical to the previous
// per-route handlers (login / register / reset / activate / seen / sync /
// guest). The owner-approval email link stays in its own GET route (approve.js).
import {
  store, cmd, validEmail, baseUrl, readBody, uuid,
  verifyPw, makeHash, makeToken, clientIp, rateLimit,
  sendOwnerApprovalEmail, sendResetEmail,
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
  const body = readBody(req);
  const action = String(body.action || "");
  try {
    switch (action) {
      case "login":
        return await login(s, req, res, body);
      case "register":
        return await register(s, req, res, body);
      case "reset-request":
        return await resetRequest(s, req, res, body);
      case "reset":
        return await resetComplete(s, req, res, body);
      case "activate":
        return await activate(s, req, res, body);
      case "seen":
        return await seen(s, body, res);
      case "sync":
        return await sync(s, body, res);
      case "guest-request":
        return await guestRequest(s, req, res, body);
      case "guest-status":
        return await guestStatus(s, req, res, body);
      default:
        return res.status(400).json({ error: "bad_action" });
    }
  } catch {
    res.status(500).json({ error: "account_failed" });
  }
}

async function login(s, req, res, body) {
  const email = String(body.email || "").trim().toLowerCase();
  const password = String(body.password || "");
  if (!validEmail(email)) return res.status(400).json({ error: "invalid_email" });

  const ip = clientIp(req);
  const ipLimit = await rateLimit(s, "login:ip:" + ip, 50, 900);
  if (!ipLimit.ok) return res.status(429).json({ error: "too_many", retryAfter: ipLimit.retryAfter });
  const acctLimit = await rateLimit(s, "login:email:" + email, 8, 900);
  if (!acctLimit.ok) return res.status(429).json({ error: "too_many", retryAfter: acctLimit.retryAfter });

  const raw = (await cmd(s, ["HGET", "ra:users", email]))?.result;
  const user = raw ? JSON.parse(raw) : null;
  if (!user) return res.status(401).json({ error: "bad_credentials" });
  if (user.status === "pending") return res.status(403).json({ error: "pending_approval" });
  if (user.status !== "active") return res.status(403).json({ error: "not_activated" });
  if (!verifyPw(password, user.salt, user.hash)) return res.status(401).json({ error: "bad_credentials" });

  user.lastSeen = new Date().toISOString();
  user.sessionToken = makeToken();
  await cmd(s, ["HSET", "ra:users", email, JSON.stringify(user)]);
  return res.status(200).json({ ok: true, email: user.email, name: user.name, token: user.sessionToken });
}

async function register(s, req, res, body) {
  const email = String(body.email || "").trim().toLowerCase();
  const name = String(body.name || "").trim().slice(0, 80);
  if (!validEmail(email)) return res.status(400).json({ error: "invalid_email" });

  const ip = clientIp(req);
  const ipLimit = await rateLimit(s, "register:ip:" + ip, 10, 3600);
  if (!ipLimit.ok) return res.status(429).json({ error: "too_many", retryAfter: ipLimit.retryAfter });
  const emailLimit = await rateLimit(s, "register:email:" + email, 5, 3600);
  if (!emailLimit.ok) return res.status(429).json({ error: "too_many", retryAfter: emailLimit.retryAfter });

  const existingRaw = (await cmd(s, ["HGET", "ra:users", email]))?.result;
  const existing = existingRaw ? JSON.parse(existingRaw) : null;
  if (existing && existing.status === "active") return res.status(200).json({ ok: false, exists: true });

  const approvalToken = uuid();
  const now = new Date().toISOString();
  const user = {
    email,
    name: name || existing?.name || email.split("@")[0],
    status: "pending",
    approvalToken,
    token: "",
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
  return res.status(200).json({ ok: true, pending: true, ownerNotified: m.sent, mailError: m.error });
}

async function resetRequest(s, req, res, body) {
  const email = String(body.email || "").trim().toLowerCase();
  if (!validEmail(email)) return res.status(400).json({ error: "invalid_email" });

  const ip = clientIp(req);
  const ipLimit = await rateLimit(s, "reset:ip:" + ip, 15, 3600);
  if (!ipLimit.ok) return res.status(429).json({ error: "too_many", retryAfter: ipLimit.retryAfter });
  const emailLimit = await rateLimit(s, "reset:email:" + email, 5, 3600);
  if (!emailLimit.ok) return res.status(429).json({ error: "too_many", retryAfter: emailLimit.retryAfter });

  const raw = (await cmd(s, ["HGET", "ra:users", email]))?.result;
  if (!raw) return res.status(200).json({ ok: true, emailed: false });
  const user = JSON.parse(raw);
  const token = uuid();
  user.resetToken = token;
  user.resetExpiry = new Date(Date.now() + 60 * 60 * 1000).toISOString();
  await cmd(s, ["HSET", "ra:users", email, JSON.stringify(user)]);

  const link = `${baseUrl(req)}/?reset=${token}`;
  const m = await sendResetEmail(email, user.name, link);
  return res.status(200).json({ ok: true, emailed: m.sent, link: m.sent ? undefined : link, mailError: m.error });
}

async function resetComplete(s, req, res, body) {
  const token = String(body.token || "");
  const password = String(body.password || "");
  if (!token) return res.status(400).json({ error: "missing_token" });
  if (password.length < 6) return res.status(400).json({ error: "weak_password" });

  const all = (await cmd(s, ["HGETALL", "ra:users"]))?.result || [];
  let user = null;
  for (let i = 0; i < all.length; i += 2) {
    try {
      const u = JSON.parse(all[i + 1]);
      if (u.resetToken && u.resetToken === token) { user = u; break; }
    } catch { /* skip */ }
  }
  if (!user) return res.status(404).json({ error: "invalid_token" });
  if (user.resetExpiry && new Date(user.resetExpiry).getTime() < Date.now()) {
    return res.status(410).json({ error: "expired" });
  }

  const { salt, hash } = makeHash(password);
  user.salt = salt;
  user.hash = hash;
  user.resetToken = "";
  user.resetExpiry = "";
  if (user.status !== "active") {
    user.status = "active";
    user.activatedAt = user.activatedAt || new Date().toISOString();
  }
  user.lastSeen = new Date().toISOString();
  user.sessionToken = makeToken();
  await cmd(s, ["HSET", "ra:users", user.email, JSON.stringify(user)]);
  return res.status(200).json({ ok: true, email: user.email, name: user.name, token: user.sessionToken });
}

async function activate(s, req, res, body) {
  const token = String(body.token || "");
  const password = String(body.password || "");
  if (!token) return res.status(400).json({ error: "missing_token" });
  if (password.length < 6) return res.status(400).json({ error: "weak_password" });

  const all = (await cmd(s, ["HGETALL", "ra:users"]))?.result || [];
  let user = null;
  for (let i = 0; i < all.length; i += 2) {
    try {
      const u = JSON.parse(all[i + 1]);
      if (u.token && u.token === token) { user = u; break; }
    } catch { /* skip */ }
  }
  if (!user) return res.status(404).json({ error: "invalid_token" });
  if (user.status !== "approved" && user.status !== "active") {
    return res.status(403).json({ error: "not_approved" });
  }

  const { salt, hash } = makeHash(password);
  const now = new Date().toISOString();
  user.salt = salt;
  user.hash = hash;
  user.status = "active";
  user.activatedAt = user.activatedAt || now;
  user.lastSeen = now;
  user.token = "";
  user.sessionToken = makeToken();
  await cmd(s, ["HSET", "ra:users", user.email, JSON.stringify(user)]);
  return res.status(200).json({ ok: true, email: user.email, name: user.name, token: user.sessionToken });
}

async function seen(s, body, res) {
  const email = String(body.email || "").trim().toLowerCase();
  if (!validEmail(email)) return res.status(200).json({ ok: false });
  const raw = (await cmd(s, ["HGET", "ra:users", email]))?.result;
  if (raw) {
    const u = JSON.parse(raw);
    u.lastSeen = new Date().toISOString();
    await cmd(s, ["HSET", "ra:users", email, JSON.stringify(u)]);
  }
  return res.status(200).json({ ok: true });
}

const MAX_SYNC_BYTES = 2_000_000;
async function sync(s, body, res) {
  const email = String(body.email || "").trim().toLowerCase();
  const token = String(body.token || "");
  const op = String(body.op || "");
  if (!validEmail(email)) return res.status(400).json({ error: "invalid_email" });
  if (!token) return res.status(401).json({ error: "no_token" });

  const raw = (await cmd(s, ["HGET", "ra:users", email]))?.result;
  const user = raw ? JSON.parse(raw) : null;
  if (!user || user.sessionToken !== token) return res.status(401).json({ error: "unauthorized" });

  if (op === "load") {
    const stored = (await cmd(s, ["HGET", "ra:userdata", email]))?.result;
    return res.status(200).json({ ok: true, data: stored ? JSON.parse(stored) : null });
  }
  if (op === "save") {
    const json = JSON.stringify(body.data ?? null);
    if (json.length > MAX_SYNC_BYTES) return res.status(413).json({ error: "too_large" });
    await cmd(s, ["HSET", "ra:userdata", email, json]);
    return res.status(200).json({ ok: true });
  }
  return res.status(400).json({ error: "bad_op" });
}

const GUEST_ID_RE = /^[A-Za-z0-9_-]{8,64}$/;
async function guestRequest(s, req, res, body) {
  const guestId = String(body.guestId || "").trim().slice(0, 64);
  const name = String(body.name || "").trim().slice(0, 80);
  if (!GUEST_ID_RE.test(guestId)) return res.status(400).json({ error: "bad_id" });
  if (name.length < 2) return res.status(400).json({ error: "name_required" });

  const ip = clientIp(req);
  const ipLimit = await rateLimit(s, "guest:ip:" + ip, 12, 3600);
  if (!ipLimit.ok) return res.status(429).json({ error: "too_many", retryAfter: ipLimit.retryAfter });

  const existingRaw = (await cmd(s, ["HGET", "ra:guests", guestId]))?.result;
  const existing = existingRaw ? JSON.parse(existingRaw) : null;
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
  return res.status(200).json({ ok: true, status: "pending", ownerNotified: m.sent });
}

async function guestStatus(s, req, res, body) {
  const guestId = String(body.guestId || "").trim().slice(0, 64);
  if (!GUEST_ID_RE.test(guestId)) return res.status(400).json({ error: "bad_id" });
  const limit = await rateLimit(s, "gueststatus:ip:" + clientIp(req), 240, 3600);
  if (!limit.ok) return res.status(429).json({ error: "too_many", retryAfter: limit.retryAfter });
  const raw = (await cmd(s, ["HGET", "ra:guests", guestId]))?.result;
  const status = raw ? JSON.parse(raw).status || "pending" : "unknown";
  return res.status(200).json({ ok: true, status });
}
