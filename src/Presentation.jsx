import { useState, useEffect, useCallback, useRef } from "react";

const BRAND = "#6f93eb";
const BG    = "#0a0a14";

/* ─── HELPERS ────────────────────────────────────────────────── */
const GridBg = () => (
  <div style={{
    position: "absolute", inset: 0, pointerEvents: "none",
    backgroundImage: "linear-gradient(rgba(111,147,235,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(111,147,235,0.06) 1px, transparent 1px)",
    backgroundSize: "48px 48px"
  }} />
);

const GradText = ({ children }) => (
  <span style={{ background: "linear-gradient(135deg, #6f93eb, #a5bcf5)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
    {children}
  </span>
);

const Counter = ({ target, anim, suffix = "", color }) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!anim) { setVal(0); return; }
    const steps = 40, duration = 1400;
    let current = 0;
    const timer = setInterval(() => {
      current += target / steps;
      if (current >= target) { setVal(target); clearInterval(timer); }
      else setVal(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [anim, target]);
  return <span style={{ color }}>{val}{suffix}</span>;
};

const Eyebrow = ({ children, anim, delay = 0 }) => (
  <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "2px", color: BRAND, marginBottom: 14, fontFamily: "'DM Sans', sans-serif", opacity: anim ? 1 : 0, transform: anim ? "translateY(0)" : "translateY(20px)", transition: `all 0.5s ease ${delay}s` }}>
    {children}
  </div>
);

const SlideTitle = ({ children, anim, delay = 0.1, size = 44 }) => (
  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: size, fontWeight: 800, lineHeight: 1.15, color: "#fff", opacity: anim ? 1 : 0, transform: anim ? "translateY(0)" : "translateY(20px)", transition: `all 0.5s ease ${delay}s` }}>
    {children}
  </div>
);

