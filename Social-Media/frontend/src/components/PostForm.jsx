import React, { useState } from "react";
import "../styles/PostForm.css";
import { useAuth } from "../utils/AuthContext.jsx";
import * as api from "../utils/api.js";

export default function PostForm({ onPostCreated }) {
  const { user, token } = useAuth();
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!content.trim()) return;

    setError("");
    setLoading(true);

    try {
      const post = await api.createPost(token, content, imageUrl || null);
      onPostCreated(post);
      setContent("");
      setImageUrl("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="post-form">
      <div className="post-form-header">
        {user?.profileImage && (
          <img src={user.profileImage} alt={user.username} className="avatar" />
        )}
        <div>
          <p className="username">{user?.username}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="3"
          maxLength="500"
        />

        <div className="post-form-footer">
          <div className="input-group">
            <input
              type="url"
              placeholder="Image URL (optional)"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="form-actions">
            <span className="char-count">{content.length}/500</span>
            <button type="submit" disabled={!content.trim() || loading}>
              {loading ? "Posting..." : "Post"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
