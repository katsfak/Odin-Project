import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar.jsx";
import UserCard from "../components/UserCard.jsx";
import "../styles/UsersPage.css";
import { useAuth } from "../utils/AuthContext.jsx";
import * as api from "../utils/api.js";

export default function UsersPage() {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      setLoading(true);
      const data = await api.getAllUsers(token);
      setUsers(data.users);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSearch(e) {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length < 2) {
      fetchUsers();
      return;
    }

    try {
      const data = await api.searchUsers(token, query);
      setUsers(data.users);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <>
      <NavBar />
      <div className="users-container">
        <div className="users-content">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          {loading ? (
            <div className="loading">Loading users...</div>
          ) : (
            <div className="users-grid">
              {users.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          )}

          {!loading && users.length === 0 && (
            <div className="no-users">
              <p>No users found</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