/* ─── TRANSLATIONS ───────────────────────────────────────────── */
const i18n = {
  es: {
    nav: { prev: "← Anterior", next: "Siguiente →", hint: "← → navegar" },
    labels: ["Intro", "Problema", "Gaps", "Módulo", "Solución", "Colaborador", "Ruta", "Habilidades", "Objetivos", "Aprendizaje", "Revisión", "Confirmación", "Manager", "Cierre", "Gracias"],

    intro: {
      tag: "🏆 Huckathon 2026 · Producto",
      titleA: "Plan de ", titleB: "Carrera", titleC: "\nque realmente\nfunciona.",
      subtitle: "Un módulo que conecta las aspiraciones del colaborador con la visión del manager, en tiempo real.",
      meta: [{ label: "Módulo", value: "Career Path" }, { label: "Plataforma", value: "Humand" }, { label: "Año", value: "2026" }],
    },

    problem: {
      eyebrow: "El Problema", title: "El mercado está polarizado",
      left:  { icon: "📚", name: "Aprendizaje de Contenidos", desc: "Plataformas que proveen cursos, certificaciones y material de estudio. Foco en consumo de conocimiento.", pills: ["Coursera", "Degreed", "LinkedIn Learning"], color: "blue" },
      gap:   "❌ GAP\nno cubierto",
      right: { icon: "🤝", name: "Coaching Humano", desc: "Herramientas de coaching 1:1, sesiones con mentores y desarrollo liderado por personas.", pills: ["BetterUp", "Pathrise", "Lattice"], color: "green" },
    },

    gaps: {
      eyebrow: "Insights del Benchmark", title: "4 gaps que nadie está cubriendo",
      items: [
        { num: "Gap 01", title: "El empleado es usuario de segunda clase",   body: "Los productos B2B requieren configuración pesada por HR antes de que el colaborador pueda usarlos." },
        { num: "Gap 02", title: "Learning y carrera, mundos separados",       body: "El usuario aprende en un lado y gestiona su carrera en otro. Ninguna plataforma los integra con profundidad." },
        { num: "Gap 03", title: "IA solo para recomendar contenido",          body: "Casi nadie usa IA para ayudar al colaborador a reflexionar sobre su carrera o co-crear su propio plan." },
        { num: "Gap 04", title: "Sin seguimiento en tiempo real",             body: "Los planes de carrera son documentos estáticos. No hay visibilidad compartida entre colaborador y manager." },
      ],
    },

    module: {
      eyebrow: "Qué es el módulo", title: "El plan de carrera que realmente se usa.",
      subtitle: "Career Path es un módulo dentro de Humand donde cada colaborador construye su plan en 5 pasos estructurados.",
      steps: [
        { num: "01", icon: "🗺️", title: "Ruta profesional",  desc: "Define el tipo de crecimiento y el rol objetivo." },
        { num: "02", icon: "🎯", title: "Habilidades",        desc: "Identifica brechas entre el rol actual y el objetivo." },
        { num: "03", icon: "📋", title: "Objetivos",          desc: "Corto, mediano y largo plazo. Sugeridos y editables." },
        { num: "04", icon: "📚", title: "Aprendizaje",        desc: "Se integra con el módulo de cursos y los prioriza según tu plan de carrera." },
        { num: "05", icon: "✅", title: "Revisión y envío",   desc: "El colaborador envía al manager para aprobación." },
      ],
    },

    solution: {
      eyebrow: "La Solución", title: "Dos vistas. Un solo camino.",
      collab: {
        role: "Colaborador", title: "Diseñá tu propio camino",
        features: ["Mapa visual de carrera con niveles desbloqueables", "Objetivos a corto, mediano y largo plazo", "Seguimiento de skills técnicas y soft skills", "Envío del plan al manager para revisión", "Progreso en tiempo real visible para ambas partes"],
        levels: [{ label: "Junior\nL1", type: "done", text: "✓" }, { label: "Product\nDesigner", type: "current", text: "L2" }, { label: "Senior\nDesigner", type: "goal", text: "L3" }, { label: "Design\nLead", type: "locked", text: "🔒" }],
      },
      manager: {
        role: "Manager", title: "Acompañá el desarrollo de tu equipo",
        features: ["Vista unificada de todos los planes del equipo", "Aprobar o sugerir cambios al plan del colaborador", "Identificar brechas de skills en el equipo", "Alertas de planes sin revisar o vencidos", "Visibilidad del progreso real de cada persona"],
        team: [
          { name: "Luis Herrera", status: "Aprobado",    sc: "#86efac", sb: "rgba(34,197,94,0.15)",   rb: "rgba(34,197,94,0.08)",  rb2: "rgba(34,197,94,0.15)" },
          { name: "Ana García",   status: "En revisión", sc: "#fcd34d", sb: "rgba(245,158,11,0.12)", rb: "rgba(245,158,11,0.06)", rb2: "rgba(245,158,11,0.15)" },
          { name: "Carlos Ruiz",  status: "Sin plan",    sc: "rgba(255,255,255,0.35)", sb: "rgba(255,255,255,0.05)", rb: "rgba(255,255,255,0.03)", rb2: "rgba(255,255,255,0.06)" },
        ],
      },
    },

    collabView: {
      eyebrow: "Vista del Colaborador · Inicio", title: "Antes del plan: todo lo que vas a desbloquear.",
      subtitle: "La pantalla inicial muestra el contexto del colaborador — su rol actual, su antigüedad — y anticipa lo que va a poder construir. Un solo botón para empezar.",
      roleLabel: "CURRENT ROLE", roleName: "Product Designer", roleTeam: "Design Team", tenure: "2.5 yr tenure",
      unlockLabel: "LO QUE VAS A DESBLOQUEAR",
      unlockItems: ["Tu mapa de carrera personalizado", "Análisis de brechas de skills", "Objetivos de desarrollo claros", "Acciones recomendadas por rol"],
      emptyTitle: "Todavía no creaste tu plan de carrera",
      emptyDesc: "Definí tu próximo rol, identificá tus brechas de skills y trazá el camino para llegar ahí.",
      rolePill: "Rol actual: Product Designer",
      ctaBtn: "Crear mi plan de carrera →",
      ctaSub: "Tu manager podrá revisar y aprobar el plan una vez que lo envíes",
    },

    rutaView: {
      eyebrow: "Paso 1 · Ruta Profesional", title: "¿Crecer hacia arriba o hacia otro lado?",
      subtitle: "El colaborador elige entre crecimiento vertical (ascender dentro de su área) o movimiento lateral (explorar otro rol). También define la ruta específica, el tiempo estimado y el manager que va a revisar el plan.",
      headerTitle: "Crear plan de carrera", stepLabel: "Paso 1 de 5 · Ruta profesional",
      growthLabel: "TIPO DE CRECIMIENTO",
      vertical: { icon: "↗", title: "Crecimiento vertical", desc: "Ascender dentro de tu área actual" },
      lateral:  { icon: "⇄", title: "Movimiento lateral",   desc: "Explorar una área o rol diferente" },
      fields: [
        { label: "RUTA PROFESIONAL",       placeholder: "Seleccionar ruta..." },
        { label: "DURACIÓN ESTIMADA",      placeholder: "Seleccionar duración..." },
        { label: "MANAGER / LÍDER DIRECTO", placeholder: "Seleccionar manager..." },
        { label: "DESCRIPCIÓN (opcional)", placeholder: "¿Por qué querés alcanzar este rol? ¿Qué te motiva?" },
      ],
    },

    habilidadesView: {
      eyebrow: "Paso 2 · Habilidades", title: "Las brechas, claras desde el principio.",
      subtitle: "El sistema muestra automáticamente las habilidades técnicas y blandas requeridas para el rol objetivo. El colaborador marca cuáles ya tiene — las que faltan se convierten en el eje del plan. También puede agregar habilidades propias.",
      stepLabel: "Paso 2 de 5 · Habilidades", roleTag: "Senior Designer",
      hardLabel: "HABILIDADES TÉCNICAS REQUERIDAS",
      hardSkills: [
        { name: "Visual Design",   checked: true  },
        { name: "Prototyping",     checked: false },
        { name: "UX Research",     checked: true  },
        { name: "Design Systems",  checked: true  },
        { name: "Figma Advanced",  checked: false },
        { name: "Design Critique", checked: true  },
      ],
      softLabel: "SOFT SKILLS",
      softSkills: [
        { name: "Comunicación efectiva",    checked: true  },
        { name: "Trabajo en equipo",        checked: true  },
        { name: "Liderazgo",                checked: false },
        { name: "Resolución de conflictos", checked: true  },
        { name: "Pensamiento crítico",      checked: true  },
        { name: "Empatía",                  checked: false },
      ],
      gapHardLabel: "HARD (4)", gapSoftLabel: "SOFT (4)",
      gapHard: ["Visual Design ×", "UX Research ×", "Design Systems ×", "Design Critique ×"],
      gapSoft: ["Comunicación efectiva ×", "Trabajo en equipo ×", "Resolución de conflictos ×", "Pensamiento crítico ×"],
    },

    objetivosView: {
      eyebrow: "Paso 3 · Objetivos", title: "Corto, mediano y largo plazo. Conectados.",
      subtitle: "La IA sugiere objetivos en tres horizontes temporales según la ruta elegida. El colaborador puede editarlos, eliminarlos o agregar los suyos. El plan siempre es del colaborador — las sugerencias son un punto de partida.",
      stepLabel: "Paso 3 de 5 · Objetivos",
      devLabel: "OBJETIVOS DE DESARROLLO", devSub: "Sugeridos según tu ruta — editá, eliminá o agregá los tuyos",
      goals: [
        { horizonLabel: "CORTO PLAZO",   tag: "Corto plazo",   tagColor: "#22c55e",  tagBg: "rgba(34,197,94,0.15)",   text: "Liderar al menos 1 proyecto de diseño de principio a fin" },
        { horizonLabel: "MEDIANO PLAZO", tag: "Mediano plazo", tagColor: "#f59e0b",  tagBg: "rgba(245,158,11,0.15)",  text: "Obtener una certificación en Design Systems o UX Research" },
        { horizonLabel: "LARGO PLAZO",   tag: "Largo plazo",   tagColor: "#a78bfa",  tagBg: "rgba(167,139,250,0.15)", text: "Alcanzar el nivel Senior con aprobación del manager y HR" },
      ],
      addLabel: "AGREGAR OBJETIVO", addPlaceholder: "Describí el objetivo...", addBtn: "+ Agregar",
    },

    aprendizajeView: {
      eyebrow: "Paso 4 · Aprendizaje", title: "Los recursos correctos, en el orden correcto.",
      subtitle: "El módulo de cursos potencia y integra tu plan de carrera.",
      stepLabel: "Paso 4 de 5 · Aprendizaje",
      listTitle: "Cursos disponibles en Humand", listSub: "Ordenados por prioridad según tu ruta",
      filters: ["Esencial", "Recomendado", "Opcional"],
      courses: [
        { type: "CURSO",         icon: "📘", name: "Stakeholder Management Fundamentals", source: "LinkedIn Learning · 4h",  tag: "Esencial",     tc: "#22c55e",  tb: "rgba(34,197,94,0.15)"   },
        { type: "CERTIFICACIÓN", icon: "🏅", name: "Advanced Design Systems",             source: "Figma Academy · 12h",     tag: "Recomendado",  tc: BRAND,      tb: "rgba(111,147,235,0.15)" },
        { type: "CURSO",         icon: "📘", name: "UX Research Methods",                 source: "Humand Learn · 8h",       tag: "Recomendado",  tc: BRAND,      tb: "rgba(111,147,235,0.15)" },
        { type: "WORKSHOP",      icon: "👥", name: "Cross-functional Collaboration",      source: "Humand Learn · 2h",       tag: "Recomendado",  tc: BRAND,      tb: "rgba(111,147,235,0.15)" },
        { type: "CURSO",         icon: "📘", name: "Comunicación Ejecutiva",              source: "Humand Learn · 5h",       tag: "Recomendado",  tc: BRAND,      tb: "rgba(111,147,235,0.15)" },
        { type: "WORKSHOP",      icon: "👥", name: "Design Critique & Feedback",          source: "Humand Learn · 3h",       tag: "Opcional",     tc: "rgba(255,255,255,0.3)", tb: "rgba(255,255,255,0.06)" },
      ],
    },

    revisionView: {
      eyebrow: "Paso 5 · Revisión y Envío", title: "Un plan completo antes de compartirlo.",
      subtitle: "El colaborador ve el resumen completo — ruta, habilidades, objetivos — antes de enviarlo. El manager recibe una notificación y puede aprobarlo o sugerir cambios con un comentario.",
      stepLabel: "Paso 5 de 5 · Revisión",
      alertText: "Todo listo — revisá tu plan antes de enviarlo",
      alertSub: "Se le notificará a María González para revisarlo y aprobarlo.",
      routeLabel: "RUTA PROFESIONAL", routeTag: "Vertical", routeRole: "Senior Designer", routeDur: "Duración: 6 meses", routeMgr: "Manager: María González",
      goalsLabel: "OBJETIVOS (3)",
      goals: [
        { tag: "Corto",   color: "#22c55e", text: "Liderar 1 proyecto de diseño" },
        { tag: "Mediano", color: "#f59e0b", text: "Certificación Design Systems"  },
        { tag: "Largo",   color: "#a78bfa", text: "Alcanzar nivel Senior"         },
      ],
      skillsLabel: "SKILLS (6)",
      hardLabel: "Hard skills", hardSkills: ["Prototyping", "Visual Design", "Figma Advanced"],
      softLabel: "Soft skills", softSkills: ["Pensamiento crítico", "Comunicación efectiva", "Mentoría"],
      sendBtn: "Enviar plan ✓",
    },

    confirmView: {
      eyebrow: "Confirmación de Envío", title: "El plan enviado. El manager en el loop.",
      subtitle: "Una vez enviado, el colaborador recibe confirmación y sabe que su manager fue notificado. El plan queda compartido y visible para ambos. El colaborador recibirá una notificación cuando el manager lo revise.",
      successIcon: "✓", successTitle: "¡Plan enviado con éxito!",
      successDesc: "Tu plan de carrera fue enviado para revisión.\nTu manager recibirá una notificación y podrá aprobarlo o sugerirte cambios.",
      ctaBtn: "Ver mi plan de carrera",
      ctaSub: "Recibirás una notificación cuando tu manager lo revise",
    },

    managerView: {
      eyebrow: "Vista del Manager", title: "El manager ve, acompaña y aprueba.",
      subtitle: "El manager tiene una vista de su equipo completo con el estado de cada plan. Puede ver el mapa de carrera de cada persona, revisar habilidades y objetivos, aprobar el plan o sugerir cambios con un comentario.",
      teamLabel: "Mi equipo", reportsLabel: "5 reportes",
      team: [
        { initials: "AG", color: "#6f93eb",  bg: "rgba(111,147,235,0.2)", name: "Ana García",   role: "Product Designer",   status: "En revisión", sc: "#fcd34d", sb: "rgba(245,158,11,0.15)" },
        { initials: "LH", color: "#22c55e",  bg: "rgba(34,197,94,0.2)",  name: "Luis Herrera", role: "Frontend Engineer",  status: "Aprobado",    sc: "#86efac", sb: "rgba(34,197,94,0.15)"  },
        { initials: "MT", color: "#f59e0b",  bg: "rgba(245,158,11,0.2)", name: "Mia Torres",   role: "UX Researcher",     status: "En revisión", sc: "#fcd34d", sb: "rgba(245,158,11,0.15)" },
        { initials: "CR", color: "#f87171",  bg: "rgba(248,113,113,0.2)",name: "Carlos Ruiz",  role: "Backend Engineer",  status: "Sin plan",    sc: "rgba(255,255,255,0.35)", sb: "rgba(255,255,255,0.06)" },
        { initials: "SL", color: "#a78bfa",  bg: "rgba(167,139,250,0.2)",name: "Sara López",   role: "Data Analyst",      status: "Sin plan",    sc: "rgba(255,255,255,0.35)", sb: "rgba(255,255,255,0.06)" },
      ],
      alertLabel: "Ana García envió un plan para revisión",
      alertSub: "Senior Designer · 15 Mar 2026",
      approveBtn: "✓ Aprobar", changesBtn: "↩ Cambios",
      mapTitle: "Ana García — Mapa de carrera", mapSub: "Crecimiento vertical · 1 año",
      nodes: [
        { label: "Junior\nDesigner",   tag: "",      type: "done"    },
        { label: "Product\nDesigner",  tag: "Aquí",  type: "current" },
        { label: "Senior\nDesigner",   tag: "Meta",  type: "goal"    },
        { label: "Design\nLead",       tag: "",      type: "locked"  },
      ],
      suggestLabel: "SUGERIR CAMBIOS", placeholder: "Compartí tu feedback sobre el plan de Ana...", sendBtn: "Enviar comentario",
    },

    impact: {
      eyebrow: "Impacto en la organización", title: "Por qué esto importa para la empresa.",
      stats: [
        { num: "43%",   numColor: "#22c55e", label: "menos intención de renuncia",    sub: "en colaboradores con plan activo", countTo: 43, suffix: "%" },
        { num: "3×",    numColor: BRAND,     label: "más impacto del reconocimiento", sub: "cuando es inmediato vs. diferido" },
        { num: "+24pp", numColor: BRAND,     label: "más retención a 12 meses",       sub: "91% con plan vs. 67% sin plan" },
        { num: "antes", numColor: "#a78bfa", label: "movilidad interna primero",      sub: "candidatos identificados antes de buscar afuera" },
      ],
      bullets: [
        "Performance reviews con datos reales, no con memoria",
        "Planificación de sucesión basada en perfiles, no en intuición",
        "Movilidad interna inteligente antes de contratar afuera",
        "Cultura de desarrollo que retiene sin aumentar costos",
      ],
    },

    diff: {
      eyebrow: "Diferenciador", title: "¿Por qué Humand?",
      them: { label: "El mercado hoy",       items: ["HR configura, empleado consume", "Planes estáticos en documentos", "Learning separado del desarrollo", "Sin visibilidad del manager", "IA solo recomienda cursos"] },
      us:   { label: "Humand Career Path",   items: ["El colaborador es el protagonista", "Seguimiento en tiempo real", "Skills + objetivos integrados", "Loop manager ↔ colaborador", "Dentro del contexto organizacional"] },
    },

    closing: {
      tag: "🚀 Propuesta de Valor",
      titleA: "Tu carrera,\n", titleB: "tu plan", titleC: ",\ntu ritmo.",
      tagline: "El primer módulo que conecta las aspiraciones del colaborador\ncon la visión del manager, en un solo lugar y en tiempo real.",
      stats: [{ num: "8", label: "Productos analizados" }, { num: "5", label: "Gaps identificados" }, { num: "2", label: "Vistas conectadas" }],
      demoLabel: "Probá la demo",    demoSub: "Explorá la plataforma en vivo →",
      videoLabel: "Video explicativo", videoSub: "Mirá cómo funciona →",
    },

    team: {
      eyebrow: "Nuestro Equipo", title: "Las personas detrás de Career Path",
      subtitle: "Un equipo multidisciplinario apasionado por el desarrollo del talento",
      people: [
        { name: "Angelo\nSegura",   initials: "AS", color: "#6f93eb", photo: "/angelo.jpg" },
        { name: "Sofia\nCarro",     initials: "SC", color: "#22c55e", photo: "/sofia.png"  },
        { name: "Olivia\nCavallo",  initials: "OC", color: "#a78bfa", photo: "/olivia.jpg" },
        { name: "Julian\nSaubidet", initials: "JS", color: "#f59e0b", photo: "/julian.jpg" },
      ],
    },

    thanks: {
      title: "¡Muchas gracias!",
      body: "¿Preguntas? Estamos para ayudarte a transformar el desarrollo profesional de tu organización.",
      names: "Angelo · Sofia · Olivia · Julian",
      feedbackBtn: "Danos tu feedback",
    },
  },

  en: {
    nav: { prev: "← Previous", next: "Next →", hint: "← → navigate" },
    labels: ["Intro", "Problem", "Gaps", "Module", "Solution", "Employee", "Path", "Skills", "Goals", "Learning", "Review", "Confirmed", "Manager", "Closing", "Thanks"],

    intro: {
      tag: "🏆 Hackathon 2026 · Product",
      titleA: "Career ", titleB: "Path", titleC: "\nthat actually\nworks.",
      subtitle: "A module that connects employee aspirations with the manager's vision, in real time.",
      meta: [{ label: "Module", value: "Career Path" }, { label: "Platform", value: "Humand" }, { label: "Year", value: "2026" }],
    },

    problem: {
      eyebrow: "The Problem", title: "The market is polarized",
      left:  { icon: "📚", name: "Content Learning",  desc: "Platforms that provide courses, certifications and study material. Focused on knowledge consumption.", pills: ["Coursera", "Degreed", "LinkedIn Learning"], color: "blue" },
      gap:   "❌ GAP\nnot covered",
      right: { icon: "🤝", name: "Human Coaching", desc: "1:1 coaching tools, mentor sessions and people-led development.", pills: ["BetterUp", "Pathrise", "Lattice"], color: "green" },
    },

    gaps: {
      eyebrow: "Benchmark Insights", title: "4 gaps nobody is covering",
      items: [
        { num: "Gap 01", title: "Employee is a second-class user",     body: "B2B products require heavy HR configuration before the employee can use them." },
        { num: "Gap 02", title: "Learning and career, separate worlds", body: "Users learn in one place and manage their career in another. No platform integrates them deeply." },
        { num: "Gap 03", title: "AI only for content recommendations", body: "Almost nobody uses AI to help employees reflect on their career or co-create their own plan." },
        { num: "Gap 04", title: "No real-time tracking",               body: "Career plans are static documents. No shared visibility between employee and manager." },
      ],
    },

    module: {
      eyebrow: "What is the module", title: "The career plan that actually gets used.",
      subtitle: "Career Path is a module within Humand where each employee builds their plan in 5 structured steps.",
      steps: [
        { num: "01", icon: "🗺️", title: "Career path",      desc: "Defines the type of growth and target role." },
        { num: "02", icon: "🎯", title: "Skills",            desc: "Identifies gaps between current and target role." },
        { num: "03", icon: "📋", title: "Goals",             desc: "Short, medium and long-term. AI-suggested and editable." },
        { num: "04", icon: "📚", title: "Learning",          desc: "Integrates with the course module and prioritizes them according to your career plan." },
        { num: "05", icon: "✅", title: "Review & submit",   desc: "Employee sends plan to manager for approval." },
      ],
    },

    solution: {
      eyebrow: "The Solution", title: "Two views. One path.",
      collab: {
        role: "Employee", title: "Design your own path",
        features: ["Visual career map with unlockable levels", "Short, medium and long-term goals", "Technical and soft skill tracking", "Send plan to manager for review", "Real-time progress visible to both parties"],
        levels: [{ label: "Junior\nL1", type: "done", text: "✓" }, { label: "Product\nDesigner", type: "current", text: "L2" }, { label: "Senior\nDesigner", type: "goal", text: "L3" }, { label: "Design\nLead", type: "locked", text: "🔒" }],
      },
      manager: {
        role: "Manager", title: "Support your team's development",
        features: ["Unified view of all team plans", "Approve or suggest changes to the employee's plan", "Identify skill gaps across the team", "Alerts for unreviewed or overdue plans", "Visibility of each person's real progress"],
        team: [
          { name: "Luis Herrera", status: "Approved",     sc: "#86efac", sb: "rgba(34,197,94,0.15)",   rb: "rgba(34,197,94,0.08)",  rb2: "rgba(34,197,94,0.15)" },
          { name: "Ana García",   status: "Under review", sc: "#fcd34d", sb: "rgba(245,158,11,0.12)", rb: "rgba(245,158,11,0.06)", rb2: "rgba(245,158,11,0.15)" },
          { name: "Carlos Ruiz",  status: "No plan",      sc: "rgba(255,255,255,0.35)", sb: "rgba(255,255,255,0.05)", rb: "rgba(255,255,255,0.03)", rb2: "rgba(255,255,255,0.06)" },
        ],
      },
    },

    collabView: {
      eyebrow: "Employee View · Start", title: "Before the plan: everything you're about to unlock.",
      subtitle: "The initial screen shows the employee's context — their current role, their tenure — and previews what they'll be able to build. One button to get started.",
      roleLabel: "CURRENT ROLE", roleName: "Product Designer", roleTeam: "Design Team", tenure: "2.5 yr tenure",
      unlockLabel: "WHAT YOU WILL UNLOCK",
      unlockItems: ["Your personalized career map", "Skills gap analysis", "Clear development goals", "Role-based recommended actions"],
      emptyTitle: "You haven't created your career plan yet",
      emptyDesc: "Define your next role, identify your skills gaps and map out the path to get there.",
      rolePill: "Current role: Product Designer",
      ctaBtn: "Create my career plan →",
      ctaSub: "Your manager will be able to review and approve the plan once you submit it",
    },

    rutaView: {
      eyebrow: "Step 1 · Career Path", title: "Grow up or grow sideways?",
      subtitle: "The employee chooses between vertical growth (advancing within their area) or lateral movement (exploring another role). They also define the specific path, estimated time and the manager who will review the plan.",
      headerTitle: "Create career plan", stepLabel: "Step 1 of 5 · Career path",
      growthLabel: "GROWTH TYPE",
      vertical: { icon: "↗", title: "Vertical growth",    desc: "Advance within your current area" },
      lateral:  { icon: "⇄", title: "Lateral movement",  desc: "Explore a different area or role" },
      fields: [
        { label: "CAREER PATH",          placeholder: "Select path..." },
        { label: "ESTIMATED DURATION",   placeholder: "Select duration..." },
        { label: "MANAGER / TEAM LEAD",  placeholder: "Select manager..." },
        { label: "DESCRIPTION (optional)", placeholder: "Why do you want to reach this role? What motivates you?" },
      ],
    },

    habilidadesView: {
      eyebrow: "Step 2 · Skills", title: "Gaps, clear from the start.",
      subtitle: "The system automatically shows the technical and soft skills required for the target role. The employee marks which ones they already have — the missing ones become the backbone of the plan.",
      stepLabel: "Step 2 of 5 · Skills", roleTag: "Senior Designer",
      hardLabel: "REQUIRED TECHNICAL SKILLS",
      hardSkills: [
        { name: "Visual Design",   checked: true  },
        { name: "Prototyping",     checked: false },
        { name: "UX Research",     checked: true  },
        { name: "Design Systems",  checked: true  },
        { name: "Figma Advanced",  checked: false },
        { name: "Design Critique", checked: true  },
      ],
      softLabel: "SOFT SKILLS",
      softSkills: [
        { name: "Effective Communication", checked: true  },
        { name: "Teamwork",                checked: true  },
        { name: "Leadership",              checked: false },
        { name: "Conflict Resolution",     checked: true  },
        { name: "Critical Thinking",       checked: true  },
        { name: "Empathy",                 checked: false },
      ],
      gapHardLabel: "HARD (4)", gapSoftLabel: "SOFT (4)",
      gapHard: ["Visual Design ×", "UX Research ×", "Design Systems ×", "Design Critique ×"],
      gapSoft: ["Effective Communication ×", "Teamwork ×", "Conflict Resolution ×", "Critical Thinking ×"],
    },

    objetivosView: {
      eyebrow: "Step 3 · Goals", title: "Short, medium and long-term. Connected.",
      subtitle: "AI suggests goals across three time horizons based on the chosen path. The employee can edit, delete or add their own. The plan always belongs to the employee — suggestions are just a starting point.",
      stepLabel: "Step 3 of 5 · Goals",
      devLabel: "DEVELOPMENT GOALS", devSub: "AI-suggested based on your path — edit, delete or add your own",
      goals: [
        { horizonLabel: "SHORT TERM",  tag: "Short term",  tagColor: "#22c55e",  tagBg: "rgba(34,197,94,0.15)",   text: "Lead at least 1 design project end to end" },
        { horizonLabel: "MEDIUM TERM", tag: "Medium term", tagColor: "#f59e0b",  tagBg: "rgba(245,158,11,0.15)",  text: "Get certified in Design Systems or UX Research" },
        { horizonLabel: "LONG TERM",   tag: "Long term",   tagColor: "#a78bfa",  tagBg: "rgba(167,139,250,0.15)", text: "Reach Senior level with manager and HR approval" },
      ],
      addLabel: "ADD GOAL", addPlaceholder: "Describe the goal...", addBtn: "+ Add",
    },

    aprendizajeView: {
      eyebrow: "Step 4 · Learning", title: "The right resources, in the right order.",
      subtitle: "The course module powers and integrates your career plan.",
      stepLabel: "Step 4 of 5 · Learning",
      listTitle: "Available courses in Humand", listSub: "Sorted by priority based on your path",
      filters: ["Essential", "Recommended", "Optional"],
      courses: [
        { type: "COURSE",          icon: "📘", name: "Stakeholder Management Fundamentals", source: "LinkedIn Learning · 4h",  tag: "Essential",    tc: "#22c55e",  tb: "rgba(34,197,94,0.15)"   },
        { type: "CERTIFICATION",   icon: "🏅", name: "Advanced Design Systems",             source: "Figma Academy · 12h",     tag: "Recommended",  tc: BRAND,      tb: "rgba(111,147,235,0.15)" },
        { type: "COURSE",          icon: "📘", name: "UX Research Methods",                 source: "Humand Learn · 8h",       tag: "Recommended",  tc: BRAND,      tb: "rgba(111,147,235,0.15)" },
        { type: "WORKSHOP",        icon: "👥", name: "Cross-functional Collaboration",      source: "Humand Learn · 2h",       tag: "Recommended",  tc: BRAND,      tb: "rgba(111,147,235,0.15)" },
        { type: "COURSE",          icon: "📘", name: "Executive Communication",             source: "Humand Learn · 5h",       tag: "Recommended",  tc: BRAND,      tb: "rgba(111,147,235,0.15)" },
        { type: "WORKSHOP",        icon: "👥", name: "Design Critique & Feedback",          source: "Humand Learn · 3h",       tag: "Optional",     tc: "rgba(255,255,255,0.3)", tb: "rgba(255,255,255,0.06)" },
      ],
    },

    revisionView: {
      eyebrow: "Step 5 · Review & Submit", title: "A complete plan before sharing it.",
      subtitle: "The employee sees the full summary — path, skills, goals — before submitting. The manager gets a notification and can approve it or suggest changes with a comment.",
      stepLabel: "Step 5 of 5 · Review",
      alertText: "All set — review your plan before submitting",
      alertSub: "María González will be notified to review and approve it.",
      routeLabel: "CAREER PATH", routeTag: "Vertical", routeRole: "Senior Designer", routeDur: "Duration: 6 months", routeMgr: "Manager: María González",
      goalsLabel: "GOALS (3)",
      goals: [
        { tag: "Short",  color: "#22c55e", text: "Lead 1 design project"       },
        { tag: "Medium", color: "#f59e0b", text: "Design Systems certification" },
        { tag: "Long",   color: "#a78bfa", text: "Reach Senior level"           },
      ],
      skillsLabel: "SKILLS (6)",
      hardLabel: "Hard skills", hardSkills: ["Prototyping", "Visual Design", "Figma Advanced"],
      softLabel: "Soft skills", softSkills: ["Critical Thinking", "Effective Communication", "Mentoring"],
      sendBtn: "Submit plan ✓",
    },

    confirmView: {
      eyebrow: "Submission Confirmed", title: "Plan submitted. Manager in the loop.",
      subtitle: "Once submitted, the employee gets confirmation that their manager was notified. The plan is shared and visible to both. The employee will get a notification when the manager reviews it.",
      successIcon: "✓", successTitle: "Plan successfully submitted!",
      successDesc: "Your career plan was sent for review.\nYour manager will receive a notification and can approve it or suggest changes.",
      ctaBtn: "View my career plan",
      ctaSub: "You'll get a notification when your manager reviews it",
    },

    managerView: {
      eyebrow: "Manager View", title: "The manager sees, supports and approves.",
      subtitle: "The manager has a complete view of their team and every plan's status. They can see each person's career map, review skills and goals, approve the plan or suggest changes with a comment.",
      teamLabel: "My team", reportsLabel: "5 reports",
      team: [
        { initials: "AG", color: "#6f93eb",  bg: "rgba(111,147,235,0.2)", name: "Ana García",   role: "Product Designer",   status: "Under review", sc: "#fcd34d", sb: "rgba(245,158,11,0.15)" },
        { initials: "LH", color: "#22c55e",  bg: "rgba(34,197,94,0.2)",  name: "Luis Herrera", role: "Frontend Engineer",  status: "Approved",     sc: "#86efac", sb: "rgba(34,197,94,0.15)"  },
        { initials: "MT", color: "#f59e0b",  bg: "rgba(245,158,11,0.2)", name: "Mia Torres",   role: "UX Researcher",      status: "Under review", sc: "#fcd34d", sb: "rgba(245,158,11,0.15)" },
        { initials: "CR", color: "#f87171",  bg: "rgba(248,113,113,0.2)",name: "Carlos Ruiz",  role: "Backend Engineer",   status: "No plan",      sc: "rgba(255,255,255,0.35)", sb: "rgba(255,255,255,0.06)" },
        { initials: "SL", color: "#a78bfa",  bg: "rgba(167,139,250,0.2)",name: "Sara López",   role: "Data Analyst",       status: "No plan",      sc: "rgba(255,255,255,0.35)", sb: "rgba(255,255,255,0.06)" },
      ],
      alertLabel: "Ana García submitted a plan for review",
      alertSub: "Senior Designer · 15 Mar 2026",
      approveBtn: "✓ Approve", changesBtn: "↩ Changes",
      mapTitle: "Ana García — Career map", mapSub: "Vertical growth · 1 year",
      nodes: [
        { label: "Junior\nDesigner",   tag: "",      type: "done"    },
        { label: "Product\nDesigner",  tag: "Here",  type: "current" },
        { label: "Senior\nDesigner",   tag: "Goal",  type: "goal"    },
        { label: "Design\nLead",       tag: "",      type: "locked"  },
      ],
      suggestLabel: "SUGGEST CHANGES", placeholder: "Share your feedback on Ana's plan...", sendBtn: "Send comment",
    },

    impact: {
      eyebrow: "Impact on the organization", title: "Why this matters for the business.",
      stats: [
        { num: "43%",   numColor: "#22c55e", label: "less intent to quit",          sub: "among employees with an active plan", countTo: 43, suffix: "%" },
        { num: "3×",    numColor: BRAND,     label: "more impact from recognition", sub: "when immediate vs. delayed" },
        { num: "+24pp", numColor: BRAND,     label: "more 12-month retention",      sub: "91% with plan vs. 67% without" },
        { num: "before",numColor: "#a78bfa", label: "internal mobility first",      sub: "candidates identified before looking outside" },
      ],
      bullets: [
        "Performance reviews with real data, not memory",
        "Succession planning based on profiles, not intuition",
        "Smart internal mobility before hiring outside",
        "Development culture that retains without raising costs",
      ],
    },

    diff: {
      eyebrow: "Differentiator", title: "Why Humand?",
      them: { label: "The market today",     items: ["HR configures, employee consumes", "Static plans in documents", "Learning separate from development", "No manager visibility", "AI only recommends courses"] },
      us:   { label: "Humand Career Path",   items: ["Employee is the protagonist", "Real-time tracking", "Skills + objectives integrated", "Manager ↔ employee loop", "Within organizational context"] },
    },

    closing: {
      tag: "🚀 Value Proposition",
      titleA: "Your career,\n", titleB: "your plan", titleC: ",\nyour pace.",
      tagline: "The first module that connects employee aspirations\nwith the manager's vision, in one place and in real time.",
      stats: [{ num: "8", label: "Products analyzed" }, { num: "5", label: "Gaps identified" }, { num: "2", label: "Connected views" }],
      demoLabel: "Try the demo",      demoSub: "Explore the platform live →",
      videoLabel: "Explainer video",  videoSub: "See how it works →",
    },

    team: {
      eyebrow: "Our Team", title: "The people behind Career Path",
      subtitle: "A multidisciplinary team passionate about talent development",
      people: [
        { name: "Angelo\nSegura",   initials: "AS", color: "#6f93eb", photo: "/angelo.jpg" },
        { name: "Sofia\nCarro",     initials: "SC", color: "#22c55e", photo: "/sofia.png"  },
        { name: "Olivia\nCavallo",  initials: "OC", color: "#a78bfa", photo: "/olivia.jpg" },
        { name: "Julian\nSaubidet", initials: "JS", color: "#f59e0b", photo: "/julian.jpg" },
      ],
    },

    thanks: {
      title: "Thank you!",
      body: "Questions? We're here to help you transform professional development in your organization.",
      names: "Angelo · Sofia · Olivia · Julian",
      feedbackBtn: "Give us feedback",
    },
  },
};

