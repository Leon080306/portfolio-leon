import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

// ─── Global styles ────────────────────────────────────────────────────────────
// Only repetitive utility classes + pseudo-selectors live here.
// One-off styles are inline style={{}} on each element.
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=Sora:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    background: #FAFAF7;
    color: #1A1A1A;
    font-family: 'Sora', system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: #FAFAF7; }
  ::-webkit-scrollbar-thumb { background: #D4D4D0; border-radius: 3px; }

  /* Display font — used on every heading */
  .df { font-family: 'Cormorant Garamond', Georgia, serif; }

  /* Scroll reveal — applied to nearly every element */
  .reveal {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity .85s cubic-bezier(.16,1,.3,1),
                transform  .85s cubic-bezier(.16,1,.3,1);
  }
  .reveal.vis { opacity: 1; transform: translateY(0); }
  .d1 { transition-delay: .1s; }
  .d2 { transition-delay: .2s; }
  .d3 { transition-delay: .3s; }
  .d4 { transition-delay: .4s; }

  /* Nav links — needs ::after underline pseudo */
  .nl {
    color: #707070; text-decoration: none; font-size: 13.5px;
    font-weight: 400; position: relative; transition: color .2s;
  }
  .nl::after {
    content: ''; position: absolute; bottom: -3px; left: 0;
    width: 0; height: 1px; background: #7A8C7B; transition: width .3s;
  }
  .nl:hover { color: #1A1A1A; }
  .nl:hover::after { width: 100%; }

  /* Buttons — need :hover with transform */
  .bp {
    background: #222; color: #FAFAF7; border: none; padding: 13px 28px;
    border-radius: 100px; font-family: 'Sora', sans-serif; font-size: 14px;
    font-weight: 500; cursor: pointer; display: inline-flex;
    align-items: center; gap: 8px; transition: all .25s; text-decoration: none;
  }
  .bp:hover { background: #3A3A3A; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(34,34,34,.2); }

  .bs {
    background: transparent; color: #222; border: 1px solid #D4D4D0;
    padding: 13px 28px; border-radius: 100px; font-family: 'Sora', sans-serif;
    font-size: 14px; font-weight: 500; cursor: pointer; display: inline-flex;
    align-items: center; gap: 8px; transition: all .25s; text-decoration: none;
  }
  .bs:hover { border-color: #7A8C7B; color: #7A8C7B; transform: translateY(-1px); }

  /* Chips — reused across every section */
  .chip { display: inline-flex; align-items: center; gap: 5px; background: #F0F0EC; color: #707070; font-size: 12px; font-weight: 500; padding: 5px 13px; border-radius: 100px; }
  .ach  { display: inline-flex; align-items: center; gap: 5px; background: rgba(122,140,123,.1); color: #7A8C7B; font-size: 12px; font-weight: 500; padding: 5px 13px; border-radius: 100px; }

  /* Mockup card */
  .mc { border-radius: 18px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,.1), 0 4px 14px rgba(0,0,0,.06); transition: box-shadow .35s; }
  .mc:hover { box-shadow: 0 28px 80px rgba(0,0,0,.14), 0 8px 24px rgba(0,0,0,.08); }

  /* Feature card */
  .fc { background: white; border: 1px solid #EDEDEA; border-radius: 18px; padding: 24px; transition: all .3s; }
  .fc:hover { transform: translateY(-5px); box-shadow: 0 12px 40px rgba(0,0,0,.08); border-color: #C8D4C9; }

  /* Architecture node */
  .an { background: white; border: 1px solid #E0E0DC; border-radius: 10px; padding: 9px 15px; font-size: 11.5px; font-weight: 500; color: #1A1A1A; display: flex; align-items: center; gap: 7px; box-shadow: 0 2px 8px rgba(0,0,0,.06); transition: all .2s; white-space: nowrap; position: absolute; }
  .an:hover { border-color: #7A8C7B; box-shadow: 0 4px 16px rgba(122,140,123,.15); }

  /* Contact inputs — needs :focus ::placeholder */
  .ci { width: 100%; background: white; border: 1px solid #E0E0DC; border-radius: 12px; padding: 13px 17px; font-family: 'Sora', sans-serif; font-size: 14px; color: #1A1A1A; outline: none; transition: border-color .2s, box-shadow .2s; }
  .ci:focus { border-color: #7A8C7B; box-shadow: 0 0 0 3px rgba(122,140,123,.12); }
  .ci::placeholder { color: #B0B0AA; }

  /* Social buttons */
  .sb { display: flex; align-items: center; justify-content: center; width: 44px; height: 44px; border-radius: 50%; background: rgba(255,255,255,.1); color: #909090; border: none; cursor: pointer; transition: all .2s; text-decoration: none; }
  .sb:hover { background: #7A8C7B; color: #fff; transform: translateY(-2px); }

  /* Footer links */
  .fl { font-size: 13px; color: #555; text-decoration: none; transition: color .2s; }
  .fl:hover { color: #7A8C7B; }

  /* Teaching collage cards */
  .tc { transition: transform .3s, box-shadow .3s; cursor: default; }
  .tc:hover { transform: scale(1.02); box-shadow: 0 16px 48px rgba(0,0,0,.1); }

  @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(.85)} }
  .pulse { animation: pulse 2s infinite; }
`;

export default function Layout() {
  return (
    <>
      <style>{GLOBAL_CSS}</style>
      <Navbar />
      <Outlet />
    </>
  );
}
