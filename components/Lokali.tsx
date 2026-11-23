import Image from "next/image";
import { lokali } from "@/data/lokali";
import { ArrowUpRight } from "@/components/icons";
import { Crosshair } from "@/components/whp";

/*
  Lokali po WHP "News + updates" bloku (početna):
  levo naslov u dva reda (31.25 %, desno poravnat), desno lista (68.75 %) sa isprekidanom
  vertikalom i nišanima na granicama. Članci naizmenično:
  - side-feature (2.75:1): kvadratna slika 36.36 % levo koja se gasi udesno, tekst od 27.27 %
  - full-background: slika preko celog članka, gasi se udesno, tekst preko nje
  Svaki članak zadržava id="lokal-<slug>" (kuća i GORE kartice skroluju na njega).
*/

export default function Lokali() {
  return (
    <section id="lokali" className="relative overflow-x-clip bg-ink py-20 md:py-28">
      <div className="mx-auto flex max-w-[1600px] flex-col max-lg:ml-[12.5%] lg:flex-row">
        <div className="px-5 pb-8 md:px-[30px] lg:w-[31.25%] lg:pb-0 lg:text-right">
          <h2
            className="font-black uppercase leading-[0.95] tracking-tighter text-accent lg:sticky lg:top-28"
            style={{ fontSize: "clamp(2.1rem, 4.2vw, 3.8rem)" }}
          >
            <span className="block">Lokali +</span>
            <span className="block font-medium">spratovi</span>
          </h2>
        </div>

        <div className="relative lg:w-[68.75%]">
          <span aria-hidden="true" className="dash-v absolute -left-px top-0 h-full w-px" />

          {lokali.map((l, i) => {
            const side = i % 2 === 0;
            return (
              <article
                key={l.slug}
                id={`lokal-${l.slug}`}
                data-reveal
                className={`relative isolate mb-[30px] scroll-mt-24 ${side ? "min-h-[min(36vw,360px)] max-sm:min-h-0" : ""}`}
              >
                <Crosshair className="absolute -left-2.5 -top-2.5 z-10" />

                {side ? (
                  <div
                    className="absolute left-0 top-0 -z-10 aspect-square w-[36.36%] overflow-hidden max-lg:w-[35.71%] max-sm:w-[42.85%]"
                    style={{ maskImage: "linear-gradient(to left, transparent 0%, #000c 50%)", WebkitMaskImage: "linear-gradient(to left, transparent 0%, #000c 50%)" }}
                  >
                    <Image src={l.slika} alt={`${l.naziv} — 20/44`} fill sizes="(max-width: 1024px) 45vw, 360px" className="object-cover" />
                  </div>
                ) : (
                  <div
                    className="absolute inset-0 -z-10 overflow-hidden"
                    style={{ maskImage: "linear-gradient(to left, transparent 0%, #0009 50%)", WebkitMaskImage: "linear-gradient(to left, transparent 0%, #0009 50%)" }}
                  >
                    <Image src={l.slika} alt={`${l.naziv} — 20/44`} fill sizes="(max-width: 1024px) 90vw, 990px" className="object-cover" />
                  </div>
                )}

                <div
                  className={
                    side
                      ? "max-w-[900px] pb-6 pl-[27.27%] pr-5 pt-[30px] max-lg:pl-[28.57%] max-sm:pl-[34%] max-sm:pt-4 md:pr-[30px]"
                      : "max-w-[900px] px-5 py-[10%] md:px-[30px]"
                  }
                >
                  <p className="text-[0.95rem] font-bold uppercase text-accent">
                    {l.broj} · {l.sprat} · {l.pozicija}
                  </p>
                  <h3 className="text-tex mt-1 font-extrabold uppercase leading-[1.02] tracking-tight" style={{ fontSize: "clamp(1.45rem, 2.2vw, 2rem)" }}>
                    {l.naziv}
                  </h3>
                  <p className="mt-4 font-bold uppercase">{l.kratko}</p>
                  <p className="mt-3 max-w-xl font-medium leading-[1.5] text-bone/90">{l.opis}</p>
                  {l.strana && (
                    <a
                      href={l.strana}
                      className="mt-6 inline-flex items-center gap-2 border-2 border-bone px-5 py-[14px] text-base font-bold uppercase leading-none transition-colors duration-300 hover:bg-bone hover:text-ink"
                    >
                      Uđi u {l.naziv}
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
