import { useApp } from "../state/store";
import { LOCALES } from "../i18n";

export function LanguagePicker() {
  const { locale, setLocale } = useApp();
  return (
    <div className="lang-picker" role="group" aria-label="Language">
      {LOCALES.map((l) => (
        <button
          key={l.code}
          className={`lang-btn ${locale === l.code ? "active" : ""}`}
          onClick={() => setLocale(l.code)}
          aria-pressed={locale === l.code}
          title={l.label}
        >
          <span className="flag">{l.flag}</span>
          <span className="lang-label">{l.code === "es-ES" ? "ES" : l.code.toUpperCase()}</span>
        </button>
      ))}
    </div>
  );
}
