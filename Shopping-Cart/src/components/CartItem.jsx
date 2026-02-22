import PropTypes from "prop-types";

function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  const subtotal = item.product.price * item.quantity;

  return (
    <article className="cart-item">
      <img
        src={item.product.image}
        alt={item.product.title}
        className="cart-item-image"
      />
      <div className="cart-item-content">
        <h3>{item.product.title}</h3>
        <p>Price: ${item.product.price.toFixed(2)}</p>
        <p>Subtotal: ${subtotal.toFixed(2)}</p>
        <div className="quantity-controls">
          <button
            type="button"
            onClick={onDecrease}
            aria-label={`Decrease ${item.product.title} in cart`}
          >
            -
          </button>
          <span aria-label={`Quantity in cart for ${item.product.title}`}>
            {item.quantity}
          </span>
          <button
            type="button"
            onClick={onIncrease}
            aria-label={`Increase ${item.product.title} in cart`}
          >
            +
          </button>
        </div>
      </div>
      <button type="button" className="remove-button" onClick={onRemove}>
        Remove
      </button>
    </article>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    product: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    }).isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  onIncrease: PropTypes.func.isRequired,
  onDecrease: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default CartItem;
