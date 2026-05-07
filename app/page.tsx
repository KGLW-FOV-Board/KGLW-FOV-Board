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

const card = "w-42 h-24 flex items-center justify-center text-center text-lg font-[Hevitas] p-4 bg-black/50 border border-white/10 rounded-xl hover:scale-105 transition";
/*"card min-h-[80px] max-w-[150px] flex items-center justify-center text-center p-4 bg-black/50 border border-white/10 rounded-xl hover:scale-105 transition"*/
/*      bg-cover
        bg-center
        bg-[url(/bg_1.svg)]
*/
export default function Home() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const fadeRef = useRef<HTMLDivElement | null>(null);
  return (
    <div 
      className="
        min-h-screen
        flex
        items-center
        justify-center
        pt-15
      "
    >
      {/* Background 2 (fades) */}
      <div
        className="fixed inset-0 bg-cover bg-center z-[-1] transition-opacity duration-150 scale-125"
        style={{ backgroundImage: "url('/bg_2.svg')" }}
      />
      {/* Background 1 */}
      <div
        ref={fadeRef}
        className="fixed inset-0 bg-cover bg-center z-[-1] transition-opacity duration-150"
        style={{ backgroundImage: "url('/bg_1.svg')" }}
      />
      <BackgroundFade sectionRef={sectionRef} fadeRef={fadeRef} />
      <div className="space-y-3 w-[90%]">
        <h1 
          className="
            font-[Gladolia]
            text-center 
            text-[clamp(8rem,40vw,10rem)]
            text-8xl 
            text-green-500 
            gradient-stroke
          "
          style={{
            transform: "perspective(200px) rotateX(20deg)",
            transformOrigin: "center bottom",
          }}
        >
          The Weirdo Board
        </h1>
        <div 
          className="
            overflow-hidden 
            rounded-3xl
            w-[80vw] 
            aspect-[90/66] 
            mx-auto 
            border-8 
            border-black
          "
        >
          <ZoomViewer/>
        </div>
        <h2 
          className="
            text-center 
            font-[Hevitas]
            text-3xl 
          "
        >
          Can you find all of the hidden art?
        </h2>
        <div className="flex flex-col items-center gap-6">
          {/* Row 1: 5 items */}
          <div className="flex gap-4">
            <div className={card}>15 Lizards</div>
            <div className={card}>7 Cats</div>
            <div className={card}>3 Han-Tyumis</div>
            <div className={card}>1 Frog</div>
            <div className={card}>3 Fishies Faces</div>
          </div>
          {/* Row 2: 4 centered items */}
          <div className="flex gap-4">
            <div className={card}>1 Rattlesnake</div>
            <div className={card}>2 Flowers</div>
            <div className={card}>1 Pig</div>
            <div className={card}>4 Mushrooms</div>
          </div>
        </div>
        <h2 
          className="
            text-center 
            text-3xl 
            font-[Hevitas]
          "
        >
          And anything else we missed!
        </h2>
        <h1 
          className="
            pt-[20px]
            font-[Roberta]
            text-7xl
            underline
            decoration-blue-500
            decoration-2 
            underline-offset-4
          "
        >
          At Field Of Vision 2025...
        </h1>
        <div ref={sectionRef} className="grid grid-cols-2 gap-40 w-[80%] max-w-8xl mx-auto">

          {/* top-left image */}
          <div className="overflow-hidden">
            <img src="./signing.png" className="w-full h-full object-cover border-4 border-[#4f1319] rounded-xl" />
          </div>

          {/* top-right text */}
          <div className="flex items-center justify-center text-center aspect-square p-6 bg-black/80 rounded-xl rounded-bl-none rounded-br-3xl text-2xl font-[Hevitas]">
            We banded together to tell King Gizzard how much we love them for everything they do for us!
            The insane amount of quality albums filled with love and soul, the bootleg support for artists across the globe,
            and the genuine care for their fans at the live shows! They deserve to know that WE LOVE THEM BACK!
          </div>

          {/* bottom-left text */}
          <div className="flex items-center justify-center text-center aspect-square p-6 bg-black/80 rounded-xl rounded-bl-none rounded-br-3xl text-2xl font-[Hevitas]">
            Sign your name, write a heartfelt message, tell a joke, a pun, an admission, or make some art! Anything you
            want to say to them, put it on there, because if the first year of doing this WE GOT IT BACKSTAGE!
          </div>

          {/* bottom-right polaroid */}
          <div className="relative aspect-square w-full">

            {/* MAIN IMAGE */}
            <div className="absolute inset-0 overflow-hidden z-20">
              <img src="/polaroid.jpg" className="w-full h-full object-cover rounded-xl border-4 border-[#4f1319]" />
            </div>

            {/* SCRAPS */}

            <img
              src="/scrap1.png" 
              className="absolute z-10 w-[25%] top-0 left-0 -translate-x-1/2 -translate-y-1/2 rotate-[-22deg] shadow-xl border border-white"
            />

            <img
              src="/scrap2.png"
              className="absolute z-10 w-[25%] top-0 right-0 translate-x-1/2 -translate-y-1/2 rotate-[10deg] shadow-xl border border-white"
            />

            <img
              src="/scrap3.png"
              className="absolute z-10 w-[25%] bottom-0 left-0 -translate-x-1/2 translate-y-1/2 rotate-[6deg] shadow-xl border border-white"
            />

            <img
              src="/scrap4.png"
              className="absolute z-10 w-[25%] bottom-0 right-0 translate-x-1/2 translate-y-1/2 rotate-[-10deg] shadow-xl border border-white"
            />
          </div>
        </div>
        <h1 
          className="
            pt-[150px]
            font-[Roberta]
            text-5xl
            underline
            decoration-blue-500
            decoration-2 
            underline-offset-4
          "
        >
          Missed out from last year?
        </h1>
        <div
          className="
            font-[Hevitas]
            space-y-6
          "
        >
          <p>Well don't worry!</p>
          <p>
            We are making ANOTHER BOARD for Field of Vision 2!
            (Currently under construction so it doesnt blow away in the wind like last time.)
          </p>
          <p>
            Keep a look out on r/KGATLW for the post about the second board where we will as YOU
            guys to make the heading! Finally, with all that said...
          </p>
        </div>
        <h1 
          className="
            font-[DavidaOpti]
            text-center 
            text-[clamp(8rem,10rem)]
            text-8xl 
            text-green-500 
            gradient-stroke
          "
          style={{
            transform: "perspective(300px) rotateX(-20deg)",
            transformOrigin: "center top",
          }}
        >
          See you next year!
        </h1>
        <div className="w-full flex justify-center mt-12">
          <img
            src="/peeker.png"
            className="w-64 h-auto"
          />
        </div>
      </div>
    </div>
  )
};
