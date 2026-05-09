"use client";

import { useReveal } from "@/hooks/use-reveal";

export function CTA() {
  const headingRef = useReveal<HTMLHeadingElement>();
  const buttonRef = useReveal<HTMLDivElement>();
  const noteRef = useReveal<HTMLDivElement>();

  return (
    <section className="mt-[10rem] mb-[8rem] md:my-[10rem] md:mt-[15rem] max-w-[76rem] mx-auto flex flex-col justify-center items-center px-[2rem] md:px-0">
      <h2
        ref={headingRef}
        data-reveal
        className="font-exposure font-bold text-[3.2rem] md:text-[4rem] lg:text-[4.8rem] leading-[1.15] tracking-[-0.01em] text-center"
      >
        Ready for deeper insight?
      </h2>

      <div
        ref={buttonRef}
        data-reveal
        style={{ "--reveal-delay": "0.15s" } as React.CSSProperties}
        className="relative z-[2] mt-[4rem]"
      >
        <button title="Get Oak" type="button">
          <div className="h-[5rem] px-[2.4rem] flex items-center justify-center gap-[1.4rem] text-[1.6rem] rounded-[1.6rem] bg-black text-white min-w-[17rem] w-max hover:bg-black/90 transition-colors duration-200">
            <span>Get Oak</span>
          </div>
        </button>
      </div>

      <div
        ref={noteRef}
        data-reveal
        style={{ "--reveal-delay": "0.3s" } as React.CSSProperties}
        className="text-[1.6rem] mt-[5rem] text-center text-black/50"
      >
        <p>Available on macOS.</p>
      </div>
    </section>
  );
}
