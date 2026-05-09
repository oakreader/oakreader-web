"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReveal } from "@/hooks/use-reveal";

gsap.registerPlugin(ScrollTrigger);

const useCases = [
  {
    number: "01",
    title: "Read deeper, not just faster",
    description:
      "Open any PDF and ask Oak what it means. Summarize a chapter, explain a concept, translate a passage — Oak reads alongside you so every page earns its time.",
    color: "from-sky-100 via-blue-50 to-indigo-100",
  },
  {
    number: "02",
    title: "Your notes become a conversation",
    description:
      "Highlight a passage and Oak surfaces what matters. Add notes, sketch ideas, mark key points — your annotations become a dialogue with the text, not just color on a page.",
    color: "from-violet-100 via-purple-50 to-fuchsia-100",
  },
  {
    number: "03",
    title: "Find the answer without hunting it down",
    description:
      "Ask once. Oak searches across your entire library — every PDF, every highlight, every note — and answers like someone who's read every page.",
    color: "from-emerald-100 via-teal-50 to-cyan-100",
  },
];

export function UseCases() {
  const [activeIndex, setActiveIndex] = useState(0);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const headingRef = useReveal<HTMLDivElement>();

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];
    contentRefs.current.forEach((el, i) => {
      if (!el) return;
      triggers.push(
        ScrollTrigger.create({
          trigger: el,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveIndex(i),
          onEnterBack: () => setActiveIndex(i),
        })
      );
    });
    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <section
      id="use-cases"
      className="mt-[6rem] md:mt-[8rem] mb-[8rem] md:mb-[10rem] max-w-[120rem] mx-auto px-[1rem] md:px-[2rem]"
    >
      <div
        ref={headingRef}
        data-reveal
        className="text-center px-[2rem] mb-[4rem] md:mb-[5rem]"
      >
        <h2 className="font-exposure font-bold text-[3.2rem] md:text-[4rem] lg:text-[4.8rem] leading-[1.15] tracking-[-0.01em] max-w-[20ch] mx-auto">
          Oak reads between the lines
        </h2>
      </div>

      {/* Mobile */}
      <div className="md:hidden flex flex-col gap-y-[6rem]">
        {useCases.map((uc, i) => (
          <MobileCard key={i} useCase={uc} index={i} />
        ))}
      </div>

      {/* Desktop */}
      <div className="hidden md:grid grid-cols-12 gap-x-[2rem]">
        <div className="col-span-4">
          <div className="sticky top-[20svh]">
            <nav className="flex flex-col" aria-label="Use cases">
              {useCases.map((uc, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() =>
                    contentRefs.current[i]?.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                    })
                  }
                  className={`relative text-left px-[2.4rem] py-[2rem] rounded-[1.6rem] transition-all duration-300 ${
                    activeIndex === i ? "bg-black/[0.04]" : "bg-transparent"
                  }`}
                >
                  <div
                    className={`absolute left-0 top-[16%] bottom-[16%] w-[3px] rounded-full transition-all duration-300 ${
                      activeIndex === i ? "bg-black" : "bg-black/15"
                    }`}
                  />
                  <span
                    className={`block font-mono text-[1.1rem] leading-[1.4rem] mb-[0.8rem] transition-colors duration-300 uppercase tracking-[0.1em] ${
                      activeIndex === i ? "text-black/35" : "text-black/25"
                    }`}
                  >
                    {uc.number}
                  </span>
                  <span
                    className={`block font-exposure font-bold text-[2.2rem] leading-[2.8rem] lg:text-[2.4rem] lg:leading-[3rem] tracking-[0em] transition-all duration-300 ${
                      activeIndex === i ? "text-black" : "text-black/35"
                    }`}
                  >
                    {uc.title}
                  </span>
                  <div
                    className="grid overflow-hidden transition-all duration-500"
                    style={{
                      gridTemplateRows: activeIndex === i ? "1fr" : "0fr",
                      opacity: activeIndex === i ? 1 : 0,
                    }}
                  >
                    <div className="min-h-0">
                      <p className="font-sans pt-[1rem] text-[1.6rem] leading-[2.4rem] text-black/50 max-w-[32ch]">
                        {uc.description}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="col-span-8 flex flex-col gap-y-[2rem]">
          {useCases.map((uc, i) => (
            <div
              key={i}
              ref={(el) => {
                contentRefs.current[i] = el;
              }}
              className="min-h-[60svh] flex items-start pt-0 pb-[4rem]"
            >
              <RevealCard useCase={uc} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MobileCard({
  useCase,
  index,
}: {
  useCase: (typeof useCases)[0];
  index: number;
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      data-reveal
      style={{ "--reveal-delay": `${index * 0.1}s` } as React.CSSProperties}
      className="flex flex-col gap-y-[2rem]"
    >
      <UseCasePlaceholder useCase={useCase} />
      <div className="px-[1rem]">
        <span className="block font-mono text-[1.2rem] leading-[1.6rem] mb-[0.6rem] text-black/35 uppercase tracking-[0.1em]">
          {useCase.number}
        </span>
        <h3 className="font-exposure font-bold text-[2.4rem] leading-[3rem] tracking-[0em] text-black">
          {useCase.title}
        </h3>
        <p className="font-sans mt-[0.8rem] text-[1.6rem] leading-[2.4rem] text-black/50">
          {useCase.description}
        </p>
      </div>
    </div>
  );
}

function RevealCard({
  useCase,
  index,
}: {
  useCase: (typeof useCases)[0];
  index: number;
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      data-reveal
      style={{ "--reveal-delay": `${index * 0.1}s` } as React.CSSProperties}
      className="w-full"
    >
      <UseCasePlaceholder useCase={useCase} />
    </div>
  );
}

function UseCasePlaceholder({
  useCase,
}: {
  useCase: (typeof useCases)[0];
}) {
  return (
    <div
      className={`relative rounded-[2rem] md:rounded-[2.4rem] overflow-hidden bg-gradient-to-br ${useCase.color} aspect-[16/10] flex flex-col items-center justify-center border border-black/5`}
    >
      <div className="absolute top-0 left-0 right-0 h-[4rem] bg-white/40 backdrop-blur-sm flex items-center px-[1.6rem] gap-[0.8rem]">
        <span className="w-[1.2rem] h-[1.2rem] rounded-full bg-red-300/60" />
        <span className="w-[1.2rem] h-[1.2rem] rounded-full bg-yellow-300/60" />
        <span className="w-[1.2rem] h-[1.2rem] rounded-full bg-green-300/60" />
        <div className="flex-1 mx-[2rem] h-[2.4rem] bg-white/50 rounded-[0.6rem]" />
      </div>
      <div className="text-center p-[4rem] pt-[6rem]">
        <span className="font-mono text-[1.3rem] uppercase tracking-[0.1em] text-black/30 mb-[1rem] block">
          {useCase.number}
        </span>
        <h3 className="font-exposure font-bold text-[2.4rem] md:text-[3.2rem] tracking-[0em] text-black/50">
          {useCase.title}
        </h3>
        <p className="font-sans mt-[1rem] text-[1.6rem] text-black/30 max-w-[40ch] mx-auto leading-[2.4rem]">
          {useCase.description}
        </p>
      </div>
    </div>
  );
}
