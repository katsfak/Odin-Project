import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Post.css";
import { useAuth } from "../utils/AuthContext.jsx";
import * as api from "../utils/api.js";
import Comment from "./Comment.jsx";

export default function Post({ post, onPostDeleted }) {
  const { user: currentUser, token } = useAuth();
  const [liked, setLiked] = useState(post.liked || false);
  const [likeCount, setLikeCount] = useState(post.likes || 0);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState("");
  const [loadingComments, setLoadingComments] = useState(false);
  const [error, setError] = useState("");

  async function handleLike() {
    try {
      if (liked) {
        await api.unlikePost(token, post.id);
        setLikeCount(likeCount - 1);
      } else {
        await api.likePost(token, post.id);
        setLikeCount(likeCount + 1);
      }
      setLiked(!liked);
    } catch (err) {
      setError(err.message);
    }
  }

  async function fetchComments() {
    if (showComments) {
      setShowComments(false);
      return;
    }

    try {
      setLoadingComments(true);
      const data = await api.getPostComments(token, post.id);
      setComments(data.comments);
      setShowComments(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingComments(false);
    }
  }

  async function handleComment(e) {
    e.preventDefault();
    if (!commentContent.trim()) return;

    try {
      const comment = await api.createComment(token, post.id, commentContent);
      setComments([comment, ...comments]);
      setCommentContent("");
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleCommentDeleted(commentId) {
    setComments(comments.filter((c) => c.id !== commentId));
  }

  async function handleDelete() {
    if (!window.confirm("Delete this post?")) return;

    try {
      await api.deletePost(token, post.id);
      onPostDeleted(post.id);
    } catch (err) {
      setError(err.message);
    }
  }

  const createdAt = new Date(post.createdAt);
  const timeAgo = getTimeAgo(createdAt);

  return (
    <div className="post">
      <div className="post-header">
        <Link to={`/user/${post.author.id}`} className="post-author">
          {post.author.profileImage && (
            <img
              src={post.author.profileImage}
              alt={post.author.username}
              className="avatar"
            />
          )}
          <div>
            <p className="username">{post.author.username}</p>
            <span className="timestamp">{timeAgo}</span>
          </div>
        </Link>
        {currentUser?.id === post.author.id && (
          <button
            className="delete-btn"
            onClick={handleDelete}
            title="Delete post"
          >
            ✕
          </button>
        )}
      </div>

      <div className="post-content">
        <p>{post.content}</p>
        {post.imageUrl && (
          <img src={post.imageUrl} alt="Post image" className="post-image" />
        )}
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="post-footer">
        <button
          className={`action-btn ${liked ? "liked" : ""}`}
          onClick={handleLike}
        >
          ♥ {likeCount}
        </button>
        <button className="action-btn" onClick={fetchComments}>
          💬 {post.comments}
        </button>
      </div>

      {showComments && (
        <div className="comments-section">
          <form className="comment-form" onSubmit={handleComment}>
            <textarea
              placeholder="Add a comment..."
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              rows="2"
              maxLength="280"
            />
            <button type="submit" disabled={!commentContent.trim()}>
              Comment
            </button>
          </form>

          {loadingComments ? (
            <div className="loading">Loading comments...</div>
          ) : (
            <div className="comments-list">
              {comments.map((comment) => (
                <Comment
                  key={comment.id}
                  comment={comment}
                  onCommentDeleted={handleCommentDeleted}
                />
              ))}
              {comments.length === 0 && (
                <p className="no-comments">No comments yet</p>
              )}
            </div>
          )}
        </div>
      )}
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
