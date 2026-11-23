"use client";

import { Children, useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight } from "@/components/icons";

/*
  Karusel po WHP-u (Slick: dots, arrows, draggable, infinite:false, 600ms), bez Slicka:
  native scroll-snap (swipe na telefonu besplatno) + strelice, tačkice i prevlačenje mišem.
  Slajd koji je manje od 60 % u kadru je na 45 % opacitija (WHP ima 20 %, ali su naše fotke
  različite širine pa su se previše gubile); scroller ide do desne ivice ekrana,
  pa sledeći slajd "viri" (WHP: .slick-list { overflow: visible }).
  Strelice i tačkice su okrugle kao na WHP-u (izuzetak od "sharp" pravila, odluka 23.11.2026).
  `arrowsSide`: strelice desno na sredini visine, jedna iznad druge (WHP .image-carousel);
  inače dole desno pored tačkica (WHP .event-carousel).
*/
export default function Carousel({
  children,
  label,
  slideClassName = "",
  arrowsSide = false,
}: {
  children: React.ReactNode;
  label: string;
  slideClassName?: string;
  arrowsSide?: boolean;
}) {
  const slides = Children.toArray(children);
  const scroller = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState<boolean[]>(() => slides.map((_, i) => i === 0));
  const [current, setCurrent] = useState(0);
  const [edge, setEdge] = useState({ start: true, end: false });
  const drag = useRef({ down: false, moved: false, x: 0, left: 0 });
  const frame = useRef(0);

  // Položaj slajda unutar scrollera (ne zavisi od offsetParent-a).
  const posOf = (el: HTMLElement, item: HTMLElement) =>
    item.getBoundingClientRect().left - el.getBoundingClientRect().left + el.scrollLeft;
  const nearestIndex = (el: HTMLElement) => {
    const items = Array.from(el.children) as HTMLElement[];
    return items.reduce(
      (best, item, i) =>
        Math.abs(posOf(el, item) - el.scrollLeft) < Math.abs(posOf(el, items[best]) - el.scrollLeft) ? i : best,
      0
    );
  };

  // Slajd je "aktivan" (pun opacitet) kad je bar 60 % u kadru.
  useEffect(() => {
    const root = scroller.current;
    if (!root) return;
    const items = Array.from(root.children) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        setVisible((prev) => {
          const next = [...prev];
          for (const e of entries) next[items.indexOf(e.target as HTMLElement)] = e.intersectionRatio >= 0.6;
          return next;
        });
      },
      { root, threshold: [0, 0.6, 1] }
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [slides.length]);

  const sync = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    setCurrent(nearestIndex(el));
    setEdge({ start: el.scrollLeft <= 2, end: el.scrollLeft >= el.scrollWidth - el.clientWidth - 2 });
  }, []);

  // Prostor iza poslednjeg slajda, da i on može da stane uz levu ivicu
  // (bez toga se kraj zaustavlja "između" dve slike).
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const fit = () => {
      const last = el.lastElementChild as HTMLElement | null;
      if (last) el.style.paddingRight = `${Math.max(0, el.clientWidth - last.offsetWidth)}px`;
      sync();
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    if (el.lastElementChild) ro.observe(el.lastElementChild);
    return () => ro.disconnect();
  }, [slides.length, sync]);

  const onScroll = () => {
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(sync);
  };

  const behavior = (): ScrollBehavior =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";

  const goTo = (i: number) => {
    const el = scroller.current;
    const item = el?.children[Math.max(0, Math.min(i, slides.length - 1))] as HTMLElement | undefined;
    if (el && item) el.scrollTo({ left: posOf(el, item), behavior: behavior() });
  };

  // Strelica ide tačno na susedni slajd.
  const step = (dir: 1 | -1) => {
    const el = scroller.current;
    if (el) goTo(nearestIndex(el) + dir);
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
      const nearest = nearestIndex(el);
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

  const first = current;
  const arrow =
    "flex h-9 w-9 items-center justify-center rounded-full border-2 border-accent bg-ink/80 text-accent transition-[opacity,background-color,color] duration-300 hover:bg-accent hover:text-ink disabled:pointer-events-none disabled:opacity-20";
  const arrows = (
    <>
      <button type="button" onClick={() => step(-1)} disabled={edge.start} aria-label="Prethodno" className={arrow}>
        <ArrowRight className="h-4 w-4 rotate-180" />
      </button>
      <button type="button" onClick={() => step(1)} disabled={edge.end} aria-label="Sledeće" className={arrow}>
        <ArrowRight className="h-4 w-4" />
      </button>
    </>
  );

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label} className="relative">
      <div className="relative">
        <div
          ref={scroller}
          onScroll={onScroll}
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
                visible[i] ? "opacity-100" : "opacity-[0.45]"
              } ${slideClassName}`}
            >
              {slide}
            </div>
          ))}
        </div>
        {arrowsSide && (
          <div className="absolute right-0 top-1/2 z-10 flex -translate-y-1/2 flex-col gap-2 max-sm:hidden">{arrows}</div>
        )}
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
                className={`block h-3.5 w-3.5 rounded-full border-2 border-bone transition-colors duration-300 max-sm:h-3 max-sm:w-3 ${
                  i === first ? "bg-bone" : "bg-transparent hover:bg-bone/30"
                }`}
              />
            </li>
          ))}
        </ol>
        {/* Bočne strelice se na telefonu sele dole, pored tačkica */}
        <div className={`flex gap-2 ${arrowsSide ? "sm:hidden" : ""}`}>{arrows}</div>
      </div>
    </div>
  );
}
