# Response — Exploración de Rediseño Integral (UX/UI)

**Tipo:** Exploración de diseño (fase colaborativa, previa a implementación)
**Para:** Plataforma de coaching "Response" — dos mercados (individuos + RRHH)
**Estado:** Propuesta v1 para revisión y decisión

> Objetivo: transformar "Response" de una app oscura y minimalista a una
> plataforma **moderna, profesional y cálida** que transmita confianza a
> compradores de RRHH y resulte **accesible e inspiradora** para individuos,
> manteniendo el core: práctica de respuestas y coaching bajo presión.

---

## 0. Resumen ejecutivo (TL;DR)

1. **Reorganizar por _situación_ y _tema_, no por dificultad.** La gente piensa
   "mañana tengo una entrevista difícil", no "quiero un reto de nivel 3".
2. **Tema claro y cálido por defecto + "modo foco" oscuro solo durante la
   respuesta en directo.** Lo claro = confianza/accesibilidad (RRHH, ejecutivos
   senior); lo oscuro = inmersión bajo los focos en el momento de actuar.
3. **Tipografía con carácter humano** (serif suave para titulares) + Inter para
   UI. Color índigo premium + acento coral cálido para diferenciarse del azul
   corporativo genérico.
4. **Onboarding de 3 toques** que personaliza la home por rol y objetivo, y
   distingue "individuo" vs "vengo de mi empresa (RRHH)".
5. **Dos velocidades visibles desde el primer clic:** _Rep rápido_ (respuesta ya)
   y _Programa_ (desarrollo profundo por semanas).
6. **Ejemplos vívidos y segmentados** que sustituyan los escenarios genéricos.

---

## 1. Análisis del punto de partida

### Qué funciona (mantener)
- **Concepto "bajo los focos":** el hero del login y el escenario inmersivo en
  segunda persona son un ángulo fuerte y diferenciador. Lo conservamos como
  **motivo de marca**, pero acotado al momento de actuar.
- **Práctica → puntuación → coaching → reintento:** el bucle core es sólido.
- **Estadísticas de progreso** (media, racha, área de mejora): buena base.

### Qué genera fricción (transformar)
| Fricción | Por qué duele | Para quién |
|---|---|---|
| **Oscuridad total** | Se percibe pesada, "techie", poco acogedora; resta confianza institucional | RRHH y ejecutivos 35-55 |
| **Navegación por dificultad** (Calentamiento/Aplicado/Presión/Dirección) | Es lenguaje _interno del producto_, no del usuario; nadie llega buscando "nivel" | Ambos |
| **Biblioteca como rejilla plana** | No hay entrada por "lo que me pasa" ni por tema; no hay relevancia inmediata | Ambos |
| **Escenas SVG genéricas y planas** | No transmiten profesionalismo ni emoción; todas se parecen | Ambos |
| **Sin propuesta de valor en la entrada** | No se comunica "esto es para ti" a ninguno de los dos segmentos | Ambos |
| **Jerarquía visual baja** | Tarjetas similares, poco contraste, todo compite | Ambos |
| **Sin onboarding** | El usuario aterriza sin contexto ni personalización | Individuos nuevos |

---

## 2. Arquitectura de información (la decisión más importante)

### Principio rector
**Organizar por _intención_, con dos lentes complementarias:**

- 🔥 **Por situación** (necesidad inmediata): _"esto tengo delante"_.
- 🎯 **Por tema/track** (desarrollo profundo): _"quiero crecer en…"_.

Y una tercera dimensión transversal: **por tiempo disponible** (Rep rápido 2 min ·
Escenario 5 min · Programa por semanas).

### Taxonomía propuesta: 5 Tracks → Escenarios (situaciones)

Consolidamos las 6 categorías actuales en **5 tracks claros**, cada uno con
escenarios etiquetados por situación, nivel de rol, tiempo y marco profesional.

| Track (tema) | Engloba (actual) | Escenarios ejemplo |
|---|---|---|
| **1. Liderazgo y presencia ejecutiva** | strategic_thinking, leadership_decisions, WAVE | Defender tu estrategia ante el consejo · Decidir con información incompleta · Presencia en comité |
| **2. Conversaciones difíciles y conflicto** | conflict_resolution, feedback_difficult_conversations | Dar feedback que escuece · Te retan delante del cliente · Despedir a alguien con antigüedad |
| **3. Carrera y entrevistas** | behavioral, transiciones | Entrevista de liderazgo · Negociar tu subida · "Háblame de un fracaso" |
| **4. Comunicación bajo presión** | professional_communication, situational | El jefe de tu jefe te llama sin briefing · Update de 30s para dirección · Periodista te aborda |
| **5. Autoconocimiento y desarrollo** | coaching, feedback360, self_awareness | Resultados de tu 360 · Qué evitas en tu carrera · Tu fortaleza sobreusada |

