"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import gsap from "gsap";
import { Button } from "@/components/ui/button";

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

// Shared card base class (fabric.so clean style)
const cardBase = "bg-white border border-[#ededed] rounded-[2rem] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)]";

// --- 4 fixed card components: PDF, Video, Web Capture, AI Chat ---

function PDFCard() {
  return (
    <div className={`w-[24rem] ${cardBase} p-[0.8rem] font-sans`}>
      <div className="relative rounded-[1.2rem] overflow-hidden bg-white aspect-[3/4]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/paper-attention.png"
          alt="Attention Is All You Need — Vaswani et al."
          className="w-full h-full object-cover object-top"
        />
      </div>
      <div className="flex items-center gap-[0.8rem] mt-[0.8rem] px-[0.8rem] pb-[0.4rem]">
        <svg width="16" height="18" viewBox="0 0 16 18" fill="none" className="shrink-0">
          <rect x="0.5" y="0.5" width="15" height="17" rx="2" stroke="#E53E3E" strokeWidth="1" fill="#FFF5F5" />
          <text x="8" y="12.5" textAnchor="middle" fontSize="7" fontWeight="700" fill="#E53E3E">PDF</text>
        </svg>
        <span className="text-[1.2rem] font-medium text-black/70 tracking-[-0.01em] truncate">
          Attention Is All You Need
        </span>
      </div>
    </div>
  );
}

function VideoCard() {
  return (
    <div className={`w-[24rem] ${cardBase} p-[0.8rem]`}>
      <div className="relative aspect-video rounded-[1.2rem] overflow-hidden bg-black">
        <iframe
          src="https://www.youtube-nocookie.com/embed/aircAruvnKk"
          title="3Blue1Brown — But what is a neural network?"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full pointer-events-auto"
        />
      </div>
      <div className="flex items-center gap-[0.8rem] mt-[0.8rem] px-[0.8rem] pb-[0.4rem]">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
          <rect width="16" height="16" rx="4" fill="#FF0000" />
          <path d="M6.5 5L11 8L6.5 11V5Z" fill="white" />
        </svg>
        <span className="text-[1.2rem] font-medium text-black/70 tracking-[-0.01em] truncate">
          3Blue1Brown &middot; Neural Networks
        </span>
      </div>
    </div>
  );
}

function WebCaptureCard() {
  return (
    <div className={`w-[24rem] ${cardBase} p-[0.8rem] font-sans`}>
      <div className="relative rounded-[1.2rem] overflow-hidden bg-white aspect-[4/3]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/web-medium.png"
          alt="Paul Graham — How to Think for Yourself"
          className="w-full h-full object-cover object-top"
        />
      </div>
      <div className="flex items-center gap-[0.8rem] mt-[0.8rem] px-[0.8rem] pb-[0.4rem]">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
          <circle cx="8" cy="8" r="7" stroke="#777" strokeWidth="1" fill="#f9f9f9" />
          <ellipse cx="8" cy="8" rx="3" ry="7" stroke="#777" strokeWidth="1" />
          <line x1="1" y1="8" x2="15" y2="8" stroke="#777" strokeWidth="1" />
        </svg>
        <span className="text-[1.2rem] font-medium text-black/70 tracking-[-0.01em] truncate">
          paulgraham.com
        </span>
      </div>
    </div>
  );
}

function AIChatCard() {
  return (
    <div className={`w-[26rem] ${cardBase} font-sans p-[1.6rem]`}>
      <div className="flex items-center gap-[1rem] mb-[1.2rem]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icon.svg" alt="Oak" className="w-[2.4rem] h-[2.4rem] rounded-[0.5rem]" />
        <span className="text-[1.6rem] font-medium text-black/85 tracking-[-0.01em]">
          OakAI
        </span>
      </div>
      <div className="flex flex-col gap-[0.8rem]">
        <div className="self-end bg-[#f0f0f0] rounded-[1rem] rounded-br-[0.3rem] px-[1.2rem] py-[0.8rem] max-w-[85%]">
          <p className="text-[1.2rem] text-black/70 leading-[1.6rem]">
            What is the key insight of this paper?
          </p>
        </div>
        <div className="self-start bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100 rounded-[1rem] rounded-bl-[0.3rem] px-[1.2rem] py-[0.8rem] max-w-[90%]">
          <p className="text-[1.2rem] text-black/70 leading-[1.6rem]">
            The transformer replaces recurrence with self-attention, enabling parallel computation...
          </p>
        </div>
      </div>
    </div>
  );
}

// --- Social proof components ---

