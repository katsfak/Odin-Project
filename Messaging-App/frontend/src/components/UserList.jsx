import React from "react";

export default function UserList({ users, onSelect, loading }) {
  if (loading) {
    return <div className="loading">Searching users...</div>;
  }

  if (users.length === 0) {
    return <div className="empty-list">No users found</div>;
  }

  return (
    <div className="user-list">
      {users.map((user) => (
        <div
          key={user.id}
          className="user-item"
          onClick={() => onSelect(user.id)}
        >
          {user.avatar && (
            <img src={user.avatar} alt={user.username} className="avatar" />
          )}
          <div className="user-info">
            <h3>{user.username}</h3>
            {user.bio && <p className="bio">{user.bio}</p>}
          </div>
          {user.isOnline && <span className="online-indicator" />}
        </div>
      ))}
    </div>
  );
}
