"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const TICKER_ITEMS = [
  "Окно MOON-3 откроется 2026/11/02",
  "Сертификация FAA § 460.45 — активна",
  "MARS-1 предварительный отбор до 2026/12/31",
  "Страховое покрытие до $50M на участника",
  "Training cohort GA-6/34 · набор",
];

const HUD_DATA = [
  {
    label: "◆ Nearest window",
    value: "T-minus 41d 17:22:09",
    sub: "LEO-7 / Baikonur LC-31",
  },
  {
    label: "◆ Manifest",
    value: "312 / 340 seats",
    sub: "across 9 scheduled missions",
  },
  {
    label: "◆ Active vessels",
    value: "4 online · 1 refit",
    sub: "Cygnus-II · Perseid · Pallas · Artemis-R",
  },
];

function TrajectoryDiagram() {
  return (
    <div
      className="schema-box relative aspect-square p-5 hidden md:block"
      style={{ minHeight: 360 }}
    >
      {/* bottom-right corner decoration */}
      <span
        className="absolute bottom-0 right-0 w-3.5 h-3.5"
        style={{
          borderLeft: "1px solid var(--accent)",
          borderTop: "1px solid var(--accent)",
          transform: "translate(0, 0) rotate(180deg)",
        }}
      />
      <span
        className="absolute bottom-0 left-0 w-3.5 h-3.5"
        style={{ borderRight: "1px solid var(--accent)", borderTop: "1px solid var(--accent)", transform: "rotate(-90deg)" }}
      />

      <span
        className="absolute mono-sm px-2.5"
        style={{
          top: -1,
          left: 24,
          transform: "translateY(-50%)",
          background: "var(--void)",
          color: "var(--accent)",
        }}
      >
        FIG.01 · TRAJECTORY PLOT
      </span>
      <span
        className="absolute mono-sm px-2.5"
        style={{
          bottom: -1,
          right: 24,
          transform: "translateY(50%)",
          background: "var(--void)",
          color: "var(--ink-mute)",
        }}
      >
        SCALE 1:∞ · EPOCH J2029.0
      </span>

      <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <radialGradient id="earthG" cx="0.4" cy="0.35">
            <stop offset="0%" stopColor="#1f3060" />
            <stop offset="60%" stopColor="#0d1a3a" />
            <stop offset="100%" stopColor="#05070d" />
          </radialGradient>
          <radialGradient id="accentG">
            <stop offset="0%" stopColor="oklch(0.70 0.18 295)" stopOpacity=".4" />
            <stop offset="100%" stopColor="oklch(0.70 0.18 295)" stopOpacity="0" />
          </radialGradient>
          <pattern id="heroGrid" width="25" height="25" patternUnits="userSpaceOnUse">
            <path d="M 25 0 L 0 0 0 25" fill="none" stroke="rgba(140,160,210,0.05)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="500" height="500" fill="url(#heroGrid)" />
        <circle cx="250" cy="250" r="220" fill="none" stroke="#1a2540" strokeWidth="1" strokeDasharray="2 4" />
        <circle cx="250" cy="250" r="60" fill="url(#earthG)" stroke="oklch(0.70 0.18 295)" strokeWidth="0.8" strokeOpacity=".5" />
        <circle cx="250" cy="250" r="75" fill="url(#accentG)" opacity=".5" />
        <path d="M 210 240 Q 230 230 250 245 T 290 238" fill="none" stroke="#2b3a68" strokeWidth="0.8" opacity=".7" />
        <path d="M 215 260 Q 240 258 265 268 T 285 265" fill="none" stroke="#2b3a68" strokeWidth="0.8" opacity=".7" />
        <ellipse cx="250" cy="250" rx="110" ry="40" fill="none" stroke="oklch(0.70 0.18 295)" strokeWidth="1" strokeDasharray="1 3" transform="rotate(-18 250 250)" />
        <circle cx="345" cy="215" r="3" fill="oklch(0.70 0.18 295)" />
        <text x="352" y="212" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="oklch(0.70 0.18 295)">ORBITAL-1</text>
        <text x="352" y="222" fontFamily="JetBrains Mono, monospace" fontSize="7.5" fill="#5a6686">408 km · i=51.6°</text>
        <path d="M 250 250 Q 380 120 450 90" fill="none" stroke="oklch(0.84 0.13 85)" strokeWidth="0.9" strokeDasharray="3 3" />
        <circle cx="450" cy="90" r="14" fill="#0d1424" stroke="oklch(0.84 0.13 85)" strokeWidth="1" />
        <circle cx="446" cy="88" r="2" fill="oklch(0.84 0.13 85)" opacity=".5" />
        <circle cx="453" cy="93" r="1.5" fill="oklch(0.84 0.13 85)" opacity=".6" />
        <text x="420" y="70" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="oklch(0.84 0.13 85)">MOON-3</text>
        <text x="410" y="82" fontFamily="JetBrains Mono, monospace" fontSize="7.5" fill="#5a6686">384,400 km</text>
        <path d="M 250 250 Q 120 380 60 440" fill="none" stroke="oklch(0.72 0.19 25)" strokeWidth="0.9" strokeDasharray="4 4" />
        <circle cx="60" cy="440" r="10" fill="#0d1424" stroke="oklch(0.72 0.19 25)" strokeWidth="1" />
        <text x="76" y="435" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="oklch(0.72 0.19 25)">MARS-1</text>
        <text x="76" y="447" fontFamily="JetBrains Mono, monospace" fontSize="7.5" fill="#5a6686">Hohmann · ~210d</text>
        <g stroke="#2b3a68" strokeWidth="0.5">
          <line x1="0" y1="250" x2="500" y2="250" strokeDasharray="1 6" />
          <line x1="250" y1="0" x2="250" y2="500" strokeDasharray="1 6" />
        </g>
        <g fill="none" stroke="oklch(0.70 0.18 295)" strokeWidth="1">
          <path d="M 16 26 L 16 16 L 26 16" />
          <path d="M 484 26 L 484 16 L 474 16" />
          <path d="M 16 474 L 16 484 L 26 484" />
          <path d="M 484 474 L 484 484 L 474 484" />
        </g>
        <text x="20" y="40" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="#5a6686">BX-0001 · 500×500</text>
        <text x="20" y="488" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="#5a6686">Φ=45.90°N · Λ=63.31°E</text>
      </svg>
    </div>
  );
}

export default function Hero() {
  const tickerRef = useRef<HTMLDivElement>(null);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 64, behavior: "smooth" });
  };

  return (
    <section
      className="wrap relative"
      style={{ padding: "72px 0 48px", borderBottom: "1px solid var(--line-soft)" }}
    >
      {/* HUD bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-0 pb-10 mb-14"
        style={{ borderBottom: "1px dashed var(--line)" }}
      >
        {HUD_DATA.map((cell, i) => (
          <div
            key={i}
            className="px-6 first:pl-0 first:border-l-0"
            style={{ borderLeft: i === 0 ? "none" : "1px dashed var(--line)" }}
          >
            <span className="mono-sm block mb-2" style={{ color: "var(--accent)" }}>
              {cell.label}
            </span>
            <div
              className="text-lg"
              style={{ fontFamily: "var(--ff-mono)", color: "var(--ink)", letterSpacing: "-0.01em" }}
            >
              {cell.value}
            </div>
            <div className="mono-sm mt-1">{cell.sub}</div>
          </div>
        ))}
      </motion.div>

      {/* Main grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-0px items-center">
        {/* Left */}
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mono mb-7 flex items-center gap-2"
          >
            <span
              className="inline-block w-1.5 h-1.5"
              style={{ background: "var(--accent)", boxShadow: "0 0 8px var(--accent)" }}
            />
            Mission brief · 2026/04 — 2027/11 window
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="leading-none"
            style={{
              fontFamily: "var(--ff-display)",
              fontSize: "clamp(44px, 6.8vw, 96px)",
              fontWeight: 400,
              letterSpacing: "-0.035em",
              lineHeight: 0.96,
            }}
          >
            Частные
            <br />
            экспедиции
            <br />
            <span style={{ fontStyle: "italic", fontWeight: 300, color: "var(--ink-dim)" }}>за пределы</span>
            <br />
            <span style={{ color: "var(--accent)" }}>низкой орбиты.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="my-7"
            style={{ maxWidth: 460, fontSize: 16, color: "var(--ink-dim)", lineHeight: 1.6 }}
          >
            Nova Astro — операционный интегратор сертифицированных экипажных полётов для частных клиентов. Три маршрута, шесть стартовых окон в год, медицинская и центрифужная подготовка в собственном центре Gagarin-6.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex gap-3.5 flex-wrap"
          >
            <button
              onClick={() => scrollTo("#tours")}
              className="flex items-center gap-2.5 px-4 py-2.5 font-semibold transition-all duration-200 group"
              style={{
                fontFamily: "var(--ff-mono)",
                fontSize: 11,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                background: "var(--accent)",
                border: "1px solid var(--accent)",
                color: "var(--void)",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--accent)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "var(--accent)"; e.currentTarget.style.color = "var(--void)"; }}
            >
              Открыть манифест миссий <span>→</span>
            </button>
            <button
              onClick={() => scrollTo("#about")}
              className="flex items-center gap-2.5 px-4 py-2.5 transition-all duration-200"
              style={{
                fontFamily: "var(--ff-mono)",
                fontSize: 11,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                background: "transparent",
                border: "1px solid var(--line)",
                color: "var(--ink)",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--line)"; e.currentTarget.style.color = "var(--ink)"; }}
            >
              Технический брифинг
            </button>
          </motion.div>

          {/* Alert ticker */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="flex items-center gap-6 mt-10 overflow-hidden"
            style={{
              paddingTop: 14,
              paddingBottom: 14,
              borderTop: "1px dashed var(--line)",
              borderBottom: "1px dashed var(--line)",
            }}
          >
            <span
              className="mono flex items-center gap-2.5 shrink-0"
              style={{ color: "var(--gold)" }}
            >
              <span
                className="inline-block w-2.5 h-2.5 rounded-full"
                style={{
                  border: "2px solid var(--gold)",
                  boxShadow: "0 0 10px var(--gold)",
                }}
              />
              ADVISORY
            </span>
            <div className="flex-1 overflow-hidden">
              <div
                ref={tickerRef}
                className="ticker-track flex gap-12 whitespace-nowrap"
                style={{
                  fontFamily: "var(--ff-mono)",
                  fontSize: 11,
                  letterSpacing: "0.06em",
                  color: "var(--ink-dim)",
                  textTransform: "uppercase",
                }}
              >
                {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
                  <span key={i}>
                    <span style={{ color: "var(--accent)", marginRight: 14, fontSize: 8 }}>◆</span>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right: trajectory diagram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <TrajectoryDiagram />
        </motion.div>
      </div>
    </section>
  );
}
