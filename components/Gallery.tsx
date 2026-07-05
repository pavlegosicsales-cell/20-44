import ImgReveal from "@/components/ImgReveal";
import LightRays from "@/components/ui/light-rays";

const slike = [
  { src: "/images/club-1.jpg", alt: "Podijum pod plavim laserima i crvenim zavesama", span: "sm:col-span-2 sm:row-span-2" },
  { src: "/images/club-6.jpg", alt: "DJ-evi i publika ispred zida sa plakatima", span: "" },
  { src: "/images/club-2.jpg", alt: "Pogled odozgo na DJ pult i publiku", span: "" },
  { src: "/images/club-7.jpg", alt: "DJ za pultom u pokretu, topla svetla", span: "" },
  { src: "/images/club-5.jpg", alt: "Portret DJ-a ispred betonskog zida", span: "" },
  { src: "/images/club-4.jpg", alt: "DJ sa kačketom za pultom, tragovi svetla", span: "sm:col-span-2" },
];

export default function Gallery() {
  return (
    <section id="galerija" className="relative overflow-hidden border-t border-line bg-ink px-5 py-24 md:px-8 md:py-32">
      {/* WebGL svetlosni zraci (žuti) — pozadina sekcije; grid/ogrebotine (globalni, z-40+) ostaju iznad */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <LightRays
          raysOrigin="top-center"
          raysColor="#FED11C"
          raysSpeed={0.9}
          lightSpread={0.7}
          rayLength={2.4}
          fadeDistance={1.1}
          followMouse
          mouseInfluence={0.08}
          noiseAmount={0.06}
          distortion={0.03}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <div data-reveal className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-accent">
              [ Galerija ]
            </p>
            <h2
              className="text-tex font-black uppercase leading-[0.92] tracking-tighter"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
            >
              Fotografija umesto reklame.
            </h2>
          </div>
          <p className="max-w-xs font-mono text-xs uppercase leading-relaxed tracking-widest text-ash">
            Prirodni momenti sa podijuma. Pređi kursorom za boju.
          </p>
        </div>

        <div data-reveal-group className="grid auto-rows-[220px] grid-cols-1 gap-3 sm:grid-cols-3 sm:auto-rows-[240px]">
          {slike.map((s, i) => (
            <figure
              key={i}
              className={`group relative overflow-hidden border border-line ${s.span}`}
            >
              <ImgReveal
                src={s.src}
                alt={s.alt}
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="reveal-color object-cover group-hover:scale-[1.04]"
              />
              <figcaption className="absolute bottom-0 left-0 bg-ink/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-ash opacity-0 transition-opacity group-hover:opacity-100">
                20/44 — {String(i + 1).padStart(2, "0")}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
