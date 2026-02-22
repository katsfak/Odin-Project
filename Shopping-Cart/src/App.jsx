import { useMemo, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar.jsx";
import CartPage from "./pages/CartPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import ShopPage from "./pages/ShopPage.jsx";

function App() {
  const [cartItems, setCartItems] = useState({});

  const totalCartItems = useMemo(
    () =>
      Object.values(cartItems).reduce(
        (total, item) => total + item.quantity,
        0,
      ),
    [cartItems],
  );

  const addToCart = (product, quantity) => {
    if (!product || quantity < 1) return;

    setCartItems((previousCart) => {
      const existingItem = previousCart[product.id];
      const nextQuantity = (existingItem?.quantity ?? 0) + quantity;

      return {
        ...previousCart,
        [product.id]: {
          product,
          quantity: nextQuantity,
        },
      };
    });
  };

  const updateCartItemQuantity = (productId, nextQuantity) => {
    setCartItems((previousCart) => {
      if (!previousCart[productId]) {
        return previousCart;
      }

      if (nextQuantity <= 0) {
        const { [productId]: _removedItem, ...remainingItems } = previousCart;
        return remainingItems;
      }

      return {
        ...previousCart,
        [productId]: {
          ...previousCart[productId],
          quantity: nextQuantity,
        },
      };
    });
  };

  const cartList = Object.values(cartItems);

  return (
    <div className="app-shell">
      <Navbar totalCartItems={totalCartItems} />
      <main className="page-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage addToCart={addToCart} />} />
          <Route
            path="/cart"
            element={
              <CartPage
                cartItems={cartList}
                onUpdateQuantity={updateCartItemQuantity}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
