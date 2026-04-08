import { useState } from "react";
import { useDrag, useResize } from "../../hooks";
import TrafficLights from "../shared/TrafficLights";
import ResizeHandles from "../shared/ResizeHandles";

const SONGS = [
  { title: "You and Whose Army?", artist: "Radiohead", ytId: "QQnc-hM80UQ" },
  { title: "Cry", artist: "Cigarettes After Sex", ytId: "3XqqkrJENB4" },
  { title: "Smells Like Teen Spirit", artist: "Nirvana", ytId: "hTWKbfoikeg" },
  { title: "Through the Valley", artist: "Shawn James", ytId: "gRBq7fPITxw" },
  { title: "Red Right Hand", artist: "Nick Cave & The Bad Seeds", ytId: "RrxePKps87k" },
];

export default function MusicPlayer({ onClose, zIndex, onFocus, addRecent }) {
  const [pos, setPos] = useState({ x: 220, y: 200 });
  const [size, setSize] = useState({ w: 340, h: 420 });
  const [playing, setPlaying] = useState(false);
  const [trackIdx, setTrackIdx] = useState(0);
  const { onMouseDown: onMD, onTouchStart: onTS } = useDrag(pos, setPos, onFocus);
  const handle = useResize(size, setSize, pos, setPos, 280, 320);

  const onNext = () => { const idx = (trackIdx + 1) % SONGS.length; setTrackIdx(idx); setPlaying(true); addRecent({ name: SONGS[idx].title, icon: "🎵", type: "music" }); };
  const onPrev = () => { const idx = (trackIdx - 1 + SONGS.length) % SONGS.length; setTrackIdx(idx); setPlaying(true); addRecent({ name: SONGS[idx].title, icon: "🎵", type: "music" }); };

  return (
    <div onMouseDown={onFocus} style={{ position: "absolute", left: pos.x, top: pos.y, width: size.w, zIndex, borderRadius: 18, overflow: "hidden", background: "rgba(22,22,28,0.96)", backdropFilter: "blur(24px)", boxShadow: "0 24px 60px rgba(0,0,0,0.6)", animation: "winPop .3s ease", border: "1px solid rgba(255,255,255,0.1)" }}>
      <div onMouseDown={onMD} onTouchStart={onTS} style={{ height: 38, display: "flex", alignItems: "center", padding: "0 12px", borderBottom: "0.5px solid rgba(255,255,255,0.07)", cursor: "move", background: "rgba(0,0,0,0.3)" }}>
        <TrafficLights onClose={onClose} />
        <span style={{ flex: 1, textAlign: "center", fontSize: 11, fontWeight: 700, opacity: 0.5 }}>MUSIC PLAYER</span>
      </div>
      <div style={{ padding: 25, textAlign: "center" }}>
        <div style={{ width: 180, height: 180, margin: "0 auto 20px", borderRadius: 16, overflow: "hidden", background: "#000" }}>
          <iframe
            key={trackIdx + (playing ? "-play" : "-stop")}
            width="100%" height="180"
            src={`https://www.youtube.com/embed/${SONGS[trackIdx].ytId}?autoplay=${playing ? 1 : 0}&controls=1&modestbranding=1&rel=0`}
            title="YouTube video player" frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            style={{ borderRadius: 16 }}
          />
        </div>
        <div style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{SONGS[trackIdx].title}</div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 20 }}>{SONGS[trackIdx].artist}</div>
        <div style={{ display: "flex", justifyContent: "center", gap: 30, alignItems: "center" }}>
          <span onClick={onPrev} style={{ fontSize: 24, cursor: "pointer", opacity: 0.6 }}>⏮</span>
          <div onClick={() => setPlaying(!playing)} style={{ width: 50, height: 50, borderRadius: "50%", background: "#FF0000", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#fff", fontSize: 20 }}>{playing ? "⏸" : "▶"}</div>
          <span onClick={onNext} style={{ fontSize: 24, cursor: "pointer", opacity: 0.6 }}>⏭</span>
        </div>
        <div style={{ marginTop: 15, fontSize: 10, opacity: 0.3, letterSpacing: 1 }}>PLAYING VIA YOUTUBE</div>
      </div>
      <ResizeHandles handle={handle} />
    </div>
  );
}
