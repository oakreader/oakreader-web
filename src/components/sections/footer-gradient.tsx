"use client";

import { useRef, useEffect, useCallback } from "react";

/**
 * Footer gradient with constant gravity.
 *
 * Physics model: gravity always pulls the gradient down.
 * Wheel/touch events push it up. When you stop scrolling, gravity wins.
 */
export function FooterGradient() {
  const svgRef = useRef<HTMLDivElement>(null);
  const overscroll = useRef(0);
  const maxOverscroll = 300;
  const rafId = useRef<number | null>(null);
  const lastWheelTime = useRef(0);

  // Continuous physics loop — runs every frame
  useEffect(() => {
    const isAtBottom = () =>
      window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight - 5;

    const tick = () => {
      // If NOT at bottom, kill gradient instantly — no matter what
      if (!isAtBottom()) {
        overscroll.current = 0;
      } else {
        const now = performance.now();
        const timeSinceWheel = now - lastWheelTime.current;

        if (timeSinceWheel > 60) {
          overscroll.current *= 0.82; // gravity
        } else {
          overscroll.current *= 0.97; // light friction while scrolling
        }

        if (overscroll.current < 0.3) {
          overscroll.current = 0;
        }
      }

      // Update DOM
      if (svgRef.current) {
        if (overscroll.current === 0) {
          svgRef.current.style.transform = "scaleY(0)";
          svgRef.current.style.opacity = "0";
          svgRef.current.style.visibility = "hidden";
        } else {
          const t = Math.min(1, overscroll.current / maxOverscroll);
          svgRef.current.style.transform = `scaleY(${t})`;
          svgRef.current.style.opacity = "1";
          svgRef.current.style.visibility = "visible";
        }
      }

      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  // Wheel events push the gradient up (against gravity)
  useEffect(() => {
    const isAtBottom = () =>
      window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight - 5;

    const onWheel = (e: WheelEvent) => {
      if (!isAtBottom() || e.deltaY <= 0) return;

      lastWheelTime.current = performance.now();
      overscroll.current = Math.min(
        maxOverscroll,
        overscroll.current + e.deltaY * 0.35
      );
    };

    const onScroll = () => {
      // Scrolled away from bottom — kill immediately
      if (!isAtBottom() && overscroll.current > 0) {
        overscroll.current = 0;
      }
    };

    // Touch support
    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isAtBottom()) return;
      const deltaY = touchStartY - e.touches[0].clientY;
      if (deltaY <= 0) return;
      lastWheelTime.current = performance.now();
      overscroll.current = Math.min(maxOverscroll, deltaY * 0.4);
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  return (
    <div
      ref={svgRef}
      className="origin-bottom fixed bottom-0 left-0 right-0 z-[2] pointer-events-none h-[12rem] md:h-[18rem] lg:h-[30svh]"
      aria-hidden="true"
      style={{ transform: "scaleY(0)", opacity: 0, visibility: "hidden" }}
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
    </div>
  );
}
