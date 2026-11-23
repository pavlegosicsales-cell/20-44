import { site } from "@/data/site";
import FooterEmblem from "@/components/FooterEmblem";
import { InstagramIcon, FacebookIcon } from "@/components/icons";

/*
  Footer po WHP lower-footer (izmereno na 1440: blok od x=12.5 %, hatch 40px, sadržaj 90px ispod;
  znak 42.85 % širine bloka; linkovi od 56.25 %, 12.8px bold uppercase sa tačkastim podvlačenjem).
  Iza svega bleda velika slova kao WHP bg-flood. Na telefonu linkovi idu iznad znaka.
*/

const linkovi = [...site.nav, { naziv: "GORE Lounge", href: "/gore" }];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink">
      <p
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[0.2em] -right-[0.03em] select-none font-black leading-none tracking-tighter text-bone opacity-[0.045]"
        style={{ fontSize: "clamp(9rem, 30vw, 28rem)" }}
      >
        20/44
      </p>

      <div data-reveal className="relative ml-[12.5%] flex w-[87.5%] flex-col-reverse pb-6 pt-[70px] md:pt-[90px] lg:flex-row lg:items-start">
        <div aria-hidden="true" className="footer-hatch hatch-bone absolute left-0 top-0 h-10" />

        {/* Znak */}
        <div className="pr-5 pt-12 lg:w-[42.85%] lg:pr-0 lg:pt-0">
          <FooterEmblem className="block w-full max-w-[540px] text-bone" />
        </div>

        {/* Linkovi, mreže i potpis, sa uglovima (WHP square-edge) */}
        <div className="relative lg:ml-[7.14%] lg:w-[42.85%]">
          <span aria-hidden="true" className="absolute -top-5 left-0 h-5 w-5 border-l-2 border-t-2 border-bone/80 max-sm:-top-2.5" />
          <span aria-hidden="true" className="absolute bottom-2.5 right-5 h-5 w-5 border-b-2 border-r-2 border-bone/80 lg:right-0" />

          <ul className="grid gap-x-6 px-5 sm:grid-cols-2 md:px-[30px]">
            {linkovi.map((l) => (
              <li key={l.href} className="pb-2.5">
                <a
                  href={l.href}
                  className="text-[0.8rem] font-bold uppercase leading-[1.5] text-bone/90 underline decoration-bone/80 decoration-dotted decoration-1 underline-offset-[3px] transition-colors hover:text-accent hover:decoration-accent"
                >
                  {l.naziv}
                </a>
              </li>
            ))}
          </ul>

          <ul className="flex flex-wrap gap-1.5 px-5 pb-[30px] pt-5 md:px-[30px]">
            {site.socials.map((s) => (
              <li key={s.naziv}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.naziv}
                  className="flex h-[34px] w-[34px] items-center justify-center rounded-full border-2 border-bone text-[10px] font-black transition-transform duration-300 hover:-translate-y-[5px] hover:border-accent hover:text-accent"
                >
                  {s.naziv === "Instagram" ? (
                    <InstagramIcon className="h-4 w-4" />
                  ) : s.naziv === "Facebook" ? (
                    <FacebookIcon className="h-4 w-4" />
                  ) : (
                    s.naziv
                  )}
                </a>
              </li>
            ))}
          </ul>

          <div className="px-5 pb-8 md:px-[30px]">
            <p className="pb-5 text-[0.72rem] font-bold uppercase">Program podložan promenama</p>
            <p className="text-[0.8rem] font-bold leading-tight">
              © 20/44 {new Date().getFullYear()}
              <span className="block text-[0.95rem] font-light uppercase tracking-tight">Sva prava zadržana</span>
            </p>
            <p className="pt-1 text-[0.68rem] font-bold">
              {site.adresa.ulica} /// {site.adresa.deo}, {site.adresa.grad}
            </p>
            <a href="#top" className="mt-3 inline-block text-[0.68rem] font-bold uppercase text-ash transition-colors hover:text-accent">
              ↑ Na vrh
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
