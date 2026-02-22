import PropTypes from "prop-types";
import { useState } from "react";
import ProductCard from "../components/ProductCard.jsx";
import useProducts from "../hooks/useProducts.js";
import { normalizeQuantity } from "../lib/cart.js";

function ShopPage({ addToCart }) {
  const { products, loading, error } = useProducts();
  const [quantities, setQuantities] = useState({});

  const getQuantity = (productId) => quantities[productId] ?? 1;

  const setQuantity = (productId, nextValue) => {
    const normalizedValue = normalizeQuantity(nextValue);

    setQuantities((previousQuantities) => ({
      ...previousQuantities,
      [productId]: normalizedValue,
    }));
  };

  const handleAddToCart = (product) => {
    const quantity = getQuantity(product.id);
    addToCart(product, quantity);
    setQuantity(product.id, 1);
  };

  if (loading) {
    return <p className="state-message">Loading products...</p>;
  }

  if (error) {
    return <p className="state-message error">{error}</p>;
  }

  return (
    <section>
      <h1>Shop</h1>
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            quantity={getQuantity(product.id)}
            onQuantityChange={(event) =>
              setQuantity(product.id, event.target.value)
            }
            onIncrement={() =>
              setQuantity(product.id, getQuantity(product.id) + 1)
            }
            onDecrement={() =>
              setQuantity(product.id, getQuantity(product.id) - 1)
            }
            onAddToCart={() => handleAddToCart(product)}
          />
        ))}
      </div>
    </section>
  );
}

ShopPage.propTypes = {
  addToCart: PropTypes.func.isRequired,
};

export default ShopPage;
