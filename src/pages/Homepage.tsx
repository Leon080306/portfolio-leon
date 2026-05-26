import { useState, useEffect, useRef, createContext, useContext } from "react";
import { ArrowRight, MapPin, Mail, MessageCircle } from "lucide-react";
import { useBreakpoint } from "../hooks/useBreakpoint";

// ─── Brand icons ──────────────────────────────────────────────────────────────
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

// ─── Breakpoint context ───────────────────────────────────────────────────────
interface BP { isMobile: boolean; isTablet: boolean; }
const BPCtx = createContext<BP>({ isMobile: false, isTablet: false });
const useBP = () => useContext(BPCtx);

// ─── Helpers ──────────────────────────────────────────────────────────────────
const Divider = () => (
  <div style={{ height: 1, background: "linear-gradient(90deg,transparent,#E0E0DC,transparent)", maxWidth: 1380, margin: "0 auto" }} />
);

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

function sp(isTablet: boolean, isMobile: boolean) {
  if (isMobile) return "60px 20px";
  if (isTablet) return "80px 32px";
  return "120px 56px";
}
function spv(isTablet: boolean, isMobile: boolean) {
  if (isMobile) return "60px 0";
  if (isTablet) return "80px 0";
  return "120px 0";
}
function innerPad(isMobile: boolean) {
  return isMobile ? "0 20px" : "0 56px";
}

