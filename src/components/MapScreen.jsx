import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { locations } from "../data/locations";
import LocationCard from "./LocationCard";

function MapPin({ location, index, onClick, isActive }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), index * 200 + 400);
    return () => clearTimeout(t);
  }, [index]);

  if (!visible) return null;

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{ left: `${location.x}%`, top: `${location.y}%`, transform: "translate(-50%, -100%)", zIndex: isActive ? 20 : 10 }}
      initial={{ y: -30, opacity: 0, scale: 0 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      onClick={() => onClick(location)}
      whileHover={{ scale: 1.15, zIndex: 25 }}
    >
      {/* Pulse rings */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 36, height: 36,
          background: `${location.color}30`,
          border: `1px solid ${location.color}60`,
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        animate={{ scale: [1, 2], opacity: [0.8, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
      />

      {/* Pin marker */}
      <div
        className="relative flex flex-col items-center"
        style={{ filter: isActive ? `drop-shadow(0 0 12px ${location.accent})` : "none" }}
      >
        {/* Pin head */}
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-base shadow-lg"
          style={{
            background: isActive
              ? `linear-gradient(135deg, ${location.color}, ${location.accent})`
              : `linear-gradient(135deg, ${location.color}CC, ${location.color})`,
            border: `2px solid ${isActive ? location.accent : location.color + "80"}`,
            boxShadow: isActive ? `0 0 20px ${location.accent}60` : `0 4px 12px rgba(0,0,0,0.4)`,
          }}
        >
          {location.emoji}
        </div>
        {/* Pin tail */}
        <div
          className="w-0.5 h-2"
          style={{ background: isActive ? location.accent : `${location.color}80` }}
        />
        <div
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: isActive ? location.accent : `${location.color}60` }}
        />
      </div>

      {/* Tooltip label */}
      <motion.div
        className="absolute bottom-full mb-2 left-1/2 whitespace-nowrap px-2.5 py-1 rounded-lg text-xs font-sans"
        style={{
          transform: "translateX(-50%)",
          background: "rgba(10,15,30,0.9)",
          border: `1px solid ${location.color}60`,
          color: location.accent,
          letterSpacing: "0.5px",
          pointerEvents: "none",
        }}
        initial={{ opacity: 0, y: 4 }}
        whileHover={{ opacity: 1, y: 0 }}
      >
        {location.shortName}
      </motion.div>
    </motion.div>
  );
}

function CategoryFilter({ categories, active, onChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
      <button
        onClick={() => onChange(null)}
        className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-sans whitespace-nowrap transition-all"
        style={{
          background: active === null ? "rgba(200,169,110,0.2)" : "rgba(200,169,110,0.06)",
          border: `1px solid ${active === null ? "rgba(200,169,110,0.5)" : "rgba(200,169,110,0.2)"}`,
          color: active === null ? "#C8A96E" : "rgba(200,169,110,0.5)",
          letterSpacing: "1px",
        }}
      >
        Sve
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-sans whitespace-nowrap transition-all"
          style={{
            background: active === cat ? "rgba(200,169,110,0.2)" : "rgba(200,169,110,0.06)",
            border: `1px solid ${active === cat ? "rgba(200,169,110,0.5)" : "rgba(200,169,110,0.2)"}`,
            color: active === cat ? "#C8A96E" : "rgba(200,169,110,0.5)",
            letterSpacing: "1px",
          }}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export default function MapScreen() {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState(null);
  const [showList, setShowList] = useState(false);

  const categories = [...new Set(locations.map((l) => l.category))];
  const filtered = filter ? locations.filter((l) => l.category === filter) : locations;

  return (
    <div
      className="min-h-screen relative flex flex-col"
      style={{ background: "linear-gradient(180deg, #0A0F1E 0%, #0D1B3E 100%)" }}
    >
      {/* Header */}
      <motion.div
        className="relative z-20 px-5 pt-6 pb-4"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-1">
          <div>
            <p className="text-xs font-sans tracking-widest uppercase" style={{ color: "rgba(200,169,110,0.5)" }}>
              ✦ London Adventure Map
            </p>
            <h2
              className="font-display font-bold text-2xl"
              style={{
                background: "linear-gradient(135deg, #E8D5A0, #C8A96E)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Luca's London
            </h2>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="text-xs font-sans" style={{ color: "rgba(200,169,110,0.6)", letterSpacing: "1px" }}>
              10 destinacija
            </span>
            <div
              className="px-2 py-0.5 rounded-full text-xs font-sans"
              style={{
                background: "rgba(126,200,224,0.1)",
                border: "1px solid rgba(126,200,224,0.3)",
                color: "#7EC8E0",
                letterSpacing: "1px",
              }}
            >
              22.6.2026
            </div>
          </div>
        </div>

        {/* Category filter */}
        <div className="mt-3">
          <CategoryFilter categories={categories} active={filter} onChange={setFilter} />
        </div>
      </motion.div>

      {/* Map area */}
      <div className="relative flex-1 mx-4 mb-4 rounded-3xl overflow-hidden" style={{ minHeight: 380 }}>
        {/* Map background - stylised London streets */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(145deg, #0D1B3E 0%, #091528 60%, #0A1020 100%)",
          }}
        >
          {/* Grid lines for map feel */}
          <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#C8A96E" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>

          {/* Thames river */}
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
            <motion.path
              d="M 0,62 Q 15,58 25,62 Q 40,68 55,60 Q 70,54 85,60 Q 95,64 100,62"
              fill="none"
              stroke="rgba(100,150,220,0.25)"
              strokeWidth="5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
            />
            <motion.path
              d="M 0,62 Q 15,58 25,62 Q 40,68 55,60 Q 70,54 85,60 Q 95,64 100,62"
              fill="none"
              stroke="rgba(100,150,220,0.1)"
              strokeWidth="10"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.2, ease: "easeOut", delay: 0.4 }}
            />
            {/* Thames label */}
            <text x="50" y="70" textAnchor="middle" fontSize="3" fill="rgba(100,150,220,0.5)" fontFamily="DM Sans" letterSpacing="2">
              THAMES · TAMIZA
            </text>
          </svg>

          {/* Abstract street lines */}
          <svg className="absolute inset-0 w-full h-full opacity-15" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
            <line x1="20" y1="0" x2="20" y2="100" stroke="#C8A96E" strokeWidth="0.4"/>
            <line x1="48" y1="0" x2="48" y2="100" stroke="#C8A96E" strokeWidth="0.4"/>
            <line x1="72" y1="0" x2="72" y2="100" stroke="#C8A96E" strokeWidth="0.4"/>
            <line x1="0" y1="35" x2="100" y2="35" stroke="#C8A96E" strokeWidth="0.4"/>
            <line x1="0" y1="55" x2="100" y2="55" stroke="#C8A96E" strokeWidth="0.4"/>
            <line x1="0" y1="78" x2="100" y2="78" stroke="#C8A96E" strokeWidth="0.4"/>
          </svg>
        </div>

        {/* Location pins */}
        <div className="absolute inset-0">
          {filtered.map((location, i) => (
            <MapPin
              key={location.id}
              location={location}
              index={i}
              onClick={setSelected}
              isActive={selected?.id === location.id}
            />
          ))}
        </div>

        {/* Map decorations */}
        <div className="absolute top-3 right-3 flex flex-col items-center gap-0.5 opacity-50">
          <div className="w-px h-5" style={{ background: "#C8A96E" }} />
          <div
            className="text-xs font-sans px-1"
            style={{ color: "#C8A96E", fontSize: 9, letterSpacing: "1px", border: "1px solid rgba(200,169,110,0.4)", borderRadius: 2 }}
          >
            N
          </div>
        </div>

        {/* Corner ornaments */}
        <div className="absolute top-3 left-3 w-6 h-6 border-t border-l" style={{ borderColor: "rgba(200,169,110,0.4)" }} />
        <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r" style={{ borderColor: "rgba(200,169,110,0.4)" }} />

        {/* Touch hint */}
        <motion.div
          className="absolute bottom-4 left-1/2 text-center"
          style={{ transform: "translateX(-50%)" }}
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <p className="text-xs font-sans px-3 py-1 rounded-full" style={{
            color: "rgba(200,169,110,0.6)",
            letterSpacing: "1.5px",
            background: "rgba(10,15,30,0.6)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(200,169,110,0.15)",
          }}>
            Klikni na pin ✦
          </p>
        </motion.div>
      </div>

      {/* Location list */}
      <div className="px-4 pb-4">
        <button
          onClick={() => setShowList(!showList)}
          className="w-full py-3 rounded-2xl text-sm font-sans tracking-widest uppercase transition-all"
          style={{
            background: showList ? "rgba(200,169,110,0.12)" : "rgba(200,169,110,0.06)",
            border: "1px solid rgba(200,169,110,0.25)",
            color: "#C8A96E",
            letterSpacing: "2px",
          }}
        >
          {showList ? "▲ Sakrij listu" : "▼ Prikaži sve destinacije"}
        </button>

        <AnimatePresence>
          {showList && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden"
            >
              <div className="mt-3 space-y-2">
                {locations.map((loc, i) => (
                  <motion.button
                    key={loc.id}
                    onClick={() => setSelected(loc)}
                    className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-left transition-all"
                    style={{
                      background: "rgba(200,169,110,0.05)",
                      border: "1px solid rgba(200,169,110,0.15)",
                    }}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ background: "rgba(200,169,110,0.1)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0"
                      style={{ background: `${loc.color}40`, border: `1px solid ${loc.color}60` }}
                    >
                      {loc.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-sans text-sm font-medium truncate" style={{ color: "#E8D5A0" }}>
                        {loc.name}
                      </p>
                      <p className="text-xs font-sans mt-0.5" style={{ color: "rgba(200,169,110,0.5)", letterSpacing: "1px" }}>
                        {loc.category} · {loc.duration}
                      </p>
                    </div>
                    <div className="text-xs font-sans" style={{ color: "#7EC8E0", flexShrink: 0 }}>
                      Coming soon
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom info strip */}
      <div
        className="mx-4 mb-6 p-4 rounded-2xl flex items-center gap-3"
        style={{
          background: "rgba(200,169,110,0.06)",
          border: "1px solid rgba(200,169,110,0.2)",
        }}
      >
        <div className="text-2xl">✈</div>
        <div className="flex-1">
          <p className="font-script text-base" style={{ color: "#E8D5A0" }}>
            Sretan rođendan, Luca! ❤️
          </p>
          <p className="font-body text-xs italic mt-0.5" style={{ color: "rgba(200,169,110,0.6)" }}>
            Tvoja londonska avantura tek počinje...
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs font-sans" style={{ color: "rgba(200,169,110,0.5)", letterSpacing: "1px" }}>Gate</p>
          <p className="font-display font-bold" style={{ color: "#C8A96E", fontSize: 18 }}>9¾</p>
        </div>
      </div>

      {/* Location card popup */}
      <AnimatePresence>
        {selected && (
          <LocationCard location={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
