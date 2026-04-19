"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { href: "#tours",    label: "Экспедиции", num: "01" },
  { href: "#about",    label: "О нас",      num: "02" },
  { href: "#fleet",    label: "Флот",       num: "03" },
  { href: "#training", label: "Подготовка", num: "04" },
  { href: "#contact",  label: "Контакты",   num: "05" },
];

function LogoMark() {
  return (
    <svg viewBox="0 0 28 28" fill="none" className="w-7 h-7">
      <circle cx="14" cy="14" r="4" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <ellipse cx="14" cy="14" rx="12" ry="5" fill="none" stroke="currentColor" strokeWidth="1"
        transform="rotate(-25 14 14)" />
      <circle cx="14" cy="14" r="1.6" fill="currentColor" />
      <circle cx="25" cy="7" r="1" fill="currentColor" />
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 64, behavior: "smooth" });
    }
  };

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-300"
      style={{
        backdropFilter: "blur(14px)",
        background: scrolled ? "rgba(5,7,13,0.88)" : "rgba(5,7,13,0.72)",
        borderBottom: "1px solid var(--line-soft)",
      }}
    >
      <div className="wrap">
        <nav className="flex items-center gap-12 py-3.5">
          <a href="#" className="flex items-center gap-3 shrink-0" style={{ color: "var(--ink)" }}>
            <span style={{ color: "var(--accent)" }}>
              <LogoMark />
            </span>
            <span>
              <span
                className="block text-base font-semibold tracking-wide"
                style={{ fontFamily: "var(--ff-display)", letterSpacing: "0.02em" }}
              >
                Nova <span style={{ fontWeight: 300, color: "var(--ink-dim)" }}>Astro</span>
              </span>
              <span className="mono-sm block" style={{ marginTop: 2 }}>
                EST. 2029 · CIVILIAN FLIGHT OPS
              </span>
            </span>
          </a>

          <ul className="hidden md:flex gap-9 flex-1 justify-center list-none m-0 p-0">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <button
                  onClick={() => scrollTo(l.href)}
                  className="text-sm transition-colors duration-200"
                  style={{
                    fontFamily: "var(--ff-body)",
                    color: "var(--ink-dim)",
                    background: "none",
                    border: "none",
                    padding: 0,
                    letterSpacing: "0.01em",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-dim)")}
                >
                  <span style={{ fontFamily: "var(--ff-mono)", fontSize: 10, color: "var(--accent)", marginRight: 8 }}>
                    {l.num}
                  </span>
                  {l.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-3.5 ml-auto shrink-0">
            <span className="mono-sm flex items-center gap-2">
              <span
                className="pulse inline-block w-1.5 h-1.5 rounded-full"
                style={{ background: "oklch(0.75 0.18 150)", boxShadow: "0 0 8px oklch(0.75 0.18 150)" }}
              />
              MISSION CTRL · ONLINE
            </span>
            <button
              onClick={() => scrollTo("#tours")}
              className="flex items-center gap-2 px-4 py-2.5 font-semibold transition-all duration-200"
              style={{
                fontFamily: "var(--ff-mono)",
                fontSize: 11,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                background: "var(--accent)",
                border: "1px solid var(--accent)",
                color: "var(--void)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--accent)";
                e.currentTarget.style.color = "var(--void)";
              }}
            >
              Забронировать <span>→</span>
            </button>
          </div>

          <button
            className="md:hidden ml-auto p-2"
            style={{ background: "none", border: "none", color: "var(--ink)" }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Меню"
          >
            <span className="block w-5 h-px bg-current mb-1.5 transition-all" />
            <span className="block w-5 h-px bg-current mb-1.5 transition-all" />
            <span className="block w-5 h-px bg-current transition-all" />
          </button>
        </nav>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden md:hidden border-t"
              style={{ borderColor: "var(--line-soft)" }}
            >
              <ul className="list-none m-0 p-0 py-4 flex flex-col gap-4">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <button
                      onClick={() => scrollTo(l.href)}
                      className="w-full text-left px-0 py-1"
                      style={{
                        background: "none",
                        border: "none",
                        color: "var(--ink-dim)",
                        fontFamily: "var(--ff-body)",
                        fontSize: 15,
                      }}
                    >
                      <span style={{ fontFamily: "var(--ff-mono)", fontSize: 10, color: "var(--accent)", marginRight: 10 }}>
                        {l.num}
                      </span>
                      {l.label}
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    onClick={() => scrollTo("#tours")}
                    className="w-full text-center px-4 py-2.5 font-semibold"
                    style={{
                      fontFamily: "var(--ff-mono)",
                      fontSize: 11,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      background: "var(--accent)",
                      border: "1px solid var(--accent)",
                      color: "var(--void)",
                    }}
                  >
                    Забронировать →
                  </button>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
