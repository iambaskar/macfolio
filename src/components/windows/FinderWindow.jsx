import { useState } from "react";
import { useDrag, useResize } from "../../hooks";
import TrafficLights from "../shared/TrafficLights";
import ResizeHandles from "../shared/ResizeHandles";

const APPS = [
  { id: "mail", name: "Mail", icon: "✉️" },
  { id: "notes", name: "Notes", icon: "📝" },
  { id: "photos", name: "Photos", icon: "📸" },
  { id: "music", name: "Music", icon: "🎵" },
  { id: "trash", name: "Trash", icon: "🗑️" },
  { id: "aboutme", name: "About Me", icon: "👋" },
];

const NAV_ITEMS = [
  { id: "recents", label: "Recents" },
  { id: "applications", label: "Applications" },
  { id: "downloads", label: "Downloads" },
];

export default function FinderWindow({ onClose, zIndex, onFocus, recentItems, actions }) {
  const [pos, setPos] = useState({ x: 260, y: 46 });
  const [size, setSize] = useState({ w: 780, h: 484 });
  const [section, setSection] = useState("recents");
  const { onMouseDown: onMD, onTouchStart: onTS } = useDrag(pos, setPos, onFocus);
  const handle = useResize(size, setSize, pos, setPos, 400, 300);

  return (
    <div onMouseDown={onFocus} style={{ position: "absolute", left: pos.x, top: pos.y, width: size.w, height: size.h, zIndex, borderRadius: 12, overflow: "hidden", boxShadow: "0 32px 80px rgba(0,0,0,0.6)", animation: "winPop .3s ease", border: "1px solid rgba(255,255,255,0.1)", display: "flex", flexDirection: "column" }}>
      <div onMouseDown={onMD} onTouchStart={onTS} style={{ background: "rgba(38,38,42,0.98)", backdropFilter: "blur(24px)", height: 44, flexShrink: 0, display: "flex", alignItems: "center", padding: "0 16px", cursor: "move", borderBottom: "0.5px solid rgba(255,255,255,0.1)" }}>
        <TrafficLights onClose={onClose} />
        <div style={{ flex: 1, textAlign: "center", fontSize: 13, fontWeight: 700, color: "#fff", opacity: 0.8 }}>Finder — {section.charAt(0).toUpperCase() + section.slice(1)}</div>
      </div>
      <div style={{ display: "flex", flex: 1, background: "rgba(28,28,32,0.98)", overflow: "hidden" }}>
        <div style={{ width: 180, background: "rgba(22,22,26,0.9)", borderRight: "0.5px solid rgba(255,255,255,0.05)", padding: "12px 0" }}>
          {NAV_ITEMS.map(n => (
            <div key={n.id} onClick={() => setSection(n.id)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 16px", cursor: "pointer", background: section === n.id ? "rgba(94,155,240,0.2)" : "transparent" }}>
              <span style={{ fontSize: 12, color: section === n.id ? "#5E9BF0" : "#999" }}>{n.label}</span>
            </div>
          ))}
        </div>
        <div style={{ flex: 1, padding: 25, overflowY: "auto" }}>
          {section === "recents" && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
              {recentItems.map((item, i) => (
                <div key={i} onClick={() => { if (actions[item.type]) actions[item.type](); }}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, cursor: "pointer", transition: "transform .2s" }}
                  onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
                  <div style={{ width: 70, height: 80, background: "rgba(255,255,255,0.05)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, border: "1px solid rgba(255,255,255,0.08)" }}>{item.icon}</div>
                  <span style={{ fontSize: 11, color: "#fff", textAlign: "center", opacity: 0.8, maxWidth: 80, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.name}</span>
                </div>
              ))}
              {recentItems.length === 0 && <div style={{ gridColumn: "1/5", textAlign: "center", opacity: 0.2, marginTop: 100 }}>No recent activity</div>}
            </div>
          )}
          {section === "applications" && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
              {APPS.map(app => (
                <div key={app.id} onClick={() => actions[app.id]()}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, cursor: "pointer", transition: "transform .2s" }}
                  onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
                  <div style={{ width: 70, height: 80, background: "rgba(255,255,255,0.05)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, border: "1px solid rgba(255,255,255,0.08)" }}>{app.icon}</div>
                  <span style={{ fontSize: 11, color: "#fff", textAlign: "center", opacity: 0.8 }}>{app.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <ResizeHandles handle={handle} />
    </div>
  );
}
