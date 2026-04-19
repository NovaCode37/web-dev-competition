"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "@/components/nova/Navbar";
import Hero from "@/components/nova/Hero";
import Tours from "@/components/nova/Tours";
import Fleet from "@/components/nova/Fleet";
import Training from "@/components/nova/Training";
import About from "@/components/nova/About";
import Footer from "@/components/nova/Footer";
import BookingModal, { type BookingTarget } from "@/components/nova/BookingModal";

export default function Home() {
  const [bookingTarget, setBookingTarget] = useState<BookingTarget | null>(null);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Tours onBook={setBookingTarget} />
        <Fleet />
        <Training />
        <About />
      </main>
      <Footer />

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
