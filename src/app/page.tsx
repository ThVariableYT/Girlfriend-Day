import { FloatingHearts } from "@/components/love/floating-hearts";
import { HeroSection } from "@/components/love/hero-section";
import { LoveLetter } from "@/components/love/love-letter";
import { MemoryCarousel } from "@/components/love/memory-carousel";
import { ThingsILove } from "@/components/love/things-i-love";
import { OurLittleWorld } from "@/components/love/our-little-world";
import { PromiseSection } from "@/components/love/promise-section";
import { LoveFooter } from "@/components/love/love-footer";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col bg-love-canvas">
      <FloatingHearts />

      <div className="relative z-10 flex flex-1 flex-col">
        <HeroSection />
        <LoveLetter />
        <MemoryCarousel />
        <ThingsILove />
        <OurLittleWorld />
        <PromiseSection />
      </div>

      <LoveFooter />
    </main>
  );
}
