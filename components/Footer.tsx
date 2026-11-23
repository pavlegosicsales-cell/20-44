import { site } from "@/data/site";
import { InstagramIcon, FacebookIcon } from "@/components/icons";

/*
  Footer po WHP lower-footer: blok uvučen 12.5 % sleva, hatch traka koja raste kad uđe u kadar,
  levo znak (slova u krugovima + 20/44 + linije), desno linkovi u dve kolone sa uglovima.
  Na telefonu linkovi idu iznad znaka (WHP column-reverse).
*/

const linkovi = [...site.nav, { naziv: "GORE Lounge", href: "/gore" }];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-ink">
      <div data-reveal className="relative ml-[12.5%] flex w-[87.5%] flex-col-reverse pb-10 pt-20 md:pt-24 lg:flex-row lg:items-start">
        <div aria-hidden="true" className="footer-hatch hatch-accent absolute left-0 top-0 h-10" />

        {/* Znak */}
        <div className="pr-5 pt-14 lg:w-[42.85%] lg:pt-0">
          <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs font-bold uppercase">
            {["2", "0", "4", "4"].map((c, i) => (
              <span key={i} className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-bone">
                {c}
              </span>
            ))}
            <span className="flex h-7 items-center gap-2 border-2 border-bone px-2">
              Karađorđeva<span className="h-0.5 w-6 bg-bone" />44
            </span>
          </div>
          <p className="mt-5 font-black uppercase leading-[0.8] tracking-tighter" style={{ fontSize: "clamp(3.5rem, 9vw, 7.5rem)" }}>
            20<span className="text-accent">/</span>44
          </p>
          <p className="mt-5 text-xl uppercase leading-tight tracking-tight text-bone/85">Underground klub elektronske muzike</p>
          <p className="text-xl font-black uppercase leading-tight tracking-tight">{site.tagline.replace(".", "")}</p>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-widest text-ash">
            [ {site.adresa.grad}, RS • GMT+01:00 /// {site.adresa.koordinate.replace(" /// ", ", ")} ]
          </p>
        </div>

        {/* Linkovi + mreže, sa uglovima (WHP square-edge) */}
        <div className="relative lg:ml-[7.14%] lg:w-[42.85%]">
          <span aria-hidden="true" className="absolute -top-5 left-0 h-5 w-5 border-l-2 border-t-2 border-bone/60" />
          <span aria-hidden="true" className="absolute -bottom-3 right-5 h-5 w-5 border-b-2 border-r-2 border-bone/60 md:right-8" />

          <ul className="grid gap-x-6 gap-y-2.5 px-5 pt-3 sm:grid-cols-2 md:px-8">
            {linkovi.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="font-mono text-xs uppercase tracking-widest text-bone/90 underline decoration-bone/70 decoration-dotted decoration-1 underline-offset-[5px] transition-colors hover:text-accent hover:decoration-accent"
                >
                  {l.naziv}
                </a>
              </li>
            ))}
          </ul>

          <ul className="flex gap-2 px-5 pt-8 md:px-8">
            {site.socials.map((s) => (
              <li key={s.naziv}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.naziv}
                  className="flex h-[38px] w-[38px] items-center justify-center rounded-full border-2 border-bone font-mono text-[10px] font-bold transition-transform duration-300 hover:-translate-y-[5px] hover:border-accent hover:text-accent"
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

          <div className="space-y-1 px-5 pb-6 pt-8 font-mono text-[11px] uppercase tracking-widest md:px-8">
            <p className="text-ash">
              {site.adresa.ulica} · {site.adresa.deo}, {site.adresa.grad}
            </p>
            <p className="text-smoke">© {new Date().getFullYear()} 20/44 · Sva prava zadržana</p>
            <a href="#top" className="inline-block pt-2 text-ash transition-colors hover:text-accent">
              ↑ Na vrh
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