// ─── Hero Mockups — desktop composition ──────────────────────────────────────
// Layout: large landscape "desktop" screen (back) + phone (front-left) + SRS card (bottom-right)
function HeroMockups({ mx, my }: { mx: number; my: number }) {
  const t = (d: number) =>
    `translate(${(mx - 0.5) * 16 * d}px, ${(my - 0.5) * 9 * d}px)`;

  return (
    <div style={{ position: "relative", height: 540, width: "100%" }}>

      {/* Sage decorative blob */}
      <div style={{
        position: "absolute", right: -80, top: "50%",
        transform: "translateY(-50%)",
        width: 460, height: 460, borderRadius: "50%",
        background: "rgba(122,140,123,.11)",
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* ── Large landscape desktop / monitor frame ── */}
      <div style={{
        position: "absolute",
        top: 30, right: -30,
        zIndex: 2, width: 570, height: 300,
        transform: `${t(0.5)} rotate(1.5deg) translateZ(0)`,  // ← force GPU layer
        transition: "transform .55s ease",
        willChange: "transform",                               // ← keep on GPU
      }}>
        <div style={{
          width: "100%", height: "100%",
          background: "#161616",
          borderRadius: 12,
          padding: "7px 7px 26px",
          boxShadow: "0 40px 100px rgba(0,0,0,.3), 0 10px 28px rgba(0,0,0,.2), inset 0 1px 0 rgba(255,255,255,.07)",
          position: "relative",
          isolation: "isolate",                                // ← own stacking context
        }}>
          <div style={{
            position: "absolute", top: 4, left: "50%",
            transform: "translateX(-50%)",
            width: 5, height: 5, borderRadius: "50%",
            background: "#2A2A2A",
          }} />
          <div style={{
            width: "100%", height: "100%",
            borderRadius: 7, overflow: "hidden",
            WebkitMaskImage: "-webkit-radial-gradient(white, black)", // ← Safari overflow fix
          }}>
            <img
              src="/crg-admin-dashboard.png"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top left", display: "block" }}
            />
          </div>
          <div style={{
            position: "absolute", bottom: 9, left: "50%",
            transform: "translateX(-50%)",
            width: 44, height: 3, borderRadius: 2,
            background: "#2C2C2C",
          }} />
        </div>
        <div style={{
          position: "absolute", bottom: -18, left: "50%",
          transform: "translateX(-50%)",
          width: 40, height: 18, background: "#1C1C1C",
          clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
        }} />
        <div style={{
          position: "absolute", bottom: -24, left: "50%",
          transform: "translateX(-50%)",
          width: 90, height: 6, borderRadius: 3, background: "#1C1C1C",
        }} />
      </div>

      {/* ── Phone frame ── */}
      <div style={{
        position: "absolute",
        left: 10, bottom: 10,
        zIndex: 3, width: 185, height: 410,
        transform: `${t(1.0)} rotate(-2.5deg) translateZ(0)`,
        transition: "transform .55s ease",
        willChange: "transform",
      }}>
        <div style={{
          width: "100%", height: "100%",
          background: "#161616",
          borderRadius: 14,                               // ← your value
          padding: "4px 4px 4px",
          boxShadow:
            "0 28px 72px rgba(0,0,0,.32), 0 8px 20px rgba(0,0,0,.22), inset 0 1px 0 rgba(255,255,255,.07)",
          position: "relative",
          isolation: "isolate",
        }}>
          {/* Dynamic island */}
          <div style={{
            position: "absolute", top: 6, left: "50%",
            transform: "translateX(-50%)",
            width: 64, height: 19, borderRadius: 10,
            background: "#000", zIndex: 1,
          }} />
          {/* Screen */}
          <div style={{
            width: "100%", height: "100%",
            borderRadius: 10,                             // ← 14 (outer) − 4 (padding) = 10
            overflow: "hidden",
            WebkitMaskImage: "-webkit-radial-gradient(white, black)",
          }}>
            <img
              src="/crg-card-swipe.jpeg"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }}
            />
          </div>
          {/* Home bar */}
          <div style={{
            position: "absolute", bottom: 5, left: "50%",
            transform: "translateX(-50%)",
            width: 52, height: 3, borderRadius: 2,
            background: "#444",
          }} />
        </div>
      </div>

      {/* ── Stats floating card ── */}
      <div style={{
        position: "absolute",
        bottom: 20, right: 16,
        zIndex: 4, width: 200,
        transform: t(0.75),
        transition: "transform .55s ease",
        background: "white",
        borderRadius: 18,
        padding: "16px 18px 18px",
        boxShadow: "0 16px 48px rgba(0,0,0,.13), 0 4px 12px rgba(0,0,0,.07)",
        border: "1px solid rgba(0,0,0,.05)",
      }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 14 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#7A8C7B" }} />
          <div style={{
            fontFamily: "'Sora', sans-serif", fontSize: 10, fontWeight: 500,
            color: "#A0A09C", letterSpacing: ".08em", textTransform: "uppercase",
          }}>
            Platform Scale
          </div>
        </div>

        {/* Vocabulary */}
        <div style={{ paddingBottom: 12, marginBottom: 12, borderBottom: "1px solid #F2F2EF" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 26, fontWeight: 600, color: "#1A1A1A", lineHeight: 1, letterSpacing: "-.02em" }}>20K+</div>
              <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 9.5, color: "#A0A09C", marginTop: 3 }}>Vocabulary Entries</div>
            </div>
            {/* Character tiles */}
            <div style={{ display: "flex", gap: 3, marginTop: 2 }}>
              {["字", "词", "语"].map((c, i) => (
                <div key={i} style={{
                  width: 22, height: 22, borderRadius: 6,
                  background: `rgba(122,140,123,${0.1 + i * 0.08})`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 13, color: "#7A8C7B", fontWeight: 600,
                }}>{c}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Progress */}
        <div style={{ paddingBottom: 12, marginBottom: 12, borderBottom: "1px solid #F2F2EF" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 26, fontWeight: 600, color: "#1A1A1A", lineHeight: 1, letterSpacing: "-.02em" }}>600K+</div>
              <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 9.5, color: "#A0A09C", marginTop: 3 }}>Progress Records</div>
            </div>
            {/* Calendar dot grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2.5, marginTop: 2 }}>
              {[1, 1, 1, 1, 1, 0, 1, 0, 0].map((on, i) => (
                <div key={i} style={{
                  width: 7, height: 7, borderRadius: 2,
                  background: on ? `rgba(122,140,123,${0.35 + i * 0.05})` : "#F0F0EC",
                }} />
              ))}
            </div>
          </div>
        </div>

        {/* Students */}
        <div>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 26, fontWeight: 600, color: "#1A1A1A", lineHeight: 1, letterSpacing: "-.02em" }}>400+</div>
              <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 9.5, color: "#A0A09C", marginTop: 3 }}>Students Supported</div>
            </div>
            {/* Graduation cap row */}
            <div style={{ display: "flex", gap: 2, marginTop: 4 }}>
              {[...Array(3)].map((_, i) => (
                <div key={i} style={{
                  width: 22, height: 22, borderRadius: "50%",
                  background: `rgba(122,140,123,${0.12 + i * 0.08})`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11,
                }}>🎓</div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const { isMobile, isTablet } = useBP();
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
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: isTablet ? "1fr" : "1fr 1fr",
        alignItems: "center",
        gap: 48,
        padding: isMobile ? "100px 20px 60px" : isTablet ? "100px 32px 60px" : "88px 56px 60px",
        maxWidth: 1380, margin: "0 auto",
      }}
    >
      <div style={{ textAlign: isTablet ? "center" : "left" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(122,140,123,.1)", borderRadius: 100, padding: "6px 14px", marginBottom: 28 }}>
          <div className="pulse" style={{ width: 7, height: 7, borderRadius: "50%", background: "#7A8C7B" }} />
          <span style={{ fontSize: 12, color: "#7A8C7B", fontWeight: 500 }}>Available for opportunities</span>
        </div>

        <h1 className="df reveal" style={{ fontSize: "clamp(44px,5.8vw,84px)", fontWeight: 600, lineHeight: 1.04, letterSpacing: "-.035em", color: "#1A1A1A", marginBottom: 24 }}>
          Designingggg<br />
          <em style={{ fontStyle: "italic", color: "#7A8C7B" }}>Intelligent</em><br />
          Learning<br />
          Experiences
        </h1>

        <p className="reveal d1" style={{ fontSize: isMobile ? 15 : 17, color: "#707070", lineHeight: 1.75, fontWeight: 300, maxWidth: isTablet ? "100%" : 440, marginBottom: 36 }}>
          Informatics student and full-stack developer building educational technology, scalable learning systems, and real-world teaching experiences.
        </p>

        <div className="reveal d2" style={{ display: "flex", gap: 12, marginBottom: 48, justifyContent: isTablet ? "center" : "flex-start", flexWrap: "wrap" }}>
          <a href="#projects" className="bp">View Projects <ArrowRight size={15} /></a>
          <a href="#contact" className="bs">Contact Me</a>
        </div>

        <div className="reveal d3" style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: isTablet ? "center" : "flex-start" }}>
          {["Informatics Student", "Web Developer", "EdTech Builder"].map((m) => (
            <span key={m} className="chip">{m}</span>
          ))}
          <span className="chip" style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
            <MapPin size={10} /> Based in Indonesia
          </span>
        </div>
      </div>

      {/* Desktop — full parallax composition */}
      {!isTablet && <HeroMockups mx={mouse.x} my={mouse.y} />}

      {/* Tablet — simple 2×2 placeholder grid */}
      {isTablet && !isMobile && (
        <div style={{ position: "relative", height: 340, maxWidth: 520, margin: "0 auto", width: "100%" }}>

          {/* Monitor */}
          <div style={{
            position: "absolute", top: 0, left: 40, right: 0,
            background: "#161616", borderRadius: 12,
            padding: "7px 7px 26px",
            boxShadow: "0 24px 64px rgba(0,0,0,.25), inset 0 1px 0 rgba(255,255,255,.07)",
          }}>
            <div style={{ borderRadius: 7, overflow: "hidden", height: 200 }}>
              <img src="/crg-admin-dashboard.png" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top left", display: "block" }} />
            </div>
            {/* Monitor stand */}
            <div style={{ position: "absolute", bottom: -14, left: "50%", transform: "translateX(-50%)", width: 32, height: 14, background: "#1C1C1C", clipPath: "polygon(20% 0%,80% 0%,100% 100%,0% 100%)" }} />
            <div style={{ position: "absolute", bottom: -20, left: "50%", transform: "translateX(-50%)", width: 70, height: 5, borderRadius: 3, background: "#1C1C1C" }} />
          </div>

          {/* Phone */}
          <div style={{
            position: "absolute", bottom: 0, left: 0,
            width: 120, height: 240,
            background: "#161616", borderRadius: 16,
            padding: 4,
            boxShadow: "0 20px 52px rgba(0,0,0,.3), inset 0 1px 0 rgba(255,255,255,.07)",
            zIndex: 2,
          }}>
            {/* Dynamic island */}
            <div style={{ position: "absolute", top: 6, left: "50%", transform: "translateX(-50%)", width: 44, height: 13, borderRadius: 8, background: "#000", zIndex: 1 }} />
            <div style={{ width: "100%", height: "100%", borderRadius: 12, overflow: "hidden" }}>
              <img src="/crg-card-swipe.jpeg" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }} />
            </div>
          </div>

        </div>
      )}
    </section>
  );
}

