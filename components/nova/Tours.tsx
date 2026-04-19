"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import type { BookingTarget } from "./BookingModal";

interface TourSpec {
  id: string;
  missionId: "orbital" | "moon" | "mars";
  status: string;
  statusColor: string;
  name: string;
  subtitle: string;
  price: string;
  ctaLabel: string;
  specs: Array<{ k: string; v: string }>;
  diagram: React.ReactNode;
}

function OrbitalDiagram() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full">
      <defs>
        <pattern id="g1" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0L0 0 0 20" fill="none" stroke="rgba(140,160,210,0.05)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="400" height="300" fill="url(#g1)" />
      <circle cx="200" cy="260" r="120" fill="#0a1330" stroke="#1a2540" strokeWidth="1" />
      <path d="M 110 240 Q 160 230 210 250 T 290 245" fill="none" stroke="#2b3a68" strokeWidth="0.8" />
      <ellipse cx="200" cy="260" rx="165" ry="45" fill="none" stroke="oklch(0.70 0.18 295)" strokeWidth="1" strokeDasharray="2 3" transform="rotate(-10 200 260)" opacity=".7" />
      <g transform="translate(60 225) rotate(-8)">
        <rect x="-14" y="-3" width="28" height="6" fill="#e7ecf5" />
        <rect x="-24" y="-1" width="10" height="2" fill="oklch(0.70 0.18 295)" />
        <rect x="14" y="-1" width="10" height="2" fill="oklch(0.70 0.18 295)" />
        <rect x="-4" y="-10" width="8" height="7" fill="oklch(0.84 0.13 85)" />
      </g>
      <circle cx="60" cy="225" r="3" fill="oklch(0.70 0.18 295)" />
      <line x1="60" y1="225" x2="60" y2="60" stroke="oklch(0.70 0.18 295)" strokeWidth="0.6" strokeDasharray="1 2" opacity=".5" />
      <text x="66" y="58" fontFamily="JetBrains Mono, monospace" fontSize="8.5" fill="oklch(0.70 0.18 295)">NOVA-STATION</text>
      <text x="66" y="70" fontFamily="JetBrains Mono, monospace" fontSize="7.5" fill="#5a6686">MASS 420t · i=51.6°</text>
      <g fontFamily="JetBrains Mono, monospace" fontSize="7.5" fill="#5a6686">
        <line x1="320" y1="260" x2="380" y2="260" stroke="#2b3a68" strokeWidth="0.5" />
        <line x1="380" y1="260" x2="380" y2="220" stroke="#2b3a68" strokeWidth="0.5" />
        <text x="342" y="275">0 km</text>
        <text x="342" y="215">408 km</text>
      </g>
    </svg>
  );
}

function MoonDiagram() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full">
      <defs>
        <pattern id="g1moon" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0L0 0 0 20" fill="none" stroke="rgba(140,160,210,0.05)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="400" height="300" fill="url(#g1moon)" />
      <circle cx="80" cy="230" r="28" fill="#0a1330" stroke="#1a2540" strokeWidth="1" />
      <circle cx="80" cy="230" r="44" fill="none" stroke="#2b3a68" strokeWidth="0.5" strokeDasharray="1 3" />
      <text x="80" y="282" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="#5a6686">EARTH</text>
      <circle cx="320" cy="90" r="36" fill="#0d1424" stroke="oklch(0.84 0.13 85)" strokeWidth="1" />
      <circle cx="314" cy="86" r="3" fill="oklch(0.84 0.13 85)" opacity=".4" />
      <circle cx="325" cy="95" r="4" fill="oklch(0.84 0.13 85)" opacity=".3" />
      <circle cx="315" cy="100" r="2" fill="oklch(0.84 0.13 85)" opacity=".5" />
      <circle cx="330" cy="80" r="1.5" fill="oklch(0.84 0.13 85)" opacity=".6" />
      <text x="320" y="40" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="8.5" fill="oklch(0.84 0.13 85)">MOON</text>
      <text x="320" y="52" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="7.5" fill="#5a6686">1737 km R</text>
      <path d="M 100 220 Q 200 100 290 100" fill="none" stroke="oklch(0.84 0.13 85)" strokeWidth="1" strokeDasharray="3 3" opacity=".8" />
      <ellipse cx="320" cy="90" rx="56" ry="22" fill="none" stroke="oklch(0.84 0.13 85)" strokeWidth="0.8" strokeDasharray="1 2" opacity=".6" transform="rotate(-15 320 90)" />
      <g transform="translate(180 140) rotate(-40)">
        <polygon points="0,-6 4,4 -4,4" fill="oklch(0.84 0.13 85)" />
        <rect x="-1" y="4" width="2" height="6" fill="oklch(0.84 0.13 85)" />
      </g>
      <text x="190" y="135" fontFamily="JetBrains Mono, monospace" fontSize="7.5" fill="#5a6686">PERSEID-II</text>
      <g fontFamily="JetBrains Mono, monospace" fontSize="7.5" fill="#5a6686">
        <line x1="40" y1="285" x2="360" y2="285" stroke="#2b3a68" strokeWidth="0.5" strokeDasharray="1 2" />
        <text x="200" y="296" textAnchor="middle">DISTANCE 384,400 KM</text>
      </g>
    </svg>
  );
}

