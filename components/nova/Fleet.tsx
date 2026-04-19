"use client";

import { motion } from "framer-motion";

interface Vessel {
  id: string;
  name: string;
  sub: string;
  status: string;
  statusColor: string;
  tag: string;
  crew: string;
  mass: string;
  missions: string;
  diagram: React.ReactNode;
}

const CygnusDiagram = () => (
  <svg viewBox="0 0 200 100" className="w-full h-full">
    <g fill="none" stroke="currentColor" strokeWidth="1" style={{ color: "var(--ink-dim)" }}>
      <path d="M 20 50 L 60 50 L 70 40 L 140 40 L 150 50 L 180 50" />
      <path d="M 20 50 L 60 50 L 70 60 L 140 60 L 150 50 L 180 50" />
      <line x1="75" y1="40" x2="75" y2="60" />
      <line x1="110" y1="40" x2="110" y2="60" />
      <rect x="180" y="46" width="8" height="8" />
      <path d="M 180 50 L 195 40 M 180 50 L 195 60" />
    </g>
    <circle cx="90" cy="50" r="2" fill="var(--accent)" />
    <circle cx="125" cy="50" r="2" fill="var(--accent)" />
  </svg>
);

const PerseidDiagram = () => (
  <svg viewBox="0 0 200 100" className="w-full h-full">
    <g fill="none" stroke="currentColor" strokeWidth="1" style={{ color: "var(--ink-dim)" }}>
      <polygon points="40,50 80,30 140,30 170,50 140,70 80,70" />
      <line x1="80" y1="30" x2="80" y2="70" />
      <line x1="140" y1="30" x2="140" y2="70" />
      <path d="M 20 50 L 40 50 M 170 50 L 190 50" />
      <rect x="88" y="44" width="14" height="12" />
    </g>
    <circle cx="110" cy="50" r="2.5" fill="var(--accent)" />
  </svg>
);

const PallasDiagram = () => (
  <svg viewBox="0 0 200 100" className="w-full h-full">
    <g fill="none" stroke="currentColor" strokeWidth="1" style={{ color: "var(--ink-dim)" }}>
      <circle cx="100" cy="50" r="24" />
      <circle cx="100" cy="50" r="16" />
      <line x1="60" y1="50" x2="76" y2="50" />
      <line x1="124" y1="50" x2="140" y2="50" />
      <line x1="100" y1="20" x2="100" y2="30" />
      <line x1="100" y1="70" x2="100" y2="80" />
      <path d="M 30 50 L 60 50 M 140 50 L 170 50" />
    </g>
    <circle cx="100" cy="50" r="3" fill="var(--accent)" />
  </svg>
);

const StationDiagram = () => (
  <svg viewBox="0 0 200 100" className="w-full h-full">
    <g fill="none" stroke="currentColor" strokeWidth="1" style={{ color: "var(--ink-dim)" }}>
      <rect x="40" y="46" width="120" height="8" />
      <rect x="20" y="48" width="20" height="4" />
      <rect x="160" y="48" width="20" height="4" />
      <rect x="70" y="30" width="14" height="16" />
      <rect x="116" y="30" width="14" height="16" />
      <rect x="70" y="54" width="14" height="16" />
      <rect x="116" y="54" width="14" height="16" />
      <line x1="100" y1="30" x2="100" y2="70" />
    </g>
    <circle cx="100" cy="50" r="2.5" fill="var(--accent)" />
  </svg>
);

const VESSELS: Vessel[] = [
  {
    id: "VSL-001 / CYGNUS-II",
    name: "Cygnus-II",
    sub: "Crew capsule · LEO",
    status: "ACTIVE",
    statusColor: "var(--accent)",
    tag: "ELEV / SIDE",
    crew: "6",
    mass: "14.8 t",
    missions: "23",
    diagram: <CygnusDiagram />,
  },
  {
    id: "VSL-002 / PERSEID",
    name: "Perseid-II",
    sub: "Deep-space crew · Lunar",
    status: "ACTIVE",
    statusColor: "var(--accent)",
    tag: "PLAN / ISO",
    crew: "4",
    mass: "22.1 t",
    missions: "9",
    diagram: <PerseidDiagram />,
  },
  {
    id: "VSL-003 / PALLAS",
    name: "Pallas",
    sub: "Interplanetary transit",
    status: "REFIT · Q3/26",
    statusColor: "var(--gold)",
    tag: "ELEV / FRONT",
    crew: "6",
    mass: "84 t",
    missions: "2",
    diagram: <PallasDiagram />,
  },
  {
    id: "STN-001 / NOVA-LEO",
    name: "Nova-Station",
    sub: "Orbital habitat · 408 km",
    status: "ACTIVE",
    statusColor: "var(--accent)",
    tag: "PLAN / TOP",
    crew: "12",
    mass: "420 t",
    missions: "7 modules",
    diagram: <StationDiagram />,
  },
];

