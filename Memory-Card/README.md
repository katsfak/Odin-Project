# Memory Card Showdown

Memory card game built with React + Vite for The Odin Project.

## Features

- Fetches 12 Pokémon cards from PokéAPI (name, image, and type text)
- Randomizes card order every time a card is clicked
- Invokes the shuffle function on initial mount
- Tracks `Current Score` and `Best Score`
- Ends a round when a duplicate card is selected
- Responsive, polished UI ready for portfolio showcase

## Tech

- React
- Vite
- PokéAPI

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Push to GitHub

```bash
git init
git add .
git commit -m "Build memory card game"
git branch -M main
git remote add origin https://github.com/<your-username>/memory-card.git
git push -u origin main
```

## Deploy options

### Vercel

1. Import the GitHub repository into Vercel.
2. Framework preset: `Vite`.
3. Build command: `npm run build`.
4. Output directory: `dist`.

### Netlify

1. Import the GitHub repository into Netlify.
2. Build command: `npm run build`.
3. Publish directory: `dist`.

### GitHub Pages (optional)

Use a Vite GitHub Pages workflow or the `gh-pages` package to publish the `dist` folder.
