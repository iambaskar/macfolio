import { useState } from "react";
import { useClock } from "./hooks";
import { DESKTOP_CARDS } from "./data/constants";
import finderIcon from "./assets/Finder_Icon_macOS_Tahoe.png";
import mailIcon from "./assets/Apple_Mail.png";
import notesIcon from "./assets/Notes_(iOS_26)_app_icon.png";
import photosIcon from "./assets/Photos_icon_for_OS_X.png";
import musicIcon from "./assets/Apple_Music_icon.svg";
import trashIcon from "./assets/Trash_Full_29942.webp";

import MobileGate from "./components/layout/MobileGate";
import MenuBar from "./components/layout/MenuBar";
import Wallpaper from "./components/layout/Wallpaper";
import Dock from "./components/layout/Dock";
import DeskCard from "./components/desktop/DeskCard";

import FinderWindow from "./components/windows/FinderWindow";
import MusicPlayer from "./components/windows/MusicPlayer";
import NotesWidget from "./components/windows/NotesWidget";
import MailWindow from "./components/windows/MailWindow";
import TrashWidget from "./components/windows/TrashWidget";
import PhotosWidget from "./components/windows/PhotosWidget";
import AboutMeWindow from "./components/windows/AboutMeWindow";
import { AwardWindow, ExperienceWidget } from "./components/windows/AwardAndExperience";

