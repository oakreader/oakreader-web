"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useReveal } from "@/hooks/use-reveal";

const privacyToggles = [
  { label: "Local-first storage", defaultOn: true },
  { label: "Share reading data", defaultOn: false },
  { label: "Chat history", defaultOn: true },
  { label: "Annotation backup", defaultOn: true },
  { label: "Cloud sync", defaultOn: false },
];

export function Privacy() {
  const headingRef = useReveal<HTMLParagraphElement>();
  const descRef = useReveal<HTMLDivElement>();
  const linkRef = useReveal<HTMLDivElement>();

  return (
    <section
      id="privacy"
      className="my-[8rem] md:my-[12rem] max-w-[120rem] mx-auto px-[1rem] md:px-[2rem]"
    >
      <div className="rounded-[1.2rem] svg-dashed-border py-[7rem] relative flex flex-col items-center overflow-x-clip">
        {/* Corner dots */}
        <div className="absolute top-[2rem] left-[2rem] w-[0.8rem] h-[0.8rem] rounded-full bg-black/10" />
        <div className="absolute top-[2rem] right-[2rem] w-[0.8rem] h-[0.8rem] rounded-full bg-black/10" />
        <div className="absolute bottom-[2rem] left-[2rem] w-[0.8rem] h-[0.8rem] rounded-full bg-black/10" />
        <div className="absolute bottom-[2rem] right-[2rem] w-[0.8rem] h-[0.8rem] rounded-full bg-black/10" />

        <p
          ref={headingRef}
          data-reveal
          className="font-exposure font-bold text-[3.2rem] md:text-[4rem] lg:text-[4.8rem] leading-[1.15] tracking-[-0.01em]"
        >
          Local &amp; Private first
        </p>

        <div className="my-[2rem] w-full overflow-hidden">
          <PrivacyMarquee />
        </div>

        <div
          ref={descRef}
          data-reveal
          style={{ "--reveal-delay": "0.15s" } as React.CSSProperties}
          className="font-sans max-w-[50ch] lg:max-w-[48ch] text-center text-[1.6rem] leading-[2.4rem] lg:text-[2.2rem] lg:leading-[3rem] text-black/50 mt-[4rem] px-[2rem] md:px-0"
        >
          <p>
            Oak keeps everything on your Mac. Your documents, notes, and
            conversations never leave your machine unless you choose otherwise.
            AI queries go directly to the provider you pick — Oak never sees
            them in between.
          </p>
          <p className="mt-[1.6rem]">
            Your API keys stay local. Your reading history stays local. Your
            annotations stay local. That&apos;s not a feature — that&apos;s how
            it should work.
          </p>
        </div>

        <div
          ref={linkRef}
          data-reveal
          style={{ "--reveal-delay": "0.3s" } as React.CSSProperties}
          className="mt-[4rem]"
        >
          <a
            href="#"
            className="group flex items-center justify-center gap-[1.2rem] h-[3.5rem] px-[2.4rem] rounded-[2rem] transition-colors duration-300 bg-[#efefef] font-sans text-[1.6rem] leading-[3.5rem] hover:bg-[#e5e5e5]"
          >
            Learn more about privacy in Oak
            <span className="inline-block group-hover:translate-x-[0.6rem] transition-transform duration-300">
              &rarr;
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

function PrivacyMarquee() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!marqueeRef.current) return;
    const sets = marqueeRef.current.querySelectorAll("[data-marquee-set]");
    if (!sets.length) return;

    const firstSet = sets[0] as HTMLElement;
    const totalWidth = firstSet.offsetWidth;

    const tween = gsap.fromTo(
      Array.from(marqueeRef.current.children),
      { x: 0 },
      { x: -totalWidth, duration: 25, ease: "none", repeat: -1 }
    );

    return () => { tween.kill(); };
  }, []);

  const toggleSet = (
    <div className="flex flex-row gap-[2rem] pr-[2rem]" data-marquee-set>
      {privacyToggles.map((toggle, i) => (
        <PrivacyToggle key={i} label={toggle.label} defaultOn={toggle.defaultOn} />
      ))}
    </div>
  );

  return (
    <div className="flex flex-row" ref={marqueeRef}>
      <div className="shrink-0 flex">{toggleSet}</div>
      <div className="shrink-0 flex">{toggleSet}</div>
      <div className="shrink-0 flex">{toggleSet}</div>
      <div className="shrink-0 flex">{toggleSet}</div>
    </div>
  );
}

function PrivacyToggle({
  label,
  defaultOn,
}: {
  label: string;
  defaultOn: boolean;
}) {
  const [isOn, setIsOn] = useState(defaultOn);

  return (
    <button
      type="button"
      onClick={() => setIsOn(!isOn)}
      className="h-[3.5rem] rounded-[2rem] leading-[3.5rem] px-[1.6rem] font-mono text-[1.6rem] flex items-center gap-[1.4rem] cursor-pointer transition-colors duration-200 bg-[#EBEBEB]/70 select-none whitespace-nowrap"
    >
      <span
        className={`h-[1.2rem] w-[1.2rem] rounded-full transition-colors duration-200 ${
          isOn ? "bg-[#F2FCB3]" : "bg-[#FFDC5C]"
        }`}
      />
      {label}
      <span className="bg-white h-[2rem] px-[0.5rem] leading-[2rem] w-[3.7rem] text-center rounded-[0.3rem] text-[1.4rem]">
        {isOn ? "On" : "Off"}
      </span>
    </button>
  );
}
