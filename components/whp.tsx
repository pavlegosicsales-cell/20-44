/*
  Zajednički WHP detalji (vidi research/2026-11-23-thewarehouseproject-podstrane-teardown.md).
*/

/* WHP .sectional-title: prvi red bold teksturisan, drugi lakši. Ispod je cross-line-detail:
   kratka horizontalna linija koja počinje levo od naslova i vertikalna niz gutter. */
export function SectionalTitle({ jak, slab, as: Tag = "h2" }: { jak: string; slab: string; as?: "h2" | "h3" }) {
  return (
    <Tag className="relative pb-5 font-black uppercase leading-[0.95] tracking-tighter" style={{ fontSize: "clamp(2rem, 4.2vw, 3.25rem)" }}>
      <span className="text-tex block">{jak}</span>
      <span className="block font-medium text-bone/80">{slab}</span>
      <span aria-hidden="true" className="absolute -left-10 bottom-0 h-px w-36 bg-bone/40" />
      <span aria-hidden="true" className="absolute -left-4 top-[calc(100%-1.75rem)] h-[26rem] w-px bg-bone/25 md:-left-5" />
    </Tag>
  );
}

/* WHP .view-all: link desno, linija od njega do desne ivice ekrana. */
export function ViewAll({ href, children, external = false }: { href: string; children: React.ReactNode; external?: boolean }) {
  return (
    <div className="mt-8 flex justify-end">
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="relative pb-3 pr-5 font-mono text-xs uppercase tracking-widest text-accent/90 transition-colors hover:text-accent md:pr-8"
      >
        {children}
        <span aria-hidden="true" className="absolute bottom-0 left-0 h-px w-[75vw] bg-accent/30" />
      </a>
    </div>
  );
}

/* WHP nišan na isprekidanoj liniji liste (granica članaka). */
export function Crosshair({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className={`h-5 w-5 text-bone/60 ${className}`} fill="none" stroke="currentColor" strokeWidth="1">
      <circle cx="10" cy="10" r="5" />
      <path d="M10 0v20M0 10h20" />
    </svg>
  );
}
