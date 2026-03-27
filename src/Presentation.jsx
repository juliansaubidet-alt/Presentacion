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
    labels: ["Intro", "Problema", "Solución", "Mapa", "Flujos", "Tools", "Cierre", "Gracias"],

    intro: {
      tag: "🏆 Huckathon 2026 · Producto",
      titleA: "Plan de carrera que\npotencia ", titleB: "el talento", titleC: "\nde tu empresa.",
      subtitle: "Un módulo que conecta las aspiraciones del colaborador con la visión del manager.",
      meta: [{ label: "Módulo", value: "Career Path" }, { label: "Plataforma", value: "Humand" }, { label: "Año", value: "2026" }],
    },

    problem: {
      eyebrow: "El Problema", title: "El mercado está polarizado",
      left:  { icon: "📚", name: "Aprendizaje de Contenidos", desc: "Plataformas que proveen cursos, certificaciones y material de estudio. Foco en consumo de conocimiento.", pills: ["Coursera", "Degreed", "LinkedIn Learning"], color: "blue" },
      gap:   "❌ GAP\nno cubierto",
      right: { icon: "🤝", name: "Coaching Humano", desc: "Herramientas de coaching 1:1, sesiones con mentores y desarrollo liderado por personas.", pills: ["BetterUp", "Pathrise", "Lattice"], color: "green" },
    },

    solucion: {
      eyebrow: "Nuestra Visión",
      title: "Más que herramientas: motivación, talento y futuro.",
      subtitle: "No solo buscamos ofrecer una solución tecnológica. Queremos que las personas aumenten su motivación, desarrollen su talento y elijan quedarse en las empresas con un plan de carrera claro hacia el éxito.",
      pillars: [
        { icon: "🔥", title: "Motivación", desc: "Cuando las personas ven un camino claro de crecimiento, su compromiso se transforma en acción.", color: "#f59e0b" },
        { icon: "💎", title: "Talento", desc: "Desarrollamos las habilidades que la empresa necesita y el colaborador desea, creando valor para ambos.", color: "#6f93eb" },
        { icon: "🚀", title: "Retención", desc: "Un buen plan de carrera reduce la rotación porque las personas eligen quedarse donde pueden crecer.", color: "#22c55e" },
        { icon: "🏆", title: "Éxito", desc: "El éxito no es solo llegar al siguiente nivel — es construir un camino profesional con propósito.", color: "#a78bfa" },
      ],
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
      eyebrow: "Paso 4 · Aprendizaje", title: "Integración módulo de cursos.",
      subtitle: "El módulo integra cursos, certificaciones y workshops de Humand Learn. Cada recurso tiene una prioridad según tu plan de carrera: Esencial, Recomendado u Opcional.",
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

    tools: {
      eyebrow: "Stack del proyecto", title: "Las herramientas que usamos.",
      subtitle: "Construimos esta presentación y el producto con las mejores herramientas disponibles.",
      items: [
        { name: "Claude",  icon: "🤖", img: "/claude-logo.jpg", desc: "IA para diseño y desarrollo",      color: "#a78bfa", bg: "rgba(167,139,250,0.12)" },
        { name: "GitHub",  icon: "🐙", img: "/github-logo.png", desc: "Control de versiones",             color: "#e2e8f0", bg: "rgba(226,232,240,0.08)" },
        { name: "Vercel",  icon: "▲",  img: "/vercel-logo.png", desc: "Deploy y hosting",                 color: "#fff",    bg: "rgba(255,255,255,0.08)" },
        { name: "VS Code", icon: "💙", img: "/vscode-logo.png", desc: "Editor de código",                  color: "#4fc3f7", bg: "rgba(79,195,247,0.12)"  },
        { name: "Figma",   icon: "🎨", img: "/figma-logo.png", desc: "Diseño de interfaz",               color: "#f87171", bg: "rgba(248,113,113,0.12)" },
        { name: "Notion",  icon: "📝", img: "/notion-logo.png", desc: "Documentación y organización",     color: "#e2e8f0", bg: "rgba(226,232,240,0.08)" },
        { name: "Git",     icon: "🔀", img: "/git-logo.png", desc: "Gestión de ramas y commits",       color: "#fb923c", bg: "rgba(251,146,60,0.12)"  },
      ],
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
    labels: ["Intro", "Problem", "Solution", "Map", "Flows", "Tools", "Closing", "Thanks"],

    intro: {
      tag: "🏆 Hackathon 2026 · Product",
      titleA: "Career plan that\nempowers ", titleB: "the talent", titleC: "\nof your company.",
      subtitle: "A module that connects employee aspirations with the manager's vision.",
      meta: [{ label: "Module", value: "Career Path" }, { label: "Platform", value: "Humand" }, { label: "Year", value: "2026" }],
    },

    problem: {
      eyebrow: "The Problem", title: "The market is polarized",
      left:  { icon: "📚", name: "Content Learning",  desc: "Platforms that provide courses, certifications and study material. Focused on knowledge consumption.", pills: ["Coursera", "Degreed", "LinkedIn Learning"], color: "blue" },
      gap:   "❌ GAP\nnot covered",
      right: { icon: "🤝", name: "Human Coaching", desc: "1:1 coaching tools, mentor sessions and people-led development.", pills: ["BetterUp", "Pathrise", "Lattice"], color: "green" },
    },

    solucion: {
      eyebrow: "Our Vision",
      title: "More than tools: motivation, talent and future.",
      subtitle: "We don't just offer a tech solution. We want people to increase their motivation, develop their talent, and choose to stay at companies with a clear career plan toward success.",
      pillars: [
        { icon: "🔥", title: "Motivation", desc: "When people see a clear growth path, their commitment transforms into action.", color: "#f59e0b" },
        { icon: "💎", title: "Talent", desc: "We develop the skills the company needs and the employee wants, creating value for both.", color: "#6f93eb" },
        { icon: "🚀", title: "Retention", desc: "A good career plan reduces turnover because people choose to stay where they can grow.", color: "#22c55e" },
        { icon: "🏆", title: "Success", desc: "Success isn't just reaching the next level — it's building a career path with purpose.", color: "#a78bfa" },
      ],
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
      eyebrow: "Step 4 · Learning", title: "Course module integration.",
      subtitle: "The module integrates courses, certifications and workshops from Humand Learn. Each resource has a priority based on your career plan: Essential, Recommended or Optional.",
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

    tools: {
      eyebrow: "Project stack", title: "The tools we used.",
      subtitle: "We built this presentation and the product with the best tools available.",
      items: [
        { name: "Claude",  icon: "🤖", img: "/claude-logo.jpg", desc: "AI for design and development",    color: "#a78bfa", bg: "rgba(167,139,250,0.12)" },
        { name: "GitHub",  icon: "🐙", img: "/github-logo.png", desc: "Version control",                  color: "#e2e8f0", bg: "rgba(226,232,240,0.08)" },
        { name: "Vercel",  icon: "▲",  img: "/vercel-logo.png", desc: "Deploy and hosting",               color: "#fff",    bg: "rgba(255,255,255,0.08)" },
        { name: "VS Code", icon: "💙", img: "/vscode-logo.png", desc: "Code editor",                       color: "#4fc3f7", bg: "rgba(79,195,247,0.12)"  },
        { name: "Figma",   icon: "🎨", img: "/figma-logo.png", desc: "Interface design",                 color: "#f87171", bg: "rgba(248,113,113,0.12)" },
        { name: "Notion",  icon: "📝", img: "/notion-logo.png", desc: "Documentation and organization",   color: "#e2e8f0", bg: "rgba(226,232,240,0.08)" },
        { name: "Git",     icon: "🔀", img: "/git-logo.png", desc: "Branch and commit management",     color: "#fb923c", bg: "rgba(251,146,60,0.12)"  },
      ],
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

/* ─── MAPA COMPONENT ─────────────────────────────────────────── */
const mapaSteps = [
  { num: "1", title: "Ruta profesional", sub: "Vertical o lateral", angle: -90, dist: 290, color: BRAND },
  { num: "2", title: "Habilidades", sub: "Brechas hard y soft", angle: -36, dist: 300, color: BRAND },
  { num: "3", title: "Objetivos", sub: "Corto · medio · largo", angle: 18, dist: 305, color: BRAND },
  { num: "4", title: "Aprendizaje", sub: "Cursos priorizados", angle: 72, dist: 300, color: BRAND },
  { num: "5", title: "Revisión y envío", sub: "Manager aprueba o comenta", angle: 126, dist: 290, color: "#22c55e" },
];
const mapaMgr = [
  { title: "Vista del manager", sub: "Revisa · aprueba · sugiere", angle: 162, dist: 330 },
  { title: "Seguimiento continuo", sub: "Nuevos objetivos y cursos", angle: 190, dist: 330 },
  { title: "Plan activo", sub: "Progreso y objetivos", angle: -144, dist: 320 },
];
const toXY = (angle, dist) => ({
  x: Math.cos((angle * Math.PI) / 180) * dist,
  y: Math.sin((angle * Math.PI) / 180) * dist,
});

function MapaSlide({ anim }) {
  const [hovered, setHovered] = useState(null);   // "s0"…"s4" | "m0"…"m2" | null
  const [hoveredHub, setHoveredHub] = useState(false);

  return (
    <div style={{ height: "100%", background: "radial-gradient(ellipse at 50% 45%, #111830 0%, #0a0a14 65%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
      <style>{`
        @keyframes dash-flow { to { stroke-dashoffset: -20; } }
        @keyframes dash-flow-mgr { to { stroke-dashoffset: -16; } }
        @keyframes wiggle-1 { 0%,100% { transform: translate(-50%,-50%) translateY(0px); } 50% { transform: translate(-50%,-50%) translateY(-5px); } }
        @keyframes wiggle-2 { 0%,100% { transform: translate(-50%,-50%) translateX(0px); } 50% { transform: translate(-50%,-50%) translateX(4px); } }
        @keyframes wiggle-3 { 0%,100% { transform: translate(-50%,-50%) translateY(0px) rotate(0deg); } 50% { transform: translate(-50%,-50%) translateY(-3px) rotate(1deg); } }
        @keyframes wiggle-hub { 0%,100% { transform: translate(-50%,-50%) scale(1); } 50% { transform: translate(-50%,-50%) scale(1.03); } }
      `}</style>
      <GridBg />
      <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: 1100, textAlign: "center" }}>
        <div style={{ position: "relative", width: "100%", height: "100vh", maxHeight: 680 }}>
          {/* SVG lines */}
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: anim ? 1 : 0, transition: "opacity 1s ease 0.4s" }}>
            {mapaSteps.map((s, i) => {
              const hubR = 155;
              const hw = 100, hh = 30;
              const rad = (s.angle * Math.PI) / 180;
              const ax = Math.abs(Math.cos(rad)), ay = Math.abs(Math.sin(rad));
              const cardR = Math.min(ax > 0.01 ? hw / ax : 9999, ay > 0.01 ? hh / ay : 9999) + 5;
              const ratio0 = hubR / s.dist;
              const ratio1 = (s.dist - cardR) / s.dist;
              const p = toXY(s.angle, s.dist);
              const x1 = p.x * ratio0, y1 = p.y * ratio0;
              const x2 = p.x * ratio1, y2 = p.y * ratio1;
              const active = hovered === `s${i}` || hoveredHub;
              return <line key={`s${i}`} x1={`calc(50% + ${x1}px)`} y1={`calc(46% + ${y1}px)`} x2={`calc(50% + ${x2}px)`} y2={`calc(46% + ${y2}px)`} stroke={i === 4 ? "#22c55e" : BRAND} strokeWidth={active ? 2.5 : 1.5} strokeDasharray={active ? "8 4" : "6 4"} strokeOpacity={active ? 0.9 : 0.3} style={{ transition: "all 0.35s ease", animation: active ? "dash-flow 0.6s linear infinite" : "none" }} />;
            })}
            {mapaMgr.map((m, i) => {
              const hubR = 155;
              const hw = 95, hh = 28;
              const rad = (m.angle * Math.PI) / 180;
              const ax = Math.abs(Math.cos(rad)), ay = Math.abs(Math.sin(rad));
              const cardR = Math.min(ax > 0.01 ? hw / ax : 9999, ay > 0.01 ? hh / ay : 9999) + 5;
              const ratio0 = hubR / m.dist;
              const ratio1 = (m.dist - cardR) / m.dist;
              const p = toXY(m.angle, m.dist);
              const x1 = p.x * ratio0, y1 = p.y * ratio0;
              const x2 = p.x * ratio1, y2 = p.y * ratio1;
              const active = hovered === `m${i}` || hoveredHub;
              return <line key={`m${i}`} x1={`calc(50% + ${x1}px)`} y1={`calc(46% + ${y1}px)`} x2={`calc(50% + ${x2}px)`} y2={`calc(46% + ${y2}px)`} stroke="#22c55e" strokeWidth={active ? 2 : 1.5} strokeDasharray="5 5" strokeOpacity={active ? 0.7 : 0.3} style={{ transition: "all 0.35s ease", animation: active ? "dash-flow-mgr 0.5s linear infinite" : "none" }} />;
            })}
          </svg>
          {/* Center hub - Hugo */}
          <div
            onMouseEnter={() => setHoveredHub(true)}
            onMouseLeave={() => setHoveredHub(false)}
            style={{ position: "absolute", top: "46%", left: "50%", display: "flex", flexDirection: "column", alignItems: "center", zIndex: 5, opacity: anim ? (hoveredHub ? 1 : 0.85) : 0, animation: anim ? "wiggle-hub 3.5s ease-in-out infinite" : "none", transition: "opacity 0.35s ease", cursor: "pointer" }}>
            <div style={{ position: "relative", width: 340, height: 340 }}>
              <img src="/hugo.png" alt="Hugo" style={{ width: "100%", height: "100%", objectFit: "contain", filter: hoveredHub ? "drop-shadow(0 0 22px rgba(111,147,235,0.5))" : "drop-shadow(0 0 10px rgba(111,147,235,0.15))", transition: "filter 0.35s ease" }} />
            </div>
          </div>
          {/* Collaborator steps */}
          {mapaSteps.map((s, i) => {
            const p = toXY(s.angle, s.dist);
            const active = hovered === `s${i}`;
            const wiggle = ["wiggle-1", "wiggle-2", "wiggle-3", "wiggle-1", "wiggle-2"][i];
            const dur = [3.2, 3.8, 4.1, 3.5, 3.9][i];
            return (
              <div key={`step${i}`}
                onMouseEnter={() => setHovered(`s${i}`)}
                onMouseLeave={() => setHovered(null)}
                style={{ position: "absolute", top: `calc(46% + ${p.y}px)`, left: `calc(50% + ${p.x}px)`, zIndex: 4, opacity: anim ? (active ? 1 : 0.6) : 0, animation: anim ? `${wiggle} ${dur}s ease-in-out infinite` : "none", transition: "opacity 0.35s ease", cursor: "pointer" }}>
                <div style={{ position: "relative", background: active ? (i === 4 ? "rgba(34,197,94,0.2)" : "rgba(111,147,235,0.18)") : (i === 4 ? "rgba(34,197,94,0.1)" : "rgba(111,147,235,0.08)"), border: `1.5px solid ${i === 4 ? (active ? "rgba(34,197,94,0.6)" : "rgba(34,197,94,0.35)") : (active ? "rgba(111,147,235,0.55)" : "rgba(111,147,235,0.3)")}`, borderRadius: 16, padding: "16px 24px", minWidth: 170, textAlign: "center", backdropFilter: "blur(8px)", boxShadow: active ? `0 0 20px ${i === 4 ? "rgba(34,197,94,0.2)" : "rgba(111,147,235,0.2)"}` : "none", transform: active ? "scale(1.08)" : "scale(1)", transition: "all 0.35s ease" }}>
                  <div style={{ position: "absolute", top: -13, left: -9, width: 28, height: 28, borderRadius: "50%", background: s.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: "#fff", boxShadow: active ? `0 0 12px ${s.color}66` : "none", transition: "box-shadow 0.35s ease" }}>{s.num}</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 700, color: "#fff" }}>{s.title}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", marginTop: 4 }}>{s.sub}</div>
                </div>
              </div>
            );
          })}
          {/* Manager actions */}
          {mapaMgr.map((m, i) => {
            const p = toXY(m.angle, m.dist);
            const active = hovered === `m${i}`;
            const wiggle = ["wiggle-3", "wiggle-1", "wiggle-2"][i];
            const dur = [4.3, 3.7, 4.0][i];
            return (
              <div key={`mgr${i}`}
                onMouseEnter={() => setHovered(`m${i}`)}
                onMouseLeave={() => setHovered(null)}
                style={{ position: "absolute", top: `calc(46% + ${p.y}px)`, left: `calc(50% + ${p.x}px)`, zIndex: 4, opacity: anim ? (active ? 1 : 0.85) : 0, animation: anim ? `${wiggle} ${dur}s ease-in-out infinite` : "none", transition: "opacity 0.35s ease", cursor: "pointer" }}>
                <div style={{ background: active ? "rgba(34,197,94,0.15)" : "rgba(34,197,94,0.06)", border: `1.5px dashed ${active ? "rgba(34,197,94,0.5)" : "rgba(34,197,94,0.25)"}`, borderRadius: 14, padding: "14px 20px", minWidth: 160, textAlign: "center", boxShadow: active ? "0 0 16px rgba(34,197,94,0.1)" : "none", transform: active ? "scale(1.08)" : "scale(1)", transition: "all 0.35s ease" }}>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 700, color: active ? "#86efac" : "rgba(34,197,94,0.7)" }}>{m.title}</div>
                  <div style={{ fontSize: 12, color: active ? "rgba(34,197,94,0.6)" : "rgba(34,197,94,0.4)", marginTop: 3 }}>{m.sub}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

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
          <div style={{ marginTop: 32, display: "flex", gap: 24, opacity: anim ? 1 : 0, transform: anim ? "translateY(0)" : "translateY(24px)", transition: "all 0.6s ease 0.55s" }}>
            {[{ photo: "/angelo.jpg", name: "Angelo", color: "#6f93eb" }, { photo: "/sofia.png", name: "Sofia", color: "#22c55e" }, { photo: "/olivia.jpg", name: "Olivia", color: "#a78bfa" }, { photo: "/julian.jpg", name: "Julian", color: "#f59e0b" }].map((p, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", overflow: "hidden", border: `2px solid ${p.color}` }}>
                  <img src={p.photo} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>{p.name}</span>
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
      <div style={{ height: "100%", background: BG, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 60, position: "relative", overflow: "hidden" }}>
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
        <img src="/hugo-plan-carrera.png" alt="Hugo - Plan de Carrera" style={{ position: "absolute", bottom: -10, right: 40, width: 160, height: "auto", opacity: anim ? 0.9 : 0, transform: anim ? "translateY(0)" : "translateY(40px)", transition: "all 0.7s ease 0.8s", filter: "drop-shadow(0 4px 20px rgba(111,147,235,0.3))" }} />
      </div>
    );
  }},

  /* 2 ── SOLUCIÓN */
  { label: "Solución", render: (anim, t) => {
    const c = t.solucion;
    return (
      <div style={{ height: "100%", background: "radial-gradient(ellipse at 50% 40%, #1a2a5e 0%, #0a0a14 65%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 60px", position: "relative", overflow: "hidden" }}>
        <GridBg />
        <div style={{ position: "absolute", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(111,147,235,0.08) 0%, transparent 70%)", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
        <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: 900 }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <Eyebrow anim={anim} delay={0}>{c.eyebrow}</Eyebrow>
            <SlideTitle anim={anim} size={46} delay={0.1}>
              {c.title}
            </SlideTitle>
            <p style={{ fontSize: 17, color: "rgba(255,255,255,0.55)", marginTop: 16, lineHeight: 1.7, maxWidth: 700, margin: "16px auto 0", opacity: anim ? 1 : 0, transform: anim ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s ease 0.25s" }}>
              {c.subtitle}
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
            {c.pillars.map((p, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: 28, textAlign: "center", opacity: anim ? 1 : 0, transform: anim ? "translateY(0)" : "translateY(30px)", transition: `all 0.6s ease ${0.35 + i * 0.1}s` }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>{p.icon}</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 20, fontWeight: 800, color: p.color, marginBottom: 12 }}>{p.title}</div>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }},

  /* 3 ── MAPA PLAN DE CARRERA */
  { label: "Mapa", render: (anim) => <MapaSlide anim={anim} /> },

  /* 4 ── 3 FLUJOS */
  { label: "Flujos", render: (anim, t) => (
    <div style={{ height: "100%", background: "radial-gradient(ellipse at 50% 40%, #1a2a5e 0%, #0a0a14 65%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 60px", position: "relative", overflow: "hidden" }}>
      <GridBg />
      <div style={{ position: "absolute", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(111,147,235,0.08) 0%, transparent 70%)", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
      <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: 860 }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <Eyebrow anim={anim} delay={0}>Cobertura completa</Eyebrow>
          <SlideTitle anim={anim} size={42} delay={0.1}>
            Abarcamos los <GradText>3 flujos</GradText> del módulo.
          </SlideTitle>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", marginTop: 16, lineHeight: 1.6, opacity: anim ? 1 : 0, transition: "all 0.5s ease 0.25s" }}>
            Career Path está diseñado pensando en todos los actores de la organización.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {[
            {
              icon: <svg width="30" height="30" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" fill="#6f93eb"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7" fill="#6f93eb"/></svg>, name: "Colaborador", color: "#6f93eb", bg: "rgba(111,147,235,0.1)", border: "rgba(111,147,235,0.3)",
              items: ["Crea y gestiona su propio plan", "Define su ruta y objetivos", "Identifica brechas de skills", "Accede a cursos priorizados", "Envía el plan al manager"],
            },
            {
              icon: <svg width="30" height="30" viewBox="0 0 24 24" fill="none"><circle cx="9" cy="8" r="3.5" fill="#22c55e"/><path d="M1 21c0-3.5 3.5-6 8-6s8 2.5 8 6" fill="#22c55e"/><circle cx="17" cy="7" r="3" fill="#22c55e" opacity="0.6"/><path d="M15 15c2 0 5 1.5 5 4.5" stroke="#22c55e" strokeWidth="1.5" opacity="0.6"/></svg>, name: "Manager", color: "#22c55e", bg: "rgba(34,197,94,0.1)", border: "rgba(34,197,94,0.3)",
              items: ["Ve el plan de todo su equipo", "Aprueba o sugiere cambios", "Detecta brechas en el equipo", "Recibe alertas de planes", "Acompaña el desarrollo real"],
            },
            {
              icon: <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><defs><mask id="gm"><rect width="32" height="32" fill="white"/><circle cx="16" cy="15" r="4.5" fill="black"/></mask></defs><path d="M14.5 2h3l.5 3.2a9.5 9.5 0 012.6 1.5l3-1.4 2.1 2.1-1.4 3a9.5 9.5 0 011.5 2.6l3.2.5v3l-3.2.5a9.5 9.5 0 01-1.5 2.6l1.4 3-2.1 2.1-3-1.4a9.5 9.5 0 01-2.6 1.5L17.5 28h-3l-.5-3.2a9.5 9.5 0 01-2.6-1.5l-3 1.4-2.1-2.1 1.4-3a9.5 9.5 0 01-1.5-2.6L3 16.5v-3l3.2-.5a9.5 9.5 0 011.5-2.6l-1.4-3 2.1-2.1 3 1.4a9.5 9.5 0 012.6-1.5z" fill="#9ca3af" mask="url(#gm)"/></svg>, name: "Admin", color: "#9ca3af", bg: "rgba(156,163,175,0.08)", border: "rgba(156,163,175,0.25)",
              items: ["Configura rutas y roles", "Gestiona habilidades globales", "Accede a reportes y métricas", "Administra permisos por equipo"],
            },
          ].map((flow, i) => (
            <div key={i} style={{ background: flow.bg, border: `1px solid ${flow.border}`, borderRadius: 20, padding: 28, opacity: anim ? 1 : 0, transform: anim ? "translateY(0)" : "translateY(28px)", transition: `all 0.6s ease ${0.3 + i * 0.12}s` }}>
              <div style={{ fontSize: 30, marginBottom: 14, lineHeight: 1, color: "#fff" }}>{flow.icon}</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 20, fontWeight: 800, color: flow.color, marginBottom: 16 }}>{flow.name}</div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 9 }}>
                {flow.items.map((item, j) => (
                  <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: 9, fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.4 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: flow.color, marginTop: 5, flexShrink: 0 }} />{item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )},

  /* 4 ── TOOLS TIMELINE */
  { label: "Tools", render: (anim) => {
    const allSteps = [
      { num: "01", title: "Benchmark", desc: "Análisis de mercado con IA", logos: ["/claude-logo.jpg"], stage: "Discovery", color: "#f59e0b" },
      { num: "02", title: "UI en Figma Make", desc: "Flujo con prompt + librería Hugo", logos: ["/figma-logo.png"], stage: "Frontend", color: BRAND },
      { num: "03", title: "Vibecoding", desc: "Ajuste en terminal con design system", logos: ["/claude-logo.jpg", "/vscode-logo.png"], stage: "Frontend", color: BRAND },
      { num: "04", title: "Deploy front", desc: "Código a GitHub + Vercel", logos: ["/github-logo.png", "/vercel-logo.png"], stage: "Frontend", color: BRAND },
      { num: "05", title: "Deploy back", desc: "Código a GitHub + Render", logos: ["/github-logo.png"], stage: "Backend", color: "#22c55e" },
      { num: "06", title: "Integración", desc: "Backend + frontend desplegados", logos: ["/vercel-logo.png"], stage: "Integración", color: "#a78bfa" },
      { num: "07", title: "Presentación", desc: "Armada en Claude", logos: ["/claude-logo.jpg"], stage: "Integración", color: "#a78bfa" },
    ];
    return (
      <div style={{ height: "100%", background: BG, display: "flex", flexDirection: "column", justifyContent: "center", padding: "30px 40px", position: "relative", overflow: "hidden" }}>
        <GridBg />
        <div style={{ position: "relative", zIndex: 2, width: "100%" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <Eyebrow anim={anim}>Nuestro proceso</Eyebrow>
            <SlideTitle anim={anim} size={36}>Cómo lo <GradText>construimos</GradText></SlideTitle>
          </div>
          {/* Timeline container */}
          <div style={{ position: "relative", display: "flex", width: "100%" }}>
            {/* Horizontal line */}
            <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 3, background: "rgba(255,255,255,0.12)", transform: "translateY(-50%)", zIndex: 1, opacity: anim ? 1 : 0, transition: "opacity 0.6s ease 0.2s" }} />
            {/* Steps */}
            {allSteps.map((step, i) => {
              const above = i % 2 === 0;
              const prevColor = i > 0 ? allSteps[i-1].color : null;
              const isNewStage = i === 0 || step.stage !== allSteps[i-1].stage;
              return (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", position: "relative", opacity: anim ? 1 : 0, transform: anim ? "translateY(0)" : `translateY(${above ? "20px" : "-20px"})`, transition: `all 0.5s ease ${0.25 + i * 0.1}s` }}>
                  {/* Top content (above items) */}
                  <div style={{ height: 210, display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "center", paddingBottom: 18, width: "100%" }}>
                    {above && <>
                      <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
                        {step.logos.map((logo, li) => (
                          <div key={li} style={{ width: 34, height: 34, borderRadius: "50%", overflow: "hidden", border: `2px solid ${step.color}44`, background: "rgba(255,255,255,0.05)" }}>
                            <img src={logo} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          </div>
                        ))}
                      </div>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 700, color: "#fff", textAlign: "center", lineHeight: 1.3, marginBottom: 6 }}>{step.title}</div>
                      <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", textAlign: "center", lineHeight: 1.5, maxWidth: 140 }}>{step.desc}</div>
                    </>}
                  </div>
                  {/* Vertical bar + circle on timeline */}
                  <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
                    {/* Vertical colored bar */}
                    <div style={{ width: 4, height: above ? 36 : 0, background: step.color, borderRadius: 2 }} />
                    {/* Circle on line */}
                    <div style={{ width: 44, height: 44, borderRadius: "50%", background: `${step.color}22`, border: `3px solid ${step.color}`, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 3 }}>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 800, color: step.color }}>{step.num}</span>
                    </div>
                    {/* Vertical colored bar down */}
                    <div style={{ width: 4, height: above ? 0 : 36, background: step.color, borderRadius: 2 }} />
                    {/* Stage label at transition */}
                    {isNewStage && (
                      <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", whiteSpace: "nowrap", ...(above ? { bottom: -30 } : { top: -30 }) }}>
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 800, color: step.color, textTransform: "uppercase", letterSpacing: "1.5px", background: BG, padding: "2px 8px", borderRadius: 4, border: `1px solid ${step.color}33` }}>{step.stage}</span>
                      </div>
                    )}
                  </div>
                  {/* Bottom content (below items) */}
                  <div style={{ height: 210, display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "center", paddingTop: 18, width: "100%" }}>
                    {!above && <>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 700, color: "#fff", textAlign: "center", lineHeight: 1.3, marginBottom: 6 }}>{step.title}</div>
                      <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", textAlign: "center", lineHeight: 1.5, maxWidth: 140, marginBottom: 12 }}>{step.desc}</div>
                      <div style={{ display: "flex", gap: 6 }}>
                        {step.logos.map((logo, li) => (
                          <div key={li} style={{ width: 34, height: 34, borderRadius: "50%", overflow: "hidden", border: `2px solid ${step.color}44`, background: "rgba(255,255,255,0.05)" }}>
                            <img src={logo} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          </div>
                        ))}
                      </div>
                    </>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }},

  /* 6 ── CIERRE */
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
              { href: "https://drive.google.com/file/d/1azLC-QJGkxqKtz6MR4Cbua93rpat9NdC/view?usp=sharing", label: c.videoLabel, sub: c.videoSub },
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
