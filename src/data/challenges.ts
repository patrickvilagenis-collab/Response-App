import type { Challenge } from "../types";

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
        strong: "Complete STAR inside 30s, tight.",
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
        strong: "Concise, controlled response inside 30s.",
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
        strong: "Controlled, decisive, inside 30s.",
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
        strong: "Crisp executive answer inside 30s.",
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
        strong: "Reflective but contained inside 30s.",
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
        strong: "Honest and contained inside 30s.",
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
];

export function getChallenge(id: string): Challenge | undefined {
  return CHALLENGES.find((c) => c.id === id);
}
