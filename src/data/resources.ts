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
  // ---------------- Podcasts ----------------
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
    title: "Think Fast, Talk Smart",
    source: "Stanford GSB · Matt Abrahams",
    kind: "podcast",
    url: "https://www.gsb.stanford.edu/business-podcasts/think-fast-talk-smart-podcast",
    blurb: {
      en: "Practical, research-backed tools for speaking clearly and thinking on your feet.",
      de: "Praktische, forschungsbasierte Werkzeuge, um klar zu sprechen und spontan zu denken.",
      "es-ES": "Herramientas prácticas y con base científica para hablar claro y pensar sobre la marcha.",
    },
  },
  {
    title: "HBR IdeaCast",
    source: "Harvard Business Review",
    kind: "podcast",
    url: "https://hbr.org/podcasts/ideacast",
    blurb: {
      en: "Weekly conversations with leading thinkers on management and leadership.",
      de: "Wöchentliche Gespräche mit führenden Köpfen über Management und Leadership.",
      "es-ES": "Conversaciones semanales con grandes pensadores sobre gestión y liderazgo.",
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
    title: "Masters of Scale",
    source: "Reid Hoffman",
    kind: "podcast",
    url: "https://mastersofscale.com/",
    blurb: {
      en: "How leaders build and scale — told through candid founder stories.",
      de: "Wie Führungskräfte aufbauen und skalieren — erzählt in offenen Gründergeschichten.",
      "es-ES": "Cómo los líderes construyen y escalan — a través de historias sinceras de fundadores.",
    },
  },
  {
    title: "How I Built This",
    source: "Guy Raz · NPR",
    kind: "podcast",
    url: "https://www.npr.org/podcasts/510313/how-i-built-this",
    blurb: {
      en: "Founders tell the real story behind how they built something from nothing.",
      de: "Gründer erzählen die wahre Geschichte, wie sie aus dem Nichts etwas aufbauten.",
      "es-ES": "Fundadores cuentan la historia real de cómo construyeron algo desde cero.",
    },
  },
  {
    title: "The Tim Ferriss Show",
    source: "Tim Ferriss",
    kind: "podcast",
    url: "https://tim.blog/podcast/",
    blurb: {
      en: "Deconstructs world-class performers to find the habits and tactics you can use.",
      de: "Zerlegt Spitzenleister, um Gewohnheiten und Taktiken zu finden, die du nutzen kannst.",
      "es-ES": "Desmenuza a personas de élite para encontrar hábitos y tácticas que puedes aplicar.",
    },
  },
  {
    title: "Lenny's Podcast",
    source: "Lenny Rachitsky",
    kind: "podcast",
    url: "https://www.lennyspodcast.com/",
    blurb: {
      en: "Product, growth and career lessons from people who've done it.",
      de: "Produkt-, Wachstums- und Karriere-Lektionen von Leuten, die es gemacht haben.",
      "es-ES": "Lecciones de producto, crecimiento y carrera de quienes ya lo han hecho.",
    },
  },

  // ---------------- Talks & video ----------------
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
    title: "Why good leaders make you feel safe",
    source: "Simon Sinek · TED",
    kind: "video",
    url: "https://www.ted.com/talks/simon_sinek_why_good_leaders_make_you_feel_safe",
    blurb: {
      en: "Trust and safety as the real foundation of leadership.",
      de: "Vertrauen und Sicherheit als wahres Fundament von Führung.",
      "es-ES": "La confianza y la seguridad como verdadera base del liderazgo.",
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
    title: "Dare to disagree",
    source: "Margaret Heffernan · TED",
    kind: "video",
    url: "https://www.ted.com/talks/margaret_heffernan_dare_to_disagree",
    blurb: {
      en: "Why good conflict and dissent make better decisions.",
      de: "Warum guter Konflikt und Widerspruch zu besseren Entscheidungen führen.",
      "es-ES": "Por qué el buen conflicto y la discrepancia mejoran las decisiones.",
    },
  },
  {
    title: "Want to help someone? Shut up and listen",
    source: "Ernesto Sirolli · TED",
    kind: "video",
    url: "https://www.ted.com/talks/ernesto_sirolli_want_to_help_someone_shut_up_and_listen",
    blurb: {
      en: "A funny, sharp lesson on the power of really listening first.",
      de: "Eine witzige, scharfe Lektion über die Kraft, zuerst wirklich zuzuhören.",
      "es-ES": "Una lección divertida y aguda sobre el poder de escuchar de verdad primero.",
    },
  },
  {
    title: "Grit: the power of passion and perseverance",
    source: "Angela Duckworth · TED",
    kind: "video",
    url: "https://www.ted.com/talks/angela_lee_duckworth_grit_the_power_of_passion_and_perseverance",
    blurb: {
      en: "What actually predicts success — and how to build it.",
      de: "Was Erfolg wirklich vorhersagt — und wie man es aufbaut.",
      "es-ES": "Qué predice de verdad el éxito — y cómo cultivarlo.",
    },
  },
  {
    title: "How to make stress your friend",
    source: "Kelly McGonigal · TED",
    kind: "video",
    url: "https://www.ted.com/talks/kelly_mcgonigal_how_to_make_stress_your_friend",
    blurb: {
      en: "Reframe pressure so it works for you, not against you.",
      de: "Druck so umdeuten, dass er für dich arbeitet, nicht gegen dich.",
      "es-ES": "Reinterpreta la presión para que juegue a tu favor, no en tu contra.",
    },
  },
  {
    title: "The puzzle of motivation",
    source: "Dan Pink · TED",
    kind: "video",
    url: "https://www.ted.com/talks/dan_pink_the_puzzle_of_motivation",
    blurb: {
      en: "What really drives people — and why rewards often backfire.",
      de: "Was Menschen wirklich antreibt — und warum Belohnungen oft scheitern.",
      "es-ES": "Qué motiva de verdad a las personas — y por qué los premios suelen fallar.",
    },
  },
  {
    title: "Persuasive & confident speaking",
    source: "Conor Neill · YouTube",
    kind: "video",
    url: "https://www.youtube.com/@ConorNeill",
    blurb: {
      en: "Short, practical lessons on speaking with authority and persuasion.",
      de: "Kurze, praktische Lektionen über Sprechen mit Autorität und Überzeugung.",
      "es-ES": "Lecciones breves y prácticas para hablar con autoridad y persuasión.",
    },
  },
  {
    title: "Stanford Graduate School of Business",
    source: "Stanford GSB · YouTube",
    kind: "video",
    url: "https://www.youtube.com/@StanfordGSB",
    blurb: {
      en: "Talks from world-class leaders on management, strategy and communication.",
      de: "Vorträge von Spitzenführungskräften zu Management, Strategie und Kommunikation.",
      "es-ES": "Charlas de líderes de primer nivel sobre gestión, estrategia y comunicación.",
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
  {
    title: "TED",
    source: "TED · YouTube",
    kind: "video",
    url: "https://www.youtube.com/@TED",
    blurb: {
      en: "The full TED archive — thousands of talks on every idea worth spreading.",
      de: "Das gesamte TED-Archiv — tausende Vorträge zu jeder Idee, die es wert ist.",
      "es-ES": "Todo el archivo de TED — miles de charlas sobre cada idea que vale la pena difundir.",
    },
  },
  {
    title: "Big Think",
    source: "Big Think · YouTube",
    kind: "video",
    url: "https://www.youtube.com/@bigthink",
    blurb: {
      en: "Experts explain how to think, lead and communicate better.",
      de: "Expert:innen erklären, wie man besser denkt, führt und kommuniziert.",
      "es-ES": "Expertos explican cómo pensar, liderar y comunicar mejor.",
    },
  },

  // ---------------- Reading ----------------
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
    title: "Business Communication",
    source: "Harvard Business Review",
    kind: "article",
    url: "https://hbr.org/topic/subject/business-communication",
    blurb: {
      en: "Everything HBR has written on communicating clearly and persuasively.",
      de: "Alles, was HBR über klare und überzeugende Kommunikation geschrieben hat.",
      "es-ES": "Todo lo que HBR ha escrito sobre comunicar con claridad y persuasión.",
    },
  },
  {
    title: "Leadership",
    source: "Harvard Business Review",
    kind: "article",
    url: "https://hbr.org/topic/subject/leadership",
    blurb: {
      en: "HBR's deep library on leading people, teams and yourself.",
      de: "HBRs umfangreiche Bibliothek über das Führen von Menschen, Teams und sich selbst.",
      "es-ES": "La amplia biblioteca de HBR sobre liderar personas, equipos y a ti mismo.",
    },
  },
  {
    title: "Farnam Street",
    source: "Shane Parrish · Blog",
    kind: "article",
    url: "https://fs.blog/blog/",
    blurb: {
      en: "Essays on mental models, decisions and thinking clearly.",
      de: "Essays über mentale Modelle, Entscheidungen und klares Denken.",
      "es-ES": "Ensayos sobre modelos mentales, decisiones y pensar con claridad.",
    },
  },
];

export function resourceBlurb(r: Resource, locale: Locale): string {
  return r.blurb[locale] ?? r.blurb.en ?? "";
}
