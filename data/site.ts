/*
  Globalni podaci sajta 20/44.
  Ton: kratke rečenice, fokus na muzici (vidi CONTEXT/context profile).
*/

export const site = {
  naziv: "20/44",
  tagline: "Muzika je uvek ispred svega.",
  opisKratko:
    "Underground institucija elektronske muzike. Savamala, Beograd.",
  adresa: {
    ulica: "Karađorđeva 44",
    deo: "Savamala",
    grad: "Beograd",
    drzava: "Srbija",
    koordinate: "44.8168°N /// 20.4489°E",
  },
  radnoVreme: [
    { dan: "Petak", vreme: "23:00 — 06:00" },
    { dan: "Subota", vreme: "23:00 — 08:00" },
    { dan: "Ned — Čet", vreme: "Po programu" },
  ],
  mapaUrl: "https://maps.google.com/?q=Karađorđeva+44+Beograd",
  socials: [
    { naziv: "Instagram", href: "https://www.instagram.com/20_44.nightclub/" },
    { naziv: "Facebook", href: "https://www.facebook.com/klub2044/" },
    { naziv: "RA", href: "https://ra.co/clubs" },
  ],
  nav: [
    { naziv: "Prostor", href: "/#kuca" },
    { naziv: "Filozofija", href: "/#o-nama" },
    { naziv: "Lokali", href: "/#lokali" },
    { naziv: "Galerija", href: "/#galerija" },
    { naziv: "Kontakt", href: "/#kontakt" },
  ],
  // Za marquee traku — muzički pravci kluba.
  zanrovi: [
    "House",
    "Deep House",
    "Minimal",
    "Techno",
    "Detroit Techno",
    "Tech House",
    "Electro",
    "Disco",
    "Italo",
    "Breakbeat",
    "Dub",
  ],
} as const;
