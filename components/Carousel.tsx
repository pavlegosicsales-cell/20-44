"use client";

import { Children, useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight } from "@/components/icons";

/*
  Karusel po WHP-u (Slick: dots, arrows, draggable, infinite:false, 600ms), bez Slicka:
  native scroll-snap (swipe na telefonu besplatno) + strelice, tačkice i prevlačenje mišem.
  Slajd koji nije ceo u kadru je na 20 % opacitija; scroller ide do desne ivice ekrana,
  pa sledeći slajd "viri" (WHP: .slick-list { overflow: visible }).
  Strelice i tačkice su kockaste — sajt je "sharp", bez zaobljenja.
*/
export default function Carousel({
  children,
  label,
  slideClassName = "",
}: {
  children: React.ReactNode;
  label: string;
  slideClassName?: string;
}) {
  const slides = Children.toArray(children);
  const scroller = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState<boolean[]>(() => slides.map((_, i) => i === 0));
  const [edge, setEdge] = useState({ start: true, end: false });
  const drag = useRef({ down: false, moved: false, x: 0, left: 0 });

  // Koji slajdovi su (skoro) ceo u kadru.
  useEffect(() => {
    const root = scroller.current;
    if (!root) return;
    const items = Array.from(root.children) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        setVisible((prev) => {
          const next = [...prev];
          for (const e of entries) next[items.indexOf(e.target as HTMLElement)] = e.intersectionRatio >= 0.9;
          return next;
        });
      },
      { root, threshold: [0, 0.9, 1] }
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [slides.length]);

  const updateEdges = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft <= 2, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2 });
  }, []);

  useEffect(() => {
    updateEdges();
    window.addEventListener("resize", updateEdges);
    return () => window.removeEventListener("resize", updateEdges);
  }, [updateEdges]);

  const behavior = (): ScrollBehavior =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";

  const goTo = (i: number) => {
    const el = scroller.current;
    const item = el?.children[i] as HTMLElement | undefined;
    if (el && item) el.scrollTo({ left: item.offsetLeft - el.offsetLeft, behavior: behavior() });
  };

  const step = (dir: 1 | -1) => {
    const el = scroller.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: behavior() });
  };

  // Prevlačenje mišem (dodir koristi native scroll). Snap se gasi dok se vuče.
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !scroller.current) return;
    drag.current = { down: true, moved: false, x: e.clientX, left: scroller.current.scrollLeft };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    const el = scroller.current;
    if (!d.down || !el) return;
    const dx = e.clientX - d.x;
    if (!d.moved && Math.abs(dx) > 5) {
      d.moved = true;
      el.style.scrollSnapType = "none";
      el.setPointerCapture(e.pointerId);
    }
    if (d.moved) el.scrollLeft = d.left - dx;
  };
  const endDrag = () => {
    const el = scroller.current;
    if (!drag.current.down || !el) return;
    drag.current.down = false;
    if (drag.current.moved) {
      // Vrati snap i dovedi najbliži slajd na početak.
      const items = Array.from(el.children) as HTMLElement[];
      const nearest = items.reduce((best, item, i) =>
        Math.abs(item.offsetLeft - el.offsetLeft - el.scrollLeft) <
        Math.abs(items[best].offsetLeft - el.offsetLeft - el.scrollLeft)
          ? i
          : best, 0);
      el.style.scrollSnapType = "";
      goTo(nearest);
      // Klik (ako ga browser pošalje) stiže pre ovog tajmera; posle njega klikovi opet rade.
      setTimeout(() => (drag.current.moved = false), 0);
    }
  };
  // Klik posle prevlačenja ne sme da otvori link u kartici.
  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const first = Math.max(0, visible.indexOf(true));
  const arrow =
    "flex h-9 w-9 items-center justify-center border-2 border-accent bg-ink/80 text-accent transition-[opacity,background-color,color] duration-300 hover:bg-accent hover:text-ink disabled:pointer-events-none disabled:opacity-20";

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label} className="relative">
      <div
        ref={scroller}
        onScroll={updateEdges}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
        onDragStart={(e) => e.preventDefault()}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        tabIndex={0}
        className="no-scrollbar mr-[calc(50%-50vw)] flex snap-x snap-mandatory gap-3 overflow-x-auto pr-5 outline-none select-none md:pr-8 [&_img]:pointer-events-none"
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} / ${slides.length}`}
            className={`shrink-0 snap-start transition-opacity duration-[600ms] ease-out ${
              visible[i] ? "opacity-100" : "opacity-20"
            } ${slideClassName}`}
          >
            {slide}
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <ol className="flex flex-wrap items-center gap-1.5" aria-label="Slajdovi">
          {slides.map((_, i) => (
            <li key={i}>
              <button
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Idi na slajd ${i + 1}`}
                aria-current={i === first ? "true" : undefined}
                className={`block h-3 w-3 border-2 border-bone transition-colors duration-300 ${
                  i === first ? "bg-bone" : "bg-transparent hover:bg-bone/30"
                }`}
              />
            </li>
          ))}
        </ol>
        <div className="flex gap-2">
          <button type="button" onClick={() => step(-1)} disabled={edge.start} aria-label="Prethodno" className={arrow}>
            <ArrowRight className="h-4 w-4 rotate-180" />
          </button>
          <button type="button" onClick={() => step(1)} disabled={edge.end} aria-label="Sledeće" className={arrow}>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
