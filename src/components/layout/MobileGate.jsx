import { useState, useEffect } from "react";

export default function MobileGate({ children }) {
  const [screen, setScreen] = useState({ w: window.innerWidth, h: window.innerHeight });
  useEffect(() => {
    const fn = () => setScreen({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  const isLandscape = screen.w > screen.h;
  if (screen.w < 768 && !isLandscape) {
    return (
      <div style={{ width: "100vw", height: "100vh", background: "linear-gradient(160deg,#0d1117,#1a1a2e)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "'Outfit','Inter',sans-serif", color: "#fff", padding: 30, textAlign: "center" }}>
        <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 10 }}>Best on a larger screen</div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: 30 }}>This macOS-style portfolio is designed for desktop.<br />Rotate your device or open it on a tablet / laptop.</div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 14, padding: "12px 20px", fontSize: 13, color: "rgba(255,255,255,0.7)" }}>
          Rotate to landscape to preview
        </div>
         <div style={{ marginBlock: "10px"}}>
          or
        </div>
         <div style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 14, padding: "12px 20px", fontSize: 13, color: "rgba(255,255,255,0.7)" }}>
          Open site as Desktop Mode in your browser
        </div>
        <style>{`@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>
      </div>
    );
  }
  return children;
}