**Facetas (filtros) transversales** — para encontrar relevancia inmediata:
- **Nivel de rol:** Colaborador individual · Mando · Director · Ejecutivo
- **Situación:** Entrevista · Reunión de consejo · 1:1 · Conflicto · Cliente · Feedback · Crisis
- **Tiempo:** Rep rápido (≤2 min) · Escenario (≤5 min) · Programa (semanas)
- **Sector** (opcional): Tech · Consultoría · Salud · Finanzas…

### Balance "respuesta rápida" ↔ "desarrollo profundo"
Se resuelve en la **home** con dos llamadas claras y persistentes:
- **"Rep rápido"** → ráfaga de calentamiento o un escenario suelto, ahora.
- **"Tu programa"** → un track estructurado, progreso por sesiones (ideal RRHH).

### Estructura de navegación (top-level)
```
Inicio · Practicar · Programas · Progreso · (Equipo/RRHH)
```
- **Inicio:** personalizado (continuar, recomendado, rep rápido).
- **Practicar:** explorar por Situación y por Track, con facetas.
- **Programas:** paths multi-sesión (gran gancho para RRHH y líderes).
- **Progreso:** historial + radar de competencias.
- **Equipo/RRHH:** panel para asignar programas y ver avance (evolución del
  panel admin actual).

> 🟡 **Decisión 1 (tuya):** ¿lente principal _Situación_, _Track_, _Objetivo_, o
> híbrido? Recomiendo **híbrido con Situación al frente** para enganchar rápido.

---

## 3. Sistema visual

### 3.1 Estrategia de tema: claro por defecto + "modo foco" oscuro
La tensión de los dos mercados se resuelve con **dos modos con propósito**:

- **Tema claro "Estudio"** (por defecto, toda la navegación): cálido, confiable,
  moderno → accesible para RRHH y ejecutivos, nada intimidante.
- **Modo foco oscuro "Escenario"** (solo durante los 60s de respuesta en
  directo y resultados): mantiene el efecto "bajo los focos", concentración y
  drama en el momento que importa.

### 3.2 Paleta

**Tema claro "Estudio" (default)**
```
--paper        #FAF9F6   fondo cálido (no blanco clínico)
--surface      #FFFFFF   tarjetas
--surface-2    #F3F2EC   secundario
--ink          #16181D   texto principal
--ink-soft     #5B6072   texto secundario
--line         #E7E4DB   bordes
--primary      #4F46E5   índigo (confianza, moderno)
--primary-deep #3730A3
--accent       #FF6A4D   coral cálido (energía, humanidad, CTAs de acento)
--gold         #C9912E   premium/sello RRHH
--success      #16A34A   --warn #E0A82E   --danger #E5484D
```

**Modo foco "Escenario" (respuesta en directo + resultados)**
```
--bg #0E1116  --surface #161A22  --line #232838
--primary #6366F1 (con glow)  texto #ECEEF5
+ anillo de timer y "spotlight" como ahora
```

> El índigo + coral nos saca del "azul SaaS genérico" y aporta calidez humana
> (clave en coaching). El dorado se reserva para señales premium/RRHH.

> 🟡 **Decisión 3 (tuya):** personalidad del acento → **coral cálido**
> (humano/cercano), **dorado** (premium/ejecutivo) o **teal sobrio**.

### 3.3 Tipografía
- **Titulares — "Fraunces"** (serif suave, opsz): autoridad + calidez humana,
  diferencia frente a apps frías. Pesos 400/500/600.
- **UI y cuerpo — "Inter"**: legibilidad impecable en pantallas y datos.
- **Escala (1.25):** 13 · 14 · 16 · 18 · 20 · 25 · 31 · 39 · 49.
- Titulares grandes de escenario en Fraunces para el momento "spotlight".

