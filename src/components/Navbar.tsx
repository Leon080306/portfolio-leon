/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useBreakpoint } from "../hooks/useBreakpoint";

const NAV_LINKS = [
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Teaching & Community", href: "#teaching" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isTablet } = useBreakpoint();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  // Close drawer when resizing back to desktop
  useEffect(() => {
    if (!isTablet) setMenuOpen(false);
  }, [isTablet]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: isTablet ? "0 24px" : "0 56px",
        height: 66,
        background: scrolled || menuOpen ? "rgba(250,250,247,.95)" : "transparent",
        backdropFilter: scrolled || menuOpen ? "blur(20px)" : "none",
        borderBottom: scrolled || menuOpen
          ? "1px solid rgba(224,224,220,.6)"
          : "1px solid transparent",
        transition: "all .4s ease",
      }}>
        <span className="df" style={{ fontSize: 20, fontWeight: 600, color: "#1A1A1A", letterSpacing: "-.02em" }}>
          Leonard Samuel Setiawan
        </span>

        {/* Desktop links */}
        {!isTablet && (
          <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
            {NAV_LINKS.map((l) => (
              <a key={l.label} href={l.href} className="nl">{l.label}</a>
            ))}
          </div>
        )}

        {/* Hamburger button */}
        {isTablet && (
          <button
            onClick={() => setMenuOpen((o) => !o)}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#1A1A1A", display: "flex", alignItems: "center", justifyContent: "center", padding: 4 }}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}
      </nav>

      {/* Mobile overlay menu */}
      {isTablet && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 99,
          background: "rgba(250,250,247,.97)",
          backdropFilter: "blur(24px)",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: 12,
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "all" : "none",
          transition: "opacity .35s ease",
        }}>
          {NAV_LINKS.map((l, i) => (
            <a
              key={l.label}
              href={l.href}
              onClick={close}
              className="df"
              style={{
                fontSize: 36, fontWeight: 600, color: "#1A1A1A",
                textDecoration: "none", letterSpacing: "-.02em",
                padding: "10px 0",
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateY(0)" : "translateY(16px)",
                transition: `opacity .4s ease ${i * 0.06}s, transform .4s ease ${i * 0.06}s`,
              }}
            >
              {l.label}
            </a>
          ))}

          <div style={{ marginTop: 32, display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
            {["#projects", "#contact"].map((href, i) => (
              <a key={i} href={href} onClick={close}
                className={i === 0 ? "bp" : "bs"}
                style={{ fontSize: 14 }}>
                {i === 0 ? "View Projects" : "Contact Me"}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
