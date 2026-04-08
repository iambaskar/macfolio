import { useState } from "react";
import { useDrag, useResize } from "../../hooks";
import TrafficLights from "../shared/TrafficLights";
import ResizeHandles from "../shared/ResizeHandles";

const MENU_ITEMS = [
  { id: "profile", label: "Profile", icon: "" },
  { id: "experience", label: "Experience", icon: "" },
  { id: "skills", label: "Skills", icon: "" },
  { id: "education", label: "Education", icon: "" },
  { id: "projects", label: "Works", icon: "" },
];

export default function AboutMeWindow({ onClose, zIndex, onFocus }) {
  const [pos, setPos] = useState({ x: 300, y: 80 });
  const [size, setSize] = useState({ w: 720, h: 540 });
  const [activeTab, setActiveTab] = useState("profile");
  const { onMouseDown: onMD, onTouchStart: onTS } = useDrag(pos, setPos, onFocus);
  const handle = useResize(size, setSize, pos, setPos, 400, 350);

  return (
    <div onMouseDown={onFocus} style={{ position: "absolute", left: pos.x, top: pos.y, width: size.w, height: size.h, zIndex, borderRadius: 20, overflow: "hidden", background: "rgba(25, 25, 30, 0.85)", backdropFilter: "blur(40px)", color: "#fff", boxShadow: "0 40px 100px rgba(0,0,0,0.6)", animation: "winPop .4s ease", display: "flex", border: "1px solid rgba(255,255,255,0.1)" }}>
      <div style={{ width: 200, background: "rgba(0, 0, 0, 0.2)", borderRight: "1px solid rgba(255,255,255,0.05)", display: "flex", flexDirection: "column", padding: "20px 0" }}>
        <div onMouseDown={onMD} onTouchStart={onTS} style={{ padding: "0 20px 25px", cursor: "move" }}>
          <TrafficLights onClose={onClose} />
          <div style={{ marginTop: 25, display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: "linear-gradient(135deg, #007AFF, #00C6FF)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>PB</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700 }}>Baskar</div>
              <div style={{ fontSize: 10, opacity: 0.5, fontWeight: 600 }}>Engineer</div>
            </div>
          </div>
        </div>
        <nav style={{ flex: 1, padding: "0 10px" }}>
          {MENU_ITEMS.map(item => (
            <div key={item.id} onClick={() => setActiveTab(item.id)}
              style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 15px", borderRadius: 10, cursor: "pointer", background: activeTab === item.id ? "rgba(255,255,255,0.1)" : "transparent", transition: "all 0.2s ease" }}>
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: activeTab === item.id ? "#fff" : "rgba(255,255,255,0.5)" }}>{item.label}</span>
            </div>
          ))}
        </nav>
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "rgba(0,0,0,0.1)" }}>
        <div onMouseDown={onMD} onTouchStart={onTS} style={{ height: 50, display: "flex", alignItems: "center", padding: "0 25px", cursor: "move", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <span style={{ fontSize: 14, fontWeight: 700, opacity: 0.8 }}>{MENU_ITEMS.find(i => i.id === activeTab).label}</span>
        </div>
        <div style={{ flex: 1, padding: 30, overflowY: "auto" }}>
          {activeTab === "profile" && (
            <div style={{ animation: "winPop 0.3s ease" }}>
              <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, background: "linear-gradient(to right, #fff, #aaa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>PONBASKAR U</h1>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, marginBottom: 25, fontWeight: 500 }}>Fullstack Engineer</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 15, marginBottom: 30 }}>
                {[["Contact", "+91 63745 88616"], ["Email", "ponbaskar397@gmail.com"]].map(([label, val]) => (
                  <div key={label} style={{ background: "rgba(255,255,255,0.05)", padding: 15, borderRadius: 14, border: "1px solid rgba(255,255,255,0.05)" }}>
                    <div style={{ fontSize: 11, opacity: 0.4, fontWeight: 700, textTransform: "uppercase", marginBottom: 5 }}>{label}</div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{val}</div>
                  </div>
                ))}
              </div>
              <div style={{ background: "rgba(0,122,255,0.1)", padding: 20, borderRadius: 16, borderLeft: "4px solid #007AFF" }}>
                <h3 style={{ fontSize: 13, fontWeight: 800, marginBottom: 8, color: "#007AFF" }}>Professional Summary</h3>
                <p style={{ fontSize: 13, lineHeight: 1.6, opacity: 0.8 }}>React / React Native Developer with 3 years of experience building scalable SaaS applications using micro frontend architecture. Strong expertise in Redux Toolkit, API integration, and performance optimization.</p>
              </div>
            </div>
          )}
          {activeTab === "experience" && (
            <div style={{ animation: "winPop 0.3s ease" }}>
              {[
                { co: "Corent Technology", role: "Software Engineer", date: "May 2025 - Present", points: ["Revamped a legacy application by migrating it to React.js and implementing Redux Toolkit for centralized state management.", "Improved application performance by leveraging React performance hooks to minimize unnecessary re-renders.", "Implemented advanced filtering and sorting in data tables and managed API integrations with complex query parameters.", "Designed and implemented interactive workflow diagrams using React Flow to visualize and manage dynamic workflows.", "Developed multiple proof-of-concepts (POCs) to validate product features and architectural approaches."] },
                { co: "Stacia Corp", role: "Frontend Developer", date: "Apr 2023 - Apr 2025", points: ["Integrated front-end components within a microservices architecture, ensuring seamless data flow.", "Designed and built rich, responsive UIs leveraging React hooks and Next.js for server-side rendering.", "Managed complex API parameters and optimized data fetching for application efficiency.", "Implemented performance optimizations, including debounce techniques, to enhance user input handling.", "Built a React Native mobile application for a smart bottle, integrating Bluetooth Low Energy (BLE)."] },
              ].map((exp, i) => (
                <div key={i} style={{ marginBottom: 35, position: "relative", paddingLeft: 20, borderLeft: "1px solid rgba(255,255,255,0.1)" }}>
                  <div style={{ position: "absolute", left: -5, top: 0, width: 9, height: 9, borderRadius: "50%", background: "#007AFF" }} />
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 700 }}>{exp.co}</h3>
                    <span style={{ fontSize: 11, opacity: 0.5 }}>{exp.date}</span>
                  </div>
                  <div style={{ color: "#007AFF", fontSize: 12, fontWeight: 700, marginBottom: 12 }}>{exp.role}</div>
                  <ul style={{ paddingLeft: 18, fontSize: 12, opacity: 0.8, lineHeight: 1.7 }}>
                    {exp.points.map((p, j) => <li key={j} style={{ marginBottom: 10 }}>{p}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          )}
          {activeTab === "skills" && (
            <div style={{ animation: "winPop 0.3s ease", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              {[
                { title: "Languages", skills: ["JavaScript (ES6+)", "TypeScript", "HTML5/CSS3"] },
                { title: "Frameworks & Libraries", skills: ["React.js", "Redux Toolkit", "React Native", "Node.js", "Express.js"] },
                { title: "Styling", skills: ["Tailwind CSS", "styled-components", "Material UI"] },
                { title: "Tools", skills: ["Git", "Webpack", "npm/yarn", "Docker"] },
              ].map((cat, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.03)", padding: 20, borderRadius: 16, border: "1px solid rgba(255,255,255,0.05)" }}>
                  <h3 style={{ fontSize: 12, fontWeight: 800, color: "#aaa", textTransform: "uppercase", marginBottom: 15, letterSpacing: 1 }}>{cat.title}</h3>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {cat.skills.map((s, j) => <span key={j} style={{ background: "rgba(0,122,255,0.15)", color: "#007AFF", fontSize: 11, padding: "4px 10px", borderRadius: 6, fontWeight: 600 }}>{s}</span>)}
                  </div>
                </div>
              ))}
            </div>
          )}
          {activeTab === "education" && (
            <div style={{ animation: "winPop 0.3s ease" }}>
              <div style={{ background: "rgba(255,255,255,0.03)", padding: 25, borderRadius: 18, border: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 5 }}>Sri Venkateswara College Of Engineering (SVCE)</div>
                <div style={{ color: "#007AFF", fontWeight: 600, fontSize: 13, marginBottom: 20 }}>B.Tech., Information Technology — CGPA: 8.1</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, opacity: 0.6, fontSize: 12 }}>
                  <div>Nadar Higher Secondary School — HSC (2019)</div>
                  <div>S.S. Government Higher Secondary School — SSLC (2017)</div>
                </div>
              </div>
            </div>
          )}
          {activeTab === "projects" && (
            <div style={{ animation: "winPop 0.3s ease", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 15 }}>
              {[
                { name: "Repo Lens", tech: "React / Hooks / d3.js / GitHub APIs", desc: "An interactive GitHub Repository Activity Visualizer built with React and D3.js that transforms raw repository data into meaningful visual insights.", link: "https://gitrepolens.vercel.app/" },
                { name: "Eventify", tech: "React / Day.js", desc: "A Google Calendar-inspired app built with React, Redux toolkit, offering month, week, day, and year views with Day.js for date handling.", link: "https://eventify-beige.vercel.app/" },
              ].map((p, i) => (
                <div key={i} style={{ background: "linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))", padding: 20, borderRadius: 18, border: "1px solid rgba(255,255,255,0.05)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{p.name}</h3>
                    <div style={{ fontSize: 11, color: "#007AFF", fontWeight: 700, marginBottom: 12 }}>{p.tech}</div>
                    <p style={{ fontSize: 12, opacity: 0.6, lineHeight: 1.5 }}>{p.desc}</p>
                  </div>
                  <a href={p.link} target="_blank" rel="noreferrer" style={{ marginTop: 15, display: "inline-block", fontSize: 11, fontWeight: 700, color: "#fff", textDecoration: "none", background: "rgba(255,255,255,0.1)", padding: "6px 12px", borderRadius: 8, textAlign: "center" }}>View Project</a>
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
