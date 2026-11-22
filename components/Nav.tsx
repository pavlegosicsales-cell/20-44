"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { ArrowUpRight, InstagramIcon, FacebookIcon } from "@/components/icons";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Nav dobija pozadinu/blur kad se skroluje sa vrha.
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
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <nav
          className={`flex items-center justify-between px-5 transition-all duration-300 md:px-8 ${
            scrolled ? "bg-ink/85 py-3 backdrop-blur-md" : "py-4"
          }`}
        >
          {/* Znak — zvanični logo (gornji levi ugao) */}
          <a
            href="/#top"
            className="inline-flex items-center select-none"
            aria-label="20/44 — početak"
          >
            <Image
              src="/images/logo.png"
              alt="20/44"
              width={160}
              height={160}
              priority
              className={`w-auto transition-all duration-300 ${
                scrolled ? "h-12" : "h-16"
              }`}
            />
          </a>

          <div className="flex items-center gap-3">
            <a
              href="/#lokali"
              className="hidden sm:inline-flex items-center gap-2 border border-accent px-4 py-2 font-mono text-xs uppercase tracking-widest text-accent transition-colors hover:bg-accent hover:text-ink"
            >
              Prostor
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-bone transition-colors hover:text-accent"
              aria-expanded={open}
              aria-controls="menu-overlay"
            >
              Meni
              <span className="flex flex-col gap-1" aria-hidden="true">
                <span className="block h-px w-5 bg-current" />
                <span className="block h-px w-5 bg-current" />
              </span>
            </button>
          </div>
        </nav>
        {/* tanka linija ispod nava */}
        <div className="h-px w-full bg-line" />
      </header>

      {/* Full-screen meni overlay */}
      <div
        id="menu-overlay"
        className={`fixed inset-0 z-[70] bg-accent text-ink transition-transform duration-300 ease-out ${
          open ? "translate-y-0" : "-translate-y-full pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <div className="flex h-full flex-col p-5 md:p-8">
          <div className="flex items-center justify-between">
            <span className="font-black text-xl tracking-tighter">20/44</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest transition-opacity hover:opacity-60"
            >
              Zatvori
              <span className="relative block h-4 w-4" aria-hidden="true">
                <span className="absolute left-0 top-1/2 h-px w-full rotate-45 bg-current" />
                <span className="absolute left-0 top-1/2 h-px w-full -rotate-45 bg-current" />
              </span>
            </button>
          </div>

          <div className="hatch-accent mt-6 h-px w-full opacity-40" />

          <nav className="flex flex-1 flex-col justify-center gap-1">
            {site.nav.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="group flex items-baseline gap-4 py-1 font-black uppercase leading-[0.95] tracking-tighter transition-opacity hover:opacity-60"
                style={{ fontSize: "clamp(2.5rem, 9vw, 6rem)" }}
              >
                <span className="font-mono text-xs font-normal tracking-widest opacity-50">
                  0{i + 1}
                </span>
                {item.naziv}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-4 border-t border-ink/20 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              {site.socials.map((s) => (
                <a
                  key={s.naziv}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest transition-opacity hover:opacity-60"
                >
                  {s.naziv === "Instagram" && <InstagramIcon className="h-4 w-4" />}
                  {s.naziv === "Facebook" && <FacebookIcon className="h-4 w-4" />}
                  {s.naziv}
                </a>
              ))}
            </div>
            <p className="font-mono text-xs uppercase tracking-widest">
              {site.adresa.ulica} · {site.adresa.deo}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
