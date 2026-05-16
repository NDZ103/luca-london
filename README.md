# 🌟 Luca's London Adventure

Interaktivno web iskustvo za rođendanski poklon — London travel experience s Harry Potter čarolijom.

## Brzi start

```bash
# 1. Instaliraj dependencies
npm install

# 2. Pokreni lokalno
npm start
# Otvori http://localhost:3000
```

## Deploy na Vercel (besplatno)

### Opcija A — Vercel CLI
```bash
npm install -g vercel
vercel login
vercel --prod
```

### Opcija B — GitHub + Vercel dashboard
1. `git init && git add . && git commit -m "initial"`
2. Kreiraj repo na github.com/new
3. `git remote add origin https://github.com/TVOJE-IME/luca-london.git`
4. `git push -u origin main`
5. Idi na vercel.com → New Project → uvezi GitHub repo
6. Klikni Deploy — gotovo za ~2 minute!

URL koji dobiješ koristi za QR kod.

## Tehnologije

- React 18
- Framer Motion (animacije)
- Tailwind CSS (styling)
- Canvas API (particles)

## Struktura

```
src/
  components/
    LoadingScreen.jsx   — airport scanner intro
    HeroScreen.jsx      — animirani avion, hero sekcija
    MapScreen.jsx       — interaktivna mapa Londona
    LocationCard.jsx    — popup kartice za lokacije
    Particles.jsx       — zlatne čestice u pozadini
  data/
    locations.js        — sve lokacije s opisima
  App.jsx              — glavni orchestrator
```
