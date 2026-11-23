"use client";

import { useEffect, useRef } from "react";

/*
  WHP detail-layers .dl-02: ogromna slova preko cele strane na 10 % opacitija, pomeraju se
  sporije od sadržaja (scroll-shift-two: translateY(0.19 * scrollTop)). Roditelj mora biti
  `relative`; sadržaj iznad treba `relative z-10`. Poštuje reduced-motion.
*/
export default function BgLetters({ children }: { children: React.ReactNode }) {
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (inner.current) inner.current.style.transform = `translate3d(0, ${window.scrollY * 0.19}px, 0)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none">
      <div ref={inner} className="flex flex-col items-center gap-[6vw] pt-[8vw] text-bone opacity-[0.045] will-change-transform">
        {children}
      </div>
    </div>
  );
}
