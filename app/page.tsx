"use client";

import ZoomViewer from "@/src/components/ZoomViewer";
import BackgroundManager from "@/src/components/BackgroundManager";
import localFont from "next/font/local";
import { useRef, useState, useEffect } from "react";
import { hiddenArt } from "@/src/data/hiddenArt";
import { trackEvent } from "@/src/lib/analytics";

const Gladolia = localFont({
  src: "../src/fonts/GladoliaDEMO-Regular.otf",
  variable: "--font-myfont",
});

const DavidaOpti = localFont({
  src: "../src/fonts/DavidaOpti-Bold.otf",
  variable: "--font-myfont",
});

const Roberta = localFont({
  src: "../src/fonts/RobertaC Regular.ttf",
  variable: "--font-myfont",
});

const Heavitas = localFont({
  src: "../src/fonts/Heavitas.ttf",
  variable: "--font-myfont",
});

const card = `
  min-w-[120px]
  max-w-[140px]
  min-h-[80px]
  flex
  items-center
  justify-center
  text-center
  text-sm
  sm:text-base
  lg:text-lg
  text-white
  font-[Hevitas]
  p-3
  bg-black/55
  backdrop-blur-sm
  border
  border-white/10
  rounded-xl
  hover:scale-105
  active:scale-105
  active:duration-75
  transition
`;

