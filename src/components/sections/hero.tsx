"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import gsap from "gsap";

// Two color themes that cycle, matching Dia's implementation
const colorThemes = [
  {
    id: "productivity",
    color: "#79C9FF",
    gradient: `radial-gradient(
      100vmax,
      rgba(0,0,0,0) 54.81%,
      rgb(255,172,227) 60.098%,
      rgba(255,241,172,0.5) 62.983%,
      rgb(121,201,255) 68.5%,
      rgb(74,96,209) 80%,
      rgb(80,146,199) 90%,
      rgb(60,106,255) 93%,
      rgb(86,86,86) 97%,
      rgba(0,0,0,0) 100%
    )`,
  },
  {
    id: "media",
    color: "#9FEAB9",
    gradient: `radial-gradient(
      100vmax,
      rgba(0,0,0,0) 54.8%,
      rgba(252,243,216,0.5) 63%,
      #9FEAB9 76%,
      #4290D9 95%,
      #1C0843 99%,
      rgba(0,0,0,0) 100%
    )`,
  },
];

// --- Card content types ---
type CardContent =
  | { type: "square"; id: string; gradient: string; label: string }
  | { type: "wide-tts"; id: string }
  | { type: "wide-voice"; id: string }
  | { type: "wide-translation"; id: string }
  | { type: "bar-translation"; id: string }
  | { type: "bar-webcapture"; id: string }
  | { type: "youtube"; id: string }
  | { type: "list-papers"; id: string }
  | { type: "list-notes"; id: string }
  | { type: "list-bookmarks"; id: string };

const CARD_SETS: CardContent[][] = [
  // Set 0
  [
    { type: "square", id: "ai-chat", gradient: "from-blue-400 to-purple-500", label: "AI Chat" },
    { type: "wide-tts", id: "tts" },
    { type: "bar-translation", id: "translation-bar" },
    { type: "list-papers", id: "papers" },
  ],
  // Set 1
  [
    { type: "square", id: "highlights", gradient: "from-yellow-300 to-amber-400", label: "Highlights" },
    { type: "wide-voice", id: "voice-chat" },
    { type: "youtube", id: "youtube" },
    { type: "list-bookmarks", id: "bookmarks" },
  ],
  // Set 2
  [
    { type: "square", id: "ocr", gradient: "from-emerald-400 to-teal-500", label: "OCR" },
    { type: "wide-translation", id: "translation-wide" },
    { type: "bar-webcapture", id: "webcapture-bar" },
    { type: "list-notes", id: "notes" },
  ],
];

// --- Shared SVG icons ---
const ChevronDown = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0 text-black/35">
    <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// --- Card content renderers ---

function SquareCardContent({ gradient, label }: { gradient: string; label: string }) {
  return (
    <div className="w-[8.8rem] h-[8.8rem] rounded-[1.4rem] bg-white/70 border border-black/[0.08] backdrop-blur-xl flex flex-col justify-center items-center gap-[0.6rem] p-[0.8rem] shadow-[0px_6px_22px_0px_rgba(0,0,0,0.1),inset_0_1px_0_0_rgba(255,255,255,0.6)]">
      <span className={`block overflow-hidden rounded-[0.4rem] w-[4.6rem] h-[4.6rem] bg-gradient-to-br ${gradient}`} />
      <div className="flex items-center justify-center h-[1.6rem] rounded-full bg-[#efefef] text-[1rem] leading-none px-[0.7rem] font-mono text-black/85">
        {label}
      </div>
    </div>
  );
}

// Digit roller component for countdown animations
function DigitRoller({
  digits,
  currentIndex,
}: {
  digits: string[];
  currentIndex: number;
}) {
  return (
    <span className="relative inline-block overflow-hidden align-baseline w-[1em] h-[1.6rem]">
      <span
        className="absolute top-0 left-0 flex flex-col will-change-transform transition-transform duration-700 ease-out"
        style={{ transform: `translateY(-${currentIndex * 16}px)` }}
      >
        {digits.map((d, i) => (
          <span key={i} className="flex items-center h-[1.6rem]">
            {d}
          </span>
        ))}
      </span>
    </span>
  );
}