// ─── Featured Project ─────────────────────────────────────────────────────────
// ─── Featured Projects ────────────────────────────────────────────────────────
function FeaturedProject() {
  const { isMobile, isTablet } = useBP();

  const projects = [
    {
      category: "Educational Platform",
      title: "Chinese Readers Guild Platform",
      desc: "A comprehensive learning platform supporting vocabulary study, spaced repetition, and progress tracking for Mandarin learners.",
      challenge: "Handling complex spaced repetition logic and database scaling to hundreds of thousands of progress records.",
      solution: "Designed optimized algorithms and database structures. Built real-time thousands tracking and adaptive review systems.",
      impact: "600K+ progress records, 20K+ vocabulary entries, and used by 400+ students worldwide.",
      tags: ["Next.js", "Node.js", "PostgreSQL", "Tailwind CSS", "Prisma"],
      visual: "mockup", // composite monitor + phone
    },
    {
      category: "DevOps & Infrastructure",
      title: "Kubernetes E-Commerce System",
      desc: "Deployed a containerized e-commerce application with microservices architecture on a Kubernetes cluster.",
      challenge: "Managing deployments, scalability, and service reliability across multiple containers.",
      solution: "Implemented Kubernetes orchestration, resource limits, auto-scaling, and monitoring.",
      impact: "High availability, easier scaling, and improved system resilience.",
      tags: ["Kubernetes", "Docker", "Nginx", "PostgreSQL", "Redis"],
      visual: "arch", // architecture diagram
    },
    {
      category: "Education & Community",
      title: "AI Workshop & Mentorship Programs",
      desc: "Conducted hands-on AI workshops and mentored students in algorithms, programming, and competitive olympiads.",
      challenge: "Making complex AI topics accessible and engaging for students with different backgrounds.",
      solution: "Designed interactive sessions, real-world projects, and provided mentorship & guidance.",
      impact: "Hundreds of students trained and mentored through workshops and competitions.",
      tags: ["Python", "Machine Learning", "Teaching", "Mentorship"],
      visual: "photo",
    },
  ];

  return (
    <section id="projects" style={{ padding: sp(isTablet, isMobile), maxWidth: 1380, margin: "0 auto" }}>

      {/* ── Section header ── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: isTablet ? "1fr" : "1fr 1fr",
        gap: isTablet ? 24 : 80,
        alignItems: "flex-end",
        marginBottom: isMobile ? 36 : 56,
      }}>
        <div>
          <div className="ach reveal" style={{ marginBottom: 20 }}>Selected Work</div>
          <h2 className="df reveal d1" style={{
            fontSize: "clamp(32px,4.5vw,68px)", fontWeight: 600,
            lineHeight: 1.06, letterSpacing: "-.035em", color: "#1A1A1A", margin: 0,
          }}>
            Projects Built with<br />
            <em style={{ fontStyle: "italic", color: "#7A8C7B" }}>Purpose and Process</em>
          </h2>
        </div>
        <p className="reveal d2" style={{
          fontSize: isMobile ? 14 : 16, color: "#707070", lineHeight: 1.8,
          fontWeight: 300, margin: 0, maxWidth: 520,
          alignSelf: isTablet ? "flex-start" : "flex-end", paddingBottom: isTablet ? 0 : 6,
        }}>
          Here are some of the systems I've built — each shaped by real problems, technical challenges, and a focus on creating meaningful impact for learners and users.
        </p>
      </div>

      {/* ── Project cards ── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(3, 1fr)",
        gap: 20,
        marginBottom: 40,
      }}>
        {projects.map((p, i) => (
          <div key={i} className={`reveal d${i + 1}`} style={{
            background: "white",
            borderRadius: 20,
            border: "1px solid #EDEDEA",
            overflow: "hidden",
            display: "flex", flexDirection: "column",
            boxShadow: "0 2px 12px rgba(0,0,0,.04)",
            transition: "box-shadow .25s ease, transform .25s ease",
          }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 40px rgba(0,0,0,.1)";
              (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 12px rgba(0,0,0,.04)";
              (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
            }}
          >
            {/* Visual area */}
            <div style={{ height: 220, background: "#111", overflow: "hidden", position: "relative", flexShrink: 0 }}>

              {/* Card 1 — composite mockup */}
              {p.visual === "mockup" && (
                <>
                  <img src="/crg-admin-dashboard.png" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "top left" }} />
                  {/* Phone overlay */}
                  <div style={{
                    position: "absolute", bottom: -10, right: 20,
                    width: 90, height: 175,
                    background: "#161616", borderRadius: 12, padding: 3,
                    boxShadow: "0 16px 40px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.07)",
                    zIndex: 2,
                  }}>
                    <div style={{ position: "absolute", top: 5, left: "50%", transform: "translateX(-50%)", width: 30, height: 8, borderRadius: 4, background: "#000", zIndex: 1 }} />
                    <div style={{ width: "100%", height: "100%", borderRadius: 9, overflow: "hidden" }}>
                      <img src="/crg-card-swipe.jpeg" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }} />
                    </div>
                  </div>
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, transparent 60%, rgba(0,0,0,.4))" }} />
                </>
              )}

              {/* Card 2 — architecture diagram */}
              {p.visual === "arch" && (
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(145deg,#0F1A10,#1A2B1A)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
                  <svg width="100%" height="100%" viewBox="0 0 320 200" style={{ overflow: "visible" }}>
                    {/* Grid */}
                    {[40, 80, 120, 160].map(y => <line key={`h${y}`} x1="0" y1={y} x2="320" y2={y} stroke="#7A8C7B" strokeWidth=".4" opacity=".3" />)}
                    {[64, 128, 192, 256].map(x => <line key={`v${x}`} x1={x} y1="0" x2={x} y2="200" stroke="#7A8C7B" strokeWidth=".4" opacity=".3" />)}
                    {/* User */}
                    <rect x="130" y="8" width="60" height="24" rx="5" fill="rgba(122,140,123,.15)" stroke="#7A8C7B" strokeWidth=".8" />
                    <text x="160" y="24" textAnchor="middle" fill="#A8C4A8" fontSize="8" fontFamily="Sora,sans-serif">User</text>
                    {/* Nginx */}
                    <line x1="160" y1="32" x2="160" y2="50" stroke="#7A8C7B" strokeWidth="1" strokeDasharray="3,2" opacity=".6" />
                    <rect x="115" y="50" width="90" height="24" rx="5" fill="rgba(122,140,123,.15)" stroke="#7A8C7B" strokeWidth=".8" />
                    <text x="160" y="66" textAnchor="middle" fill="#A8C4A8" fontSize="8" fontFamily="Sora,sans-serif">Nginx Ingress</text>
                    {/* Pods row */}
                    <line x1="135" y1="74" x2="90" y2="94" stroke="#7A8C7B" strokeWidth="1" strokeDasharray="3,2" opacity=".6" />
                    <line x1="185" y1="74" x2="230" y2="94" stroke="#7A8C7B" strokeWidth="1" strokeDasharray="3,2" opacity=".6" />
                    <rect x="50" y="94" width="80" height="24" rx="5" fill="rgba(30,80,160,.25)" stroke="#4A80D0" strokeWidth=".8" />
                    <text x="90" y="110" textAnchor="middle" fill="#88B0F0" fontSize="7.5" fontFamily="Sora,sans-serif">Web (React)</text>
                    <rect x="190" y="94" width="80" height="24" rx="5" fill="rgba(30,80,160,.25)" stroke="#4A80D0" strokeWidth=".8" />
                    <text x="230" y="110" textAnchor="middle" fill="#88B0F0" fontSize="7.5" fontFamily="Sora,sans-serif">API (Node.js)</text>
                    {/* Redis */}
                    <line x1="230" y1="118" x2="270" y2="138" stroke="#7A8C7B" strokeWidth="1" strokeDasharray="3,2" opacity=".6" />
                    <rect x="240" y="138" width="70" height="24" rx="5" fill="rgba(180,50,30,.2)" stroke="#C06050" strokeWidth=".8" />
                    <text x="275" y="154" textAnchor="middle" fill="#E09080" fontSize="7.5" fontFamily="Sora,sans-serif">Redis (Cache)</text>
                    {/* PostgreSQL */}
                    <line x1="90" y1="118" x2="130" y2="152" stroke="#7A8C7B" strokeWidth="1" strokeDasharray="3,2" opacity=".6" />
                    <line x1="230" y1="118" x2="170" y2="152" stroke="#7A8C7B" strokeWidth="1" strokeDasharray="3,2" opacity=".6" />
                    <rect x="100" y="152" width="120" height="24" rx="5" fill="rgba(122,140,123,.2)" stroke="#7A8C7B" strokeWidth=".8" />
                    <text x="160" y="168" textAnchor="middle" fill="#A8C4A8" fontSize="7.5" fontFamily="Sora,sans-serif">PostgreSQL (Database)</text>
                    {/* Monitoring */}
                    <rect x="8" y="152" width="80" height="24" rx="5" fill="rgba(80,80,80,.2)" stroke="#666" strokeWidth=".8" />
                    <text x="48" y="168" textAnchor="middle" fill="#999" fontSize="7" fontFamily="Sora,sans-serif">Monitoring</text>
                    <text x="160" y="196" textAnchor="middle" fill="rgba(122,140,123,.5)" fontSize="7" fontFamily="Sora,sans-serif" letterSpacing="1">KUBERNETES CLUSTER</text>
                  </svg>
                </div>
              )}

              {/* Card 3 — photo */}
              {p.visual === "photo" && (
                <img src="/nafiri-ai-workshop.jpeg" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
              )}
            </div>

            {/* Card body */}
            <div style={{ padding: "20px 22px 22px", display: "flex", flexDirection: "column", flex: 1 }}>

              {/* Category + title + desc */}
              <div style={{ fontSize: 10, fontWeight: 600, color: "#7A8C7B", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 8 }}>
                {p.category}
              </div>
              <div className="df" style={{ fontSize: 20, fontWeight: 600, color: "#1A1A1A", lineHeight: 1.2, marginBottom: 8 }}>
                {p.title}
              </div>
              <p style={{ fontSize: 13, color: "#707070", lineHeight: 1.65, marginBottom: 18, fontWeight: 300 }}>
                {p.desc}
              </p>

              {/* Challenge / Solution / Impact */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 18, flex: 1 }}>
                {[
                  { label: "The Challenge", icon: "🔧", text: p.challenge },
                  { label: "My Solution", icon: "💡", text: p.solution },
                  { label: "The Impact", icon: "🎯", text: p.impact },
                ].map((col) => (
                  <div key={col.label}>
                    <div style={{ fontSize: 10, fontWeight: 600, color: "#1A1A1A", marginBottom: 5, display: "flex", alignItems: "center", gap: 4 }}>
                      <span style={{ fontSize: 11 }}>{col.icon}</span> {col.label}
                    </div>
                    <div style={{ fontSize: 11.5, color: "#888", lineHeight: 1.6 }}>{col.text}</div>
                  </div>
                ))}
              </div>

              {/* Tags + CTA */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8, borderTop: "1px solid #F0F0EC", paddingTop: 14 }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                  {p.tags.map((t) => <span key={t} className="chip" style={{ fontSize: 10 }}>{t}</span>)}
                </div>
                <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 500, color: "#7A8C7B", textDecoration: "none", whiteSpace: "nowrap", fontFamily: "'Sora',sans-serif" }}>
                  View Case Study <ArrowRight size={12} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── GitHub CTA ── */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
        <a
          href="https://github.com/Leon080306"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            border: "1.5px solid #D4D4D0", borderRadius: 100,
            padding: "14px 32px",
            fontSize: 14, fontWeight: 500, color: "#1A1A1A",
            textDecoration: "none", fontFamily: "'Sora',sans-serif",
            transition: "border-color .2s, background .2s",
            background: "white",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLAnchorElement).style.borderColor = "#7A8C7B";
            (e.currentTarget as HTMLAnchorElement).style.background = "rgba(122,140,123,.05)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLAnchorElement).style.borderColor = "#D4D4D0";
            (e.currentTarget as HTMLAnchorElement).style.background = "white";
          }}
        >
          Explore More Projects on GitHub <ArrowRight size={14} /> <IconGithub />
        </a>
        <span style={{ fontSize: 12, color: "#B0B0AC", fontFamily: "'Sora',sans-serif" }}>
          More projects, experiments, and open source contributions.
        </span>
      </div>

    </section >
  );
}

