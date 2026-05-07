"use client";

import { useEffect } from "react";

type Props = {
  sectionRef: React.RefObject<HTMLDivElement | null>;
  fadeRef: React.RefObject<HTMLDivElement | null>;
};

export default function BackgroundFade({ sectionRef, fadeRef }: Props) {
  useEffect(() => {
  const handleScroll = () => {
    if (!sectionRef.current || !fadeRef.current) return;

    const rect = sectionRef.current.getBoundingClientRect();
    const triggerPoint = window.innerHeight * 0.6;

    if (rect.top <= triggerPoint) {
      fadeRef.current.style.opacity = "0";
    } else {
      fadeRef.current.style.opacity = "1";
    }
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, [sectionRef, fadeRef]);

  return null; // no UI, just behavior
}