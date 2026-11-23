import ImgReveal from "@/components/ImgReveal";
import Carousel from "@/components/Carousel";
import TextType from "@/components/ui/text-type";
import { SectionalTitle, ViewAll } from "@/components/whp";
import { site } from "@/data/site";

/*
  Galerija po WHP .image-carousel: fotke u boji, sledeća viri desno, bočne okrugle strelice,
  tačkice ispod; naslov sa cross-line detaljem i "view all" link sa linijom do ivice.
*/

const slike = [
  { src: "/images/club-1.jpg", alt: "Podijum pod plavim laserima i crvenim zavesama", w: 1836, h: 1072 },
  { src: "/images/club-6.jpg", alt: "DJ-evi i publika ispred zida sa plakatima", w: 1170, h: 780 },
  { src: "/images/club-2.jpg", alt: "Pogled odozgo na DJ pult i publiku", w: 1170, h: 1560 },
  { src: "/images/club-7.jpg", alt: "DJ za pultom u pokretu, topla svetla", w: 1170, h: 782 },
  { src: "/images/club-5.jpg", alt: "Portret DJ-a ispred betonskog zida", w: 1170, h: 1560 },
  { src: "/images/club-4.jpg", alt: "DJ sa kačketom za pultom, tragovi svetla", w: 1170, h: 1560 },
];

const instagram = site.socials.find((s) => s.naziv === "Instagram")!.href;

export default function Gallery() {
  return (
    <section id="galerija" className="relative overflow-x-clip border-t border-line bg-ink px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div data-reveal className="mb-10">
          <p className="mb-5 font-mono text-xs uppercase tracking-widest text-accent">
            <TextType text="[ Galerija ]" as="span" loop={false} startOnVisible typingSpeed={55} cursorCharacter="_" />
          </p>
          <SectionalTitle jak="Fotografija" slab="umesto reklame" />
        </div>
        <Carousel label="Galerija 20/44" arrowsSide>
          {slike.map((s) => (
            <figure
              key={s.src}
              className="relative h-[min(68vh,640px)] overflow-hidden border border-line"
              style={{ aspectRatio: `${s.w} / ${s.h}`, maxWidth: "85vw" }}
            >
              <ImgReveal src={s.src} alt={s.alt} fill sizes="(max-width: 640px) 85vw, 1100px" className="object-cover" />
            </figure>
          ))}
        </Carousel>
        <ViewAll href={instagram} external>
          Još sa podijuma na Instagramu
        </ViewAll>
      </div>
    </section>
  );
}