// ─── Experience ───────────────────────────────────────────────────────────────
function Experience() {
  const { isMobile, isTablet } = useBP();

  const roles = [
    {
      period: "2026 — Present", role: "Part Time Web Developer", current: true,
      company: "Singapore Education Network", duration: null,
      desc: "Advanced from Intern to Part Time Web Developer, building production-ready educational platforms and scalable web systems used by real users.",
      tags: ["Wix Velo", "HTML/CSS/JS", "CMS Architecture", "Automations"],
    },
    {
      period: "2025", role: "UI/UX Associate Intern", current: false,
      company: "Singapore Education Network", duration: "6 months",
      desc: "Designed and implemented web interfaces for educational programs and international learning initiatives, collaborating with marketing and partnership teams.",
      tags: ["Web Design", "User Flows", "Prototyping", "Visual Design", "Frontend Wix", "HTML/CSS/JS"]
    },
    {
      period: "2025 — Present",
      role: "Web Developer",
      company: "Chinese Readers Guild",
      duration: null,
      desc: "Developing an intelligent Mandarin learning platform featuring spaced repetition flashcards, classroom systems, vocabulary management, and scalable learning infrastructure.",
      tags: ["PHP", "MySQL", "TypeScript", "React", "Ubuntu VPS", "Spaced Repetition", "System Design", "Full-Stack"],
    },
  ];

  return (
    <section id="experience" style={{ padding: spv(isTablet, isMobile), background: "white", width: "100%" }}>
      <div style={{ maxWidth: 1380, margin: "0 auto", padding: innerPad(isMobile), display: "grid", gridTemplateColumns: isTablet ? "1fr" : "1fr 2fr", gap: isTablet ? 40 : 80 }}>

        <div>
          <div className="ach reveal" style={{ marginBottom: 20 }}>Career</div>
          <h2 className="df reveal d1" style={{ fontSize: "clamp(28px,3.5vw,52px)", fontWeight: 600, lineHeight: 1.1, letterSpacing: "-.03em", color: "#1A1A1A" }}>
            Professional<br /><em style={{ color: "#7A8C7B" }}>Experience</em>
          </h2>
          <p className="reveal d2" style={{ fontSize: 15, color: "#707070", lineHeight: 1.75, fontWeight: 300, marginTop: 16 }}>
            A track record of growth at the intersection of education and technology.
          </p>
        </div>

        <div style={{ position: "relative", paddingLeft: 32 }}>
          {/* Timeline line */}
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 2, background: "linear-gradient(180deg,#7A8C7B,rgba(122,140,123,.1))" }} />

          <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
            {roles.map((r, i) => (
              <div key={i} className={`reveal d${i + 1}`} style={{ position: "relative" }}>

                {/* Timeline dot — left: -38 centers 13px dot on 2px line with paddingLeft: 32 */}
                <div style={{
                  position: "absolute", left: -37, top: 4,
                  width: 13, height: 13, borderRadius: "50%",
                  background: r.current ? "#7A8C7B" : "#D4D4D0",
                  border: "2.5px solid white",
                  boxShadow: r.current ? "0 0 0 3px rgba(122,140,123,.2)" : "none",
                }} />

                {/* Period + duration */}
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <div style={{ fontSize: 12, color: "#7A8C7B", fontWeight: 500, letterSpacing: ".04em" }}>
                    {r.period}
                  </div>
                  {r.duration && (
                    <span style={{
                      fontSize: 10, fontWeight: 600,
                      color: "#5A7A5B",
                      background: "rgba(122,140,123,.1)",
                      border: "1px solid rgba(122,140,123,.25)",
                      borderRadius: 100,
                      padding: "2px 9px",
                      letterSpacing: ".02em",
                    }}>
                      {r.duration}
                    </span>
                  )}
                </div>

                <div style={{ fontSize: isMobile ? 18 : 21, fontWeight: 600, color: "#1A1A1A", marginBottom: 2 }}>{r.role}</div>
                <div style={{ fontSize: 14, color: "#707070", marginBottom: 12 }}>{r.company}</div>
                <p style={{ fontSize: isMobile ? 13 : 14, color: "#707070", lineHeight: 1.75, marginBottom: 14 }}>{r.desc}</p>

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
  const { isMobile, isTablet } = useBP();

  const stack = [
    { label: "React", bg: "#E8F8FD", color: "#0E7A9E" },
    { label: "TypeScript", bg: "#EBF1FA", color: "#2558A7" },
    { label: "Express", bg: "#EBF5EB", color: "#2D6A2D" },
    { label: "PostgreSQL", bg: "#EAF0F8", color: "#235680" },
    { label: "Docker", bg: "#E8F3FD", color: "#1466B8" },
    { label: "Kubernetes", bg: "#EAF0FE", color: "#1F4DB5" },
  ];

  return (
    <section id="engineering" style={{ padding: sp(isTablet, isMobile), maxWidth: 1380, margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: isTablet ? "1fr" : "1fr 1fr", gap: isTablet ? 48 : 80, alignItems: "center" }}>

        {/* Architecture diagram */}
        <div className="reveal" style={{ position: "relative", height: isMobile ? 280 : 360, background: "linear-gradient(145deg,#F5F8F5,#EDF2ED)", borderRadius: 24, border: "1px solid #E0E8E0", overflow: "hidden" }}>

          {/* Grid background */}
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: .22 }}>
            {[25, 50, 75].map((p) => <line key={`h${p}`} x1="0" y1={`${p}%`} x2="100%" y2={`${p}%`} stroke="#7A8C7B" strokeWidth=".5" />)}
            {[25, 50, 75].map((p) => <line key={`v${p}`} x1={`${p}%`} y1="0" x2={`${p}%`} y2="100%" stroke="#7A8C7B" strokeWidth=".5" />)}
          </svg>

          {/* Connector lines */}
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
            {/* React → Express */}
            <line x1="27%" y1="22%" x2="27%" y2="52%" stroke="#7A8C7B" strokeWidth="1.5" strokeDasharray="5,3" opacity=".5" />
            <line x1="27%" y1="22%" x2="70%" y2="52%" stroke="#7A8C7B" strokeWidth="1.5" strokeDasharray="5,3" opacity=".5" />
            <line x1="70%" y1="22%" x2="27%" y2="52%" stroke="#7A8C7B" strokeWidth="1.5" strokeDasharray="5,3" opacity=".5" />
            <line x1="70%" y1="22%" x2="70%" y2="52%" stroke="#7A8C7B" strokeWidth="1.5" strokeDasharray="5,3" opacity=".5" />
            {/* Express → PostgreSQL */}
            <line x1="27%" y1="62%" x2="49%" y2="80%" stroke="#7A8C7B" strokeWidth="1.5" strokeDasharray="5,3" opacity=".5" />
            <line x1="70%" y1="62%" x2="51%" y2="80%" stroke="#7A8C7B" strokeWidth="1.5" strokeDasharray="5,3" opacity=".5" />
          </svg>

          {/* Row 1 — Frontend */}
          <div className="an" style={{ left: "13%", top: "14%", transform: "translateY(-50%)" }}>⚛️ React Pod 1</div>
          <div className="an" style={{ left: "55%", top: "14%", transform: "translateY(-50%)" }}>⚛️ React Pod 2</div>

          {/* Row 2 — Backend */}
          <div className="an" style={{ left: "13%", top: "56%", transform: "translateY(-50%)" }}>🚀 Express Pod 1</div>
          <div className="an" style={{ left: "55%", top: "56%", transform: "translateY(-50%)" }}>🚀 Express Pod 2</div>

          {/* Row 3 — Database */}
          <div className="an" style={{ left: "50%", top: "84%", transform: "translate(-50%,-50%)" }}>🗄️ PostgreSQL</div>

          <div style={{ position: "absolute", bottom: 14, right: 16, fontSize: 9, color: "#9AA89B", letterSpacing: ".06em", textTransform: "uppercase", fontWeight: 500 }}>
            Kubernetes Cluster
          </div>
        </div>

        <div>
          <div className="ach reveal" style={{ marginBottom: 20 }}>Engineering</div>
          <h2 className="df reveal d1" style={{ fontSize: "clamp(28px,3.5vw,52px)", fontWeight: 600, lineHeight: 1.1, letterSpacing: "-.03em", color: "#1A1A1A", marginBottom: 24 }}>
            Production-Grade<br /><em style={{ color: "#7A8C7B" }}>Infrastructure</em><br />at Scale
          </h2>
          <p className="reveal d2" style={{ fontSize: isMobile ? 14 : 16, color: "#707070", lineHeight: 1.8, fontWeight: 300, marginBottom: 32 }}>
            An e-commerce platform engineered with Kubernetes-orchestrated microservices — multiple frontend pods, load-balanced API servers, and persistent database layers in Docker containers.
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
  img: string;
  subColor: string; titleColor: string; descColor: string;
  overlayStrength?: { top: number; bottom: number };  // ← new
  large?: boolean; wide?: boolean;
}

function Teaching() {
  const { isMobile, isTablet } = useBP();

  const cards: TeachingCard[] = [
    {
      label: "AI Workshops", sub: "Workshop Leader", icon: "🎓",
      desc: "Prepared and led an AI workshop at Nafiri Study Centre in Jakarta, introducing students to machine learning concepts through Google Teachable Machine and Scratch-based projects.",
      img: "/nafiri-ai-workshop.jpeg",
      subColor: "#A8C8A8", titleColor: "#FAFAF7", descColor: "rgba(255,255,255,.7)",
      large: true,
    },
    {
      label: "OSN Informatika", sub: "Mentoring", icon: "🏆",
      desc: "Mentoring students for national informatics olympiad preparation",
      img: "/osn.jpeg",
      subColor: "#C8A8A8", titleColor: "#FAFAF7", descColor: "rgba(255,255,255,.7)",
    },
    {
      label: "Assistant Lecturer", sub: "Academia", icon: "📚",
      desc: "Supporting faculty in programming and systems engineering courses",
      img: "/teaching-session.png",
      subColor: "#A8B4C8", titleColor: "#FAFAF7", descColor: "rgba(255,255,255,.7)",
      overlayStrength: { top: 0.45, bottom: 0.88 },  // ← much darker
    },
    {
      label: "Academic Mentorship", sub: "IEC Staff", icon: "📘",
      desc: "Taught first-year informatics students fundamental algorithms and data structures through academic mentoring sessions and guided problem-solving exercises.",
      img: "/akpro.JPG",
      subColor: "#C8B4A8", titleColor: "#FAFAF7", descColor: "rgba(255,255,255,.7)",
      wide: true,
    },
  ];

  const gridStyle = isMobile
    ? { display: "grid", gridTemplateColumns: "1fr", gap: 12 }
    : isTablet
      ? { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }
      : { display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gridTemplateRows: "180px 180px", gap: 16 };

  return (
    <section id="teaching" style={{ padding: spv(isTablet, isMobile), background: "white", width: "100%" }}>
      <div style={{ maxWidth: 1380, margin: "0 auto", padding: innerPad(isMobile) }}>
        <div style={{ textAlign: "center", marginBottom: isMobile ? 36 : 60 }}>
          <div className="ach reveal" style={{ display: "inline-flex", marginBottom: 20 }}>Teaching & Community</div>
          <h2 className="df reveal d1" style={{ fontSize: "clamp(28px,4vw,60px)", fontWeight: 600, lineHeight: 1.1, letterSpacing: "-.03em", color: "#1A1A1A" }}>
            Sharing Knowledge,<br /><em style={{ color: "#7A8C7B" }}>Building Community</em>
          </h2>
          <p className="reveal d2" style={{ fontSize: isMobile ? 14 : 16, color: "#707070", lineHeight: 1.7, fontWeight: 300, maxWidth: 480, margin: "16px auto 0" }}>
            Teaching algorithms, programming, and practical technology through real workshops and mentoring.
          </p>
        </div>

        <div style={gridStyle}>
          {cards.map((c, i) => (
            <div key={i} className={`tc reveal d${i + 1}`} style={{
              gridColumn: !isMobile && !isTablet ? (c.large ? "1" : c.wide ? "2 / 4" : "auto") : "auto",
              gridRow: !isMobile && !isTablet ? (c.large ? "1 / 3" : "auto") : "auto",
              borderRadius: 20,
              display: "flex", flexDirection: "column", justifyContent: "flex-end",
              position: "relative", overflow: "hidden",
              border: "1px solid rgba(0,0,0,.08)",
              minHeight: isMobile ? 160 : isTablet ? 180 : undefined,
            }}>
              {/* Background image */}
              <img
                src={c.img}
                alt=""
                style={{
                  position: "absolute", inset: 0,
                  width: "100%", height: "100%",
                  objectFit: "cover", objectPosition: "center",
                  display: "block",
                }}
              />

              {/* Gradient overlay — darkens toward bottom for text legibility */}
              <div style={{
                position: "absolute", inset: 0,
                background: `linear-gradient(to bottom,
                  rgba(0,0,0,${c.overlayStrength?.top ?? 0.15}) 0%,
                  rgba(0,0,0,${c.overlayStrength?.bottom ?? 0.65}) 100%
                )`,
              }} />

              {/* Emoji icon */}
              <div style={{
                position: "absolute", top: 16, right: 16,
                fontSize: c.large && !isTablet ? 44 : 28,
                opacity: .5, zIndex: 1,
              }}>
                {c.icon}
              </div>

              {/* Text content */}
              <div style={{ position: "relative", zIndex: 1, padding: c.large && !isTablet ? 28 : 18 }}>
                <div style={{ fontSize: 10, color: c.subColor, fontWeight: 500, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 5 }}>
                  {c.sub}
                </div>
                <div style={{ fontSize: c.large && !isTablet ? 20 : 15, fontWeight: 600, color: c.titleColor, marginBottom: 4 }}>
                  {c.label}
                </div>
                <div style={{ fontSize: 12.5, color: c.descColor, lineHeight: 1.5 }}>
                  {c.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────
function About() {
  const { isMobile, isTablet } = useBP();
  return (
    <section id="about" style={{ padding: sp(isTablet, isMobile), maxWidth: 960, margin: "0 auto", textAlign: "center" }}>
      <div className="ach reveal" style={{ display: "inline-flex", marginBottom: 24 }}>About</div>
      <h2 className="df reveal d1" style={{ fontSize: "clamp(26px,4.5vw,60px)", fontWeight: 500, lineHeight: 1.18, letterSpacing: "-.03em", color: "#1A1A1A", fontStyle: "italic", marginBottom: 28 }}>
        "At the intersection of engineering<br />and learning experience design."
      </h2>
      <p className="reveal d2" style={{ fontSize: isMobile ? 14 : 17, color: "#707070", lineHeight: 1.9, fontWeight: 300, marginBottom: 16 }}>
        I'm a Software Engineering student at Institut Teknologi Harapan Bangsa with a deep interest in educational technology. I believe the best digital learning systems are built at the intersection of rigorous engineering and thoughtful experience design.
      </p>
      <p className="reveal d3" style={{ fontSize: isMobile ? 14 : 17, color: "#707070", lineHeight: 1.9, fontWeight: 300, marginBottom: 40 }}>
        My work focuses on building intelligent systems that make learning more adaptive, meaningful, and human — from classroom-integrated platforms to spaced repetition engines and analytics dashboards.
      </p>
      <a href="#" className="bs reveal d4">Read Full Story <ArrowRight size={15} /></a>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function Contact() {
  const { isMobile, isTablet } = useBP();

  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/mwvzvzow", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
        }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  const handleReset = () => {
    setForm({ name: "", email: "", subject: "", message: "" });
    setStatus("idle");
    // Re-observe any .reveal elements that came back into the DOM
    setTimeout(() => {
      document.querySelectorAll(".reveal:not(.vis)").forEach((el) => el.classList.add("vis"));
    }, 50);
  };

  const socials = [
    { icon: <Mail size={18} />, href: "mailto:leonsamuels080306@gmail.com", title: "Email" },
    { icon: <IconGithub />, href: "https://github.com/Leon080306", title: "GitHub" },
    { icon: <IconLinkedin />, href: "https://www.linkedin.com/in/leonard-samuel-setiawan", title: "LinkedIn" },
    { icon: <MessageCircle size={18} />, href: "https://wa.me/qr/5RF57YAMNZROA1", title: "WhatsApp" },
  ];

  return (
    <section id="contact" style={{ background: "#1A1A1A", padding: sp(isTablet, isMobile), width: "100%" }}>
      <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>

        <div className="reveal" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(122,140,123,.2)", borderRadius: 100, padding: "6px 14px", marginBottom: 28 }}>
          <span style={{ fontSize: 12, color: "#7A8C7B", fontWeight: 500 }}>Get in Touch</span>
        </div>

        <h2 className="df reveal d1" style={{ fontSize: "clamp(32px,5.5vw,72px)", fontWeight: 600, lineHeight: 1.06, letterSpacing: "-.035em", color: "#FAFAF7", marginBottom: 16 }}>
          Let's Build<br /><em style={{ color: "#7A8C7B" }}>Meaningful</em> Learning<br />Experiences
        </h2>

        <p className="reveal d2" style={{ fontSize: isMobile ? 14 : 16, color: "#888", lineHeight: 1.75, marginBottom: 40 }}>
          Open to collaborations, internships, and conversations about educational technology.
        </p>

        {/* Success state */}
        {status === "success" ? (
          <div style={{
            background: "rgba(122,140,123,.15)",
            border: "1px solid rgba(122,140,123,.3)",
            borderRadius: 16, padding: "36px 24px", marginBottom: 36,
            animation: "ls-fade-up .6s cubic-bezier(.16,1,.3,1) forwards", // ← reuse existing keyframe
          }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>✉️</div>
            <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 16, fontWeight: 600, color: "#FAFAF7", marginBottom: 8 }}>
              Message sent!
            </div>
            <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 14, color: "#888" }}>
              Thanks for reaching out — I'll get back to you soon.
            </div>
            <button onClick={handleReset} style={{ marginTop: 20, background: "none", border: "1px solid #444", borderRadius: 100, padding: "8px 20px", color: "#888", fontSize: 12, cursor: "pointer", fontFamily: "'Sora',sans-serif" }}>
              Send another
            </button>
          </div>
        ) : (
          <div className="reveal d3" style={{ display: "grid", gap: 12, marginBottom: 36, textAlign: "left" }}>
            <div className="contact-name-email" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <input className="ci" name="name" type="text" placeholder="Your name" value={form.name} onChange={handleChange} />
              <input className="ci" name="email" type="email" placeholder="Email address" value={form.email} onChange={handleChange} />
            </div>
            <input className="ci" name="subject" type="text" placeholder="Subject" value={form.subject} onChange={handleChange} />
            <textarea className="ci" name="message" rows={4} placeholder="Your message..." value={form.message} onChange={handleChange} style={{ resize: "vertical" }} />

            {/* Error message */}
            {status === "error" && (
              <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 13, color: "#E07070", textAlign: "center" }}>
                Something went wrong. Please try again or email me directly.
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                className="bp"
                onClick={handleSubmit}
                disabled={status === "sending"}
                style={{ padding: "14px 40px", opacity: status === "sending" ? 0.6 : 1, cursor: status === "sending" ? "not-allowed" : "pointer" }}
              >
                {status === "sending" ? "Sending…" : <>Send Message <ArrowRight size={15} /></>}
              </button>
            </div>
          </div>
        )}

        <div className="reveal d4" style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
          {socials.map((s) => (
            <a key={s.title} href={s.href} target="_blank" rel="noopener noreferrer" className="sb" title={s.title}>{s.icon}</a>
          ))}
        </div>

      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const { isMobile } = useBP();
  return (
    <footer style={{ background: "#111", padding: isMobile ? "28px 20px" : "36px 56px", borderTop: "1px solid rgba(255,255,255,.06)" }}>
      <div className="footer-inner" style={{ maxWidth: 1380, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span className="df" style={{ fontSize: 18, fontWeight: 600, color: "#555" }}>Leonard Samuel</span>
        <div style={{ fontSize: 12, color: "#3A3A3A" }}>© 2025 Leonard Samuel</div>
        <div className="footer-links" style={{ display: "flex", gap: 20 }}>
          {[["Projects", "#projects"], ["Experience", "#experience"], ["About", "#about"], ["Contact", "#contact"]].map(([l, h]) => (
            <a key={l} href={h} className="fl">{l}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function PortfolioPage() {
  const bp = useBreakpoint();
  useScrollReveal();

  return (
    <BPCtx.Provider value={bp}>
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
    </BPCtx.Provider>
  );
}