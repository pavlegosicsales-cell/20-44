/*
  Lokali (delovi zgrade) 20/44 — Karađorđeva 44, Savamala.
  Svaki lokal je zaseban deo objekta. Na interaktivnoj fasadi hover ga oboji CEO
  (od ćoška do ćoška, po fasadnom polju), klik vodi na njegovu sekciju (#lokal-<slug>).

  `hotspot.points` su SVG polygon tačke u koordinatnom sistemu viewBox="0 0 1255 960"
  (odgovara isečenoj liniji fasade house-line.png). Polja: prizemlje (3 bay-a),
  sprat (3 bay-a), atika/vrh (traka). Doteruju se preko rendera.

  `kratko` = kratak deskriptor (Ronin stil: sprat · naziv · kratko).
  Copy je originalan, u tonu brenda (kratke rečenice, fokus na muzici/atmosferi).
*/

export type Lokal = {
  broj: string; // "01".."07"
  slug: string;
  naziv: string;
  sprat: string;
  pozicija: string;
  kratko: string;
  opis: string;
  slika: string;
  strana?: string; // zasebna strana lokala, ako postoji
  hotspot: { points: string };
};

export const lokali: Lokal[] = [
  {
    broj: "01",
    slug: "main-klub",
    naziv: "Main klub",
    sprat: "Prizemlje",
    pozicija: "Centar",
    kratko: "Glavni podijum",
    opis:
      "Srce prostora. Mračno, glasno, bez separea. Sound sistem, DJ i publika na dohvat ruke — sve što je potrebno da noć ode u pravom smeru.",
    slika: "/images/club-1.jpg",
    hotspot: { points: "492,598 745,598 745,946 492,946" },
  },
  {
    broj: "02",
    slug: "bar-44",
    naziv: "Bar 44",
    sprat: "Prizemlje",
    pozicija: "Levo",
    kratko: "Bar & ploče",
    opis:
      "Prvo mesto na koje naiđeš. Bar bez pompe, sa pločama na zidu i ljudima koji ostaju do jutra. Odavde počinje veče.",
    slika: "/images/lokal-bar-44.jpg",
    hotspot: { points: "44,598 492,598 492,946 44,946" },
  },
  {
    broj: "03",
    slug: "pizzeria",
    naziv: "Pizzeria",
    sprat: "Prizemlje",
    pozicija: "Desno",
    kratko: "Kuhinja & predah",
    opis:
      "Kada noć potraje, ovde se dolazi po pauzu. Topao ugao u prizemlju — parče, predah, pa nazad na podijum.",
    slika: "/images/lokal-pizzeria.jpg",
    hotspot: { points: "745,598 1212,598 1212,946 745,946" },
  },
  {
    broj: "04",
    slug: "vukosava-bar",
    naziv: "Vukosava bar",
    sprat: "1. sprat",
    pozicija: "Levo",
    kratko: "Bar, sprat iznad",
    opis:
      "Sprat iznad podijuma. Mirniji ton, isti duh — mesto gde se razgovor čuje, a muzika i dalje vodi.",
    slika: "/images/lokal-vukosava-bar.jpg",
    hotspot: { points: "44,158 468,158 468,590 44,590" },
  },
  {
    broj: "05",
    slug: "galerija-20-44",
    naziv: "Galerija 20/44",
    sprat: "1. sprat",
    pozicija: "Centar",
    kratko: "Izložbeni prostor",
    opis:
      "Prostor za ono što nije samo zvuk. Izložbe, vizuelni radovi i program koji klub drži povezanim sa scenom oko sebe.",
    slika: "/images/lokal-galerija.jpg",
    hotspot: { points: "468,138 1212,138 1212,590 468,590" },
  },
  {
    broj: "06",
    slug: "studio-stajga",
    naziv: "Studio Štajga",
    sprat: "2. sprat",
    pozicija: "Levo",
    kratko: "Studio & priprema",
    opis:
      "Radni prostor pod krovom. Mesto gde se snima, priprema i gde ideje dobiju oblik pre nego što dođu do publike.",
    slika: "/images/lokal-studio-stajga.jpg",
    hotspot: { points: "44,18 628,18 628,150 44,150" },
  },
  {
    broj: "07",
    slug: "lounge-bar",
    naziv: "GORE Lounge",
    sprat: "2. sprat",
    pozicija: "Desno",
    kratko: "Kafa, kokteli, muzika",
    opis:
      "Urbani lounge u kojem se susreću muzika, kultura i noćni život. Kafa tokom dana. Kokteli uveče. Muzika uvek.",
    slika: "/images/gore/gore-lounge.jpg",
    strana: "/gore",
    hotspot: { points: "628,18 1212,18 1212,150 628,150" },
  },
];
