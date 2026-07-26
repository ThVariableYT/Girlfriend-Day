"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { Heart, X, Sparkles } from "lucide-react";
import { prizeConfig } from "./prize-config";

/**
 * CollectibleHearts
 * Seven special hearts are hidden all around the site. As Mau scrolls and
 * explores, she finds and taps each one. When all seven are found, a special
 * prize photo pops up in a romantic frame.
 *
 * Implementation notes:
 * - A full-height, pointer-events-none layer sits over the entire content.
 * - Hearts are positioned by percentage of the content height, so they spread
 *   across the whole page (one near each section).
 * - Each heart is pointer-events-auto and ~44px (mobile-friendly tap target).
 * - A fixed progress badge shows "♥ x / 7" and stays visible while scrolling.
 */

const HEART_COUNT = 7;

// Each heart sits at a vertical % of the total content height and a horizontal
// % of the width. Spread so she finds them as she scrolls through every section.
const HEART_SPOTS = [
  { top: 7, left: 84 },
  { top: 17, left: 8 },
  { top: 30, left: 88 },
  { top: 43, left: 12 },
  { top: 57, left: 86 },
  { top: 70, left: 10 },
  { top: 83, left: 82 },
];

export function CollectibleHearts() {
  const [found, setFound] = useState<boolean[]>(Array(HEART_COUNT).fill(false));
  const [contentH, setContentH] = useState(0);
  const [showPrize, setShowPrize] = useState(false);
  const [justFound, setJustFound] = useState<number | null>(null);

  // Measure the full scrollable content height (the parent <main> wrapper).
  // We measure document.body scrollHeight minus the viewport so hearts span
  // the real content.
  useLayoutEffect(() => {
    const measure = () => {
      setContentH(document.documentElement.scrollHeight);
    };
    measure();
    // re-measure after images/fonts settle
    const t = window.setTimeout(measure, 600);
    window.addEventListener("resize", measure);
    window.addEventListener("load", measure);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("resize", measure);
      window.removeEventListener("load", measure);
    };
  }, []);

  // re-measure when the DOM grows (photos loading etc.)
  useEffect(() => {
    const mo = new MutationObserver(() => setContentH(document.documentElement.scrollHeight));
    mo.observe(document.body, { subtree: true, childList: true, attributes: true });
    return () => mo.disconnect();
  }, []);

  const foundCount = found.filter(Boolean).length;

  const collect = useCallback((i: number) => {
    setFound((prev) => {
      if (prev[i]) return prev;
      const next = [...prev];
      next[i] = true;
      return next;
    });
    setJustFound(i);
    window.setTimeout(() => setJustFound((c) => (c === i ? null : c)), 900);
  }, []);

  // When all are found, pop the prize (once).
  useEffect(() => {
    if (foundCount === HEART_COUNT) {
      const t = window.setTimeout(() => setShowPrize(true), 700);
      return () => window.clearTimeout(t);
    }
  }, [foundCount]);

  return (
    <>
      {/* Hearts layer — spans the full page height */}
      {contentH > 0 && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20"
          style={{ height: contentH }}
        >
          {HEART_SPOTS.map((spot, i) => {
            const isFound = found[i];
            return (
              <motion.button
                key={i}
                type="button"
                onClick={() => collect(i)}
                aria-label={`Collect hidden heart ${i + 1}`}
                initial={false}
                animate={
                  isFound
                    ? { scale: [1, 1.6, 0], opacity: [1, 1, 0], rotate: [0, 12, 0] }
                    : { scale: [1, 1.12, 1], opacity: 1 }
                }
                transition={
                  isFound
                    ? { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
                    : { duration: 2.4 + (i % 3) * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }
                }
                className="pointer-events-auto absolute flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
                style={{ top: `${spot.top}%`, left: `${spot.left}%` }}
              >
                {/* glow ring */}
                {!isFound && (
                  <span className="absolute inset-0 rounded-full bg-[oklch(0.7_0.14_35/0.4)] blur-md" />
                )}
                <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[oklch(0.99_0.01_50/0.92)] shadow-[0_6px_16px_-4px_oklch(0.45_0.16_18/0.5)] ring-1 ring-[oklch(0.85_0.05_40/0.7)]">
                  <Heart className="h-5 w-5 fill-[oklch(0.55_0.16_18)] text-[oklch(0.55_0.16_18)]" />
                </span>

                {/* burst on collect */}
                <AnimatePresence>
                  {justFound === i && (
                    <motion.span
                      className="pointer-events-none absolute inset-0 flex items-center justify-center"
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 0 }}
                      transition={{ duration: 0.7 }}
                    >
                      {[0, 1, 2, 3, 4, 5].map((p) => (
                        <motion.span
                          key={p}
                          className="absolute text-[oklch(0.6_0.16_22)]"
                          initial={{ x: 0, y: 0, scale: 0.4, opacity: 1 }}
                          animate={{
                            x: Math.cos((p / 6) * Math.PI * 2) * 26,
                            y: Math.sin((p / 6) * Math.PI * 2) * 26,
                            scale: 0.9,
                            opacity: 0,
                          }}
                          transition={{ duration: 0.7, ease: "easeOut" }}
                        >
                          <Heart className="h-3 w-3 fill-current" />
                        </motion.span>
                      ))}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>
      )}

      {/* Progress badge — fixed, always visible */}
      <div className="pointer-events-none fixed bottom-4 left-1/2 z-40 -translate-x-1/2 sm:bottom-6 sm:left-auto sm:right-6 sm:translate-x-0">
        <motion.div
          layout
          className="pointer-events-auto flex items-center gap-2 rounded-full border border-[oklch(0.85_0.05_40/0.7)] bg-[oklch(0.99_0.01_50/0.92)] px-4 py-2 shadow-[0_10px_30px_-10px_oklch(0.45_0.16_18/0.5)] backdrop-blur"
        >
          <Heart
            className={`h-4 w-4 ${
              foundCount === HEART_COUNT
                ? "fill-[oklch(0.55_0.16_18)] text-[oklch(0.55_0.16_18)]"
                : "text-[oklch(0.55_0.16_18)]"
            }`}
          />
          <span className="font-body text-sm tracking-wide text-[oklch(0.4_0.08_25)]">
            {foundCount === HEART_COUNT
              ? "all found — a surprise awaits"
              : `${foundCount} / ${HEART_COUNT} hearts found`}
          </span>
        </motion.div>
      </div>

      {/* Prize modal */}
      <AnimatePresence>
        {showPrize && <PrizeModal onClose={() => setShowPrize(false)} />}
      </AnimatePresence>
    </>
  );
}

function PrizeModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* backdrop */}
      <motion.div
        className="absolute inset-0 bg-[oklch(0.2_0.05_18/0.7)] backdrop-blur-md"
        onClick={onClose}
      />

      {/* confetti hearts */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 18 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute text-[oklch(0.6_0.16_22)]"
            initial={{
              x: `${(i / 18) * 100}%`,
              y: "-10%",
              rotate: 0,
              opacity: 0,
            }}
            animate={{
              y: "110%",
              rotate: i % 2 ? 220 : -220,
              opacity: [0, 1, 1, 0],
            }}
            transition={{ duration: 3 + (i % 4), repeat: Infinity, delay: i * 0.18, ease: "easeIn" }}
          >
            <Heart className="h-4 w-4 fill-current" />
          </motion.span>
        ))}
      </div>

      <motion.div
        role="dialog"
        aria-modal="true"
        initial={{ opacity: 0, scale: 0.85, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 16 }}
        transition={{ type: "spring", stiffness: 240, damping: 22 }}
        className="relative z-10 w-full max-w-md overflow-hidden rounded-[1.75rem] bg-[oklch(0.99_0.01_50)] p-3 shadow-[0_30px_80px_-20px_oklch(0.4_0.15_18/0.6)] sm:max-w-lg"
      >
        {/* close */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-[oklch(0.99_0.01_50/0.85)] text-[oklch(0.45_0.1_25)] shadow-md backdrop-blur transition hover:scale-110"
        >
          <X className="h-4 w-4" />
        </button>

        {/* romantic frame around the prize photo */}
        <div className="relative rounded-[1.4rem] bg-gradient-to-br from-[oklch(0.78_0.11_55)] via-[oklch(0.6_0.14_30)] to-[oklch(0.55_0.16_18)] p-[3px]">
          <div className="relative overflow-hidden rounded-[1.3rem] bg-[oklch(0.96_0.02_45)]">
            <img
              src={prizeConfig.src}
              alt="A special photo for Mau"
              className="max-h-[55vh] w-full object-cover"
            />
            {/* soft top + bottom veils */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[oklch(0.2_0.05_18/0.55)] via-transparent to-transparent" />
            {/* corner sparkles */}
            <Sparkles className="absolute left-3 top-3 h-5 w-5 text-white/80" />
            <Sparkles className="absolute bottom-16 right-3 h-4 w-4 text-white/70" />

            {/* title overlay */}
            <div className="absolute inset-x-0 bottom-0 p-5 text-center sm:p-6">
              <p className="font-body text-xs uppercase tracking-[0.35em] text-[oklch(0.98_0.02_55/0.9)]">
                a prize for you
              </p>
              <h3 className="mt-1 font-vibes px-2 py-1 text-3xl leading-[1.3] text-white drop-shadow sm:text-4xl">
                {prizeConfig.title}
              </h3>
            </div>
          </div>
        </div>

        {/* message */}
        <div className="px-5 pb-5 pt-5 text-center sm:px-7">
          <p className="font-body text-base leading-relaxed text-[oklch(0.35_0.07_22)] sm:text-lg">
            {prizeConfig.message}
          </p>
          <p className="mt-4 font-vibes px-2 py-1 text-3xl leading-[1.3] text-gradient-rose">
            {prizeConfig.signature}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
