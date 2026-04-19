"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type MissionId = "orbital" | "moon" | "mars";
export type BookingTarget =
  | { type: "spec"; missionId: MissionId }
  | { type: "book"; missionId?: MissionId };

const TOURS_DATA = {
  orbital: {
    id: "M-01 / ORBITAL-1",
    name: "Орбитальная станция",
    sub: "7 суток на борту Nova-Station LEO",
    price: "USD 28 000 000",
    specs: [
      ["Продолжительность", "7 суток"],
      ["Высота орбиты", "408 км"],
      ["Наклонение", "51.6°"],
      ["ΔV миссии", "9.4 км/с"],
      ["g-нагрузка max", "3.2 G"],
      ["Окно запуска", "2026/05/30 · Baikonur LC-31"],
      ["Возвращаемый аппарат", "Cygnus-II capsule"],
      ["Подготовка", "6 месяцев · Gagarin-6"],
      ["Экипаж", "2 командира + 4 участника"],
      ["Резервные окна", "2026/09 · 2027/02"],
    ],
  },
  moon: {
    id: "M-02 / MOON-3",
    name: "Облёт Moon",
    sub: "Свободный возврат · траектория фон Брауна",
    price: "USD 78 500 000",
    specs: [
      ["Продолжительность", "11 суток"],
      ["Периселений", "110 км над поверхностью Moon"],
      ["ΔV миссии", "14.1 км/с"],
      ["g-нагрузка max", "4.8 G (reentry)"],
      ["Окно запуска", "2026/11/02 · Baikonur"],
      ["Аппарат", "Perseid-II + TLI-stage"],
      ["Подготовка", "9 месяцев · Gagarin-6"],
      ["Экипаж", "2 командира + 2 участника"],
      ["Связь", "DSN · редиректор Lagrange L2"],
      ["Следующее окно", "2027/05"],
    ],
  },
  mars: {
    id: "M-03 / MARS-1",
    name: "Марсианский цикл",
    sub: "Флайбай + 14 суток на орбите Марса",
    price: "USD 310 000 000",
    specs: [
      ["Продолжительность", "510 суток (round-trip)"],
      ["Перицентр Марса", "400 км"],
      ["ΔV миссии", "20.8 км/с"],
      ["g-нагрузка max", "5.6 G"],
      ["Тип траектории", "Hohmann transfer"],
      ["Окно запуска", "2028/07/19 · Kourou ELA-4"],
      ["Аппарат", "Pallas cycler"],
      ["Подготовка", "24 месяца · pre-selection 1:11"],
      ["Экипаж", "3 командира + 3 участника"],
      ["Радиационное экранирование", "12 г/см² water shield"],
    ],
  },
};

const WINDOWS = ["2026/Q3", "2026/Q4", "2027/Q1", "2027/Q2", "2028 · MARS window"];

interface BookingModalProps {
  target: BookingTarget | null;
  onClose: () => void;
}

