import { useState, useEffect, useRef } from "react";

export function useClock() {
  const [t, setT] = useState(new Date());
  useEffect(() => { const i = setInterval(() => setT(new Date()), 1000); return () => clearInterval(i); }, []);
  return t;
}

export function useDrag(pos, setPos, onFocus) {
  const drag = useRef(null);
  const onStart = (clientX, clientY) => {
    if (onFocus) onFocus();
    drag.current = { mx: clientX, my: clientY, ox: pos.x, oy: pos.y };
    const onMove = (x, y) => setPos({ x: drag.current.ox + x - drag.current.mx, y: Math.max(28, drag.current.oy + y - drag.current.my) });
    const mm = (ev) => onMove(ev.clientX, ev.clientY);
    const tm = (ev) => { ev.preventDefault(); onMove(ev.touches[0].clientX, ev.touches[0].clientY); };
    const end = () => { drag.current = null; window.removeEventListener("mousemove", mm); window.removeEventListener("mouseup", end); window.removeEventListener("touchmove", tm); window.removeEventListener("touchend", end); };
    window.addEventListener("mousemove", mm);
    window.addEventListener("mouseup", end);
    window.addEventListener("touchmove", tm, { passive: false });
    window.addEventListener("touchend", end);
  };
  return {
    onMouseDown: (e) => onStart(e.clientX, e.clientY),
    onTouchStart: (e) => onStart(e.touches[0].clientX, e.touches[0].clientY),
  };
}

export function useResize(size, setSize, pos, setPos, minW = 280, minH = 200) {
  const onStart = (e, dir) => {
    e.stopPropagation();
    const startX = e.clientX ?? e.touches?.[0].clientX;
    const startY = e.clientY ?? e.touches?.[0].clientY;
    const { w: startW, h: startH } = size;
    const { x: startPX, y: startPY } = pos;
    const onMove = (x, y) => {
      const dx = x - startX;
      const dy = y - startY;
      const next = { w: startW, h: startH };
      const nextPos = { x: startPX, y: startPY };
      if (dir.includes("e")) next.w = Math.max(minW, startW + dx);
      if (dir.includes("s")) next.h = Math.max(minH, startH + dy);
      if (dir.includes("w")) { next.w = Math.max(minW, startW - dx); nextPos.x = startPX + startW - next.w; }
      if (dir.includes("n")) { next.h = Math.max(minH, startH - dy); nextPos.y = Math.max(28, startPY + startH - next.h); }
      setSize(next);
      setPos(nextPos);
    };
    const mm = (ev) => onMove(ev.clientX, ev.clientY);
    const tm = (ev) => { ev.preventDefault(); onMove(ev.touches[0].clientX, ev.touches[0].clientY); };
    const end = () => { window.removeEventListener("mousemove", mm); window.removeEventListener("mouseup", end); window.removeEventListener("touchmove", tm); window.removeEventListener("touchend", end); };
    window.addEventListener("mousemove", mm);
    window.addEventListener("mouseup", end);
    window.addEventListener("touchmove", tm, { passive: false });
    window.addEventListener("touchend", end);
  };
  return (dir) => ({
    onMouseDown: (e) => onStart(e, dir),
    onTouchStart: (e) => onStart(e, dir),
    style: {
      position: "absolute", background: "transparent", zIndex: 20,
      ...(dir === "e" ? { right: 0, top: "10%", width: 6, height: "80%", cursor: "ew-resize" } : {}),
      ...(dir === "w" ? { left: 0, top: "10%", width: 6, height: "80%", cursor: "ew-resize" } : {}),
      ...(dir === "s" ? { bottom: 0, left: "10%", width: "80%", height: 6, cursor: "ns-resize" } : {}),
      ...(dir === "n" ? { top: 0, left: "10%", width: "80%", height: 6, cursor: "ns-resize" } : {}),
      ...(dir === "se" ? { bottom: 0, right: 0, width: 14, height: 14, cursor: "se-resize" } : {}),
      ...(dir === "sw" ? { bottom: 0, left: 0, width: 14, height: 14, cursor: "sw-resize" } : {}),
      ...(dir === "ne" ? { top: 0, right: 0, width: 14, height: 14, cursor: "ne-resize" } : {}),
      ...(dir === "nw" ? { top: 0, left: 0, width: 14, height: 14, cursor: "nw-resize" } : {}),
    },
  });
}
