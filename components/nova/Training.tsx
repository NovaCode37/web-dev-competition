"use client";

import { motion } from "framer-motion";

const PHASES = [
  {
    num: "01",
    title: "Медицинский отбор",
    sub: "PHASE 01 · SCREEN",
    description:
      "Пятидневный скрининг: кардиология, барокамера, вестибулярная толерантность, психометрика. Отсев на этом этапе — 54% кандидатов.",
    duration: "5 сут",
  },
  {
    num: "02",
    title: "Центрифуга и g-тренинг",
    sub: "PHASE 02 · PHYSICAL",
    description:
      "Прогрессивная нагрузка до 8G на центрифуге ЦФ-18, дыхательная техника под перегрузкой, EVA-костюм, нейтральная плавучесть (40 часов в бассейне).",
    duration: "12 нед",
  },
  {
    num: "03",
    title: "Симуляторы миссии",
    sub: "PHASE 03 · MISSION-SIM",
    description:
      "Полный цикл на симуляторе капсулы: предстартовые процедуры, ручная стыковка, аварийные сценарии (разгерметизация, потеря связи, reentry deorbit).",
    duration: "4–16 нед",
  },
  {
    num: "04",
    title: "Финальная сертификация",
    sub: "PHASE 04 · CERT",
    description:
      "Экзамен перед смешанной комиссией FAA/ESA, медицинский допуск полётного хирурга, подпись страхового синдиката. Выдача crew-badge.",
    duration: "2 нед",
  },
];

export default function Training() {
  return (
    <section id="training" className="wrap scan-overlay" style={{ padding: "120px 0", borderBottom: "1px solid var(--line-soft)" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-[180px_1fr_auto] gap-12 items-end pb-10 mb-14"
        style={{ borderBottom: "1px dashed var(--line)" }}
      >
        <div style={{ fontFamily: "var(--ff-mono)", fontSize: 12, color: "var(--accent)" }}>
          PROGRAM // <span style={{ color: "var(--ink-mute)" }}>03 / 05</span>
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
            Подготовка
            <br />
            <span style={{ fontWeight: 300, color: "var(--ink-dim)" }}>
              центр Gagarin-6 · 4 фазы · 6–24 месяца
            </span>
          </h2>
        </div>
        <div className="mono-sm text-right">
          Cohort GA-6/34
          <br />
          Intake 2026/Q3
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0" style={{ border: "1px solid var(--line)" }}>
        {PHASES.map((phase, idx) => (
          <motion.div
            key={phase.num}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="flex flex-col p-6 gap-5 relative hover-lift"
            style={{
              borderRight: idx < PHASES.length - 1 ? "1px solid var(--line)" : "none",
              borderBottom: "1px solid var(--line)",
              background: "rgba(13,20,36,0.2)",
            }}
          >
            <div
              style={{
                fontFamily: "var(--ff-mono)",
                fontSize: 48,
                color: "var(--line)",
                lineHeight: 1,
                userSelect: "none",
                letterSpacing: "-0.02em",
              }}
            >
              {phase.num}
            </div>

            <div className="flex flex-col flex-1 gap-2">
              <h3
                style={{
                  fontFamily: "var(--ff-display)",
                  fontSize: 18,
                  fontWeight: 500,
                  color: "var(--ink)",
                  letterSpacing: "-0.02em",
                }}
              >
                {phase.title}
              </h3>
              <div style={{ fontFamily: "var(--ff-mono)", fontSize: 10, color: "var(--accent)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                {phase.sub}
              </div>
              <p style={{ fontSize: 14, color: "var(--ink-dim)", lineHeight: 1.6, marginTop: 8 }}>
                {phase.description}
              </p>
            </div>

            <div
              className="flex items-center justify-between pt-4"
              style={{ borderTop: "1px dashed var(--line)" }}
            >
              <span style={{ fontFamily: "var(--ff-mono)", fontSize: 10, color: "var(--ink-mute)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                Duration
              </span>
              <span style={{ fontFamily: "var(--ff-mono)", fontSize: 14, color: "var(--ink)" }}>
                {phase.duration}
              </span>
            </div>

            <div
              className="absolute left-6 top-0 w-px h-3 glow-pulse"
              style={{ background: "var(--accent)" }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
