import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LoadingScreen from "./components/LoadingScreen";
import HeroScreen from "./components/HeroScreen";
import MapScreen from "./components/MapScreen";
import Particles from "./components/Particles";

export default function App() {
  const [phase, setPhase] = useState("loading"); // loading | hero | map

  const handleLoadingDone = useCallback(() => {
    setPhase("hero");
  }, []);

  const handleExplore = useCallback(() => {
    setPhase("map");
  }, []);

  return (
    <div className="relative min-h-screen" style={{ background: "#0A0F1E" }}>
      {/* Global particles - visible on hero + map */}
      {phase !== "loading" && (
        <Particles count={50} color="#C8A96E" />
      )}

      <AnimatePresence mode="wait">
        {phase === "loading" && (
          <motion.div key="loading" exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
            <LoadingScreen onDone={handleLoadingDone} />
          </motion.div>
        )}

        {phase === "hero" && (
          <motion.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.8 }}
          >
            <HeroScreen onExplore={handleExplore} />
          </motion.div>
        )}

        {phase === "map" && (
          <motion.div
            key="map"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <MapScreen />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
