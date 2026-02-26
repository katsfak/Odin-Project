import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/UserCard.css";
import { useAuth } from "../utils/AuthContext.jsx";
import * as api from "../utils/api.js";

export default function UserCard({ user }) {
  const { user: currentUser, token } = useAuth();
  const [followStatus, setFollowStatus] = useState("none");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  React.useEffect(() => {
    if (currentUser?.id !== user.id) {
      checkFollowStatus();
    }
  }, [user.id]);

  async function checkFollowStatus() {
    try {
      const data = await api.checkFollowStatus(token, user.id);
      setFollowStatus(data.status);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleFollow() {
    setLoading(true);
    try {
      await api.sendFollowRequest(token, user.id);
      setFollowStatus("pending");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleUnfollow() {
    setLoading(true);
    try {
      await api.unfollow(token, user.id);
      setFollowStatus("none");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="user-card">
      <Link to={`/user/${user.id}`} className="user-card-header">
        {user.profileImage && (
          <img src={user.profileImage} alt={user.username} className="avatar" />
        )}
        <h3>{user.username}</h3>
      </Link>

      {user.bio && <p className="user-bio">{user.bio}</p>}

      <div className="user-stats">
        <span>{user.followers} followers</span>
      </div>

      {error && <div className="error-message">{error}</div>}

      {currentUser?.id !== user.id && (
        <>
          {followStatus === "none" && (
            <button
              className="follow-btn"
              onClick={handleFollow}
              disabled={loading}
            >
              Follow
            </button>
          )}
          {followStatus === "pending" && (
            <button className="pending-btn" disabled>
              Request Pending
            </button>
          )}
          {followStatus === "accepted" && (
            <button
              className="unfollow-btn"
              onClick={handleUnfollow}
              disabled={loading}
            >
              Unfollow
            </button>
          )}
        </>
      )}

      <Link to={`/user/${user.id}`} className="view-profile">
        View Profile →
      </Link>
    </div>
  );
}
