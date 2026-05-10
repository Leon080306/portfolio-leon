const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300&family=Sora:wght@400&display=swap');

  @keyframes ls-fade-up {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes ls-spin {
    to { transform: rotate(360deg); }
  }

  .ls-initials { opacity: 0; animation: ls-fade-up .7s cubic-bezier(.16,1,.3,1) .1s  forwards; }
  .ls-name     { opacity: 0; animation: ls-fade-up .7s cubic-bezier(.16,1,.3,1) .35s forwards; }
  .ls-tagline  { opacity: 0; animation: ls-fade-up .7s cubic-bezier(.16,1,.3,1) .55s forwards; }
  .ls-spinner  { opacity: 0; animation: ls-fade-up .5s cubic-bezier(.16,1,.3,1) .7s  forwards; }

  .ls-spinner-ring {
    animation: ls-spin 1s linear infinite;
    transform-origin: center;
  }
`;

export default function LoadingScreen() {
    return (
        <>
            <style>{CSS}</style>

            <div style={{
                position: "fixed", inset: 0, zIndex: 9999,
                background: "#FAFAF7",
                display: "flex", alignItems: "center", justifyContent: "center",
            }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

                    {/* Italic initials */}
                    <div className="ls-initials" style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontSize: 72, fontWeight: 300, fontStyle: "italic",
                        color: "#7A8C7B", lineHeight: 1, letterSpacing: "-.04em",
                        marginBottom: 20, userSelect: "none",
                    }}>
                        LS
                    </div>

                    {/* Full name */}
                    <div className="ls-name" style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontSize: 28, fontWeight: 600,
                        color: "#1A1A1A", letterSpacing: "-.02em",
                        marginBottom: 10, userSelect: "none",
                    }}>
                        Leonard Samuel
                    </div>

                    {/* Tagline */}
                    <div className="ls-tagline" style={{
                        fontFamily: "'Sora', system-ui, sans-serif",
                        fontSize: 11, fontWeight: 400,
                        color: "#A0A09C", letterSpacing: ".12em", textTransform: "uppercase",
                        marginBottom: 36, userSelect: "none",
                    }}>
                        Software Engineer · EdTech Builder
                    </div>

                    {/* Spinner */}
                    <div className="ls-spinner">
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                            {/* Track */}
                            <circle cx="14" cy="14" r="11" stroke="#E8E8E4" strokeWidth="2" />
                            {/* Arc */}
                            <circle
                                className="ls-spinner-ring"
                                cx="14" cy="14" r="11"
                                stroke="#7A8C7B" strokeWidth="2"
                                strokeLinecap="round"
                                strokeDasharray="18 52"
                            />
                        </svg>
                    </div>

                </div>
            </div>
        </>
    );
}