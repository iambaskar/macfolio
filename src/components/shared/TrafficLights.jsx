import { useState } from "react";

export default function TrafficLights({ onClose, onMinimize = () => {}, onMaximize = () => {} }) {
  const [hov, setHov] = useState(false);
  return (
    <div style={{ display: "flex", gap: 8, flexShrink: 0 }} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      {[["#FF5F57", "×", onClose], ["#FEBC2E", "−", onMinimize], ["#28C840", "+", onMaximize]].map(([c, sym, fn], i) => (
        <div key={i} onClick={(e) => { e.stopPropagation(); fn(); }}
          style={{ width: 13, height: 13, borderRadius: "50%", background: c, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 9, color: "rgba(0,0,0,0.6)", fontWeight: 700, transition: "background .15s" }}>
          {hov && sym}
        </div>
      ))}
    </div>
  );
}
