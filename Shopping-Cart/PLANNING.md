# Shopping Cart App Plan

## Goals

- Build a React single-page app with three routes: Home, Shop, Cart.
- Fetch product data from FakeStore API.
- Allow users to adjust quantities in the shop and cart.
- Keep cart item count visible and live in the navbar.
- Validate props and cover critical user flows with RTL tests.

## Suggested Structure

- `src/App.jsx`: top-level cart state and route definitions.
- `src/components/`: reusable UI (`Navbar`, `ProductCard`, `CartItem`).
- `src/pages/`: page-level route components (`HomePage`, `ShopPage`, `CartPage`).
- `src/hooks/useProducts.js`: product fetching logic.
- `src/__tests__/App.test.jsx`: integration tests for core app behavior.

## Functional Checklist

- [x] Home page exists and is navigable.
- [x] Shop page lists API products as cards.
- [x] Product card includes quantity input and +/- controls.
- [x] Add To Cart updates cart state.
- [x] Navbar cart count updates in real time.
- [x] Cart page lists items and supports +/- quantity updates.
- [x] Removing item returns cart to empty state.
- [x] PropTypes added for components with props.
- [x] SPA deployment rewrites configured.

## Testing Focus (RTL)

- Navbar link rendering and basic route rendering.
- Add-to-cart flow from shop updates navbar count.
- Cart quantity updates and item removal behavior.
