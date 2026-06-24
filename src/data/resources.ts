import type { Locale, LocalizedText } from "../types";

// Curated learning resources — talks, podcasts and reading on communication,
// leadership and high-stakes conversations. All links are public and verified.

export type ResourceKind = "podcast" | "video" | "article";

export interface Resource {
  title: string;
  source: string;
  kind: ResourceKind;
  url: string;
  blurb: LocalizedText;
}

export const RESOURCES: Resource[] = [
  {
    title: "The Diary of a CEO",
    source: "Steven Bartlett · YouTube",
    kind: "podcast",
    url: "https://www.youtube.com/@TheDiaryOfACEO",
    blurb: {
      en: "Long-form interviews with leaders and founders on how they think, decide and communicate under pressure.",
      de: "Ausführliche Interviews mit Führungskräften darüber, wie sie unter Druck denken, entscheiden und kommunizieren.",
      "es-ES": "Entrevistas largas a líderes y fundadores sobre cómo piensan, deciden y comunican bajo presión.",
    },
  },
  {
    title: "The Diary of a CEO (Spotify)",
    source: "Steven Bartlett · Spotify",
    kind: "podcast",
    url: "https://open.spotify.com/show/7iQXmUT7XGuZSzAMjoNWlX",
    blurb: {
      en: "The same conversations in audio — great for learning on the move.",
      de: "Dieselben Gespräche als Audio — ideal für unterwegs.",
      "es-ES": "Las mismas conversaciones en audio — ideal para aprender mientras te mueves.",
    },
  },
  {
    title: "WorkLife with Adam Grant",
    source: "Adam Grant · Apple Podcasts",
    kind: "podcast",
    url: "https://podcasts.apple.com/us/podcast/worklife-with-adam-grant/1346314086",
    blurb: {
      en: "An organizational psychologist on how the best people and teams actually work.",
      de: "Ein Organisationspsychologe darüber, wie die besten Menschen und Teams wirklich arbeiten.",
      "es-ES": "Un psicólogo organizacional sobre cómo trabajan de verdad las mejores personas y equipos.",
    },
  },
  {
    title: "The Knowledge Project",
    source: "Shane Parrish · Farnam Street",
    kind: "podcast",
    url: "https://fs.blog/knowledge-project-podcast/",
    blurb: {
      en: "Conversations on decision-making, mental models and clear thinking.",
      de: "Gespräche über Entscheidungsfindung, mentale Modelle und klares Denken.",
      "es-ES": "Conversaciones sobre toma de decisiones, modelos mentales y pensamiento claro.",
    },
  },
  {
    title: "How to speak so that people want to listen",
    source: "Julian Treasure · TED",
    kind: "video",
    url: "https://www.ted.com/talks/julian_treasure_how_to_speak_so_that_people_want_to_listen",
    blurb: {
      en: "Practical vocal tools to make what you say land with impact.",
      de: "Praktische Stimm-Werkzeuge, damit deine Worte wirken.",
      "es-ES": "Herramientas prácticas de voz para que lo que dices tenga impacto.",
    },
  },
  {
    title: "10 ways to have a better conversation",
    source: "Celeste Headlee · TED",
    kind: "video",
    url: "https://www.ted.com/talks/celeste_headlee_10_ways_to_have_a_better_conversation",
    blurb: {
      en: "Simple, powerful habits for listening and being understood.",
      de: "Einfache, wirkungsvolle Gewohnheiten fürs Zuhören und Verstandenwerden.",
      "es-ES": "Hábitos sencillos y potentes para escuchar y hacerte entender.",
    },
  },
  {
    title: "Your body language may shape who you are",
    source: "Amy Cuddy · TED",
    kind: "video",
    url: "https://www.ted.com/talks/amy_cuddy_your_body_language_may_shape_who_you_are",
    blurb: {
      en: "How presence and posture change how others — and you — perceive you.",
      de: "Wie Präsenz und Haltung verändern, wie andere und du dich wahrnehmen.",
      "es-ES": "Cómo la presencia y la postura cambian cómo te perciben los demás y tú mismo.",
    },
  },
  {
    title: "TED's secret to great public speaking",
    source: "Chris Anderson · TED",
    kind: "video",
    url: "https://www.ted.com/talks/chris_anderson_teds_secret_to_great_public_speaking",
    blurb: {
      en: "Build one idea clearly — the core of every memorable talk.",
      de: "Eine Idee klar aufbauen — der Kern jedes einprägsamen Vortrags.",
      "es-ES": "Construye una idea con claridad — el núcleo de toda charla memorable.",
    },
  },
  {
    title: "How great leaders inspire action",
    source: "Simon Sinek · TED",
    kind: "video",
    url: "https://www.ted.com/talks/simon_sinek_how_great_leaders_inspire_action",
    blurb: {
      en: "The 'Start With Why' framework for leading and persuading.",
      de: "Das 'Start With Why'-Modell zum Führen und Überzeugen.",
      "es-ES": "El marco 'Empieza por el porqué' para liderar y persuadir.",
    },
  },
  {
    title: "The power of vulnerability",
    source: "Brené Brown · TED",
    kind: "video",
    url: "https://www.ted.com/talks/brene_brown_the_power_of_vulnerability",
    blurb: {
      en: "Why courage and openness build trust and stronger teams.",
      de: "Warum Mut und Offenheit Vertrauen und stärkere Teams schaffen.",
      "es-ES": "Por qué el coraje y la apertura generan confianza y mejores equipos.",
    },
  },
  {
    title: "Difficult Conversations",
    source: "Harvard Business Review",
    kind: "article",
    url: "https://hbr.org/topic/subject/difficult-conversations",
    blurb: {
      en: "A collection of HBR articles on handling hard, high-stakes talks well.",
      de: "Eine Sammlung von HBR-Artikeln über schwierige, wichtige Gespräche.",
      "es-ES": "Una colección de artículos de HBR sobre cómo llevar bien las conversaciones difíciles.",
    },
  },
  {
    title: "Harvard Business Review",
    source: "HBR · YouTube",
    kind: "video",
    url: "https://www.youtube.com/@HarvardBusinessReview",
    blurb: {
      en: "Short, research-backed videos on leadership and communication.",
      de: "Kurze, forschungsbasierte Videos zu Führung und Kommunikation.",
      "es-ES": "Vídeos breves y basados en investigación sobre liderazgo y comunicación.",
    },
  },
];

export function resourceBlurb(r: Resource, locale: Locale): string {
  return r.blurb[locale] ?? r.blurb.en ?? "";
}
