import { motion } from "framer-motion";
import { useState, useEffect } from "react";

function Star({ x, y, size, delay }) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, background: "#fff" }}
      animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.3, 0.8] }}
      transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay }}
    />
  );
}

const stars = Array.from({ length: 55 }, (_, i) => ({
  x: Math.random() * 100,
  y: Math.random() * 65,
  size: Math.random() * 2 + 0.5,
  delay: Math.random() * 3,
}));

export default function HeroScreen({ onExplore }) {
  const [planePos, setPlanePos] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlanePos((p) => (p >= 100 ? 0 : p + 0.15));
    }, 30);
    return () => clearInterval(interval);
  }, []);

  // Curved path from Zagreb (left) to London (right)
  const getPlaneXY = (t) => {
    const x = 5 + t * 0.90;
    const y = 68 - Math.sin((t / 100) * Math.PI) * 35;
    return { x, y };
  };

  const { x: px, y: py } = getPlaneXY(planePos);
  const { x: px2, y: py2 } = getPlaneXY(Math.min(planePos + 1, 100));
  const angle = Math.atan2(py2 - py, px2 - px) * (180 / Math.PI);

  return (
    <div
      className="min-h-screen relative overflow-hidden flex flex-col"
      style={{
        background: "linear-gradient(180deg, #020818 0%, #0A0F1E 40%, #0D1B3E 70%, #1A0A3E 100%)",
      }}
    >
      {/* Stars */}
      {stars.map((s, i) => (
        <Star key={i} {...s} />
      ))}

      {/* Moon */}
      <motion.div
        className="absolute"
        style={{ right: "8%", top: "8%" }}
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <div
          className="w-16 h-16 rounded-full"
          style={{
            background: "radial-gradient(circle at 35% 35%, #FFF8DC, #F5D97A 60%, #C8A96E)",
            boxShadow: "0 0 40px rgba(245,217,122,0.3), 0 0 80px rgba(200,169,110,0.15)",
          }}
        />
      </motion.div>

      {/* Flight path SVG */}
      <div className="absolute inset-0 pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="pathGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(200,169,110,0)" />
              <stop offset="40%" stopColor="rgba(200,169,110,0.4)" />
              <stop offset="100%" stopColor="rgba(200,169,110,0.1)" />
            </linearGradient>
          </defs>
          <motion.path
            d={`M 5,68 Q 52,15 95,68`}
            fill="none"
            stroke="url(#pathGrad)"
            strokeWidth="0.4"
            strokeDasharray="2,1.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2.5, ease: "easeOut", delay: 0.5 }}
          />
        </svg>
      </div>

      {/* Animated plane */}
      <motion.div
        className="absolute text-2xl pointer-events-none z-10"
        style={{
          left: `${px}%`,
          top: `${py}%`,
          transform: `translate(-50%, -50%) rotate(${angle}deg)`,
          filter: "drop-shadow(0 0 8px rgba(200,169,110,0.8))",
        }}
      >
        ✈
      </motion.div>

      {/* Plane trail */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: `${Math.max(0, px - 8)}%`,
          top: `${py}%`,
          width: "8%",
          height: "1px",
          background: "linear-gradient(to right, transparent, rgba(200,169,110,0.4))",
          transform: "translateY(-50%)",
        }}
      />

      {/* City markers */}
      <div className="absolute" style={{ left: "5%", top: "68%", transform: "translateY(-50%)" }}>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, type: "spring" }}
          className="flex flex-col items-center gap-1"
        >
          <div
            className="w-3 h-3 rounded-full border-2"
            style={{ background: "#C8A96E", borderColor: "#E8D5A0", boxShadow: "0 0 12px rgba(200,169,110,0.8)" }}
          />
          <p className="text-xs font-sans" style={{ color: "rgba(200,169,110,0.8)", letterSpacing: "2px" }}>ZAG</p>
        </motion.div>
      </div>

      <div className="absolute" style={{ right: "5%", top: "68%", transform: "translateY(-50%)" }}>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, type: "spring" }}
          className="flex flex-col items-center gap-1"
        >
          <motion.div
            className="w-3 h-3 rounded-full border-2"
            style={{ background: "#7EB8D8", borderColor: "#B0D8F0", boxShadow: "0 0 12px rgba(126,184,216,0.8)" }}
            animate={{ boxShadow: ["0 0 8px rgba(126,184,216,0.5)", "0 0 20px rgba(126,184,216,0.9)", "0 0 8px rgba(126,184,216,0.5)"] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <p className="text-xs font-sans" style={{ color: "rgba(126,184,216,0.8)", letterSpacing: "2px" }}>LON</p>
        </motion.div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-6 text-center mt-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="flex flex-col items-center gap-6"
        >
          {/* Badge */}
          <motion.div
            className="px-4 py-1.5 rounded-full text-xs tracking-widest uppercase"
            style={{
              background: "rgba(200,169,110,0.1)",
              border: "1px solid rgba(200,169,110,0.3)",
              color: "#C8A96E",
              fontFamily: "DM Sans",
            }}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            ✦ Birthday Gift Experience ✦
          </motion.div>

          {/* Title */}
          <div>
            <motion.h1
              className="font-display font-bold leading-tight"
              style={{
                fontSize: "clamp(2.2rem, 8vw, 4rem)",
                background: "linear-gradient(135deg, #E8D5A0 0%, #C8A96E 40%, #FFF8DC 60%, #C8A96E 80%, #A07830 100%)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "shimmer 4s linear infinite",
              }}
            >
              Luca's London
            </motion.h1>
            <motion.h1
              className="font-display italic font-bold"
              style={{
                fontSize: "clamp(2.2rem, 8vw, 4rem)",
                color: "#D4E8F5",
                WebkitTextFillColor: "#D4E8F5",
              }}
            >
              Adventure
            </motion.h1>
          </div>

          {/* Decorative line */}
          <motion.div
            className="flex items-center gap-3 w-full max-w-xs"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(200,169,110,0.5))" }} />
            <span style={{ color: "#C8A96E", fontSize: 16 }}>✦</span>
            <div className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, rgba(200,169,110,0.5))" }} />
          </motion.div>

          {/* Love note */}
          <motion.p
            className="font-script text-xl"
            style={{ color: "#E8D5A0" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
          >
            S ljubavlju, mama i tata ❤️
          </motion.p>

          {/* Flight info strip */}
          <motion.div
            className="flex gap-4 px-6 py-3 rounded-xl text-xs"
            style={{
              background: "rgba(200,169,110,0.06)",
              border: "1px solid rgba(200,169,110,0.2)",
              fontFamily: "DM Sans",
              color: "rgba(200,169,110,0.7)",
              letterSpacing: "1.5px",
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.1 }}
          >
            <span>ZAG → LON</span>
            <span style={{ color: "rgba(200,169,110,0.3)" }}>·</span>
            <span>GATE 9¾</span>
            <span style={{ color: "rgba(200,169,110,0.3)" }}>·</span>
            <span>22.6.2026</span>
          </motion.div>

          {/* CTA Button */}
          <motion.button
            onClick={onExplore}
            className="relative overflow-hidden px-10 py-4 rounded-full font-sans font-medium tracking-widest text-sm uppercase mt-2"
            style={{
              background: "linear-gradient(135deg, #C8A96E, #A07830)",
              color: "#0A0F1E",
              letterSpacing: "3px",
              boxShadow: "0 8px 32px rgba(200,169,110,0.35), 0 2px 8px rgba(200,169,110,0.2)",
            }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.4, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.05, boxShadow: "0 12px 40px rgba(200,169,110,0.5)" }}
            whileTap={{ scale: 0.97 }}
          >
            <motion.div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)",
                backgroundSize: "200% 100%",
              }}
              animate={{ backgroundPosition: ["-200% center", "200% center"] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
            />
            <span className="relative z-10">✈ Explore the journey</span>
          </motion.button>

          {/* Scroll hint */}
          <motion.p
            className="text-xs mt-2"
            style={{ color: "rgba(200,169,110,0.4)", fontFamily: "DM Sans", letterSpacing: "2px" }}
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Klikni za svoju londonsku avanturu
          </motion.p>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to top, #0A0F1E, transparent)" }}
      />
    </div>
  );
}
