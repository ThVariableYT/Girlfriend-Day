"use client";

import { motion } from "framer-motion";
import { Heart, Star, Sun, Cloud, Clock } from "lucide-react";
import { Reveal } from "./reveal";

const littleThings = [
  {
    icon: Sun,
    title: "Good mornings",
    text: "A hello from you is the only alarm I ever want.",
  },
  {
    icon: Cloud,
    title: "Bad days",
    text: "When the world is heavy, we carry it together — never alone.",
  },
  {
    icon: Star,
    title: "Small wins",
    text: "Your happiness is my happiness. I cheer the loudest for you.",
  },
  {
    icon: Clock,
    title: "Slow nights",
    text: "Talking about nothing with you is better than everything else.",
  },
];

export function OurLittleWorld() {
  return (
    <section className="relative z-10 px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-5xl">
        {/* Names centerpiece */}
        <Reveal className="mb-16 text-center">
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              <p className="font-body text-sm uppercase tracking-[0.35em] text-[oklch(0.5_0.1_30)]">
                my girl
              </p>
              <p className="font-vibes text-6xl text-gradient-rose sm:text-7xl">Mau</p>
              <p className="font-body text-base italic text-[oklch(0.45_0.08_28)]">Payal</p>
            </motion.div>

            <motion.div
              initial={{ scale: 0, rotate: -30 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.2 }}
              className="flex items-center justify-center"
            >
              <span className="relative flex h-16 w-16 items-center justify-center">
                <span className="absolute inset-0 rounded-full bg-[oklch(0.78_0.11_55/0.35)] blur-xl animate-glow" />
                <Heart className="relative h-9 w-9 animate-heartbeat fill-[oklch(0.55_0.16_18)] text-[oklch(0.55_0.16_18)]" />
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="text-center"
            >
              <p className="font-body text-sm uppercase tracking-[0.35em] text-[oklch(0.5_0.1_30)]">
                your boy
              </p>
              <p className="font-vibes text-6xl text-gradient-gold sm:text-7xl">Poochu</p>
              <p className="font-body text-base italic text-[oklch(0.45_0.08_28)]">Jash</p>
            </motion.div>
          </div>

          <div className="mx-auto mt-8 max-w-md">
            <div className="gold-rule" />
            <p className="mt-5 font-body text-lg italic leading-relaxed text-[oklch(0.4_0.07_25)]">
              Two silly nicknames. One little world. And somehow, it feels like
              the whole universe fits inside it.
            </p>
          </div>
        </Reveal>

        {/* Little things grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {littleThings.map((t, i) => (
            <Reveal key={t.title} delay={i * 0.08} y={24}>
              <div className="relative h-full rounded-2xl border border-[oklch(0.88_0.04_35/0.6)] bg-[oklch(0.995_0.008_50/0.7)] p-6 text-center backdrop-blur-sm transition hover:bg-[oklch(0.98_0.02_48/0.9)]">
                <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[oklch(0.93_0.04_45)] text-[oklch(0.55_0.14_25)]">
                  <t.icon className="h-5 w-5" />
                </div>
                <h3 className="font-serif-display text-lg text-[oklch(0.32_0.08_20)]">
                  {t.title}
                </h3>
                <p className="mt-1.5 font-body text-sm leading-relaxed text-[oklch(0.45_0.06_25)]">
                  {t.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
