import type { Metadata } from "next";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import GoreMark from "@/components/GoreMark";
import ImgReveal from "@/components/ImgReveal";
import Carousel from "@/components/Carousel";
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

/* WHP .sectional-title: prvi red bold, drugi lakši, kratka linija ispod. */
function SectionalTitle({ jak, slab }: { jak: string; slab: string }) {
  return (
    <h2 className="relative pb-5 font-black uppercase leading-[0.95] tracking-tighter" style={{ fontSize: "clamp(2rem, 4.2vw, 3.25rem)" }}>
      <span className="text-tex block">{jak}</span>
      <span className="block font-medium text-bone/80">{slab}</span>
      <span aria-hidden="true" className="absolute bottom-0 left-0 h-px w-24 bg-bone/40" />
    </h2>
  );
}

/* WHP title-detail-base: linija ispod naslova, vertikalna crta na ivici kolone i čvor na spoju. */
function TitleDetail() {
  return (
    <div aria-hidden="true" className="relative mt-6 h-px w-3/4 max-w-md bg-bone/35">
      <span className="absolute -top-10 left-0 h-20 w-px bg-bone/35" />
      <span className="absolute left-0 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 border border-bone/70 bg-ink" />
    </div>
  );
}

const btn = "inline-flex items-center gap-2 border-2 px-5 py-3.5 font-mono text-xs uppercase tracking-widest transition-colors duration-300";

export default function GorePage() {
  return (
    <>
      <Nav />
      <main id="top" className="overflow-x-clip">
        {/* Event panel — poster uz levu ivicu, detalji desno */}
        <section className="mx-auto max-w-[1600px] pt-20 md:pt-24">
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
              <p className="tag-bleed inline-block bg-accent py-2.5 pl-5 pr-4 font-mono text-sm uppercase tracking-widest text-ink md:pl-8">
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
        <section className="border-t border-line px-5 py-20 md:px-8 md:py-28">
          <div className="mx-auto max-w-6xl">
            <div data-reveal className="mb-10">
              <p className="mb-5 font-mono text-xs uppercase tracking-widest text-accent">
                <TextType text="[ Pod krovom ]" as="span" loop={false} startOnVisible typingSpeed={55} cursorCharacter="_" />
              </p>
              <SectionalTitle jak="Sprat" slab="iznad svega" />
            </div>
            <Carousel label="Fotografije GORE Lounge-a">
              {gore.slike.map((s) => (
                <figure key={s.src} className="relative h-[min(68vh,640px)] overflow-hidden border border-line" style={{ aspectRatio: `${s.w} / ${s.h}`, maxWidth: "85vw" }}>
                  <ImgReveal src={s.src} alt={s.alt} fill sizes="(max-width: 640px) 85vw, 900px" className="object-cover" />
                </figure>
              ))}
            </Carousel>
          </div>
        </section>

        {/* Ritam dana */}
        <section aria-label={gore.zavrsna} className="border-t border-line">
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
        <section className="border-t border-line px-5 py-20 md:px-8 md:py-28">
          <div className="mx-auto max-w-6xl">
            <div data-reveal className="mb-10">
              <SectionalTitle jak="Ostali" slab="lokali u kući" />
            </div>
            <Carousel label="Ostali lokali 20/44" slideClassName="w-[78vw] sm:w-[340px]">
              {ostali.map((l) => (
                <a key={l.slug} href={`/#lokal-${l.slug}`} className="group flex h-full flex-col bg-bone text-ink">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={l.slika}
                      alt={`${l.naziv} — 20/44`}
                      fill
                      sizes="(max-width: 640px) 78vw, 340px"
                      className="reveal-color object-cover group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="font-mono text-[11px] uppercase tracking-widest text-ink/60">{l.sprat}</p>
                    <span className="mt-3 self-start bg-accent px-2.5 py-1 font-mono text-[11px] uppercase tracking-widest">
                      {l.kratko}
                    </span>
                    <p className="mt-3 text-2xl font-black uppercase leading-none tracking-tighter">{l.naziv}</p>
                    <span className={`${btn} mt-6 self-start border-ink px-4 py-3 group-hover:bg-ink group-hover:text-accent`}>
                      Pogledaj lokal
                    </span>
                  </div>
                </a>
              ))}
            </Carousel>
            <div className="mt-8 flex justify-end">
              <a
                href="/#kuca"
                className="border-b border-accent pb-1.5 font-mono text-xs uppercase tracking-widest text-accent transition-opacity hover:opacity-70"
              >
                Cela kuća na mapi
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
