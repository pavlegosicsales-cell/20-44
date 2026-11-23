/*
  Znak GORE Lounge-a, po svetlećem znaku u prostoru: "GORE" latinicom, ispod "ГОРЕ"
  ćirilicom okrenuto za 180°. Archivo nema ćirilicu, pa je Г = "L" preslikano po
  vertikali (О, Р, Е su isti oblici kao latinični O, P, E).
  `tex` = WHP teksturisan fill (.text-tex) — ide na svaki deo posebno, jer
  background-clip:text ne prati pouzdano transformisanu decu.
*/
export default function GoreMark({ className = "", tex = false }: { className?: string; tex?: boolean }) {
  const t = tex ? "text-tex" : "";
  return (
    <span className={`inline-flex flex-col items-start font-black uppercase leading-[0.82] tracking-tighter ${className}`}>
      <span className={t}>Gore</span>
      <span aria-hidden="true" className="inline-block rotate-180">
        <span className={`inline-block -scale-y-100 ${t}`}>L</span>
        <span className={t}>OPE</span>
      </span>
    </span>
  );
}
