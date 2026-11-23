# Site Teardown: The Warehouse Project — podstrane (event / editorijal / info)

**URL:** https://thewarehouseproject.com/events/kneecap/, /twenty-years-in-manchester/, /information/
**Platform:** WordPress + jQuery + Slick + GSAP (vidi homepage teardown `2026-07-05-thewarehouseproject-teardown.md`)
**Date analyzed:** 2026-11-23
**Sources:** curl HTML (3 podstrane), `/assets/css/styles.css?v=091126` (190 KB), `/assets/js/main-min.js?v=2.5`, headless snimci 1440 i 390 px

> Dopuna julskog teardowna (koji pokriva samo početnu). Cilj: šablon za stranu lokala na 20/44
> (prvo `/gore`). Sve se reimplementira u Next.js + Tailwind v4; ne kopira se kod ni asseti.

---

## Tri šablona podstrana

| Šablon | Gde | Kostur (potvrđeno iz HTML-a) |
|---|---|---|
| **Event** | `/events/<slug>/` | `main > .mw-container > .event-wrap > .event-panel { .poster-artwork | .event-details }` + „Other upcoming events" karusel |
| **Editorijal** | `/twenty-years-in-manchester/` | `.hero.half-height > h1.page-title(.prefix + naslov)` → `.video-wrap + .caption` → `.centre-col-wide .standard-text` → `.icarousel-wrap .image-carousel` |
| **Info** | `/information/` | `.info-carousel` (kategorije) → `.sectional-title` → `.toggle-pane` harmonika |

Za stranu lokala najbliži je **Event** (poster + podaci + tekst), dopunjen **image karuselom** iz editorijala i **„Other upcoming"** karuselom kartica na dnu.

---

## Event panel (confirmed from CSS)

```
.event-panel        { display:flex; align-items:flex-start; margin:10px 0 30px }   ≤1000px: column
.poster-artwork     { width:50%; overflow:hidden; padding:0 }                      ≤1000px: 100%
.poster-artwork img { width:100%; aspect-ratio:1/1; transition: all 900ms cubic-bezier(.72,0,.19,1) }
  img.lazy.pending  { opacity:0; transform:translateX(-25%) }   ← poster "uklizi" sleva pri učitavanju
.event-details      { width:50%; padding-top:30px; position:relative }
```
- Poster je **uz levu ivicu ekrana** (nema levog gutter-a), kvadrat.
- `span.date` — lime traka (`#D8FF00` + noise), `padding:10px 10px 10px 30px`, uppercase 1.1em.
  **Trik:** `:after { position:absolute; right:0; width:100vw; height:100%; z-index:-1 }` → traka
  se produžava **ulevo do ivice ekrana**. Na desktopu je poster prekriva, na telefonu se vidi od ivice.
- `h1` — 3em (→2.75/2.25/2em), uppercase, **teksturisan fill** (`background-clip:text` + `white-text-mask.png` 400px), `padding:30px`.
  `h1:after` = `title-detail-base.png` (600×150, opacity .6): tanka horizontalna linija ispod naslova,
  kratka vertikalna crta na levoj ivici i mali krug na spoju — tehnički detalj.
- `.venue` (serif bold uppercase 1.1em) + `.time` (1.1em) — `padding:0 30px`, razmak 30px.
- `.button-links` → `.bordered-link.c-onsale`: puna lime, `2px solid`, `radius:2px`, uppercase, `padding:15px 20px`,
  hover = inverzija (tamna pozadina, lime tekst). Obični `.bordered-link`: svetla ivica, hover puni.
- `.event-text p { font-size:.9em; padding-bottom:20px }`, prvi pasus = bold uppercase podnaslov.
- Mobilni (≤600): sve u kolonu, gutter 20px, poster puna širina.

## Sectional title (confirmed)
```
.sectional-title      { padding:0 30px; uppercase; font-size:2.6em (→2em ≤600); line-height:1 }
.sectional-title span { display:block; serif bold; .9em }
```
Dva reda: prvi **bold** („OTHER"), drugi lakši („UPCOMING EVENTS"), ispod kratka linija.

## Image karusel (confirmed from JS + CSS)
```js
$(".image-carousel").slick({ dots:true, infinite:false, speed:600, draggable:true, swipe:true, arrows:true, cssEase:"ease" })
```
```
.image-carousel             { width:87.5%; margin-top:30px }
.slick-list                 { overflow:visible }            ← sledeći slajd viri desno
.slick-slide                { opacity:.2; transition: opacity 600ms ease }   .slick-active { opacity:1 }
img                         { aspect-ratio:16/9; object-fit:cover }   (+ posebni .m crop za mobilni)
.slick-prev/.slick-next     { 36×36, border-radius:50%, 2px solid lime; desno na sredini, prev iznad next }
.slick-disabled             { opacity:.2 }
.slick-dots li button       { 14×14 krug, inset 2px ring; aktivna = puna bela; hover = 30% fill }
```
**Reveal:** „premium" karusel je samo `overflow:visible` + neaktivni slajdovi na 20 % opacitija.

## Event karusel kartica (confirmed)
`slidesToShow:3` (→2 ≤1100, →1 ≤600), iste tačkice/strelice. Kartica: svetla teksturisana pozadina,
poster gore, lime oznaka datuma, naslov uppercase, `bordered-link.dark` „Tickets + info".
Ispod: „View full calendar" link sa linijom.

## Editorijal naslov (confirmed)
```
.hero.half-height     { min-height:30vh; justify-content:flex-end }
.page-title           { 5em (→3em), serif, uppercase, teksturisan, padding:30px 30px 70px }
.page-title .prefix   { block, sans, .35em } ← nadnaslov
.page-title:after     { title-detail-base.png, width:37.5% }
.caption              { rgba(23,29,29,.8) traka ispod medija, padding:10px 30px }
.centre-col-wide      { margin:0 12.5% }
```

---

## Mapiranje na 20/44 `/gore`

| WHP | 20/44 |
|---|---|
| Poster 50 %, uz levu ivicu, uklizi `-25% → 0` za 900 ms `cubic-bezier(.72,0,.19,1)` | fotka lounge-a, isto ponašanje; na desktopu `sticky` dok se čita tekst |
| Lime `span.date` sa `:after` 100vw | **žuta** oznaka „Lokal 07 · 2. sprat" |
| Teksturisan h1 | `GoreMark` (GORE / ГОРЕ) sa postojećim `text-tex` |
| `title-detail-base.png` | CSS linija + krug + vertikalna crta (bez asseta) |
| `.venue` + `.time` | „Karađorđeva 44 · Savamala" + „Kafa tokom dana · Kokteli uveče" |
| `bordered-link.c-onsale` + obični | „Kako do nas" (mapa, puna žuta) + „Svi lokali" (obrub) |
| `.event-text` | klijentov tekst (podnaslov bold, pa pasusi) + žanrovi |
| Image karusel | 8 fotki; **fiksna visina + prirodan odnos** jer su 6/8 fotki uspravne (16:9 bi ih isekao) |
| „Other upcoming events" | „Ostali lokali" — 6 kartica, klik vodi na lokal na početnoj |

Odstupanja: Archivo umesto Ceraph serifa (klijentov font), žuta umesto lime, bez Slicka (native scroll-snap + mala JS kontrola).
