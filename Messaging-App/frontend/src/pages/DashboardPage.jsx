import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ConversationList from "../components/ConversationList";
import UserList from "../components/UserList";
import "../styles/Dashboard.css";
import { useAuth } from "../utils/AuthContext";
import * as api from "../utils/api";

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [tab, setTab] = useState("conversations"); // conversations, users
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async () => {
    try {
      setLoading(true);
      const data = await api.getConversations(token);
      setConversations(data);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchUsers = async () => {
    if (!searchQuery.trim()) {
      setAllUsers([]);
      return;
    }

    try {
      const data = await api.searchUsers(searchQuery, token);
      setAllUsers(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSelectConversation = (userId) => {
    navigate(`/chat/${userId}`);
  };

  const handleSelectUser = (userId) => {
    navigate(`/chat/${userId}`);
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <div className="sidebar">
          <div className="sidebar-header">
            <h1>💬 Messages</h1>
            <div className="user-menu">
              <div className="current-user">
                {user.avatar && (
                  <img
                    src={user.avatar}
                    alt={user.username}
                    className="avatar-small"
                  />
                )}
                <div>
                  <p className="username">{user.username}</p>
                  <small>Online</small>
                </div>
              </div>
              <button
                className="settings-btn"
                onClick={() => navigate("/profile")}
                title="Profile settings"
              >
                ⚙️
              </button>
            </div>
          </div>

          <div className="tabs">
            <button
              className={`tab-btn ${tab === "conversations" ? "active" : ""}`}
              onClick={() => {
                setTab("conversations");
                setSearchQuery("");
              }}
            >
              Conversations
            </button>
            <button
              className={`tab-btn ${tab === "users" ? "active" : ""}`}
              onClick={() => setTab("users")}
            >
              Users
            </button>
            <button className="tab-btn" onClick={() => navigate("/friends")}>
              Friends
            </button>
          </div>

          <div className="search-box">
            {tab === "users" && (
              <>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyUp={handleSearchUsers}
                  placeholder="Search users..."
                />
              </>
            )}
          </div>

          {error && <div className="error-message">{error}</div>}

          {tab === "conversations" ? (
            <ConversationList
              conversations={conversations}
              onSelect={handleSelectConversation}
              loading={loading}
            />
          ) : (
            <UserList
              users={allUsers}
              onSelect={handleSelectUser}
              loading={searchQuery && !allUsers.length}
            />
          )}
        </div>

        <div className="main-content">
          <div className="placeholder">
            <p>Select a conversation to start messaging</p>
          </div>
        </div>
      </div>
    </div>
  );
}