function MarsDiagram() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full">
      <defs>
        <pattern id="g1mars" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0L0 0 0 20" fill="none" stroke="rgba(140,160,210,0.05)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="400" height="300" fill="url(#g1mars)" />
      <circle cx="200" cy="150" r="7" fill="oklch(0.84 0.13 85)" />
      <circle cx="200" cy="150" r="14" fill="none" stroke="oklch(0.84 0.13 85)" strokeWidth="0.5" opacity=".4" />
      <text x="200" y="135" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="7.5" fill="#5a6686">SOL</text>
      <circle cx="200" cy="150" r="70" fill="none" stroke="#2b3a68" strokeWidth="0.7" strokeDasharray="1 3" />
      <circle cx="200" cy="150" r="110" fill="none" stroke="oklch(0.72 0.19 25)" strokeWidth="0.7" strokeDasharray="1 3" opacity=".7" />
      <circle cx="270" cy="150" r="5" fill="oklch(0.70 0.18 295)" />
      <text x="280" y="154" fontFamily="JetBrains Mono, monospace" fontSize="7.5" fill="#5a6686">E</text>
      <circle cx="90" cy="150" r="6" fill="oklch(0.72 0.19 25)" />
      <circle cx="90" cy="150" r="12" fill="none" stroke="oklch(0.72 0.19 25)" strokeWidth="0.5" opacity=".3" />
      <text x="78" y="140" fontFamily="JetBrains Mono, monospace" fontSize="7.5" fill="oklch(0.72 0.19 25)">MARS</text>
      <path d="M 270 150 A 90 48 0 0 1 90 150" fill="none" stroke="oklch(0.72 0.19 25)" strokeWidth="1" strokeDasharray="3 3" />
      <circle cx="180" cy="102" r="2" fill="oklch(0.72 0.19 25)" />
      <text x="186" y="100" fontFamily="JetBrains Mono, monospace" fontSize="7" fill="#5a6686">T+105d · CRUISE</text>
      <g fontFamily="JetBrains Mono, monospace" fontSize="7.5" fill="#5a6686">
        <text x="20" y="22">HELIOCENTRIC · ECLIPTIC FRAME</text>
        <text x="20" y="285">TRANSFER Δt=210d · ΔV=5.6 km/s</text>
      </g>
    </svg>
  );
}

