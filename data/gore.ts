/*
  GORE Lounge — lokal 07 (2. sprat, potkrovlje). Zasebna strana /gore, raspored po WHP
  event strani (vidi research/2026-11-23-thewarehouseproject-podstrane-teardown.md).
  Copy je klijentov (dostavljen 22.11.2026), ne menjati sadržaj bez njih.
  Znak lokala: "GORE" latinicom, ispod "ГОРЕ" ćirilicom okrenuto za 180°.
*/

const P = { w: 1336, h: 2000 }; // uspravne fotke
const L = { w: 2000, h: 1336 }; // položene fotke

export const gore = {
  naziv: "GORE Lounge",
  podnaslov: "Urbani lounge u kojem se susreću muzika, kultura i noćni život.",
  pasusi: [
    "Smešten u srcu Beograda, GORE LOUNGE je savremeni urbani lounge koji spaja muziku, umetnost, koktele i druženje u autentičnoj underground atmosferi.",
    "Prostor namenjen ljudima koji cene dobru muziku, kreativnu energiju i kvalitetno društvo. Tokom dana GORE pruža opuštenu lounge atmosferu, dok se sa dolaskom večeri transformiše u intimnu destinaciju za noćni život.",
    "Od pažljivo kreiranih koktela i selektovanih DJ setova do umetničkih okupljanja, kulturnih događaja i kreativnih saradnji, GORE okuplja ljubitelje muzike, umetnike, dizajnere i radoznale ljude različitih interesovanja.",
    "Sa muzičkim identitetom zasnovanim na house, deep house, disco i elektronskoj muzici, GORE gradi atmosferu u kojoj su ljudi jednako važni kao i muzika.",
    "Bilo da svraćate na kafu, družite se uz piće nakon posla ili provodite veče otkrivajući nove muzičke zvuke, GORE je mesto za povezivanje, opuštanje i doživljaj Beograda iz drugačije perspektive.",
  ],
  zanrovi: ["House", "Deep House", "Disco", "Electronic"],
  // WHP .venue / .time — mesto i ritam umesto datuma i satnice.
  mesto: "Karađorđeva 44 · Savamala",
  vreme: "Kafa tokom dana · Kokteli uveče",
  // Ritam dana — iz završne rečenice klijentovog teksta.
  ritam: [
    { kad: "Dan", sta: "Kafa" },
    { kad: "Veče", sta: "Kokteli" },
    { kad: "Uvek", sta: "Muzika" },
  ],
  zavrsna: "Kafa tokom dana. Kokteli uveče. Muzika uvek.",
  // Poster (WHP .poster-artwork, kvadrat): svetleći znak iznad publike.
  poster: {
    src: "/images/gore/gore-znak-plavi.jpg",
    alt: "Svetleći GORE znak iznad publike sa rukama u vazduhu",
    pozicija: "50% 30%",
  },
  slike: [
    { src: "/images/gore/gore-lounge.jpg", alt: "Chesterfield sofe pod gredama, toplo svetlo i slika na zidu", ...L },
    { src: "/images/gore/gore-bar.jpg", alt: "Barske stolice uz šank, plavo i crveno svetlo", ...P },
    { src: "/images/gore/gore-dj.jpg", alt: "DJ peva iza pulta, psihodelične projekcije iznad", ...P },
    { src: "/images/gore/gore-publika.jpg", alt: "Puno potkrovlje, ljudi između drvenih greda", ...P },
    { src: "/images/gore/gore-pult.jpg", alt: "DJ pult u potkrovlju, bar i sofe u pozadini", ...L },
    { src: "/images/gore/gore-znak-crveni.jpg", alt: "Svetleći GORE znak ispred projekcije, publika u mraku", ...P },
    { src: "/images/gore/gore-sofa.jpg", alt: "Crvena sofa, slika na zidu i sveća na stolu", ...P },
  ],
} as const;
