import type { Locale, LocalizedText } from "../types";

// "Leadership Framework" — three pillars, six competencies, twelve behaviors,
// rated on a 5-point scale. Labels are localized inline to keep i18n lean.

export interface Behavior {
  id: string;
  label: LocalizedText;
}
export interface Competency {
  id: string;
  label: LocalizedText;
  behaviors: Behavior[];
}
export interface Pillar {
  id: "elevate" | "engage" | "execute";
  subtitle: LocalizedText;
  competencies: Competency[];
}

export const FRAMEWORK: Pillar[] = [
  {
    id: "elevate",
    subtitle: { en: "Shaping the future", de: "Die Zukunft gestalten", "es-ES": "Dar forma al futuro" },
    competencies: [
      {
        id: "strategic",
        label: { en: "Strategic thinking & innovation", de: "Strategisches Denken & Innovation", "es-ES": "Pensamiento estratégico e innovación" },
        behaviors: [
          { id: "connects_trends", label: { en: "Connects trends to strategy", de: "Verbindet Trends mit Strategie", "es-ES": "Conecta tendencias con la estrategia" } },
          { id: "innovates_smartly", label: { en: "Innovates smartly", de: "Innoviert klug", "es-ES": "Innova con criterio" } },
        ],
      },
      {
        id: "acumen",
        label: { en: "Business & functional acumen", de: "Geschäfts- & Funktionsverständnis", "es-ES": "Visión de negocio y funcional" },
        behaviors: [
          { id: "business_drivers", label: { en: "Understands business drivers", de: "Versteht Geschäftstreiber", "es-ES": "Entiende las palancas del negocio" } },
          { id: "value_technology", label: { en: "Creates value through technology", de: "Schafft Wert durch Technologie", "es-ES": "Crea valor con la tecnología" } },
        ],
      },
    ],
  },
  {
    id: "engage",
    subtitle: { en: "Leading with people & purpose", de: "Mit Menschen und Sinn führen", "es-ES": "Liderar con personas y propósito" },
    competencies: [
      {
        id: "people_dev",
        label: { en: "People & organizational development", de: "Menschen- & Organisationsentwicklung", "es-ES": "Desarrollo de personas y organización" },
        behaviors: [
          { id: "growth_mindset", label: { en: "Role-models a growth mindset", de: "Lebt ein Growth Mindset vor", "es-ES": "Da ejemplo de mentalidad de crecimiento" } },
          { id: "owns_people_dev", label: { en: "Owns people development", de: "Übernimmt Verantwortung für Entwicklung", "es-ES": "Se responsabiliza del desarrollo de las personas" } },
        ],
      },
      {
        id: "values",
        label: { en: "Values-driven leadership", de: "Werteorientierte Führung", "es-ES": "Liderazgo basado en valores" },
        behaviors: [
          { id: "integrity_courage", label: { en: "Acts with integrity and courage", de: "Handelt mit Integrität und Mut", "es-ES": "Actúa con integridad y valentía" } },
          { id: "service_first", label: { en: "Leads with a service-first mindset", de: "Führt mit einer Service-First-Haltung", "es-ES": "Lidera con mentalidad de servicio" } },
        ],
      },
    ],
  },
  {
    id: "execute",
    subtitle: { en: "Turning ambitions into results", de: "Ambitionen in Ergebnisse verwandeln", "es-ES": "Convertir las ambiciones en resultados" },
    competencies: [
      {
        id: "performance",
        label: { en: "High-performance culture", de: "Hochleistungskultur", "es-ES": "Cultura de alto rendimiento" },
        behaviors: [
          { id: "performance_accountability", label: { en: "Builds performance & accountability", de: "Baut Leistung & Verantwortung auf", "es-ES": "Construye rendimiento y responsabilidad" } },
          { id: "frontline_impact", label: { en: "Drives frontline impact", de: "Erzielt Wirkung an der Front", "es-ES": "Genera impacto en primera línea" } },
        ],
      },
      {
        id: "discipline",
        label: { en: "Execution discipline", de: "Umsetzungsdisziplin", "es-ES": "Disciplina de ejecución" },
        behaviors: [
          { id: "decisive_speed", label: { en: "Leads decisively and with speed", de: "Führt entschlossen und schnell", "es-ES": "Lidera con decisión y rapidez" } },
          { id: "resilience", label: { en: "Leads with resilience", de: "Führt mit Resilienz", "es-ES": "Lidera con resiliencia" } },
        ],
      },
    ],
  },
];

