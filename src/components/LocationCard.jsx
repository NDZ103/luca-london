import { motion, AnimatePresence } from "framer-motion";

export default function LocationCard({ location, onClose }) {
  if (!location) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0"
          style={{ background: "rgba(2, 8, 24, 0.85)", backdropFilter: "blur(8px)" }}
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Card */}
        <motion.div
          className="relative w-full max-w-md rounded-3xl overflow-hidden"
          style={{
            background: "linear-gradient(180deg, #0D1B3E 0%, #0A0F1E 100%)",
            border: "1px solid rgba(200,169,110,0.25)",
            maxHeight: "90vh",
            overflowY: "auto",
          }}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* Image header */}
          <div className="relative h-52 overflow-hidden">
            <img
              src={location.image}
              alt={location.imageAlt}
              className="w-full h-full object-cover"
              style={{ filter: "brightness(0.7) saturate(0.9)" }}
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
            {/* Fallback */}
            <div
              className="absolute inset-0 items-center justify-center text-6xl"
              style={{ display: "none", background: "linear-gradient(135deg, #0D1B3E, #1A1060)" }}
            >
              {location.emoji}
            </div>

            {/* Image overlay */}
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(180deg, rgba(10,15,30,0.1) 0%, rgba(10,15,30,0.8) 100%)" }}
            />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-white font-sans text-sm"
              style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.2)", backdropFilter: "blur(8px)" }}
            >
              ✕
            </button>

            {/* Category badge */}
            <div
              className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-sans tracking-widest uppercase"
              style={{
                background: `${location.color}CC`,
                border: `1px solid ${location.accent}40`,
                color: location.accent,
              }}
            >
              {location.category}
            </div>

            {/* Title over image */}
            <div className="absolute bottom-4 left-5 right-5">
              <p className="text-2xl font-display font-bold text-white leading-tight">
                {location.emoji} {location.name}
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="p-5 space-y-5">
            {/* Description */}
            <p className="font-body text-base leading-relaxed" style={{ color: "rgba(230,220,200,0.9)" }}>
              {location.description}
            </p>

            {/* Interesting fact */}
            <div
              className="p-4 rounded-2xl"
              style={{ background: "rgba(200,169,110,0.07)", border: "1px solid rgba(200,169,110,0.2)" }}
            >
              <p className="text-xs font-sans tracking-widest uppercase mb-2" style={{ color: "#C8A96E" }}>
                ✦ Zanimljivost
              </p>
              <p className="font-body text-sm leading-relaxed" style={{ color: "rgba(220,210,190,0.85)" }}>
                {location.fact}
              </p>
            </div>

            {/* Highlights */}
            <div>
              <p className="text-xs font-sans tracking-widest uppercase mb-3" style={{ color: "rgba(200,169,110,0.6)" }}>
                Što te čeka
              </p>
              <div className="flex flex-wrap gap-2">
                {location.highlights.map((h, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full text-xs font-sans"
                    style={{
                      background: "rgba(200,169,110,0.1)",
                      border: "1px solid rgba(200,169,110,0.25)",
                      color: "#C8A96E",
                    }}
                  >
                    {h}
                  </span>
                ))}
              </div>
            </div>

            {/* Info row */}
            <div className="flex gap-3">
              <div
                className="flex-1 p-3 rounded-xl text-center"
                style={{ background: "rgba(200,169,110,0.06)", border: "1px solid rgba(200,169,110,0.15)" }}
              >
                <p className="text-xs font-sans mb-1" style={{ color: "rgba(200,169,110,0.5)" }}>Trajanje</p>
                <p className="text-sm font-sans font-medium" style={{ color: "#C8A96E" }}>{location.duration}</p>
              </div>
              <div
                className="flex-1 p-3 rounded-xl text-center"
                style={{ background: "rgba(200,169,110,0.06)", border: "1px solid rgba(200,169,110,0.15)" }}
              >
                <p className="text-xs font-sans mb-1" style={{ color: "rgba(200,169,110,0.5)" }}>Status</p>
                <p className="text-sm font-sans font-medium" style={{ color: "#7EC8E0" }}>Coming soon ✨</p>
              </div>
            </div>

            {/* Tip */}
            <div
              className="p-4 rounded-2xl flex gap-3 items-start"
              style={{ background: "rgba(126,184,216,0.07)", border: "1px solid rgba(126,184,216,0.2)" }}
            >
              <span className="text-xl mt-0.5">💡</span>
              <div>
                <p className="text-xs font-sans tracking-widest uppercase mb-1" style={{ color: "#7EC8E0" }}>
                  Pro tip
                </p>
                <p className="font-body text-sm leading-relaxed" style={{ color: "rgba(200,220,235,0.85)" }}>
                  {location.tip}
                </p>
              </div>
            </div>

            {/* Coming soon banner */}
            <div
              className="p-4 rounded-2xl text-center"
              style={{
                background: "linear-gradient(135deg, rgba(122,20,48,0.2), rgba(26,16,60,0.2))",
                border: "1px solid rgba(200,169,110,0.2)",
              }}
            >
              <p className="font-script text-xl mb-1" style={{ color: "#E8D5A0" }}>
                Tvoja avantura dolazi...
              </p>
              <p className="font-body text-sm italic" style={{ color: "rgba(200,169,110,0.7)" }}>
                22. lipnja 2026. 🌟
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
