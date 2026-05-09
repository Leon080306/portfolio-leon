import { useState, useEffect, useRef } from "react";
import { ArrowRight, MapPin, Mail, MessageCircle } from "lucide-react";

// ─── Brand icons (not in lucide-react) ───────────────────────────────────────
const IconGithub = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const IconLinkedin = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const IconInstagram = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
);

// ─── Shared divider ───────────────────────────────────────────────────────────
const Divider = () => (
  <div style={{
    height: 1,
    background: "linear-gradient(90deg,transparent,#E0E0DC,transparent)",
    maxWidth: 1380,
    margin: "0 auto",
  }} />
);

// ─── Scroll reveal hook ───────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("vis"); }),
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
    );
    const timer = setTimeout(() => {
      document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    }, 100);
    return () => { clearTimeout(timer); obs.disconnect(); };
  }, []);
}

// ─── Hero Mockups ─────────────────────────────────────────────────────────────
interface MockupProps { mx: number; my: number; }

function HeroMockups({ mx, my }: MockupProps) {
  const t = (depth: number) =>
    `translate(${(mx - 0.5) * 22 * depth}px, ${(my - 0.5) * 13 * depth}px)`;

  return (
    <div style={{ position: "relative", height: 520, width: "100%" }}>

      {/* Analytics Dashboard */}
      <div className="mc" style={{ position: "absolute", top: 16, left: 0, width: 320, background: "#1E2420", padding: 22, transform: `${t(0.55)} rotate(-2.5deg)`, transition: "transform .5s ease" }}>
        <div style={{ color: "#7A8C7B", fontSize: 10.5, fontWeight: 500, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 12 }}>
          Learning Analytics
        </div>
        <div style={{ display: "flex", gap: 7, marginBottom: 16, alignItems: "flex-end", height: 70 }}>
          {[65, 82, 71, 90, 78, 88, 100].map((h, i) => (
            <div key={i} style={{ flex: 1, height: `${h}%`, background: i === 6 ? "#7A8C7B" : "rgba(122,140,123,.4)", borderRadius: "4px 4px 0 0" }} />
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <div style={{ color: "#FAFAF7", fontSize: 22, fontWeight: 600 }}>2,847</div>
            <div style={{ color: "#707070", fontSize: 11 }}>cards reviewed</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ color: "#7A8C7B", fontSize: 22, fontWeight: 600 }}>94%</div>
            <div style={{ color: "#707070", fontSize: 11 }}>retention rate</div>
          </div>
        </div>
      </div>

      {/* Flashcard */}
      <div className="mc" style={{ position: "absolute", top: 90, left: 90, width: 220, background: "white", border: "1px solid #EDEDEA", transform: `${t(1.0)} rotate(1.8deg)`, transition: "transform .5s ease", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 7, padding: "28px 20px" }}>
        <div style={{ fontSize: 10.5, color: "#7A8C7B", letterSpacing: ".08em", textTransform: "uppercase", fontWeight: 500 }}>Flashcard</div>
        <div className="df" style={{ fontSize: 56, fontWeight: 700, color: "#1A1A1A", lineHeight: 1 }}>学</div>
        <div style={{ fontSize: 13, color: "#707070" }}>xué</div>
        <div style={{ fontSize: 15, color: "#1A1A1A", fontWeight: 500 }}>to study / to learn</div>
        <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#FEE2E2", display: "flex", alignItems: "center", justifyContent: "center", color: "#DC2626" }}>✕</div>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#DCFCE7", display: "flex", alignItems: "center", justifyContent: "center", color: "#16A34A" }}>✓</div>
        </div>
      </div>

      {/* System Design */}
      <div className="mc" style={{ position: "absolute", top: 16, right: 0, width: 196, background: "linear-gradient(145deg,#F5F8F5,#EAF0EA)", border: "1px solid #D4DDD4", transform: `${t(0.75)} rotate(1deg)`, transition: "transform .5s ease", padding: 16 }}>
        <div style={{ fontSize: 10.5, color: "#7A8C7B", letterSpacing: ".06em", textTransform: "uppercase", fontWeight: 500, marginBottom: 12 }}>System Design</div>
        {["React Frontend", "Express API", "PostgreSQL DB", "Kubernetes"].map((l, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: i < 3 ? "#7A8C7B" : "#9AB49B", flexShrink: 0 }} />
            <span style={{ fontSize: 11.5, color: "#555" }}>{l}</span>
          </div>
        ))}
      </div>

      {/* SRS Streak */}
      <div className="mc" style={{ position: "absolute", bottom: 60, right: 20, width: 184, background: "white", border: "1px solid #EDEDEA", transform: `${t(1.1)} rotate(-1.2deg)`, transition: "transform .5s ease", padding: 16 }}>
        <div style={{ fontSize: 10.5, color: "#9AA89B", fontWeight: 500, marginBottom: 10 }}>SRS Progress</div>
        <div style={{ display: "flex", gap: 4, marginBottom: 9, alignItems: "flex-end", height: 28 }}>
          {[100, 85, 92, 78, 95, 88, 100].map((h, i) => (
            <div key={i} style={{ flex: 1, height: `${h}%`, background: i === 6 ? "#7A8C7B" : `rgba(122,140,123,${.3 + h / 400})`, borderRadius: 3 }} />
          ))}
        </div>
        <div style={{ fontSize: 24, fontWeight: 700, color: "#1A1A1A" }}>
          Day 47 <span style={{ fontSize: 11, color: "#7A8C7B", fontWeight: 400 }}>streak</span>
        </div>
      </div>

      {/* Glassmorphism pill */}
      <div style={{ position: "absolute", bottom: 30, left: 20, width: 210, background: "rgba(250,250,247,.72)", backdropFilter: "blur(18px)", borderRadius: 18, border: "1px solid rgba(255,255,255,.8)", boxShadow: "0 4px 24px rgba(0,0,0,.06)", transform: t(0.85), transition: "transform .5s ease", padding: "12px 16px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#7A8C7B,#5A7A5C)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#1A1A1A" }}>20,000+ Words</div>
          <div style={{ fontSize: 11, color: "#707070" }}>Mandarin vocabulary</div>
        </div>
      </div>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const ref = useRef<HTMLElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    setMouse({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height });
  };

  return (
    <section
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setMouse({ x: 0.5, y: 0.5 })}
      style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "center", gap: 64, padding: "88px 56px 60px", maxWidth: 1380, margin: "0 auto" }}
    >
      <div>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(122,140,123,.1)", borderRadius: 100, padding: "6px 14px", marginBottom: 28 }}>
          <div className="pulse" style={{ width: 7, height: 7, borderRadius: "50%", background: "#7A8C7B" }} />
          <span style={{ fontSize: 12, color: "#7A8C7B", fontWeight: 500 }}>Available for opportunities</span>
        </div>

        <h1 className="df reveal" style={{ fontSize: "clamp(50px,5.8vw,84px)", fontWeight: 600, lineHeight: 1.04, letterSpacing: "-.035em", color: "#1A1A1A", marginBottom: 24 }}>
          Designing<br />
          <em style={{ fontStyle: "italic", color: "#7A8C7B" }}>Intelligent</em><br />
          Learning<br />
          Experiences
        </h1>

        <p className="reveal d1" style={{ fontSize: 17, color: "#707070", lineHeight: 1.75, fontWeight: 300, maxWidth: 440, marginBottom: 36 }}>
          I build educational technology systems that combine algorithms, user experience, and scalable engineering.
        </p>

        <div className="reveal d2" style={{ display: "flex", gap: 12, marginBottom: 52 }}>
          <a href="#projects" className="bp">View Projects <ArrowRight size={15} /></a>
          <a href="#contact" className="bs">Contact Me</a>
        </div>

        <div className="reveal d3" style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {["Informatics Student", "Web Developer", "EdTech Builder"].map((m) => (
            <span key={m} className="chip">{m}</span>
          ))}
          <span className="chip" style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
            <MapPin size={10} /> Based in Indonesia
          </span>
        </div>
      </div>

      <HeroMockups mx={mouse.x} my={mouse.y} />
    </section>
  );
}