export interface ScaleLevel {
  level: number;
  label: LocalizedText;
  desc: LocalizedText;
}
export const SCALE: ScaleLevel[] = [
  { level: 1, label: { en: "Applies inconsistently", de: "Wendet uneinheitlich an", "es-ES": "Aplica de forma inconsistente" }, desc: { en: "Applies the behavior selectively; consistency and impact vary.", de: "Wendet das Verhalten selektiv an; Konstanz und Wirkung schwanken.", "es-ES": "Aplica el comportamiento de forma selectiva; la consistencia y el impacto varían." } },
  { level: 2, label: { en: "Applies consistently", de: "Wendet konsequent an", "es-ES": "Aplica de forma consistente" }, desc: { en: "Reliably demonstrates the behavior in standard, familiar situations.", de: "Zeigt das Verhalten verlässlich in vertrauten Situationen.", "es-ES": "Demuestra el comportamiento de forma fiable en situaciones habituales." } },
  { level: 3, label: { en: "Applies in complex situations", de: "Wendet in komplexen Lagen an", "es-ES": "Aplica en situaciones complejas" }, desc: { en: "Applies the behavior effectively in new and ambiguous situations.", de: "Wendet das Verhalten in neuen, mehrdeutigen Situationen wirksam an.", "es-ES": "Aplica el comportamiento con eficacia en situaciones nuevas y ambiguas." } },
  { level: 4, label: { en: "Acts as a role model", de: "Handelt als Vorbild", "es-ES": "Actúa como referente" }, desc: { en: "Reinforces the behavior through actions and positively influences others.", de: "Verstärkt das Verhalten durch Handeln und beeinflusst andere positiv.", "es-ES": "Refuerza el comportamiento con sus acciones e influye positivamente en los demás." } },
  { level: 5, label: { en: "Sets organization-wide standards", de: "Setzt organisationsweite Standards", "es-ES": "Marca estándares en toda la organización" }, desc: { en: "Shapes expectations, standards, and practices across the organization.", de: "Prägt Erwartungen, Standards und Praktiken in der gesamten Organisation.", "es-ES": "Define expectativas, estándares y prácticas en toda la organización." } },
];

// Flat lookup: behavior id -> { label, competency, pillar }
const INDEX: Record<string, { label: LocalizedText; pillar: Pillar; competency: Competency; behavior: Behavior }> = {};
for (const pillar of FRAMEWORK) {
  for (const competency of pillar.competencies) {
    for (const behavior of competency.behaviors) {
      INDEX[behavior.id] = { label: behavior.label, pillar, competency, behavior };
    }
  }
}

export function behaviorLabel(id: string, locale: Locale): string {
  const e = INDEX[id];
  return e ? e.label[locale] ?? e.label.en ?? id : id;
}
export function behaviorPillar(id: string): Pillar["id"] | null {
  return INDEX[id]?.pillar.id ?? null;
}
export const ALL_BEHAVIOR_IDS = Object.keys(INDEX);

// Average rating per pillar (and overall) for a set of behavior ratings.
export function pillarAverages(
  ratings: { behavior: string; score: number }[]
): { elevate: number | null; engage: number | null; execute: number | null; overall: number | null } {
  const sums: Record<string, { s: number; n: number }> = {
    elevate: { s: 0, n: 0 },
    engage: { s: 0, n: 0 },
    execute: { s: 0, n: 0 },
  };
  let total = 0;
  let count = 0;
  for (const r of ratings) {
    const p = behaviorPillar(r.behavior);
    if (!p) continue;
    sums[p].s += r.score;
    sums[p].n += 1;
    total += r.score;
    count += 1;
  }
  const avg = (x: { s: number; n: number }) => (x.n ? Math.round((x.s / x.n) * 10) / 10 : null);
  return {
    elevate: avg(sums.elevate),
    engage: avg(sums.engage),
    execute: avg(sums.execute),
    overall: count ? Math.round((total / count) * 10) / 10 : null,
  };
}