/* ─── NODE STYLES (path map) ─────────────────────────────────── */
const nodeStyle = {
  done:    { background: "rgba(34,197,94,0.2)",    border: "2px solid #22c55e",                    color: "#22c55e" },
  current: { background: "rgba(111,147,235,0.2)",  border: "2px solid #6f93eb",                    color: "#6f93eb" },
  goal:    { background: "rgba(111,147,235,0.08)", border: "2px dashed rgba(111,147,235,0.4)",      color: "rgba(255,255,255,0.4)" },
  locked:  { background: "rgba(255,255,255,0.04)", border: "2px solid rgba(255,255,255,0.1)",       color: "rgba(255,255,255,0.2)" },
};
const lineColor = { done: "#22c55e", current: "#6f93eb", normal: "rgba(255,255,255,0.1)" };

/* ─── PILL STYLE ─────────────────────────────────────────────── */
const pillStyle = (color) => color === "blue"
  ? { background: "rgba(111,147,235,0.15)", color: "#a5bcf5",  border: "1px solid rgba(111,147,235,0.2)" }
  : { background: "rgba(34,197,94,0.1)",    color: "#86efac",  border: "1px solid rgba(34,197,94,0.2)"  };

/* ─── SLIDE RENDERERS ────────────────────────────────────────── */
const slides = [

  /* 0 ── INTRO */
  { label: "Intro", render: (anim, t) => {
    const c = t.intro;
    return (
      <div style={{ height: "100%", background: "radial-gradient(ellipse at 30% 50%, #1a2a5e 0%, #0a0a14 60%)", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center", padding: 60 }}>
        <GridBg />
        <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(111,147,235,0.15) 0%, transparent 70%)", top: "50%", left: "30%", transform: "translate(-50%,-50%)", animation: "pulse-glow 4s ease-in-out infinite" }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 900 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(111,147,235,0.15)", border: "1px solid rgba(111,147,235,0.3)", borderRadius: 999, padding: "6px 16px", fontSize: 12, fontWeight: 500, color: BRAND, marginBottom: 32, opacity: anim ? 1 : 0, transform: anim ? "translateY(0)" : "translateY(24px)", transition: "all 0.6s ease" }}>{c.tag}</div>
          <h1 style={{ fontFamily: "'Inter', sans-serif", fontSize: 68, fontWeight: 800, lineHeight: 1.1, marginBottom: 24, color: "#fff", whiteSpace: "pre-line", opacity: anim ? 1 : 0, transform: anim ? "translateY(0)" : "translateY(24px)", transition: "all 0.6s ease 0.15s" }}>
            {c.titleA}<GradText>{c.titleB}</GradText>{c.titleC}
          </h1>
          <p style={{ fontSize: 19, color: "rgba(255,255,255,0.6)", maxWidth: 560, lineHeight: 1.6, opacity: anim ? 1 : 0, transform: anim ? "translateY(0)" : "translateY(24px)", transition: "all 0.6s ease 0.3s" }}>{c.subtitle}</p>
          <div style={{ marginTop: 48, display: "flex", gap: 32, opacity: anim ? 1 : 0, transform: anim ? "translateY(0)" : "translateY(24px)", transition: "all 0.6s ease 0.45s" }}>
            {c.meta.map((m, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "1.5px", color: "rgba(255,255,255,0.35)" }}>{m.label}</span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>{m.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }},

  /* 1 ── PROBLEMA */
  { label: "Problema", render: (anim, t) => {
    const c = t.problem;
    const CardSide = ({ side, dir, delay }) => (
      <div style={{ flex: 1, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 28, opacity: anim ? 1 : 0, transform: anim ? "translateX(0)" : `translateX(${dir})`, transition: `all 0.6s ease ${delay}s` }}>
        <div style={{ width: 48, height: 48, borderRadius: 12, background: side.color === "blue" ? "rgba(111,147,235,0.15)" : "rgba(34,197,94,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, marginBottom: 14 }}>{side.icon}</div>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 19, fontWeight: 700, marginBottom: 8, color: "#fff" }}>{side.name}</div>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, marginBottom: 18 }}>{side.desc}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {side.pills.map((p, i) => <span key={i} style={{ padding: "4px 12px", borderRadius: 999, fontSize: 12, fontWeight: 500, ...pillStyle(side.color) }}>{p}</span>)}
        </div>
      </div>
    );
    return (
      <div style={{ height: "100%", background: BG, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 60 }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <Eyebrow anim={anim}>{c.eyebrow}</Eyebrow>
          <SlideTitle anim={anim}>{c.title}</SlideTitle>
        </div>
        <div style={{ display: "flex", alignItems: "center", width: "100%", maxWidth: 900 }}>
          <CardSide side={c.left}  dir="-40px" delay={0.2} />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0 20px", gap: 10, flexShrink: 0, width: 140, opacity: anim ? 1 : 0, transition: "opacity 0.6s ease 0.6s" }}>
            <div style={{ width: 1, height: 56, background: "linear-gradient(to bottom, transparent, rgba(239,68,68,0.6), transparent)" }} />
            <div style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 999, padding: "8px 14px", fontSize: 11, fontWeight: 600, color: "#fca5a5", textAlign: "center", whiteSpace: "pre-line", lineHeight: 1.5 }}>{c.gap}</div>
            <div style={{ width: 1, height: 56, background: "linear-gradient(to bottom, transparent, rgba(239,68,68,0.6), transparent)" }} />
          </div>
          <CardSide side={c.right} dir="40px"  delay={0.4} />
        </div>
      </div>
    );
  }},

  /* 2 ── GAPS */
  { label: "Gaps", render: (anim, t) => {
    const c = t.gaps;
    return (
      <div style={{ height: "100%", background: "linear-gradient(135deg, #0a0a14 0%, #0f1520 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 60 }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <Eyebrow anim={anim}>{c.eyebrow}</Eyebrow>
          <SlideTitle anim={anim}>{c.title}</SlideTitle>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14, maxWidth: 760, width: "100%" }}>
          {c.items.map((item, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 22, opacity: anim ? 1 : 0, transform: anim ? "translateY(0)" : "translateY(24px)", transition: `all 0.5s ease ${0.1 + i * 0.08}s` }}>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, color: BRAND, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 10 }}>{item.num}</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 700, marginBottom: 7, lineHeight: 1.3, color: "#fff" }}>{item.title}</div>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }},

  /* 3 ── MÓDULO */
  { label: "Módulo", render: (anim, t) => {
    const c = t.module;
    return (
      <div style={{ height: "100%", background: "linear-gradient(135deg, #0a0a14 0%, #0f1520 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 60px" }}>
        <div style={{ width: "100%", maxWidth: 820 }}>
          <Eyebrow anim={anim}>{c.eyebrow}</Eyebrow>
          <SlideTitle anim={anim} size={36}>{c.title}</SlideTitle>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.65, marginTop: 12, marginBottom: 32, maxWidth: 780, opacity: anim ? 1 : 0, transform: anim ? "translateY(0)" : "translateY(16px)", transition: "all 0.5s ease 0.2s" }}>{c.subtitle}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {c.steps.map((step, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "16px 20px", opacity: anim ? 1 : 0, transform: anim ? "translateX(0)" : "translateX(-24px)", transition: `all 0.5s ease ${0.25 + i * 0.07}s` }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(111,147,235,0.2)", border: "1px solid rgba(111,147,235,0.35)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 800, color: BRAND, flexShrink: 0 }}>{step.num}</div>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{step.icon}</div>
                <div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 3 }}>{step.title}</div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.4 }}>{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }},

  /* 4 ── SOLUCIÓN */
  { label: "Solución", render: (anim, t) => {
    const c = t.solution;
    return (
      <div style={{ height: "100%", background: "radial-gradient(ellipse at 70% 30%, #1a3060 0%, #0a0a14 60%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 60px" }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <Eyebrow anim={anim}>{c.eyebrow}</Eyebrow>
          <SlideTitle anim={anim} size={38}>{c.title}</SlideTitle>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, maxWidth: 900, width: "100%", alignItems: "start" }}>
          {/* Collaborator */}
          <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: 24, opacity: anim ? 1 : 0, transform: anim ? "translateX(0)" : "translateX(-30px)", transition: "all 0.6s ease 0.2s" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 14px", borderRadius: 999, background: "rgba(111,147,235,0.15)", color: "#a5bcf5", fontSize: 12, fontWeight: 600, marginBottom: 14 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: BRAND }} />{c.collab.role}
            </div>
            <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: 20, fontWeight: 700, marginBottom: 14, lineHeight: 1.2, color: "#fff" }}>{c.collab.title}</h3>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 9 }}>
              {c.collab.features.map((f, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 9, fontSize: 13, color: "rgba(255,255,255,0.7)", lineHeight: 1.4 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: BRAND, marginTop: 5, flexShrink: 0 }} />{f}
                </li>
              ))}
            </ul>
            {/* Path map */}
            <div style={{ display: "flex", alignItems: "center", marginTop: 18, gap: 0 }}>
              {c.collab.levels.map((node, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, fontFamily: "'Inter', sans-serif", ...nodeStyle[node.type] }}>{node.text}</div>
                    <div style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", textAlign: "center", whiteSpace: "pre-line", lineHeight: 1.3 }}>{node.label}</div>
                  </div>
                  {i < c.collab.levels.length - 1 && <div style={{ width: 20, height: 2, flexShrink: 0, background: i === 0 ? lineColor.done : i === 1 ? lineColor.current : lineColor.normal }} />}
                </div>
              ))}
            </div>
          </div>
          {/* Manager */}
          <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: 24, opacity: anim ? 1 : 0, transform: anim ? "translateX(0)" : "translateX(30px)", transition: "all 0.6s ease 0.4s" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 14px", borderRadius: 999, background: "rgba(34,197,94,0.1)", color: "#86efac", fontSize: 12, fontWeight: 600, marginBottom: 14 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e" }} />{c.manager.role}
            </div>
            <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: 20, fontWeight: 700, marginBottom: 14, lineHeight: 1.2, color: "#fff" }}>{c.manager.title}</h3>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 9 }}>
              {c.manager.features.map((f, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 9, fontSize: 13, color: "rgba(255,255,255,0.7)", lineHeight: 1.4 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: BRAND, marginTop: 5, flexShrink: 0 }} />{f}
                </li>
              ))}
            </ul>
            <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 7 }}>
              {c.manager.team.map((m, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 13px", background: m.rb, border: `1px solid ${m.rb2}`, borderRadius: 8 }}>
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,0.8)" }}>{m.name}</span>
                  <span style={{ fontSize: 11, color: m.sc, fontWeight: 600, background: m.sb, padding: "2px 10px", borderRadius: 999 }}>{m.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }},

  /* 5 ── COLABORADOR VIEW */
  { label: "Colaborador", render: (anim, t) => {
    const c = t.collabView;
    return (
      <div style={{ height: "100%", background: "radial-gradient(ellipse at 30% 60%, #1a3060 0%, #0a0a14 60%)", display: "flex", alignItems: "center", padding: "40px 60px", gap: 48 }}>
        {/* Left: text */}
        <div style={{ flex: "0 0 280px" }}>
          <Eyebrow anim={anim}>{c.eyebrow}</Eyebrow>
          <SlideTitle anim={anim} size={30}>{c.title}</SlideTitle>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginTop: 14, opacity: anim ? 1 : 0, transform: anim ? "translateY(0)" : "translateY(16px)", transition: "all 0.5s ease 0.2s" }}>{c.subtitle}</p>
        </div>
        {/* Right: mock UI */}
        <div style={{ flex: 1, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, overflow: "hidden", opacity: anim ? 1 : 0, transform: anim ? "translateX(0)" : "translateX(30px)", transition: "all 0.6s ease 0.3s" }}>
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 18px", borderBottom: "1px solid rgba(255,255,255,0.08)", background: "rgba(111,147,235,0.08)" }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: BRAND, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "#fff" }}>H</div>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 700, color: "#fff" }}>Plan de Carrera</span>
            <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
              {["Colaborador", "Manager", "HU Admin"].map((tab, i) => (
                <span key={i} style={{ fontSize: 10, padding: "3px 10px", borderRadius: 999, background: i === 0 ? BRAND : "transparent", color: i === 0 ? "#fff" : "rgba(255,255,255,0.35)", fontWeight: 600 }}>{tab}</span>
              ))}
            </div>
          </div>
          <div style={{ padding: "16px 18px", display: "flex", flexDirection: "column", gap: 12 }}>
            {/* Top row: role card + unlock list */}
            <div style={{ display: "flex", gap: 12 }}>
              {/* Role card */}
              <div style={{ flex: 1, background: "linear-gradient(135deg, #3b5bdb, #6f93eb)", borderRadius: 14, padding: "16px 18px" }}>
                <div style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.6)", letterSpacing: "1px", marginBottom: 6 }}>{c.roleLabel}</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 20, fontWeight: 800, color: "#fff", marginBottom: 4 }}>{c.roleName}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.65)", marginBottom: 12 }}>{c.roleTeam}</div>
                <span style={{ fontSize: 10, fontWeight: 600, color: "#fff", background: "rgba(255,255,255,0.2)", padding: "4px 10px", borderRadius: 999 }}>{c.tenure}</span>
              </div>
              {/* Unlock list */}
              <div style={{ flex: 1, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "14px 16px" }}>
                <div style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.4)", letterSpacing: "1px", marginBottom: 10 }}>{c.unlockLabel}</div>
                {c.unlockItems.map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 11, color: "rgba(255,255,255,0.65)", marginBottom: 7 }}>
                    <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 10 }}>·</span>{item}
                  </div>
                ))}
              </div>
            </div>
            {/* Empty state */}
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "16px 18px", textAlign: "center" }}>
              <div style={{ fontSize: 22, marginBottom: 8 }}>⚙️</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 5 }}>{c.emptyTitle}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 10 }}>{c.emptyDesc}</div>
              <span style={{ fontSize: 10, color: BRAND, background: "rgba(111,147,235,0.15)", border: "1px solid rgba(111,147,235,0.2)", padding: "3px 12px", borderRadius: 999 }}>● {c.rolePill}</span>
            </div>
            {/* CTA */}
            <div style={{ background: BRAND, borderRadius: 12, padding: "13px", textAlign: "center" }}>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 800, color: "#fff" }}>{c.ctaBtn}</div>
            </div>
            <div style={{ textAlign: "center", fontSize: 10, color: "rgba(255,255,255,0.3)", marginTop: -4 }}>{c.ctaSub}</div>
          </div>
        </div>
      </div>
    );
  }},

  /* 6 ── RUTA PROFESIONAL */
  { label: "Ruta", render: (anim, t) => {
    const c = t.rutaView;
    return (
      <div style={{ height: "100%", background: "radial-gradient(ellipse at 30% 40%, #1a3060 0%, #0a0a14 60%)", display: "flex", alignItems: "center", padding: "40px 60px", gap: 48 }}>
        {/* Left */}
        <div style={{ flex: "0 0 280px" }}>
          <Eyebrow anim={anim}>{c.eyebrow}</Eyebrow>
          <SlideTitle anim={anim} size={30}>{c.title}</SlideTitle>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginTop: 14, opacity: anim ? 1 : 0, transform: anim ? "translateY(0)" : "translateY(16px)", transition: "all 0.5s ease 0.2s" }}>{c.subtitle}</p>
        </div>
        {/* Right: mock UI */}
        <div style={{ flex: 1, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, overflow: "hidden", opacity: anim ? 1 : 0, transform: anim ? "translateX(0)" : "translateX(30px)", transition: "all 0.6s ease 0.3s" }}>
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 18px", borderBottom: "1px solid rgba(255,255,255,0.08)", background: "rgba(111,147,235,0.08)" }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: BRAND, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "#fff" }}>H</div>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 700, color: "#fff" }}>{c.headerTitle}</span>
            <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
              {["Colaborador", "Manager", "HU Admin"].map((tab, i) => (
                <span key={i} style={{ fontSize: 10, padding: "3px 10px", borderRadius: 999, background: i === 0 ? BRAND : "transparent", color: i === 0 ? "#fff" : "rgba(255,255,255,0.35)", fontWeight: 600 }}>{tab}</span>
              ))}
            </div>
          </div>
          <div style={{ padding: "14px 18px", display: "flex", flexDirection: "column", gap: 11 }}>
            {/* Progress */}
            <div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginBottom: 6 }}>{c.stepLabel}</div>
              <div style={{ display: "flex", gap: 3 }}>
                {[0,1,2,3,4].map(i => (
                  <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i === 0 ? BRAND : "rgba(255,255,255,0.1)" }} />
                ))}
              </div>
            </div>
            {/* Growth type */}
            <div>
              <div style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.4)", letterSpacing: "1px", marginBottom: 8 }}>{c.growthLabel}</div>
              <div style={{ display: "flex", gap: 10 }}>
                {[c.vertical, c.lateral].map((opt, i) => (
                  <div key={i} style={{ flex: 1, borderRadius: 10, border: `1.5px solid ${i === 0 ? BRAND : "rgba(255,255,255,0.1)"}`, background: i === 0 ? "rgba(111,147,235,0.12)" : "rgba(255,255,255,0.03)", padding: "10px 12px" }}>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 700, color: i === 0 ? "#a5bcf5" : "rgba(255,255,255,0.5)", marginBottom: 3 }}>{opt.icon} {opt.title}</div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)" }}>{opt.desc}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Fields */}
            {c.fields.map((f, i) => (
              <div key={i}>
                <div style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.4)", letterSpacing: "1px", marginBottom: 5 }}>{f.label}</div>
                <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 12px", fontSize: 11, color: "rgba(255,255,255,0.25)" }}>{f.placeholder}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }},

  /* 8 ── HABILIDADES */
  { label: "Habilidades", render: (anim, t) => {
    const c = t.habilidadesView;
    const SkillPill = ({ s, blue }) => (
      <span style={{ padding: "5px 12px", borderRadius: 999, fontSize: 11, fontWeight: 600, background: s.checked ? (blue ? "rgba(111,147,235,0.2)" : "rgba(34,197,94,0.15)") : "rgba(255,255,255,0.06)", color: s.checked ? (blue ? "#a5bcf5" : "#86efac") : "rgba(255,255,255,0.4)", border: `1px solid ${s.checked ? (blue ? "rgba(111,147,235,0.3)" : "rgba(34,197,94,0.25)") : "rgba(255,255,255,0.1)"}` }}>
        {s.checked ? "✓ " : ""}{s.name}
      </span>
    );
    return (
      <div style={{ height: "100%", background: "radial-gradient(ellipse at 30% 60%, #1a3060 0%, #0a0a14 60%)", display: "flex", alignItems: "center", padding: "40px 60px", gap: 48 }}>
        <div style={{ flex: "0 0 270px" }}>
          <Eyebrow anim={anim}>{c.eyebrow}</Eyebrow>
          <SlideTitle anim={anim} size={30}>{c.title}</SlideTitle>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginTop: 14, opacity: anim ? 1 : 0, transition: "all 0.5s ease 0.2s" }}>{c.subtitle}</p>
        </div>
        <div style={{ flex: 1, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, overflow: "hidden", opacity: anim ? 1 : 0, transform: anim ? "translateX(0)" : "translateX(30px)", transition: "all 0.6s ease 0.3s" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 18px", borderBottom: "1px solid rgba(255,255,255,0.08)", background: "rgba(111,147,235,0.08)" }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: BRAND, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "#fff" }}>H</div>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 700, color: "#fff" }}>Crear plan de carrera</span>
            <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>{["Colaborador","Manager","HU Admin"].map((tab,i)=><span key={i} style={{ fontSize:10, padding:"3px 10px", borderRadius:999, background:i===0?BRAND:"transparent", color:i===0?"#fff":"rgba(255,255,255,0.35)", fontWeight:600 }}>{tab}</span>)}</div>
          </div>
          <div style={{ padding: "14px 18px", display: "flex", flexDirection: "column", gap: 12 }}>
            <div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginBottom: 6 }}>{c.stepLabel}</div>
              <div style={{ display: "flex", gap: 3, marginBottom: 12 }}>{[0,1,2,3,4].map(i=><div key={i} style={{ flex:1, height:3, borderRadius:2, background:i<=1?BRAND:"rgba(255,255,255,0.1)" }} />)}</div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <span style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.4)", letterSpacing: "1px" }}>{c.hardLabel}</span>
                <span style={{ fontSize: 9, fontWeight: 600, color: "#a78bfa", background: "rgba(167,139,250,0.15)", padding: "2px 8px", borderRadius: 999 }}>{c.roleTag}</span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{c.hardSkills.map((s,i)=><SkillPill key={i} s={s} blue />)}</div>
            </div>
            <div>
              <div style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.4)", letterSpacing: "1px", marginBottom: 8 }}>{c.softLabel}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{c.softSkills.map((s,i)=><SkillPill key={i} s={s} blue={false} />)}</div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              {[[c.gapHardLabel, c.gapHard, "#a5bcf5", "rgba(111,147,235,0.1)"], [c.gapSoftLabel, c.gapSoft, "#86efac", "rgba(34,197,94,0.08)"]].map(([label, items, color, bg], ci) => (
                <div key={ci} style={{ flex: 1, background: bg, border: `1px solid ${color}22`, borderRadius: 10, padding: "10px 12px" }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color, marginBottom: 6 }}>{label}</div>
                  {items.map((item,i)=><div key={i} style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", marginBottom: 3 }}>{item}</div>)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }},

  /* 9 ── OBJETIVOS */
  { label: "Objetivos", render: (anim, t) => {
    const c = t.objetivosView;
    return (
      <div style={{ height: "100%", background: "radial-gradient(ellipse at 70% 40%, #1a3060 0%, #0a0a14 60%)", display: "flex", alignItems: "center", padding: "40px 60px", gap: 48 }}>
        <div style={{ flex: "0 0 270px" }}>
          <Eyebrow anim={anim}>{c.eyebrow}</Eyebrow>
          <SlideTitle anim={anim} size={30}>{c.title}</SlideTitle>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginTop: 14, opacity: anim ? 1 : 0, transition: "all 0.5s ease 0.2s" }}>{c.subtitle}</p>
        </div>
        <div style={{ flex: 1, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, overflow: "hidden", opacity: anim ? 1 : 0, transform: anim ? "translateX(0)" : "translateX(30px)", transition: "all 0.6s ease 0.3s" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 18px", borderBottom: "1px solid rgba(255,255,255,0.08)", background: "rgba(111,147,235,0.08)" }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: BRAND, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "#fff" }}>H</div>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 700, color: "#fff" }}>Crear plan de carrera</span>
            <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>{["Colaborador","Manager","HU Admin"].map((tab,i)=><span key={i} style={{ fontSize:10, padding:"3px 10px", borderRadius:999, background:i===0?BRAND:"transparent", color:i===0?"#fff":"rgba(255,255,255,0.35)", fontWeight:600 }}>{tab}</span>)}</div>
          </div>
          <div style={{ padding: "14px 18px", display: "flex", flexDirection: "column", gap: 10 }}>
            <div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginBottom: 6 }}>{c.stepLabel}</div>
              <div style={{ display: "flex", gap: 3, marginBottom: 10 }}>{[0,1,2,3,4].map(i=><div key={i} style={{ flex:1, height:3, borderRadius:2, background:i<=2?BRAND:"rgba(255,255,255,0.1)" }} />)}</div>
            </div>
            <div style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.4)", letterSpacing: "1px" }}>{c.devLabel}</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginTop: -6 }}>{c.devSub}</div>
            {c.goals.map((g, i) => (
              <div key={i}>
                <div style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.35)", letterSpacing: "1px", marginBottom: 5 }}>{g.horizonLabel}</div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: g.tagColor, background: g.tagBg, padding: "2px 8px", borderRadius: 999 }}>{g.tag}</span>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>{g.text}</span>
                  </div>
                  <span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)" }}>Editar ×</span>
                </div>
              </div>
            ))}
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "10px 12px" }}>
              <div style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.35)", letterSpacing: "1px", marginBottom: 7 }}>{c.addLabel}</div>
              <div style={{ display: "flex", gap: 8 }}>
                <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 6, padding: "6px 10px", fontSize: 10, color: "rgba(255,255,255,0.4)" }}>Corto plazo ▾</div>
                <div style={{ flex: 1, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 6, padding: "6px 10px", fontSize: 10, color: "rgba(255,255,255,0.25)" }}>{c.addPlaceholder}</div>
                <div style={{ background: BRAND, borderRadius: 6, padding: "6px 12px", fontSize: 11, fontWeight: 700, color: "#fff" }}>{c.addBtn}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }},

  /* 10 ── APRENDIZAJE */
  { label: "Aprendizaje", render: (anim, t) => {
    const c = t.aprendizajeView;
    return (
      <div style={{ height: "100%", background: "radial-gradient(ellipse at 30% 40%, #1a3060 0%, #0a0a14 60%)", display: "flex", alignItems: "center", padding: "40px 60px", gap: 48 }}>
        <div style={{ flex: "0 0 270px" }}>
          <Eyebrow anim={anim}>{c.eyebrow}</Eyebrow>
          <SlideTitle anim={anim} size={28}>{c.title}</SlideTitle>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginTop: 14, opacity: anim ? 1 : 0, transition: "all 0.5s ease 0.2s" }}>{c.subtitle}</p>
        </div>
        <div style={{ flex: 1, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, overflow: "hidden", opacity: anim ? 1 : 0, transform: anim ? "translateX(0)" : "translateX(30px)", transition: "all 0.6s ease 0.3s" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 18px", borderBottom: "1px solid rgba(255,255,255,0.08)", background: "rgba(111,147,235,0.08)" }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: BRAND, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "#fff" }}>H</div>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 700, color: "#fff" }}>Crear plan de carrera</span>
            <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>{["Colaborador","Manager","HU Admin"].map((tab,i)=><span key={i} style={{ fontSize:10, padding:"3px 10px", borderRadius:999, background:i===0?BRAND:"transparent", color:i===0?"#fff":"rgba(255,255,255,0.35)", fontWeight:600 }}>{tab}</span>)}</div>
          </div>
          <div style={{ padding: "14px 18px", display: "flex", flexDirection: "column", gap: 10 }}>
            <div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginBottom: 6 }}>{c.stepLabel}</div>
              <div style={{ display: "flex", gap: 3, marginBottom: 8 }}>{[0,1,2,3,4].map(i=><div key={i} style={{ flex:1, height:3, borderRadius:2, background:i<=3?BRAND:"rgba(255,255,255,0.1)" }} />)}</div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>{c.listTitle}</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>{c.listSub}</div>
              </div>
              <div style={{ display: "flex", gap: 5 }}>{c.filters.map((f,i)=><span key={i} style={{ fontSize:10, padding:"3px 10px", borderRadius:999, background:i===0?"rgba(34,197,94,0.15)":i===1?"rgba(111,147,235,0.15)":"rgba(255,255,255,0.06)", color:i===0?"#86efac":i===1?"#a5bcf5":"rgba(255,255,255,0.4)", fontWeight:600 }}>{f}</span>)}</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {c.courses.map((course, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: i < c.courses.length-1 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                  <span style={{ fontSize: 16 }}>{course.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 9, fontWeight: 600, color: "rgba(255,255,255,0.3)", letterSpacing: "0.5px" }}>{course.type}</div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>{course.name}</div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)" }}>{course.source}</div>
                  </div>
                  <span style={{ fontSize: 9, fontWeight: 600, color: course.tc, background: course.tb, padding: "2px 8px", borderRadius: 999, flexShrink: 0 }}>{course.tag}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }},

  /* 11 ── REVISIÓN */
  { label: "Revisión", render: (anim, t) => {
    const c = t.revisionView;
    return (
      <div style={{ height: "100%", background: "radial-gradient(ellipse at 70% 60%, #1a3060 0%, #0a0a14 60%)", display: "flex", alignItems: "center", padding: "40px 60px", gap: 48 }}>
        <div style={{ flex: "0 0 270px" }}>
          <Eyebrow anim={anim}>{c.eyebrow}</Eyebrow>
          <SlideTitle anim={anim} size={28}>{c.title}</SlideTitle>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginTop: 14, opacity: anim ? 1 : 0, transition: "all 0.5s ease 0.2s" }}>{c.subtitle}</p>
        </div>
        <div style={{ flex: 1, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, overflow: "hidden", opacity: anim ? 1 : 0, transform: anim ? "translateX(0)" : "translateX(30px)", transition: "all 0.6s ease 0.3s" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 18px", borderBottom: "1px solid rgba(255,255,255,0.08)", background: "rgba(111,147,235,0.08)" }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: BRAND, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "#fff" }}>H</div>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 700, color: "#fff" }}>Crear plan de carrera</span>
            <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>{["Colaborador","Manager","HU Admin"].map((tab,i)=><span key={i} style={{ fontSize:10, padding:"3px 10px", borderRadius:999, background:i===0?BRAND:"transparent", color:i===0?"#fff":"rgba(255,255,255,0.35)", fontWeight:600 }}>{tab}</span>)}</div>
          </div>
          <div style={{ padding: "14px 18px", display: "flex", flexDirection: "column", gap: 10 }}>
            <div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginBottom: 6 }}>{c.stepLabel}</div>
              <div style={{ display: "flex", gap: 3, marginBottom: 8 }}>{[0,1,2,3,4].map(i=><div key={i} style={{ flex:1, height:3, borderRadius:2, background:BRAND }} />)}</div>
            </div>
            <div style={{ background: "rgba(111,147,235,0.1)", border: "1px solid rgba(111,147,235,0.2)", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#a5bcf5" }}>🎉 {c.alertText}</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginTop: 3 }}>{c.alertSub}</div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <div style={{ flex: 1, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "12px" }}>
                <div style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.35)", letterSpacing: "1px", marginBottom: 6 }}>{c.routeLabel}</div>
                <span style={{ fontSize: 9, fontWeight: 600, color: BRAND, background: "rgba(111,147,235,0.15)", padding: "2px 8px", borderRadius: 999 }}>{c.routeTag}</span>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 800, color: "#fff", marginTop: 6 }}>{c.routeRole}</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>{c.routeDur}</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{c.routeMgr}</div>
              </div>
              <div style={{ flex: 1, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "12px" }}>
                <div style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.35)", letterSpacing: "1px", marginBottom: 8 }}>{c.goalsLabel}</div>
                {c.goals.map((g,i)=>(
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
                    <span style={{ fontSize: 9, fontWeight: 700, color: g.color, background: `${g.color}22`, padding: "1px 6px", borderRadius: 999 }}>{g.tag}</span>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.65)" }}>{g.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "12px" }}>
              <div style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.35)", letterSpacing: "1px", marginBottom: 8 }}>{c.skillsLabel}</div>
              <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", marginBottom: 5 }}>{c.hardLabel}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 8 }}>{c.hardSkills.map((s,i)=><span key={i} style={{ fontSize:10, padding:"2px 9px", borderRadius:999, background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.1)", color:"rgba(255,255,255,0.6)" }}>{s}</span>)}</div>
              <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", marginBottom: 5 }}>{c.softLabel}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>{c.softSkills.map((s,i)=><span key={i} style={{ fontSize:10, padding:"2px 9px", borderRadius:999, background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.1)", color:"rgba(255,255,255,0.6)" }}>{s}</span>)}</div>
            </div>
            <div style={{ background: BRAND, borderRadius: 10, padding: "12px", textAlign: "center" }}>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 800, color: "#fff" }}>{c.sendBtn}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }},

  /* 12 ── CONFIRMACIÓN */
  { label: "Confirmación", render: (anim, t) => {
    const c = t.confirmView;
    return (
      <div style={{ height: "100%", background: "radial-gradient(ellipse at 50% 50%, #1a3060 0%, #0a0a14 60%)", display: "flex", alignItems: "center", padding: "40px 60px", gap: 48 }}>
        <div style={{ flex: "0 0 270px" }}>
          <Eyebrow anim={anim}>{c.eyebrow}</Eyebrow>
          <SlideTitle anim={anim} size={30}>{c.title}</SlideTitle>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginTop: 14, opacity: anim ? 1 : 0, transition: "all 0.5s ease 0.2s" }}>{c.subtitle}</p>
        </div>
        <div style={{ flex: 1, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, overflow: "hidden", opacity: anim ? 1 : 0, transform: anim ? "translateX(0)" : "translateX(30px)", transition: "all 0.6s ease 0.3s" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 18px", borderBottom: "1px solid rgba(255,255,255,0.08)", background: "rgba(111,147,235,0.08)" }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: BRAND, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "#fff" }}>H</div>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 700, color: "#fff" }}>Plan de Carrera</span>
            <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>{["Colaborador","Manager","HU Admin"].map((tab,i)=><span key={i} style={{ fontSize:10, padding:"3px 10px", borderRadius:999, background:i===0?BRAND:"transparent", color:i===0?"#fff":"rgba(255,255,255,0.35)", fontWeight:600 }}>{tab}</span>)}</div>
          </div>
          <div style={{ padding: "40px 24px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 14 }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", border: "2px solid #22c55e", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, color: "#22c55e", background: "rgba(34,197,94,0.1)" }}>{c.successIcon}</div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 800, color: "#fff" }}>{c.successTitle}</div>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", lineHeight: 1.6, whiteSpace: "pre-line", maxWidth: 360 }}>{c.successDesc}</p>
            <div style={{ width: "100%", background: BRAND, borderRadius: 10, padding: "12px", marginTop: 8 }}>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 800, color: "#fff" }}>{c.ctaBtn}</span>
            </div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)" }}>{c.ctaSub}</div>
          </div>
        </div>
      </div>
    );
  }},

  /* 13 ── MANAGER VIEW */
  { label: "Manager", render: (anim, t) => {
    const c = t.managerView;
    return (
      <div style={{ height: "100%", background: "radial-gradient(ellipse at 70% 30%, #1a3060 0%, #0a0a14 60%)", display: "flex", alignItems: "center", padding: "40px 60px", gap: 48 }}>
        {/* Left: text */}
        <div style={{ flex: "0 0 300px" }}>
          <Eyebrow anim={anim}>{c.eyebrow}</Eyebrow>
          <SlideTitle anim={anim} size={32}>{c.title}</SlideTitle>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginTop: 14, opacity: anim ? 1 : 0, transform: anim ? "translateY(0)" : "translateY(16px)", transition: "all 0.5s ease 0.2s" }}>{c.subtitle}</p>
        </div>
        {/* Right: mock UI */}
        <div style={{ flex: 1, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, overflow: "hidden", opacity: anim ? 1 : 0, transform: anim ? "translateX(0)" : "translateX(30px)", transition: "all 0.6s ease 0.3s" }}>
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 18px", borderBottom: "1px solid rgba(255,255,255,0.08)", background: "rgba(111,147,235,0.08)" }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: BRAND, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "#fff" }}>H</div>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 700, color: "#fff" }}>Plan de Carrera</span>
            <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
              {["Colaborador", "Manager", "HU Admin"].map((tab, i) => (
                <span key={i} style={{ fontSize: 10, padding: "3px 10px", borderRadius: 999, background: i === 1 ? BRAND : "transparent", color: i === 1 ? "#fff" : "rgba(255,255,255,0.35)", fontWeight: 600 }}>{tab}</span>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", minHeight: 0 }}>
            {/* Team list */}
            <div style={{ width: 220, borderRight: "1px solid rgba(255,255,255,0.07)", padding: "12px 0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "0 14px 10px", fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.5)" }}>
                <span>{c.teamLabel}</span><span>{c.reportsLabel}</span>
              </div>
              {c.team.map((m, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 9, padding: "8px 14px", background: i === 0 ? "rgba(111,147,235,0.1)" : "transparent", borderLeft: i === 0 ? `2px solid ${BRAND}` : "2px solid transparent" }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: m.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 800, color: m.color, flexShrink: 0 }}>{m.initials}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{m.name}</div>
                    <div style={{ fontSize: 9, color: "rgba(255,255,255,0.4)" }}>{m.role}</div>
                  </div>
                  <span style={{ fontSize: 9, fontWeight: 600, color: m.sc, background: m.sb, padding: "2px 7px", borderRadius: 999, flexShrink: 0 }}>{m.status}</span>
                </div>
              ))}
            </div>
            {/* Detail panel */}
            <div style={{ flex: 1, padding: "12px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
              {/* Alert */}
              <div style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.25)", borderRadius: 10, padding: "10px 14px" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#fcd34d" }}>⚠ {c.alertLabel}</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{c.alertSub}</div>
                <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                  <button style={{ flex: 1, padding: "6px 0", borderRadius: 8, border: "1px solid #22c55e", background: "transparent", color: "#86efac", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>{c.approveBtn}</button>
                  <button style={{ flex: 1, padding: "6px 0", borderRadius: 8, border: "1px solid rgba(255,255,255,0.2)", background: "transparent", color: "rgba(255,255,255,0.6)", fontSize: 11, fontWeight: 600, cursor: "pointer" }}>{c.changesBtn}</button>
                </div>
              </div>
              {/* Career map */}
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#fff", marginBottom: 2 }}>{c.mapTitle}</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginBottom: 10 }}>{c.mapSub}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
                  {c.nodes.map((node, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center" }}>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                        {node.tag ? <span style={{ fontSize: 8, color: BRAND, fontWeight: 700 }}>{node.tag}</span> : <span style={{ fontSize: 8, opacity: 0 }}>·</span>}
                        <div style={{ width: 30, height: 30, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800, fontFamily: "'Inter', sans-serif", ...nodeStyle[node.type] }}>
                          {node.type === "done" ? "✓" : node.type === "current" ? "L2" : node.type === "goal" ? "L3" : "🔒"}
                        </div>
                        <div style={{ fontSize: 8, color: "rgba(255,255,255,0.4)", textAlign: "center", whiteSpace: "pre-line", lineHeight: 1.3 }}>{node.label}</div>
                      </div>
                      {i < c.nodes.length - 1 && <div style={{ width: 18, height: 2, background: i === 0 ? "#22c55e" : i === 1 ? BRAND : "rgba(255,255,255,0.1)", flexShrink: 0, marginBottom: 14 }} />}
                    </div>
                  ))}
                </div>
              </div>
              {/* Suggest changes */}
              <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: "10px 12px" }}>
                <div style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.3)", letterSpacing: "1px", marginBottom: 6 }}>{c.suggestLabel}</div>
                <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 6, padding: "7px 10px", fontSize: 10, color: "rgba(255,255,255,0.25)", marginBottom: 8 }}>{c.placeholder}</div>
                <div style={{ display: "inline-block", background: BRAND, borderRadius: 7, padding: "6px 14px", fontSize: 10, fontWeight: 700, color: "#fff", cursor: "pointer" }}>{c.sendBtn}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }},

  /* 5 ── CIERRE */
  { label: "Cierre", render: (anim, t) => {
    const c = t.closing;
    return (
      <div style={{ height: "100%", background: "radial-gradient(ellipse at 50% 50%, #1a2a5e 0%, #0a0a14 65%)", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 60 }}>
        <GridBg />
        <div style={{ position: "relative", zIndex: 2, textAlign: "center", maxWidth: 700 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(111,147,235,0.15)", border: "1px solid rgba(111,147,235,0.3)", borderRadius: 999, padding: "6px 16px", fontSize: 12, fontWeight: 500, color: BRAND, marginBottom: 16, opacity: anim ? 1 : 0, transform: anim ? "translateY(0)" : "translateY(24px)", transition: "all 0.6s ease" }}>{c.tag}</div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 52, fontWeight: 800, lineHeight: 1.15, margin: "16px 0 20px", whiteSpace: "pre-line", color: "#fff", opacity: anim ? 1 : 0, transform: anim ? "translateY(0)" : "translateY(24px)", transition: "all 0.6s ease 0.2s" }}>
            {c.titleA}<GradText>{c.titleB}</GradText>{c.titleC}
          </div>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.55)", lineHeight: 1.6, whiteSpace: "pre-line", opacity: anim ? 1 : 0, transform: anim ? "translateY(0)" : "translateY(24px)", transition: "all 0.6s ease 0.35s" }}>{c.tagline}</p>
          <div style={{ display: "flex", gap: 14, marginTop: 32, justifyContent: "center", opacity: anim ? 1 : 0, transition: "opacity 0.6s ease 0.45s" }}>
            {[
              { href: "https://growthhub-phi.vercel.app/", label: c.demoLabel,  sub: c.demoSub },
              { href: "#",                                  label: c.videoLabel, sub: c.videoSub },
            ].map((btn, i) => (
              <a key={i} href={btn.href} target="_blank" rel="noopener noreferrer"
                style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3, width: 196, background: "#fff", borderRadius: 14, padding: "14px 0", textDecoration: "none", boxShadow: "0 8px 24px rgba(0,0,0,0.3)", transition: "transform 0.2s, box-shadow 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 14px 36px rgba(0,0,0,0.4)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)";    e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.3)"; }}
              >
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 800, color: "#213478" }}>{btn.label}</span>
                <span style={{ fontSize: 11, color: "#9CA3AF", fontWeight: 500 }}>{btn.sub}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  }},

  /* 6 ── GRACIAS */
  { label: "Gracias", render: (anim, t) => {
    const c = t.thanks;
    const people = t.team.people;
    return (
      <div style={{ height: "100%", background: "radial-gradient(ellipse at 50% 50%, #1a2a5e 0%, #0a0a14 65%)", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <GridBg />
        <div style={{ position: "relative", zIndex: 2, textAlign: "center", opacity: anim ? 1 : 0, transform: anim ? "scale(1)" : "scale(0.95)", transition: "all 0.8s ease" }}>
          <h1 style={{ fontFamily: "'Inter', sans-serif", fontSize: 48, fontWeight: 800, color: "#fff", margin: 0, lineHeight: 1.1 }}>{c.title}</h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 17, marginTop: 16, maxWidth: 460, margin: "16px auto 0", lineHeight: 1.6 }}>{c.body}</p>
          <div style={{ display: "flex", gap: 24, justifyContent: "center", marginTop: 36 }}>
            {people.map((p, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <div style={{ width: 52, height: 52, borderRadius: "50%", background: p.photo ? "transparent" : `linear-gradient(135deg, ${p.color}, ${p.color}99)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: "#fff", boxShadow: `0 4px 14px ${p.color}44`, overflow: "hidden", border: `2px solid ${p.color}44` }}>
                  {p.photo ? <img src={p.photo} alt={p.initials} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} /> : p.initials}
                </div>
                <span style={{ color: "rgba(255,255,255,0.45)", fontSize: 12, fontWeight: 500, whiteSpace: "pre-line", textAlign: "center", lineHeight: 1.3 }}>{p.name}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 36 }}>
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSdgIV6HGXFao9nJS04mSMIMmEUFNqQYVyjq63sc_azfXApXpg/viewform" target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(111,147,235,0.15)", border: "1px solid rgba(111,147,235,0.35)", borderRadius: 14, padding: "12px 28px", textDecoration: "none", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(111,147,235,0.28)"; e.currentTarget.style.borderColor = "rgba(111,147,235,0.6)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(111,147,235,0.15)"; e.currentTarget.style.borderColor = "rgba(111,147,235,0.35)"; }}
            >
              <span style={{ fontSize: 16 }}>📝</span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 700, color: "#a5bcf5" }}>{c.feedbackBtn}</span>
            </a>
          </div>
        </div>
      </div>
    );
  }},
];

const TOTAL = slides.length;

/* ─── MAIN COMPONENT ─────────────────────────────────────────── */
export default function Presentation() {
  const [current, setCurrent]       = useState(0);
  const [anim, setAnim]             = useState(false);
  const [transitioning, setTrans]   = useState(false);
  const [lang, setLang]             = useState("es");
  const [barVisible, setBarVisible] = useState(true);
  const hideTimer                   = useRef(null);

  const t = i18n[lang];

  useEffect(() => {
    const id = setTimeout(() => setAnim(true), 100);
    return () => clearTimeout(id);
  }, []);

  const showBar = useCallback(() => {
    setBarVisible(true);
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setBarVisible(false), 3200);
  }, []);

  useEffect(() => { showBar(); return () => clearTimeout(hideTimer.current); }, [current, showBar]);

  const goTo = useCallback((idx) => {
    if (idx === current || idx < 0 || idx >= TOTAL || transitioning) return;
    setTrans(true);
    setAnim(false);
    setTimeout(() => {
      setCurrent(idx);
      setTimeout(() => { setAnim(true); setTrans(false); }, 50);
    }, 280);
  }, [current, transitioning]);

  useEffect(() => {
    const h = (e) => {
      if (e.key === "ArrowRight" || e.key === " ") goTo(current + 1);
      if (e.key === "ArrowLeft") goTo(current - 1);
      showBar();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [current, goTo, showBar]);

  const progress = ((current + 1) / TOTAL) * 100;

  return (
    <div onMouseMove={showBar} style={{ width: "100vw", height: "100vh", overflow: "hidden", background: BG, position: "relative", fontFamily: "'DM Sans', sans-serif", cursor: barVisible ? "default" : "none" }}>

      {/* ── SLIDE ── */}
      <div style={{ position: "absolute", inset: 0 }}>
        {slides[current].render(anim, t)}
      </div>

      {/* ── TOP HUD ── */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 24px", background: "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, transparent 100%)", opacity: barVisible ? 1 : 0, transition: "opacity 0.4s ease", pointerEvents: barVisible ? "auto" : "none" }}>
        <img src="/humand-logo.png" alt="humand" style={{ height: 80, opacity: 0.9 }} />
        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", background: "rgba(0,0,0,0.35)", padding: "4px 12px", borderRadius: 20, backdropFilter: "blur(8px)" }}>
          {t.labels[current]}
        </span>
        <div style={{ display: "flex", background: "rgba(0,0,0,0.4)", borderRadius: 20, padding: 3, backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.1)" }}>
          {["es", "en"].map((l) => (
            <button key={l} onClick={() => setLang(l)} style={{ padding: "5px 14px", borderRadius: 16, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 700, letterSpacing: 0.5, transition: "all 0.2s", background: lang === l ? BRAND : "transparent", color: lang === l ? "#fff" : "rgba(255,255,255,0.45)" }}>
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* ── SIDE ARROWS ── */}
      {[-1, 1].map((dir) => {
        const idx   = current + dir;
        const valid = idx >= 0 && idx < TOTAL;
        const isL   = dir === -1;
        return (
          <button key={dir} onClick={() => goTo(idx)} disabled={!valid} style={{ position: "absolute", [isL ? "left" : "right"]: 16, top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "50%", width: 44, height: 44, color: "#fff", fontSize: 22, cursor: valid ? "pointer" : "default", opacity: barVisible ? (valid ? 0.75 : 0.2) : 0, transition: "opacity 0.4s ease", zIndex: 50, backdropFilter: "blur(8px)", pointerEvents: barVisible && valid ? "auto" : "none" }}>
            {isL ? "‹" : "›"}
          </button>
        );
      })}

      {/* ── BOTTOM BAR ── */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 50, background: "linear-gradient(0deg, rgba(0,0,0,0.85) 0%, transparent 100%)", padding: "20px 20px 12px", opacity: barVisible ? 1 : 0, transition: "opacity 0.4s ease", pointerEvents: barVisible ? "auto" : "none" }}>
        {/* Progress */}
        <div style={{ height: 2, background: "rgba(255,255,255,0.1)", borderRadius: 1, marginBottom: 12, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${progress}%`, background: `linear-gradient(90deg, ${BRAND}, #a5bcf5)`, borderRadius: 1, transition: "width 0.4s ease" }} />
        </div>
        {/* Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, justifyContent: "center" }}>
          <button onClick={() => goTo(current - 1)} disabled={current === 0} style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, padding: "6px 14px", color: current === 0 ? "rgba(255,255,255,0.2)" : "#fff", fontSize: 12, fontWeight: 600, cursor: current === 0 ? "default" : "pointer", backdropFilter: "blur(8px)", whiteSpace: "nowrap" }}>{t.nav.prev}</button>
          <div style={{ display: "flex", gap: 5, overflowX: "auto", maxWidth: "calc(100vw - 230px)", padding: "2px 4px" }}>
            {t.labels.map((label, i) => (
              <button key={i} onClick={() => goTo(i)} title={label} style={{ flex: "0 0 auto", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-end", width: 72, height: 42, borderRadius: 8, border: `1.5px solid ${i === current ? BRAND : "rgba(255,255,255,0.1)"}`, background: i === current ? "rgba(111,147,235,0.18)" : i < current ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.02)", cursor: "pointer", transition: "all 0.25s", padding: "0 6px 5px", backdropFilter: "blur(4px)" }}>
                <span style={{ fontSize: 8, fontWeight: 600, color: i === current ? "#a5bcf5" : "rgba(255,255,255,0.38)", textAlign: "left" }}>{i + 1}. {label}</span>
              </button>
            ))}
          </div>
          <button onClick={() => goTo(current + 1)} disabled={current === TOTAL - 1} style={{ background: current === TOTAL - 1 ? "rgba(255,255,255,0.04)" : BRAND, border: "none", borderRadius: 8, padding: "6px 14px", color: current === TOTAL - 1 ? "rgba(255,255,255,0.2)" : "#fff", fontSize: 12, fontWeight: 600, cursor: current === TOTAL - 1 ? "default" : "pointer", whiteSpace: "nowrap" }}>{t.nav.next}</button>
        </div>
        <div style={{ textAlign: "center", marginTop: 6, color: "rgba(255,255,255,0.18)", fontSize: 10 }}>{current + 1} / {TOTAL} · {t.nav.hint}</div>
      </div>
    </div>
  );
}
