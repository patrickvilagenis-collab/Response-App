import { useMemo, useState } from "react";
import { useApp } from "../state/store";
import { BAND_COLORS, bandFor } from "../lib/scoring";

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
  country?: string;
  city?: string;
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

export function AdminScreen() {
  const { t, go } = useApp();
  const [pw, setPw] = useState("");
  const [state, setState] = useState<State>("locked");
  const [list, setList] = useState<LoggedAttempt[]>([]);
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
      setState("ok");
    } catch {
      setState("wrong");
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
        <button className="btn ghost sm" onClick={() => setSelected(null)}>← {t("admin.allUsers")}</button>

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
  return (
    <div className="page admin">
      <Header t={t} go={go} />
      <div className="admin-toolbar">
        <input
          className="admin-search"
          placeholder={"🔍 " + t("admin.searchUser")}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <span className="muted small">{groups.length} {t("admin.users")} · {list.length} {t("admin.count")}</span>
        <button className="btn ghost sm" onClick={unlock}>↻ {t("admin.refresh")}</button>
      </div>

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
        </div>
      )}
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
