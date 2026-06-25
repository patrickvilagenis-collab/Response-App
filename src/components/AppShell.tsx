import type { ReactNode } from "react";
import { useApp } from "../state/store";
import { LanguagePicker } from "./LanguagePicker";
import type { Route } from "../state/store";

export function AppShell({ children }: { children: ReactNode }) {
  const { t, route, go, logout, profile } = useApp();
  const active = route.name;

  const NAV: { name: Route["name"]; key: string }[] = [
    { name: "home", key: "nav.home" },
    { name: "library", key: "nav.library" },
    { name: "resources", key: "nav.resources" },
    { name: "framework", key: "nav.framework" },
    { name: "history", key: "nav.history" },
    ...(profile?.segment === "company" ? [{ name: "admin" as const, key: "nav.team" }] : []),
    { name: "settings", key: "nav.settings" },
  ];
  // Dark "focus" theme on the spotlight screens; full immersion (no chrome) on
  // the live moment (scenario, response, warm-up).
  const dark = active === "scenario" || active === "response" || active === "results" || active === "warmup";
  const immersive = active === "scenario" || active === "response" || active === "warmup";

  if (immersive) {
    return (
      <div className="shell focus-mode immersive-shell">
        <div className="spotlight-beam" aria-hidden="true" />
        <button className="focus-exit" onClick={() => go({ name: "library" })} aria-label="Exit">✕</button>
        <main className="content immersive">{children}</main>
      </div>
    );
  }

  return (
    <div className={`shell${dark ? " focus-mode" : ""}`}>
      <header className="topbar">
        <button className="brand" onClick={() => go({ name: "home" })}>
          <span className="brand-mark sm">◐</span>
          {t("app.name")}
        </button>
        <nav className="topnav">
          {NAV.map((n) => (
            <button
              key={n.name}
              className={`navlink ${active === n.name ? "active" : ""}`}
              onClick={() => go({ name: n.name } as Route)}
            >
              {t(n.key)}
            </button>
          ))}
        </nav>
        <div className="topbar-right">
          <LanguagePicker />
          <button className="navlink ghost" onClick={logout} title={t("nav.logout")}>
            {profile?.displayName} · {t("nav.logout")}
          </button>
        </div>
      </header>

      <main className="content">{children}</main>

      <nav className="tabbar">
        {NAV.map((n) => (
          <button
            key={n.name}
            className={`tab ${active === n.name ? "active" : ""}`}
            onClick={() => go({ name: n.name } as Route)}
          >
            {t(n.key)}
          </button>
        ))}
      </nav>
    </div>
  );
}
