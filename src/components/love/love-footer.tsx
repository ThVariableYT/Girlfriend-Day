"use client";

import { Heart } from "lucide-react";

export function LoveFooter() {
  return (
    <footer className="relative z-10 mt-auto border-t border-[oklch(0.88_0.04_35/0.6)] bg-[oklch(0.98_0.02_48/0.7)] backdrop-blur-sm">
      <div className="mx-auto max-w-5xl px-6 py-10 text-center">
        <div className="mx-auto mb-4 flex w-fit items-center gap-3">
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-[oklch(0.6_0.14_30/0.6)]" />
          <Heart className="h-4 w-4 fill-[oklch(0.55_0.16_18)] text-[oklch(0.55_0.16_18)]" />
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-[oklch(0.6_0.14_30/0.6)]" />
        </div>
        <p className="font-vibes text-3xl text-gradient-rose">
          Mau &amp; Poochu
        </p>
        <p className="mt-2 font-body text-sm text-[oklch(0.45_0.07_28)]">
          Made with love, just for you · 1st August
        </p>
        <p className="mt-1 font-body text-xs text-[oklch(0.55_0.06_30)]">
          your Jash, forever your Poochu
        </p>
      </div>
    </footer>
  );
}
