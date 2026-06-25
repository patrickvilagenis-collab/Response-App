import type { Locale, LocalizedText } from "../types";
import { behaviorPillar } from "./leadershipFramework";

// Learn — short, practical micro-courses, one per Leadership Framework behavior.
// Each course pairs a little theory (from the best coaching/HR methodologies)
// with a short quiz, then links into a Practice scenario for the same behavior.
// Generated content; labels localized inline (en / de / es-ES).

export type LearnIcon =
  | "compass" | "spark" | "chart" | "gear" | "grow" | "people"
  | "shield" | "heart" | "target" | "bolt" | "clock" | "anchor";

export interface LessonCard { heading: LocalizedText; body: LocalizedText; }
export interface LearnTool { name: LocalizedText; desc: LocalizedText; steps: LocalizedText[]; }
export interface QuizQuestion { q: LocalizedText; options: LocalizedText[]; correct: number; why: LocalizedText; }
export interface MicroCourse {
  id: string;
  behavior: string;          // framework behavior id this course builds
  icon: LearnIcon;
  durationMin: number;
  title: LocalizedText;
  subtitle: LocalizedText;
  cards: LessonCard[];
  tool: LearnTool;
  quiz: QuizQuestion[];
  takeaway: LocalizedText;
}

export const COURSES: MicroCourse[] = [
  {
    "id": "course_connects_trends",
    "behavior": "connects_trends",
    "icon": "compass",
    "durationMin": 5,
    "title": {
      "en": "From Trends to Strategy",
      "de": "Von Trends zur Strategie",
      "es-ES": "De tendencias a estrategia"
    },
    "subtitle": {
      "en": "Turn what's changing outside into clear moves for your team.",
      "de": "Mach aus dem, was sich draussen aendert, klare Schritte fuer dein Team.",
      "es-ES": "Convierte lo que cambia fuera en decisiones claras para tu equipo."
    },
    "cards": [
      {
        "heading": {
          "en": "Why it matters",
          "de": "Warum es zaehlt",
          "es-ES": "Por que importa"
        },
        "body": {
          "en": "Markets, tech and customer habits shift fast. Leaders who spot the signal early and act look prepared. Those who ignore it spend the next year reacting and explaining.",
          "de": "Maerkte, Technik und Kundengewohnheiten aendern sich schnell. Wer das Signal frueh erkennt und handelt, wirkt vorbereitet. Wer es ignoriert, reagiert ein Jahr lang nur noch.",
          "es-ES": "Mercados, tecnologia y habitos cambian rapido. Quien detecta la senal pronto y actua parece preparado. Quien la ignora pasa el ano reaccionando y dando explicaciones."
        }
      },
      {
        "heading": {
          "en": "Signal vs noise",
          "de": "Signal statt Laerm",
          "es-ES": "Senal frente a ruido"
        },
        "body": {
          "en": "A trend is a sustained shift in direction, not a one-off headline. Ask: is this still true in three years, and does it touch our customers or costs? If yes, it deserves a strategy slot.",
          "de": "Ein Trend ist eine anhaltende Richtungsaenderung, keine einzelne Schlagzeile. Frag: Gilt das in drei Jahren noch, und betrifft es unsere Kunden oder Kosten? Wenn ja, gehoert es in die Strategie.",
          "es-ES": "Una tendencia es un cambio de direccion sostenido, no un titular suelto. Pregunta: seguira siendo cierto en tres anos y afecta a clientes o costes? Si es asi, merece un hueco en la estrategia."
        }
      },
      {
        "heading": {
          "en": "Make the link",
          "de": "Verbindung herstellen",
          "es-ES": "Haz la conexion"
        },
        "body": {
          "en": "For each real trend, name one goal it threatens and one it could accelerate. Then write a single sentence: \"Because of X, we will do Y by Z.\" That sentence is the bridge from trend to action.",
          "de": "Benenne fuer jeden echten Trend ein Ziel, das er bedroht, und eines, das er beschleunigt. Schreib dann einen Satz: \"Wegen X tun wir bis Z genau Y.\" Dieser Satz ist die Bruecke vom Trend zur Tat.",
          "es-ES": "Por cada tendencia real, nombra un objetivo que amenaza y uno que podria acelerar. Luego escribe una frase: \"Por culpa de X, haremos Y antes de Z.\" Esa frase es el puente de la tendencia a la accion."
        }
      },
      {
        "heading": {
          "en": "Avoid the trap",
          "de": "Falle vermeiden",
          "es-ES": "Evita la trampa"
        },
        "body": {
          "en": "Don't chase every shiny trend, and don't dump a slide list of them. Pick the two or three that move your numbers, and tie each to a decision. Quick win: add one trend check to your next planning meeting.",
          "de": "Jag nicht jedem glaenzenden Trend hinterher und kipp keine Folienliste aus. Waehl die zwei, drei, die deine Zahlen bewegen, und knuepf jeden an eine Entscheidung. Schnell gewonnen: ein Trend-Check im naechsten Planungsmeeting.",
          "es-ES": "No persigas cada tendencia llamativa ni sueltes una lista de diapositivas. Elige las dos o tres que mueven tus numeros y liga cada una a una decision. Victoria rapida: anade un repaso de tendencias a tu proxima reunion de planificacion."
        }
      }
    ],
    "tool": {
      "name": {
        "en": "PESTLE scan",
        "de": "PESTLE-Analyse",
        "es-ES": "Analisis PESTLE"
      },
      "desc": {
        "en": "A simple checklist that surfaces outside forces shaping your business across six lenses.",
        "de": "Eine einfache Checkliste, die aeussere Kraefte in sechs Bereichen sichtbar macht.",
        "es-ES": "Una lista sencilla que revela las fuerzas externas que moldean tu negocio en seis ambitos."
      },
      "steps": [
        {
          "en": "List forces under Political, Economic, Social, Technological, Legal, Environmental.",
          "de": "Liste Kraefte zu Politik, Wirtschaft, Gesellschaft, Technik, Recht, Umwelt auf.",
          "es-ES": "Lista fuerzas en lo politico, economico, social, tecnologico, legal y ambiental."
        },
        {
          "en": "Mark each as high or low impact on your goals over the next two years.",
          "de": "Markiere jede als hohen oder geringen Einfluss auf deine Ziele in zwei Jahren.",
          "es-ES": "Marca cada una como de impacto alto o bajo en tus objetivos a dos anos."
        },
        {
          "en": "Turn each high-impact item into one decision or action with an owner.",
          "de": "Mach aus jedem Punkt mit hohem Einfluss eine Entscheidung mit klarer Verantwortung.",
          "es-ES": "Convierte cada punto de alto impacto en una decision o accion con responsable."
        }
      ]
    },
    "quiz": [
      {
        "q": {
          "en": "What best separates a real trend from noise?",
          "de": "Was unterscheidet einen echten Trend am besten von Laerm?",
          "es-ES": "Que distingue mejor una tendencia real del ruido?"
        },
        "options": [
          {
            "en": "It is trending on social media this week.",
            "de": "Es ist diese Woche in den sozialen Medien angesagt.",
            "es-ES": "Es viral en redes esta semana."
          },
          {
            "en": "It is a sustained shift that touches your customers or costs.",
            "de": "Es ist eine anhaltende Verschiebung, die Kunden oder Kosten betrifft.",
            "es-ES": "Es un cambio sostenido que afecta a clientes o costes."
          },
          {
            "en": "A competitor mentioned it once.",
            "de": "Ein Wettbewerber hat es einmal erwaehnt.",
            "es-ES": "Un competidor lo menciono una vez."
          }
        ],
        "correct": 1,
        "why": {
          "en": "Durability and relevance to your business, not buzz, mark a real trend.",
          "de": "Bestaendigkeit und Relevanz fuers Geschaeft, nicht Hype, kennzeichnen einen echten Trend.",
          "es-ES": "La durabilidad y la relevancia para tu negocio, no el ruido, marcan una tendencia real."
        }
      },
      {
        "q": {
          "en": "How do you turn a trend into strategy?",
          "de": "Wie machst du aus einem Trend Strategie?",
          "es-ES": "Como conviertes una tendencia en estrategia?"
        },
        "options": [
          {
            "en": "Tie it to a goal and a dated decision with an owner.",
            "de": "Knuepf ihn an ein Ziel und eine terminierte Entscheidung mit Verantwortlichem.",
            "es-ES": "Ligala a un objetivo y a una decision con fecha y responsable."
          },
          {
            "en": "Add it to a slide list for the all-hands.",
            "de": "Setz ihn auf eine Folienliste fuers Townhall-Meeting.",
            "es-ES": "Anadela a una lista de diapositivas para la reunion general."
          },
          {
            "en": "Wait until the trend is fully proven.",
            "de": "Warte, bis der Trend voll bewiesen ist.",
            "es-ES": "Espera a que la tendencia este totalmente probada."
          }
        ],
        "correct": 0,
        "why": {
          "en": "A trend becomes strategy only when linked to a goal and a concrete decision.",
          "de": "Ein Trend wird erst zur Strategie, wenn er mit Ziel und konkreter Entscheidung verbunden ist.",
          "es-ES": "Una tendencia se vuelve estrategia solo al unirla a un objetivo y una decision concreta."
        }
      },
      {
        "q": {
          "en": "What is the most common mistake leaders make with trends?",
          "de": "Was ist der haeufigste Fehler von Fuehrungskraeften mit Trends?",
          "es-ES": "Cual es el error mas comun de los lideres con las tendencias?"
        },
        "options": [
          {
            "en": "Reviewing them in planning meetings.",
            "de": "Sie in Planungsmeetings zu besprechen.",
            "es-ES": "Revisarlas en reuniones de planificacion."
          },
          {
            "en": "Focusing on only two or three that move the numbers.",
            "de": "Sich auf nur zwei, drei zu konzentrieren, die die Zahlen bewegen.",
            "es-ES": "Centrarse solo en dos o tres que mueven los numeros."
          },
          {
            "en": "Chasing every shiny trend without picking what matters.",
            "de": "Jedem glaenzenden Trend nachzujagen, ohne das Wichtige zu waehlen.",
            "es-ES": "Perseguir cada tendencia llamativa sin elegir lo que importa."
          }
        ],
        "correct": 2,
        "why": {
          "en": "Spreading attention across every trend dilutes focus and stalls real decisions.",
          "de": "Aufmerksamkeit auf jeden Trend zu verteilen, verwaessert den Fokus und blockiert Entscheidungen.",
          "es-ES": "Repartir la atencion entre todas las tendencias diluye el foco y frena las decisiones."
        }
      }
    ],
    "takeaway": {
      "en": "A trend only matters once it changes a decision you make this quarter.",
      "de": "Ein Trend zaehlt erst, wenn er eine Entscheidung in diesem Quartal veraendert.",
      "es-ES": "Una tendencia solo importa cuando cambia una decision que tomas este trimestre."
    }
  },
  {
    "id": "course_innovates_smartly",
    "behavior": "innovates_smartly",
    "icon": "spark",
    "durationMin": 5,
    "title": {
      "en": "Innovate Without Betting the Farm",
      "de": "Innovieren ohne alles zu riskieren",
      "es-ES": "Innovar sin jugártelo todo"
    },
    "subtitle": {
      "en": "Test ideas cheaply so good ones survive and bad ones cost little.",
      "de": "Teste Ideen günstig, damit gute überleben und schlechte kaum kosten.",
      "es-ES": "Prueba ideas barato: las buenas sobreviven y las malas cuestan poco."
    },
    "cards": [
      {
        "heading": {
          "en": "Why It Matters",
          "de": "Warum es zählt",
          "es-ES": "Por qué importa"
        },
        "body": {
          "en": "Markets and tools shift faster than your plan. Teams that only execute the known plan slowly fall behind. Smart innovation keeps you relevant without risking the whole budget on one guess.",
          "de": "Markt und Werkzeuge ändern sich schneller als dein Plan. Teams, die nur das Bekannte abarbeiten, fallen langsam zurück. Kluge Innovation hält dich relevant, ohne das ganze Budget auf eine Wette zu setzen.",
          "es-ES": "El mercado y las herramientas cambian más rápido que tu plan. Los equipos que solo ejecutan lo conocido se quedan atrás. Innovar con cabeza te mantiene vigente sin arriesgar todo el presupuesto en una apuesta."
        }
      },
      {
        "heading": {
          "en": "Small Bets, Not Big Leaps",
          "de": "Kleine Wetten statt großer Sprünge",
          "es-ES": "Apuestas pequeñas, no saltos"
        },
        "body": {
          "en": "Treat each idea as a cheap experiment, not a commitment. Risk a little time and money to learn fast. Many small bets beat one giant bet, because most ideas are wrong and the cheap failures don't hurt.",
          "de": "Behandle jede Idee als günstiges Experiment, nicht als Verpflichtung. Riskiere wenig Zeit und Geld, um schnell zu lernen. Viele kleine Wetten schlagen eine riesige, weil die meisten Ideen falsch sind und billige Fehlschläge nicht wehtun.",
          "es-ES": "Trata cada idea como un experimento barato, no como un compromiso. Arriesga poco tiempo y dinero para aprender rápido. Muchas apuestas pequeñas ganan a una enorme: la mayoría de ideas fallan y los fallos baratos no duelen."
        }
      },
      {
        "heading": {
          "en": "Run A Real Test",
          "de": "Mach einen echten Test",
          "es-ES": "Haz una prueba real"
        },
        "body": {
          "en": "Pick the riskiest assumption and design the smallest test that proves it true or false. Set a deadline, a tiny budget, and one clear signal of success before you start. Then ship the test, not the polish.",
          "de": "Wähle die riskanteste Annahme und entwirf den kleinsten Test, der sie belegt oder widerlegt. Lege vorab Frist, Mini-Budget und ein klares Erfolgssignal fest. Dann liefere den Test, nicht die Politur.",
          "es-ES": "Elige el supuesto más arriesgado y diseña la prueba mínima que lo confirme o lo descarte. Antes de empezar, fija plazo, presupuesto mínimo y una señal clara de éxito. Luego lanza la prueba, no el acabado perfecto."
        }
      },
      {
        "heading": {
          "en": "Avoid The Pet Project",
          "de": "Vermeide das Lieblingsprojekt",
          "es-ES": "Evita el proyecto favorito"
        },
        "body": {
          "en": "The classic mistake: falling in love with an idea and funding it past every warning sign. Decide upfront what result would make you stop. Quick win: kill or scale each test on the data, not on ego.",
          "de": "Der Klassiker: sich in eine Idee verlieben und sie trotz aller Warnsignale weiterfinanzieren. Lege vorher fest, welches Ergebnis dich stoppen lässt. Schneller Gewinn: Stoppe oder skaliere jeden Test nach Daten, nicht nach Ego.",
          "es-ES": "El error clásico: enamorarte de una idea y financiarla pese a todas las señales de alarma. Decide de antemano qué resultado te haría parar. Victoria rápida: corta o escala cada prueba por los datos, no por el ego."
        }
      }
    ],
    "tool": {
      "name": {
        "en": "The 10% Experiment Rule",
        "de": "Die 10-Prozent-Experiment-Regel",
        "es-ES": "La regla del 10% para experimentar"
      },
      "desc": {
        "en": "Reserve a small slice of your team's time and budget for cheap experiments, so innovation happens steadily without threatening core delivery.",
        "de": "Reserviere einen kleinen Teil der Zeit und des Budgets deines Teams für günstige Experimente, damit Innovation stetig passiert, ohne das Kerngeschäft zu gefährden.",
        "es-ES": "Reserva una pequeña parte del tiempo y presupuesto de tu equipo para experimentos baratos, de modo que la innovación avance sin amenazar la entrega principal."
      },
      "steps": [
        {
          "en": "Ring-fence ~10% of capacity each month for tests, protected from urgent work.",
          "de": "Schütze jeden Monat ca. 10 % der Kapazität für Tests, getrennt von dringender Arbeit.",
          "es-ES": "Aparta cada mes ~10% de la capacidad para pruebas, protegida del trabajo urgente."
        },
        {
          "en": "For each test, write the assumption, the success signal, and a hard stop date.",
          "de": "Notiere pro Test die Annahme, das Erfolgssignal und ein festes Enddatum.",
          "es-ES": "Para cada prueba, anota el supuesto, la señal de éxito y una fecha límite firme."
        },
        {
          "en": "Review results monthly: scale winners, cut losers, and bank the lesson.",
          "de": "Prüfe Ergebnisse monatlich: skaliere Gewinner, stoppe Verlierer, sichere die Lektion.",
          "es-ES": "Revisa los resultados cada mes: escala los aciertos, corta los fallos y guarda el aprendizaje."
        }
      ]
    },
    "quiz": [
      {
        "q": {
          "en": "Your team has a bold new idea but limited budget. What's the smart first move?",
          "de": "Dein Team hat eine kühne neue Idee, aber wenig Budget. Was ist der kluge erste Schritt?",
          "es-ES": "Tu equipo tiene una idea audaz pero poco presupuesto. ¿Cuál es el primer paso inteligente?"
        },
        "options": [
          {
            "en": "Run a small, time-boxed test of its riskiest assumption.",
            "de": "Führe einen kleinen, zeitlich begrenzten Test der riskantesten Annahme durch.",
            "es-ES": "Haz una prueba pequeña y acotada del supuesto más arriesgado."
          },
          {
            "en": "Wait until you have enough budget to build the full version.",
            "de": "Warte, bis das Budget für die Vollversion reicht.",
            "es-ES": "Espera a tener presupuesto para construir la versión completa."
          },
          {
            "en": "Pitch it to leadership as a finished, must-fund plan.",
            "de": "Verkaufe sie der Führung als fertigen, zwingend zu finanzierenden Plan.",
            "es-ES": "Preséntala a dirección como un plan terminado que hay que financiar sí o sí."
          }
        ],
        "correct": 0,
        "why": {
          "en": "Cheap tests of the riskiest assumption tell you fast whether the idea is worth more.",
          "de": "Günstige Tests der riskantesten Annahme zeigen schnell, ob die Idee mehr wert ist.",
          "es-ES": "Probar barato el supuesto más arriesgado revela rápido si la idea merece más inversión."
        }
      },
      {
        "q": {
          "en": "A pilot misses the success signal you set in advance. What should you do?",
          "de": "Ein Pilot verfehlt das vorab gesetzte Erfolgssignal. Was solltest du tun?",
          "es-ES": "Un piloto no alcanza la señal de éxito que fijaste antes. ¿Qué deberías hacer?"
        },
        "options": [
          {
            "en": "Add more budget because you believe in the idea.",
            "de": "Mehr Budget geben, weil du an die Idee glaubst.",
            "es-ES": "Añadir más presupuesto porque crees en la idea."
          },
          {
            "en": "Stop or rework it, and keep the lesson learned.",
            "de": "Stoppe oder überarbeite ihn und sichere die Lektion.",
            "es-ES": "Pararlo o rehacerlo, y conservar el aprendizaje."
          },
          {
            "en": "Quietly change the success signal so it passes.",
            "de": "Ändere still das Erfolgssignal, damit er besteht.",
            "es-ES": "Cambiar el criterio de éxito en silencio para que pase."
          }
        ],
        "correct": 1,
        "why": {
          "en": "Deciding on data, not ego, is what keeps small bets cheap and honest.",
          "de": "Nach Daten statt Ego zu entscheiden, hält kleine Wetten günstig und ehrlich.",
          "es-ES": "Decidir por datos y no por ego es lo que mantiene las apuestas baratas y honestas."
        }
      },
      {
        "q": {
          "en": "What is the main point of the 10% experiment rule?",
          "de": "Was ist der Kernpunkt der 10-Prozent-Experiment-Regel?",
          "es-ES": "¿Cuál es el punto clave de la regla del 10% para experimentar?"
        },
        "options": [
          {
            "en": "Spend 10% of revenue on a single big innovation project.",
            "de": "10 % des Umsatzes in ein einziges großes Innovationsprojekt stecken.",
            "es-ES": "Gastar el 10% de los ingresos en un único gran proyecto de innovación."
          },
          {
            "en": "Cut 10% of staff to fund new tools.",
            "de": "10 % der Belegschaft streichen, um neue Tools zu finanzieren.",
            "es-ES": "Recortar el 10% de la plantilla para financiar nuevas herramientas."
          },
          {
            "en": "Protect a small, steady slice of capacity for cheap experiments.",
            "de": "Einen kleinen, festen Teil der Kapazität für günstige Experimente schützen.",
            "es-ES": "Proteger una porción pequeña y constante de capacidad para experimentos baratos."
          }
        ],
        "correct": 2,
        "why": {
          "en": "A protected slice keeps innovation steady without endangering core delivery.",
          "de": "Ein geschützter Anteil hält Innovation stetig, ohne das Kerngeschäft zu gefährden.",
          "es-ES": "Una porción protegida mantiene la innovación constante sin poner en riesgo la entrega principal."
        }
      }
    ],
    "takeaway": {
      "en": "Bet small, learn fast, and let the data decide what grows.",
      "de": "Setze klein, lerne schnell und lass die Daten entscheiden, was wächst.",
      "es-ES": "Apuesta poco, aprende rápido y deja que los datos decidan qué crece."
    }
  },
  {
    "id": "course_business_drivers",
    "behavior": "business_drivers",
    "icon": "chart",
    "durationMin": 5,
    "title": {
      "en": "Know What Moves the Numbers",
      "de": "Wisse, was die Zahlen bewegt",
      "es-ES": "Conoce qué mueve las cifras"
    },
    "subtitle": {
      "en": "Link your team's daily work to the few things that grow the business.",
      "de": "Verbinde die tägliche Arbeit deines Teams mit dem, was das Geschäft wachsen lässt.",
      "es-ES": "Conecta el trabajo diario de tu equipo con lo que hace crecer el negocio."
    },
    "cards": [
      {
        "heading": {
          "en": "Why This Matters",
          "de": "Warum das zählt",
          "es-ES": "Por qué importa"
        },
        "body": {
          "en": "Leaders who grasp business drivers make smarter calls and earn a seat at bigger tables. When you can name what creates value, you stop reacting and start steering.",
          "de": "Wer Business-Treiber versteht, trifft klügere Entscheidungen und wird ernster genommen. Wenn du benennen kannst, was Wert schafft, reagierst du nicht mehr, du steuerst.",
          "es-ES": "Quien entiende los motores del negocio toma mejores decisiones y gana peso. Cuando sabes nombrar lo que crea valor, dejas de reaccionar y empiezas a dirigir."
        }
      },
      {
        "heading": {
          "en": "The Core Model",
          "de": "Das Kernmodell",
          "es-ES": "El modelo base"
        },
        "body": {
          "en": "Profit comes from a short chain: revenue minus cost. Revenue = customers times what they pay. Cost = what you spend to serve them. Every initiative pushes one of these levers.",
          "de": "Gewinn folgt einer kurzen Kette: Umsatz minus Kosten. Umsatz = Kunden mal Preis. Kosten = was du für sie ausgibst. Jede Initiative bewegt einen dieser Hebel.",
          "es-ES": "El beneficio sale de una cadena corta: ingresos menos costes. Ingresos = clientes por lo que pagan. Costes = lo que gastas en servirles. Cada iniciativa mueve una de estas palancas."
        }
      },
      {
        "heading": {
          "en": "Trace Your Work Up",
          "de": "Verfolge deine Arbeit nach oben",
          "es-ES": "Rastrea tu trabajo hacia arriba"
        },
        "body": {
          "en": "Pick a current project and ask: which lever does this move, and by how much? If you can't answer in one sentence, dig until you can or question the project.",
          "de": "Nimm ein laufendes Projekt und frag: Welchen Hebel bewegt das, und wie stark? Kannst du es nicht in einem Satz sagen, grab tiefer oder hinterfrag das Projekt.",
          "es-ES": "Elige un proyecto actual y pregunta: qué palanca mueve esto y cuánto. Si no puedes responder en una frase, indaga hasta lograrlo o cuestiona el proyecto."
        }
      },
      {
        "heading": {
          "en": "Avoid Vanity Metrics",
          "de": "Meide Eitelkeitskennzahlen",
          "es-ES": "Evita métricas vanidosas"
        },
        "body": {
          "en": "Busy numbers like hours logged or tasks closed feel good but rarely move profit. Tie goals to drivers customers and finance actually feel, not activity for its own sake.",
          "de": "Beschäftigungs-Zahlen wie geloggte Stunden oder erledigte Aufgaben fühlen sich gut an, bewegen aber selten den Gewinn. Knüpf Ziele an echte Treiber, nicht an Aktivität.",
          "es-ES": "Cifras de actividad como horas o tareas cerradas reconfortan, pero rara vez mueven el beneficio. Liga las metas a motores reales, no a la actividad en sí."
        }
      }
    ],
    "tool": {
      "name": {
        "en": "Value Driver Tree",
        "de": "Werttreiberbaum",
        "es-ES": "Árbol de generadores de valor"
      },
      "desc": {
        "en": "A simple diagram that breaks profit down into the specific levers your team can actually influence.",
        "de": "Ein einfaches Diagramm, das Gewinn in die konkreten Hebel zerlegt, die dein Team wirklich beeinflussen kann.",
        "es-ES": "Un diagrama sencillo que descompone el beneficio en las palancas concretas que tu equipo puede influir."
      },
      "steps": [
        {
          "en": "Write your top financial goal (e.g. profit or growth) at the top.",
          "de": "Schreib dein wichtigstes Finanzziel (z. B. Gewinn oder Wachstum) ganz oben hin.",
          "es-ES": "Escribe arriba tu objetivo financiero principal (p. ej. beneficio o crecimiento)."
        },
        {
          "en": "Branch it into its parts: customers, price, cost, retention.",
          "de": "Verzweige es in seine Teile: Kunden, Preis, Kosten, Bindung.",
          "es-ES": "Ramifícalo en sus partes: clientes, precio, coste, retención."
        },
        {
          "en": "Mark the one or two branches your team can move this quarter.",
          "de": "Markiere die ein, zwei Äste, die dein Team dieses Quartal bewegen kann.",
          "es-ES": "Marca la rama o dos que tu equipo puede mover este trimestre."
        }
      ]
    },
    "quiz": [
      {
        "q": {
          "en": "A teammate proposes a project. What's the sharpest first question?",
          "de": "Ein Teammitglied schlägt ein Projekt vor. Was ist die schärfste erste Frage?",
          "es-ES": "Un miembro del equipo propone un proyecto. ¿Cuál es la mejor primera pregunta?"
        },
        "options": [
          {
            "en": "Which business lever does it move, and by how much?",
            "de": "Welchen Geschäftshebel bewegt es, und wie stark?",
            "es-ES": "¿Qué palanca del negocio mueve y cuánto?"
          },
          {
            "en": "How many hours will it take to finish?",
            "de": "Wie viele Stunden dauert es bis zur Fertigstellung?",
            "es-ES": "¿Cuántas horas llevará terminarlo?"
          },
          {
            "en": "Has another team tried something similar?",
            "de": "Hat ein anderes Team Ähnliches versucht?",
            "es-ES": "¿Otro equipo ha probado algo parecido?"
          }
        ],
        "correct": 0,
        "why": {
          "en": "Tying work to a driver tells you if it's worth doing before you count the hours.",
          "de": "Die Arbeit an einen Treiber zu knüpfen zeigt den Wert, bevor du Stunden zählst.",
          "es-ES": "Ligar el trabajo a un motor revela su valor antes de contar las horas."
        }
      },
      {
        "q": {
          "en": "Which of these is most likely a vanity metric?",
          "de": "Was davon ist am ehesten eine Eitelkeitskennzahl?",
          "es-ES": "¿Cuál de estas es más probablemente una métrica vanidosa?"
        },
        "options": [
          {
            "en": "Revenue retained from existing customers",
            "de": "Umsatz, der von Bestandskunden gehalten wird",
            "es-ES": "Ingresos retenidos de clientes existentes"
          },
          {
            "en": "Cost to serve each customer",
            "de": "Kosten pro betreutem Kunden",
            "es-ES": "Coste de servir a cada cliente"
          },
          {
            "en": "Number of internal meetings held",
            "de": "Anzahl der internen Meetings",
            "es-ES": "Número de reuniones internas celebradas"
          }
        ],
        "correct": 2,
        "why": {
          "en": "Meeting counts measure activity, not value customers or finance ever feel.",
          "de": "Meeting-Zahlen messen Aktivität, nicht den Wert, den Kunden oder Finanzen spüren.",
          "es-ES": "Contar reuniones mide actividad, no valor que clientes o finanzas perciban."
        }
      },
      {
        "q": {
          "en": "Revenue is flat. Which lever could lift it without new customers?",
          "de": "Der Umsatz stagniert. Welcher Hebel hebt ihn ohne neue Kunden?",
          "es-ES": "Los ingresos no crecen. ¿Qué palanca los sube sin nuevos clientes?"
        },
        "options": [
          {
            "en": "Cutting the office snack budget",
            "de": "Das Snack-Budget im Büro kürzen",
            "es-ES": "Recortar el presupuesto de aperitivos"
          },
          {
            "en": "Raising the price or value per existing customer",
            "de": "Preis oder Wert pro Bestandskunde erhöhen",
            "es-ES": "Subir el precio o el valor por cliente existente"
          },
          {
            "en": "Logging more hours per person",
            "de": "Mehr Stunden pro Person erfassen",
            "es-ES": "Registrar más horas por persona"
          }
        ],
        "correct": 1,
        "why": {
          "en": "Revenue equals customers times what they pay, so price per customer is a direct lever.",
          "de": "Umsatz ist Kunden mal Preis, also ist der Preis pro Kunde ein direkter Hebel.",
          "es-ES": "Los ingresos son clientes por lo que pagan, así que el precio por cliente es palanca directa."
        }
      }
    ],
    "takeaway": {
      "en": "If you can't name the lever a task moves, you're staying busy, not driving the business.",
      "de": "Wenn du den Hebel einer Aufgabe nicht benennen kannst, bist du beschäftigt, aber treibst das Geschäft nicht.",
      "es-ES": "Si no sabes qué palanca mueve una tarea, estás ocupado, pero no impulsas el negocio."
    }
  },
  {
    "id": "course_value_technology",
    "behavior": "value_technology",
    "icon": "gear",
    "durationMin": 5,
    "title": {
      "en": "Make Tech Pay Off",
      "de": "Technik soll sich lohnen",
      "es-ES": "Que la tecnología rinda"
    },
    "subtitle": {
      "en": "Turn tools and AI into real results, not shiny distractions.",
      "de": "Mach aus Tools und KI echte Ergebnisse statt teurer Spielereien.",
      "es-ES": "Convierte herramientas e IA en resultados reales, no en distracciones."
    },
    "cards": [
      {
        "heading": {
          "en": "Why This Matters",
          "de": "Warum das zählt",
          "es-ES": "Por qué importa"
        },
        "body": {
          "en": "Teams adopt tools fast and value slow. As a leader, you own the gap. When you connect technology to a clear outcome, your team stops buying gadgets and starts solving problems.",
          "de": "Teams führen Tools schnell ein, holen den Nutzen aber langsam raus. Diese Lücke ist deine Verantwortung. Wenn du Technik mit einem klaren Ergebnis verknüpfst, löst dein Team Probleme statt Gadgets zu kaufen.",
          "es-ES": "Los equipos adoptan herramientas rápido y obtienen valor despacio. Esa brecha es tuya. Cuando conectas la tecnología a un resultado claro, tu equipo resuelve problemas en vez de comprar artilugios."
        }
      },
      {
        "heading": {
          "en": "Start With The Job",
          "de": "Beginne mit der Aufgabe",
          "es-ES": "Empieza por la tarea"
        },
        "body": {
          "en": "People don't want software; they want a job done. Ask what task is slow, painful, or error-prone today. Pick the tool that fits the job, never the other way around.",
          "de": "Menschen wollen keine Software, sie wollen eine Aufgabe erledigt haben. Frag, welche Aufgabe heute langsam, mühsam oder fehleranfällig ist. Wähle das Tool zur Aufgabe, nie umgekehrt.",
          "es-ES": "La gente no quiere software; quiere una tarea resuelta. Pregunta qué tarea es hoy lenta, dolorosa o propensa a errores. Elige la herramienta para la tarea, nunca al revés."
        }
      },
      {
        "heading": {
          "en": "Run A Small Pilot",
          "de": "Mach einen kleinen Pilot",
          "es-ES": "Haz un piloto pequeño"
        },
        "body": {
          "en": "Pick one team, one workflow, four weeks. Define the metric before you start: hours saved, errors cut, response time. Measure it, then decide to scale, fix, or drop.",
          "de": "Nimm ein Team, einen Ablauf, vier Wochen. Lege die Kennzahl vorher fest: gesparte Stunden, weniger Fehler, schnellere Reaktion. Miss sie und entscheide dann: skalieren, anpassen oder verwerfen.",
          "es-ES": "Elige un equipo, un flujo, cuatro semanas. Define la métrica antes de empezar: horas ahorradas, errores reducidos, tiempo de respuesta. Mídela y luego decide: escalar, ajustar o descartar."
        }
      },
      {
        "heading": {
          "en": "Avoid The Shiny Trap",
          "de": "Meide die Glanz-Falle",
          "es-ES": "Evita la trampa brillante"
        },
        "body": {
          "en": "The common mistake: buying tech because a rival has it. Skip the demo hype. If you can't name the job and the number it moves, you're not investing, you're decorating.",
          "de": "Der häufige Fehler: Technik kaufen, weil die Konkurrenz sie hat. Lass dich vom Demo-Hype nicht blenden. Wenn du Aufgabe und bewegte Zahl nicht nennen kannst, investierst du nicht, du dekorierst.",
          "es-ES": "El error típico: comprar tecnología porque la tiene un rival. Ignora el bombo de la demo. Si no puedes nombrar la tarea y la cifra que mueve, no inviertes, decoras."
        }
      }
    ],
    "tool": {
      "name": {
        "en": "Jobs-to-be-Done + Value Check",
        "de": "Jobs-to-be-Done + Wert-Check",
        "es-ES": "Jobs-to-be-Done + Chequeo de valor"
      },
      "desc": {
        "en": "A method to frame any tech choice around the real job it does and the value it returns.",
        "de": "Eine Methode, um jede Technikentscheidung an der echten Aufgabe und ihrem Nutzen auszurichten.",
        "es-ES": "Un método para enfocar cualquier decisión tecnológica en la tarea real y el valor que devuelve."
      },
      "steps": [
        {
          "en": "Write the job as a sentence: \"When [situation], help [who] do [task] so they [outcome].\"",
          "de": "Formuliere die Aufgabe als Satz: \"Wenn [Situation], hilf [wem], [Aufgabe] zu tun, damit [Ergebnis].\"",
          "es-ES": "Escribe la tarea como frase: \"Cuando [situación], ayuda a [quién] a hacer [tarea] para [resultado].\""
        },
        {
          "en": "Name one number it should move and estimate the value in time or money.",
          "de": "Benenne eine Zahl, die sich bewegen soll, und schätze den Wert in Zeit oder Geld.",
          "es-ES": "Nombra una cifra que deba moverse y estima el valor en tiempo o dinero."
        },
        {
          "en": "Compare that value against the full cost, including training and time to adopt.",
          "de": "Stelle diesen Wert den Gesamtkosten gegenüber, inklusive Schulung und Einführungszeit.",
          "es-ES": "Compara ese valor con el coste total, incluida la formación y el tiempo de adopción."
        }
      ]
    },
    "quiz": [
      {
        "q": {
          "en": "A vendor pitches an AI tool. What's your first move?",
          "de": "Ein Anbieter bewirbt ein KI-Tool. Was tust du zuerst?",
          "es-ES": "Un proveedor presenta una herramienta de IA. ¿Qué haces primero?"
        },
        "options": [
          {
            "en": "Name the specific job it would do for your team.",
            "de": "Benenne die konkrete Aufgabe, die es für dein Team erledigen würde.",
            "es-ES": "Nombra la tarea concreta que haría para tu equipo."
          },
          {
            "en": "Buy it before a competitor does.",
            "de": "Kauf es, bevor ein Wettbewerber es tut.",
            "es-ES": "Cómprala antes de que lo haga un competidor."
          },
          {
            "en": "Roll it out to everyone at once.",
            "de": "Roll es sofort an alle aus.",
            "es-ES": "Despliégala a todos de golpe."
          }
        ],
        "correct": 0,
        "why": {
          "en": "Value starts with a clear job, not the tool or the fear of missing out.",
          "de": "Wert beginnt mit einer klaren Aufgabe, nicht mit dem Tool oder der Angst, etwas zu verpassen.",
          "es-ES": "El valor empieza con una tarea clara, no con la herramienta ni el miedo a quedarse atrás."
        }
      },
      {
        "q": {
          "en": "Best way to test if a new tool actually creates value?",
          "de": "Wie testest du am besten, ob ein neues Tool wirklich Wert schafft?",
          "es-ES": "¿La mejor forma de probar si una herramienta crea valor real?"
        },
        "options": [
          {
            "en": "Trust the vendor's case study.",
            "de": "Vertraue der Fallstudie des Anbieters.",
            "es-ES": "Confía en el caso de éxito del proveedor."
          },
          {
            "en": "Wait a year and see how it feels.",
            "de": "Warte ein Jahr und schau, wie es sich anfühlt.",
            "es-ES": "Espera un año y mira cómo se siente."
          },
          {
            "en": "Run a small pilot with a metric set in advance.",
            "de": "Mach einen kleinen Pilot mit vorab festgelegter Kennzahl.",
            "es-ES": "Haz un piloto pequeño con una métrica fijada de antemano."
          }
        ],
        "correct": 2,
        "why": {
          "en": "A scoped pilot with a pre-set metric gives you real evidence, fast.",
          "de": "Ein begrenzter Pilot mit vorab gesetzter Kennzahl liefert schnell echte Belege.",
          "es-ES": "Un piloto acotado con métrica previa te da evidencia real y rápida."
        }
      },
      {
        "q": {
          "en": "When judging the cost of a tool, what do leaders most often forget?",
          "de": "Was vergessen Führungskräfte bei den Kosten eines Tools am häufigsten?",
          "es-ES": "Al juzgar el coste de una herramienta, ¿qué olvidan más los líderes?"
        },
        "options": [
          {
            "en": "The monthly license fee.",
            "de": "Die monatliche Lizenzgebühr.",
            "es-ES": "La cuota mensual de licencia."
          },
          {
            "en": "Training and the time people need to adopt it.",
            "de": "Schulung und die Zeit, die Leute zur Einführung brauchen.",
            "es-ES": "La formación y el tiempo que la gente necesita para adoptarla."
          },
          {
            "en": "The color of the interface.",
            "de": "Die Farbe der Oberfläche.",
            "es-ES": "El color de la interfaz."
          }
        ],
        "correct": 1,
        "why": {
          "en": "Adoption time and training often cost more than the license itself.",
          "de": "Einführungszeit und Schulung kosten oft mehr als die Lizenz selbst.",
          "es-ES": "El tiempo de adopción y la formación suelen costar más que la licencia."
        }
      }
    ],
    "takeaway": {
      "en": "No job, no number, no buy: technology earns its place by moving real work.",
      "de": "Keine Aufgabe, keine Zahl, kein Kauf: Technik verdient ihren Platz, indem sie echte Arbeit bewegt.",
      "es-ES": "Sin tarea, sin cifra, sin compra: la tecnología se gana su sitio moviendo trabajo real."
    }
  },
  {
    "id": "course_growth_mindset",
    "behavior": "growth_mindset",
    "icon": "grow",
    "durationMin": 5,
    "title": {
      "en": "Lead the Growth Mindset",
      "de": "Wachstum vorleben",
      "es-ES": "Lidera la mentalidad de crecimiento"
    },
    "subtitle": {
      "en": "Show your team that ability grows, and watch performance follow.",
      "de": "Zeig deinem Team, dass Fähigkeiten wachsen, und die Leistung folgt.",
      "es-ES": "Muestra a tu equipo que la capacidad se desarrolla y el rendimiento le seguirá."
    },
    "cards": [
      {
        "heading": {
          "en": "Why it matters",
          "de": "Warum es zählt",
          "es-ES": "Por qué importa"
        },
        "body": {
          "en": "Teams that believe skills can grow take on harder work and recover faster from setbacks. As the manager, your reaction to failure sets that belief, not your slogans.",
          "de": "Teams, die glauben, dass Fähigkeiten wachsen, packen schwierigere Aufgaben an und stehen nach Rückschlägen schneller wieder auf. Deine Reaktion auf Fehler prägt diesen Glauben, nicht deine Sprüche.",
          "es-ES": "Los equipos que creen que las capacidades se desarrollan asumen retos mayores y se recuperan antes de los tropiezos. Tu reacción ante el fracaso marca esa creencia, no tus lemas."
        }
      },
      {
        "heading": {
          "en": "Fixed vs. growth",
          "de": "Starr oder wachsend",
          "es-ES": "Mentalidad fija o de crecimiento"
        },
        "body": {
          "en": "A fixed mindset sees talent as set: you have it or you don't. A growth mindset treats ability as trainable through effort, feedback, and good strategy. Most people hold both, depending on the moment.",
          "de": "Eine starre Denkweise sieht Talent als festgelegt: Man hat es oder eben nicht. Eine wachsende Denkweise sieht Fähigkeit als trainierbar durch Einsatz, Feedback und gute Strategie. Die meisten haben je nach Situation beides.",
          "es-ES": "La mentalidad fija ve el talento como algo dado: lo tienes o no. La de crecimiento entiende la capacidad como entrenable mediante esfuerzo, feedback y buena estrategia. La mayoría tenemos ambas según el momento."
        }
      },
      {
        "heading": {
          "en": "Praise the process",
          "de": "Den Weg loben",
          "es-ES": "Elogia el proceso"
        },
        "body": {
          "en": "When someone does well, name what they did, not who they are. Say \"your prep on that deck paid off\" instead of \"you're so talented.\" This makes success repeatable and effort worth it.",
          "de": "Wenn jemand gute Arbeit leistet, benenne, was die Person getan hat, nicht wer sie ist. Sag \"deine Vorbereitung der Folien hat sich ausgezahlt\" statt \"du bist so begabt\". So wird Erfolg wiederholbar und Einsatz lohnt sich.",
          "es-ES": "Cuando alguien lo hace bien, nombra lo que hizo, no lo que es. Di \"tu preparación de esa presentación dio frutos\" en lugar de \"qué talento tienes\". Así el éxito se vuelve repetible y el esfuerzo vale la pena."
        }
      },
      {
        "heading": {
          "en": "Avoid this trap",
          "de": "Vermeide diese Falle",
          "es-ES": "Evita esta trampa"
        },
        "body": {
          "en": "Don't fake it by praising effort that led nowhere. Growth mindset isn't \"good try\"; it's \"that didn't work, what's the next thing to try?\" Pair honesty about results with belief that the person can improve.",
          "de": "Tu nicht so, indem du Einsatz lobst, der zu nichts geführt hat. Wachstumsdenken ist nicht \"netter Versuch\", sondern \"das hat nicht funktioniert, was probieren wir als Nächstes?\" Verbinde Ehrlichkeit über Ergebnisse mit dem Glauben, dass die Person sich verbessern kann.",
          "es-ES": "No finjas elogiando un esfuerzo que no llevó a nada. La mentalidad de crecimiento no es \"buen intento\", sino \"eso no funcionó, ¿qué probamos ahora?\". Combina honestidad sobre los resultados con la confianza en que la persona puede mejorar."
        }
      }
    ],
    "tool": {
      "name": {
        "en": "The Power of \"Yet\"",
        "de": "Die Kraft des \"noch nicht\"",
        "es-ES": "El poder del \"todavía\""
      },
      "desc": {
        "en": "A simple language shift from Carol Dweck that turns a dead end into a learning path.",
        "de": "Eine einfache Sprachverschiebung von Carol Dweck, die aus einer Sackgasse einen Lernweg macht.",
        "es-ES": "Un sencillo cambio de lenguaje de Carol Dweck que convierte un callejón sin salida en un camino de aprendizaje."
      },
      "steps": [
        {
          "en": "Catch the \"can't\": notice when you or your team say \"I can't do this\" or \"this isn't my thing.\"",
          "de": "Erkenne das \"kann nicht\": Merke, wenn du oder dein Team sagt \"das kann ich nicht\" oder \"das liegt mir nicht\".",
          "es-ES": "Detecta el \"no puedo\": fíjate cuando tú o tu equipo decís \"no puedo con esto\" o \"esto no es lo mío\"."
        },
        {
          "en": "Add \"yet\": rephrase it as \"I can't do this yet\" to make the gap temporary and learnable.",
          "de": "Füge \"noch nicht\" hinzu: Formuliere um zu \"das kann ich noch nicht\", damit die Lücke vorübergehend und lernbar wird.",
          "es-ES": "Añade \"todavía\": reformúlalo como \"todavía no puedo con esto\" para que la brecha sea temporal y superable."
        },
        {
          "en": "Name the next step: agree on one concrete action that moves past the \"yet.\"",
          "de": "Benenne den nächsten Schritt: Einigt euch auf eine konkrete Handlung, die über das \"noch nicht\" hinausführt.",
          "es-ES": "Define el siguiente paso: acordad una acción concreta que avance más allá del \"todavía\"."
        }
      ]
    },
    "quiz": [
      {
        "q": {
          "en": "A team member nails a tough client pitch. What feedback best models a growth mindset?",
          "de": "Ein Teammitglied meistert eine schwierige Kundenpräsentation. Welches Feedback verkörpert am besten ein Wachstumsdenken?",
          "es-ES": "Un miembro del equipo clava una presentación difícil con un cliente. ¿Qué feedback refleja mejor una mentalidad de crecimiento?"
        },
        "options": [
          {
            "en": "\"You're a natural, this stuff comes easy to you.\"",
            "de": "\"Du bist ein Naturtalent, das fällt dir leicht.\"",
            "es-ES": "\"Eres un talento nato, esto se te da fácil.\""
          },
          {
            "en": "\"The research and rehearsal you put in really showed.\"",
            "de": "\"Die Recherche und das Üben, die du reingesteckt hast, haben sich gezeigt.\"",
            "es-ES": "\"La investigación y los ensayos que hiciste se notaron de verdad.\""
          },
          {
            "en": "\"Good job, keep it up.\"",
            "de": "\"Gut gemacht, weiter so.\"",
            "es-ES": "\"Buen trabajo, sigue así.\""
          }
        ],
        "correct": 1,
        "why": {
          "en": "Praising specific effort and strategy makes the success repeatable, while praising innate talent or staying vague does not.",
          "de": "Konkreten Einsatz und Strategie zu loben macht den Erfolg wiederholbar, während Lob für angeborenes Talent oder vage Worte das nicht tun.",
          "es-ES": "Elogiar el esfuerzo y la estrategia concretos hace el éxito repetible, mientras que alabar el talento innato o quedarse vago no lo logra."
        }
      },
      {
        "q": {
          "en": "Someone says \"I'm just not good with data.\" What's the strongest growth-mindset response?",
          "de": "Jemand sagt \"Mit Daten kann ich einfach nicht\". Was ist die stärkste Wachstumsdenken-Antwort?",
          "es-ES": "Alguien dice \"es que no se me dan los datos\". ¿Cuál es la respuesta más sólida desde la mentalidad de crecimiento?"
        },
        "options": [
          {
            "en": "\"Not good with data yet. Let's find one skill to build this quarter.\"",
            "de": "\"Mit Daten noch nicht. Lass uns eine Fähigkeit finden, die du dieses Quartal aufbaust.\"",
            "es-ES": "\"Todavía no se te dan. Busquemos una habilidad que desarrollar este trimestre.\""
          },
          {
            "en": "\"No problem, I'll just hand data tasks to someone else.\"",
            "de": "\"Kein Problem, ich gebe die Datenaufgaben einfach an jemand anderen.\"",
            "es-ES": "\"No pasa nada, le paso las tareas de datos a otra persona.\""
          },
          {
            "en": "\"Don't worry, some people just aren't numbers people.\"",
            "de": "\"Keine Sorge, manche Menschen sind eben keine Zahlenmenschen.\"",
            "es-ES": "\"Tranquilo, hay gente que simplemente no es de números.\""
          }
        ],
        "correct": 0,
        "why": {
          "en": "Adding \"yet\" plus a concrete next step treats the gap as trainable; the other replies lock the limit in place.",
          "de": "Das \"noch nicht\" plus ein konkreter nächster Schritt behandelt die Lücke als trainierbar; die anderen Antworten zementieren die Grenze.",
          "es-ES": "Añadir \"todavía\" y un paso concreto trata la brecha como entrenable; las otras respuestas fijan el límite."
        }
      },
      {
        "q": {
          "en": "A project fails despite hard work. How do you model a growth mindset without faking it?",
          "de": "Ein Projekt scheitert trotz harter Arbeit. Wie lebst du Wachstumsdenken vor, ohne etwas vorzutäuschen?",
          "es-ES": "Un proyecto fracasa pese al esfuerzo. ¿Cómo modelas una mentalidad de crecimiento sin fingir?"
        },
        "options": [
          {
            "en": "Praise the effort and move on without reviewing the result.",
            "de": "Den Einsatz loben und weitermachen, ohne das Ergebnis zu prüfen.",
            "es-ES": "Elogiar el esfuerzo y seguir adelante sin revisar el resultado."
          },
          {
            "en": "Make clear the result missed, then assign blame so it doesn't repeat.",
            "de": "Klarmachen, dass das Ergebnis verfehlt wurde, und dann Schuld zuweisen, damit es sich nicht wiederholt.",
            "es-ES": "Dejar claro que el resultado falló y luego repartir culpas para que no se repita."
          },
          {
            "en": "Be honest the result missed, then ask what to try differently next time.",
            "de": "Ehrlich sagen, dass das Ergebnis verfehlt wurde, und dann fragen, was beim nächsten Mal anders zu probieren ist.",
            "es-ES": "Ser honesto en que el resultado falló y luego preguntar qué probar distinto la próxima vez."
          }
        ],
        "correct": 2,
        "why": {
          "en": "Growth mindset pairs honesty about outcomes with a forward-looking question, not empty praise or blame.",
          "de": "Wachstumsdenken verbindet Ehrlichkeit über Ergebnisse mit einer vorwärtsgerichteten Frage, nicht mit leerem Lob oder Schuldzuweisung.",
          "es-ES": "La mentalidad de crecimiento une la honestidad sobre los resultados con una pregunta hacia el futuro, no con elogios vacíos ni culpas."
        }
      }
    ],
    "takeaway": {
      "en": "How you react to failure teaches your team more about growth than anything you say about it.",
      "de": "Wie du auf Misserfolg reagierst, lehrt dein Team mehr über Wachstum als alles, was du darüber sagst.",
      "es-ES": "Cómo reaccionas ante el fracaso enseña a tu equipo más sobre el crecimiento que cualquier cosa que digas."
    }
  },
  {
    "id": "course_owns_people_dev",
    "behavior": "owns_people_dev",
    "icon": "people",
    "durationMin": 5,
    "title": {
      "en": "Own People Development",
      "de": "Entwicklung aktiv steuern",
      "es-ES": "Lidera el desarrollo"
    },
    "subtitle": {
      "en": "Grow your people on purpose, and they stay, perform, and rise.",
      "de": "Entwickle dein Team gezielt, damit es bleibt, leistet und wächst.",
      "es-ES": "Haz crecer a tu equipo a propósito: se queda, rinde y asciende."
    },
    "cards": [
      {
        "heading": {
          "en": "Why it matters",
          "de": "Warum es zählt",
          "es-ES": "Por qué importa"
        },
        "body": {
          "en": "People leave managers, not companies. When you visibly invest in someone's growth, they stay longer, take on more, and trust you with hard feedback. Ignore it, and your best people quietly look elsewhere.",
          "de": "Leute kündigen wegen Führungskräften, nicht wegen Firmen. Wer sichtbar in Wachstum investiert, hält Talente, bekommt mehr Einsatz und ehrliches Feedback. Ignorierst du das, schauen sich deine Besten still um.",
          "es-ES": "La gente deja a su jefe, no a la empresa. Si inviertes de forma visible en su crecimiento, se quedan, asumen más y confían en ti. Si lo ignoras, tus mejores perfiles buscan en silencio."
        }
      },
      {
        "heading": {
          "en": "Owner, not fixer",
          "de": "Steuern statt lösen",
          "es-ES": "Dueño, no salvador"
        },
        "body": {
          "en": "Development is your job, but growth is theirs. You own the conditions: clear goals, real stretch work, honest feedback, time. They own the effort. Don't do it for them; make it possible.",
          "de": "Entwicklung ist deine Aufgabe, Wachstum ihre. Du verantwortest die Bedingungen: klare Ziele, echte Herausforderungen, ehrliches Feedback, Zeit. Sie liefern den Einsatz. Mach es nicht für sie, mach es möglich.",
          "es-ES": "El desarrollo es tu trabajo; el crecimiento, suyo. Tú creas las condiciones: metas claras, retos reales, feedback honesto, tiempo. Ellos ponen el esfuerzo. No lo hagas por ellos, hazlo posible."
        }
      },
      {
        "heading": {
          "en": "Make it routine",
          "de": "Mach es zur Routine",
          "es-ES": "Hazlo rutina"
        },
        "body": {
          "en": "Once a month, ask each report one question: \"What do you want to be better at, and what would help?\" Agree one concrete step, then revisit it next time. Small, regular beats grand and rare.",
          "de": "Frag jede:n einmal im Monat: \"Worin willst du besser werden, und was hilft dir?\" Vereinbart einen konkreten Schritt und schaut beim nächsten Mal drauf. Klein und regelmäßig schlägt groß und selten.",
          "es-ES": "Una vez al mes pregunta a cada persona: \"¿En qué quieres mejorar y qué te ayudaría?\". Acordad un paso concreto y revisadlo la próxima vez. Pequeño y constante gana a grande y esporádico."
        }
      },
      {
        "heading": {
          "en": "Avoid the clone trap",
          "de": "Klon-Falle vermeiden",
          "es-ES": "Evita clonarte"
        },
        "body": {
          "en": "The common mistake: pushing people toward your path or the next promotion only. Ask what they want, not just what you'd want. Lateral moves, deeper expertise, and new skills all count as growth.",
          "de": "Typischer Fehler: Leute nur auf deinen Weg oder die nächste Beförderung schieben. Frag, was sie wollen, nicht nur, was du wolltest. Auch Seitwärtsschritte, mehr Tiefe und neue Skills sind Wachstum.",
          "es-ES": "Error habitual: empujar a la gente solo hacia tu camino o el siguiente ascenso. Pregunta qué quieren, no qué querrías tú. Moverse en horizontal, profundizar o ganar nuevas habilidades también es crecer."
        }
      }
    ],
    "tool": {
      "name": {
        "en": "The GROW Model",
        "de": "Das GROW-Modell",
        "es-ES": "El modelo GROW"
      },
      "desc": {
        "en": "A simple coaching structure to turn a vague development wish into a clear next step.",
        "de": "Eine einfache Coaching-Struktur, die aus einem vagen Wunsch einen klaren nächsten Schritt macht.",
        "es-ES": "Una estructura de coaching simple para convertir un deseo difuso en un próximo paso claro."
      },
      "steps": [
        {
          "en": "Goal & Reality: ask what they want to grow in, then where they stand today.",
          "de": "Goal & Reality: Frag, worin sie wachsen wollen, und wo sie heute stehen.",
          "es-ES": "Goal y Reality: pregunta en qué quieren crecer y dónde están hoy."
        },
        {
          "en": "Options: explore 2-3 ways forward without judging or fixing.",
          "de": "Options: Erkundet 2-3 Wege, ohne zu werten oder zu lösen.",
          "es-ES": "Options: explorad 2-3 caminos sin juzgar ni resolver."
        },
        {
          "en": "Will: agree one specific action, owner, and date before you end.",
          "de": "Will: Vereinbart eine konkrete Aktion, verantwortlich und Termin, bevor ihr endet.",
          "es-ES": "Will: acordad una acción concreta, responsable y fecha antes de terminar."
        }
      ]
    },
    "quiz": [
      {
        "q": {
          "en": "A strong report says they feel stuck. What's the best first move?",
          "de": "Ein:e starke:r Mitarbeiter:in sagt, er:sie fühle sich festgefahren. Was tust du zuerst?",
          "es-ES": "Una persona valiosa dice que se siente estancada. ¿Cuál es el mejor primer paso?"
        },
        "options": [
          {
            "en": "Ask what they want to grow in and what would help.",
            "de": "Frag, worin sie wachsen will und was helfen würde.",
            "es-ES": "Pregúntale en qué quiere crecer y qué le ayudaría."
          },
          {
            "en": "Map out the promotion path you took yourself.",
            "de": "Zeig den Beförderungsweg, den du selbst gegangen bist.",
            "es-ES": "Dibújale el camino de ascenso que tú mismo seguiste."
          },
          {
            "en": "Give them a harder project to keep them busy.",
            "de": "Gib ihr ein schwereres Projekt, um sie zu beschäftigen.",
            "es-ES": "Dale un proyecto más difícil para mantenerla ocupada."
          }
        ],
        "correct": 0,
        "why": {
          "en": "Start from their goal, not your assumptions or a busywork fix.",
          "de": "Starte bei ihrem Ziel, nicht bei deinen Annahmen oder Beschäftigung.",
          "es-ES": "Empieza por su meta, no por tus suposiciones ni por darle tarea."
        }
      },
      {
        "q": {
          "en": "What does \"owning\" people development actually mean?",
          "de": "Was heißt es, Entwicklung wirklich zu \"verantworten\"?",
          "es-ES": "¿Qué significa realmente \"liderar\" el desarrollo?"
        },
        "options": [
          {
            "en": "Doing the growth work for them so it gets done.",
            "de": "Die Entwicklungsarbeit für sie erledigen, damit sie passiert.",
            "es-ES": "Hacer tú el trabajo de crecimiento para que se haga."
          },
          {
            "en": "Sending them to a training course once a year.",
            "de": "Sie einmal im Jahr auf eine Schulung schicken.",
            "es-ES": "Mandarles a un curso de formación una vez al año."
          },
          {
            "en": "Creating the conditions for growth while they own the effort.",
            "de": "Die Bedingungen schaffen, während sie den Einsatz bringen.",
            "es-ES": "Crear las condiciones mientras ellos ponen el esfuerzo."
          }
        ],
        "correct": 2,
        "why": {
          "en": "You own goals, feedback, and time; they own the effort to grow.",
          "de": "Du verantwortest Ziele, Feedback und Zeit; sie den Einsatz.",
          "es-ES": "Tú creas metas, feedback y tiempo; ellos ponen el esfuerzo."
        }
      },
      {
        "q": {
          "en": "Which cadence builds development best?",
          "de": "Welcher Rhythmus fördert Entwicklung am besten?",
          "es-ES": "¿Qué ritmo desarrolla mejor a la gente?"
        },
        "options": [
          {
            "en": "One deep career talk in the annual review.",
            "de": "Ein tiefes Karrieregespräch im Jahresgespräch.",
            "es-ES": "Una charla profunda de carrera en la evaluación anual."
          },
          {
            "en": "A short monthly check-in with one agreed step.",
            "de": "Ein kurzer monatlicher Check-in mit einem vereinbarten Schritt.",
            "es-ES": "Un breve repaso mensual con un paso acordado."
          },
          {
            "en": "Whenever the person brings it up themselves.",
            "de": "Immer dann, wenn die Person es selbst anspricht.",
            "es-ES": "Cuando la propia persona lo saque a relucir."
          }
        ],
        "correct": 1,
        "why": {
          "en": "Small and regular beats grand and rare, and keeps momentum.",
          "de": "Klein und regelmäßig schlägt groß und selten und hält Schwung.",
          "es-ES": "Pequeño y constante gana a grande y esporádico, y mantiene el impulso."
        }
      }
    ],
    "takeaway": {
      "en": "You can't grow people for them, but you decide whether growth is even possible.",
      "de": "Du kannst Menschen nicht für sie entwickeln, aber du entscheidest, ob Wachstum überhaupt möglich ist.",
      "es-ES": "No puedes crecer por los demás, pero tú decides si el crecimiento es siquiera posible."
    }
  },
  {
    "id": "course_integrity_courage",
    "behavior": "integrity_courage",
    "icon": "shield",
    "durationMin": 5,
    "title": {
      "en": "Integrity and Courage",
      "de": "Integrität und Mut",
      "es-ES": "Integridad y coraje"
    },
    "subtitle": {
      "en": "Build the trust that lets your team take real risks with you.",
      "de": "Schaffe das Vertrauen, mit dem dein Team echte Risiken mit dir eingeht.",
      "es-ES": "Genera la confianza que hace que tu equipo se arriesgue contigo."
    },
    "cards": [
      {
        "heading": {
          "en": "Why It Matters",
          "de": "Warum es zählt",
          "es-ES": "Por qué importa"
        },
        "body": {
          "en": "People watch what you do under pressure, not what you say. One honest hard call earns more trust than a year of nice words. Integrity is your credibility account.",
          "de": "Leute achten darauf, was du unter Druck tust, nicht was du sagst. Eine ehrliche schwere Entscheidung bringt mehr Vertrauen als ein Jahr nette Worte. Integrität ist dein Glaubwürdigkeitskonto.",
          "es-ES": "La gente observa lo que haces bajo presión, no lo que dices. Una decisión difícil y honesta da más confianza que un año de buenas palabras. La integridad es tu cuenta de credibilidad."
        }
      },
      {
        "heading": {
          "en": "The Core Idea",
          "de": "Die Kernidee",
          "es-ES": "La idea clave"
        },
        "body": {
          "en": "Integrity is saying the same thing to everyone, in and out of the room. Courage is saying the uncomfortable thing to the person who can hear it least. You need both: honesty without nerve stays silent.",
          "de": "Integrität heißt, allen dasselbe zu sagen, drinnen wie draußen. Mut heißt, das Unbequeme der Person zu sagen, die es am wenigsten hören will. Du brauchst beides: Ehrlichkeit ohne Nerven bleibt stumm.",
          "es-ES": "La integridad es decir lo mismo a todos, dentro y fuera de la sala. El coraje es decir lo incómodo a quien menos quiere oírlo. Necesitas ambos: la honestidad sin agallas se queda callada."
        }
      },
      {
        "heading": {
          "en": "Name It Early",
          "de": "Sprich es früh an",
          "es-ES": "Dilo pronto"
        },
        "body": {
          "en": "When something feels off, say it within 24 hours, while it's small. Lead with the fact, then your concern: \"The numbers were changed. I'm worried we're hiding a problem.\" Ask, don't accuse.",
          "de": "Wenn sich etwas falsch anfühlt, sprich es binnen 24 Stunden an, solange es klein ist. Beginne mit dem Fakt, dann deine Sorge: \"Die Zahlen wurden geändert. Ich fürchte, wir verbergen ein Problem.\" Frag, statt anzuklagen.",
          "es-ES": "Cuando algo no encaja, dilo en 24 horas, mientras es pequeño. Empieza por el hecho y luego tu inquietud: \"Se cambiaron las cifras. Me preocupa que ocultemos un problema.\" Pregunta, no acuses."
        }
      },
      {
        "heading": {
          "en": "Avoid the Trap",
          "de": "Vermeide die Falle",
          "es-ES": "Evita la trampa"
        },
        "body": {
          "en": "Courage isn't blurting out every opinion. Pick the issues that matter and raise them with respect and a path forward. Reckless honesty burns trust as fast as silence does.",
          "de": "Mut heißt nicht, jede Meinung herauszuplatzen. Wähle die Themen, die zählen, und bring sie respektvoll und mit einem Weg nach vorn vor. Rücksichtslose Ehrlichkeit verbrennt Vertrauen so schnell wie Schweigen.",
          "es-ES": "El coraje no es soltar cada opinión. Elige los temas que importan y plantéalos con respeto y una salida. La honestidad imprudente quema la confianza tan rápido como el silencio."
        }
      }
    ],
    "tool": {
      "name": {
        "en": "Radical Candor",
        "de": "Radical Candor",
        "es-ES": "Radical Candor (Franqueza radical)"
      },
      "desc": {
        "en": "Kim Scott's model for challenging people directly while showing you genuinely care about them.",
        "de": "Kim Scotts Modell, um Menschen direkt zu fordern und zugleich echtes Interesse an ihnen zu zeigen.",
        "es-ES": "El modelo de Kim Scott para retar a las personas con franqueza mostrando que te importan de verdad."
      },
      "steps": [
        {
          "en": "Care personally: open by showing you're on their side, not against them.",
          "de": "Persönlich kümmern: Mach zu Beginn klar, dass du auf ihrer Seite bist, nicht gegen sie.",
          "es-ES": "Preocúpate de verdad: empieza dejando claro que estás de su lado, no en su contra."
        },
        {
          "en": "Challenge directly: state the specific behavior and its impact, no hedging.",
          "de": "Direkt fordern: Benenne das konkrete Verhalten und seine Wirkung, ohne Drumherum.",
          "es-ES": "Reta con claridad: nombra la conducta concreta y su impacto, sin rodeos."
        },
        {
          "en": "Invite the response: ask what they see and agree on one next step.",
          "de": "Antwort einladen: Frag nach ihrer Sicht und einigt euch auf einen nächsten Schritt.",
          "es-ES": "Invita a responder: pregunta cómo lo ven y acordad un siguiente paso."
        }
      ]
    },
    "quiz": [
      {
        "q": {
          "en": "Your boss asks you to soften a risk in a report to clients. What shows integrity and courage?",
          "de": "Dein Chef bittet dich, ein Risiko im Kundenbericht abzuschwächen. Was zeigt Integrität und Mut?",
          "es-ES": "Tu jefe te pide suavizar un riesgo en un informe para clientes. ¿Qué muestra integridad y coraje?"
        },
        "options": [
          {
            "en": "Quietly edit it; it's their call, not yours.",
            "de": "Still ändern; das ist seine Entscheidung, nicht deine.",
            "es-ES": "Lo cambias en silencio; es su decisión, no la tuya."
          },
          {
            "en": "Raise the risk privately, explain the exposure, and propose honest wording.",
            "de": "Sprich das Risiko unter vier Augen an, erkläre die Gefahr und schlage ehrliche Formulierungen vor.",
            "es-ES": "Planteas el riesgo en privado, explicas la exposición y propones una redacción honesta."
          },
          {
            "en": "Comply now and complain to colleagues later.",
            "de": "Jetzt nachgeben und dich später bei Kollegen beschweren.",
            "es-ES": "Obedeces ahora y luego te quejas con los colegas."
          }
        ],
        "correct": 1,
        "why": {
          "en": "You voice the concern directly to the decision-maker and offer a workable path, instead of caving or venting sideways.",
          "de": "Du bringst die Sorge direkt zur entscheidenden Person und bietest einen gangbaren Weg, statt nachzugeben oder dich nebenher zu beklagen.",
          "es-ES": "Llevas la inquietud directamente a quien decide y ofreces una salida viable, en vez de ceder o desahogarte de lado."
        }
      },
      {
        "q": {
          "en": "What best describes Radical Candor?",
          "de": "Was beschreibt Radical Candor am besten?",
          "es-ES": "¿Qué describe mejor Radical Candor?"
        },
        "options": [
          {
            "en": "Challenge directly while caring personally.",
            "de": "Direkt fordern und sich dabei persönlich kümmern.",
            "es-ES": "Retar con claridad mientras te importa la persona."
          },
          {
            "en": "Always be nice and avoid conflict.",
            "de": "Immer nett sein und Konflikte vermeiden.",
            "es-ES": "Ser siempre amable y evitar el conflicto."
          },
          {
            "en": "Say whatever you think, no filter needed.",
            "de": "Sag, was du denkst, ohne Filter.",
            "es-ES": "Decir lo que piensas, sin ningún filtro."
          }
        ],
        "correct": 0,
        "why": {
          "en": "Candor needs both halves: directness plus genuine care; drop either and it becomes aggression or empty niceness.",
          "de": "Candor braucht beide Hälften: Direktheit plus echtes Interesse; fehlt eine, wird es Aggression oder leere Nettigkeit.",
          "es-ES": "La franqueza necesita ambas mitades: claridad y aprecio real; sin una se vuelve agresión o amabilidad vacía."
        }
      },
      {
        "q": {
          "en": "Which is the most common failure of 'courage' for managers?",
          "de": "Was ist das häufigste Scheitern von \"Mut\" bei Führungskräften?",
          "es-ES": "¿Cuál es el fallo más común del \"coraje\" en los mandos?"
        },
        "options": [
          {
            "en": "Speaking up too often about minor things.",
            "de": "Zu oft über Kleinigkeiten den Mund aufmachen.",
            "es-ES": "Hablar demasiado de cosas menores."
          },
          {
            "en": "Being too blunt with senior leaders.",
            "de": "Zu schroff gegenüber der Führungsebene sein.",
            "es-ES": "Ser demasiado brusco con la dirección."
          },
          {
            "en": "Staying silent and raising the issue too late.",
            "de": "Schweigen und das Thema zu spät ansprechen.",
            "es-ES": "Quedarse callado y plantear el tema demasiado tarde."
          }
        ],
        "correct": 2,
        "why": {
          "en": "Most managers under-speak, not over-speak; small concerns left unsaid grow into big, harder problems.",
          "de": "Die meisten Führungskräfte sagen zu wenig, nicht zu viel; ungesagte kleine Sorgen werden zu großen, schwereren Problemen.",
          "es-ES": "La mayoría de los mandos hablan de menos, no de más; las pequeñas inquietudes calladas se vuelven problemas mayores."
        }
      }
    ],
    "takeaway": {
      "en": "Trust is built in the moments you choose the honest answer over the easy one.",
      "de": "Vertrauen entsteht in den Momenten, in denen du die ehrliche statt der bequemen Antwort wählst.",
      "es-ES": "La confianza se construye en los momentos en que eliges la respuesta honesta y no la fácil."
    }
  },
  {
    "id": "course_service_first",
    "behavior": "service_first",
    "icon": "heart",
    "durationMin": 5,
    "title": {
      "en": "Lead by Serving",
      "de": "Führen durch Dienen",
      "es-ES": "Liderar sirviendo"
    },
    "subtitle": {
      "en": "Remove blockers and your team delivers more, faster.",
      "de": "Beseitige Hindernisse, und dein Team liefert mehr und schneller.",
      "es-ES": "Quita los obstáculos y tu equipo rinde más y mejor."
    },
    "cards": [
      {
        "heading": {
          "en": "Why It Matters",
          "de": "Warum es zählt",
          "es-ES": "Por qué importa"
        },
        "body": {
          "en": "Your job is to make your team effective, not to be the smartest person in the room. When you clear obstacles, people own their work and results follow.",
          "de": "Deine Aufgabe ist es, dein Team handlungsfähig zu machen, nicht der oder die Klügste zu sein. Wenn du Hindernisse beseitigst, übernehmen Leute Verantwortung und Ergebnisse folgen.",
          "es-ES": "Tu trabajo es que tu equipo funcione, no ser quien más sabe. Cuando quitas obstáculos, la gente se apropia de su trabajo y llegan los resultados."
        }
      },
      {
        "heading": {
          "en": "Flip the Pyramid",
          "de": "Die Pyramide umdrehen",
          "es-ES": "Da la vuelta a la pirámide"
        },
        "body": {
          "en": "Picture yourself at the bottom, holding the team up, not at the top giving orders. Ask: what does my team need from me to win this week?",
          "de": "Stell dir vor, du stehst unten und trägst das Team, statt von oben Befehle zu geben. Frage dich: Was braucht mein Team diese Woche von mir, um zu gewinnen?",
          "es-ES": "Imagínate abajo, sosteniendo al equipo, no arriba dando órdenes. Pregúntate: ¿qué necesita mi equipo de mí para ganar esta semana?"
        }
      },
      {
        "heading": {
          "en": "Ask, Then Listen",
          "de": "Fragen, dann zuhören",
          "es-ES": "Pregunta y escucha"
        },
        "body": {
          "en": "In your next one-on-one, ask \"What's slowing you down?\" Then stay quiet and let them answer. Commit to removing one blocker before the meeting ends.",
          "de": "Frage im nächsten Einzelgespräch: \"Was bremst dich gerade aus?\" Dann schweig und lass die Person antworten. Beseitige bis zum Ende des Gesprächs ein Hindernis.",
          "es-ES": "En tu próximo uno a uno, pregunta \"¿Qué te está frenando?\" Luego calla y deja que responda. Comprométete a quitar un obstáculo antes de terminar."
        }
      },
      {
        "heading": {
          "en": "The Common Trap",
          "de": "Die häufige Falle",
          "es-ES": "La trampa habitual"
        },
        "body": {
          "en": "Serving is not saying yes to everything or doing the work for them. Protect their time and growth: clear the path, then let them walk it themselves.",
          "de": "Dienen heißt nicht, zu allem Ja zu sagen oder ihnen die Arbeit abzunehmen. Schütze ihre Zeit und Entwicklung: räum den Weg frei und lass sie selbst gehen.",
          "es-ES": "Servir no es decir que sí a todo ni hacerles el trabajo. Protege su tiempo y crecimiento: despeja el camino y deja que lo recorran ellos."
        }
      }
    ],
    "tool": {
      "name": {
        "en": "Servant Leadership & the Listening Ladder",
        "de": "Servant Leadership und die Zuhör-Leiter",
        "es-ES": "Liderazgo de servicio y la escalera de la escucha"
      },
      "desc": {
        "en": "A practice of leading by meeting your team's needs first, using active listening to understand before you act.",
        "de": "Eine Praxis, bei der du führst, indem du zuerst die Bedürfnisse deines Teams erfüllst und aktiv zuhörst, bevor du handelst.",
        "es-ES": "Una práctica de liderar atendiendo primero las necesidades del equipo, escuchando de forma activa antes de actuar."
      },
      "steps": [
        {
          "en": "Ask an open question and let silence do the work.",
          "de": "Stell eine offene Frage und lass die Stille wirken.",
          "es-ES": "Haz una pregunta abierta y deja que el silencio trabaje."
        },
        {
          "en": "Reflect back what you heard before responding.",
          "de": "Gib in eigenen Worten wieder, was du gehört hast, bevor du reagierst.",
          "es-ES": "Repite con tus palabras lo que oíste antes de responder."
        },
        {
          "en": "Commit to one concrete action and follow through.",
          "de": "Verpflichte dich zu einer konkreten Maßnahme und zieh sie durch.",
          "es-ES": "Comprométete a una acción concreta y cúmplela."
        }
      ]
    },
    "quiz": [
      {
        "q": {
          "en": "A team member is stuck waiting on another department. What's the service-first move?",
          "de": "Ein Teammitglied wartet blockiert auf eine andere Abteilung. Was ist der service-first Schritt?",
          "es-ES": "Una persona del equipo está bloqueada esperando a otro departamento. ¿Cuál es la jugada service-first?"
        },
        "options": [
          {
            "en": "Tell them to be more patient and figure it out.",
            "de": "Sag ihr, sie soll geduldiger sein und es selbst lösen.",
            "es-ES": "Dile que tenga paciencia y que lo resuelva."
          },
          {
            "en": "Use your position to unblock the dependency for them.",
            "de": "Nutze deine Position, um die Abhängigkeit für sie aufzulösen.",
            "es-ES": "Usa tu posición para desbloquear la dependencia por ellos."
          },
          {
            "en": "Add the delay to their performance review.",
            "de": "Schreib die Verzögerung in ihre Leistungsbeurteilung.",
            "es-ES": "Apunta el retraso en su evaluación de desempeño."
          }
        ],
        "correct": 1,
        "why": {
          "en": "Clearing cross-team blockers is exactly the leverage your role gives you.",
          "de": "Bereichsübergreifende Hindernisse zu beseitigen ist genau der Hebel deiner Rolle.",
          "es-ES": "Quitar bloqueos entre equipos es justo la palanca que te da tu rol."
        }
      },
      {
        "q": {
          "en": "What best describes a service-first mindset?",
          "de": "Was beschreibt eine service-first Haltung am besten?",
          "es-ES": "¿Qué describe mejor una mentalidad service-first?"
        },
        "options": [
          {
            "en": "Putting your team's success ahead of your own visibility.",
            "de": "Den Erfolg deines Teams über deine eigene Sichtbarkeit stellen.",
            "es-ES": "Poner el éxito del equipo por delante de tu visibilidad."
          },
          {
            "en": "Approving every request so nobody feels blocked.",
            "de": "Jeder Bitte zustimmen, damit sich niemand blockiert fühlt.",
            "es-ES": "Aprobar cada petición para que nadie se sienta bloqueado."
          },
          {
            "en": "Doing the hard tasks yourself to save time.",
            "de": "Die schweren Aufgaben selbst erledigen, um Zeit zu sparen.",
            "es-ES": "Hacer tú las tareas difíciles para ahorrar tiempo."
          }
        ],
        "correct": 0,
        "why": {
          "en": "It's about enabling others, not pleasing everyone or doing their work.",
          "de": "Es geht darum, andere zu befähigen, nicht es allen recht zu machen oder ihre Arbeit zu tun.",
          "es-ES": "Se trata de habilitar a otros, no de complacer a todos ni hacer su trabajo."
        }
      },
      {
        "q": {
          "en": "In a one-on-one you ask what's slowing them down. What should you do next?",
          "de": "Im Einzelgespräch fragst du, was sie ausbremst. Was machst du als Nächstes?",
          "es-ES": "En un uno a uno preguntas qué les frena. ¿Qué haces a continuación?"
        },
        "options": [
          {
            "en": "Jump in immediately with your own solution.",
            "de": "Sofort mit deiner eigenen Lösung einspringen.",
            "es-ES": "Saltar enseguida con tu propia solución."
          },
          {
            "en": "Change the subject to project deadlines.",
            "de": "Das Thema auf Projektfristen wechseln.",
            "es-ES": "Cambiar de tema a los plazos del proyecto."
          },
          {
            "en": "Stay quiet, listen fully, then reflect back what you heard.",
            "de": "Schweigen, ganz zuhören und dann wiedergeben, was du gehört hast.",
            "es-ES": "Callar, escuchar del todo y luego repetir lo que oíste."
          }
        ],
        "correct": 2,
        "why": {
          "en": "Listening before acting is the core of the listening ladder.",
          "de": "Zuhören vor dem Handeln ist der Kern der Zuhör-Leiter.",
          "es-ES": "Escuchar antes de actuar es la base de la escalera de la escucha."
        }
      }
    ],
    "takeaway": {
      "en": "Your team's biggest blocker is the one only you can remove, so go find it.",
      "de": "Das größte Hindernis deines Teams ist das, das nur du beseitigen kannst, also finde es.",
      "es-ES": "El mayor obstáculo de tu equipo es el que solo tú puedes quitar, así que ve a buscarlo."
    }
  },
  {
    "id": "course_performance_accountability",
    "behavior": "performance_accountability",
    "icon": "target",
    "durationMin": 5,
    "title": {
      "en": "Make Accountability Stick",
      "de": "Verantwortung verankern",
      "es-ES": "Que rinda cuentas de verdad"
    },
    "subtitle": {
      "en": "Get clear commitments and follow through, without micromanaging.",
      "de": "Klare Zusagen und echtes Dranbleiben, ohne Mikromanagement.",
      "es-ES": "Compromisos claros y seguimiento real, sin microgestionar."
    },
    "cards": [
      {
        "heading": {
          "en": "Why It Matters",
          "de": "Warum es zählt",
          "es-ES": "Por qué importa"
        },
        "body": {
          "en": "Teams don't drift because people are lazy. They drift because nobody owns the outcome and nobody checks. Clear accountability turns good intentions into delivered results.",
          "de": "Teams verlieren den Fokus nicht aus Faulheit, sondern weil niemand das Ergebnis besitzt und niemand nachhält. Klare Verantwortung macht aus guten Absichten echte Ergebnisse.",
          "es-ES": "Los equipos no se desvían por pereza, sino porque nadie es dueño del resultado y nadie revisa. La responsabilidad clara convierte intenciones en resultados."
        }
      },
      {
        "heading": {
          "en": "Owner, Not Helper",
          "de": "Verantwortlich, nicht Helfer",
          "es-ES": "Dueño, no ayudante"
        },
        "body": {
          "en": "Every important outcome needs one named owner, not a committee. The owner decides, drives, and reports. Others can help, but accountability that's shared is accountability that's gone.",
          "de": "Jedes wichtige Ergebnis braucht eine namentliche verantwortliche Person, kein Gremium. Sie entscheidet, treibt voran und berichtet. Geteilte Verantwortung ist keine Verantwortung.",
          "es-ES": "Cada resultado clave necesita un dueño con nombre, no un comité. Decide, impulsa e informa. La responsabilidad compartida es responsabilidad perdida."
        }
      },
      {
        "heading": {
          "en": "Make The Commitment Real",
          "de": "Zusage konkret machen",
          "es-ES": "Haz real el compromiso"
        },
        "body": {
          "en": "End every delegation with three answers out loud: what, by when, what 'done' looks like. Then ask them to repeat it back. Vague asks create vague results.",
          "de": "Beende jede Delegation mit drei klaren Antworten: was, bis wann, woran man 'fertig' erkennt. Lass es dir wiederholen. Vage Aufträge bringen vage Ergebnisse.",
          "es-ES": "Cierra cada delegación con tres respuestas en voz alta: qué, para cuándo y qué significa 'hecho'. Pide que lo repitan. Peticiones vagas dan resultados vagos."
        }
      },
      {
        "heading": {
          "en": "Don't Wait For The Deadline",
          "de": "Nicht bis zur Frist warten",
          "es-ES": "No esperes a la fecha límite"
        },
        "body": {
          "en": "The classic mistake: check in only when it's due. Set one short midpoint review so problems surface early. Quick win: a 15-minute standing check beats a missed deadline.",
          "de": "Der Klassiker: erst zur Frist nachfragen. Setze einen kurzen Zwischencheck, damit Probleme früh sichtbar werden. Quick Win: 15 Minuten regelmäßig schlagen jede verpasste Frist.",
          "es-ES": "El error clásico: revisar solo al vencer. Pon un punto intermedio para detectar problemas a tiempo. Truco: 15 minutos fijos valen más que una fecha incumplida."
        }
      }
    ],
    "tool": {
      "name": {
        "en": "OKRs + Accountability Ladder",
        "de": "OKRs + Verantwortungsleiter",
        "es-ES": "OKR + escalera de responsabilidad"
      },
      "desc": {
        "en": "OKRs set measurable outcomes; the accountability ladder shows whether people own results or hide behind excuses.",
        "de": "OKRs setzen messbare Ziele; die Verantwortungsleiter zeigt, ob Menschen Ergebnisse besitzen oder sich hinter Ausreden verstecken.",
        "es-ES": "Los OKR fijan resultados medibles; la escalera de responsabilidad muestra si la gente asume resultados o se esconde tras excusas."
      },
      "steps": [
        {
          "en": "Set one objective and 2-3 measurable key results per person, each with a named owner.",
          "de": "Lege ein Ziel und 2-3 messbare Key Results pro Person fest, jeweils mit klarer verantwortlicher Person.",
          "es-ES": "Define un objetivo y 2-3 resultados clave medibles por persona, cada uno con dueño."
        },
        {
          "en": "In check-ins, listen for ladder language: 'I'll fix it' is ownership, 'it wasn't me' is below the line.",
          "de": "Achte in Check-ins auf die Leitersprache: 'Ich kümmere mich' ist Verantwortung, 'das war nicht ich' liegt darunter.",
          "es-ES": "En las revisiones, escucha el lenguaje de la escalera: 'lo soluciono' es responsabilidad; 'no fui yo' está por debajo."
        },
        {
          "en": "When someone slips below the line, coach them back to the next concrete action they'll take.",
          "de": "Rutscht jemand unter die Linie, führe ihn zurück zur nächsten konkreten Handlung, die er übernimmt.",
          "es-ES": "Si alguien cae por debajo, guíalo de vuelta a la siguiente acción concreta que asumirá."
        }
      ]
    },
    "quiz": [
      {
        "q": {
          "en": "A key project has the whole team listed as 'responsible'. What's the risk?",
          "de": "Bei einem wichtigen Projekt ist das ganze Team als 'verantwortlich' eingetragen. Was ist das Risiko?",
          "es-ES": "Un proyecto clave tiene a todo el equipo como 'responsable'. ¿Cuál es el riesgo?"
        },
        "options": [
          {
            "en": "No single person owns the outcome, so nobody truly does.",
            "de": "Niemand besitzt das Ergebnis allein, also niemand wirklich.",
            "es-ES": "Nadie es dueño del resultado en solitario, así que nadie lo es de verdad."
          },
          {
            "en": "The team will move faster with more people involved.",
            "de": "Das Team wird mit mehr Beteiligten schneller.",
            "es-ES": "El equipo irá más rápido con más gente implicada."
          },
          {
            "en": "It guarantees fairer credit at the end.",
            "de": "Es sorgt am Ende für gerechtere Anerkennung.",
            "es-ES": "Garantiza un reparto más justo del mérito al final."
          }
        ],
        "correct": 0,
        "why": {
          "en": "Shared accountability dilutes ownership; one named owner keeps the outcome on track.",
          "de": "Geteilte Verantwortung verwässert die Eigenverantwortung; eine benannte Person hält das Ergebnis auf Kurs.",
          "es-ES": "La responsabilidad compartida diluye la propiedad; un dueño con nombre mantiene el resultado en marcha."
        }
      },
      {
        "q": {
          "en": "You finish delegating a task. What's the strongest final move?",
          "de": "Du hast eine Aufgabe gerade delegiert. Was ist der stärkste letzte Schritt?",
          "es-ES": "Acabas de delegar una tarea. ¿Cuál es el mejor paso final?"
        },
        "options": [
          {
            "en": "Tell them to come to you if anything comes up.",
            "de": "Sag ihnen, sie sollen kommen, falls etwas auftaucht.",
            "es-ES": "Diles que acudan a ti si surge algo."
          },
          {
            "en": "Ask them to repeat back the what, when, and definition of done.",
            "de": "Lass sie das Was, das Wann und die Definition von 'fertig' wiederholen.",
            "es-ES": "Pídeles que repitan el qué, el cuándo y qué es 'hecho'."
          },
          {
            "en": "Send a follow-up email summarizing everything yourself.",
            "de": "Schick selbst eine zusammenfassende Folge-E-Mail.",
            "es-ES": "Envía tú mismo un correo resumiendo todo."
          }
        ],
        "correct": 1,
        "why": {
          "en": "Having them repeat it confirms shared understanding far better than you restating it.",
          "de": "Wenn sie es wiederholen, bestätigt das ein gemeinsames Verständnis weit besser als deine Zusammenfassung.",
          "es-ES": "Que lo repitan confirma el entendimiento mutuo mucho mejor que reformularlo tú."
        }
      },
      {
        "q": {
          "en": "When should you schedule a check-in on a two-week deliverable?",
          "de": "Wann solltest du bei einer zweiwöchigen Aufgabe einen Check-in ansetzen?",
          "es-ES": "¿Cuándo conviene revisar una entrega de dos semanas?"
        },
        "options": [
          {
            "en": "Only on the due date, to respect their autonomy.",
            "de": "Nur am Fälligkeitstag, um die Autonomie zu wahren.",
            "es-ES": "Solo en la fecha de entrega, para respetar su autonomía."
          },
          {
            "en": "Every single day, to stay fully in control.",
            "de": "Jeden Tag, um die volle Kontrolle zu behalten.",
            "es-ES": "Cada día, para mantener el control total."
          },
          {
            "en": "A short midpoint review so issues surface with time to fix them.",
            "de": "Ein kurzer Zwischencheck, damit Probleme noch rechtzeitig auftauchen.",
            "es-ES": "Una revisión intermedia breve para detectar problemas con tiempo de corregir."
          }
        ],
        "correct": 2,
        "why": {
          "en": "A midpoint check catches problems early without tipping into daily micromanagement.",
          "de": "Ein Zwischencheck erkennt Probleme früh, ohne in tägliches Mikromanagement zu kippen.",
          "es-ES": "La revisión intermedia detecta problemas pronto sin caer en microgestión diaria."
        }
      }
    ],
    "takeaway": {
      "en": "One owner, a clear definition of done, and a check before the deadline turn ambitions into results.",
      "de": "Eine verantwortliche Person, eine klare Definition von 'fertig' und ein Check vor der Frist machen aus Ambitionen Ergebnisse.",
      "es-ES": "Un dueño, una definición clara de 'hecho' y una revisión antes del plazo convierten ambiciones en resultados."
    }
  },
  {
    "id": "course_frontline_impact",
    "behavior": "frontline_impact",
    "icon": "bolt",
    "durationMin": 5,
    "title": {
      "en": "Drives Frontline Impact",
      "de": "Wirkung an der Front",
      "es-ES": "Impacto en primera línea"
    },
    "subtitle": {
      "en": "Turn your decisions into real results where the work actually happens.",
      "de": "Mach aus deinen Entscheidungen echte Ergebnisse dort, wo gearbeitet wird.",
      "es-ES": "Convierte tus decisiones en resultados reales donde se hace el trabajo."
    },
    "cards": [
      {
        "heading": {
          "en": "Strategy Dies at the Edge",
          "de": "Strategie scheitert am Rand",
          "es-ES": "La estrategia muere en el borde"
        },
        "body": {
          "en": "Plans created in meeting rooms rarely survive contact with the frontline. The gap between what you decide and what gets done is where most goals quietly fail.",
          "de": "Pläne aus dem Meetingraum überleben selten den Kontakt mit der Front. Genau in der Lücke zwischen Entscheidung und Umsetzung scheitern die meisten Ziele leise.",
          "es-ES": "Los planes hechos en salas de reuniones rara vez sobreviven al contacto con la primera línea. En la distancia entre lo que decides y lo que se hace fracasan en silencio la mayoría de los objetivos."
        }
      },
      {
        "heading": {
          "en": "Go See for Yourself",
          "de": "Schau selbst hin",
          "es-ES": "Ve a verlo tú mismo"
        },
        "body": {
          "en": "Real work lives where it's done, not in dashboards. Trust what you observe firsthand over what gets reported up to you. Reports are filtered; the floor is not.",
          "de": "Die echte Arbeit lebt dort, wo sie getan wird, nicht im Dashboard. Vertraue dem, was du selbst siehst, mehr als dem, was nach oben gemeldet wird. Berichte sind gefiltert, der Arbeitsplatz nicht.",
          "es-ES": "El trabajo real está donde se hace, no en los paneles. Confía más en lo que ves de primera mano que en lo que te reportan. Los informes vienen filtrados; el terreno no."
        }
      },
      {
        "heading": {
          "en": "Remove One Obstacle",
          "de": "Beseitige ein Hindernis",
          "es-ES": "Elimina un obstáculo"
        },
        "body": {
          "en": "Ask your team: what slows you down most? Pick the single biggest blocker and fix it this week. One removed obstacle beats ten new initiatives.",
          "de": "Frag dein Team: Was bremst dich am meisten? Nimm den größten Blocker und beseitige ihn diese Woche. Ein beseitigtes Hindernis schlägt zehn neue Initiativen.",
          "es-ES": "Pregunta a tu equipo: ¿qué es lo que más te frena? Elige el mayor obstáculo y resuélvelo esta semana. Quitar un obstáculo vale más que diez iniciativas nuevas."
        }
      },
      {
        "heading": {
          "en": "Don't Inspect to Blame",
          "de": "Prüfen, nicht beschuldigen",
          "es-ES": "Observar, no culpar"
        },
        "body": {
          "en": "If your visits feel like surprise audits, people hide problems. Show up curious, not as the boss checking up. The goal is to help, not to catch.",
          "de": "Wenn sich deine Besuche wie Überraschungsprüfungen anfühlen, verstecken die Leute Probleme. Komm neugierig, nicht als kontrollierender Chef. Es geht ums Helfen, nicht ums Ertappen.",
          "es-ES": "Si tus visitas parecen auditorías sorpresa, la gente esconde los problemas. Llega con curiosidad, no como el jefe que controla. El objetivo es ayudar, no pillar."
        }
      }
    ],
    "tool": {
      "name": {
        "en": "The Gemba Walk",
        "de": "Der Gemba-Walk",
        "es-ES": "El Gemba Walk"
      },
      "desc": {
        "en": "A structured visit to where the work happens, to see reality firsthand and remove what slows your team down.",
        "de": "Ein strukturierter Gang dorthin, wo gearbeitet wird, um die Realität selbst zu sehen und Bremsen für dein Team zu beseitigen.",
        "es-ES": "Una visita estructurada al lugar donde se hace el trabajo, para ver la realidad de primera mano y quitar lo que frena a tu equipo."
      },
      "steps": [
        {
          "en": "Go to where the work is done and watch the real process, without interrupting it.",
          "de": "Geh dorthin, wo gearbeitet wird, und beobachte den echten Prozess, ohne ihn zu unterbrechen.",
          "es-ES": "Ve al lugar donde se hace el trabajo y observa el proceso real, sin interrumpirlo."
        },
        {
          "en": "Ask open questions: \"Why this way? What gets in your way?\" Listen more than you speak.",
          "de": "Stell offene Fragen: \"Warum so? Was steht dir im Weg?\" Hör mehr zu, als du redest.",
          "es-ES": "Haz preguntas abiertas: \"¿Por qué así? ¿Qué te estorba?\" Escucha más de lo que hablas."
        },
        {
          "en": "Agree on one concrete fix, own it, and follow up to show you acted on what you heard.",
          "de": "Einigt euch auf eine konkrete Verbesserung, übernimm sie und meld dich zurück, um zu zeigen, dass du gehandelt hast.",
          "es-ES": "Acordad una mejora concreta, hazte responsable y haz seguimiento para demostrar que actuaste."
        }
      ]
    },
    "quiz": [
      {
        "q": {
          "en": "Your weekly report shows targets are met, but you sense something is off. What best drives frontline impact?",
          "de": "Dein Wochenbericht zeigt erreichte Ziele, aber du spürst, dass etwas nicht stimmt. Was wirkt an der Front am besten?",
          "es-ES": "Tu informe semanal dice que se cumplen los objetivos, pero intuyes que algo va mal. ¿Qué genera más impacto en primera línea?"
        },
        "options": [
          {
            "en": "Ask for a more detailed report.",
            "de": "Einen detaillierteren Bericht anfordern.",
            "es-ES": "Pedir un informe más detallado."
          },
          {
            "en": "Go to where the work happens and observe it yourself.",
            "de": "Dorthin gehen, wo gearbeitet wird, und es selbst beobachten.",
            "es-ES": "Ir al lugar donde se trabaja y observarlo tú mismo."
          },
          {
            "en": "Wait to see if next week's numbers confirm it.",
            "de": "Abwarten, ob die Zahlen nächste Woche es bestätigen.",
            "es-ES": "Esperar a ver si los números de la próxima semana lo confirman."
          }
        ],
        "correct": 1,
        "why": {
          "en": "Reports are filtered; seeing the work firsthand reveals what numbers hide.",
          "de": "Berichte sind gefiltert; nur das direkte Hinsehen zeigt, was Zahlen verbergen.",
          "es-ES": "Los informes vienen filtrados; ver el trabajo en directo revela lo que los números ocultan."
        }
      },
      {
        "q": {
          "en": "On a floor visit, a team member admits they skip a step to save time. Your best response?",
          "de": "Bei einem Besuch gibt ein Teammitglied zu, dass es einen Schritt überspringt, um Zeit zu sparen. Deine beste Reaktion?",
          "es-ES": "En una visita, un miembro del equipo admite que se salta un paso para ahorrar tiempo. ¿Tu mejor reacción?"
        },
        "options": [
          {
            "en": "Ask why, and whether the step is actually needed.",
            "de": "Frag warum, und ob der Schritt überhaupt nötig ist.",
            "es-ES": "Pregunta por qué, y si ese paso es realmente necesario."
          },
          {
            "en": "Note it as a compliance issue to address later.",
            "de": "Notiere es als Compliance-Problem für später.",
            "es-ES": "Anótalo como incumplimiento para tratarlo más tarde."
          },
          {
            "en": "Remind them to always follow the process.",
            "de": "Erinnere sie daran, immer dem Prozess zu folgen.",
            "es-ES": "Recuérdale que siga siempre el proceso."
          }
        ],
        "correct": 0,
        "why": {
          "en": "Curiosity surfaces broken processes; blame just teaches people to hide them.",
          "de": "Neugier deckt kaputte Prozesse auf; Schuldzuweisung bringt Leute nur dazu, sie zu verstecken.",
          "es-ES": "La curiosidad saca a la luz procesos rotos; culpar solo enseña a esconderlos."
        }
      },
      {
        "q": {
          "en": "You ask your team what slows them down and get a clear answer. What turns this into impact?",
          "de": "Du fragst dein Team, was es bremst, und bekommst eine klare Antwort. Was macht daraus Wirkung?",
          "es-ES": "Preguntas a tu equipo qué les frena y recibes una respuesta clara. ¿Qué lo convierte en impacto?"
        },
        "options": [
          {
            "en": "Add it to a list of issues for the quarter.",
            "de": "Setz es auf eine Liste mit Themen fürs Quartal.",
            "es-ES": "Añádelo a una lista de temas del trimestre."
          },
          {
            "en": "Share it upward so leadership is aware.",
            "de": "Gib es nach oben weiter, damit die Führung Bescheid weiß.",
            "es-ES": "Trasládalo hacia arriba para que la dirección lo sepa."
          },
          {
            "en": "Fix the single biggest blocker this week and follow up.",
            "de": "Beseitige den größten Blocker diese Woche und meld dich zurück.",
            "es-ES": "Resuelve el mayor obstáculo esta semana y haz seguimiento."
          }
        ],
        "correct": 2,
        "why": {
          "en": "Visible, fast action proves you listen and earns the next honest answer.",
          "de": "Sichtbares, schnelles Handeln beweist, dass du zuhörst, und sichert die nächste ehrliche Antwort.",
          "es-ES": "La acción rápida y visible demuestra que escuchas y te gana la próxima respuesta sincera."
        }
      }
    ],
    "takeaway": {
      "en": "Results live on the frontline, not in your inbox, so go there, watch, and clear the way.",
      "de": "Ergebnisse entstehen an der Front, nicht im Postfach, also geh hin, schau zu und räum den Weg frei.",
      "es-ES": "Los resultados están en primera línea, no en tu bandeja de entrada: ve, observa y despeja el camino."
    }
  },
  {
    "id": "course_decisive_speed",
    "behavior": "decisive_speed",
    "icon": "clock",
    "durationMin": 5,
    "title": {
      "en": "Decide and Move",
      "de": "Entscheiden und handeln",
      "es-ES": "Decide y avanza"
    },
    "subtitle": {
      "en": "Make faster calls that still hold up under pressure.",
      "de": "Triff schnellere Entscheidungen, die trotzdem standhalten.",
      "es-ES": "Toma decisiones rapidas que aguanten la presion."
    },
    "cards": [
      {
        "heading": {
          "en": "Speed is a result",
          "de": "Tempo bringt Ergebnisse",
          "es-ES": "La rapidez da resultados"
        },
        "body": {
          "en": "Slow decisions stall your whole team. Every day a call sits open, work piles up behind it. Deciding fast is how ambitions actually turn into results.",
          "de": "Langsame Entscheidungen blockieren dein ganzes Team. Jeder Tag, den eine Entscheidung offen bleibt, staut die Arbeit dahinter. Schnell entscheiden macht aus Zielen echte Ergebnisse.",
          "es-ES": "Las decisiones lentas frenan a todo tu equipo. Cada dia que una decision sigue abierta, el trabajo se acumula detras. Decidir rapido convierte las metas en resultados."
        }
      },
      {
        "heading": {
          "en": "Aim for 70%",
          "de": "Ziel sind 70 Prozent",
          "es-ES": "Apunta al 70%"
        },
        "body": {
          "en": "Most decisions are reversible. Once you have about 70% of the information you'd like, decide. Waiting for 100% costs more than the occasional wrong turn you can correct.",
          "de": "Die meisten Entscheidungen sind umkehrbar. Sobald du rund 70 Prozent der Infos hast, entscheide. Auf 100 Prozent zu warten kostet mehr als ein gelegentlicher Fehltritt, den du korrigierst.",
          "es-ES": "La mayoria de decisiones son reversibles. Cuando tengas cerca del 70% de la informacion, decide. Esperar al 100% cuesta mas que un error puntual que puedes corregir."
        }
      },
      {
        "heading": {
          "en": "Set a decision deadline",
          "de": "Setze eine Frist",
          "es-ES": "Fija un plazo"
        },
        "body": {
          "en": "Give every open call a date and an owner. Say: \"We choose by Thursday, I decide if we're split.\" A deadline forces the trade-offs into the open instead of endless circling.",
          "de": "Gib jeder offenen Entscheidung ein Datum und eine verantwortliche Person. Sag: \"Wir wahlen bis Donnerstag, bei Patt entscheide ich.\" Eine Frist legt die Abwagungen offen, statt endlos zu kreisen.",
          "es-ES": "Pon fecha y responsable a cada decision abierta. Di: \"Elegimos el jueves, si hay empate decido yo.\" Un plazo saca a la luz las concesiones en vez de dar mil vueltas."
        }
      },
      {
        "heading": {
          "en": "Avoid the false tie",
          "de": "Das Scheinpatt vermeiden",
          "es-ES": "Evita el falso empate"
        },
        "body": {
          "en": "When two options feel equal, it usually means the gap is small, so just pick one and move. Treating a close call as a crisis wastes the time speed was meant to save.",
          "de": "Wenn zwei Optionen gleich wirken, ist der Unterschied meist klein, also wahle eine und mach weiter. Eine knappe Entscheidung als Krise zu behandeln verschwendet die gewonnene Zeit.",
          "es-ES": "Cuando dos opciones parecen iguales, suele ser porque la diferencia es minima, asi que elige una y sigue. Tratar un empate como crisis desperdicia el tiempo ganado."
        }
      }
    ],
    "tool": {
      "name": {
        "en": "The 70% Rule",
        "de": "Die 70-Prozent-Regel",
        "es-ES": "La regla del 70%"
      },
      "desc": {
        "en": "A simple threshold for knowing when you have enough information to commit and act.",
        "de": "Eine einfache Schwelle, um zu erkennen, wann du genug Infos hast, um dich festzulegen und zu handeln.",
        "es-ES": "Un umbral simple para saber cuando tienes informacion suficiente para comprometerte y actuar."
      },
      "steps": [
        {
          "en": "Ask: is this decision easy to reverse? If yes, lower your bar to act.",
          "de": "Frag dich: Lasst sich diese Entscheidung leicht umkehren? Wenn ja, senke deine Schwelle.",
          "es-ES": "Preguntate: es facil revertir esta decision? Si lo es, baja tu listón para actuar."
        },
        {
          "en": "Gather the facts that matter until you're roughly 70% sure, then stop researching.",
          "de": "Sammle die wichtigen Fakten, bis du dir zu rund 70 Prozent sicher bist, dann hor auf zu recherchieren.",
          "es-ES": "Reune los datos que importan hasta estar un 70% seguro, y entonces deja de investigar."
        },
        {
          "en": "Commit out loud, name the owner, and set a date to review the outcome.",
          "de": "Entscheide klar, benenne die verantwortliche Person und lege ein Datum zur Uberprufung fest.",
          "es-ES": "Comprometete en voz alta, nombra al responsable y fija una fecha para revisar el resultado."
        }
      ]
    },
    "quiz": [
      {
        "q": {
          "en": "A reversible decision is stuck because you want more data. What's the best move?",
          "de": "Eine umkehrbare Entscheidung hangt fest, weil du mehr Daten willst. Was ist der beste Schritt?",
          "es-ES": "Una decision reversible esta atascada porque quieres mas datos. Cual es el mejor paso?"
        },
        "options": [
          {
            "en": "Decide now at ~70% and adjust later if needed.",
            "de": "Jetzt bei rund 70 Prozent entscheiden und bei Bedarf nachjustieren.",
            "es-ES": "Decidir ya al 70% y ajustar despues si hace falta."
          },
          {
            "en": "Wait until you have full certainty.",
            "de": "Warten, bis du volle Sicherheit hast.",
            "es-ES": "Esperar hasta tener certeza total."
          },
          {
            "en": "Pass the decision up to your boss.",
            "de": "Die Entscheidung an deine Chefin weiterreichen.",
            "es-ES": "Pasar la decision a tu jefe."
          }
        ],
        "correct": 0,
        "why": {
          "en": "Reversible calls reward speed; you can correct course cheaply if you're wrong.",
          "de": "Umkehrbare Entscheidungen belohnen Tempo; du kannst gunstig korrigieren, wenn du falsch liegst.",
          "es-ES": "Las decisiones reversibles premian la rapidez; corregir sale barato si te equivocas."
        }
      },
      {
        "q": {
          "en": "Two options look almost equally good. What does this usually signal?",
          "de": "Zwei Optionen wirken fast gleich gut. Was bedeutet das meistens?",
          "es-ES": "Dos opciones parecen casi igual de buenas. Que suele indicar esto?"
        },
        "options": [
          {
            "en": "You need a deeper analysis before choosing.",
            "de": "Du brauchst eine tiefere Analyse vor der Wahl.",
            "es-ES": "Necesitas un analisis mas profundo antes de elegir."
          },
          {
            "en": "The gap is small, so pick one and move.",
            "de": "Der Unterschied ist klein, also wahle eine und mach weiter.",
            "es-ES": "La diferencia es minima, asi que elige una y sigue."
          },
          {
            "en": "Neither option is good enough yet.",
            "de": "Keine der Optionen ist gut genug.",
            "es-ES": "Ninguna opcion es lo bastante buena todavia."
          }
        ],
        "correct": 1,
        "why": {
          "en": "When options are close, the cost of choosing wrong is low, so deciding fast wins.",
          "de": "Wenn Optionen nah beieinander liegen, ist der Fehlkosten gering, also gewinnt schnelles Entscheiden.",
          "es-ES": "Cuando las opciones estan parejas, el coste de errar es bajo, asi que gana decidir rapido."
        }
      },
      {
        "q": {
          "en": "Your team keeps reopening a settled decision. What helps most?",
          "de": "Dein Team rollt eine getroffene Entscheidung immer wieder neu auf. Was hilft am meisten?",
          "es-ES": "Tu equipo reabre una y otra vez una decision ya tomada. Que ayuda mas?"
        },
        "options": [
          {
            "en": "Let the debate run until everyone agrees.",
            "de": "Die Debatte laufen lassen, bis alle zustimmen.",
            "es-ES": "Dejar el debate hasta que todos esten de acuerdo."
          },
          {
            "en": "Quietly hope it settles on its own.",
            "de": "Still hoffen, dass es sich von selbst klart.",
            "es-ES": "Esperar en silencio a que se resuelva solo."
          },
          {
            "en": "Name a clear owner and a date the call is final.",
            "de": "Eine klar verantwortliche Person und ein Enddatum festlegen.",
            "es-ES": "Nombrar un responsable claro y una fecha en que la decision es definitiva."
          }
        ],
        "correct": 2,
        "why": {
          "en": "A named owner and a deadline close the loop so the team can execute instead of circling.",
          "de": "Verantwortung und Frist schliessen die Schleife, damit das Team handelt statt zu kreisen.",
          "es-ES": "Un responsable y un plazo cierran el bucle para que el equipo ejecute en vez de dar vueltas."
        }
      }
    ],
    "takeaway": {
      "en": "At 70% sure, decide; you can steer a moving car, not a parked one.",
      "de": "Bei 70 Prozent Sicherheit entscheide; ein fahrendes Auto lasst sich lenken, ein geparktes nicht.",
      "es-ES": "Al 70% de certeza, decide; un coche en marcha se puede dirigir, uno parado no."
    }
  },
  {
    "id": "course_resilience",
    "behavior": "resilience",
    "icon": "anchor",
    "durationMin": 5,
    "title": {
      "en": "Leading Under Pressure",
      "de": "Unter Druck führen",
      "es-ES": "Liderar bajo presión"
    },
    "subtitle": {
      "en": "Stay steady when plans break so your team keeps delivering.",
      "de": "Bleib ruhig, wenn Pläne scheitern, damit dein Team weiter liefert.",
      "es-ES": "Mantén el rumbo cuando los planes fallan y tu equipo sigue entregando."
    },
    "cards": [
      {
        "heading": {
          "en": "Your calm sets the tone",
          "de": "Deine Ruhe gibt den Takt vor",
          "es-ES": "Tu calma marca el tono"
        },
        "body": {
          "en": "When a deadline slips or a launch breaks, your team watches you first. If you spiral, they spiral. Steady leadership keeps work moving instead of freezing it.",
          "de": "Wenn eine Deadline kippt oder ein Launch scheitert, schaut dein Team zuerst auf dich. Wenn du durchdrehst, dreht es mit durch. Ruhige Führung hält die Arbeit in Bewegung.",
          "es-ES": "Cuando se cae un plazo o falla un lanzamiento, el equipo te mira a ti primero. Si te hundes, se hunden. La calma mantiene el trabajo en marcha."
        }
      },
      {
        "heading": {
          "en": "Control what you can",
          "de": "Steuere, was steuerbar ist",
          "es-ES": "Controla lo que puedes"
        },
        "body": {
          "en": "Split every crisis into two piles: what you can act on and what you can't. Spend your energy only on the first pile. Worrying about the second drains the team.",
          "de": "Teile jede Krise in zwei Stapel: was du beeinflussen kannst und was nicht. Steck deine Energie nur in den ersten. Das Grübeln über den zweiten zehrt am Team.",
          "es-ES": "Divide cada crisis en dos montones: lo que puedes accionar y lo que no. Gasta energía solo en el primero. Rumiar el segundo agota al equipo."
        }
      },
      {
        "heading": {
          "en": "Name it, then act",
          "de": "Benenne es, dann handle",
          "es-ES": "Nómbralo y actúa"
        },
        "body": {
          "en": "Say plainly what happened, what it means, and the next one or two moves. \"We lost the client. Here's our plan for this week.\" Clarity beats false cheer.",
          "de": "Sag klar, was passiert ist, was es bedeutet und die nächsten ein, zwei Schritte. \"Wir haben den Kunden verloren. Das ist unser Plan für diese Woche.\" Klarheit schlägt aufgesetzten Optimismus.",
          "es-ES": "Di con claridad qué pasó, qué significa y los próximos uno o dos pasos. \"Perdimos al cliente. Este es el plan de la semana.\" La claridad gana al optimismo fingido."
        }
      },
      {
        "heading": {
          "en": "Don't run on empty",
          "de": "Fahr nicht auf Reserve",
          "es-ES": "No vayas en reserva"
        },
        "body": {
          "en": "The common trap is powering through with no recovery. Protect sleep, breaks, and one real day off. Resilience is a battery you recharge, not willpower you burn.",
          "de": "Die häufige Falle: durchpowern ohne Erholung. Schütze Schlaf, Pausen und einen echten freien Tag. Resilienz ist ein Akku, den du lädst, keine Willenskraft zum Verheizen.",
          "es-ES": "La trampa habitual es tirar sin recuperarte. Protege el sueño, las pausas y un día libre de verdad. La resiliencia es una batería que recargas, no fuerza que quemas."
        }
      }
    ],
    "tool": {
      "name": {
        "en": "Dichotomy of Control",
        "de": "Dichotomie der Kontrolle",
        "es-ES": "Dicotomía del control"
      },
      "desc": {
        "en": "A Stoic check that separates what you can influence from what you can't, so you act where it counts and recover deliberately.",
        "de": "Ein stoischer Check, der Beeinflussbares von Unbeeinflussbarem trennt, damit du dort handelst, wo es zählt, und bewusst auffängst.",
        "es-ES": "Una comprobación estoica que separa lo influenciable de lo que no, para actuar donde importa y recuperarte a conciencia."
      },
      "steps": [
        {
          "en": "Write the situation in one line, then list what you can and cannot control.",
          "de": "Schreib die Situation in einer Zeile, dann liste, was du steuern kannst und was nicht.",
          "es-ES": "Escribe la situación en una línea y lista qué controlas y qué no."
        },
        {
          "en": "Pick one action from the controllable side and commit to it today.",
          "de": "Wähl eine Handlung aus der steuerbaren Seite und setz sie heute um.",
          "es-ES": "Elige una acción del lado controlable y comprométete a hacerla hoy."
        },
        {
          "en": "Schedule a real recovery block before you tackle the next problem.",
          "de": "Plan einen echten Erholungsblock, bevor du das nächste Problem angehst.",
          "es-ES": "Reserva un bloque de recuperación real antes del siguiente problema."
        }
      ]
    },
    "quiz": [
      {
        "q": {
          "en": "A major project just got cancelled. What should you do first as the leader?",
          "de": "Ein großes Projekt wurde gerade gestoppt. Was tust du als Führungskraft zuerst?",
          "es-ES": "Acaban de cancelar un proyecto importante. ¿Qué haces primero como líder?"
        },
        "options": [
          {
            "en": "Vent your frustration openly so the team sees you're human",
            "de": "Deinen Frust offen rauslassen, damit das Team dich menschlich erlebt",
            "es-ES": "Desahogar tu frustración para que el equipo te vea humano"
          },
          {
            "en": "State plainly what happened and name the next one or two moves",
            "de": "Klar sagen, was passiert ist, und die nächsten ein, zwei Schritte benennen",
            "es-ES": "Decir con claridad qué pasó y nombrar los próximos uno o dos pasos"
          },
          {
            "en": "Wait until you have a full plan before saying anything",
            "de": "Warten, bis du einen kompletten Plan hast, bevor du etwas sagst",
            "es-ES": "Esperar a tener un plan completo antes de decir nada"
          }
        ],
        "correct": 1,
        "why": {
          "en": "Naming reality plus the next concrete step gives the team clarity and keeps work moving.",
          "de": "Realität benennen plus konkreter nächster Schritt gibt Klarheit und hält die Arbeit in Bewegung.",
          "es-ES": "Nombrar la realidad y el siguiente paso concreto da claridad y mantiene el trabajo en marcha."
        }
      },
      {
        "q": {
          "en": "The dichotomy of control tells you to focus your energy on what?",
          "de": "Die Dichotomie der Kontrolle sagt, du sollst deine Energie worauf richten?",
          "es-ES": "La dicotomía del control dice que enfoques tu energía en qué?"
        },
        "options": [
          {
            "en": "The things you can actually act on",
            "de": "Die Dinge, auf die du wirklich einwirken kannst",
            "es-ES": "Las cosas sobre las que sí puedes actuar"
          },
          {
            "en": "Convincing others the outcome wasn't your fault",
            "de": "Andere zu überzeugen, dass das Ergebnis nicht deine Schuld war",
            "es-ES": "Convencer a otros de que el resultado no fue culpa tuya"
          },
          {
            "en": "Predicting every possible thing that could go wrong",
            "de": "Vorherzusehen, was alles schiefgehen könnte",
            "es-ES": "Predecir todo lo que podría salir mal"
          }
        ],
        "correct": 0,
        "why": {
          "en": "Energy spent on what you can't control is wasted; the controllable side is where action pays off.",
          "de": "Energie für Unbeeinflussbares ist verschwendet; die steuerbare Seite zahlt sich aus.",
          "es-ES": "La energía en lo incontrolable se pierde; el lado controlable es donde la acción rinde."
        }
      },
      {
        "q": {
          "en": "After weeks of crisis, what's the resilient move for a leader?",
          "de": "Nach Wochen im Krisenmodus: Was ist der resiliente Schritt einer Führungskraft?",
          "es-ES": "Tras semanas de crisis, ¿cuál es el movimiento resiliente de un líder?"
        },
        "options": [
          {
            "en": "Push harder and skip rest to set an example",
            "de": "Noch härter durchziehen und Pausen streichen als Vorbild",
            "es-ES": "Apretar más y saltarse el descanso para dar ejemplo"
          },
          {
            "en": "Hide your fatigue so no one doubts your strength",
            "de": "Müdigkeit verbergen, damit niemand an deiner Stärke zweifelt",
            "es-ES": "Ocultar el cansancio para que nadie dude de tu fuerza"
          },
          {
            "en": "Protect recovery time so you can keep performing",
            "de": "Erholungszeit schützen, um leistungsfähig zu bleiben",
            "es-ES": "Proteger el tiempo de recuperación para seguir rindiendo"
          }
        ],
        "correct": 2,
        "why": {
          "en": "Resilience is a rechargeable battery; deliberate recovery sustains performance instead of burning it out.",
          "de": "Resilienz ist ein aufladbarer Akku; bewusste Erholung erhält die Leistung, statt sie zu verheizen.",
          "es-ES": "La resiliencia es una batería recargable; la recuperación deliberada sostiene el rendimiento."
        }
      }
    ],
    "takeaway": {
      "en": "Act on what you control, let go of what you can't, and recharge before the next storm.",
      "de": "Handle bei dem, was du steuerst, lass los, was du nicht steuerst, und lade auf vor dem nächsten Sturm.",
      "es-ES": "Actúa sobre lo que controlas, suelta lo que no, y recárgate antes de la próxima tormenta."
    }
  }
];

export function getCourse(id: string): MicroCourse | undefined {
  return COURSES.find((c) => c.id === id);
}
export function courseForBehavior(behavior: string): MicroCourse | undefined {
  return COURSES.find((c) => c.behavior === behavior);
}
export function coursePillar(c: MicroCourse): "elevate" | "engage" | "execute" | null {
  return behaviorPillar(c.behavior);
}
export function localized(t: LocalizedText, locale: Locale): string {
  return t[locale] ?? t.en ?? Object.values(t)[0] ?? "";
}