const TOURS: TourSpec[] = [
  {
    id: "M-01 / ORBITAL-1",
    missionId: "orbital",
    status: "OPEN · 4 seats",
    statusColor: "var(--accent)",
    name: "Орбитальная станция",
    subtitle: "7 суток на борту Nova-Station LEO",
    price: "USD 28 000 000",
    ctaLabel: "Бронь",
    specs: [
      { k: "Продолж.", v: "7 суток" },
      { k: "Высота", v: "408 км" },
      { k: "ΔV", v: "9.4 км/с" },
      { k: "g-нагрузка", v: "3.2 G max" },
      { k: "Подготовка", v: "6 мес." },
      { k: "Экипаж", v: "2+4" },
    ],
    diagram: <OrbitalDiagram />,
  },
  {
    id: "M-02 / MOON-3",
    missionId: "moon",
    status: "WAITLIST · 2 seats",
    statusColor: "var(--gold)",
    name: "Облёт Moon",
    subtitle: "Свободный возврат по траектории фон Брауна",
    price: "USD 78 500 000",
    ctaLabel: "Бронь",
    specs: [
      { k: "Продолж.", v: "11 суток" },
      { k: "Периселений", v: "110 км" },
      { k: "ΔV миссии", v: "14.1 км/с" },
      { k: "g-нагрузка", v: "4.8 G max" },
      { k: "Подготовка", v: "9 мес." },
      { k: "Экипаж", v: "2+2" },
    ],
    diagram: <MoonDiagram />,
  },
  {
    id: "M-03 / MARS-1",
    missionId: "mars",
    status: "SELECT · 0 seats",
    statusColor: "var(--danger)",
    name: "Марсианский цикл",
    subtitle: "Флайбай + 14 суток на орбите Марса",
    price: "USD 310 000 000",
    ctaLabel: "Подать заявку",
    specs: [
      { k: "Продолж.", v: "510 суток" },
      { k: "Перицентр", v: "400 км" },
      { k: "ΔV миссии", v: "20.8 км/с" },
      { k: "g-нагрузка", v: "5.6 G max" },
      { k: "Подготовка", v: "24 мес." },
      { k: "Экипаж", v: "3+3" },
    ],
    diagram: <MarsDiagram />,
  },
];

interface ToursProps {
  onBook: (target: BookingTarget) => void;
}

