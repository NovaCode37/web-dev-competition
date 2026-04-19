"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Preloader from "@/components/nova/Preloader";
import Navbar from "@/components/nova/Navbar";
import Hero from "@/components/nova/Hero";
import Tours from "@/components/nova/Tours";
import Fleet from "@/components/nova/Fleet";
import Training from "@/components/nova/Training";
import About from "@/components/nova/About";
import Footer from "@/components/nova/Footer";
import BookingModal, { type BookingTarget } from "@/components/nova/BookingModal";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [bookingTarget, setBookingTarget] = useState<BookingTarget | null>(null);
  const handleLoaded = useCallback(() => setLoading(false), []);

  return (
    <>
      <AnimatePresence>
        {loading && <Preloader key="preloader" onDone={handleLoaded} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Navbar />
        <main>
          <Hero />
          <Tours onBook={setBookingTarget} />
          <Fleet />
          <Training />
          <About />
        </main>
        <Footer />
      </motion.div>

      <AnimatePresence>
        {bookingTarget && (
          <BookingModal
            key="modal"
            target={bookingTarget}
            onClose={() => setBookingTarget(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