### 3.4 Espaciado, radios, sombra
- **Grid 8pt**; escala 4/8/12/16/24/32/48/64.
- **Radios:** 10 (controles) · 16 (tarjetas) · 24 (héroes) · pill (chips).
- **Sombra suave por capas** (en claro): `0 1px 2px rgba(20,24,40,.06), 0 8px 24px rgba(20,24,40,.06)`.

### 3.5 Iconografía e ilustración
- **Iconos:** set lineal coherente (Phosphor/Lucide), trazo 1.75px, redondeado.
- **Ilustración:** sustituir las escenas SVG planas por **fotografía con
  tratamiento duotono índigo+papel** (momentos profesionales reales:
  consejo, 1:1, entrevista, cliente) → cohesión y profesionalismo inmediato.
  Cada **track** tiene una "portada" duotono propia.
- **Motivo de marca:** el "haz de luz / spotlight" recurrente como firma visual
  (en portadas de track, badges de racha, estados de éxito).

---

## 4. Wireframes (pantallas principales)

> Wireframes de baja fidelidad en texto; las notas indican intención. Tema claro
> salvo donde se indique "modo foco".

### 4.1 Onboarding (primer uso) — 3 toques
```
┌───────────────────────────────────────────────┐
│  ◐ Response                                     │
│                                                 │
│  Hagamos esto tuyo.  (Fraunces 31)              │
│                                                 │
│  1 ¿Quién eres?                                 │
│   ( ) Colaborador individual                    │
│   ( ) Mando / Manager                           │
│   ( ) Director / Ejecutivo                      │
│                                                 │
│  2 ¿Qué quieres mejorar primero?                │
│   [Liderazgo] [Conflicto] [Entrevistas]         │
│   [Bajo presión] [Autoconocimiento]             │
│                                                 │
│  3 ¿Vienes por tu cuenta o de tu empresa?       │
│   ( ) Por mi cuenta   ( ) Mi empresa (RRHH)     │
│                                                 │
│            [ Empezar →  ]                        │
└───────────────────────────────────────────────┘
```
→ Personaliza la home, el tono de ejemplos y (si RRHH) muestra programas.

### 4.2 Inicio / Dashboard (tema claro)
```
┌──────────────────────────────────────────────────────────────┐
│ ◐ Response     Inicio  Practicar  Programas  Progreso   ◑ Ana │
├──────────────────────────────────────────────────────────────┤
│  Hola, Ana — ¿lista para tu próximo momento?  (Fraunces)      │
│                                                                │
│  ┌───────────────┐  ┌───────────────────────────────────────┐ │
│  │ ⚡ REP RÁPIDO  │  │ ▶ CONTINÚA TU PROGRAMA                 │ │
│  │ Suéltate en   │  │ Presencia ejecutiva · Sesión 3/8      │ │
│  │ 2 minutos     │  │ [ ▓▓▓▓▓░░░ 38% ]        [ Seguir → ]   │ │
│  │ [Empezar]     │  └───────────────────────────────────────┘ │
│  └───────────────┘                                            │
│                                                                │
│  Para ti hoy   (recomendado por objetivo + nivel)             │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐                 │
│  │ [duotono]  │ │ [duotono]  │ │ [duotono]  │                 │
│  │ Te retan   │ │ Negociar   │ │ El consejo │                 │
│  │ ante cliente│ │ tu subida │ │ cuestiona… │                 │
│  │ Conflicto  │ │ Carrera    │ │ Liderazgo  │                 │
│  └────────────┘ └────────────┘ └────────────┘                 │
│                                                                │
│  Tu progreso  ◐ Racha 4 días  · Media 78%  · Foco: Presencia  │
│  [radar de competencias: Contenido/Presencia/Tiempo/…]        │
└──────────────────────────────────────────────────────────────┘
```
Cambios clave: dos velocidades arriba, recomendación por _situación_ con
portadas duotono, progreso con **radar** (más inspirador que 4 números).

