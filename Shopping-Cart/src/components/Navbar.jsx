import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

function Navbar({ totalCartItems }) {
  return (
    <header className="navbar">
      <nav className="nav-links" aria-label="Main navigation">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/shop"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Shop
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Cart ({totalCartItems})
        </NavLink>
      </nav>
    </header>
  );
}

Navbar.propTypes = {
  totalCartItems: PropTypes.number.isRequired,
};

export default Navbar;
