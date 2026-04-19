"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const MISSIONS = [
  "Orbital-1 · LEO",
  "Moon-3 · флайбай",
  "Mars-1 · cycler",
  "Окна 2027–2029",
  "Корпоративные",
];

const AGENCY = [
  "Инженерия",
  "Gagarin-6 центр",
  "Медицина",
  "Сертификация",
  "Карьера",
];

const CONTACT = [
  { label: "ops@novaastro.is", href: "mailto:ops@novaastro.is" },
  { label: "+7 934-578-2670", href: "#" },
  { label: "Press kit / 2026.2", href: "#" },
  { label: "Legal · FAA § 460", href: "#" },
  { label: "Privacy", href: "#" },
];

function LogoMark() {
  return (
    <svg viewBox="0 0 28 28" fill="none" className="w-7 h-7">
      <circle cx="14" cy="14" r="4" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <ellipse cx="14" cy="14" rx="12" ry="5" fill="none" stroke="currentColor" strokeWidth="1" transform="rotate(-25 14 14)" />
      <circle cx="14" cy="14" r="1.6" fill="currentColor" />
      <circle cx="25" cy="7" r="1" fill="currentColor" />
    </svg>
  );
}

export default function Footer() {
  const [uptime, setUptime] = useState("00:00:00");
  const bootAt = Date.now();

  useEffect(() => {
    const id = setInterval(() => {
      const diff = Date.now() - bootAt;
      const h = String(Math.floor(diff / 3600000)).padStart(2, "0");
      const m = String(Math.floor(diff / 60000) % 60).padStart(2, "0");
      const s = String(Math.floor(diff / 1000) % 60).padStart(2, "0");
      setUptime(`${h}:${m}:${s}`);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer
      id="contact"
      style={{ borderTop: "1px solid var(--line-soft)", paddingTop: 80, paddingBottom: 40 }}
    >
      <motion.div
        className="wrap"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-12 pb-16" style={{ borderBottom: "1px solid var(--line-soft)" }}>
          <div>
            <span className="mono-sm block mb-4">◆ Nova Astro · Mission Integrator</span>
            <a href="#" className="flex items-center gap-3 mb-5" style={{ color: "var(--ink)" }}>
              <span style={{ color: "var(--accent)" }}>
                <LogoMark />
              </span>
              <span>
                <span
                  className="block text-base font-semibold"
                  style={{ fontFamily: "var(--ff-display)", letterSpacing: "0.02em" }}
                >
                  Nova <span style={{ fontWeight: 300, color: "var(--ink-dim)" }}>Astro</span>
                </span>
                <span className="mono-sm block" style={{ marginTop: 2 }}>
                  EST. 2029 · IS · FAA AST 2031-C-047
                </span>
              </span>
            </a>
            <p style={{ fontSize: 14, color: "var(--ink-dim)", lineHeight: 1.65, maxWidth: 280 }}>
              Интегратор частных экипажных миссий. Отбор, подготовка, страхование и полёт — в одном контракте.
            </p>
          </div>

          <div>
            <h4
              className="mb-5"
              style={{ fontFamily: "var(--ff-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink)" }}
            >
              Миссии
            </h4>
            <ul className="list-none m-0 p-0 flex flex-col gap-3">
              {MISSIONS.map((item) => (
                <li key={item}>
                  <a
                    href="#tours"
                    style={{ fontSize: 14, color: "var(--ink-dim)", transition: "color .2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-dim)")}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4
              className="mb-5"
              style={{ fontFamily: "var(--ff-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink)" }}
            >
              Агентство
            </h4>
            <ul className="list-none m-0 p-0 flex flex-col gap-3">
              {AGENCY.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    style={{ fontSize: 14, color: "var(--ink-dim)", transition: "color .2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-dim)")}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4
              className="mb-5"
              style={{ fontFamily: "var(--ff-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink)" }}
            >
              Контакт
            </h4>
            <ul className="list-none m-0 p-0 flex flex-col gap-3">
              {CONTACT.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    style={{ fontSize: 14, color: "var(--ink-dim)", transition: "color .2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-dim)")}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pt-8"
        >
          <div style={{ fontFamily: "var(--ff-mono)", fontSize: 11, color: "var(--ink-mute)", letterSpacing: "0.04em" }}>
            © 2026 Nova Astro ehf. · All systems nominal
          </div>
          <div style={{ fontFamily: "var(--ff-mono)", fontSize: 11, color: "var(--ink-mute)", letterSpacing: "0.04em" }}>
            <span>64.13°N</span> · <span>021.94°W</span> · REYKJAVÍK HQ · T+{uptime}
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
