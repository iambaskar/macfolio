import { useState } from "react";
import { useDrag } from "../../hooks";
import TrafficLights from "../shared/TrafficLights";
import trashIcon from "../../assets/Trash_Full_29942.webp";

const TRASH_ITEMS = [
  { name: "legacy_v1_code.zip", icon: "📦" },
  { name: "scrapped_logo.png", icon: "🖼️" },
  { name: "bug_report_2023.txt", icon: "📄" },
  { name: "unused_modals.jsx", icon: "⚛️" },
];

export default function TrashWidget({ onClose, zIndex, onFocus }) {
  const [pos, setPos] = useState({ x: 740, y: 400 });
  const { onMouseDown: onMD, onTouchStart: onTS } = useDrag(pos, setPos, onFocus);

  return (
    <div onMouseDown={onFocus} style={{ position: "absolute", left: pos.x, top: pos.y, width: 280, zIndex, borderRadius: 14, background: "rgba(28,28,34,0.92)", backdropFilter: "blur(20px)", boxShadow: "0 16px 40px rgba(0,0,0,0.6)", padding: "10px 14px 18px", animation: "winPop .3s ease", border: "0.5px solid rgba(255,255,255,0.1)" }}>
      <div onMouseDown={onMD} onTouchStart={onTS} style={{ height: 28, display: "flex", alignItems: "center", marginBottom: 10, cursor: "move" }}>
        <TrafficLights onClose={onClose} />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, opacity: 0.8, marginBottom: 15 }}>
        <img src={trashIcon} style={{ width: 28 }} />
        <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>Trash</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {TRASH_ITEMS.map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", background: "rgba(255,255,255,0.05)", borderRadius: 8 }}>
            <span style={{ fontSize: 18 }}>{item.icon}</span>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
