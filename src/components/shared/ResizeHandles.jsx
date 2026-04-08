export default function ResizeHandles({ handle }) {
  const isTouch = window.matchMedia("(pointer: coarse)").matches;
  const e = isTouch ? 18 : 6;
  const c = isTouch ? 24 : 14;
  const cornerStyle = (dir) => ({ ...handle(dir).style, width: c, height: c, background: isTouch ? "rgba(255,255,255,0.15)" : "transparent", borderRadius: 3 });
  const edgeStyle = (dir) => ({ ...handle(dir).style, ...("ns".includes(dir) ? { height: e } : { width: e }) });
  return (
    <>
      {["n", "s", "e", "w"].map(d => <div key={d} {...handle(d)} style={edgeStyle(d)} />)}
      {["ne", "nw", "se", "sw"].map(d => <div key={d} {...handle(d)} style={cornerStyle(d)} />)}
    </>
  );
}
