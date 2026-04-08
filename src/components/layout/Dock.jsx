import { useState } from "react";

export default function Dock({ items, openStates }) {
  const [dockHov, setDockHov] = useState(null);

  return (
    <div style={{ position: "absolute", bottom: 15, left: "50%", transform: "translateX(-50%)", zIndex: 900 }}>
      <div style={{ display: "flex", gap: 10, padding: "10px 15px", background: "rgba(20,20,30,0.5)", backdropFilter: "blur(30px)", borderRadius: 24, border: "0.5px solid rgba(255,255,255,0.15)", boxShadow: "0 20px 50px rgba(0,0,0,0.5)", alignItems: "flex-end" }}>
        {items.map((app) => (
          <div key={app.id} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div className="dock-icon" onClick={app.action}
              onMouseEnter={() => setDockHov(app.id)} onMouseLeave={() => setDockHov(null)}
              style={{ width: 46, height: 46, borderRadius: 14, background: `linear-gradient(135deg, ${app.color}22, ${app.color}11)`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", border: `0.5px solid ${app.color}33`, position: "relative" }}>
              <img src={app.icon} style={{ width: 34, height: 34 }} />
              {openStates[app.id] && (
                <div style={{ position: "absolute", bottom: -6, width: 4, height: 4, background: "#fff", borderRadius: "50%", opacity: 0.6 }} />
              )}
            </div>
            {dockHov === app.id && (
              <div style={{ position: "absolute", bottom: 85, background: "rgba(20,20,30,0.8)", backdropFilter: "blur(10px)", padding: "5px 12px", borderRadius: 8, fontSize: 12, color: "#fff", border: "0.5px solid rgba(255,255,255,0.1)" }}>{app.label}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
