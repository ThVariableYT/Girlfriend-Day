"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  HandHeart,
  Coffee,
  MessagesSquare,
  Moon,
  Music,
  Smile,
  Infinity as InfinityIcon,
} from "lucide-react";
import { Reveal } from "./reveal";

const reasons = [
  {
    icon: Smile,
    title: "Your laugh",
    text: "It is my favorite sound in the whole world. I would do anything silly just to hear it again.",
  },
  {
    icon: HandHeart,
    title: "Your kindness",
    text: "You make everyone around you feel seen and loved. That soft heart of yours is rare.",
  },
  {
    icon: MessagesSquare,
    title: "When you say Poochu",
    text: "My name in your voice feels like coming home. Nobody says it the way you do.",
  },
  {
    icon: Coffee,
    title: "Your patience",
    text: "Even on my messy, confusing days, you stay. You never make me feel like too much.",
  },
  {
    icon: Moon,
    title: "How safe I feel",
    text: "Beside you, the loud world goes quiet. With you, I can finally rest.",
  },
  {
    icon: Music,
    title: "Your little songs",
    text: "The humming, the random texts, the goodnight voice notes — they are my daily light.",
  },
  {
    icon: Sparkles,
    title: "The way you dream",
    text: "You hope so gently and so bravely. Watching you believe makes me believe too.",
  },
  {
    icon: InfinityIcon,
    title: "All of you",
    text: "Not pieces, not parts. Every mood, every morning, every version of you. I love it all.",
  },
];

export function ThingsILove() {
  return (
    <section className="relative z-10 px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-14 text-center">
          <p className="font-body text-sm uppercase tracking-[0.4em] text-[oklch(0.5_0.1_30)]">
            a few of a million reasons
          </p>
          <h2 className="mt-3 font-serif-display text-4xl italic text-[oklch(0.35_0.08_20)] sm:text-5xl">
            Things I Love About You
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r, i) => (
            <Reveal key={r.title} delay={(i % 4) * 0.08} y={28}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative h-full overflow-hidden rounded-2xl border border-[oklch(0.88_0.04_35/0.7)] bg-[oklch(0.995_0.008_50/0.85)] p-6 backdrop-blur-sm transition-shadow hover:shadow-[0_24px_50px_-24px_oklch(0.45_0.14_20/0.5)]"
              >
                {/* hover glow */}
                <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[oklch(0.78_0.11_55/0.18)] blur-2xl transition-opacity duration-500 group-hover:opacity-100 opacity-0" />

                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[oklch(0.92_0.05_40)] to-[oklch(0.86_0.06_30)] text-[oklch(0.5_0.15_22)] shadow-inner transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <r.icon className="h-6 w-6" />
                </div>

                <h3 className="font-serif-display text-xl text-[oklch(0.32_0.08_20)]">
                  {r.title}
                </h3>
                <p className="mt-2 font-body text-base leading-relaxed text-[oklch(0.42_0.06_25)]">
                  {r.text}
                </p>

                <span className="mt-4 block h-px w-8 bg-gradient-to-r from-[oklch(0.6_0.14_30/0.6)] to-transparent transition-all duration-500 group-hover:w-16" />
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
