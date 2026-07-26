"use client";

import { useState } from "react";
import { LandingGate } from "./landing-gate";
import { FloatingHearts } from "./floating-hearts";
import { HeroSection } from "./hero-section";
import { LoveLetter } from "./love-letter";
import { MemoryCarousel } from "./memory-carousel";
import { QuizSection } from "./quiz-section";
import { ThingsILove } from "./things-i-love";
import { OurLittleWorld } from "./our-little-world";
import { PromiseSection } from "./promise-section";
import { LoveFooter } from "./love-footer";
import { CollectibleHearts } from "./collectible-hearts";

export function LoveExperience() {
  const [entered, setEntered] = useState(false);

  if (!entered) {
    return (
      <main className="relative min-h-[100svh] bg-love-canvas">
        <FloatingHearts />
        <LandingGate onYes={() => setEntered(true)} />
      </main>
    );
  }

  return (
    <main className="relative flex min-h-screen flex-col bg-love-canvas">
      <FloatingHearts />
      <CollectibleHearts />

      <div className="relative z-10 flex flex-1 flex-col">
        <HeroSection />
        <LoveLetter />
        <MemoryCarousel />
        <QuizSection />
        <ThingsILove />
        <OurLittleWorld />
        <PromiseSection />
      </div>

      <LoveFooter />
    </main>
  );
}
