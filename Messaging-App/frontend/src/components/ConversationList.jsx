import React from "react";

export default function ConversationList({ conversations, onSelect, loading }) {
  if (loading) {
    return <div className="loading">Loading conversations...</div>;
  }

  if (conversations.length === 0) {
    return <div className="empty-list">No conversations yet</div>;
  }

  return (
    <div className="conversation-list">
      {conversations.map((conv) => (
        <div
          key={conv.user.id}
          className="conversation-item"
          onClick={() => onSelect(conv.user.id)}
        >
          {conv.user.avatar && (
            <img
              src={conv.user.avatar}
              alt={conv.user.username}
              className="avatar"
            />
          )}
          <div className="conversation-info">
            <h3>{conv.user.username}</h3>
            {conv.lastMessage && (
              <p className="last-message">
                {conv.lastMessage.content.substring(0, 30)}...
              </p>
            )}
          </div>
          {conv.unreadCount > 0 && (
            <span className="unread-badge">{conv.unreadCount}</span>
          )}
          {conv.user.isOnline && <span className="online-indicator" />}
        </div>
      ))}
    </div>
  );
}
