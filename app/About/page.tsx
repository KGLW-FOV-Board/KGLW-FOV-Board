"use client";

const members = [
  {
    name: "Riley",
    image: "/riley.jpg",
    bio: `
      The man, the myth, the legend! Riley is responsible for this whole
      Gizzboard idea. He is majoring in art and with a crippling addiction to 
      KGLW and with that came up with the original ideas.
    `,
    imagePosition: "object-[50%_90%]",
  },
  {
    name: "Kyle",
    image: "/kyle.png",
    bio: `
      Hey! I'm your friendly neighborhood IT guy and the originator of the 
      KGLW obsession in our friend group. I was helped Riley 
      with the construction, transport, and management of the first board at FOV 2025.
      About to give it away we had the idea to digitally preserve the board and a CS degree 
      that was screaming to be used so I programmed this site! 
      (with design decisions being made by Riley because I'm colorblind).
      Hope you enjoy!
    `,
    imagePosition: "object-[0%_37%]",
  },
];

export default function AboutPage() {
  return (
    <div
      className="
        min-h-screen
        overflow-x-hidden
        px-6
        py-24
        space-y-24
      "
    >
      {/* PAGE TITLE */}
      <div className="text-center">
        <h1
          className="
            text-5xl
            sm:text-6xl
            lg:text-7xl
            font-bold
            text-white
          "
        >
          About Us
        </h1>

        <p className="mt-4 text-white/70 text-lg">
          The weirdos behind the board.
        </p>
      </div>

      {/* MEMBERS */}
      <div className="space-y-32">

        {members.map((member, index) => (
          <div
            key={member.name}
            className={`
              flex
              flex-col
              lg:flex-row
              ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}
              items-center
              gap-10
              lg:gap-20
            `}
          >

            {/* IMAGE */}
            <div className="w-full lg:w-1/2 flex justify-center">
              <div
                className="
                  overflow-hidden
                  rounded-3xl
                  border-4
                  border-[#4f1319]
                  shadow-2xl
                  w-full
                  max-w-md
                  aspect-2/3
                "
              >
                <img
                  src={member.image}
                  className={`
                    w-full
                    h-full
                    object-cover
                    ${member.imagePosition}
                  `}
                />
              </div>
            </div>

            {/* TEXT */}
            <div className="w-full lg:w-1/2">
              <div
                className="
                  bg-black/70
                  backdrop-blur-sm
                  p-8
                  lg:p-12
                  rounded-3xl
                  rounded-bl-none
                  text-white
                  shadow-2xl
                  border
                  border-white/10
                "
              >
                <h2
                  className="
                    text-3xl
                    lg:text-5xl
                    mb-6
                    font-bold
                  "
                >
                  {member.name}
                </h2>

                <p
                  className="
                    text-lg
                    lg:text-xl
                    leading-relaxed
                    text-white/90
                  "
                >
                  {member.bio}
                </p>
              </div>
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}