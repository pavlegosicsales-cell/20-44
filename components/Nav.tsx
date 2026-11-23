"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { ArrowUpRight, InstagramIcon, FacebookIcon } from "@/components/icons";

/*
  Nav po WHP-u: logo levo, obrubljeno dugme + "Meni" sa ikonicom od tačkica desno.
  Meni je žuti panel zdesna (500px, na telefonu ceo ekran minus 75px) preko zatamnjenja;
  stavke ulaze redom (375ms + 50ms po stavci), hatch linija raste ispod liste.
  Animacije su u globals.css (.menu-open ...).
*/

/* WHP menu-animatics: 8 tačaka oko centra nestaje redom, centar izraste u "+", pa se okrene u "X". */
function MenuDots({ open }: { open: boolean }) {
  const ring = [
    [17, 17], [28, 17], [39, 17],
    [17, 28], [39, 28],
    [17, 39], [28, 39], [39, 39],
  ];
  const t = "transition-transform duration-200 ease-[cubic-bezier(0.72,0,0.19,1)] [transform-box:fill-box] [transform-origin:center]";
  return (
    <svg viewBox="0 0 60 60" className="h-11 w-11" aria-hidden="true">
      {ring.map(([x, y], i) => (
        <rect
          key={i}
          x={x}
          y={y}
          width="4"
          height="4"
          fill="currentColor"
          className={`${t} transition-[transform,opacity]`}
          style={{
            transform: open ? "scale(0.25)" : "none",
            opacity: open ? 0 : 1,
            transitionDelay: `${(open ? i : 7 - i) * 25}ms`,
          }}
        />
      ))}
      <g
        className="transition-transform duration-200 [transform-origin:30px_30px]"
        style={{ transform: open ? "rotate(45deg)" : "none", transitionDelay: open ? "380ms" : "0ms" }}
      >
        <rect x="28" y="28" width="4" height="4" fill="currentColor" className={t}
          style={{ transform: open ? "scaleX(6.5)" : "none", transitionDelay: open ? "200ms" : "150ms" }} />
        <rect x="28" y="28" width="4" height="4" fill="currentColor" className={t}
          style={{ transform: open ? "scaleY(6.5)" : "none", transitionDelay: open ? "200ms" : "150ms" }} />
      </g>
    </svg>
  );
}

const menuStavke = [...site.nav, { naziv: "GORE Lounge", href: "/gore" }];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Nav dobija pozadinu/blur kad se skroluje sa vrha (WHP body.off-top, prag 30px).
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Zaključaj skrol dok je meni otvoren; Esc zatvara.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className={open ? "menu-open" : ""}>
      <header className="fixed inset-x-0 top-0 z-50">
        <nav
          className={`flex items-center justify-between px-5 transition-all duration-300 md:px-8 ${
            scrolled && !open ? "bg-ink/85 py-3 backdrop-blur-md" : "py-4"
          }`}
        >
          {/* Znak — zvanični logo (gornji levi ugao) */}
          <a href="/#top" className="inline-flex items-center select-none" aria-label="20/44 — početak">
            <Image
              src="/images/logo.png"
              alt="20/44"
              width={160}
              height={160}
              priority
              className={`w-auto transition-all duration-300 ${scrolled ? "h-12" : "h-16"}`}
            />
          </a>

          <div className="flex items-center gap-3">
            <a
              href="/#lokali"
              className={`hidden items-center gap-2 border-2 border-accent px-4 py-2 font-mono text-xs uppercase tracking-widest text-accent transition-opacity duration-300 hover:bg-accent hover:text-ink sm:inline-flex ${
                open ? "pointer-events-none opacity-0" : ""
              }`}
            >
              Prostor
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            {/* Dugme ostaje iznad panela; na žutom postaje tamno */}
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              className={`relative z-[80] -mr-2 inline-flex items-center gap-1 font-mono text-xs uppercase tracking-widest transition-colors duration-300 ${
                open ? "text-ink" : "text-bone hover:text-accent"
              }`}
              aria-expanded={open}
              aria-controls="menu-panel"
              aria-label={open ? "Zatvori meni" : "Otvori meni"}
            >
              {open ? "Zatvori" : "Meni"}
              <MenuDots open={open} />
            </button>
          </div>
        </nav>
        {/* tanka linija ispod nava */}
        <div className="h-px w-full bg-line" />
      </header>

      {/* Zatamnjenje ispod panela — klik zatvara */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-[60] bg-ink/80 transition-opacity duration-500 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Panel zdesna */}
      <div
        id="menu-panel"
        inert={!open}
        className={`menu-panel tex-noise fixed right-0 top-0 z-[70] flex h-dvh w-[calc(100%-75px)] flex-col bg-accent px-5 pb-6 pt-24 text-ink transition-transform duration-500 ease-[cubic-bezier(0.72,0,0.19,1)] sm:w-[500px] md:px-8 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav aria-label="Glavni meni" className="relative">
          <ul className="space-y-2.5">
            {menuStavke.map((item, i) => (
              <li key={item.href} className="menu-item" style={{ animationDelay: `${375 + i * 50}ms` }}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="group inline-flex items-baseline gap-3 font-black uppercase leading-[1.05] tracking-tighter decoration-ink decoration-dotted decoration-1 underline-offset-4 transition-transform duration-300 hover:translate-x-[5px] hover:underline"
                  style={{ fontSize: "clamp(1.9rem, 3.4vw, 2.5rem)" }}
                >
                  <span className="font-mono text-xs font-normal tracking-widest opacity-50">0{i + 1}</span>
                  {item.naziv}
                </a>
              </li>
            ))}
          </ul>
          <div className="menu-hatch hatch-ink mt-7 h-5" aria-hidden="true" />
        </nav>

        <ul className="mt-8 flex gap-2">
          {site.socials.map((s, i) => (
            <li key={s.naziv} className="menu-item" style={{ animationDelay: `${700 + i * 50}ms` }}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.naziv}
                className="flex h-[38px] w-[38px] items-center justify-center rounded-full border-2 border-ink font-mono text-[10px] font-bold transition-transform duration-300 hover:-translate-y-[5px]"
              >
                {s.naziv === "Instagram" ? (
                  <InstagramIcon className="h-4 w-4" />
                ) : s.naziv === "Facebook" ? (
                  <FacebookIcon className="h-4 w-4" />
                ) : (
                  s.naziv
                )}
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-auto font-mono text-xs uppercase tracking-widest">
          {site.adresa.ulica} · {site.adresa.deo}
        </p>
      </div>
    </div>
  );
}
