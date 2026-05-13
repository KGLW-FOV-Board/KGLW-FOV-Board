"use client";

import { useEffect } from "react";

type Props = {
  sectionRef: React.RefObject<HTMLDivElement | null>;
  fadeRef: React.RefObject<HTMLDivElement | null>;
};

export default function BackgroundFade({ sectionRef, fadeRef }: Props) {
  useEffect(() => {
    let ticking = false;

    const update = () => {
      if (!sectionRef.current || !fadeRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();

      const triggerPoint = window.innerHeight * 0.6;

      fadeRef.current.style.opacity =
        rect.top <= triggerPoint ? "0" : "1";

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    // run once on mount (important for mobile)
    update();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionRef, fadeRef]);

  return null;
}