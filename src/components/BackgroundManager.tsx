"use client";

import { useEffect, useState } from "react";

type Props = {
  sectionRef: React.RefObject<HTMLDivElement | null>;
};

export default function BackgroundManager({
  sectionRef,
}: Props) {
  const [faded, setFaded] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setFaded(entry.isIntersecting);
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, [sectionRef]);

  return (
    <div className="fixed inset-0 z-[-20] overflow-hidden pointer-events-none">

      {/* BG 1 */}
      <img
        src="/bg_1.svg"
        className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
        "
      />

      {/* BG 2 */}
      <img
        src="/bg_2.svg"
        className={`
          absolute
          inset-0
          w-full
          h-full
          object-cover
          transition-opacity
          duration-300
          scale-110
          ${faded ? "opacity-0" : "opacity-100"}
        `}
      />

    </div>
  );
}