import PropTypes from "prop-types";

function ProductCard({
  product,
  quantity,
  onQuantityChange,
  onIncrement,
  onDecrement,
  onAddToCart,
}) {
  return (
    <article className="product-card">
      <img src={product.image} alt={product.title} className="product-image" />
      <h3 className="product-title">{product.title}</h3>
      <p className="product-price">${product.price.toFixed(2)}</p>
      <div className="quantity-controls">
        <button
          type="button"
          onClick={onDecrement}
          aria-label={`Decrease quantity for ${product.title}`}
        >
          -
        </button>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={onQuantityChange}
          aria-label={`Quantity for ${product.title}`}
        />
        <button
          type="button"
          onClick={onIncrement}
          aria-label={`Increase quantity for ${product.title}`}
        >
          +
        </button>
      </div>
      <button
        type="button"
        className="add-to-cart-button"
        onClick={onAddToCart}
      >
        Add To Cart
      </button>
    </article>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  quantity: PropTypes.number.isRequired,
  onQuantityChange: PropTypes.func.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default ProductCard;
