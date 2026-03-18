"use client"
import { useState } from 'react'

const EWASTE_ITEMS = [
  { id: 1, emoji: "📱", x: 15, y: 62, title: "Smartphones", description: "Over 5 billion phones are discarded each year. They contain heavy metals like lead, mercury, and cadmium that leach into soil and groundwater, poisoning ecosystems for decades." },
  { id: 2, emoji: "💻", x: 88, y: 10, title: "Laptops", description: "A single laptop contains over 60 elements from the periodic table. The average lifespan is just 4 years, and less than 20% are ever properly recycled." },
  { id: 3, emoji: "🔋", x: 42, y: 80, title: "Batteries", description: "Lithium-ion batteries can spontaneously combust in landfills, triggering toxic fires. A single car battery contains enough sulfuric acid to contaminate 25,000 litres of water." },
  { id: 4, emoji: "🔌", x: 84, y: 75, title: "Cables & Chargers", description: "The average household discards 11kg of cable waste per year. Plastic insulation releases dioxins when burned, which is one of the most toxic substances known, causing cancer and developmental problems." },
  { id: 5, emoji: "🖨️", x: 28, y: 21, title: "Printers", description: "Printer cartridges take over 1,000 years to decompose. Toner powder contains carbon black, a possible carcinogen. Most printers are discarded after just 3 years of use." },
  { id: 6, emoji: "📺", x: 60, y: 27, title: "Old Monitors", description: "A single CRT monitor contains up to 4kg of lead. When crushed in landfills, this lead vaporises into the air. Flat screens contain mercury-filled backlights and toxic flame retardants." },
];
export default function EwasteObjects() {
  const [mouse, setMouse] = useState({ x: -999, y: -999 });
  const [active, setActive] = useState(false);
  const [found, setFound] = useState(new Set());
  const [popup, setPopup] = useState(null); // item object or null
  const [allFoundShown, setAllFoundShown] = useState(false);


  const handleMovement = (e) => {
    setMouse({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handleItemClick = (item) => {
    if (found.has(item.id)) return;
    const newFound = new Set(found);
    newFound.add(item.id);
    setFound(newFound);
    setPopup(item);
    if (newFound.size === EWASTE_ITEMS.length) {
      setAllFoundShown(true);
    }
  };
  const RADIUS = 180
  const closePopup = () => setPopup(null);

  return (
    <div
      onMouseMove={handleMovement}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => {
        setMouse({ x: -999, y: -999 });
        setActive(false);

      }}
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        cursor: "none",
        overflow: "hidden",
        background: "#000",
        fontFamily: "'Georgia', serif",
        cursor: popup ? "default" : "none"
      }}
    >
      {/* Cave background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url(/Cave.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* E-waste items — sit above cave but below darkness */}
      {EWASTE_ITEMS.map((item) => {
        const isFound = found.has(item.id);
        const opacity = isFound ? 0.35 : 1;

        return (
          <div
            key={item.id}
            onClick={() => handleItemClick(item)}
            style={{
              position: "absolute",
              left: `${item.x}%`,
              top: `${item.y}%`,
              transform: `translate(-50%, -50%) scale(1.2)`,
              transition: "transform 0.2s ease, opacity 0.4s ease",
              fontSize: "2.2rem",
              cursor: isFound ? "default" : "pointer",
              zIndex: 3,
              opacity,
              filter: isFound ? "grayscale(1)" : "none",
              userSelect: "none",
            }}
          >
            {item.emoji}
          </div>
        );
      })}

      {/* Darkness overlay with torch reveal */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 4,
          background: active
            ? `radial-gradient(circle ${RADIUS}px at ${mouse.x}px ${mouse.y}px, transparent 0%, transparent 55%, rgba(0,0,0,0.97) 100%)`
            : "rgba(0,0,0,1)",
          pointerEvents: "none", 
        }}
      />
      {/* Instruction */}
      <div
        style={{
          position: "absolute",
          top: "1.2rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          color: "rgb(256,256,256,0.6)",
          fontSize: "0.85rem",
          fontFamily: "'Georgia', serif",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          textAlign: "center",
          pointerEvents: "none",
          whiteSpace: "nowrap",
        }}
      >
        Find and collect e-waste items in the cave
      </div>

      {/* Counter badge */}
      <div
        style={{
          position: "absolute",
          top: "1.2rem",
          right: "1.4rem",
          zIndex: 10,
          background: "rgba(0,0,0,0.7)",
          border: "1px solid rgba(229, 163, 230, 0.4)",
          borderRadius: "999px",
          padding: "0.35rem 0.9rem",
          color: "#f3b5e3ff",
          fontSize: "1rem",
          letterSpacing: "0.15em",
          fontFamily: "'Georgia', serif",
          textTransform: "uppercase",
        }}
      >
        {found.size}/{EWASTE_ITEMS.length} found
      </div>

      {/* Popup */}
      {popup && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(4px)",
            
          }}
          onClick={closePopup}
        >
          <div
            style={{
              background: "#190f1aff",
              border: "1px solid rgba(229, 163, 230, 0.25)",
              borderRadius: "1.2rem",
              padding: "2.5rem 2rem 2rem",
              maxWidth: "420px",
              width: "90%",
              textAlign: "center",
              position: "relative",
            }}>

            {/* Icon */}
            <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>
              {popup.emoji}
            </div>

            {/* Title */}
            <h2
              style={{
                color: "#ffc8f8ff",
                fontFamily: "'Georgia', serif",
                fontSize: "1.5rem",
                fontVariant: "small-caps",
                letterSpacing: "0.05em",
                margin: "0 0 1rem",
              }}
            >
              {popup.title}
            </h2>

            {/* Description */}
            <p
              style={{
                color: "#efdde9ff",
                fontSize: "0.95rem",
                lineHeight: 1.7,
                margin: "0 0 1.8rem",
              }}
            >
              {popup.description}
            </p>

            {/* CTA button */}
            <button
              onClick={closePopup}
              style={{
                width: "100%",
                padding: "0.85rem",
                background: "#d77ebeff",
                color: "#0a120d",
                border: "none",
                borderRadius: 30,
                fontSize: "0.95rem",
                fontWeight: "700",
                letterSpacing: "0.05em",
                cursor: "pointer",
                fontFamily: "'Georgia', serif",
              }}
            >
              Continue Exploring
            </button>
          </div>
        </div>
      )}

      {/* All found screen */}
      {allFoundShown && !popup && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 15,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.92)",
            textAlign: "center",
            padding: "2rem",
          }}
        >
          <h1
            style={{
              color: "#e6a3ddff",
              fontFamily: "'Georgia', serif",
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              fontVariant: "small-caps",
              letterSpacing: "0.04em",
              margin: "0 0 1.5rem",
            }}
          >
            All Found
          </h1>
          <p
            style={{
              color: "#d7b4d2ff",
              fontSize: "clamp(0.95rem, 2vw, 1.15rem)",
              lineHeight: 1.8,
              maxWidth: "520px",
              margin: 0,
            }}
          >
            You've uncovered the hidden e-waste crisis!
          </p>
        </div>
      )}
    </div>
  );
}