"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "How It Works", href: "#use-cases" },
  { label: "Features", href: "#features" },
  { label: "Privacy", href: "#privacy" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="print:hidden fixed top-[1.4rem] md:top-[2.8rem] left-[1rem] right-[1rem] flex flex-col items-center gap-y-[1rem] z-50">
      {/* Mobile nav */}
      <div className="md:hidden relative w-full">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-full rounded-[3rem] bg-white/80 border border-black/8 shadow-sm backdrop-blur-xl flex items-center justify-between px-[2.4rem] h-[5.2rem]"
        >
          <OakLogo />
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="text-black"
          >
            <path
              d="M3 5h14M3 10h14M3 15h14"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full mt-2 w-full rounded-[1.6rem] bg-white/90 backdrop-blur-xl border border-black/8 shadow-lg p-4"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block px-[2rem] py-[1.2rem] text-[1.6rem] text-black/70 hover:text-black transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop nav */}
      <nav
        aria-label="Main navigation"
        className="hidden md:flex w-full items-center justify-center z-10 relative"
      >
        <motion.div
          className="bg-white/80 backdrop-blur-md border border-black/8 rounded-[1.6rem] shadow-sm flex items-center h-[5.2rem] pl-[0.6rem] pr-[2.4rem] gap-[1.6rem]"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            href="/"
            className="flex items-center gap-[0.6rem] h-[4rem] px-[0.8rem] text-black transition-opacity duration-200 hover:opacity-70"
            aria-label="OakReader"
          >
            <OakLogo />
            <span className="text-[1.6rem] font-semibold tracking-[-0.02em]">OakReader</span>
          </Link>
          <ul className="flex gap-[1.6rem] items-center justify-center">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-[1.6rem] relative transition-opacity duration-200 hover:opacity-100 whitespace-nowrap opacity-70"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      </nav>
    </header>
  );
}

function OakLogo() {
  return (
    <Image
      src="/icon.svg"
      alt="OakReader"
      width={28}
      height={28}
      className="rounded-[0.5rem]"
    />
  );
}
