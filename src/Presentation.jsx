import { useState, useEffect, useCallback, useRef } from "react";

/* ─── TRANSLATIONS ───────────────────────────────────────────── */
const i18n = {
  es: {
    nav: { prev: "← Anterior", next: "Siguiente →", exit: "✕ Salir", hint: "← → navegar" },
    labels: ["Inicio", "Problema", "Solución", "Colaborador", "Manager", "Admin", "Aprendizaje", "Equipo", "Cierre", "Gracias"],
    cover: {
      badge: "Módulo de Desarrollo Profesional",
      title: "Career Path",
      subtitle: "Planificá, desarrollá y retené el talento de tu organización",
      hint: "→ navegá con las flechas del teclado",
    },
    problem: {
      badge: "EL PROBLEMA",
      title: "El talento se va cuando\nno ve un futuro claro",
      body: "Las empresas pierden a sus mejores colaboradores porque no tienen visibilidad sobre su crecimiento profesional.",
      stats: [
        { num: "76%", desc: "de empleados busca oportunidades de crecimiento", icon: "📈" },
        { num: "94%", desc: "se quedaría más si la empresa invierte en su carrera", icon: "🏢" },
        { num: "2x",  desc: "más retención con planes de carrera definidos",       icon: "🎯" },
      ],
    },
    solution: {
      badge: "LA SOLUCIÓN",
      title: "Career Path by Humand",
      body: "Un módulo integral que conecta a colaboradores, managers y HR en un mismo ecosistema de desarrollo profesional.",
      roles: [
        { role: "Colaborador", color: "#4F46E5", desc: "Visualiza su ruta, identifica brechas y traza su camino", icon: "👤" },
        { role: "Manager",     color: "#16A34A", desc: "Revisa, aprueba y da seguimiento al desarrollo de su equipo", icon: "👥" },
        { role: "HU Admin",    color: "#7C3AED", desc: "Define roles, skills, métricas y rutas organizacionales", icon: "⚙️" },
      ],
    },
    collaborator: {
      badge: "COLABORADOR",
      title: "Tu mapa de carrera personalizado",
      features: [
        { title: "Rol actual y meta",    desc: "Visualizá dónde estás y hacia dónde vas" },
        { title: "Análisis de brechas",  desc: "Identificá qué skills te faltan para avanzar" },
        { title: "Objetivos claros",     desc: "Corto, mediano y largo plazo definidos" },
        { title: "Cursos recomendados",  desc: "Acciones concretas para crecer" },
      ],
      cardLevels: ["Junior", "Product", "Senior"],
    },
    manager: {
      badge: "MANAGER",
      title: "Liderá el crecimiento de tu equipo",
      features: [
        { title: "Panel de equipo",       desc: "Visualizá el estado de cada reporte directo" },
        { title: "Aprobación de planes",  desc: "Revisá y aprobá planes de carrera" },
        { title: "Mapa visual",           desc: "Seguí el progreso en el career map" },
        { title: "Feedback directo",      desc: "Sugerí cambios y enviá comentarios" },
      ],
      teamTitle: "Mi equipo",
      teamSub: "5 reportes",
      members: [
        { name: "Ana García",   role: "Product Designer",  status: "En revisión", color: "#F59E0B" },
        { name: "Luis Herrera", role: "Frontend Engineer", status: "Aprobado",    color: "#16A34A" },
        { name: "Mia Torres",   role: "UX Researcher",     status: "En revisión", color: "#F59E0B" },
        { name: "Carlos Ruiz",  role: "Backend Engineer",  status: "Sin plan",    color: "#9CA3AF" },
      ],
    },
    admin: {
      badge: "HU ADMIN",
      title: "Configurá toda la organización",
      features: [
        { title: "Definir roles y niveles",  desc: "Creá la estructura de carrera por área" },
        { title: "Skills requeridas",        desc: "Asigná habilidades técnicas y blandas por rol" },
        { title: "Competencias",             desc: "Agrupá skills en competencias organizadas" },
        { title: "Métricas y salud org.",    desc: "Dashboards con visibilidad total" },
      ],
      stats: [
        { num: "12", label: "Rutas definidas",   icon: "🏛️" },
        { num: "38", label: "Planes activos",    icon: "✅" },
        { num: "7",  label: "En revisión",       icon: "🔄" },
        { num: "4",  label: "Listos para promo", icon: "🏆" },
      ],
      skillsLabel: "SKILLS REQUERIDAS",
    },
    learning: {
      badge: "DESARROLLO",
      title: "Cursos y aprendizaje integrado",
      body: "Cada plan incluye acciones concretas vinculadas al crecimiento del colaborador.",
      courses: [
        { type: "CURSO",         title: "Stakeholder Management Fundamentals", source: "LinkedIn Learning · 4h",  tag: "Esencial",    tagColor: "#4F46E5" },
        { type: "CERTIFICACIÓN", title: "Advanced Design Systems",             source: "Figma Academy · 12h",     tag: "Esencial",    tagColor: "#4F46E5" },
        { type: "CURSO",         title: "UX Research Methods",                 source: "Humand Learn · 8h",       tag: "Recomendado", tagColor: "#16A34A" },
      ],
      goalsTitle: "Objetivos con plazos",
      goals: [
        { obj: "Completar curso de UX Research", plazo: "Corto plazo",   done: true },
        { obj: "Liderar Design Sprint Q3",        plazo: "Mediano plazo", done: false },
        { obj: "Sesiones de mentoría (×6)",       plazo: "Mediano plazo", done: false },
      ],
    },
    team: {
      badge: "NUESTRO EQUIPO",
      title: "Las personas detrás de Career Path",
      body: "Un equipo multidisciplinario apasionado por el desarrollo del talento",
      people: [
        { name: "Angelo\nSegura",   initials: "AS", color: "#4F46E5", photo: "/angelo.jpg" },
        { name: "Sofia\nCarro",     initials: "SC", color: "#16A34A", photo: "/sofia.png" },
        { name: "Olivia\nCavallo",  initials: "OC", color: "#7C3AED", photo: "/olivia.jpg" },
        { name: "Julian\nSaubidet", initials: "JS", color: "#F59E0B", photo: "/julian.jpg" },
      ],
    },
    closing: {
      title: "Potenciá el talento.\nTransformá tu organización.",
      body: "Career Path conecta a tu equipo con su futuro profesional, dentro de tu empresa.",
      demoLabel: "Probá la demo",
      demoSub: "Explorá la plataforma en vivo →",
      videoLabel: "Video explicativo",
      videoSub: "Mirá cómo funciona →",
    },
    thanks: {
      title: "¡Muchas gracias!",
      body: "¿Preguntas? Estamos para ayudarte a transformar el desarrollo profesional de tu organización.",
      names: "Angelo · Sofia · Olivia · Julian",
    },
  },

  en: {
    nav: { prev: "← Previous", next: "Next →", exit: "✕ Exit", hint: "← → navigate" },
    labels: ["Start", "Problem", "Solution", "Employee", "Manager", "Admin", "Learning", "Team", "Closing", "Thanks"],
    cover: {
      badge: "Professional Development Module",
      title: "Career Path",
      subtitle: "Plan, develop and retain your organization's talent",
      hint: "→ navigate with arrow keys",
    },
    problem: {
      badge: "THE PROBLEM",
      title: "Talent leaves when\nit sees no clear future",
      body: "Companies lose their best employees because they lack visibility into their professional growth.",
      stats: [
        { num: "76%", desc: "of employees seek growth opportunities",                icon: "📈" },
        { num: "94%", desc: "would stay longer if the company invests in their career", icon: "🏢" },
        { num: "2x",  desc: "more retention with defined career paths",               icon: "🎯" },
      ],
    },
    solution: {
      badge: "THE SOLUTION",
      title: "Career Path by Humand",
      body: "A comprehensive module connecting employees, managers and HR in a single professional development ecosystem.",
      roles: [
        { role: "Employee", color: "#4F46E5", desc: "Visualizes their path, identifies gaps and charts their journey", icon: "👤" },
        { role: "Manager",  color: "#16A34A", desc: "Reviews, approves and tracks their team's development", icon: "👥" },
        { role: "HU Admin", color: "#7C3AED", desc: "Defines roles, skills, metrics and organizational paths", icon: "⚙️" },
      ],
    },
    collaborator: {
      badge: "EMPLOYEE",
      title: "Your personalized career map",
      features: [
        { title: "Current role & goal",      desc: "See where you are and where you're going" },
        { title: "Gap analysis",             desc: "Identify which skills you need to advance" },
        { title: "Clear objectives",         desc: "Short, medium and long-term goals defined" },
        { title: "Recommended courses",      desc: "Concrete actions to grow" },
      ],
      cardLevels: ["Junior", "Product", "Senior"],
    },
    manager: {
      badge: "MANAGER",
      title: "Lead your team's growth",
      features: [
        { title: "Team panel",        desc: "See the status of each direct report" },
        { title: "Plan approvals",    desc: "Review and approve career plans" },
        { title: "Visual map",        desc: "Track progress in the career map" },
        { title: "Direct feedback",   desc: "Suggest changes and send comments" },
      ],
      teamTitle: "My team",
      teamSub: "5 reports",
      members: [
        { name: "Ana García",   role: "Product Designer",  status: "Under review", color: "#F59E0B" },
        { name: "Luis Herrera", role: "Frontend Engineer", status: "Approved",     color: "#16A34A" },
        { name: "Mia Torres",   role: "UX Researcher",     status: "Under review", color: "#F59E0B" },
        { name: "Carlos Ruiz",  role: "Backend Engineer",  status: "No plan",      color: "#9CA3AF" },
      ],
    },
    admin: {
      badge: "HU ADMIN",
      title: "Configure the entire organization",
      features: [
        { title: "Define roles & levels",  desc: "Create the career structure by area" },
        { title: "Required skills",        desc: "Assign technical and soft skills per role" },
        { title: "Competencies",           desc: "Group skills into organized competencies" },
        { title: "Metrics & org health",   desc: "Dashboards with full visibility" },
      ],
      stats: [
        { num: "12", label: "Defined paths",      icon: "🏛️" },
        { num: "38", label: "Active plans",        icon: "✅" },
        { num: "7",  label: "Under review",        icon: "🔄" },
        { num: "4",  label: "Ready for promo",     icon: "🏆" },
      ],
      skillsLabel: "REQUIRED SKILLS",
    },
    learning: {
      badge: "DEVELOPMENT",
      title: "Integrated courses & learning",
      body: "Each plan includes concrete actions linked to the employee's growth.",
      courses: [
        { type: "COURSE",        title: "Stakeholder Management Fundamentals", source: "LinkedIn Learning · 4h",  tag: "Essential",    tagColor: "#4F46E5" },
        { type: "CERTIFICATION", title: "Advanced Design Systems",             source: "Figma Academy · 12h",     tag: "Essential",    tagColor: "#4F46E5" },
        { type: "COURSE",        title: "UX Research Methods",                 source: "Humand Learn · 8h",       tag: "Recommended",  tagColor: "#16A34A" },
      ],
      goalsTitle: "Goals with deadlines",
      goals: [
        { obj: "Complete UX Research course", plazo: "Short-term",  done: true },
        { obj: "Lead Design Sprint Q3",        plazo: "Mid-term",   done: false },
        { obj: "Mentoring sessions (×6)",      plazo: "Mid-term",   done: false },
      ],
    },
    team: {
      badge: "OUR TEAM",
      title: "The people behind Career Path",
      body: "A multidisciplinary team passionate about talent development",
      people: [
        { name: "Angelo\nSegura",   initials: "AS", color: "#4F46E5", photo: "/angelo.jpg" },
        { name: "Sofia\nCarro",     initials: "SC", color: "#16A34A", photo: "/sofia.png" },
        { name: "Olivia\nCavallo",  initials: "OC", color: "#7C3AED", photo: "/olivia.jpg" },
        { name: "Julian\nSaubidet", initials: "JS", color: "#F59E0B", photo: "/julian.jpg" },
      ],
    },
    closing: {
      title: "Empower your talent.\nTransform your organization.",
      body: "Career Path connects your team with their professional future, within your company.",
      demoLabel: "Try the demo",
      demoSub: "Explore the platform live →",
      videoLabel: "Explainer video",
      videoSub: "See how it works →",
    },
    thanks: {
      title: "Thank you!",
      body: "Questions? We're here to help you transform professional development in your organization.",
      names: "Angelo · Sofia · Olivia · Julian",
    },
  },
};

