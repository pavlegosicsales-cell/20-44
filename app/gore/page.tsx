import type { Metadata } from "next";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import GoreMark from "@/components/GoreMark";
import ImgReveal from "@/components/ImgReveal";
import DecryptedText from "@/components/ui/decrypted-text";
import TextType from "@/components/ui/text-type";
import { ArrowUpRight } from "@/components/icons";
import { gore } from "@/data/gore";
import { lokali } from "@/data/lokali";
import { site } from "@/data/site";

const lokal = lokali.find((l) => l.slug === "lounge-bar")!;

export const metadata: Metadata = {
  title: "GORE Lounge — 2. sprat 20/44 | Savamala, Beograd",
  description: `${gore.podnaslov} ${gore.zavrsna}`,
  openGraph: {
    title: "GORE Lounge — 20/44",
    description: gore.zavrsna,
    type: "website",
    images: [gore.hero.src],
  },
};

export default function GorePage() {
  const [prvi, ...ostali] = gore.pasusi;

  return (
    <>
      <Nav />
      <main>
        {/* Hero — fotografija potkrovlja + znak */}
        <section id="top" className="relative flex min-h-svh flex-col justify-end overflow-hidden">
          <Image
            src={gore.hero.src}
            alt={gore.hero.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/25 to-ink/90" />
          <div className="section-grain" aria-hidden="true" />

          <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-14 pt-32 md:px-8 md:pb-20">
            <p className="mb-6 font-mono text-xs uppercase tracking-widest text-accent">
              <TextType
                text={`[ Lokal ${lokal.broj} · ${lokal.sprat} · ${site.adresa.ulica} ]`}
                as="span"
                loop={false}
                typingSpeed={45}
                cursorCharacter="_"
              />
            </p>
            <h1>
              <span className="sr-only">{gore.naziv}</span>
              <GoreMark className="text-[clamp(5rem,19vw,15rem)] text-bone" />
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-bone/85 md:text-xl">
              {gore.podnaslov}
            </p>
          </div>
        </section>

        {/* Uvod — klijentov tekst */}
        <section className="border-t border-line bg-ink px-5 py-24 md:px-8 md:py-32">
          <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-12 md:gap-16">
            <div data-reveal className="md:col-span-7">
              <p className="mb-6 font-mono text-xs uppercase tracking-widest text-accent">
                <TextType text="[ Lounge ]" as="span" loop={false} startOnVisible typingSpeed={55} cursorCharacter="_" />
              </p>
              <p
                className="font-black uppercase leading-[0.98] tracking-tighter text-bone"
                style={{ fontSize: "clamp(1.6rem, 3vw, 2.5rem)" }}
              >
                {prvi}
              </p>
            </div>
            <div data-reveal className="space-y-5 md:col-span-5 md:pt-12">
              {ostali.map((p) => (
                <p key={p} className="text-lg leading-relaxed text-ash">
                  {p}
                </p>
              ))}
              <ul className="flex flex-wrap gap-2 pt-3">
                {gore.zanrovi.map((z) => (
                  <li
                    key={z}
                    className="border border-line px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-bone"
                  >
                    {z}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Ritam dana */}
        <section aria-label={gore.zavrsna} className="border-t border-line bg-ink">
          <div data-reveal-group className="mx-auto grid max-w-6xl sm:grid-cols-3">
            {gore.ritam.map((r, i) => (
              <div
                key={r.kad}
                className={`border-line px-5 py-12 md:px-8 md:py-16 ${
                  i > 0 ? "border-t sm:border-l sm:border-t-0" : ""
                }`}
              >
                <p className="font-mono text-xs uppercase tracking-widest text-smoke">
                  {String(i + 1).padStart(2, "0")} · {r.kad}
                </p>
                <p
                  className={`mt-3 font-black uppercase leading-none tracking-tighter ${
                    i === 2 ? "text-accent" : "text-bone"
                  }`}
                  style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
                >
                  {r.sta}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Fotografije */}
        <section className="border-t border-line bg-ink px-5 py-24 md:px-8 md:py-32">
          <div className="mx-auto max-w-6xl">
            <div data-reveal className="mb-12">
              <p className="mb-4 font-mono text-xs uppercase tracking-widest text-accent">
                <TextType text="[ Pod krovom ]" as="span" loop={false} startOnVisible typingSpeed={55} cursorCharacter="_" />
              </p>
              <h2
                className="text-tex font-black uppercase leading-[0.92] tracking-tighter"
                style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
              >
                <DecryptedText text="Sprat iznad svega." animateOn="view" sequential speed={34} />
              </h2>
            </div>

            <div
              data-reveal-group
              className="grid auto-rows-[320px] grid-cols-1 gap-3 sm:auto-rows-[220px] sm:grid-cols-3 md:auto-rows-[260px]"
            >
              {gore.slike.map((s, i) => (
                <figure key={s.src} className={`group relative overflow-hidden border border-line ${s.span}`}>
                  <ImgReveal
                    src={s.src}
                    alt={s.alt}
                    fill
                    sizes={s.span.includes("col-span-2") ? "(max-width: 640px) 100vw, 66vw" : "(max-width: 640px) 100vw, 33vw"}
                    className="reveal-color object-cover group-hover:scale-[1.04]"
                  />
                  <figcaption className="absolute bottom-0 left-0 bg-ink/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-ash opacity-0 transition-opacity group-hover:opacity-100">
                    Gore — {String(i + 1).padStart(2, "0")}
                  </figcaption>
                </figure>
              ))}
              {/* Završna rečenica popunjava poslednje polje mreže */}
              <div className="flex flex-col justify-between bg-accent p-6 text-ink sm:row-span-2 md:p-8">
                <GoreMark className="text-[3.5rem] md:text-[4.5rem]" />
                <p className="font-black uppercase leading-[0.95] tracking-tighter" style={{ fontSize: "clamp(1.5rem, 2.4vw, 2.1rem)" }}>
                  {gore.zavrsna}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Nazad na ostale lokale */}
        <section className="border-t border-line bg-ink px-5 py-16 md:px-8 md:py-20">
          <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-md font-mono text-xs uppercase leading-relaxed tracking-widest text-ash">
              GORE je {lokal.sprat.toLowerCase()} kuće 20/44. Ispod su još {lokali.length - 1} lokala, svaki sa svojim tonom.
            </p>
            <a
              href="/#lokali"
              className="inline-flex items-center gap-2 self-start border border-accent px-5 py-3 font-mono text-xs uppercase tracking-widest text-accent transition-colors hover:bg-accent hover:text-ink sm:self-auto"
            >
              Svi lokali
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
