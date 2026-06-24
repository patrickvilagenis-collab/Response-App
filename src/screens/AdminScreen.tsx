import { useMemo, useState } from "react";
import { useApp } from "../state/store";
import { BAND_COLORS, bandFor } from "../lib/scoring";
import { getChallenge } from "../data/challenges";
import { TRACKS, tracksFor } from "../lib/tracks";

interface LoggedAttempt {
  ts: string;
  user: string;
  profileId?: string;
  challengeId: string;
  category: string;
  type?: string;
  difficulty: number;
  locale: string;
  inputMode: string;
  scenario?: string;
  transcript: string;
  final: number;
  band?: string;
  source?: string;
  speedBonus?: number;
  responseTimeSec: number;
  dims?: { content: number; delivery: number; time: number };
  headline?: string;
  coaching?: {
    worked: string[];
    missing: string[];
    betterPhrasings: string[];
    improvedVersion: string;
    focusNext: string;
  };
  country?: string;
  city?: string;
}

const CSV_COLS = [
  "ts", "user", "country", "city", "challengeId", "type", "category", "difficulty",
  "locale", "inputMode", "final", "band", "content", "delivery", "time",
  "responseTimeSec", "source", "speedBonus", "scenario", "transcript",
  "improvedVersion", "focusNext",
];