function EarlyAccessBadge() {
  return (
    <motion.div
      className="mb-[2.4rem]"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="inline-flex items-center gap-[0.8rem] bg-white/70 backdrop-blur border border-[#ededed] rounded-full px-[1.6rem] h-[3.4rem] shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <span className="relative flex h-[0.7rem] w-[0.7rem]">
          <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative rounded-full h-[0.7rem] w-[0.7rem] bg-emerald-500" />
        </span>
        <span className="text-[1.3rem] text-black/55 font-medium tracking-[0.01em]">
          Early Access &middot; macOS
        </span>
      </div>
    </motion.div>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [colorIndex, setColorIndex] = useState(0);
  const TEXT = "Thinking Partner";
  const charCount = TEXT.length;
  const [charStates, setCharStates] = useState(() =>
    Array.from({ length: charCount }, () => ({ opacity: 0, weight: 100 }))
  );

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

  return (
    <section
      ref={sectionRef}
      className="min-h-svh relative overflow-clip bg-[#f8f8f8] isolate pb-[6rem]"
      style={
        {
          "--hero-color": currentTheme.color,
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
        <EarlyAccessBadge />
        <div className="flex flex-col items-center text-[4.8rem] min-[600px]:text-[6.4rem] min-[800px]:text-[8rem] min-[1000px]:text-[9.6rem] pointer-events-none">
          <p className="font-sans font-light tracking-[-0.04em] whitespace-nowrap">
            Your
          </p>
          <p className="font-exposure whitespace-nowrap tracking-[0em]">
            <span className="tracking-[0em] whitespace-nowrap">
              {TEXT.split("").map((letter, i) => (
                <span
                  key={i}
                  className="relative inline-block whitespace-pre text-center"
                  aria-hidden="true"
                >
                  {/* Invisible bold copy — reserves max width */}
                  <span className="invisible font-black" aria-hidden="true">
                    {letter}
                  </span>
                  {/* Visible animated copy — centered on top */}
                  <span
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      opacity: charStates[i].opacity,
                      fontWeight: charStates[i].weight,
                    }}
                  >
                    {letter}
                  </span>
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
        <div className="flex flex-col items-center gap-[3.2rem] mt-[4.8rem] min-[800px]:mt-[7.2rem]">
          <p className="font-sans font-medium tracking-[-0.01em] text-[1.6rem] min-[600px]:text-[1.8rem] min-[800px]:text-[2.2rem] text-black/55 max-w-[28rem] min-[800px]:max-w-[40rem] leading-[150%] text-pretty">
            The purpose of reading is insight, not information.
          </p>
          <div className="flex flex-col items-center gap-[2rem]">
            <Button
              variant="ghost"
              className="pointer-events-auto rounded-[1.4rem] p-0 h-auto cursor-pointer hover:bg-transparent"
              data-tally-open="eqKB9e"
            >
              <span className="relative inline-flex items-center justify-center">
                {/* Glow */}
                <span
                  aria-hidden="true"
                  className="absolute -inset-x-[3.2rem] -inset-y-[1.6rem] rounded-full blur-[32px] opacity-40 pointer-events-none"
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
                  Try for Free
                </span>
              </span>
            </Button>
            <p className="pointer-events-none font-sans text-[1.3rem] min-[800px]:text-[1.4rem] text-black/35 tracking-[0.02em]">
              Available on macOS &middot; No credit card required
            </p>
          </div>
        </div>
      </motion.div>

      {/* Layer 3: Floating cards — 4 fixed cards with tilt + slow breathing */}
      <div className="absolute inset-0 z-[3] pointer-events-none">
        {/* Top-left: Web Capture (Paul Graham) */}
        <FloatingCard
          positionStyle={{
            left: "max(32px, 8%)",
            top: "max(80px, 14%)",
          }}
          delay={0}
          parallaxX={-4}
          parallaxY={6}
          rotate={-5}
          drift="drift1"
          scaleClasses="scale-[0.5] origin-top-left min-[800px]:scale-[0.75] min-[1200px]:scale-[0.85]"
        >
          <WebCaptureCard />
        </FloatingCard>

        {/* Top-right: Video */}
        <FloatingCard
          positionStyle={{
            right: "max(32px, 8%)",
            top: "max(80px, 10%)",
          }}
          delay={0.4}
          parallaxX={-8}
          parallaxY={4}
          rotate={4}
          drift="drift2"
          scaleClasses="scale-[0.5] origin-top-right min-[800px]:scale-[0.75] min-[1200px]:scale-[0.85]"
        >
          <VideoCard />
        </FloatingCard>

        {/* Bottom-left: PDF (Attention paper) */}
        <FloatingCard
          positionStyle={{
            left: "max(32px, 10%)",
            bottom: "max(48px, 8%)",
          }}
          delay={0.6}
          parallaxX={-3}
          parallaxY={-5}
          rotate={-3}
          drift="drift3"
          scaleClasses="scale-[0.5] origin-bottom-left min-[800px]:scale-[0.75] min-[1200px]:scale-[0.85]"
        >
          <PDFCard />
        </FloatingCard>

        {/* Bottom-right: OakAI */}
        <FloatingCard
          positionStyle={{
            right: "max(32px, 10%)",
            bottom: "max(48px, 12%)",
          }}
          delay={0.2}
          parallaxX={-6}
          parallaxY={-4}
          rotate={3}
          drift="drift4"
          scaleClasses="scale-[0.5] origin-bottom-right min-[800px]:scale-[0.75] min-[1200px]:scale-[0.85]"
        >
          <AIChatCard />
        </FloatingCard>
      </div>

    </section>
  );
}

// GSAP-driven organic drift configs — each card gets unique curve parameters
// Uses layered sine waves at different frequencies for natural, non-repeating feel
interface DriftConfig {
  /** x-axis amplitude in px */
  xAmp: number;
  /** y-axis amplitude in px */
  yAmp: number;
  /** rotation amplitude in degrees */
  rotAmp: number;
  /** base cycle duration in seconds */
  duration: number;
  /** frequency ratio between x and y — irrational = never repeats */
  xFreqRatio: number;
  /** secondary wobble amplitude (adds organic irregularity) */
  wobble: number;
}

const driftConfigs: Record<string, DriftConfig> = {
  // Lissajous-like figure-8
  drift1: { xAmp: 18, yAmp: 24, rotAmp: 3, duration: 14, xFreqRatio: 0.618, wobble: 5 },
  // Wide lazy orbit
  drift2: { xAmp: 22, yAmp: 16, rotAmp: 2.5, duration: 18, xFreqRatio: 1.382, wobble: 4 },
  // Tall teardrop
  drift3: { xAmp: 14, yAmp: 28, rotAmp: 3.5, duration: 20, xFreqRatio: 0.724, wobble: 6 },
  // Compact gentle sway
  drift4: { xAmp: 20, yAmp: 20, rotAmp: 2, duration: 16, xFreqRatio: 1.175, wobble: 3 },
};

function FloatingCard({
  children,
  positionStyle,
  delay,
  parallaxX,
  parallaxY,
  drift = "drift1",
  rotate = 0,
  scaleClasses,
}: {
  children: React.ReactNode;
  positionStyle: React.CSSProperties;
  delay: number;
  parallaxX: number;
  parallaxY: number;
  drift?: string;
  rotate?: number;
  scaleClasses: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  // GSAP organic drift animation
  useEffect(() => {
    if (!cardRef.current) return;
    const el = cardRef.current;
    const cfg = driftConfigs[drift] ?? driftConfigs.drift1;
    const totalDelay = 0.5 + delay;

    // Fade in
    gsap.fromTo(el,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, delay: totalDelay, ease: "power3.out" }
    );

    // Organic drift using GSAP ticker — layered sine waves
    const startTime = performance.now() / 1000;
    const driftTick = () => {
      const t = performance.now() / 1000 - startTime - totalDelay;
      if (t < 0) return;

      const freq = (2 * Math.PI) / cfg.duration;
      // Primary motion — different frequencies on x/y create curved paths
      const px = Math.sin(t * freq * cfg.xFreqRatio) * cfg.xAmp;
      const py = Math.cos(t * freq) * cfg.yAmp;
      // Secondary wobble — slower, smaller, different phase
      const wx = Math.sin(t * freq * 0.37 + 1.2) * cfg.wobble;
      const wy = Math.cos(t * freq * 0.53 + 2.4) * cfg.wobble;
      // Rotation — combination of two waves
      const r = rotate + Math.sin(t * freq * 0.8) * cfg.rotAmp + Math.sin(t * freq * 0.31 + 0.7) * (cfg.rotAmp * 0.4);

      gsap.set(el, {
        x: px + wx,
        y: py + wy,
        rotation: r,
      });
    };

    gsap.ticker.add(driftTick);
    return () => { gsap.ticker.remove(driftTick); };
  }, [delay, drift, rotate]);

  // Mouse parallax on inner wrapper
  useEffect(() => {
    if (!innerRef.current) return;
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * parallaxX * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * parallaxY * 2;
      gsap.to(innerRef.current, { x, y, duration: 1.5, ease: "power2.out" });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [parallaxX, parallaxY]);

  return (
    <div
      ref={cardRef}
      className="absolute will-change-transform opacity-0"
      style={positionStyle}
    >
      <div ref={innerRef} className="will-change-transform">
        <div className={scaleClasses}>
          {children}
        </div>
      </div>
    </div>
  );
}