// ─── Featured Project ─────────────────────────────────────────────────────────
function FeaturedProject() {
  const features = [
    { icon: "🗃️", title: "20,000+ Vocabulary", desc: "Curated Mandarin database with tones, HSK levels, and rich context" },
    { icon: "🏫", title: "Classroom System", desc: "Teacher dashboards, student groups, and structured assignment flows" },
    { icon: "🔄", title: "Flashcard Engine", desc: "SRS-powered review with swipe interactions and real-time progress" },
    { icon: "📊", title: "Adaptive Insights", desc: "Per-student analytics, retention modeling and smart scheduling" },
  ];

  return (
    <section id="projects" style={{ padding: "120px 56px", maxWidth: 1380, margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center", marginBottom: 60 }}>

        {/* Left — text */}
        <div>
          <div className="ach reveal" style={{ marginBottom: 20 }}>Featured Project</div>
          <h2 className="df reveal d1" style={{ fontSize: "clamp(34px,4vw,60px)", fontWeight: 600, lineHeight: 1.08, letterSpacing: "-.03em", color: "#1A1A1A", marginBottom: 24 }}>
            Building a Smarter<br />
            <em style={{ fontStyle: "italic", color: "#7A8C7B" }}>Mandarin Learning</em><br />
            System
          </h2>
          <p className="reveal d2" style={{ fontSize: 16, color: "#707070", lineHeight: 1.8, fontWeight: 300, marginBottom: 14 }}>
            A full-stack educational platform combining personalized flashcard learning with spaced repetition science — built to serve real classrooms, teachers, and students.
          </p>
          <p className="reveal d3" style={{ fontSize: 16, color: "#707070", lineHeight: 1.8, fontWeight: 300, marginBottom: 36 }}>
            From teacher-controlled classroom integration to per-student learning analytics and intelligent review scheduling, this system takes learners from beginner to fluency with data-driven precision.
          </p>
          <a href="#" className="bp reveal d4">View Case Study <ArrowRight size={15} /></a>
        </div>

        {/* Right — mockup */}
        <div className="reveal d1" style={{ position: "relative", height: 420 }}>
          <div className="mc" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 264, background: "linear-gradient(135deg,#1E2420,#2A3628)", padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <span className="df" style={{ color: "#FAFAF7", fontSize: 19, fontWeight: 600 }}>汉字学习</span>
              <div style={{ display: "flex", gap: 5 }}>
                {["HSK 1", "HSK 2", "HSK 3"].map((l) => (
                  <span key={l} style={{ fontSize: 10, color: "#7A8C7B", background: "rgba(122,140,123,.2)", padding: "3px 8px", borderRadius: 100 }}>{l}</span>
                ))}
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 20 }}>
              {["学", "习", "语", "言", "教", "育", "智", "能"].map((c, i) => (
                <div key={i} style={{ background: i === 3 ? "rgba(255,255,255,.08)" : "rgba(255,255,255,.06)", borderRadius: 10, padding: 12, textAlign: "center", border: i === 3 ? "1px solid rgba(122,140,123,.3)" : "none" }}>
                  <span className="df" style={{ color: i === 3 ? "#7A8C7B" : "#FAFAF7", fontSize: 22, opacity: i === 3 ? 1 : .85 }}>{c}</span>
                </div>
              ))}
            </div>
            <div style={{ height: 34, background: "rgba(122,140,123,.15)", borderRadius: 8, display: "flex", alignItems: "center", padding: "0 16px" }}>
              <div style={{ width: "62%", height: 5, background: "#7A8C7B", borderRadius: 100 }} />
              <div style={{ marginLeft: "auto", fontSize: 11, color: "#7A8C7B" }}>62% complete</div>
            </div>
          </div>

          <div className="mc" style={{ position: "absolute", bottom: 0, left: 0, width: 196, background: "white", border: "1px solid #EDEDEA", padding: 20 }}>
            <div style={{ fontSize: 10.5, color: "#9AA", fontWeight: 500, marginBottom: 10, letterSpacing: ".05em", textTransform: "uppercase" }}>Today's Review</div>
            <div style={{ fontSize: 38, fontWeight: 700, color: "#1A1A1A", marginBottom: 4 }}>48</div>
            <div style={{ fontSize: 12, color: "#707070" }}>cards due · <span style={{ color: "#7A8C7B" }}>12 new</span></div>
          </div>

          <div className="mc" style={{ position: "absolute", bottom: 0, right: 0, width: 176, background: "white", border: "1px solid #EDEDEA", padding: 20, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ fontSize: 10.5, color: "#9AA", fontWeight: 500, marginBottom: 10, letterSpacing: ".05em", textTransform: "uppercase", alignSelf: "flex-start" }}>Retention</div>
            <div style={{ position: "relative", width: 76, height: 76 }}>
              <svg viewBox="0 0 76 76" width="76" height="76" style={{ transform: "rotate(-90deg)" }}>
                <circle cx="38" cy="38" r="30" fill="none" stroke="#F0F0EC" strokeWidth="8" />
                <circle cx="38" cy="38" r="30" fill="none" stroke="#7A8C7B" strokeWidth="8" strokeDasharray="188.5 200" strokeLinecap="round" />
              </svg>
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, fontWeight: 700, color: "#1A1A1A" }}>94%</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
        {features.map((f, i) => (
          <div key={i} className={`fc reveal d${i + 1}`}>
            <div style={{ fontSize: 22, marginBottom: 12 }}>{f.icon}</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: "#1A1A1A", marginBottom: 6 }}>{f.title}</div>
            <div style={{ fontSize: 13, color: "#707070", lineHeight: 1.6 }}>{f.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Experience ───────────────────────────────────────────────────────────────
function Experience() {
  const roles = [
    {
      period: "2023 — Present", role: "Web Developer", current: true,
      company: "Singapore Education Network",
      desc: "Promoted to full Web Developer after outstanding intern performance. Building production-level educational platforms, dynamic systems, and interfaces that serve real users.",
      tags: ["React", "TypeScript", "Full-Stack", "Production"],
    },
    {
      period: "2023", role: "UI/UX Associate Intern", current: false,
      company: "Singapore Education Network",
      desc: "Designed and implemented UI components for education-related platforms. Collaborated closely with senior engineers in production-level workflows.",
      tags: ["UI/UX", "Figma", "React", "Collaboration"],
    },
  ];

  return (
    <section id="experience" style={{ padding: "120px 0", background: "white", width: "100%" }}>
      <div style={{ maxWidth: 1380, margin: "0 auto", padding: "0 56px", display: "grid", gridTemplateColumns: "1fr 2fr", gap: 80 }}>
        <div>
          <div className="ach reveal" style={{ marginBottom: 20 }}>Career</div>
          <h2 className="df reveal d1" style={{ fontSize: "clamp(32px,3.5vw,52px)", fontWeight: 600, lineHeight: 1.1, letterSpacing: "-.03em", color: "#1A1A1A" }}>
            Professional<br /><em style={{ color: "#7A8C7B" }}>Experience</em>
          </h2>
          <p className="reveal d2" style={{ fontSize: 15, color: "#707070", lineHeight: 1.75, fontWeight: 300, marginTop: 20 }}>
            A track record of growth at the intersection of education and technology.
          </p>
        </div>

        <div style={{ position: "relative", paddingLeft: 32 }}>
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 2, background: "linear-gradient(180deg,#7A8C7B,rgba(122,140,123,.1))" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 52 }}>
            {roles.map((r, i) => (
              <div key={i} className={`reveal d${i + 1}`} style={{ position: "relative" }}>
                <div style={{ position: "absolute", left: -40, top: 5, width: 13, height: 13, borderRadius: "50%", background: r.current ? "#7A8C7B" : "#D4D4D0", border: "2.5px solid white", boxShadow: r.current ? "0 0 0 3px rgba(122,140,123,.2)" : "none" }} />
                <div style={{ fontSize: 12, color: "#7A8C7B", fontWeight: 500, letterSpacing: ".04em", marginBottom: 6 }}>{r.period}</div>
                <div style={{ fontSize: 21, fontWeight: 600, color: "#1A1A1A", marginBottom: 2 }}>{r.role}</div>
                <div style={{ fontSize: 14, color: "#707070", marginBottom: 12 }}>{r.company}</div>
                <p style={{ fontSize: 14, color: "#707070", lineHeight: 1.75, marginBottom: 14 }}>{r.desc}</p>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {r.tags.map((t) => <span key={t} className="chip">{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Technical Engineering ────────────────────────────────────────────────────
function TechnicalEngineering() {
  const stack = [
    { label: "React", bg: "#E8F8FD", color: "#0E7A9E" },
    { label: "TypeScript", bg: "#EBF1FA", color: "#2558A7" },
    { label: "Express", bg: "#EBF5EB", color: "#2D6A2D" },
    { label: "PostgreSQL", bg: "#EAF0F8", color: "#235680" },
    { label: "Docker", bg: "#E8F3FD", color: "#1466B8" },
    { label: "Kubernetes", bg: "#EAF0FE", color: "#1F4DB5" },
  ];

  return (
    <section id="engineering" style={{ padding: "120px 56px", maxWidth: 1380, margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
        <div className="reveal" style={{ position: "relative", height: 360, background: "linear-gradient(145deg,#F5F8F5,#EDF2ED)", borderRadius: 24, border: "1px solid #E0E8E0", overflow: "hidden" }}>
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: .22 }}>
            {[25, 50, 75].map((p) => <line key={`h${p}`} x1="0" y1={`${p}%`} x2="100%" y2={`${p}%`} stroke="#7A8C7B" strokeWidth=".5" />)}
            {[25, 50, 75].map((p) => <line key={`v${p}`} x1={`${p}%`} y1="0" x2={`${p}%`} y2="100%" stroke="#7A8C7B" strokeWidth=".5" />)}
          </svg>
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
            <line x1="50%" y1="14%" x2="18%" y2="38%" stroke="#7A8C7B" strokeWidth="1.5" strokeDasharray="5,3" opacity=".5" />
            <line x1="50%" y1="14%" x2="78%" y2="38%" stroke="#7A8C7B" strokeWidth="1.5" strokeDasharray="5,3" opacity=".5" />
            <line x1="18%" y1="48%" x2="30%" y2="66%" stroke="#7A8C7B" strokeWidth="1.5" strokeDasharray="5,3" opacity=".5" />
            <line x1="78%" y1="48%" x2="72%" y2="66%" stroke="#7A8C7B" strokeWidth="1.5" strokeDasharray="5,3" opacity=".5" />
          </svg>
          <div className="an" style={{ left: "50%", top: "6%", transform: "translateX(-50%)" }}>🌐 Ingress Controller</div>
          <div className="an" style={{ left: "5%", top: "34%", transform: "translateY(-50%)" }}>⚛️ React Frontend ×2</div>
          <div className="an" style={{ left: "55%", top: "34%", transform: "translateY(-50%)" }}>🚀 Express API ×3</div>
          <div className="an" style={{ left: "10%", top: "66%", transform: "translateY(-50%)" }}>🗄️ PostgreSQL</div>
          <div className="an" style={{ left: "58%", top: "66%", transform: "translateY(-50%)" }}>⚡ Redis Cache</div>
          <div style={{ position: "absolute", bottom: 14, right: 16, fontSize: 10, color: "#9AA89B", letterSpacing: ".06em", textTransform: "uppercase", fontWeight: 500 }}>
            Kubernetes Cluster
          </div>
        </div>

        <div>
          <div className="ach reveal" style={{ marginBottom: 20 }}>Engineering</div>
          <h2 className="df reveal d1" style={{ fontSize: "clamp(32px,3.5vw,52px)", fontWeight: 600, lineHeight: 1.1, letterSpacing: "-.03em", color: "#1A1A1A", marginBottom: 24 }}>
            Production-Grade<br /><em style={{ color: "#7A8C7B" }}>Infrastructure</em><br />at Scale
          </h2>
          <p className="reveal d2" style={{ fontSize: 16, color: "#707070", lineHeight: 1.8, fontWeight: 300, marginBottom: 32 }}>
            An e-commerce platform engineered with Kubernetes-orchestrated microservices — multiple frontend pods, load-balanced API servers, and persistent database layers running in Docker containers.
          </p>
          <div className="reveal d3" style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 32 }}>
            {stack.map((s) => (
              <span key={s.label} style={{ background: s.bg, color: s.color, fontSize: 12, fontWeight: 600, padding: "6px 14px", borderRadius: 100 }}>{s.label}</span>
            ))}
          </div>
          <a href="#" className="bp reveal d4">View Architecture <ArrowRight size={15} /></a>
        </div>
      </div>
    </section>
  );
}

// ─── Teaching & Community ─────────────────────────────────────────────────────
interface TeachingCard {
  label: string; sub: string; icon: string; desc: string;
  bg: string; subColor: string; titleColor: string; descColor: string;
  large?: boolean; wide?: boolean;
}

function Teaching() {
  const cards: TeachingCard[] = [
    { label: "AI Workshops", sub: "Teaching", icon: "🎓", desc: "Practical workshops on AI tools and real-world applications for students and communities", bg: "linear-gradient(145deg,#E8EEE8,#C8D8C8)", subColor: "#3A5E3A", titleColor: "#1A2A1A", descColor: "#4A6A4A", large: true },
    { label: "OSN Informatika", sub: "Mentoring", icon: "🏆", desc: "Mentoring students for national informatics olympiad preparation", bg: "linear-gradient(145deg,#EEE8E8,#D8C8C8)", subColor: "#6A3A3A", titleColor: "#2A1A1A", descColor: "#6A4A4A" },
    { label: "Assistant Lecturer", sub: "Academia", icon: "📚", desc: "Supporting faculty in programming and systems engineering courses", bg: "linear-gradient(145deg,#E8EBF0,#C8D0D8)", subColor: "#3A4A6A", titleColor: "#1A1A2A", descColor: "#4A4A6A" },
    { label: "Developer Community", sub: "Community", icon: "🤝", desc: "Active involvement in developer and educational communities across Indonesia", bg: "linear-gradient(145deg,#EDE8E4,#D8C8C0)", subColor: "#6A4A3A", titleColor: "#2A1A1A", descColor: "#6A4A3A", wide: true },
  ];

  return (
    <section id="teaching" style={{ padding: "120px 0", background: "white", width: "100%" }}>
      <div style={{ maxWidth: 1380, margin: "0 auto", padding: "0 56px" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div className="ach reveal" style={{ display: "inline-flex", marginBottom: 20 }}>Teaching & Community</div>
          <h2 className="df reveal d1" style={{ fontSize: "clamp(34px,4vw,60px)", fontWeight: 600, lineHeight: 1.1, letterSpacing: "-.03em", color: "#1A1A1A" }}>
            Sharing Knowledge,<br /><em style={{ color: "#7A8C7B" }}>Building Community</em>
          </h2>
          <p className="reveal d2" style={{ fontSize: 16, color: "#707070", lineHeight: 1.7, fontWeight: 300, maxWidth: 480, margin: "20px auto 0" }}>
            Education is not just what I build — it's what I do. Mentoring, teaching, and growing alongside the community.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gridTemplateRows: "180px 180px", gap: 16 }}>
          {cards.map((c, i) => (
            <div
              key={i}
              className={`tc reveal d${i + 1}`}
              style={{
                gridColumn: c.large ? "1" : c.wide ? "2 / 4" : "auto",
                gridRow: c.large ? "1 / 3" : "auto",
                background: c.bg, borderRadius: 22,
                padding: c.large ? 32 : 24,
                display: "flex", flexDirection: "column", justifyContent: "flex-end",
                position: "relative", overflow: "hidden",
                border: "1px solid rgba(0,0,0,.04)",
              }}
            >
              <div style={{ position: "absolute", top: c.large ? 24 : 16, right: c.large ? 24 : 16, fontSize: c.large ? 52 : 32, opacity: .18 }}>{c.icon}</div>
              <div style={{ fontSize: 10.5, color: c.subColor, fontWeight: 500, letterSpacing: ".06em", textTransform: "uppercase", marginBottom: 6 }}>{c.sub}</div>
              <div style={{ fontSize: c.large ? 21 : 16, fontWeight: 600, color: c.titleColor, marginBottom: 5 }}>{c.label}</div>
              <div style={{ fontSize: c.large ? 13.5 : 12.5, color: c.descColor, lineHeight: 1.55 }}>{c.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" style={{ padding: "140px 56px", maxWidth: 960, margin: "0 auto", textAlign: "center" }}>
      <div className="ach reveal" style={{ display: "inline-flex", marginBottom: 24 }}>About</div>
      <h2 className="df reveal d1" style={{ fontSize: "clamp(30px,4.5vw,60px)", fontWeight: 500, lineHeight: 1.18, letterSpacing: "-.03em", color: "#1A1A1A", fontStyle: "italic", marginBottom: 32 }}>
        "At the intersection of engineering<br />and learning experience design."
      </h2>
      <p className="reveal d2" style={{ fontSize: 17, color: "#707070", lineHeight: 1.9, fontWeight: 300, marginBottom: 16 }}>
        I'm a Software Engineering student at Universitas X with a deep interest in educational technology. I believe the best digital learning systems are built at the intersection of rigorous engineering and thoughtful experience design.
      </p>
      <p className="reveal d3" style={{ fontSize: 17, color: "#707070", lineHeight: 1.9, fontWeight: 300, marginBottom: 44 }}>
        My work focuses on building intelligent systems that make learning more adaptive, meaningful, and human — from classroom-integrated platforms to spaced repetition engines and analytics dashboards.
      </p>
      <a href="#" className="bs reveal d4">Read Full Story <ArrowRight size={15} /></a>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function Contact() {
  const socials = [
    { icon: <Mail size={18} />, href: "mailto:hello@leonardsamuel.com", title: "Email" },
    { icon: <IconGithub />, href: "https://github.com", title: "GitHub" },
    { icon: <IconLinkedin />, href: "https://linkedin.com", title: "LinkedIn" },
    { icon: <MessageCircle size={18} />, href: "https://wa.me/", title: "WhatsApp" },
    { icon: <IconInstagram />, href: "https://instagram.com", title: "Instagram" },
  ];

  return (
    <section id="contact" style={{ background: "#1A1A1A", padding: "120px 56px", width: "100%" }}>
      <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
        <div className="reveal" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(122,140,123,.2)", borderRadius: 100, padding: "6px 14px", marginBottom: 32 }}>
          <span style={{ fontSize: 12, color: "#7A8C7B", fontWeight: 500 }}>Get in Touch</span>
        </div>

        <h2 className="df reveal d1" style={{ fontSize: "clamp(36px,5.5vw,72px)", fontWeight: 600, lineHeight: 1.06, letterSpacing: "-.035em", color: "#FAFAF7", marginBottom: 20 }}>
          Let's Build<br /><em style={{ color: "#7A8C7B" }}>Meaningful</em> Learning<br />Experiences
        </h2>

        <p className="reveal d2" style={{ fontSize: 16, color: "#888", lineHeight: 1.75, marginBottom: 48 }}>
          Open to collaborations, internships, and conversations about educational technology.
        </p>

        <div className="reveal d3" style={{ display: "grid", gap: 12, marginBottom: 40, textAlign: "left" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <input className="ci" type="text" placeholder="Your name" />
            <input className="ci" type="email" placeholder="Email address" />
          </div>
          <input className="ci" type="text" placeholder="Subject" />
          <textarea className="ci" rows={4} placeholder="Your message..." style={{ resize: "vertical" }} />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button className="bp" style={{ padding: "14px 40px" }}>
              Send Message <ArrowRight size={15} />
            </button>
          </div>
        </div>

        <div className="reveal d4" style={{ display: "flex", justifyContent: "center", gap: 12 }}>
          {socials.map((s) => (
            <a key={s.title} href={s.href} className="sb" title={s.title}>{s.icon}</a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: "#111", padding: "36px 56px", borderTop: "1px solid rgba(255,255,255,.06)" }}>
      <div style={{ maxWidth: 1380, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span className="df" style={{ fontSize: 18, fontWeight: 600, color: "#555" }}>Leonard Samuel</span>
        <div style={{ fontSize: 12, color: "#3A3A3A" }}>© 2025 Leonard Samuel. All rights reserved.</div>
        <div style={{ display: "flex", gap: 24 }}>
          {[["Projects", "#projects"], ["Experience", "#experience"], ["About", "#about"], ["Contact", "#contact"]].map(([l, h]) => (
            <a key={l} href={h} className="fl">{l}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ─── Page export ──────────────────────────────────────────────────────────────
export default function Homepage() {
  useScrollReveal();

  return (
    <main>
      <Hero />
      <Divider />
      <FeaturedProject />
      <Divider />
      <Experience />
      <Divider />
      <TechnicalEngineering />
      <Divider />
      <Teaching />
      <Divider />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}