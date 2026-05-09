import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Projects",             href: "#projects"   },
  { label: "Experience",           href: "#experience" },
  { label: "Teaching & Community", href: "#teaching"   },
  { label: "About",                href: "#about"      },
  { label: "Contact",              href: "#contact"    },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 56px", height: 66,
        background: scrolled ? "rgba(250,250,247,.88)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(224,224,220,.6)"
          : "1px solid transparent",
        transition: "all .4s ease",
      }}
    >
      <span
        className="df"
        style={{ fontSize: 20, fontWeight: 600, color: "#1A1A1A", letterSpacing: "-.02em" }}
      >
        Leonard Samuel
      </span>

      <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
        {NAV_LINKS.map((l) => (
          <a key={l.label} href={l.href} className="nl">
            {l.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
