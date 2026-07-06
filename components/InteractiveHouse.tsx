"use client";

import { useState, useRef, useLayoutEffect, useEffect, useCallback } from "react";
import { lokali } from "@/data/lokali";
import DecryptedText from "@/components/ui/decrypted-text";
import TextType from "@/components/ui/text-type";

const VB_W = 1255;
const VB_H = 960;

function bounds(points: string) {
  const pts = points
    .trim()
    .split(/\s+/)
    .map((p) => p.split(",").map(Number));
  const xs = pts.map((p) => p[0]);
  const ys = pts.map((p) => p[1]);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  return { minX, maxX, minY, maxY, cx: (minX + maxX) / 2, cy: (minY + maxY) / 2 };
}

type Line = { slug: string; x1: number; y1: number; x2: number; y2: number };

export default function InteractiveHouse() {
  const [active, setActive] = useState<string | null>(null);
  // Na touch uređajima (bez hovera) fasada radi u dva tapa: prvi tap oboji deo
  // kuće + tekst lokala, drugi tap na isti deo skrola na sekciju.
  const [isTouch, setIsTouch] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const buildingRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [lines, setLines] = useState<Line[]>([]);

  // Izračunaj koordinate linija-vodilja (od desne ivice fasadnog polja do stavke liste).
  const measure = useCallback(() => {
    const wrap = wrapRef.current;
    const b = buildingRef.current;
    if (!wrap || !b) return;
    const wb = wrap.getBoundingClientRect();
    const bb = b.getBoundingClientRect();
    // Crtaj samo kad su kolone jedna pored druge (desktop).
    if (bb.width > wb.width - 24) {
      setLines([]);
      return;
    }
    const next: Line[] = [];
    lokali.forEach((l, i) => {
      const item = itemRefs.current[i];
      if (!item) return;
      const bd = bounds(l.hotspot.points);
      const ib = item.getBoundingClientRect();
      next.push({
        slug: l.slug,
        x1: bb.left - wb.left + (bd.maxX / VB_W) * bb.width,
        y1: bb.top - wb.top + (bd.cy / VB_H) * bb.height,
        x2: ib.left - wb.left,
        y2: ib.top - wb.top + ib.height / 2,
      });
    });
    setLines(next);
  }, []);

  useLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (wrapRef.current) ro.observe(wrapRef.current);
    window.addEventListener("resize", measure);
    const t = setTimeout(measure, 400); // fontovi/slika slegnu
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      clearTimeout(t);
    };
  }, [measure]);

  useEffect(() => {
    const mq = window.matchMedia("(hover: none)");
    const update = () => setIsTouch(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const goto = (slug: string) => {
    document
      .getElementById(`lokal-${slug}`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Klik na deo fasade. Na touch-u: prvi tap samo obeleži (oboji) lokal, a
  // ponovni tap na već obeleženi deo skrola na sekciju. Na desktopu (hover)
  // je deo već obeležen hoverom, pa klik odmah skrola.
  const handleHotspotClick = (slug: string) => {
    if (isTouch && active !== slug) {
      setActive(slug);
      return;
    }
    goto(slug);
  };

  const activeLokal = active ? lokali.find((l) => l.slug === active) : null;

  return (
    <section
      id="kuca"
      className="torn-top relative z-10 bg-ink px-5 py-12 md:sticky md:top-0 md:min-h-dvh md:px-8 md:py-16"
    >
      <div className="mx-auto max-w-6xl">
        <div
          data-reveal
          className="mb-4 flex flex-col justify-between gap-4 md:flex-row md:items-end"
        >
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-accent">
              <TextType text="[ Prostor ]" as="span" loop={false} startOnVisible typingSpeed={55} cursorCharacter="_" />
            </p>
            <h2
              className="text-tex max-w-2xl font-black uppercase leading-[0.92] tracking-tighter"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3.2rem)" }}
            >
              <DecryptedText text="Jedna kuća, sedam lokala." animateOn="view" sequential speed={34} />
            </h2>
          </div>
          <p className="max-w-xs font-mono text-xs uppercase leading-relaxed tracking-widest text-ash">
            Pređi kursorom preko fasade ili izaberi iz liste. Svaki deo kuće
            ima svoju priču.
          </p>
        </div>

        <div
          ref={wrapRef}
          className="relative grid gap-10 md:grid-cols-[1.55fr_1fr] md:items-center md:gap-6"
        >
          {/* Linije-vodilje (desktop) — od fasadnog polja do stavke liste */}
          <svg
            className="pointer-events-none absolute inset-0 z-20 hidden h-full w-full md:block"
            aria-hidden="true"
          >
            {lines.map((ln) => {
              const on = active === ln.slug;
              const midX = ln.x1 + (ln.x2 - ln.x1) * 0.5;
              const d = `M${ln.x1},${ln.y1} L${midX},${ln.y1} L${ln.x2},${ln.y2}`;
              return (
                <path
                  key={ln.slug}
                  d={d}
                  fill="none"
                  stroke={on ? "var(--color-accent)" : "rgba(255,255,255,0.18)"}
                  strokeWidth={on ? 1.5 : 1}
                  opacity={on ? 1 : 1}
                  className="transition-all duration-200"
                />
              );
            })}
          </svg>

          {/* Fasada — bela linija na crnom (bez kutije/pozadine) */}
          <div ref={buildingRef} className="relative mx-auto w-fit md:mx-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/house-line.png"
              alt="Crtež fasade zgrade 20/44 na Karađorđevoj 44"
              className="block max-h-[50vh] w-auto select-none"
            />
            <svg
              viewBox={`0 0 ${VB_W} ${VB_H}`}
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full"
              role="group"
              aria-label="Interaktivna fasada — lokali"
            >
              {lokali.map((l) => {
                const on = active === l.slug;
                return (
                  <polygon
                    key={l.slug}
                    points={l.hotspot.points}
                    className="cursor-pointer transition-all duration-200"
                    fill="var(--color-accent)"
                    fillOpacity={on ? 0.4 : 0}
                    stroke="var(--color-accent)"
                    strokeOpacity={on ? 0.9 : 0}
                    strokeWidth={2.5}
                    onMouseEnter={isTouch ? undefined : () => setActive(l.slug)}
                    onMouseLeave={isTouch ? undefined : () => setActive(null)}
                    onClick={() => handleHotspotClick(l.slug)}
                  />
                );
              })}
            </svg>

            {/* Oznaka na zgradi (Ronin tag) */}
            {activeLokal &&
              (() => {
                const bd = bounds(activeLokal.hotspot.points);
                return (
                  <span
                    className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap bg-accent px-2 py-1 font-mono text-[10px] font-medium uppercase tracking-widest text-ink"
                    style={{
                      left: `${(bd.cx / VB_W) * 100}%`,
                      top: `${(bd.cy / VB_H) * 100}%`,
                    }}
                  >
                    {activeLokal.naziv}
                  </span>
                );
              })()}
          </div>

          {/* Lista (Ronin stil): sprat · naziv · kratko */}
          <ul className="relative z-10 flex flex-col">
            {lokali.map((l, i) => {
              const on = active === l.slug;
              return (
                <li
                  key={l.slug}
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                >
                  <button
                    type="button"
                    onClick={() => goto(l.slug)}
                    onMouseEnter={() => setActive(l.slug)}
                    onMouseLeave={() => setActive(null)}
                    onFocus={() => setActive(l.slug)}
                    onBlur={() => setActive(null)}
                    className="block w-full py-2 text-left"
                  >
                    <span
                      className={`cursor-target inline-block font-black uppercase leading-none tracking-tight transition-colors ${
                        on ? "text-accent" : "text-bone"
                      }`}
                      style={{ fontSize: "clamp(1.05rem, 1.9vw, 1.55rem)" }}
                    >
                      {l.naziv}
                    </span>
                    <span
                      className={`mt-1.5 block font-mono text-[10px] uppercase tracking-widest transition-colors ${
                        on ? "text-accent/80" : "text-smoke"
                      }`}
                    >
                      {l.sprat} · {l.kratko}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
