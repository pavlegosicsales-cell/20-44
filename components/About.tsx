import TornDivider from "@/components/TornDivider";
import ImgReveal from "@/components/ImgReveal";
import { ArrowUpRight } from "@/components/icons";

/*
  Filozofija po WHP .cta-panel (početna): fotografija na 60 % preko cele sekcije, merni stub
  uz desnu ivicu, a preko nje žuti panel sa zrnom (50 % širine, 12.5 % sleva; telefon 87.5 % od ivice),
  naslov + tekst + tamno dugme + niz crtica na dnu. Dva panela jedan ispod drugog
  (WHP .cta-panel + .cta-panel { margin-top: -20px }).
  Sekcija ostaje deo reveal-stack-a: neprozirna, iscepan vrh, klizi preko Prostora.
*/

const principi = [
  "DJ je važniji od gosta.",
  "Ples je važniji od fotografije.",
  "Atmosfera je važnija od luksuza.",
  "Selekcija je važnija od popularnosti.",
  "Autentičnost je važnija od trendova.",
  "Kvalitet je važniji od masovnosti.",
];

function CtaPanel({
  slika,
  alt,
  children,
  className = "",
}: {
  slika: string;
  alt: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative pb-[60px] pt-[200px] md:pb-[120px] md:pt-[240px] ${className}`}>
      <div className="absolute inset-0 overflow-hidden">
        {/* opacity na omotaču: .img-load.img-in (van Tailwind sloja) bi pregazio opacity na slici */}
        <div className="absolute inset-0 opacity-60">
          <ImgReveal src={slika} alt={alt} fill sizes="100vw" className="object-cover" />
        </div>
        <div className="section-grain" aria-hidden="true" />
        <div aria-hidden="true" className="rule-bar absolute bottom-[30px] right-0 top-[30px] w-[30px]" />
      </div>
      <div
        data-reveal
        className="tex-noise relative z-10 w-[87.5%] bg-accent/90 px-5 py-[30px] text-ink shadow-[0_12px_40px_rgba(0,0,0,0.45)] md:ml-[12.5%] md:w-1/2 md:px-[30px] md:py-10"
      >
        {children}
        <span aria-hidden="true" className="tick-ruler absolute bottom-0 left-5 h-[15px] w-[180px] md:left-[30px]" />
      </div>
    </div>
  );
}

const darkBtn =
  "mt-6 inline-flex items-center gap-2 border-2 border-ink px-[15px] py-3 text-sm font-bold uppercase leading-none transition-colors duration-300 hover:bg-ink hover:text-accent";

export default function About() {
  return (
    <section id="o-nama" className="torn-top relative z-20 overflow-hidden bg-ink">
      <CtaPanel slika="/images/philosophy.jpg" alt="Crveno osvetljen podijum 20/44 sa disko kuglom i publikom">
        <p className="mb-3 font-mono text-xs uppercase tracking-widest">[ Filozofija ]</p>
        <h2 className="font-black uppercase leading-[0.95] tracking-tight" style={{ fontSize: "clamp(1.75rem, 2.6vw, 2.4rem)" }}>
          Nije klasičan klub.
        </h2>
        <p className="mt-4 text-[0.95rem] font-bold leading-snug">
          Kulturni prostor elektronske muzike i okupljalište ljudi koji dele isti pogled na muziku i noć.
        </p>
        <p className="mt-3 text-[0.95rem] font-medium leading-snug">
          20/44 je godinama gradio identitet kao kultni splav na Savi. Nakon preseljenja u zatvoreni prostor u
          Savamali, zadržao je istu filozofiju, publiku i muzički pravac. Ovde su muzika, atmosfera i zajednica
          uvek ispred komercijalnog noćnog provoda.
        </p>
        <a href="#lokali" className={darkBtn}>
          Pogledaj prostor
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </CtaPanel>

      <CtaPanel slika="/images/club-3.jpg" alt="Publika i DJ u mraku 20/44" className="-mt-5">
        <h3 className="font-black uppercase leading-[0.95] tracking-tight" style={{ fontSize: "clamp(1.75rem, 2.6vw, 2.4rem)" }}>
          Pravila kuće
        </h3>
        <ol className="mt-4 divide-y divide-ink/20 border-y border-ink/20">
          {principi.map((p, i) => (
            <li key={p} className="flex items-baseline gap-3 py-2.5">
              <span className="font-mono text-xs">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-[0.95rem] font-bold uppercase leading-snug">{p}</span>
            </li>
          ))}
        </ol>
        <a href="#galerija" className={darkBtn}>
          Pogledaj galeriju
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </CtaPanel>

      {/* Iscepana donja ivica — stapa se sa crnom sekcijom ispod (gornja ivica je clip-path .torn-top) */}
      <TornDivider position="bottom" />
    </section>
  );
}
