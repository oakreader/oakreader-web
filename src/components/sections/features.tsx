"use client";

import { useReveal, useRevealChildren } from "@/hooks/use-reveal";

type Feature = {
  tag: string;
  description: string;
  colClass: string;
  gradient: string;
  image?: string;
  icon?: "pencil" | "note" | "cards";
};

const featureRows: Feature[][] = [
  [
    {
      tag: "AI Chat",
      description:
        "Ask any document a question and get an answer in context — with formatted notes, code, and real rendered math. Bring your own model: Claude, GPT, Gemini, or a local one running on your Mac.",
      colClass: "md:col-span-6",
      gradient: "from-blue-100 via-blue-50 to-indigo-100",
      image: "/shots/ai-chat.png",
    },
    {
      tag: "In-app Browser",
      description:
        "A real browser built in. Search the web, open a link, or ask the AI from a single box — then read live pages in place with your logins intact.",
      colClass: "md:col-span-4",
      gradient: "from-emerald-100 via-teal-50 to-cyan-100",
      image: "/shots/browser.png",
    },
  ],
  [
    {
      tag: "Annotations",
      description:
        "Highlight key passages, drop notes in the margin, sketch a diagram right on the page. Your markup is saved separately, so the original stays clean while your thinking lives on top.",
      colClass: "md:col-span-6",
      gradient: "from-amber-100 via-yellow-50 to-orange-100",
      icon: "pencil",
    },
    {
      tag: "Flashcards",
      description:
        "Turn what you read into study cards in a click, then review them with spaced repetition so it actually sticks.",
      colClass: "md:col-span-4",
      gradient: "from-sky-100 via-cyan-50 to-teal-100",
      icon: "cards",
    },
  ],
  [
    {
      tag: "Notes",
      description:
        "A rich WYSIWYG editor with live LaTeX and Typst, so your thinking — equations and all — lives right next to what you're reading.",
      colClass: "md:col-span-6",
      gradient: "from-rose-100 via-pink-50 to-red-100",
      icon: "note",
    },
  ],
];

export function Features() {
  const headingRef = useReveal<HTMLParagraphElement>();

  return (
    <section
      id="features"
      className="my-[8rem] md:my-[12rem] max-w-[120rem] mx-auto px-[1rem] md:px-[2rem]"
    >
      <p
        ref={headingRef}
        data-reveal
        className="font-exposure font-bold text-[3.2rem] md:text-[4rem] lg:text-[4.8rem] leading-[1.15] tracking-[-0.01em] text-center max-w-[17ch] mx-auto"
      >
        Built for how you actually read
      </p>

      <div className="mt-[6rem] md:mt-[8rem] flex flex-col gap-[1rem] md:gap-[2rem]">
        {featureRows.map((row, rowIdx) => (
          <FeatureRow key={rowIdx} row={row} />
        ))}
      </div>
    </section>
  );
}

function FeatureRow({
  row,
}: {
  row: (typeof featureRows)[0];
}) {
  const rowRef = useRevealChildren<HTMLDivElement>("[data-feature-card]");

  return (
    <div
      ref={rowRef}
      className="grid grid-cols-1 gap-[1rem] md:gap-[2rem] md:grid-cols-10"
    >
      {row.map((feature, i) => (
        <div
          key={i}
          data-feature-card
          data-reveal
          className={`bg-[#f5f5f5] ${feature.colClass} rounded-[1.2rem] border border-solid border-black/[0.06] overflow-hidden flex flex-col min-h-[40rem]`}
        >
          <div className="p-[3rem] flex flex-col gap-[2rem] md:p-[2rem] md:gap-[1rem] lg:p-[3rem] lg:gap-[2rem] flex-shrink-0">
            <div className="h-[3.5rem] bg-white px-[1.6rem] font-sans text-[1.6rem] leading-[3.3rem] border border-solid border-black/[0.06] rounded-[2rem] text-black/50 w-fit font-medium">
              {feature.tag}
            </div>
            <h3 className="font-sans font-normal text-[1.8rem] leading-[1.5] text-black/50">
              {feature.description}
            </h3>
          </div>

          <div className="flex-1 min-h-0 flex items-end px-[3rem] md:px-[4rem] lg:px-[7rem]">
            <div
              className="w-full overflow-hidden rounded-t-[1.2rem]"
              style={{
                maskImage:
                  "linear-gradient(180deg, black 0%, black 50%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(180deg, black 0%, black 50%, transparent 100%)",
              }}
            >
              {feature.image ? (
                <div
                  className="w-full aspect-[16/10] rounded-t-[1.2rem] overflow-hidden border-t border-x border-black/10 bg-white"
                  style={{
                    filter:
                      "drop-shadow(0 2px 4px rgba(0,0,0,0.10)) drop-shadow(0 18px 24px rgba(0,0,0,0.12))",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={feature.image}
                    alt={feature.tag}
                    loading="lazy"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              ) : (
                <div
                  className={`w-full aspect-[16/10] bg-gradient-to-br ${feature.gradient} rounded-t-[1.2rem] flex flex-col items-center justify-center relative`}
                  style={{
                    filter:
                      "drop-shadow(0 2px 4px rgba(0,0,0,0.10)) drop-shadow(0 18px 24px rgba(0,0,0,0.12))",
                  }}
                >
                  <div className="w-[6.4rem] h-[6.4rem] rounded-[1.6rem] bg-white/70 backdrop-blur-sm border border-white/80 flex items-center justify-center text-black/35">
                    <FeatureIcon name={feature.icon} />
                  </div>
                  <p className="mt-[1.2rem] text-[1.3rem] text-black/25 font-mono uppercase tracking-[0.1em]">
                    {feature.tag}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function FeatureIcon({ name }: { name?: Feature["icon"] }) {
  const common = {
    width: 30,
    height: 30,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  if (name === "pencil") {
    return (
      <svg {...common}>
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
      </svg>
    );
  }
  if (name === "note") {
    return (
      <svg {...common}>
        <path d="M4 4h16v12l-4 4H4Z" />
        <path d="M16 20v-4h4" />
        <path d="M8 9h8M8 13h5" />
      </svg>
    );
  }
  // cards
  return (
    <svg {...common}>
      <rect x="3" y="6" width="13" height="13" rx="2" />
      <path d="M8 3h11a2 2 0 0 1 2 2v11" />
    </svg>
  );
}