function Countdown() {
  const TARGET = new Date("2026-05-30T04:17:22Z").getTime();
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });

  const tick = useCallback(() => {
    const diff = Math.max(0, TARGET - Date.now());
    setTime({
      d: Math.floor(diff / 86400000),
      h: Math.floor(diff / 3600000) % 24,
      m: Math.floor(diff / 60000) % 60,
      s: Math.floor(diff / 1000) % 60,
    });
  }, [TARGET]);

  useEffect(() => {
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [tick]);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div
      className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-6 mt-12"
      style={{ border: "1px solid var(--line)", background: "rgba(13,20,36,0.4)" }}
    >
      <div>
        <span className="mono-sm block mb-1.5" style={{ color: "var(--accent)" }}>◆ Следующий запуск</span>
        <div style={{ fontFamily: "var(--ff-mono)", fontSize: 12, color: "var(--ink-dim)", letterSpacing: "0.04em" }}>
          ORBITAL-1 · Baikonur LC-31 · 2026/05/30 04:17:22 UTC
        </div>
      </div>
      <div className="flex gap-4">
        {[
          { v: time.d, k: "дней" },
          { v: time.h, k: "часов" },
          { v: time.m, k: "минут" },
          { v: time.s, k: "секунд" },
        ].map(({ v, k }) => (
          <div key={k} className="text-center">
            <div
              className="text-3xl font-medium tabular-nums"
              style={{ fontFamily: "var(--ff-mono)", color: "var(--ink)", letterSpacing: "-0.02em" }}
            >
              {pad(v)}
            </div>
            <div className="mono-sm mt-1">{k}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Tours({ onBook }: ToursProps) {
  return (
    <section id="tours" className="wrap" style={{ padding: "120px 0", borderBottom: "1px solid var(--line-soft)" }}>
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-[180px_1fr_auto] gap-12 items-end pb-10 mb-14"
        style={{ borderBottom: "1px dashed var(--line)" }}
      >
        <div style={{ fontFamily: "var(--ff-mono)", fontSize: 12, color: "var(--accent)" }}>
          MISSION // <span style={{ color: "var(--ink-mute)" }}>01 / 05</span>
        </div>
        <div>
          <h2
            style={{
              fontFamily: "var(--ff-display)",
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            Три экспедиции
            <br />
            <span style={{ fontWeight: 300, color: "var(--ink-dim)" }}>
              с подтверждённым окном в 2026–2028
            </span>
          </h2>
        </div>
        <div className="mono-sm text-right">
          Каталог M-2026.2
          <br />
          Обновлён 2026/04/19
        </div>
      </motion.div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0" style={{ border: "1px solid var(--line)" }}>
        {TOURS.map((tour, idx) => (
          <motion.article
            key={tour.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="flex flex-col"
            style={{
              borderRight: idx < TOURS.length - 1 ? "1px solid var(--line)" : "none",
              background: "rgba(13,20,36,0.3)",
            }}
          >
            {/* Top badge */}
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{ borderBottom: "1px solid var(--line)" }}
            >
              <span style={{ fontFamily: "var(--ff-mono)", fontSize: 10, color: "var(--ink-mute)", letterSpacing: "0.06em" }}>
                {tour.id}
              </span>
              <span style={{ fontFamily: "var(--ff-mono)", fontSize: 10, color: tour.statusColor, letterSpacing: "0.06em" }}>
                {tour.status}
              </span>
            </div>

            {/* Diagram */}
            <div
              className="relative"
              style={{ aspectRatio: "4/3", padding: "8px", borderBottom: "1px solid var(--line)" }}
            >
              <span
                className="absolute mono-sm px-1"
                style={{ bottom: 8, left: 12, color: "var(--ink-mute)" }}
              >
                T+0
              </span>
              <span
                className="absolute mono-sm px-1"
                style={{ bottom: 8, right: 12, color: "var(--ink-mute)" }}
              >
                RETURN
              </span>
              {tour.diagram}
            </div>

            {/* Body */}
            <div className="flex flex-col flex-1 p-6 gap-5">
              <div>
                <div
                  style={{
                    fontFamily: "var(--ff-display)",
                    fontSize: 20,
                    fontWeight: 500,
                    color: "var(--ink)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {tour.name}
                </div>
                <div style={{ fontFamily: "var(--ff-mono)", fontSize: 10.5, color: "var(--ink-mute)", marginTop: 4, letterSpacing: "0.04em" }}>
                  {tour.subtitle}
                </div>
              </div>

              {/* Specs grid */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                {tour.specs.map((s) => (
                  <div key={s.k}>
                    <div style={{ fontFamily: "var(--ff-mono)", fontSize: 9.5, color: "var(--ink-mute)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                      {s.k}
                    </div>
                    <div style={{ fontFamily: "var(--ff-mono)", fontSize: 13, color: "var(--ink)", marginTop: 2 }}>
                      {s.v}
                    </div>
                  </div>
                ))}
              </div>

              {/* Price */}
              <div className="mt-auto">
                <div style={{ fontFamily: "var(--ff-mono)", fontSize: 11, color: "var(--ink-mute)", textTransform: "uppercase", marginBottom: 4 }}>
                  Стоимость
                </div>
                <div style={{ fontFamily: "var(--ff-display)", fontSize: 22, fontWeight: 500, color: "var(--ink)" }}>
                  <span style={{ fontSize: 12, color: "var(--ink-mute)", marginRight: 4 }}>USD</span>
                  {tour.price.replace("USD ", "")}
                  <span style={{ fontFamily: "var(--ff-mono)", fontSize: 10.5, color: "var(--ink-mute)", marginLeft: 4 }}>/ за место</span>
                </div>
              </div>

              {/* CTA */}
              <div className="flex gap-2">
                <button
                  onClick={() => onBook({ type: "spec", missionId: tour.missionId })}
                  className="flex-1 py-2.5 transition-all duration-200"
                  style={{
                    fontFamily: "var(--ff-mono)",
                    fontSize: 10,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    background: "transparent",
                    border: "1px solid var(--line)",
                    color: "var(--ink)",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--line)"; e.currentTarget.style.color = "var(--ink)"; }}
                >
                  Спецификация
                </button>
                <button
                  onClick={() => onBook({ type: "book", missionId: tour.missionId })}
                  className="flex-1 py-2.5 font-semibold transition-all duration-200"
                  style={{
                    fontFamily: "var(--ff-mono)",
                    fontSize: 10,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    background: "var(--accent)",
                    border: "1px solid var(--accent)",
                    color: "var(--void)",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--accent)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "var(--accent)"; e.currentTarget.style.color = "var(--void)"; }}
                >
                  {tour.ctaLabel} →
                </button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <Countdown />
    </section>
  );
}
