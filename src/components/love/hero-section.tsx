"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 text-center"
    >
      {/* soft glowing orbs */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[oklch(0.78_0.11_55/0.35)] blur-[100px] animate-glow" />
        <div className="absolute left-[20%] top-[30%] h-[26vmin] w-[26vmin] rounded-full bg-[oklch(0.7_0.13_35/0.28)] blur-[80px] animate-glow" style={{ animationDelay: "1.4s" }} />
        <div className="absolute right-[18%] bottom-[22%] h-[28vmin] w-[28vmin] rounded-full bg-[oklch(0.8_0.08_70/0.3)] blur-[90px] animate-glow" style={{ animationDelay: "2.6s" }} />
      </div>

      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 flex flex-col items-center"
      >
        {/* tiny overline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-7 flex items-center gap-3"
        >
          <span className="h-px w-10 bg-[oklch(0.6_0.12_30/0.6)]" />
          <span className="font-body text-sm uppercase tracking-[0.42em] text-[oklch(0.45_0.1_25)]">
            1 August · Girlfriend&apos;s Day
          </span>
          <span className="h-px w-10 bg-[oklch(0.6_0.12_30/0.6)]" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="font-body text-2xl italic text-[oklch(0.4_0.08_25)] sm:text-3xl"
        >
          Happy Girlfriend&apos;s Day to my
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.4, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-vibes text-[clamp(4.5rem,18vw,12rem)] leading-[0.95] text-gradient-rose drop-shadow-[0_8px_30px_oklch(0.5_0.15_18/0.25)]"
        >
          Mau
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="my-6 h-px w-48 origin-center bg-gradient-to-r from-transparent via-[oklch(0.6_0.14_30/0.7)] to-transparent"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.7 }}
          className="max-w-xl font-body text-lg leading-relaxed text-[oklch(0.38_0.07_25)] sm:text-xl"
        >
          A little world I built with all my heart, for the girl who is my whole
          world. Scroll gently, my love — every bit of this is for you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.1 }}
          className="mt-10 flex flex-col items-center gap-2"
        >
          <span className="font-script text-xl text-[oklch(0.5_0.12_22)]">
            forever yours, Poochu
          </span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="mt-2 text-[oklch(0.55_0.12_25)]"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 5v14M6 13l6 6 6-6"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.span>
        </motion.div>
      </motion.div>
    </section>
  );
}
