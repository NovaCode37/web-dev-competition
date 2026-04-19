"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const steps = [12, 28, 45, 61, 78, 90, 96, 100];
    let i = 0;
    const iv = setInterval(() => {
      if (i < steps.length) {
        setProgress(steps[i]);
        i++;
      } else {
        clearInterval(iv);
      }
    }, 180);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 400);
    const t2 = setTimeout(() => setPhase(2), 1000);
    const t3 = setTimeout(() => setPhase(3), 1800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  useEffect(() => {
    if (progress >= 100 && phase >= 3) {
      const t = setTimeout(onDone, 600);
      return () => clearTimeout(t);
    }
  }, [progress, phase, onDone]);

  return (
    <AnimatePresence>
      <motion.div
        key="preloader"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
        style={{ background: "var(--void)" }}
      >
        <div className="preloader-scanline" />

        <div className="relative flex items-center justify-center" style={{ width: 160, height: 160 }}>
          <svg viewBox="0 0 160 160" className="absolute inset-0 w-full h-full preloader-orbit">
            <circle cx="80" cy="80" r="70" fill="none" stroke="var(--line)" strokeWidth="0.5" />
            <circle cx="80" cy="80" r="70" fill="none" stroke="var(--accent)" strokeWidth="1"
              strokeDasharray="440" strokeDashoffset={440 - (440 * progress) / 100}
              strokeLinecap="round" style={{ transition: "stroke-dashoffset 0.3s ease" }}
            />
            <circle cx="80" cy="10" r="2.5" fill="var(--accent)" className="preloader-dot" />
          </svg>

          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: phase >= 1 ? 1 : 0, opacity: phase >= 1 ? 1 : 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <svg viewBox="0 0 60 60" width="48" height="48">
              <polygon points="30,6 54,50 6,50" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
              <circle cx="30" cy="36" r="4" fill="var(--accent)" opacity="0.7" />
            </svg>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: phase >= 1 ? 1 : 0, y: phase >= 1 ? 0 : 10 }}
          transition={{ duration: 0.4 }}
          className="mt-8 text-center"
        >
          <div style={{
            fontFamily: "var(--ff-display)",
            fontSize: 22,
            fontWeight: 500,
            letterSpacing: "0.15em",
            color: "var(--ink)",
          }}>
            NOVA ASTRO
          </div>
          <div style={{
            fontFamily: "var(--ff-mono)",
            fontSize: 10,
            letterSpacing: "0.12em",
            color: "var(--ink-mute)",
            marginTop: 6,
          }}>
            ORBITAL · LUNAR · INTERPLANETARY
          </div>
        </motion.div>

        <div className="mt-10" style={{ width: 200 }}>
          <div className="flex justify-between mb-2" style={{
            fontFamily: "var(--ff-mono)", fontSize: 9, letterSpacing: "0.1em", color: "var(--ink-mute)",
          }}>
            <span>SYSTEM INIT</span>
            <span>{progress}%</span>
          </div>
          <div style={{ height: 1, background: "var(--line)", position: "relative" }}>
            <motion.div
              style={{
                height: "100%",
                background: "var(--accent)",
                boxShadow: "0 0 12px var(--accent)",
                width: `${progress}%`,
              }}
              transition={{ duration: 0.2 }}
            />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: phase >= 2 ? 0.5 : 0 }}
          transition={{ duration: 0.3 }}
          className="mt-6 flex flex-col items-center gap-1"
          style={{ fontFamily: "var(--ff-mono)", fontSize: 9, letterSpacing: "0.06em", color: "var(--ink-mute)" }}
        >
          <span>TELEMETRY LINK .......... OK</span>
          {phase >= 3 && <span>NAV SOLUTION ........... LOCKED</span>}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
