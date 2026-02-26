import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Comment.css";
import { useAuth } from "../utils/AuthContext.jsx";
import * as api from "../utils/api.js";

export default function Comment({ comment, onCommentDeleted }) {
  const { user: currentUser, token } = useAuth();
  const [liked, setLiked] = useState(comment.liked || false);
  const [likeCount, setLikeCount] = useState(comment.likes || 0);
  const [error, setError] = useState("");

  async function handleLike() {
    try {
      if (liked) {
        await api.unlikeComment(token, comment.id);
        setLikeCount(likeCount - 1);
      } else {
        await api.likeComment(token, comment.id);
        setLikeCount(likeCount + 1);
      }
      setLiked(!liked);
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete() {
    if (!window.confirm("Delete this comment?")) return;

    try {
      await api.deleteComment(token, comment.id);
      onCommentDeleted(comment.id);
    } catch (err) {
      setError(err.message);
    }
  }

  const createdAt = new Date(comment.createdAt);
  const timeAgo = getTimeAgo(createdAt);

  return (
    <div className="comment">
      <Link to={`/user/${comment.author.id}`} className="comment-author">
        {comment.author.profileImage && (
          <img
            src={comment.author.profileImage}
            alt={comment.author.username}
            className="avatar"
          />
        )}
        <div>
          <p className="username">{comment.author.username}</p>
          <span className="timestamp">{timeAgo}</span>
        </div>
      </Link>

      {currentUser?.id === comment.author.id && (
        <button
          className="delete-btn"
          onClick={handleDelete}
          title="Delete comment"
        >
          ✕
        </button>
      )}

      <p className="comment-content">{comment.content}</p>

      {error && <div className="error-message">{error}</div>}

      <button
        className={`like-btn ${liked ? "liked" : ""}`}
        onClick={handleLike}
      >
        ♥ {likeCount}
      </button>
    </div>
  );
}

function getTimeAgo(date) {
  const seconds = Math.floor((Date.now() - date) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return "Just now";
}
