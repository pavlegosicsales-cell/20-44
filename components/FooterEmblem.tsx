/*
  Znak u footeru po WHP footer-emblems.svg: centriran blok u kome je svaki red razvučen na
  istu širinu (textLength), gore red krugova + okvir + ikonice. Sadržaj je naš.
  viewBox 800×200 kao kod njih; boja = currentColor, kosa crta je žuta.
*/
const f = { fontFamily: "var(--font-archivo)" };

export default function FooterEmblem({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 800 200" className={className} fill="currentColor" role="img" aria-label="20/44 — underground klub elektronske muzike, Karađorđeva 44, Savamala, Beograd">
      {/* Red 1: cifre u krugovima, okvir sa adresom, ikonice (nišan, kosa crta, ©) */}
      <g transform="translate(44 0)" stroke="currentColor" strokeWidth="3">
        {["2", "0", "4", "4"].map((c, i) => (
          <g key={i}>
            <circle cx={26 + i * 46} cy="26" r="21" fill="none" />
            <text x={26 + i * 46} y="35" textAnchor="middle" fontSize="25" fontWeight="700" stroke="none" style={f}>
              {c}
            </text>
          </g>
        ))}
        <rect x="196" y="5" width="356" height="42" fill="none" />
        <text x="212" y="37" fontSize="27" fontWeight="800" textLength="168" lengthAdjust="spacingAndGlyphs" stroke="none" style={f}>
          KARAĐORĐEVA
        </text>
        <line x1="392" y1="26" x2="484" y2="26" />
        <text x="500" y="37" fontSize="27" fontWeight="800" stroke="none" style={f}>
          44
        </text>
        <circle cx="596" cy="26" r="21" fill="none" />
        <circle cx="596" cy="26" r="6" fill="none" />
        <line x1="580" y1="26" x2="612" y2="26" />
        <line x1="596" y1="10" x2="596" y2="42" />
        <circle cx="642" cy="26" r="21" fill="none" />
        <line x1="633" y1="39" x2="651" y2="13" stroke="var(--color-accent)" strokeWidth="5" />
        <circle cx="688" cy="26" r="21" fill="none" />
        <text x="688" y="36" textAnchor="middle" fontSize="28" fontWeight="700" stroke="none" style={f}>
          ©
        </text>
      </g>

      <text x="400" y="93" textAnchor="middle" fontSize="42" fontWeight="300" textLength="790" lengthAdjust="spacingAndGlyphs" style={f}>
        UNDERGROUND KLUB ELEKTRONSKE MUZIKE
      </text>
      <text x="400" y="139" textAnchor="middle" fontSize="45" fontWeight="800" textLength="790" lengthAdjust="spacingAndGlyphs" style={f}>
        MUZIKA JE UVEK ISPRED SVEGA
      </text>
      <text x="400" y="171" textAnchor="middle" fontSize="20" fontWeight="700" textLength="560" lengthAdjust="spacingAndGlyphs" style={f}>
        [ BEOGRAD, RS • GMT+01:00 /// 44.8168°N, 20.4489°E ]
      </text>
      <text x="400" y="195" textAnchor="middle" fontSize="19" fontWeight="600" textLength="390" lengthAdjust="spacingAndGlyphs" style={f}>
        KARAĐORĐEVA 44 · SAVAMALA
      </text>
    </svg>
  );
}
