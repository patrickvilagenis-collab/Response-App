# Deploying Response-App online (Vercel)

This puts the app on a **public URL anyone can open**, with the **AI evaluation
built in** — visitors never enter an API key. Your Anthropic key is stored as a
secret on Vercel's servers and is used only by the serverless function in
[`api/evaluate.js`](./api/evaluate.js); it is never sent to the browser.

## One-time setup (~3 minutes)

1. **Get an Anthropic API key** at <https://console.anthropic.com> → *API Keys*.
   (You'll add some credit to your account; each evaluation is a small request.)

2. **Create a Vercel account** at <https://vercel.com> and click **“Add New… →
   Project”**, then **Import** this GitHub repository
   (`patrickvilagenis-collab/Response-App`).

3. Vercel auto-detects the Vite app (build `npm run build`, output `dist`) and
   the function in `/api`. Before clicking **Deploy**, open **Environment
   Variables** and add:

   | Name | Value |
   |---|---|
   | `ANTHROPIC_API_KEY` | your `sk-ant-…` key |
   | `EVAL_MODEL` *(optional)* | a model id, e.g. `claude-sonnet-4-6` |

4. Click **Deploy**. After ~1 minute you get a public URL like
   `https://response-app-xxxx.vercel.app`. Share it — anyone can use it, and the
   AI scores every response automatically.

## Updating the site

Every push to the deployment branch triggers an automatic redeploy. No manual
steps.

## How the AI integration stays secure

```
Visitor's browser ──POST /api/evaluate──▶ Vercel serverless function
   (no key here)                              (reads ANTHROPIC_API_KEY secret)
                                                        │
                                                        ▼
                                              Anthropic API ──▶ score + coaching
```

- The key lives only in the Vercel environment variable.
- The browser calls your own `/api/evaluate` endpoint (same origin, no CORS,
  no key).
- Only the **transcript text** (never audio) is sent for scoring.
- If the function is unreachable or the key isn't set, the app **automatically
  falls back** to the built-in offline evaluator, so the site never breaks.

## Cost control

- Each evaluation is one short request (~1k tokens). 
- To cap spend, set a budget/limit in the Anthropic console, or turn AI off by
  removing `ANTHROPIC_API_KEY` (the app reverts to the free offline evaluator).

## Optional: admin access to user responses

By default, each user's data stays only in their own browser. If you (the admin)
want to **see the responses everyone submits**, enable central logging:

1. In Vercel → your project → **Storage** → **Create Database** → choose
   **KV (Upstash Redis)** → connect it to the project. Vercel auto-adds the
   env vars `KV_REST_API_URL` and `KV_REST_API_TOKEN`.
2. In **Settings → Environment Variables**, add `ADMIN_PASSWORD` = a password
   only you know.
3. **Redeploy** (Deployments → ⋯ → Redeploy).

Now every submitted response is logged. To view them: open the app → **Settings**
→ **🔐 Admin** → enter your `ADMIN_PASSWORD`. You'll see each user's name,
challenge, score, time and full transcript.

- The password is checked **server-side**; it's never in the browser.
- Until you set this up, the Admin screen simply says "not configured" and the
  app behaves exactly as before (nothing is logged).
- This means transcripts are stored on the server. Tell your users if relevant —
  it changes the "data stays on your device" default.

## Other hosts

The same pattern works on **Cloudflare Pages** or **Netlify** — move the proxy
to their function format (`functions/` for Cloudflare, `netlify/functions/` for
Netlify) and set `ANTHROPIC_API_KEY` as a secret. The front end is unchanged; it
just calls `/api/evaluate`.
