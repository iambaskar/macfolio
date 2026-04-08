export default function MenuBar({ timeStr, dateStr }) {
  return (
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 30, background: "rgba(20,20,30,0.5)", backdropFilter: "blur(20px)", display: "flex", alignItems: "center", justifyContent: "flex-end", padding: "0 16px", zIndex: 1000, color: "#fff", borderBottom: "0.5px solid rgba(255,255,255,0.1)" }}>
      <div style={{ display: "flex", gap: 15, fontSize: 13, fontWeight: 700 }}>
        <span style={{ opacity: 0.6 }}>🔋</span>
        <span style={{ opacity: 0.6 }}>📶</span>
        <span>{dateStr}</span>
        <span>{timeStr}</span>
      </div>
    </div>
  );
}
