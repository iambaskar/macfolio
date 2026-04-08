import { useState } from "react";
import { useDrag } from "../../hooks";
import TrafficLights from "../shared/TrafficLights";

export function AwardWindow({ onClose, zIndex, onFocus }) {
  const [pos, setPos] = useState({ x: 320, y: 120 });
  const { onMouseDown: onMD, onTouchStart: onTS } = useDrag(pos, setPos, onFocus);

  return (
    <div onMouseDown={onFocus} style={{ position: "absolute", left: pos.x, top: pos.y, width: 520, zIndex, borderRadius: 18, overflow: "hidden", background: "rgba(10,15,30,0.95)", backdropFilter: "blur(40px)", color: "#fff", boxShadow: "0 40px 100px rgba(0,0,0,0.7)", animation: "winPop .4s ease", border: "1px solid rgba(255,255,255,0.1)" }}>
      <div onMouseDown={onMD} onTouchStart={onTS} style={{ height: 40, display: "flex", alignItems: "center", padding: "0 15px", cursor: "move", background: "rgba(0,0,0,0.2)" }}>
        <TrafficLights onClose={onClose} />
        <span style={{ flex: 1, textAlign: "center", fontSize: 13, fontWeight: 700, opacity: 0.7 }}>Awwwards Recognition</span>
      </div>
      <div style={{ padding: 40, textAlign: "center" }}>
        <div style={{ marginBottom: 30, fontSize: 12, fontWeight: 800, color: "#5ECFCF", textTransform: "uppercase", letterSpacing: 2 }}>Certificate of Excellence</div>
        <div style={{ width: "100%", aspectRatio: "1.6", background: "linear-gradient(135deg, rgba(94,207,207,0.1), rgba(0,0,0,0.4))", borderRadius: 12, border: "2px dashed rgba(94,207,207,0.3)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", marginBottom: 30 }}>
          <div style={{ position: "absolute", inset: 0, opacity: 0.1, background: "radial-gradient(circle at 50% 50%, #5ECFCF, transparent)" }} />
          <div style={{ textAlign: "center", zIndex: 1 }}>
            <div style={{ fontSize: 48, marginBottom: 15 }}>🏆</div>
            <div style={{ fontSize: 13, fontWeight: 700, opacity: 0.5 }}>Insert Award Photo Here</div>
          </div>
        </div>
        <h2 style={{ fontSize: 24, fontWeight: 800, color: "#fff", marginBottom: 12 }}>Honorable Mention</h2>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.6, maxWidth: 460, margin: "0 auto" }}>This award recognizes your exceptional talent and dedication to pushing the boundaries of web design and digital innovation. Stay Alien.</p>
        <div style={{ marginTop: 40, paddingTop: 30, borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "center", gap: 50 }}>
          {[["Award Date", "May 2024"], ["Category", "Creative Portfolio"]].map(([label, val]) => (
            <div key={label}>
              <div style={{ fontSize: 10, opacity: 0.4, textTransform: "uppercase", fontWeight: 700, marginBottom: 5 }}>{label}</div>
              <div style={{ fontSize: 13, fontWeight: 700 }}>{val}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ExperienceWidget({ onClose, zIndex, onFocus }) {
  const [pos, setPos] = useState({ x: 870, y: 50 });
  const { onMouseDown: onMD, onTouchStart: onTS } = useDrag(pos, setPos, onFocus);

  const EXPERIENCES = [
    { company: "Corent Technology", role: "Software Engineer", date: "May 2025 - Present", desc: "React/Redux Toolkit, Material UI", accent: "#fff" },
    { company: "Stacia Corp", role: "Frontend Developer", date: "Apr 2023 - Apr 2025", desc: "React/React Native, Micro frontend", accent: "#635BFF" },
  ];

  return (
    <div onMouseDown={onFocus} style={{ position: "absolute", left: pos.x, top: pos.y, width: 320, zIndex, borderRadius: 18, background: "rgba(20,20,28,0.92)", backdropFilter: "blur(24px)", boxShadow: "0 24px 60px rgba(0,0,0,0.6)", padding: "10px 14px 18px", border: "0.5px solid rgba(255,255,255,0.1)", animation: "winPop .3s ease" }}>
      <div onMouseDown={onMD} onTouchStart={onTS} style={{ height: 28, display: "flex", alignItems: "center", marginBottom: 12, cursor: "move" }}>
        <TrafficLights onClose={onClose} />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, paddingBottom: 15, borderBottom: "0.5px solid rgba(255,255,255,0.08)", marginBottom: 15 }}>
        <div style={{ padding: 6, borderRadius: 8, background: "rgba(0,122,255,0.2)", fontSize: 18 }}>💼</div>
        <span style={{ fontSize: 13, fontWeight: 700, color: "#fff", opacity: 0.9 }}>PROFESSIONAL TIMELINE</span>
      </div>
      <div style={{ position: "relative", paddingLeft: 20 }}>
        <div style={{ position: "absolute", left: 0, top: 5, bottom: 5, width: 2, background: "linear-gradient(180deg, #007AFF 0%, rgba(255,255,255,0.05) 100%)", borderRadius: 1 }} />
        {EXPERIENCES.map((exp, i) => (
          <div key={i} style={{ position: "relative", marginBottom: 25 }}>
            <div style={{ position: "absolute", left: -24, top: 4, width: 10, height: 10, borderRadius: "50%", background: exp.accent, border: "2px solid rgba(20,20,28,1)", boxShadow: `0 0 10px ${exp.accent}55` }} />
            <div style={{ fontSize: 12, fontWeight: 800, color: exp.accent, marginBottom: 2 }}>{exp.company}</div>
            <div style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.5)", marginBottom: 4 }}>{exp.date}</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#fff", opacity: 0.8 }}>{exp.role}</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{exp.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
