import type { ReactNode } from "react";
import { useApp } from "../state/store";
import { LanguagePicker } from "./LanguagePicker";
import type { Route } from "../state/store";

const NAV: { name: Route["name"]; key: string }[] = [
  { name: "home", key: "nav.home" },
  { name: "library", key: "nav.library" },
  { name: "history", key: "nav.history" },
  { name: "settings", key: "nav.settings" },
];

export function AppShell({ children }: { children: ReactNode }) {
  const { t, route, go, logout, profile } = useApp();
  const active = route.name;

  return (
    <div className="shell">
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