function WideTTSContent({ digitIndex }: { digitIndex: number }) {
  return (
    <div className="block text-left pointer-events-auto bg-white/70 border border-black/[0.08] rounded-[1.4rem] backdrop-blur-xl font-sans w-[27.2rem] p-[2rem] shadow-[0px_8px_22px_0px_rgba(0,0,0,0.08),inset_0_1px_0_0_rgba(255,255,255,0.6)]">
      <div className="flex items-center justify-between gap-[0.2rem]">
        <div className="text-[1.6rem] font-semibold leading-[2.2rem]">
          <span className="text-black">Text to Speech</span>{" "}
          <span className="text-black/45">
            pg 1
            <DigitRoller
              digits={["5", "4", "3", "2", "1", "0", "9", "8", "7", "6"]}
              currentIndex={digitIndex}
            />
          </span>
        </div>
        <ChevronDown />
      </div>
      <p className="text-[1.4rem] text-black/60 leading-[2rem] mt-[1rem]">
        Reading aloud...
      </p>
    </div>
  );
}

function WideVoiceContent() {
  return (
    <div className="block text-left pointer-events-auto bg-white/70 border border-black/[0.08] rounded-[1.4rem] backdrop-blur-xl font-sans w-[27.2rem] p-[2rem] shadow-[0px_8px_22px_0px_rgba(0,0,0,0.08),inset_0_1px_0_0_rgba(255,255,255,0.6)]">
      <div className="flex items-center justify-between gap-[0.2rem]">
        <div className="text-[1.6rem] font-semibold leading-[2.2rem]">
          <span className="text-black">Voice Chat</span>
        </div>
        <ChevronDown />
      </div>
      <div className="flex items-center gap-[0.6rem] mt-[1rem]">
        <span className="relative flex h-[0.8rem] w-[0.8rem]">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-[0.8rem] w-[0.8rem] bg-emerald-500" />
        </span>
        <p className="text-[1.4rem] text-black/60 leading-[2rem]">
          Listening...
        </p>
      </div>
    </div>
  );
}

function WideTranslationContent() {
  return (
    <div className="block text-left pointer-events-auto bg-white/70 border border-black/[0.08] rounded-[1.4rem] backdrop-blur-xl font-sans w-[27.2rem] p-[2rem] shadow-[0px_8px_22px_0px_rgba(0,0,0,0.08),inset_0_1px_0_0_rgba(255,255,255,0.6)]">
      <div className="flex items-center justify-between gap-[0.2rem]">
        <div className="text-[1.6rem] font-semibold leading-[2.2rem]">
          <span className="text-black">Translation</span>
        </div>
        <ChevronDown />
      </div>
      <p className="text-[1.4rem] text-black/60 leading-[2rem] mt-[1rem]">
        42 languages
      </p>
    </div>
  );
}

function BarTranslationContent() {
  return (
    <div className="relative flex items-center gap-[1.1rem] w-[28rem] h-[5rem] py-[1.3rem] px-[1.6rem] rounded-[1.4rem] bg-white/70 border border-black/[0.08] shadow-[0px_6px_20px_0px_rgba(0,0,0,0.08),inset_0_1px_0_0_rgba(255,255,255,0.6)]">
      <svg width="22" height="15" viewBox="0 0 22 15" fill="none" className="shrink-0 text-black/85">
        <circle cx="6" cy="7.5" r="5" stroke="currentColor" strokeWidth="1.2" fill="none" />
        <line x1="14" y1="3" x2="21" y2="3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="14" y1="7.5" x2="21" y2="7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="14" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
      <span className="font-sans font-normal text-[1.8rem] leading-none text-black/85">
        Translation
      </span>
    </div>
  );
}

function BarWebCaptureContent() {
  return (
    <div className="relative flex items-center gap-[1.1rem] w-[28rem] h-[5rem] py-[1.3rem] px-[1.6rem] rounded-[1.4rem] bg-white/70 border border-black/[0.08] shadow-[0px_6px_20px_0px_rgba(0,0,0,0.08),inset_0_1px_0_0_rgba(255,255,255,0.6)]">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0 text-black/85">
        <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.2" />
        <ellipse cx="10" cy="10" rx="4" ry="8.5" stroke="currentColor" strokeWidth="1.2" />
        <line x1="1.5" y1="10" x2="18.5" y2="10" stroke="currentColor" strokeWidth="1.2" />
      </svg>
      <span className="font-sans font-normal text-[1.8rem] leading-none text-black/85">
        Web Capture
      </span>
    </div>
  );
}