export default function App() {
  const time = useClock();
  const [zCounter, setZCounter] = useState(100);
  const [zMap, setZMap] = useState({});

  const [finderOpen, setFinderOpen] = useState(false);
  const [mailOpen, setMailOpen] = useState(false);
  const [musicOpen, setMusicOpen] = useState(true);
  const [notesOpen, setNotesOpen] = useState(true);
  const [trashOpen, setTrashOpen] = useState(false);
  const [photosOpen, setPhotosOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [awardOpen, setAwardOpen] = useState(false);
  const [expOpen, setExpOpen] = useState(true);

  const [cardZs, setCardZs] = useState({});
  const [contextMenu, setContextMenu] = useState(null);
  const [recentItems, setRecentItems] = useState([
    { name: "Welcome.pdf", icon: "📄", type: "file" },
    { name: "Portfolio.fig", icon: "🎨", type: "file" },
  ]);

  const addRecent = (item) => setRecentItems(prev => [item, ...prev.filter(i => i.name !== item.name)].slice(0, 12));

  const bumpZ = (id) => {
    setZCounter(z => z + 1);
    setZMap(m => ({ ...m, [id]: zCounter + 1 }));
  };

  const bumpCard = (id) => {
    setZCounter(z => z + 1);
    setCardZs(m => ({ ...m, [id]: zCounter + 1 }));
  };

  const timeStr = time.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  const dateStr = time.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

  const DOCK_ITEMS = [
    { id: "finder", icon: finderIcon, label: "Finder", color: "#5E9BF0", action: () => { setFinderOpen(true); bumpZ("finder"); } },
    { id: "mail", icon: mailIcon, label: "Mail", color: "#5E9BF0", action: () => { setMailOpen(true); bumpZ("mail"); } },
    { id: "notes", icon: notesIcon, label: "Notes", color: "#FFD60A", action: () => { setNotesOpen(true); bumpZ("notes"); } },
    { id: "photos", icon: photosIcon, label: "Photos", color: "#FF6B6B", action: () => { setPhotosOpen(true); bumpZ("photos"); } },
    { id: "music", icon: musicIcon, label: "Music", color: "#FC3C44", action: () => { setMusicOpen(true); bumpZ("music"); } },
    { id: "trash", icon: trashIcon, label: "Trash", color: "#8E8E93", action: () => { setTrashOpen(true); bumpZ("trash"); } },
  ];

  const openStates = { finder: finderOpen, mail: mailOpen, music: musicOpen, notes: notesOpen, photos: photosOpen, trash: trashOpen };

  const finderActions = {
    mail: () => { setMailOpen(true); bumpZ("mail"); },
    music: () => { setMusicOpen(true); bumpZ("music"); },
    notes: () => { setNotesOpen(true); bumpZ("notes"); },
    photos: () => { setPhotosOpen(true); bumpZ("photos"); },
    trash: () => { setTrashOpen(true); bumpZ("trash"); },
    aboutme: () => { setAboutOpen(true); bumpZ("aboutme"); },
  };

  return (
    <MobileGate>
      <div onClick={() => setContextMenu(null)} onContextMenu={e => { e.preventDefault(); setContextMenu({ x: e.clientX, y: e.clientY }); }}
        style={{ width: "100vw", height: "100vh", overflow: "hidden", position: "relative", fontFamily: "'Outfit', 'Inter', -apple-system, sans-serif", color: "#fff" }}>

        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap');
          @keyframes winPop { from{opacity:0;transform:scale(.93)} to{opacity:1;transform:scale(1)} }
          @keyframes cloudDrift { from{transform:translateX(0)} to{transform:translateX(50px)} }
          @keyframes musicBounce { from { transform: translateY(0) scale(1); } to { transform: translateY(-5px) scale(1.05); } }
          * { box-sizing:border-box; margin:0; padding:0; }
          ::placeholder { font-family: inherit; opacity: 0.5; }
          .dock-icon { transition: transform .18s cubic-bezier(.34,1.56,.64,1); }
          .dock-icon:hover { transform: scale(1.4) translateY(-12px); }
        `}</style>

        <Wallpaper />
        <MenuBar timeStr={timeStr} dateStr={dateStr} />

        {/* DESKTOP CARDS */}
        {DESKTOP_CARDS.map(card => {
          const specializedCard = { ...card };
          if (card.id === "aboutme") specializedCard.onOpen = () => { setAboutOpen(true); bumpZ("aboutme"); };
          if (card.id === "experience") specializedCard.onOpen = () => { setExpOpen(true); bumpZ("experience"); };
          if (card.id === "honors") specializedCard.onOpen = () => { setAwardOpen(true); bumpZ("honors"); };
          return <DeskCard key={card.id} card={specializedCard} zIndex={cardZs[card.id] || 10} onFocus={() => bumpCard(card.id)} />;
        })}

        {/* WINDOWS */}
        {finderOpen && <FinderWindow onClose={() => setFinderOpen(false)} zIndex={zMap["finder"] || 50} onFocus={() => bumpZ("finder")} recentItems={recentItems} actions={finderActions} />}
        {mailOpen && <MailWindow onClose={() => setMailOpen(false)} zIndex={zMap["mail"] || 51} onFocus={() => bumpZ("mail")} />}
        {musicOpen && <MusicPlayer onClose={() => setMusicOpen(false)} zIndex={zMap["music"] || 52} onFocus={() => bumpZ("music")} addRecent={addRecent} />}
        {notesOpen && <NotesWidget onClose={() => setNotesOpen(false)} zIndex={zMap["notes"] || 53} onFocus={() => bumpZ("notes")} addRecent={addRecent} />}
        {trashOpen && <TrashWidget onClose={() => setTrashOpen(false)} zIndex={zMap["trash"] || 54} onFocus={() => bumpZ("trash")} />}
        {photosOpen && <PhotosWidget onClose={() => setPhotosOpen(false)} zIndex={zMap["photos"] || 55} onFocus={() => bumpZ("photos")} addRecent={addRecent} />}
        {aboutOpen && <AboutMeWindow onClose={() => setAboutOpen(false)} zIndex={zMap["aboutme"] || 56} onFocus={() => bumpZ("aboutme")} />}
        {/* {awardOpen && <AwardWindow onClose={() => setAwardOpen(false)} zIndex={zMap["honors"] || 57} onFocus={() => bumpZ("honors")} />} */}
        {/* {expOpen && <ExperienceWidget onClose={() => setExpOpen(false)} zIndex={zMap["experience"] || 57} onFocus={() => bumpZ("experience")} />} */}

        <Dock items={DOCK_ITEMS} openStates={openStates} />

        {/* CONTEXT MENU */}
        {contextMenu && (
          <div onClick={e => e.stopPropagation()} style={{ position: "absolute", left: contextMenu.x, top: contextMenu.y, zIndex: 2000, background: "rgba(20,20,30,0.9)", backdropFilter: "blur(20px)", borderRadius: 10, padding: "5px 0", minWidth: 200, border: "0.5px solid rgba(255,255,255,0.15)", boxShadow: "0 20px 50px rgba(0,0,0,0.5)" }}>
            {["New Folder", "Get Info", "Change Wallpaper", "Clean Up"].map((l, i) => (
              <div key={i} onClick={() => setContextMenu(null)} style={{ padding: "8px 16px", color: "#fff", fontSize: 13, cursor: "pointer" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(0,122,255,0.5)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}>{l}</div>
            ))}
          </div>
        )}
      </div>
    </MobileGate>
  );
}
