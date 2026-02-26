import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/NavBar.css";
import { useAuth } from "../utils/AuthContext.jsx";

export default function NavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/feed" className="navbar-logo">
          <span>SocialMedia</span>
        </Link>

        <div className="navbar-menu">
          <Link to="/feed" className="nav-link">
            Feed
          </Link>
          <Link to="/users" className="nav-link">
            Users
          </Link>
          <Link to="/profile" className="nav-link">
            Profile
          </Link>

          <div className="nav-user">
            <button
              className="user-menu-btn"
              onClick={() => setShowMenu(!showMenu)}
            >
              {user?.profileImage && (
                <img
                  src={user.profileImage}
                  alt={user?.username}
                  className="avatar"
                />
              )}
              <span>{user?.username}</span>
            </button>

            {showMenu && (
              <div className="user-menu">
                <Link to="/profile" className="menu-item">
                  My Profile
                </Link>
                <button className="menu-item logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
