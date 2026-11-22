/*
  Znak GORE Lounge-a, po svetlećem znaku u prostoru: "GORE" latinicom, ispod "ГОРЕ"
  ćirilicom okrenuto za 180°. Archivo nema ćirilicu, pa je Г = "L" preslikano po
  vertikali (О, Р, Е su isti oblici kao latinični O, P, E).
*/
export default function GoreMark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex flex-col items-start font-black uppercase leading-[0.82] tracking-tighter ${className}`}>
      <span>Gore</span>
      <span aria-hidden="true" className="inline-block rotate-180">
        <span className="inline-block -scale-y-100">L</span>OPE
      </span>
    </span>
  );
}
