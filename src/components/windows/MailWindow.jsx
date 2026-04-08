import { useState } from "react";
import emailjs from "@emailjs/browser";
import { useDrag, useResize } from "../../hooks";
import TrafficLights from "../shared/TrafficLights";
import ResizeHandles from "../shared/ResizeHandles";

export default function MailWindow({ onClose, zIndex, onFocus }) {
  const [pos, setPos] = useState({ x: 300, y: 100 });
  const [size, setSize] = useState({ w: 560, h: 420 });
  const [fromName, setFromName] = useState("");
  const [fromEmail, setFromEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle");
  const { onMouseDown: onMD, onTouchStart: onTS } = useDrag(pos, setPos, onFocus);
  const handle = useResize(size, setSize, pos, setPos, 360, 300);

  const handleSend = () => {
    if (!fromName.trim() || !fromEmail.trim() || !message.trim()) return alert("Please fill in your name, email, and message.");
    setStatus("sending");
    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      { from_name: fromName, from_email: fromEmail, subject, message },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    ).then(() => { setStatus("sent"); setTimeout(() => onClose(), 1800); })
      .catch((err) => { console.error("EmailJS error:", err); setStatus("idle"); alert("Failed to send: " + (err?.text || err?.message || JSON.stringify(err))); });
  };

  return (
    <div onMouseDown={onFocus} style={{ position: "absolute", left: pos.x, top: pos.y, width: size.w, zIndex, borderRadius: 12, overflow: "hidden", background: "#fff", boxShadow: "0 32px 80px rgba(0,0,0,0.5)", animation: "winPop .3s ease", border: "1px solid rgba(0,0,0,0.1)" }}>
      <div onMouseDown={onMD} onTouchStart={onTS} style={{ height: 40, background: "#f6f6f6", display: "flex", alignItems: "center", padding: "0 15px", borderBottom: "1px solid #ddd", cursor: "move", gap: 12 }}>
        <TrafficLights onClose={onClose} />
        <span style={{ fontSize: 13, fontWeight: 700, color: "#444", flex: 1, textAlign: "center" }}>New Message</span>
        <button onClick={handleSend} disabled={status !== "idle"}
          style={{ background: status === "sent" ? "#28C840" : "#007AFF", border: "none", color: "#fff", padding: "4px 16px", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer", transition: "all 0.3s" }}>
          {status === "idle" && "Send"}{status === "sending" && "Sending..."}{status === "sent" && "✓ Sent"}
        </button>
      </div>
      {status === "sent" ? (
        <div style={{ height: 350, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#333", gap: 15, animation: "winPop 0.4s ease" }}>
          <div style={{ fontSize: 50 }}>✉️</div>
          <div style={{ fontSize: 18, fontWeight: 700 }}>Message Sent!</div>
          <p style={{ opacity: 0.6, fontSize: 13 }}>Thanks for reaching out, Baskar will get back to you soon.</p>
        </div>
      ) : (
        <div style={{ padding: 15, opacity: status === "sending" ? 0.5 : 1, transition: "opacity 0.3s" }}>
          <div style={{ borderBottom: "1px solid #eee", padding: "8px 0", fontSize: 14, display: "flex" }}>
            <span style={{ color: "#999", width: 60 }}>To:</span>
            <span style={{ color: "#007AFF", fontWeight: 500 }}>Baskar (ponbaskar397@gmail.com)</span>
          </div>
          {[["Name:", fromName, setFromName, "text", "Your name"], ["From:", fromEmail, setFromEmail, "email", "your@email.com"], ["Sub:", subject, setSubject, "text", "Project Inquiry / Hello!"]].map(([label, val, setter, type, ph]) => (
            <div key={label} style={{ borderBottom: "1px solid #eee", padding: "8px 0", fontSize: 14, display: "flex" }}>
              <span style={{ color: "#999", width: 60 }}>{label}</span>
              <input type={type} value={val} onChange={e => setter(e.target.value)} onMouseDown={e => e.stopPropagation()} placeholder={ph} style={{ border: "none", outline: "none", color: "#333", width: "80%", background: "transparent" }} />
            </div>
          ))}
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} onMouseDown={e => e.stopPropagation()}
            style={{ width: "100%", height: 260, marginTop: 15, border: "none", outline: "none", resize: "none", fontSize: 14, fontFamily: "inherit", color: "#333" }}
            placeholder="Hey Baskar, love your new macOS portfolio interface! Let's chat about a collaboration..." />
        </div>
      )}
      <ResizeHandles handle={handle} />
    </div>
  );
}
