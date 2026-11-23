import type { Metadata } from "next";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import GoreMark from "@/components/GoreMark";
import ImgReveal from "@/components/ImgReveal";
import Carousel from "@/components/Carousel";
import BgLetters from "@/components/BgLetters";
import TextType from "@/components/ui/text-type";
import { ArrowUpRight } from "@/components/icons";
import { gore } from "@/data/gore";
import { lokali } from "@/data/lokali";
import { site } from "@/data/site";

/*
  Strana lokala po WHP event strani (research/2026-11-23-thewarehouseproject-podstrane-teardown.md):
  event panel (poster | detalji) → image karusel → ritam dana → "ostali lokali" karusel kartica.
*/

const lokal = lokali.find((l) => l.slug === "lounge-bar")!;
const ostali = lokali.filter((l) => l.slug !== lokal.slug);

export const metadata: Metadata = {
  title: "GORE Lounge — 2. sprat 20/44 | Savamala, Beograd",
  description: `${gore.podnaslov} ${gore.zavrsna}`,
  openGraph: {
    title: "GORE Lounge — 20/44",
    description: gore.zavrsna,
    type: "website",
    images: [gore.poster.src],
  },
};

/* WHP .sectional-title: prvi red bold, drugi lakši. Ispod je cross-line-detail: kratka
   horizontalna linija koja počinje levo od naslova i vertikalna koja se spušta niz gutter. */
function SectionalTitle({ jak, slab }: { jak: string; slab: string }) {
  return (
    <h2 className="relative pb-5 font-black uppercase leading-[0.95] tracking-tighter" style={{ fontSize: "clamp(2rem, 4.2vw, 3.25rem)" }}>
      <span className="text-tex block">{jak}</span>
      <span className="block font-medium text-bone/80">{slab}</span>
      <span aria-hidden="true" className="absolute -left-10 bottom-0 h-px w-36 bg-bone/40" />
      <span aria-hidden="true" className="absolute -left-4 top-[calc(100%-1.75rem)] h-[26rem] w-px bg-bone/25 md:-left-5" />
    </h2>
  );
}

/* WHP title-detail-base: duga linija ispod naslova, vertikalna crta na ivici kolone (gore bleđa)
   i polukrug "D" na spoju. */
function TitleDetail() {
  return (
    <div aria-hidden="true" className="relative mt-6 h-px w-3/4 max-w-md bg-bone/40">
      <span className="absolute -top-16 left-0 h-[7.75rem] w-px bg-gradient-to-b from-bone/10 via-bone/45 to-bone/45" />
      <span className="absolute left-0 top-1/2 h-3 w-1.5 -translate-y-1/2 rounded-r-full border border-l-0 border-bone/70" />
    </div>
  );
}

const btn = "inline-flex items-center gap-2 border-2 px-5 py-3.5 font-mono text-xs uppercase tracking-widest transition-colors duration-300";

