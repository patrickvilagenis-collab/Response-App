// Owner-facing approval link, opened from the email sent by register.js /
// guest-request.js. GET /api/approve?token=...&action=approve|reject
// Approving a user issues their activation email; approving a guest unlocks the
// browser that's polling guest-status. Returns a small HTML confirmation page.
import { store, cmd, baseUrl, uuid, sendActivationEmail } from "./_store.js";

function page(title, body) {
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${title}</title></head>
  <body style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;background:#0c1430;color:#e7ecf7;display:flex;min-height:100vh;align-items:center;justify-content:center;margin:0">
  <div style="max-width:440px;padding:32px;text-align:center;background:#121a36;border:1px solid #26345e;border-radius:16px;color:#dfe6f5">
  <h1 style="font-size:22px;margin:0 0 10px">${title}</h1>
  <p style="color:#9aa6c4;line-height:1.5;margin:0">${body}</p>
  </div></body></html>`;
}

export default async function handler(req, res) {
  const s = store();
  res.setHeader("content-type", "text/html; charset=utf-8");
  if (!s) return res.status(503).send(page("Not configured", "Accounts are not enabled on this deployment."));

  const token = String(req.query?.token || "");
  const action = String(req.query?.action || "");
  if (!token || (action !== "approve" && action !== "reject")) {
    return res.status(400).send(page("Invalid link", "This approval link is malformed."));
  }

  try {
    // Find a matching user OR guest by approvalToken.
    const users = (await cmd(s, ["HGETALL", "ra:users"]))?.result || [];
    for (let i = 0; i < users.length; i += 2) {
      let u;
      try { u = JSON.parse(users[i + 1]); } catch { continue; }
      if (u.approvalToken && u.approvalToken === token) {
        if (action === "reject") {
          await cmd(s, ["HDEL", "ra:users", u.email]);
          return res.status(200).send(page("Access rejected", `${u.email} will not be able to sign in.`));
        }
        // Approve: move to "approved", issue an activation token + email.
        const activation = uuid();
        u.status = "approved";
        u.approvalToken = "";
        u.token = activation;
        await cmd(s, ["HSET", "ra:users", u.email, JSON.stringify(u)]);
        await sendActivationEmail(u.email, u.name, `${baseUrl(req)}/?activate=${activation}`);
        return res.status(200).send(page("Access approved ✓", `${u.email} has been emailed a link to set their password and finish.`));
      }
    }

    const guests = (await cmd(s, ["HGETALL", "ra:guests"]))?.result || [];
    for (let i = 0; i < guests.length; i += 2) {
      let g;
      try { g = JSON.parse(guests[i + 1]); } catch { continue; }
      if (g.approvalToken && g.approvalToken === token) {
        g.status = action === "approve" ? "approved" : "rejected";
        g.approvalToken = "";
        g.decidedAt = new Date().toISOString();
        await cmd(s, ["HSET", "ra:guests", g.id, JSON.stringify(g)]);
        return res
          .status(200)
          .send(
            action === "approve"
              ? page("Guest approved ✓", `${g.name || "The guest"} can now start practising.`)
              : page("Guest rejected", `${g.name || "The guest"} will not be allowed in.`)
          );
      }
    }

    return res.status(404).send(page("Link expired", "This request was already handled or no longer exists."));
  } catch {
    return res.status(500).send(page("Something went wrong", "Please try the link again in a moment."));
  }
}
