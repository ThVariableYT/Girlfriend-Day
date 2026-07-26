"use client";

import { motion } from "framer-motion";
import { Reveal } from "./reveal";

export function LoveLetter() {
  return (
    <section className="relative z-10 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <Reveal className="mb-10 text-center">
          <p className="font-body text-sm uppercase tracking-[0.4em] text-[oklch(0.5_0.1_30)]">
            a letter from my heart
          </p>
          <h2 className="mt-3 font-serif-display text-4xl italic text-[oklch(0.35_0.08_20)] sm:text-5xl">
            To my dearest Payal
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="glass-card relative rounded-[1.75rem] p-8 sm:p-12">
            {/* wax seal */}
            <div className="absolute -top-7 left-1/2 -translate-x-1/2">
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.4 }}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[oklch(0.55_0.17_18)] to-[oklch(0.42_0.16_15)] shadow-[0_8px_24px_-6px_oklch(0.4_0.15_18/0.6)] ring-2 ring-[oklch(0.7_0.1_40/0.5)]"
              >
                <span className="font-vibes text-2xl text-[oklch(0.97_0.02_60)]">P</span>
              </motion.div>
            </div>

            <div className="mt-4 space-y-5 font-body text-lg leading-relaxed text-[oklch(0.3_0.06_20)] sm:text-xl">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
                className="font-script text-2xl text-[oklch(0.45_0.12_22)] sm:text-3xl"
              >
                My sweetest Mau,
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.7 }}
              >
                Today the whole world celebrates girlfriends, but my heart
                celebrates only you. From the first time you smiled at me, my
                days became warmer and my nights became softer. You are the
                calm in my noise and the music in my quiet.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.9 }}
              >
                I love the way you laugh at the small things, the way you hold
                my hand like it belongs there, and the way you make ordinary
                moments feel like memories worth keeping. You call me Poochu,
                and somehow that little name feels like home.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 1.1 }}
              >
                Thank you for choosing me, again and again. Thank you for being
                patient, for being kind, and for loving me even on my messy
                days. I promise to keep choosing you too — today, tomorrow, and
                every quiet forever after.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 1.3 }}
                className="pt-2"
              >
                <p className="font-body text-base italic text-[oklch(0.42_0.08_25)]">
                  With all the love I have and all the love I am still learning,
                </p>
                <p className="mt-1 font-vibes px-2 py-2 text-4xl leading-[1.35] text-gradient-rose">
                  Poochu
                </p>
                <p className="mt-1 font-body text-sm tracking-wide text-[oklch(0.5_0.08_30)]">
                  your Jash · 1st August
                </p>
              </motion.div>
            </div>

            {/* corner flourishes */}
            <span className="pointer-events-none absolute left-4 top-4 h-6 w-6 rounded-tl-xl border-l-2 border-t-2 border-[oklch(0.7_0.1_40/0.5)]" />
            <span className="pointer-events-none absolute bottom-4 right-4 h-6 w-6 rounded-br-xl border-b-2 border-r-2 border-[oklch(0.7_0.1_40/0.5)]" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
