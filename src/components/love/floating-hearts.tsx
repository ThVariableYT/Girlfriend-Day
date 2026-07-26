"use client";

import { useEffect, useMemo, useState } from "react";

/**
 * FloatingHearts
 * A gentle, never-repeating field of hearts & rose petals drifting upward.
 * Purely decorative; respects prefers-reduced-motion via CSS.
 *
 * Rendered only after client mount to avoid SSR hydration mismatch from
 * randomized values.
 */
export function FloatingHearts() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const petals = useMemo(() => {
    const items = [];
    const count = 22;
    for (let i = 0; i < count; i++) {
      const isHeart = Math.random() > 0.45;
      items.push({
        id: i,
        left: Math.random() * 100,
        size: 10 + Math.random() * 22,
        delay: Math.random() * 16,
        duration: 14 + Math.random() * 16,
        dx: (Math.random() - 0.5) * 160,
        rot: (Math.random() > 0.5 ? 1 : -1) * (180 + Math.random() * 360),
        s: 0.7 + Math.random() * 0.7,
        o: 0.25 + Math.random() * 0.45,
        isHeart,
        hue: isHeart ? 18 + Math.random() * 20 : 35 + Math.random() * 25,
        chroma: isHeart ? 0.14 + Math.random() * 0.08 : 0.08 + Math.random() * 0.06,
        light: isHeart ? 0.6 + Math.random() * 0.15 : 0.78 + Math.random() * 0.1,
      });
    }
    return items;
  }, []);

  if (!mounted) {
    return <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden" />;
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {petals.map((p) => (
        <span
          key={p.id}
          className="absolute bottom-[-40px] will-change-transform"
          style={{
            left: `${p.left}%`,
            // @ts-expect-error custom props
            "--dx": `${p.dx}px`,
            "--r": `${p.rot}deg`,
            "--s": `${p.s}`,
            "--o": `${p.o}`,
            animation: `float-rise ${p.duration}s linear ${p.delay}s infinite`,
          }}
        >
          {p.isHeart ? (
            <svg
              width={p.size}
              height={p.size}
              viewBox="0 0 24 24"
              fill="none"
              style={{
                color: `oklch(${p.light} ${p.chroma} ${p.hue})`,
                filter: "drop-shadow(0 2px 4px oklch(0.5 0.1 18 / 0.25))",
              }}
            >
              <path
                d="M12 21s-7.5-4.6-10-9.3C.3 8.4 1.7 5 5.1 5c2 0 3.4 1.1 4.3 2.5l2.6 4 2.6-4C15.5 6.1 16.9 5 18.9 5c3.4 0 4.8 3.4 3.1 6.7C19.5 16.4 12 21 12 21z"
                fill="currentColor"
              />
            </svg>
          ) : (
            <svg
              width={p.size}
              height={p.size}
              viewBox="0 0 24 24"
              fill="none"
              style={{
                color: `oklch(${p.light} ${p.chroma} ${p.hue})`,
                filter: "drop-shadow(0 2px 4px oklch(0.5 0.1 18 / 0.2))",
              }}
            >
              {/* petal */}
              <path
                d="M12 2c3.5 4 6 7 6 11a6 6 0 1 1-12 0c0-4 2.5-7 6-11z"
                fill="currentColor"
                opacity={0.85}
              />
            </svg>
          )}
        </span>
      ))}
    </div>
  );
}
