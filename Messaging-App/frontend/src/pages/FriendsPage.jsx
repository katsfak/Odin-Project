import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FriendsList from "../components/FriendsList";
import "../styles/FriendsPage.css";
import { useAuth } from "../utils/AuthContext";
import * as api from "../utils/api";

export default function FriendsPage() {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [tab, setTab] = useState("friends"); // friends, online, pending
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadFriendsData();
  }, []);

  const loadFriendsData = async () => {
    try {
      setLoading(true);
      const [friendsData, onlineData, requestsData] = await Promise.all([
        api.getFriends(token),
        api.getOnlineFriends(token),
        api.getPendingRequests(token),
      ]);
      setFriends(friendsData);
      setOnlineFriends(onlineData);
      setPendingRequests(requestsData);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptRequest = async (friendshipId) => {
    try {
      await api.acceptFriend(friendshipId, token);
      setPendingRequests(pendingRequests.filter((r) => r.id !== friendshipId));
      loadFriendsData();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRejectRequest = async (friendshipId) => {
    try {
      await api.removeFriend(friendshipId, token);
      setPendingRequests(pendingRequests.filter((r) => r.id !== friendshipId));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRemoveFriend = async (friendshipId) => {
    try {
      await api.removeFriend(friendshipId, token);
      setFriends(friends.filter((f) => f.id !== friendshipId));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="friends-page">
      <div className="friends-container">
        <button className="back-btn" onClick={() => navigate("/")}>
          ← Back to Messages
        </button>

        <div className="friends-header">
          <h1>Friends</h1>
        </div>

        <div className="tabs">
          <button
            className={`tab-btn ${tab === "friends" ? "active" : ""}`}
            onClick={() => setTab("friends")}
          >
            All Friends ({friends.length})
          </button>
          <button
            className={`tab-btn ${tab === "online" ? "active" : ""}`}
            onClick={() => setTab("online")}
          >
            Online ({onlineFriends.length})
          </button>
          <button
            className={`tab-btn ${tab === "pending" ? "active" : ""}`}
            onClick={() => setTab("pending")}
          >
            Requests ({pendingRequests.length})
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="friends-list">
          {tab === "friends" && (
            <FriendsList
              friends={friends}
              onRemove={handleRemoveFriend}
              loading={loading}
              onChat={(userId) => navigate(`/chat/${userId}`)}
            />
          )}

          {tab === "online" && (
            <FriendsList
              friends={onlineFriends}
              onRemove={handleRemoveFriend}
              loading={loading}
              onChat={(userId) => navigate(`/chat/${userId}`)}
              showOnlineOnly
            />
          )}

          {tab === "pending" && (
            <div className="pending-requests">
              {pendingRequests.length === 0 ? (
                <p className="empty">No pending friend requests</p>
              ) : (
                pendingRequests.map((request) => (
                  <div key={request.id} className="request-item">
                    {request.user1.avatar && (
                      <img
                        src={request.user1.avatar}
                        alt={request.user1.username}
                        className="avatar"
                      />
                    )}
                    <div className="request-info">
                      <p className="username">{request.user1.username}</p>
                      {request.user1.bio && (
                        <p className="bio">{request.user1.bio}</p>
                      )}
                    </div>
                    <div className="request-actions">
                      <button
                        className="accept-btn"
                        onClick={() => handleAcceptRequest(request.id)}
                      >
                        Accept
                      </button>
                      <button
                        className="reject-btn"
                        onClick={() => handleRejectRequest(request.id)}
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
