import { useState } from "react";
import { useDrag, useResize } from "../../hooks";
import TrafficLights from "../shared/TrafficLights";
import ResizeHandles from "../shared/ResizeHandles";
import img31855 from "../../assets/31855.jpg";
import img32106 from "../../assets/32106.jpg";
import img32529 from "../../assets/32529.jpg";
import img43543 from "../../assets/43543.jpg";
import img43547 from "../../assets/43547.jpg";
import img43548 from "../../assets/43548.jpg";
import img43549 from "../../assets/43549.jpg";
import img48413 from "../../assets/48413.jpg";

const PHOTOS = [
  { id: 1, src: img31855, label: "Shot on Pixel" },
  { id: 2, src: img32106, label: "Shot on Pixel" },
  { id: 3, src: img32529, label: "Shot on Pixel" },
  { id: 4, src: img43543, label: "Shot on Pixel" },
  { id: 5, src: img43547, label: "Shot on Pixel" },
  { id: 6, src: img43548, label: "Shot on Pixel" },
  { id: 7, src: img43549, label: "Shot on Pixel" },
  { id: 8, src: img48413, label: "Shot on Pixel" },
];

export default function PhotosWidget({ onClose, zIndex, onFocus, addRecent }) {
  const [pos, setPos] = useState({ x: 600, y: 200 });
  const [size, setSize] = useState({ w: 540, h: 440 });
  const [viewing, setViewing] = useState(null);
  const { onMouseDown: onMD, onTouchStart: onTS } = useDrag(pos, setPos, onFocus);
  const handle = useResize(size, setSize, pos, setPos, 320, 280);

  return (
    <div onMouseDown={onFocus} style={{ position: "absolute", left: pos.x, top: pos.y, width: size.w, height: size.h, zIndex, borderRadius: 16, background: "rgba(24,24,30,0.95)", backdropFilter: "blur(24px)", border: "0.5px solid rgba(255,255,255,0.1)", boxShadow: "0 24px 60px rgba(0,0,0,0.7)", animation: "winPop .3s ease", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <div onMouseDown={onMD} onTouchStart={onTS} style={{ height: 40, display: "flex", alignItems: "center", padding: "0 14px", borderBottom: "0.5px solid rgba(255,255,255,0.1)", cursor: "move" }}>
        <TrafficLights onClose={onClose} />
        <div style={{ flex: 1, textAlign: "center", fontSize: 13, fontWeight: 700, color: "#fff", opacity: 0.8 }}>Photos</div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: 15 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 10 }}>
          {PHOTOS.map((p) => (
            <div key={p.id} onClick={() => { setViewing(p); addRecent({ name: p.label, icon: "📸", type: "photo" }); }}
              style={{ aspectRatio: "1.2", borderRadius: 10, cursor: "pointer", transition: "transform .2s", border: "1px solid rgba(255,255,255,0.1)", overflow: "hidden" }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
              <img src={p.src} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          ))}
        </div>
      </div>
      {viewing && (
        <div onClick={() => setViewing(null)} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(15px)", display: "flex", alignItems: "center", justifyContent: "center", animation: "winPop .2s ease", zIndex: 10, padding: 20 }}>
          <div style={{ width: "100%", height: "100%", position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <img src={viewing.src} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", borderRadius: 12, boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }} />
            <div style={{ position: "absolute", bottom: 10, textAlign: "center", fontSize: 13, fontWeight: 700, color: "#fff", background: "rgba(0,0,0,0.4)", padding: "4px 12px", borderRadius: 20 }}>{viewing.label}</div>
            <div style={{ position: "absolute", top: 0, right: 0, fontSize: 18, cursor: "pointer", color: "#fff", background: "rgba(0,0,0,0.4)", width: 34, height: 34, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</div>
          </div>
        </div>
      )}
      <ResizeHandles handle={handle} />
    </div>
  );
}
