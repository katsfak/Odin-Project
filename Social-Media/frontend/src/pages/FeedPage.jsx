import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar.jsx";
import Post from "../components/Post.jsx";
import PostForm from "../components/PostForm.jsx";
import "../styles/FeedPage.css";
import { useAuth } from "../utils/AuthContext.jsx";
import * as api from "../utils/api.js";

export default function FeedPage() {
  const { token } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      setLoading(true);
      const data = await api.getFeedPosts(token, page);
      setPosts(data.posts);
      setHasMore(page < data.pages);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handlePostCreated(newPost) {
    setPosts([newPost, ...posts]);
  }

  async function handlePostDeleted(postId) {
    setPosts(posts.filter((p) => p.id !== postId));
  }

  async function handleLoadMore() {
    try {
      const data = await api.getFeedPosts(token, page + 1);
      setPosts([...posts, ...data.posts]);
      setPage(page + 1);
      setHasMore(page + 1 < data.pages);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <>
      <NavBar />
      <div className="feed-container">
        <div className="feed-content">
          <PostForm onPostCreated={handlePostCreated} />

          {error && <div className="error-message">{error}</div>}

          {loading && posts.length === 0 ? (
            <div className="loading">Loading feed...</div>
          ) : (
            <>
              <div className="posts-list">
                {posts.map((post) => (
                  <Post
                    key={post.id}
                    post={post}
                    onPostDeleted={handlePostDeleted}
                  />
                ))}
              </div>

              {hasMore && (
                <button className="load-more-btn" onClick={handleLoadMore}>
                  Load More
                </button>
              )}

              {posts.length === 0 && !loading && (
                <div className="no-posts">
                  <p>No posts yet. Follow users to see their posts!</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
