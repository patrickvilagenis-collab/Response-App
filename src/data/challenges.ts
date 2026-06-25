import type { Challenge } from "../types";
import { DEPARTMENT_CHALLENGES } from "./challenges-departments";

// Seed challenge library — see docs/challenge-library.md
// Scenario text is immersive, second-person and localized (en / de / es-ES).

export const CHALLENGES: Challenge[] = [
  {
    id: "C-001",
    type: "behavioral",
    category: "conflict_resolution",
    difficulty: 2,
    media: {
      scene: "office_1on1",
      alt: {
        en: "A quiet office meeting room set up for a one-on-one conversation.",
        de: "Ein ruhiger Besprechungsraum, eingerichtet für ein Vier-Augen-Gespräch.",
        "es-ES": "Una sala de reuniones tranquila preparada para una conversación individual.",
      },
    },
    roleCaption: {
      en: "You are a Project Lead in a 1:1 with your manager.",
      de: "Du bist Projektleiter:in im Vier-Augen-Gespräch mit deiner Führungskraft.",
      "es-ES": "Eres responsable de proyecto en un 1:1 con tu manager.",
    },
    scenario: {
      en: "Tell me about a time you faced a conflict with a colleague who wasn't pulling their weight on a shared deliverable. What did you do, and how did it end?",
      de: "Erzähl mir von einer Situation, in der du einen Konflikt mit einer Kollegin oder einem Kollegen hattest, die oder der bei einem gemeinsamen Ergebnis nicht mitzog. Was hast du getan, und wie ging es aus?",
      "es-ES": "Cuéntame una vez en que tuviste un conflicto con un compañero que no estaba aportando lo suyo en un entregable compartido. ¿Qué hiciste y cómo acabó?",
    },
    weights: { content: 0.6, delivery: 0.2, time: 0.2 },
    keyPoints: [
      { en: "specific real situation", de: "konkrete reale Situation", "es-ES": "situación real concreta" },
      { en: "the action you personally took", de: "die konkrete Handlung", "es-ES": "la acción que tomaste" },
      { en: "a concrete result or outcome", de: "ein konkretes Ergebnis", "es-ES": "un resultado concreto" },
      { en: "spoke to them directly", de: "direktes Gespräch", "es-ES": "hablaste directamente" },
      { en: "what you learned", de: "was du gelernt hast", "es-ES": "qué aprendiste" },
    ],
    rubric: {
      content: {
        strong: "Specific real example with clear STAR structure and a concrete outcome.",
        adequate: "A real example but missing the result or one STAR element.",
        weak: "Hypothetical or generic; no real situation or action.",
      },
      delivery: {
        strong: "Owns their actions, no blame-dumping, composed.",
        adequate: "Some hedging or mild blame of the colleague.",
        weak: "Defensive, vague, or blames others throughout.",
      },
      time: {
        strong: "Complete STAR inside 60s, tight.",
        adequate: "Fits but rushed or padded.",
        weak: "Runs out before the result, or far too sparse.",
      },
    },
    modelAnswer: {
      en: "On our Q3 launch, a teammate kept missing handoff deadlines, which threatened our date. Rather than escalate first, I spoke to them privately, learned they were overloaded on another project, and we re-split the tasks and set daily 10-minute check-ins. We shipped on time, and they later thanked me for not going over their head. My takeaway: address it directly and early, assume good intent, and fix the system, not just the symptom.",
      de: "Bei unserem Q3-Launch verpasste ein Teammitglied wiederholt Übergabefristen, was unseren Termin gefährdete. Statt sofort zu eskalieren, sprach ich es unter vier Augen an, erfuhr von einer Überlastung in einem anderen Projekt, und wir teilten die Aufgaben neu auf und führten tägliche 10-Minuten-Check-ins ein. Wir lieferten pünktlich, und später bedankte er sich, dass ich es nicht über seinen Kopf hinweg gemeldet hatte. Meine Lehre: früh und direkt ansprechen, gute Absicht annehmen und das System reparieren, nicht nur das Symptom.",
      "es-ES": "En nuestro lanzamiento del tercer trimestre, un compañero incumplía repetidamente las entregas, lo que ponía en riesgo la fecha. En lugar de escalar de inmediato, hablé con él en privado, descubrí que estaba sobrecargado con otro proyecto, repartimos de nuevo las tareas y fijamos seguimientos diarios de 10 minutos. Entregamos a tiempo y más tarde me agradeció no haber ido por encima de él. Mi aprendizaje: abordarlo pronto y de forma directa, presumir buena intención y arreglar el sistema, no solo el síntoma.",
    },
  },
  {
    id: "C-002",
    type: "situational",
    category: "professional_communication",
    difficulty: 3,
    media: {
      scene: "boardroom",
      alt: {
        en: "An executive boardroom with a long table and a city skyline window.",
        de: "Ein Vorstands-Boardroom mit langem Tisch und Fenster zur Skyline.",
        "es-ES": "Una sala de juntas ejecutiva con una mesa larga y ventanal con vistas a la ciudad.",
      },
    },
    roleCaption: {
      en: "You are a Project Manager, suddenly summoned upstairs.",
      de: "Du bist Projektmanager:in und wirst plötzlich nach oben gerufen.",
      "es-ES": "Eres jefe de proyecto, convocado de repente a la planta de dirección.",
    },
    scenario: {
      en: "It's Friday afternoon. You have a meeting with your boss's boss. You haven't been briefed. They tell you the CEO is upset about a project you worked on. How do you respond?",
      de: "Es ist Freitagnachmittag. Du hast ein Meeting mit der Chefin deiner Chefin. Du wurdest nicht gebrieft. Sie sagt dir, der CEO sei verärgert über ein Projekt, an dem du gearbeitet hast. Wie reagierst du?",
      "es-ES": "Es viernes por la tarde. Tienes una reunión con el jefe de tu jefe. Nadie te ha puesto en contexto. Te dicen que el CEO está molesto por un proyecto en el que trabajaste. ¿Cómo respondes?",
    },
    weights: { content: 0.4, delivery: 0.35, time: 0.25 },
    keyPoints: [
      { en: "stay composed, no panic", de: "ruhig bleiben, keine Panik", "es-ES": "mantener la calma, sin pánico" },
      { en: "ask one clarifying question", de: "eine klärende Frage stellen", "es-ES": "hacer una pregunta aclaratoria" },
      { en: "take ownership", de: "Verantwortung übernehmen", "es-ES": "asumir responsabilidad" },
      { en: "propose a concrete next step", de: "konkreten nächsten Schritt vorschlagen", "es-ES": "proponer un siguiente paso concreto" },
    ],
    rubric: {
      content: {
        strong: "Composed; asks one clarifying question; takes ownership; proposes a concrete next step.",
        adequate: "Either calm or ownership, but not both; vague next step.",
        weak: "Defensive, panicked, deflects blame, or over-apologizes.",
      },
      delivery: {
        strong: "Assured, measured, present; takes the spotlight without panic.",
        adequate: "Mostly composed; some hedging.",
        weak: "Flustered, rambling, or evasive.",
      },
      time: {
        strong: "Concise, controlled response inside 60s.",
        adequate: "Fits but rushed or padded.",
        weak: "Spirals or stalls.",
      },
    },
    modelAnswer: {
      en: "Thank you for telling me directly — I want to get this right. Can you share what specifically the CEO is concerned about, so I address the real issue and not a guess? Whatever it is, I own my part of this project and I'll get you a clear picture and a recovery plan by Monday morning. If it's helpful, I can walk you through what I know right now.",
      de: "Danke, dass Sie es mir direkt sagen — ich will das richtig angehen. Können Sie mir sagen, worüber genau der CEO besorgt ist, damit ich das eigentliche Problem adressiere und nicht rate? Was immer es ist, ich stehe zu meinem Anteil an diesem Projekt und liefere Ihnen bis Montagmorgen ein klares Bild und einen Plan. Wenn es hilft, kann ich Ihnen jetzt gleich erläutern, was ich weiß.",
      "es-ES": "Gracias por decírmelo directamente — quiero gestionarlo bien. ¿Puedes contarme qué le preocupa exactamente al CEO, para abordar el problema real y no una suposición? Sea lo que sea, asumo mi parte en este proyecto y te daré una visión clara y un plan de recuperación el lunes a primera hora. Si te sirve, ahora mismo puedo explicarte lo que sé.",
    },
  },
  {
    id: "C-003",
    type: "conflict",
    category: "leadership_decisions",
    difficulty: 3,
    media: {
      scene: "client_meeting",
      alt: {
        en: "A client meeting room mid-presentation, with a screen and people seated.",
        de: "Ein Kundenmeeting-Raum mitten in der Präsentation, mit Bildschirm und Personen.",
        "es-ES": "Una sala de reunión con cliente a mitad de presentación, con pantalla y personas sentadas.",
      },
    },
    roleCaption: {
      en: "You are the team's leader, mid client presentation.",
      de: "Du leitest das Team, mitten in einer Kundenpräsentation.",
      "es-ES": "Eres el líder del equipo, en plena presentación al cliente.",
    },
    scenario: {
      en: "A team member just challenged your decision in front of the client. The room goes quiet and everyone looks at you. How do you respond?",
      de: "Ein Teammitglied stellt gerade vor dem Kunden deine Entscheidung infrage. Es wird still im Raum und alle schauen dich an. Wie reagierst du?",
      "es-ES": "Un miembro de tu equipo acaba de cuestionar tu decisión delante del cliente. La sala se queda en silencio y todos te miran. ¿Cómo respondes?",
    },
    weights: { content: 0.45, delivery: 0.35, time: 0.2 },
    keyPoints: [
      { en: "stay calm, no public power struggle", de: "ruhig bleiben, kein öffentlicher Machtkampf", "es-ES": "mantener la calma, sin pulso público" },
      { en: "acknowledge the input without undermining", de: "Einwand anerkennen, ohne zu untergraben", "es-ES": "reconocer la aportación sin socavar" },
      { en: "hold or adjust the decision with reasoning", de: "Entscheidung mit Begründung halten oder anpassen", "es-ES": "mantener o ajustar la decisión con argumentos" },
      { en: "take the detail offline", de: "Details später klären", "es-ES": "tratar el detalle aparte" },
    ],
    rubric: {
      content: {
        strong: "Stays calm; acknowledges input without undermining the team; holds/adjusts with reasoning; protects the client; takes it offline.",
        adequate: "Calm but either caves or shuts the person down; no offline follow-up.",
        weak: "Public power struggle, visible irritation, or capitulates entirely.",
      },
      delivery: {
        strong: "Authoritative yet respectful; presence; de-escalates.",
        adequate: "Mostly composed; slightly defensive or dismissive.",
        weak: "Defensive, sharp, or flustered.",
      },
      time: {
        strong: "Controlled, decisive, inside 60s.",
        adequate: "Fits but wavers.",
        weak: "Rambles or freezes.",
      },
    },
    modelAnswer: {
      en: "That's a fair point to raise, and I appreciate it. Here's the reasoning behind where we landed: it best protects the client's timeline. For today, I'm comfortable moving forward on that basis — and Alex, let's dig into your concern straight after this so nothing gets lost. Does that work for everyone?",
      de: "Das ist ein berechtigter Einwand, und ich schätze ihn. Hier die Begründung für unsere Entscheidung: Sie schützt den Zeitplan des Kunden am besten. Für heute gehe ich auf dieser Basis gerne weiter — und Alex, lass uns dein Anliegen direkt im Anschluss vertiefen, damit nichts verloren geht. Passt das für alle?",
      "es-ES": "Es una observación legítima y la agradezco. Esta es la razón de dónde aterrizamos: protege mejor los plazos del cliente. Por hoy, me quedo cómodo avanzando sobre esa base — y Álex, repasemos tu inquietud justo después de esto para que no se pierda nada. ¿Os parece bien a todos?",
    },
  },
  {
    id: "C-004",
    type: "wave",
    category: "strategic_thinking",
    difficulty: 4,
    media: {
      scene: "exec_committee",
      alt: {
        en: "An executive committee table with serious faces and a strategy deck on screen.",
        de: "Ein Vorstandstisch mit ernsten Gesichtern und einer Strategie-Präsentation auf dem Bildschirm.",
        "es-ES": "Una mesa de comité ejecutivo con caras serias y una presentación de estrategia en pantalla.",
      },
    },
    roleCaption: {
      en: "You are a senior leader presenting to the executive committee.",
      de: "Du bist eine Führungskraft und präsentierst vor dem Vorstand.",
      "es-ES": "Eres un alto directivo presentando ante el comité ejecutivo.",
    },
    scenario: {
      en: "Two of your strongest growth bets are competing for the same limited budget, and you can fully fund only one. The board wants your recommendation now. Which do you back, and why?",
      de: "Zwei deiner stärksten Wachstumswetten konkurrieren um dasselbe begrenzte Budget, und du kannst nur eine voll finanzieren. Der Vorstand will jetzt deine Empfehlung. Welche unterstützt du, und warum?",
      "es-ES": "Dos de tus mejores apuestas de crecimiento compiten por el mismo presupuesto limitado y solo puedes financiar una por completo. El consejo quiere tu recomendación ahora. ¿Cuál respaldas y por qué?",
    },
    weights: { content: 0.55, delivery: 0.25, time: 0.2 },
    keyPoints: [
      { en: "a clear decision criterion", de: "ein klares Entscheidungskriterium", "es-ES": "un criterio de decisión claro" },
      { en: "commit to one option", de: "sich für eine Option entscheiden", "es-ES": "comprometerse con una opción" },
      { en: "acknowledge the trade-off explicitly", de: "den Trade-off explizit benennen", "es-ES": "reconocer el trade-off explícitamente" },
      { en: "how to de-risk the unfunded bet", de: "die nicht finanzierte Wette absichern", "es-ES": "cómo mitigar el riesgo de la apuesta no financiada" },
    ],
    rubric: {
      content: {
        strong: "Names a clear criterion; applies it; commits to one with explicit trade-off; states how to de-risk the unfunded bet.",
        adequate: "Picks one with some reasoning but no explicit criterion or trade-off.",
        weak: "Refuses to choose, or chooses with no reasoning.",
      },
      delivery: {
        strong: "Decisive, board-ready, owns the call.",
        adequate: "Mostly confident; hedges on the commitment.",
        weak: "Wavers, defers, or sounds unsure.",
      },
      time: {
        strong: "Crisp executive answer inside 60s.",
        adequate: "Fits but meanders.",
        weak: "Runs long or stalls.",
      },
    },
    modelAnswer: {
      en: "I'd back Bet A. My criterion is risk-adjusted strategic fit: A compounds our existing platform advantage and has a clearer path to repeatable revenue, while B is higher-ceiling but unproven. So I'd fully fund A now, and keep B alive with a small, milestone-gated test — if it hits the next proof point, we revisit funding in Q3. The trade-off I'm accepting is slower optionality on B in exchange for a faster, more certain return on A.",
      de: "Ich würde Wette A unterstützen. Mein Kriterium ist die risikoadjustierte strategische Passung: A verstärkt unseren bestehenden Plattformvorteil und hat einen klareren Weg zu wiederholbarem Umsatz, während B mehr Potenzial, aber unbewiesen ist. Also finanziere ich A jetzt voll und halte B mit einem kleinen, meilensteingebundenen Test am Leben — erreicht es den nächsten Nachweis, prüfen wir die Finanzierung in Q3 erneut. Der Trade-off, den ich akzeptiere, ist langsamere Optionalität bei B für eine schnellere, sicherere Rendite bei A.",
      "es-ES": "Respaldaría la apuesta A. Mi criterio es el encaje estratégico ajustado al riesgo: A potencia nuestra ventaja de plataforma actual y tiene un camino más claro hacia ingresos repetibles, mientras que B tiene más techo pero no está probada. Así que financiaría A por completo ahora y mantendría B viva con una prueba pequeña ligada a un hito — si alcanza el siguiente punto de validación, revisamos su financiación en el tercer trimestre. El trade-off que acepto es menos opcionalidad en B a cambio de un retorno más rápido y seguro en A.",
    },
  },
  {
    id: "C-005",
    type: "coaching",
    category: "self_awareness_development",
    difficulty: 2,
    media: {
      scene: "coaching_room",
      alt: {
        en: "A calm, neutral coaching setting with two comfortable chairs.",
        de: "Eine ruhige, neutrale Coaching-Umgebung mit zwei bequemen Stühlen.",
        "es-ES": "Un entorno de coaching tranquilo y neutro con dos sillas cómodas.",
      },
    },
    roleCaption: {
      en: "You are in a development conversation with an executive coach.",
      de: "Du bist in einem Entwicklungsgespräch mit einem Executive Coach.",
      "es-ES": "Estás en una conversación de desarrollo con un coach ejecutivo.",
    },
    scenario: {
      en: "What's a piece of feedback you've received that was hard to hear — and what did you actually change because of it?",
      de: "Welches Feedback, das du erhalten hast, war schwer zu hören — und was hast du daraufhin tatsächlich verändert?",
      "es-ES": "¿Qué feedback que recibiste te costó escuchar — y qué cambiaste realmente a raíz de él?",
    },
    weights: { content: 0.45, delivery: 0.3, time: 0.25 },
    keyPoints: [
      { en: "real, specific feedback", de: "echtes, konkretes Feedback", "es-ES": "feedback real y concreto" },
      { en: "genuine ownership, no humble-brag", de: "echte Verantwortung, kein verstecktes Eigenlob", "es-ES": "responsabilidad genuina, sin falsa modestia" },
      { en: "a concrete behaviour change", de: "eine konkrete Verhaltensänderung", "es-ES": "un cambio de comportamiento concreto" },
      { en: "the effect of that change", de: "die Wirkung der Veränderung", "es-ES": "el efecto de ese cambio" },
    ],
    rubric: {
      content: {
        strong: "Real, specific feedback; genuine ownership; a concrete behaviour change and its effect.",
        adequate: "Real feedback but vague change, or a disguised strength.",
        weak: "Deflects, blames the feedback-giver, or gives a non-answer.",
      },
      delivery: {
        strong: "Open, non-defensive, reflective, still composed.",
        adequate: "Slightly guarded or rehearsed.",
        weak: "Defensive or dismissive.",
      },
      time: {
        strong: "Reflective but contained inside 60s.",
        adequate: "Fits but rambling.",
        weak: "Drifts or stalls.",
      },
    },
    modelAnswer: {
      en: "A manager once told me I dominated meetings and others stopped contributing. It stung, because I thought I was driving things. I started deliberately speaking last, asking two named people for their view first, and I had a peer tell me afterward when I slipped. Within a couple of months the team was bringing me ideas I'd never have reached on my own — that one was a turning point for how I lead.",
      de: "Eine Führungskraft sagte mir einmal, ich dominiere Meetings und andere brächten sich nicht mehr ein. Das traf mich, weil ich dachte, ich treibe die Dinge voran. Ich begann, bewusst zuletzt zu sprechen, zwei namentlich genannte Personen zuerst um ihre Sicht zu bitten, und ließ mir von einem Kollegen Rückmeldung geben, wenn ich rückfällig wurde. Innerhalb weniger Monate brachte das Team mir Ideen, auf die ich allein nie gekommen wäre — das war ein Wendepunkt für meine Art zu führen.",
      "es-ES": "Una vez un jefe me dijo que dominaba las reuniones y que los demás dejaban de aportar. Me dolió, porque creía que estaba impulsando las cosas. Empecé a hablar deliberadamente el último, a pedir primero la opinión de dos personas concretas, y le pedí a un compañero que me avisara cuando recayera. En un par de meses el equipo me traía ideas a las que yo solo nunca habría llegado — aquello fue un punto de inflexión en mi forma de liderar.",
    },
  },
  {
    id: "C-006",
    type: "feedback360",
    category: "conflict_resolution",
    difficulty: 3,
    media: {
      scene: "feedback_report",
      alt: {
        en: "A 360-degree feedback report on screen showing mixed ratings.",
        de: "Ein 360-Grad-Feedbackbericht auf dem Bildschirm mit gemischten Bewertungen.",
        "es-ES": "Un informe de feedback 360 en pantalla con valoraciones mixtas.",
      },
    },
    roleCaption: {
      en: "You are reviewing your 360 results with HR.",
      de: "Du besprichst deine 360-Grad-Ergebnisse mit HR.",
      "es-ES": "Estás revisando tus resultados de 360 con RR. HH.",
    },
    scenario: {
      en: "Your 360 results just came back. Peers rate your delivery highly, but your direct reports say you're hard to approach and slow to give recognition. How do you respond to that?",
      de: "Deine 360-Grad-Ergebnisse sind da. Kolleg:innen bewerten deine Leistung hoch, aber deine direkten Mitarbeitenden sagen, du seist schwer ansprechbar und langsam mit Anerkennung. Wie reagierst du darauf?",
      "es-ES": "Acaban de llegar tus resultados de 360. Tus pares valoran muy bien tu desempeño, pero tus colaboradores directos dicen que eres poco accesible y lento en reconocer su trabajo. ¿Cómo respondes a eso?",
    },
    weights: { content: 0.45, delivery: 0.3, time: 0.25 },
    keyPoints: [
      { en: "accept the gap without defensiveness", de: "die Lücke ohne Abwehr annehmen", "es-ES": "aceptar la brecha sin ponerse a la defensiva" },
      { en: "interpret the peer/report split honestly", de: "den Unterschied ehrlich deuten", "es-ES": "interpretar con honestidad la diferencia" },
      { en: "concrete action for approachability", de: "konkrete Maßnahme für Ansprechbarkeit", "es-ES": "acción concreta para la accesibilidad" },
      { en: "concrete action for recognition", de: "konkrete Maßnahme für Anerkennung", "es-ES": "acción concreta para el reconocimiento" },
    ],
    rubric: {
      content: {
        strong: "Accepts the gap; interprets the split honestly; names one action for approachability and one for recognition.",
        adequate: "Accepts it but only one vague action, or rationalizes the gap.",
        weak: "Disputes the data, blames reports, or dismisses it.",
      },
      delivery: {
        strong: "Non-defensive, accountable, present.",
        adequate: "Mostly open; a little defensive.",
        weak: "Defensive or deflecting.",
      },
      time: {
        strong: "Honest and contained inside 60s.",
        adequate: "Fits but unfocused.",
        weak: "Rambles or stalls.",
      },
    },
    modelAnswer: {
      en: "That split is useful, not comfortable. If peers see strong delivery but my reports find me hard to approach, the gap is probably that I optimize for output over people when I'm busy. Two concrete changes: I'll hold a protected, no-agenda 15 minutes with each report weekly so approachability isn't conditional on a crisis, and I'll start every team meeting naming one specific thing someone did well. Then I'll re-check this in the next pulse survey.",
      de: "Dieser Unterschied ist nützlich, nicht angenehm. Wenn Kolleg:innen starke Leistung sehen, meine Mitarbeitenden mich aber schwer ansprechbar finden, liegt die Lücke wohl darin, dass ich unter Druck Ergebnisse über Menschen stelle. Zwei konkrete Änderungen: Ich reserviere wöchentlich geschützte 15 Minuten ohne Agenda für jede Person, damit Ansprechbarkeit nicht von einer Krise abhängt, und ich beginne jedes Teammeeting damit, eine konkrete gute Leistung zu benennen. Danach prüfe ich es in der nächsten Pulsbefragung erneut.",
      "es-ES": "Esa diferencia es útil, aunque incómoda. Si mis pares ven buen desempeño pero mi equipo me encuentra poco accesible, la brecha probablemente es que, cuando voy con prisa, priorizo el resultado sobre las personas. Dos cambios concretos: reservaré 15 minutos protegidos y sin agenda con cada colaborador cada semana, para que la accesibilidad no dependa de una crisis, y empezaré cada reunión de equipo nombrando algo concreto que alguien hizo bien. Luego lo volveré a medir en la siguiente encuesta de pulso.",
    },
  },
  {
    id: "C-007",
    type: "situational",
    category: "professional_communication",
    difficulty: 1,
    media: {
      scene: "video_call",
      alt: {
        en: "A video call window with your manager waiting for a quick update.",
        de: "Ein Videoanruf-Fenster, in dem deine Führungskraft auf ein kurzes Update wartet.",
        "es-ES": "Una ventana de videollamada con tu manager esperando una actualización rápida.",
      },
    },
    roleCaption: {
      en: "You are a team member pinged for an instant status.",
      de: "Du bist Teammitglied und wirst um ein sofortiges Status-Update gebeten.",
      "es-ES": "Eres un miembro del equipo al que piden un estado al instante.",
    },
    scenario: {
      en: "Your manager pings you: \"Quick — give me a 30-second status on the project for the leadership email going out right now.\" Go.",
      de: "Deine Führungskraft schreibt: „Schnell — gib mir in 30 Sekunden einen Status zum Projekt für die Leitungs-E-Mail, die jetzt rausgeht.“ Los.",
      "es-ES": "Tu manager te escribe: «Rápido — dame en 30 segundos el estado del proyecto para el email de dirección que sale ahora mismo». Adelante.",
    },
    weights: { content: 0.5, delivery: 0.25, time: 0.25 },
    keyPoints: [
      { en: "lead with status: on track / at risk / blocked", de: "mit dem Status beginnen: im Plan / gefährdet / blockiert", "es-ES": "empezar por el estado: en plazo / en riesgo / bloqueado" },
      { en: "one key number or milestone", de: "eine Schlüsselzahl oder ein Meilenstein", "es-ES": "un dato o hito clave" },
      { en: "any risk and what you need", de: "Risiko und was du brauchst", "es-ES": "el riesgo y qué necesitas" },
      { en: "concise, no rambling", de: "knapp, kein Geschwafel", "es-ES": "conciso, sin divagar" },
    ],
    rubric: {
      content: { strong: "Status first, one number, one risk/need — complete and scannable.", adequate: "Gives status but buries it or omits the risk/need.", weak: "Vague, no clear status, rambles." },
      delivery: { strong: "Crisp and confident, email-ready.", adequate: "Mostly clear, a little loose.", weak: "Hesitant or wordy." },
      time: { strong: "Well under time, tight.", adequate: "Fits.", weak: "Too long or too thin." },
    },
    modelAnswer: {
      en: "On track for Friday. We've completed 8 of 10 workstreams; the two open ones are in testing. One risk: the vendor sign-off is still pending — I'll have it by Thursday or I'll flag it immediately. No action needed from leadership right now.",
      de: "Im Plan für Freitag. 8 von 10 Arbeitssträngen sind fertig; die zwei offenen sind im Test. Ein Risiko: die Freigabe des Anbieters steht noch aus — ich habe sie bis Donnerstag oder melde es sofort. Aktuell kein Handeln der Leitung nötig.",
      "es-ES": "En plazo para el viernes. Hemos completado 8 de 10 líneas de trabajo; las dos abiertas están en pruebas. Un riesgo: falta el visto bueno del proveedor — lo tendré el jueves o lo aviso de inmediato. Ahora mismo dirección no necesita hacer nada.",
    },
  },
  {
    id: "C-008",
    type: "behavioral",
    category: "leadership_decisions",
    difficulty: 2,
    media: {
      scene: "office_1on1",
      alt: {
        en: "A one-on-one interview setting with a manager taking notes.",
        de: "Ein Vier-Augen-Gespräch, die Führungskraft macht sich Notizen.",
        "es-ES": "Una entrevista individual con un manager tomando notas.",
      },
    },
    roleCaption: {
      en: "You are a candidate in a leadership interview.",
      de: "Du bist Kandidat:in in einem Führungsinterview.",
      "es-ES": "Eres candidato en una entrevista de liderazgo.",
    },
    scenario: {
      en: "Tell me about a time you had to make an important decision without all the information you wanted. What did you do?",
      de: "Erzähl mir von einer wichtigen Entscheidung, die du ohne alle gewünschten Informationen treffen musstest. Was hast du getan?",
      "es-ES": "Cuéntame una vez en que tuviste que tomar una decisión importante sin tener toda la información que querías. ¿Qué hiciste?",
    },
    weights: { content: 0.6, delivery: 0.2, time: 0.2 },
    keyPoints: [
      { en: "specific real decision", de: "konkrete reale Entscheidung", "es-ES": "decisión real concreta" },
      { en: "how you handled the uncertainty", de: "Umgang mit der Unsicherheit", "es-ES": "cómo gestionaste la incertidumbre" },
      { en: "the action and reasoning", de: "Handlung und Begründung", "es-ES": "la acción y el razonamiento" },
      { en: "the outcome", de: "das Ergebnis", "es-ES": "el resultado" },
    ],
    rubric: {
      content: { strong: "Real example, clear how they decided under uncertainty, concrete outcome.", adequate: "Real example but vague on reasoning or result.", weak: "Generic or avoids the uncertainty point." },
      delivery: { strong: "Owns the call, decisive.", adequate: "Some hedging.", weak: "Tentative or evasive." },
      time: { strong: "Complete and tight.", adequate: "Fits.", weak: "Sparse or rambling." },
    },
    modelAnswer: {
      en: "We had to commit to a launch date before final user-testing data was in. I gathered what we had, identified the one assumption that mattered most — adoption speed — and made a reversible call: launch to 10% of users first. The data came in mid-rollout, it held, and we scaled. I decided on the riskiest assumption and kept the decision reversible.",
      de: "Wir mussten ein Launch-Datum festlegen, bevor die finalen Testdaten vorlagen. Ich sammelte das Vorhandene, identifizierte die wichtigste Annahme — die Adoptionsgeschwindigkeit — und traf eine umkehrbare Entscheidung: erst 10 % der Nutzer. Die Daten kamen mitten im Rollout, bestätigten sich, und wir skalierten. Ich entschied anhand der riskantesten Annahme und hielt die Entscheidung umkehrbar.",
      "es-ES": "Teníamos que fijar una fecha de lanzamiento antes de tener los datos finales de pruebas. Reuní lo que había, identifiqué la suposición más crítica — la velocidad de adopción — y tomé una decisión reversible: lanzar primero al 10% de los usuarios. Los datos llegaron a mitad del despliegue, se confirmaron y escalamos. Decidí sobre la suposición de mayor riesgo y mantuve la decisión reversible.",
    },
  },
  {
    id: "C-009",
    type: "conflict",
    category: "conflict_resolution",
    difficulty: 2,
    media: {
      scene: "office_1on1",
      alt: {
        en: "A hallway moment between two colleagues just after a meeting.",
        de: "Ein Flurmoment zwischen zwei Kolleg:innen direkt nach einem Meeting.",
        "es-ES": "Un momento en el pasillo entre dos colegas justo tras una reunión.",
      },
    },
    roleCaption: {
      en: "You are catching a peer right after a meeting.",
      de: "Du erwischst eine:n Kolleg:in direkt nach einem Meeting.",
      "es-ES": "Pillas a un compañero justo después de una reunión.",
    },
    scenario: {
      en: "In the meeting that just ended, a peer presented your analysis as their own and took the credit. You catch them alone in the hallway. What do you say?",
      de: "Im gerade beendeten Meeting hat ein:e Kolleg:in deine Analyse als eigene präsentiert und den Lorbeer eingeheimst. Du triffst die Person allein auf dem Flur. Was sagst du?",
      "es-ES": "En la reunión que acaba de terminar, un compañero presentó tu análisis como suyo y se llevó el mérito. Lo pillas a solas en el pasillo. ¿Qué le dices?",
    },
    weights: { content: 0.45, delivery: 0.35, time: 0.2 },
    keyPoints: [
      { en: "address it directly, in private", de: "direkt und unter vier Augen ansprechen", "es-ES": "abordarlo directamente y en privado" },
      { en: "state the specific behaviour and its impact", de: "konkretes Verhalten und Wirkung benennen", "es-ES": "nombrar el comportamiento concreto y su impacto" },
      { en: "stay composed, not aggressive", de: "ruhig bleiben, nicht aggressiv", "es-ES": "mantener la calma, sin agresividad" },
      { en: "set a clear expectation going forward", de: "klare Erwartung für die Zukunft setzen", "es-ES": "fijar una expectativa clara de cara al futuro" },
    ],
    rubric: {
      content: { strong: "Names the behaviour and impact, assumes nothing malicious, sets a clear go-forward expectation.", adequate: "Raises it but vaguely or only emotionally.", weak: "Avoids it, or explodes / accuses without a path forward." },
      delivery: { strong: "Calm, direct, firm.", adequate: "A bit heated or a bit timid.", weak: "Aggressive or passive." },
      time: { strong: "Controlled, contained.", adequate: "Fits.", weak: "Rambles or freezes." },
    },
    modelAnswer: {
      en: "Can I grab you for a second? In there, the analysis you presented was the work I sent you Tuesday, and it landed as yours. I'm not assuming you meant to — but it didn't sit right. Next time, just credit the source or bring me in. I'd rather we look good as a team than have this come between us.",
      de: "Hast du kurz? Da drin war die Analyse, die du präsentiert hast, meine Arbeit von Dienstag — und sie kam als deine an. Ich unterstelle dir keine Absicht — aber es war nicht okay. Beim nächsten Mal nenn einfach die Quelle oder hol mich dazu. Mir ist lieber, wir glänzen als Team, als dass das zwischen uns steht.",
      "es-ES": "¿Tienes un segundo? Ahí dentro, el análisis que presentaste era el trabajo que te envié el martes, y quedó como tuyo. No doy por hecho que fuera intencionado — pero no me sentó bien. La próxima vez, cita la fuente o cuéntame. Prefiero que quedemos bien como equipo a que esto se interponga entre nosotros.",
    },
  },
  {
    id: "C-010",
    type: "wave",
    category: "strategic_thinking",
    difficulty: 3,
    media: {
      scene: "exec_committee",
      alt: {
        en: "A leadership team looking rattled around a strategy screen.",
        de: "Ein Führungsteam, sichtlich nervös, vor einem Strategie-Bildschirm.",
        "es-ES": "Un equipo directivo visiblemente inquieto ante una pantalla de estrategia.",
      },
    },
    roleCaption: {
      en: "You lead the team; a competitor just moved.",
      de: "Du leitest das Team; ein Wettbewerber hat gerade gehandelt.",
      "es-ES": "Lideras el equipo; un competidor acaba de moverse.",
    },
    scenario: {
      en: "A competitor just launched the exact feature you'd planned for next quarter. The team looks rattled and turns to you. What's your read, and what's your move?",
      de: "Ein Wettbewerber hat gerade genau das Feature gelauncht, das ihr für nächstes Quartal geplant hattet. Das Team ist nervös und schaut dich an. Wie ist deine Einschätzung, und was ist dein Schritt?",
      "es-ES": "Un competidor acaba de lanzar justo la función que teníais planeada para el próximo trimestre. El equipo está inquieto y te mira. ¿Cuál es tu lectura y cuál es tu movimiento?",
    },
    weights: { content: 0.55, delivery: 0.25, time: 0.2 },
    keyPoints: [
      { en: "steady the team, no panic", de: "Team beruhigen, keine Panik", "es-ES": "calmar al equipo, sin pánico" },
      { en: "a clear read of what it does/doesn't change", de: "klare Einschätzung, was sich ändert/nicht ändert", "es-ES": "lectura clara de qué cambia y qué no" },
      { en: "a concrete next move (differentiate, learn, accelerate)", de: "konkreter nächster Schritt", "es-ES": "un siguiente paso concreto" },
      { en: "focus on customers, not the competitor", de: "Fokus auf Kund:innen, nicht den Wettbewerber", "es-ES": "foco en clientes, no en el competidor" },
    ],
    rubric: {
      content: { strong: "Calms the team, reframes, and names a concrete differentiated move focused on customers.", adequate: "Reassures but the move is vague.", weak: "Panics, blames, or freezes." },
      delivery: { strong: "Composed, leaderly, contagiously calm.", adequate: "Mostly steady.", weak: "Anxious or flat." },
      time: { strong: "Decisive within time.", adequate: "Fits.", weak: "Spirals." },
    },
    modelAnswer: {
      en: "First, breathe — them shipping first validates the bet; it doesn't end it. Their v1 is the obvious version. Our edge was always the integration, not the feature alone. So we don't copy faster — we talk to ten of our customers this week, find where their version falls short, and ship the differentiated version. Being second with a sharper answer beats being first with a generic one.",
      de: "Erst mal durchatmen — dass sie zuerst liefern, bestätigt die Wette; es beendet sie nicht. Ihre v1 ist die naheliegende Version. Unser Vorteil war immer die Integration, nicht das Feature allein. Wir kopieren also nicht schneller — wir sprechen diese Woche mit zehn Kund:innen, finden die Schwächen ihrer Version und liefern die differenzierte. Zweiter mit der schärferen Antwort schlägt Erster mit der generischen.",
      "es-ES": "Primero, respiremos — que ellos lancen antes valida la apuesta; no la termina. Su v1 es la versión obvia. Nuestra ventaja siempre fue la integración, no la función sola. Así que no copiamos más rápido — esta semana hablamos con diez clientes, vemos dónde falla su versión y lanzamos la versión diferenciada. Ser segundos con una respuesta más afilada gana a ser primeros con una genérica.",
    },
  },
  {
    id: "C-011",
    type: "coaching",
    category: "self_awareness_development",
    difficulty: 3,
    media: {
      scene: "coaching_room",
      alt: {
        en: "A reflective coaching conversation in a calm room.",
        de: "Ein reflektierendes Coaching-Gespräch in einem ruhigen Raum.",
        "es-ES": "Una conversación de coaching reflexiva en una sala tranquila.",
      },
    },
    roleCaption: {
      en: "You are with your coach, going deeper.",
      de: "Du bist bei deinem Coach und gehst in die Tiefe.",
      "es-ES": "Estás con tu coach, profundizando.",
    },
    scenario: {
      en: "Where do you think you're holding yourself back in your career right now — and what are you avoiding because it's uncomfortable?",
      de: "Wo glaubst du, bremst du dich gerade in deiner Karriere selbst aus — und was vermeidest du, weil es unangenehm ist?",
      "es-ES": "¿Dónde crees que te estás frenando ahora mismo en tu carrera — y qué estás evitando porque te resulta incómodo?",
    },
    weights: { content: 0.45, delivery: 0.3, time: 0.25 },
    keyPoints: [
      { en: "honest, specific self-insight", de: "ehrliche, konkrete Selbsterkenntnis", "es-ES": "autoconocimiento honesto y concreto" },
      { en: "name the avoidance directly", de: "die Vermeidung direkt benennen", "es-ES": "nombrar la evitación directamente" },
      { en: "why it's uncomfortable", de: "warum es unangenehm ist", "es-ES": "por qué es incómodo" },
      { en: "a first step to face it", de: "ein erster Schritt, sich dem zu stellen", "es-ES": "un primer paso para afrontarlo" },
    ],
    rubric: {
      content: { strong: "Specific, honest avoidance named, with a concrete first step.", adequate: "Some honesty but stays general or has no step.", weak: "Deflects or gives a polished non-answer." },
      delivery: { strong: "Open, reflective, undefended.", adequate: "A little guarded.", weak: "Evasive or rehearsed." },
      time: { strong: "Thoughtful but contained.", adequate: "Fits.", weak: "Drifts." },
    },
    modelAnswer: {
      en: "Honestly, I'm avoiding asking for the stretch role I want. I keep telling myself I need one more year of proof, but the truth is I'm afraid of hearing no in front of people who rate me. That's holding me back more than any skill gap. My first step is to name the ambition to my manager in our next 1:1 — not ask yet, just put it on the table.",
      de: "Ehrlich, ich vermeide es, die nächste größere Rolle zu erbitten. Ich sage mir, ich brauche noch ein Jahr Nachweis, aber in Wahrheit fürchte ich ein Nein vor Leuten, die mich schätzen. Das bremst mich mehr als jede fehlende Fähigkeit. Mein erster Schritt: die Ambition im nächsten 1:1 anzusprechen — noch nicht fragen, nur auf den Tisch legen.",
      "es-ES": "Sinceramente, estoy evitando pedir el puesto de mayor reto que quiero. Me repito que necesito un año más de demostrar, pero la verdad es que temo oír un no delante de gente que me valora. Eso me frena más que cualquier carencia de habilidad. Mi primer paso es nombrar esa ambición a mi manager en el próximo 1:1 — aún no pedirla, solo ponerla sobre la mesa.",
    },
  },
  {
    id: "C-012",
    type: "feedback360",
    category: "feedback_difficult_conversations",
    difficulty: 2,
    media: {
      scene: "office_1on1",
      alt: {
        en: "A manager opening a difficult feedback conversation across a desk.",
        de: "Eine Führungskraft eröffnet ein schwieriges Feedbackgespräch am Schreibtisch.",
        "es-ES": "Un manager abriendo una conversación de feedback difícil en su mesa.",
      },
    },
    roleCaption: {
      en: "You are the manager of a talented but abrasive person.",
      de: "Du führst eine:n talentierte:n, aber schroffe:n Mitarbeitende:n.",
      "es-ES": "Eres el manager de alguien con talento pero brusco.",
    },
    scenario: {
      en: "One of your most talented people is brilliant but abrasive — and now two peers have quietly told you they won't work with them again. You're opening the conversation. What's your first thing you say?",
      de: "Eine:r deiner talentiertesten Leute ist brillant, aber schroff — und nun haben dir zwei Kolleg:innen leise gesagt, sie arbeiten nicht mehr mit der Person. Du eröffnest das Gespräch. Was sagst du zuerst?",
      "es-ES": "Una de tus personas con más talento es brillante pero brusca — y ahora dos compañeros te han dicho en voz baja que no volverán a trabajar con ella. Vas a abrir la conversación. ¿Qué es lo primero que dices?",
    },
    weights: { content: 0.45, delivery: 0.3, time: 0.25 },
    keyPoints: [
      { en: "affirm their talent genuinely", de: "Talent ehrlich anerkennen", "es-ES": "reconocer su talento de verdad" },
      { en: "name the specific behaviour, not a label", de: "konkretes Verhalten benennen, kein Etikett", "es-ES": "nombrar el comportamiento concreto, no una etiqueta" },
      { en: "make the impact concrete", de: "die Wirkung konkret machen", "es-ES": "hacer concreto el impacto" },
      { en: "frame it as solvable, with support", de: "als lösbar rahmen, mit Unterstützung", "es-ES": "plantearlo como resoluble, con apoyo" },
    ],
    rubric: {
      content: { strong: "Affirms talent, names specific behaviour and concrete impact, frames it as fixable with support.", adequate: "Raises it but vague or all-negative.", weak: "Avoids it, sugarcoats, or attacks character." },
      delivery: { strong: "Direct, caring, unflinching.", adequate: "A little soft or a little harsh.", weak: "Evasive or blunt-cruel." },
      time: { strong: "Clear opening within time.", adequate: "Fits.", weak: "Rambles." },
    },
    modelAnswer: {
      en: "I want to be straight with you because I rate you highly — your thinking is some of the best on this team. That's exactly why this matters: in the last two projects, the way feedback landed in those reviews left people not wanting to partner with you again. That's a real cost to your impact, and it's completely fixable. I want to help you fix it — can we look at what's happening in those moments?",
      de: "Ich will offen sein, weil ich dich sehr schätze — dein Denken gehört zum Besten im Team. Genau deshalb ist das wichtig: In den letzten zwei Projekten hat die Art, wie Feedback in den Reviews ankam, dazu geführt, dass Leute nicht mehr mit dir arbeiten wollen. Das kostet deine Wirkung — und es ist völlig lösbar. Ich will dir helfen — schauen wir uns an, was in diesen Momenten passiert?",
      "es-ES": "Quiero ser directo contigo porque te valoro mucho — tu forma de pensar es de las mejores del equipo. Justo por eso esto importa: en los dos últimos proyectos, cómo cayó tu feedback en esas revisiones hizo que algunas personas no quieran volver a trabajar contigo. Eso resta a tu impacto, y tiene arreglo. Quiero ayudarte a arreglarlo — ¿miramos juntos qué pasa en esos momentos?",
    },
  },
  {
    id: "C-013",
    type: "situational",
    category: "professional_communication",
    difficulty: 4,
    media: {
      scene: "boardroom",
      alt: {
        en: "A boardroom presentation where the numbers on screen are poor.",
        de: "Eine Boardroom-Präsentation, die Zahlen auf dem Bildschirm sind schlecht.",
        "es-ES": "Una presentación en sala de juntas donde los números en pantalla son malos.",
      },
    },
    roleCaption: {
      en: "You are presenting bad results to the board.",
      de: "Du präsentierst dem Vorstand schlechte Ergebnisse.",
      "es-ES": "Estás presentando malos resultados al consejo.",
    },
    scenario: {
      en: "You're presenting the quarter and the numbers are bad. The CFO cuts you off mid-slide: \"Stop the spin — just tell us: did we fail?\" All eyes on you. Respond.",
      de: "Du präsentierst das Quartal, und die Zahlen sind schlecht. Der CFO unterbricht dich mitten in der Folie: „Schluss mit Schönreden — sag uns einfach: Haben wir versagt?“ Alle Augen auf dir. Antworte.",
      "es-ES": "Estás presentando el trimestre y los números son malos. El CFO te corta a mitad de diapositiva: «Déjate de adornos — dinos sin más: ¿hemos fracasado?». Todos te miran. Responde.",
    },
    weights: { content: 0.4, delivery: 0.35, time: 0.25 },
    keyPoints: [
      { en: "answer the direct question honestly", de: "die direkte Frage ehrlich beantworten", "es-ES": "responder la pregunta directa con honestidad" },
      { en: "own it without spin or excuses", de: "dazu stehen, ohne Schönreden", "es-ES": "asumirlo sin adornos ni excusas" },
      { en: "give the one cause that matters", de: "die eine wesentliche Ursache nennen", "es-ES": "dar la causa que de verdad importa" },
      { en: "a clear, credible path forward", de: "ein klarer, glaubwürdiger Weg nach vorn", "es-ES": "un camino adelante claro y creíble" },
    ],
    rubric: {
      content: { strong: "Answers the yes/no honestly, owns it, names the key cause and a credible recovery.", adequate: "Honest but no clear cause or plan.", weak: "Spins, deflects, or crumbles." },
      delivery: { strong: "Composed under fire, candid, in command.", adequate: "Mostly steady.", weak: "Defensive or rattled." },
      time: { strong: "Direct and contained.", adequate: "Fits.", weak: "Rambles or stalls." },
    },
    modelAnswer: {
      en: "Straight answer: we missed, and I own it. We were down 12% on target — that's a fail on the number. The cause wasn't the market; we over-committed on a launch that slipped. Here's what's different now: we've cut the at-risk bets to two, both are de-risked with milestones, and you'll see the leading indicators by week three. I'd rather give you the hard truth and a plan than a story.",
      de: "Klare Antwort: Wir haben verfehlt, und ich stehe dazu. Wir lagen 12 % unter Ziel — das ist ein Fehlschlag bei der Zahl. Die Ursache war nicht der Markt; wir haben uns mit einem verzögerten Launch übernommen. Was jetzt anders ist: Wir haben die riskanten Wetten auf zwei reduziert, beide mit Meilensteinen abgesichert, und ihr seht die Frühindikatoren bis Woche drei. Lieber die harte Wahrheit mit Plan als eine Geschichte.",
      "es-ES": "Respuesta directa: fallamos, y lo asumo. Quedamos un 12% por debajo del objetivo — eso es un fracaso en la cifra. La causa no fue el mercado; nos sobrecomprometimos con un lanzamiento que se retrasó. Lo que ahora es distinto: hemos reducido las apuestas en riesgo a dos, ambas acotadas con hitos, y veréis los indicadores adelantados en la semana tres. Prefiero daros la verdad dura y un plan que un cuento.",
    },
  },
  {
    id: "C-014",
    type: "conflict",
    category: "leadership_decisions",
    difficulty: 4,
    media: {
      scene: "client_meeting",
      alt: {
        en: "A tense client call where a demand has just been made.",
        de: "Ein angespannter Kundenanruf, gerade wurde eine Forderung gestellt.",
        "es-ES": "Una llamada tensa con un cliente que acaba de hacer una exigencia.",
      },
    },
    roleCaption: {
      en: "You lead the account; your biggest client is on the line.",
      de: "Du leitest den Account; dein größter Kunde ist am Telefon.",
      "es-ES": "Llevas la cuenta; tu mayor cliente está al teléfono.",
    },
    scenario: {
      en: "Your biggest client demands, right now on the call, that you remove the account lead they clashed with — someone you rate highly and believe was in the right. Respond.",
      de: "Dein größter Kunde fordert, jetzt im Gespräch, dass du den Account-Lead abziehst, mit dem er aneinandergeriet — jemand, den du sehr schätzt und im Recht siehst. Antworte.",
      "es-ES": "Tu mayor cliente exige, ahora mismo en la llamada, que retires al responsable de cuenta con quien chocó — alguien a quien valoras mucho y a quien das la razón. Responde.",
    },
    weights: { content: 0.5, delivery: 0.3, time: 0.2 },
    keyPoints: [
      { en: "acknowledge the client without caving instantly", de: "Kunden anerkennen, ohne sofort einzuknicken", "es-ES": "reconocer al cliente sin ceder al instante" },
      { en: "protect your person; don't throw them under the bus", de: "die eigene Person schützen", "es-ES": "proteger a tu persona; no tirarla a los pies de los caballos" },
      { en: "buy time / propose a fair process", de: "Zeit gewinnen / fairen Prozess vorschlagen", "es-ES": "ganar tiempo / proponer un proceso justo" },
      { en: "keep the relationship and your integrity", de: "Beziehung und Integrität wahren", "es-ES": "preservar la relación y tu integridad" },
    ],
    rubric: {
      content: { strong: "Takes the concern seriously, refuses to fire on the spot, proposes a fair next step, protects both relationship and person.", adequate: "Either caves or refuses bluntly with no path.", weak: "Throws their report under the bus, or stonewalls the client." },
      delivery: { strong: "Calm, firm, diplomatic under pressure.", adequate: "Mostly composed.", weak: "Panicky or combative." },
      time: { strong: "Controlled within time.", adequate: "Fits.", weak: "Spirals." },
    },
    modelAnswer: {
      en: "I hear how serious this is for you, and I'm not going to brush it aside. What I won't do is make a snap call on a person's livelihood on a phone call — you wouldn't want a partner who does that either. Here's what I'll do: I'll personally step in on your account this week, get to the bottom of what happened from both sides, and come back to you Friday with how we make this relationship work. You have my commitment that it gets fixed.",
      de: "Ich höre, wie ernst das für Sie ist, und ich wische es nicht weg. Was ich nicht tue: über die Existenz eines Menschen am Telefon spontan entscheiden — einen Partner, der so handelt, wollten Sie auch nicht. Was ich tue: Ich steige diese Woche persönlich in Ihren Account ein, kläre, was von beiden Seiten passiert ist, und melde mich Freitag mit einem Weg, wie diese Beziehung funktioniert. Sie haben mein Wort, dass es gelöst wird.",
      "es-ES": "Entiendo lo serio que esto es para usted, y no lo voy a quitar importancia. Lo que no haré es decidir de golpe sobre el sustento de una persona en una llamada — usted tampoco querría un socio que hiciera eso. Lo que sí haré: me meto personalmente en su cuenta esta semana, llego al fondo de lo que pasó por ambas partes, y le vuelvo el viernes con cómo hacemos que esta relación funcione. Tiene mi compromiso de que se resuelve.",
    },
  },
  {
    id: "C-015",
    type: "behavioral",
    category: "feedback_difficult_conversations",
    difficulty: 3,
    media: {
      scene: "office_1on1",
      alt: {
        en: "An interview setting discussing a difficult past moment.",
        de: "Ein Interview, in dem ein schwieriger Moment besprochen wird.",
        "es-ES": "Una entrevista hablando de un momento difícil del pasado.",
      },
    },
    roleCaption: {
      en: "You are a candidate reflecting on a hard moment.",
      de: "Du bist Kandidat:in und reflektierst einen harten Moment.",
      "es-ES": "Eres candidato reflexionando sobre un momento duro.",
    },
    scenario: {
      en: "Tell me about a time you received harsh, critical feedback in front of others. How did you handle it in the moment — and afterward?",
      de: "Erzähl mir von einer Situation, in der du vor anderen harte, kritische Rückmeldung bekamst. Wie bist du im Moment damit umgegangen — und danach?",
      "es-ES": "Cuéntame una vez en que recibiste feedback duro y crítico delante de otros. ¿Cómo lo gestionaste en el momento — y después?",
    },
    weights: { content: 0.55, delivery: 0.25, time: 0.2 },
    keyPoints: [
      { en: "real specific moment", de: "konkreter realer Moment", "es-ES": "momento real concreto" },
      { en: "composed reaction in the moment", de: "gefasste Reaktion im Moment", "es-ES": "reacción serena en el momento" },
      { en: "what you did afterward", de: "was du danach getan hast", "es-ES": "qué hiciste después" },
      { en: "what you learned / changed", de: "was du gelernt/geändert hast", "es-ES": "qué aprendiste o cambiaste" },
    ],
    rubric: {
      content: { strong: "Real moment, composed response, constructive follow-up, genuine learning.", adequate: "Real but thin on the follow-up or lesson.", weak: "Defensive, blames the giver, or non-answer." },
      delivery: { strong: "Reflective, non-defensive, secure.", adequate: "Slightly defensive.", weak: "Resentful or evasive." },
      time: { strong: "Complete and contained.", adequate: "Fits.", weak: "Rambles." },
    },
    modelAnswer: {
      en: "In a review, a director called my proposal \"half-baked\" in front of the whole team. My stomach dropped, but I said: \"That's hard to hear — tell me what's missing so I can fix it.\" I took notes instead of defending. Afterward I rebuilt it with their points, sent it round, and asked the director directly if it now met the bar. It did. I learned that staying curious instead of defensive in that moment is what turns a hit into credibility.",
      de: "In einem Review nannte ein Direktor meinen Vorschlag vor dem ganzen Team „halbgar“. Mir sackte alles weg, aber ich sagte: „Das ist hart — sag mir, was fehlt, damit ich es behebe.“ Ich machte Notizen, statt mich zu verteidigen. Danach baute ich ihn mit den Punkten neu, schickte ihn herum und fragte den Direktor direkt, ob er nun den Maßstab erfüllt. Tat er. Ich lernte: in dem Moment neugierig statt defensiv zu bleiben, macht aus einem Treffer Glaubwürdigkeit.",
      "es-ES": "En una revisión, un director llamó a mi propuesta «a medio cocer» delante de todo el equipo. Se me cayó el alma, pero dije: «Es duro de oír — dime qué falta para arreglarlo». Tomé notas en vez de defenderme. Después la reconstruí con sus puntos, la hice circular y pregunté al director directamente si ya daba la talla. La daba. Aprendí que mantener la curiosidad en vez de la defensa en ese momento convierte un golpe en credibilidad.",
    },
  },
  {
    id: "C-016",
    type: "situational",
    category: "leadership_decisions",
    difficulty: 2,
    media: {
      scene: "video_call",
      alt: {
        en: "An evening message from a teammate about a missed deadline.",
        de: "Eine Abendnachricht eines Teammitglieds über eine verpasste Frist.",
        "es-ES": "Un mensaje nocturno de un compañero sobre un plazo que no llega.",
      },
    },
    roleCaption: {
      en: "You are the lead; it's 6pm the night before a deadline.",
      de: "Du bist die Leitung; 18 Uhr am Abend vor einer Frist.",
      "es-ES": "Eres el líder; son las 18:00 la víspera de una entrega.",
    },
    scenario: {
      en: "It's 6pm. A teammate messages: \"I'm not going to make tomorrow's client deadline — I'm stuck and I'm sorry.\" You're the lead. What do you say back?",
      de: "Es ist 18 Uhr. Ein Teammitglied schreibt: „Ich schaffe die Kundenfrist morgen nicht — ich hänge fest, tut mir leid.“ Du bist die Leitung. Was antwortest du?",
      "es-ES": "Son las 18:00. Un compañero te escribe: «No voy a llegar a la entrega del cliente de mañana — estoy atascado y lo siento». Eres el líder. ¿Qué le respondes?",
    },
    weights: { content: 0.5, delivery: 0.3, time: 0.2 },
    keyPoints: [
      { en: "stay calm and supportive, not punishing", de: "ruhig und unterstützend, nicht strafend", "es-ES": "calma y apoyo, sin castigar" },
      { en: "diagnose: what exactly is stuck", de: "diagnostizieren: was genau hängt", "es-ES": "diagnosticar: qué está atascado exactamente" },
      { en: "options: help, re-scope, or reset client expectation", de: "Optionen: helfen, neu zuschneiden, Kundenerwartung anpassen", "es-ES": "opciones: ayudar, recortar alcance o reajustar al cliente" },
      { en: "own the client communication as the lead", de: "Kundenkommunikation als Leitung übernehmen", "es-ES": "asumir la comunicación con el cliente como líder" },
    ],
    rubric: {
      content: { strong: "Calm, diagnoses the blocker, offers concrete options, takes the client comms.", adequate: "Supportive but no plan.", weak: "Panics, blames, or just says 'figure it out'." },
      delivery: { strong: "Steady, reassuring, decisive.", adequate: "Mostly calm.", weak: "Anxious or harsh." },
      time: { strong: "Clear within time.", adequate: "Fits.", weak: "Rambles." },
    },
    modelAnswer: {
      en: "Okay, thanks for flagging it now and not at midnight — that's the right call. Tell me exactly where you're stuck in two lines. If it's something I or someone can unblock tonight, we jump on a call in ten minutes. If it's genuinely not finishable, that's fine — we send the client a heads-up tonight with a realistic time, and I'll write that message. Either way you're not facing this alone.",
      de: "Okay, danke, dass du es jetzt sagst und nicht um Mitternacht — richtig so. Sag mir in zwei Zeilen, wo genau du hängst. Wenn ich oder jemand das heute Abend lösen kann, telefonieren wir in zehn Minuten. Wenn es wirklich nicht zu schaffen ist, auch okay — wir informieren den Kunden heute Abend mit einem realistischen Termin, und ich schreibe die Nachricht. So oder so stehst du damit nicht allein.",
      "es-ES": "Vale, gracias por avisar ahora y no a medianoche — es lo correcto. Dime en dos líneas dónde estás atascado exactamente. Si es algo que yo o alguien puede desbloquear esta noche, nos llamamos en diez minutos. Si de verdad no se puede terminar, no pasa nada — avisamos al cliente esta noche con un plazo realista, y ese mensaje lo escribo yo. De un modo u otro, no estás solo con esto.",
    },
  },
  {
    id: "C-017",
    type: "wave",
    category: "strategic_thinking",
    difficulty: 2,
    media: {
      scene: "exec_committee",
      alt: {
        en: "A planning meeting deciding next quarter's priority.",
        de: "Ein Planungsmeeting zur Priorität des nächsten Quartals.",
        "es-ES": "Una reunión de planificación decidiendo la prioridad del próximo trimestre.",
      },
    },
    roleCaption: {
      en: "You are asked for a sharp prioritization call.",
      de: "Du wirst um eine klare Priorisierung gebeten.",
      "es-ES": "Te piden una decisión clara de priorización.",
    },
    scenario: {
      en: "In one minute: what should be our single biggest priority next quarter — and why that over everything else competing for attention?",
      de: "In einer Minute: Was sollte unsere größte Priorität im nächsten Quartal sein — und warum das vor allem anderen?",
      "es-ES": "En un minuto: ¿cuál debería ser nuestra mayor prioridad el próximo trimestre — y por qué esa por encima de todo lo demás?",
    },
    weights: { content: 0.55, delivery: 0.25, time: 0.2 },
    keyPoints: [
      { en: "pick ONE priority, clearly", de: "EINE Priorität klar wählen", "es-ES": "elegir UNA prioridad, con claridad" },
      { en: "a reason tied to impact", de: "ein wirkungsbezogener Grund", "es-ES": "una razón ligada al impacto" },
      { en: "explicitly what you'd deprioritize", de: "explizit, was du zurückstellst", "es-ES": "explícitamente qué despriorizas" },
      { en: "decisive, not a wish-list", de: "entschieden, keine Wunschliste", "es-ES": "decidido, no una lista de deseos" },
    ],
    rubric: {
      content: { strong: "One clear priority, impact-based reason, names the trade-off.", adequate: "Picks one but soft on the why or trade-off.", weak: "Lists several; no real choice." },
      delivery: { strong: "Decisive and crisp.", adequate: "Fairly clear.", weak: "Wavering." },
      time: { strong: "Tight within time.", adequate: "Fits.", weak: "Meanders." },
    },
    modelAnswer: {
      en: "One priority: retention. Right now we pour effort into new sign-ups while we leak users out the back — fixing that compounds everything else, because every point of retention raises the return on all our acquisition spend. So next quarter I'd deprioritize the two new-market experiments and put that capacity onto onboarding and the first-30-days experience. Grow the bucket before widening the tap.",
      de: "Eine Priorität: Bindung. Wir stecken Energie in Neuanmeldungen, während uns hinten Nutzer weglaufen — das zu beheben, verstärkt alles andere, denn jeder Bindungspunkt erhöht den Ertrag unserer gesamten Akquise-Ausgaben. Nächstes Quartal würde ich die zwei Neumarkt-Experimente zurückstellen und diese Kapazität auf Onboarding und die ersten 30 Tage legen. Erst den Eimer abdichten, dann den Hahn aufdrehen.",
      "es-ES": "Una prioridad: la retención. Ahora volcamos esfuerzo en altas nuevas mientras perdemos usuarios por detrás — arreglar eso multiplica todo lo demás, porque cada punto de retención eleva el retorno de todo nuestro gasto de captación. Así que el próximo trimestre despriorizaría los dos experimentos de nuevos mercados y pondría esa capacidad en el onboarding y la experiencia de los primeros 30 días. Tapa el cubo antes de abrir más el grifo.",
    },
  },
  {
    id: "C-018",
    type: "coaching",
    category: "self_awareness_development",
    difficulty: 1,
    media: {
      scene: "coaching_room",
      alt: {
        en: "A relaxed coaching warm-up conversation.",
        de: "Ein lockeres Coaching-Aufwärmgespräch.",
        "es-ES": "Una conversación de coaching de calentamiento, relajada.",
      },
    },
    roleCaption: {
      en: "You are warming up with your coach.",
      de: "Du wärmst dich mit deinem Coach auf.",
      "es-ES": "Estás calentando con tu coach.",
    },
    scenario: {
      en: "What's a real strength of yours that, when you overuse it, actually becomes a weakness?",
      de: "Was ist eine echte Stärke von dir, die, wenn du sie übertreibst, zur Schwäche wird?",
      "es-ES": "¿Cuál es una fortaleza real tuya que, cuando la usas en exceso, se convierte en debilidad?",
    },
    weights: { content: 0.45, delivery: 0.3, time: 0.25 },
    keyPoints: [
      { en: "a genuine strength", de: "eine echte Stärke", "es-ES": "una fortaleza genuina" },
      { en: "how overusing it backfires", de: "wie das Übertreiben schadet", "es-ES": "cómo el exceso se vuelve en contra" },
      { en: "a concrete example", de: "ein konkretes Beispiel", "es-ES": "un ejemplo concreto" },
      { en: "self-awareness, not humble-brag", de: "Selbstkenntnis, kein verstecktes Eigenlob", "es-ES": "autoconocimiento, no falsa modestia" },
    ],
    rubric: {
      content: { strong: "Real strength, honest downside, concrete example.", adequate: "Names it but stays abstract.", weak: "Humble-brag or no real downside." },
      delivery: { strong: "Open and self-aware.", adequate: "A little rehearsed.", weak: "Defensive or glib." },
      time: { strong: "Contained.", adequate: "Fits.", weak: "Drifts." },
    },
    modelAnswer: {
      en: "My drive to take ownership. At its best it means things don't fall through the cracks. Overused, it tips into doing too much myself — last quarter I quietly absorbed a struggling project instead of escalating, and I both burned out and robbed a teammate of the chance to step up. So now I catch myself asking: is this mine to carry, or mine to delegate?",
      de: "Mein Drang, Verantwortung zu übernehmen. Im besten Fall fällt nichts durchs Raster. Übertrieben kippt es ins Zu-viel-selbst-Machen — letztes Quartal habe ich ein schwächelndes Projekt still aufgefangen, statt zu eskalieren, und habe mich ausgebrannt und einem Teammitglied die Chance genommen. Jetzt ertappe ich mich bei der Frage: ist das meins zu tragen oder meins zu delegieren?",
      "es-ES": "Mi impulso de asumir responsabilidad. En su mejor versión, hace que nada se caiga. En exceso, se vuelve hacer demasiado yo mismo — el trimestre pasado absorbí en silencio un proyecto que iba mal en vez de escalar, y acabé quemado y le quité a un compañero la oportunidad de dar un paso al frente. Ahora me pillo preguntándome: ¿esto es mío para cargarlo, o mío para delegarlo?",
    },
  },
  {
    id: "C-019",
    type: "feedback360",
    category: "conflict_resolution",
    difficulty: 4,
    media: {
      scene: "feedback_report",
      alt: {
        en: "A 360 report highlighting a trust concern.",
        de: "Ein 360-Bericht, der ein Vertrauensthema hervorhebt.",
        "es-ES": "Un informe 360 que resalta una cuestión de confianza.",
      },
    },
    roleCaption: {
      en: "You are facing a hard 360 result with your coach.",
      de: "Du stellst dich einem harten 360-Ergebnis mit deinem Coach.",
      "es-ES": "Afrontas un resultado 360 duro con tu coach.",
    },
    scenario: {
      en: "Your 360 says people find you highly capable and politically savvy — but several note they don't fully trust you. Sit with that for a second. How do you respond?",
      de: "Dein 360 sagt, man hält dich für sehr fähig und politisch geschickt — aber mehrere merken an, dass sie dir nicht ganz vertrauen. Lass das kurz wirken. Wie reagierst du?",
      "es-ES": "Tu 360 dice que te ven muy capaz y hábil políticamente — pero varios señalan que no se fían del todo de ti. Quédate un momento con eso. ¿Cómo respondes?",
    },
    weights: { content: 0.45, delivery: 0.3, time: 0.25 },
    keyPoints: [
      { en: "resist defensiveness; take it seriously", de: "keine Abwehr; ernst nehmen", "es-ES": "evitar la defensa; tomarlo en serio" },
      { en: "honestly hypothesize what drives the perception", de: "ehrlich vermuten, was die Wahrnehmung treibt", "es-ES": "hipótesis honesta de qué genera la percepción" },
      { en: "a concrete trust-building behaviour", de: "ein konkretes vertrauensbildendes Verhalten", "es-ES": "un comportamiento concreto para generar confianza" },
      { en: "ownership without self-flagellation", de: "Verantwortung ohne Selbstgeißelung", "es-ES": "responsabilidad sin flagelarse" },
    ],
    rubric: {
      content: { strong: "Owns it, honestly hypothesizes the cause, commits to a concrete trust-building change.", adequate: "Accepts it but stays vague.", weak: "Disputes it or blames the raters." },
      delivery: { strong: "Undefended, mature, secure.", adequate: "A bit guarded.", weak: "Defensive." },
      time: { strong: "Thoughtful, contained.", adequate: "Fits.", weak: "Rambles." },
    },
    modelAnswer: {
      en: "That one lands, and my instinct is to defend — which is probably part of the problem. If I'm seen as capable and political but not fully trusted, my honest guess is I tailor the message too much to the room, so people sense they're getting a version, not the straight story. The fix isn't a campaign; it's small and repeated: say the same thing in the room that I say outside it, and admit what I don't know. Trust is rebuilt in the boring moments, so that's where I'll start.",
      de: "Das trifft, und mein Reflex ist, mich zu verteidigen — was wohl Teil des Problems ist. Wenn ich als fähig und politisch, aber nicht ganz vertrauenswürdig gelte, ist meine ehrliche Vermutung: Ich passe die Botschaft zu sehr an den Raum an, sodass Leute spüren, sie bekommen eine Version, nicht die klare Geschichte. Die Lösung ist keine Kampagne, sondern klein und wiederholt: im Raum dasselbe sagen wie außerhalb und zugeben, was ich nicht weiß. Vertrauen entsteht in den unspektakulären Momenten — da fange ich an.",
      "es-ES": "Eso da en el blanco, y mi instinto es defenderme — que probablemente es parte del problema. Si me ven capaz y político pero no del todo de fiar, mi sospecha honesta es que adapto demasiado el mensaje a la sala, así que la gente intuye que recibe una versión, no la historia directa. El arreglo no es una campaña; es pequeño y repetido: decir en la sala lo mismo que digo fuera, y admitir lo que no sé. La confianza se reconstruye en los momentos aburridos, así que ahí empiezo.",
    },
  },
  {
    id: "C-020",
    type: "situational",
    category: "professional_communication",
    difficulty: 3,
    media: {
      scene: "boardroom",
      alt: {
        en: "A reporter approaching you after a public event.",
        de: "Ein:e Journalist:in nähert sich dir nach einer Veranstaltung.",
        "es-ES": "Un periodista acercándose a ti tras un acto público.",
      },
    },
    roleCaption: {
      en: "You are a spokesperson, caught off guard after an event.",
      de: "Du bist Sprecher:in und wirst nach einer Veranstaltung überrascht.",
      "es-ES": "Eres portavoz, pillado por sorpresa tras un acto.",
    },
    scenario: {
      en: "A journalist catches you leaving an event: \"Is it true your team missed its safety targets last year?\" You don't have the full data in front of you. Respond.",
      de: "Ein:e Journalist:in fängt dich beim Verlassen einer Veranstaltung ab: „Stimmt es, dass Ihr Team letztes Jahr die Sicherheitsziele verfehlt hat?“ Du hast die vollständigen Daten nicht parat. Antworte.",
      "es-ES": "Un periodista te aborda al salir de un acto: «¿Es cierto que su equipo no alcanzó sus objetivos de seguridad el año pasado?». No tienes los datos completos delante. Responde.",
    },
    weights: { content: 0.45, delivery: 0.35, time: 0.2 },
    keyPoints: [
      { en: "don't guess or speculate on facts you lack", de: "nicht über fehlende Fakten spekulieren", "es-ES": "no especular con datos que no tienes" },
      { en: "don't get defensive or stonewall", de: "nicht defensiv oder mauern", "es-ES": "ni a la defensiva ni cerrarse en banda" },
      { en: "affirm the value (safety matters) genuinely", de: "den Wert (Sicherheit zählt) ehrlich bekräftigen", "es-ES": "afirmar el valor (la seguridad importa) con sinceridad" },
      { en: "commit to follow up with accurate info", de: "Nachfassen mit korrekten Infos zusagen", "es-ES": "comprometerse a responder con datos exactos" },
    ],
    rubric: {
      content: { strong: "Won't speculate, affirms safety as a priority, commits to follow up with real numbers.", adequate: "Safe but flat or slightly evasive.", weak: "Guesses, denies defensively, or stonewalls." },
      delivery: { strong: "Calm, credible, in control.", adequate: "Mostly composed.", weak: "Flustered or evasive-sounding." },
      time: { strong: "Tight and controlled.", adequate: "Fits.", weak: "Rambles." },
    },
    modelAnswer: {
      en: "Safety is something we take extremely seriously, so I won't give you a number off the top of my head and risk getting it wrong — you deserve the accurate figure, not my guess. What I can tell you is we review safety performance rigorously and act on it. Send me your question and I'll come back to you today with the exact data and the context around it.",
      de: "Sicherheit nehmen wir äußerst ernst, deshalb nenne ich Ihnen keine Zahl aus dem Stegreif und riskiere, falschzuliegen — Sie verdienen die korrekte Zahl, nicht meine Vermutung. Was ich sagen kann: Wir prüfen die Sicherheitsleistung streng und handeln danach. Schicken Sie mir Ihre Frage, und ich melde mich heute mit den genauen Daten und dem Kontext.",
      "es-ES": "La seguridad nos la tomamos extremadamente en serio, así que no le voy a dar una cifra de memoria y arriesgarme a equivocarme — usted merece el dato exacto, no mi suposición. Lo que sí le digo es que revisamos el desempeño en seguridad con rigor y actuamos en consecuencia. Mándeme su pregunta y le respondo hoy mismo con los datos exactos y su contexto.",
    },
  },
  {
    id: "C-021",
    type: "situational",
    category: "professional_communication",
    difficulty: 2,
    media: {
      scene: "exec_committee",
      alt: {
        en: "A leadership team seated, waiting for a first-time presenter to begin.",
        de: "Ein Führungsteam sitzt und wartet, dass ein:e Erstvortragende:r beginnt.",
        "es-ES": "Un equipo directivo sentado, esperando a que empiece quien presenta por primera vez.",
      },
    },
    roleCaption: {
      en: "You are a junior team member, presenting to leadership for the first time.",
      de: "Du bist ein:e Nachwuchskraft und präsentierst zum ersten Mal vor der Führung.",
      "es-ES": "Eres alguien junior del equipo, presentando ante la dirección por primera vez.",
    },
    scenario: {
      en: "It's your first time presenting to the senior leadership team. You have their full attention and 30 seconds to open. They don't know you yet. How do you start?",
      de: "Es ist dein erstes Mal vor dem oberen Führungsteam. Du hast ihre volle Aufmerksamkeit und 30 Sekunden für den Einstieg. Sie kennen dich noch nicht. Wie beginnst du?",
      "es-ES": "Es tu primera vez presentando ante el equipo de alta dirección. Tienes toda su atención y 30 segundos para abrir. Aún no te conocen. ¿Cómo empiezas?",
    },
    weights: { content: 0.45, delivery: 0.35, time: 0.2 },
    keyPoints: [
      { en: "open with a clear headline, not a slow build", de: "mit einer klaren Kernaussage beginnen", "es-ES": "abrir con un titular claro, sin rodeos" },
      { en: "say who you are briefly and credibly", de: "kurz und glaubwürdig sagen, wer du bist", "es-ES": "decir quién eres, breve y con credibilidad" },
      { en: "state why this matters to them", de: "sagen, warum es für sie wichtig ist", "es-ES": "decir por qué les importa a ellos" },
      { en: "composed, confident tone", de: "ruhiger, souveräner Ton", "es-ES": "tono sereno y seguro" },
    ],
    rubric: {
      content: { strong: "Crisp headline + who you are + why it matters to them, in seconds.", adequate: "Opens but buries the point or over-explains background.", weak: "Rambling warm-up, apologetic, or no clear point." },
      delivery: { strong: "Calm, confident, earns the room fast.", adequate: "Mostly composed; a little nervous.", weak: "Shaky, apologetic, or rushed." },
      time: { strong: "Lands the open well inside the window.", adequate: "Fits.", weak: "Runs long before getting anywhere." },
    },
    modelAnswer: {
      en: "Thanks for the time. I'm Sam from the growth team, and in the next two minutes I'll show you one change that can lift activation by double digits — and exactly what I need from you to ship it. Here's the headline: our drop-off is in onboarding, not acquisition. Let me show you.",
      de: "Danke für Ihre Zeit. Ich bin Sam aus dem Growth-Team, und in den nächsten zwei Minuten zeige ich Ihnen eine Änderung, die die Aktivierung zweistellig steigern kann — und was ich dafür von Ihnen brauche. Die Kernaussage: Unser Abbruch liegt im Onboarding, nicht in der Akquise. Ich zeige es Ihnen.",
      "es-ES": "Gracias por el tiempo. Soy Sam, del equipo de growth, y en los próximos dos minutos os enseño un cambio que puede subir la activación a doble dígito — y qué necesito de vosotros para lanzarlo. El titular: nuestra fuga está en el onboarding, no en la captación. Os lo muestro.",
    },
  },
  {
    id: "C-022",
    type: "situational",
    category: "professional_communication",
    difficulty: 2,
    media: {
      scene: "office_1on1",
      alt: {
        en: "A one-on-one with your manager about pay.",
        de: "Ein Vier-Augen-Gespräch mit deiner Führungskraft über Gehalt.",
        "es-ES": "Un 1:1 con tu manager sobre el salario.",
      },
    },
    roleCaption: {
      en: "You are asking your manager for a raise — for the first time.",
      de: "Du bittest deine Führungskraft zum ersten Mal um eine Gehaltserhöhung.",
      "es-ES": "Le pides a tu manager una subida — por primera vez.",
    },
    scenario: {
      en: "You booked this 1:1 to ask for a raise. Your manager sits down and says, \"So — what did you want to talk about?\" Make your case.",
      de: "Du hast dieses 1:1 angesetzt, um um eine Erhöhung zu bitten. Deine Führungskraft setzt sich und fragt: „Also — worüber wolltest du sprechen?“ Mach deinen Fall.",
      "es-ES": "Reservaste este 1:1 para pedir una subida. Tu manager se sienta y dice: «Bueno — ¿de qué querías hablar?». Defiende tu caso.",
    },
    weights: { content: 0.55, delivery: 0.3, time: 0.15 },
    keyPoints: [
      { en: "ask directly, no over-apologizing", de: "direkt fragen, ohne sich zu entschuldigen", "es-ES": "pedir directamente, sin disculparse de más" },
      { en: "evidence: concrete results / impact", de: "Belege: konkrete Ergebnisse / Wirkung", "es-ES": "evidencia: resultados / impacto concretos" },
      { en: "a specific ask (number or range)", de: "eine konkrete Forderung (Zahl/Spanne)", "es-ES": "una petición concreta (cifra o rango)" },
      { en: "confident, collaborative tone", de: "selbstbewusster, kooperativer Ton", "es-ES": "tono seguro y colaborativo" },
    ],
    rubric: {
      content: { strong: "Direct ask, backed by concrete results, with a specific number/range.", adequate: "Asks but vague on evidence or the number.", weak: "Hints, apologizes, or makes it about needs not value." },
      delivery: { strong: "Confident and collaborative, not entitled or meek.", adequate: "Slightly tentative.", weak: "Apologetic or aggressive." },
      time: { strong: "Makes the case efficiently.", adequate: "Fits.", weak: "Meanders." },
    },
    modelAnswer: {
      en: "I wanted to talk about my compensation. Over the last year I've owned the billing migration and cut support tickets by 30%, and I've taken on mentoring two new hires. Based on that scope and the market, I'd like to move my salary to [X]. I'm not looking for a fight — I want to understand what it takes to get there, and I'd love your support.",
      de: "Ich möchte über meine Vergütung sprechen. Im letzten Jahr habe ich die Billing-Migration verantwortet, die Support-Tickets um 30 % gesenkt und zwei Neueinsteiger gementort. Angesichts dieses Umfangs und des Marktes möchte ich mein Gehalt auf [X] anheben. Ich suche keinen Streit — ich will verstehen, was dafür nötig ist, und würde mich über deine Unterstützung freuen.",
      "es-ES": "Quería hablar de mi retribución. En el último año he liderado la migración de facturación y he reducido los tickets de soporte un 30%, además de mentorizar a dos incorporaciones. Por ese alcance y el mercado, me gustaría llevar mi salario a [X]. No busco pelea — quiero entender qué hace falta para llegar ahí, y me encantaría tu apoyo.",
    },
  },
  {
    id: "C-023",
    type: "conflict",
    category: "conflict_resolution",
    difficulty: 2,
    media: {
      scene: "video_call",
      alt: {
        en: "A daily standup video call where your idea was just dismissed.",
        de: "Ein tägliches Standup per Video, in dem deine Idee gerade abgetan wurde.",
        "es-ES": "Una daily por vídeo donde acaban de descartar tu idea.",
      },
    },
    roleCaption: {
      en: "You are an individual contributor in the daily standup.",
      de: "Du bist Fachkraft im täglichen Standup.",
      "es-ES": "Eres colaborador individual en la daily.",
    },
    scenario: {
      en: "In standup you propose an approach, and a senior engineer cuts in: \"That won't work, we tried it years ago.\" Everyone moves on. You still think you're right. What do you say?",
      de: "Im Standup schlägst du einen Ansatz vor, und ein:e Senior-Engineer unterbricht: „Das klappt nicht, haben wir vor Jahren versucht.“ Alle machen weiter. Du hältst dich für richtig. Was sagst du?",
      "es-ES": "En la daily propones un enfoque y un ingeniero senior te corta: «Eso no funciona, lo intentamos hace años». Todos siguen. Tú crees que tienes razón. ¿Qué dices?",
    },
    weights: { content: 0.45, delivery: 0.35, time: 0.2 },
    keyPoints: [
      { en: "stay calm, don't shrink or get defensive", de: "ruhig bleiben, nicht klein machen oder defensiv", "es-ES": "mantener la calma, ni encogerse ni a la defensiva" },
      { en: "acknowledge their experience", de: "ihre Erfahrung anerkennen", "es-ES": "reconocer su experiencia" },
      { en: "ask what's different now / hold your point", de: "fragen, was jetzt anders ist / Punkt halten", "es-ES": "preguntar qué cambió ahora / sostener tu punto" },
      { en: "propose a small concrete next step", de: "kleinen konkreten nächsten Schritt vorschlagen", "es-ES": "proponer un siguiente paso pequeño y concreto" },
    ],
    rubric: {
      content: { strong: "Respects their experience, surfaces what's changed, holds the idea, proposes a low-cost test.", adequate: "Holds the idea but either meek or pushy; no next step.", weak: "Caves silently, or argues without a path." },
      delivery: { strong: "Composed, respectful, quietly confident.", adequate: "A bit tentative or a bit sharp.", weak: "Defensive, deflated, or combative." },
      time: { strong: "Concise and controlled.", adequate: "Fits.", weak: "Rambles or freezes." },
    },
    modelAnswer: {
      en: "Totally hear you — you've got way more history here than I do. Can I check one thing, though: when we tried it before, did we have the new caching layer? Because that was the blocker, and it's gone now. I might be wrong, but it feels cheap to test — give me half a day to spike it and I'll bring numbers. If it flops, we drop it.",
      de: "Verstehe ich total — du hast hier viel mehr Historie als ich. Eine Sache aber: Hatten wir beim letzten Versuch schon die neue Caching-Schicht? Denn das war der Blocker, und der ist weg. Vielleicht irre ich mich, aber es ist billig zu testen — gib mir einen halben Tag für einen Spike und ich bringe Zahlen. Wenn es floppt, lassen wir es.",
      "es-ES": "Te entiendo del todo — tienes mucha más historia aquí que yo. Pero déjame comprobar una cosa: cuando lo intentamos, ¿teníamos ya la nueva capa de caché? Porque ese era el bloqueo, y ya no está. Puedo equivocarme, pero es barato probarlo — dame medio día para un spike y traigo números. Si falla, lo dejamos.",
    },
  },
  {
    id: "C-024",
    type: "situational",
    category: "strategic_thinking",
    difficulty: 4,
    media: {
      scene: "exec_committee",
      alt: {
        en: "The board interrupting a strategy presentation with hard questions.",
        de: "Der Vorstand unterbricht eine Strategiepräsentation mit harten Fragen.",
        "es-ES": "El consejo interrumpe una presentación de estrategia con preguntas duras.",
      },
    },
    roleCaption: {
      en: "You are the executive presenting strategy to the board.",
      de: "Du bist die Führungskraft, die dem Vorstand die Strategie präsentiert.",
      "es-ES": "Eres el ejecutivo presentando la estrategia al consejo.",
    },
    scenario: {
      en: "Mid-presentation, a board member stops you: \"I'm not convinced this strategy survives contact with the market. Why should we bet the company on it?\" Respond.",
      de: "Mitten in der Präsentation stoppt dich ein Vorstandsmitglied: „Ich bin nicht überzeugt, dass diese Strategie dem Markt standhält. Warum sollten wir das Unternehmen darauf verwetten?“ Antworte.",
      "es-ES": "A mitad de presentación, un consejero te detiene: «No me convence que esta estrategia sobreviva al contacto con el mercado. ¿Por qué deberíamos apostar la empresa a ella?». Responde.",
    },
    weights: { content: 0.55, delivery: 0.3, time: 0.15 },
    keyPoints: [
      { en: "welcome the challenge, no defensiveness", de: "die Herausforderung annehmen, ohne Abwehr", "es-ES": "acoger el reto, sin ponerse a la defensiva" },
      { en: "the core thesis in one line", de: "die Kernthese in einem Satz", "es-ES": "la tesis central en una frase" },
      { en: "the evidence and the key risk you've priced in", de: "Belege und das eingepreiste Hauptrisiko", "es-ES": "la evidencia y el riesgo clave que has contemplado" },
      { en: "what would make you change course", de: "was dich umsteuern ließe", "es-ES": "qué te haría cambiar de rumbo" },
    ],
    rubric: {
      content: { strong: "Welcomes it, gives a one-line thesis, cites evidence + the priced-in risk, names the kill-criteria.", adequate: "Defends it but thin on evidence or risk.", weak: "Defensive, vague, or capitulates." },
      delivery: { strong: "Calm conviction under fire; board-grade.", adequate: "Mostly composed.", weak: "Rattled or arrogant." },
      time: { strong: "Tight, decisive.", adequate: "Fits.", weak: "Runs long." },
    },
    modelAnswer: {
      en: "That's exactly the question we should stress-test, so thank you. The thesis in one line: we win by owning the workflow, not the feature. The evidence is that our design-partner cohort already consolidated three tools onto us and renewed at 140%. The risk I've priced in is slower enterprise sales, which is why we gate spend to milestones. And I'll be clear on what changes my mind: if we don't hit 120% net retention by Q3, we pivot. I'm not betting on faith — I'm betting on a signal we can already see.",
      de: "Genau das sollten wir stresstesten, danke. Die These in einem Satz: Wir gewinnen, indem wir den Workflow besitzen, nicht das Feature. Der Beleg: Unsere Design-Partner haben bereits drei Tools auf uns konsolidiert und mit 140 % verlängert. Das eingepreiste Risiko sind langsamere Enterprise-Verkäufe — deshalb koppeln wir Ausgaben an Meilensteine. Und klar, was mich umstimmt: Erreichen wir bis Q3 keine 120 % Net Retention, schwenken wir um. Ich wette nicht auf Glauben, sondern auf ein Signal, das wir schon sehen.",
      "es-ES": "Esa es justo la pregunta que deberíamos poner a prueba, así que gracias. La tesis en una frase: ganamos siendo dueños del flujo de trabajo, no de la función. La evidencia: nuestros socios de diseño ya consolidaron tres herramientas en nosotros y renovaron al 140%. El riesgo que he contemplado es una venta enterprise más lenta, por eso ligamos el gasto a hitos. Y seré claro con lo que me haría cambiar: si no llegamos al 120% de retención neta para el T3, pivotamos. No apuesto por fe — apuesto por una señal que ya vemos.",
    },
  },
  {
    id: "C-025",
    type: "conflict",
    category: "feedback_difficult_conversations",
    difficulty: 4,
    media: {
      scene: "office_1on1",
      alt: {
        en: "A serious, private conversation across a desk.",
        de: "Ein ernstes, privates Gespräch am Schreibtisch.",
        "es-ES": "Una conversación seria y privada en la mesa de despacho.",
      },
    },
    roleCaption: {
      en: "You are the leader, about to let go a long-tenured employee.",
      de: "Du bist die Führungskraft und musst eine:n langjährige:n Mitarbeitende:n entlassen.",
      "es-ES": "Eres el líder, a punto de despedir a alguien con mucha antigüedad.",
    },
    scenario: {
      en: "You have to let go someone who's been here 12 years — the role is being cut. They just sat down, no idea what's coming. Open the conversation.",
      de: "Du musst dich von jemandem trennen, der seit 12 Jahren hier ist — die Stelle entfällt. Die Person hat sich gerade gesetzt, ahnungslos. Eröffne das Gespräch.",
      "es-ES": "Tienes que despedir a alguien que lleva 12 años aquí — se elimina el puesto. Acaba de sentarse, sin saber qué viene. Abre la conversación.",
    },
    weights: { content: 0.45, delivery: 0.35, time: 0.2 },
    keyPoints: [
      { en: "be direct and humane; deliver the news clearly up front", de: "direkt und menschlich; die Nachricht klar zuerst", "es-ES": "directo y humano; dar la noticia clara al principio" },
      { en: "no false hope or burying the message", de: "keine falsche Hoffnung, nicht beschönigen", "es-ES": "sin falsas esperanzas ni rodeos" },
      { en: "respect their dignity and tenure", de: "Würde und Betriebszugehörigkeit achten", "es-ES": "respetar su dignidad y antigüedad" },
      { en: "what happens next / support offered", de: "wie es weitergeht / angebotene Unterstützung", "es-ES": "qué pasa ahora / apoyo ofrecido" },
    ],
    rubric: {
      content: { strong: "Delivers the decision clearly and early, with dignity and concrete next steps/support.", adequate: "Gets there but rambles first or softens into ambiguity.", weak: "Buries it, gives false hope, or is cold and abrupt." },
      delivery: { strong: "Calm, warm, steady; doesn't flinch or over-apologize.", adequate: "Mostly composed; a little evasive.", weak: "Cold, nervous, or waffling." },
      time: { strong: "Clear opening, unhurried but contained.", adequate: "Fits.", weak: "Stalls or rushes." },
    },
    modelAnswer: {
      en: "Thanks for coming in. I have hard news and I want to be straight with you out of respect: we're eliminating your role, and today is your last day in it. This is about the position, not your work — twelve years here matter, and they're not lost on me. Here's what happens next: [package, support, references], and I'll personally help with introductions. Take a moment — then ask me anything.",
      de: "Danke, dass du da bist. Ich habe eine schwere Nachricht und will aus Respekt offen sein: Wir streichen deine Stelle, und heute ist dein letzter Tag darin. Es geht um die Position, nicht um deine Arbeit — zwölf Jahre hier zählen, und das ist mir bewusst. So geht es weiter: [Paket, Unterstützung, Referenzen], und ich helfe persönlich bei Kontakten. Nimm dir einen Moment — und frag mich dann alles.",
      "es-ES": "Gracias por venir. Tengo una noticia difícil y, por respeto, quiero ser directo: eliminamos tu puesto, y hoy es tu último día en él. Es por la posición, no por tu trabajo — doce años aquí cuentan, y soy muy consciente de ello. Esto es lo que pasa ahora: [paquete, apoyo, referencias], y te ayudaré personalmente con presentaciones. Tómate un momento — y luego pregúntame lo que quieras.",
    },
  },
  {
    id: "C-026",
    type: "conflict",
    category: "leadership_decisions",
    difficulty: 3,
    media: {
      scene: "office_1on1",
      alt: {
        en: "A tense retention conversation with a top performer.",
        de: "Ein angespanntes Bindungsgespräch mit einer Top-Kraft.",
        "es-ES": "Una conversación tensa de retención con alguien clave.",
      },
    },
    roleCaption: {
      en: "You are the leader; your best person wants to leave.",
      de: "Du bist die Führungskraft; deine beste Person will gehen.",
      "es-ES": "Eres el líder; tu mejor persona quiere irse.",
    },
    scenario: {
      en: "Your best engineer closes your door and says, \"I've got an offer. I'm probably taking it — I don't feel like I'm growing here.\" How do you respond, right now?",
      de: "Dein:e beste:r Engineer schließt die Tür und sagt: „Ich habe ein Angebot. Wahrscheinlich nehme ich es an — ich habe das Gefühl, hier nicht zu wachsen.“ Wie reagierst du, jetzt?",
      "es-ES": "Tu mejor ingeniera cierra la puerta y dice: «Tengo una oferta. Probablemente la acepte — siento que aquí no crezco». ¿Cómo respondes, ahora mismo?",
    },
    weights: { content: 0.5, delivery: 0.3, time: 0.2 },
    keyPoints: [
      { en: "stay calm; don't panic or guilt-trip", de: "ruhig bleiben; keine Panik, keine Schuldgefühle", "es-ES": "mantener la calma; sin pánico ni culpabilizar" },
      { en: "get curious about the real reason (growth)", de: "den echten Grund verstehen (Wachstum)", "es-ES": "indagar el motivo real (crecimiento)" },
      { en: "acknowledge their value honestly", de: "ihren Wert ehrlich anerkennen", "es-ES": "reconocer su valor con honestidad" },
      { en: "a concrete next step, not just a counteroffer", de: "konkreter nächster Schritt, nicht nur Gegenangebot", "es-ES": "un siguiente paso concreto, no solo una contraoferta" },
    ],
    rubric: {
      content: { strong: "Calm, digs into the growth issue, values them genuinely, proposes a concrete next step beyond money.", adequate: "Reacts well but jumps to a counteroffer or stays vague.", weak: "Panics, guilts them, or gives up immediately." },
      delivery: { strong: "Composed and sincere; leaderly.", adequate: "Mostly steady.", weak: "Defensive, desperate, or cold." },
      time: { strong: "Controlled within time.", adequate: "Fits.", weak: "Spirals." },
    },
    modelAnswer: {
      en: "First — thank you for telling me to my face instead of just leaving; that means a lot. I'm not going to throw money at this in the next thirty seconds, because I think you're naming something real about growth. Help me understand: is it scope, a title, the kind of problems, or me? Don't decide today. Give me 48 hours to come back with a concrete path — and if it's genuinely not here, I'll help you leave well. You're worth fighting for the right way.",
      de: "Erst mal — danke, dass du es mir ins Gesicht sagst, statt einfach zu gehen; das bedeutet mir viel. Ich werfe jetzt nicht in dreißig Sekunden Geld auf das Problem, denn ich glaube, du benennst etwas Echtes zum Thema Wachstum. Hilf mir zu verstehen: Geht es um Scope, einen Titel, die Art der Probleme oder um mich? Entscheide nicht heute. Gib mir 48 Stunden für einen konkreten Weg — und wenn es hier wirklich nicht geht, helfe ich dir, gut zu gehen. Du bist es wert, richtig umworben zu werden.",
      "es-ES": "Primero — gracias por decírmelo a la cara en vez de irte sin más; eso significa mucho. No voy a tirarte dinero en treinta segundos, porque creo que estás nombrando algo real sobre crecimiento. Ayúdame a entender: ¿es el alcance, un título, el tipo de problemas, o soy yo? No decidas hoy. Dame 48 horas para volver con un camino concreto — y si de verdad no está aquí, te ayudaré a irte bien. Mereces que se luche por ti de la forma correcta.",
    },
  },
  {
    id: "C-027",
    type: "situational",
    category: "professional_communication",
    difficulty: 3,
    media: {
      scene: "office_1on1",
      alt: {
        en: "A one-on-one meeting room set for a pay conversation.",
        de: "Ein Vier-Augen-Raum für ein Gehaltsgespräch.",
        "es-ES": "Una sala de 1:1 preparada para una conversación de salario.",
      },
    },
    roleCaption: {
      en: "You're in a 1:1 to ask your manager for a raise.",
      de: "Du bist im 1:1 und bittest deine Führungskraft um eine Gehaltserhöhung.",
      "es-ES": "Estás en un 1:1 para pedirle un aumento a tu manager.",
    },
    scenario: {
      en: "Your manager says, \"You wanted to talk about compensation?\" You believe you're underpaid for your impact this year. Make your case.",
      de: "Deine Führungskraft sagt: „Du wolltest über Vergütung sprechen?“ Du bist überzeugt, für deine Wirkung dieses Jahr unterbezahlt zu sein. Begründe es.",
      "es-ES": "Tu manager dice: «¿Querías hablar de tu salario?». Crees que estás mal pagado para el impacto que has tenido este año. Defiende tu caso.",
    },
    weights: { content: 0.55, delivery: 0.3, time: 0.15 },
    keyPoints: [
      { en: "lead with impact and results, not need", de: "mit Wirkung und Ergebnissen führen, nicht mit Bedarf", "es-ES": "empezar por impacto y resultados, no por necesidad" },
      { en: "a specific, researched number or range", de: "eine konkrete, recherchierte Zahl oder Spanne", "es-ES": "una cifra o rango concreto y documentado" },
      { en: "calm, confident, not apologetic", de: "ruhig, selbstbewusst, nicht entschuldigend", "es-ES": "tranquilo, seguro, sin disculparte" },
      { en: "invite a path if not yes today", de: "einen Weg anbieten, falls nicht sofort ja", "es-ES": "proponer un camino si hoy no es un sí" },
    ],
    rubric: {
      content: { strong: "Specific results, a researched number, and an open path forward.", adequate: "Makes the ask but vague on impact or number.", weak: "Based on need or feelings, no evidence." },
      delivery: { strong: "Calm, confident, non-apologetic.", adequate: "Slightly hesitant.", weak: "Apologetic, anxious, or demanding." },
      time: { strong: "Tight and complete.", adequate: "Fits.", weak: "Rambles or stalls." },
    },
    modelAnswer: {
      en: "Thanks for making time. This year I led the migration that cut our costs 18% and took on the on-call rotation when we were short. Looking at market data for this role and scope, I'm currently below the midpoint — I'd like to bring my salary to around X. If that's not something you can do today, I'd love to understand what the path and timeline to it looks like, and what you'd need to see from me.",
      de: "Danke für die Zeit. Dieses Jahr habe ich die Migration geleitet, die unsere Kosten um 18% gesenkt hat, und die Rufbereitschaft übernommen, als wir unterbesetzt waren. Laut Marktdaten für diese Rolle liege ich unter dem Mittelwert — ich möchte mein Gehalt auf rund X bringen. Falls das heute nicht geht, würde ich gern verstehen, wie der Weg und der Zeitrahmen dorthin aussehen und was du von mir sehen müsstest.",
      "es-ES": "Gracias por el tiempo. Este año lideré la migración que redujo nuestros costes un 18% y asumí las guardias cuando íbamos cortos. Mirando los datos de mercado para este rol, estoy por debajo del punto medio — me gustaría llevar mi salario a unos X. Si hoy no es posible, me encantaría entender cuál es el camino y el plazo para llegar, y qué necesitarías ver de mí.",
    },
  },
  {
    id: "C-028",
    type: "behavioral",
    category: "self_awareness_development",
    difficulty: 2,
    media: {
      scene: "video_call",
      alt: {
        en: "A video interview call, the interviewer waiting for your answer.",
        de: "Ein Video-Interview, die interviewende Person wartet auf deine Antwort.",
        "es-ES": "Una entrevista por videollamada; el entrevistador espera tu respuesta.",
      },
    },
    roleCaption: {
      en: "You're the candidate in a job interview.",
      de: "Du bist Kandidat:in in einem Vorstellungsgespräch.",
      "es-ES": "Eres el candidato en una entrevista de trabajo.",
    },
    scenario: {
      en: "The interviewer opens with the classic: \"So — tell me about yourself.\" Give your answer.",
      de: "Die interviewende Person beginnt mit dem Klassiker: „Also — erzählen Sie mir von sich.“ Antworte.",
      "es-ES": "El entrevistador abre con el clásico: «Bueno — háblame de ti». Da tu respuesta.",
    },
    weights: { content: 0.5, delivery: 0.35, time: 0.15 },
    keyPoints: [
      { en: "present → past → future arc", de: "Gegenwart → Vergangenheit → Zukunft", "es-ES": "presente → pasado → futuro" },
      { en: "relevant to the role, not your life story", de: "relevant für die Rolle, keine Lebensgeschichte", "es-ES": "relevante para el puesto, no tu biografía" },
      { en: "one concrete achievement", de: "eine konkrete Leistung", "es-ES": "un logro concreto" },
      { en: "end on why this role", de: "mit dem Warum dieser Rolle enden", "es-ES": "terminar en por qué este puesto" },
    ],
    rubric: {
      content: { strong: "Tight present-past-future arc, role-relevant, one real achievement.", adequate: "Relevant but meandering or missing the future hook.", weak: "Life story, irrelevant, or no structure." },
      delivery: { strong: "Warm, confident, conversational.", adequate: "A little stiff or rushed.", weak: "Monotone, nervous, or robotic." },
      time: { strong: "Crisp, ~45–60s.", adequate: "Slightly long.", weak: "Way over or trails off." },
    },
    modelAnswer: {
      en: "I'm a product manager who loves turning messy problems into shipped, measurable outcomes. Right now I lead the payments roadmap at my company, where I cut checkout drop-off by 12% last quarter. Before that I came from a data background, which is why I'm comfortable making calls with evidence rather than opinion. I'm looking to do that at bigger scale, and your team's focus on customer experience is exactly the kind of problem I want to own next.",
      de: "Ich bin Produktmanager und liebe es, chaotische Probleme in lieferbare, messbare Ergebnisse zu verwandeln. Aktuell verantworte ich die Payments-Roadmap und habe den Checkout-Abbruch letztes Quartal um 12% gesenkt. Davor komme ich aus dem Datenbereich, deshalb treffe ich Entscheidungen lieber mit Belegen als mit Meinung. Das möchte ich in größerem Maßstab tun, und der Fokus eures Teams auf Kundenerlebnis ist genau das Problem, das ich als Nächstes übernehmen will.",
      "es-ES": "Soy product manager y me encanta convertir problemas desordenados en resultados entregados y medibles. Ahora lidero la hoja de ruta de pagos en mi empresa, donde reduje el abandono del checkout un 12% el último trimestre. Antes venía del mundo de los datos, por eso me siento cómodo decidiendo con evidencia y no con opiniones. Quiero hacer esto a mayor escala, y el foco de tu equipo en la experiencia de cliente es justo el tipo de problema que quiero asumir.",
    },
  },
  {
    id: "C-029",
    type: "behavioral",
    category: "self_awareness_development",
    difficulty: 2,
    media: {
      scene: "video_call",
      alt: {
        en: "A video interview; a pointed question on the table.",
        de: "Ein Video-Interview; eine pointierte Frage steht im Raum.",
        "es-ES": "Una entrevista por vídeo; una pregunta incisiva sobre la mesa.",
      },
    },
    roleCaption: {
      en: "You're the candidate; the question just got harder.",
      de: "Du bist Kandidat:in; die Frage wurde gerade schwerer.",
      "es-ES": "Eres el candidato; la pregunta se acaba de poner difícil.",
    },
    scenario: {
      en: "\"What's your greatest weakness?\" — answered honestly, without a cliché and without sinking your chances. Go.",
      de: "„Was ist Ihre größte Schwäche?“ — ehrlich beantwortet, ohne Klischee und ohne deine Chancen zu versenken. Los.",
      "es-ES": "«¿Cuál es tu mayor debilidad?» — respóndela con honestidad, sin tópicos y sin hundir tus opciones. Adelante.",
    },
    weights: { content: 0.5, delivery: 0.3, time: 0.2 },
    keyPoints: [
      { en: "a real weakness, not a humblebrag", de: "eine echte Schwäche, kein verkapptes Lob", "es-ES": "una debilidad real, no un autoelogio" },
      { en: "self-awareness about its impact", de: "Selbsterkenntnis über die Auswirkung", "es-ES": "consciencia de su impacto" },
      { en: "concrete steps you're taking", de: "konkrete Schritte, die du unternimmst", "es-ES": "pasos concretos que estás dando" },
      { en: "evidence of progress", de: "Beleg für Fortschritt", "es-ES": "prueba de progreso" },
    ],
    rubric: {
      content: { strong: "Genuine weakness, honest impact, concrete improvement with evidence.", adequate: "Real but light on the fix or progress.", weak: "Cliché ('I work too hard') or a disqualifying flaw with no plan." },
      delivery: { strong: "Honest, composed, self-assured.", adequate: "Slightly uneasy.", weak: "Defensive or evasive." },
      time: { strong: "Concise and complete.", adequate: "Fits.", weak: "Over-explains or dodges." },
    },
    modelAnswer: {
      en: "I tend to take on too much myself rather than delegating, because early on it felt faster. It bit me last year when I became the bottleneck on a launch. Since then I've been deliberately handing ownership to my team — I now run a weekly handoff and track what only I am doing. The launch we shipped this spring ran almost entirely without me in the critical path, which a year ago wouldn't have happened.",
      de: "Ich neige dazu, zu viel selbst zu übernehmen, statt zu delegieren, weil es früher schneller wirkte. Letztes Jahr wurde ich dadurch zum Engpass bei einem Launch. Seitdem gebe ich bewusst Verantwortung ab — ich mache wöchentliche Übergaben und verfolge, was nur ich tue. Der Launch in diesem Frühjahr lief fast ganz ohne mich im kritischen Pfad, was vor einem Jahr nicht passiert wäre.",
      "es-ES": "Tiendo a asumir demasiado yo mismo en vez de delegar, porque al principio parecía más rápido. Me pasó factura el año pasado cuando me convertí en el cuello de botella de un lanzamiento. Desde entonces delego responsabilidad de forma deliberada — hago un traspaso semanal y controlo qué hago solo yo. El lanzamiento de esta primavera salió casi sin mí en el camino crítico, algo que hace un año no habría pasado.",
    },
  },
  {
    id: "C-030",
    type: "situational",
    category: "feedback_difficult_conversations",
    difficulty: 3,
    media: {
      scene: "client_meeting",
      alt: {
        en: "A client meeting where you must share a delay.",
        de: "Ein Kundentermin, bei dem du eine Verzögerung mitteilen musst.",
        "es-ES": "Una reunión con cliente donde debes comunicar un retraso.",
      },
    },
    roleCaption: {
      en: "You're the account lead; the project is slipping.",
      de: "Du bist Account-Lead; das Projekt verzögert sich.",
      "es-ES": "Eres el responsable de la cuenta; el proyecto se está retrasando.",
    },
    scenario: {
      en: "You have to tell an important client the delivery will be two weeks late. They're already on the call expecting good news. Open the conversation.",
      de: "Du musst einem wichtigen Kunden sagen, dass die Lieferung zwei Wochen später kommt. Er ist bereits im Call und erwartet gute Nachrichten. Eröffne das Gespräch.",
      "es-ES": "Tienes que decirle a un cliente importante que la entrega se retrasará dos semanas. Ya está en la llamada esperando buenas noticias. Abre la conversación.",
    },
    weights: { content: 0.45, delivery: 0.35, time: 0.2 },
    keyPoints: [
      { en: "lead with the news clearly, no burying it", de: "die Nachricht klar voranstellen, nicht verstecken", "es-ES": "dar la noticia clara, sin esconderla" },
      { en: "own it without excuses", de: "Verantwortung ohne Ausreden", "es-ES": "asumirlo sin excusas" },
      { en: "a concrete recovery plan", de: "ein konkreter Recovery-Plan", "es-ES": "un plan de recuperación concreto" },
      { en: "protect the relationship and trust", de: "Beziehung und Vertrauen schützen", "es-ES": "proteger la relación y la confianza" },
    ],
    rubric: {
      content: { strong: "States the delay upfront, owns it, gives a credible recovery plan and what's protected.", adequate: "Shares it but softens too much or thin on the plan.", weak: "Buries the news, makes excuses, or has no plan." },
      delivery: { strong: "Calm, direct, accountable.", adequate: "A little hesitant.", weak: "Defensive, vague, or over-apologetic." },
      time: { strong: "Clear and contained.", adequate: "Fits.", weak: "Waffles." },
    },
    modelAnswer: {
      en: "Before we go further, I want to be straight with you: the full delivery is going to be two weeks late, landing the 28th instead of the 14th. That's on us — a dependency took longer to harden than we planned, and I'd rather give you a date we'll hit than one we'll miss. Here's the plan: we'll ship the reporting module on the original date so your team isn't blocked, dedicate two more engineers to the rest, and I'll send you a written recovery timeline today with weekly checkpoints. What's the impact on your side I should be solving for?",
      de: "Bevor wir weitermachen, will ich ehrlich sein: Die vollständige Lieferung kommt zwei Wochen später, am 28. statt am 14. Das liegt an uns — eine Abhängigkeit brauchte länger als geplant, und ich gebe dir lieber ein Datum, das wir halten. Der Plan: Das Reporting-Modul liefern wir zum ursprünglichen Termin, damit dein Team nicht blockiert ist, wir setzen zwei weitere Engineers auf den Rest, und ich schicke dir heute einen schriftlichen Recovery-Plan mit wöchentlichen Checkpoints. Welche Auswirkung auf deiner Seite soll ich mitlösen?",
      "es-ES": "Antes de seguir, quiero ser sincero contigo: la entrega completa llegará dos semanas más tarde, el 28 en vez del 14. Es responsabilidad nuestra — una dependencia tardó más de lo previsto, y prefiero darte una fecha que vamos a cumplir. Este es el plan: entregaremos el módulo de informes en la fecha original para no bloquear a tu equipo, dedicamos dos ingenieros más al resto, y hoy te envío un cronograma de recuperación por escrito con puntos de control semanales. ¿Qué impacto en tu lado debería ayudarte a resolver?",
    },
  },
  {
    id: "C-031",
    type: "feedback360",
    category: "feedback_difficult_conversations",
    difficulty: 3,
    media: {
      scene: "office_1on1",
      alt: {
        en: "A private 1:1 to give honest feedback.",
        de: "Ein vertrauliches 1:1 für ehrliches Feedback.",
        "es-ES": "Un 1:1 privado para dar feedback honesto.",
      },
    },
    roleCaption: {
      en: "You're the manager; a strong performer has slipped.",
      de: "Du bist die Führungskraft; eine sonst starke Person hat nachgelassen.",
      "es-ES": "Eres el manager; alguien que rendía bien ha bajado.",
    },
    scenario: {
      en: "A team member you respect has missed three deadlines and their work quality has dropped. They don't seem aware. Give the feedback.",
      de: "Ein Teammitglied, das du schätzt, hat drei Fristen verpasst und die Qualität ist gesunken. Es scheint sich dessen nicht bewusst zu sein. Gib das Feedback.",
      "es-ES": "Una persona de tu equipo a la que respetas ha incumplido tres entregas y su calidad ha bajado. No parece consciente. Dale el feedback.",
    },
    weights: { content: 0.5, delivery: 0.35, time: 0.15 },
    keyPoints: [
      { en: "specific, observed facts not labels", de: "konkrete, beobachtete Fakten statt Etiketten", "es-ES": "hechos concretos observados, no etiquetas" },
      { en: "state the impact", de: "die Auswirkung benennen", "es-ES": "nombrar el impacto" },
      { en: "ask, listen for what's going on", de: "fragen, zuhören, was los ist", "es-ES": "preguntar y escuchar qué pasa" },
      { en: "agree a clear way forward", de: "einen klaren Weg vereinbaren", "es-ES": "acordar un camino claro" },
    ],
    rubric: {
      content: { strong: "Concrete examples, clear impact, genuine inquiry, agreed next step.", adequate: "Names it but vague or skips the inquiry.", weak: "Labels them, no examples, or avoids the point." },
      delivery: { strong: "Direct and kind; respectful.", adequate: "Slightly soft or blunt.", weak: "Harsh, accusatory, or mushy." },
      time: { strong: "Focused.", adequate: "Fits.", weak: "Rambles or stalls." },
    },
    modelAnswer: {
      en: "I want to talk about something because I rate you highly and I'd want the same straight talk. The last three deliverables came in late, and the auth spec had gaps we usually wouldn't see from you. That's slowing the team and it's not like your normal work — which makes me think something's going on. Before I assume anything: what's your read, and what's actually happening for you right now? Let's figure out what changes, and what support you need, and put a simple plan on it for the next two weeks.",
      de: "Ich möchte etwas ansprechen, weil ich dich sehr schätze und mir dieselbe Klarheit wünschen würde. Die letzten drei Ergebnisse kamen zu spät, und die Auth-Spezifikation hatte Lücken, die wir von dir sonst nicht sehen. Das bremst das Team und entspricht nicht deiner üblichen Arbeit — deshalb denke ich, da ist etwas los. Bevor ich etwas annehme: Wie siehst du es, und was ist gerade wirklich bei dir los? Lass uns klären, was sich ändert und welche Unterstützung du brauchst, und einen einfachen Plan für die nächsten zwei Wochen machen.",
      "es-ES": "Quiero hablar de algo porque te valoro mucho y a mí me gustaría la misma franqueza. Las últimas tres entregas llegaron tarde, y la especificación de auth tenía huecos que normalmente no veríamos en ti. Eso frena al equipo y no es tu trabajo habitual — lo que me hace pensar que algo pasa. Antes de suponer nada: ¿cómo lo ves tú, y qué te está pasando ahora mismo? Vamos a ver qué cambia y qué apoyo necesitas, y ponemos un plan sencillo para las próximas dos semanas.",
    },
  },
  {
    id: "C-032",
    type: "situational",
    category: "conflict_resolution",
    difficulty: 3,
    media: {
      scene: "office_1on1",
      alt: {
        en: "A 1:1 with your boss where you disagree.",
        de: "Ein 1:1 mit deiner Chefin, in dem du anderer Meinung bist.",
        "es-ES": "Un 1:1 con tu jefe en el que discrepas.",
      },
    },
    roleCaption: {
      en: "You're a team lead; you think your boss is wrong.",
      de: "Du bist Teamlead; du hältst die Entscheidung deiner Chefin für falsch.",
      "es-ES": "Eres team lead; crees que tu jefe se equivoca.",
    },
    scenario: {
      en: "Your boss has decided to cut testing to hit the deadline. You're convinced it'll backfire badly. They ask, \"You look unconvinced — what?\" Respond.",
      de: "Deine Chefin hat beschlossen, Tests zu kürzen, um den Termin zu halten. Du bist sicher, dass das übel nach hinten losgeht. Sie fragt: „Du wirkst nicht überzeugt — was ist?“ Reagiere.",
      "es-ES": "Tu jefe ha decidido recortar las pruebas para llegar a la fecha. Estás convencido de que saldrá muy mal. Te pregunta: «Te veo poco convencido — ¿qué pasa?». Responde.",
    },
    weights: { content: 0.5, delivery: 0.35, time: 0.15 },
    keyPoints: [
      { en: "respectful, share the shared goal first", de: "respektvoll, zuerst das gemeinsame Ziel", "es-ES": "respetuoso, primero el objetivo común" },
      { en: "the specific risk, with evidence", de: "das konkrete Risiko, mit Belegen", "es-ES": "el riesgo concreto, con evidencia" },
      { en: "offer an alternative, not just a no", de: "eine Alternative bieten, nicht nur ein Nein", "es-ES": "ofrecer una alternativa, no solo un no" },
      { en: "commit to the decision either way", de: "die Entscheidung so oder so mittragen", "es-ES": "comprometerte con la decisión de todos modos" },
    ],
    rubric: {
      content: { strong: "Shared goal, specific evidenced risk, a real alternative, and disagree-and-commit.", adequate: "Raises the risk but no alternative or commitment.", weak: "Just objects, or caves silently." },
      delivery: { strong: "Calm, respectful, confident.", adequate: "A bit tense.", weak: "Combative or timid." },
      time: { strong: "Tight.", adequate: "Fits.", weak: "Rambles." },
    },
    modelAnswer: {
      en: "We both want to hit Thursday — I'm with you on that. My worry is specific: the last time we shipped this module without regression tests, we spent the following week on hotfixes and lost more time than we saved, plus a customer escalation. So instead of cutting all testing, could we keep the regression suite on the payment path only — that's two hours — and drop the lower-risk UI tests? We hit the date and protect the part that hurts most if it breaks. If you still want the full cut after that, I'll back it fully and make it work.",
      de: "Wir wollen beide Donnerstag schaffen — da bin ich bei dir. Meine Sorge ist konkret: Als wir dieses Modul zuletzt ohne Regressionstests auslieferten, verbrachten wir die Folgewoche mit Hotfixes und verloren mehr Zeit als wir sparten, plus eine Kundeneskalation. Statt alle Tests zu streichen — könnten wir die Regressionssuite nur für den Zahlungspfad behalten, das sind zwei Stunden, und die risikoärmeren UI-Tests weglassen? Wir halten den Termin und schützen den Teil, der am meisten wehtut. Willst du danach trotzdem alles streichen, trage ich es voll mit.",
      "es-ES": "Los dos queremos llegar al jueves — en eso estoy contigo. Mi preocupación es concreta: la última vez que entregamos este módulo sin pruebas de regresión, pasamos la semana siguiente con parches y perdimos más tiempo del que ahorramos, además de una escalada de un cliente. Así que en vez de recortar todas las pruebas, ¿podríamos mantener la suite de regresión solo en el flujo de pagos — son dos horas — y quitar las pruebas de UI de menor riesgo? Llegamos a la fecha y protegemos lo que más duele si falla. Si aun así quieres el recorte completo, lo apoyo del todo y lo saco adelante.",
    },
  },
  {
    id: "C-033",
    type: "wave",
    category: "strategic_thinking",
    difficulty: 4,
    media: {
      scene: "exec_committee",
      alt: {
        en: "The exec committee, waiting for your pitch.",
        de: "Das Executive Committee wartet auf deinen Pitch.",
        "es-ES": "El comité ejecutivo, esperando tu propuesta.",
      },
    },
    roleCaption: {
      en: "You have 60 seconds with the leadership team.",
      de: "Du hast 60 Sekunden mit dem Führungsteam.",
      "es-ES": "Tienes 60 segundos con el equipo directivo.",
    },
    scenario: {
      en: "You catch the leadership team between sessions. You have one idea that could matter. Pitch it — the problem, your solution, and the ask — before they move on.",
      de: "Du erwischst das Führungsteam zwischen zwei Sessions. Du hast eine Idee, die zählen könnte. Pitch sie — Problem, Lösung und Ask — bevor sie weiterziehen.",
      "es-ES": "Pillas al equipo directivo entre sesiones. Tienes una idea que podría importar. Preséntala — el problema, tu solución y lo que pides — antes de que se vayan.",
    },
    weights: { content: 0.45, delivery: 0.4, time: 0.15 },
    keyPoints: [
      { en: "hook with the problem and its size", de: "Haken: das Problem und seine Größe", "es-ES": "engancha con el problema y su tamaño" },
      { en: "one clear solution, not three", de: "eine klare Lösung, nicht drei", "es-ES": "una solución clara, no tres" },
      { en: "the business impact in a number", de: "der Geschäftsnutzen als Zahl", "es-ES": "el impacto de negocio en una cifra" },
      { en: "a specific, small ask", de: "ein konkreter, kleiner Ask", "es-ES": "una petición concreta y pequeña" },
    ],
    rubric: {
      content: { strong: "Sharp problem, one solution, a quantified impact, and a crisp ask.", adequate: "Has the idea but fuzzy impact or ask.", weak: "Rambling, no clear ask, or no why-now." },
      delivery: { strong: "Confident, energetic, executive presence.", adequate: "Steady but flat.", weak: "Nervous or apologetic." },
      time: { strong: "Lands the ask inside 60s.", adequate: "Just fits.", weak: "Runs out before the ask." },
    },
    modelAnswer: {
      en: "Quick one while I have you. We're losing about 9% of new signups in the first 24 hours — that's roughly two million a year walking out the door before they ever see value. I've prototyped a guided first-run that gets people to their first win in under two minutes, and early tests cut that drop-off by a third. I'm not asking for a budget line — just one engineer for three weeks to run a proper A/B test. If it works, it pays for itself in a month. Can I send you the one-pager and grab fifteen minutes next week?",
      de: "Kurz, solange ich euch habe. Wir verlieren rund 9% der neuen Anmeldungen in den ersten 24 Stunden — das sind etwa zwei Millionen pro Jahr, die gehen, bevor sie je einen Wert sehen. Ich habe einen geführten Erststart prototypisiert, der Leute in unter zwei Minuten zum ersten Erfolg bringt, und erste Tests senken den Abbruch um ein Drittel. Ich will kein Budget — nur eine:n Engineer für drei Wochen für einen sauberen A/B-Test. Wenn es klappt, amortisiert es sich in einem Monat. Darf ich euch den One-Pager schicken und nächste Woche fünfzehn Minuten bekommen?",
      "es-ES": "Rápido, ya que os tengo. Estamos perdiendo en torno al 9% de los registros nuevos en las primeras 24 horas — son unos dos millones al año que se van antes de ver ningún valor. He prototipado un primer arranque guiado que lleva a la gente a su primer logro en menos de dos minutos, y las pruebas iniciales reducen ese abandono un tercio. No pido presupuesto — solo un ingeniero durante tres semanas para un test A/B serio. Si funciona, se paga solo en un mes. ¿Os mando el resumen de una página y cojo quince minutos la semana que viene?",
    },
  },
  {
    id: "C-034",
    type: "situational",
    category: "self_awareness_development",
    difficulty: 3,
    media: {
      scene: "boardroom",
      alt: {
        en: "A room of colleagues after a mistake came to light.",
        de: "Ein Raum voller Kolleg:innen, nachdem ein Fehler ans Licht kam.",
        "es-ES": "Una sala de colegas tras salir a la luz un error.",
      },
    },
    roleCaption: {
      en: "You're accountable; the mistake was yours.",
      de: "Du bist verantwortlich; der Fehler war deiner.",
      "es-ES": "Eres responsable; el error fue tuyo.",
    },
    scenario: {
      en: "A decision you championed caused a costly miss. The team is in the room, morale is low, and everyone's looking at you. Speak.",
      de: "Eine Entscheidung, für die du eingetreten bist, hat einen teuren Fehlschlag verursacht. Das Team ist im Raum, die Stimmung ist tief, und alle schauen auf dich. Sprich.",
      "es-ES": "Una decisión que defendiste causó un fallo costoso. El equipo está en la sala, la moral está baja y todos te miran. Habla.",
    },
    weights: { content: 0.45, delivery: 0.4, time: 0.15 },
    keyPoints: [
      { en: "own it plainly, no deflection", de: "klar Verantwortung übernehmen, kein Ablenken", "es-ES": "asumirlo con claridad, sin desviar" },
      { en: "no blame on the team", de: "keine Schuld aufs Team", "es-ES": "sin culpar al equipo" },
      { en: "what you learned / will change", de: "was du gelernt hast / änderst", "es-ES": "qué aprendiste / cambiarás" },
      { en: "steady the room, refocus forward", de: "den Raum beruhigen, nach vorn richten", "es-ES": "calmar la sala, reenfocar hacia delante" },
    ],
    rubric: {
      content: { strong: "Clear ownership, no blame, a real lesson, and a forward refocus.", adequate: "Owns it but thin on the lesson or the path.", weak: "Deflects, blames, or spirals into apology." },
      delivery: { strong: "Composed, sincere, steadying — leaderly.", adequate: "Mostly steady.", weak: "Defensive, deflated, or cold." },
      time: { strong: "Contained and clear.", adequate: "Fits.", weak: "Rambles or over-apologizes." },
    },
    modelAnswer: {
      en: "I want to be clear up front: this one's on me. I pushed for the early launch, I made that call, and it cost us. That's not on anyone in this room — you executed what I asked for. What I got wrong was discounting the risk you flagged, and I'm changing how we gate these decisions so a single strong opinion — mine included — can't override the data. Here's what matters now: we've contained the customer impact, we ship the fix Friday, and I'll have the post-mortem out by Monday with no names, just lessons. We've recovered from worse together. Let's go fix it.",
      de: "Ich will es vorweg klar sagen: Das geht auf mich. Ich habe auf den frühen Launch gedrängt, ich habe die Entscheidung getroffen, und sie hat uns etwas gekostet. Das liegt an niemandem in diesem Raum — ihr habt umgesetzt, worum ich gebeten habe. Mein Fehler war, das von euch markierte Risiko abzutun, und ich ändere, wie wir solche Entscheidungen absichern, damit keine einzelne starke Meinung — auch nicht meine — die Daten übersteuert. Was jetzt zählt: Wir haben den Kundenschaden eingedämmt, der Fix kommt Freitag, und das Post-mortem liegt Montag vor — ohne Namen, nur Lehren. Wir haben Schlimmeres gemeinsam überstanden. Lasst es uns beheben.",
      "es-ES": "Quiero dejarlo claro de entrada: esto es responsabilidad mía. Yo empujé el lanzamiento anticipado, yo tomé esa decisión, y nos ha costado. No es culpa de nadie en esta sala — vosotros ejecutasteis lo que pedí. Lo que hice mal fue restar importancia al riesgo que señalasteis, y voy a cambiar cómo validamos estas decisiones para que una sola opinión fuerte — la mía incluida — no pueda imponerse a los datos. Lo que importa ahora: hemos contenido el impacto en clientes, el arreglo sale el viernes, y tendré el post-mortem el lunes, sin nombres, solo lecciones. Hemos remontado cosas peores juntos. Vamos a arreglarlo.",
    },
  },
];

// Department-specific scenarios extend the general seed library.
CHALLENGES.push(...DEPARTMENT_CHALLENGES);

export function getChallenge(id: string): Challenge | undefined {
  return CHALLENGES.find((c) => c.id === id);
}
