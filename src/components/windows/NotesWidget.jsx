import { useState } from "react";
import { useDrag, useResize } from "../../hooks";
import TrafficLights from "../shared/TrafficLights";
import ResizeHandles from "../shared/ResizeHandles";

export default function NotesWidget({ onClose, zIndex, onFocus, addRecent }) {
  const [pos, setPos] = useState({ x: 360, y: 120 });
  const [size, setSize] = useState({ w: 540, h: 380 });
  const [notes, setNotes] = useState([
    { id: 1, title: "Skills & Notes", text: "- React / Next.js\n- Golang / Python\n- Node.js / SQL\n- AWS / Docker\n\nIdeas:\n- Build a macOS theme\n- Add playful widgets!" },
    { id: 2, title: "Todo List", text: "- Refactor components\n- Update portfolio images\n- Implement dark mode toggle" }
  ]);
  const [activeId, setActiveId] = useState(1);
  const { onMouseDown: onMD, onTouchStart: onTS } = useDrag(pos, setPos, onFocus);
  const handle = useResize(size, setSize, pos, setPos, 320, 250);

  const activeNote = notes.find(n => n.id === activeId) || notes[0];
  const addNote = () => { const n = { id: Date.now(), title: "New Note", text: "" }; setNotes([n, ...notes]); setActiveId(n.id); };
  const deleteNote = (id) => { const r = notes.filter(n => n.id !== id); setNotes(r); if (activeId === id && r.length > 0) setActiveId(r[0].id); };
  const updateNote = (id, text) => setNotes(notes.map(n => n.id === id ? { ...n, text, title: text.split("\n")[0] || "New Note" } : n));

  return (
    <div onMouseDown={onFocus} style={{ position: "absolute", left: pos.x, top: pos.y, width: size.w, height: size.h, zIndex, borderRadius: 14, overflow: "hidden", background: "#FFF9C4", color: "#1a1a1a", boxShadow: "0 24px 60px rgba(0,0,0,0.4)", display: "flex", animation: "winPop .3s ease" }}>
      <div style={{ width: 180, background: "rgba(0,0,0,0.05)", borderRight: "1px solid rgba(0,0,0,0.05)", display: "flex", flexDirection: "column" }}>
        <div onMouseDown={onMD} onTouchStart={onTS} style={{ padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "move" }}>
          <TrafficLights onClose={onClose} />
          <button onClick={(e) => { e.stopPropagation(); addNote(); }} style={{ background: "transparent", border: "none", width: 20, height: 20, cursor: "pointer", opacity: 0.6, display: "flex", alignItems: "center", justifyContent: "center", color: "#1a1a1a" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: "100%", height: "100%" }}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
          </button>
        </div>
        <div style={{ flex: 1, overflowY: "auto" }}>
          {notes.map(n => (
            <div key={n.id} onClick={() => { setActiveId(n.id); addRecent({ name: n.title, icon: "📝", type: "notes" }); }}
              style={{ padding: "10px 14px", cursor: "pointer", background: activeId === n.id ? "rgba(0,0,0,0.1)" : "transparent", borderBottom: "0.5px solid rgba(0,0,0,0.05)" }}>
              <div style={{ fontSize: 13, fontWeight: 800, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{n.title || "Untitled"}</div>
              <div style={{ fontSize: 11, opacity: 0.5, marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{n.text.split("\n")[1] || "No body text"}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "10px 18px" }}>
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 5 }}>
          <button onClick={() => deleteNote(activeId)} style={{ background: "transparent", border: "none", width: 18, height: 18, cursor: "pointer", opacity: 0.5, display: "flex", alignItems: "center", justifyContent: "center", color: "#1a1a1a" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: "100%", height: "100%" }}><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /></svg>
          </button>
        </div>
        {!activeNote ? (
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, opacity: 0.3 }}>No Note Selected</div>
        ) : (
          <textarea value={activeNote.text} onChange={(e) => updateNote(activeId, e.target.value)} onMouseDown={e => e.stopPropagation()}
            placeholder="Type your note here..."
            style={{ width: "100%", flex: 1, background: "transparent", border: "none", outline: "none", fontSize: 14, fontWeight: 600, color: "#1a1a1a", lineHeight: 1.6, resize: "none", fontFamily: "inherit" }} />
        )}
      </div>
      <ResizeHandles handle={handle} />
    </div>
  );
}
