"use client";

import { useReveal, useRevealChildren } from "@/hooks/use-reveal";

const featureRows = [
  [
    {
      tag: "AI Chat",
      description:
        "Open any paper, any report, any manual — and just ask. Oak reads the full document and answers in context, whether you need a summary, an explanation, or a second opinion on what you just read.",
      colClass: "md:col-span-6",
      gradient: "from-blue-100 via-blue-50 to-indigo-100",
      icon: "A",
    },
    {
      tag: "Library",
      description:
        "Every PDF, article, and web snapshot in one place, organized your way. Collections, tags, and full-text search mean you always find what you need — even when you can't remember where you saved it.",
      colClass: "md:col-span-4",
      gradient: "from-violet-100 via-purple-50 to-fuchsia-100",
      icon: "L",
    },
  ],
  [
    {
      tag: "Annotations",
      description:
        "Highlight key passages, drop notes in the margin, sketch a diagram right on the page. Your markup is saved separately, so the original stays clean while your thinking lives on top.",
      colClass: "md:col-span-4",
      gradient: "from-emerald-100 via-teal-50 to-cyan-100",
      icon: "N",
    },
    {
      tag: "Voice",
      description:
        "Talk to your documents instead of typing. Ask a question out loud, hear Oak's answer, and keep your eyes on the page. Perfect for long reading sessions when your hands are full.",
      colClass: "md:col-span-6",
      gradient: "from-amber-100 via-yellow-50 to-orange-100",
      icon: "V",
    },
  ],
  [
    {
      tag: "YouTube",
      description:
        "Watch a lecture, a talk, or a tutorial — and ask Oak about it afterward. Oak follows along with the transcript so you can search, summarize, or revisit any moment without scrubbing through the whole video.",
      colClass: "md:col-span-6",
      gradient: "from-rose-100 via-pink-50 to-red-100",
      icon: "Y",
    },
    {
      tag: "Web Capture",
      description:
        "Found an article worth keeping? Save it straight from your browser into Oak. Web snapshots preserve the content exactly as you found it — no broken links, no paywalls, always available.",
      colClass: "md:col-span-4",
      gradient: "from-sky-100 via-cyan-50 to-teal-100",
      icon: "W",
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
              <div
                className={`w-full aspect-[16/10] bg-gradient-to-br ${feature.gradient} rounded-t-[1.2rem] flex flex-col items-center justify-center relative`}
                style={{
                  filter:
                    "drop-shadow(0 2px 4px rgba(0,0,0,0.10)) drop-shadow(0 18px 24px rgba(0,0,0,0.12))",
                }}
              >
                <div className="absolute top-0 left-0 right-0 h-[3rem] bg-white/50 flex items-center px-[1.2rem] gap-[0.6rem]">
                  <span className="w-[0.8rem] h-[0.8rem] rounded-full bg-red-300/50" />
                  <span className="w-[0.8rem] h-[0.8rem] rounded-full bg-yellow-300/50" />
                  <span className="w-[0.8rem] h-[0.8rem] rounded-full bg-green-300/50" />
                  <div className="flex-1 mx-[1rem] h-[1.8rem] bg-white/40 rounded-[0.4rem]" />
                </div>
                <div className="w-[6rem] h-[6rem] rounded-[1.2rem] bg-white/60 backdrop-blur-sm border border-white/80 flex items-center justify-center">
                  <span className="text-[2.4rem] text-black/20 font-exposure font-bold">
                    {feature.icon}
                  </span>
                </div>
                <p className="mt-[1rem] text-[1.3rem] text-black/20 font-mono uppercase tracking-[0.1em]">
                  {feature.tag}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