export default function GorePage() {
  return (
    <>
      <Nav />
      <main id="top" className="relative overflow-x-clip">
        {/* WHP bg-flood: ogromna bleda slova iza svega, sporiji skrol */}
        <BgLetters>
          {[0, 1, 2, 3].map((i) => (
            <GoreMark key={i} className="text-[34vw]" />
          ))}
        </BgLetters>

        {/* Event panel — poster uz levu ivicu, detalji desno */}
        <section className="relative z-10 mx-auto max-w-[1600px] pt-20 md:pt-24">
          <div className="flex flex-col lg:flex-row lg:items-start">
            <figure className="relative z-10 aspect-square w-full overflow-hidden lg:sticky lg:top-20 lg:w-1/2">
              <ImgReveal
                src={gore.poster.src}
                alt={gore.poster.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                style={{ objectPosition: gore.poster.pozicija }}
                className="poster-slide object-cover"
              />
            </figure>

            <div className="w-full pb-16 pt-8 lg:w-1/2 lg:pt-10">
              <p className="tag-bleed tex-noise inline-block bg-accent py-2.5 pl-5 pr-4 font-mono text-sm uppercase tracking-widest text-ink md:pl-8">
                Lokal {lokal.broj} · {lokal.sprat}
              </p>

              <h1 className="px-5 pt-8 md:px-8">
                <span className="sr-only">{gore.naziv}</span>
                <GoreMark tex className="text-[clamp(4.5rem,11vw,9.5rem)]" />
              </h1>
              <TitleDetail />

              <div className="space-y-1 px-5 pt-8 md:px-8">
                <p className="font-black uppercase tracking-tight text-bone">{gore.mesto}</p>
                <p className="text-bone/80">{gore.vreme}</p>
              </div>

              <div className="flex flex-wrap gap-3 px-5 pt-8 md:px-8">
                <a
                  href={site.mapaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${btn} border-accent bg-accent text-ink hover:bg-ink hover:text-accent`}
                >
                  Kako do nas
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
                <a href="/#lokali" className={`${btn} border-bone text-bone hover:bg-bone hover:text-ink`}>
                  Svi lokali
                </a>
              </div>

              <div className="max-w-xl space-y-5 px-5 pt-10 md:px-8">
                <p className="font-black uppercase leading-snug tracking-tight text-bone">{gore.podnaslov}</p>
                {gore.pasusi.map((p) => (
                  <p key={p} className="leading-relaxed text-bone/80">
                    {p}
                  </p>
                ))}
                <ul className="flex flex-wrap gap-2 pt-2">
                  {gore.zanrovi.map((z) => (
                    <li key={z} className="border border-line px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-bone">
                      {z}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Image karusel (WHP .image-carousel) */}
        <section className="relative z-10 border-t border-line px-5 py-20 md:px-8 md:py-28">
          <div className="mx-auto max-w-6xl">
            <div data-reveal className="mb-10">
              <p className="mb-5 font-mono text-xs uppercase tracking-widest text-accent">
                <TextType text="[ Pod krovom ]" as="span" loop={false} startOnVisible typingSpeed={55} cursorCharacter="_" />
              </p>
              <SectionalTitle jak="Sprat" slab="iznad svega" />
            </div>
            <Carousel label="Fotografije GORE Lounge-a" arrowsSide>
              {gore.slike.map((s) => (
                <figure key={s.src} className="relative h-[min(68vh,640px)] overflow-hidden border border-line" style={{ aspectRatio: `${s.w} / ${s.h}`, maxWidth: "85vw" }}>
                  <ImgReveal src={s.src} alt={s.alt} fill sizes="(max-width: 640px) 85vw, 900px" className="object-cover" />
                </figure>
              ))}
            </Carousel>
          </div>
        </section>

        {/* Ritam dana */}
        <section aria-label={gore.zavrsna} className="relative z-10 border-t border-line">
          <div data-reveal-group className="mx-auto grid max-w-6xl md:grid-cols-3">
            {gore.ritam.map((r, i) => (
              <div key={r.kad} className={`border-line px-5 py-12 md:px-8 md:py-16 ${i > 0 ? "border-t md:border-l md:border-t-0" : ""}`}>
                <p className="font-mono text-xs uppercase tracking-widest text-smoke">
                  {String(i + 1).padStart(2, "0")} · {r.kad}
                </p>
                <p
                  className={`mt-3 font-black uppercase leading-none tracking-tighter ${i === 2 ? "text-accent" : "text-tex"}`}
                  style={{ fontSize: "clamp(2.5rem, 4.2vw, 4rem)" }}
                >
                  {r.sta}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Ostali lokali (WHP "Other upcoming events") */}
        <section className="relative z-10 border-t border-line px-5 py-20 md:px-8 md:py-28">
          <div className="mx-auto max-w-6xl">
            <div data-reveal className="mb-10">
              <SectionalTitle jak="Ostali" slab="lokali u kući" />
            </div>
            <Carousel label="Ostali lokali 20/44" slideClassName="w-[78vw] sm:w-[340px]">
              {ostali.map((l) => (
                /* WHP .event-card: svetla teksturisana kartica, mesto sa crticom od ivice,
                   žuta oznaka koja kreće od leve ivice kartice, veliki naslov, tamno dugme */
                <a key={l.slug} href={`/#lokal-${l.slug}`} className="group tex-noise flex h-full flex-col overflow-hidden bg-[#dededa] text-ink">
                  <div className="relative aspect-square overflow-hidden bg-ink">
                    <Image
                      src={l.slika}
                      alt={`${l.naziv} — 20/44`}
                      fill
                      sizes="(max-width: 640px) 78vw, 340px"
                      className="object-cover transition-[scale] duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col items-start pb-7 pr-5">
                    <p className="flex items-center gap-2 pt-4 font-mono text-[11px] uppercase tracking-widest text-ink/70">
                      <span className="h-px w-4 bg-ink/60" />
                      {l.sprat}
                    </p>
                    <span className="tex-noise mt-2 bg-accent py-2 pl-5 pr-3 font-mono text-[11px] uppercase tracking-widest">
                      {l.kratko}
                    </span>
                    <p className="pb-6 pl-5 pt-4 text-[1.7rem] font-black uppercase leading-none tracking-tighter">{l.naziv}</p>
                    <span className={`${btn} ml-5 mt-auto border-ink px-4 py-3 group-hover:bg-ink group-hover:text-bone`}>
                      Pogledaj lokal
                    </span>
                  </div>
                </a>
              ))}
            </Carousel>
            {/* WHP .view-all: link sa linijom koja ide do desne ivice ekrana */}
            <div className="mt-8 flex justify-end">
              <a
                href="/#kuca"
                className="relative pb-3 pr-5 font-mono text-xs uppercase tracking-widest text-accent/90 transition-colors hover:text-accent md:pr-8"
              >
                Cela kuća na mapi
                <span aria-hidden="true" className="absolute bottom-0 left-0 h-px w-[75vw] bg-accent/30" />
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