### 4.3 Practicar (exploración de temas)
```
┌──────────────────────────────────────────────────────────────┐
│  Practicar                                  [🔍 Buscar]        │
│  Filtros:  Nivel ▾   Situación ▾   Tiempo ▾   Sector ▾         │
│                                                                │
│  Por situación  (chips horizontales, scroll)                  │
│  [Entrevista] [Consejo] [1:1] [Conflicto] [Cliente] [Crisis]  │
│                                                                │
│  ── Liderazgo y presencia ejecutiva ───────────  Ver todo →   │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐              │
│  │ portada │ │ portada │ │ portada │ │ portada │              │
│  │ escenario│ │ escenario│ │ …       │ │ …       │              │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘              │
│                                                                │
│  ── Conversaciones difíciles y conflicto ──────  Ver todo →   │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ …                         │
│                                                                │
│  ── Carrera y entrevistas ─────────────────────  Ver todo →   │
└──────────────────────────────────────────────────────────────┘
```
Navegación por **carriles temáticos** (estilo "categorías") + **chips de
situación** + **facetas**. Relevancia inmediata para ambos segmentos.

### 4.4 Sesión de coaching activa (MODO FOCO — oscuro)
```
┌──────────────────────────────────────────────────────────────┐   (oscuro)
│  ✕                                   Conflicto · Nivel Director │
│                                                                │
│            [  imagen/duotono a pantalla: sala de cliente  ]    │
│                                                                │
│   Tu papel: lideras al equipo, en plena reunión con cliente.  │
│                                                                │
│   "Un miembro de tu equipo acaba de cuestionar tu decisión    │
│    delante del cliente. La sala se queda en silencio…"        │
│            (Fraunces, grande, legible)                         │
│                                                                │
│   Lee con calma. Cuando estés listo:                          │
│              (●)  ▶  Empezar — 60s                             │
└──────────────────────────────────────────────────────────────┘
    → al pulsar play: anillo de timer + voz/texto (ya existe, pulido)
```

### 4.5 Resultados + coaching
```
┌──────────────────────────────────────────────────────────────┐
│   82%  Sólida            Respondiste en 23s/60s  · +4 rapidez │
│   ▓▓▓ Contenido 80  ▓▓ Presencia 75  ▓▓▓ Tiempo 90           │
│                                                                │
│   Lo que dijiste:  "…tu respuesta transcrita…"                │
│                                                                │
│   ✓ Lo que funcionó   ·  ⚠ Lo que faltó                        │
│   ✦ Tu respuesta, mejorada (recuadro destacado)               │
│   ★ Respuesta modelo de experto                                │
│   → Foco para la próxima                                       │
│                                                                │
│   [ ↻ Repetir ]   [ Siguiente → ]   [ Volver ]                │
└──────────────────────────────────────────────────────────────┘
```
(El contenido de resultados ya existe; aquí gana jerarquía, color y aire.)

### 4.6 Panel Equipo/RRHH (evolución del admin)
```
┌──────────────────────────────────────────────────────────────┐
│  Tu equipo                          [Asignar programa] [CSV]  │
│  Personas 12 · Sesiones 148 · Media 74%                       │
│                                                                │
│  [ Buscar persona ]   Ordenar: Actividad ▾                    │
│  ┌── Persona ──────────── Programa ─── Media ── Última ──┐    │
│  │ ◑ Carla M.   Presencia ejecutiva   81%   hoy     →    │    │
│  │ ◑ Luis R.    Conversaciones díf.   69%   ayer    →    │    │
│  └───────────────────────────────────────────────────────┘    │
│  (clic → resumen de la persona: radar, escenarios, coaching)  │
└──────────────────────────────────────────────────────────────┘
```

---

## 5. Flujos de usuario rediseñados

### 5.1 Individuo nuevo — "necesito ayuda con algo concreto"
```
Landing/login → Onboarding (3 toques) → Inicio
  → chip de situación "Conflicto" ó tarjeta recomendada
  → Escenario (modo foco) → ▶ 60s → Resultados+coaching → Repetir/Siguiente
```
**≤ 3 clics** desde entrar hasta estar practicando algo relevante.

### 5.2 Individuo recurrente — "quiero crecer"
```
Login → Inicio → "Continúa tu programa" → Sesión N → progreso (radar) sube
```

### 5.3 Ejecutivo enviado por RRHH
```
Invitación/login → Onboarding (marca "empresa") → Programa asignado visible
  → Sesión 1 → su avance se refleja en el panel de RRHH
```

### 5.4 Comprador RRHH
```
Login → Equipo → ver medias y actividad → Asignar programa → exportar CSV
```

---

## 6. Propuesta de valor visual (cómo "habla" cada segmento)

