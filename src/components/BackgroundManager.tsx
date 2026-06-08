"use client";

import { useEffect, useState } from "react";

type Props = {
  section1Ref: React.RefObject<HTMLDivElement | null>;
  section2Ref: React.RefObject<HTMLDivElement | null>;
};

export default function BackgroundManager({
  section1Ref,
  section2Ref,
}: Props) {

  const [section1Visible, setSection1Visible] =
    useState(false);

  const [section2Visible, setSection2Visible] =
    useState(false);

  useEffect(() => {

    const observer1 = new IntersectionObserver(
      ([entry]) => {
        setSection1Visible(entry.isIntersecting);
      },
      {
        threshold: 0.15,
      }
    );

    const observer2 = new IntersectionObserver(
      ([entry]) => {
        setSection2Visible(entry.isIntersecting);
      },
      {
        threshold: 0.15,
      }
    );

    if (section1Ref.current) {
      observer1.observe(section1Ref.current);
    }

    if (section2Ref.current) {
      observer2.observe(section2Ref.current);
    }

    return () => {
      observer1.disconnect();
      observer2.disconnect();
    };

  }, [section1Ref, section2Ref]);

  // derive current background cleanly
  let currentBg = 1;

  if (section1Visible) {
    currentBg = 2;
  }

  if (section2Visible) {
    currentBg = 3;
  }

  return (
    <div className="fixed inset-0 z-[-20] overflow-hidden pointer-events-none">

      {/* BG 1 */}
      <img
        src="/bg_1.svg"
        className={`
          absolute
          inset-0
          w-full
          h-full
          object-cover
          transition-opacity
          duration-700
          will-change-opacity
          ${currentBg === 1 ? "opacity-100" : "opacity-0"}
        `}
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
          duration-700
          scale-110
          will-change-opacity
          ${currentBg === 2 ? "opacity-100" : "opacity-0"}
        `}
      />

      {/* BG 3 */}
      <img
        src="/bg_3.svg"
        className={`
          absolute
          inset-0
          w-full
          h-full
          object-cover
          transition-opacity
          duration-700
          will-change-opacity
          ${currentBg === 3 ? "opacity-100" : "opacity-0"}
        `}
      />

    </div>
  );
}