export default function BookingModal({ target, onClose }: BookingModalProps) {
  const [toast, setToast] = useState<string | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    if (target) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [target]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const handleOverlay = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onClose();
    showToast("Заявка отправлена. Ожидайте ответа от Mission Control.");
  };

  if (!target) return (
    <>
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-[9999] px-4 py-3"
            style={{
              fontFamily: "var(--ff-mono)",
              fontSize: 12,
              color: "var(--ink)",
              background: "var(--panel)",
              border: "1px solid var(--accent)",
              letterSpacing: "0.04em",
              boxShadow: "0 0 24px rgba(0,0,0,0.4)",
            }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  const tour = target.type === "spec" || target.missionId
    ? TOURS_DATA[target.missionId as MissionId]
    : null;

  const isSpec = target.type === "spec";

  return (
    <>
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-[9999] px-4 py-3"
            style={{
              fontFamily: "var(--ff-mono)",
              fontSize: 12,
              color: "var(--ink)",
              background: "var(--panel)",
              border: "1px solid var(--accent)",
              letterSpacing: "0.04em",
            }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        ref={overlayRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4"
        style={{ background: "rgba(5,7,13,0.85)", backdropFilter: "blur(8px)" }}
        onClick={handleOverlay}
      >
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.97 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto"
          style={{
            background: "var(--panel)",
            border: "1px solid var(--line)",
          }}
        >
          {/* Corner decorations */}
          <span className="absolute top-0 left-0 w-3.5 h-3.5" style={{ borderTop: "1px solid var(--accent)", borderLeft: "1px solid var(--accent)" }} />
          <span className="absolute top-0 right-0 w-3.5 h-3.5" style={{ borderTop: "1px solid var(--accent)", borderRight: "1px solid var(--accent)" }} />
          <span className="absolute bottom-0 left-0 w-3.5 h-3.5" style={{ borderBottom: "1px solid var(--accent)", borderLeft: "1px solid var(--accent)" }} />
          <span className="absolute bottom-0 right-0 w-3.5 h-3.5" style={{ borderBottom: "1px solid var(--accent)", borderRight: "1px solid var(--accent)" }} />

          {/* Header */}
          <div
            className="flex items-center justify-between px-6 py-4"
            style={{ borderBottom: "1px solid var(--line)" }}
          >
            <span style={{ fontFamily: "var(--ff-mono)", fontSize: 11, color: "var(--accent)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              ◆ {isSpec ? `SPECIFICATION · ${tour?.id}` : `MISSION BOOKING${tour ? ` · ${tour.id}` : ""}`}
            </span>
            <button
              onClick={onClose}
              style={{
                background: "none",
                border: "none",
                color: "var(--ink-dim)",
                fontSize: 20,
                lineHeight: 1,
                cursor: "pointer",
                padding: "0 4px",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-dim)")}
            >
              ×
            </button>
          </div>

          {/* Body */}
          <div className="px-6 py-6">
            {isSpec && tour ? (
              <>
                <h3
                  style={{
                    fontFamily: "var(--ff-display)",
                    fontSize: 22,
                    fontWeight: 500,
                    color: "var(--ink)",
                    letterSpacing: "-0.02em",
                    marginBottom: 6,
                  }}
                >
                  {tour.name}
                </h3>
                <div style={{ fontFamily: "var(--ff-mono)", fontSize: 10.5, color: "var(--ink-mute)", letterSpacing: "0.04em", marginBottom: 20 }}>
                  {tour.sub}
                </div>
                <div className="flex flex-col gap-0" style={{ border: "1px solid var(--line)" }}>
                  {tour.specs.map(([k, v], i) => (
                    <div
                      key={k}
                      className="flex items-start justify-between gap-4 px-4 py-3"
                      style={{
                        borderBottom: i < tour.specs.length - 1 ? "1px solid var(--line-soft)" : "none",
                        background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)",
                      }}
                    >
                      <span style={{ fontFamily: "var(--ff-mono)", fontSize: 10.5, color: "var(--ink-mute)", letterSpacing: "0.04em", minWidth: 160 }}>
                        {k}
                      </span>
                      <span style={{ fontFamily: "var(--ff-mono)", fontSize: 11, color: "var(--ink)", textAlign: "right" }}>
                        {v}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <h3 style={{ fontFamily: "var(--ff-display)", fontSize: 22, fontWeight: 500, color: "var(--ink)", letterSpacing: "-0.02em", marginBottom: 4 }}>
                    {tour ? `Бронь: ${tour.name}` : "Заявка на экспедицию"}
                  </h3>
                  <div style={{ fontFamily: "var(--ff-mono)", fontSize: 10.5, color: "var(--ink-mute)", letterSpacing: "0.04em" }}>
                    {tour ? `${tour.sub} · ${tour.price}` : "Подберём окно запуска и пакет подготовки."}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <ModalField label="Имя" type="text" placeholder="Ivan" required />
                  <ModalField label="Фамилия" type="text" placeholder="Astronautov" required />
                </div>
                <ModalField label="E-mail" type="email" placeholder="ops@example.com" required />
                <ModalField label="Телефон (по желанию)" type="tel" placeholder="+7 ..." />

                <div className="grid grid-cols-2 gap-3">
                  <ModalSelect
                    label="Миссия"
                    options={[
                      { value: "orbital", label: "M-01 / ORBITAL-1" },
                      { value: "moon",    label: "M-02 / MOON-3" },
                      { value: "mars",    label: "M-03 / MARS-1" },
                    ]}
                    defaultValue={target.missionId}
                  />
                  <ModalSelect
                    label="Окно запуска"
                    options={WINDOWS.map((w) => ({ value: w, label: w }))}
                  />
                </div>

                <div className="flex gap-3 mt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 py-2.5 transition-all duration-200"
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
                    Отмена
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 font-semibold transition-all duration-200"
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
                    Отправить →
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Footer */}
          <div
            className="flex items-center justify-between px-6 py-3"
            style={{ borderTop: "1px solid var(--line)" }}
          >
            <span style={{ fontFamily: "var(--ff-mono)", fontSize: 10, color: "var(--ink-mute)", letterSpacing: "0.04em" }}>
              {isSpec ? "DATASHEET · REV 2026.2" : "Защищённый канал · PGP-signed"}
            </span>
            {isSpec && (
              <button
                onClick={() => {
                  onClose();
                  setTimeout(() => {
                    // trigger booking via parent
                  }, 50);
                }}
                style={{
                  fontFamily: "var(--ff-mono)",
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  background: "var(--accent)",
                  border: "1px solid var(--accent)",
                  color: "var(--void)",
                  padding: "8px 16px",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--accent)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "var(--accent)"; e.currentTarget.style.color = "var(--void)"; }}
              >
                Забронировать →
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}

function ModalField({
  label, type, placeholder, required,
}: {
  label: string; type: string; placeholder: string; required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        style={{ fontFamily: "var(--ff-mono)", fontSize: 10, color: "var(--ink-mute)", letterSpacing: "0.06em", textTransform: "uppercase" }}
      >
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full px-3 py-2.5 outline-none transition-all duration-200"
        style={{
          background: "var(--deep)",
          border: "1px solid var(--line)",
          color: "var(--ink)",
          fontFamily: "var(--ff-mono)",
          fontSize: 13,
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
        onBlur={(e) => (e.currentTarget.style.borderColor = "var(--line)")}
      />
    </div>
  );
}

function ModalSelect({
  label, options, defaultValue,
}: {
  label: string;
  options: Array<{ value: string; label: string }>;
  defaultValue?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label style={{ fontFamily: "var(--ff-mono)", fontSize: 10, color: "var(--ink-mute)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
        {label}
      </label>
      <select
        defaultValue={defaultValue}
        className="w-full px-3 py-2.5 outline-none"
        style={{
          background: "var(--deep)",
          border: "1px solid var(--line)",
          color: "var(--ink)",
          fontFamily: "var(--ff-mono)",
          fontSize: 13,
        }}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}