| Necesito comunicar… | Cómo, en la interfaz |
|---|---|
| **Accesible profesionalmente (RRHH)** | Programas estructurados, marcos citados (WAVE, 360), panel de equipo, radar de competencias, sello dorado "metodología", tono pulido y sobrio |
| **Accesible económicamente (individuo)** | "Practica todo lo que quieras", sin coach necesario, valor inmediato (rep rápido), tono cálido y motivador, cero jerga, primer logro en <2 min |
| **Confianza/seriedad** | Tipografía con autoridad, datos claros, consistencia, microcopys precisos |
| **Calidez/humanidad** | Acento coral, fotografía real (no iconos fríos), segunda persona, celebración mesurada del progreso |

La **misma UI adaptativa** sirve a ambos; el onboarding ajusta copy, ejemplos y
si se muestran "Programas/Equipo".

> 🟡 **Decisión 4 (tuya):** ¿UI única adaptativa (recomendado ahora) o crear ya
> un área separada "Para equipos/RRHH"?

---

## 7. Estrategia de contenido y ejemplos (anti-genérico)

Reemplazar escenarios abstractos por **momentos vívidos y reconocibles**,
etiquetados por segmento/nivel:

**Profesional joven (18-35)**
- "Primera vez presentando ante el comité de dirección."
- "Negociar tu primera subida de sueldo."
- "Un ingeniero senior tumba tu idea en el standup, delante de todos."

**Profesional establecido (35-55, liderazgo)**
- "El consejo cuestiona tu estrategia a mitad de presentación."
- "Despedir a alguien con 10 años de antigüedad."
- "Tu mejor persona amenaza con irse."

**RRHH / programas asignables**
- "Fundamentos de nuevo manager" · "Presencia ejecutiva" · "Conversaciones
  críticas" · "Entrevistar y ser entrevistado".

Cada escenario lleva **portada duotono** coherente con su track y etiquetas
(situación, nivel, tiempo, marco) para filtrado y relevancia.

---

## 8. Cómo cada cambio transforma la experiencia

| Cambio | Antes | Después | Impacto |
|---|---|---|---|
| IA por situación/tema | Filtros por dificultad | "Esto tengo delante" + tracks | Relevancia inmediata, menos fricción cognitiva |
| Tema claro + foco oscuro | Oscuro total | Cálido + spotlight solo al actuar | Confianza (RRHH) sin perder inmersión |
| Tipografía con carácter | Sans neutra | Serif humana + Inter | Profesional y cercano, diferenciado |
| Onboarding 3 toques | Aterrizaje frío | Home personalizada | "Esto es para mí" desde el clic 1 |
| Dos velocidades | Mezcladas | Rep rápido vs Programa | Sirve a "ayuda ya" y "crecer" |
| Ilustración duotono | SVG planos | Fotografía cohesiva | Profesionalismo percibido sube |
| Radar de competencias | 4 números | Mapa de progreso | Inspirador, sensación de avance |
| Panel Equipo | Lista admin | Dashboard RRHH | Desbloquea venta a empresas |

---

## 9. Decisiones clave para ti (antes de implementar)

1. **Modelo de navegación / IA:** ¿Situación al frente (recomendado), Tracks,
   Objetivo, o híbrido?
2. **Tono visual:** ¿Claro cálido + modo foco oscuro (recomendado), o mantener
   oscuro premium?
3. **Personalidad de marca / acento:** ¿Coral cálido (recomendado), dorado
   ejecutivo, o teal sobrio?
4. **Segmentos:** ¿UI única adaptativa por ahora (recomendado), o área RRHH
   separada ya?
5. **Alcance del primer sprint:** ¿Empezar por (a) sistema visual + Inicio, (b)
   reorganización de Practicar/IA, o (c) el modo foco de la sesión?

---

## 10. Plan de implementación sugerido (tras decidir)

- **Sprint 1 — Fundación visual:** tokens (color/tipografía/espaciado), tema
  claro + modo foco, componentes base (botón, tarjeta, chip, anillo, radar).
- **Sprint 2 — Inicio + Onboarding:** dashboard nuevo, 3 toques, dos velocidades.
- **Sprint 3 — Practicar + IA:** tracks, chips de situación, facetas, portadas.
- **Sprint 4 — Sesión foco + Resultados:** pulido del momento "spotlight".
- **Sprint 5 — Equipo/RRHH + contenido:** panel, ejemplos segmentados, duotonos.

> Todo es incremental sobre la base actual (React + TS): el core de práctica y
> evaluación se conserva; cambian capa visual, navegación y organización.
