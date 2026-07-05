import Image from "next/image";
import Badge from "@/components/Badge";
import Scramble from "@/components/Scramble";
import CtaButton from "@/components/CtaButton";
import { ArrowDown } from "@/components/icons";
import { site } from "@/data/site";

/* Registraciona (crop) oznaka — tehnički detalj u uglovima. */
function CropMark({ pos }: { pos: string }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute z-10 h-4 w-4 border-ash/50 ${pos}`}
    />
  );
}

export default function Hero() {
  return (
    <section
      id="top"
      className="sticky top-0 z-0 flex h-dvh flex-col justify-between overflow-hidden"
    >
      {/* Pozadinska slika */}
      <Image
        src="/images/hero.jpg"
        alt="Publika i DJ u mračnom prostoru 20/44 pod crvenim svetlom"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* Zatamnjenje — lakše, da slika jače dođe do izražaja (dole ostaje tamnije zbog teksta) */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/45 via-ink/15 to-ink/85" />
      {/* Filmski grain na hero slici */}
      <div className="section-grain" aria-hidden="true" />

      {/* Registracione oznake u uglovima */}
      <CropMark pos="left-4 top-20 border-l border-t md:left-6 md:top-24" />
      <CropMark pos="right-4 top-20 border-r border-t md:right-6 md:top-24" />
      <CropMark pos="bottom-4 left-4 border-b border-l md:bottom-6 md:left-6" />
      <CropMark pos="bottom-4 right-4 border-b border-r md:bottom-6 md:right-6" />

      {/* Tehničke oznake — gornji red */}
      <div className="relative z-10 flex items-start justify-between px-5 pt-24 md:px-8 md:pt-28">
        <Scramble
          text={site.adresa.koordinate}
          className="max-w-[9rem] font-mono text-[10px] uppercase leading-relaxed tracking-widest text-ash md:text-xs"
        />
        <p className="text-right font-mono text-[10px] uppercase leading-relaxed tracking-widest text-ash md:text-xs">
          Elektronska
          <br />
          muzička institucija
        </p>
      </div>

      {/* Centralni sadržaj */}
      <div className="relative z-10 flex flex-col items-center px-5 text-center">
        <h1 className="sr-only">20/44 — underground klub elektronske muzike, Savamala, Beograd</h1>
        <Badge className="badge-intro h-64 w-64 sm:h-72 sm:w-72 md:h-[22rem] md:w-[22rem]" />
        <p className="mt-8 max-w-md font-mono text-sm uppercase tracking-widest text-bone/80">
          {site.tagline}
        </p>
        <div className="mt-8">
          <CtaButton
            target="kuca"
            variant="primary"
            style="style2"
            size="large"
            icon={<ArrowDown className="h-4 w-4" />}
            iconHover={{ x: 0, y: 3 }}
            ariaLabel="Istraži prostor 20/44"
          >
            Uđi u prostor
          </CtaButton>
        </div>
      </div>

      {/* Donji red — scroll cue + deo grada */}
      <div className="relative z-10 flex items-end justify-between px-5 pb-6 md:px-8 md:pb-8">
        <p className="font-mono text-[10px] uppercase tracking-widest text-ash md:text-xs">
          {site.adresa.deo} · {site.adresa.grad}
        </p>
        <p className="font-mono text-[10px] uppercase tracking-widest text-ash md:text-xs">
          Skroluj ↓
        </p>
      </div>
    </section>
  );
}
