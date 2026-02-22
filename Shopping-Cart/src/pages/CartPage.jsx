import PropTypes from "prop-types";
import CartItem from "../components/CartItem.jsx";

function CartPage({ cartItems, onUpdateQuantity }) {
  const total = cartItems.reduce(
    (runningTotal, item) => runningTotal + item.product.price * item.quantity,
    0,
  );

  if (cartItems.length === 0) {
    return (
      <section>
        <h1>Your Cart</h1>
        <p className="state-message">Your cart is empty.</p>
      </section>
    );
  }

  return (
    <section>
      <h1>Your Cart</h1>
      <div className="cart-list">
        {cartItems.map((item) => (
          <CartItem
            key={item.product.id}
            item={item}
            onIncrease={() =>
              onUpdateQuantity(item.product.id, item.quantity + 1)
            }
            onDecrease={() =>
              onUpdateQuantity(item.product.id, item.quantity - 1)
            }
            onRemove={() => onUpdateQuantity(item.product.id, 0)}
          />
        ))}
      </div>
      <p className="cart-total">Total: ${total.toFixed(2)}</p>
    </section>
  );
}

CartPage.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
      }).isRequired,
      quantity: PropTypes.number.isRequired,
    }),
  ).isRequired,
  onUpdateQuantity: PropTypes.func.isRequired,
};

export default CartPage;