export default function Fleet() {
  return (
    <section id="fleet" className="wrap" style={{ padding: "120px 0", borderBottom: "1px solid var(--line-soft)" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-[180px_1fr_auto] gap-12 items-end pb-10 mb-14"
        style={{ borderBottom: "1px dashed var(--line)" }}
      >
        <div style={{ fontFamily: "var(--ff-mono)", fontSize: 12, color: "var(--accent)" }}>
          FLEET // <span style={{ color: "var(--ink-mute)" }}>02 / 05</span>
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
            Флот
            <br />
            <span style={{ fontWeight: 300, color: "var(--ink-dim)" }}>
              сертифицированные аппараты и несущие станции
            </span>
          </h2>
        </div>
        <div className="mono-sm text-right">
          5 vessels · 1 station
          <br />
          Last audit 2026/03/14
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0" style={{ border: "1px solid var(--line)" }}>
        {VESSELS.map((v, idx) => (
          <motion.div
            key={v.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="flex flex-col p-5 gap-4"
            style={{
              borderRight: idx < VESSELS.length - 1 ? "1px solid var(--line)" : "none",
              background: "rgba(13,20,36,0.2)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <span style={{ fontFamily: "var(--ff-mono)", fontSize: 9.5, color: "var(--ink-mute)", letterSpacing: "0.06em" }}>
                {v.id}
              </span>
              <span style={{ fontFamily: "var(--ff-mono)", fontSize: 9.5, color: v.statusColor, letterSpacing: "0.06em" }}>
                {v.status}
              </span>
            </div>

            {/* Diagram box */}
            <div
              className="relative"
              style={{
                border: "1px solid var(--line)",
                padding: "12px 10px",
                background: "rgba(5,7,13,0.4)",
                aspectRatio: "2/1",
              }}
            >
              {/* Corner brackets */}
              <span className="absolute top-0 left-0 w-2.5 h-2.5" style={{ borderTop: "1px solid var(--accent)", borderLeft: "1px solid var(--accent)" }} />
              <span className="absolute top-0 right-0 w-2.5 h-2.5" style={{ borderTop: "1px solid var(--accent)", borderRight: "1px solid var(--accent)" }} />
              <span className="absolute bottom-0 left-0 w-2.5 h-2.5" style={{ borderBottom: "1px solid var(--accent)", borderLeft: "1px solid var(--accent)" }} />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5" style={{ borderBottom: "1px solid var(--accent)", borderRight: "1px solid var(--accent)" }} />
              <span
                className="absolute mono-sm px-1"
                style={{ top: 4, left: 8, fontSize: 9, color: "var(--ink-mute)" }}
              >
                {v.tag}
              </span>
              <div className="w-full h-full flex items-center">
                {v.diagram}
              </div>
            </div>

            {/* Name */}
            <div>
              <div style={{ fontFamily: "var(--ff-display)", fontSize: 17, fontWeight: 500, color: "var(--ink)" }}>
                {v.name}
              </div>
              <div style={{ fontFamily: "var(--ff-mono)", fontSize: 10, color: "var(--ink-mute)", letterSpacing: "0.04em", marginTop: 3 }}>
                {v.sub}
              </div>
            </div>

            {/* KV */}
            <div
              className="grid grid-cols-3 gap-x-2 pt-4"
              style={{ borderTop: "1px solid var(--line-soft)" }}
            >
              {[
                { k: v.id.startsWith("STN") ? "Capacity" : "Crew", val: v.crew },
                { k: "Mass", val: v.mass },
                { k: v.id.startsWith("STN") ? "Modules" : "Missions", val: v.missions },
              ].map(({ k, val }) => (
                <div key={k}>
                  <div style={{ fontFamily: "var(--ff-mono)", fontSize: 9, color: "var(--ink-mute)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                    {k}
                  </div>
                  <div style={{ fontFamily: "var(--ff-mono)", fontSize: 13, color: "var(--ink)", marginTop: 2 }}>
                    {val}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