function exportCsv(rows: LoggedAttempt[], filename: string) {
  const esc = (v: unknown) => '"' + String(v ?? "").replace(/"/g, '""') + '"';
  const lines = [CSV_COLS.join(",")];
  for (const a of rows) {
    lines.push(
      [
        a.ts, a.user, a.country, a.city, a.challengeId, a.type, a.category, a.difficulty,
        a.locale, a.inputMode, a.final, a.band, a.dims?.content, a.dims?.delivery, a.dims?.time,
        a.responseTimeSec, a.source, a.speedBonus, a.scenario, a.transcript,
        a.coaching?.improvedVersion, a.coaching?.focusNext,
      ].map(esc).join(",")
    );
  }
  // UTF-8 BOM so Excel reads accents correctly.
  const blob = new Blob(["﻿" + lines.join("\r\n")], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const el = document.createElement("a");
  el.href = url;
  el.download = filename;
  el.click();
  URL.revokeObjectURL(url);
}

type State = "locked" | "loading" | "ok" | "wrong" | "notConfigured";

interface UserGroup {
  key: string;
  name: string;
  attempts: LoggedAttempt[];
  avg: number;
  last: string;
  country?: string;
  city?: string;
}

interface AccountUser {
  email: string;
  name: string;
  status: string;
  createdAt?: string;
  activatedAt?: string;
  lastSeen?: string;
}

export function AdminScreen() {
  const { t, go } = useApp();
  const [pw, setPw] = useState("");
  const [state, setState] = useState<State>("locked");
  const [list, setList] = useState<LoggedAttempt[]>([]);
  const [users, setUsers] = useState<AccountUser[]>([]);
  const [tab, setTab] = useState<"responses" | "users">("responses");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  async function unlock() {
    setState("loading");
    try {
      const r = await fetch("/api/admin", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ password: pw }),
      });
      if (r.status === 401) return setState("wrong");
      const d = await r.json();
      if (!d.configured) return setState("notConfigured");
      setList(d.attempts ?? []);
      // Also load registered accounts (best-effort).
      fetch("/api/users", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ password: pw }),
      })
        .then((u) => (u.ok ? u.json() : null))
        .then((ud) => ud?.users && setUsers(ud.users))
        .catch(() => {});
      setState("ok");
    } catch {
      setState("wrong");
    }
  }

  async function deleteUser(email: string) {
    if (!confirm(t("team.confirmDelete").replace("{email}", email))) return;
    try {
      const r = await fetch("/api/delete-user", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ password: pw, email }),
      });
      if (!r.ok) return;
      setUsers((prev) => prev.filter((u) => u.email !== email));
      // Drop their responses from the local view too.
      const acctId = "acct_" + email;
      setList((prev) => prev.filter((a) => a.profileId !== acctId && (a.user || "").toLowerCase() !== email));
    } catch {
      /* ignore */
    }
  }

  const groups = useMemo<UserGroup[]>(() => {
    const map = new Map<string, LoggedAttempt[]>();
    for (const a of list) {
      const key = (a.profileId || a.user || "anon") + "::" + a.user;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(a);
    }
    const out: UserGroup[] = [];
    for (const [key, attempts] of map) {
      const avg = Math.round(attempts.reduce((s, x) => s + x.final, 0) / attempts.length);
      const last = attempts.reduce((m, x) => (x.ts > m ? x.ts : m), attempts[0].ts);
      const withGeo = attempts.find((x) => x.country);
      out.push({ key, name: attempts[0].user, attempts, avg, last, country: withGeo?.country, city: withGeo?.city });
    }
    return out.sort((a, b) => (a.last < b.last ? 1 : -1));
  }, [list]);

  const filtered = useMemo(
    () => groups.filter((g) => g.name.toLowerCase().includes(query.toLowerCase().trim())),
    [groups, query]
  );

  const current = selected ? groups.find((g) => g.key === selected) : null;

  const teamAvg = list.length ? Math.round(list.reduce((s, a) => s + a.final, 0) / list.length) : 0;
  const trackBreakdown = useMemo(() => {
    const acc = new Map<string, number[]>();
    for (const a of list) {
      const ch = getChallenge(a.challengeId);
      if (!ch) continue;
      for (const tr of tracksFor(ch)) {
        if (!acc.has(tr)) acc.set(tr, []);
        acc.get(tr)!.push(a.final);
      }
    }
    return TRACKS.map((tr) => {
      const scores = acc.get(tr.id) ?? [];
      return { id: tr.id, icon: tr.icon, count: scores.length, avg: scores.length ? Math.round(scores.reduce((s, x) => s + x, 0) / scores.length) : 0 };
    }).filter((x) => x.count > 0);
  }, [list]);

  // ---- Gate ----
  if (state !== "ok") {
    return (
      <div className="page admin">
        <Header t={t} go={go} />
        <p className="muted">{t("admin.subtitle")}</p>
        <div className="admin-gate">
          <label className="field">
            {t("admin.password")}
            <input
              type="password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && unlock()}
              autoFocus
            />
          </label>
          <button className="btn primary" onClick={unlock} disabled={!pw || state === "loading"}>
            {state === "loading" ? "…" : t("admin.unlock")}
          </button>
          {state === "wrong" && <div className="error">{t("admin.wrong")}</div>}
          {state === "notConfigured" && <div className="notice">{t("admin.notConfigured")}</div>}
        </div>
      </div>
    );
  }

  // ---- Per-user detail ----
  if (current) {
    const byCat = new Map<string, number[]>();
    for (const a of current.attempts) {
      if (!byCat.has(a.category)) byCat.set(a.category, []);
      byCat.get(a.category)!.push(a.final);
    }
    const sorted = [...current.attempts].sort((a, b) => (a.ts < b.ts ? 1 : -1));
    return (
      <div className="page admin">
        <Header t={t} go={go} />
        <div className="admin-user-bar">
          <button className="btn ghost sm" onClick={() => setSelected(null)}>← {t("admin.allUsers")}</button>
          <button className="btn ghost sm" onClick={() => exportCsv(current.attempts, `response-app-${current.name}.csv`)}>⬇ {t("admin.export")}</button>
        </div>

        <div className="admin-user-head">
          <div className="admin-avatar">{current.name.charAt(0).toUpperCase()}</div>
          <div>
            <h2>{current.name}</h2>
            <div className="muted small">
              {flag(current.country)} {current.city ? current.city + " · " : ""}{current.country || "—"} · {current.attempts.length} {t("admin.count")}
            </div>
          </div>
          <div className="admin-user-avg" style={{ color: BAND_COLORS[bandFor(current.avg)] }}>
            {current.avg}%<span className="muted small"> {t("admin.avg")}</span>
          </div>
        </div>

        <div className="admin-cat-chips">
          {[...byCat.entries()].map(([cat, scores]) => (
            <span key={cat} className="tag ghost">
              {t(`cat.${cat}`)}: {Math.round(scores.reduce((s, x) => s + x, 0) / scores.length)}%
            </span>
          ))}
        </div>

        <div className="admin-list">
          {sorted.map((a, i) => <AttemptCard key={i} a={a} t={t} />)}
        </div>
      </div>
    );
  }

  // ---- User list ----
  const activeUsers = users.filter((u) => u.status === "active").length;
  return (
    <div className="page admin">
      <Header t={t} go={go} />

      <div className="admin-tabs">
        <button className={`admin-tab ${tab === "responses" ? "active" : ""}`} onClick={() => setTab("responses")}>
          {t("team.responses")}
        </button>
        <button className={`admin-tab ${tab === "users" ? "active" : ""}`} onClick={() => setTab("users")}>
          {t("team.users")} {users.length > 0 && <span className="admin-tab-count">{users.length}</span>}
        </button>
      </div>

      {tab === "users" ? (
        <>
          <div className="team-kpis">
            <div className="team-kpi"><span className="team-kpi-num">{users.length}</span><span className="team-kpi-label">{t("team.registered")}</span></div>
            <div className="team-kpi"><span className="team-kpi-num" style={{ color: "var(--good)" }}>{activeUsers}</span><span className="team-kpi-label">{t("team.active")}</span></div>
            <div className="team-kpi"><span className="team-kpi-num" style={{ color: "var(--warn)" }}>{users.length - activeUsers}</span><span className="team-kpi-label">{t("team.pending")}</span></div>
          </div>
          {users.length === 0 ? (
            <p className="muted">{t("team.noUsers")}</p>
          ) : (
            <div className="admin-list">
              {users.map((u) => (
                <div key={u.email} className="user-row">
                  <div className="admin-avatar">{(u.name || u.email).charAt(0).toUpperCase()}</div>
                  <div className="user-row-meta">
                    <strong>{u.name}</strong>
                    <span className="muted small">{u.email}</span>
                  </div>
                  <div className="user-row-right">
                    <span className={`status-badge ${u.status}`}>{u.status === "active" ? t("team.statusActive") : t("team.statusPending")}</span>
                    <span className="muted small">{u.lastSeen ? new Date(u.lastSeen).toLocaleDateString() : "—"}</span>
                  </div>
                  <button className="user-delete" onClick={() => deleteUser(u.email)} title={t("team.delete")} aria-label={t("team.delete")}>
                    🗑
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
      <>
      <div className="admin-toolbar">
        <input
          className="admin-search"
          placeholder={"🔍 " + t("admin.searchUser")}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <span className="muted small">{groups.length} {t("admin.users")} · {list.length} {t("admin.count")}</span>
        <button className="btn ghost sm" onClick={() => exportCsv(list, "response-app-all.csv")} disabled={list.length === 0}>⬇ {t("admin.export")}</button>
        <button className="btn ghost sm" onClick={unlock}>↻ {t("admin.refresh")}</button>
      </div>

      {list.length > 0 && (
        <>
          <div className="team-kpis">
            <div className="team-kpi"><span className="team-kpi-num">{groups.length}</span><span className="team-kpi-label">{t("team.people")}</span></div>
            <div className="team-kpi"><span className="team-kpi-num">{list.length}</span><span className="team-kpi-label">{t("team.sessions")}</span></div>
            <div className="team-kpi"><span className="team-kpi-num" style={{ color: BAND_COLORS[bandFor(teamAvg)] }}>{teamAvg}%</span><span className="team-kpi-label">{t("team.avg")}</span></div>
          </div>
          {trackBreakdown.length > 0 && (
            <div className="team-tracks">
              <span className="facet-label">{t("team.byTheme")}</span>
              {trackBreakdown.map((tr) => (
                <div key={tr.id} className="team-track-row">
                  <span className="team-track-name"><span className="track-chip-icon">{tr.icon}</span> {t(`track.${tr.id}`)}</span>
                  <div className="dimbar-track"><div className="dimbar-fill" style={{ width: `${tr.avg}%`, background: BAND_COLORS[bandFor(tr.avg)] }} /></div>
                  <span className="team-track-val">{tr.avg}%</span>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {list.length === 0 ? (
        <p className="muted">{t("admin.empty")}</p>
      ) : (
        <div className="admin-users">
          {filtered.map((g) => (
            <button key={g.key} className="admin-user-card" onClick={() => setSelected(g.key)}>
              <div className="admin-avatar">{g.name.charAt(0).toUpperCase()}</div>
              <div className="admin-user-meta">
                <strong>{g.name}</strong>
                <span className="muted small">{flag(g.country)} {g.country || "—"} · {g.attempts.length} {t("admin.count")}</span>
              </div>
              <span className="score-pill" style={{ background: BAND_COLORS[bandFor(g.avg)] }}>{g.avg}%</span>
            </button>
          ))}
        </div>
      )}
      </>
      )}
    </div>
  );
}

function Header({ t, go }: { t: (k: string) => string; go: ReturnType<typeof useApp>["go"] }) {
  return (
    <div className="hero between">
      <h1>{t("admin.title")}</h1>
      <button className="btn ghost sm" onClick={() => go({ name: "settings" })}>← {t("nav.settings")}</button>
    </div>
  );
}

function AttemptCard({ a, t }: { a: LoggedAttempt; t: (k: string) => string }) {
  const [open, setOpen] = useState(false);
  const band = bandFor(a.final);
  return (
    <div className="admin-row">
      <button className="admin-row-top" onClick={() => setOpen((o) => !o)}>
        <span className="score-pill" style={{ background: BAND_COLORS[band] }}>{a.final}%</span>
        <span className="admin-row-info">
          {a.type ? t(`type.${a.type}`) : a.challengeId} · {t(`cat.${a.category}`)} · {t(`diff.${a.difficulty}`)}
        </span>
        <span className="muted small admin-when">
          {a.responseTimeSec}s · {a.locale} · {new Date(a.ts).toLocaleString()}
        </span>
        <span className="admin-caret">{open ? "▾" : "▸"}</span>
      </button>

      {a.scenario && <div className="admin-question">“{a.scenario}”</div>}
      <div className="admin-transcript">{a.transcript || "—"}</div>

      {open && (
        <div className="admin-detail">
          {a.dims && (
            <div className="admin-dims">
              <DimMini label={t("dim.content")} v={a.dims.content} />
              <DimMini label={t("dim.delivery")} v={a.dims.delivery} />
              <DimMini label={t("dim.time")} v={a.dims.time} />
            </div>
          )}
          <div className="muted small">
            {t("admin.input")}: {a.inputMode} · {t("admin.scoredBy")}: {a.source === "llm" ? "AI" : "offline"}
            {a.speedBonus ? ` · +${a.speedBonus} ${t("eval.speedBonus")}` : ""}
          </div>

          {a.headline && <div className="admin-headline">{a.headline}</div>}

          {a.coaching && (
            <div className="admin-coaching">
              {a.coaching.worked?.length > 0 && (
                <CoachMini title={t("results.worked")} items={a.coaching.worked} tone="good" />
              )}
              {a.coaching.missing?.length > 0 && (
                <CoachMini title={t("results.missing")} items={a.coaching.missing} tone="warn" />
              )}
              {a.coaching.improvedVersion && (
                <div className="coach-block">
                  <h3>{t("results.improved")}</h3>
                  <div className="answer-card improved">{a.coaching.improvedVersion}</div>
                </div>
              )}
              {a.coaching.focusNext && (
                <div className="focus-box">
                  <span className="focus-label">{t("results.focus")}</span>
                  {a.coaching.focusNext}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function CoachMini({ title, items, tone }: { title: string; items: string[]; tone: "good" | "warn" }) {
  return (
    <div className="coach-block">
      <h3>{title}</h3>
      <ul className={`coach-list ${tone}`}>
        {items.map((it, i) => (
          <li key={i}>{it}</li>
        ))}
      </ul>
    </div>
  );
}

function DimMini({ label, v }: { label: string; v: number }) {
  const color = v >= 80 ? "#22c55e" : v >= 60 ? "#eab308" : "#ef4444";
  return (
    <div className="dimmini">
      <div className="dimmini-head"><span>{label}</span><span>{v}</span></div>
      <div className="dimbar-track"><div className="dimbar-fill" style={{ width: `${v}%`, background: color }} /></div>
    </div>
  );
}

/** ISO-3166 country code → flag emoji. */
function flag(code?: string): string {
  if (!code || code.length !== 2) return "🌐";
  const A = 0x1f1e6;
  return String.fromCodePoint(A + code.charCodeAt(0) - 65, A + code.charCodeAt(1) - 65);
}
