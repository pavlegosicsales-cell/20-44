# 20/44 klub sajt

Sajt za **20/44**, kultni beogradski underground klub elektronske muzike (Savamala, Karađorđeva 44).
Klijent ga zove „20/44" (ne „20/40"). Radi se u WAT frameworku, vidi `WAT.md`.
Korisnik je Pavle, piše na srpskom; odgovaraj na srpskom.

## Pokretanje

Na novom uredjaju sve radi `node tools/setup.mjs` (VS Code ga pokreće sam pri otvaranju foldera
preko `.vscode/tasks.json`, pa diže `npm run dev`): podešava git remote, povlači najnovije,
radi `npm install`. Dev: `npm run dev` → http://localhost:3000.
Screenshot: `node tools/screenshot.mjs <url> <label> <width>` → `.tmp/screenshots/`.

## Stack i struktura

Next.js 16 (App Router, TS) + Tailwind v4 + React 19; gsap, framer-motion, ogl.
- `app/` layout + page + globals.css
- `components/` Nav (full-screen žuti meni), Badge (kružni rotirajući pečat), Hero (slika + pečat +
  CTA + koordinate + grid), Marquee (žanrovi), InteractiveHouse (SVG hotspotovi preko `house.png`,
  hover žuti tint, klik skrol na `#lokal-<slug>`, na telefonu two-tap: prvi tap oboji, drugi skroluje,
  + pristupačna lista), About, Lokali (naizmenične sekcije), Gallery (monohromno → boja na hover),
  Contact, Footer
- `data/site.ts`, `data/lokali.ts` (7 lokala, hotspot poligoni u viewBox 1000x667)
- `public/images/` hero.jpg, house.png, club-1..7.jpg
- `brand assets/` originali; `brand assets/inspo/` Warehouse/ronin screenshotovi (referenca)
- `CONTEXT/` brand profil + `Design-System.md`; `workflows/build_frontend_page.md`

**7 lokala:** Main klub, Bar 44, Pizzeria (prizemlje); Vukosava bar, Galerija 20/44 (1. sprat);
Studio Štajga, Lounge bar (2. sprat). Bašta i Potpalublje su izbačeni.

## Brend i dizajn

- Akcenat **žuta #FED11C** (namerno gazi crvenu iz brand profila); baza crno/sivo/belo, skoro-crna #0a0b0b.
- Stil „sharp": bez zaobljenja (globalni `border-radius:0`) + `.grain` overlay.
- Fontovi: **Archivo** (bold grotesque display) + **Geist Mono** (tehničke oznake).
- Dizajn pravac: thewarehouseproject.com, adaptirano (žuta umesto lime, originalan sadržaj).
- Ton: kratke rečenice, fokus na muzici. Nikad „VIP", „luksuz", „najluđa žurka".
- Cilj v1: početna strana, atmosfera i identitet, bez agresivnog CTA.

### Pozadinska tekstura: NIKAD magla
Klijent je oštro odbio maglovite overlaye („fuj, odvratno"). Svaki kontinualni glatki sloj
(nizak baseFrequency feTurbulence, screen blend) posvetli crnu u ravnomernu sivu i čita se kao magla.
Dozvoljeno: retke, diskretne oznake na pretežno čistoj crnoj (ogrebotine, tačkice, blaga prljavština).
- Tačkice: feTurbulence + tvrd prag na alfi (`0 0 0 26 -22`), retko, opacity ~0.14.
- Ogrebotine: stvarni SVG `<line>` elementi (dužine 60–240px, near-vertical + dijagonale,
  stroke-width 0.6–1.7, stroke-opacity 0.35–0.9) + `<circle>` tačkice + kratke crtice,
  deterministički u tile ~560×800 koji se ponavlja → `.fx-stain`. Screen blend, opacity sloja ~0.7.
- Grid i fini grain su ok.

## Način rada

- Opisi zahteva su za desktop; mobilnu adaptaciju radi sam, u istom potezu, bez pitanja.
- Ne pitaj da/ne. Kad je izmena proverena (build prolazi), commituj i pushuj bez pitanja.
  Pitaj samo za stvarne odluke.

## Git i deploy (lako se pobrka)

Dva remota:
- `site` = `pavlegosicsales-cell/20-44`, grana `main`. **Vercel deployuje odavde** → https://20-44-phi.vercel.app
- `origin` = `pavlegosicsales-cell/AICONNECT`, grana `twenty-forty-four` (arhiva, drži se u sinhronu)

Lokalna grana je `main` (laptop) ili `twenty-forty-four` (desktop); komande ispod rade za obe.

- Pre rada: `git pull site main` (drugi uredjaj je možda pushovao).
- Objava: `git push site HEAD:main && git push origin HEAD:twenty-forty-four`.
  Oba remota uvek na istom commitu.
