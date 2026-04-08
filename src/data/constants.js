export const TRACKS = [
  { title: "Blinding Lights", artist: "The Weeknd", dur: "3:20", bpm: 171 },
  { title: "lo-fi chill", artist: "ChilledCow", dur: "4:12", bpm: 85 },
  { title: "Midnight City", artist: "M83", dur: "4:03", bpm: 105 },
  { title: "Resonance", artist: "HOME", dur: "3:48", bpm: 90 },
  { title: "Tame Impala — Let It Happen", artist: "Tame Impala", dur: "7:46", bpm: 110 },
];

export const DESKTOP_CARDS = [
  {
    id: "eventify", label: "Eventify", type: "project",
    w: 195, h: 215, x: 450, y: 55,
    bg: "linear-gradient(160deg,#1a3a5c,#0d2035)",
    accent: "#5E9BF0", icon: "", year: "2024",
    desc: "A Google Calendar-inspired app offering month, week, day, and year views with Day.js.",
    tags: ["React", "Node.js", "WebSockets"],
  },
  {
    id: "crediform", label: "Crediform", type: "project",
    w: 190, h: 220, x: 240, y: 30,
    bg: "linear-gradient(160deg,#1a3a28,#0d2018)",
    accent: "#5EBF8A", icon: "", year: "2024",
    desc: "SaaS platform built to collect, manage, and display testimonials with a modern UI and easy integration. - ongoing",
    tags: ["Next.js", "Stripe", "MongoDB"],
  },
  {
    id: "repolens", label: "Repo Lens", type: "project",
    w: 200, h: 230, x: 20, y: 50,
    bg: "linear-gradient(160deg,#3a2a0d,#251508)",
    accent: "#F0A05E", icon: "", year: "2026",
    desc: "An interactive GitHub Repository Activity Visualizer built with React and D3.js that transforms raw repository data into meaningful visual insights.",
    tags: ["React", "React Hooks", "GitHub API", "d3.js"],
  },
  {
    id: "aboutme", label: "Readme.md", type: "file",
    w: 140, h: 100, x: 20, y: 350,
    bg: "linear-gradient(160deg, #622774, #2a0d35)",
    accent: "#C07EF0", icon: "", desc: "About Me",
  },
];
