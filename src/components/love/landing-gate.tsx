"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import { Heart } from "lucide-react";

/**
 * LandingGate
 * The first thing Mau sees: "are you ready for your surprise?"
 * - A cute cat-kissing illustration (animated gently like a gif).
 * - A "Yes" button that lets her in.
 * - A "No" button that runs away every time she tries to press it.
 *
 * Fully mobile friendly: on touch devices there's no hover, so the No button
 * also repositions on tap (the tap never counts as a press).
 */
export function LandingGate({ onYes }: { onYes: () => void }) {
  const [noOffset, setNoOffset] = useState({ x: 0, y: 0 });
  const [dodgeCount, setDodgeCount] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const dodge = useCallback(() => {
    const el = containerRef.current;
    const margin = 16;
    const maxX = el ? Math.max(el.clientWidth - 130, 40) : 220;
    const maxY = el ? Math.max(el.clientHeight - 70, 40) : 180;
    const x = (Math.random() * 2 - 1) * (maxX / 2);
    const y = (Math.random() * 2 - 1) * (maxY / 2);
    setNoOffset({ x, y });
    setDodgeCount((c) => c + 1);
  }, []);

  const handleYes = useCallback(() => {
    setLeaving(true);
    // wait for the exit animation before revealing content
    window.setTimeout(onYes, 650);
  }, [onYes]);

  const sassyLines = [
    "nope 🙈",
    "try again, Mau",
    "you can't catch me",
    "not that button~",
    "the other one, love",
    "still no 💕",
    "yes is the way",
    "catch me if you can",
  ];
  const sassy = sassyLines[Math.min(dodgeCount, sassyLines.length - 1)];

  return (
    <AnimatePresence>
      {!leaving && (
        <motion.div
          ref={containerRef}
          key="gate"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04, filter: "blur(8px)" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden px-6 py-10 text-center"
        >
          {/* soft glow backdrop */}
          <div className="pointer-events-none absolute inset-0 z-0">
            <div className="absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[oklch(0.78_0.11_55/0.35)] blur-[110px] animate-glow" />
          </div>

          <motion.div
            className="relative z-10 flex w-full max-w-md flex-col items-center"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-body text-sm uppercase tracking-[0.4em] text-[oklch(0.5_0.1_30)]">
              1 August · Girlfriend&apos;s Day
            </p>

            <h1 className="mt-4 font-vibes px-3 py-4 text-5xl leading-[1.3] text-gradient-rose sm:text-6xl">
              A surprise for Mau
            </h1>

            {/* Cat-kissing illustration (animated like a gif) */}
            <div className="relative mt-4">
              {/* floating hearts around the cats */}
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.span
                  key={i}
                  className="pointer-events-none absolute text-[oklch(0.6_0.15_22)]"
                  style={{ left: `${15 + i * 18}%`, top: i % 2 ? "-6%" : "60%" }}
                  animate={{ y: [0, -12, 0], opacity: [0.4, 0.9, 0.4], scale: [0.9, 1.1, 0.9] }}
                  transition={{ duration: 2.4 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                >
                  <Heart className="h-4 w-4 fill-current" />
                </motion.span>
              ))}
              <motion.div
                animate={{ y: [0, -8, 0], rotate: [-1.5, 1.5, -1.5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <img
                  src="/cat-kiss.png"
                  alt="Two little cats sharing a kiss"
                  width={220}
                  height={220}
                  className="h-44 w-44 rounded-full border-4 border-white/70 object-cover shadow-[0_18px_45px_-18px_oklch(0.45_0.15_18/0.55)] sm:h-52 sm:w-52"
                />
                {/* kiss sparkle */}
                <motion.span
                  className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 text-[oklch(0.65_0.16_20)]"
                  animate={{ scale: [0.6, 1.2, 0.6], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Heart className="h-6 w-6 fill-current" />
                </motion.span>
              </motion.div>
            </div>

            <p className="mt-6 font-body text-lg leading-relaxed text-[oklch(0.38_0.07_25)] sm:text-xl">
              I made something just for you, my love. A whole little world of us.
              Are you ready to see it?
            </p>

            {/* Buttons */}
            <div className="relative mt-9 flex w-full items-center justify-center gap-4 sm:gap-6">
              <button
                onClick={handleYes}
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[oklch(0.55_0.16_18)] to-[oklch(0.5_0.15_28)] px-9 py-4 font-body text-xl text-[oklch(0.98_0.02_50)] shadow-[0_16px_36px_-12px_oklch(0.45_0.16_18/0.75)] transition hover:scale-[1.04] active:scale-95"
              >
                <Heart className="h-5 w-5 fill-current" />
                Yes!
              </button>

              <motion.button
                onMouseEnter={dodge}
                onFocus={dodge}
                onPointerDown={(e) => {
                  // touch / mouse: dodge before the click registers
                  e.preventDefault();
                  dodge();
                }}
                onClick={(e) => {
                  e.preventDefault();
                  dodge();
                }}
                animate={{ x: noOffset.x, y: noOffset.y }}
                transition={{ type: "spring", stiffness: 320, damping: 18 }}
                className="inline-flex items-center gap-2 rounded-full border border-[oklch(0.7_0.1_40/0.6)] bg-[oklch(0.99_0.01_50/0.85)] px-7 py-4 font-body text-xl text-[oklch(0.5_0.1_28)] shadow-md backdrop-blur"
                style={{ touchAction: "none" }}
              >
                {sassy}
              </motion.button>
            </div>

            <p className="mt-6 font-script text-lg text-[oklch(0.5_0.1_28)]">
              (psst… there&apos;s only one right answer, Mau)
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
