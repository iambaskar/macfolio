export default function Wallpaper() {
  return (
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, #87CEEB 0%, #98D8F0 40%, #E8D870 75%, #F5C842 100%)" }}>
      {[0, 1, 2, 3, 4, 5].map(i => (
        <div key={i} style={{ position: "absolute", left: `${10 + i * 18}%`, top: `${10 + (i % 3) * 10}%`, opacity: 0.8, animation: `cloudDrift ${10 + i}s infinite alternate ease-in-out` }}>
          <div style={{ width: 100, height: 40, background: "#fff", borderRadius: 20 }} />
        </div>
      ))}
    </div>
  );
}