/* ─── SLIDE RENDERERS ────────────────────────────────────────── */
const slideRenderers = [
  // 0 - COVER
  (anim, t) => {
    const c = t.cover;
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", background: "linear-gradient(135deg, #4F46E5 0%, #6366F1 30%, #818CF8 60%, #A5B4FC 100%)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -80, right: -80, width: 300, height: 300, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
        <div style={{ position: "absolute", bottom: -120, left: -60, width: 400, height: 400, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
        <div style={{ position: "absolute", top: 40, left: 40, display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: "#fff", fontSize: 14 }}>hu</div>
          <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, fontWeight: 500 }}>humand</span>
        </div>
        <div style={{ textAlign: "center", zIndex: 1, opacity: anim ? 1 : 0, transform: anim ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s ease" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.15)", borderRadius: 50, padding: "8px 20px", marginBottom: 30, backdropFilter: "blur(10px)" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M2 20h.01M7 20v-4M12 20v-8M17 20V8M22 4v16"/></svg>
            <span style={{ color: "#fff", fontSize: 14, fontWeight: 500 }}>{c.badge}</span>
          </div>
          <h1 style={{ color: "#fff", fontSize: 56, fontWeight: 800, margin: 0, lineHeight: 1.1, letterSpacing: -2 }}>{c.title}</h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 20, marginTop: 16, fontWeight: 400, maxWidth: 500 }}>{c.subtitle}</p>
        </div>
        <div style={{ position: "absolute", bottom: 80, opacity: anim ? 1 : 0, transition: "opacity 1.2s ease 0.5s" }}>
          <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 13 }}>{c.hint}</span>
        </div>
      </div>
    );
  },

  // 1 - PROBLEM
  (anim, t) => {
    const c = t.problem;
    return (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", padding: "50px 60px", background: "#fff", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "linear-gradient(90deg, #4F46E5, #818CF8)" }} />
        <div style={{ opacity: anim ? 1 : 0, transform: anim ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s ease" }}>
          <div style={{ display: "inline-block", background: "#FEF3C7", color: "#92400E", fontSize: 12, fontWeight: 700, padding: "6px 14px", borderRadius: 6, marginBottom: 24, letterSpacing: 1 }}>{c.badge}</div>
          <h2 style={{ fontSize: 36, fontWeight: 800, color: "#1E1B4B", margin: 0, lineHeight: 1.2, whiteSpace: "pre-line" }}>{c.title}</h2>
          <p style={{ color: "#6B7280", fontSize: 16, marginTop: 16, maxWidth: 550, lineHeight: 1.7 }}>{c.body}</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20, marginTop: 40, opacity: anim ? 1 : 0, transform: anim ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s ease 0.3s" }}>
          {c.stats.map((s, i) => (
            <div key={i} style={{ background: "#F5F3FF", borderRadius: 16, padding: 28, textAlign: "center" }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>{s.icon}</div>
              <div style={{ fontSize: 36, fontWeight: 800, color: "#4F46E5" }}>{s.num}</div>
              <div style={{ fontSize: 13, color: "#6B7280", marginTop: 8, lineHeight: 1.5 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    );
  },

  // 2 - SOLUTION
  (anim, t) => {
    const c = t.solution;
    return (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", padding: "50px 60px", background: "linear-gradient(180deg, #EEF2FF 0%, #fff 100%)" }}>
        <div style={{ opacity: anim ? 1 : 0, transform: anim ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s ease" }}>
          <div style={{ display: "inline-block", background: "#DBEAFE", color: "#1E40AF", fontSize: 12, fontWeight: 700, padding: "6px 14px", borderRadius: 6, marginBottom: 24, letterSpacing: 1 }}>{c.badge}</div>
          <h2 style={{ fontSize: 36, fontWeight: 800, color: "#1E1B4B", margin: 0 }}>{c.title}</h2>
          <p style={{ color: "#6B7280", fontSize: 16, marginTop: 12, maxWidth: 600, lineHeight: 1.7 }}>{c.body}</p>
        </div>
        <div style={{ display: "flex", gap: 16, marginTop: 36, opacity: anim ? 1 : 0, transition: "all 0.8s ease 0.3s" }}>
          {c.roles.map((r, i) => (
            <div key={i} style={{ flex: 1, background: "#fff", borderRadius: 16, padding: 28, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", borderTop: `4px solid ${r.color}` }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{r.icon}</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#1E1B4B" }}>{r.role}</div>
              <div style={{ fontSize: 13, color: "#6B7280", marginTop: 8, lineHeight: 1.6 }}>{r.desc}</div>
            </div>
          ))}
        </div>
      </div>
    );
  },

  // 3 - COLLABORATOR
  (anim, t) => {
    const c = t.collaborator;
    return (
      <div style={{ display: "flex", height: "100%", background: "#fff" }}>
        <div style={{ flex: 1, padding: "50px 40px 50px 60px", display: "flex", flexDirection: "column", justifyContent: "center", opacity: anim ? 1 : 0, transform: anim ? "translateX(0)" : "translateX(-20px)", transition: "all 0.7s ease" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#EEF2FF", color: "#4F46E5", fontSize: 12, fontWeight: 700, padding: "6px 14px", borderRadius: 6, marginBottom: 20, letterSpacing: 1, width: "fit-content" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4F46E5" }} />{c.badge}
          </div>
          <h2 style={{ fontSize: 30, fontWeight: 800, color: "#1E1B4B", margin: 0, lineHeight: 1.2 }}>{c.title}</h2>
          <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 16 }}>
            {c.features.map((f, i) => (
              <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <div style={{ minWidth: 32, height: 32, borderRadius: 8, background: "#EEF2FF", display: "flex", alignItems: "center", justifyContent: "center", color: "#4F46E5", fontWeight: 700, fontSize: 14 }}>✓</div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#1E1B4B" }}>{f.title}</div>
                  <div style={{ fontSize: 13, color: "#6B7280", marginTop: 2 }}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 30, opacity: anim ? 1 : 0, transition: "opacity 0.8s ease 0.4s" }}>
          <div style={{ background: "#F9FAFB", borderRadius: 20, padding: 30, width: "100%", maxWidth: 380, boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
            <div style={{ background: "linear-gradient(135deg, #4F46E5, #818CF8)", borderRadius: 14, padding: 20, color: "#fff", marginBottom: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 600, opacity: 0.8, letterSpacing: 1 }}>CURRENT ROLE</div>
              <div style={{ fontSize: 20, fontWeight: 800, marginTop: 4 }}>Product Designer</div>
              <div style={{ fontSize: 13, opacity: 0.8 }}>Design Team</div>
              <div style={{ display: "inline-block", background: "rgba(255,255,255,0.2)", borderRadius: 20, padding: "4px 12px", fontSize: 12, marginTop: 10 }}>2.5 yr tenure</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center" }}>
              {["L1", "L2", "L3"].map((l, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", border: `3px solid ${i < 2 ? "#16A34A" : "#4F46E5"}`, background: i === 0 ? "#16A34A" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: i === 0 ? "#fff" : i === 1 ? "#16A34A" : "#4F46E5" }}>
                    {i === 0 ? "✓" : l}
                  </div>
                  {i < 2 && <div style={{ width: 30, height: 3, background: i === 0 ? "#16A34A" : "#D1D5DB", borderRadius: 2 }} />}
                </div>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#9CA3AF", marginTop: 6, padding: "0 4px" }}>
              {c.cardLevels.map((l, i) => <span key={i}>{l}</span>)}
            </div>
          </div>
        </div>
      </div>
    );
  },

  // 4 - MANAGER
  (anim, t) => {
    const c = t.manager;
    return (
      <div style={{ display: "flex", height: "100%", background: "#fff" }}>
        <div style={{ flex: 1, padding: "50px 40px 50px 60px", display: "flex", flexDirection: "column", justifyContent: "center", opacity: anim ? 1 : 0, transform: anim ? "translateX(0)" : "translateX(-20px)", transition: "all 0.7s ease" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#F0FDF4", color: "#16A34A", fontSize: 12, fontWeight: 700, padding: "6px 14px", borderRadius: 6, marginBottom: 20, letterSpacing: 1, width: "fit-content" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#16A34A" }} />{c.badge}
          </div>
          <h2 style={{ fontSize: 30, fontWeight: 800, color: "#1E1B4B", margin: 0, lineHeight: 1.2 }}>{c.title}</h2>
          <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 16 }}>
            {c.features.map((f, i) => (
              <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <div style={{ minWidth: 32, height: 32, borderRadius: 8, background: "#F0FDF4", display: "flex", alignItems: "center", justifyContent: "center", color: "#16A34A", fontWeight: 700, fontSize: 14 }}>✓</div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#1E1B4B" }}>{f.title}</div>
                  <div style={{ fontSize: 13, color: "#6B7280", marginTop: 2 }}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 30, opacity: anim ? 1 : 0, transition: "opacity 0.8s ease 0.4s" }}>
          <div style={{ background: "#F9FAFB", borderRadius: 20, padding: 24, width: "100%", maxWidth: 360, boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#1E1B4B", marginBottom: 16 }}>{c.teamTitle} <span style={{ color: "#9CA3AF", fontWeight: 400 }}>{c.teamSub}</span></div>
            {c.members.map((m, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: i < 3 ? "1px solid #F3F4F6" : "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#EEF2FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#4F46E5" }}>{m.name.split(" ").map(n => n[0]).join("")}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#1E1B4B" }}>{m.name}</div>
                    <div style={{ fontSize: 11, color: "#9CA3AF" }}>{m.role}</div>
                  </div>
                </div>
                <div style={{ fontSize: 11, fontWeight: 600, color: m.color }}>{m.status}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },

  // 5 - ADMIN
  (anim, t) => {
    const c = t.admin;
    return (
      <div style={{ display: "flex", height: "100%", background: "#fff" }}>
        <div style={{ flex: 1, padding: "50px 40px 50px 60px", display: "flex", flexDirection: "column", justifyContent: "center", opacity: anim ? 1 : 0, transform: anim ? "translateX(0)" : "translateX(-20px)", transition: "all 0.7s ease" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#F5F3FF", color: "#7C3AED", fontSize: 12, fontWeight: 700, padding: "6px 14px", borderRadius: 6, marginBottom: 20, letterSpacing: 1, width: "fit-content" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#7C3AED" }} />{c.badge}
          </div>
          <h2 style={{ fontSize: 30, fontWeight: 800, color: "#1E1B4B", margin: 0, lineHeight: 1.2 }}>{c.title}</h2>
          <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 16 }}>
            {c.features.map((f, i) => (
              <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <div style={{ minWidth: 32, height: 32, borderRadius: 8, background: "#F5F3FF", display: "flex", alignItems: "center", justifyContent: "center", color: "#7C3AED", fontWeight: 700, fontSize: 14 }}>✓</div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#1E1B4B" }}>{f.title}</div>
                  <div style={{ fontSize: 13, color: "#6B7280", marginTop: 2 }}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 30, opacity: anim ? 1 : 0, transition: "opacity 0.8s ease 0.4s" }}>
          <div style={{ background: "#F9FAFB", borderRadius: 20, padding: 24, width: "100%", maxWidth: 360, boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
              {c.stats.map((s, i) => (
                <div key={i} style={{ background: "#fff", borderRadius: 12, padding: 14, textAlign: "center", border: "1px solid #F3F4F6" }}>
                  <div style={{ fontSize: 18 }}>{s.icon}</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: "#4F46E5" }}>{s.num}</div>
                  <div style={{ fontSize: 10, color: "#9CA3AF" }}>{s.label}</div>
                </div>
              ))}
            </div>
            <div style={{ background: "#fff", borderRadius: 12, padding: 14, border: "1px solid #F3F4F6" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#9CA3AF", letterSpacing: 1, marginBottom: 10 }}>{c.skillsLabel}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {["Visual Design", "Prototyping", "UX Research", "Figma Advanced", "Design Systems"].map((s, i) => (
                  <span key={i} style={{ background: "#EEF2FF", color: "#4F46E5", fontSize: 10, padding: "4px 10px", borderRadius: 20, fontWeight: 600 }}>{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },

  // 6 - LEARNING
  (anim, t) => {
    const c = t.learning;
    return (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", padding: "50px 60px", background: "#fff" }}>
        <div style={{ opacity: anim ? 1 : 0, transform: anim ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s ease" }}>
          <div style={{ display: "inline-block", background: "#FEF3C7", color: "#92400E", fontSize: 12, fontWeight: 700, padding: "6px 14px", borderRadius: 6, marginBottom: 24, letterSpacing: 1 }}>{c.badge}</div>
          <h2 style={{ fontSize: 36, fontWeight: 800, color: "#1E1B4B", margin: 0 }}>{c.title}</h2>
          <p style={{ color: "#6B7280", fontSize: 15, marginTop: 10, lineHeight: 1.6 }}>{c.body}</p>
        </div>
        <div style={{ display: "flex", gap: 20, marginTop: 36, opacity: anim ? 1 : 0, transition: "all 0.8s ease 0.3s" }}>
          {c.courses.map((course, i) => (
            <div key={i} style={{ flex: 1, background: "#F9FAFB", borderRadius: 16, padding: 24, border: "1px solid #F3F4F6", position: "relative" }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#9CA3AF", letterSpacing: 1, marginBottom: 8 }}>{course.type}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#1E1B4B", lineHeight: 1.3 }}>{course.title}</div>
              <div style={{ fontSize: 13, color: "#9CA3AF", marginTop: 8 }}>{course.source}</div>
              <div style={{ position: "absolute", top: 20, right: 20, fontSize: 11, fontWeight: 600, color: course.tagColor, background: course.tagColor + "15", padding: "3px 10px", borderRadius: 20 }}>{course.tag}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 20, marginTop: 24, opacity: anim ? 1 : 0, transition: "all 0.8s ease 0.5s" }}>
          <div style={{ flex: 1, background: "#F5F3FF", borderRadius: 16, padding: 24 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#1E1B4B" }}>{c.goalsTitle}</div>
            <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
              {c.goals.map((o, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13 }}>
                  <div style={{ width: 20, height: 20, borderRadius: 4, border: `2px solid ${o.done ? "#4F46E5" : "#D1D5DB"}`, background: o.done ? "#4F46E5" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 10 }}>{o.done ? "✓" : ""}</div>
                  <span style={{ color: "#374151", flex: 1 }}>{o.obj}</span>
                  <span style={{ fontSize: 11, color: "#F59E0B", fontWeight: 600 }}>{o.plazo}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  },

  // 7 - TEAM
  (anim, t) => {
    const c = t.team;
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", background: "linear-gradient(180deg, #EEF2FF 0%, #fff 100%)", padding: "50px 60px" }}>
        <div style={{ textAlign: "center", opacity: anim ? 1 : 0, transform: anim ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s ease" }}>
          <div style={{ display: "inline-block", background: "#DBEAFE", color: "#1E40AF", fontSize: 12, fontWeight: 700, padding: "6px 14px", borderRadius: 6, marginBottom: 24, letterSpacing: 1 }}>{c.badge}</div>
          <h2 style={{ fontSize: 36, fontWeight: 800, color: "#1E1B4B", margin: 0 }}>{c.title}</h2>
          <p style={{ color: "#6B7280", fontSize: 15, marginTop: 10 }}>{c.body}</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 24, marginTop: 48, width: "100%", maxWidth: 720, opacity: anim ? 1 : 0, transition: "all 0.8s ease 0.3s" }}>
          {c.people.map((p, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ width: 100, height: 100, borderRadius: "50%", background: p.photo ? "transparent" : `linear-gradient(135deg, ${p.color}, ${p.color}99)`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto", fontSize: 30, fontWeight: 800, color: "#fff", boxShadow: `0 8px 24px ${p.color}33`, overflow: "hidden" }}>
                {p.photo ? <img src={p.photo} alt={p.initials} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} /> : p.initials}
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#1E1B4B", marginTop: 14, whiteSpace: "pre-line", lineHeight: 1.3 }}>{p.name}</div>
            </div>
          ))}
        </div>
      </div>
    );
  },

  // 8 - CLOSING
  (anim, t) => {
    const c = t.closing;
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", background: "linear-gradient(135deg, #4F46E5 0%, #6366F1 30%, #818CF8 60%, #A5B4FC 100%)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -100, right: -100, width: 350, height: 350, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
        <div style={{ position: "absolute", bottom: -80, left: -80, width: 300, height: 300, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
        <div style={{ textAlign: "center", zIndex: 1, opacity: anim ? 1 : 0, transform: anim ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s ease" }}>
          <h1 style={{ color: "#fff", fontSize: 48, fontWeight: 800, margin: 0, lineHeight: 1.1, whiteSpace: "pre-line" }}>{c.title}</h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 18, marginTop: 20, maxWidth: 500, margin: "20px auto 0" }}>{c.body}</p>
          <div style={{ display: "flex", gap: 16, marginTop: 36, justifyContent: "center" }}>
            {[
              { href: "https://growthhub-phi.vercel.app/", label: c.demoLabel, sub: c.demoSub },
              { href: "#", label: c.videoLabel, sub: c.videoSub },
            ].map((btn, i) => (
              <a
                key={i}
                href={btn.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4, width: 200, background: "#fff", borderRadius: 16, padding: "16px 0", textDecoration: "none", boxShadow: "0 8px 32px rgba(0,0,0,0.2)", transition: "transform 0.2s, box-shadow 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.3)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.2)"; }}
              >
                <span style={{ fontSize: 17, fontWeight: 800, color: "#4F46E5" }}>{btn.label}</span>
                <span style={{ fontSize: 12, color: "#9CA3AF", fontWeight: 500 }}>{btn.sub}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  },

  // 9 - THANKS
  (anim, t) => {
    const c = t.thanks;
    const people = t.team.people;
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", background: "#fff", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -150, right: -150, width: 400, height: 400, borderRadius: "50%", background: "linear-gradient(135deg, #EEF2FF, #F5F3FF)", opacity: 0.6 }} />
        <div style={{ position: "absolute", bottom: -100, left: -100, width: 300, height: 300, borderRadius: "50%", background: "linear-gradient(135deg, #F0FDF4, #EEF2FF)", opacity: 0.5 }} />
        <div style={{ textAlign: "center", zIndex: 1, opacity: anim ? 1 : 0, transform: anim ? "scale(1)" : "scale(0.9)", transition: "all 0.8s ease" }}>
          <div style={{ width: 80, height: 80, borderRadius: 20, background: "linear-gradient(135deg, #4F46E5, #818CF8)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 30px", boxShadow: "0 12px 40px rgba(79,70,229,0.3)" }}>
            <span style={{ color: "#fff", fontSize: 28, fontWeight: 800 }}>hu</span>
          </div>
          <h1 style={{ fontSize: 52, fontWeight: 800, color: "#1E1B4B", margin: 0, lineHeight: 1.1 }}>{c.title}</h1>
          <p style={{ color: "#6B7280", fontSize: 18, marginTop: 16, maxWidth: 450, margin: "16px auto 0", lineHeight: 1.6 }}>{c.body}</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 36 }}>
            {people.map((p, i) => (
              <div key={i} style={{ width: 44, height: 44, borderRadius: "50%", background: p.photo ? "transparent" : `linear-gradient(135deg, ${p.color}, ${p.color}99)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, color: "#fff", boxShadow: `0 4px 12px ${p.color}33`, overflow: "hidden" }}>
                {p.photo ? <img src={p.photo} alt={p.initials} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} /> : p.initials}
              </div>
            ))}
          </div>
          <div style={{ color: "#9CA3AF", fontSize: 13, marginTop: 16 }}>{c.names}</div>
          <div style={{ marginTop: 36, display: "inline-flex", alignItems: "center", gap: 8, background: "#F5F3FF", borderRadius: 50, padding: "10px 24px" }}>
            <span style={{ fontSize: 14, color: "#4F46E5", fontWeight: 600 }}>humand.co</span>
          </div>
        </div>
      </div>
    );
  },
];

const TOTAL = slideRenderers.length;

/* ─── MAIN COMPONENT ─────────────────────────────────────────── */
export default function Presentation() {
  const [current, setCurrent]       = useState(0);
  const [anim, setAnim]             = useState(false);
  const [transitioning, setTrans]   = useState(false);
  const [lang, setLang]             = useState("es");
  const [barVisible, setBarVisible] = useState(true);
  const hideTimer                   = useRef(null);

  const t = i18n[lang];

  // Boot animation
  useEffect(() => {
    const id = setTimeout(() => setAnim(true), 100);
    return () => clearTimeout(id);
  }, []);

  // Auto-hide bottom bar after 3s of inactivity
  const showBar = useCallback(() => {
    setBarVisible(true);
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setBarVisible(false), 3000);
  }, []);

  useEffect(() => {
    showBar();
    return () => clearTimeout(hideTimer.current);
  }, [current, showBar]);

  const goTo = useCallback((idx) => {
    if (idx === current || idx < 0 || idx >= TOTAL || transitioning) return;
    setTrans(true);
    setAnim(false);
    setTimeout(() => {
      setCurrent(idx);
      setTimeout(() => { setAnim(true); setTrans(false); }, 50);
    }, 300);
  }, [current, transitioning]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight" || e.key === " ") goTo(current + 1);
      if (e.key === "ArrowLeft") goTo(current - 1);
      showBar();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [current, goTo, showBar]);

  const progress = ((current + 1) / TOTAL) * 100;

  return (
    <div
      onMouseMove={showBar}
      style={{ width: "100vw", height: "100vh", overflow: "hidden", background: "#000", position: "relative", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", cursor: barVisible ? "default" : "none" }}
    >
      {/* ── SLIDE ── */}
      <div style={{ position: "absolute", inset: 0 }}>
        {slideRenderers[current](anim, t)}
      </div>

      {/* ── TOP HUD ── */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", background: "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, transparent 100%)", opacity: barVisible ? 1 : 0, transition: "opacity 0.4s ease", pointerEvents: barVisible ? "auto" : "none" }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: "#fff", fontSize: 11, backdropFilter: "blur(8px)" }}>hu</div>
          <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, fontWeight: 600 }}>Career Path</span>
        </div>

        {/* Slide label */}
        <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", background: "rgba(0,0,0,0.2)", padding: "4px 12px", borderRadius: 20, backdropFilter: "blur(8px)" }}>
          {t.labels[current]}
        </span>

        {/* Lang toggle */}
        <div style={{ display: "flex", background: "rgba(0,0,0,0.3)", borderRadius: 20, padding: 3, backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.15)" }}>
          {["es", "en"].map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              style={{ padding: "5px 14px", borderRadius: 16, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 700, letterSpacing: 0.5, transition: "all 0.2s", background: lang === l ? "#4F46E5" : "transparent", color: lang === l ? "#fff" : "rgba(255,255,255,0.5)" }}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* ── NAV ARROWS ── */}
      <button
        onClick={() => goTo(current - 1)}
        disabled={current === 0}
        style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", background: "rgba(0,0,0,0.3)", border: "none", borderRadius: "50%", width: 44, height: 44, color: "#fff", fontSize: 22, cursor: current === 0 ? "default" : "pointer", opacity: barVisible ? (current === 0 ? 0.25 : 0.7) : 0, transition: "opacity 0.4s ease", zIndex: 50, backdropFilter: "blur(8px)", pointerEvents: barVisible && current > 0 ? "auto" : "none" }}
      >‹</button>
      <button
        onClick={() => goTo(current + 1)}
        disabled={current === TOTAL - 1}
        style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", background: "rgba(0,0,0,0.3)", border: "none", borderRadius: "50%", width: 44, height: 44, color: "#fff", fontSize: 22, cursor: current === TOTAL - 1 ? "default" : "pointer", opacity: barVisible ? (current === TOTAL - 1 ? 0.25 : 0.7) : 0, transition: "opacity 0.4s ease", zIndex: 50, backdropFilter: "blur(8px)", pointerEvents: barVisible && current < TOTAL - 1 ? "auto" : "none" }}
      >›</button>

      {/* ── BOTTOM BAR ── */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 50, background: "linear-gradient(0deg, rgba(0,0,0,0.7) 0%, transparent 100%)", padding: "20px 20px 12px", opacity: barVisible ? 1 : 0, transition: "opacity 0.4s ease", pointerEvents: barVisible ? "auto" : "none" }}>
        {/* Progress bar */}
        <div style={{ height: 2, background: "rgba(255,255,255,0.15)", borderRadius: 1, marginBottom: 12, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg, #4F46E5, #818CF8)", borderRadius: 1, transition: "width 0.4s ease" }} />
        </div>

        {/* Thumbnails row */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, justifyContent: "center" }}>
          {/* Prev */}
          <button
            onClick={() => goTo(current - 1)}
            disabled={current === 0}
            style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, padding: "6px 14px", color: current === 0 ? "rgba(255,255,255,0.25)" : "#fff", fontSize: 12, fontWeight: 600, cursor: current === 0 ? "default" : "pointer", transition: "all 0.2s", backdropFilter: "blur(8px)", whiteSpace: "nowrap" }}
          >{t.nav.prev}</button>

          {/* Slide thumbnails */}
          <div style={{ display: "flex", gap: 5, overflowX: "auto", maxWidth: "calc(100vw - 220px)", padding: "2px 4px" }}>
            {t.labels.map((label, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                title={label}
                style={{ flex: "0 0 auto", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", width: 68, height: 40, borderRadius: 8, border: `2px solid ${i === current ? "#4F46E5" : "rgba(255,255,255,0.12)"}`, background: i === current ? "rgba(79,70,229,0.3)" : i < current ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)", cursor: "pointer", transition: "all 0.25s", padding: "0 4px 4px", backdropFilter: "blur(4px)" }}
              >
                <span style={{ fontSize: 8, fontWeight: 700, color: i === current ? "#fff" : "rgba(255,255,255,0.45)", textAlign: "center", letterSpacing: 0.3, lineHeight: 1.2 }}>{i + 1}. {label}</span>
              </button>
            ))}
          </div>

          {/* Next */}
          <button
            onClick={() => goTo(current + 1)}
            disabled={current === TOTAL - 1}
            style={{ background: current === TOTAL - 1 ? "rgba(255,255,255,0.05)" : "#4F46E5", border: "none", borderRadius: 8, padding: "6px 14px", color: current === TOTAL - 1 ? "rgba(255,255,255,0.25)" : "#fff", fontSize: 12, fontWeight: 600, cursor: current === TOTAL - 1 ? "default" : "pointer", transition: "all 0.2s", whiteSpace: "nowrap" }}
          >{t.nav.next}</button>
        </div>

        {/* Counter */}
        <div style={{ textAlign: "center", marginTop: 6, color: "rgba(255,255,255,0.3)", fontSize: 10 }}>
          {current + 1} / {TOTAL} · {t.nav.hint}
        </div>
      </div>
    </div>
  );
}
