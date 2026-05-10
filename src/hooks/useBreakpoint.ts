import { useState, useEffect } from "react";

export function useBreakpoint() {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  useEffect(() => {
    const h = () => setWidth(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);

  return {
    isMobile: width < 640,   // phones
    isTablet: width < 1024,  // tablets and below (includes mobile)
    width,
  };
}
