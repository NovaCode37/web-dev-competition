"use client";

import { motion } from "framer-motion";

const STATS = [
  { label: "◆ Flights",     value: "47",  unit: "msn", desc: "с 2031 по 04/2026" },
  { label: "◆ Crew-hours",  value: "89K", unit: "hrs", desc: "в орбитальном полёте" },
  { label: "◆ Safety",      value: "100", unit: "%",   desc: "crew return rate · 0 LOC" },
];

function OpsTopology() {
  return (
    <div
      className="schema-box relative w-full h-full"
      style={{ minHeight: 400 }}
    >
      {/* bottom corner decorations */}
      <span className="absolute bottom-0 left-0 w-3.5 h-3.5" style={{ borderRight: "1px solid var(--accent)", borderTop: "1px solid var(--accent)", transform: "rotate(-90deg)" }} />
      <span className="absolute bottom-0 right-0 w-3.5 h-3.5" style={{ borderLeft: "1px solid var(--accent)", borderTop: "1px solid var(--accent)", transform: "rotate(90deg)" }} />

      <span className="absolute mono-sm px-2.5" style={{ top: -1, left: 24, transform: "translateY(-50%)", background: "var(--void)", color: "var(--accent)" }}>
        FIG.02 · OPS TOPOLOGY
      </span>
      <span className="absolute mono-sm px-2.5" style={{ bottom: -1, right: 24, transform: "translateY(50%)", background: "var(--void)", color: "var(--ink-mute)" }}>
        REV. 2026.2
      </span>

      <svg viewBox="0 0 500 400" className="w-full h-full" style={{ padding: 20 }}>
        <defs>
          <pattern id="g2" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M20 0L0 0 0 20" fill="none" stroke="rgba(140,160,210,0.05)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="500" height="400" fill="url(#g2)" />

        {/* Central node */}
        <rect x="200" y="170" width="100" height="60" fill="#0d1424" stroke="oklch(0.70 0.18 295)" strokeWidth="1.2" />
        <text x="250" y="195" textAnchor="middle" fontFamily="Space Grotesk, sans-serif" fontSize="13" fill="#e7ecf5">Nova Astro</text>
        <text x="250" y="210" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="8.5" fill="oklch(0.70 0.18 295)">MISSION INTEGRATOR</text>
        <text x="250" y="222" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="7.5" fill="#5a6686">NODE-000</text>

        {/* Satellite nodes */}
        <rect x="30" y="40" width="130" height="54" fill="#0d1424" stroke="#1a2540" strokeWidth="1" />
        <text x="95" y="62" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="oklch(0.84 0.13 85)">LAUNCH PROVIDERS</text>
        <text x="95" y="76" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="7.5" fill="#8b97b3">Axiom · Roscosmos</text>
        <text x="95" y="87" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="7.5" fill="#8b97b3">SpaceX · ArianeGroup</text>

        <rect x="340" y="40" width="130" height="54" fill="#0d1424" stroke="#1a2540" strokeWidth="1" />
        <text x="405" y="62" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="oklch(0.84 0.13 85)">VESSEL FLEET</text>
        <text x="405" y="76" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="7.5" fill="#8b97b3">Cygnus-II · Perseid</text>
        <text x="405" y="87" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="7.5" fill="#8b97b3">Pallas · Artemis-R</text>

        <rect x="10" y="180" width="130" height="54" fill="#0d1424" stroke="#1a2540" strokeWidth="1" />
        <text x="75" y="202" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="oklch(0.84 0.13 85)">TRAINING · GA-6</text>
        <text x="75" y="216" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="7.5" fill="#8b97b3">Centrifuge · EVA pool</text>
        <text x="75" y="227" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="7.5" fill="#8b97b3">Neutral buoyancy</text>

        <rect x="360" y="180" width="130" height="54" fill="#0d1424" stroke="#1a2540" strokeWidth="1" />
        <text x="425" y="202" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="oklch(0.84 0.13 85)">MEDICAL · SCREENING</text>
        <text x="425" y="216" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="7.5" fill="#8b97b3">μg physiology</text>
        <text x="425" y="227" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="7.5" fill="#8b97b3">Flight surgeon corps</text>

        <rect x="30" y="310" width="130" height="54" fill="#0d1424" stroke="#1a2540" strokeWidth="1" />
        <text x="95" y="332" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="oklch(0.84 0.13 85)">INSURANCE · LLOYD&apos;S</text>
        <text x="95" y="346" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="7.5" fill="#8b97b3">Up to $50M / crew</text>
        <text x="95" y="357" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="7.5" fill="#8b97b3">Syndicate 2031</text>

        <rect x="340" y="310" width="130" height="54" fill="#0d1424" stroke="#1a2540" strokeWidth="1" />
        <text x="405" y="332" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="oklch(0.84 0.13 85)">REGULATORY</text>
        <text x="405" y="346" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="7.5" fill="#8b97b3">FAA § 460 · ESA-HSC</text>
        <text x="405" y="357" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="7.5" fill="#8b97b3">IAASS certified</text>

        {/* Connecting lines */}
        <g stroke="oklch(0.70 0.18 295)" strokeWidth="0.8" strokeDasharray="2 3" opacity=".7" fill="none">
          <path d="M 160 67 L 215 180" />
          <path d="M 340 67 L 285 180" />
          <path d="M 140 207 L 200 200" />
          <path d="M 360 207 L 300 200" />
          <path d="M 160 337 L 215 225" />
          <path d="M 340 337 L 285 225" />
        </g>

        {/* Node dots */}
        <g fill="oklch(0.70 0.18 295)">
          <circle cx="160" cy="67" r="2" />
          <circle cx="340" cy="67" r="2" />
          <circle cx="140" cy="207" r="2" />
          <circle cx="360" cy="207" r="2" />
          <circle cx="160" cy="337" r="2" />
          <circle cx="340" cy="337" r="2" />
        </g>
      </svg>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="wrap" style={{ padding: "120px 0", borderBottom: "1px solid var(--line-soft)" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-[180px_1fr_auto] gap-12 items-end pb-10 mb-14"
        style={{ borderBottom: "1px dashed var(--line)" }}
      >
        <div style={{ fontFamily: "var(--ff-mono)", fontSize: 12, color: "var(--accent)" }}>
          AGENCY // <span style={{ color: "var(--ink-mute)" }}>04 / 05</span>
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
            О нас
            <br />
            <span style={{ fontWeight: 300, color: "var(--ink-dim)" }}>
              операционная прозрачность · сертификация первого уровня
            </span>
          </h2>
        </div>
        <div className="mono-sm text-right">
          HQ · Рейкьявик, IS
          <br />
          OPS · Байконур · Куру · Ванденберг
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        {/* Left: text */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p
            style={{
              fontFamily: "var(--ff-display)",
              fontSize: "clamp(18px, 2.2vw, 26px)",
              lineHeight: 1.4,
              letterSpacing: "-0.02em",
              color: "var(--ink)",
            }}
          >
            Мы не строим ракеты. Мы{" "}
            <span style={{ color: "var(--accent)" }}>интегрируем</span>{" "}
            сертифицированных перевозчиков, медицинские и тренировочные центры в единый маршрут для частного клиента — от первого медосмотра до возврата капсулы в Атлантику.
          </p>

          <div className="mt-9 flex flex-col gap-4" style={{ color: "var(--ink-dim)", fontSize: 15, lineHeight: 1.65 }}>
            <p>
              Nova Astro основана в 2029 году группой инженеров полётных операций и двух бывших начальников экспедиций МКС. Лицензия FAA AST № 2031-C-047, европейская ESA-HSC endorsement, членство в IAASS и Axiom partnership program.
            </p>
            <p>
              Каждый клиент проходит 6–24 месяца подготовки в Gagarin-6: центрифуга до 8G, нейтральная плавучесть, EVA-симуляция, медицина низкой гравитации. Мы отказываем чаще, чем подтверждаем — показатель отбора 1:11.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-0 mt-12" style={{ borderTop: "1px solid var(--line)" }}>
            {STATS.map((s, idx) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="pt-6 pr-4"
              >
                <span className="mono-sm block mb-2">{s.label}</span>
                <div
                  style={{
                    fontFamily: "var(--ff-display)",
                    fontSize: 36,
                    fontWeight: 500,
                    color: "var(--ink)",
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                  }}
                >
                  {s.value}
                  <span style={{ fontFamily: "var(--ff-mono)", fontSize: 12, color: "var(--ink-mute)", marginLeft: 4 }}>
                    {s.unit}
                  </span>
                </div>
                <div style={{ fontFamily: "var(--ff-mono)", fontSize: 10.5, color: "var(--ink-mute)", marginTop: 6, letterSpacing: "0.04em" }}>
                  {s.desc}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right: topology diagram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="h-full"
          style={{ minHeight: 420 }}
        >
          <OpsTopology />
        </motion.div>
      </div>
    </section>
  );
}
