import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const steps = [
  "Inicijalizacija putovanja...",
  "Provjera rezervacije...",
  "Potvrda Gate 9¾...",
  "Učitavanje Londona...",
  "Dobrodošla, Luca! ✨",
];

export default function LoadingScreen({ onDone }) {
  const [step, setStep] = useState(0);
  const [scanDone, setScanDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      if (i < steps.length) {
        setStep(i);
      } else {
        setScanDone(true);
        clearInterval(interval);
        setTimeout(onDone, 900);
      }
    }, 520);
    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ background: "#0A0F1E" }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Scan lines effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute left-0 right-0 h-0.5 opacity-20"
          style={{ background: "linear-gradient(90deg, transparent, #C8A96E, transparent)" }}
          animate={{ y: ["-10vh", "110vh"] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute left-0 right-0 h-px opacity-10"
          style={{ background: "linear-gradient(90deg, transparent, #7EB8D8, transparent)" }}
          animate={{ y: ["110vh", "-10vh"] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "linear", delay: 1.2 }}
        />
      </div>

      {/* Corner brackets */}
      {[
        "top-8 left-8 border-t border-l",
        "top-8 right-8 border-t border-r",
        "bottom-8 left-8 border-b border-l",
        "bottom-8 right-8 border-b border-r",
      ].map((cls, i) => (
        <motion.div
          key={i}
          className={`fixed w-10 h-10 ${cls}`}
          style={{ borderColor: "rgba(200,169,110,0.4)" }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 + 0.2 }}
        />
      ))}

      <div className="relative z-10 flex flex-col items-center gap-8 px-8 text-center max-w-sm">
        {/* Logo / brand */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col items-center gap-2"
        >
          <div
            className="text-4xl mb-1"
            style={{ filter: "drop-shadow(0 0 12px rgba(200,169,110,0.6))" }}
          >
            ✈
          </div>
          <p
            className="text-xs tracking-[4px] uppercase"
            style={{ color: "rgba(200,169,110,0.6)", fontFamily: "DM Sans" }}
          >
            Magic Airways
          </p>
        </motion.div>

        {/* Boarding pass card scan */}
        <motion.div
          className="w-64 h-36 rounded-xl relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          style={{
            background: "rgba(200,169,110,0.07)",
            border: "1px solid rgba(200,169,110,0.3)",
          }}
        >
          {/* Scan laser */}
          <motion.div
            className="absolute left-0 right-0 h-0.5"
            style={{ background: "linear-gradient(90deg, transparent, #C8A96E, transparent)" }}
            animate={{ y: [0, 144, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4">
            <p className="font-display text-champagne text-lg font-bold tracking-widest" style={{ color: "#C8A96E" }}>
              LUCA JURAS
            </p>
            <div className="flex gap-4 text-xs" style={{ color: "rgba(200,169,110,0.6)", fontFamily: "DM Sans" }}>
              <span>ZAG → LON</span>
              <span>Gate 9¾</span>
              <span>H23</span>
            </div>
            <div className="flex gap-1 mt-2">
              {Array.from({ length: 22 }).map((_, i) => (
                <div
                  key={i}
                  className="w-0.5 rounded-full"
                  style={{
                    height: i % 3 === 0 ? 20 : i % 2 === 0 ? 14 : 18,
                    background: "rgba(200,169,110,0.5)",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Scan success flash */}
          <AnimatePresence>
            {scanDone && (
              <motion.div
                className="absolute inset-0 rounded-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.3, 0] }}
                transition={{ duration: 0.6 }}
                style={{ background: "#C8A96E" }}
              />
            )}
          </AnimatePresence>
        </motion.div>

        {/* Status text */}
        <div className="space-y-1 h-12">
          <AnimatePresence mode="wait">
            <motion.p
              key={step}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="text-sm"
              style={{ color: "#C8A96E", fontFamily: "DM Sans", letterSpacing: "2px" }}
            >
              {steps[step]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Progress dots */}
        <div className="flex gap-2">
          {steps.map((_, i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: i <= step ? "#C8A96E" : "rgba(200,169,110,0.2)",
              }}
              animate={{ scale: i === step ? [1, 1.4, 1] : 1 }}
              transition={{ duration: 0.4 }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
