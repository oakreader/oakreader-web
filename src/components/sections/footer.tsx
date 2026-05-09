"use client";

import { useRef, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useReveal } from "@/hooks/use-reveal";
import Image from "next/image";
import Link from "next/link";

const footerColumns = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Release Notes", href: "#" },
      { label: "Download", href: "#" },
      { label: "Browser Extension", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Help", href: "#" },
      { label: "Privacy", href: "#privacy" },
      { label: "Terms of Use", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Newsletter", href: "#" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "X", href: "#" },
      { label: "GitHub", href: "#" },
    ],
  },
];

export function Footer() {
  const navRef = useReveal<HTMLElement>();
  const spacerRef = useRef<HTMLDivElement>(null);
  const isSnapping = useRef(false);

  // Track scroll progress through the spacer
  const { scrollYProgress } = useScroll({
    target: spacerRef,
    offset: ["start end", "end end"],
  });

  // Map progress → scaleY for the gradient
  const scaleY = useTransform(scrollYProgress, [0, 0.995], [0, 1]);

  // Snap-back: scroll page back above the spacer when user stops
  const snapBack = useCallback(() => {
    if (isSnapping.current || !spacerRef.current) return;
    const progress = scrollYProgress.get();
    if (progress <= 0.05) return;

    isSnapping.current = true;
    const spacerTop =
      spacerRef.current.getBoundingClientRect().top + window.scrollY;
    const scrollTarget = spacerTop - window.innerHeight - 50;

    window.scrollTo({
      top: Math.max(0, scrollTarget),
      behavior: "smooth",
    });

    setTimeout(() => {
      isSnapping.current = false;
    }, 1200);
  }, [scrollYProgress]);

  // Detect scroll idle → trigger snap-back (desktop only)
  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 800px)").matches;
    if (!isDesktop) return;

    let timeout: ReturnType<typeof setTimeout> | null = null;

    const onScroll = () => {
      if (isSnapping.current) return;
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (scrollYProgress.get() > 0.05 && !isSnapping.current) {
          snapBack();
        }
      }, 350);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (timeout) clearTimeout(timeout);
    };
  }, [scrollYProgress, snapBack]);

  return (
    <footer role="contentinfo" className="relative z-[1]">
      <div className="overflow-x-clip max-w-[120rem] mx-auto px-[2rem]">
        {/* Footer links — z-10 to stay above gradient */}
        <nav
          ref={navRef}
          data-reveal
          aria-label="Footer links"
          className="relative z-10 grid grid-cols-2 gap-[4rem] md:flex md:justify-between md:gap-[8rem] lg:justify-start pb-[2rem] border-b border-black/10 w-full font-mono uppercase text-[1.3rem] leading-[1.6rem] tracking-[0.1em]"
        >
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="font-mono text-[1.3rem] uppercase leading-[1.7rem] tracking-[0.1em] font-normal text-black">
                {column.title}
              </h3>
              <ul className="mt-[1rem] flex flex-col gap-[1rem]">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="transition-colors duration-200 text-black/50 hover:text-black"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="hidden lg:block ml-auto">
            <Image
              src="/icon.svg"
              alt="OakReader"
              width={40}
              height={40}
              className="rounded-[0.6rem] opacity-50"
            />
          </div>
        </nav>

        {/* Bottom row — z-10 to stay above gradient */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between font-mono uppercase text-[1.3rem] leading-[1.6rem] tracking-[0.1em] py-[2rem] gap-y-[2.4rem]">
          <div className="hidden lg:flex gap-[4rem] items-baseline text-black/50">
            <small>Copyright</small>
            <small>&copy; 2026</small>
          </div>
          <div className="text-center text-black/50">
            <p className="normal-case tracking-normal">
              Designed and Built by
              <br />
              <a
                href="#"
                className="text-black/70 hover:text-black transition-colors"
              >
                Oak
              </a>
            </p>
          </div>
          <div className="lg:hidden flex flex-wrap justify-center gap-x-[4rem] gap-y-[2.4rem] text-black/50">
            <small>Copyright &copy; 2026</small>
          </div>
        </div>

        {/* Spacer — provides scroll distance for gradient reveal */}
        <div
          ref={spacerRef}
          className="md:mt-[5rem] h-[17.5rem] md:h-[30rem] lg:h-[65svh]"
        />
      </div>

      {/* Gradient SVG — fixed at bottom, grows behind footer content */}
      <motion.div
        style={{ scaleY }}
        className="origin-bottom fixed bottom-0 left-0 right-0 z-[3] pointer-events-none h-[17.5rem] md:h-[30rem] lg:h-[65svh] -mb-[2vh]"
        aria-hidden="true"
      >
        <svg
          className="w-full h-full"
          viewBox="0 0 1271 599"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#fblur)">
            <rect x={-16} y={291} width={174} height={323} fill="url(#fgrad)" />
          </g>
          <g filter="url(#fblur)">
            <rect x={125} y={210} width={174} height={404} fill="url(#fgrad)" />
          </g>
          <g filter="url(#fblur)">
            <rect x={266} y={136} width={174} height={478} fill="url(#fgrad)" />
          </g>
          <g filter="url(#fblur)">
            <rect x={407} y={84} width={175} height={530} fill="url(#fgrad)" />
          </g>
          <g filter="url(#fblur)">
            <rect x={549} y={30} width={173} height={584} fill="url(#fgrad)" />
          </g>
          <g filter="url(#fblur)">
            <rect x={689} y={84} width={175} height={530} fill="url(#fgrad)" />
          </g>
          <g filter="url(#fblur)">
            <rect x={831} y={136} width={174} height={478} fill="url(#fgrad)" />
          </g>
          <g filter="url(#fblur)">
            <rect x={972} y={210} width={174} height={404} fill="url(#fgrad)" />
          </g>
          <g filter="url(#fblur)">
            <rect x={1113} y={291} width={174} height={323} fill="url(#fgrad)" />
          </g>

          <defs>
            <linearGradient
              id="fgrad"
              x1="0"
              y1="1"
              x2="0"
              y2="0"
              gradientUnits="objectBoundingBox"
            >
              <stop offset="0" stopColor="#FFC0FD" stopOpacity="0" />
              <stop offset="0.10" stopColor="#FD02F5" />
              <stop offset="0.22" stopColor="#FA3D1D" />
              <stop offset="0.33" stopColor="#FFD400" />
              <stop offset="0.46" stopColor="#E1ECFE" />
              <stop offset="0.58" stopColor="#5092C7" />
              <stop offset="0.68" stopColor="#0358F7" />
              <stop offset="0.80" stopColor="#0358F7" stopOpacity="0.2" />
              <stop offset="0.90" stopColor="#f8f8f8" stopOpacity="0.5" />
              <stop offset="1" stopColor="#f8f8f8" stopOpacity="0" />
            </linearGradient>

            <filter
              id="fblur"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
              x="-100%"
              y="-20%"
              width="300%"
              height="140%"
            >
              <feGaussianBlur stdDeviation="45" />
            </filter>
          </defs>
        </svg>
      </motion.div>
    </footer>
  );
}