export default function Home() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const section2Ref = useRef<HTMLDivElement | null>(null);
  const engagementScore = useRef(0);
  const engagementTracked = useRef(false);
  const increaseEngagement = (
    amount: number
  ) => {

    if (engagementTracked.current)
      return;

    engagementScore.current += amount;

    // THRESHOLD
    if (
      engagementScore.current >= 100
    ) {

      engagementTracked.current = true;

      trackEvent(
        "engaged_session",
        {
          score:
            engagementScore.current,
        }
      );

      console.log(
        "Engaged session tracked"
      );
    }
  };

  useEffect(() => {

    (window as any).increaseEngagement =
      increaseEngagement;

  }, []);

  // Track engaement based on time on site
  useEffect(() => {

    const timer = setTimeout(() => {

      increaseEngagement(40);

    }, 30000);

    return () =>
      clearTimeout(timer);

  }, []);

  // Track Scroll amount in google analytics
  useEffect(() => {

    let maxDepth = 0;

    const onScroll = () => {

      const scrollTop =
        window.scrollY;

      const docHeight =
        document.body.scrollHeight -
        window.innerHeight;

      const percent =
        Math.round(
          (scrollTop / docHeight) * 100
        );

      if (
        percent >= maxDepth + 25
      ) {

        maxDepth = percent;

        trackEvent(
          "scroll_depth",
          {
            percent,
          }
        );
        increaseEngagement(15);
      }
    };

    window.addEventListener(
      "scroll",
      onScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        onScroll
      );

  }, []);
  const [artIndexes, setArtIndexes] = useState<
  Record<string, number>
  >({});
  const zoomToArt = (
  key: keyof typeof hiddenArt
  ) => {

    const targets = hiddenArt[key];
    if (targets.length === 1) {

      const target = targets[0];

      const viewer =
        (window as any).viewerRef?.current;

      if (viewer) {

        const center =
          viewer.viewport.getCenter();

        const currentZoom =
          viewer.viewport.getZoom();

        const threshold = 0.0005;
        const zoomThreshold = 0.15;

        const samePosition =
          Math.abs(center.x - target.x) < threshold &&
          Math.abs(center.y - target.y) < threshold;

        const sameZoom =
          Math.abs(currentZoom - target.zoom)
          < zoomThreshold;

        if (samePosition && sameZoom) {
          return;
        }
      }
    }
    if (!targets.length) return;

    const currentIndex =
      artIndexes[key] ?? 0;

    const target =
      targets[currentIndex];

    trackEvent("hidden_art_clicked", {
      art_name: key,
      target_index: currentIndex,
    });
    increaseEngagement(30);

    (window as any).zoomToLocation(
      target.x,
      target.y,
      target.zoom
    );

    setArtIndexes((prev) => ({
      ...prev,
      [key]:
        (currentIndex + 1) %
        targets.length,
    }));
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      
      <BackgroundManager
        section1Ref={sectionRef}
        section2Ref={section2Ref}
      />
      {/* MAIN CONTENT min-h-screen overflow-x-hidden */}
      <div className="w-[92%] lg:w-[90%] mx-auto mt-20 space-y-10">

        {/* TITLE */}
        <div className="w-full flex justify-center px-4 sm:px-8 overflow-visible">
          <h1
            className="
              font-[DavidaOpti]
              inline-block
              text-center
              text-[clamp(2.2rem,9vw,10rem)]
              text-green-500
              gradient-stroke
              leading-none
              max-w-full
            "
            style={{
              transform: "perspective(200px) rotateX(20deg)",
              transformOrigin: "center bottom",
            }}
          >
            The Weirdo Board
          </h1>
        </div>

        {/* ZOOM VIEWER */}
        <div
          className="
            overflow-hidden
            rounded-3xl

            w-[95vw]
            h-[65vw]

            sm:w-[85vw]
            sm:h-[55vw]

            lg:w-[75vw]
            lg:h-[47vw]

            mx-auto
            border-4
            lg:border-8
            border-black
          "
        >
          <ZoomViewer />
        </div>

        <div className="flex justify-center">
          {/* HIDDEN ART */}
          <h2
            className="
              inline-block
              py-3
              px-20
              rounded-xl
              bg-black/55
              backdrop-blur-sm
              border
              border-white/10
              shadow-2xl
              text-center
              font-[Hevitas]
              text-xl
              sm:text-2xl
              lg:text-3xl
              text-white
            "
          >
            Click the clues to zoom to hidden art!
          </h2>
        </div>
        {/* CARDS */}
        <div className="flex flex-wrap justify-center gap-3">
          <div
            className={`${card} cursor-pointer`}
            onClick={() => zoomToArt("lizards")}
          >
            17 Lizards
          </div>
          <div
            className={`${card} cursor-pointer`}
            onClick={() => zoomToArt("cats")}
          >
            9 Cats
          </div>
          <div
            className={`${card} cursor-pointer`}
            onClick={() => zoomToArt("hanTyumis")}
          >
            3 Han-Tyumis
          </div>
          <div
            className={`${card} cursor-pointer`}
            onClick={() => zoomToArt("frog")}
          >
            1 Frog
          </div>
          <div
            className={`${card} cursor-pointer`}
            onClick={() => zoomToArt("fishies")}
          >
            5 Fishies Faces
          </div>
          <div
            className={`${card} cursor-pointer`}
            onClick={() => zoomToArt("rattlesnakes")}
          >
            2 Rattlesnakes
          </div>
          <div
            className={`${card} cursor-pointer`}
            onClick={() => zoomToArt("flowers")}
          >
            5 Flowers
          </div>
          <div
            className={`${card} cursor-pointer`}
            onClick={() => zoomToArt("pigs")}
          >
            2 Pigs
          </div>
          <div
            className={`${card} cursor-pointer`}
            onClick={() => zoomToArt("mushrooms")}
          >
            4 Mushrooms
          </div>
        </div>
        <div className="flex justify-center">
          <h2
            className="
              inline-block
              py-3
              px-20
              rounded-xl
              bg-black/55
              backdrop-blur-sm
              border
              border-white/10
              shadow-2xl

              text-center
              font-[Hevitas]
              text-xl
              sm:text-2xl
              lg:text-3xl
              text-white
            "
          >
            And anything else we missed!
          </h2>
        </div>
        {/* FULL WIDTH RIBBON */}
        <div className="relative w-screen left-1/2 -translate-x-1/2 py-8 my-12">

          {/* Ribbon Background */}
          <div
            className="
              absolute
              inset-0
              bg-gradient-to-r
              from-[#75032b]
              via-black
              to-[#1a8c70]
              shadow-2xl
              border-y
              border-white/10
            "
          />

          {/* Ribbon Content */}
          <div className="relative z-10 w-[92%] lg:w-[90%] mx-auto">

            <h1
              className="
                font-[Roberta]
                text-4xl
                sm:text-5xl
                lg:text-7xl
                underline
                decoration-blue-500
                decoration-2
                underline-offset-4
                text-white
              "
            >
              At Field Of Vision 2025...
            </h1>

          </div>
        </div>

        {/* FOUR SQUARE SECTION */}
        <div
          ref={sectionRef}
          className="
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-20
            lg:gap-24
            w-[95%]
            lg:w-[80%]
            mx-auto
          "
        >

          {/* TOP LEFT IMAGE */}
          <div className="overflow-hidden rounded-xl">
            <img
              src="./signing.png"
              className="
                w-full
                h-full
                object-cover
                border-4
                border-[#4f1319]
                rounded-xl
              "
            />
          </div>

          {/* TOP RIGHT TEXT */}
          <div className="flex items-center justify-center">
            <div
              className="
                inline-block
                max-w-prose
                p-5
                sm:p-8
                lg:p-10
                bg-black/80
                rounded-xl
                rounded-bl-none
                rounded-br-3xl
                text-base
                sm:text-xl
                lg:text-2xl
                text-center
                font-[Hevitas]
                text-white
              "
            >
              We banded together to tell King Gizzard how much we love them
              for everything they do for us! The insane amount of quality
              albums filled with love and soul, the bootleg support for
              artists across the globe, and the genuine care for their fans
              at the live shows! They deserve to know that WE LOVE THEM
              BACK!
            </div>
          </div>

          {/* BOTTOM LEFT TEXT */}
          <div className="flex items-center justify-center">
            <div
              className="
                inline-block
                max-w-prose
                p-5
                sm:p-8
                lg:p-10
                bg-black/80
                rounded-xl
                rounded-bl-none
                rounded-br-3xl
                text-base
                sm:text-xl
                lg:text-2xl
                text-center
                font-[Hevitas]
                text-white
              "
            >
              We signed our names, wrote heartfelt messages, told jokes, puns,
              and admissions, and made lots of art! Everything we wanted to say to
              them, we put it on there, and in the first year of doing this
              WE GOT IT BACKSTAGE!
            </div>
          </div>

          {/* BOTTOM RIGHT POLAROID */}
          <div
            className="
              relative
              aspect-square
              w-[80vw]
              sm:w-[60vw]
              lg:w-full
              mx-auto
              scale-90
              lg:scale-100
            "
          >

            {/* MAIN IMAGE */}
            <div
              className="
                absolute
                inset-0
                overflow-hidden
                rounded-xl
                border-4
                border-[#4f1319]
                z-10
              "
            >
              <img
                src="./polaroid.jpg"
                className="
                  w-full
                  h-full
                  object-cover
                  scale-[1.2]
                  object-[-10px_75%]
                "
              />
            </div>

            {/* TOP LEFT */}
            <img
              src="./scrap1.png"
              className="
                absolute
                z-20
                w-[25%]
                top-0
                left-0
                -translate-x-1/2
                -translate-y-1/2
                rotate-[-22deg]
                scale-110
                lg:scale-[1.3]
                shadow-xl
                border
                border-[#4f1319]
              "
            />

            {/* TOP RIGHT */}
            <img
              src="./scrap2.png"
              className="
                absolute
                z-20
                w-[25%]
                top-0
                right-0
                translate-x-1/2
                -translate-y-1/2
                rotate-[33deg]
                scale-125
                lg:scale-[2]
                shadow-xl
                border
                border-[#4f1319]
              "
            />

            {/* BOTTOM LEFT */}
            <img
              src="./scrap3.png"
              className="
                absolute
                z-20
                w-[25%]
                bottom-0
                left-0
                -translate-x-4/5
                translate-y-1/2
                rotate-[-20deg]
                scale-125
                lg:scale-[1.7]
                shadow-xl
                border
                border-[#4f1319]
              "
            />

            {/* BOTTOM RIGHT */}
            <img
              src="./scrap4.png"
              className="
                absolute
                z-20
                w-[25%]
                bottom-0
                right-0
                translate-x-1/2
                translate-y-1/2
                rotate-[-30deg]
                scale-125
                lg:scale-[2.5]
                shadow-xl
                border
                border-[#4f1319]
              "
            />
          </div>
        </div>

        {/* FULL WIDTH RIBBON */}
        <div className="relative w-screen left-1/2 -translate-x-1/2 py-8 mt-22 lg:mt-40">

          {/* Ribbon Background */}
          <div
            className="
              absolute
              inset-0
              bg-gradient-to-r
              from-[#1a8c70]
              via-black
              to-[#75032b]
              shadow-2xl
              border-y
              border-white/10
            "
          />

          {/* Ribbon Content */}
          <div 
            className="
              relative 
              z-10 w-[92%]
              lg:w-[90%]
              mx-auto
            "
          >

            <h1
              className="
                font-[Roberta]
                text-4xl
                sm:text-5xl
                lg:text-7xl
                underline
                decoration-blue-500
                decoration-2
                underline-offset-4
                text-white
              "
            >
              Missed out from last year?
            </h1>
          </div>
        </div>
        <div
          className="
            flex
            flex-col
            lg:flex-row
            items-center
            gap-8
          "
        >
          <div
            className="
              p-5
              sm:p-8
              lg:p-10
              font-[Hevitas]
              space-y-6
              text-base
              sm:text-lg
              lg:text-xl
              text-white
              bg-black/80
              rounded-xl
              rounded-bl-none
              rounded-br-2xl
              max-w-prose
            "
            ref={section2Ref} 
          >
            <p>Well don't worry!</p>

            <p>
              We are making ANOTHER BOARD for Field of Vision 2! (Currently under
              construction so it doesnt blow away in the wind like last time.)
            </p>

            <p>
              Keep a look out on r/KGATLW for the post about the second board
              where we will ask YOU guys to make the heading! Finally, with all
              that said...
            </p>
          </div>
          {/* IMAGE */}
          <div
            className="
              w-[70%]
              lg:w-[45%]
              lg:min-w-[45%]
              flex
              justify-center
              m-10
            "
          >
            <img
              src="/new_board.JPG"
              className="
                w-full
                scale-130
                max-w-[400px]
                rounded-xl
                border-4
                border-[#4f1319]
                object-cover
              "
            />
          </div>
        </div>

        {/* END TITLE */}
        <div className="w-full flex justify-center px-4 sm:px-8 overflow-visible">
          <h1
            className="
              font-[DavidaOpti]
              inline-block
              text-center
              text-[clamp(1.8rem,8vw,10rem)]
              text-green-500
              gradient-stroke
              leading-none
              whitespace-nowrap
              max-w-[100vw]
            "
            style={{
              transform: "perspective(300px) rotateX(-20deg)",
              transformOrigin: "center top",
            }}
          >
            See you next year!
          </h1>
        </div>

        {/* FINAL IMAGE */}
        <div className="w-full flex justify-center mt-12 pb-20">
          <img
            src="./fov.png"
            className="w-32 sm:w-48 lg:w-64 h-auto"
          />
        </div>
      </div>
    </div>
  );
}