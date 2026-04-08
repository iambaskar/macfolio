import { useState, useRef } from "react";
import { useDrag } from "../../hooks";

export default function DeskCard({ card, zIndex, onFocus }) {
  const [pos, setPos] = useState({ x: card.x, y: card.y });
  const [hov, setHov] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const dragHandlers = useDrag(pos, setPos, onFocus);
  const lastTap = useRef(0);

  const onMD = (e) => { e.stopPropagation(); dragHandlers.onMouseDown(e); };
  const onTS = (e) => { e.stopPropagation(); dragHandlers.onTouchStart(e); };

  const onTouchEnd = (e) => {
    const now = Date.now();
    if (now - lastTap.current < 300) {
      e.preventDefault();
      if (card.onOpen) card.onOpen();
      else setFlipped(f => !f);
    }
    lastTap.current = now;
  };

  const isProj = card.type === "project";
  const isExp = card.type === "experience";
  const isAwd = card.type === "award";

  return (
    <div onMouseDown={onMD} onTouchStart={onTS} onTouchEnd={onTouchEnd}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      onDoubleClick={(e) => { e.stopPropagation(); card.onOpen ? card.onOpen() : setFlipped(!flipped); }}
      style={{
        position: "absolute", left: pos.x, top: pos.y, width: card.w, zIndex,
        background: card.bg, borderRadius: 18, border: `1px solid ${card.accent}30`, backdropFilter: "blur(12px)",
        cursor: "grab", transition: "box-shadow .4s, transform .4s",
        boxShadow: hov ? `0 24px 60px rgba(0,0,0,0.55), 0 0 0 1px ${card.accent}50` : `0 12px 36px rgba(0,0,0,0.4)`,
        transform: hov && !flipped ? "translateY(-4px) scale(1.025)" : "scale(1)",
        perspective: 1000
      }}>
      <div style={{ transformStyle: "preserve-3d", transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)", transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)", width: "100%", height: "100%", borderRadius: 18, position: "relative" }}>
        {/* FRONT */}
        <div style={{ backfaceVisibility: "hidden", borderRadius: 18, overflow: "hidden" }}>
          <div style={{ padding: "14px 14px 10px", background: "rgba(0,0,0,0.25)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
              <div>
                {card.year && <div style={{ fontSize: 9, fontWeight: 600, color: card.accent, textTransform: "uppercase" }}>{card.year}</div>}
                <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{card.label}</div>
              </div>
              {card.icon && <span style={{ fontSize: 20 }}>{card.icon}</span>}
              {isExp && <div style={{ width: 32, height: 32, borderRadius: 8, background: card.accent + "33", display: "flex", alignItems: "center", justifyContent: "center", color: card.accent, fontWeight: 800 }}>{card.logo}</div>}
            </div>
          </div>
          <div style={{ padding: "10px 14px 14px" }}>
            {isProj && <p style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>{card.desc}</p>}
            {isExp && <div style={{ fontSize: 11, color: "#fff", opacity: 0.7 }}>{card.role}</div>}
            {isAwd && <div style={{ fontSize: 11, color: card.accent, fontWeight: 600 }}>{card.sub}</div>}
          </div>
        </div>
        {/* BACK */}
        <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", transform: "rotateY(180deg)", borderRadius: 18, background: card.bg, padding: 16, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", border: `1px solid ${card.accent}40` }}>
          <span style={{ fontSize: 32, marginBottom: 12 }}>{card.icon || "📂"}</span>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", textAlign: "center" }}>Double-click to flip back. Active macOS widgets are playful!</div>
        </div>
      </div>
    </div>
  );
}
