# Shopping Cart

A React shopping cart application with three pages:

- Home page
- Shop page (products from FakeStore API)
- Cart page (live quantity updates)

## Features

- Navigation bar visible on all pages
- Product cards with:
  - quantity input
  - increment/decrement buttons
  - Add To Cart action
- Real-time cart count in navbar
- Cart management with quantity adjustment and item removal
- Prop validation using `prop-types`
- Tests using React Testing Library + Vitest

## Scripts

- `npm run dev` - start development server
- `npm run build` - production build
- `npm run preview` - preview production build
- `npm run lint` - run ESLint
- `npm run test` - run test suite once
- `npm run test:watch` - run tests in watch mode

## Deployment (SPA Routing)

- Netlify: `public/_redirects` includes `/* /index.html 200`
- Vercel: `vercel.json` rewrites all routes to `index.html`
- Cloudflare Pages: no extra configuration needed for basic SPA fallback
