import { ArrowRight } from "lucide-react";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300;1,600&family=Sora:wght@300;400;500&display=swap');

  @keyframes pnf-fade-up {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .pnf-404     { opacity: 0; animation: pnf-fade-up .8s cubic-bezier(.16,1,.3,1) .1s  forwards; }
  .pnf-title   { opacity: 0; animation: pnf-fade-up .8s cubic-bezier(.16,1,.3,1) .25s forwards; }
  .pnf-desc    { opacity: 0; animation: pnf-fade-up .8s cubic-bezier(.16,1,.3,1) .4s  forwards; }
  .pnf-actions { opacity: 0; animation: pnf-fade-up .8s cubic-bezier(.16,1,.3,1) .55s forwards; }

  .pnf-bp {
    background: #222; color: #FAFAF7; border: none; padding: 13px 28px;
    border-radius: 100px; font-family: 'Sora', sans-serif; font-size: 14px;
    font-weight: 500; cursor: pointer; display: inline-flex; align-items: center;
    gap: 8px; transition: all .25s; text-decoration: none;
  }
  .pnf-bp:hover { background: #3A3A3A; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(34,34,34,.2); }

  .pnf-bs {
    background: transparent; color: #222; border: 1px solid #D4D4D0;
    padding: 13px 28px; border-radius: 100px; font-family: 'Sora', sans-serif;
    font-size: 14px; font-weight: 500; cursor: pointer; display: inline-flex;
    align-items: center; gap: 8px; transition: all .25s; text-decoration: none;
  }
  .pnf-bs:hover { border-color: #7A8C7B; color: #7A8C7B; transform: translateY(-1px); }
`;

export default function NotFound() {
    return (
        <>
            <style>{CSS}</style>

            <div style={{
                minHeight: "100vh", background: "#FAFAF7",
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                padding: "40px 24px", textAlign: "center",
            }}>

                {/* Large 404 */}
                <div className="pnf-404" style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: "clamp(100px, 20vw, 180px)",
                    fontWeight: 300, fontStyle: "italic",
                    color: "#F0F0EC", lineHeight: 1,
                    letterSpacing: "-.04em", userSelect: "none",
                    marginBottom: 8,
                }}>
                    404
                </div>

                {/* Title */}
                <h1 className="pnf-title" style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: "clamp(28px, 4vw, 48px)",
                    fontWeight: 600, color: "#1A1A1A",
                    letterSpacing: "-.03em", lineHeight: 1.1,
                    marginBottom: 16,
                }}>
                    Page Not Found
                </h1>

                {/* Divider accent */}
                <div style={{
                    width: 40, height: 2,
                    background: "#7A8C7B", borderRadius: 1,
                    margin: "0 auto 24px",
                }} />

                {/* Description */}
                <p className="pnf-desc" style={{
                    fontFamily: "'Sora', system-ui, sans-serif",
                    fontSize: 15, fontWeight: 300,
                    color: "#707070", lineHeight: 1.75,
                    maxWidth: 380, marginBottom: 40,
                }}>
                    The page you're looking for doesn't exist or has been moved. Let's get you back on track.
                </p>

                {/* Actions */}
                <div className="pnf-actions" style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
                    <a href="/" className="pnf-bp">
                        Back to Home <ArrowRight size={15} />
                    </a>
                    <a href="#contact" className="pnf-bs">
                        Contact Me
                    </a>
                </div>

                {/* Footer signature */}
                <div style={{
                    position: "absolute", bottom: 32,
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: 16, fontWeight: 600,
                    color: "#D4D4D0", letterSpacing: "-.01em",
                    userSelect: "none",
                }}>
                    Leonard Samuel
                </div>

            </div>
        </>
    );
}