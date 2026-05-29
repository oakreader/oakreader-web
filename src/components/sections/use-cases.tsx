"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReveal } from "@/hooks/use-reveal";

gsap.registerPlugin(ScrollTrigger);

const useCases = [
  {
    number: "01",
    title: "Ask, and read between the lines",
    description:
      "Open any document and ask Oak what it means. It answers in context with formatted notes, code, and rendered math — and you can switch between Claude, GPT, Gemini, or a local model on your Mac.",
    image: "/shots/ai-agent.png",
    alt: "Oak answering a question with formatted markdown and rendered LaTeX math",
    color: "from-sky-100 via-blue-50 to-indigo-100",
  },
  {
    number: "02",
    title: "Browse the web without leaving",
    description:
      "Open a new tab and search the web, jump straight to a link, or just ask the AI. Read live pages in place with your logins intact, then capture anything worth keeping into your library.",
    image: "/shots/browser-search.png",
    alt: "Oak's in-app browser new-tab search routing to the web or the AI",
    color: "from-emerald-100 via-teal-50 to-cyan-100",
  },
  {
    number: "03",
    title: "Your whole library, one question away",
    description:
      "Every PDF, article, and web snapshot in one place — sorted into collections and tags, with full-text search that even understands Chinese, Japanese, and Korean. Ask once and Oak reads across all of it.",
    image: "/shots/library.png",
    alt: "Oak's library with collections, tags, and full-text search",
    color: "from-violet-100 via-purple-50 to-fuchsia-100",
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
      className={`relative rounded-[1.6rem] md:rounded-[2rem] overflow-hidden aspect-[16/10] border border-black/8 bg-gradient-to-br ${useCase.color} shadow-[0_2px_8px_rgba(0,0,0,0.05),0_24px_48px_-12px_rgba(0,0,0,0.18)]`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={useCase.image}
        alt={useCase.alt}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover object-top"
      />
    </div>
  );
}
