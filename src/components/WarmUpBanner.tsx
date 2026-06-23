import { useApp } from "../state/store";

export function WarmUpBanner() {
  const { t, go } = useApp();
  return (
    <button className="warmup-banner" onClick={() => go({ name: "warmup" })}>
      <span className="warmup-bolt">⚡</span>
      <span className="warmup-banner-text">
        <strong>{t("warmup.title")}</strong>
        <span className="muted small">{t("warmup.subtitle")}</span>
      </span>
      <span className="warmup-go">{t("warmup.start")} →</span>
    </button>
  );
}
