import Image from "next/image";
import TornDivider from "@/components/TornDivider";
import CtaButton from "@/components/CtaButton";
import { ArrowUpRight } from "@/components/icons";

const principi = [
  "DJ je važniji od gosta.",
  "Ples je važniji od fotografije.",
  "Atmosfera je važnija od luksuza.",
  "Selekcija je važnija od popularnosti.",
  "Autentičnost je važnija od trendova.",
  "Kvalitet je važniji od masovnosti.",
];

export default function About() {
  return (
    <section
      id="o-nama"
      className="torn-top relative z-20 overflow-hidden bg-ink px-5 py-28 md:px-8 md:py-44"
    >
      {/* Pozadinska slika (crvena atmosfera) + parallax */}
      <div className="absolute inset-0 -z-0">
        <div className="parallax-y absolute inset-x-0 -top-[8%] h-[116%]">
          <Image
            src="/images/philosophy.jpg"
            alt="Crveno osvetljen podijum 20/44 sa disko kuglom i publikom"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        {/* Scrim za čitljivost teksta — lakši, da crvena atmosfera jače dođe do izražaja */}
        <div className="absolute inset-0 bg-ink/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/25 to-ink/55" />
        {/* Filmski grain na slici */}
        <div className="section-grain" aria-hidden="true" />
      </div>

      {/* Iscepana donja ivica — stapa se sa crnom sekcijom ispod (gornja ivica je clip-path .torn-top) */}
      <TornDivider position="bottom" />

      <div className="relative z-30 mx-auto max-w-6xl">
        <p className="mb-10 font-mono text-xs uppercase tracking-widest text-accent">
          [ Filozofija ]
        </p>

        <h2
          data-reveal
          className="max-w-4xl font-black uppercase leading-[0.92] tracking-tighter"
          style={{ fontSize: "clamp(2.25rem, 6vw, 5rem)" }}
        >
          Nije klasičan klub.{" "}
          <span className="text-bone/55">
            Kulturni prostor elektronske muzike i okupljalište ljudi koji dele
            isti pogled na muziku i noć.
          </span>
        </h2>

        <div data-reveal-group className="mt-16 grid gap-x-12 gap-y-10 md:grid-cols-[1fr_1.1fr]">
          <p className="max-w-md text-lg leading-relaxed text-bone/80">
            20/44 je godinama gradio identitet kao kultni splav na Savi. Nakon
            preseljenja u zatvoreni prostor u Savamali, zadržao je istu
            filozofiju, publiku i muzički pravac. Ovde su muzika, atmosfera i
            zajednica uvek ispred komercijalnog noćnog provoda.
          </p>

          <ul className="divide-y divide-bone/15 border-y border-bone/15">
            {principi.map((p, i) => (
              <li key={i} className="flex items-baseline gap-4 py-4">
                <span className="font-mono text-xs text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-lg font-medium uppercase tracking-tight">
                  {p}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-16">
          <CtaButton
            target="lokali"
            variant="primary"
            style="style2"
            size="large"
            icon={<ArrowUpRight className="h-4 w-4" />}
            iconHover={{ x: 3, y: -3 }}
            ariaLabel="Pogledaj lokale 20/44"
          >
            Pogledaj prostor
          </CtaButton>
        </div>
      </div>
    </section>
  );
}