function YouTubeContent() {
  return (
    <div className="w-[22rem] rounded-[1.4rem] bg-white/70 border border-black/[0.08] backdrop-blur-xl p-[0.8rem] shadow-[0px_6px_22px_0px_rgba(0,0,0,0.1),inset_0_1px_0_0_rgba(255,255,255,0.6)]">
      <div className="relative aspect-video rounded-[0.8rem] overflow-hidden bg-black">
        <iframe
          src="https://www.youtube-nocookie.com/embed/aircAruvnKk"
          title="3Blue1Brown — But what is a neural network?"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full pointer-events-auto"
        />
      </div>
      <p className="font-sans text-[1.2rem] text-black/60 mt-[0.6rem] px-[0.4rem]">
        3Blue1Brown
      </p>
    </div>
  );
}

function ListPapersContent() {
  return (
    <div className="block text-left pointer-events-auto font-sans w-[33.6rem] p-[1.6rem] bg-white/70 rounded-[1.4rem] border border-black/[0.08] shadow-[0px_8px_22px_0px_rgba(0,0,0,0.08),inset_0_1px_0_0_rgba(255,255,255,0.6)]">
      <div className="flex items-center gap-[0.8rem] px-[0.4rem] pt-[0.3rem]">
        <span className="text-[2rem] leading-none" aria-hidden="true">
          &#x1F4DA;
        </span>
        <span className="text-[1.7rem] font-semibold leading-[2.2rem] text-black">
          Research Papers
        </span>
        <span className="ml-auto"><ChevronDown /></span>
      </div>
      <ul className="flex flex-col mt-[0.6rem] pb-[0.4rem]">
        {["Attention Is All You Need", "Deep Learning", "Neural Networks"].map((item) => (
          <li key={item} className="flex items-center gap-[1.2rem] pl-[2.8rem] pr-[1.2rem] py-[0.8rem]">
            <span className="w-[2.2rem] h-[2.2rem] rounded-[0.5rem] bg-gradient-to-br from-amber-200 to-orange-300 shrink-0" />
            <span className="text-[1.6rem] text-black/70 leading-[2.4rem] whitespace-nowrap truncate">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ListNotesContent() {
  return (
    <div className="block text-left pointer-events-auto font-sans w-[33.6rem] p-[1.6rem] bg-white/70 rounded-[1.4rem] border border-black/[0.08] shadow-[0px_8px_22px_0px_rgba(0,0,0,0.08),inset_0_1px_0_0_rgba(255,255,255,0.6)]">
      <div className="flex items-center gap-[0.8rem] px-[0.4rem] pt-[0.3rem]">
        <span className="text-[2rem] leading-none" aria-hidden="true">
          &#x1F4DD;
        </span>
        <span className="text-[1.7rem] font-semibold leading-[2.2rem] text-black">
          Recent Notes
        </span>
        <span className="ml-auto"><ChevronDown /></span>
      </div>
      <ul className="flex flex-col mt-[0.6rem] pb-[0.4rem]">
        {["Meeting notes \u2014 Q4 review", "Book highlights \u2014 Sapiens", "Weekly reflection"].map((item) => (
          <li key={item} className="flex items-center gap-[1.2rem] pl-[2.8rem] pr-[1.2rem] py-[0.8rem]">
            <span className="w-[2.2rem] h-[2.2rem] rounded-[0.5rem] bg-gradient-to-br from-sky-200 to-indigo-300 shrink-0" />
            <span className="text-[1.6rem] text-black/70 leading-[2.4rem] whitespace-nowrap truncate">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ListBookmarksContent() {
  return (
    <div className="block text-left pointer-events-auto font-sans w-[33.6rem] p-[1.6rem] bg-white/70 rounded-[1.4rem] border border-black/[0.08] shadow-[0px_8px_22px_0px_rgba(0,0,0,0.08),inset_0_1px_0_0_rgba(255,255,255,0.6)]">
      <div className="flex items-center gap-[0.8rem] px-[0.4rem] pt-[0.3rem]">
        <span className="text-[2rem] leading-none" aria-hidden="true">
          &#x1F516;
        </span>
        <span className="text-[1.7rem] font-semibold leading-[2.2rem] text-black">
          Bookmarks
        </span>
        <span className="ml-auto"><ChevronDown /></span>
      </div>
      <ul className="flex flex-col mt-[0.6rem] pb-[0.4rem]">
        {["Thinking, Fast and Slow", "The Design of Everyday Things", "Atomic Habits"].map((item) => (
          <li key={item} className="flex items-center gap-[1.2rem] pl-[2.8rem] pr-[1.2rem] py-[0.8rem]">
            <span className="w-[2.2rem] h-[2.2rem] rounded-[0.5rem] bg-gradient-to-br from-rose-200 to-pink-300 shrink-0" />
            <span className="text-[1.6rem] text-black/70 leading-[2.4rem] whitespace-nowrap truncate">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Render the right content component based on card type
function renderCardContent(card: CardContent, digitIndex: number) {
  switch (card.type) {
    case "square":
      return <SquareCardContent gradient={card.gradient} label={card.label} />;
    case "wide-tts":
      return <WideTTSContent digitIndex={digitIndex} />;
    case "wide-voice":
      return <WideVoiceContent />;
    case "wide-translation":
      return <WideTranslationContent />;
    case "bar-translation":
      return <BarTranslationContent />;
    case "bar-webcapture":
      return <BarWebCaptureContent />;
    case "youtube":
      return <YouTubeContent />;
    case "list-papers":
      return <ListPapersContent />;
    case "list-notes":
      return <ListNotesContent />;
    case "list-bookmarks":
      return <ListBookmarksContent />;
  }
}

// Transition preset for card content swaps
const cardSwapTransition = { duration: 0.4, ease: [0.25, 1, 0.5, 1] as const };

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [colorIndex, setColorIndex] = useState(0);
  const TEXT = "Thinking Partner";
  const charCount = TEXT.length;
  const [charStates, setCharStates] = useState(() =>
    Array.from({ length: charCount }, () => ({ opacity: 0, weight: 100 }))
  );

  // Digit roller state for countdown animations
  const [digitIndex, setDigitIndex] = useState(0);

  // Card set cycling synced to text animation
  const cycleCountRef = useRef(0);
  const [cardSetIndex, setCardSetIndex] = useState(0);
  const currentSet = CARD_SETS[cardSetIndex] ?? CARD_SETS[0];

  const currentTheme = colorThemes[colorIndex];

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  // Combined animation: typewriter reveal + weight thin->bold + wave shimmer
  useEffect(() => {
    let frame: number;
    const startTime = performance.now();

    const typeDelay = 220;
    const weightSettleDuration = 800;
    const typewriterTotal = charCount * typeDelay + weightSettleDuration;
    const shimmerDuration = 5000;
    const pauseDuration = 3000;
    const totalCycle = typewriterTotal + shimmerDuration + pauseDuration;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const cycleTime = elapsed % totalCycle;

      // Detect cycle boundary and swap card set
      const currentCycle = Math.floor(elapsed / totalCycle);
      if (currentCycle !== cycleCountRef.current) {
        cycleCountRef.current = currentCycle;
        setCardSetIndex(currentCycle % CARD_SETS.length);
      }

      if (cycleTime < typewriterTotal) {
        setCharStates(
          Array.from({ length: charCount }, (_, i) => {
            const charStart = i * typeDelay;
            const charElapsed = cycleTime - charStart;

            if (charElapsed < 0) {
              return { opacity: 0, weight: 100 };
            }

            const opacity = Math.min(1, charElapsed / 200);
            const weightProgress = Math.min(1, charElapsed / weightSettleDuration);
            const eased = 1 - Math.pow(1 - weightProgress, 3);
            const overshoot =
              weightProgress < 0.6
                ? eased * (650 / 0.82)
                : 400 +
                  (550 - 400) *
                    Math.pow(1 - (weightProgress - 0.6) / 0.4, 2);
            const weight = Math.min(
              650,
              Math.max(100, 100 + (overshoot - 100) * Math.min(1, eased))
            );

            return { opacity, weight };
          })
        );
      } else if (cycleTime < typewriterTotal + shimmerDuration) {
        const shimmerElapsed = cycleTime - typewriterTotal;
        const phase = shimmerElapsed / shimmerDuration;

        setCharStates(
          Array.from({ length: charCount }, (_, i) => {
            const charPos = i / (charCount - 1);
            const dist = Math.abs(charPos - phase);
            const wrappedDist = Math.min(dist, 1 - dist);
            const intensity = Math.max(0, 1 - wrappedDist / 0.45);
            const smoothed = intensity * intensity * (3 - 2 * intensity);
            return { opacity: 1, weight: 400 + smoothed * 150 };
          })
        );
      } else {
        const fadeElapsed = cycleTime - typewriterTotal - shimmerDuration;
        const fadeProgress = fadeElapsed / pauseDuration;
        const fadeOpacity =
          fadeProgress < 0.6
            ? 1
            : Math.max(0, 1 - (fadeProgress - 0.6) / 0.4);

        setCharStates(
          Array.from({ length: charCount }, () => ({
            opacity: fadeOpacity,
            weight: 400,
          }))
        );
      }

      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [charCount]);

  // Color cycling: every ~4900ms
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setColorIndex((prev) => (prev + 1) % colorThemes.length);
    }, 4900);
    return () => window.clearTimeout(timer);
  }, [colorIndex]);

  // Digit roller cycling
  useEffect(() => {
    const timer = window.setInterval(() => {
      setDigitIndex((prev) => (prev + 1) % 10);
    }, 3000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="h-svh relative overflow-hidden bg-[#f8f8f8] isolate"
      style={
        {
          "--hero-color": currentTheme.color,
          contain: "layout paint",
        } as React.CSSProperties
      }
    >
      {/* Layer 0: Background radial gradient with crossfade */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0" style={{ transformOrigin: "center center" }}>
          <AnimatePresence mode="sync">
            <motion.div
              key={currentTheme.id}
              className="absolute left-1/2 [clip-path:inset(0_0_33.33%_0)] blur-[20px] min-[600px]:blur-[40px]"
              style={{
                width: "210vmax",
                height: "210vmax",
                top: "calc(65vmax + 18svh)",
                backgroundImage: currentTheme.gradient,
              }}
              initial={{ opacity: 0, scale: 1.02, x: "-50%", y: "-50%" }}
              animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
              exit={{ opacity: 0, scale: 0.99, x: "-50%", y: "-50%" }}
              transition={{
                opacity: { duration: 1, ease: [0.16, 1, 0.3, 1] },
                scale: { duration: 1, ease: [0.16, 1, 0.3, 1] },
              }}
            />
          </AnimatePresence>
        </div>
      </div>

      {/* Layer 1: White dome */}
      <div
        aria-hidden="true"
        className="absolute left-0 right-0 bottom-0"
        style={{ top: "18svh" }}
      >
        <div
          className="aspect-square relative z-[1] left-1/2 -translate-x-1/2 bg-[#f8f8f8] rounded-full [clip-path:inset(0_0_33.33%_0)]"
          style={{ width: "130vmax" }}
        />
      </div>

      {/* Layer 2: Hero text + CTA */}
      <motion.div
        className="absolute inset-0 z-[2] flex flex-col items-center justify-center text-center text-black leading-[1.05] tracking-[-0.04em] px-[1.6rem] pt-[28svh] min-[800px]:pt-[20svh]"
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        <div className="flex flex-col items-center text-[4.8rem] min-[600px]:text-[6.4rem] min-[800px]:text-[8rem] min-[1000px]:text-[9.6rem] pointer-events-none">
          <p className="font-sans font-light tracking-[-0.04em] whitespace-nowrap">
            Your
          </p>
          <p className="font-exposure whitespace-nowrap tracking-[0em]">
            <span
              className="tracking-[0em] whitespace-nowrap relative after:absolute after:content-[attr(data-text)] after:font-black after:pointer-events-none after:overflow-hidden after:select-none after:invisible after:h-0"
              data-text={TEXT}
            >
              {TEXT.split("").map((letter, i) => (
                <span
                  key={i}
                  className="inline-block whitespace-pre"
                  aria-hidden="true"
                  style={{
                    opacity: charStates[i].opacity,
                    fontWeight: charStates[i].weight,
                    fontVariationSettings: undefined,
                  }}
                >
                  {letter}
                </span>
              ))}
              <span className="sr-only">{TEXT}</span>
            </span>
          </p>
          <p className="font-sans font-light tracking-[-0.04em] whitespace-nowrap">
            that inspires insight
          </p>
        </div>

        {/* Subtitle + CTA */}
        <div className="flex flex-col items-center gap-[4.8rem] mt-[6.4rem] min-[800px]:mt-[9.6rem]">
          <p className="font-sans font-normal tracking-tight text-[1.6rem] min-[600px]:text-[1.8rem] min-[800px]:text-[2.2rem] text-black/65 max-w-[28rem] min-[800px]:max-w-[40rem] leading-[1.5] text-pretty">
            The purpose of reading is insight, not information.
          </p>
          <button
            className="pointer-events-auto inline-flex rounded-[1.4rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            title="Get Oak"
            type="button"
          >
            <span className="relative inline-flex items-center justify-center">
              {/* Glow */}
              <span
                aria-hidden="true"
                className="absolute -inset-x-[3.2rem] -inset-y-[1.6rem] rounded-full blur-[32px] opacity-50 pointer-events-none"
                style={{
                  backgroundColor: "var(--hero-color)",
                  transition:
                    "background-color 1000ms cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              />
              {/* Button face */}
              <span
                className="relative flex items-center justify-center rounded-[1.4rem] text-white font-sans font-medium text-[1.8rem] min-[800px]:text-[2rem] h-[5.6rem] w-[28rem] hover:opacity-85"
                style={{
                  backgroundColor:
                    "color-mix(in srgb, var(--hero-color, #79C9FF) 8%, #0a0a0a)",
                  boxShadow:
                    "inset 0 1px 0 0 color-mix(in srgb, var(--hero-color, #79C9FF) 55%, transparent)",
                  transition:
                    "opacity 200ms linear, background-color 1000ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 1000ms cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                Get Oak
              </span>
            </span>
          </button>
        </div>
      </motion.div>

      {/* Layer 3: Floating cards */}
      <div className="absolute inset-0 z-[3] pointer-events-none">
        {/* Card 0: Top-left — Square badge */}
        <FloatingCard
          positionStyle={{
            left: "max(16px, 36% - 44px - max(0px, 1200px - 100vw))",
            top: "max(80px, 13% - max(0px, 800px - 100svh))",
          }}
          delay={0}
          parallaxX={-6}
          parallaxY={10}
          scaleClasses="scale-[0.6] origin-top-left min-[800px]:scale-[0.9] min-[800px]:origin-top-left min-[1200px]:scale-100 min-[1200px]:origin-top"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSet[0].id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={cardSwapTransition}
            >
              {renderCardContent(currentSet[0], digitIndex)}
            </motion.div>
          </AnimatePresence>
        </FloatingCard>

        {/* Card 1: Top-right — Wide card */}
        <FloatingCard
          positionStyle={{
            left: "min(100% - 288px, 50% + 100px + max(0px, 1200px - 100vw))",
            top: "max(80px, 15% - max(0px, 800px - 100svh))",
          }}
          delay={0.15}
          parallaxX={-11}
          parallaxY={5}
          scaleClasses="scale-[0.45] origin-top-right min-[800px]:scale-[0.8] min-[1200px]:scale-100"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSet[1].id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={cardSwapTransition}
            >
              {renderCardContent(currentSet[1], digitIndex)}
            </motion.div>
          </AnimatePresence>
        </FloatingCard>

        {/* Card 2: Bottom-left — Bar / YouTube */}
        <FloatingCard
          positionStyle={{
            left: "max(16px, 4% - max(0px, 1200px - 100vw))",
            top: "min(100% - 80px, 64% + max(0px, 800px - 100svh) + max(0px, 1200px - 100vw))",
          }}
          delay={0.3}
          parallaxX={-0.6}
          parallaxY={-4}
          scaleClasses="scale-[0.5] origin-top-left min-[800px]:scale-[0.85] min-[800px]:origin-bottom-left min-[1200px]:scale-100"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSet[2].id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={cardSwapTransition}
            >
              {renderCardContent(currentSet[2], digitIndex)}
            </motion.div>
          </AnimatePresence>
        </FloatingCard>

        {/* Card 3: Bottom-right — List / Player */}
        <FloatingCard
          positionStyle={{
            left: "min(100% - 352px, 74% + max(0px, 1200px - 100vw))",
            top: "min(100% - 220px, 70% + max(0px, 800px - 100svh) + max(0px, 1200px - 100vw))",
          }}
          delay={0.45}
          parallaxX={-5.8}
          parallaxY={7.4}
          scaleClasses="scale-[0.55] origin-top-right min-[800px]:scale-[0.8] min-[800px]:origin-bottom-right min-[1200px]:scale-100"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSet[3].id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={cardSwapTransition}
            >
              {renderCardContent(currentSet[3], digitIndex)}
            </motion.div>
          </AnimatePresence>
        </FloatingCard>
      </div>
    </section>
  );
}

function FloatingCard({
  children,
  positionStyle,
  delay,
  parallaxX,
  parallaxY,
  scaleClasses,
}: {
  children: React.ReactNode;
  positionStyle: React.CSSProperties;
  delay: number;
  parallaxX: number;
  parallaxY: number;
  scaleClasses: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * parallaxX * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * parallaxY * 2;
      gsap.to(ref.current, { x, y, duration: 1.5, ease: "power2.out" });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [parallaxX, parallaxY]);

  return (
    <motion.div
      className="absolute will-change-transform"
      style={positionStyle}
      initial={{ opacity: 0, y: 20, scale: 1 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.5 + delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div ref={ref} className="will-change-transform">
        <div className={scaleClasses}>
          {children}
        </div>
      </div>
    </motion.div>
  );
}
