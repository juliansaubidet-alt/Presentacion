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
    labels: ["Intro", "Problema", "Gaps", "Solución", "Por qué", "Cierre", "Gracias"],

    intro: {
      tag: "🏆 Huckaton 2026 · Producto",
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
      eyebrow: "Insights del Benchmark", title: "5 gaps que nadie está cubriendo",
      items: [
        { num: "Gap 01", title: "El empleado es usuario de segunda clase",   body: "Los productos B2B requieren configuración pesada por HR antes de que el colaborador pueda usarlos." },
        { num: "Gap 02", title: "Learning y carrera, mundos separados",       body: "El usuario aprende en un lado y gestiona su carrera en otro. Ninguna plataforma los integra con profundidad." },
        { num: "Gap 03", title: "Solo miden dentro de la plataforma",         body: "Nadie mide lo que ocurre fuera: proyectos reales, reconocimientos externos, logros en el trabajo." },
        { num: "Gap 04", title: "IA solo para recomendar contenido",          body: "Casi nadie usa IA para ayudar al colaborador a reflexionar sobre su carrera o co-crear su propio plan." },
        { num: "Gap 05", title: "Sin seguimiento en tiempo real",             body: "Los planes de carrera son documentos estáticos. No hay visibilidad compartida entre colaborador y manager." },
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
    },
  },

  en: {
    nav: { prev: "← Previous", next: "Next →", hint: "← → navigate" },
    labels: ["Intro", "Problem", "Gaps", "Solution", "Why Us", "Closing", "Thanks"],

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
      eyebrow: "Benchmark Insights", title: "5 gaps nobody is covering",
      items: [
        { num: "Gap 01", title: "Employee is a second-class user",     body: "B2B products require heavy HR configuration before the employee can use them." },
        { num: "Gap 02", title: "Learning and career, separate worlds", body: "Users learn in one place and manage their career in another. No platform integrates them deeply." },
        { num: "Gap 03", title: "Only measure inside the platform",    body: "Nobody measures what happens outside: real projects, external recognition, work achievements." },
        { num: "Gap 04", title: "AI only for content recommendations", body: "Almost nobody uses AI to help employees reflect on their career or co-create their own plan." },
        { num: "Gap 05", title: "No real-time tracking",               body: "Career plans are static documents. No shared visibility between employee and manager." },
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
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, maxWidth: 900, width: "100%" }}>
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

  /* 3 ── SOLUCIÓN */
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

  /* 4 ── DIFERENCIADOR */
  { label: "Por qué", render: (anim, t) => {
    const c = t.diff;
    return (
      <div style={{ height: "100%", background: BG, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 60 }}>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <Eyebrow anim={anim}>{c.eyebrow}</Eyebrow>
          <SlideTitle anim={anim}>{c.title}</SlideTitle>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20, width: "100%", maxWidth: 860, opacity: anim ? 1 : 0, transition: "opacity 0.6s ease 0.3s" }}>
          <div style={{ flex: 1, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(239,68,68,0.15)", borderRadius: 16, padding: 28 }}>
            <div style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "1.5px", color: "rgba(255,255,255,0.35)", marginBottom: 20 }}>{c.them.label}</div>
            {c.them.items.map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, marginBottom: 14, color: "rgba(255,255,255,0.6)" }}>
                <span>❌</span>{item}
              </div>
            ))}
          </div>
          <div style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.4)", flexShrink: 0 }}>VS</div>
          <div style={{ flex: 1, background: "rgba(111,147,235,0.05)", border: "1px solid rgba(111,147,235,0.3)", borderRadius: 16, padding: 28 }}>
            <div style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "1.5px", color: BRAND, marginBottom: 20 }}>{c.us.label}</div>
            {c.us.items.map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, marginBottom: 14, color: "rgba(255,255,255,0.88)" }}>
                <span>✅</span>{item}
              </div>
            ))}
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
          <div style={{ width: 72, height: 72, borderRadius: 18, background: "rgba(111,147,235,0.2)", border: "1px solid rgba(111,147,235,0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px", boxShadow: "0 12px 40px rgba(111,147,235,0.25)" }}>
            <span style={{ fontFamily: "'Inter', sans-serif", color: "#a5bcf5", fontSize: 22, fontWeight: 800 }}>hu</span>
          </div>
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
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 17, fontWeight: 700, color: "rgba(255,255,255,0.8)", letterSpacing: "-0.5px" }}>humand</div>
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
              <button key={i} onClick={() => goTo(i)} title={label} style={{ flex: "0 0 auto", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", width: 72, height: 42, borderRadius: 8, border: `1.5px solid ${i === current ? BRAND : "rgba(255,255,255,0.1)"}`, background: i === current ? "rgba(111,147,235,0.18)" : i < current ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.02)", cursor: "pointer", transition: "all 0.25s", padding: "0 4px 5px", backdropFilter: "blur(4px)" }}>
                <span style={{ fontSize: 8, fontWeight: 600, color: i === current ? "#a5bcf5" : "rgba(255,255,255,0.38)", textAlign: "center" }}>{i + 1}. {label}</span>
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
