import React from "react";

export default function FriendsList({
  friends,
  onRemove,
  loading,
  onChat,
  showOnlineOnly,
}) {
  if (loading) {
    return <div className="loading">Loading friends...</div>;
  }

  if (friends.length === 0) {
    return (
      <div className="empty-list">
        {showOnlineOnly ? "No friends online" : "No friends yet"}
      </div>
    );
  }

  return (
    <div className="friends-grid">
      {friends.map((friend) => (
        <div key={friend.id} className="friend-card">
          {friend.avatar && (
            <img src={friend.avatar} alt={friend.username} className="avatar" />
          )}
          <div className="friend-info">
            <h3>{friend.username}</h3>
            {friend.bio && <p className="bio">{friend.bio}</p>}
            <p className={`status ${friend.isOnline ? "online" : "offline"}`}>
              {friend.isOnline ? "🟢 Online" : "⚫ Offline"}
            </p>
          </div>
          <div className="friend-actions">
            <button className="chat-btn" onClick={() => onChat(friend.id)}>
              Message
            </button>
            <button className="remove-btn" onClick={() => onRemove(friend.id)}>
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
