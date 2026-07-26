"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Reveal } from "./reveal";

const promises = [
  "To choose you, every single day — on the easy days and the hard ones.",
  "To listen, really listen, even when I am tired or wrong.",
  "To celebrate your light and hold you close in your shadows.",
  "To keep growing, so I can love you even better tomorrow.",
  "To never let you forget how loved you truly are.",
];

export function PromiseSection() {
  return (
    <section className="relative z-10 px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-3xl">
        <Reveal className="mb-12 text-center">
          <div className="mb-6 flex justify-center">
            <span className="relative flex h-14 w-14 items-center justify-center">
              <span className="absolute inset-0 rounded-full bg-[oklch(0.78_0.11_55/0.35)] blur-lg animate-glow" />
              <Heart className="relative h-8 w-8 animate-heartbeat fill-[oklch(0.55_0.16_18)] text-[oklch(0.55_0.16_18)]" />
            </span>
          </div>
          <p className="font-body text-sm uppercase tracking-[0.4em] text-[oklch(0.5_0.1_30)]">
            my promises to you
          </p>
          <h2 className="mt-3 font-serif-display text-4xl italic text-[oklch(0.35_0.08_20)] sm:text-5xl">
            A Little Forever
          </h2>
        </Reveal>

        <div className="glass-card rounded-[1.75rem] p-8 sm:p-12">
          <ul className="space-y-6">
            {promises.map((p, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-start gap-4"
              >
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[oklch(0.55_0.16_18)] to-[oklch(0.45_0.15_25)] text-[oklch(0.98_0.02_50)]">
                  <Heart className="h-3 w-3 fill-current" />
                </span>
                <p className="font-body text-lg leading-relaxed text-[oklch(0.3_0.06_20)] sm:text-xl">
                  {p}
                </p>
              </motion.li>
            ))}
          </ul>

          <div className="mt-10 border-t border-[oklch(0.85_0.04_35/0.6)] pt-8 text-center">
            <p className="font-body text-lg italic text-[oklch(0.4_0.08_25)]">
              Happy Girlfriend&apos;s Day, my Mau.
            </p>
            <p className="mt-1 font-body text-base text-[oklch(0.45_0.07_28)]">
              Here&apos;s to us — today and every day after.
            </p>
            <p className="mt-4 font-vibes px-2 py-3 text-5xl leading-[1.35] text-gradient-rose">
              Always, Poochu
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
