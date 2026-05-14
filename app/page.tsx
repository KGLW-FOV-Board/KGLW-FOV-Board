"use client";

import ZoomViewer from "@/src/components/ZoomViewer";
import BackgroundFade from "@/src/components/BackgroundFade";
import localFont from "next/font/local";
import { useRef } from "react";

const Gladolia = localFont({
  src: "../src/fonts/GladoliaDEMO-Regular.otf",
  variable: "--font-myfont",
});

const DavidaOpti = localFont({
  src: "../src/fonts/DavidaOpti-Bold.otf",
  variable: "--font-myfont",
});

const Roberta = localFont({
  src: "../src/fonts/Roberta Regular.ttf",
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
  transition
`;

export default function Home() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const fadeRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Background 1 */}
      <div
        className="fixed inset-0 bg-cover bg-center z-[-2]"
        style={{ backgroundImage: "url('./bg_1.svg')" }}
      />

      {/* Background 2 (fades) */}
      <div
        ref={fadeRef}
        className="
          fixed
          inset-0
          bg-cover
          bg-center
          z-[-1]
          transition-opacity
          duration-150
          scale-110
        "
        style={{ backgroundImage: "url('./bg_2.svg')" }}
      />

      <BackgroundFade sectionRef={sectionRef} fadeRef={fadeRef} />

      {/* MAIN CONTENT */}
      <div className="w-[92%] lg:w-[90%] mx-auto mt-20 space-y-10">

        {/* TITLE */}
        <div className="flex justify-center w-full">
          <h1
            className="
              font-[DavidaOpti]
              text-centr
              text-[clamp(3rem,10vw,10rem)]
              text-green-500
              gradient-stroke
              leading-none
              whitespace-nowrap
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
            Can you find all of the hidden art?
          </h2>
        </div>
        {/* CARDS */}
        <div className="flex flex-wrap justify-center gap-3">
          <div className={card}>15 Lizards</div>
          <div className={card}>7 Cats</div>
          <div className={card}>3 Han-Tyumis</div>
          <div className={card}>1 Frog</div>
          <div className={card}>3 Fishies Faces</div>
          <div className={card}>1 Rattlesnake</div>
          <div className={card}>2 Flowers</div>
          <div className={card}>1 Pig</div>
          <div className={card}>4 Mushrooms</div>
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
              Sign your name, write a heartfelt message, tell a joke, a pun,
              an admission, or make some art! Anything you want to say to
              them, put it on there, because if the first year of doing this
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
              Missed out from last year?
            </h1>
          </div>
        </div>
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

        {/* END TITLE */}
        <div className="flex justify-center">
          <h1
            className="
              font-[DavidaOpti]
              text-center
              text-[clamp(3rem,9vw,10rem)]
              text-green-500
              gradient-stroke
              leading-none
              whitespace-nowrap
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